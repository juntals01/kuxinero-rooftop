import fs from "fs/promises";
import path from "path";
import type { SiteContent } from "./site-content-shared";
import { defaultContent } from "./site-content-shared";

export type {
  SiteContent,
  HeroDish,
  Highlight,
  SignatureDish,
  MenuGroup,
  MenuItem,
  FullMenuItem,
  Review,
} from "./site-content-shared";
export { defaultContent } from "./site-content-shared";

// ─── Server-side content loader ───────────────────────────────────────────────

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

export async function getContent(): Promise<SiteContent> {
  const apiUrl   = process.env.BLOG_API_URL;
  const domainId = process.env.BLOG_API_DOMAIN_ID;

  // Primary: load from blog API domain settings (public endpoint)
  if (apiUrl && domainId && domainId !== "your-domain-uuid-here") {
    try {
      const res = await fetch(`${apiUrl}/domains/${domainId}/settings`, {
        next: { revalidate: 30 },
      });
      if (res.ok) {
        const settings = await res.json();
        const saved = settings?.themeConfig?.siteContent as Partial<SiteContent> | undefined;
        if (saved) return { ...defaultContent, ...saved } as SiteContent;
      }
    } catch {
      // fall through to JSON fallback
    }
  }

  // Fallback: local content.json
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf-8");
    const saved = JSON.parse(raw) as Partial<SiteContent>;
    return { ...defaultContent, ...saved } as SiteContent;
  } catch {
    return defaultContent;
  }
}
