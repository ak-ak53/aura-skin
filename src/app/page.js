import Link from "next/link";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div>
      <section className="px-6 py-16 text-center border-b border-black/10">
        <h1 className="text-4xl font-semibold tracking-tight">
          Skincare that works.
        </h1>
        <p className="mt-3 text-black/60 max-w-md mx-auto">
          Simple, effective routines. No fillers, no fluff.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-12 max-w-6xl mx-auto">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="border border-black/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="h-48 flex items-center justify-center text-white text-lg font-medium"
              style={{ backgroundColor: p.color }}
            >
              {p.name}
            </div>
            <div className="p-4">
              <h2 className="font-medium">{p.name}</h2>
              <p className="text-sm text-black/50">{p.tagline}</p>
              <p className="mt-2 font-semibold">${p.price}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
