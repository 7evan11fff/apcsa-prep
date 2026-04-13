import OpenAI from "openai";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export async function getCodeFeedback(
  code: string,
  exercise: { title: string; description: string }
): Promise<string> {
  const openai = getClient();
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an AP Computer Science A tutor. Review the student's Java code for the given exercise. Provide concise feedback on correctness, style, edge cases, and AP exam best practices. Be encouraging but precise. Limit response to 200 words.",
      },
      {
        role: "user",
        content: `Exercise: ${exercise.title}\nDescription: ${exercise.description}\n\nStudent's code:\n\`\`\`java\n${code}\n\`\`\``,
      },
    ],
    max_tokens: 500,
  });
  return response.choices[0]?.message?.content || "Unable to generate feedback.";
}

export async function getHint(
  code: string,
  exercise: { title: string; description: string },
  hintLevel: number
): Promise<string> {
  const openai = getClient();
  const specificity = hintLevel === 1 ? "subtle" : hintLevel === 2 ? "moderate" : "specific";
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an AP CS A tutor. Give a ${specificity} hint to help the student solve the exercise. Do NOT give the full solution. Hint level: ${hintLevel}/3. Be concise (1-2 sentences).`,
      },
      {
        role: "user",
        content: `Exercise: ${exercise.title}\nDescription: ${exercise.description}\n\nStudent's current code:\n\`\`\`java\n${code}\n\`\`\``,
      },
    ],
    max_tokens: 150,
  });
  return response.choices[0]?.message?.content || "Unable to generate hint.";
}

export async function scoreFRQ(
  code: string,
  problem: { title: string; prompt: string; rubric: { id: string; description: string; points: number }[] }
): Promise<{
  totalScore: number;
  maxScore: number;
  rubricResults: { id: string; description: string; points: number; earned: number; feedback: string }[];
  overallFeedback: string;
}> {
  const openai = getClient();

  const rubricStr = problem.rubric
    .map((r) => `- [${r.id}] ${r.description} (${r.points} pt${r.points > 1 ? "s" : ""})`)
    .join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an AP Computer Science A exam grader. Score the student's FRQ response using the provided rubric. For each rubric item, award 0 or full points (no partial unless the item specifies it). Apply penalties (max 3 total): array/collection confusion, extraneous side-effect code, undeclared locals, destroying persistent data, void returning value. Each penalty is -1 point from earned credit only (no negative parts). Return JSON only with this shape:
{
  "rubricResults": [{"id": "string", "earned": number, "feedback": "string"}],
  "penalties": number,
  "overallFeedback": "string"
}`,
      },
      {
        role: "user",
        content: `Problem: ${problem.title}\n\n${problem.prompt}\n\nRubric:\n${rubricStr}\n\nStudent's code:\n\`\`\`java\n${code}\n\`\`\``,
      },
    ],
    max_tokens: 1000,
    response_format: { type: "json_object" },
  });

  try {
    const parsed = JSON.parse(response.choices[0]?.message?.content || "{}");
    const rubricResults = problem.rubric.map((r) => {
      const result = parsed.rubricResults?.find((pr: { id: string }) => pr.id === r.id);
      return {
        id: r.id,
        description: r.description,
        points: r.points,
        earned: result?.earned ?? 0,
        feedback: result?.feedback ?? "",
      };
    });

    const rawTotal = rubricResults.reduce((sum, r) => sum + r.earned, 0);
    const penalties = Math.min(3, parsed.penalties || 0);
    const totalScore = Math.max(0, rawTotal - penalties);
    const maxScore = problem.rubric.reduce((sum, r) => sum + r.points, 0);

    return {
      totalScore,
      maxScore,
      rubricResults,
      overallFeedback: parsed.overallFeedback || "",
    };
  } catch {
    return {
      totalScore: 0,
      maxScore: problem.rubric.reduce((sum, r) => sum + r.points, 0),
      rubricResults: problem.rubric.map((r) => ({
        id: r.id,
        description: r.description,
        points: r.points,
        earned: 0,
        feedback: "Unable to parse AI response",
      })),
      overallFeedback: "Scoring failed. Please try again.",
    };
  }
}

export async function explainWrongAnswer(
  question: string,
  studentAnswer: string,
  correctAnswer: string
): Promise<string> {
  const openai = getClient();
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an AP CS A tutor. Explain why the student's answer is wrong and why the correct answer is right. Be concise and educational. 2-3 sentences max.",
      },
      {
        role: "user",
        content: `Question: ${question}\nStudent answered: ${studentAnswer}\nCorrect answer: ${correctAnswer}`,
      },
    ],
    max_tokens: 200,
  });
  return response.choices[0]?.message?.content || "Unable to generate explanation.";
}
