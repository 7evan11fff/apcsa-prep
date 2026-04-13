import type { FSRSState, Rating } from "@/types";

const DECAY = -0.5;
const FACTOR = Math.pow(0.9, 1 / DECAY) - 1;

const DEFAULT_W = [
  0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05,
  0.34, 1.26, 0.29, 2.61, 0.0, 0.0,
];

export function createInitialState(difficulty: number = 5): FSRSState {
  return {
    stability: DEFAULT_W[2],
    difficulty: Math.min(10, Math.max(1, difficulty)),
    lastReview: Date.now(),
    reps: 0,
    lapses: 0,
  };
}

export function getRetrievability(state: FSRSState): number {
  const elapsedDays = (Date.now() - state.lastReview) / (1000 * 60 * 60 * 24);
  if (elapsedDays <= 0 || state.stability <= 0) return 1;
  return Math.pow(1 + (FACTOR * elapsedDays) / state.stability, DECAY);
}

export function getNextReviewDate(state: FSRSState, desiredRetention = 0.9): Date {
  const intervalDays =
    (state.stability / FACTOR) * (Math.pow(desiredRetention, 1 / DECAY) - 1);
  const next = new Date(state.lastReview);
  next.setDate(next.getDate() + Math.max(1, Math.round(intervalDays)));
  return next;
}

function clampDifficulty(d: number): number {
  return Math.min(10, Math.max(1, d));
}

function updateDifficulty(d: number, rating: Rating): number {
  const delta = rating - 3;
  return clampDifficulty(d - DEFAULT_W[6] * delta);
}

function updateStabilitySuccess(
  s: number,
  d: number,
  r: number,
  rating: Rating
): number {
  const hardPenalty = rating === 2 ? DEFAULT_W[15] : 1;
  const easyBonus = rating === 4 ? DEFAULT_W[16] : 1;
  return (
    s *
    (1 +
      Math.exp(DEFAULT_W[8]) *
        (11 - d) *
        Math.pow(s, -DEFAULT_W[9]) *
        (Math.exp((1 - r) * DEFAULT_W[10]) - 1) *
        hardPenalty *
        easyBonus)
  );
}

function updateStabilityFail(s: number, d: number, r: number): number {
  return (
    DEFAULT_W[11] *
    Math.pow(d, -DEFAULT_W[12]) *
    (Math.pow(s + 1, DEFAULT_W[13]) - 1) *
    Math.exp((1 - r) * DEFAULT_W[14])
  );
}

export function reviewCard(state: FSRSState, rating: Rating): FSRSState {
  const r = getRetrievability(state);
  const newDifficulty = updateDifficulty(state.difficulty, rating);

  let newStability: number;
  let newLapses = state.lapses;

  if (rating === 1) {
    newStability = updateStabilityFail(state.stability, newDifficulty, r);
    newLapses += 1;
  } else {
    newStability = updateStabilitySuccess(
      state.stability,
      newDifficulty,
      r,
      rating
    );
  }

  return {
    stability: Math.max(0.1, newStability),
    difficulty: newDifficulty,
    lastReview: Date.now(),
    reps: state.reps + 1,
    lapses: newLapses,
  };
}

export function ratingFromScore(score: number): Rating {
  if (score < 0.3) return 1;
  if (score < 0.6) return 2;
  if (score < 0.9) return 3;
  return 4;
}
