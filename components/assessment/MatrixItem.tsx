"use client";

import { cn } from "@/lib/utils";
import type { Shape, ShapeType, FillType, SizeType } from "@/lib/questions/iq/matrix";

const FILL_PATTERNS: Record<FillType, string> = {
  filled:  "#1e293b",
  outline: "none",
  striped: "url(#stripes)",
  dotted:  "url(#dots)",
};

const STROKE_COLOR = "#1e293b";

const SIZES: Record<SizeType, number> = {
  small:  16,
  medium: 22,
  large:  30,
};

function ShapeSVG({
  shape,
  cx,
  cy,
}: {
  shape: Shape;
  cx: number;
  cy: number;
}) {
  const r = SIZES[shape.size];
  const fill = FILL_PATTERNS[shape.fill];
  const stroke = STROKE_COLOR;
  const sw = 2;
  const rot = shape.rotation ?? 0;
  const transform = rot ? `rotate(${rot}, ${cx}, ${cy})` : undefined;

  const commonProps = { fill, stroke, strokeWidth: sw, transform };

  switch (shape.type) {
    case "circle":
      return <circle cx={cx} cy={cy} r={r} {...commonProps} />;

    case "square":
      return (
        <rect
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          {...commonProps}
        />
      );

    case "triangle": {
      const h = r * Math.sqrt(3);
      const pts = [
        `${cx},${cy - r * 1.15}`,
        `${cx - r},${cy + h * 0.6}`,
        `${cx + r},${cy + h * 0.6}`,
      ].join(" ");
      return <polygon points={pts} {...commonProps} />;
    }

    case "diamond": {
      const pts = [
        `${cx},${cy - r}`,
        `${cx + r},${cy}`,
        `${cx},${cy + r}`,
        `${cx - r},${cy}`,
      ].join(" ");
      return <polygon points={pts} {...commonProps} />;
    }

    case "cross": {
      const arm = r * 0.35;
      const d = `M ${cx - r} ${cy - arm} L ${cx - arm} ${cy - arm} L ${cx - arm} ${cy - r}
        L ${cx + arm} ${cy - r} L ${cx + arm} ${cy - arm} L ${cx + r} ${cy - arm}
        L ${cx + r} ${cy + arm} L ${cx + arm} ${cy + arm} L ${cx + arm} ${cy + r}
        L ${cx - arm} ${cy + r} L ${cx - arm} ${cy + arm} L ${cx - r} ${cy + arm} Z`;
      return <path d={d} {...commonProps} />;
    }

    case "star": {
      const outerR = r;
      const innerR = r * 0.4;
      const pts = Array.from({ length: 10 }, (_, i) => {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const rad = i % 2 === 0 ? outerR : innerR;
        return `${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`;
      }).join(" ");
      return <polygon points={pts} {...commonProps} />;
    }

    case "pentagon": {
      const pts = Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(" ");
      return <polygon points={pts} {...commonProps} />;
    }

    case "hexagon": {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (i * Math.PI) / 3;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(" ");
      return <polygon points={pts} {...commonProps} />;
    }

    default:
      return null;
  }
}

function CellContent({ shapes }: { shapes: Shape[] }) {
  const count = shapes[0]?.count ?? 1;
  const shape = shapes[0];
  if (!shape) return null;

  // Place shapes in the cell (max 3)
  const positions: [number, number][] =
    count === 1
      ? [[50, 50]]
      : count === 2
      ? [[32, 50], [68, 50]]
      : [[25, 35], [75, 35], [50, 68]];

  return (
    <>
      {positions.slice(0, count).map((pos, i) => (
        <ShapeSVG key={i} shape={shape} cx={pos[0]} cy={pos[1]} />
      ))}
    </>
  );
}

function MatrixCell({
  shapes,
  size,
}: {
  shapes: Shape[] | null;
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="border border-slate-300 bg-white"
    >
      <defs>
        <pattern id="stripes" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="8" x2="8" y2="0" stroke="#1e293b" strokeWidth="2" />
        </pattern>
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.5" fill="#1e293b" />
        </pattern>
      </defs>
      {shapes ? <CellContent shapes={shapes} /> : (
        <text x="50" y="58" textAnchor="middle" fontSize="32" fill="#94a3b8" fontWeight="bold">?</text>
      )}
    </svg>
  );
}

interface MatrixItemProps {
  cells: Shape[][];
  options: Shape[][];
  correctIndex: number;
  selectedOption: number | null;
  onSelect: (index: number) => void;
  showAnswer?: boolean;
}

export default function MatrixItemComponent({
  cells,
  options,
  selectedOption,
  onSelect,
  showAnswer = false,
}: MatrixItemProps) {
  const cellSize = 90;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 3×3 Matrix */}
      <div>
        <p className="text-sm text-slate-500 mb-3 text-center">
          Which shape completes the pattern?
        </p>
        <div className="grid grid-cols-3 gap-0.5 bg-slate-400 p-0.5 rounded">
          {[...cells, null].map((cellShapes, idx) => (
            <MatrixCell key={idx} shapes={cellShapes} size={cellSize} />
          ))}
        </div>
      </div>

      {/* 4 Answer Options */}
      <div className="grid grid-cols-4 gap-3">
        {options.map((optionShapes, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all",
                isSelected
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-300 hover:border-indigo-400 bg-white hover:bg-slate-50"
              )}
            >
              <span className="text-xs text-slate-500 font-medium">
                {String.fromCharCode(65 + idx)}
              </span>
              <MatrixCell shapes={optionShapes} size={72} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
