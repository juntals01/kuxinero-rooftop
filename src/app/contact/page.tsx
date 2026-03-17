"use client";

import { Facebook, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { PageNavbar } from "@/components/sections/page-navbar";
import { Footer } from "@/components/sections/footer";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content-shared";

export default function ContactPage() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/content");
      if (!res.ok) return;
      const data = (await res.json()) as SiteContent;
      if (!cancelled) setContent(data);
    })();
    return () => { cancelled = true; };
  }, []);

  const fb = content?.general.facebookUrl ?? "https://www.facebook.com/profile.php?id=61587210681219";
  const maps = content?.location.mapsLink ?? "https://maps.google.com";
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <PageNavbar />

      <section className="flex-1 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-[120px] pt-8 lg:pt-12 pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px]">
          <div className="flex flex-col gap-6 flex-1">
            <div>
              <h1 className="text-3xl lg:text-[40px] font-bold tracking-tight text-foreground">
                Get in Touch
              </h1>
              <p className="text-base text-muted-foreground mt-2">
                Have a question or want to reserve? Send us a message.
              </p>
            </div>

            <form className="flex flex-col gap-5 bg-card rounded-[20px] shadow-card p-6 sm:p-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="h-11 px-4 rounded-xl bg-[#FAFAF8] border-[1.5px] border-[#D1D0CD] text-sm text-foreground placeholder:text-[#9C9B99] outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  placeholder="Type your message..."
                  rows={5}
                  className="px-4 py-3 rounded-xl bg-[#FAFAF8] border-[1.5px] border-[#D1D0CD] text-sm text-foreground placeholder:text-[#9C9B99] outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Date/Time (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. March 15, 7pm"
                    className="h-11 px-4 rounded-xl bg-[#FAFAF8] border-[1.5px] border-[#D1D0CD] text-sm text-foreground placeholder:text-[#9C9B99] outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Party Size (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6 people"
                    className="h-11 px-4 rounded-xl bg-[#FAFAF8] border-[1.5px] border-[#D1D0CD] text-sm text-foreground placeholder:text-[#9C9B99] outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-12 rounded-xl bg-accent text-primary font-semibold text-base hover:brightness-110 transition"
              >
                Submit Inquiry
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-[360px] shrink-0">
            <h2 className="text-[22px] font-semibold text-foreground">
              Quick Actions
            </h2>

            <Link
              href={fb}
              target="_blank"
              className="flex items-center gap-3.5 p-5 bg-card rounded-2xl shadow-card hover:shadow-card-accent transition-shadow"
            >
              <Facebook className="w-7 h-7 text-accent" />
              <span className="text-base font-medium text-foreground">
                Message on Facebook
              </span>
            </Link>

            <Link
              href={maps}
              target="_blank"
              className="flex items-center gap-3.5 p-5 bg-card rounded-2xl shadow-card hover:shadow-card-accent transition-shadow"
            >
              <MapPin className="w-7 h-7 text-accent" />
              <span className="text-base font-medium text-foreground">
                Get Directions
              </span>
            </Link>

            <div className="flex items-center gap-3.5 p-5 bg-card rounded-2xl shadow-card opacity-60">
              <Phone className="w-7 h-7 text-accent" />
              <span className="text-base font-medium text-muted-foreground">
                Call Now (Coming Soon)
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
