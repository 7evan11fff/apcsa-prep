"use client";

import type { TopicState } from "@/types";
import { getAllTopics, UNIT_NAMES } from "@/lib/knowledge-graph";
import { cn } from "@/lib/utils";

interface MasteryHeatmapProps {
  topicStates: Record<string, TopicState>;
}

function getMasteryColor(mastery: number): string {
  if (mastery >= 0.9) return "bg-green-500";
  if (mastery >= 0.7) return "bg-green-400";
  if (mastery >= 0.5) return "bg-yellow-400";
  if (mastery >= 0.3) return "bg-orange-400";
  if (mastery > 0) return "bg-red-400";
  return "bg-secondary";
}

export default function MasteryHeatmap({ topicStates }: MasteryHeatmapProps) {
  const topics = getAllTopics();

  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((unit) => {
        const unitTopics = topics.filter((t) => t.unit === unit);
        return (
          <div key={unit}>
            <h4 className="text-sm font-medium mb-2">
              Unit {unit}: {UNIT_NAMES[unit]}
            </h4>
            <div className="flex flex-wrap gap-1">
              {unitTopics.map((topic) => {
                const state = topicStates[topic.id];
                const mastery = state?.mastery ?? 0;
                return (
                  <div
                    key={topic.id}
                    title={`${topic.title}: ${Math.round(mastery * 100)}%`}
                    className={cn(
                      "w-8 h-8 rounded-sm cursor-pointer transition-transform hover:scale-110",
                      getMasteryColor(mastery)
                    )}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Not started</span>
        <div className="w-4 h-4 rounded-sm bg-secondary" />
        <div className="w-4 h-4 rounded-sm bg-red-400" />
        <div className="w-4 h-4 rounded-sm bg-orange-400" />
        <div className="w-4 h-4 rounded-sm bg-yellow-400" />
        <div className="w-4 h-4 rounded-sm bg-green-400" />
        <div className="w-4 h-4 rounded-sm bg-green-500" />
        <span>Mastered</span>
      </div>
    </div>
  );
}
