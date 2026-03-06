// Spatial Reasoning Items — Visual-Spatial Processing (Gv)
// Format: Text + SVG-key items; identifies rotated/mirrored figures
// Based on ICAR Block Rotation and spatial reasoning conventions

export interface SpatialItem {
  id: string;
  type: "rotation" | "mirror" | "folding" | "pattern";
  instruction: string;
  // For rotation/mirror: a target shape key + 4 options with transformations
  targetKey: string;    // refers to pre-defined SVG shape key
  options: Array<{
    key: string;
    transform: string;  // CSS transform string e.g. "rotate(90deg)" or "scaleX(-1)"
    isCorrect: boolean;
  }>;
  difficulty: number;
  correctIndex: number;
}

// We define shape keys for the SVG renderer to look up
// Each shape key maps to a recognisable, asymmetric figure
export const SPATIAL_SHAPES: Record<string, string> = {
  // SVG path data for each shape key (defined as viewBox 0 0 100 100)
  "arrow_right": "M 20 40 L 20 60 L 60 60 L 60 75 L 80 50 L 60 25 L 60 40 Z",
  "L_shape":     "M 20 20 L 20 80 L 50 80 L 50 65 L 35 65 L 35 20 Z",
  "T_shape":     "M 20 20 L 80 20 L 80 40 L 55 40 L 55 80 L 45 80 L 45 40 L 20 40 Z",
  "Z_shape":     "M 20 20 L 70 20 L 70 40 L 40 40 L 40 60 L 80 60 L 80 80 L 30 80 L 30 60 L 60 60 L 60 40 L 20 40 Z",
  "F_shape":     "M 20 20 L 75 20 L 75 35 L 35 35 L 35 48 L 65 48 L 65 63 L 35 63 L 35 80 L 20 80 Z",
  "stair_3":     "M 20 80 L 20 60 L 40 60 L 40 40 L 60 40 L 60 20 L 80 20 L 80 35 L 75 35 L 75 55 L 55 55 L 55 75 L 35 75 L 35 80 Z",
  "hook":        "M 30 20 L 50 20 L 50 65 L 70 65 L 70 80 L 30 80 L 30 65 L 35 65 L 35 35 L 30 35 Z",
  "cross_asym":  "M 35 20 L 65 20 L 65 35 L 80 35 L 80 50 L 65 50 L 65 80 L 35 80 L 35 50 L 20 50 L 20 35 L 35 35 Z",
};

export const SPATIAL_ITEMS: SpatialItem[] = [
  {
    id: "sp_01",
    type: "rotation",
    instruction: "Which image shows the shape rotated 90° clockwise?",
    targetKey: "arrow_right",
    difficulty: 1,
    correctIndex: 1,
    options: [
      { key: "arrow_right", transform: "rotate(0deg)",   isCorrect: false },
      { key: "arrow_right", transform: "rotate(90deg)",  isCorrect: true  },
      { key: "arrow_right", transform: "rotate(180deg)", isCorrect: false },
      { key: "arrow_right", transform: "rotate(270deg)", isCorrect: false },
    ],
  },
  {
    id: "sp_02",
    type: "mirror",
    instruction: "Which image shows the mirror image (flipped horizontally) of the shape?",
    targetKey: "L_shape",
    difficulty: 1,
    correctIndex: 2,
    options: [
      { key: "L_shape", transform: "rotate(90deg)",              isCorrect: false },
      { key: "L_shape", transform: "rotate(180deg)",             isCorrect: false },
      { key: "L_shape", transform: "scaleX(-1)",                 isCorrect: true  },
      { key: "L_shape", transform: "rotate(90deg) scaleX(-1)",   isCorrect: false },
    ],
  },
  {
    id: "sp_03",
    type: "rotation",
    instruction: "Which image shows the shape rotated 180°?",
    targetKey: "T_shape",
    difficulty: 2,
    correctIndex: 0,
    options: [
      { key: "T_shape", transform: "rotate(180deg)", isCorrect: true  },
      { key: "T_shape", transform: "rotate(90deg)",  isCorrect: false },
      { key: "T_shape", transform: "scaleX(-1)",     isCorrect: false },
      { key: "T_shape", transform: "rotate(270deg)", isCorrect: false },
    ],
  },
  {
    id: "sp_04",
    type: "rotation",
    instruction: "Which image shows the shape rotated 270° clockwise?",
    targetKey: "Z_shape",
    difficulty: 2,
    correctIndex: 3,
    options: [
      { key: "Z_shape", transform: "rotate(0deg)",   isCorrect: false },
      { key: "Z_shape", transform: "rotate(90deg)",  isCorrect: false },
      { key: "Z_shape", transform: "rotate(180deg)", isCorrect: false },
      { key: "Z_shape", transform: "rotate(270deg)", isCorrect: true  },
    ],
  },
  {
    id: "sp_05",
    type: "mirror",
    instruction: "Which is the vertical mirror image (flipped top-to-bottom)?",
    targetKey: "F_shape",
    difficulty: 3,
    correctIndex: 1,
    options: [
      { key: "F_shape", transform: "scaleX(-1)",       isCorrect: false },
      { key: "F_shape", transform: "scaleY(-1)",        isCorrect: true  },
      { key: "F_shape", transform: "rotate(180deg)",    isCorrect: false },
      { key: "F_shape", transform: "rotate(90deg)",     isCorrect: false },
    ],
  },
  {
    id: "sp_06",
    type: "rotation",
    instruction: "Which shows the shape after a 90° counter-clockwise rotation?",
    targetKey: "stair_3",
    difficulty: 3,
    correctIndex: 2,
    options: [
      { key: "stair_3", transform: "rotate(90deg)",   isCorrect: false },
      { key: "stair_3", transform: "rotate(180deg)",  isCorrect: false },
      { key: "stair_3", transform: "rotate(270deg)",  isCorrect: true  },
      { key: "stair_3", transform: "scaleX(-1)",      isCorrect: false },
    ],
  },
  {
    id: "sp_07",
    type: "mirror",
    instruction: "After rotating 90° clockwise, which shows the horizontal mirror of the result?",
    targetKey: "hook",
    difficulty: 4,
    correctIndex: 0,
    options: [
      { key: "hook", transform: "rotate(90deg) scaleX(-1)",  isCorrect: true  },
      { key: "hook", transform: "rotate(90deg)",             isCorrect: false },
      { key: "hook", transform: "rotate(270deg) scaleX(-1)", isCorrect: false },
      { key: "hook", transform: "rotate(180deg) scaleX(-1)", isCorrect: false },
    ],
  },
  {
    id: "sp_08",
    type: "rotation",
    instruction: "Which represents the shape rotated 135° clockwise?",
    targetKey: "cross_asym",
    difficulty: 5,
    correctIndex: 3,
    options: [
      { key: "cross_asym", transform: "rotate(45deg)",  isCorrect: false },
      { key: "cross_asym", transform: "rotate(90deg)",  isCorrect: false },
      { key: "cross_asym", transform: "rotate(180deg)", isCorrect: false },
      { key: "cross_asym", transform: "rotate(135deg)", isCorrect: true  },
    ],
  },
];
