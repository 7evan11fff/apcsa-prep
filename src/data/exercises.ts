import type { Exercise } from "@/types";

const exercises: Exercise[] = [
  {
    id: "ex-sum-array",
    topicId: "array-algorithms",
    title: "Sum of Array",
    description: "Write a method that returns the sum of all elements in an integer array.",
    difficulty: 1,
    starterCode: `public class Main {
    public static int sumArray(int[] arr) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(sumArray(new int[]{1, 2, 3, 4, 5}));
        System.out.println(sumArray(new int[]{-1, 0, 1}));
        System.out.println(sumArray(new int[]{}));
    }
}`,
    sampleSolution: `public class Main {
    public static int sumArray(int[] arr) {
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println(sumArray(new int[]{1, 2, 3, 4, 5}));
        System.out.println(sumArray(new int[]{-1, 0, 1}));
        System.out.println(sumArray(new int[]{}));
    }
}`,
    testCases: [
      { input: "", expectedOutput: "15", description: "Sum of {1,2,3,4,5} = 15", hidden: false },
      { input: "", expectedOutput: "0", description: "Sum of {-1,0,1} = 0", hidden: false },
      { input: "", expectedOutput: "0", description: "Sum of empty array = 0", hidden: false },
    ],
    hints: [
      "Start with a variable initialized to 0 to accumulate the sum.",
      "Use a for-each loop to iterate over every element in the array.",
      "Inside the loop, add each element to your sum variable. Return the sum after the loop.",
    ],
  },
  {
    id: "ex-find-max",
    topicId: "array-algorithms",
    title: "Find Maximum",
    description: "Write a method that returns the largest element in a non-empty integer array.",
    difficulty: 1,
    starterCode: `public class Main {
    public static int findMax(int[] arr) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(findMax(new int[]{3, 7, 2, 9, 4}));
        System.out.println(findMax(new int[]{-5, -1, -8}));
        System.out.println(findMax(new int[]{42}));
    }
}`,
    sampleSolution: `public class Main {
    public static int findMax(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println(findMax(new int[]{3, 7, 2, 9, 4}));
        System.out.println(findMax(new int[]{-5, -1, -8}));
        System.out.println(findMax(new int[]{42}));
    }
}`,
    testCases: [
      { input: "", expectedOutput: "9", description: "Max of {3,7,2,9,4} = 9", hidden: false },
      { input: "", expectedOutput: "-1", description: "Max of {-5,-1,-8} = -1", hidden: false },
      { input: "", expectedOutput: "42", description: "Max of {42} = 42", hidden: false },
    ],
    hints: [
      "Initialize your max variable to the first element of the array, not 0.",
      "Loop through the remaining elements starting from index 1.",
      "If the current element is greater than max, update max.",
    ],
  },
  {
    id: "ex-reverse-string",
    topicId: "string-iteration",
    title: "Reverse a String",
    description: "Write a method that returns the reverse of a given String.",
    difficulty: 2,
    starterCode: `public class Main {
    public static String reverse(String s) {
        // Your code here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(reverse("hello"));
        System.out.println(reverse("AP CSA"));
        System.out.println(reverse(""));
    }
}`,
    sampleSolution: `public class Main {
    public static String reverse(String s) {
        String result = "";
        for (int i = s.length() - 1; i >= 0; i--) {
            result += s.charAt(i);
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(reverse("hello"));
        System.out.println(reverse("AP CSA"));
        System.out.println(reverse(""));
    }
}`,
    testCases: [
      { input: "", expectedOutput: "olleh", description: "reverse(\"hello\") = \"olleh\"", hidden: false },
      { input: "", expectedOutput: "ASC PA", description: "reverse(\"AP CSA\") = \"ASC PA\"", hidden: false },
      { input: "", expectedOutput: "", description: "reverse(\"\") = \"\"", hidden: false },
    ],
    hints: [
      "Build a new String by iterating backward through the original.",
      "Use a for loop starting at s.length() - 1, going down to 0.",
      "Use charAt(i) to get each character and concatenate it to your result.",
    ],
  },
  {
    id: "ex-count-vowels",
    topicId: "string-iteration",
    title: "Count Vowels",
    description: "Write a method that counts the number of vowels (a, e, i, o, u) in a String, case-insensitive.",
    difficulty: 2,
    starterCode: `public class Main {
    public static int countVowels(String s) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(countVowels("Hello World"));
        System.out.println(countVowels("AEIOU"));
        System.out.println(countVowels("xyz"));
    }
}`,
    sampleSolution: `public class Main {
    public static int countVowels(String s) {
        int count = 0;
        String vowels = "aeiouAEIOU";
        for (int i = 0; i < s.length(); i++) {
            if (vowels.indexOf(s.charAt(i)) != -1) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println(countVowels("Hello World"));
        System.out.println(countVowels("AEIOU"));
        System.out.println(countVowels("xyz"));
    }
}`,
    testCases: [
      { input: "", expectedOutput: "3", description: "\"Hello World\" has 3 vowels", hidden: false },
      { input: "", expectedOutput: "5", description: "\"AEIOU\" has 5 vowels", hidden: false },
      { input: "", expectedOutput: "0", description: "\"xyz\" has 0 vowels", hidden: false },
    ],
    hints: [
      "Iterate through each character of the string.",
      "Check if each character is one of 'a', 'e', 'i', 'o', 'u' (case-insensitive).",
      "You can use a String of vowels and indexOf to check membership.",
    ],
  },
  {
    id: "ex-is-palindrome",
    topicId: "string-iteration",
    title: "Palindrome Check",
    description: "Write a method that checks if a String is a palindrome (reads the same forwards and backwards).",
    difficulty: 2,
    starterCode: `public class Main {
    public static boolean isPalindrome(String s) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));
        System.out.println(isPalindrome("hello"));
        System.out.println(isPalindrome("a"));
    }
}`,
    sampleSolution: `public class Main {
    public static boolean isPalindrome(String s) {
        for (int i = 0; i < s.length() / 2; i++) {
            if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));
        System.out.println(isPalindrome("hello"));
        System.out.println(isPalindrome("a"));
    }
}`,
    testCases: [
      { input: "", expectedOutput: "true", description: "\"racecar\" is a palindrome", hidden: false },
      { input: "", expectedOutput: "false", description: "\"hello\" is not a palindrome", hidden: false },
      { input: "", expectedOutput: "true", description: "\"a\" is a palindrome", hidden: false },
    ],
    hints: [
      "Compare characters from the beginning and end, moving inward.",
      "You only need to check up to the middle of the string.",
      "If any pair doesn't match, return false immediately.",
    ],
  },
  {
    id: "ex-fizzbuzz",
    topicId: "conditional-logic",
    title: "FizzBuzz",
    description: "Print numbers 1 to n. For multiples of 3 print 'Fizz', multiples of 5 print 'Buzz', multiples of both print 'FizzBuzz'.",
    difficulty: 2,
    starterCode: `public class Main {
    public static void fizzBuzz(int n) {
        // Your code here
    }

    public static void main(String[] args) {
        fizzBuzz(15);
    }
}`,
    sampleSolution: `public class Main {
    public static void fizzBuzz(int n) {
        for (int i = 1; i <= n; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }

    public static void main(String[] args) {
        fizzBuzz(15);
    }
}`,
    testCases: [
      { input: "", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz", description: "FizzBuzz from 1 to 15", hidden: false },
    ],
    hints: [
      "Check divisibility by both 3 AND 5 first (FizzBuzz case).",
      "Use the modulus operator (%) to check divisibility.",
      "Order matters: check the combined condition before the individual ones.",
    ],
  },
  {
    id: "ex-arraylist-remove-evens",
    topicId: "arraylist-algorithms",
    title: "Remove Even Numbers",
    description: "Write a method that removes all even numbers from an ArrayList<Integer> and returns the modified list.",
    difficulty: 3,
    starterCode: `import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static ArrayList<Integer> removeEvens(ArrayList<Integer> list) {
        // Your code here
        return list;
    }

    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));
        System.out.println(removeEvens(nums));
    }
}`,
    sampleSolution: `import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static ArrayList<Integer> removeEvens(ArrayList<Integer> list) {
        for (int i = list.size() - 1; i >= 0; i--) {
            if (list.get(i) % 2 == 0) {
                list.remove(i);
            }
        }
        return list;
    }

    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));
        System.out.println(removeEvens(nums));
    }
}`,
    testCases: [
      { input: "", expectedOutput: "[1, 3, 5]", description: "Remove evens from [1,2,3,4,5,6]", hidden: false },
    ],
    hints: [
      "When removing elements from an ArrayList, iterate backwards to avoid skipping elements.",
      "Use the modulus operator (% 2 == 0) to check if a number is even.",
      "Traverse from list.size() - 1 down to 0, removing evens as you go.",
    ],
  },
  {
    id: "ex-binary-search",
    topicId: "binary-search",
    title: "Binary Search",
    description: "Implement binary search on a sorted array. Return the index of the target, or -1 if not found.",
    difficulty: 3,
    starterCode: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println(binarySearch(sorted, 23));
        System.out.println(binarySearch(sorted, 10));
        System.out.println(binarySearch(sorted, 2));
    }
}`,
    sampleSolution: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println(binarySearch(sorted, 23));
        System.out.println(binarySearch(sorted, 10));
        System.out.println(binarySearch(sorted, 2));
    }
}`,
    testCases: [
      { input: "", expectedOutput: "5", description: "Find 23 in sorted array → index 5", hidden: false },
      { input: "", expectedOutput: "-1", description: "10 not found → -1", hidden: false },
      { input: "", expectedOutput: "0", description: "Find 2 → index 0", hidden: false },
    ],
    hints: [
      "Maintain two pointers: low (start) and high (end).",
      "Calculate mid = (low + high) / 2. Compare arr[mid] with target.",
      "If target > arr[mid], search right half (low = mid + 1). If less, search left (high = mid - 1).",
    ],
  },
  {
    id: "ex-selection-sort",
    topicId: "selection-sort",
    title: "Selection Sort",
    description: "Implement selection sort to sort an array in ascending order.",
    difficulty: 3,
    starterCode: `public class Main {
    public static void selectionSort(int[] arr) {
        // Your code here
    }

    public static void main(String[] args) {
        int[] nums = {64, 25, 12, 22, 11};
        selectionSort(nums);
        for (int n : nums) System.out.print(n + " ");
    }
}`,
    sampleSolution: `public class Main {
    public static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] nums = {64, 25, 12, 22, 11};
        selectionSort(nums);
        for (int n : nums) System.out.print(n + " ");
    }
}`,
    testCases: [
      { input: "", expectedOutput: "11 12 22 25 64", description: "Sort {64,25,12,22,11}", hidden: false },
    ],
    hints: [
      "For each position i, find the minimum element in the remaining unsorted portion.",
      "The inner loop finds the index of the minimum element from i+1 to the end.",
      "Swap the minimum element with the element at position i.",
    ],
  },
  {
    id: "ex-student-class",
    topicId: "class-anatomy",
    title: "Create a Student Class",
    description: "Create a Student class with name and GPA, including constructor, getters, and an isHonorRoll method.",
    difficulty: 2,
    starterCode: `public class Main {
    // Define Student class here with:
    // - private String name
    // - private double gpa
    // - Constructor taking name and gpa
    // - getName() and getGpa() methods
    // - isHonorRoll() returns true if gpa >= 3.5

    public static void main(String[] args) {
        // Uncomment after implementing Student:
        // Student s = new Student("Alice", 3.8);
        // System.out.println(s.getName());
        // System.out.println(s.getGpa());
        // System.out.println(s.isHonorRoll());
        System.out.println("Implement the Student class!");
    }
}`,
    sampleSolution: `public class Main {
    static class Student {
        private String name;
        private double gpa;

        public Student(String name, double gpa) {
            this.name = name;
            this.gpa = gpa;
        }

        public String getName() { return name; }
        public double getGpa() { return gpa; }
        public boolean isHonorRoll() { return gpa >= 3.5; }
    }

    public static void main(String[] args) {
        Student s = new Student("Alice", 3.8);
        System.out.println(s.getName());
        System.out.println(s.getGpa());
        System.out.println(s.isHonorRoll());
    }
}`,
    testCases: [
      { input: "", expectedOutput: "Alice", description: "getName() returns \"Alice\"", hidden: false },
      { input: "", expectedOutput: "3.8", description: "getGpa() returns 3.8", hidden: false },
      { input: "", expectedOutput: "true", description: "isHonorRoll() with 3.8 GPA = true", hidden: false },
    ],
    hints: [
      "Declare private instance variables for name and gpa.",
      "The constructor should take both values and assign them using this.name = name, etc.",
      "isHonorRoll() just needs to return gpa >= 3.5.",
    ],
  },
];

const moreExercises: Exercise[] = [
  {
    id: "ex-even-odd-count",
    topicId: "loop-algorithms",
    title: "Count Evens and Odds",
    description: "Write a method that prints how many even and odd numbers are in an array.",
    difficulty: 1,
    starterCode: `public class Main {\n    public static void countEvenOdd(int[] arr) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        countEvenOdd(new int[]{1, 2, 3, 4, 5, 6});\n    }\n}`,
    sampleSolution: `public class Main {\n    public static void countEvenOdd(int[] arr) {\n        int even = 0, odd = 0;\n        for (int n : arr) {\n            if (n % 2 == 0) even++;\n            else odd++;\n        }\n        System.out.println(even + " " + odd);\n    }\n\n    public static void main(String[] args) {\n        countEvenOdd(new int[]{1, 2, 3, 4, 5, 6});\n    }\n}`,
    testCases: [{ input: "", expectedOutput: "3 3", description: "3 evens and 3 odds in {1,2,3,4,5,6}", hidden: false }],
    hints: ["Use modulus (%) to check even/odd.", "Keep two counters: one for evens, one for odds.", "n % 2 == 0 means even."],
  },
  {
    id: "ex-average-grade",
    topicId: "array-algorithms",
    title: "Class Average",
    description: "Write a method that returns the average of an int array as a double. Watch out for integer division!",
    difficulty: 2,
    starterCode: `public class Main {\n    public static double average(int[] grades) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(average(new int[]{90, 85, 78, 92, 88}));\n        System.out.println(average(new int[]{100}));\n    }\n}`,
    sampleSolution: `public class Main {\n    public static double average(int[] grades) {\n        int sum = 0;\n        for (int g : grades) sum += g;\n        return (double) sum / grades.length;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(average(new int[]{90, 85, 78, 92, 88}));\n        System.out.println(average(new int[]{100}));\n    }\n}`,
    testCases: [
      { input: "", expectedOutput: "86.6", description: "Average of {90,85,78,92,88} = 86.6", hidden: false },
      { input: "", expectedOutput: "100.0", description: "Average of {100} = 100.0", hidden: false },
    ],
    hints: ["Sum all elements first.", "Cast to double BEFORE dividing: (double) sum / length.", "Don't use sum / length — that's integer division!"],
  },
  {
    id: "ex-2d-row-sum",
    topicId: "2d-array-traversal",
    title: "Row Sums",
    description: "Write a method that returns an array of row sums for a 2D array.",
    difficulty: 3,
    starterCode: `public class Main {\n    public static int[] rowSums(int[][] grid) {\n        // Your code here\n        return new int[0];\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\n        for (int s : rowSums(grid)) System.out.print(s + " ");\n    }\n}`,
    sampleSolution: `public class Main {\n    public static int[] rowSums(int[][] grid) {\n        int[] sums = new int[grid.length];\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[r].length; c++) {\n                sums[r] += grid[r][c];\n            }\n        }\n        return sums;\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\n        for (int s : rowSums(grid)) System.out.print(s + " ");\n    }\n}`,
    testCases: [{ input: "", expectedOutput: "6 15 24", description: "Row sums of 3x3 grid", hidden: false }],
    hints: ["Create result array with grid.length elements.", "Use nested loops: outer for rows, inner for columns.", "Accumulate sum for each row separately."],
  },
  {
    id: "ex-string-frequency",
    topicId: "string-iteration",
    title: "Character Frequency",
    description: "Write a method that returns how many times a character appears in a string.",
    difficulty: 1,
    starterCode: `public class Main {\n    public static int charCount(String s, char target) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(charCount("hello world", 'l'));\n        System.out.println(charCount("aabbbcc", 'b'));\n        System.out.println(charCount("xyz", 'a'));\n    }\n}`,
    sampleSolution: `public class Main {\n    public static int charCount(String s, char target) {\n        int count = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (s.charAt(i) == target) count++;\n        }\n        return count;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(charCount("hello world", 'l'));\n        System.out.println(charCount("aabbbcc", 'b'));\n        System.out.println(charCount("xyz", 'a'));\n    }\n}`,
    testCases: [
      { input: "", expectedOutput: "3", description: "'l' appears 3 times in 'hello world'", hidden: false },
      { input: "", expectedOutput: "3", description: "'b' appears 3 times in 'aabbbcc'", hidden: false },
      { input: "", expectedOutput: "0", description: "'a' appears 0 times in 'xyz'", hidden: false },
    ],
    hints: ["Loop through each character with charAt(i).", "Compare each character to the target using ==.", "Increment counter when you find a match."],
  },
  {
    id: "ex-remove-duplicates",
    topicId: "arraylist-algorithms",
    title: "Remove Duplicates",
    description: "Write a method that removes duplicate values from an ArrayList, keeping only the first occurrence.",
    difficulty: 3,
    starterCode: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void removeDuplicates(ArrayList<Integer> list) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1,3,3,2,1,4,2));\n        removeDuplicates(nums);\n        System.out.println(nums);\n    }\n}`,
    sampleSolution: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void removeDuplicates(ArrayList<Integer> list) {\n        for (int i = list.size() - 1; i >= 1; i--) {\n            for (int j = 0; j < i; j++) {\n                if (list.get(i).equals(list.get(j))) {\n                    list.remove(i);\n                    break;\n                }\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1,3,3,2,1,4,2));\n        removeDuplicates(nums);\n        System.out.println(nums);\n    }\n}`,
    testCases: [{ input: "", expectedOutput: "[1, 3, 2, 4]", description: "Remove duplicates keeping first occurrence", hidden: false }],
    hints: ["Iterate backward to safely remove.", "For each element, check if it already appeared earlier.", "Use .equals() to compare Integer objects, not ==."],
  },
  {
    id: "ex-insertion-sort",
    topicId: "insertion-sort",
    title: "Insertion Sort",
    description: "Implement insertion sort to sort an array in ascending order.",
    difficulty: 4,
    starterCode: `public class Main {\n    public static void insertionSort(int[] arr) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {5, 2, 8, 1, 9, 3};\n        insertionSort(nums);\n        for (int n : nums) System.out.print(n + " ");\n    }\n}`,
    sampleSolution: `public class Main {\n    public static void insertionSort(int[] arr) {\n        for (int i = 1; i < arr.length; i++) {\n            int key = arr[i];\n            int j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {5, 2, 8, 1, 9, 3};\n        insertionSort(nums);\n        for (int n : nums) System.out.print(n + " ");\n    }\n}`,
    testCases: [{ input: "", expectedOutput: "1 2 3 5 8 9", description: "Sort {5,2,8,1,9,3}", hidden: false }],
    hints: ["Start from index 1. Save arr[i] as key.", "Shift larger elements to the right.", "Insert key at the correct position."],
  },
  {
    id: "ex-rectangle-class",
    topicId: "method-decomposition",
    title: "Rectangle Class",
    description: "Create a Rectangle class with width/height, getArea(), getPerimeter(), and isSquare().",
    difficulty: 2,
    starterCode: `public class Main {\n    // Create Rectangle class here\n\n    public static void main(String[] args) {\n        // Uncomment after implementing:\n        // Rectangle r = new Rectangle(5, 3);\n        // System.out.println(r.getArea());\n        // System.out.println(r.getPerimeter());\n        // System.out.println(r.isSquare());\n        System.out.println("Implement Rectangle!");\n    }\n}`,
    sampleSolution: `public class Main {\n    static class Rectangle {\n        private double width, height;\n        public Rectangle(double w, double h) { width = w; height = h; }\n        public double getArea() { return width * height; }\n        public double getPerimeter() { return 2 * (width + height); }\n        public boolean isSquare() { return width == height; }\n    }\n\n    public static void main(String[] args) {\n        Rectangle r = new Rectangle(5, 3);\n        System.out.println(r.getArea());\n        System.out.println(r.getPerimeter());\n        System.out.println(r.isSquare());\n    }\n}`,
    testCases: [
      { input: "", expectedOutput: "15.0", description: "Area of 5x3 = 15.0", hidden: false },
      { input: "", expectedOutput: "16.0", description: "Perimeter of 5x3 = 16.0", hidden: false },
      { input: "", expectedOutput: "false", description: "5x3 is not a square", hidden: false },
    ],
    hints: ["Declare private width and height fields.", "Constructor takes two parameters for width and height.", "isSquare() just checks if width equals height."],
  },
  {
    id: "ex-linear-search",
    topicId: "linear-search",
    title: "Linear Search",
    description: "Implement linear search — return the index of a target value or -1 if not found.",
    difficulty: 1,
    starterCode: `public class Main {\n    public static int linearSearch(int[] arr, int target) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] data = {4, 7, 2, 9, 1, 5};\n        System.out.println(linearSearch(data, 9));\n        System.out.println(linearSearch(data, 6));\n    }\n}`,
    sampleSolution: `public class Main {\n    public static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] data = {4, 7, 2, 9, 1, 5};\n        System.out.println(linearSearch(data, 9));\n        System.out.println(linearSearch(data, 6));\n    }\n}`,
    testCases: [
      { input: "", expectedOutput: "3", description: "9 is at index 3", hidden: false },
      { input: "", expectedOutput: "-1", description: "6 is not in array", hidden: false },
    ],
    hints: ["Loop through each index.", "If arr[i] equals target, return i immediately.", "If loop finishes without finding, return -1."],
  },
  {
    id: "ex-matrix-diagonal",
    topicId: "2d-array-traversal",
    title: "Diagonal Sum",
    description: "Write a method that returns the sum of the main diagonal of a square 2D array.",
    difficulty: 3,
    starterCode: `public class Main {\n    public static int diagonalSum(int[][] grid) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println(diagonalSum(grid));\n    }\n}`,
    sampleSolution: `public class Main {\n    public static int diagonalSum(int[][] grid) {\n        int sum = 0;\n        for (int i = 0; i < grid.length; i++) {\n            sum += grid[i][i];\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println(diagonalSum(grid));\n    }\n}`,
    testCases: [{ input: "", expectedOutput: "15", description: "Diagonal 1+5+9 = 15", hidden: false }],
    hints: ["The main diagonal has elements where row == col.", "Use a single loop: grid[i][i].", "Loop from 0 to grid.length - 1."],
  },
  {
    id: "ex-word-lengths",
    topicId: "arraylist-basics",
    title: "Word Lengths",
    description: "Given an ArrayList of Strings, return a new ArrayList of their lengths.",
    difficulty: 2,
    starterCode: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static ArrayList<Integer> wordLengths(ArrayList<String> words) {\n        // Your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        ArrayList<String> words = new ArrayList<>(Arrays.asList("hi","hello","hey"));\n        System.out.println(wordLengths(words));\n    }\n}`,
    sampleSolution: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static ArrayList<Integer> wordLengths(ArrayList<String> words) {\n        ArrayList<Integer> lengths = new ArrayList<>();\n        for (String w : words) lengths.add(w.length());\n        return lengths;\n    }\n\n    public static void main(String[] args) {\n        ArrayList<String> words = new ArrayList<>(Arrays.asList("hi","hello","hey"));\n        System.out.println(wordLengths(words));\n    }\n}`,
    testCases: [{ input: "", expectedOutput: "[2, 5, 3]", description: "Lengths of [hi, hello, hey]", hidden: false }],
    hints: ["Create a new ArrayList<Integer>.", "Loop through each word.", "Add word.length() to the new list."],
  },
];

exercises.push(...moreExercises);

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}

export function getExercisesByTopic(topicId: string): Exercise[] {
  return exercises.filter((e) => e.topicId === topicId);
}

export function getAllExercises(): Exercise[] {
  return exercises;
}
