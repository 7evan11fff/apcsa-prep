import type { LessonSection, CodingChallenge } from "@/types";

const lessons: Record<string, { sections: LessonSection[] }> = {
  // ============================================================
  // UNIT 1: Using Objects and Methods
  // ============================================================

  "primitive-types": {
    sections: [
      {
        title: "What Are Primitive Types?",
        content: `Java has **three primitive types** you need to know for the AP exam:

- \`int\` — whole numbers (e.g., \`42\`, \`-7\`, \`0\`)
- \`double\` — decimal numbers (e.g., \`3.14\`, \`-0.5\`)
- \`boolean\` — true or false values

Primitives store **actual values** directly in memory, unlike objects which store references.

\`\`\`java
int age = 17;
double gpa = 3.85;
boolean isAPStudent = true;
\`\`\`

Each type has a **fixed size** in memory and a **range** of valid values. Choosing the right type matters — you can't store a decimal in an int, and you can't store a number in a boolean.`,
      },
      {
        title: "int — Whole Numbers",
        content: `The \`int\` type stores whole numbers from **-2,147,483,648** to **2,147,483,647** (about ±2.1 billion).

\`\`\`java
int score = 100;
int temperature = -15;
int population = 1000000;
\`\`\`

**Key facts:**
- Takes 4 bytes (32 bits) of memory
- **Integer overflow**: if you exceed the max value, it wraps around to the negative side
- Division between two ints **truncates** the decimal: \`7 / 2\` gives \`3\`, not \`3.5\`

\`\`\`java
int result = 7 / 2;    // result is 3, not 3.5
int big = Integer.MAX_VALUE;  // 2147483647
int overflow = big + 1;       // -2147483648 (overflow!)
\`\`\`

**Common AP mistake:** Students forget that \`int / int\` always gives an \`int\`. If you need a decimal result, at least one operand must be a \`double\`.`,
        codingChallenge: {
          instructions: "Declare two int variables: a = 10, b = 3. Print the result of a / b on one line and a % b on the next. Predict the output before you run it!",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Declare a = 10 and b = 3\n\n        // Print a / b\n\n        // Print a % b\n\n    }\n}`,
          expectedOutputContains: "3\n1",
          hint: "int a = 10; int b = 3; System.out.println(a / b); System.out.println(a % b); — remember int division truncates!",
        },
      },
      {
        title: "double — Decimal Numbers",
        content: `The \`double\` type stores decimal (floating-point) numbers with about 15 digits of precision.

\`\`\`java
double price = 19.99;
double pi = 3.14159265358979;
double tiny = 0.001;
\`\`\`

**Key facts:**
- Takes 8 bytes (64 bits) of memory
- Can represent very large and very small numbers
- **Floating-point imprecision**: \`0.1 + 0.2\` may not equal exactly \`0.3\`
- When you mix int and double in arithmetic, the result is a double

\`\`\`java
double result = 7.0 / 2;  // 3.5 (one operand is double)
double sum = 0.1 + 0.2;   // 0.30000000000000004 (imprecision!)
\`\`\`

**Why imprecision?** Computers store numbers in binary. Just like 1/3 can't be perfectly represented in decimal (0.333...), some decimal fractions can't be perfectly represented in binary.`,
        codingChallenge: {
          instructions: "Print the result of 0.1 + 0.2 on one line, and then print whether (0.1 + 0.2 == 0.3) on the next line. You'll see something surprising!",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println(0.1 + 0.2);\n        System.out.println(0.1 + 0.2 == 0.3);\n    }\n}`,
          expectedOutputContains: "false",
          hint: "Due to floating-point imprecision, 0.1 + 0.2 is 0.30000000000000004, which is NOT equal to 0.3.",
        },
      },
      {
        title: "boolean — True/False",
        content: `The \`boolean\` type holds exactly one of two values: \`true\` or \`false\`.

\`\`\`java
boolean isRaining = true;
boolean hasPassedExam = false;
boolean isEligible = (age >= 18);
\`\`\`

Booleans are essential for:
- **Conditional statements** (\`if\`/\`else\`)
- **Loop conditions** (\`while\`, \`for\`)
- **Logical expressions**

Unlike some languages, Java does **not** treat \`0\` as false or \`1\` as true. Only \`true\` and \`false\` are valid boolean values.

\`\`\`java
boolean a = true;
boolean b = false;
boolean c = (5 > 3);  // true
boolean d = (5 == 3); // false
\`\`\`

**AP Tip:** Boolean expressions are the foundation of all control flow. If you master booleans, conditionals and loops become much easier.`,
      },
    ],
  },

  "variables-and-operators": {
    sections: [
      {
        title: "Declaring and Initializing Variables",
        content: `A **variable** is a named storage location in memory. To use a variable in Java, you must **declare** it with a type and **initialize** it with a value.

\`\`\`java
// Declaration and initialization in one line
int count = 0;
double average = 85.5;
boolean done = false;

// Declaration first, assignment later
int x;
x = 10;
\`\`\`

**Rules for variable names:**
- Must start with a letter, \`_\`, or \`$\`
- Cannot be a Java keyword (\`int\`, \`class\`, \`if\`, etc.)
- Case-sensitive: \`score\` and \`Score\` are different variables
- Convention: use **camelCase** (\`totalScore\`, \`isValid\`, \`firstName\`)

\`\`\`java
// Good names
int studentAge = 17;
double examScore = 92.5;
boolean isEnrolled = true;

// Bad names (but technically valid)
int x = 17;        // not descriptive
int MYVAR = 17;    // not camelCase
\`\`\``,
        codingChallenge: {
          instructions: "Declare three variables: an int called 'year' set to 2026, a double called 'pi' set to 3.14159, and a boolean called 'ready' set to true. Print each on its own line.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Declare year, pi, and ready\n\n        // Print each variable\n\n    }\n}`,
          expectedOutputContains: "2026",
          hint: "int year = 2026; double pi = 3.14159; boolean ready = true; Then use System.out.println() for each.",
        },
      },
      {
        title: "Arithmetic Operators",
        content: `Java supports five arithmetic operators:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Subtraction | \`5 - 3\` | \`2\` |
| \`*\` | Multiplication | \`5 * 3\` | \`15\` |
| \`/\` | Division | \`7 / 2\` | \`3\` (int!) |
| \`%\` | Modulus (remainder) | \`7 % 2\` | \`1\` |

**Integer division** is the #1 trap on the AP exam. When both operands are int, the result is int (decimal truncated):
\`\`\`java
7 / 2      // 3 (not 3.5!)
7 / 2.0    // 3.5 (one operand is double, so result is double)
\`\`\`

**Modulus** (\`%\`) gives the remainder after division. This is incredibly useful:
\`\`\`java
17 % 5    // 2 (17 = 5×3 + 2)
10 % 2    // 0 (10 is evenly divisible by 2)
7 % 10    // 7 (7 < 10, so remainder is 7 itself)

// Common uses:
num % 2 == 0   // true if num is even
num % 10       // last digit of num
num / 10       // removes last digit of num
\`\`\``,
        codingChallenge: {
          instructions: "Calculate and print how many whole hours are in 200 minutes (use /) and how many minutes are left over (use %). Print each on its own line. Expected: 3 then 20.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int totalMinutes = 200;\n        // Calculate hours (totalMinutes / 60)\n        // Calculate remaining minutes (totalMinutes % 60)\n        // Print both\n    }\n}`,
          expectedOutputContains: "3\n20",
          hint: "System.out.println(totalMinutes / 60); gives 3 (integer division). System.out.println(totalMinutes % 60); gives 20 (remainder).",
        },
      },
      {
        title: "Assignment and Compound Operators",
        content: `The **assignment operator** \`=\` stores a value in a variable. Java also has **compound assignment** operators:

\`\`\`java
int x = 10;
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x %= 4;   // x = x % 4  → 2
\`\`\`

**Increment** and **decrement** operators:
\`\`\`java
int count = 5;
count++;  // count = 6 (add 1)
count--;  // count = 5 (subtract 1)
\`\`\`

**Order of operations** (just like math — PEMDAS):
1. Parentheses \`()\`
2. Multiplication \`*\`, Division \`/\`, Modulus \`%\` (left to right)
3. Addition \`+\`, Subtraction \`-\` (left to right)

\`\`\`java
int result = 2 + 3 * 4;      // 14 (not 20! multiply first)
int result2 = (2 + 3) * 4;   // 20 (parentheses override)
\`\`\`

**AP Tip:** When in doubt, add parentheses to make your intent clear. It prevents bugs and makes code easier to read.`,
      },
    ],
  },

  "type-casting": {
    sections: [
      {
        title: "Implicit and Explicit Casting",
        content: `**Type casting** converts a value from one type to another.

**Implicit (widening) casting** happens automatically — int to double is safe:
\`\`\`java
int x = 42;
double y = x;  // automatic: 42 → 42.0 (no data lost)
\`\`\`

**Explicit (narrowing) casting** requires you to write a cast — double to int loses data:
\`\`\`java
double price = 19.99;
int rounded = (int) price;  // 19 (truncates, does NOT round!)
\`\`\`

Key point: casting to \`int\` **truncates** (drops the decimal). It does NOT round.
\`\`\`java
(int) 3.1   // 3
(int) 3.9   // 3 (not 4!)
(int) -2.7  // -2 (truncates toward zero)
\`\`\``,
      },
      {
        title: "Casting in Expressions — The AP Exam Trap",
        content: `This is tested on **every AP exam**. When you need decimal division with two ints, cast one operand:

\`\`\`java
int a = 7, b = 2;
double result1 = a / b;          // 3.0 (int division first → 3, then widened to 3.0)
double result2 = (double) a / b; // 3.5 (cast a to 7.0 first, then 7.0 / 2 = 3.5)
double result3 = (double)(a / b); // 3.0 (int division first → 3, then cast to 3.0)
\`\`\`

**The parentheses matter enormously:**
- \`(double) a / b\` — casts \`a\` first, then divides → **3.5** ✓
- \`(double)(a / b)\` — divides first (truncates!), then casts → **3.0** ✗

This is the most commonly missed question on the AP exam. Practice it!`,
        codingChallenge: {
          instructions: "Given int a = 7 and int b = 2, print three results on separate lines: (1) a / b, (2) (double) a / b, (3) (double)(a / b). Observe the difference!",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 7, b = 2;\n        System.out.println(a / b);\n        System.out.println((double) a / b);\n        System.out.println((double)(a / b));\n    }\n}`,
          expectedOutputContains: "3\n3.5\n3.0",
          hint: "a/b = 3 (int division). (double)a/b = 3.5 (cast first). (double)(a/b) = 3.0 (divide first, then cast).",
        },
      },
    ],
  },

  "string-basics": {
    sections: [
      {
        title: "Creating Strings",
        content: `A \`String\` is a **sequence of characters** enclosed in double quotes. Unlike primitives, String is a **reference type** (an object).

\`\`\`java
String greeting = "Hello, World!";
String name = "Alice";
String empty = "";      // empty string (length 0)
String space = " ";     // string with one space
\`\`\`

Strings are **immutable** — once created, their characters cannot be changed. Any operation that appears to modify a String actually creates a new one.

\`\`\`java
String s = "Hello";
s = s + " World";  // creates a NEW String "Hello World"
                    // the original "Hello" is abandoned
\`\`\`

**String vs char:** Double quotes create Strings, single quotes create chars:
\`\`\`java
String s = "A";   // String object containing one character
char c = 'A';     // primitive char value
// "A" and 'A' are different types!
\`\`\``,
      },
      {
        title: "String Concatenation",
        content: `Use \`+\` to concatenate (join) strings:

\`\`\`java
String first = "AP";
String second = "CSA";
String combined = first + " " + second;  // "AP CSA"
\`\`\`

When you concatenate a String with a non-String, Java automatically converts the non-String to a String:

\`\`\`java
int score = 95;
String message = "Score: " + score;  // "Score: 95"
\`\`\`

**Watch the order!** This is a classic AP exam trap:
\`\`\`java
System.out.println(1 + 2 + " apples");  // "3 apples" (1+2 = 3 first, then concat)
System.out.println("apples " + 1 + 2);  // "apples 12" (concat left-to-right)
System.out.println("apples " + (1 + 2)); // "apples 3" (parentheses force addition first)
\`\`\`

The rule: once a String is encountered going left-to-right, everything after is concatenation, not addition.`,
        codingChallenge: {
          instructions: "Create String name = \"Java\" and int version = 17. Print \"I am learning Java version 17!\" using concatenation with +.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        String name = "Java";\n        int version = 17;\n        // Print: I am learning Java version 17!\n    }\n}`,
          expectedOutputContains: "I am learning Java version 17!",
          hint: "System.out.println(\"I am learning \" + name + \" version \" + version + \"!\");",
        },
      },
      {
        title: "Comparing Strings",
        content: `**Never use \`==\` to compare String content.** Use \`.equals()\` instead.

\`\`\`java
String a = "hello";
String b = "hello";
String c = new String("hello");

// == checks if both REFERENCES point to the same object
System.out.println(a == b);      // might be true (string pool)
System.out.println(a == c);      // false (different objects!)

// .equals() checks if the CONTENT is the same
System.out.println(a.equals(b)); // true (always)
System.out.println(a.equals(c)); // true (always)
\`\`\`

**Why does this matter?** The AP exam loves to test this. The rule is simple:
- Primitives (int, double, boolean): use \`==\`
- Objects (String, etc.): use \`.equals()\`

\`\`\`java
// This is a BUG — don't do this:
if (name == "Alice") { ... }  // WRONG

// This is correct:
if (name.equals("Alice")) { ... }  // RIGHT
\`\`\``,
      },
    ],
  },

  "string-methods": {
    sections: [
      {
        title: "Essential String Methods",
        content: `Here are the String methods you **must** know for the AP exam:

| Method | Returns | Description |
|--------|---------|-------------|
| \`length()\` | \`int\` | Number of characters |
| \`substring(start)\` | \`String\` | From start to end |
| \`substring(start, end)\` | \`String\` | From start to end-1 |
| \`indexOf(str)\` | \`int\` | First index of str, or -1 |
| \`charAt(index)\` | \`char\` | Character at index |
| \`equals(str)\` | \`boolean\` | Content equality |
| \`compareTo(str)\` | \`int\` | Lexicographic comparison |

\`\`\`java
String s = "Hello World";
s.length()          // 11
s.substring(6)      // "World"
s.substring(0, 5)   // "Hello"
s.indexOf("World")  // 6
s.indexOf("xyz")    // -1 (not found)
s.charAt(0)         // 'H'
s.charAt(4)         // 'o'
\`\`\`

Remember: String indices are **0-based**. The first character is at index 0, the last is at index \`length() - 1\`.`,
      },
      {
        title: "substring() — The Most Tested Method",
        content: `\`substring()\` appears on nearly every AP exam. Master it.

- \`substring(start)\` — returns characters from index \`start\` to the end
- \`substring(start, end)\` — returns characters from index \`start\` to index \`end - 1\`

The **end index is exclusive** — you get characters up to but NOT including the end index.

\`\`\`java
String s = "ABCDEF";
//          012345

s.substring(2)      // "CDEF" (from index 2 to end)
s.substring(2, 4)   // "CD"   (indices 2 and 3 only — NOT 4)
s.substring(0, 1)   // "A"    (just the first character)
s.substring(0, s.length()) // "ABCDEF" (entire string)
s.substring(3, 3)   // ""     (empty string — start equals end)
\`\`\`

**Useful pattern:** \`s.substring(i, i + 1)\` extracts a single character as a String (vs \`charAt(i)\` which returns a char).

**Common mistakes:**
- Forgetting end is exclusive: \`"Hello".substring(1, 3)\` is \`"el"\`, not \`"ell"\`
- Off-by-one: the last valid index is \`length() - 1\`, not \`length()\``,
        codingChallenge: {
          instructions: "Given String s = \"AP Computer Science\", extract and print \"Computer\" using substring(). Then print the length of the full string on a new line.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "AP Computer Science";\n        // Extract "Computer" using substring\n        // Print it\n        // Print the length of s\n    }\n}`,
          expectedOutputContains: "Computer\n19",
          hint: "\"Computer\" starts at index 3 and ends at index 11 (exclusive). s.substring(3, 11). s.length() is 19.",
        },
      },
      {
        title: "indexOf() and compareTo()",
        content: `**indexOf()** finds where a substring first appears:
\`\`\`java
String s = "hello world hello";
s.indexOf("hello")   // 0 (first occurrence)
s.indexOf("world")   // 6
s.indexOf("xyz")     // -1 (not found!)
s.indexOf("o")       // 4 (first 'o')
\`\`\`

Always check for \`-1\` before using the result as an index!

**compareTo()** compares strings lexicographically (dictionary order):
\`\`\`java
"apple".compareTo("banana")  // negative (apple comes before banana)
"banana".compareTo("apple")  // positive (banana comes after apple)
"apple".compareTo("apple")   // 0 (equal)
"Apple".compareTo("apple")   // negative (uppercase < lowercase in Unicode)
\`\`\`

The result tells you the ordering:
- **Negative** → first string comes before second
- **Zero** → strings are equal
- **Positive** → first string comes after second`,
      },
    ],
  },

  "wrapper-classes": {
    sections: [
      {
        title: "What Are Wrapper Classes?",
        content: `Every primitive type in Java has a corresponding **wrapper class** — an object version of that primitive:

| Primitive | Wrapper Class |
|-----------|---------------|
| \`int\` | \`Integer\` |
| \`double\` | \`Double\` |
| \`boolean\` | \`Boolean\` |

Why do these exist? Some parts of Java only work with **objects**, not primitives. Wrapper classes bridge that gap. You'll see exactly where this matters when you learn about data collections later in Unit 4.

For now, the key thing to know is that \`Integer\` and \`Double\` provide useful **static methods and constants**:

\`\`\`java
int max = Integer.MAX_VALUE;         // 2147483647
int min = Integer.MIN_VALUE;         // -2147483648
int n = Integer.parseInt("42");      // converts String "42" → int 42
String s = Integer.toString(99);     // converts int 99 → String "99"
\`\`\`

These are called on the **class** (not on an object) because they're static methods.`,
      },
      {
        title: "Autoboxing and Unboxing",
        content: `Java can automatically convert between primitives and their wrapper objects:

**Autoboxing** — primitive → wrapper (automatic):
\`\`\`java
Integer wrapped = 5;   // Java converts int 5 → Integer object
Double d = 3.14;       // Java converts double 3.14 → Double object
\`\`\`

**Unboxing** — wrapper → primitive (automatic):
\`\`\`java
Integer wrapped = 5;
int x = wrapped;       // Java extracts the int value automatically
\`\`\`

**Converting between Strings and numbers:**
\`\`\`java
// String → int
int age = Integer.parseInt("17");         // 17

// String → double
double price = Double.parseDouble("9.99"); // 9.99

// int → String
String s = Integer.toString(42);          // "42"
String s2 = "" + 42;                      // "42" (concatenation trick)
\`\`\`

**Watch out:** \`Integer.parseInt("abc")\` throws a \`NumberFormatException\` at runtime — the String must contain a valid number.`,
        codingChallenge: {
          instructions: "Convert the String \"123\" to an int, add 77 to it, then convert the result back to a String. Print the final String.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        String numStr = "123";\n        // Convert to int using Integer.parseInt\n        // Add 77\n        // Convert back to String using Integer.toString\n        // Print result\n    }\n}`,
          expectedOutputContains: "200",
          hint: "int num = Integer.parseInt(numStr); num += 77; String result = Integer.toString(num); System.out.println(result);",
        },
      },
    ],
  },

  "math-class": {
    sections: [
      {
        title: "Math Class Methods",
        content: `The \`Math\` class provides static methods for common math operations. No import needed — it's in \`java.lang\`.

| Method | Description | Example | Result |
|--------|-------------|---------|--------|
| \`Math.abs(x)\` | Absolute value | \`Math.abs(-7)\` | \`7\` |
| \`Math.pow(x, y)\` | x to the power y | \`Math.pow(2, 3)\` | \`8.0\` |
| \`Math.sqrt(x)\` | Square root | \`Math.sqrt(25)\` | \`5.0\` |
| \`Math.max(a, b)\` | Larger of two | \`Math.max(3, 7)\` | \`7\` |
| \`Math.min(a, b)\` | Smaller of two | \`Math.min(3, 7)\` | \`3\` |
| \`Math.random()\` | Random [0.0, 1.0) | \`Math.random()\` | \`0.732...\` |

Note that \`Math.pow()\` and \`Math.sqrt()\` return \`double\`, even if the result is a whole number.`,
      },
      {
        title: "Generating Random Numbers",
        content: `\`Math.random()\` returns a random \`double\` in the range **[0.0, 1.0)** — it can be 0.0 but never exactly 1.0.

To get a random integer in a specific range **[min, max]**:
\`\`\`java
// Random int from 1 to 6 (like a die roll)
int die = (int)(Math.random() * 6) + 1;

// General formula: random int from min to max (inclusive)
int rand = (int)(Math.random() * (max - min + 1)) + min;
\`\`\`

**How the formula works:**
1. \`Math.random()\` → a value in [0.0, 1.0)
2. \`* 6\` → scales to [0.0, 6.0)
3. \`(int)\` → truncates to 0, 1, 2, 3, 4, or 5
4. \`+ 1\` → shifts to 1, 2, 3, 4, 5, or 6`,
        codingChallenge: {
          instructions: "Print the absolute value of -42, the square root of 144, and 2 raised to the 10th power, each on its own line.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Print Math.abs(-42)\n        // Print Math.sqrt(144)\n        // Print Math.pow(2, 10)\n    }\n}`,
          expectedOutputContains: "42\n12.0\n1024.0",
          hint: "System.out.println(Math.abs(-42)); System.out.println(Math.sqrt(144)); System.out.println(Math.pow(2, 10));",
        },
      },
    ],
  },

  "object-construction": {
    sections: [
      {
        title: "Creating Objects with new",
        content: `To create an object, use the \`new\` keyword followed by a constructor call:

\`\`\`java
Scanner input = new Scanner(System.in);
String greeting = new String("Hello");
\`\`\`

The \`new\` keyword does three things:
1. **Allocates** memory for the object
2. **Calls** the constructor to initialize it
3. **Returns** a reference to the new object

The variable stores a **reference** (address) to the object, not the object itself. This is different from primitives, which store the actual value.`,
      },
      {
        title: "Static vs Instance Methods",
        content: `Methods come in two flavors:

**Static methods** — called on the **class name**, no object needed:
\`\`\`java
Math.sqrt(16);           // Math.methodName()
Integer.parseInt("42");  // Integer.methodName()
\`\`\`

**Instance methods** — called on an **object** (instance):
\`\`\`java
String s = "Hello";
s.length();              // object.methodName()
s.substring(0, 3);       // object.methodName()
\`\`\`

**How to tell the difference:**
- If you see \`ClassName.method()\` — it's static
- If you see \`variableName.method()\` — it's an instance method
- Static methods don't need you to create an object first`,
        codingChallenge: {
          instructions: "Create a String object s = \"Hello World\". Print its length using the instance method length(), and print Math.max(10, 20) using the static Math method. Two lines of output.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Create String s = "Hello World"\n        // Print s.length() (instance method)\n        // Print Math.max(10, 20) (static method)\n    }\n}`,
          expectedOutputContains: "11\n20",
          hint: "String s = \"Hello World\"; System.out.println(s.length()); System.out.println(Math.max(10, 20));",
        },
      },
    ],
  },

  // ============================================================
  // UNIT 2: Selection and Iteration
  // ============================================================

  "boolean-expressions": {
    sections: [
      {
        title: "Relational Operators",
        content: `Boolean expressions evaluate to \`true\` or \`false\`. Java's **relational operators** compare two values:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`==\` | Equal to | \`5 == 5\` | \`true\` |
| \`!=\` | Not equal to | \`5 != 3\` | \`true\` |
| \`<\` | Less than | \`3 < 5\` | \`true\` |
| \`>\` | Greater than | \`5 > 3\` | \`true\` |
| \`<=\` | Less than or equal | \`5 <= 5\` | \`true\` |
| \`>=\` | Greater than or equal | \`5 >= 3\` | \`true\` |

\`\`\`java
int x = 10;
boolean isPositive = x > 0;     // true
boolean isZero = x == 0;        // false
boolean isSmall = x < 100;      // true
\`\`\`

**Critical mistake:** \`=\` is **assignment**, \`==\` is **comparison**. Writing \`if (x = 5)\` is a bug!`,
        codingChallenge: {
          instructions: "Given int x = 7 and int y = 12, print the results of: x > y, x != y, x <= 7 — each on its own line.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int x = 7, y = 12;\n        System.out.println(x > y);\n        System.out.println(x != y);\n        System.out.println(x <= 7);\n    }\n}`,
          expectedOutputContains: "false\ntrue\ntrue",
          hint: "7 > 12 is false. 7 != 12 is true. 7 <= 7 is true (less than OR equal).",
        },
      },
      {
        title: "Comparing Objects vs Primitives",
        content: `For **primitives** (int, double, boolean), use \`==\` to compare values.

For **objects** (String, etc.), \`==\` checks if they are the **same object in memory**, not if they have the same content. Use \`.equals()\` for content comparison.

\`\`\`java
// Primitives: == compares VALUES
int a = 5, b = 5;
System.out.println(a == b);  // true (same value)

// Strings: == compares REFERENCES (don't use!)
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);      // false (different objects!)
System.out.println(s1.equals(s2)); // true  (same content!)
\`\`\`

**AP Rule:** Always use \`.equals()\` for String comparison. Using \`==\` on Strings is almost always a bug.`,
      },
    ],
  },

  "if-statements": {
    sections: [
      {
        title: "Basic if/else Statements",
        content: `The \`if\` statement executes code only when a condition is \`true\`:

\`\`\`java
int score = 85;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}
// Prints: "B"
\`\`\`

**Key rules:**
- Conditions are checked **top to bottom** — the first true condition wins
- \`else if\` and \`else\` are optional
- Only **one** branch executes in an if/else if/else chain
- Always use **curly braces** even for single-line bodies (prevents bugs)`,
        codingChallenge: {
          instructions: "Write an if/else if/else chain: given int temp = 72, print \"Hot\" if temp >= 90, \"Warm\" if >= 70, \"Cool\" if >= 50, or \"Cold\" otherwise.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int temp = 72;\n        // Write if/else if/else chain\n\n    }\n}`,
          expectedOutputContains: "Warm",
          hint: "if (temp >= 90) print Hot, else if (temp >= 70) print Warm, else if (temp >= 50) print Cool, else print Cold. 72 >= 70 is true → \"Warm\".",
        },
      },
      {
        title: "Nested Conditionals",
        content: `You can nest \`if\` statements inside other \`if\` statements:

\`\`\`java
int age = 16;
boolean hasLicense = true;

if (age >= 16) {
    if (hasLicense) {
        System.out.println("Can drive");
    } else {
        System.out.println("Need a license first");
    }
} else {
    System.out.println("Too young to drive");
}
\`\`\`

Later, when you learn about compound boolean expressions, you'll be able to combine these into a single condition. For now, nesting works perfectly.

**Common AP trap — the "dangling else":**
\`\`\`java
// The else matches the CLOSEST if
if (x > 0)
    if (x > 100)
        System.out.println("Big");
    else
        System.out.println("Small"); // this else goes with the INNER if!
\`\`\`

**Always use braces** to make your intent clear!`,
      },
      {
        title: "Common if/else Mistakes",
        content: `**Mistake 1: Using = instead of ==**
\`\`\`java
if (x = 5) { ... }  // WRONG — assignment, not comparison
if (x == 5) { ... } // RIGHT — comparison
\`\`\`

**Mistake 2: Unnecessary boolean comparison**
\`\`\`java
if (isValid == true) { ... }  // Works but redundant
if (isValid) { ... }          // Better — already a boolean!
\`\`\`

**Mistake 3: Unreachable branches**
\`\`\`java
if (score >= 80) {
    System.out.println("B or better");
} else if (score >= 90) {
    System.out.println("A");  // NEVER REACHED — 90+ already caught above!
}
\`\`\`

**Mistake 4: Using == on Strings**
\`\`\`java
if (name == "Alice") { ... }       // WRONG
if (name.equals("Alice")) { ... }  // RIGHT
\`\`\``,
      },
    ],
  },

  "compound-boolean": {
    sections: [
      {
        title: "Logical Operators: AND, OR, NOT",
        content: `Combine boolean expressions with logical operators:

| Operator | Name | Meaning | Example |
|----------|------|---------|---------|
| \`&&\` | AND | Both must be true | \`a && b\` |
| \`\\|\\|\` | OR | At least one must be true | \`a \\|\\| b\` |
| \`!\` | NOT | Flips true↔false | \`!a\` |

\`\`\`java
int age = 20;
boolean hasID = true;

boolean canEnter = age >= 18 && hasID;    // true (both true)
boolean isTeen = age >= 13 && age <= 19;  // false (20 > 19)
boolean isChild = !(age >= 18);           // false (!true = false)
\`\`\`

**Truth tables** (memorize these):
| a | b | a && b | a \\|\\| b |
|---|---|--------|---------|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |`,
        codingChallenge: {
          instructions: "Given int age = 25 and boolean isStudent = true, print whether the person qualifies for a discount (age < 30 AND isStudent). Then print whether they get free entry (age < 18 OR age > 65).",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int age = 25;\n        boolean isStudent = true;\n        System.out.println(age < 30 && isStudent);\n        System.out.println(age < 18 || age > 65);\n    }\n}`,
          expectedOutputContains: "true\nfalse",
          hint: "25 < 30 is true AND isStudent is true → true. 25 < 18 is false OR 25 > 65 is false → false.",
        },
      },
      {
        title: "Short-Circuit Evaluation",
        content: `Java uses **short-circuit evaluation** — it stops evaluating as soon as the result is determined:

- \`false && anything\` → **false** (right side NOT evaluated)
- \`true || anything\` → **true** (right side NOT evaluated)

This is useful for **preventing errors**:
\`\`\`java
// Safe: if str is null, the right side is never evaluated
if (str != null && str.length() > 0) {
    System.out.println("Not empty");
}
\`\`\`

Without short-circuit evaluation, \`str.length()\` would crash with a NullPointerException when \`str\` is null.`,
      },
      {
        title: "De Morgan's Laws",
        content: `**De Morgan's Laws** let you simplify negated boolean expressions:

- \`!(a && b)\` = \`!a || !b\`
- \`!(a || b)\` = \`!a && !b\`

**In words:** distribute the NOT, and flip AND↔OR.

\`\`\`java
// These pairs are equivalent:
!(x > 5 && y < 10)    ↔    (x <= 5 || y >= 10)
!(x == 0 || y == 0)   ↔    (x != 0 && y != 0)
\`\`\`

**How to apply De Morgan's:**
1. Distribute the \`!\` to each part
2. Flip \`&&\` to \`||\` (or vice versa)
3. Negate each individual condition (flip \`>\` to \`<=\`, \`==\` to \`!=\`, etc.)

De Morgan's Laws appear on **every** AP exam. Practice converting both directions!`,
      },
    ],
  },

  "conditional-logic": {
    sections: [
      {
        title: "Complex Conditional Logic",
        content: `Now that you know if/else and boolean operators, you can write complex conditions:

\`\`\`java
int age = 16;
boolean hasLicense = true;

// Combining conditions with &&
if (age >= 16 && hasLicense) {
    System.out.println("Can drive");
} else if (age >= 16 && !hasLicense) {
    System.out.println("Get a license first");
} else {
    System.out.println("Too young");
}
\`\`\`

**Range checking** — a very common pattern:
\`\`\`java
// Check if x is between 1 and 100 (inclusive)
if (x >= 1 && x <= 100) { ... }

// WRONG: this is NOT valid Java!
// if (1 <= x <= 100) { ... }  // syntax error
\`\`\``,
        codingChallenge: {
          instructions: "Given int score = 85 and boolean extraCredit = true, print \"Pass with honors\" if score >= 90 OR (score >= 80 AND extraCredit is true). Otherwise print \"Regular pass\" if score >= 60. Otherwise \"Fail\".",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        boolean extraCredit = true;\n        // Write your conditional logic\n\n    }\n}`,
          expectedOutputContains: "Pass with honors",
          hint: "if (score >= 90 || (score >= 80 && extraCredit)) → Pass with honors. 85 >= 80 && true → true.",
        },
      },
    ],
  },

  "while-loops": {
    sections: [
      {
        title: "The while Loop",
        content: `A \`while\` loop repeats code as long as a condition is \`true\`:

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
// Output: 0, 1, 2, 3, 4
\`\`\`

**How it works:**
1. Check the condition
2. If true, execute the body
3. Go back to step 1
4. If false, skip the body and continue after the loop

The condition is checked **before** each iteration. If false initially, the body **never** executes.`,
      },
      {
        title: "Common while Loop Patterns",
        content: `**Counting pattern:**
\`\`\`java
int i = 0;
while (i < n) {
    // do something
    i++;
}
\`\`\`

**Sentinel pattern** (loop until a special value):
\`\`\`java
int val = 1;
while (val <= 1000) {
    val *= 2;
}
System.out.println(val);  // 1024 (first power of 2 > 1000)
\`\`\`

**Digit processing pattern:**
\`\`\`java
int num = 12345;
while (num > 0) {
    int digit = num % 10;  // get last digit
    System.out.println(digit);
    num /= 10;             // remove last digit
}
// Prints: 5, 4, 3, 2, 1
\`\`\`

**Infinite loop warning:** If the condition never becomes false, the loop runs forever!
\`\`\`java
// BUG: i never changes, loop runs forever!
int i = 0;
while (i < 5) {
    System.out.println(i);
    // forgot i++!
}
\`\`\``,
        codingChallenge: {
          instructions: "Use a while loop to find and print the first power of 3 that is greater than 500. Start with val = 1 and keep multiplying by 3.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int val = 1;\n        // Keep multiplying by 3 while val <= 500\n\n        System.out.println(val);\n    }\n}`,
          expectedOutputContains: "729",
          hint: "while (val <= 500) { val *= 3; } — val goes 1, 3, 9, 27, 81, 243, 729. 729 > 500 so loop stops.",
        },
      },
    ],
  },

  "for-loops": {
    sections: [
      {
        title: "The for Loop",
        content: `A \`for\` loop repeats code a specific number of times. It has three parts: **initialization**, **condition**, and **update**.

\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// Output: 0, 1, 2, 3, 4
\`\`\`

**How it works:**
1. **Init**: \`int i = 0\` — runs once before the loop starts
2. **Condition**: \`i < 5\` — checked before each iteration; loop stops when false
3. **Body**: executes if condition is true
4. **Update**: \`i++\` — runs after each iteration, then back to step 2

**Common patterns:**
\`\`\`java
// Count from 1 to n
for (int i = 1; i <= n; i++) { ... }

// Count down
for (int i = 10; i >= 1; i--) { ... }

// Skip by 2s
for (int i = 0; i < 20; i += 2) { ... }  // 0, 2, 4, 6, ...
\`\`\``,
        codingChallenge: {
          instructions: "Use a for loop to print the numbers 1 through 10, each on its own line.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Write a for loop: i from 1 to 10\n\n    }\n}`,
          expectedOutputContains: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
          hint: "for (int i = 1; i <= 10; i++) { System.out.println(i); }",
        },
      },
      {
        title: "More for Loop Patterns",
        content: `**Counting down:**
\`\`\`java
for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}
System.out.println("Go!");
\`\`\`

**Stepping by 2:**
\`\`\`java
for (int i = 0; i < 20; i += 2) {
    System.out.print(i + " ");  // 0 2 4 6 8 10 12 14 16 18
}
\`\`\`

**Accumulating a total:**
\`\`\`java
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
System.out.println(sum);  // 5050
\`\`\`

When you learn about arrays and collections later, you'll also use an **enhanced for-each loop** that makes reading data even simpler. For now, master the standard for loop — it's the foundation.`,
        codingChallenge: {
          instructions: "Use a for loop to compute and print the sum of all even numbers from 2 to 20 (2+4+6+...+20).",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        // Loop through even numbers from 2 to 20\n\n        System.out.println(sum);\n    }\n}`,
          expectedOutputContains: "110",
          hint: "for (int i = 2; i <= 20; i += 2) { sum += i; } — steps by 2, so only even numbers.",
        },
      },
    ],
  },

  "loop-algorithms": {
    sections: [
      {
        title: "Standard Loop Algorithms",
        content: `These loop patterns appear on the AP exam constantly. Master them.

**Sum pattern:**
\`\`\`java
int sum = 0;
for (int i = 1; i <= 10; i++) {
    sum += i;
}
System.out.println(sum);  // 55
\`\`\`

**Count pattern:**
\`\`\`java
int count = 0;
for (int i = 1; i <= 20; i++) {
    if (i % 3 == 0) count++;  // count multiples of 3
}
System.out.println(count);  // 6 (3,6,9,12,15,18)
\`\`\`

**Max/Min tracking:**
\`\`\`java
int max = 1;
for (int i = 1; i <= 5; i++) {
    int value = i * i;  // 1, 4, 9, 16, 25
    if (value > max) max = value;
}
System.out.println(max);  // 25
\`\`\`

**Average pattern (watch the cast!):**
\`\`\`java
int sum = 0;
int count = 5;
for (int i = 1; i <= count; i++) {
    sum += i * 10;  // 10, 20, 30, 40, 50
}
double avg = (double) sum / count;  // cast to avoid truncation!
System.out.println(avg);  // 30.0
\`\`\`

The key insight: **initialize** before the loop, **update** inside, **use** after.`,
        codingChallenge: {
          instructions: "Use a for loop to compute and print the sum of all multiples of 5 from 5 to 50 (5+10+15+...+50).",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        // Loop through multiples of 5 from 5 to 50\n\n        System.out.println(sum);\n    }\n}`,
          expectedOutputContains: "275",
          hint: "for (int i = 5; i <= 50; i += 5) { sum += i; } — steps by 5.",
        },
      },
    ],
  },

  "string-iteration": {
    sections: [
      {
        title: "Traversing Strings Character by Character",
        content: `Strings are traversed using a for loop and \`charAt()\`:

\`\`\`java
String s = "Hello";
for (int i = 0; i < s.length(); i++) {
    char ch = s.charAt(i);
    System.out.println(i + ": " + ch);
}
// 0: H, 1: e, 2: l, 3: l, 4: o
\`\`\`

**Building a new String from an existing one:**
\`\`\`java
String original = "Hello World";
String noSpaces = "";
for (int i = 0; i < original.length(); i++) {
    if (original.charAt(i) != ' ') {
        noSpaces += original.charAt(i);
    }
}
System.out.println(noSpaces);  // "HelloWorld"
\`\`\``,
      },
      {
        title: "Common String Algorithms",
        content: `**Reverse a String:**
\`\`\`java
String s = "hello";
String reversed = "";
for (int i = s.length() - 1; i >= 0; i--) {
    reversed += s.charAt(i);
}
System.out.println(reversed);  // "olleh"
\`\`\`

**Count occurrences of a character:**
\`\`\`java
String text = "mississippi";
int count = 0;
for (int i = 0; i < text.length(); i++) {
    if (text.charAt(i) == 's') count++;
}
System.out.println(count);  // 4
\`\`\`

**Check if a string contains only digits:**
\`\`\`java
boolean allDigits = true;
for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);
    if (c < '0' || c > '9') {
        allDigits = false;
    }
}
\`\`\``,
        codingChallenge: {
          instructions: "Count and print how many times the letter 'l' appears in the String \"hello world\". Expected output: 3",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "hello world";\n        int count = 0;\n        // Loop through each character\n        // If it equals 'l', increment count\n\n        System.out.println(count);\n    }\n}`,
          expectedOutputContains: "3",
          hint: "for (int i = 0; i < s.length(); i++) { if (s.charAt(i) == 'l') count++; }",
        },
      },
    ],
  },

  "nested-loops": {
    sections: [
      {
        title: "Nested Loops",
        content: `A loop inside a loop. The inner loop completes **all** its iterations for each **single** iteration of the outer loop.

\`\`\`java
for (int i = 0; i < 3; i++) {       // outer: 3 iterations
    for (int j = 0; j < 4; j++) {   // inner: 4 iterations each time
        System.out.print("* ");
    }
    System.out.println();            // new line after each row
}
\`\`\`
Output:
\`\`\`
* * * *
* * * *
* * * *
\`\`\`

**Total iterations** = outer × inner. Here: 3 × 4 = 12 stars.`,
      },
      {
        title: "Pattern Generation",
        content: `**Triangle pattern:**
\`\`\`java
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println();
}
\`\`\`
Output:
\`\`\`
*
**
***
****
*****
\`\`\`

**Multiplication table:**
\`\`\`java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}
// 1  2  3
// 2  4  6
// 3  6  9
\`\`\`

**Key insight:** The outer loop typically controls **rows** and the inner loop controls **columns**.`,
        codingChallenge: {
          instructions: "Print a 4-row triangle of numbers:\n1\n12\n123\n1234",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Outer loop: rows 1 to 4\n        // Inner loop: print numbers 1 to i\n        // println() after inner loop\n    }\n}`,
          expectedOutputContains: "1\n12\n123\n1234",
          hint: "for (int i = 1; i <= 4; i++) { for (int j = 1; j <= i; j++) { System.out.print(j); } System.out.println(); }",
        },
      },
    ],
  },

  "code-tracing": {
    sections: [
      {
        title: "How to Trace Code",
        content: `Code tracing means following code line by line, tracking variable values. This is a **critical** AP exam skill — you'll trace code on both MCQ and FRQ questions.

**Steps:**
1. Draw a table with one column per variable
2. Execute each line in order
3. Update values as they change
4. Write down any output

**Example:**
\`\`\`java
int x = 3;
int y = 7;
x = x + y;   // x = 10
y = x - y;   // y = 3
x = x - y;   // x = 7
System.out.println(x + " " + y);  // "7 3"
\`\`\`

| Step | x | y |
|------|---|---|
| init | 3 | 7 |
| x=x+y | 10 | 7 |
| y=x-y | 10 | 3 |
| x=x-y | 7 | 3 |

This swaps x and y without a temp variable!`,
        codingChallenge: {
          instructions: "Trace this code by hand first, predict the output, then run it to check:\nint a = 5; int b = 2; a = a * b; b = a - b; Print a and b on separate lines.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = 2;\n        a = a * b;\n        b = a - b;\n        System.out.println(a);\n        System.out.println(b);\n    }\n}`,
          expectedOutputContains: "10\n8",
          hint: "a = 5*2 = 10. Then b = 10-2 = 8. Output: 10 then 8.",
        },
      },
    ],
  },

  // ============================================================
  // UNIT 3: Class Creation
  // ============================================================

  "class-anatomy": {
    sections: [
      {
        title: "Structure of a Java Class",
        content: `A Java class is a **blueprint** for creating objects. It has four key components:

\`\`\`java
public class Student {
    // 1. Instance variables (fields) — store data
    private String name;
    private int grade;

    // 2. Constructor — initializes new objects
    // (this.field refers to the instance variable)
    public Student(String name, int grade) {
        this.name = name;   // this.name = the field, name = the parameter
        this.grade = grade;
    }

    // 3. Accessor method (getter) — returns data
    public String getName() {
        return name;
    }

    // 4. Mutator method (setter) — changes data
    public void setGrade(int grade) {
        this.grade = grade;
    }

    // Other methods
    public boolean isHonorRoll() {
        return grade >= 90;
    }
}
\`\`\``,
      },
      {
        title: "Using the Class",
        content: `Once you've written a class, you create and use objects from it:

\`\`\`java
Student s1 = new Student("Alice", 95);
Student s2 = new Student("Bob", 82);

System.out.println(s1.getName());      // "Alice"
System.out.println(s1.isHonorRoll());  // true

s2.setGrade(91);
System.out.println(s2.isHonorRoll());  // true (changed from 82 to 91)
\`\`\`

**Key concepts:**
- Each object has its **own copy** of instance variables
- Changing s1's grade doesn't affect s2's grade
- The class defines the blueprint; objects are individual instances`,
        codingChallenge: {
          instructions: "Write a Dog class (as a static inner class) with private String name and int age, a constructor, getName() getter, and a speak() method that prints \"[name] says Woof!\". Create a Dog named \"Rex\" age 5 and call speak().",
          starterCode: `public class Main {\n    // Write your Dog class here\n    static class Dog {\n        // private fields\n\n        // constructor\n\n        // getName() method\n\n        // speak() method — prints "[name] says Woof!"\n\n    }\n\n    public static void main(String[] args) {\n        // Create a Dog named "Rex" age 5\n        // Call speak()\n    }\n}`,
          expectedOutputContains: "Rex says Woof!",
          hint: "private String name; private int age; constructor sets this.name and this.age. speak() does System.out.println(name + \" says Woof!\");",
        },
      },
    ],
  },

  "constructors": {
    sections: [
      {
        title: "Writing Constructors",
        content: `A **constructor** initializes a new object. It has the **same name as the class** and **no return type** (not even void).

\`\`\`java
public class Rectangle {
    private double width;
    private double height;

    // this.width = the field; width = the parameter
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    // No-argument constructor with defaults
    public Rectangle() {
        this.width = 1.0;
        this.height = 1.0;
    }
}
\`\`\`

**Constructor overloading:** You can have multiple constructors with different parameter lists.

**Default constructor rule:** If you write **no** constructors, Java provides a default no-arg constructor. If you write **any** constructor, the default is no longer provided.

\`\`\`java
Rectangle r1 = new Rectangle(5.0, 3.0);  // uses 2-arg constructor
Rectangle r2 = new Rectangle();           // uses no-arg constructor
\`\`\``,
        codingChallenge: {
          instructions: "Write a Circle class with private double radius, a constructor that takes radius, getArea() that returns Math.PI * radius * radius, and getCircumference() that returns 2 * Math.PI * radius. Create a circle with radius 5 and print its area.",
          starterCode: `public class Main {\n    static class Circle {\n        // private double radius\n        // constructor\n        // getArea()\n        // getCircumference()\n    }\n\n    public static void main(String[] args) {\n        // Create Circle with radius 5\n        // Print area\n    }\n}`,
          expectedOutputContains: "78.5",
          hint: "Math.PI * 5 * 5 = 78.539... System.out.println(c.getArea()); should show something starting with 78.5",
        },
      },
    ],
  },

  "instance-variables": {
    sections: [
      {
        title: "Instance Variables and Encapsulation",
        content: `**Instance variables** store the state of an object. They should be \`private\` to enforce **encapsulation** — one of the most important OOP principles.

\`\`\`java
public class BankAccount {
    private String owner;     // only accessible inside this class
    private double balance;   // protected from outside modification

    // this.field = parameter (distinguishes the field from the parameter)
    public BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) {          // validation!
            balance += amount;
        }
    }
}
\`\`\`

**Why private?**
- Prevents external code from setting \`balance = -1000\` directly
- You can add **validation** in setter/mutator methods
- You can change internal implementation without breaking external code

**Default values** (if not initialized in constructor):
- \`int\` → \`0\`, \`double\` → \`0.0\`, \`boolean\` → \`false\`, Objects → \`null\``,
        codingChallenge: {
          instructions: "Write a Counter class with a private int count (starts at 0), increment() method, decrement() method (don't go below 0), and getCount() getter. Increment 3 times, decrement once, print count.",
          starterCode: `public class Main {\n    static class Counter {\n        private int count;\n        public Counter() { count = 0; }\n        // increment()\n        // decrement() — don't go below 0\n        // getCount()\n    }\n\n    public static void main(String[] args) {\n        Counter c = new Counter();\n        c.increment();\n        c.increment();\n        c.increment();\n        c.decrement();\n        System.out.println(c.getCount());\n    }\n}`,
          expectedOutputContains: "2",
          hint: "increment: count++. decrement: if (count > 0) count--. getCount: return count. 3 increments - 1 decrement = 2.",
        },
      },
    ],
  },

  "accessor-methods": {
    sections: [
      {
        title: "Accessor (Getter) Methods",
        content: `Accessors return the value of a private field **without modifying** the object's state.

\`\`\`java
public class Person {
    private String name;
    private int age;
    private boolean employed;

    // Standard getter — getFieldName()
    public String getName() { return name; }
    public int getAge() { return age; }

    // Boolean getter — isFieldName()
    public boolean isEmployed() { return employed; }

    // Computed accessor — returns derived data
    public int getAgeInMonths() { return age * 12; }
    public boolean isAdult() { return age >= 18; }
}
\`\`\`

**Naming conventions:**
- \`getFieldName()\` for most types
- \`isFieldName()\` for boolean fields`,
        codingChallenge: {
          instructions: "Write a Temperature class with private double celsius. Add getCelsius(), getFahrenheit() (celsius * 9/5 + 32), and isBoiling() (celsius >= 100). Create one at 100°C and print all three.",
          starterCode: `public class Main {\n    static class Temperature {\n        private double celsius;\n        public Temperature(double c) { this.celsius = c; }\n        // getCelsius()\n        // getFahrenheit()\n        // isBoiling()\n    }\n\n    public static void main(String[] args) {\n        Temperature t = new Temperature(100);\n        System.out.println(t.getCelsius());\n        System.out.println(t.getFahrenheit());\n        System.out.println(t.isBoiling());\n    }\n}`,
          expectedOutputContains: "100.0\n212.0\ntrue",
          hint: "getFahrenheit: return celsius * 9.0 / 5.0 + 32; isBoiling: return celsius >= 100;",
        },
      },
    ],
  },

  "mutator-methods": {
    sections: [
      {
        title: "Mutator (Setter) Methods",
        content: `Mutators **change** the state of an object by modifying instance variables.

\`\`\`java
public class Student {
    private String name;
    private int grade;

    // Simple setter
    public void setName(String name) {
        this.name = name;
    }

    // Setter WITH VALIDATION — this is the real power of encapsulation
    public void setGrade(int grade) {
        if (grade >= 0 && grade <= 100) {
            this.grade = grade;
        }
        // invalid grades are silently ignored
    }

    // Mutator that isn't a simple setter
    public void addBonusPoints(int bonus) {
        grade = Math.min(100, grade + bonus);  // cap at 100
    }
}
\`\`\`

**Why validation matters:** Without encapsulation, anyone could write \`student.grade = -50;\`. With private fields and validated setters, you guarantee the object is always in a valid state.`,
        codingChallenge: {
          instructions: "Write a Thermostat class with private int temperature. Add setTemperature(int t) that only allows values between 50 and 90 (inclusive). Add getTemperature(). Set to 75, print it. Try setting to 200, print again (should still be 75).",
          starterCode: `public class Main {\n    static class Thermostat {\n        private int temperature;\n        public Thermostat(int t) { this.temperature = t; }\n        // setTemperature — validate 50-90\n        // getTemperature\n    }\n\n    public static void main(String[] args) {\n        Thermostat th = new Thermostat(68);\n        th.setTemperature(75);\n        System.out.println(th.getTemperature());\n        th.setTemperature(200);\n        System.out.println(th.getTemperature());\n    }\n}`,
          expectedOutputContains: "75\n75",
          hint: "setTemperature: if (t >= 50 && t <= 90) { temperature = t; }. Setting 200 fails validation, so it stays 75.",
        },
      },
    ],
  },

  "method-decomposition": {
    sections: [
      {
        title: "Breaking Problems into Methods",
        content: `**Method decomposition** means splitting a complex task into smaller, well-named methods. Each method should do ONE thing well.

\`\`\`java
public class TemperatureConverter {
    private double celsius;

    public TemperatureConverter(double celsius) {
        this.celsius = celsius;
    }

    public double toFahrenheit() {
        return celsius * 9.0 / 5.0 + 32;
    }

    public String getCategory() {
        double f = toFahrenheit();  // reuse another method!
        if (f >= 90) return "Hot";
        if (f >= 60) return "Warm";
        if (f >= 32) return "Cold";
        return "Freezing";
    }

    public String getSummary() {
        return celsius + "C = " + toFahrenheit() + "F (" + getCategory() + ")";
    }
}
\`\`\`

**Benefits of decomposition:**
- **Readability**: named methods are self-documenting
- **Reusability**: \`toFahrenheit()\` is called from multiple places
- **Testability**: small methods are easier to test
- **Maintainability**: changes are isolated to one method`,
        codingChallenge: {
          instructions: "Write a ScoreTracker class with private int score. Add methods: addPoints(int p) adds p to score, doubleScore() doubles it (uses getScore), getScore() returns score. Start at 10, add 5, double, print.",
          starterCode: `public class Main {\n    static class ScoreTracker {\n        private int score;\n        public ScoreTracker(int s) { this.score = s; }\n        // addPoints(int p)\n        // doubleScore() — hint: use addPoints(getScore())\n        // getScore()\n    }\n\n    public static void main(String[] args) {\n        ScoreTracker st = new ScoreTracker(10);\n        st.addPoints(5);\n        st.doubleScore();\n        System.out.println(st.getScore());\n    }\n}`,
          expectedOutputContains: "30",
          hint: "addPoints: score += p. doubleScore: addPoints(getScore()) or score *= 2. 10+5=15, 15*2=30.",
        },
      },
    ],
  },

  "static-members": {
    sections: [
      {
        title: "Static Variables and Methods",
        content: `**Static** members belong to the **class**, not to any instance. They're shared across all objects.

\`\`\`java
public class Student {
    private String name;
    private static int totalStudents = 0;  // shared by ALL

    public Student(String name) {
        this.name = name;
        totalStudents++;
    }

    public static int getTotalStudents() {
        return totalStudents;
    }
}
\`\`\`

\`\`\`java
Student s1 = new Student("Alice");  // totalStudents = 1
Student s2 = new Student("Bob");    // totalStudents = 2
System.out.println(Student.getTotalStudents()); // 2
\`\`\`

**Key rules:**
- Static methods **cannot** access instance variables (no \`this\`)
- Static methods **can** access other static members
- Called as \`ClassName.method()\`, not \`object.method()\`
- Examples: \`Math.sqrt()\`, \`Integer.parseInt()\``,
        codingChallenge: {
          instructions: "Write a Counter class with a static int count. Add a static method increment() and getCount(). Call increment() 5 times and print the count.",
          starterCode: `public class Main {\n    static class Counter {\n        private static int count = 0;\n        // static void increment()\n        // static int getCount()\n    }\n\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            Counter.increment();\n        }\n        System.out.println(Counter.getCount());\n    }\n}`,
          expectedOutputContains: "5",
          hint: "public static void increment() { count++; } public static int getCount() { return count; }",
        },
      },
    ],
  },

  "scope-and-access": {
    sections: [
      {
        title: "Scope and Access Modifiers",
        content: `**Scope** = where a variable is accessible.

| Declared in... | Accessible from... |
|---|---|
| Class level (instance variable) | Anywhere in the class |
| Method (local variable) | Only within that method |
| For loop | Only inside the loop |
| If/else block | Only inside that block |

\`\`\`java
public class Example {
    private int field = 10;       // accessible everywhere in class

    public void method() {
        int local = 20;           // only inside this method
        for (int i = 0; i < 5; i++) {
            int temp = i * 2;     // only inside this loop
        }
        // i and temp are NOT accessible here
        // local IS accessible here
    }
    // local is NOT accessible here
    // field IS accessible here
}
\`\`\`

**Access modifiers:**
- \`public\` — accessible from anywhere
- \`private\` — accessible only within the same class

**Shadowing:** if a local variable has the same name as an instance variable, the local variable takes priority. To avoid confusion, use different names or use the \`this\` keyword (covered in a later topic).`,
        codingChallenge: {
          instructions: "This code has a scope bug. Fix it so it compiles and prints 15. (Hint: the variable result is declared in the wrong scope.)",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            int result = 0;\n            result += i;\n        }\n        System.out.println(result);\n    }\n}`,
          expectedOutputContains: "15",
          hint: "Move 'int result = 0;' BEFORE the for loop so it's accessible after the loop ends. Then the loop accumulates 1+2+3+4+5=15.",
        },
      },
    ],
  },

  "this-keyword": {
    sections: [
      {
        title: "The this Keyword",
        content: `\`this\` refers to the **current object** — the instance the method was called on.

**Most common use:** distinguishing instance variables from parameters with the same name:
\`\`\`java
public class Point {
    private int x, y;

    public Point(int x, int y) {
        this.x = x;  // this.x = the field, x = the parameter
        this.y = y;   // without this, the field never gets set!
    }
}
\`\`\`

**Calling another constructor with this():**
\`\`\`java
public class Point {
    private int x, y;

    public Point() {
        this(0, 0);  // calls the 2-arg constructor below
    }

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
\`\`\`

\`this()\` must be the **first statement** in the constructor.`,
        codingChallenge: {
          instructions: "Write a Pair class with private int a, b. Write two constructors: one taking (int a, int b) using this, and one no-arg constructor that calls this(0, 0). Add getSum(). Test with both constructors.",
          starterCode: `public class Main {\n    static class Pair {\n        private int a, b;\n        // Constructor with params — use this.a = a\n        // No-arg constructor — use this(0, 0)\n        // getSum() returns a + b\n    }\n\n    public static void main(String[] args) {\n        Pair p1 = new Pair(3, 7);\n        Pair p2 = new Pair();\n        System.out.println(p1.getSum());\n        System.out.println(p2.getSum());\n    }\n}`,
          expectedOutputContains: "10\n0",
          hint: "public Pair(int a, int b) { this.a = a; this.b = b; } public Pair() { this(0, 0); } public int getSum() { return a + b; }",
        },
      },
    ],
  },

  "file-io": {
    sections: [
      {
        title: "Reading Files (New for 2026)",
        content: `The 2026 AP exam adds file reading with \`File\` and \`Scanner\`:

\`\`\`java
import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;

public class FileReader {
    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("data.txt");
        Scanner reader = new Scanner(file);

        while (reader.hasNextLine()) {
            String line = reader.nextLine();
            System.out.println(line);
        }
        reader.close();
    }
}
\`\`\`

**Key methods:**
- \`hasNextLine()\` — returns true if more lines exist
- \`nextLine()\` — reads and returns the next line as a String
- \`hasNextInt()\` / \`nextInt()\` — for reading integers
- \`close()\` — always close the Scanner when done

**FileNotFoundException** must be handled — either with \`throws\` or try/catch.`,
        codingChallenge: {
          instructions: "This is a conceptual exercise. Write code that would read a file line by line and count the lines. Print the count. (Use the pattern: while hasNextLine, read nextLine, increment counter.)",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Imagine we have a Scanner called 'reader' for a file\n        // Write the logic to count lines:\n        int lineCount = 0;\n        // while (reader.hasNextLine()) {\n        //     reader.nextLine();\n        //     lineCount++;\n        // }\n        // For now, just simulate with a simple loop:\n        String[] fakeFile = {"line1", "line2", "line3", "line4"};\n        for (String line : fakeFile) {\n            lineCount++;\n        }\n        System.out.println(lineCount);\n    }\n}`,
          expectedOutputContains: "4",
          hint: "The for-each loop counts 4 elements in the fake file array.",
        },
      },
    ],
  },

  // ============================================================
  // UNIT 4: Data Collections
  // ============================================================

  "array-basics": {
    sections: [
      {
        title: "Creating Arrays",
        content: `An **array** is a fixed-size collection of elements of the same type.

\`\`\`java
// Create with specified size (elements default to 0)
int[] scores = new int[5];  // {0, 0, 0, 0, 0}

// Create with initial values
int[] scores = {90, 85, 78, 92, 88};

// Two-step creation
int[] scores;
scores = new int[]{90, 85, 78, 92, 88};
\`\`\`

**Key facts:**
- Arrays have a **fixed size** that cannot change after creation
- Access the size with \`.length\` (no parentheses — it's a field, not a method!)
- Elements are indexed from \`0\` to \`length - 1\`
- Default values: \`0\` for int/double, \`false\` for boolean, \`null\` for objects`,
      },
      {
        title: "Accessing and Modifying Elements",
        content: `Use square brackets \`[]\` with an index:

\`\`\`java
int[] nums = {10, 20, 30, 40, 50};

int first = nums[0];    // 10
int last = nums[4];     // 50
nums[2] = 99;           // array is now {10, 20, 99, 40, 50}
int len = nums.length;  // 5

// Last element is always at index length - 1
int lastElement = nums[nums.length - 1];  // 50
\`\`\`

**ArrayIndexOutOfBoundsException** — the most common runtime error:
\`\`\`java
int[] arr = new int[3];  // valid indices: 0, 1, 2
arr[3] = 10;   // CRASH! Index 3 out of bounds
arr[-1] = 5;   // CRASH! Negative index
arr[arr.length] = 7;  // CRASH! length is 3, max index is 2
\`\`\`

**Rule:** Always ensure \`0 <= index < array.length\`.`,
        codingChallenge: {
          instructions: "Create an int array {10, 20, 30, 40, 50}. Print the first element, the last element (using length-1), and the array length — each on its own line.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50};\n        // Print first element\n        // Print last element using arr.length - 1\n        // Print array length\n    }\n}`,
          expectedOutputContains: "10\n50\n5",
          hint: "arr[0] is 10, arr[arr.length - 1] is 50, arr.length is 5.",
        },
      },
    ],
  },

  "array-traversal": {
    sections: [
      {
        title: "Traversing Arrays",
        content: `**Standard for loop** — use when you need the index:
\`\`\`java
int[] arr = {10, 20, 30, 40, 50};
for (int i = 0; i < arr.length; i++) {
    System.out.println("Index " + i + ": " + arr[i]);
}
\`\`\`

**Enhanced for-each loop** — simpler when you just need values:
\`\`\`java
for (int value : arr) {
    System.out.println(value);
}
\`\`\`

| Need | Use |
|------|-----|
| Just read all elements | for-each |
| Need the index | standard for |
| Need to modify elements | standard for |
| Traverse backward | standard for |`,
        codingChallenge: {
          instructions: "Given int[] nums = {5, 3, 8, 1, 9, 2}, use a for-each loop to print every element on its own line.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {5, 3, 8, 1, 9, 2};\n        // Use for-each to print each element\n    }\n}`,
          expectedOutputContains: "5\n3\n8\n1\n9\n2",
          hint: "for (int n : nums) { System.out.println(n); }",
        },
      },
    ],
  },

  "array-algorithms": {
    sections: [
      {
        title: "Essential Array Algorithms",
        content: `These appear on nearly every AP exam:

**Sum and Average:**
\`\`\`java
int sum = 0;
for (int val : arr) sum += val;
double avg = (double) sum / arr.length;  // cast!
\`\`\`

**Find Maximum:**
\`\`\`java
int max = arr[0];  // DON'T use 0 — fails for all-negative arrays!
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}
\`\`\`

**Count matches:**
\`\`\`java
int count = 0;
for (int val : arr) {
    if (val % 2 == 0) count++;
}
\`\`\`

**Reverse in place:**
\`\`\`java
for (int i = 0; i < arr.length / 2; i++) {
    int temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
}
\`\`\``,
        codingChallenge: {
          instructions: "Find and print the sum and maximum of {4, 7, 2, 9, 1, 6} on separate lines.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] arr = {4, 7, 2, 9, 1, 6};\n        int sum = 0;\n        int max = arr[0];\n        // Loop to find sum and max\n\n        System.out.println(sum);\n        System.out.println(max);\n    }\n}`,
          expectedOutputContains: "29\n9",
          hint: "for (int val : arr) { sum += val; if (val > max) max = val; }",
        },
      },
    ],
  },

  "arraylist-basics": {
    sections: [
      {
        title: "Creating and Using ArrayLists",
        content: `An \`ArrayList\` is a **resizable** list. Unlike arrays, it can grow and shrink.

\`\`\`java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<String>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");

System.out.println(names.size());  // 3
System.out.println(names.get(0));  // "Alice"
\`\`\`

**Key differences from arrays:**
- Uses **generics**: \`ArrayList<Type>\`
- Can only store **objects** (use \`Integer\` not \`int\`)
- Size changes dynamically
- Uses **methods** instead of \`[]\` brackets`,
      },
      {
        title: "ArrayList Methods",
        content: `| Method | Description | Example |
|--------|-------------|---------|
| \`add(item)\` | Add to end | \`list.add("X")\` |
| \`add(i, item)\` | Insert at index | \`list.add(1, "X")\` |
| \`get(i)\` | Get element | \`list.get(0)\` |
| \`set(i, item)\` | Replace at index | \`list.set(0, "Z")\` |
| \`remove(i)\` | Remove at index | \`list.remove(1)\` |
| \`size()\` | Get count | \`list.size()\` |

\`\`\`java
ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(10);          // [10]
nums.add(20);          // [10, 20]
nums.add(1, 15);       // [10, 15, 20] — insert at index 1
nums.set(0, 5);        // [5, 15, 20]  — replace index 0
nums.remove(1);        // [5, 20]      — remove index 1
\`\`\`

**Critical:** When you \`remove()\`, all elements after it shift left. Indices change!`,
        codingChallenge: {
          instructions: "Create an ArrayList<String> with \"Alice\", \"Bob\", \"Charlie\". Remove \"Bob\" (index 1), add \"Diana\" at the end, then print the list.",
          starterCode: `import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> names = new ArrayList<String>();\n        names.add("Alice");\n        names.add("Bob");\n        names.add("Charlie");\n        // Remove Bob (index 1)\n        // Add Diana\n        // Print the list\n    }\n}`,
          expectedOutputContains: "[Alice, Charlie, Diana]",
          hint: "names.remove(1); names.add(\"Diana\"); System.out.println(names);",
        },
      },
    ],
  },

  "arraylist-traversal": {
    sections: [
      {
        title: "Traversing and Modifying ArrayLists",
        content: `**Reading** — use either loop style:
\`\`\`java
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
// or
for (String s : list) {
    System.out.println(s);
}
\`\`\`

**Removing** — always use a **backward** loop:
\`\`\`java
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i).length() < 3) {
        list.remove(i);
    }
}
\`\`\`

**Why backward?** When you remove at index \`i\`, everything after shifts left. Going backward means shifted elements are ones you've already processed.

**NEVER modify during for-each:**
\`\`\`java
// THIS CRASHES!
for (String s : list) {
    list.remove(s);  // ConcurrentModificationException!
}
\`\`\``,
        codingChallenge: {
          instructions: "Create a list [1, 2, 3, 4, 5, 6, 7, 8]. Remove all odd numbers using a backward loop. Print the resulting list.",
          starterCode: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1,2,3,4,5,6,7,8));\n        // Remove all odd numbers (backward loop!)\n\n        System.out.println(nums);\n    }\n}`,
          expectedOutputContains: "[2, 4, 6, 8]",
          hint: "for (int i = nums.size()-1; i >= 0; i--) { if (nums.get(i) % 2 != 0) nums.remove(i); }",
        },
      },
    ],
  },

  "arraylist-algorithms": {
    sections: [
      {
        title: "ArrayList Algorithms",
        content: `**Filter (keep matching elements):**
\`\`\`java
ArrayList<String> longWords = new ArrayList<>();
for (String word : words) {
    if (word.length() >= 5) longWords.add(word);
}
\`\`\`

**Transform (modify each element):**
\`\`\`java
for (int i = 0; i < list.size(); i++) {
    list.set(i, list.get(i).toUpperCase());
}
\`\`\`

**Search:**
\`\`\`java
int index = list.indexOf("target");  // -1 if not found
boolean found = list.contains("target");
\`\`\``,
        codingChallenge: {
          instructions: "Given words [\"hi\", \"hello\", \"hey\", \"greetings\", \"yo\"], build a new ArrayList containing only words with 3+ characters. Print it.",
          starterCode: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> words = new ArrayList<>(Arrays.asList("hi","hello","hey","greetings","yo"));\n        ArrayList<String> result = new ArrayList<>();\n        // Add words with length >= 3 to result\n\n        System.out.println(result);\n    }\n}`,
          expectedOutputContains: "[hello, hey, greetings]",
          hint: "for (String w : words) { if (w.length() >= 3) result.add(w); }",
        },
      },
    ],
  },

  "2d-array-basics": {
    sections: [
      {
        title: "2D Arrays",
        content: `A **2D array** is an array of arrays — a grid with rows and columns.

\`\`\`java
int[][] grid = new int[3][4];  // 3 rows, 4 columns

int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
\`\`\`

**Accessing:** \`grid[row][col]\`
\`\`\`java
matrix[1][2]   // row 1, col 2 = 6
matrix[0][0]   // top-left = 1
\`\`\`

**Dimensions:**
\`\`\`java
int rows = grid.length;       // number of rows
int cols = grid[0].length;    // number of columns
\`\`\`

**AP Trap:** \`grid.length\` = rows, \`grid[0].length\` = columns. Students mix these up constantly!`,
        codingChallenge: {
          instructions: "Create a 2D array {{1,2,3},{4,5,6},{7,8,9}}. Print the element at row 2, col 1 (should be 8). Then print the number of rows and columns.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\n        // Print grid[2][1]\n        // Print number of rows\n        // Print number of columns\n    }\n}`,
          expectedOutputContains: "8\n3\n3",
          hint: "grid[2][1] = 8. grid.length = 3 rows. grid[0].length = 3 cols.",
        },
      },
    ],
  },

  "2d-array-traversal": {
    sections: [
      {
        title: "Traversing 2D Arrays",
        content: `**Row-major** (most common — process row by row):
\`\`\`java
for (int r = 0; r < grid.length; r++) {
    for (int c = 0; c < grid[r].length; c++) {
        System.out.print(grid[r][c] + " ");
    }
    System.out.println();
}
\`\`\`

**Column-major** (process column by column):
\`\`\`java
for (int c = 0; c < grid[0].length; c++) {
    for (int r = 0; r < grid.length; r++) {
        System.out.print(grid[r][c] + " ");
    }
    System.out.println();
}
\`\`\`

**Sum all elements:**
\`\`\`java
int total = 0;
for (int[] row : grid) {
    for (int val : row) {
        total += val;
    }
}
\`\`\``,
        codingChallenge: {
          instructions: "Sum all elements in {{1,2,3},{4,5,6},{7,8,9}} and print the total.",
          starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\n        int total = 0;\n        // Nested loop to sum all elements\n\n        System.out.println(total);\n    }\n}`,
          expectedOutputContains: "45",
          hint: "for (int[] row : grid) { for (int val : row) { total += val; } } — 1+2+...+9 = 45.",
        },
      },
    ],
  },

  "linear-search": {
    sections: [
      {
        title: "Linear Search",
        content: `**Linear search** checks each element one by one:

\`\`\`java
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;  // found!
    }
    return -1;  // not found
}
\`\`\`

**Time complexity: O(n)** — worst case checks every element.

**Works on unsorted arrays.** Simple but slow for large data.

For Strings, use \`.equals()\`:
\`\`\`java
if (arr[i].equals(target)) return i;
\`\`\``,
        codingChallenge: {
          instructions: "Implement linear search: find 30 in {10, 20, 30, 40, 50}. Print the index. Then search for 99 and print its result (-1).",
          starterCode: `public class Main {\n    public static int search(int[] arr, int target) {\n        // Your linear search here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50};\n        System.out.println(search(arr, 30));\n        System.out.println(search(arr, 99));\n    }\n}`,
          expectedOutputContains: "2\n-1",
          hint: "for (int i = 0; i < arr.length; i++) { if (arr[i] == target) return i; } return -1;",
        },
      },
    ],
  },

  "binary-search": {
    sections: [
      {
        title: "Binary Search",
        content: `**Binary search** works on **sorted** arrays by halving the search space each step.

\`\`\`java
public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
\`\`\`

**Time complexity: O(log n)**
- 1,000 elements → ~10 comparisons
- 1,000,000 elements → ~20 comparisons

**Requirement:** Array MUST be sorted!`,
        codingChallenge: {
          instructions: "Implement binary search. Find 23 in {2, 5, 8, 12, 16, 23, 38, 56, 72, 91}. Print the index.",
          starterCode: `public class Main {\n    public static int binarySearch(int[] arr, int target) {\n        int low = 0, high = arr.length - 1;\n        // Implement binary search\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n        System.out.println(binarySearch(arr, 23));\n    }\n}`,
          expectedOutputContains: "5",
          hint: "while (low <= high) { int mid = (low+high)/2; if (arr[mid]==target) return mid; else if (arr[mid]<target) low=mid+1; else high=mid-1; }",
        },
      },
    ],
  },

  "selection-sort": {
    sections: [
      {
        title: "Selection Sort",
        content: `**Selection sort** finds the minimum and swaps it to the front, repeatedly.

\`\`\`java
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // Swap
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}
\`\`\`

**Time complexity: O(n²)** always. **Swaps: n-1.**`,
        codingChallenge: {
          instructions: "Implement selection sort. Sort {64, 25, 12, 22, 11} and print each element separated by spaces.",
          starterCode: `public class Main {\n    public static void selectionSort(int[] arr) {\n        // Implement selection sort\n\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        selectionSort(arr);\n        for (int n : arr) System.out.print(n + " ");\n    }\n}`,
          expectedOutputContains: "11 12 22 25 64",
          hint: "Outer loop i 0..length-2. Inner loop j finds minIdx. Swap arr[i] and arr[minIdx].",
        },
      },
    ],
  },

  "insertion-sort": {
    sections: [
      {
        title: "Insertion Sort",
        content: `**Insertion sort** builds a sorted portion by inserting each element into its correct position.

\`\`\`java
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];  // shift right
            j--;
        }
        arr[j + 1] = key;  // insert
    }
}
\`\`\`

**Time complexity:**
- Worst: O(n²) — reverse-sorted
- Best: O(n) — already sorted
- Efficient for **nearly sorted** data`,
        codingChallenge: {
          instructions: "Implement insertion sort. Sort {5, 2, 8, 1, 9} and print each element separated by spaces.",
          starterCode: `public class Main {\n    public static void insertionSort(int[] arr) {\n        // Implement insertion sort\n\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {5, 2, 8, 1, 9};\n        insertionSort(arr);\n        for (int n : arr) System.out.print(n + " ");\n    }\n}`,
          expectedOutputContains: "1 2 5 8 9",
          hint: "for i from 1: save key=arr[i], shift larger elements right with while loop, insert key.",
        },
      },
    ],
  },
};

export function getLessonContent(topicId: string): { sections: LessonSection[] } | null {
  return lessons[topicId] ?? null;
}

export function hasLessonContent(topicId: string): boolean {
  return topicId in lessons;
}
