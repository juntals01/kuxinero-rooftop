import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See photos of Kuxinero Rooftop — our dishes, rooftop ambiance, and community events in Tabunok, Talisay, Cebu.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
