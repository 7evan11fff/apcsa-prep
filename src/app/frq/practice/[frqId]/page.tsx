"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { getFRQById, FRQ_TYPE_NAMES } from "@/data/frqs";
import CodeEditor from "@/components/CodeEditor";
import FRQRubricScore from "@/components/FRQRubricScore";
import { executeJava } from "@/lib/java-executor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Send, Play, Lightbulb, AlertTriangle, Eye } from "lucide-react";

export default function FRQPracticePage() {
  const params = useParams();
  const router = useRouter();
  const frqId = params.frqId as string;
  const { profile, loading, addXP, save } = useStudentProfile();

  const frq = getFRQById(frqId);

  const [code, setCode] = useState(frq?.starterCode ?? "");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    totalScore: number; maxScore: number;
    rubricResults: { id: string; description: string; points: number; earned: number; feedback: string }[];
    overallFeedback: string;
  } | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }
  if (!frq) {
    return <div className="p-6"><h1 className="text-2xl font-bold">FRQ not found</h1></div>;
  }

  const handleRun = async (codeToRun: string) => {
    setRunning(true);
    const result = await executeJava(codeToRun);
    setOutput(result.stderr ? `${result.stdout}\n--- Errors ---\n${result.stderr}` : result.stdout);
    setRunning(false);
  };

  const handleScore = async () => {
    setScoring(true);
    try {
      const res = await fetch("/api/ai/frq-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, problem: { title: frq.title, prompt: frq.prompt, rubric: frq.rubric } }),
      });
      const data = await res.json();
      setScoreResult(data);

      if (data.totalScore && profile) {
        const updated = { ...profile };
        const prev = updated.frqResults[frq.id];
        updated.frqResults[frq.id] = {
          frqId: frq.id,
          completed: data.totalScore >= 5,
          bestScore: Math.max(prev?.bestScore ?? 0, data.totalScore),
          rubricScores: {},
          attempts: (prev?.attempts ?? 0) + 1,
          lastAttempt: new Date().toISOString(),
          code,
        };
        await save(updated);
        await addXP(data.totalScore);
      }
    } catch {
      setScoreResult(null);
    }
    setScoring(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={() => router.push("/frq")} className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> FRQ Workshop
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{frq.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge>Type {frq.type}: {FRQ_TYPE_NAMES[frq.type]}</Badge>
            <Badge variant="outline">{"★".repeat(frq.difficulty)}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Problem Statement</CardTitle></CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ReactMarkdown>{frq.prompt}</ReactMarkdown>
            </CardContent>
          </Card>

          {frq.commonMistakes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" /> Common Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {frq.commonMistakes.map((m, i) => (
                  <div key={i} className="text-xs p-2 bg-yellow-50 rounded border border-yellow-200">
                    <p className="font-medium">{m.description}</p>
                    <p className="text-muted-foreground mt-1">{m.correction}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <CodeEditor
            initialCode={frq.starterCode}
            onRun={handleRun}
            onChange={setCode}
            output={output}
            running={running}
            height="350px"
          />

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleScore} disabled={scoring}>
              <Send className="h-4 w-4 mr-1" /> {scoring ? "Scoring..." : "Submit for AI Scoring"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setHintIndex(Math.min(hintIndex + 1, frq.hints.length - 1))}>
              <Lightbulb className="h-4 w-4 mr-1" /> Hint
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSolution(!showSolution)}>
              <Eye className="h-4 w-4 mr-1" /> {showSolution ? "Hide" : "Show"} Solution
            </Button>
          </div>

          {hintIndex >= 0 && (
            <div className="space-y-2">
              {frq.hints.slice(0, hintIndex + 1).map((hint, i) => (
                <div key={i} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                  <span className="font-medium">Hint {i + 1}:</span> {hint}
                </div>
              ))}
            </div>
          )}

          {scoreResult && (
            <FRQRubricScore
              results={scoreResult.rubricResults}
              totalScore={scoreResult.totalScore}
              maxScore={scoreResult.maxScore}
              overallFeedback={scoreResult.overallFeedback}
            />
          )}

          {showSolution && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Sample Solution</CardTitle></CardHeader>
              <CardContent>
                <pre className="text-xs font-mono bg-secondary p-3 rounded overflow-x-auto whitespace-pre-wrap">{frq.sampleSolution}</pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
