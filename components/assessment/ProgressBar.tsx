"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  section: string;
  sectionProgress?: { current: number; total: number };
}

export default function ProgressBar({
  current,
  total,
  section,
  sectionProgress,
}: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">{section}</span>
        <span className="text-sm text-slate-500">
          {sectionProgress
            ? `${sectionProgress.current} / ${sectionProgress.total}`
            : `${current} / ${total}`}
        </span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slate-400">IQ Assessment</span>
        <span className="text-xs text-slate-400">Personality Assessment</span>
      </div>
    </div>
  );
}
