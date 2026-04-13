export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  timedOut: boolean;
}

export async function executeJava(code: string): Promise<ExecutionResult> {
  try {
    const res = await fetch("/api/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (!res.ok) {
      return { stdout: "", stderr: `Server error: ${res.status}`, exitCode: 1, timedOut: false };
    }
    return await res.json();
  } catch (err) {
    return {
      stdout: "",
      stderr: `Network error: ${err instanceof Error ? err.message : "Unknown error"}`,
      exitCode: 1,
      timedOut: false,
    };
  }
}

export function validateTestCases(
  output: string,
  testCases: { input: string; expectedOutput: string; description: string }[]
): { passed: number; total: number; results: { description: string; expected: string; actual: string; passed: boolean }[] } {
  const lines = output.trim().split("\n");
  const results = testCases.map((tc, i) => {
    const actual = (lines[i] || "").trim();
    const expected = tc.expectedOutput.trim();
    return {
      description: tc.description,
      expected,
      actual,
      passed: actual === expected,
    };
  });

  return {
    passed: results.filter((r) => r.passed).length,
    total: results.length,
    results,
  };
}
