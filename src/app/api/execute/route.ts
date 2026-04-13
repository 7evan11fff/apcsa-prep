import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { writeFile, mkdir, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";

const TIMEOUT_MS = 10000;

async function executeLocal(code: string): Promise<{ stdout: string; stderr: string; exitCode: number; timedOut: boolean }> {
  const id = randomUUID();
  const dir = join(tmpdir(), `apcsa-${id}`);

  await mkdir(dir, { recursive: true });

  const classMatch = code.match(/public\s+class\s+(\w+)/);
  const className = classMatch ? classMatch[1] : "Main";
  const filename = `${className}.java`;

  await writeFile(join(dir, filename), code);

  return new Promise((resolve) => {
    exec(
      `cd "${dir}" && javac ${filename} 2>&1 && java -cp . ${className} 2>&1`,
      { timeout: TIMEOUT_MS },
      (error, stdout, stderr) => {
        rm(dir, { recursive: true, force: true }).catch(() => {});

        if (error && (error as unknown as { killed?: boolean }).killed) {
          resolve({ stdout: stdout || "", stderr: "Execution timed out (10s limit)", exitCode: 1, timedOut: true });
        } else {
          resolve({
            stdout: stdout || "",
            stderr: stderr || "",
            exitCode: error ? error.code || 1 : 0,
            timedOut: false,
          });
        }
      }
    );
  });
}

async function executeWandbox(code: string): Promise<{ stdout: string; stderr: string; exitCode: number; timedOut: boolean }> {
  const adapted = code.replace(/public\s+class\s+/g, "class ");

  const response = await fetch("https://wandbox.org/api/compile.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: adapted,
      compiler: "openjdk-jdk-22+36",
      save: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Wandbox API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.compiler_error) {
    return {
      stdout: "",
      stderr: data.compiler_error,
      exitCode: 1,
      timedOut: false,
    };
  }

  return {
    stdout: data.program_output || "",
    stderr: data.program_error || "",
    exitCode: parseInt(data.status || "0", 10),
    timedOut: false,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    if (code.length > 50000) {
      return NextResponse.json({ error: "Code too long" }, { status: 400 });
    }

    let localResult;
    try {
      localResult = await executeLocal(code);
    } catch {
      localResult = null;
    }

    const allOutput = (localResult?.stdout || "") + (localResult?.stderr || "");
    const localFailed = !localResult ||
      allOutput.includes("Unable to locate a Java Runtime") ||
      allOutput.includes("javac: not found") ||
      allOutput.includes("No Java runtime") ||
      allOutput.includes("java: not found") ||
      allOutput.includes("command not found");

    if (!localFailed) {
      return NextResponse.json(localResult);
    }

    try {
      const cloudResult = await executeWandbox(code);
      return NextResponse.json(cloudResult);
    } catch (cloudErr) {
      return NextResponse.json(
        { stdout: "", stderr: `Java is not installed locally and the cloud executor is unavailable. Install Java from https://adoptium.net or try again later.`, exitCode: 1, timedOut: false },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { stdout: "", stderr: `Execution failed: ${error instanceof Error ? error.message : "Unknown error"}`, exitCode: 1, timedOut: false },
      { status: 500 }
    );
  }
}
