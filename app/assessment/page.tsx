"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SectionIntro from "@/components/assessment/SectionIntro";
import { ShieldCheck, Brain, User, ChevronRight } from "lucide-react";

export default function AssessmentIntroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [existingId, setExistingId] = useState<string | null>(null);

  useEffect(() => {
    async function checkExisting() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      // Check for in-progress assessment
      const { data } = await supabase
        .from("assessments")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("status", "in_progress")
        .order("started_at", { ascending: false })
        .limit(1)
        .single();

      if (data) setExistingId(data.id);
      setLoading(false);
    }
    checkExisting();
  }, []);

  async function startNewAssessment() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("assessments")
      .insert({ user_id: user.id, status: "in_progress" })
      .select("id")
      .single();

    if (error || !data) { alert("Error starting assessment. Please try again."); return; }

    router.push(`/assessment/iq?id=${data.id}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-4">
          <div className="mx-auto flex items-center gap-2">
            <span className="text-3xl font-black text-white tracking-tight">OKDR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Oxford Kings Development Rating
          </h1>
          <p className="text-slate-300 text-lg">
            A clinical-grade cognitive and personality assessment combining psychometrically
            validated measures of intelligence and Big Five personality structure.
          </p>
        </div>

        {/* What you'll measure */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col gap-3">
            <Brain className="w-8 h-8 text-indigo-300" />
            <h3 className="text-white font-semibold text-lg">Cognitive Intelligence</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Matrix (fluid) reasoning</li>
              <li>• Verbal analogies</li>
              <li>• Numerical sequences</li>
              <li>• Spatial reasoning</li>
              <li>• Working memory</li>
            </ul>
            <p className="text-indigo-300 text-sm font-medium">~50 items · ~25 minutes</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col gap-3">
            <User className="w-8 h-8 text-emerald-300" />
            <h3 className="text-white font-semibold text-lg">Big Five Personality</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Openness to Experience</li>
              <li>• Conscientiousness</li>
              <li>• Extraversion</li>
              <li>• Agreeableness</li>
              <li>• Neuroticism (30 facets)</li>
            </ul>
            <p className="text-emerald-300 text-sm font-medium">~120 items · ~20 minutes</p>
          </div>
        </div>

        {/* Validation note */}
        <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
          <ShieldCheck className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-slate-400 text-sm">
            The OKDR uses the ICAR cognitive ability battery (open-access, psychometrically
            validated) and the IPIP-NEO-120 personality inventory (public domain, comparable
            to the NEO-PI-3). Reliability: α ≥ 0.85. Scores are normed against general adult
            population data.
          </p>
        </div>

        {/* CTA */}
        {existingId ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push(`/assessment/iq?id=${existingId}`)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
            >
              Resume Assessment <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={startNewAssessment}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Start New Assessment
            </button>
          </div>
        ) : (
          <button
            onClick={startNewAssessment}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
          >
            Begin Assessment <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <p className="text-center text-slate-500 text-sm">
          Total time: approximately 40–60 minutes. Find a quiet space. You can pause between
          sections and resume where you left off.
        </p>
      </div>
    </main>
  );
}
