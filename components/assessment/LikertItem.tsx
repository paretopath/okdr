"use client";

import { cn } from "@/lib/utils";

const LIKERT_LABELS = [
  { value: 1, label: "Very Inaccurate",      short: "1" },
  { value: 2, label: "Moderately Inaccurate", short: "2" },
  { value: 3, label: "Neither",               short: "3" },
  { value: 4, label: "Moderately Accurate",   short: "4" },
  { value: 5, label: "Very Accurate",          short: "5" },
];

interface LikertItemProps {
  text: string;
  currentValue: number | null;
  onChange: (value: number) => void;
  itemNumber?: number;
}

export default function LikertItem({
  text,
  currentValue,
  onChange,
  itemNumber,
}: LikertItemProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {/* Statement */}
      <p className="text-slate-800 text-lg text-center leading-relaxed">
        {itemNumber && (
          <span className="text-slate-400 text-sm mr-2">({itemNumber})</span>
        )}
        <span className="font-medium">I </span>
        {text}
      </p>

      {/* Likert scale */}
      <div className="flex flex-col gap-2">
        {/* Labels */}
        <div className="hidden sm:flex justify-between text-xs text-slate-400 px-2">
          <span>Very Inaccurate</span>
          <span>Neither</span>
          <span>Very Accurate</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-center">
          {LIKERT_LABELS.map(({ value, label }) => {
            const isSelected = currentValue === value;
            return (
              <button
                key={value}
                onClick={() => onChange(value)}
                title={label}
                className={cn(
                  "flex-1 sm:flex-none w-14 h-14 rounded-xl border-2 font-semibold text-sm transition-all",
                  isSelected
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md scale-105"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50"
                )}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* Mobile labels */}
        <div className="flex sm:hidden justify-between text-xs text-slate-400 px-2">
          <span>Very Inaccurate</span>
          <span>Very Accurate</span>
        </div>
      </div>
    </div>
  );
}
