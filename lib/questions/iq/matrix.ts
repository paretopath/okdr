// Matrix Reasoning Items — Fluid Intelligence (Gf)
// Format: 3×3 grid of shapes; last cell is blank; choose from 4 options
// Inspired by Raven's Progressive Matrices and ICAR puzzle format
// Each item defined as a structured data object rendered by MatrixItem.tsx

export type ShapeType = "circle" | "square" | "triangle" | "diamond" | "cross" | "star" | "pentagon" | "hexagon";
export type FillType = "filled" | "outline" | "striped" | "dotted";
export type SizeType = "small" | "medium" | "large";

export interface Shape {
  type: ShapeType;
  fill: FillType;
  size: SizeType;
  count?: number;     // how many of this shape appear in the cell (1-3)
  rotation?: number;  // degrees (0, 45, 90, 135, 180)
}

export interface MatrixItem {
  id: string;
  // 8 cells: [row0col0, row0col1, row0col2, row1col0, row1col1, row1col2, row2col0, row2col1]
  // 9th cell (row2col2) is the answer
  cells: Shape[][];      // 8 arrays of shapes (one per cell)
  options: Shape[][];    // 4 answer options (one correct)
  correctIndex: number;
  difficulty: number;
  rule: string;          // internal description of the transformation rule
}

export const MATRIX_ITEMS: MatrixItem[] = [
  // ── Item 1: Shape type changes across rows (easy) ──────────────────────────
  {
    id: "mx_01",
    difficulty: 1,
    rule: "Each row uses a different shape; each column uses a different fill",
    cells: [
      [{ type: "circle",   fill: "filled",  size: "medium" }],
      [{ type: "circle",   fill: "outline", size: "medium" }],
      [{ type: "circle",   fill: "striped", size: "medium" }],
      [{ type: "square",   fill: "filled",  size: "medium" }],
      [{ type: "square",   fill: "outline", size: "medium" }],
      [{ type: "square",   fill: "striped", size: "medium" }],
      [{ type: "triangle", fill: "filled",  size: "medium" }],
      [{ type: "triangle", fill: "outline", size: "medium" }],
    ],
    options: [
      [{ type: "triangle", fill: "striped", size: "medium" }], // correct
      [{ type: "triangle", fill: "filled",  size: "medium" }],
      [{ type: "circle",   fill: "striped", size: "medium" }],
      [{ type: "square",   fill: "striped", size: "medium" }],
    ],
    correctIndex: 0,
  },

  // ── Item 2: Size progression (easy) ─────────────────────────────────────────
  {
    id: "mx_02",
    difficulty: 1,
    rule: "Size increases left-to-right in each row; shape constant within column",
    cells: [
      [{ type: "circle",   fill: "filled", size: "small"  }],
      [{ type: "circle",   fill: "filled", size: "medium" }],
      [{ type: "circle",   fill: "filled", size: "large"  }],
      [{ type: "square",   fill: "filled", size: "small"  }],
      [{ type: "square",   fill: "filled", size: "medium" }],
      [{ type: "square",   fill: "filled", size: "large"  }],
      [{ type: "triangle", fill: "filled", size: "small"  }],
      [{ type: "triangle", fill: "filled", size: "medium" }],
    ],
    options: [
      [{ type: "triangle", fill: "filled", size: "large"  }], // correct
      [{ type: "triangle", fill: "filled", size: "small"  }],
      [{ type: "circle",   fill: "filled", size: "large"  }],
      [{ type: "square",   fill: "filled", size: "large"  }],
    ],
    correctIndex: 0,
  },

  // ── Item 3: Count increases (easy-medium) ────────────────────────────────────
  {
    id: "mx_03",
    difficulty: 2,
    rule: "Count of shapes increases by 1 each column; shape constant per row",
    cells: [
      [{ type: "circle",   fill: "filled", size: "small", count: 1 }],
      [{ type: "circle",   fill: "filled", size: "small", count: 2 }],
      [{ type: "circle",   fill: "filled", size: "small", count: 3 }],
      [{ type: "square",   fill: "filled", size: "small", count: 1 }],
      [{ type: "square",   fill: "filled", size: "small", count: 2 }],
      [{ type: "square",   fill: "filled", size: "small", count: 3 }],
      [{ type: "triangle", fill: "filled", size: "small", count: 1 }],
      [{ type: "triangle", fill: "filled", size: "small", count: 2 }],
    ],
    options: [
      [{ type: "triangle", fill: "filled", size: "small", count: 3 }], // correct
      [{ type: "triangle", fill: "filled", size: "small", count: 2 }],
      [{ type: "triangle", fill: "filled", size: "small", count: 1 }],
      [{ type: "circle",   fill: "filled", size: "small", count: 3 }],
    ],
    correctIndex: 0,
  },

  // ── Item 4: Fill changes + rotation (medium) ─────────────────────────────────
  {
    id: "mx_04",
    difficulty: 2,
    rule: "Fill: filled→outline→striped across rows; rotation 0→45→90 down columns",
    cells: [
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 0  }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 0  }],
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 0  }],
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 45 }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 45 }],
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 45 }],
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 90 }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 90 }],
    ],
    options: [
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 90  }], // correct
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 90  }],
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 135 }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 90  }],
    ],
    correctIndex: 0,
  },

  // ── Item 5: Two-attribute rule (medium) ──────────────────────────────────────
  {
    id: "mx_05",
    difficulty: 2,
    rule: "Shape: circle→square→diamond (rows); Fill: filled→outline→dotted (cols)",
    cells: [
      [{ type: "circle",  fill: "filled",  size: "medium" }],
      [{ type: "circle",  fill: "outline", size: "medium" }],
      [{ type: "circle",  fill: "dotted",  size: "medium" }],
      [{ type: "square",  fill: "filled",  size: "medium" }],
      [{ type: "square",  fill: "outline", size: "medium" }],
      [{ type: "square",  fill: "dotted",  size: "medium" }],
      [{ type: "diamond", fill: "filled",  size: "medium" }],
      [{ type: "diamond", fill: "outline", size: "medium" }],
    ],
    options: [
      [{ type: "diamond", fill: "dotted",  size: "medium" }], // correct
      [{ type: "diamond", fill: "filled",  size: "medium" }],
      [{ type: "circle",  fill: "dotted",  size: "medium" }],
      [{ type: "square",  fill: "dotted",  size: "medium" }],
    ],
    correctIndex: 0,
  },

  // ── Item 6: Three-attribute rule (medium-hard) ───────────────────────────────
  {
    id: "mx_06",
    difficulty: 3,
    rule: "Shape+Size+Fill all change; each attribute uses all 3 values in each row/col",
    cells: [
      [{ type: "circle",   fill: "filled",  size: "small"  }],
      [{ type: "square",   fill: "outline", size: "medium" }],
      [{ type: "triangle", fill: "striped", size: "large"  }],
      [{ type: "square",   fill: "striped", size: "small"  }],
      [{ type: "triangle", fill: "filled",  size: "medium" }],
      [{ type: "circle",   fill: "outline", size: "large"  }],
      [{ type: "triangle", fill: "outline", size: "small"  }],
      [{ type: "circle",   fill: "striped", size: "medium" }],
    ],
    options: [
      [{ type: "square",   fill: "filled",  size: "large"  }], // correct
      [{ type: "square",   fill: "striped", size: "large"  }],
      [{ type: "circle",   fill: "filled",  size: "large"  }],
      [{ type: "triangle", fill: "filled",  size: "large"  }],
    ],
    correctIndex: 0,
  },

  // ── Item 7: Compound count + shape progression (hard) ───────────────────────
  {
    id: "mx_07",
    difficulty: 3,
    rule: "Shape type cycles by column; count increases by 1 each row",
    cells: [
      [{ type: "circle",   fill: "filled", size: "small", count: 1 }],
      [{ type: "square",   fill: "filled", size: "small", count: 1 }],
      [{ type: "triangle", fill: "filled", size: "small", count: 1 }],
      [{ type: "circle",   fill: "filled", size: "small", count: 2 }],
      [{ type: "square",   fill: "filled", size: "small", count: 2 }],
      [{ type: "triangle", fill: "filled", size: "small", count: 2 }],
      [{ type: "circle",   fill: "filled", size: "small", count: 3 }],
      [{ type: "square",   fill: "filled", size: "small", count: 3 }],
    ],
    options: [
      [{ type: "triangle", fill: "filled", size: "small", count: 3 }], // correct
      [{ type: "circle",   fill: "filled", size: "small", count: 3 }],
      [{ type: "triangle", fill: "filled", size: "small", count: 2 }],
      [{ type: "diamond",  fill: "filled", size: "small", count: 3 }],
    ],
    correctIndex: 0,
  },

  // ── Item 8: Odd-one-out style (hard) ────────────────────────────────────────
  {
    id: "mx_08",
    difficulty: 4,
    rule: "Each row contains each shape exactly once; each col contains each fill once; sizes increase diagonally",
    cells: [
      [{ type: "circle",   fill: "filled",  size: "small"  }],
      [{ type: "square",   fill: "outline", size: "small"  }],
      [{ type: "diamond",  fill: "striped", size: "small"  }],
      [{ type: "diamond",  fill: "filled",  size: "medium" }],
      [{ type: "circle",   fill: "striped", size: "medium" }],
      [{ type: "square",   fill: "outline", size: "medium" }],
      [{ type: "square",   fill: "striped", size: "large"  }],
      [{ type: "diamond",  fill: "outline", size: "large"  }],
    ],
    options: [
      [{ type: "circle",  fill: "filled",  size: "large"  }], // correct
      [{ type: "circle",  fill: "outline", size: "large"  }],
      [{ type: "circle",  fill: "striped", size: "large"  }],
      [{ type: "square",  fill: "filled",  size: "large"  }],
    ],
    correctIndex: 0,
  },

  // ── Item 9: Rotation progression (hard) ──────────────────────────────────────
  {
    id: "mx_09",
    difficulty: 4,
    rule: "Shape rotates 45° clockwise each column; fill changes each row",
    cells: [
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 0   }],
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 45  }],
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 90  }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 0   }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 45  }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 90  }],
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 0   }],
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 45  }],
    ],
    options: [
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 90  }], // correct
      [{ type: "triangle", fill: "striped", size: "medium", rotation: 135 }],
      [{ type: "triangle", fill: "filled",  size: "medium", rotation: 90  }],
      [{ type: "triangle", fill: "outline", size: "medium", rotation: 90  }],
    ],
    correctIndex: 0,
  },

  // ── Item 10: Cross-attribute interaction (very hard) ─────────────────────────
  {
    id: "mx_10",
    difficulty: 4,
    rule: "Size+Fill interact; count = (row+1); shape determined by col position cycling through 4 shapes",
    cells: [
      [{ type: "circle",   fill: "filled",  size: "small",  count: 1 }],
      [{ type: "square",   fill: "outline", size: "small",  count: 1 }],
      [{ type: "triangle", fill: "striped", size: "small",  count: 1 }],
      [{ type: "circle",   fill: "outline", size: "medium", count: 2 }],
      [{ type: "square",   fill: "striped", size: "medium", count: 2 }],
      [{ type: "triangle", fill: "filled",  size: "medium", count: 2 }],
      [{ type: "circle",   fill: "striped", size: "large",  count: 3 }],
      [{ type: "square",   fill: "filled",  size: "large",  count: 3 }],
    ],
    options: [
      [{ type: "triangle", fill: "outline", size: "large", count: 3 }], // correct
      [{ type: "triangle", fill: "filled",  size: "large", count: 3 }],
      [{ type: "triangle", fill: "striped", size: "large", count: 3 }],
      [{ type: "diamond",  fill: "outline", size: "large", count: 3 }],
    ],
    correctIndex: 0,
  },

  // ── Items 11-15: Additional items at varying difficulty ─────────────────────

  {
    id: "mx_11",
    difficulty: 1,
    rule: "Diagonal: same shape, same fill; size cycles",
    cells: [
      [{ type: "star", fill: "filled", size: "large"  }],
      [{ type: "star", fill: "filled", size: "small"  }],
      [{ type: "star", fill: "filled", size: "medium" }],
      [{ type: "star", fill: "filled", size: "small"  }],
      [{ type: "star", fill: "filled", size: "medium" }],
      [{ type: "star", fill: "filled", size: "large"  }],
      [{ type: "star", fill: "filled", size: "medium" }],
      [{ type: "star", fill: "filled", size: "large"  }],
    ],
    options: [
      [{ type: "star", fill: "filled", size: "small"  }], // correct
      [{ type: "star", fill: "filled", size: "medium" }],
      [{ type: "star", fill: "filled", size: "large"  }],
      [{ type: "star", fill: "outline", size: "small" }],
    ],
    correctIndex: 0,
  },

  {
    id: "mx_12",
    difficulty: 2,
    rule: "Each row: shape count = row index+1; each col: different shape",
    cells: [
      [{ type: "circle",  fill: "outline", size: "small", count: 1 }],
      [{ type: "square",  fill: "outline", size: "small", count: 1 }],
      [{ type: "diamond", fill: "outline", size: "small", count: 1 }],
      [{ type: "circle",  fill: "outline", size: "small", count: 2 }],
      [{ type: "square",  fill: "outline", size: "small", count: 2 }],
      [{ type: "diamond", fill: "outline", size: "small", count: 2 }],
      [{ type: "circle",  fill: "outline", size: "small", count: 3 }],
      [{ type: "square",  fill: "outline", size: "small", count: 3 }],
    ],
    options: [
      [{ type: "diamond", fill: "outline", size: "small", count: 3 }], // correct
      [{ type: "diamond", fill: "filled",  size: "small", count: 3 }],
      [{ type: "circle",  fill: "outline", size: "small", count: 3 }],
      [{ type: "diamond", fill: "outline", size: "small", count: 2 }],
    ],
    correctIndex: 0,
  },

  {
    id: "mx_13",
    difficulty: 3,
    rule: "Shapes pair across the diagonal; fill = XOR of row and col fills",
    cells: [
      [{ type: "pentagon", fill: "filled",  size: "medium" }],
      [{ type: "hexagon",  fill: "outline", size: "medium" }],
      [{ type: "circle",   fill: "striped", size: "medium" }],
      [{ type: "hexagon",  fill: "striped", size: "medium" }],
      [{ type: "circle",   fill: "filled",  size: "medium" }],
      [{ type: "pentagon", fill: "outline", size: "medium" }],
      [{ type: "circle",   fill: "outline", size: "medium" }],
      [{ type: "pentagon", fill: "striped", size: "medium" }],
    ],
    options: [
      [{ type: "hexagon", fill: "filled",  size: "medium" }], // correct
      [{ type: "hexagon", fill: "outline", size: "medium" }],
      [{ type: "hexagon", fill: "striped", size: "medium" }],
      [{ type: "circle",  fill: "filled",  size: "medium" }],
    ],
    correctIndex: 0,
  },

  {
    id: "mx_14",
    difficulty: 4,
    rule: "Size mirrors: rows go S→M→L; cols go L→M→S; fill is always striped",
    cells: [
      [{ type: "square", fill: "striped", size: "small"  }],
      [{ type: "square", fill: "striped", size: "small"  }],
      [{ type: "square", fill: "striped", size: "small"  }],
      [{ type: "square", fill: "striped", size: "medium" }],
      [{ type: "square", fill: "striped", size: "medium" }],
      [{ type: "square", fill: "striped", size: "medium" }],
      [{ type: "square", fill: "striped", size: "large"  }],
      [{ type: "square", fill: "striped", size: "large"  }],
    ],
    options: [
      [{ type: "square", fill: "striped", size: "large"  }], // correct
      [{ type: "square", fill: "filled",  size: "large"  }],
      [{ type: "circle", fill: "striped", size: "large"  }],
      [{ type: "square", fill: "striped", size: "medium" }],
    ],
    correctIndex: 0,
  },

  {
    id: "mx_15",
    difficulty: 5,
    rule: "4-attribute: shape+fill+size+count all permuted; each combo appears once in grid",
    cells: [
      [{ type: "circle",   fill: "filled",  size: "small",  count: 1 }],
      [{ type: "square",   fill: "outline", size: "medium", count: 2 }],
      [{ type: "triangle", fill: "striped", size: "large",  count: 3 }],
      [{ type: "square",   fill: "striped", size: "small",  count: 3 }],
      [{ type: "triangle", fill: "filled",  size: "medium", count: 1 }],
      [{ type: "circle",   fill: "outline", size: "large",  count: 2 }],
      [{ type: "triangle", fill: "outline", size: "small",  count: 2 }],
      [{ type: "circle",   fill: "striped", size: "medium", count: 3 }],
    ],
    options: [
      [{ type: "square", fill: "filled",  size: "large", count: 1 }], // correct
      [{ type: "square", fill: "filled",  size: "large", count: 2 }],
      [{ type: "square", fill: "striped", size: "large", count: 1 }],
      [{ type: "circle", fill: "filled",  size: "large", count: 1 }],
    ],
    correctIndex: 0,
  },
];
