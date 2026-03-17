import type { Metadata } from "next";
import { MapPin, Navigation, Facebook, Phone } from "lucide-react";
import Link from "next/link";
import { PageNavbar } from "@/components/sections/page-navbar";
import { Footer } from "@/components/sections/footer";
import { getContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Find Kuxinero Rooftop — located along St. Joseph the Worker Parish Church, Cebu South Road, Tabunok, Talisay, Cebu. Easy access from Tabunok Flyover.",
};

export default async function LocationPage() {
  const content = await getContent();
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <PageNavbar />

      <section className="flex-1 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-[120px] pt-8 lg:pt-12 pb-12 lg:pb-16">
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-3xl lg:text-[40px] font-bold tracking-tight text-foreground">
            Find Us
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full">
            <div className="flex-1 h-[300px] sm:h-[350px] lg:h-[400px] rounded-[20px] bg-[#D3D3D3] overflow-hidden">
              <iframe
                src={content.location.mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kuxinero Rooftop Location"
              />
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-[400px] shrink-0">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-accent" />
                  <h3 className="text-base font-semibold text-foreground">
                    Full Address
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                  {content.location.address}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-accent" />
                  <h3 className="text-base font-semibold text-foreground">
                    Google Maps Pin
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                  7R6Q+XCC Mananga St, Tabunok Flyover, Talisay, 6045 Cebu
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Link
                  href={content.location.mapsLink}
                  target="_blank"
                  className="flex items-center justify-center h-12 rounded-xl bg-accent text-primary font-semibold text-[15px] hover:brightness-110 transition"
                >
                  Open in Google Maps
                </Link>
                <button
                  disabled
                  className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-accent text-accent font-medium text-[15px] opacity-60 cursor-not-allowed"
                >
                  <Phone className="w-4 h-4" />
                  Call Now (Coming Soon)
                </button>
                <Link
                  href={content.general.facebookUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-accent text-accent font-medium text-[15px] hover:bg-accent/10 transition"
                >
                  <Facebook className="w-4 h-4" />
                  Message on Facebook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer general={content.general} />
    </main>
  );
}
