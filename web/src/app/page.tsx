import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { SignatureDishes } from "@/components/sections/signature-dishes";
import { FoodMenu } from "@/components/sections/food-menu";
import { RooftopExperience } from "@/components/sections/rooftop-experience";
import { LocationPreview } from "@/components/sections/location-preview";
import { SocialProof } from "@/components/sections/social-proof";
import { Footer } from "@/components/sections/footer";
import { FloatingCTA } from "@/components/sections/floating-cta";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Hero />
      <Highlights />
      <SignatureDishes />
      <FoodMenu />
      <RooftopExperience />
      <LocationPreview />
      <SocialProof />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
