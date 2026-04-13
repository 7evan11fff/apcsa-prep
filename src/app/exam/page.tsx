"use client";

import Link from "next/link";
import { getAllExams } from "@/data/exams";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, FileText } from "lucide-react";
import { getScoreLabel } from "@/lib/exam-scorer";

export default function ExamListPage() {
  const { profile, loading } = useStudentProfile();
  const exams = getAllExams();

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice Exams</h1>
        <p className="text-muted-foreground">Simulate the AP CS A exam experience with timed practice tests.</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <GraduationCap className="h-10 w-10 text-blue-600 shrink-0" />
            <div>
              <h3 className="font-semibold">2026 AP CS A Exam Format</h3>
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                <div>
                  <p className="font-medium">Section I: Multiple Choice</p>
                  <p className="text-muted-foreground">42 questions · 90 minutes · 55% of score</p>
                </div>
                <div>
                  <p className="font-medium">Section II: Free Response</p>
                  <p className="text-muted-foreground">4 questions · 90 minutes · 45% of score</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => {
          const pastResults = profile.examResults.filter((r) => r.examId === exam.id);
          const bestResult = pastResults.length > 0
            ? pastResults.reduce((best, r) => r.compositeScore > best.compositeScore ? r : best)
            : null;

          return (
            <Card key={exam.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {exam.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{exam.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exam.mcqTimeMinutes + exam.frqTimeMinutes} min total</span>
                  <span>{exam.mcqQuestions.length} MCQs</span>
                  <span>{exam.frqQuestions.length} FRQs</span>
                </div>
                {bestResult && (
                  <div className="p-2 bg-secondary rounded text-sm">
                    Best score: <Badge>{bestResult.compositeScore}/5</Badge> — {getScoreLabel(bestResult.compositeScore)}
                  </div>
                )}
                <Link href={`/exam/${exam.id}`}>
                  <Button className="w-full">{pastResults.length > 0 ? "Retake Exam" : "Start Exam"}</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
