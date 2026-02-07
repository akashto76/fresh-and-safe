'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // --- NEW STATE FOR POPUP ---
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const product = {
    name: "Seer Fish / King Fish / Neymeen",
    price: 625,
    originalPrice: 949,
    weight: "500g",
    images: [
      "https://images.unsplash.com/photo-1617196034183-421b4917c92d",
      "https://images.unsplash.com/photo-1534604973900-c41ab4c5e636",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
    ],
    description: "Premium Seer fish slices, perfect for traditional Kerala curries or tawa fry. Sourced fresh daily and cleaned with precision for the best quality.",
    storage: "Store under refrigeration at 4°C or below, in hygienic conditions.",
    marketedBy: "Fresh & Safe Foods Pvt Ltd, Bangalore - 560008"
  };

  // --- UPDATED TOGGLE FUNCTION WITH POPUP ---
  const handleToggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);

    // Set message and show popup
    setPopupMessage(newState ? "Product added to wishlist" : "Product removed from wishlist");
    setShowPopup(true);

    // Auto-hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const totalPrice = product.price * qty;

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-20 relative">
      
      {/* --- BLURRED TOAST POPUP --- */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out ${
          showPopup ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-slate-900/80 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <div className={`${popupMessage.includes('added') ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full p-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {popupMessage.includes('added') ? (
                <polyline points="20 6 9 17 4 12"/>
              ) : (
                <line x1="18" y1="6" x2="6" y2="18" />
              )}
            </svg>
          </div>
          <span className="text-sm font-medium text-white whitespace-nowrap">
            {popupMessage}
          </span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
        <Link href="/products" className="text-slate-900 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <span className="font-semibold text-sm">Product Details</span>
        <div className="w-10"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* --- Image Slider Section --- */}
          <div className="w-full space-y-4">
            <div className="relative group">
              
              {/* Favorite (Love) Button */}
              <button 
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md transition-all active:scale-90"
                aria-label="Add to favorites"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="22" 
                  height="22" 
                  viewBox="0 0 24 24" 
                  fill={isFavorite ? "#10b981" : "none"} 
                  stroke={isFavorite ? "#10b981" : "currentColor"} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-colors duration-300"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z"/>
                </svg>
              </button>

              {/* Scroll Container */}
              <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-3xl bg-slate-50 border border-slate-100 shadow-sm">
                {product.images.map((img, index) => (
                  <div key={index} className="w-full flex-shrink-0 snap-center aspect-square">
                    <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Conditional Scroll Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {product.images.map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/60 shadow-sm"></div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-emerald-600 font-semibold text-sm">Net Weight: {product.weight}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">₹{product.price}.00</span>
              <span className="text-lg text-slate-400 line-through font-medium">₹{product.originalPrice}.00</span>
            </div>

            {/* Counter and Cart Button */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-5 py-2 text-[#00b8d9] font-bold text-xl hover:bg-slate-50 transition-colors">-</button>
                  <span className="px-4 font-bold text-lg">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-5 py-2 text-[#00b8d9] font-bold text-xl hover:bg-slate-50 transition-colors">+</button>
                </div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Per Pack</span>
              </div>

              <button className="w-full bg-[#00b8d9] hover:bg-[#00a2bf] text-white h-14 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-cyan-100 active:scale-[0.98]">
                Add to Cart <span className="opacity-30 font-normal">|</span> ₹{totalPrice}
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 pt-2">
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Description</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00b8d9] mb-1">Storage Instructions</h4>
                <p className="text-cyan-800 text-xs font-medium leading-relaxed">{product.storage}</p>
              </div>

              <div className="pt-4 text-[10px] text-slate-400 leading-relaxed uppercase font-semibold tracking-tight">
                Marketed By: <span className="font-medium lowercase capitalize">{product.marketedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}