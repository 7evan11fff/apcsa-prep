import type { FRQProblem } from "@/types";

const frqs: FRQProblem[] = [
  {
    id: "frq-methods-1",
    title: "Word Score Calculator",
    type: 1,
    difficulty: 2,
    topicIds: ["string-methods", "for-loops", "loop-algorithms"],
    prompt: `Write the method \`getWordScore\` that calculates a score for a word based on the following rules:
- Each vowel (a, e, i, o, u, case-insensitive) is worth 1 point
- Each consonant is worth 2 points
- Non-letter characters are worth 0 points

The method should return the total score for the word.

**Method signature:**
\`\`\`java
public static int getWordScore(String word)
\`\`\`

**Examples:**
- \`getWordScore("hello")\` returns \`7\` (h=2, e=1, l=2, l=2, o=1 → 8... wait: h=2, e=1, l=2, l=2, o=1 = 8)
- \`getWordScore("AP")\` returns \`3\` (A=1, P=2)
- \`getWordScore("")\` returns \`0\``,
    starterCode: `public class Main {
    public static int getWordScore(String word) {
        // Your implementation here

    }

    public static void main(String[] args) {
        System.out.println(getWordScore("hello"));
        System.out.println(getWordScore("AP"));
        System.out.println(getWordScore(""));
    }
}`,
    sampleSolution: `public class Main {
    public static int getWordScore(String word) {
        int score = 0;
        String vowels = "aeiouAEIOU";
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (Character.isLetter(ch)) {
                if (vowels.indexOf(ch) != -1) {
                    score += 1;
                } else {
                    score += 2;
                }
            }
        }
        return score;
    }

    public static void main(String[] args) {
        System.out.println(getWordScore("hello"));
        System.out.println(getWordScore("AP"));
        System.out.println(getWordScore(""));
    }
}`,
    rubric: [
      { id: "r1", description: "Traverses all characters in the word", points: 2, codePatterns: ["for", "charAt", "length"] },
      { id: "r2", description: "Correctly identifies vowels", points: 2, codePatterns: ["indexOf", "aeiou"] },
      { id: "r3", description: "Adds 1 for vowels, 2 for consonants", points: 2, codePatterns: ["score", "+="] },
      { id: "r4", description: "Handles empty string and non-letter characters", points: 1, codePatterns: ["isLetter", "length"] },
      { id: "r5", description: "Returns correct total score", points: 2, codePatterns: ["return", "score"] },
    ],
    testCases: [
      { input: "", expectedOutput: "8", description: "getWordScore(\"hello\") = 8", hidden: false },
      { input: "", expectedOutput: "3", description: "getWordScore(\"AP\") = 3", hidden: false },
      { input: "", expectedOutput: "0", description: "getWordScore(\"\") = 0", hidden: false },
    ],
    hints: [
      "Iterate through each character using a for loop and charAt().",
      "Use a String of vowels and indexOf to check if a character is a vowel.",
      "Check if the character is a letter before adding to the score.",
    ],
    commonMistakes: [
      { description: "Not handling case sensitivity", example: "Only checking lowercase vowels", correction: "Include both 'aeiou' and 'AEIOU' in your vowel check" },
      { description: "Off-by-one in loop bounds", example: "for (int i = 0; i <= word.length())", correction: "Use i < word.length() since indices go from 0 to length-1" },
    ],
    walkthrough: [
      { stepNumber: 1, instruction: "Set up the method with a score accumulator", code: "int score = 0;", explanation: "Initialize a variable to track the running total." },
      { stepNumber: 2, instruction: "Loop through each character", code: "for (int i = 0; i < word.length(); i++) {\n    char ch = word.charAt(i);", explanation: "Use charAt(i) to get each character one at a time." },
      { stepNumber: 3, instruction: "Check if it's a vowel or consonant", code: "    String vowels = \"aeiouAEIOU\";\n    if (Character.isLetter(ch)) {\n        if (vowels.indexOf(ch) != -1) score += 1;\n        else score += 2;\n    }", explanation: "indexOf returns -1 if the character isn't found in the vowels string." },
      { stepNumber: 4, instruction: "Return the total", code: "return score;", explanation: "After the loop completes, return the accumulated score." },
    ],
  },
  {
    id: "frq-class-1",
    title: "BankAccount Class",
    type: 2,
    difficulty: 2,
    topicIds: ["class-anatomy", "constructors", "instance-variables", "accessor-methods", "mutator-methods"],
    prompt: `Write a complete \`BankAccount\` class with the following:

**Instance variables:**
- \`accountHolder\` (String) — the name of the account holder
- \`balance\` (double) — the current balance (starts at the value passed to constructor)

**Constructor:**
- \`BankAccount(String name, double initialBalance)\` — creates a new account

**Methods:**
- \`getAccountHolder()\` — returns the name
- \`getBalance()\` — returns the current balance
- \`deposit(double amount)\` — adds amount to balance (only if amount > 0)
- \`withdraw(double amount)\` — subtracts amount from balance (only if amount > 0 and amount <= balance). Returns true if successful, false otherwise.
- \`toString()\` — returns "Name: $balance" (e.g., "Alice: $150.0")`,
    starterCode: `public class Main {
    // Write the BankAccount class here


    public static void main(String[] args) {
        // Uncomment after implementing:
        // BankAccount acct = new BankAccount("Alice", 100.0);
        // System.out.println(acct.getAccountHolder());
        // acct.deposit(50.0);
        // System.out.println(acct.getBalance());
        // System.out.println(acct.withdraw(200.0));
        // System.out.println(acct.toString());
        System.out.println("Implement BankAccount class!");
    }
}`,
    sampleSolution: `public class Main {
    static class BankAccount {
        private String accountHolder;
        private double balance;

        public BankAccount(String name, double initialBalance) {
            this.accountHolder = name;
            this.balance = initialBalance;
        }

        public String getAccountHolder() { return accountHolder; }
        public double getBalance() { return balance; }

        public void deposit(double amount) {
            if (amount > 0) {
                balance += amount;
            }
        }

        public boolean withdraw(double amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return true;
            }
            return false;
        }

        public String toString() {
            return accountHolder + ": $" + balance;
        }
    }

    public static void main(String[] args) {
        BankAccount acct = new BankAccount("Alice", 100.0);
        System.out.println(acct.getAccountHolder());
        acct.deposit(50.0);
        System.out.println(acct.getBalance());
        System.out.println(acct.withdraw(200.0));
        System.out.println(acct.toString());
    }
}`,
    rubric: [
      { id: "r1", description: "Private instance variables declared correctly", points: 1, codePatterns: ["private", "String", "double"] },
      { id: "r2", description: "Constructor initializes both fields", points: 2, codePatterns: ["this.", "accountHolder", "balance"] },
      { id: "r3", description: "Accessor methods return correct values", points: 1, codePatterns: ["getAccountHolder", "getBalance", "return"] },
      { id: "r4", description: "deposit adds amount only when positive", points: 2, codePatterns: ["deposit", "amount > 0", "balance +="] },
      { id: "r5", description: "withdraw checks amount > 0 and amount <= balance", points: 2, codePatterns: ["withdraw", "amount <= balance", "return"] },
      { id: "r6", description: "toString returns correct format", points: 1, codePatterns: ["toString", "return", "$"] },
    ],
    testCases: [
      { input: "", expectedOutput: "Alice", description: "getAccountHolder() returns 'Alice'", hidden: false },
      { input: "", expectedOutput: "150.0", description: "After deposit(50), balance = 150.0", hidden: false },
      { input: "", expectedOutput: "false", description: "withdraw(200) fails when balance is 150", hidden: false },
      { input: "", expectedOutput: "Alice: $150.0", description: "toString() format correct", hidden: false },
    ],
    hints: [
      "Start by declaring private instance variables and writing the constructor.",
      "For withdraw, check both that amount > 0 AND amount <= balance before subtracting.",
      "The toString method should concatenate the holder name, \": $\", and the balance.",
    ],
    commonMistakes: [
      { description: "Making instance variables public", example: "public double balance;", correction: "Use private double balance; for proper encapsulation" },
      { description: "Not validating deposit/withdraw amounts", example: "Allowing negative deposits", correction: "Check amount > 0 before modifying balance" },
    ],
  },
  {
    id: "frq-arraylist-1",
    title: "Filter and Transform List",
    type: 3,
    difficulty: 3,
    topicIds: ["arraylist-traversal", "arraylist-algorithms"],
    prompt: `Write the method \`removeShortWords\` that removes all Strings with length less than \`minLength\` from an ArrayList. The method modifies the list in place.

Then write the method \`capitalizeAll\` that replaces each String in an ArrayList with its uppercase version.

**Method signatures:**
\`\`\`java
public static void removeShortWords(ArrayList<String> words, int minLength)
public static void capitalizeAll(ArrayList<String> words)
\`\`\`

**Example:**
Starting with ["Hi", "Hello", "OK", "Greetings", "Yo"]
After removeShortWords(words, 3): ["Hello", "Greetings"]
After capitalizeAll(words): ["HELLO", "GREETINGS"]`,
    starterCode: `import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void removeShortWords(ArrayList<String> words, int minLength) {
        // Your implementation here

    }

    public static void capitalizeAll(ArrayList<String> words) {
        // Your implementation here

    }

    public static void main(String[] args) {
        ArrayList<String> words = new ArrayList<>(Arrays.asList("Hi", "Hello", "OK", "Greetings", "Yo"));
        removeShortWords(words, 3);
        System.out.println(words);
        capitalizeAll(words);
        System.out.println(words);
    }
}`,
    sampleSolution: `import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void removeShortWords(ArrayList<String> words, int minLength) {
        for (int i = words.size() - 1; i >= 0; i--) {
            if (words.get(i).length() < minLength) {
                words.remove(i);
            }
        }
    }

    public static void capitalizeAll(ArrayList<String> words) {
        for (int i = 0; i < words.size(); i++) {
            words.set(i, words.get(i).toUpperCase());
        }
    }

    public static void main(String[] args) {
        ArrayList<String> words = new ArrayList<>(Arrays.asList("Hi", "Hello", "OK", "Greetings", "Yo"));
        removeShortWords(words, 3);
        System.out.println(words);
        capitalizeAll(words);
        System.out.println(words);
    }
}`,
    rubric: [
      { id: "r1", description: "removeShortWords traverses the list correctly (backward)", points: 2, codePatterns: ["for", "size()", "i--"] },
      { id: "r2", description: "Correctly compares word length to minLength", points: 2, codePatterns: ["length()", "< minLength"] },
      { id: "r3", description: "Removes elements correctly", points: 2, codePatterns: ["remove(i)"] },
      { id: "r4", description: "capitalizeAll uses set() to replace each element", points: 2, codePatterns: ["set(", "toUpperCase()"] },
      { id: "r5", description: "Both methods modify the list in place (void)", points: 1, codePatterns: ["void"] },
    ],
    testCases: [
      { input: "", expectedOutput: "[Hello, Greetings]", description: "removeShortWords removes words < 3 chars", hidden: false },
      { input: "", expectedOutput: "[HELLO, GREETINGS]", description: "capitalizeAll uppercases all remaining words", hidden: false },
    ],
    hints: [
      "When removing from an ArrayList during traversal, iterate backward to avoid skipping elements.",
      "Use words.get(i).length() to check the length of each word.",
      "For capitalizeAll, use set(i, ...) to replace each element in place.",
    ],
    commonMistakes: [
      { description: "Forward traversal while removing", example: "for (int i = 0; i < words.size(); i++) { words.remove(i); }", correction: "Traverse backward: for (int i = words.size()-1; i >= 0; i--)" },
      { description: "Using for-each loop with remove", example: "for (String w : words) { words.remove(w); }", correction: "This throws ConcurrentModificationException. Use index-based backward loop." },
    ],
  },
  {
    id: "frq-2darray-1",
    title: "Grid Row Sums",
    type: 4,
    difficulty: 3,
    topicIds: ["2d-array-traversal", "nested-loops", "array-algorithms"],
    prompt: `Write the method \`getRowSums\` that takes a 2D integer array and returns a 1D array where each element is the sum of the corresponding row.

Then write the method \`getMaxRowIndex\` that returns the index of the row with the largest sum.

**Method signatures:**
\`\`\`java
public static int[] getRowSums(int[][] grid)
public static int getMaxRowIndex(int[][] grid)
\`\`\`

**Example:**
For grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
getRowSums(grid) returns {6, 15, 24}
getMaxRowIndex(grid) returns 2`,
    starterCode: `public class Main {
    public static int[] getRowSums(int[][] grid) {
        // Your implementation here
        return new int[0];
    }

    public static int getMaxRowIndex(int[][] grid) {
        // Your implementation here
        return 0;
    }

    public static void main(String[] args) {
        int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[] sums = getRowSums(grid);
        for (int s : sums) System.out.print(s + " ");
        System.out.println();
        System.out.println(getMaxRowIndex(grid));
    }
}`,
    sampleSolution: `public class Main {
    public static int[] getRowSums(int[][] grid) {
        int[] sums = new int[grid.length];
        for (int r = 0; r < grid.length; r++) {
            int sum = 0;
            for (int c = 0; c < grid[r].length; c++) {
                sum += grid[r][c];
            }
            sums[r] = sum;
        }
        return sums;
    }

    public static int getMaxRowIndex(int[][] grid) {
        int[] sums = getRowSums(grid);
        int maxIdx = 0;
        for (int i = 1; i < sums.length; i++) {
            if (sums[i] > sums[maxIdx]) {
                maxIdx = i;
            }
        }
        return maxIdx;
    }

    public static void main(String[] args) {
        int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[] sums = getRowSums(grid);
        for (int s : sums) System.out.print(s + " ");
        System.out.println();
        System.out.println(getMaxRowIndex(grid));
    }
}`,
    rubric: [
      { id: "r1", description: "Creates result array of correct size (grid.length)", points: 1, codePatterns: ["new int[grid.length]"] },
      { id: "r2", description: "Nested loop traverses all elements in each row", points: 2, codePatterns: ["grid.length", "grid[r].length"] },
      { id: "r3", description: "Correctly sums each row", points: 2, codePatterns: ["sum +=", "grid[r][c]"] },
      { id: "r4", description: "getMaxRowIndex finds index of largest sum", points: 2, codePatterns: ["maxIdx", "sums[i] > sums[maxIdx]"] },
      { id: "r5", description: "Returns correct values from both methods", points: 2, codePatterns: ["return sums", "return maxIdx"] },
    ],
    testCases: [
      { input: "", expectedOutput: "6 15 24", description: "Row sums of {{1,2,3},{4,5,6},{7,8,9}}", hidden: false },
      { input: "", expectedOutput: "2", description: "Max row index = 2 (row {7,8,9})", hidden: false },
    ],
    hints: [
      "Use grid.length for the number of rows and grid[r].length for columns in row r.",
      "For getRowSums, create a result array and fill each position with the sum of that row.",
      "For getMaxRowIndex, reuse getRowSums and find the index of the maximum value.",
    ],
    commonMistakes: [
      { description: "Using grid[0].length for rows", example: "for (int r = 0; r < grid[0].length; r++)", correction: "grid.length is rows, grid[0].length is columns" },
      { description: "Not initializing sum for each row", example: "Declaring sum outside the outer loop", correction: "Reset sum = 0 at the start of each row iteration" },
    ],
  },
];

export function getFRQById(id: string): FRQProblem | undefined {
  return frqs.find((f) => f.id === id);
}

const moreFRQs: FRQProblem[] = [
  {
    id: "frq-methods-2",
    title: "Digit Sum Calculator",
    type: 1,
    difficulty: 2,
    topicIds: ["while-loops", "loop-algorithms", "variables-and-operators"],
    prompt: `Write the method \`digitSum\` that returns the sum of all digits of a positive integer.\n\n**Method signature:**\n\`\`\`java\npublic static int digitSum(int n)\n\`\`\`\n\n**Examples:**\n- \`digitSum(123)\` returns \`6\` (1+2+3)\n- \`digitSum(9999)\` returns \`36\`\n- \`digitSum(5)\` returns \`5\``,
    starterCode: `public class Main {\n    public static int digitSum(int n) {\n        // Your implementation here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(digitSum(123));\n        System.out.println(digitSum(9999));\n        System.out.println(digitSum(5));\n    }\n}`,
    sampleSolution: `public class Main {\n    public static int digitSum(int n) {\n        int sum = 0;\n        while (n > 0) {\n            sum += n % 10;\n            n /= 10;\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(digitSum(123));\n        System.out.println(digitSum(9999));\n        System.out.println(digitSum(5));\n    }\n}`,
    rubric: [
      { id: "r1", description: "Uses a loop that processes all digits", points: 2, codePatterns: ["while", "n > 0"] },
      { id: "r2", description: "Extracts last digit using % 10", points: 3, codePatterns: ["% 10", "n % 10"] },
      { id: "r3", description: "Removes last digit using / 10", points: 2, codePatterns: ["/ 10", "n /= 10"] },
      { id: "r4", description: "Returns correct sum", points: 2, codePatterns: ["return", "sum"] },
    ],
    testCases: [
      { input: "", expectedOutput: "6", description: "digitSum(123) = 6", hidden: false },
      { input: "", expectedOutput: "36", description: "digitSum(9999) = 36", hidden: false },
      { input: "", expectedOutput: "5", description: "digitSum(5) = 5", hidden: false },
    ],
    hints: ["Use % 10 to get the last digit of a number.", "Use / 10 to remove the last digit.", "Keep looping until n becomes 0."],
    commonMistakes: [
      { description: "Using String conversion instead of math", example: "Converting to String and parsing chars", correction: "While valid, the math approach (% 10, / 10) is more efficient and expected." },
    ],
  },
  {
    id: "frq-methods-3",
    title: "String Compressor",
    type: 1,
    difficulty: 3,
    topicIds: ["string-iteration", "for-loops", "string-methods"],
    prompt: `Write the method \`compress\` that takes a String and returns a compressed version where consecutive duplicate characters are replaced with the character followed by the count.\n\n**Method signature:**\n\`\`\`java\npublic static String compress(String s)\n\`\`\`\n\n**Examples:**\n- \`compress("aaabbc")\` returns \`"a3b2c1"\`\n- \`compress("abc")\` returns \`"a1b1c1"\`\n- \`compress("")\` returns \`""\``,
    starterCode: `public class Main {\n    public static String compress(String s) {\n        // Your implementation here\n        return "";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(compress("aaabbc"));\n        System.out.println(compress("abc"));\n        System.out.println(compress(""));\n    }\n}`,
    sampleSolution: `public class Main {\n    public static String compress(String s) {\n        if (s.length() == 0) return "";\n        String result = "";\n        int count = 1;\n        for (int i = 1; i < s.length(); i++) {\n            if (s.charAt(i) == s.charAt(i - 1)) {\n                count++;\n            } else {\n                result += s.charAt(i - 1) + "" + count;\n                count = 1;\n            }\n        }\n        result += s.charAt(s.length() - 1) + "" + count;\n        return result;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(compress("aaabbc"));\n        System.out.println(compress("abc"));\n        System.out.println(compress(""));\n    }\n}`,
    rubric: [
      { id: "r1", description: "Handles empty string edge case", points: 1, codePatterns: ["length() == 0", "isEmpty"] },
      { id: "r2", description: "Traverses string comparing adjacent characters", points: 2, codePatterns: ["charAt(i)", "charAt(i - 1)"] },
      { id: "r3", description: "Counts consecutive duplicates correctly", points: 3, codePatterns: ["count", "count++"] },
      { id: "r4", description: "Builds result string with char + count", points: 2, codePatterns: ["result +=", "count"] },
      { id: "r5", description: "Handles the last group of characters", points: 1, codePatterns: ["charAt(s.length", "count"] },
    ],
    testCases: [
      { input: "", expectedOutput: "a3b2c1", description: "compress(\"aaabbc\") = \"a3b2c1\"", hidden: false },
      { input: "", expectedOutput: "a1b1c1", description: "compress(\"abc\") = \"a1b1c1\"", hidden: false },
      { input: "", expectedOutput: "", description: "compress(\"\") = \"\"", hidden: false },
    ],
    hints: ["Compare each character with the previous one.", "Keep a count that resets when the character changes.", "Don't forget to add the last character group after the loop ends."],
    commonMistakes: [
      { description: "Forgetting the last group", example: "Not adding the final character and count after the loop", correction: "After the loop, add the last character and its count to the result." },
    ],
  },
  {
    id: "frq-class-2",
    title: "GradeBook Class",
    type: 2,
    difficulty: 3,
    topicIds: ["class-anatomy", "constructors", "instance-variables", "arraylist-basics", "method-decomposition"],
    prompt: `Write a complete \`GradeBook\` class:\n\n**Instance variables:**\n- \`studentName\` (String)\n- \`grades\` (ArrayList<Integer>)\n\n**Constructor:** \`GradeBook(String name)\` — creates empty grade list\n\n**Methods:**\n- \`addGrade(int grade)\` — adds grade (only if 0-100)\n- \`getAverage()\` — returns average as double (0.0 if empty)\n- \`getHighest()\` — returns highest grade (or -1 if empty)\n- \`getGradeCount()\` — returns number of grades`,
    starterCode: `import java.util.ArrayList;\n\npublic class Main {\n    // Write GradeBook class here\n\n    public static void main(String[] args) {\n        System.out.println("Implement GradeBook!");\n    }\n}`,
    sampleSolution: `import java.util.ArrayList;\n\npublic class Main {\n    static class GradeBook {\n        private String studentName;\n        private ArrayList<Integer> grades;\n\n        public GradeBook(String name) {\n            studentName = name;\n            grades = new ArrayList<>();\n        }\n\n        public void addGrade(int grade) {\n            if (grade >= 0 && grade <= 100) grades.add(grade);\n        }\n\n        public double getAverage() {\n            if (grades.size() == 0) return 0.0;\n            int sum = 0;\n            for (int g : grades) sum += g;\n            return (double) sum / grades.size();\n        }\n\n        public int getHighest() {\n            if (grades.size() == 0) return -1;\n            int max = grades.get(0);\n            for (int g : grades) if (g > max) max = g;\n            return max;\n        }\n\n        public int getGradeCount() { return grades.size(); }\n    }\n\n    public static void main(String[] args) {\n        GradeBook gb = new GradeBook("Alice");\n        gb.addGrade(90);\n        gb.addGrade(85);\n        gb.addGrade(92);\n        System.out.println(gb.getAverage());\n        System.out.println(gb.getHighest());\n        System.out.println(gb.getGradeCount());\n    }\n}`,
    rubric: [
      { id: "r1", description: "Private instance variables", points: 1, codePatterns: ["private", "ArrayList"] },
      { id: "r2", description: "Constructor initializes name and empty ArrayList", points: 2, codePatterns: ["new ArrayList"] },
      { id: "r3", description: "addGrade validates 0-100 range", points: 2, codePatterns: ["grade >= 0", "grade <= 100"] },
      { id: "r4", description: "getAverage handles empty list and casts to double", points: 2, codePatterns: ["(double)", "size()"] },
      { id: "r5", description: "getHighest finds maximum correctly", points: 2, codePatterns: ["max", "get(0)"] },
    ],
    testCases: [
      { input: "", expectedOutput: "89.0", description: "Average of 90,85,92 = 89.0", hidden: false },
      { input: "", expectedOutput: "92", description: "Highest = 92", hidden: false },
      { input: "", expectedOutput: "3", description: "Count = 3", hidden: false },
    ],
    hints: ["Initialize the ArrayList in the constructor.", "Cast sum to double before dividing in getAverage().", "Handle the empty list case in getAverage and getHighest."],
    commonMistakes: [
      { description: "Integer division in getAverage", example: "return sum / grades.size();", correction: "Cast: return (double) sum / grades.size();" },
    ],
  },
  {
    id: "frq-arraylist-2",
    title: "Merge Sorted Lists",
    type: 3,
    difficulty: 4,
    topicIds: ["arraylist-traversal", "arraylist-algorithms", "while-loops"],
    prompt: `Write the method \`mergeSorted\` that takes two sorted ArrayLists and returns a new sorted ArrayList containing all elements from both.\n\n**Method signature:**\n\`\`\`java\npublic static ArrayList<Integer> mergeSorted(ArrayList<Integer> a, ArrayList<Integer> b)\n\`\`\`\n\n**Example:**\n- a = [1, 3, 5], b = [2, 4, 6] → [1, 2, 3, 4, 5, 6]`,
    starterCode: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static ArrayList<Integer> mergeSorted(ArrayList<Integer> a, ArrayList<Integer> b) {\n        // Your implementation here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        ArrayList<Integer> a = new ArrayList<>(Arrays.asList(1,3,5));\n        ArrayList<Integer> b = new ArrayList<>(Arrays.asList(2,4,6));\n        System.out.println(mergeSorted(a, b));\n    }\n}`,
    sampleSolution: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static ArrayList<Integer> mergeSorted(ArrayList<Integer> a, ArrayList<Integer> b) {\n        ArrayList<Integer> result = new ArrayList<>();\n        int i = 0, j = 0;\n        while (i < a.size() && j < b.size()) {\n            if (a.get(i) <= b.get(j)) {\n                result.add(a.get(i));\n                i++;\n            } else {\n                result.add(b.get(j));\n                j++;\n            }\n        }\n        while (i < a.size()) { result.add(a.get(i)); i++; }\n        while (j < b.size()) { result.add(b.get(j)); j++; }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        ArrayList<Integer> a = new ArrayList<>(Arrays.asList(1,3,5));\n        ArrayList<Integer> b = new ArrayList<>(Arrays.asList(2,4,6));\n        System.out.println(mergeSorted(a, b));\n    }\n}`,
    rubric: [
      { id: "r1", description: "Uses two index pointers", points: 2, codePatterns: ["int i", "int j"] },
      { id: "r2", description: "Compares and adds smaller element", points: 3, codePatterns: ["get(i)", "get(j)", "<="] },
      { id: "r3", description: "Handles remaining elements from both lists", points: 2, codePatterns: ["while", "i < a.size", "j < b.size"] },
      { id: "r4", description: "Returns correctly merged sorted list", points: 2, codePatterns: ["return", "result"] },
    ],
    testCases: [{ input: "", expectedOutput: "[1, 2, 3, 4, 5, 6]", description: "Merge [1,3,5] and [2,4,6]", hidden: false }],
    hints: ["Use two pointers, one for each list.", "Compare elements at both pointers and add the smaller one.", "After the main loop, add remaining elements from whichever list isn't exhausted."],
    commonMistakes: [
      { description: "Forgetting remaining elements", example: "Only doing the main merge loop", correction: "After the main loop, add all remaining elements from both lists." },
    ],
  },
  {
    id: "frq-2darray-2",
    title: "Grid Pattern Detector",
    type: 4,
    difficulty: 3,
    topicIds: ["2d-array-traversal", "nested-loops", "conditional-logic"],
    prompt: `Write the method \`countRowsWithAllPositive\` that returns how many rows in a 2D array have ALL positive values (> 0).\n\nThen write \`getColumnSum\` that returns the sum of a specific column.\n\n**Method signatures:**\n\`\`\`java\npublic static int countRowsWithAllPositive(int[][] grid)\npublic static int getColumnSum(int[][] grid, int col)\n\`\`\``,
    starterCode: `public class Main {\n    public static int countRowsWithAllPositive(int[][] grid) {\n        // Your implementation here\n        return 0;\n    }\n\n    public static int getColumnSum(int[][] grid, int col) {\n        // Your implementation here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{-1,5,6},{7,8,9}};\n        System.out.println(countRowsWithAllPositive(grid));\n        System.out.println(getColumnSum(grid, 1));\n    }\n}`,
    sampleSolution: `public class Main {\n    public static int countRowsWithAllPositive(int[][] grid) {\n        int count = 0;\n        for (int[] row : grid) {\n            boolean allPos = true;\n            for (int val : row) {\n                if (val <= 0) { allPos = false; break; }\n            }\n            if (allPos) count++;\n        }\n        return count;\n    }\n\n    public static int getColumnSum(int[][] grid, int col) {\n        int sum = 0;\n        for (int r = 0; r < grid.length; r++) {\n            sum += grid[r][col];\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{-1,5,6},{7,8,9}};\n        System.out.println(countRowsWithAllPositive(grid));\n        System.out.println(getColumnSum(grid, 1));\n    }\n}`,
    rubric: [
      { id: "r1", description: "Correctly traverses each row", points: 2, codePatterns: ["for", "grid", "row"] },
      { id: "r2", description: "Checks ALL elements in a row are positive", points: 2, codePatterns: ["allPos", "<= 0", "false"] },
      { id: "r3", description: "Counts qualifying rows correctly", points: 1, codePatterns: ["count++"] },
      { id: "r4", description: "getColumnSum traverses one column across all rows", points: 2, codePatterns: ["grid[r][col]", "grid.length"] },
      { id: "r5", description: "Returns correct values", points: 2, codePatterns: ["return count", "return sum"] },
    ],
    testCases: [
      { input: "", expectedOutput: "2", description: "2 rows with all positive values", hidden: false },
      { input: "", expectedOutput: "15", description: "Column 1 sum = 2+5+8 = 15", hidden: false },
    ],
    hints: ["For allPositive: use a boolean flag, set to false if any value <= 0.", "For column sum: loop through rows, accessing grid[r][col].", "Use break to exit inner loop early when a non-positive is found."],
    commonMistakes: [
      { description: "Checking > 0 instead of > 0 for ALL", example: "Counting rows with ANY positive", correction: "Use a boolean flag that starts true and becomes false if any element fails." },
    ],
  },
];

frqs.push(...moreFRQs);

export function getFRQsByType(type: number): FRQProblem[] {
  return frqs.filter((f) => f.type === type);
}

export function getAllFRQs(): FRQProblem[] {
  return frqs;
}

export const FRQ_TYPE_NAMES: Record<number, string> = {
  1: "Methods & Control Structures",
  2: "Class Design",
  3: "ArrayList Operations",
  4: "2D Array Traversal",
};
