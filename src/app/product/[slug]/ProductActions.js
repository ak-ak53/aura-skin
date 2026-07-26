"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/CartContext";
import { track } from "@/lib/track";
import Link from "next/link";

export default function ProductActions({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // ViewContent fires once, when the product page is actually viewed
  useEffect(() => {
    track("ViewContent", {
      content_ids: [product.slug],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "USD",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddToCart() {
    addItem(product);
    track("AddToCart", {
      content_ids: [product.slug],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "USD",
    });
    setAdded(true);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <button
        onClick={handleAddToCart}
        className="w-full rounded-lg bg-[#2b2b2b] text-white py-3 text-sm font-medium hover:opacity-90"
      >
        Add to Cart
      </button>
      {added && (
        <p className="text-sm text-green-700">
          Added to cart.{" "}
          <Link href="/cart" className="underline">
            View cart
          </Link>
        </p>
      )}
    </div>
  );
}
