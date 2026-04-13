import type { StudentProfile, QuizQuestion, TopicState, QuestionRecord } from "@/types";
import { getAllTopics, getTopicsByUnit, UNIT_NAMES } from "./knowledge-graph";
import { getRetrievability, createInitialState } from "./fsrs";
import { getQuizzesByTopic } from "@/data/quizzes";

export interface Checkpoint {
  id: string;
  type: "mastery" | "review" | "unit-test" | "spaced-repetition";
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

function isQuestionDueForReview(record: QuestionRecord | undefined): boolean {
  if (!record) return false;
  if (!record.nextReviewAt) return false;
  return new Date(record.nextReviewAt) <= new Date();
}

function isQuestionUncleared(record: QuestionRecord | undefined): boolean {
  if (!record) return false;
  if (!record.lastIncorrectAt) return false;
  if (!record.clearedAt) return true;
  return new Date(record.lastIncorrectAt) > new Date(record.clearedAt);
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

  const scored = pool.map((q) => {
    const record = questionHistory[q.id];
    let priority: number;
    
    if (!record) {
      priority = 1;
    } else if (isQuestionUncleared(record)) {
      priority = 3;
    } else if (isQuestionDueForReview(record)) {
      priority = 2.5;
    } else if (!record.lastCorrect) {
      priority = 2;
    } else if (record.consecutiveCorrect < 3) {
      priority = 1.5;
    } else {
      priority = 0;
    }
    return { q, priority, noise: Math.random() * 0.3 };
  });

  scored.sort((a, b) => (b.priority + b.noise) - (a.priority + a.noise));
  return scored.slice(0, count).map((s) => s.q);
}

function pickUnclearedQuestions(
  questionHistory: Record<string, QuestionRecord>
): QuizQuestion[] {
  const unclearedIds = Object.values(questionHistory)
    .filter(isQuestionUncleared)
    .map((r) => r.questionId);
  
  if (unclearedIds.length === 0) return [];
  
  const topicIds = Array.from(new Set(
    Object.values(questionHistory)
      .filter(isQuestionUncleared)
      .map((r) => r.topicId)
  ));
  
  const pool: QuizQuestion[] = [];
  for (const id of topicIds) {
    pool.push(...getQuizzesByTopic(id).filter((q) => unclearedIds.includes(q.id)));
  }
  
  return pool.slice(0, 8);
}

function pickDueQuestions(
  questionHistory: Record<string, QuestionRecord>
): QuizQuestion[] {
  const dueRecords = Object.values(questionHistory)
    .filter(isQuestionDueForReview)
    .sort((a, b) => {
      const aTime = new Date(a.nextReviewAt!).getTime();
      const bTime = new Date(b.nextReviewAt!).getTime();
      return aTime - bTime;
    });
  
  if (dueRecords.length === 0) return [];
  
  const dueIds = dueRecords.slice(0, 10).map((r) => r.questionId);
  const topicIds = Array.from(new Set(dueRecords.slice(0, 10).map((r) => r.topicId)));
  
  const pool: QuizQuestion[] = [];
  for (const id of topicIds) {
    pool.push(...getQuizzesByTopic(id).filter((q) => dueIds.includes(q.id)));
  }
  
  return pool;
}

export function generateCheckpoints(profile: StudentProfile): Checkpoint[] {
  const checkpoints: Checkpoint[] = [];
  const topics = getAllTopics();
  const history = profile.questionHistory || {};

  // 1. HIGHEST PRIORITY: Uncleared missed questions (must answer correctly 2x in a row)
  const unclearedQuestions = pickUnclearedQuestions(history);
  if (unclearedQuestions.length >= 1) {
    const topicIds = Array.from(new Set(unclearedQuestions.map((q) => q.topicId)));
    checkpoints.push({
      id: "review-uncleared",
      type: "review",
      title: "Missed Question Review",
      description: `You have ${unclearedQuestions.length} question${unclearedQuestions.length > 1 ? "s" : ""} that need${unclearedQuestions.length === 1 ? "s" : ""} to be answered correctly twice to clear.`,
      topicIds,
      questions: unclearedQuestions,
      priority: 100,
      triggerReason: "Answer correctly 2x in a row to clear these questions",
    });
  }

  // 2. Spaced repetition: questions due for review based on their individual schedule
  const dueQuestions = pickDueQuestions(history);
  if (dueQuestions.length >= 3) {
    const topicIds = Array.from(new Set(dueQuestions.map((q) => q.topicId)));
    checkpoints.push({
      id: "spaced-repetition",
      type: "spaced-repetition",
      title: "Spaced Repetition Review",
      description: `${dueQuestions.length} question${dueQuestions.length > 1 ? "s are" : " is"} due for review to maintain long-term memory.`,
      topicIds,
      questions: dueQuestions,
      priority: 95,
      triggerReason: "Scheduled review to strengthen memory",
    });
  }

  // 3. Review checkpoints for topics with fading memory (retrievability < 0.85)
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
        description: `${topFading.length} topics need review to prevent forgetting.`,
        topicIds: topFading.map((t) => t.id),
        questions,
        priority: 85,
        triggerReason: "Knowledge fading — spaced repetition review due",
      });
    }
  }

  // 4. Mastery checkpoints when a topic has low mastery but lesson completed
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

  // 5. Unit test checkpoints when enough topics in a unit are completed
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

  // 6. Cumulative checkpoint every 10 topics completed
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
