"use client";

import { CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RubricResult {
  id: string;
  description: string;
  points: number;
  earned: number;
  feedback: string;
}

interface FRQRubricScoreProps {
  results: RubricResult[];
  totalScore: number;
  maxScore: number;
  overallFeedback: string;
}

export default function FRQRubricScore({ results, totalScore, maxScore, overallFeedback }: FRQRubricScoreProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
        <span className="font-semibold text-lg">Score</span>
        <span className={cn(
          "text-3xl font-bold",
          totalScore >= maxScore * 0.8 ? "text-green-600" :
          totalScore >= maxScore * 0.5 ? "text-yellow-600" : "text-red-600"
        )}>
          {totalScore}/{maxScore}
        </span>
      </div>

      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.id} className={cn(
            "p-3 rounded-lg border",
            r.earned === r.points ? "bg-green-50 border-green-200" :
            r.earned > 0 ? "bg-yellow-50 border-yellow-200" :
            "bg-red-50 border-red-200"
          )}>
            <div className="flex items-start gap-2">
              {r.earned === r.points ? (
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              ) : r.earned > 0 ? (
                <MinusCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{r.description}</p>
                  <span className="text-sm font-mono">{r.earned}/{r.points}</span>
                </div>
                {r.feedback && <p className="text-xs text-muted-foreground mt-1">{r.feedback}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {overallFeedback && (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm font-medium mb-1">Overall Feedback</p>
          <p className="text-sm text-muted-foreground">{overallFeedback}</p>
        </div>
      )}
    </div>
  );
}
