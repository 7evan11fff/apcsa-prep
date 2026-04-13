"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { getExerciseById } from "@/data/exercises";
import { getTopicById } from "@/lib/knowledge-graph";
import { executeJava, validateTestCases } from "@/lib/java-executor";
import CodeEditor from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, Eye, Send } from "lucide-react";

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.exerciseId as string;
  const { profile, loading, addXP, save } = useStudentProfile();

  const exercise = getExerciseById(exerciseId);
  const topic = exercise ? getTopicById(exercise.topicId) : null;

  const [code, setCode] = useState(exercise?.starterCode ?? "");
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: number; total: number; results: { description: string; expected: string; actual: string; passed: boolean }[] } | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(false);

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }

  if (!exercise) {
    return <div className="p-6"><h1 className="text-2xl font-bold">Exercise not found</h1></div>;
  }

  const handleRun = async (codeToRun: string) => {
    setRunning(true);
    setTestResults(null);
    try {
      const result = await executeJava(codeToRun);
      const fullOutput = result.stderr ? `${result.stdout}\n--- Errors ---\n${result.stderr}` : result.stdout;
      setOutput(fullOutput);

      if (result.exitCode === 0) {
        const visible = exercise.testCases.filter((tc) => !tc.hidden);
        const validation = validateTestCases(result.stdout, visible);
        setTestResults(validation);

        if (validation.passed === validation.total && profile) {
          const updated = { ...profile };
          updated.exerciseResults[exercise.id] = {
            exerciseId: exercise.id,
            completed: true,
            bestScore: 100,
            attempts: (updated.exerciseResults[exercise.id]?.attempts ?? 0) + 1,
            lastAttempt: new Date().toISOString(),
            code: codeToRun,
          };
          await save(updated);
          await addXP(15);
        }
      }
    } catch {
      setOutput("Failed to execute code. Check your internet connection.");
    }
    setRunning(false);
  };

  const handleAIFeedback = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, exercise: { title: exercise.title, description: exercise.description } }),
      });
      const data = await res.json();
      setAiFeedback(data.feedback || "Unable to get feedback.");
    } catch {
      setAiFeedback("Failed to get AI feedback. Check your API key.");
    }
    setLoadingAI(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={() => router.push("/practice")} className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Code Lab
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{exercise.title}</h1>
          <p className="text-muted-foreground text-sm">{exercise.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {topic && <Badge variant="outline">{topic.title}</Badge>}
          <Badge>{"★".repeat(exercise.difficulty)}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CodeEditor
            initialCode={exercise.starterCode}
            onRun={handleRun}
            onChange={setCode}
            output={output}
            running={running}
            height="400px"
          />

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setHintIndex(Math.min(hintIndex + 1, exercise.hints.length - 1))} disabled={hintIndex >= exercise.hints.length - 1}>
              <Lightbulb className="h-4 w-4 mr-1" /> Hint {hintIndex + 2}/{exercise.hints.length}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSolution(!showSolution)}>
              <Eye className="h-4 w-4 mr-1" /> {showSolution ? "Hide" : "Show"} Solution
            </Button>
            <Button variant="outline" size="sm" onClick={handleAIFeedback} disabled={loadingAI}>
              <Send className="h-4 w-4 mr-1" /> {loadingAI ? "Getting feedback..." : "AI Feedback"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {testResults && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  Test Results: {testResults.passed}/{testResults.total}
                  {testResults.passed === testResults.total ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {testResults.results.map((r, i) => (
                  <div key={i} className={`p-2 rounded text-xs ${r.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border`}>
                    <p className="font-medium">{r.passed ? "✓" : "✗"} {r.description}</p>
                    {!r.passed && (
                      <div className="mt-1">
                        <p>Expected: <code>{r.expected}</code></p>
                        <p>Got: <code>{r.actual}</code></p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {hintIndex >= 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Hints</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {exercise.hints.slice(0, hintIndex + 1).map((hint, i) => (
                  <div key={i} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    <span className="font-medium">Hint {i + 1}:</span> {hint}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {aiFeedback && (
            <Card>
              <CardHeader><CardTitle className="text-sm">AI Feedback</CardTitle></CardHeader>
              <CardContent><p className="text-sm whitespace-pre-wrap">{aiFeedback}</p></CardContent>
            </Card>
          )}

          {showSolution && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Sample Solution</CardTitle></CardHeader>
              <CardContent>
                <pre className="text-xs font-mono bg-secondary p-3 rounded overflow-x-auto">{exercise.sampleSolution}</pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
