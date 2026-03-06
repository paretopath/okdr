"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import MatrixItemComponent from "@/components/assessment/MatrixItem";
import MultipleChoiceItem from "@/components/assessment/MultipleChoiceItem";
import SpatialItem from "@/components/assessment/SpatialItem";
import SectionIntro from "@/components/assessment/SectionIntro";
import ProgressBar from "@/components/assessment/ProgressBar";
import { MATRIX_ITEMS } from "@/lib/questions/iq/matrix";
import { VERBAL_ITEMS } from "@/lib/questions/iq/verbal";
import { NUMERICAL_ITEMS } from "@/lib/questions/iq/numerical";
import { SPATIAL_ITEMS } from "@/lib/questions/iq/spatial";
import { WORKING_MEMORY_ITEMS } from "@/lib/questions/iq/working-memory";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Flatten all IQ items in order with type tagging
const ALL_IQ_ITEMS = [
  ...MATRIX_ITEMS.map((item) => ({ ...item, itemType: "matrix" as const })),
  ...VERBAL_ITEMS.map((item) => ({ ...item, itemType: "verbal" as const })),
  ...NUMERICAL_ITEMS.map((item) => ({ ...item, itemType: "numerical" as const })),
  ...SPATIAL_ITEMS.map((item) => ({ ...item, itemType: "spatial" as const })),
  ...WORKING_MEMORY_ITEMS.map((item) => ({ ...item, itemType: "workingMemory" as const })),
];

const SECTION_LABELS: Record<string, string> = {
  matrix: "Matrix Reasoning",
  verbal: "Verbal Analogies",
  numerical: "Numerical Sequences",
  spatial: "Spatial Reasoning",
  workingMemory: "Working Memory",
};

function IQAssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get("id");

  const [phase, setPhase] = useState<"intro" | "test">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  const currentItem = ALL_IQ_ITEMS[currentIndex];
  const totalItems = ALL_IQ_ITEMS.length;

  // Load any existing responses
  useEffect(() => {
    if (!assessmentId) return;
    async function loadResponses() {
      const supabase = createClient();
      const { data } = await supabase
        .from("assessments")
        .select("iq_responses, status")
        .eq("id", assessmentId)
        .single();

      if (data?.iq_responses) {
        setResponses(data.iq_responses as Record<string, number>);
        // Find where we left off
        const answeredIds = Object.keys(data.iq_responses as Record<string, number>);
        const lastAnsweredIndex = ALL_IQ_ITEMS.findIndex(
          (item) => !answeredIds.includes(item.id)
        );
        if (lastAnsweredIndex > 0) {
          setCurrentIndex(lastAnsweredIndex);
          setPhase("test");
        }
      }
      if (data?.status === "iq_complete") {
        router.push(`/assessment/personality?id=${assessmentId}`);
      }
    }
    loadResponses();
  }, [assessmentId]);

  const handleSelect = useCallback(
    (optionIndex: number) => {
      setResponses((prev) => ({ ...prev, [currentItem.id]: optionIndex }));
    },
    [currentItem?.id]
  );

  const handleNext = useCallback(async () => {
    const isLast = currentIndex === totalItems - 1;
    const supabase = createClient();

    if (isLast) {
      // Save and move to personality
      setSaving(true);
      await supabase
        .from("assessments")
        .update({ iq_responses: responses, status: "iq_complete" })
        .eq("id", assessmentId);
      setSaving(false);
      router.push(`/assessment/personality?id=${assessmentId}`);
    } else {
      // Auto-save every 5 items
      if ((currentIndex + 1) % 5 === 0) {
        await supabase
          .from("assessments")
          .update({ iq_responses: responses })
          .eq("id", assessmentId);
      }
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalItems, responses, assessmentId]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <SectionIntro
          title="Cognitive Assessment"
          subtitle="Part 1 of 2"
          description="This section measures five dimensions of cognitive ability using validated psychometric item formats."
          timeEstimate="20–25 minutes"
          itemCount={totalItems}
          type="iq"
          instructions={[
            "Work through each question at your own pace — there are no time limits.",
            "Select the answer that best completes the pattern, sequence, or analogy.",
            "Your progress is saved automatically.",
            "If you're unsure, make your best guess and move on.",
            "Do not use calculators or external aids.",
          ]}
          onStart={() => setPhase("test")}
        />
      </main>
    );
  }

  const currentType = currentItem.itemType;
  const currentSection = SECTION_LABELS[currentType];
  const selectedOption = responses[currentItem.id] ?? null;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <ProgressBar
          current={currentIndex + 1}
          total={totalItems}
          section={currentSection}
          sectionProgress={{ current: currentIndex + 1, total: totalItems }}
        />
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          {/* Section label */}
          <p className="text-center text-sm text-slate-500 mb-8">
            {currentSection} · Question {currentIndex + 1} of {totalItems}
          </p>

          {/* Item */}
          {currentType === "matrix" && (
            <MatrixItemComponent
              cells={(currentItem as (typeof MATRIX_ITEMS)[0]).cells}
              options={(currentItem as (typeof MATRIX_ITEMS)[0]).options}
              correctIndex={(currentItem as (typeof MATRIX_ITEMS)[0]).correctIndex}
              selectedOption={selectedOption}
              onSelect={handleSelect}
            />
          )}
          {currentType === "verbal" && (
            <MultipleChoiceItem
              stem={(currentItem as (typeof VERBAL_ITEMS)[0]).stem}
              options={(currentItem as (typeof VERBAL_ITEMS)[0]).options}
              selectedOption={selectedOption}
              onSelect={handleSelect}
              itemType="verbal"
            />
          )}
          {currentType === "numerical" && (
            <MultipleChoiceItem
              stem={(currentItem as (typeof NUMERICAL_ITEMS)[0]).sequence}
              options={(currentItem as (typeof NUMERICAL_ITEMS)[0]).options}
              selectedOption={selectedOption}
              onSelect={handleSelect}
              itemType="numerical"
            />
          )}
          {currentType === "spatial" && (
            <SpatialItem
              targetKey={(currentItem as (typeof SPATIAL_ITEMS)[0]).targetKey}
              instruction={(currentItem as (typeof SPATIAL_ITEMS)[0]).instruction}
              options={(currentItem as (typeof SPATIAL_ITEMS)[0]).options}
              selectedOption={selectedOption}
              onSelect={handleSelect}
            />
          )}
          {currentType === "workingMemory" && (
            <MultipleChoiceItem
              stem={(currentItem as (typeof WORKING_MEMORY_ITEMS)[0]).question}
              options={(currentItem as (typeof WORKING_MEMORY_ITEMS)[0]).options}
              selectedOption={selectedOption}
              onSelect={handleSelect}
              itemType="workingMemory"
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-slate-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 disabled:opacity-30 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          <span className="text-sm text-slate-400">
            {currentIndex + 1} / {totalItems}
          </span>

          <button
            onClick={handleNext}
            disabled={selectedOption === null || saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-medium rounded-lg transition-colors"
          >
            {saving
              ? "Saving..."
              : currentIndex === totalItems - 1
              ? "Complete & Continue"
              : "Next"}
            {!saving && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function IQAssessmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" /></div>}>
      <IQAssessmentContent />
    </Suspense>
  );
}
