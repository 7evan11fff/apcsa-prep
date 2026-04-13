import { NextRequest, NextResponse } from "next/server";
import { getCodeFeedback } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { code, exercise } = await request.json();

    if (!code || !exercise) {
      return NextResponse.json({ error: "Code and exercise are required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        feedback: "AI feedback is not available. Please add your OpenAI API key to .env.local to enable this feature.",
      });
    }

    const feedback = await getCodeFeedback(code, exercise);
    return NextResponse.json({ feedback });
  } catch (error) {
    return NextResponse.json(
      { feedback: `AI feedback error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
