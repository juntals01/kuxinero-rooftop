import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const BLOG_API_URL  = process.env.BLOG_API_URL;
const DOMAIN_ID     = process.env.BLOG_API_DOMAIN_ID;
const CONTENT_PATH  = path.join(process.cwd(), "data", "content.json");

const useApi = () =>
  !!BLOG_API_URL && !!DOMAIN_ID && DOMAIN_ID !== "your-domain-uuid-here";

// ── GET — load current content ────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const jwt = req.headers.get("authorization");

  if (useApi()) {
    const res = await fetch(`${BLOG_API_URL}/domains/${DOMAIN_ID}/settings`, {
      headers: jwt ? { Authorization: jwt } : {},
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ error: "Failed to load from API" }, { status: res.status });
    const settings = await res.json();
    const content = settings?.themeConfig?.siteContent ?? null;
    return NextResponse.json(content ?? {});
  }

  // Fallback: JSON file
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({});
  }
}

// ── POST — save content ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const jwt  = req.headers.get("authorization");
  const body = await req.json();

  if (useApi()) {
    if (!jwt) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Read current themeConfig first so we don't wipe unrelated keys
    let existingTheme: Record<string, unknown> = {};
    try {
      const r = await fetch(`${BLOG_API_URL}/domains/${DOMAIN_ID}/settings`, {
        headers: { Authorization: jwt },
        cache: "no-store",
      });
      if (r.ok) existingTheme = (await r.json())?.themeConfig ?? {};
    } catch { /* ignore */ }

    const res = await fetch(`${BLOG_API_URL}/domains/${DOMAIN_ID}/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: jwt },
      body: JSON.stringify({
        themeConfig: { ...existingTheme, siteContent: body },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }
    return NextResponse.json({ ok: true });
  }

  // Fallback: JSON file (legacy password check)
  const adminPassword = process.env.ADMIN_PASSWORD ?? "kuxinero2025";
  const pw = req.headers.get("x-admin-password");
  if (pw !== adminPassword) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await fs.writeFile(CONTENT_PATH, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save content:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
