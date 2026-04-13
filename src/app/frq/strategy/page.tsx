"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FRQStrategyPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/frq" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> FRQ Workshop
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">FRQ Strategy Guide</h1>
        <p className="text-muted-foreground">Master the approach to maximize your FRQ score.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>The 6-Step FRQ Approach</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { step: 1, title: "Read & Mark Requirements", desc: "Identify the return type, parameters, preconditions, and any side effects. Underline key requirements." },
            { step: 2, title: "Sketch Inputs & Outputs", desc: "Work through the given examples by hand. Write down what the input looks like and what the expected output should be." },
            { step: 3, title: "Identify Data Structures", desc: "Determine which arrays, ArrayLists, or other structures you need. Note if you need temporary variables." },
            { step: 4, title: "Write Pseudocode", desc: "Outline your algorithm in plain English or brief comments before writing Java code." },
            { step: 5, title: "Implement in Java", desc: "Write your code. Focus on correctness first, then clean it up. Use meaningful variable names." },
            { step: 6, title: "Trace One Example", desc: "Walk through your code with one of the given examples. Check that each line does what you expect." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                {step}
              </div>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Rubric Scoring — How Points Are Awarded</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm mb-4">Each FRQ is worth 9 points. The rubric awards points for specific elements:</p>

          <Accordion type="multiple">
            <AccordionItem value="penalties">
              <AccordionTrigger>1-Point Penalties (max 3 per question)</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p className="text-sm">Each of these costs 1 point, deducted from earned credit only:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li><strong>Array/collection confusion</strong> — using [] when you need .get(), or vice versa</li>
                  <li><strong>Extraneous side-effect code</strong> — printing output when not asked, checking preconditions incorrectly</li>
                  <li><strong>Undeclared local variables</strong> — using a variable without declaring its type</li>
                  <li><strong>Destroying persistent data</strong> — modifying parameter values when you shouldn&apos;t</li>
                  <li><strong>Void method returning a value</strong> — or constructor returning a value</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="no-penalty">
              <AccordionTrigger>Things That Earn No Penalty</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Missing semicolons (if intent is clear)</li>
                  <li>Minor spelling/capitalization errors (if unambiguous)</li>
                  <li>Extraneous code that has no side effect</li>
                  <li>Using = instead of == in a <em>clearly intentional</em> context</li>
                  <li>Confusing .length vs .length() vs .size() in some contexts</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Type-Specific Patterns</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { type: 1, title: "Methods & Control Structures", patterns: ["Single-pass accumulator (sum, count, min/max)", "String traversal with charAt()", "Conditional branching with multiple cases", "Method decomposition — call helper methods"] },
              { type: 2, title: "Class Design", patterns: ["Private instance variables", "Constructor that initializes all fields with this", "Getter methods return field values", "Setter methods with validation", "toString() for formatted output"] },
              { type: 3, title: "ArrayList Operations", patterns: ["Backward traversal for removal", "Use get(), set(), add(), remove()", "Build-and-return new ArrayList", "Filter pattern: check condition before adding"] },
              { type: 4, title: "2D Array Traversal", patterns: ["Nested for loops: outer = rows, inner = columns", "grid.length for rows, grid[r].length for columns", "Row-major vs column-major order", "Accumulate per-row or per-column values"] },
            ].map(({ type, title, patterns }) => (
              <div key={type} className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Type {type}</Badge>
                  <h4 className="font-medium text-sm">{title}</h4>
                </div>
                <ul className="list-disc pl-5 text-xs space-y-1 text-muted-foreground">
                  {patterns.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
