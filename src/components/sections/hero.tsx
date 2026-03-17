"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";
import { defaultContent, type SiteContent } from "@/lib/site-content-shared";

// Entrance animation helper — uses tw-animate-css utilities.
// Elements start as opacity-0 (SSR-safe), then animate in on mount.
function enter(delay: string = "") {
  return cn(
    "animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-fill-mode:both]",
    delay
  );
}

export function Hero({ hero = defaultContent.hero }: { hero?: SiteContent["hero"] }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const dishes = hero.dishes ?? defaultContent.hero.dishes;
  const total = dishes.length;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  // Trigger entrance animations shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function getCardStyle(index: number) {
    const diff = ((index - active + total) % total);
    const pos = diff <= Math.floor(total / 2) ? diff : diff - total;

    const absPos = Math.abs(pos);
    const scale = pos === 0 ? 1 : 0.78 - absPos * 0.06;
    const translateX = pos * 120;
    const translateY = absPos * 14;
    const zIndex = 10 - absPos;
    const opacity = absPos <= 1 ? 1 : absPos === 2 ? 0.4 : 0;

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 0.55s cubic-bezier(0.34, 1.4, 0.64, 1)",
    };
  }

  return (
    <section ref={sectionRef} className="relative w-full min-h-[500px] md:min-h-[550px] lg:h-[600px] overflow-hidden">

      {/* Parallax background */}
      <div
        className="absolute -top-[60px] -left-[20px] -right-[20px] -bottom-[60px]"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
      >
        <Image
          src="/images/fire-banner.png"
          alt="Kuxinero Rooftop ambiance"
          fill
          sizes="110vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/33 to-black/60" />

      {/* Ambient floating orb — warm golden glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 w-[420px] h-[140px] rounded-full blur-3xl bg-accent opacity-0 animate-hero-float"
        style={{ animationDelay: "0.8s" }}
      />
      {/* Secondary ambient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-[10%] w-[200px] h-[200px] rounded-full blur-3xl bg-accent animate-hero-float-slow"
        style={{ animationDelay: "2s" }}
      />

      <Navbar />

      <div className="relative z-10 flex flex-col lg:flex-row items-center h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[120px] pt-28 pb-10 lg:py-[60px] gap-8 lg:gap-0">

        {/* ── Left: text content ───────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:gap-5 w-full lg:w-1/2 text-center lg:text-left">
          <div>
            <h1
              className={cn(
                "text-3xl sm:text-4xl lg:text-[52px] font-[900] tracking-tight lg:tracking-[-2px] text-white leading-tight drop-shadow-lg",
                mounted ? enter("[animation-delay:0ms]") : "opacity-0"
              )}
            >
              {hero.title1}
            </h1>
            <h1
              className={cn(
                "text-3xl sm:text-4xl lg:text-[52px] font-[900] tracking-tight lg:tracking-[-2px] text-accent leading-tight drop-shadow-lg",
                mounted ? enter("[animation-delay:120ms]") : "opacity-0"
              )}
            >
              {hero.title2}
            </h1>
          </div>

          <p
            className={cn(
              "text-sm sm:text-base lg:text-[18px] font-medium text-white leading-relaxed drop-shadow-md",
              mounted ? enter("[animation-delay:240ms]") : "opacity-0"
            )}
          >
            {hero.subtitle}
          </p>

          <p
            className={cn(
              "text-sm lg:text-base text-white/[0.9] leading-relaxed drop-shadow-md",
              mounted ? enter("[animation-delay:340ms]") : "opacity-0"
            )}
          >
            {hero.description}
          </p>

          <p
            className={cn(
              "text-xs lg:text-[15px] font-medium text-white/80 drop-shadow-md",
              mounted ? enter("[animation-delay:400ms]") : "opacity-0"
            )}
          >
            {hero.location}
          </p>

          <div
            className={cn(
              "flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mt-2",
              mounted ? enter("[animation-delay:500ms]") : "opacity-0"
            )}
          >
            {/* Primary CTA — subtle glow pulse after entrance */}
            <Link
              href="#location"
              className="flex items-center gap-2 h-11 lg:h-[52px] px-5 lg:px-8 rounded-xl lg:rounded-[14px] bg-accent text-primary font-bold text-sm lg:text-base hover:brightness-110 transition animate-hero-glow-pulse"
            >
              <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
              Get Directions
            </Link>
            <Link
              href="#menu"
              className="flex items-center gap-2 h-11 lg:h-[52px] px-5 lg:px-8 rounded-xl lg:rounded-[14px] border-2 border-accent text-accent font-semibold text-sm lg:text-base hover:bg-accent/10 transition"
            >
              <UtensilsCrossed className="w-4 h-4 lg:w-5 lg:h-5" />
              View Menu
            </Link>
          </div>
        </div>

        {/* ── Right: carousel ──────────────────────────────────────────── */}
        <div
          className={cn(
            "w-full lg:w-1/2 flex flex-col items-center gap-4 overflow-hidden",
            mounted ? enter("[animation-delay:580ms]") : "opacity-0"
          )}
        >
          <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] flex items-center justify-center overflow-hidden">
            {dishes.map((dish, index) => (
              <div
                key={dish.name}
                className={cn(
                  "absolute w-[200px] sm:w-[220px] lg:w-[240px] rounded-2xl overflow-hidden bg-card cursor-pointer",
                  index === active
                    ? "border-2 border-accent shadow-hero-card"
                    : "border border-white/20 shadow-card"
                )}
                style={getCardStyle(index)}
                onClick={() => setActive(index)}
              >
                <div className="relative w-full h-[180px] sm:h-[200px]">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                  {/* Badge re-mounts on active change → re-triggers pop animation */}
                  {dish.badge && index === active && (
                    <span
                      key={`badge-${active}`}
                      className="absolute top-3 left-3 text-[10px] font-bold text-primary bg-accent px-2.5 py-1 rounded-full animate-badge-pop"
                    >
                      {dish.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {dish.name}
                  </p>
                  <p className="text-sm font-bold text-accent">{dish.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition hover:scale-110 active:scale-95"
              aria-label="Previous dish"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            <div className="flex gap-2">
              {dishes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === active
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Go to dish ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition hover:scale-110 active:scale-95"
              aria-label="Next dish"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
