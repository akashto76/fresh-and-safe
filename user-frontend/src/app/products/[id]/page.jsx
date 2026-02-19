'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // --- STATE FOR POPUP ---
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const product = {
    name: "Seer Fish / King Fish / Neymeen",
    price: 625,
    originalPrice: 949,
    weight: "500g",
    // Added a bunch of extra images to test the scrolling sidebar!
    images: [
      "/one.avif",
      "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Premium Seer fish slices, perfect for traditional Kerala curries or tawa fry. Sourced fresh daily and cleaned with precision for the best quality.",
    storage: "Store under refrigeration at 4°C or below, in hygienic conditions.",
    marketedBy: "Fresh & Safe Foods Pvt Ltd, Kochi - 560008"
  };

  // State for Desktop Active Image
  const [activeImage, setActiveImage] = useState(product.images[0]);

  // --- HELPER TO TRIGGER POPUP ---
  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  // --- TOGGLE FAVORITE ---
  const handleToggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    triggerPopup(newState ? "Product added to wishlist" : "Product removed from wishlist");
  };

  // --- ADD TO CART FUNCTION ---
  const handleAddToCart = () => {
    triggerPopup("Product added to cart");
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
        <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
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

      {/* --- PAGE HEADER --- */}
      <div className="sticky md:static top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-slate-900 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <span className="font-semibold text-sm">Product Details</span>
        <div className="w-10"></div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* ==========================================
              LEFT SIDE: IMAGE GALLERY 
              ========================================== */}
          <div className="w-full max-w-lg mx-auto md:mx-0 space-y-4">
            
            {/* --- MOBILE: Horizontal Scroll Slider --- */}
            <div className="md:hidden relative group">
              <button 
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full transition-all active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={isFavorite ? "#10b981" : "none"} stroke={isFavorite ? "#10b981" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z"/></svg>
              </button>
              <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-3xl bg-slate-50 border border-slate-100">
                {product.images.map((img, index) => (
                  <div key={index} className="w-full flex-shrink-0 snap-center aspect-square">
                    <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* --- DESKTOP: Vertical Gallery with Scroll Guard --- */}
            <div className="hidden md:grid grid-cols-[4rem_1fr] lg:grid-cols-[5rem_1fr] gap-4">
              
              {/* Thumbnails Sidebar Wrapper */}
              <div className="relative h-full">
                {/* This absolute container perfectly matches the height of the main image. 
                  If images exceed the height, it naturally becomes a scrollable area!
                */}
                <div className="absolute inset-0 flex flex-col gap-3 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
                  {product.images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(img)}
                      // Added shrink-0 so the thumbnails don't get squished if there are lots of them
                      className={`relative w-full shrink-0 aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        activeImage === img ? 'border-[#00b8d9] opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-200'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Image View */}
              <div className="relative bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden group aspect-square">
                <button 
                  onClick={handleToggleFavorite}
                  className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full transition-all active:scale-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={isFavorite ? "#10b981" : "none"} stroke={isFavorite ? "#10b981" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21Z"/></svg>
                </button>
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
                />
              </div>

            </div>
          </div>

          {/* ==========================================
              RIGHT SIDE: DETAILS SECTION
              ========================================== */}
          <div className="flex flex-col space-y-6 w-full pt-2 lg:pl-4">
            
            <div className="max-w-[480px]">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-emerald-600 font-semibold text-sm">Net Weight: {product.weight}</p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-bold text-slate-900">₹{product.price}.00</span>
                <span className="text-lg text-slate-400 line-through font-medium">₹{product.originalPrice}.00</span>
              </div>

              {/* Counter and Cart Button */}
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-12">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-full flex items-center justify-center text-[#00b8d9] font-bold text-xl hover:bg-slate-50 transition-colors">-</button>
                    <span className="w-10 text-center font-bold text-lg">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-12 h-full flex items-center justify-center text-[#00b8d9] font-bold text-xl hover:bg-slate-50 transition-colors">+</button>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Per Pack</span>
                </div>

                <button 
                  onClick={handleAddToCart} 
                  className="w-full bg-[#00b8d9] hover:bg-[#00a2bf] text-white h-14 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Add to Cart <span className="opacity-40 font-normal">|</span> ₹{totalPrice}
                </button>
              </div>

              {/* Content Sections */}
              <div className="space-y-6 pt-6 mt-6 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Description</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00b8d9] mb-1">Storage Instructions</h4>
                  <p className="text-cyan-800 text-xs font-medium leading-relaxed">{product.storage}</p>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 leading-relaxed uppercase font-semibold tracking-tight">
                  Marketed By: <span className="font-medium lowercase capitalize">{product.marketedBy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}