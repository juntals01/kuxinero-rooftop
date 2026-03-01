import { Star, StarHalf, MessageCircle } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

interface Review {
  name: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Maria C.",
    text: "Best sisig in Talisay! The rooftop vibe is so chill and affordable. We always come back with our barkada.",
    rating: 4,
  },
  {
    name: "John Rey D.",
    text: "Grilled tuna panga is a must-try. Huge serving for the price. Kids loved the silogan meals too!",
    rating: 4,
  },
  {
    name: "Cherry L.",
    text: "Love the ambiance at night. Very relaxing with great food. The chicken bufafa is our favorite!",
    rating: 3,
  },
];

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

export function SocialProof() {
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
              3.7
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
                Based on Facebook reviews
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
