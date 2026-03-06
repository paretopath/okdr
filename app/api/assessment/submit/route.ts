import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scoreIQ } from "@/lib/scoring/iq";
import { scoreBigFive } from "@/lib/scoring/bigfive";
import { MATRIX_ITEMS } from "@/lib/questions/iq/matrix";
import { VERBAL_ITEMS } from "@/lib/questions/iq/verbal";
import { NUMERICAL_ITEMS } from "@/lib/questions/iq/numerical";
import { SPATIAL_ITEMS } from "@/lib/questions/iq/spatial";
import { WORKING_MEMORY_ITEMS } from "@/lib/questions/iq/working-memory";
import { BIGFIVE_ITEMS } from "@/lib/questions/bigfive/ipip-neo-120";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { assessmentId } = await request.json();

  // Fetch the assessment
  const { data: assessment, error: fetchError } = await supabase
    .from("assessments")
    .select("id, user_id, iq_responses, bf_responses")
    .eq("id", assessmentId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  const iqResponses = assessment.iq_responses as Record<string, number>;
  const bfResponses = assessment.bf_responses as Record<string, number>;

  // Score IQ
  const iqResult = scoreIQ(
    iqResponses,
    MATRIX_ITEMS.map((i) => ({ id: i.id, correctIndex: i.correctIndex })),
    VERBAL_ITEMS.map((i) => ({ id: i.id, correctIndex: i.correctIndex })),
    NUMERICAL_ITEMS.map((i) => ({ id: i.id, correctIndex: i.correctIndex })),
    SPATIAL_ITEMS.map((i) => ({ id: i.id, correctIndex: i.correctIndex })),
    WORKING_MEMORY_ITEMS.map((i) => ({ id: i.id, correctIndex: i.correctIndex })),
  );

  // Score Big Five
  const bfResult = scoreBigFive(bfResponses, BIGFIVE_ITEMS);

  // Build facets JSON
  const facetsJson: Record<string, number> = {};
  for (const domain of Object.values(bfResult.domains)) {
    for (const facet of domain.facets) {
      facetsJson[facet.key] = facet.tScore;
    }
  }

  // Insert or update result
  const { data: existingResult } = await supabase
    .from("results")
    .select("id")
    .eq("assessment_id", assessmentId)
    .single();

  const resultData = {
    assessment_id: assessmentId,
    user_id: user.id,
    iq_full_scale: iqResult.fullScaleIQ,
    iq_percentile: iqResult.percentile,
    iq_matrix_scaled: iqResult.subtests.matrix.scaled,
    iq_verbal_scaled: iqResult.subtests.verbal.scaled,
    iq_numerical_scaled: iqResult.subtests.numerical.scaled,
    iq_spatial_scaled: iqResult.subtests.spatial.scaled,
    iq_working_memory_scaled: iqResult.subtests.workingMemory.scaled,
    bf_openness: bfResult.openness.tScore,
    bf_conscientiousness: bfResult.conscientiousness.tScore,
    bf_extraversion: bfResult.extraversion.tScore,
    bf_agreeableness: bfResult.agreeableness.tScore,
    bf_neuroticism: bfResult.neuroticism.tScore,
    bf_facets: facetsJson,
    is_paid: false,
  };

  let resultId: string;
  if (existingResult) {
    await supabase.from("results").update(resultData).eq("id", existingResult.id);
    resultId = existingResult.id;
  } else {
    const { data: newResult } = await supabase
      .from("results")
      .insert(resultData)
      .select("id")
      .single();
    resultId = newResult!.id;
  }

  return NextResponse.json({ resultId, iqResult, bfResult });
}
