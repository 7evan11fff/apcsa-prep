import type { StudentProfile, QuizQuestion, TopicState, QuestionRecord } from "@/types";
import { getAllTopics, getTopicsByUnit, UNIT_NAMES } from "./knowledge-graph";
import { getRetrievability, createInitialState } from "./fsrs";
import { getQuizzesByTopic } from "@/data/quizzes";

export interface Checkpoint {
  id: string;
  type: "mastery" | "review" | "unit-test";
  title: string;
  description: string;
  topicIds: string[];
  questions: QuizQuestion[];
  priority: number;
  triggerReason: string;
}

function getTopicRetrievability(state: TopicState): number {
  if (!state.lastReview || state.reviewCount === 0) return 1;
  const fsrs = {
    ...createInitialState(state.difficulty),
    stability: state.stability,
    lastReview: new Date(state.lastReview).getTime(),
    reps: state.reviewCount,
    lapses: 0,
  };
  return getRetrievability(fsrs);
}

function pickQuestions(
  topicIds: string[],
  count: number,
  questionHistory: Record<string, QuestionRecord>
): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  for (const id of topicIds) {
    pool.push(...getQuizzesByTopic(id));
  }

  // Sort: previously missed questions first, then unseen, then correctly answered
  const scored = pool.map((q) => {
    const record = questionHistory[q.id];
    let priority: number;
    if (!record) {
      priority = 1; // unseen
    } else if (!record.lastCorrect) {
      priority = 2; // last answer was wrong — highest priority
    } else if (record.correctCount < record.attempts) {
      priority = 1.5; // gotten wrong before even if last was correct
    } else {
      priority = 0; // consistently correct — lowest priority
    }
    return { q, priority, noise: Math.random() * 0.5 };
  });

  scored.sort((a, b) => (b.priority + b.noise) - (a.priority + a.noise));
  return scored.slice(0, count).map((s) => s.q);
}

export function generateCheckpoints(profile: StudentProfile): Checkpoint[] {
  const checkpoints: Checkpoint[] = [];
  const topics = getAllTopics();
  const history = profile.questionHistory || {};

  // 1. Review checkpoints for topics with fading memory (retrievability < 0.85)
  const fadingTopics = topics.filter((t) => {
    const state = profile.topicStates[t.id];
    if (!state || !state.lessonCompleted) return false;
    const r = getTopicRetrievability(state);
    return r < 0.85 && state.reviewCount > 0;
  });

  if (fadingTopics.length >= 2) {
    const sorted = fadingTopics.sort((a, b) => {
      const rA = getTopicRetrievability(profile.topicStates[a.id]);
      const rB = getTopicRetrievability(profile.topicStates[b.id]);
      return rA - rB;
    });
    const topFading = sorted.slice(0, 5);
    const questions = pickQuestions(topFading.map((t) => t.id), 8, history);
    if (questions.length >= 3) {
      checkpoints.push({
        id: "review-fading",
        type: "review",
        title: "Memory Refresh",
        description: `${topFading.length} topics need review to prevent forgetting. Quick quiz to reinforce your knowledge.`,
        topicIds: topFading.map((t) => t.id),
        questions,
        priority: 90,
        triggerReason: "Knowledge fading — spaced repetition review due",
      });
    }
  }

  // 2. Missed-question review — surface questions the student previously got wrong
  const missedQuestionIds = Object.values(history).filter(
    (r) => !r.lastCorrect || r.correctCount < r.attempts
  );
  if (missedQuestionIds.length >= 3) {
    const missedTopicIds = Array.from(new Set(missedQuestionIds.map((r) => r.topicId)));
    const questions = pickQuestions(missedTopicIds, Math.min(8, missedQuestionIds.length), history);
    if (questions.length >= 3) {
      checkpoints.push({
        id: "review-missed",
        type: "review",
        title: "Missed Question Review",
        description: `You previously missed ${missedQuestionIds.length} question${missedQuestionIds.length > 1 ? "s" : ""}. Let's make sure you've got them now.`,
        topicIds: missedTopicIds,
        questions,
        priority: 95,
        triggerReason: "Previously incorrect answers need reinforcement",
      });
    }
  }

  // 3. Mastery checkpoints when a topic has low mastery but lesson completed
  const weakTopics = topics.filter((t) => {
    const state = profile.topicStates[t.id];
    if (!state || !state.lessonCompleted) return false;
    return state.mastery < 0.6 && state.totalAttempts >= 2;
  });

  if (weakTopics.length >= 1) {
    const questions = pickQuestions(weakTopics.map((t) => t.id), 6, history);
    if (questions.length >= 2) {
      checkpoints.push({
        id: "mastery-weak",
        type: "mastery",
        title: "Mastery Challenge",
        description: `You're still building mastery on ${weakTopics.length} topic${weakTopics.length > 1 ? "s" : ""}. Prove your understanding!`,
        topicIds: weakTopics.map((t) => t.id),
        questions,
        priority: 80,
        triggerReason: "Low mastery detected — needs more practice",
      });
    }
  }

  // 4. Unit test checkpoints when enough topics in a unit are completed
  for (let unit = 1; unit <= 4; unit++) {
    const unitTopics = getTopicsByUnit(unit);
    const completedInUnit = unitTopics.filter(
      (t) => profile.topicStates[t.id]?.lessonCompleted
    );
    const completionRate = completedInUnit.length / unitTopics.length;

    const unitTestTaken = profile.examResults.some(
      (e) => e.examId === `unit-test-${unit}`
    );

    if (completionRate >= 0.6 && !unitTestTaken) {
      const questions = pickQuestions(unitTopics.map((t) => t.id), 10, history);
      if (questions.length >= 5) {
        checkpoints.push({
          id: `unit-test-${unit}`,
          type: "unit-test",
          title: `Unit ${unit} Checkpoint`,
          description: `You've completed ${completedInUnit.length}/${unitTopics.length} topics in ${UNIT_NAMES[unit]}. Test your understanding!`,
          topicIds: unitTopics.map((t) => t.id),
          questions,
          priority: 70 + unit,
          triggerReason: `${Math.round(completionRate * 100)}% of unit completed`,
        });
      }
    }
  }

  // 5. Cumulative checkpoint every 10 topics completed
  const totalCompleted = topics.filter(
    (t) => profile.topicStates[t.id]?.lessonCompleted
  ).length;
  const milestones = [10, 20, 30, 40];
  for (const m of milestones) {
    if (totalCompleted >= m) {
      const milestoneTaken = profile.examResults.some(
        (e) => e.examId === `milestone-${m}`
      );
      if (!milestoneTaken) {
        const completed = topics.filter(
          (t) => profile.topicStates[t.id]?.lessonCompleted
        );
        const questions = pickQuestions(completed.map((t) => t.id), 12, history);
        if (questions.length >= 6) {
          checkpoints.push({
            id: `milestone-${m}`,
            type: "mastery",
            title: `${m}-Topic Milestone Test`,
            description: `Congratulations on completing ${m} topics! Take this comprehensive checkpoint to solidify your knowledge.`,
            topicIds: completed.map((t) => t.id),
            questions,
            priority: 60,
            triggerReason: `${m}-topic milestone reached`,
          });
        }
      }
    }
  }

  return checkpoints.sort((a, b) => b.priority - a.priority);
}

export function getTopCheckpoint(profile: StudentProfile): Checkpoint | null {
  const checkpoints = generateCheckpoints(profile);
  return checkpoints.length > 0 ? checkpoints[0] : null;
}
