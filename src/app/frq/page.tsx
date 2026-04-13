"use client";

import Link from "next/link";
import { getAllFRQs, FRQ_TYPE_NAMES } from "@/data/frqs";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BookOpen, GraduationCap, CheckCircle } from "lucide-react";

export default function FRQPage() {
  const { profile, loading } = useStudentProfile();
  const allFRQs = getAllFRQs();

  if (loading || !profile) {
    return <div className="flex items-center justify-center h-full"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">FRQ Workshop</h1>
        <p className="text-muted-foreground">Master Free Response Questions — 45% of your AP exam score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/frq/strategy">
          <Card className="hover:border-primary transition-colors cursor-pointer h-full">
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-10 w-10 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-1">Strategy Lessons</h3>
              <p className="text-sm text-muted-foreground">Learn how to approach each FRQ type and maximize your score.</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-primary/50">
          <CardContent className="pt-6 text-center">
            <GraduationCap className="h-10 w-10 mx-auto mb-3 text-green-500" />
            <h3 className="font-semibold mb-1">Guided Walkthroughs</h3>
            <p className="text-sm text-muted-foreground">Step-by-step solutions to past FRQ problems.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <FileText className="h-10 w-10 mx-auto mb-3 text-purple-500" />
            <h3 className="font-semibold mb-1">Practice FRQs</h3>
            <p className="text-sm text-muted-foreground">{allFRQs.length} problems with AI rubric scoring.</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="1">
        <TabsList>
          {[1, 2, 3, 4].map((type) => (
            <TabsTrigger key={type} value={String(type)}>Type {type}</TabsTrigger>
          ))}
        </TabsList>

        {[1, 2, 3, 4].map((type) => {
          const typeFRQs = allFRQs.filter((f) => f.type === type);
          return (
            <TabsContent key={type} value={String(type)} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{FRQ_TYPE_NAMES[type]}</h2>
                <p className="text-sm text-muted-foreground">{typeFRQs.length} problems available</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {typeFRQs.map((frq) => {
                  const result = profile.frqResults[frq.id];
                  const completed = result?.completed;
                  return (
                    <Link key={frq.id} href={`/frq/practice/${frq.id}`}>
                      <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {completed ? <CheckCircle className="h-4 w-4 text-green-500" /> : <FileText className="h-4 w-4 text-muted-foreground" />}
                              <h3 className="font-medium">{frq.title}</h3>
                            </div>
                            <Badge variant="outline">{"★".repeat(frq.difficulty)}</Badge>
                          </div>
                          <Badge variant="secondary" className="text-xs">Type {frq.type}: {FRQ_TYPE_NAMES[frq.type]}</Badge>
                          {result && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Best: {result.bestScore}/9 · {result.attempts} attempts
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
