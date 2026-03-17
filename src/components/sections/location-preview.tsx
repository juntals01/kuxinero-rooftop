import { MapPin } from "lucide-react";
import Link from "next/link";
import { AnimateIn } from "@/components/animate-in";
import { defaultContent, type SiteContent } from "@/lib/site-content-shared";

export function LocationPreview({ location = defaultContent.location }: { location?: SiteContent["location"] }) {
  return (
    <section id="location" className="py-10 lg:py-16 px-5 sm:px-8 lg:px-[120px] max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center gap-5 sm:gap-7">
        <AnimateIn>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl lg:text-[32px] font-bold tracking-tight text-foreground">
              {location.heading}
            </h2>
            <p className="text-sm lg:text-[15px] font-semibold text-accent">
              {location.subheading}
            </p>
            <div className="w-16 sm:w-20 h-[3px] bg-accent rounded-sm" />
          </div>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="flex items-start gap-2 sm:gap-3 w-full justify-center">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm lg:text-[15px] text-muted-foreground leading-relaxed text-center max-w-2xl">
              {location.address}
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="w-full">
          <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px] rounded-2xl lg:rounded-[20px] bg-[#D3D3D3] overflow-hidden">
            <iframe
              src={location.mapEmbedUrl}
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
            href={location.mapsLink}
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
