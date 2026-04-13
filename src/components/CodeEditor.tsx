"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  initialCode: string;
  onRun?: (code: string) => void;
  onChange?: (code: string) => void;
  output?: string;
  running?: boolean;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  initialCode,
  onRun,
  onChange,
  output,
  running = false,
  height = "300px",
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  const handleChange = useCallback(
    (value: string | undefined) => {
      const v = value ?? "";
      setCode(v);
      onChange?.(v);
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      <div className="border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-secondary/50 border-b">
          <span className="text-xs font-medium text-muted-foreground">Java</span>
          {onRun && (
            <Button size="sm" onClick={() => onRun(code)} disabled={running}>
              {running ? (
                <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Running...</>
              ) : (
                <><Play className="h-3 w-3 mr-1" /> Run</>
              )}
            </Button>
          )}
        </div>
        <MonacoEditor
          height={height}
          defaultLanguage="java"
          value={code}
          onChange={handleChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly,
            tabSize: 4,
          }}
        />
      </div>

      {output !== undefined && (
        <div className="border rounded-lg">
          <div className="px-3 py-2 bg-secondary/50 border-b">
            <span className="text-xs font-medium text-muted-foreground">Output</span>
          </div>
          <pre className="p-3 text-sm font-mono whitespace-pre-wrap max-h-48 overflow-auto">
            {output || "(no output)"}
          </pre>
        </div>
      )}
    </div>
  );
}
