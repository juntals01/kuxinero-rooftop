import { Star, StarHalf, MessageCircle } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { defaultContent, type Review, type SiteContent } from "@/lib/site-content-shared";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: Math.floor(rating) }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
      ))}
      {rating % 1 >= 0.5 && (
        <StarHalf className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
      )}
    </div>
  );
}

export function SocialProof({ social = defaultContent.socialProof }: { social?: SiteContent["socialProof"] }) {
  const rating = social.rating ?? defaultContent.socialProof.rating;
  const reviews: Review[] = social.reviews ?? defaultContent.socialProof.reviews;
  return (
    <section className="py-10 lg:py-16 px-5 sm:px-8 lg:px-[120px] max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <AnimateIn>
          <h2 className="text-2xl lg:text-[32px] font-bold tracking-tight text-foreground text-center">
            What People Say
          </h2>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-5xl sm:text-[64px] font-extrabold text-accent leading-none">
              {rating.toFixed(1)}
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
                <StarHalf className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent/30" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {social.ratingLabel}
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          {reviews.map((r, i) => (
            <AnimateIn key={r.name} delay={200 + i * 120}>
              <div className="flex flex-col gap-3 p-5 sm:p-6 bg-card rounded-2xl shadow-card h-full">
                <Stars rating={r.rating} />
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {r.name}
                  </span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
