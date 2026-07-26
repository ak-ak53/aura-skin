import { getProduct, products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-10">
      <div
        className="h-80 rounded-xl flex items-center justify-center text-white text-2xl font-medium"
        style={{ backgroundColor: product.color }}
      >
        {product.name}
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-black/50 mt-1">{product.tagline}</p>
        <p className="mt-4 text-xl font-semibold">${product.price}</p>
        <p className="mt-4 text-sm text-black/70 leading-relaxed">
          {product.description}
        </p>
        <ProductActions product={product} />
      </div>
    </div>
  );
}
