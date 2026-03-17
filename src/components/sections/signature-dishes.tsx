import Image from "next/image";
import { AnimateIn } from "@/components/animate-in";
import { defaultContent, type SignatureDish } from "@/lib/site-content-shared";

function DishCard({ image, name, price, description, badge }: SignatureDish) {
  return (
    <div className="flex flex-col bg-card rounded-2xl lg:rounded-3xl shadow-card overflow-hidden">
      <div className="relative w-full h-[160px] sm:h-[180px]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-foreground">{name}</h4>
          {badge && (
            <span className="text-[10px] sm:text-[11px] font-semibold text-primary bg-accent/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap shrink-0">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs sm:text-[15px] text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
        <p className="text-sm sm:text-[15px] font-bold text-accent">{price}</p>
      </div>
    </div>
  );
}

export function SignatureDishes({ dishes = defaultContent.signatureDishes }: { dishes?: SignatureDish[] }) {
  return (
    <section className="py-10 lg:py-16 px-5 sm:px-8 lg:px-[120px] max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-6 lg:gap-8">
        <AnimateIn>
          <h2 className="text-2xl lg:text-[32px] font-bold tracking-tight text-foreground">
            Signature Dishes
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {dishes.map((d, i) => (
            <AnimateIn key={d.name} delay={i * 100}>
              <DishCard {...d} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
