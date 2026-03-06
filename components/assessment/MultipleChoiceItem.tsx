"use client";

import { cn } from "@/lib/utils";

interface MultipleChoiceItemProps {
  stem: string;
  options: string[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
  itemType?: "verbal" | "numerical" | "workingMemory";
}

export default function MultipleChoiceItem({
  stem,
  options,
  selectedOption,
  onSelect,
  itemType = "verbal",
}: MultipleChoiceItemProps) {
  const isNumerical = itemType === "numerical" || itemType === "workingMemory";

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Stem */}
      <div
        className={cn(
          "text-center p-6 rounded-xl",
          isNumerical
            ? "bg-slate-900 text-white font-mono text-2xl tracking-widest"
            : "bg-slate-50 text-slate-800 text-xl font-medium"
        )}
      >
        {stem}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                isSelected
                  ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                  : "border-slate-200 hover:border-indigo-300 bg-white text-slate-700 hover:bg-slate-50",
                isNumerical && "font-mono"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                  isSelected
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 text-slate-500"
                )}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-base">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
