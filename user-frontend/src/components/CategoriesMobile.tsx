// src/components/CategoriesMobile.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// Updated with real representative images and added 2 new categories
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
  // Added Category 9
  { 
    id: "cat_09", 
    name: "Combo Packs", 
    image: "https://thumbs.dreamstime.com/b/assortment-meat-seafood-beef-chicken-fish-pork-assortment-meat-seafood-149111241.jpg", 
    link: "/category/combo" 
  },
  // Added Category 10
  { 
    id: "cat_10", 
    name: "Steaks & Fillets", 
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=300&q=80", 
    link: "/category/steaks" 
  }
];

export default function CategoriesMobile() {
  return (
    <section>
      {/* 1. Header: Aligned Left */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-extrabold text-slate-900">
          Shop by <span className="text-[#00b8d9]">Category</span>
        </h2>
      </div>

      {/* 2. Grid Layout: 4 cols */}
      <div className="grid grid-cols-4 gap-x-2 gap-y-8 px-2">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={cat.link} 
            className="flex flex-col items-center gap-3 w-full group"
          >
            {/* Circle Image Container */}
            <div className="w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden border border-slate-100 bg-slate-50 shadow-sm group-active:scale-95 transition-transform">
               <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Category Name */}
            <span className="text-[11px] font-bold text-slate-700 text-center leading-tight max-w-[70px]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}