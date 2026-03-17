import { MoonStar, Wallet, Users, type LucideIcon } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { defaultContent, type Highlight } from "@/lib/site-content-shared";

const ICON_MAP: Record<string, LucideIcon> = { MoonStar, Wallet, Users };

export function Highlights({ highlights = defaultContent.highlights }: { highlights?: Highlight[] }) {
  return (
    <section className="py-10 lg:py-16 px-5 sm:px-8 lg:px-[120px] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-6 lg:gap-9">
        <AnimateIn>
          <div>
            <h2 className="text-2xl lg:text-[32px] font-bold tracking-tight text-foreground">
              Why Kuxinero?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground mt-2">
              Experience rooftop dining the Cebuano way.
            </p>
          </div>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {highlights.map((h, i) => {
            const Icon = ICON_MAP[h.icon] ?? MoonStar;
            return (
              <AnimateIn key={h.title} delay={i * 120}>
                <div className="flex flex-col gap-4 lg:gap-[18px] p-6 sm:p-8 lg:p-10 bg-card rounded-2xl lg:rounded-[20px] shadow-card h-full">
                  <div className="w-full h-[3px] bg-accent rounded-sm" />
                  <Icon className="w-9 h-9 lg:w-11 lg:h-11 text-accent" />
                  <h4 className="text-lg lg:text-xl font-semibold text-foreground">{h.title}</h4>
                  <p className="text-sm lg:text-[15px] text-muted-foreground leading-relaxed">{h.description}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
