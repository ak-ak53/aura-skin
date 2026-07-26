"use client";

import { useCart } from "@/lib/CartContext";
import { track } from "@/lib/track";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, total } = useCart();
  const router = useRouter();

  function handleCheckout() {
    track("InitiateCheckout", {
      content_ids: items.map((i) => i.slug),
      contents: items.map((i) => ({ id: i.slug, quantity: i.qty })),
      value: total,
      currency: "USD",
      num_items: items.reduce((n, i) => n + i.qty, 0),
    });
    router.push("/checkout");
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-black/60">Your cart is empty.</p>
        <Link href="/" className="underline text-sm mt-4 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-xl font-semibold mb-6">Your Cart</h1>
      <div className="flex flex-col gap-4">
        {items.map((i) => (
          <div
            key={i.slug}
            className="flex items-center justify-between border-b border-black/10 pb-4"
          >
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-sm text-black/50">
                Qty {i.qty} x ${i.price}
              </p>
            </div>
            <button
              onClick={() => removeItem(i.slug)}
              className="text-xs text-red-600 underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="font-semibold">Total</p>
        <p className="font-semibold">${total.toFixed(2)}</p>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-6 w-full rounded-lg bg-[#2b2b2b] text-white py-3 text-sm font-medium hover:opacity-90"
      >
        Checkout
      </button>
    </div>
  );
}
