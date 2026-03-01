import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kuxinero Rooftop — send us a message, make a reservation, or find us on Facebook. Tabunok, Talisay, Cebu.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
