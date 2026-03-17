"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimateIn } from "@/components/animate-in";
import { defaultContent, type SiteContent } from "@/lib/site-content-shared";

export function RooftopExperience({ rooftop = defaultContent.rooftopExperience }: { rooftop?: SiteContent["rooftopExperience"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      setOffset((progress - 0.5) * 120);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[280px] sm:h-[350px] lg:h-[400px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-[-80px] w-[calc(100%)] h-[calc(100%+160px)]"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Image
          src="/images/cozy-people.jpg"
          alt="Rooftop dining experience"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/53 to-black/80" />
      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 text-center px-5 sm:px-8 lg:px-[120px]">
        <AnimateIn>
          <h2 className="text-2xl sm:text-4xl lg:text-[56px] font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
            {rooftop.heading}
          </h2>
        </AnimateIn>
        <AnimateIn delay={200}>
          <p className="text-sm sm:text-lg lg:text-xl font-medium text-white/[0.87] max-w-[600px] leading-relaxed">
            {rooftop.subheading}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
