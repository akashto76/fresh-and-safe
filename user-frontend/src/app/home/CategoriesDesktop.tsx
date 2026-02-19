// src/components/CategoriesDesktop.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// Synced Data (Matches CategoriesMobile.tsx exactly)
const categories = [
  { 
    id: "cat_01", 
    name: "Freshly Frozen", 
    image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=300&q=80", 
    link: "/category/frozen" 
  },
  { 
    id: "cat_02", 
    name: "Fish & Seafood", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAY-deyGHv_t21Yd2BvB4ZjzJye-NC_UvQMA&s", 
    link: "/category/fish-seafood" 
  },
  { 
    id: "cat_03", 
    name: "Poultry", 
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=300&q=80", 
    link: "/category/poultry" 
  },
  { 
    id: "cat_04", 
    name: "Mutton", 
    image: "https://i0.wp.com/www.meatstoryfresh.ae/wp-content/uploads/2023/08/Mutton_CurryCut.jpg", 
    link: "/category/mutton" 
  },
  { 
    id: "cat_05", 
    name: "Ready to Cook", 
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80", 
    link: "/category/ready-to-cook" 
  },
  { 
    id: "cat_06", 
    name: "Instant Foods", 
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80", 
    link: "/category/instant" 
  },
  { 
    id: "cat_07", 
    name: "Dairy & Eggs", 
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=300&q=80", 
    link: "/category/dairy" 
  },
  { 
    id: "cat_08", 
    name: "Oils & Masalas", 
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80", 
    link: "/category/oils" 
  },
  { 
    id: "cat_09", 
    name: "Combo Packs", 
    image: "https://thumbs.dreamstime.com/b/assortment-meat-seafood-beef-chicken-fish-pork-assortment-meat-seafood-149111241.jpg", 
    link: "/category/combo" 
  },
  { 
    id: "cat_10", 
    name: "Steaks & Fillets", 
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=300&q=80", 
    link: "/category/steaks" 
  }
];

export default function CategoriesDesktop() {
  return (
    <section className="py-6">
      {/* Centered Minimal Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Shop by <span className="text-[#00b8d9]">Category</span>
        </h2>
      </div>

      {/* Grid Layout - Adjusted for 10 items 
          - lg:grid-cols-5 creates 2 perfect rows of 5 items
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6 justify-items-center max-w-7xl mx-auto">
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
                  strokeWidth="1" // <--- CHANGED FROM 2 TO 1 HERE
                  strokeLinecap="round"
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