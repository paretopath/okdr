export const dynamic = "force-dynamic";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import IQScoreCard from "@/components/results/IQScoreCard";
import SubtestChart from "@/components/results/SubtestChart";
import BigFiveRadar from "@/components/results/BigFiveRadar";
import FacetTable from "@/components/results/FacetTable";
import { iqToPercentile, tScoreToPercentile } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

function getIQClassification(iq: number): string {
  if (iq >= 130) return "Very Superior";
  if (iq >= 120) return "Superior";
  if (iq >= 110) return "High Average";
  if (iq >= 90)  return "Average";
  if (iq >= 80)  return "Low Average";
  if (iq >= 70)  return "Borderline";
  return "Extremely Low";
}

const FACET_LABELS: Record<string, string> = {
  n_fantasy: "Fantasy", n_aesthetics: "Aesthetics", n_feelings: "Feelings",
  n_actions: "Actions", n_ideas: "Ideas", n_values: "Values",
  c_competence: "Competence", c_order: "Order", c_dutifulness: "Dutifulness",
  c_achievement: "Achievement Striving", c_discipline: "Self-Discipline", c_deliberation: "Deliberation",
  e_warmth: "Warmth", e_gregariousness: "Gregariousness", e_assertiveness: "Assertiveness",
  e_activity: "Activity", e_excitement: "Excitement Seeking", e_positiveEmotions: "Positive Emotions",
  a_trust: "Trust", a_straightforward: "Straightforwardness", a_altruism: "Altruism",
  a_compliance: "Compliance", a_modesty: "Modesty", a_tenderMindedness: "Tender-Mindedness",
  neu_anxiety: "Anxiety", neu_hostility: "Hostility", neu_depression: "Depression",
  neu_selfConsciousness: "Self-Consciousness", neu_impulsiveness: "Impulsiveness", neu_vulnerability: "Vulnerability",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FullReportPage({ params }: PageProps) {
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

  if (!result.is_paid) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Full Report</h2>
            <p className="text-slate-500 mt-2">
              Unlock your complete OKDR report including all 30 personality facets,
              cognitive subtest breakdown, and personalised narrative.
            </p>
          </div>
          <CheckoutButton resultId={id} />
          <Link href={`/results/${id}`} className="text-sm text-slate-400 hover:text-slate-600">
            ← Back to free results
          </Link>
        </div>
      </main>
    );
  }

  const iqPercentile = iqToPercentile(result.iq_full_scale);
  const classification = getIQClassification(result.iq_full_scale);
  const facets = result.bf_facets as Record<string, number>;

  // Group facets by domain
  const domainFacetData = [
    {
      domain: "openness",
      label: "Openness to Experience",
      tScore: Math.round(result.bf_openness),
      facets: ["n_fantasy","n_aesthetics","n_feelings","n_actions","n_ideas","n_values"].map((k) => ({
        key: k, label: FACET_LABELS[k], tScore: Math.round(facets[k] ?? 50),
      })),
    },
    {
      domain: "conscientiousness",
      label: "Conscientiousness",
      tScore: Math.round(result.bf_conscientiousness),
      facets: ["c_competence","c_order","c_dutifulness","c_achievement","c_discipline","c_deliberation"].map((k) => ({
        key: k, label: FACET_LABELS[k], tScore: Math.round(facets[k] ?? 50),
      })),
    },
    {
      domain: "extraversion",
      label: "Extraversion",
      tScore: Math.round(result.bf_extraversion),
      facets: ["e_warmth","e_gregariousness","e_assertiveness","e_activity","e_excitement","e_positiveEmotions"].map((k) => ({
        key: k, label: FACET_LABELS[k], tScore: Math.round(facets[k] ?? 50),
      })),
    },
    {
      domain: "agreeableness",
      label: "Agreeableness",
      tScore: Math.round(result.bf_agreeableness),
      facets: ["a_trust","a_straightforward","a_altruism","a_compliance","a_modesty","a_tenderMindedness"].map((k) => ({
        key: k, label: FACET_LABELS[k], tScore: Math.round(facets[k] ?? 50),
      })),
    },
    {
      domain: "neuroticism",
      label: "Neuroticism",
      tScore: Math.round(result.bf_neuroticism),
      facets: ["neu_anxiety","neu_hostility","neu_depression","neu_selfConsciousness","neu_impulsiveness","neu_vulnerability"].map((k) => ({
        key: k, label: FACET_LABELS[k], tScore: Math.round(facets[k] ?? 50),
      })),
    },
  ];

  const subtests = [
    { label: "Matrix Reasoning", scaled: result.iq_matrix_scaled, percentile: tScoreToPercentile(50 + 10 * (result.iq_matrix_scaled - 10) / 3) },
    { label: "Verbal Reasoning",  scaled: result.iq_verbal_scaled,  percentile: tScoreToPercentile(50 + 10 * (result.iq_verbal_scaled - 10) / 3) },
    { label: "Numerical Reasoning", scaled: result.iq_numerical_scaled, percentile: tScoreToPercentile(50 + 10 * (result.iq_numerical_scaled - 10) / 3) },
    { label: "Spatial Reasoning",  scaled: result.iq_spatial_scaled,  percentile: tScoreToPercentile(50 + 10 * (result.iq_spatial_scaled - 10) / 3) },
    { label: "Working Memory",     scaled: result.iq_working_memory_scaled, percentile: tScoreToPercentile(50 + 10 * (result.iq_working_memory_scaled - 10) / 3) },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">
            Oxford Kings Development Rating — Full Report
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Your Complete Profile</h1>
          <p className="text-slate-500 mt-2">
            {new Date(result.created_at).toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </p>
        </div>

        {/* IQ */}
        <IQScoreCard iq={result.iq_full_scale} percentile={iqPercentile} classification={classification} />

        {/* Subtests */}
        <SubtestChart subtests={subtests} />

        {/* Big Five Radar */}
        <BigFiveRadar
          openness={result.bf_openness}
          conscientiousness={result.bf_conscientiousness}
          extraversion={result.bf_extraversion}
          agreeableness={result.bf_agreeableness}
          neuroticism={result.bf_neuroticism}
        />

        {/* Facet breakdown */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">30 Personality Facets</h2>
          <FacetTable domains={domainFacetData} />
        </div>

        <p className="text-center text-xs text-slate-400 pb-8">
          OKDR uses the IPIP-NEO-120 (public domain) and ICAR cognitive battery (open-access).
          Scores are T-scores normed against the general adult population (mean=50, SD=10).
        </p>
      </div>
    </main>
  );
}
