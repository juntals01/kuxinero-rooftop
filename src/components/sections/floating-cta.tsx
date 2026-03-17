"use client";

import { Facebook } from "lucide-react";
import Link from "next/link";
import { defaultContent, type SiteContent } from "@/lib/site-content-shared";

export function FloatingCTA({ general = defaultContent.general }: { general?: SiteContent["general"] }) {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <Link
        href={general.facebookUrl}
        target="_blank"
        className="flex items-center gap-2 h-12 sm:h-14 px-5 sm:px-8 rounded-full bg-accent text-primary font-bold text-sm sm:text-base shadow-button hover:brightness-110 hover:scale-105 transition-all"
      >
        <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Message Us</span>
      </Link>
    </div>
  );
}
