export function calculateCompositeScore(mcqCorrect: number, mcqTotal: number, frqScore: number, frqTotal: number): number {
  const mcqPercentage = mcqTotal > 0 ? mcqCorrect / mcqTotal : 0;
  const frqPercentage = frqTotal > 0 ? frqScore / frqTotal : 0;
  const composite = mcqPercentage * 0.55 + frqPercentage * 0.45;

  if (composite >= 0.75) return 5;
  if (composite >= 0.60) return 4;
  if (composite >= 0.45) return 3;
  if (composite >= 0.30) return 2;
  return 1;
}

export function getScoreLabel(score: number): string {
  switch (score) {
    case 5: return "Extremely well qualified";
    case 4: return "Well qualified";
    case 3: return "Qualified";
    case 2: return "Possibly qualified";
    case 1: return "No recommendation";
    default: return "Unknown";
  }
}
