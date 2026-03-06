"use client";

import { tScoreToPercentile } from "@/lib/utils";

interface FacetData {
  key: string;
  label: string;
  tScore: number;
}

interface DomainFacets {
  domain: string;
  label: string;
  tScore: number;
  facets: FacetData[];
}

interface FacetTableProps {
  domains: DomainFacets[];
}

const DOMAIN_COLORS: Record<string, string> = {
  openness:          "bg-purple-50 border-purple-200",
  conscientiousness: "bg-blue-50 border-blue-200",
  extraversion:      "bg-yellow-50 border-yellow-200",
  agreeableness:     "bg-green-50 border-green-200",
  neuroticism:       "bg-red-50 border-red-200",
};

const DOMAIN_ACCENT: Record<string, string> = {
  openness:          "text-purple-700",
  conscientiousness: "text-blue-700",
  extraversion:      "text-yellow-700",
  agreeableness:     "text-green-700",
  neuroticism:       "text-red-700",
};

function TScoreBar({ tScore }: { tScore: number }) {
  const pct = Math.max(0, Math.min(100, ((tScore - 20) / 60) * 100));
  const color =
    tScore >= 60 ? "bg-indigo-500" :
    tScore >= 45 ? "bg-slate-400" :
    "bg-orange-400";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-700 w-8 text-right">{tScore}</span>
    </div>
  );
}

export default function FacetTable({ domains }: FacetTableProps) {
  return (
    <div className="flex flex-col gap-6">
      {domains.map((domain) => (
        <div
          key={domain.domain}
          className={`rounded-2xl border p-5 ${DOMAIN_COLORS[domain.domain] ?? "bg-slate-50 border-slate-200"}`}
        >
          {/* Domain header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className={`font-bold text-base ${DOMAIN_ACCENT[domain.domain] ?? "text-slate-700"}`}>
                {domain.label}
              </h4>
              <p className="text-xs text-slate-500">
                T-score: {domain.tScore} · {Math.round(tScoreToPercentile(domain.tScore))}th percentile
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900">{domain.tScore}</span>
            </div>
          </div>

          {/* Facets */}
          <div className="grid gap-2">
            {domain.facets.map((facet) => (
              <div key={facet.key} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-700 mb-0.5">{facet.label}</p>
                  <TScoreBar tScore={facet.tScore} />
                </div>
                <div className="text-xs text-slate-400 text-right">
                  {Math.round(tScoreToPercentile(facet.tScore))}th
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
