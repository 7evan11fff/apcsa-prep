"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { getTopicById, UNIT_NAMES } from "@/lib/knowledge-graph";
import { getLessonContent } from "@/data/lessons";
import { getQuizzesByTopic } from "@/data/quizzes";
import QuizCard from "@/components/QuizCard";
import CodeEditor from "@/components/CodeEditor";
import { executeJava } from "@/lib/java-executor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, ArrowRight, CheckCircle, Code2, Lightbulb, Lock } from "lucide-react";

export default function TopicLessonPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;
  const { profile, loading, recordQuizAnswer, completeLesson, addXP } = useStudentProfile();

  const topic = getTopicById(topicId);
  const lesson = useMemo(() => getLessonContent(topicId), [topicId]);
  const quizzes = useMemo(() => getQuizzesByTopic(topicId), [topicId]);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});
  const [lessonDone, setLessonDone] = useState(false);

  // Hands-on coding state per section
  const [codingAttempted, setCodingAttempted] = useState<Record<number, boolean>>({});
  const [codingPassed, setCodingPassed] = useState<Record<number, boolean>>({});
  const [codingOutput, setCodingOutput] = useState<Record<number, string>>({});
  const [codingRunning, setCodingRunning] = useState(false);
  const [showCodingHint, setShowCodingHint] = useState<Record<number, boolean>>({});

  // Quiz gate state per section
  const [quizAttempted, setQuizAttempted] = useState<Record<string, boolean>>({});

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }

  if (!topic) {
    return <div className="p-6"><h1 className="text-2xl font-bold">Topic not found</h1></div>;
  }

  const sections = lesson?.sections ?? [
    { title: topic.title, content: `# ${topic.title}\n\n${topic.description}\n\nLesson content for this topic is being prepared. Check back soon!` },
  ];

  const currentSection = sections[sectionIndex];
  const sectionQuizzes = quizzes.filter((q) => q.id.includes(`s${sectionIndex + 1}`));
  const totalSections = sections.length;
  const isLastSection = sectionIndex === totalSections - 1;

  const hasCodingChallenge = !!currentSection.codingChallenge;
  const hasQuizzes = sectionQuizzes.length > 0;

  // Gate: check if current section is "done enough" to advance
  const sectionQuizIds = sectionQuizzes.map((q) => q.id);
  const allQuizzesDone = sectionQuizIds.length === 0 || sectionQuizIds.every((id) => quizAttempted[id]);
  const codingDone = !hasCodingChallenge || codingPassed[sectionIndex];
  const canAdvance = allQuizzesDone && codingDone;

  const handleQuizAnswer = async (questionId: string, correct: boolean) => {
    setQuizResults((prev) => ({ ...prev, [questionId]: correct }));
    setQuizAttempted((prev) => ({ ...prev, [questionId]: true }));
    await recordQuizAnswer(topicId, correct, topic.difficulty, questionId);
    if (correct) await addXP(5);
  };

  const handleRunCode = async (code: string) => {
    setCodingRunning(true);
    const result = await executeJava(code);
    const output = result.stderr
      ? `${result.stdout}\n--- Errors ---\n${result.stderr}`
      : result.stdout;
    setCodingOutput((prev) => ({ ...prev, [sectionIndex]: output }));
    setCodingAttempted((prev) => ({ ...prev, [sectionIndex]: true }));

    if (
      currentSection.codingChallenge &&
      result.stdout.includes(currentSection.codingChallenge.expectedOutputContains)
    ) {
      setCodingPassed((prev) => ({ ...prev, [sectionIndex]: true }));
      await addXP(10);
    }
    setCodingRunning(false);
  };

  const handleComplete = async () => {
    await completeLesson(topicId);
    setLessonDone(true);
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={() => router.push("/learn")} className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Learn
        </button>
        <span>/</span>
        <span>Unit {topic.unit}: {UNIT_NAMES[topic.unit]}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <p className="text-muted-foreground text-sm">{topic.description}</p>
        </div>
        <Badge variant="outline">Difficulty {topic.difficulty}/5</Badge>
      </div>

      <div className="flex items-center gap-2">
        <Progress value={((sectionIndex + 1) / totalSections) * 100} className="h-2 flex-1" />
        <span className="text-xs text-muted-foreground">{sectionIndex + 1}/{totalSections}</span>
      </div>

      {/* Lesson content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentSection.title}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const inline = !match;
                return !inline ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match ? match[1] : "java"}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="px-1 py-0.5 rounded bg-secondary text-sm" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {currentSection.content}
          </ReactMarkdown>
        </CardContent>
      </Card>

      {/* Hands-on coding challenge */}
      {hasCodingChallenge && currentSection.codingChallenge && (
        <Card className="border-blue-300 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-600" />
              Try It Yourself
            </CardTitle>
            <p className="text-sm text-muted-foreground">{currentSection.codingChallenge.instructions}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeEditor
              initialCode={currentSection.codingChallenge.starterCode}
              onRun={handleRunCode}
              output={codingOutput[sectionIndex] ?? undefined}
              running={codingRunning}
              height="250px"
            />

            {codingPassed[sectionIndex] && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <span className="font-semibold text-green-700">Correct! +10 XP</span>
                  <p className="text-xs text-green-600">Great job applying what you just learned.</p>
                </div>
              </div>
            )}

            {codingAttempted[sectionIndex] && !codingPassed[sectionIndex] && (
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-sm font-medium text-yellow-800">Not quite — check your output and try again.</p>
                {!showCodingHint[sectionIndex] && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1"
                    onClick={() => setShowCodingHint((prev) => ({ ...prev, [sectionIndex]: true }))}
                  >
                    <Lightbulb className="h-3 w-3 mr-1" /> Show Hint
                  </Button>
                )}
                {showCodingHint[sectionIndex] && (
                  <p className="text-xs text-yellow-700 mt-2">
                    <span className="font-medium">Hint:</span> {currentSection.codingChallenge.hint}
                  </p>
                )}
              </div>
            )}

            {!codingPassed[sectionIndex] && (
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <Lock className="h-3 w-3" /> You must complete this challenge correctly to continue.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quiz questions */}
      {hasQuizzes && (
        <div>
          <h3 className="font-semibold mb-2">Check Your Understanding</h3>
          {sectionQuizzes.map((q) => (
            <QuizCard
              key={q.id}
              question={q}
              onAnswer={(correct) => handleQuizAnswer(q.id, correct)}
            />
          ))}
          {!allQuizzesDone && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <Lock className="h-3 w-3" /> Answer all questions to continue.
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
          disabled={sectionIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Previous
        </Button>

        {isLastSection ? (
          lessonDone ? (
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 border border-green-200 animate-pulse">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <span className="font-semibold text-green-700">Lesson Complete! +10 XP</span>
                <p className="text-xs text-green-600">Returning to dashboard...</p>
              </div>
            </div>
          ) : (
            <Button onClick={handleComplete} disabled={!canAdvance}>
              {canAdvance ? (
                <>Complete Lesson <CheckCircle className="h-4 w-4 ml-2" /></>
              ) : (
                <>Complete all activities above <Lock className="h-4 w-4 ml-2" /></>
              )}
            </Button>
          )
        ) : (
          <Button onClick={() => setSectionIndex(sectionIndex + 1)} disabled={!canAdvance}>
            {canAdvance ? (
              <>Next <ArrowRight className="h-4 w-4 ml-2" /></>
            ) : (
              <>Complete all activities above <Lock className="h-4 w-4 ml-2" /></>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
