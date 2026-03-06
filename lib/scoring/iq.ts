import { rawToScaled, scaledSumToIQ } from "./norms";
import { iqToPercentile, percentileFromZ } from "../utils";

export type IQResponses = Record<string, number>; // { itemId: selectedOptionIndex }

export interface IQSubtestResult {
  raw: number;
  scaled: number;
  percentile: number;
  label: string;
}

export interface IQResult {
  fullScaleIQ: number;
  percentile: number;
  subtests: {
    matrix: IQSubtestResult;
    verbal: IQSubtestResult;
    numerical: IQSubtestResult;
    spatial: IQSubtestResult;
    workingMemory: IQSubtestResult;
  };
  classification: string;
  scaledSum: number;
}

// IQ classification labels (WAIS convention)
function getIQClassification(iq: number): string {
  if (iq >= 130) return "Very Superior";
  if (iq >= 120) return "Superior";
  if (iq >= 110) return "High Average";
  if (iq >= 90)  return "Average";
  if (iq >= 80)  return "Low Average";
  if (iq >= 70)  return "Borderline";
  return "Extremely Low";
}

function subtestPercentile(scaled: number): number {
  // Scaled scores: mean=10, SD=3 → z-score → percentile
  const z = (scaled - 10) / 3;
  return percentileFromZ(z);
}

export function scoreIQ(
  responses: IQResponses,
  matrixItems: { id: string; correctIndex: number }[],
  verbalItems: { id: string; correctIndex: number }[],
  numericalItems: { id: string; correctIndex: number }[],
  spatialItems: { id: string; correctIndex: number }[],
  workingMemoryItems: { id: string; correctIndex: number }[]
): IQResult {
  function countCorrect(items: { id: string; correctIndex: number }[]): number {
    return items.reduce((sum, item) => {
      return sum + (responses[item.id] === item.correctIndex ? 1 : 0);
    }, 0);
  }

  const matrixRaw = countCorrect(matrixItems);
  const verbalRaw = countCorrect(verbalItems);
  const numericalRaw = countCorrect(numericalItems);
  const spatialRaw = countCorrect(spatialItems);
  const wmRaw = countCorrect(workingMemoryItems);

  const matrixScaled = rawToScaled("matrix", matrixRaw);
  const verbalScaled = rawToScaled("verbal", verbalRaw);
  const numericalScaled = rawToScaled("numerical", numericalRaw);
  const spatialScaled = rawToScaled("spatial", spatialRaw);
  const wmScaled = rawToScaled("workingMemory", wmRaw);

  const scaledSum = matrixScaled + verbalScaled + numericalScaled + spatialScaled + wmScaled;
  const fullScaleIQ = scaledSumToIQ(scaledSum);
  const percentile = iqToPercentile(fullScaleIQ);

  return {
    fullScaleIQ,
    percentile,
    scaledSum,
    classification: getIQClassification(fullScaleIQ),
    subtests: {
      matrix: {
        raw: matrixRaw,
        scaled: matrixScaled,
        percentile: subtestPercentile(matrixScaled),
        label: "Matrix Reasoning",
      },
      verbal: {
        raw: verbalRaw,
        scaled: verbalScaled,
        percentile: subtestPercentile(verbalScaled),
        label: "Verbal Reasoning",
      },
      numerical: {
        raw: numericalRaw,
        scaled: numericalScaled,
        percentile: subtestPercentile(numericalScaled),
        label: "Numerical Reasoning",
      },
      spatial: {
        raw: spatialRaw,
        scaled: spatialScaled,
        percentile: subtestPercentile(spatialScaled),
        label: "Spatial Reasoning",
      },
      workingMemory: {
        raw: wmRaw,
        scaled: wmScaled,
        percentile: subtestPercentile(wmScaled),
        label: "Working Memory",
      },
    },
  };
}
