"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import Link from "next/link";

export default function ThankYouPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("aura_last_order");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    setOrder(parsed);

    track("Purchase", {
      content_ids: parsed.items.map((i) => i.slug),
      contents: parsed.items.map((i) => ({ id: i.slug, quantity: i.qty })),
      value: parsed.total,
      currency: "USD",
      num_items: parsed.items.reduce((n, i) => n + i.qty, 0),
    });

    sessionStorage.removeItem("aura_last_order");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <p className="text-black/60">No recent order found.</p>
        <Link href="/" className="underline text-sm mt-4 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Thank you!</h1>
      <p className="text-black/60 mt-2">
        Your order total was{" "}
        <span className="font-semibold">${order.total.toFixed(2)}</span>.
      </p>
      <p className="text-xs text-black/40 mt-6">
        Purchase event fired to Meta Pixel, Conversions API, and GTM/GA4.
      </p>
      <Link href="/" className="underline text-sm mt-8 inline-block">
        Back to shop
      </Link>
    </div>
  );
}
