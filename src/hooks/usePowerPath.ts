"use client";

import { useMemo } from "react";
import type { StudentProfile, PowerPathRecommendation } from "@/types";
import { computePowerPath } from "@/lib/power-path";

export function usePowerPath(profile: StudentProfile | null) {
  const recommendations = useMemo<PowerPathRecommendation[]>(() => {
    if (!profile) return [];
    return computePowerPath(profile.topicStates, profile.examDate);
  }, [profile]);

  const topRecommendation = recommendations.length > 0 ? recommendations[0] : null;

  const newTopics = recommendations.filter((r) => r.type === "new");
  const reviewTopics = recommendations.filter((r) => r.type === "review");

  return { recommendations, topRecommendation, newTopics, reviewTopics };
}
