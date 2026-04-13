"use client";

import Link from "next/link";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { getAllExercises } from "@/data/exercises";
import { getTopicById } from "@/lib/knowledge-graph";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, CheckCircle } from "lucide-react";

export default function PracticePage() {
  const { profile, loading } = useStudentProfile();
  const exercises = getAllExercises();

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Code Lab</h1>
        <p className="text-muted-foreground">Practice Java programming with instant feedback and AI-powered code review.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((exercise) => {
          const topic = getTopicById(exercise.topicId);
          const result = profile.exerciseResults[exercise.id];
          const completed = result?.completed;

          return (
            <Link key={exercise.id} href={`/practice/${exercise.id}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      ) : (
                        <Code2 className="h-5 w-5 text-primary shrink-0" />
                      )}
                      <h3 className="font-semibold">{exercise.title}</h3>
                    </div>
                    <Badge variant={exercise.difficulty <= 2 ? "secondary" : exercise.difficulty <= 3 ? "outline" : "destructive"}>
                      {"★".repeat(exercise.difficulty)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                  {topic && (
                    <Badge variant="outline" className="text-xs">
                      {topic.title}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
