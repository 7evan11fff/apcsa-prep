"use client";

import { useStudentProfile } from "@/hooks/useStudentProfile";
import { getAllTopics, isUnlocked, UNIT_NAMES, UNIT_EXAM_WEIGHTS } from "@/lib/knowledge-graph";
import TopicCard from "@/components/TopicCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LearnPage() {
  const { profile, loading } = useStudentProfile();
  const topics = getAllTopics();

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learn</h1>
        <p className="text-muted-foreground">
          Master all 40 topics across the 4 AP CS A units. Topics unlock as you build mastery.
        </p>
      </div>

      <Tabs defaultValue="1">
        <TabsList>
          {[1, 2, 3, 4].map((unit) => (
            <TabsTrigger key={unit} value={String(unit)}>
              Unit {unit}
            </TabsTrigger>
          ))}
        </TabsList>

        {[1, 2, 3, 4].map((unit) => {
          const unitTopics = topics.filter((t) => t.unit === unit);
          return (
            <TabsContent key={unit} value={String(unit)} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{UNIT_NAMES[unit]}</h2>
                  <p className="text-sm text-muted-foreground">
                    Exam weight: {UNIT_EXAM_WEIGHTS[unit]} · {unitTopics.length} topics
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unitTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    state={profile.topicStates[topic.id]}
                    unlocked={isUnlocked(topic.id, profile.topicStates)}
                  />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
