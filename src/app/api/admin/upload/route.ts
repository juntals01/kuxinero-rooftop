import { NextRequest, NextResponse } from "next/server";

const BLOG_API_URL = process.env.BLOG_API_URL;

export async function POST(req: NextRequest) {
  const jwt = req.headers.get("authorization");
  if (!jwt) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!BLOG_API_URL) return NextResponse.json({ error: "API not configured" }, { status: 503 });

  // Forward the multipart form data directly to the blog API
  const formData = await req.formData();

  const res = await fetch(`${BLOG_API_URL}/media/upload`, {
    method: "POST",
    headers: { Authorization: jwt },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) return NextResponse.json(data, { status: res.status });

  return NextResponse.json({ url: data.url, id: data.id });
}
