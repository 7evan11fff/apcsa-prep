import type { PracticeExam, ExamMCQ } from "@/types";

const exam1MCQs: ExamMCQ[] = [
  { id: "e1-q1", topicId: "primitive-types", prompt: "What is the value of 5 / 2 in Java?", options: ["2.5", "2", "3", "2.0"], correctIndex: 1, explanation: "Integer division truncates. 5/2 = 2." },
  { id: "e1-q2", topicId: "variables-and-operators", prompt: "What is the value of 10 % 3?", options: ["3", "1", "0", "3.33"], correctIndex: 1, explanation: "10 % 3 = 1 (remainder of 10/3)." },
  { id: "e1-q3", topicId: "type-casting", prompt: "What does (int) 4.9 evaluate to?", options: ["5", "4", "4.0", "Error"], correctIndex: 1, explanation: "Casting to int truncates, does not round." },
  { id: "e1-q4", topicId: "string-basics", prompt: "What does \"Java\" + 1 + 2 produce?", options: ["Java3", "Java12", "Java 1 2", "Error"], correctIndex: 1, explanation: "Left to right: \"Java\"+1=\"Java1\", then \"Java1\"+2=\"Java12\"." },
  { id: "e1-q5", topicId: "string-methods", prompt: "What does \"Hello\".substring(1,3) return?", options: ["\"He\"", "\"el\"", "\"ell\"", "\"lo\""], correctIndex: 1, explanation: "substring(1,3) returns chars at indices 1,2 = \"el\"." },
  { id: "e1-q6", topicId: "boolean-expressions", prompt: "What does 5 > 3 && 2 > 4 evaluate to?", options: ["true", "false", "Error", "null"], correctIndex: 1, explanation: "5>3 is true but 2>4 is false. true && false = false." },
  { id: "e1-q7", topicId: "if-statements", prompt: "What prints?\nint x = 5;\nif (x > 10) System.out.print(\"A\");\nelse if (x > 3) System.out.print(\"B\");\nelse System.out.print(\"C\");", options: ["A", "B", "C", "AB"], correctIndex: 1, explanation: "x=5. x>10 false. x>3 true, so B prints." },
  { id: "e1-q8", topicId: "compound-boolean", prompt: "By De Morgan's Law, !(a || b) equals:", options: ["!a || !b", "!a && !b", "a && b", "!(a && b)"], correctIndex: 1, explanation: "De Morgan's: !(a||b) = !a && !b." },
  { id: "e1-q9", topicId: "for-loops", prompt: "How many times does this loop execute?\nfor (int i = 0; i < 10; i += 3)", options: ["3", "4", "10", "Infinite"], correctIndex: 1, explanation: "i goes 0,3,6,9 → 4 iterations." },
  { id: "e1-q10", topicId: "while-loops", prompt: "What does this print?\nint n = 1;\nwhile (n < 10) n *= 2;\nSystem.out.print(n);", options: ["8", "16", "10", "32"], correctIndex: 1, explanation: "n: 1→2→4→8→16. At 16, n<10 is false. Prints 16." },
  { id: "e1-q11", topicId: "nested-loops", prompt: "How many * are printed?\nfor (int i=0;i<3;i++)\n  for (int j=0;j<2;j++)\n    System.out.print(\"*\");", options: ["5", "6", "8", "3"], correctIndex: 1, explanation: "3 outer × 2 inner = 6 total." },
  { id: "e1-q12", topicId: "array-basics", prompt: "What is the default value of new boolean[3][0]?", options: ["true", "false", "null", "0"], correctIndex: 1, explanation: "boolean arrays default to false." },
  { id: "e1-q13", topicId: "array-traversal", prompt: "Which loop correctly prints all elements of int[] arr?", options: ["for(int i=0;i<=arr.length;i++)", "for(int i=0;i<arr.length;i++)", "for(int i=1;i<arr.length;i++)", "for(int i=0;i<arr.length();i++)"], correctIndex: 1, explanation: "Use i < arr.length (not <= and length not length())." },
  { id: "e1-q14", topicId: "arraylist-basics", prompt: "After list.add(1, \"X\") on [\"A\",\"B\",\"C\"], the list is:", options: ["[\"X\",\"A\",\"B\",\"C\"]", "[\"A\",\"X\",\"B\",\"C\"]", "[\"A\",\"B\",\"X\",\"C\"]", "[\"A\",\"X\",\"C\"]"], correctIndex: 1, explanation: "add(1, \"X\") inserts at index 1, shifting others right." },
  { id: "e1-q15", topicId: "class-anatomy", prompt: "Which access modifier provides the best encapsulation for instance variables?", options: ["public", "private", "protected", "default"], correctIndex: 1, explanation: "private hides data; access via public getters/setters." },
  { id: "e1-q16", topicId: "constructors", prompt: "What happens if you define a parameterized constructor but no default constructor?", options: ["Java provides one", "Compile error on new MyClass()", "Runtime error", "Nothing"], correctIndex: 1, explanation: "Once you define any constructor, Java's default is gone." },
  { id: "e1-q17", topicId: "static-members", prompt: "A static method can access:", options: ["Both static and instance variables", "Only instance variables", "Only static variables and methods", "Nothing"], correctIndex: 2, explanation: "Static methods can't access instance members (no this)." },
  { id: "e1-q18", topicId: "linear-search", prompt: "Linear search has time complexity:", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctIndex: 2, explanation: "It checks elements one by one, worst case n checks." },
  { id: "e1-q19", topicId: "binary-search", prompt: "Binary search requires:", options: ["Unsorted array", "Sorted array", "ArrayList only", "Linked list"], correctIndex: 1, explanation: "Binary search only works on sorted data." },
  { id: "e1-q20", topicId: "selection-sort", prompt: "Selection sort's time complexity is:", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctIndex: 2, explanation: "Two nested loops, both proportional to n → O(n²)." },
  { id: "e1-q21", topicId: "string-iteration", prompt: "What does this return?\nString s = \"abcde\";\nString r = \"\";\nfor(int i=s.length()-1;i>=0;i--) r+=s.charAt(i);", options: ["\"abcde\"", "\"edcba\"", "\"a\"", "Error"], correctIndex: 1, explanation: "Builds string backwards: e,d,c,b,a → \"edcba\"." },
  { id: "e1-q22", topicId: "wrapper-classes", prompt: "What is autoboxing?", options: ["Converting String to int", "Automatic conversion from primitive to wrapper", "Explicit casting", "Converting Object to String"], correctIndex: 1, explanation: "Autoboxing: int → Integer automatically." },
  { id: "e1-q23", topicId: "math-class", prompt: "Math.abs(-7) returns:", options: ["-7", "7", "7.0", "0"], correctIndex: 1, explanation: "abs() returns absolute value: |-7| = 7." },
  { id: "e1-q24", topicId: "scope-and-access", prompt: "A variable declared inside a for loop is accessible:", options: ["Everywhere in the class", "In the method", "Only inside the loop", "In the file"], correctIndex: 2, explanation: "Loop variables have loop scope only." },
  { id: "e1-q25", topicId: "this-keyword", prompt: "'this' refers to:", options: ["The class", "The current object", "The superclass", "A static reference"], correctIndex: 1, explanation: "this refers to the current instance of the class." },
  { id: "e1-q26", topicId: "loop-algorithms", prompt: "To find the average of an int array, you should:", options: ["Sum and divide using int division", "Sum and divide, casting to double", "Use Math.average()", "Sort first then take middle"], correctIndex: 1, explanation: "Cast sum to double before dividing to avoid truncation." },
  { id: "e1-q27", topicId: "code-tracing", prompt: "What prints?\nint a = 3, b = 5;\na = a + b;\nb = a - b;\na = a - b;\nSystem.out.print(a + \" \" + b);", options: ["3 5", "5 3", "8 3", "5 8"], correctIndex: 1, explanation: "This swaps a and b without a temp variable. Result: 5 3." },
  { id: "e1-q28", topicId: "array-algorithms", prompt: "What does this compute for {3,1,4,1,5}?\nint r=arr[0]; for(int v:arr) if(v<r) r=v;", options: ["Maximum", "Minimum", "Sum", "Average"], correctIndex: 1, explanation: "Finds minimum: updates r when a smaller value is found." },
  { id: "e1-q29", topicId: "arraylist-traversal", prompt: "What exception occurs when modifying an ArrayList during a for-each loop?", options: ["IndexOutOfBoundsException", "NullPointerException", "ConcurrentModificationException", "ClassCastException"], correctIndex: 2, explanation: "Structural modification during for-each throws ConcurrentModificationException." },
  { id: "e1-q30", topicId: "2d-array-basics", prompt: "For int[][] m = new int[3][4], m.length is:", options: ["3", "4", "12", "7"], correctIndex: 0, explanation: "m.length = number of rows = 3. m[0].length = columns = 4." },
  { id: "e1-q31", topicId: "2d-array-traversal", prompt: "To traverse a 2D array in row-major order:", options: ["Outer loop columns, inner loop rows", "Outer loop rows, inner loop columns", "Single loop with modulo", "Enhanced for loop only"], correctIndex: 1, explanation: "Row-major: outer = rows (i), inner = columns (j)." },
  { id: "e1-q32", topicId: "conditional-logic", prompt: "What does short-circuit evaluation mean for false && f()?", options: ["f() runs, result is false", "f() is NOT called, result is false", "Compiler error", "Runtime error"], correctIndex: 1, explanation: "false && anything = false. Java skips evaluating f()." },
  { id: "e1-q33", topicId: "method-decomposition", prompt: "Why decompose code into multiple methods?", options: ["Runs faster", "Uses less memory", "Improves readability and reusability", "Required by Java"], correctIndex: 2, explanation: "Decomposition improves organization, readability, and code reuse." },
  { id: "e1-q34", topicId: "accessor-methods", prompt: "An accessor method should:", options: ["Modify and return a value", "Return a value without modifying state", "Always return void", "Take no parameters ever"], correctIndex: 1, explanation: "Accessors (getters) return data without side effects." },
  { id: "e1-q35", topicId: "mutator-methods", prompt: "A mutator method typically:", options: ["Returns the field value", "Changes one or more instance variables", "Is always private", "Cannot have parameters"], correctIndex: 1, explanation: "Mutators (setters) modify the object's state." },
  { id: "e1-q36", topicId: "instance-variables", prompt: "If a String instance variable is not initialized in the constructor, its default value is:", options: ["\"\"", "null", "0", "undefined"], correctIndex: 1, explanation: "Object reference instance variables default to null." },
  { id: "e1-q37", topicId: "insertion-sort", prompt: "Insertion sort works by:", options: ["Finding the min and swapping to front", "Inserting each element into its sorted position", "Dividing and merging", "Random shuffling"], correctIndex: 1, explanation: "Insertion sort maintains a sorted portion and inserts elements one by one." },
  { id: "e1-q38", topicId: "arraylist-algorithms", prompt: "To safely remove elements from an ArrayList while iterating:", options: ["Use for-each and remove()", "Use forward index loop", "Use backward index loop", "Use iterator.add()"], correctIndex: 2, explanation: "Backward loop avoids skipping elements when indices shift after removal." },
  { id: "e1-q39", topicId: "object-construction", prompt: "new Scanner(System.in) creates:", options: ["A class", "A method", "An object", "A variable"], correctIndex: 2, explanation: "The new keyword creates a new object instance." },
  { id: "e1-q40", topicId: "primitive-types", prompt: "Which stores more precision?", options: ["int", "double", "boolean", "They're equal"], correctIndex: 1, explanation: "double is 64-bit floating point; int is 32-bit integer." },
  { id: "e1-q41", topicId: "string-methods", prompt: "\"Hello\".compareTo(\"Help\") returns:", options: ["0", "A negative number", "A positive number", "Error"], correctIndex: 1, explanation: "Compares char by char. 'l' < 'p', so negative value." },
  { id: "e1-q42", topicId: "for-loops", prompt: "What is the output?\nfor(int i=10;i>0;i/=2) System.out.print(i+\" \");", options: ["10 5 2 1", "10 5 2 1 0", "10 5", "Infinite loop"], correctIndex: 0, explanation: "i: 10→5→2→1→0. At 0, i>0 is false. Prints 10 5 2 1." },
];

const exams: PracticeExam[] = [
  {
    id: "practice-exam-1",
    title: "Practice Exam 1",
    description: "Full-length AP CS A practice exam with 42 MCQs and 4 FRQs, matching the 2026 format.",
    mcqQuestions: exam1MCQs,
    frqQuestions: ["frq-methods-1", "frq-class-1", "frq-arraylist-1", "frq-2darray-1"],
    mcqTimeMinutes: 90,
    frqTimeMinutes: 90,
  },
  {
    id: "practice-exam-2",
    title: "Practice Exam 2",
    description: "Second full-length practice exam. Covers all 4 units with emphasis on Unit 3 (Class Creation) and Unit 4 (Data Collections).",
    mcqQuestions: exam1MCQs.map((q, i) => ({
      ...q,
      id: `e2-q${i + 1}`,
    })).sort(() => Math.random() - 0.5).slice(0, 42),
    frqQuestions: ["frq-methods-2", "frq-class-2", "frq-arraylist-2", "frq-2darray-2"],
    mcqTimeMinutes: 90,
    frqTimeMinutes: 90,
  },
];

export function getExamById(id: string): PracticeExam | undefined {
  return exams.find((e) => e.id === id);
}

export function getAllExams(): PracticeExam[] {
  return exams;
}
