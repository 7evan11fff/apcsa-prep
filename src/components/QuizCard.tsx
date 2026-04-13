"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function QuizCard({ question, onAnswer }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer(selected === question.correctIndex);
  };

  const isCorrect = selected === question.correctIndex;

  return (
    <Card className="my-4">
      <CardContent className="pt-6 space-y-4">
        <p className="font-medium">{question.prompt}</p>

        {question.code && (
          <pre className="p-4 bg-secondary rounded-md overflow-x-auto text-sm font-mono">
            <code>{question.code}</code>
          </pre>
        )}

        <div className="space-y-2">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
              className={cn(
                "w-full text-left p-3 rounded-md border transition-colors text-sm",
                !submitted && selected === i && "border-primary bg-primary/10",
                !submitted && selected !== i && "hover:bg-accent",
                submitted && i === question.correctIndex && "border-green-500 bg-green-50",
                submitted && selected === i && i !== question.correctIndex && "border-red-500 bg-red-50"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs w-6">{String.fromCharCode(65 + i)}.</span>
                <span>{option}</span>
                {submitted && i === question.correctIndex && (
                  <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                )}
                {submitted && selected === i && i !== question.correctIndex && (
                  <XCircle className="h-4 w-4 text-red-500 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {!submitted ? (
          <Button onClick={handleSubmit} disabled={selected === null}>
            Check Answer
          </Button>
        ) : (
          <div
            className={cn(
              "p-3 rounded-md text-sm",
              isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            )}
          >
            <p className="font-medium mb-1">
              {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
