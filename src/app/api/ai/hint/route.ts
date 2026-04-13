import { NextRequest, NextResponse } from "next/server";
import { getHint } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { code, exercise, hintLevel } = await request.json();

    if (!code || !exercise) {
      return NextResponse.json({ error: "Code and exercise are required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ hint: "AI hints unavailable. Add your OpenAI API key to .env.local." });
    }

    const hint = await getHint(code, exercise, hintLevel || 1);
    return NextResponse.json({ hint });
  } catch (error) {
    return NextResponse.json(
      { hint: `Error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
