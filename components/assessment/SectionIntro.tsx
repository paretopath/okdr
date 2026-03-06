"use client";

import { Clock, Brain, User } from "lucide-react";

interface SectionIntroProps {
  title: string;
  subtitle: string;
  description: string;
  timeEstimate: string;
  itemCount: number;
  type: "iq" | "personality";
  instructions: string[];
  onStart: () => void;
}

export default function SectionIntro({
  title,
  subtitle,
  description,
  timeEstimate,
  itemCount,
  type,
  instructions,
  onStart,
}: SectionIntroProps) {
  const Icon = type === "iq" ? Brain : User;

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-8 py-8">
      {/* Header */}
      <div className="text-center flex flex-col gap-3">
        <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
          <Icon className="w-8 h-8 text-indigo-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-indigo-600 font-medium">{subtitle}</p>
        <p className="text-slate-600">{description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{itemCount}</p>
          <p className="text-sm text-slate-500 mt-1">Questions</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <Clock className="w-5 h-5 text-slate-400 mx-auto mb-1" />
          <p className="text-sm font-medium text-slate-700">{timeEstimate}</p>
          <p className="text-sm text-slate-500">Estimated time</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-900 mb-3">Instructions</h3>
        <ul className="space-y-2">
          {instructions.map((inst, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
              <span className="text-amber-500 mt-0.5">•</span>
              {inst}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
      >
        Begin {title}
      </button>
    </div>
  );
}
