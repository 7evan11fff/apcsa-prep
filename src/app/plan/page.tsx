"use client";

import { useState, useMemo } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { generateStudyPlan, getDaysUntilExam } from "@/lib/study-planner";
import { getTopicById } from "@/lib/knowledge-graph";
import StudyCalendar from "@/components/StudyCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target, RefreshCw } from "lucide-react";

export default function PlanPage() {
  const { profile, loading, save } = useStudentProfile();

  const studyPlan = useMemo(() => {
    if (!profile) return [];
    return profile.studyPlan.length > 0 ? profile.studyPlan : generateStudyPlan(profile);
  }, [profile]);

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }

  const daysLeft = getDaysUntilExam(profile.examDate);
  const completedSessions = studyPlan.filter((s) => s.completed).length;
  const today = new Date().toISOString().split("T")[0];
  const todaySession = studyPlan.find((s) => s.date === today);
  const upcomingSessions = studyPlan.filter((s) => s.date >= today && !s.completed).slice(0, 7);

  const handleGeneratePlan = async () => {
    const newPlan = generateStudyPlan(profile);
    const updated = { ...profile, studyPlan: newPlan };
    await save(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Plan</h1>
          <p className="text-muted-foreground">Your personalized path to the AP CS A exam.</p>
        </div>
        <Button onClick={handleGeneratePlan} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" /> Regenerate Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-3xl font-bold">{daysLeft}</p>
                <p className="text-sm text-muted-foreground">Days until exam</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-3xl font-bold">{completedSessions}/{studyPlan.length}</p>
                <p className="text-sm text-muted-foreground">Sessions completed</p>
              </div>
            </div>
            <Progress value={studyPlan.length > 0 ? (completedSessions / studyPlan.length) * 100 : 0} className="mt-3 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-3xl font-bold">{profile.dailyXpGoal}</p>
                <p className="text-sm text-muted-foreground">Daily XP goal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
          <CardContent>
            <StudyCalendar sessions={studyPlan} examDate={profile.examDate} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {todaySession && (
            <Card className="border-primary">
              <CardHeader><CardTitle className="text-lg">Today&apos;s Session</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {todaySession.topicIds.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">New Topics:</p>
                    {todaySession.topicIds.map((id) => {
                      const topic = getTopicById(id);
                      return topic ? (
                        <Badge key={id} variant="default" className="mr-1 mb-1">{topic.title}</Badge>
                      ) : null;
                    })}
                  </div>
                )}
                {todaySession.reviewTopicIds.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Review:</p>
                    {todaySession.reviewTopicIds.map((id) => {
                      const topic = getTopicById(id);
                      return topic ? (
                        <Badge key={id} variant="secondary" className="mr-1 mb-1">{topic.title}</Badge>
                      ) : null;
                    })}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  Target: {todaySession.targetXp} XP
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle className="text-lg">Upcoming Sessions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {upcomingSessions.map((session) => (
                <div key={session.date} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="text-sm font-medium">{session.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.topicIds.length} new · {session.reviewTopicIds.length} review
                    </p>
                  </div>
                  <Badge variant="outline">{session.targetXp} XP</Badge>
                </div>
              ))}
              {upcomingSessions.length === 0 && (
                <p className="text-sm text-muted-foreground">No upcoming sessions. Generate a plan!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
