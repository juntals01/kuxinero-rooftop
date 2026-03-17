import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { SignatureDishes } from "@/components/sections/signature-dishes";
import { FoodMenu } from "@/components/sections/food-menu";
import { RooftopExperience } from "@/components/sections/rooftop-experience";
import { LocationPreview } from "@/components/sections/location-preview";
import { SocialProof } from "@/components/sections/social-proof";
import { Footer } from "@/components/sections/footer";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { getContent } from "@/lib/site-content";

export default async function HomePage() {
  const content = await getContent();
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Hero hero={content.hero} />
      <Highlights highlights={content.highlights} />
      <SignatureDishes dishes={content.signatureDishes} />
      <FoodMenu groups={content.homeMenuGroups} />
      <RooftopExperience rooftop={content.rooftopExperience} />
      <LocationPreview location={content.location} />
      <SocialProof social={content.socialProof} />
      <Footer general={content.general} />
      <FloatingCTA general={content.general} />
    </main>
  );
}
