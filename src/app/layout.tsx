import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://kuxinero-rooftop.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Kuxinero Rooftop — Affordable Rooftop Dining in Tabunok, Talisay, Cebu",
    template: "%s | Kuxinero Rooftop",
  },
  description:
    "Kuxinero Rooftop serves affordable Filipino dishes — Grilled Tuna, Pork Belly, Sizzling Sisig, and Silogan Meals — on a cozy rooftop in Tabunok, Talisay, Cebu. Beside St. Joseph the Worker Parish Church.",
  keywords: [
    "Kuxinero Rooftop",
    "Tabunok restaurant",
    "Talisay Cebu restaurant",
    "rooftop dining Cebu",
    "affordable restaurant Talisay",
    "grilled tuna Cebu",
    "sizzling sisig Talisay",
    "silogan meals",
    "Filipino food Cebu",
    "rooftop bar Talisay",
  ],
  authors: [{ name: "Kuxinero Rooftop" }],
  creator: "Kuxinero Rooftop",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: "Kuxinero Rooftop",
    title: "Kuxinero Rooftop — Rooftop Vibes. Real Filipino Flavor.",
    description:
      "Affordable rooftop dining in Tabunok, Talisay, Cebu. Grilled Tuna, Pork Belly, Sizzling Sisig, Silogan Meals, and more.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kuxinero Rooftop — Tabunok, Talisay, Cebu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuxinero Rooftop — Rooftop Vibes. Real Filipino Flavor.",
    description:
      "Affordable rooftop dining in Tabunok, Talisay, Cebu. Grilled Tuna, Pork Belly, Sizzling Sisig, and Silogan Meals.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "facebook:page": "https://www.facebook.com/profile.php?id=61587210681219",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
