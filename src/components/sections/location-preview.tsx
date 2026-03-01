import { MapPin } from "lucide-react";
import Link from "next/link";
import { AnimateIn } from "@/components/animate-in";

export function LocationPreview() {
  return (
    <section id="location" className="py-10 lg:py-16 px-5 sm:px-8 lg:px-[120px] max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center gap-5 sm:gap-7">
        <AnimateIn>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl lg:text-[32px] font-bold tracking-tight text-foreground">
              Visit Us
            </h2>
            <p className="text-sm lg:text-[15px] font-semibold text-accent">
              Easy access from Tabunok Flyover
            </p>
            <div className="w-16 sm:w-20 h-[3px] bg-accent rounded-sm" />
          </div>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="flex items-start gap-2 sm:gap-3 w-full justify-center">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm lg:text-[15px] text-muted-foreground leading-relaxed text-center max-w-2xl">
              Along St. Joseph the Worker Parish Church, Cebu South Road, Purok
              Lopez Jaena, Barangay Tabunoc, Talisay, Philippines
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="w-full">
          <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px] rounded-2xl lg:rounded-[20px] bg-[#D3D3D3] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.6!2d123.8!3d10.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDE1JzAwLjAiTiAxMjPCsDQ4JzAwLjAiRQ!5e0!3m2!1sen!2sph!4v1"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kuxinero Rooftop Location"
            />
          </div>
        </AnimateIn>

        <AnimateIn delay={300}>
          <Link
            href="https://maps.google.com"
            target="_blank"
            className="flex items-center justify-center h-10 sm:h-12 px-6 sm:px-8 rounded-xl bg-accent text-primary font-semibold text-sm sm:text-base hover:brightness-110 transition"
          >
            Open in Google Maps
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
