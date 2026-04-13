import type { StudentProfile, StudySession } from "@/types";
import { computePowerPath } from "./power-path";
import { addDays, differenceInCalendarDays, format, isWeekend } from "date-fns";

export function generateStudyPlan(profile: StudentProfile): StudySession[] {
  const examDate = new Date(profile.examDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalDays = differenceInCalendarDays(examDate, today);
  if (totalDays <= 0) return [];

  const recs = computePowerPath(profile.topicStates, profile.examDate);
  const newTopics = recs.filter((r) => r.type === "new");
  const reviewTopics = recs.filter((r) => r.type === "review");

  const sessions: StudySession[] = [];
  let newIdx = 0;
  let reviewIdx = 0;

  for (let d = 0; d < totalDays; d++) {
    const date = addDays(today, d);
    const dateStr = format(date, "yyyy-MM-dd");
    const isLastWeek = d >= totalDays - 7;
    const isWeekendDay = isWeekend(date);

    const topicIds: string[] = [];
    const reviewTopicIds: string[] = [];

    if (isLastWeek) {
      for (let i = 0; i < 3 && reviewIdx < reviewTopics.length; i++, reviewIdx++) {
        reviewTopicIds.push(reviewTopics[reviewIdx].topicId);
      }
    } else {
      const newCount = isWeekendDay ? 2 : 1;
      for (let i = 0; i < newCount && newIdx < newTopics.length; i++, newIdx++) {
        topicIds.push(newTopics[newIdx].topicId);
      }

      if (reviewIdx < reviewTopics.length) {
        reviewTopicIds.push(reviewTopics[reviewIdx].topicId);
        reviewIdx++;
      }
    }

    if (topicIds.length > 0 || reviewTopicIds.length > 0) {
      const targetXp = (topicIds.length * 15) + (reviewTopicIds.length * 10);
      sessions.push({
        date: dateStr,
        topicIds,
        reviewTopicIds,
        targetXp,
        completedXp: 0,
        completed: false,
      });
    }
  }

  return sessions;
}

export function getDaysUntilExam(examDate: string): number {
  return Math.max(0, differenceInCalendarDays(new Date(examDate), new Date()));
}
