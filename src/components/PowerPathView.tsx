"use client";

import Link from "next/link";
import type { PowerPathRecommendation } from "@/types";
import { getTopicById } from "@/lib/knowledge-graph";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";

interface PowerPathViewProps {
  recommendations: PowerPathRecommendation[];
  maxItems?: number;
}

export default function PowerPathView({ recommendations, maxItems = 5 }: PowerPathViewProps) {
  const items = recommendations.slice(0, maxItems);

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Sparkles className="h-8 w-8 mx-auto mb-2" />
        <p>All topics mastered! Review will appear when topics are due.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((rec, i) => {
        const topic = getTopicById(rec.topicId);
        if (!topic) return null;

        return (
          <div
            key={rec.topicId}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
              i === 0 ? "border-primary bg-primary/5" : "hover:bg-accent"
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-sm font-bold">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm truncate">{topic.title}</p>
                <Badge variant={rec.type === "new" ? "default" : "secondary"}>
                  {rec.type === "new" ? "New" : <><RefreshCw className="h-3 w-3 mr-1" />Review</>}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{rec.reason}</p>
            </div>
            <Link href={`/learn/${rec.topicId}`}>
              <Button size="sm" variant={i === 0 ? "default" : "ghost"}>
                {i === 0 ? "Start" : <ArrowRight className="h-4 w-4" />}
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
