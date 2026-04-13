import { NextRequest, NextResponse } from "next/server";
import { scoreFRQ } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { code, problem } = await request.json();

    if (!code || !problem) {
      return NextResponse.json({ error: "Code and problem are required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        totalScore: 0,
        maxScore: 9,
        rubricResults: [],
        overallFeedback: "AI scoring unavailable. Add your OpenAI API key to .env.local.",
      });
    }

    const result = await scoreFRQ(code, problem);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Scoring error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
