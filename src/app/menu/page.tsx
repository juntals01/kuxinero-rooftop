import { PageNavbar } from "@/components/sections/page-navbar";
import { Footer } from "@/components/sections/footer";
import { getContent } from "@/lib/site-content";
import { MenuClient } from "./menu-client";

export default async function MenuPage() {
  const content = await getContent();
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <PageNavbar />

      <section className="flex-1 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-[120px] pt-8 lg:pt-12 pb-12 lg:pb-16">
        <MenuClient items={content.menuPageItems} />
      </section>

      <Footer general={content.general} />
    </main>
  );
}
