"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from "recharts";

interface SubtestData {
  label: string;
  scaled: number;
  percentile: number;
}

interface SubtestChartProps {
  subtests: SubtestData[];
}

function getBarColor(scaled: number): string {
  if (scaled >= 13) return "#4f46e5";
  if (scaled >= 10) return "#0ea5e9";
  if (scaled >= 7)  return "#f59e0b";
  return "#ef4444";
}

export default function SubtestChart({ subtests }: SubtestChartProps) {
  const data = subtests.map((s) => ({
    name: s.label.split(" ")[0], // short label
    fullLabel: s.label,
    value: s.scaled,
    percentile: s.percentile,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">
        Cognitive Subtest Scores
      </h3>
      <p className="text-xs text-slate-400 mb-5">Scaled scores — mean 10, SD 3</p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
          <YAxis domain={[0, 19]} tick={{ fontSize: 11, fill: "#64748b" }} />
          <ReferenceLine y={10} stroke="#94a3b8" strokeDasharray="4 2" />
          <Tooltip
            formatter={(val: number | string | undefined, _: string | undefined, props: { payload?: { fullLabel?: string; percentile?: number } }) => [
              `Scaled: ${val ?? ""}  (${props.payload?.percentile ?? ""}th%ile)`,
              props.payload?.fullLabel ?? "",
            ]}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Table */}
      <table className="w-full mt-4 text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
            <th className="pb-2 font-medium">Subtest</th>
            <th className="pb-2 font-medium text-center">Scaled</th>
            <th className="pb-2 font-medium text-center">%ile</th>
          </tr>
        </thead>
        <tbody>
          {subtests.map((s) => (
            <tr key={s.label} className="border-b border-slate-50">
              <td className="py-2 text-slate-700">{s.label}</td>
              <td className="py-2 text-center font-semibold text-slate-900">{s.scaled}</td>
              <td className="py-2 text-center text-slate-500">{Math.round(s.percentile)}th</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
