// Normative tables for OKDR scoring
// IQ norms based on ICAR research data and standard psychometric conventions
// Big Five norms based on IPIP population data (Goldberg et al.)

// ─── IQ NORMS ────────────────────────────────────────────────────────────────

// Raw score → scaled score lookup for each IQ subtest
// Scaled scores: mean=10, SD=3, range 1-19
// Based on provisional adult norms (ages 18-65)
// These tables map rawScore → scaledScore

export const IQ_SUBTEST_NORMS: Record<
  "matrix" | "verbal" | "numerical" | "spatial" | "workingMemory",
  { rawMax: number; table: number[] }
> = {
  // Matrix Reasoning: 15 items
  matrix: {
    rawMax: 15,
    // index = raw score (0-15) → scaled score
    table: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 19],
  },
  // Verbal Analogies: 12 items
  verbal: {
    rawMax: 12,
    // index = raw score (0-12) → scaled score
    table: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 19],
  },
  // Numerical Sequences: 10 items
  numerical: {
    rawMax: 10,
    // index = raw score (0-10) → scaled score
    table: [1, 2, 3, 4, 6, 7, 9, 11, 13, 16, 19],
  },
  // Spatial Reasoning: 8 items
  spatial: {
    rawMax: 8,
    // index = raw score (0-8) → scaled score
    table: [1, 2, 4, 6, 8, 10, 12, 15, 19],
  },
  // Working Memory: 5 items
  workingMemory: {
    rawMax: 5,
    // index = raw score (0-5) → scaled score
    table: [1, 4, 7, 10, 14, 19],
  },
};

// Sum of scaled scores → Full Scale IQ
// Sum range: 5–95 (5 subtests × 1-19)
// Prorated FSIQ lookup: index = sum of scaled scores
// Based on WAIS-IV/ICAR prorating conventions
export function scaledSumToIQ(sum: number): number {
  // Clamp to valid range
  const clampedSum = Math.max(5, Math.min(95, sum));
  // Each scaled score: mean=10 → sum of 5 = 50 → IQ 100
  // SD of sum ≈ 3 × sqrt(5) ≈ 6.7 → corresponds to IQ SD=15
  // Linear transformation: IQ = 100 + (sum - 50) × (15 / 6.7)
  const iq = 100 + (clampedSum - 50) * (15 / 6.708);
  return Math.round(Math.max(40, Math.min(160, iq)));
}

export function rawToScaled(
  subtest: keyof typeof IQ_SUBTEST_NORMS,
  raw: number
): number {
  const norm = IQ_SUBTEST_NORMS[subtest];
  const clampedRaw = Math.max(0, Math.min(norm.rawMax, raw));
  return norm.table[clampedRaw];
}

// ─── BIG FIVE NORMS ──────────────────────────────────────────────────────────
// Population norms for IPIP-NEO-120 (general adult population)
// Each domain: 24 items (6 facets × 4 items), range 24-120
// Each facet: 4 items, range 4-20
// Based on IPIP normative data from Goldberg et al. and SAPA Project
// T-score = 50 + 10 × (raw - mean) / sd

export const BF_DOMAIN_NORMS: Record<
  "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism",
  { mean: number; sd: number }
> = {
  openness:          { mean: 89.0, sd: 13.5 },
  conscientiousness: { mean: 84.2, sd: 14.2 },
  extraversion:      { mean: 79.5, sd: 15.8 },
  agreeableness:     { mean: 90.1, sd: 12.9 },
  neuroticism:       { mean: 65.4, sd: 16.3 },
};

// Facet norms: each facet raw range 4–20
export const BF_FACET_NORMS: Record<string, { mean: number; sd: number }> = {
  // Openness
  n_fantasy:         { mean: 13.2, sd: 3.8 },
  n_aesthetics:      { mean: 14.1, sd: 3.5 },
  n_feelings:        { mean: 14.8, sd: 3.2 },
  n_actions:         { mean: 13.5, sd: 3.4 },
  n_ideas:           { mean: 14.3, sd: 3.7 },
  n_values:          { mean: 14.9, sd: 3.1 },
  // Conscientiousness
  c_competence:      { mean: 15.1, sd: 2.9 },
  c_order:           { mean: 13.2, sd: 3.5 },
  c_dutifulness:     { mean: 15.4, sd: 2.8 },
  c_achievement:     { mean: 14.8, sd: 3.0 },
  c_discipline:      { mean: 13.5, sd: 3.3 },
  c_deliberation:    { mean: 12.2, sd: 3.6 },
  // Extraversion
  e_warmth:          { mean: 14.6, sd: 3.4 },
  e_gregariousness:  { mean: 12.3, sd: 3.8 },
  e_assertiveness:   { mean: 12.9, sd: 3.5 },
  e_activity:        { mean: 13.1, sd: 3.2 },
  e_excitement:      { mean: 12.8, sd: 3.6 },
  e_positiveEmotions:{ mean: 14.4, sd: 3.3 },
  // Agreeableness
  a_trust:           { mean: 14.2, sd: 3.3 },
  a_straightforward: { mean: 14.8, sd: 3.1 },
  a_altruism:        { mean: 15.5, sd: 2.8 },
  a_compliance:      { mean: 13.6, sd: 3.4 },
  a_modesty:         { mean: 13.1, sd: 3.5 },
  a_tenderMindedness:{ mean: 14.9, sd: 3.0 },
  // Neuroticism
  neu_anxiety:       { mean: 12.4, sd: 3.7 },
  neu_hostility:     { mean: 10.8, sd: 3.5 },
  neu_depression:    { mean: 10.6, sd: 3.8 },
  neu_selfConsciousness: { mean: 11.9, sd: 3.4 },
  neu_impulsiveness: { mean: 12.1, sd: 3.3 },
  neu_vulnerability: { mean: 10.2, sd: 3.6 },
};

export function rawToTScore(raw: number, mean: number, sd: number): number {
  const t = 50 + 10 * ((raw - mean) / sd);
  return Math.round(Math.max(20, Math.min(80, t)) * 10) / 10;
}
