"use client";

import { useState, useRef, useEffect } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { usePowerPath } from "@/hooks/usePowerPath";
import { getLevelFromXP } from "@/lib/xp-system";
import { getCompletionPercentage, getUnitProgress, UNIT_NAMES } from "@/lib/knowledge-graph";
import { getTopCheckpoint, type Checkpoint } from "@/lib/checkpoint-engine";
import QuizCard from "@/components/QuizCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import ProgressRing from "@/components/ProgressRing";
import MasteryHeatmap from "@/components/MasteryHeatmap";
import PowerPathView from "@/components/PowerPathView";
import { Flame, Target, Trophy, Clock, Brain, RotateCcw, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const { profile, loading, recordQuizAnswer, addXP } = useStudentProfile();
  const { recommendations } = usePowerPath(profile);

  // Freeze the checkpoint on first computation so answering questions
  // doesn't regenerate/reshuffle the question list mid-quiz
  const checkpointRef = useRef<Checkpoint | null>(null);
  const checkpointComputed = useRef(false);

  useEffect(() => {
    if (profile && !checkpointComputed.current) {
      checkpointRef.current = getTopCheckpoint(profile);
      checkpointComputed.current = true;
    }
  }, [profile]);

  const checkpoint = checkpointRef.current;

  const [checkpointIdx, setCheckpointIdx] = useState(0);
  const [checkpointScore, setCheckpointScore] = useState(0);
  const [checkpointDone, setCheckpointDone] = useState(false);
  const [answeredCurrent, setAnsweredCurrent] = useState(false);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const level = getLevelFromXP(profile.totalXp);
  const completion = getCompletionPercentage(profile.topicStates);
  const daysUntilExam = Math.max(
    0,
    Math.ceil((new Date(profile.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Keep up the great work.</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-orange-500">
            <Clock className="h-5 w-5" />
            <span className="text-2xl font-bold">{daysUntilExam}</span>
            <span className="text-sm">days until exam</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profile.totalXp}</p>
                <p className="text-xs text-muted-foreground">Total XP (Level {level.level})</p>
              </div>
            </div>
            <Progress value={(level.currentXp / level.nextLevelXp) * 100} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Flame className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profile.currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Trophy className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completion}%</p>
                <p className="text-xs text-muted-foreground">Topics Completed</p>
              </div>
            </div>
            <Progress value={completion} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ProgressRing
                  value={profile.totalXp % profile.dailyXpGoal}
                  max={profile.dailyXpGoal}
                  size={60}
                  strokeWidth={6}
                />
              </div>
              <div>
                <p className="text-sm font-medium">Daily Goal</p>
                <p className="text-xs text-muted-foreground">
                  {Math.min(profile.totalXp % profile.dailyXpGoal, profile.dailyXpGoal)}/{profile.dailyXpGoal} XP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mandatory Checkpoint — blocks dashboard until completed */}
      {checkpoint && !checkpointDone ? (
        <Card className="border-purple-300 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {checkpoint.type === "review" && <RotateCcw className="h-5 w-5 text-purple-600" />}
              {checkpoint.type === "mastery" && <Brain className="h-5 w-5 text-purple-600" />}
              {checkpoint.type === "unit-test" && <ShieldCheck className="h-5 w-5 text-purple-600" />}
              {checkpoint.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{checkpoint.description}</p>
            <p className="text-xs text-purple-600 font-medium">{checkpoint.triggerReason}</p>
            <p className="text-xs text-foreground font-medium mt-1">Complete this checkpoint to continue.</p>
          </CardHeader>
          <CardContent>
            {checkpointIdx < checkpoint.questions.length ? (
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <Progress value={(checkpointIdx / checkpoint.questions.length) * 100} className="h-1.5 flex-1" />
                  <span>{checkpointIdx + 1}/{checkpoint.questions.length}</span>
                </div>
                <QuizCard
                  key={`checkpoint-q-${checkpointIdx}`}
                  question={checkpoint.questions[checkpointIdx]}
                  onAnswer={async (correct) => {
                    if (answeredCurrent) return;
                    setAnsweredCurrent(true);
                    if (correct) setCheckpointScore((s) => s + 1);
                    const q = checkpoint.questions[checkpointIdx];
                    await recordQuizAnswer(q.topicId, correct, q.difficulty, q.id);
                    if (correct) await addXP(5);
                    setTimeout(() => {
                      setCheckpointIdx((i) => i + 1);
                      setAnsweredCurrent(false);
                    }, 1500);
                  }}
                />
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="text-5xl font-bold text-purple-700">
                  {checkpointScore}/{checkpoint.questions.length}
                </div>
                <p className="text-lg font-medium">
                  {checkpointScore === checkpoint.questions.length
                    ? "Perfect score! Your mastery is solid."
                    : checkpointScore >= checkpoint.questions.length * 0.7
                    ? "Good job! You're building strong mastery."
                    : "Keep practicing — review these topics again soon."}
                </p>
                <Button onClick={() => setCheckpointDone(true)} size="lg">
                  Continue to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
      <>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Power Path */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">Power Path</span>
                <span className="text-xs text-muted-foreground font-normal">
                  AI-recommended learning order
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PowerPathView recommendations={recommendations} />
            </CardContent>
          </Card>
        </div>

        {/* Mastery Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mastery Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <MasteryHeatmap topicStates={profile.topicStates} />
          </CardContent>
        </Card>
      </div>

      {/* Unit progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Unit Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((unit) => {
              const progress = getUnitProgress(unit, profile.topicStates);
              return (
                <div key={unit} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Unit {unit}</span>
                    <span className="text-muted-foreground">
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{UNIT_NAMES[unit]}</p>
                  <Progress value={progress.mastery * 100} className="h-2" />
                  <p className="text-xs text-right text-muted-foreground">
                    {Math.round(progress.mastery * 100)}% mastery
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      </>
      )}
    </div>
  );
}
