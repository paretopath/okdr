// Numerical Sequence Items — Inductive / Fluid Reasoning (Gf)
// Format: "What comes next? 2, 4, 6, ___"
// Ordered by difficulty (1=easiest, 10=hardest)

export interface NumericalItem {
  id: string;
  sequence: string;     // displayed sequence with blank: "2, 4, 6, ___"
  options: string[];    // 5 options as strings
  correctIndex: number; // 0-indexed
  rule: string;         // brief rule description (for internal reference)
  difficulty: number;
}

export const NUMERICAL_ITEMS: NumericalItem[] = [
  {
    id: "num_01",
    sequence: "2, 4, 6, 8, ___",
    options: ["9", "10", "11", "12", "14"],
    correctIndex: 1,
    rule: "+2 each time",
    difficulty: 1,
  },
  {
    id: "num_02",
    sequence: "3, 6, 12, 24, ___",
    options: ["30", "36", "48", "42", "28"],
    correctIndex: 2,
    rule: "×2 each time",
    difficulty: 1,
  },
  {
    id: "num_03",
    sequence: "1, 4, 9, 16, ___",
    options: ["20", "25", "21", "24", "36"],
    correctIndex: 1,
    rule: "Perfect squares: 1², 2², 3², 4², 5²",
    difficulty: 2,
  },
  {
    id: "num_04",
    sequence: "100, 90, 81, 73, ___",
    options: ["64", "66", "65", "67", "60"],
    correctIndex: 1,
    rule: "Decreasing differences: -10, -9, -8, -7...",
    difficulty: 2,
  },
  {
    id: "num_05",
    sequence: "1, 1, 2, 3, 5, 8, ___",
    options: ["11", "12", "13", "14", "16"],
    correctIndex: 2,
    rule: "Fibonacci: each term = sum of two preceding",
    difficulty: 2,
  },
  {
    id: "num_06",
    sequence: "2, 6, 12, 20, 30, ___",
    options: ["40", "42", "44", "38", "36"],
    correctIndex: 1,
    rule: "n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7",
    difficulty: 3,
  },
  {
    id: "num_07",
    sequence: "729, 243, 81, 27, ___",
    options: ["3", "9", "6", "12", "18"],
    correctIndex: 1,
    rule: "÷3 each time (powers of 3 descending)",
    difficulty: 3,
  },
  {
    id: "num_08",
    sequence: "3, 7, 13, 21, 31, ___",
    options: ["40", "41", "43", "45", "42"],
    correctIndex: 2,
    rule: "Differences: +4, +6, +8, +10, +12 (increasing by 2)",
    difficulty: 3,
  },
  {
    id: "num_09",
    sequence: "2, 3, 5, 7, 11, 13, ___",
    options: ["15", "16", "17", "18", "19"],
    correctIndex: 2,
    rule: "Prime numbers",
    difficulty: 4,
  },
  {
    id: "num_10",
    sequence: "4, 9, 25, 49, 121, ___",
    options: ["144", "169", "196", "225", "256"],
    correctIndex: 1,
    rule: "Squares of primes: 2², 3², 5², 7², 11², 13²",
    difficulty: 5,
  },
];
