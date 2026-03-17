"use client";

import { useState } from "react";
import Image from "next/image";
import { Footer } from "@/components/sections/footer";
import type { SiteContent } from "@/lib/site-content-shared";

const filters = ["All", "Food", "Rooftop", "Events"];

export function GalleryClient({
  images,
  general,
}: {
  images: SiteContent["gallery"]["images"];
  general: SiteContent["general"];
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const cols = [0, 1, 2].map((col) =>
    filtered.filter((_, i) => i % 3 === col)
  );

  return (
    <>
      <section className="flex-1 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-[120px] pt-8 lg:pt-12 pb-12 lg:pb-16">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl lg:text-[40px] font-bold tracking-tight text-foreground">
              Gallery
            </h1>
            <p className="text-base text-muted-foreground mt-2">
              Explore our rooftop vibe, delicious food, and memorable events.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cols.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-4">
                {col.map((img) => (
                  <button
                    key={img.src}
                    onClick={() =>
                      setLightbox(filtered.findIndex((f) => f.src === img.src))
                    }
                    className="relative rounded-2xl overflow-hidden group cursor-pointer"
                    style={{ height: img.height }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {img.alt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <button
            className="absolute left-4 sm:left-8 text-white/70 hover:text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + filtered.length) % filtered.length);
            }}
          >
            ‹
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-[70vh]">
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <button
            className="absolute right-4 sm:right-8 text-white/70 hover:text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % filtered.length);
            }}
          >
            ›
          </button>
        </div>
      )}

      <Footer general={general} />
    </>
  );
}

