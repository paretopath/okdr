// Working Memory / Letter-Number Series Items
// Format: Mixed letter-number sequences — identify pattern and complete
// Based on ICAR Letter-Number Series format (public domain)

export interface WorkingMemoryItem {
  id: string;
  prompt: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: number;
}

export const WORKING_MEMORY_ITEMS: WorkingMemoryItem[] = [
  {
    id: "wm_01",
    prompt: "In the following series, letters and numbers alternate. Identify the pattern and choose the answer.",
    question: "A1 B2 C3 D4 ___",
    options: ["E4", "E5", "F5", "D5", "E6"],
    correctIndex: 1,
    difficulty: 1,
  },
  {
    id: "wm_02",
    prompt: "Letters increase alphabetically; numbers follow a pattern.",
    question: "Z1 Y2 X4 W8 ___",
    options: ["V16", "U16", "V12", "V8", "U8"],
    correctIndex: 0,
    difficulty: 2,
  },
  {
    id: "wm_03",
    prompt: "Both letters and numbers follow independent patterns.",
    question: "A2 C4 E8 G16 ___",
    options: ["H32", "I32", "H24", "I24", "J32"],
    correctIndex: 1,
    difficulty: 2,
  },
  {
    id: "wm_04",
    prompt: "Identify the rule governing both letters and numbers.",
    question: "B3 D6 F9 H12 ___",
    options: ["I15", "J14", "J15", "K15", "I12"],
    correctIndex: 2,
    difficulty: 3,
  },
  {
    id: "wm_05",
    prompt: "A more complex interleaved pattern — letters skip and numbers change by a varying amount.",
    question: "A1 C4 F9 J16 ___",
    options: ["O25", "N25", "O20", "N20", "P25"],
    correctIndex: 0,
    difficulty: 4,
  },
];
