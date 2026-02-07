'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  
  // NEW: State to track which product IDs are favorited
  const [favorites, setFavorites] = useState([]);

  // Toggle function for favorites
  const toggleFavorite = (e, id) => {
    e.preventDefault(); // Prevents the Link from triggering
    e.stopPropagation(); // Prevents the click from bubbling up to the card
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const productList = [
    {
      id: "prod_01",
      name: "Seer Fish / King Fish / Neymeen",
      image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d", 
      price: 625,
      originalPrice: 949,
      weight: "500g",
      category: "Marine Fish"
    },
    {
      id: "prod_02",
      name: "Seer Fish / King Fish / Neymeen",
      image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e", 
      price: 625,
      originalPrice: 949,
      weight: "500g",
      category: "Marine Fish"
    },
    {
      id: "prod_03",
      name: "Seer Fish / King Fish / Neymeen",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25", 
      price: 625,
      originalPrice: 949,
      weight: "500g",
      category: "Marine Fish"
    },
    {
      id: "prod_04",
      name: "Seer Fish / King Fish / Neymeen",
      image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d", 
      price: 754,
      originalPrice: 949,
      weight: "500g",
      category: "Marine Fish"
    },
    {
      id: "prod_05",
      name: "Seer Fish / King Fish / Neymeen",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25", 
      price: 625,
      originalPrice: 949,
      weight: "500g",
      category: "Marine Fish"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-cyan-100 relative">
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Header Section */}
        <div className="relative flex items-center justify-center mb-4 border-b border-slate-100 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Marine <span className="text-[#00b8d9]">Fish</span>
          </h1>

          <div className="absolute right-0 flex md:hidden bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setIsSingleColumn(true)} className={`p-1.5 rounded-md ${isSingleColumn ? 'bg-white shadow-sm text-[#00b8d9]' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
            </button>
            <button onClick={() => setIsSingleColumn(false)} className={`p-1.5 rounded-md ${!isSingleColumn ? 'bg-white shadow-sm text-[#00b8d9]' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid gap-px bg-slate-100 border border-slate-100 overflow-hidden rounded-2xl ${isSingleColumn ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 lg:grid-cols-5`}>
          {productList.map((item) => {
            const isLiked = favorites.includes(item.id);
            
            return (
              <Link 
                key={item.id} 
                href={`/products/${item.id}`}
                className="group bg-white p-5 hover:bg-slate-50 transition-colors duration-200 relative block"
              >
                {/* NEW: Favorite Button for the list view */}
                <button 
                  onClick={(e) => toggleFavorite(e, item.id)}
                  className="absolute top-7 right-7 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-slate-50 transition-all active:scale-90"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill={isLiked ? "#10b981" : "none"} 
                    stroke={isLiked ? "#10b981" : "#94a3b8"} 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z"/>
                  </svg>
                </button>

                <div className={`overflow-hidden rounded-xl bg-slate-50 mb-5 ${isSingleColumn ? 'aspect-[16/9]' : 'aspect-square'}`}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.category}</p>
                  <h3 className={`font-semibold text-slate-800 leading-snug line-clamp-2 ${isSingleColumn ? 'text-xl' : 'text-sm min-h-[40px]'}`}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{item.weight}</p>
                  
                  <div className="flex items-baseline gap-2 mt-4">
                      <span className={`font-bold text-emerald-600 ${isSingleColumn ? 'text-2xl' : 'text-lg'}`}>
                        ₹{item.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-medium">
                        ₹{item.originalPrice}
                      </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}