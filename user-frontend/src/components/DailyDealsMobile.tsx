// src/components/DailyDealsMobile.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// Reuse your data or import it
const dailyDeals = [
  {
    id: "deal_01",
    name: "Lababdar Instant Gravy Mix",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80", 
    price: 149,
    originalPrice: 175,
    weight: "200g",
    category: "Ready to Cook"
  },
  {
    id: "deal_02",
    name: "Fresh Seer Fish Steaks",
    image: "https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?cs=srgb&dl=pexels-mali-229789.jpg&fm=jpg",
    price: 550,
    originalPrice: 700,
    weight: "500g",
    category: "Marine Fish"
  },
  {
    id: "deal_03",
    name: "Premium Chicken Curry Cut",
    image: "https://t4.ftcdn.net/jpg/01/85/38/17/360_F_185381723_iLyNfQRVZg6Sk8FsZjst1pZtY6dYaPZ9.jpg",
    price: 180,
    originalPrice: 220,
    weight: "500g",
    category: "Poultry"
  },
  {
    id: "deal_04",
    name: "Tiger Prawns (Cleaned)",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    price: 399,
    originalPrice: 550,
    weight: "250g",
    category: "Shellfish"
  }
];

export default function DailyDealsMobile() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-extrabold text-slate-900">
          Daily <span className="text-[#00b8d9]">Deals</span>
        </h2>
        
        {/* Restored Swipe Hint with Standard SVG Arrow */}
        <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
          <span>Swipe</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {dailyDeals.map((item) => (
          <div 
            key={item.id} 
            className="min-w-[160px] max-w-[160px] snap-start bg-white border border-slate-100 rounded-2xl p-3"
          >
            <Link href={`/products/${item.id}`} className="block">
              <div className="h-32 rounded-xl overflow-hidden mb-3 relative bg-slate-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-800 text-xs line-clamp-2 h-8 leading-tight">
                  {item.name}
                </h3>
                <p className="text-[10px] text-slate-400">{item.weight}</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-bold text-emerald-600 text-sm">₹{item.price}</span>
                  <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}