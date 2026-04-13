"use client";

import { useExamTimer } from "@/hooks/useExamTimer";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  totalMinutes: number;
  onTimeUp?: () => void;
}

export default function ExamTimer({ totalMinutes }: ExamTimerProps) {
  const { display, percentage, isRunning, isFinished, start, pause, reset } = useExamTimer(totalMinutes);

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border",
      isFinished ? "bg-red-50 border-red-300" : percentage > 80 ? "bg-yellow-50 border-yellow-300" : "bg-secondary/50"
    )}>
      <Clock className={cn("h-5 w-5", isFinished ? "text-red-500" : "text-muted-foreground")} />
      <span className={cn("text-2xl font-mono font-bold", isFinished && "text-red-600")}>
        {display}
      </span>
      <div className="flex gap-1 ml-auto">
        {!isRunning && !isFinished && (
          <Button size="sm" variant="outline" onClick={start}><Play className="h-3 w-3" /></Button>
        )}
        {isRunning && (
          <Button size="sm" variant="outline" onClick={pause}><Pause className="h-3 w-3" /></Button>
        )}
        <Button size="sm" variant="ghost" onClick={reset}><RotateCcw className="h-3 w-3" /></Button>
      </div>
    </div>
  );
}
