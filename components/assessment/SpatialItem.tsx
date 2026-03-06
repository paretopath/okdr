"use client";

import { cn } from "@/lib/utils";
import { SPATIAL_SHAPES } from "@/lib/questions/iq/spatial";

interface SpatialItemProps {
  targetKey: string;
  instruction: string;
  options: Array<{ key: string; transform: string; isCorrect: boolean }>;
  selectedOption: number | null;
  onSelect: (index: number) => void;
}

function ShapeDisplay({
  shapeKey,
  transform,
  size = 100,
}: {
  shapeKey: string;
  transform?: string;
  size?: number;
}) {
  const pathData = SPATIAL_SHAPES[shapeKey];
  if (!pathData) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="overflow-visible"
    >
      <path
        d={pathData}
        fill="#1e293b"
        style={{ transform, transformOrigin: "50px 50px" }}
      />
    </svg>
  );
}

export default function SpatialItem({
  targetKey,
  instruction,
  options,
  selectedOption,
  onSelect,
}: SpatialItemProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Target shape */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-slate-600 font-medium">Target shape:</p>
        <div className="p-4 border-2 border-slate-800 rounded-lg bg-white">
          <ShapeDisplay shapeKey={targetKey} size={120} />
        </div>
      </div>

      <p className="text-slate-700 text-center font-medium">{instruction}</p>

      {/* Options */}
      <div className="grid grid-cols-4 gap-4">
        {options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                isSelected
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-300 hover:border-indigo-400 bg-white"
              )}
            >
              <span className="text-xs font-medium text-slate-500">
                {String.fromCharCode(65 + idx)}
              </span>
              <ShapeDisplay
                shapeKey={opt.key}
                transform={opt.transform}
                size={80}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
