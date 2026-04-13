export interface Topic {
  id: string;
  title: string;
  unit: number;
  description: string;
  prerequisites: string[];
  difficulty: number;
  estimatedMinutes: number;
  examWeight: number;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  prompt: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: number;
}

export interface Exercise {
  id: string;
  topicId: string;
  title: string;
  description: string;
  difficulty: number;
  starterCode: string;
  sampleSolution: string;
  testCases: TestCase[];
  hints: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
  hidden: boolean;
}

export interface FRQProblem {
  id: string;
  title: string;
  type: number;
  difficulty: number;
  topicIds: string[];
  prompt: string;
  starterCode: string;
  sampleSolution: string;
  rubric: RubricItem[];
  testCases: TestCase[];
  hints: string[];
  commonMistakes: CommonMistake[];
  walkthrough?: WalkthroughStep[];
}

export interface RubricItem {
  id: string;
  description: string;
  points: number;
  codePatterns: string[];
}

export interface CommonMistake {
  description: string;
  example: string;
  correction: string;
}

export interface WalkthroughStep {
  stepNumber: number;
  instruction: string;
  code: string;
  explanation: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  createdAt: string;
  examDate: string;
  totalXp: number;
  dailyXpGoal: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  topicStates: Record<string, TopicState>;
  exerciseResults: Record<string, ExerciseResult>;
  frqResults: Record<string, FRQResult>;
  examResults: ExamResult[];
  studyPlan: StudySession[];
  questionHistory: Record<string, QuestionRecord>;
}

export interface QuestionRecord {
  questionId: string;
  topicId: string;
  attempts: number;
  correctCount: number;
  lastAttempt: string;
  lastCorrect: boolean;
}

export interface TopicState {
  topicId: string;
  mastery: number;
  stability: number;
  difficulty: number;
  retrievability: number;
  lastReview: string | null;
  nextReview: string | null;
  reviewCount: number;
  correctCount: number;
  totalAttempts: number;
  lessonCompleted: boolean;
  xpEarned: number;
}

export interface ExerciseResult {
  exerciseId: string;
  completed: boolean;
  bestScore: number;
  attempts: number;
  lastAttempt: string;
  code: string;
}

export interface FRQResult {
  frqId: string;
  completed: boolean;
  bestScore: number;
  rubricScores: Record<string, number>;
  attempts: number;
  lastAttempt: string;
  code: string;
}

export interface ExamResult {
  examId: string;
  date: string;
  mcqScore: number;
  mcqTotal: number;
  frqScore: number;
  frqTotal: number;
  compositeScore: number;
  timeSpentMinutes: number;
  topicWeaknesses: string[];
}

export interface StudySession {
  date: string;
  topicIds: string[];
  reviewTopicIds: string[];
  targetXp: number;
  completedXp: number;
  completed: boolean;
}

export interface PracticeExam {
  id: string;
  title: string;
  description: string;
  mcqQuestions: ExamMCQ[];
  frqQuestions: string[];
  mcqTimeMinutes: number;
  frqTimeMinutes: number;
}

export interface ExamMCQ {
  id: string;
  topicId: string;
  prompt: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  unit: number | null;
  type: "textbook" | "video" | "practice" | "reference" | "forum" | "tool";
  tags: string[];
}

export interface PowerPathRecommendation {
  topicId: string;
  score: number;
  reason: string;
  type: "new" | "review";
}

export interface FSRSState {
  stability: number;
  difficulty: number;
  lastReview: number;
  reps: number;
  lapses: number;
}

export type Rating = 1 | 2 | 3 | 4;

export interface BKTParams {
  pL0: number;
  pT: number;
  pG: number;
  pS: number;
}

export interface BKTState {
  pKnown: number;
  observations: number;
}

export interface XPEvent {
  type: "lesson" | "quiz" | "exercise" | "frq" | "exam";
  topicId?: string;
  amount: number;
  bonus: number;
  timestamp: string;
}

export interface LessonContent {
  topicId: string;
  sections: LessonSection[];
}

export interface LessonSection {
  title: string;
  content: string;
  quizQuestions?: QuizQuestion[];
  codingChallenge?: CodingChallenge;
}

export interface CodingChallenge {
  instructions: string;
  starterCode: string;
  expectedOutputContains: string;
  hint: string;
}
