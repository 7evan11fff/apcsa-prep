import type { XPEvent } from "@/types";

const XP_VALUES = {
  lesson: 10,
  quiz: 5,
  exercise: 15,
  frq: 9,
  exam: 20,
};

const STREAK_BONUS_THRESHOLD = 3;
const STREAK_BONUS_MULTIPLIER = 1.5;
const PERFECT_BONUS = 5;

export function calculateXP(
  type: XPEvent["type"],
  score: number,
  streak: number
): { amount: number; bonus: number } {
  const base = XP_VALUES[type];
  const amount = Math.round(base * Math.max(0, Math.min(1, score)));

  let bonus = 0;
  if (score >= 1.0) {
    bonus += PERFECT_BONUS;
  }
  if (streak >= STREAK_BONUS_THRESHOLD) {
    bonus += Math.round(amount * (STREAK_BONUS_MULTIPLIER - 1));
  }

  return { amount, bonus };
}

export function getDailyProgress(
  events: XPEvent[],
  dailyGoal: number
): { earned: number; goal: number; percentage: number } {
  const today = new Date().toISOString().split("T")[0];
  const todayEvents = events.filter((e) => e.timestamp.startsWith(today));
  const earned = todayEvents.reduce((sum, e) => sum + e.amount + e.bonus, 0);
  return {
    earned,
    goal: dailyGoal,
    percentage: Math.min(100, Math.round((earned / dailyGoal) * 100)),
  };
}

export function getLevelFromXP(totalXp: number): {
  level: number;
  currentXp: number;
  nextLevelXp: number;
} {
  const level = Math.floor(Math.sqrt(totalXp / 50)) + 1;
  const currentLevelXp = Math.pow(level - 1, 2) * 50;
  const nextLevelXp = Math.pow(level, 2) * 50;
  return {
    level,
    currentXp: totalXp - currentLevelXp,
    nextLevelXp: nextLevelXp - currentLevelXp,
  };
}
