import type { Topic, TopicState } from "@/types";
import knowledgeGraphData from "@/data/knowledge-graph.json";

export function getAllTopics(): Topic[] {
  return knowledgeGraphData.topics as Topic[];
}

export function getTopicById(id: string): Topic | undefined {
  return knowledgeGraphData.topics.find((t) => t.id === id) as Topic | undefined;
}

export function getTopicsByUnit(unit: number): Topic[] {
  return knowledgeGraphData.topics.filter((t) => t.unit === unit) as Topic[];
}

export function getPrerequisites(topicId: string): Topic[] {
  const topic = getTopicById(topicId);
  if (!topic) return [];
  return topic.prerequisites
    .map((id) => getTopicById(id))
    .filter(Boolean) as Topic[];
}

export function getDependents(topicId: string): Topic[] {
  return knowledgeGraphData.topics.filter((t) =>
    t.prerequisites.includes(topicId)
  ) as Topic[];
}

export function isUnlocked(
  topicId: string,
  topicStates: Record<string, TopicState>
): boolean {
  const topic = getTopicById(topicId);
  if (!topic) return false;
  if (topic.prerequisites.length === 0) return true;
  return topic.prerequisites.every((prereqId) => {
    const state = topicStates[prereqId];
    return state && state.mastery >= 0.7;
  });
}

export function getCompletionPercentage(
  topicStates: Record<string, TopicState>
): number {
  const topics = getAllTopics();
  if (topics.length === 0) return 0;
  const completed = topics.filter(
    (t) => topicStates[t.id]?.lessonCompleted
  ).length;
  return Math.round((completed / topics.length) * 100);
}

export function getUnitProgress(
  unit: number,
  topicStates: Record<string, TopicState>
): { completed: number; total: number; mastery: number } {
  const topics = getTopicsByUnit(unit);
  const completed = topics.filter(
    (t) => topicStates[t.id]?.lessonCompleted
  ).length;
  const avgMastery =
    topics.length > 0
      ? topics.reduce((sum, t) => sum + (topicStates[t.id]?.mastery ?? 0), 0) /
        topics.length
      : 0;
  return { completed, total: topics.length, mastery: avgMastery };
}

export const UNIT_NAMES: Record<number, string> = {
  1: "Using Objects and Methods",
  2: "Selection and Iteration",
  3: "Class Creation",
  4: "Data Collections",
};

export const UNIT_EXAM_WEIGHTS: Record<number, string> = {
  1: "15-25%",
  2: "25-35%",
  3: "25-35%",
  4: "15-25%",
};
