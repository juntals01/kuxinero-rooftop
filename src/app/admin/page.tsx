"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Save, LogOut, Lock, Plus, Trash2, Settings, Star,
  MapPin, ImageIcon, UtensilsCrossed, Flame, MessageSquare,
  Sparkles, Upload, Loader2, Mail,
} from "lucide-react";
import type {
  SiteContent, HeroDish, Highlight, SignatureDish,
  MenuGroup, MenuItem, FullMenuItem, Review,
} from "@/lib/site-content-shared";
import { defaultContent } from "@/lib/site-content-shared";

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "general",           label: "General",          icon: Settings },
  { id: "hero",              label: "Hero Banner",      icon: ImageIcon },
  { id: "highlights",        label: "Highlights",       icon: Sparkles },
  { id: "signatureDishes",   label: "Signature Dishes", icon: UtensilsCrossed },
  { id: "homeMenuGroups",    label: "Menu (Home)",      icon: Flame },
  { id: "menuPageItems",     label: "Menu Page",        icon: UtensilsCrossed },
  { id: "rooftopExperience", label: "Rooftop Section",  icon: Star },
  { id: "socialProof",       label: "Reviews",          icon: MessageSquare },
  { id: "location",          label: "Location",         icon: MapPin },
];

const inp = "bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500 text-sm h-9";
const tx  = "bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-amber-500 text-sm";

function normalizeContent(partial: unknown): SiteContent {
  const p = (partial ?? {}) as Partial<SiteContent>;
  return {
    ...defaultContent,
    ...p,
    general: { ...defaultContent.general, ...(p.general ?? {}) },
    hero: { ...defaultContent.hero, ...(p.hero ?? {}), dishes: (p.hero?.dishes ?? defaultContent.hero.dishes) },
    rooftopExperience: { ...defaultContent.rooftopExperience, ...(p.rooftopExperience ?? {}) },
    socialProof: { ...defaultContent.socialProof, ...(p.socialProof ?? {}), reviews: (p.socialProof?.reviews ?? defaultContent.socialProof.reviews) },
    location: { ...defaultContent.location, ...(p.location ?? {}) },
    highlights: (p.highlights ?? defaultContent.highlights),
    signatureDishes: (p.signatureDishes ?? defaultContent.signatureDishes),
    homeMenuGroups: (p.homeMenuGroups ?? defaultContent.homeMenuGroups),
    menuPageItems: (p.menuPageItems ?? defaultContent.menuPageItems),
  };
}

// ─── Image upload button ──────────────────────────────────────────────────────

function ImageField({
  value, onChange, jwt,
}: {
  value: string;
  onChange: (url: string) => void;
  jwt: string;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}` },
        body: fd,
      });
      if (res.ok) {
        const { url } = await res.json();
        onChange(url);
      } else {
        alert("Upload failed — check the API is running.");
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn(inp, "flex-1")}
        placeholder="/images/dish.jpg or https://…"
      />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading || !jwt}
        title={jwt ? "Upload image" : "Login to upload"}
        className="flex items-center gap-1.5 px-3 rounded-md border border-neutral-700 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 text-xs transition-colors disabled:opacity-40"
      >
        {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
        {uploading ? "…" : "Upload"}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-neutral-400 text-xs uppercase tracking-wider">{label}</Label>
      {children}
    </div>
  );
}

function SectionCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="p-5 space-y-4">
        {title && <p className="text-neutral-200 font-medium text-sm">{title}</p>}
        {children}
      </CardContent>
    </Card>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function ItemCard({ index, label, onRemove, children }: {
  index: number; label?: string; onRemove: () => void; children: React.ReactNode;
}) {
  return (
    <Card className="bg-neutral-800/60 border-neutral-700">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500 text-xs">{label ?? `#${index + 1}`}</span>
          <button onClick={onRemove} className="text-red-500 hover:text-red-400 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-neutral-700 text-neutral-500 hover:text-amber-400 hover:border-amber-500/50 text-sm transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

// ─── Section components ───────────────────────────────────────────────────────

function GeneralSection({ c, set }: { c: SiteContent; set: (x: SiteContent) => void }) {
  const g = c.general;
  const u = (k: keyof typeof g, v: string) => set({ ...c, general: { ...g, [k]: v } });
  return (
    <SectionCard title="Site Information">
      <F label="Brand Name">
        <Input value={g.brandName} onChange={e => u("brandName", e.target.value)} className={inp} />
      </F>
      <F label="Description">
        <Textarea value={g.description} onChange={e => u("description", e.target.value)} className={tx} rows={3} />
      </F>
      <F label="Facebook URL">
        <Input value={g.facebookUrl} onChange={e => u("facebookUrl", e.target.value)} className={inp} />
      </F>
      <Row>
        <F label="Phone">
          <Input value={g.phone} onChange={e => u("phone", e.target.value)} className={inp} placeholder="+63 912 345 6789" />
        </F>
        <F label="Address">
          <Input value={g.address} onChange={e => u("address", e.target.value)} className={inp} />
        </F>
      </Row>
    </SectionCard>
  );
}

function HeroSection({ c, set, jwt }: { c: SiteContent; set: (x: SiteContent) => void; jwt: string }) {
  const h = c.hero;
  const u = (k: keyof typeof h, v: unknown) => set({ ...c, hero: { ...h, [k]: v } });
  const updDish = (i: number, k: keyof HeroDish, v: string) => {
    const next = [...h.dishes];
    next[i] = { ...next[i], [k]: v };
    u("dishes", next);
  };
  return (
    <div className="space-y-4">
      <SectionCard title="Hero Text">
        <Row>
          <F label="Title Line 1">
            <Input value={h.title1} onChange={e => u("title1", e.target.value)} className={inp} />
          </F>
          <F label="Title Line 2">
            <Input value={h.title2} onChange={e => u("title2", e.target.value)} className={inp} />
          </F>
        </Row>
        <F label="Subtitle">
          <Input value={h.subtitle} onChange={e => u("subtitle", e.target.value)} className={inp} />
        </F>
        <F label="Description">
          <Textarea value={h.description} onChange={e => u("description", e.target.value)} className={tx} rows={2} />
        </F>
        <F label="Location Text">
          <Input value={h.location} onChange={e => u("location", e.target.value)} className={inp} />
        </F>
      </SectionCard>

      <div className="space-y-3">
        <p className="text-neutral-400 text-xs uppercase tracking-wider px-1">Hero Dishes</p>
        {h.dishes.map((d, i) => (
          <ItemCard key={i} index={i} label={d.name || `Dish ${i + 1}`} onRemove={() => u("dishes", h.dishes.filter((_, j) => j !== i))}>
            <Row>
              <F label="Name">
                <Input value={d.name} onChange={e => updDish(i, "name", e.target.value)} className={inp} />
              </F>
              <F label="Price">
                <Input value={d.price} onChange={e => updDish(i, "price", e.target.value)} className={inp} />
              </F>
            </Row>
            <F label="Image">
              <ImageField value={d.image} onChange={v => updDish(i, "image", v)} jwt={jwt} />
            </F>
            <F label="Badge (optional)">
              <Input value={d.badge ?? ""} onChange={e => updDish(i, "badge", e.target.value)} className={inp} placeholder="Best Seller" />
            </F>
          </ItemCard>
        ))}
        <AddButton onClick={() => u("dishes", [...h.dishes, { name: "", price: "", image: "" }])} label="Add Dish" />
      </div>
    </div>
  );
}

function HighlightsSection({ c, set }: { c: SiteContent; set: (x: SiteContent) => void }) {
  const items = c.highlights;
  const u = (i: number, k: keyof Highlight, v: string) => {
    const next = [...items]; next[i] = { ...next[i], [k]: v };
    set({ ...c, highlights: next });
  };
  return (
    <div className="space-y-3">
      <p className="text-neutral-400 text-xs uppercase tracking-wider px-1">Highlight Cards</p>
      {items.map((h, i) => (
        <ItemCard key={i} index={i} label={h.title || `Highlight ${i + 1}`} onRemove={() => set({ ...c, highlights: items.filter((_, j) => j !== i) })}>
          <F label="Icon Name (lucide)">
            <Input value={h.icon} onChange={e => u(i, "icon", e.target.value)} className={inp} placeholder="MoonStar, Wallet, Users…" />
          </F>
          <F label="Title">
            <Input value={h.title} onChange={e => u(i, "title", e.target.value)} className={inp} />
          </F>
          <F label="Description">
            <Textarea value={h.description} onChange={e => u(i, "description", e.target.value)} className={tx} rows={2} />
          </F>
        </ItemCard>
      ))}
      <AddButton onClick={() => set({ ...c, highlights: [...items, { icon: "Star", title: "", description: "" }] })} label="Add Highlight" />
    </div>
  );
}

function SignatureDishesSection({ c, set, jwt }: { c: SiteContent; set: (x: SiteContent) => void; jwt: string }) {
  const items = c.signatureDishes;
  const u = (i: number, k: keyof SignatureDish, v: string) => {
    const next = [...items]; next[i] = { ...next[i], [k]: v };
    set({ ...c, signatureDishes: next });
  };
  return (
    <div className="space-y-3">
      <p className="text-neutral-400 text-xs uppercase tracking-wider px-1">Signature Dishes</p>
      {items.map((d, i) => (
        <ItemCard key={i} index={i} label={d.name || `Dish ${i + 1}`} onRemove={() => set({ ...c, signatureDishes: items.filter((_, j) => j !== i) })}>
          <Row>
            <F label="Name">
              <Input value={d.name} onChange={e => u(i, "name", e.target.value)} className={inp} />
            </F>
            <F label="Price">
              <Input value={d.price} onChange={e => u(i, "price", e.target.value)} className={inp} />
            </F>
          </Row>
          <F label="Description">
            <Textarea value={d.description} onChange={e => u(i, "description", e.target.value)} className={tx} rows={2} />
          </F>
          <F label="Image">
            <ImageField value={d.image} onChange={v => u(i, "image", v)} jwt={jwt} />
          </F>
          <F label="Badge (optional)">
            <Input value={d.badge ?? ""} onChange={e => u(i, "badge", e.target.value)} className={inp} placeholder="Best Seller" />
          </F>
        </ItemCard>
      ))}
      <AddButton onClick={() => set({ ...c, signatureDishes: [...items, { name: "", price: "", description: "", image: "" }] })} label="Add Dish" />
    </div>
  );
}

function HomeMenuSection({ c, set }: { c: SiteContent; set: (x: SiteContent) => void }) {
  const groups = c.homeMenuGroups;
  const uGroup = (i: number, k: keyof MenuGroup, v: unknown) => {
    const next = [...groups]; next[i] = { ...next[i], [k]: v };
    set({ ...c, homeMenuGroups: next });
  };
  const uItem = (gi: number, ii: number, k: keyof MenuItem, v: string) => {
    const items = [...groups[gi].items];
    items[ii] = { ...items[ii], [k]: v };
    uGroup(gi, "items", items);
  };
  return (
    <div className="space-y-4">
      {groups.map((g, gi) => (
        <Card key={gi} className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-neutral-200 font-medium text-sm">{g.title || `Group ${gi + 1}`}</p>
              <button onClick={() => set({ ...c, homeMenuGroups: groups.filter((_, j) => j !== gi) })} className="text-red-500 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Row>
              <F label="Icon Name (lucide)">
                <Input value={g.icon} onChange={e => uGroup(gi, "icon", e.target.value)} className={inp} placeholder="Flame" />
              </F>
              <F label="Group Title">
                <Input value={g.title} onChange={e => uGroup(gi, "title", e.target.value)} className={inp} />
              </F>
            </Row>
            <Separator className="bg-neutral-700" />
            <p className="text-neutral-500 text-xs uppercase tracking-wider">Items</p>
            <div className="space-y-2">
              {g.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-2">
                  <Input value={item.name} onChange={e => uItem(gi, ii, "name", e.target.value)} className={cn(inp, "flex-1")} placeholder="Item name" />
                  <Input value={item.price} onChange={e => uItem(gi, ii, "price", e.target.value)} className={cn(inp, "w-24")} placeholder="₱0" />
                  <button onClick={() => uGroup(gi, "items", g.items.filter((_, j) => j !== ii))} className="text-red-500 hover:text-red-400 shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <AddButton onClick={() => uGroup(gi, "items", [...g.items, { name: "", price: "" }])} label="Add Item" />
            </div>
          </CardContent>
        </Card>
      ))}
      <AddButton onClick={() => set({ ...c, homeMenuGroups: [...groups, { icon: "Utensils", title: "", items: [] }] })} label="Add Menu Group" />
    </div>
  );
}

function MenuPageSection({ c, set, jwt }: { c: SiteContent; set: (x: SiteContent) => void; jwt: string }) {
  const items = c.menuPageItems;
  const u = (i: number, k: keyof FullMenuItem, v: unknown) => {
    const next = [...items]; next[i] = { ...next[i], [k]: v };
    set({ ...c, menuPageItems: next });
  };
  return (
    <div className="space-y-3">
      <p className="text-neutral-400 text-xs uppercase tracking-wider px-1">Full Menu Items</p>
      {items.map((d, i) => (
        <ItemCard key={i} index={i} label={d.name || `Item ${i + 1}`} onRemove={() => set({ ...c, menuPageItems: items.filter((_, j) => j !== i) })}>
          <Row>
            <F label="Name">
              <Input value={d.name} onChange={e => u(i, "name", e.target.value)} className={inp} />
            </F>
            <F label="Price">
              <Input value={d.price} onChange={e => u(i, "price", e.target.value)} className={inp} />
            </F>
          </Row>
          <F label="Description">
            <Textarea value={d.description} onChange={e => u(i, "description", e.target.value)} className={tx} rows={2} />
          </F>
          <Row>
            <F label="Image">
              <ImageField value={d.image} onChange={v => u(i, "image", v)} jwt={jwt} />
            </F>
            <F label="Category">
              <Input value={d.category} onChange={e => u(i, "category", e.target.value)} className={inp} placeholder="Grilled" />
            </F>
          </Row>
          <F label="Tags (comma-separated)">
            <Input
              value={d.tags.join(", ")}
              onChange={e => u(i, "tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
              className={inp}
              placeholder="Grilled, Best Seller"
            />
          </F>
        </ItemCard>
      ))}
      <AddButton
        onClick={() => set({ ...c, menuPageItems: [...items, { name: "", description: "", price: "", image: "", category: "", tags: [] }] })}
        label="Add Menu Item"
      />
    </div>
  );
}

function RooftopSection({ c, set }: { c: SiteContent; set: (x: SiteContent) => void }) {
  const r = c.rooftopExperience;
  const u = (k: keyof typeof r, v: string) => set({ ...c, rooftopExperience: { ...r, [k]: v } });
  return (
    <SectionCard title="Rooftop Experience Section">
      <F label="Heading">
        <Input value={r.heading} onChange={e => u("heading", e.target.value)} className={inp} />
      </F>
      <F label="Subheading">
        <Input value={r.subheading} onChange={e => u("subheading", e.target.value)} className={inp} />
      </F>
    </SectionCard>
  );
}

function SocialProofSection({ c, set }: { c: SiteContent; set: (x: SiteContent) => void }) {
  const sp = c.socialProof;
  const uReview = (i: number, k: keyof Review, v: string | number) => {
    const next = [...sp.reviews]; next[i] = { ...next[i], [k]: v };
    set({ ...c, socialProof: { ...sp, reviews: next } });
  };
  return (
    <div className="space-y-4">
      <SectionCard title="Rating Summary">
        <Row>
          <F label="Overall Rating">
            <Input
              type="number" min={0} max={5} step={0.1}
              value={sp.rating}
              onChange={e => set({ ...c, socialProof: { ...sp, rating: parseFloat(e.target.value) || 0 } })}
              className={inp}
            />
          </F>
          <F label="Rating Label">
            <Input value={sp.ratingLabel} onChange={e => set({ ...c, socialProof: { ...sp, ratingLabel: e.target.value } })} className={inp} />
          </F>
        </Row>
      </SectionCard>
      <div className="space-y-3">
        <p className="text-neutral-400 text-xs uppercase tracking-wider px-1">Reviews</p>
        {sp.reviews.map((r, i) => (
          <ItemCard key={i} index={i} label={r.name || `Review ${i + 1}`} onRemove={() => set({ ...c, socialProof: { ...sp, reviews: sp.reviews.filter((_, j) => j !== i) } })}>
            <Row>
              <F label="Name">
                <Input value={r.name} onChange={e => uReview(i, "name", e.target.value)} className={inp} />
              </F>
              <F label="Rating (1–5)">
                <Input type="number" min={1} max={5} value={r.rating} onChange={e => uReview(i, "rating", parseInt(e.target.value) || 5)} className={inp} />
              </F>
            </Row>
            <F label="Review Text">
              <Textarea value={r.text} onChange={e => uReview(i, "text", e.target.value)} className={tx} rows={3} />
            </F>
          </ItemCard>
        ))}
        <AddButton
          onClick={() => set({ ...c, socialProof: { ...sp, reviews: [...sp.reviews, { name: "", text: "", rating: 5 }] } })}
          label="Add Review"
        />
      </div>
    </div>
  );
}

function LocationSection({ c, set }: { c: SiteContent; set: (x: SiteContent) => void }) {
  const l = c.location;
  const u = (k: keyof typeof l, v: string) => set({ ...c, location: { ...l, [k]: v } });
  return (
    <SectionCard title="Location Section">
      <Row>
        <F label="Heading">
          <Input value={l.heading} onChange={e => u("heading", e.target.value)} className={inp} />
        </F>
        <F label="Subheading">
          <Input value={l.subheading} onChange={e => u("subheading", e.target.value)} className={inp} />
        </F>
      </Row>
      <F label="Display Address">
        <Textarea value={l.address} onChange={e => u("address", e.target.value)} className={tx} rows={2} />
      </F>
      <F label="Google Maps Link">
        <Input value={l.mapsLink} onChange={e => u("mapsLink", e.target.value)} className={inp} />
      </F>
      <F label="Map Embed URL">
        <Textarea value={l.mapEmbedUrl} onChange={e => u("mapEmbedUrl", e.target.value)} className={tx} rows={3} />
      </F>
    </SectionCard>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [jwt, setJwt]                   = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [content, setContent]           = useState<SiteContent | null>(null);
  const [activeSection, setActiveSection] = useState("general");
  const [saving, setSaving]             = useState(false);
  const [saveStatus, setSaveStatus]     = useState<"idle" | "saved" | "error">("idle");
  const [loginError, setLoginError]     = useState("");
  const [loading, setLoading]           = useState(false);

  // Restore session on reload.
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("kuxinero_admin_jwt") : null;
    if (!stored) return;

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const contentRes = await fetch("/api/admin/content", {
          headers: { Authorization: `Bearer ${stored}` },
        });
        if (!contentRes.ok) throw new Error("unauthorized");
        const data = await contentRes.json();
        if (cancelled) return;
        setJwt(stored);
        setContent(normalizeContent(data));
        setAuthenticated(true);
      } catch {
        window.localStorage.removeItem("kuxinero_admin_jwt");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const login = async () => {
    if (!email || !password) return;
    setLoading(true);
    setLoginError("");
    try {
      // 1. Get JWT from blog API
      const authRes = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!authRes.ok) {
        setLoginError("Invalid email or password.");
        return;
      }
      const { accessToken } = await authRes.json();

      // 2. Load current site content
      const contentRes = await fetch("/api/admin/content", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = contentRes.ok ? await contentRes.json() : {};

      setJwt(accessToken);
      window.localStorage.setItem("kuxinero_admin_jwt", accessToken);
      setContent(normalizeContent(data));
      setAuthenticated(true);
    } catch {
      setLoginError("Could not connect to the API.");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(content),
      });
      setSaveStatus(res.ok ? "saved" : "error");
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setJwt("");
    setContent(null);
    setEmail("");
    setPassword("");
    setActiveSection("general");
    setSaveStatus("idle");
    setLoginError("");
    if (typeof window !== "undefined") window.localStorage.removeItem("kuxinero_admin_jwt");
  };

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-white font-semibold text-xl">Admin Panel</h1>
            <p className="text-neutral-500 text-sm">Kuxinero Rooftop CMS</p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-neutral-400 text-xs uppercase tracking-wider">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setLoginError(""); }}
                  onKeyDown={e => e.key === "Enter" && login()}
                  placeholder="you@example.com"
                  className={cn(inp, "h-10 pl-9")}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-neutral-400 text-xs uppercase tracking-wider">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setLoginError(""); }}
                onKeyDown={e => e.key === "Enter" && login()}
                placeholder="••••••••"
                className={cn(inp, "h-10")}
              />
            </div>
            {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
            <Button
              onClick={login}
              disabled={loading || !email || !password}
              className="w-full h-10 bg-amber-500 hover:bg-amber-400 text-black font-semibold"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-neutral-950 flex">

      {/* Sidebar */}
      <aside className="w-52 bg-neutral-900 border-r border-neutral-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-neutral-800">
          <p className="text-amber-400 font-semibold text-sm">Kuxinero</p>
          <p className="text-neutral-600 text-xs mt-0.5">Content Manager</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                activeSection === s.id
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-neutral-500 hover:text-white hover:bg-neutral-800"
              )}
            >
              <s.icon className="w-3.5 h-3.5 shrink-0" />
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-neutral-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-600 hover:text-white hover:bg-neutral-800 text-sm transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-13 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-5 shrink-0">
          <h1 className="text-neutral-200 font-medium text-sm">
            {SECTIONS.find(s => s.id === activeSection)?.label}
          </h1>
          <Button
            onClick={save}
            disabled={saving}
            size="sm"
            className={cn(
              "font-medium h-8 text-xs px-3",
              saveStatus === "saved" ? "bg-green-600 hover:bg-green-600 text-white" :
              saveStatus === "error" ? "bg-red-600 hover:bg-red-600 text-white" :
              "bg-amber-500 hover:bg-amber-400 text-black"
            )}
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            {saving ? "Saving…" : saveStatus === "saved" ? "Saved!" : saveStatus === "error" ? "Error" : "Save Changes"}
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-5">
          <div className="max-w-2xl mx-auto">
            {activeSection === "general"           && <GeneralSection         c={content} set={setContent} />}
            {activeSection === "hero"              && <HeroSection            c={content} set={setContent} jwt={jwt} />}
            {activeSection === "highlights"        && <HighlightsSection      c={content} set={setContent} />}
            {activeSection === "signatureDishes"   && <SignatureDishesSection c={content} set={setContent} jwt={jwt} />}
            {activeSection === "homeMenuGroups"    && <HomeMenuSection        c={content} set={setContent} />}
            {activeSection === "menuPageItems"     && <MenuPageSection        c={content} set={setContent} jwt={jwt} />}
            {activeSection === "rooftopExperience" && <RooftopSection         c={content} set={setContent} />}
            {activeSection === "socialProof"       && <SocialProofSection     c={content} set={setContent} />}
            {activeSection === "location"          && <LocationSection        c={content} set={setContent} />}
          </div>
        </main>
      </div>
    </div>
  );
}
