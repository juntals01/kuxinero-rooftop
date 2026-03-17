import { PageNavbar } from "@/components/sections/page-navbar";
import { getContent } from "@/lib/site-content";
import { GalleryClient } from "./gallery-client";

export default async function GalleryPage() {
  const content = await getContent();
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <PageNavbar />
      <GalleryClient images={content.gallery.images} general={content.general} />
    </main>
  );
}
