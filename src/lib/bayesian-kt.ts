import type { BKTParams, BKTState } from "@/types";

const DEFAULT_PARAMS: BKTParams = {
  pL0: 0.1,
  pT: 0.15,
  pG: 0.25,
  pS: 0.1,
};

export function createInitialBKTState(pL0?: number): BKTState {
  return {
    pKnown: pL0 ?? DEFAULT_PARAMS.pL0,
    observations: 0,
  };
}

export function updateBKT(
  state: BKTState,
  correct: boolean,
  params: BKTParams = DEFAULT_PARAMS
): BKTState {
  const { pT, pG, pS } = params;
  const pKnown = state.pKnown;

  const pCorrectGivenKnown = 1 - pS;
  const pCorrectGivenNotKnown = pG;

  const pCorrect =
    pKnown * pCorrectGivenKnown + (1 - pKnown) * pCorrectGivenNotKnown;

  let pKnownGivenObs: number;
  if (correct) {
    pKnownGivenObs = (pKnown * pCorrectGivenKnown) / pCorrect;
  } else {
    const pIncorrect = 1 - pCorrect;
    pKnownGivenObs = (pKnown * pS) / pIncorrect;
  }

  const pKnownUpdated =
    pKnownGivenObs + (1 - pKnownGivenObs) * pT;

  return {
    pKnown: Math.min(0.999, Math.max(0.001, pKnownUpdated)),
    observations: state.observations + 1,
  };
}

export function getMastery(state: BKTState): number {
  return state.pKnown;
}

export function isMastered(state: BKTState, threshold = 0.7): boolean {
  return state.pKnown >= threshold;
}

export function getParamsForDifficulty(difficulty: number): BKTParams {
  const d = Math.min(5, Math.max(1, difficulty));
  return {
    pL0: Math.max(0.02, 0.2 - d * 0.03),
    pT: Math.max(0.05, 0.25 - d * 0.04),
    pG: 0.25,
    pS: Math.min(0.2, 0.05 + d * 0.03),
  };
}
