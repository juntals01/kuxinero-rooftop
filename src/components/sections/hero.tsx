"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "./navbar";

const dishes = [
  { name: "Grilled Tuna Panga", price: "₱169", image: "/images/panga.jpg", badge: "Best Seller" },
  { name: "Grilled Pork Belly", price: "₱120", image: "/images/pork-belly.jpg" },
  { name: "Sizzling Sisig", price: "₱99", image: "/images/sisig.jpg", badge: "Best Seller" },
  { name: "Chicken Bufafa", price: "₱99", image: "/images/chicken-bufafa.jpg" },
  { name: "Silogan Meals", price: "from ₱59", image: "/images/menu.jpg" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const total = dishes.length;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

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
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  }

  return (
    <section ref={sectionRef} className="relative w-full min-h-[500px] md:min-h-[550px] lg:h-[600px] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/33 to-black/60" />

      <Navbar />

      <div className="relative z-10 flex flex-col lg:flex-row items-center h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[120px] pt-28 pb-10 lg:py-[60px] gap-8 lg:gap-0">
        <div className="flex flex-col gap-4 lg:gap-5 w-full lg:w-1/2 text-center lg:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-[900] tracking-tight lg:tracking-[-2px] text-white leading-tight drop-shadow-lg">
              Rooftop Vibes.
            </h1>
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-[900] tracking-tight lg:tracking-[-2px] text-accent leading-tight drop-shadow-lg">
              Real Filipino Flavor.
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-[18px] font-medium text-white leading-relaxed drop-shadow-md">
            Grilled Tuna • Pork Belly • Sizzling Sisig • Silogan Meals
          </p>
          <p className="text-sm lg:text-base text-white/[0.9] leading-relaxed drop-shadow-md">
            Affordable meals for the Cebuano community.
          </p>
          <p className="text-xs lg:text-[15px] font-medium text-white/80 drop-shadow-md">
            Tabunok, Talisay • Beside St. Joseph the Worker Parish Church
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mt-2">
            <Link
              href="#location"
              className="flex items-center gap-2 h-11 lg:h-[52px] px-5 lg:px-8 rounded-xl lg:rounded-[14px] bg-accent text-primary font-bold text-sm lg:text-base shadow-button hover:brightness-110 transition"
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

        <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 overflow-hidden">
          <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] flex items-center justify-center overflow-hidden">
            {dishes.map((dish, index) => (
              <div
                key={dish.name}
                className={`absolute w-[200px] sm:w-[220px] lg:w-[240px] rounded-2xl overflow-hidden bg-card cursor-pointer ${
                  index === active
                    ? "border-2 border-accent shadow-hero-card"
                    : "border border-white/20 shadow-card"
                }`}
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
                  {dish.badge && index === active && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold text-primary bg-accent px-2.5 py-1 rounded-full">
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

          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition"
              aria-label="Previous dish"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            <div className="flex gap-2">
              {dishes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${
                    i === active
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to dish ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition"
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
