"use client";

import { formatPercentile } from "@/lib/utils";

interface IQScoreCardProps {
  iq: number;
  percentile: number;
  classification: string;
}

function IQGauge({ iq }: { iq: number }) {
  // Map IQ 55-145 to arc angle
  const min = 55, max = 145;
  const clampedIQ = Math.max(min, Math.min(max, iq));
  const pct = (clampedIQ - min) / (max - min);
  const startAngle = -200;
  const endAngle = 20;
  const totalArc = endAngle - startAngle;
  const needleAngle = startAngle + pct * totalArc;

  const cx = 100, cy = 100, r = 75;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Arc path
  const arcStart = {
    x: cx + r * Math.cos(toRad(startAngle)),
    y: cy + r * Math.sin(toRad(startAngle)),
  };
  const arcEnd = {
    x: cx + r * Math.cos(toRad(endAngle)),
    y: cy + r * Math.sin(toRad(endAngle)),
  };

  // Needle
  const needleLength = 60;
  const needleX = cx + needleLength * Math.cos(toRad(needleAngle));
  const needleY = cy + needleLength * Math.sin(toRad(needleAngle));

  // Color zones
  const zones = [
    { label: "Low", color: "#ef4444",  start: -200, end: -155 },
    { label: "Avg", color: "#f59e0b",  start: -155, end: -100 },
    { label: "Avg", color: "#22c55e",  start: -100, end:  -40 },
    { label: "High", color: "#3b82f6", start:  -40, end:   20 },
  ];

  return (
    <svg viewBox="0 0 200 130" className="w-64 mx-auto">
      {/* Background arc zones */}
      {zones.map((zone, i) => {
        const s = { x: cx + r * Math.cos(toRad(zone.start)), y: cy + r * Math.sin(toRad(zone.start)) };
        const e = { x: cx + r * Math.cos(toRad(zone.end)),   y: cy + r * Math.sin(toRad(zone.end))   };
        const largeArc = zone.end - zone.start > 180 ? 1 : 0;
        return (
          <path
            key={i}
            d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`}
            fill="none"
            stroke={zone.color}
            strokeWidth="12"
            strokeOpacity="0.25"
          />
        );
      })}

      {/* Active arc up to needle position */}
      {(() => {
        const s = { x: cx + r * Math.cos(toRad(startAngle)), y: cy + r * Math.sin(toRad(startAngle)) };
        const e = { x: cx + r * Math.cos(toRad(needleAngle)), y: cy + r * Math.sin(toRad(needleAngle)) };
        const largeArc = needleAngle - startAngle > 180 ? 1 : 0;
        return (
          <path
            d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="12"
            strokeLinecap="round"
          />
        );
      })()}

      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={needleX}
        y2={needleY}
        stroke="#1e293b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="5" fill="#1e293b" />

      {/* IQ Score */}
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e293b">
        {iq}
      </text>

      {/* Labels */}
      <text x="28" y="115" textAnchor="middle" fontSize="8" fill="#94a3b8">70</text>
      <text x="100" y="32" textAnchor="middle" fontSize="8" fill="#94a3b8">100</text>
      <text x="172" y="115" textAnchor="middle" fontSize="8" fill="#94a3b8">130</text>
    </svg>
  );
}

export default function IQScoreCard({ iq, percentile, classification }: IQScoreCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center gap-4">
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Full Scale IQ</h3>
      <IQGauge iq={iq} />
      <div className="text-center">
        <p className="text-5xl font-black text-slate-900">{iq}</p>
        <p className="text-indigo-600 font-semibold mt-1">{classification}</p>
        <p className="text-slate-500 text-sm mt-1">
          {formatPercentile(percentile)} percentile
        </p>
      </div>
    </div>
  );
}
