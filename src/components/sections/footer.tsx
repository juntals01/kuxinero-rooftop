import Image from "next/image";
import Link from "next/link";
import { Facebook, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#4A2C1F] to-[#2D1A12] border-t border-accent/30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[60px] max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[120px] py-10 lg:py-14">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="Kuxinero Rooftop"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-base font-bold text-white">
              Kuxinero Rooftop
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-[300px]">
            Affordable, tasty rooftop dining experience for the Cebuano
            community.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-accent">Quick Links</h4>
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-accent">Connect</h4>
          <Link
            href="https://www.facebook.com/profile.php?id=61587210681219"
            target="_blank"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Facebook className="w-4 h-4" />
            Facebook Page
          </Link>
          <span className="flex items-center gap-2 text-sm text-white/[0.47]">
            <Phone className="w-4 h-4" />
            Phone: Coming soon
          </span>
          <span className="text-sm text-white/[0.47]">
            Hours: Coming soon
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-accent">Address</h4>
          <p className="text-[13px] text-white/60 leading-relaxed max-w-[280px]">
            Along St. Joseph the Worker Parish Church, Cebu South Road, Tabunoc,
            Talisay, Cebu
          </p>
        </div>
      </div>
    </footer>
  );
}
