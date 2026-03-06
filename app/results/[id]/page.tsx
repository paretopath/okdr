export const dynamic = "force-dynamic";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import IQScoreCard from "@/components/results/IQScoreCard";
import BigFiveRadar from "@/components/results/BigFiveRadar";
import { iqToPercentile, tScoreToPercentile, formatPercentile } from "@/lib/utils";
import { Lock, ChevronRight } from "lucide-react";
import Link from "next/link";

function getIQClassification(iq: number): string {
  if (iq >= 130) return "Very Superior";
  if (iq >= 120) return "Superior";
  if (iq >= 110) return "High Average";
  if (iq >= 90)  return "Average";
  if (iq >= 80)  return "Low Average";
  if (iq >= 70)  return "Borderline";
  return "Extremely Low";
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultsPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: result } = await supabase
    .from("results")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!result) notFound();

  const iqPercentile = iqToPercentile(result.iq_full_scale);
  const classification = getIQClassification(result.iq_full_scale);

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">
            Oxford Kings Development Rating
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Your Results</h1>
          <p className="text-slate-500 mt-2">
            Assessment completed · {new Date(result.created_at).toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </p>
        </div>

        {/* IQ */}
        <IQScoreCard
          iq={result.iq_full_scale}
          percentile={iqPercentile}
          classification={classification}
        />

        {/* Big Five Radar */}
        <BigFiveRadar
          openness={result.bf_openness}
          conscientiousness={result.bf_conscientiousness}
          extraversion={result.bf_extraversion}
          agreeableness={result.bf_agreeableness}
          neuroticism={result.bf_neuroticism}
        />

        {/* Domain scores (free) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-4">
            Personality Domain Scores
          </h3>
          <div className="flex flex-col gap-4">
            {[
              { label: "Openness",          score: result.bf_openness          },
              { label: "Conscientiousness", score: result.bf_conscientiousness },
              { label: "Extraversion",      score: result.bf_extraversion      },
              { label: "Agreeableness",     score: result.bf_agreeableness     },
              { label: "Neuroticism",       score: result.bf_neuroticism       },
            ].map(({ label, score }) => {
              const pct = Math.max(0, Math.min(100, ((score - 20) / 60) * 100));
              return (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{label}</span>
                    <span className="text-slate-500">
                      T={Math.round(score)} · {Math.round(tScoreToPercentile(score))}th %ile
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upsell: Full Report */}
        {!result.is_paid && (
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <h3 className="font-bold text-lg">Unlock Your Full OKDR Report</h3>
            </div>
            <ul className="flex flex-col gap-2 text-indigo-100 text-sm">
              <li>✓ Cognitive subtest breakdown (5 scales)</li>
              <li>✓ All 30 Big Five facet scores with interpretation</li>
              <li>✓ Personalised narrative report</li>
              <li>✓ PDF download to keep forever</li>
              <li>✓ Comparison to general adult population</li>
            </ul>
            <Link
              href={`/results/${id}/full?checkout=1`}
              className="flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-colors w-full"
            >
              Unlock Full Report — £19 <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        {result.is_paid && (
          <Link
            href={`/results/${id}/full`}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            View Full Report <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </main>
  );
}
