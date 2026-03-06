import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resultId } = await request.json();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env.STRIPE_FULL_REPORT_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: {
      resultId,
      userId: user.id,
    },
    success_url: `${appUrl}/results/${resultId}/full?success=1`,
    cancel_url: `${appUrl}/results/${resultId}/full`,
    customer_email: user.email,
  });

  // Store session ID on result
  await supabase
    .from("results")
    .update({ stripe_session_id: session.id })
    .eq("id", resultId)
    .eq("user_id", user.id);

  return NextResponse.json({ url: session.url });
}
