import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the full Kuxinero Rooftop menu — Grilled Tuna, Pork Belly, Sizzling Sisig, Chicken Bufafa, Silogan Meals, and more. Affordable Filipino food in Tabunok, Talisay, Cebu.",
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
