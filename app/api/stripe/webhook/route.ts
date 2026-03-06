import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { resultId, userId } = session.metadata ?? {};

    if (resultId && userId) {
      const supabase = await createClient();
      await supabase
        .from("results")
        .update({
          is_paid: true,
          stripe_payment_intent: session.payment_intent as string,
        })
        .eq("id", resultId)
        .eq("user_id", userId);
    }
  }

  return NextResponse.json({ received: true });
}
