import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalCDF(z: number): number {
  // Approximation of the cumulative normal distribution
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + p * x);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

export function percentileFromZ(z: number): number {
  return Math.round(normalCDF(z) * 100 * 10) / 10;
}

export function iqToPercentile(iq: number): number {
  const z = (iq - 100) / 15;
  return percentileFromZ(z);
}

export function tScoreToPercentile(tScore: number): number {
  const z = (tScore - 50) / 10;
  return percentileFromZ(z);
}

export function formatPercentile(p: number): string {
  if (p >= 99) return "99th+";
  const suffix = p === 1 ? "st" : p === 2 ? "nd" : p === 3 ? "rd" : "th";
  return `${Math.round(p)}${suffix}`;
}
