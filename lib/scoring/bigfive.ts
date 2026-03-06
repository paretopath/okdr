import { BF_DOMAIN_NORMS, BF_FACET_NORMS, rawToTScore } from "./norms";
import { tScoreToPercentile } from "../utils";
import type { BigFiveItem } from "../questions/bigfive/ipip-neo-120";

export type BFResponses = Record<string, number>; // { itemId: 1-5 }

export interface FacetResult {
  key: string;
  label: string;
  domain: string;
  tScore: number;
  percentile: number;
  rawSum: number;
}

export interface DomainResult {
  key: string;
  label: string;
  tScore: number;
  percentile: number;
  rawSum: number;
  facets: FacetResult[];
  description: string;
}

export interface BigFiveResult {
  domains: Record<string, DomainResult>;
  openness: DomainResult;
  conscientiousness: DomainResult;
  extraversion: DomainResult;
  agreeableness: DomainResult;
  neuroticism: DomainResult;
}

const DOMAIN_LABELS: Record<string, string> = {
  openness:          "Openness to Experience",
  conscientiousness: "Conscientiousness",
  extraversion:      "Extraversion",
  agreeableness:     "Agreeableness",
  neuroticism:       "Neuroticism",
};

const FACET_LABELS: Record<string, string> = {
  n_fantasy:          "Fantasy",
  n_aesthetics:       "Aesthetics",
  n_feelings:         "Feelings",
  n_actions:          "Actions",
  n_ideas:            "Ideas",
  n_values:           "Values",
  c_competence:       "Competence",
  c_order:            "Order",
  c_dutifulness:      "Dutifulness",
  c_achievement:      "Achievement Striving",
  c_discipline:       "Self-Discipline",
  c_deliberation:     "Deliberation",
  e_warmth:           "Warmth",
  e_gregariousness:   "Gregariousness",
  e_assertiveness:    "Assertiveness",
  e_activity:         "Activity",
  e_excitement:       "Excitement Seeking",
  e_positiveEmotions: "Positive Emotions",
  a_trust:            "Trust",
  a_straightforward:  "Straightforwardness",
  a_altruism:         "Altruism",
  a_compliance:       "Compliance",
  a_modesty:          "Modesty",
  a_tenderMindedness: "Tender-Mindedness",
  neu_anxiety:            "Anxiety",
  neu_hostility:          "Hostility",
  neu_depression:         "Depression",
  neu_selfConsciousness:  "Self-Consciousness",
  neu_impulsiveness:      "Impulsiveness",
  neu_vulnerability:      "Vulnerability",
};

const DOMAIN_DESCRIPTIONS: Record<string, string> = {
  openness: "Reflects curiosity, creativity, and openness to new experiences. High scorers are imaginative and intellectually curious; low scorers prefer routine and the familiar.",
  conscientiousness: "Reflects organization, discipline, and goal-directedness. High scorers are reliable and achievement-oriented; low scorers are more spontaneous and flexible.",
  extraversion: "Reflects sociability, assertiveness, and positive emotionality. High scorers gain energy from social situations; low scorers (introverts) prefer solitude.",
  agreeableness: "Reflects cooperation, empathy, and trust in others. High scorers are warm and altruistic; low scorers are more competitive or skeptical.",
  neuroticism: "Reflects emotional instability and negative affect. High scorers experience frequent anxiety or stress; low scorers are emotionally stable and resilient.",
};

export function scoreBigFive(
  responses: BFResponses,
  items: BigFiveItem[]
): BigFiveResult {
  // Group items by facet
  const facetRawScores: Record<string, number> = {};
  const facetItemCounts: Record<string, number> = {};

  for (const item of items) {
    const response = responses[item.id];
    if (response === undefined) continue;

    // Apply reverse scoring
    const scored = item.reverse ? (6 - response) : response;

    if (!facetRawScores[item.facet]) {
      facetRawScores[item.facet] = 0;
      facetItemCounts[item.facet] = 0;
    }
    facetRawScores[item.facet] += scored;
    facetItemCounts[item.facet]++;
  }

  // Compute facet T-scores
  const facetResults: Record<string, FacetResult> = {};
  for (const [facetKey, rawSum] of Object.entries(facetRawScores)) {
    const norms = BF_FACET_NORMS[facetKey];
    if (!norms) continue;
    const tScore = rawToTScore(rawSum, norms.mean, norms.sd);
    const percentile = tScoreToPercentile(tScore);
    // Determine domain from facet key prefix
    const domainKey = facetKey.startsWith("n_") ? "openness"
      : facetKey.startsWith("c_") ? "conscientiousness"
      : facetKey.startsWith("e_") ? "extraversion"
      : facetKey.startsWith("a_") ? "agreeableness"
      : "neuroticism";

    facetResults[facetKey] = {
      key: facetKey,
      label: FACET_LABELS[facetKey] ?? facetKey,
      domain: domainKey,
      tScore,
      percentile,
      rawSum,
    };
  }

  // Compute domain-level scores (sum of 6 facet raw scores)
  const domainKeys = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"] as const;
  const domainFacetPrefixes: Record<string, string> = {
    openness: "n_",
    conscientiousness: "c_",
    extraversion: "e_",
    agreeableness: "a_",
    neuroticism: "neu_",
  };

  const domainResults: Record<string, DomainResult> = {};

  for (const domainKey of domainKeys) {
    const prefix = domainFacetPrefixes[domainKey];
    const domainFacets = Object.values(facetResults).filter((f) =>
      f.key.startsWith(prefix)
    );

    const domainRawSum = domainFacets.reduce((sum, f) => sum + f.rawSum, 0);
    const norms = BF_DOMAIN_NORMS[domainKey];
    const tScore = rawToTScore(domainRawSum, norms.mean, norms.sd);
    const percentile = tScoreToPercentile(tScore);

    domainResults[domainKey] = {
      key: domainKey,
      label: DOMAIN_LABELS[domainKey],
      tScore,
      percentile,
      rawSum: domainRawSum,
      facets: domainFacets,
      description: DOMAIN_DESCRIPTIONS[domainKey],
    };
  }

  return {
    domains: domainResults,
    openness: domainResults.openness,
    conscientiousness: domainResults.conscientiousness,
    extraversion: domainResults.extraversion,
    agreeableness: domainResults.agreeableness,
    neuroticism: domainResults.neuroticism,
  };
}
