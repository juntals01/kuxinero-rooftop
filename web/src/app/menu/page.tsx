"use client";

import { useState } from "react";
import Image from "next/image";
import { PageNavbar } from "@/components/sections/page-navbar";
import { Footer } from "@/components/sections/footer";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
  category: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Grilled Tuna Panga",
    description: "Fresh catch, charcoal-grilled to perfection. Served with rice.",
    price: "₱250",
    image: "/images/panga.jpg",
    tags: ["Grilled"],
    category: "Grilled",
  },
  {
    name: "Grilled Pork Belly",
    description: "Juicy, crispy, and a Filipino crowd favorite. Best paired with rice.",
    price: "₱220",
    image: "/images/pork-belly.jpg",
    tags: ["Grilled", "Best Seller"],
    category: "Grilled",
  },
  {
    name: "Sizzling Pork Sisig",
    description: "Sizzling hot on a plate, a classic Pinoy pulutan. Perfect with beer.",
    price: "₱200",
    image: "/images/sisig.jpg",
    tags: ["Sizzling", "Pulutan"],
    category: "Sizzling",
  },
  {
    name: "Chicken Bufafa",
    description: "Tender chicken with a unique blend of local spices and herbs.",
    price: "₱180",
    image: "/images/chicken-bufafa.jpg",
    tags: ["Chicken"],
    category: "Chicken",
  },
  {
    name: "Silogan Meals",
    description: "Hearty silog combos: sinangag, itlog, and your choice of ulam.",
    price: "₱150",
    image: "/images/menu.jpg",
    tags: ["Silogan"],
    category: "Silogan",
  },
  {
    name: "Chicken Inasal",
    description: "Marinated and grilled chicken, Bacolod style with annatto oil.",
    price: "₱120",
    image: "/images/chicken-bufafa.jpg",
    tags: ["Grilled", "Chicken"],
    category: "Grilled",
  },
  {
    name: "Sisig with Rice",
    description: "Classic sisig served hot with garlic rice on the side.",
    price: "₱99",
    image: "/images/sisig.jpg",
    tags: ["Sizzling"],
    category: "Sizzling",
  },
  {
    name: "Hamsilog",
    description: "Ham, sinangag, and itlog — a timeless Filipino breakfast combo.",
    price: "₱79",
    image: "/images/menu.jpg",
    tags: ["Silogan"],
    category: "Silogan",
  },
  {
    name: "Longsilog",
    description: "Sweet longganisa paired with garlic rice and fried egg.",
    price: "₱79",
    image: "/images/menu.jpg",
    tags: ["Silogan"],
    category: "Silogan",
  },
  {
    name: "Chicken Pamasin",
    description: "Crispy chicken tossed in a savory-sour parmesan glaze.",
    price: "₱99",
    image: "/images/chicken-bufafa.jpg",
    tags: ["Chicken"],
    category: "Chicken",
  },
];

const filters = ["All", "Grilled", "Sizzling", "Silogan", "Chicken"];

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === activeFilter);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <PageNavbar />

      <section className="flex-1 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-[120px] pt-8 lg:pt-12 pb-12 lg:pb-16">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl lg:text-[40px] font-bold tracking-tight text-foreground">
              Our Menu
            </h1>
            <p className="text-base text-muted-foreground mt-2">
              Affordable, tasty rooftop dining. Browse our favorites below.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`h-10 px-6 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-accent text-primary font-semibold"
                    : "border-[1.5px] border-accent text-accent hover:bg-accent/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {filtered.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-5 p-5 bg-card rounded-2xl shadow-card"
              >
                <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          tag === "Best Seller"
                            ? "bg-accent text-primary"
                            : "bg-[#EDE5D8] text-primary"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg font-bold text-accent mt-1">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
