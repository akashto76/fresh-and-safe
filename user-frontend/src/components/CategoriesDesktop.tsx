// src/components/categoriesdesktop.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// Mock Data for Categories
const categories = [
  {
    id: "cat_01",
    name: "Fish & Seafood",
    image: "/one.avif", 
    link: "/category/fish-seafood"
  },
  {
    id: "cat_02",
    name: "Poultry",
    image: "/one.avif",
    link: "/category/poultry"
  },
  {
    id: "cat_03",
    name: "Mutton & Lamb",
    image: "/one.avif",
    link: "/category/mutton-lamb"
  },
  {
    id: "cat_04",
    name: "Ready to Cook",
    image: "/one.avif",
    link: "/category/ready-to-cook"
  },
  {
    id: "cat_05",
    name: "Combo Packs",
    image: "/one.avif",
    link: "/category/combo-packs"
  },
  {
    id: "cat_06",
    name: "Steaks & Fillets",
    image: "/one.avif",
    link: "/category/steaks-fillets"
  },
  {
    id: "cat_07",
    name: "Cold Pressed Juices",
    image: "/one.avif",
    link: "/category/juices"
  },
  {
    id: "cat_08",
    name: "Eggs",
    image: "/one.avif",
    link: "/category/eggs"
  }
];

export default function CategoriesDesktop() {
  return (
    <section className="py-6">
      {/* Centered Minimal Header with Bottom Border Line */}
      <div className="text-center mb-10 border-b border-slate-100 pb-4">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Shop by <span className="text-[#00b8d9]">Category</span>
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6 justify-items-center max-w-7xl mx-auto">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={cat.link}
            className="group flex flex-col items-center gap-4 w-full"
          >
            {/* Image Container with SVG Animation */}
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              
              {/* 1. Base Image Container (Rounded) */}
              <div className="w-full h-full rounded-full overflow-hidden border border-slate-100 relative z-10">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>

              {/* 2. SVG Animated Border Overlay */}
              <svg 
                className="absolute top-[-4px] left-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none z-20" 
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50" cy="50" r="49"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  // Added 'stroke-emerald-600' here to match your requested color
                  className="stroke-emerald-500 transition-[stroke-dashoffset] duration-700 ease-in-out [stroke-dasharray:308] [stroke-dashoffset:308] group-hover:[stroke-dashoffset:0]"
                />
              </svg>

            </div>

            {/* Category Name */}
            <h3 className="text-sm md:text-base font-bold text-slate-700 text-center group-hover:text-[#00b8d9] transition-colors leading-tight px-2">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}