import { NextRequest, NextResponse } from "next/server";

const BLOG_API_URL = process.env.BLOG_API_URL;

export async function POST(req: NextRequest) {
  if (!BLOG_API_URL) {
    return NextResponse.json({ error: "BLOG_API_URL not configured" }, { status: 503 });
  }

  const { email, password } = await req.json();

  const res = await fetch(`${BLOG_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
