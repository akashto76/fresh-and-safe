'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// 1. Define an Interface for your Product
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  weight: string;
  category: string;
}

// 2. SUB-COMPONENTS
// Removed 'shadow-sm'
const SkeletonCard = ({ isSingleColumn }: { isSingleColumn: boolean }) => (
  <div className="bg-white p-5 relative animate-pulse border border-slate-100 rounded-2xl">
    <div
      className={`overflow-hidden rounded-xl bg-slate-200 mb-5 ${
        isSingleColumn ? 'aspect-[16/9]' : 'aspect-square'
      }`}
    />
    <div className="space-y-2">
      <div className="h-3 w-1/3 bg-slate-200 rounded" />
      <div className="h-4 w-full bg-slate-200 rounded" />
      <div className="h-4 w-5/6 bg-slate-200 rounded" />
      <div className="flex items-baseline gap-2 mt-4">
        <div className="h-6 w-16 bg-slate-200 rounded" />
        <div className="h-4 w-12 bg-slate-200 rounded" />
      </div>
    </div>
  </div>
);

const productList: Product[] = [
  {
    id: "prod_01",
    name: "Seer Fish / King Fish / Neymeen",
    image: "/one.avif",
    price: 625,
    originalPrice: 949,
    weight: "500g",
    category: "Marine Fish"
  },
  {
    id: "prod_02",
    name: "Seer Fish / King Fish / Neymeen",
    image: "/one.avif",
    price: 625,
    originalPrice: 949,
    weight: "500g",
    category: "Marine Fish"
  },
  {
    id: "prod_03",
    name: "Seer Fish / King Fish / Neymeen",
    image: "/one.avif",
    price: 625,
    originalPrice: 949,
    weight: "500g",
    category: "Marine Fish"
  }
];

export default function ProductsPage() {
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); 
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isAdding = !favorites.includes(id);
    setFavorites(prev =>
      isAdding ? [...prev, id] : prev.filter(favId => favId !== id)
    );

    setPopupMessage(isAdding ? "Product added to wishlist" : "Product removed from wishlist");
    setShowPopup(true);

    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-cyan-100 relative">
      
      {/* Toast Popup - Kept shadow here for visibility, but can be removed if needed */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          showPopup ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
          <div className={`${popupMessage.includes('added') ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full p-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {popupMessage.includes('added') ? <polyline points="20 6 9 17 4 12"/> : <line x1="18" y1="6" x2="6" y2="18" />}
            </svg>
          </div>
          <span className="text-sm font-medium text-white whitespace-nowrap">{popupMessage}</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-10">
        <div className="relative flex items-center justify-center mb-6 border-b border-slate-100 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Marine <span className="text-[#00b8d9]">Fish</span>
          </h1>

          {/* CHANGE 1: Added 'md:hidden' to hide toggle on desktop */}
          <div className="absolute right-0 flex md:hidden bg-slate-100 p-1 rounded-lg">
            <button 
                onClick={() => setIsSingleColumn(true)} 
                className={`p-1.5 rounded-md transition-colors ${isSingleColumn ? 'bg-white text-[#00b8d9]' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
            </button>
            <button 
                onClick={() => setIsSingleColumn(false)} 
                className={`p-1.5 rounded-md transition-colors ${!isSingleColumn ? 'bg-white text-[#00b8d9]' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            </button>
          </div>
        </div>

        <div className={`grid gap-6 overflow-hidden ${isSingleColumn ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} isSingleColumn={isSingleColumn} />)
            : productList.map((item) => {
                const isLiked = favorites.includes(item.id);
                return (
                  /* CHANGE 2: Removed 'hover:shadow-xl' and 'shadow-sm' */
                  <div key={item.id} className="group bg-white p-5 border border-slate-100 rounded-2xl hover:border-slate-300 transition-all duration-300 relative block">
                    <button
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className="absolute top-7 right-7 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-slate-50 transition-all active:scale-90 hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "#10b981" : "none"} stroke={isLiked ? "#10b981" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z" />
                      </svg>
                    </button>

                    <Link href={`/products/${item.id}`}>
                      <div className={`overflow-hidden rounded-xl bg-slate-50 mb-5 relative ${isSingleColumn ? 'aspect-[16/9]' : 'aspect-square'}`}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.category}</p>
                        <h3 className={`font-semibold text-slate-800 leading-snug line-clamp-2 ${isSingleColumn ? 'text-xl' : 'text-sm min-h-[40px]'}`}>{item.name}</h3>
                        <p className="text-xs text-slate-400 font-medium">{item.weight}</p>
                        <div className="flex items-baseline gap-2 mt-4">
                          <span className={`font-bold text-emerald-600 ${isSingleColumn ? 'text-2xl' : 'text-lg'}`}>₹{item.price}</span>
                          <span className="text-xs text-slate-400 line-through font-medium">₹{item.originalPrice}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
        </div>
      </section>
    </main>
  );
}