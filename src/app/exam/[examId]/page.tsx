"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { getExamById } from "@/data/exams";
import { calculateCompositeScore, getScoreLabel } from "@/lib/exam-scorer";
import ExamTimer from "@/components/ExamTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;
  const { profile, loading, save, addXP } = useStudentProfile();

  const exam = getExamById(examId);

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }
  if (!exam) {
    return <div className="p-6"><h1 className="text-2xl font-bold">Exam not found</h1></div>;
  }

  const total = exam.mcqQuestions.length;
  const question = exam.mcqQuestions[currentQ];
  const answeredCount = Object.keys(answers).length;

  const handleSubmit = async () => {
    setSubmitted(true);
    const correct = exam.mcqQuestions.filter((q, i) => answers[i] === q.correctIndex).length;
    const compositeScore = calculateCompositeScore(correct, total, 0, 36);

    const updated = { ...profile };
    updated.examResults.push({
      examId: exam.id,
      date: new Date().toISOString(),
      mcqScore: correct,
      mcqTotal: total,
      frqScore: 0,
      frqTotal: 36,
      compositeScore,
      timeSpentMinutes: 90,
      topicWeaknesses: [],
    });
    await save(updated);
    await addXP(20);
  };

  if (!started) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <button onClick={() => router.push("/exam")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Exams
        </button>
        <Card>
          <CardHeader><CardTitle>{exam.title}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{exam.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-secondary rounded">
                <p className="font-medium">Section I: Multiple Choice</p>
                <p className="text-muted-foreground">{exam.mcqQuestions.length} questions · {exam.mcqTimeMinutes} minutes</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="font-medium">Section II: Free Response</p>
                <p className="text-muted-foreground">{exam.frqQuestions.length} questions · {exam.frqTimeMinutes} minutes</p>
              </div>
            </div>
            <Button onClick={() => setStarted(true)} size="lg" className="w-full">Begin Exam</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    const correct = exam.mcqQuestions.filter((q, i) => answers[i] === q.correctIndex).length;
    const compositeScore = calculateCompositeScore(correct, total, 0, 36);

    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Exam Results</h1>

        <Card className="text-center p-8">
          <div className="text-6xl font-bold mb-2">{compositeScore}/5</div>
          <p className="text-lg text-muted-foreground">{getScoreLabel(compositeScore)}</p>
          <p className="mt-4">MCQ: {correct}/{total} correct ({Math.round(correct / total * 100)}%)</p>
        </Card>

        <Card>
          <CardHeader><CardTitle>Question Review</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {exam.mcqQuestions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={i} className={cn("p-3 rounded border", isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200")}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-500 mt-0.5" />}
                    <div>
                      <p className="text-sm font-medium">Q{i + 1}: {q.prompt.substring(0, 80)}...</p>
                      {!isCorrect && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Your answer: {q.options[userAnswer] ?? "Skipped"} | Correct: {q.options[q.correctIndex]}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Button onClick={() => router.push("/exam")} variant="outline">Back to Exams</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Section I: Multiple Choice</h1>
        <ExamTimer totalMinutes={exam.mcqTimeMinutes} />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Question {currentQ + 1} of {total}</span>
        <span>·</span>
        <span>{answeredCount} answered</span>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <p className="font-medium whitespace-pre-wrap">{question.prompt}</p>
          {question.code && (
            <pre className="p-4 bg-secondary rounded-md overflow-x-auto text-sm font-mono">{question.code}</pre>
          )}
          <div className="space-y-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [currentQ]: i })}
                className={cn(
                  "w-full text-left p-3 rounded-md border transition-colors text-sm",
                  answers[currentQ] === i ? "border-primary bg-primary/10" : "hover:bg-accent"
                )}
              >
                <span className="font-mono text-xs w-6 inline-block">{String.fromCharCode(65 + i)}.</span> {opt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        <div className="flex flex-wrap gap-1">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={cn(
                "w-7 h-7 rounded text-xs font-mono",
                i === currentQ && "ring-2 ring-primary",
                answers[i] !== undefined ? "bg-primary text-primary-foreground" : "bg-secondary"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQ === total - 1 ? (
          <Button onClick={handleSubmit} disabled={answeredCount < total * 0.5}>
            Submit Exam
          </Button>
        ) : (
          <Button onClick={() => setCurrentQ(currentQ + 1)}>
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
