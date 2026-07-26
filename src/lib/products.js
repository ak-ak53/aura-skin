export const products = [
  {
    slug: "vitamin-c-serum",
    name: "Vitamin C Serum",
    price: 24,
    tagline: "Brightening + antioxidant boost",
    color: "#f5c66b",
    description:
      "A lightweight daily serum with 15% Vitamin C to even out tone and fight dullness. Use every morning under moisturizer and SPF.",
  },
  {
    slug: "niacinamide-serum",
    name: "Niacinamide Serum",
    price: 22,
    tagline: "Pore refining + oil control",
    color: "#a8c9a1",
    description:
      "10% Niacinamide + Zinc to minimize the look of pores and balance oil production. Great for combination and acne-prone skin.",
  },
  {
    slug: "daily-moisturizer",
    name: "Daily Moisturizer",
    price: 28,
    tagline: "24hr barrier repair",
    color: "#c9b8e0",
    description:
      "A ceramide-rich moisturizer that locks in hydration without feeling heavy. Fragrance-free, non-comedogenic.",
  },
  {
    slug: "spf-50-sunscreen",
    name: "SPF 50 Sunscreen",
    price: 20,
    tagline: "No white cast, all-day protection",
    color: "#f2a6a6",
    description:
      "Broad-spectrum SPF 50 that blends invisibly on all skin tones. Lightweight enough to wear under makeup.",
  },
  {
    slug: "complete-glow-kit",
    name: "Complete Glow Kit",
    price: 59,
    tagline: "The full routine, bundled",
    color: "#8fb8d8",
    description:
      "Everything you need: Vitamin C Serum, Daily Moisturizer, and SPF 50 Sunscreen in one kit. Save $13 vs buying separately.",
    bundle: true,
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
