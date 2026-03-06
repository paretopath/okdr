// Verbal Analogy Items — Crystallized Intelligence (Gc)
// Format: "A is to B as C is to ?" — select from 5 options
// Based on ICAR verbal reasoning format (open-source)
// Ordered by difficulty (1=easiest, 12=hardest)

export interface VerbalItem {
  id: string;
  stem: string;           // "Bird is to wing as fish is to ___"
  options: string[];      // 5 options
  correctIndex: number;   // 0-indexed
  difficulty: number;     // 1-5
}

export const VERBAL_ITEMS: VerbalItem[] = [
  {
    id: "v_01",
    stem: "Puppy is to dog as kitten is to ___",
    options: ["Pet", "Cat", "Feline", "Animal", "Fur"],
    correctIndex: 1,
    difficulty: 1,
  },
  {
    id: "v_02",
    stem: "Chef is to kitchen as pilot is to ___",
    options: ["Airport", "Sky", "Plane", "Cockpit", "Runway"],
    correctIndex: 3,
    difficulty: 1,
  },
  {
    id: "v_03",
    stem: "Gloves are to hands as helmet is to ___",
    options: ["Safety", "Bike", "Head", "Hat", "Skull"],
    correctIndex: 2,
    difficulty: 1,
  },
  {
    id: "v_04",
    stem: "Pen is to ink as paintbrush is to ___",
    options: ["Canvas", "Artist", "Paint", "Colour", "Stroke"],
    correctIndex: 2,
    difficulty: 2,
  },
  {
    id: "v_05",
    stem: "Stethoscope is to doctor as gavel is to ___",
    options: ["Carpenter", "Justice", "Judge", "Lawyer", "Court"],
    correctIndex: 2,
    difficulty: 2,
  },
  {
    id: "v_06",
    stem: "Archipelago is to islands as constellation is to ___",
    options: ["Planets", "Galaxies", "Stars", "Universe", "Astronomy"],
    correctIndex: 2,
    difficulty: 2,
  },
  {
    id: "v_07",
    stem: "Fortuitous is to luck as serendipitous is to ___",
    options: ["Fate", "Chance", "Design", "Disaster", "Fortune"],
    correctIndex: 1,
    difficulty: 3,
  },
  {
    id: "v_08",
    stem: "Taciturn is to talkative as bellicose is to ___",
    options: ["Aggressive", "Peaceful", "Loud", "Military", "Bold"],
    correctIndex: 1,
    difficulty: 3,
  },
  {
    id: "v_09",
    stem: "Catharsis is to emotion as purgation is to ___",
    options: ["Medicine", "Disease", "Purification", "Water", "Logic"],
    correctIndex: 2,
    difficulty: 3,
  },
  {
    id: "v_10",
    stem: "Epistemology is to knowledge as ontology is to ___",
    options: ["Language", "Existence", "Ethics", "Logic", "History"],
    correctIndex: 1,
    difficulty: 4,
  },
  {
    id: "v_11",
    stem: "Solipsism is to self as solecism is to ___",
    options: ["Loneliness", "Grammar", "Society", "Sound", "Law"],
    correctIndex: 1,
    difficulty: 4,
  },
  {
    id: "v_12",
    stem: "Apocryphal is to authenticity as specious is to ___",
    options: ["Logic", "Rarity", "Soundness", "Complexity", "Validity"],
    correctIndex: 2,
    difficulty: 5,
  },
];
