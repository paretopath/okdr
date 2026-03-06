"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatPercentile } from "@/lib/utils";

interface BigFiveRadarProps {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  showPercentile?: boolean;
}

export default function BigFiveRadar({
  openness,
  conscientiousness,
  extraversion,
  agreeableness,
  neuroticism,
  showPercentile = false,
}: BigFiveRadarProps) {
  const data = [
    { trait: "Openness",          value: openness },
    { trait: "Conscientiousness", value: conscientiousness },
    { trait: "Extraversion",      value: extraversion },
    { trait: "Agreeableness",     value: agreeableness },
    { trait: "Neuroticism",       value: neuroticism },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-4 text-center">
        Big Five Personality Profile
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis
            dataKey="trait"
            tick={{ fontSize: 12, fill: "#475569" }}
          />
          <Tooltip
            formatter={(value: number | string | undefined) => [`T-score: ${value ?? ""}`, ""]}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend values */}
      <div className="grid grid-cols-5 gap-1 mt-4">
        {data.map(({ trait, value }) => (
          <div key={trait} className="text-center">
            <p className="text-xs text-slate-500 truncate">{trait.slice(0, 5)}</p>
            <p className="font-bold text-slate-900 text-sm">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
