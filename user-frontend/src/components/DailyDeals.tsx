// src/components/DailyDeals.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Data for Daily Deals with Real Images
const dailyDeals = [
  {
    id: "deal_01",
    name: "Lababdar Instant Gravy Mix (200g Pack)",
    // Image: Indian Spices / Gravy preparation
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80", 
    price: 149,
    originalPrice: 175,
    weight: "200g",
    category: "Ready to Cook"
  },
  {
    id: "deal_02",
    name: "Fresh Seer Fish Steaks",
    // Image: Sliced Fish / Market
    image: "https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?cs=srgb&dl=pexels-mali-229789.jpg&fm=jpg",
    price: 550,
    originalPrice: 700,
    weight: "500g",
    category: "Marine Fish"
  },
  {
    id: "deal_03",
    name: "Premium Chicken Curry Cut",
    // Image: Raw Chicken Meat
    image: "https://t4.ftcdn.net/jpg/01/85/38/17/360_F_185381723_iLyNfQRVZg6Sk8FsZjst1pZtY6dYaPZ9.jpg",
    price: 180,
    originalPrice: 220,
    weight: "500g",
    category: "Poultry"
  },
  {
    id: "deal_04",
    name: "Tiger Prawns (Cleaned)",
    // Image: Fresh Prawns
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    price: 399,
    originalPrice: 550,
    weight: "250g",
    category: "Shellfish"
  },
  {
    id: "deal_05",
    name: "Atlantic Salmon Fillet",
    // Image: Salmon Fillet
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80",
    price: 850,
    originalPrice: 1200,
    weight: "300g",
    category: "Imported"
  }
];

export default function DailyDeals() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent clicking the link
    e.stopPropagation(); // Stop event bubbling
    
    const isAdding = !favorites.includes(id);
    setFavorites(prev =>
      isAdding ? [...prev, id] : prev.filter(favId => favId !== id)
    );

    setPopupMessage(isAdding ? "Product added to wishlist" : "Product removed from wishlist");
    setShowPopup(true);

    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <section>
      
      {/* Toast Popup */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out pointer-events-none ${
          showPopup ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`}
      >
        <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
          <div className={`${popupMessage.includes('added') ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full p-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {popupMessage.includes('added') ? <polyline points="20 6 9 17 4 12"/> : <line x1="18" y1="6" x2="6" y2="18" />}
            </svg>
          </div>
          <span className="text-sm font-medium text-white whitespace-nowrap">{popupMessage}</span>
        </div>
      </div>

      {/* Centered Minimal Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Daily <span className="text-[#00b8d9]">Deals</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {dailyDeals.map((item) => {
          const isLiked = favorites.includes(item.id);

          return (
            <div 
              key={item.id} 
              className="group bg-white p-5 border border-slate-100 rounded-2xl hover:border-slate-300 transition-all duration-300 relative block"
            >
              
              {/* Favorite Button */}
              <button 
                onClick={(e) => toggleFavorite(e, item.id)}
                className={`absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-slate-50 transition-all active:scale-90 hover:scale-110 
                  ${isLiked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
                  fill={isLiked ? "#10b981" : "none"} 
                  stroke={isLiked ? "#10b981" : "#94a3b8"} 
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z" />
                </svg>
              </button>

              <Link href={`/products/${item.id}`}>
                {/* Image Container */}
                <div className="overflow-hidden rounded-xl bg-slate-50 mb-5 relative aspect-square">
                  {/* Note: If you switch to next/image later, remember to add images.unsplash.com to next.config.js */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    {item.category}
                  </p>
                  <h3 className="font-semibold text-slate-800 leading-snug line-clamp-2 text-sm min-h-[40px]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.weight}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="font-bold text-emerald-600 text-lg">
                      ₹{item.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through font-medium">
                      ₹{item.originalPrice}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}