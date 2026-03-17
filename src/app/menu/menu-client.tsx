"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { FullMenuItem } from "@/lib/site-content-shared";

const filters = ["All", "Grilled", "Sizzling", "Silogan", "Chicken"];

export function MenuClient({ items }: { items: FullMenuItem[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((m) => m.category === activeFilter);
  }, [activeFilter, items]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl lg:text-[40px] font-bold tracking-tight text-foreground">
          Our Menu
        </h1>
        <p className="text-base text-muted-foreground mt-2">
          Affordable, tasty rooftop dining. Browse our favorites below.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`h-10 px-6 rounded-full text-sm font-medium transition-all ${
              activeFilter === f
                ? "bg-accent text-primary font-semibold"
                : "border-[1.5px] border-accent text-accent hover:bg-accent/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((item) => (
          <div
            key={`${item.name}-${item.price}`}
            className="flex items-center gap-5 p-5 bg-card rounded-2xl shadow-card"
          >
            <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-snug">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      tag === "Best Seller"
                        ? "bg-accent text-primary"
                        : "bg-[#EDE5D8] text-primary"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-lg font-bold text-accent mt-1">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

