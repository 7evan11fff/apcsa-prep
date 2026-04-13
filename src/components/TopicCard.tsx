"use client";

import Link from "next/link";
import type { Topic, TopicState } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  topic: Topic;
  state?: TopicState;
  unlocked: boolean;
}

export default function TopicCard({ topic, state, unlocked }: TopicCardProps) {
  const mastery = state?.mastery ?? 0;
  const completed = state?.lessonCompleted ?? false;

  return (
    <Link
      href={unlocked ? `/learn/${topic.id}` : "#"}
      className={cn(
        "block p-4 rounded-lg border transition-all",
        unlocked ? "hover:border-primary hover:shadow-sm cursor-pointer" : "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {!unlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
          {completed && <CheckCircle className="h-4 w-4 text-green-500" />}
          {unlocked && !completed && <BookOpen className="h-4 w-4 text-primary" />}
          <h3 className="font-medium text-sm">{topic.title}</h3>
        </div>
        <Badge variant="outline" className="text-xs">
          Unit {topic.unit}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{topic.description}</p>
      <div className="flex items-center gap-3">
        <Progress value={mastery * 100} className="h-1.5 flex-1" />
        <span className="text-xs text-muted-foreground">{Math.round(mastery * 100)}%</span>
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <span>~{topic.estimatedMinutes} min</span>
        <span>·</span>
        <span>Difficulty {topic.difficulty}/5</span>
      </div>
    </Link>
  );
}
