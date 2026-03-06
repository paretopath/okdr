"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import LikertItem from "@/components/assessment/LikertItem";
import SectionIntro from "@/components/assessment/SectionIntro";
import ProgressBar from "@/components/assessment/ProgressBar";
import { BIGFIVE_ITEMS } from "@/lib/questions/bigfive/ipip-neo-120";
import { ChevronRight, ChevronLeft } from "lucide-react";

const ITEMS_PER_PAGE = 5;
const TOTAL_ITEMS = BIGFIVE_ITEMS.length; // 120

function PersonalityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get("id");

  const [phase, setPhase] = useState<"intro" | "test">("intro");
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [page, setPage] = useState(0); // page of ITEMS_PER_PAGE
  const [submitting, setSubmitting] = useState(false);

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);
  const pageItems = BIGFIVE_ITEMS.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const globalOffset = page * ITEMS_PER_PAGE;

  // Load existing responses
  useEffect(() => {
    if (!assessmentId) return;
    async function loadResponses() {
      const supabase = createClient();
      const { data } = await supabase
        .from("assessments")
        .select("bf_responses")
        .eq("id", assessmentId)
        .single();

      if (data?.bf_responses) {
        const existing = data.bf_responses as Record<string, number>;
        setResponses(existing);
        // Find last answered page
        const answeredCount = Object.keys(existing).length;
        if (answeredCount > 0) {
          const resumePage = Math.floor(answeredCount / ITEMS_PER_PAGE);
          setPage(Math.min(resumePage, totalPages - 1));
          setPhase("test");
        }
      }
    }
    loadResponses();
  }, [assessmentId]);

  const handleChange = useCallback((itemId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [itemId]: value }));
  }, []);

  const pageAnswered = pageItems.every((item) => responses[item.id] !== undefined);

  const handleNext = useCallback(async () => {
    const isLastPage = page === totalPages - 1;
    const supabase = createClient();

    if (isLastPage) {
      // Submit assessment
      setSubmitting(true);
      await supabase
        .from("assessments")
        .update({ bf_responses: responses, status: "completed", completed_at: new Date().toISOString() })
        .eq("id", assessmentId);

      // Call scoring API
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId }),
      });

      if (!res.ok) {
        alert("Error processing results. Please contact support.");
        setSubmitting(false);
        return;
      }

      const { resultId } = await res.json();
      router.push(`/results/${resultId}`);
    } else {
      // Auto-save every page
      await supabase
        .from("assessments")
        .update({ bf_responses: responses })
        .eq("id", assessmentId);
      setPage((p) => p + 1);
    }
  }, [page, totalPages, responses, assessmentId]);

  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <SectionIntro
          title="Personality Assessment"
          subtitle="Part 2 of 2"
          description="This section uses the internationally validated IPIP-NEO-120 to measure your Big Five personality profile across 5 domains and 30 facets."
          timeEstimate="15–20 minutes"
          itemCount={TOTAL_ITEMS}
          type="personality"
          instructions={[
            "For each statement, rate how accurately it describes you.",
            "Use 1 (Very Inaccurate) to 5 (Very Accurate).",
            "There are no right or wrong answers — respond honestly.",
            "Think about how you typically are, not how you'd like to be.",
            "Work through at a steady pace — don't overthink each item.",
          ]}
          onStart={() => setPhase("test")}
        />
      </main>
    );
  }

  const overallProgress = Object.keys(responses).length;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Progress */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <ProgressBar
          current={50 + overallProgress} // IQ (50 items) + BF progress
          total={50 + TOTAL_ITEMS}
          section="Personality Assessment"
          sectionProgress={{ current: overallProgress, total: TOTAL_ITEMS }}
        />
      </div>

      {/* Items */}
      <div className="flex-1 flex flex-col gap-10 px-4 py-10 max-w-2xl mx-auto w-full">
        <p className="text-center text-sm text-slate-500">
          Page {page + 1} of {totalPages} · Rate how accurately each statement describes you
        </p>

        {pageItems.map((item, idx) => (
          <div key={item.id} className="border-b border-slate-100 pb-8 last:border-0">
            <LikertItem
              text={item.text}
              currentValue={responses[item.id] ?? null}
              onChange={(val) => handleChange(item.id, val)}
              itemNumber={globalOffset + idx + 1}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-slate-200 px-4 py-4 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 disabled:opacity-30 hover:text-slate-900"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          <span className="text-sm text-slate-400">
            {overallProgress} / {TOTAL_ITEMS} answered
          </span>

          <button
            onClick={handleNext}
            disabled={!pageAnswered || submitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-medium rounded-lg transition-colors"
          >
            {submitting
              ? "Processing..."
              : page === totalPages - 1
              ? "Complete Assessment"
              : "Next Page"}
            {!submitting && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function PersonalityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" /></div>}>
      <PersonalityContent />
    </Suspense>
  );
}
