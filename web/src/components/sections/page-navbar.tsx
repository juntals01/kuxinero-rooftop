"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
];

export function PageNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full py-4 lg:py-5 px-5 sm:px-8 lg:px-[120px] bg-background">
      <div className="max-w-[1440px] mx-auto">
        <nav className="relative flex items-center justify-between h-16 lg:h-[68px] px-5 sm:px-6 lg:px-10 rounded-full bg-white/[0.93] shadow-nav border border-accent/25">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Kuxinero Rooftop"
              width={42}
              height={42}
              className="rounded-full"
            />
            <span className="text-base font-bold text-primary tracking-tight">
              Kuxinero Rooftop
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-semibold text-primary/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="https://maps.google.com"
            target="_blank"
            className="hidden sm:flex items-center gap-2 h-10 lg:h-11 px-5 lg:px-7 rounded-full bg-accent text-primary text-sm font-semibold shadow-button hover:brightness-110 transition"
          >
            <MapPin className="w-4 h-4" />
            Directions
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-nav border border-accent/20 p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-primary/70 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-accent/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
