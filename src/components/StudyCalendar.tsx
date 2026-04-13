"use client";

import type { StudySession } from "@/types";
import { getTopicById } from "@/lib/knowledge-graph";
import { cn } from "@/lib/utils";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from "date-fns";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudyCalendarProps {
  sessions: StudySession[];
  examDate: string;
}

export default function StudyCalendar({ sessions, examDate }: StudyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);

  const getSession = (date: Date): StudySession | undefined => {
    return sessions.find((s) => isSameDay(parseISO(s.date), date));
  };

  const isExamDay = (date: Date) => isSameDay(date, parseISO(examDate));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
        <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium text-muted-foreground py-1">{d}</div>
        ))}

        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map((day) => {
          const session = getSession(day);
          const exam = isExamDay(day);
          const hasSession = !!session;
          const isCompleted = session?.completed;
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "p-1 text-center rounded-md min-h-[2.5rem] flex flex-col items-center justify-center",
                isToday && "ring-2 ring-primary",
                exam && "bg-red-100 font-bold",
                isCompleted && "bg-green-100",
                hasSession && !isCompleted && !exam && "bg-blue-50",
              )}
              title={
                exam
                  ? "Exam Day!"
                  : session
                  ? `${session.topicIds.length} new, ${session.reviewTopicIds.length} review`
                  : ""
              }
            >
              <span className="text-xs">{format(day, "d")}</span>
              {hasSession && (
                <div className="flex gap-0.5 mt-0.5">
                  {session.topicIds.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                  {session.reviewTopicIds.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                </div>
              )}
              {exam && <span className="text-[8px] text-red-600">EXAM</span>}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> New topic</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500" /> Review</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Completed</div>
      </div>
    </div>
  );
}
