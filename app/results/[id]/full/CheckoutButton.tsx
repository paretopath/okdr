"use client";

import { useState } from "react";

export default function CheckoutButton({ resultId }: { resultId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resultId }),
    });
    const { url, error } = await res.json();
    if (error) { alert(error); setLoading(false); return; }
    window.location.href = url;
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
    >
      {loading ? "Loading..." : "Unlock Full Report — £19.99"}
    </button>
  );
}
