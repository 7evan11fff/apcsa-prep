import type { Topic, TopicState, PowerPathRecommendation } from "@/types";
import { getRetrievability, createInitialState } from "./fsrs";
import knowledgeGraph from "@/data/knowledge-graph.json";

const WEIGHTS = {
  mastery: 0.35,
  urgency: 0.25,
  prerequisiteValue: 0.2,
  examRelevance: 0.2,
};

const MASTERY_THRESHOLD = 0.7;

function getDownstreamCount(topicId: string): number {
  let count = 0;
  const visited = new Set<string>();
  const queue = [topicId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const t of knowledgeGraph.topics) {
      if (t.prerequisites.includes(current) && !visited.has(t.id)) {
        visited.add(t.id);
        count++;
        queue.push(t.id);
      }
    }
  }
  return count;
}

function isTopicUnlocked(
  topicId: string,
  topicStates: Record<string, TopicState>
): boolean {
  const topic = knowledgeGraph.topics.find((t) => t.id === topicId);
  if (!topic) return false;
  if (topic.prerequisites.length === 0) return true;

  return topic.prerequisites.every((prereqId) => {
    const state = topicStates[prereqId];
    return state && state.mastery >= MASTERY_THRESHOLD;
  });
}

export function getUnlockedTopics(
  topicStates: Record<string, TopicState>
): Topic[] {
  return knowledgeGraph.topics.filter((t) =>
    isTopicUnlocked(t.id, topicStates)
  ) as Topic[];
}

export function computePowerPath(
  topicStates: Record<string, TopicState>,
  examDate: string
): PowerPathRecommendation[] {
  const daysUntilExam = Math.max(
    1,
    Math.ceil(
      (new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  const recommendations: PowerPathRecommendation[] = [];
  const maxDownstream = Math.max(
    1,
    ...knowledgeGraph.topics.map((t) => getDownstreamCount(t.id))
  );

  for (const topic of knowledgeGraph.topics) {
    const state = topicStates[topic.id];
    if (!state) continue;

    const unlocked = isTopicUnlocked(topic.id, topicStates);
    if (!unlocked) continue;

    const mastery = state.mastery;
    const masteryScore = 1 - mastery;

    const fsrsState = {
      ...createInitialState(state.difficulty),
      stability: state.stability,
      lastReview: state.lastReview ? new Date(state.lastReview).getTime() : Date.now(),
      reps: state.reviewCount,
      lapses: 0,
    };
    const retrievability = state.reviewCount > 0 ? getRetrievability(fsrsState) : 0;
    const urgency = state.reviewCount > 0 ? Math.max(0, 1 - retrievability) : 0.5;

    const prerequisiteValue = getDownstreamCount(topic.id) / maxDownstream;

    const examProximityBoost = Math.max(0.5, 1 + (30 - daysUntilExam) / 30);
    const examRelevance = (topic.examWeight / 3.5) * examProximityBoost;

    const score =
      WEIGHTS.mastery * masteryScore +
      WEIGHTS.urgency * urgency +
      WEIGHTS.prerequisiteValue * prerequisiteValue +
      WEIGHTS.examRelevance * examRelevance;

    const isReview = state.lessonCompleted && retrievability < 0.9;
    const isNew = !state.lessonCompleted;

    let reason = "";
    if (isNew && prerequisiteValue > 0.5) {
      reason = "Unlocks many new topics";
    } else if (isNew) {
      reason = "New topic to learn";
    } else if (isReview && urgency > 0.5) {
      reason = "Due for review — knowledge fading";
    } else if (isReview) {
      reason = "Review to strengthen retention";
    } else {
      reason = "Continue building mastery";
    }

    recommendations.push({
      topicId: topic.id,
      score,
      reason,
      type: isNew ? "new" : "review",
    });
  }

  return recommendations.sort((a, b) => b.score - a.score);
}

export function getTopRecommendation(
  topicStates: Record<string, TopicState>,
  examDate: string
): PowerPathRecommendation | null {
  const recs = computePowerPath(topicStates, examDate);
  return recs.length > 0 ? recs[0] : null;
}
