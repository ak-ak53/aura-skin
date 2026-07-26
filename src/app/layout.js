import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import Link from "next/link";

export const metadata = {
  title: "Aura Skin",
  description: "Skincare that works. Test store for pixel/analytics practice.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fdfaf6] text-[#2b2b2b]">
        <AnalyticsScripts />
        <CartProvider>
          <header className="flex items-center justify-between px-6 py-4 border-b border-black/10">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Aura Skin
            </Link>
            <Link href="/cart" className="text-sm underline underline-offset-4">
              Cart
            </Link>
          </header>
          <main>{children}</main>
          <footer className="px-6 py-10 mt-16 text-xs text-black/40 border-t border-black/10">
            Aura Skin - test storefront, not a real business.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
