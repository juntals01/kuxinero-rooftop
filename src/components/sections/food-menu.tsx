import { Flame, Drumstick, EggFried, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { defaultContent, type MenuGroup as ContentMenuGroup, type SiteContent } from "@/lib/site-content-shared";

interface MenuGroupView {
  icon: LucideIcon;
  title: string;
  items: ContentMenuGroup["items"];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Flame,
  Drumstick,
  EggFried,
  UtensilsCrossed,
};

function MenuGroupCard({ icon: Icon, title, items }: MenuGroupView) {
  return (
    <div className="flex flex-col bg-card rounded-2xl lg:rounded-[20px] shadow-card overflow-hidden">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-[#4A2C1F] to-[#2D1A12]">
        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-accent" />
        <h3 className="text-base sm:text-xl font-bold text-accent">{title}</h3>
      </div>
      <div className="flex flex-col px-4 sm:px-6 py-2 pb-3 sm:pb-4">
        {items.map((item, i) => (
          <div
            key={item.name}
            className={`flex items-center justify-between py-3 sm:py-3.5 ${
              i < items.length - 1 ? "border-b border-accent/[0.08]" : ""
            }`}
          >
            <span className="text-sm sm:text-base font-medium text-foreground">
              {item.name}
            </span>
            <span className="text-sm sm:text-[17px] font-bold text-accent shrink-0 ml-3">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FoodMenu({ groups = defaultContent.homeMenuGroups }: { groups?: SiteContent["homeMenuGroups"] }) {
  return (
    <section id="menu" className="py-12 lg:py-20 px-5 sm:px-8 lg:px-[120px] max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <AnimateIn>
          <div className="flex flex-col items-center gap-3">
            <UtensilsCrossed className="w-7 h-7 sm:w-9 sm:h-9 text-accent" />
            <div className="w-16 sm:w-20 h-[3px] bg-accent rounded-sm" />
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground text-center">
              Our Menu
            </h2>
            <p className="text-sm sm:text-[17px] text-muted-foreground text-center max-w-[620px] leading-relaxed">
              From sizzling sisig to hearty silog meals — real Filipino flavors at
              honest prices.
            </p>
          </div>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
          {groups.map((g, i) => {
            const Icon = ICON_MAP[g.icon] ?? UtensilsCrossed;
            return (
              <AnimateIn key={g.title} delay={i * 150}>
                <MenuGroupCard icon={Icon} title={g.title} items={g.items} />
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
