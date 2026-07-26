"use client";

import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Fake checkout - no real payment processed. Order details are passed
    // to the thank-you page via sessionStorage so it can fire Purchase.
    sessionStorage.setItem(
      "aura_last_order",
      JSON.stringify({ items, total, email })
    );
    clearCart();
    router.push("/thank-you");
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center text-black/60">
        Nothing to check out.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-xl font-semibold mb-2">Checkout</h1>
      <p className="text-xs text-black/40 mb-6">
        Test store - no real payment is processed here.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black/15 rounded-lg px-4 py-3 text-sm"
        />
        <input
          required
          placeholder="Card number (fake, any digits)"
          className="border border-black/15 rounded-lg px-4 py-3 text-sm"
        />
        <div className="flex gap-3">
          <input
            required
            placeholder="MM/YY"
            className="border border-black/15 rounded-lg px-4 py-3 text-sm w-1/2"
          />
          <input
            required
            placeholder="CVC"
            className="border border-black/15 rounded-lg px-4 py-3 text-sm w-1/2"
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <p className="text-black/50">Total</p>
          <p className="font-semibold">${total.toFixed(2)}</p>
        </div>
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-[#2b2b2b] text-white py-3 text-sm font-medium hover:opacity-90"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
