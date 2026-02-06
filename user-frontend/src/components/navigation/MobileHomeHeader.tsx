// src/components/navigation/MobileHomeHeader.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Bell, X, Search, Navigation } from "lucide-react";

export default function MobileHomeHeader() {
  const pathname = usePathname();
  const [showOffers, setShowOffers] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Disable scroll when modal is open
  useEffect(() => {
    if (isLocationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isLocationOpen]);

  if (pathname !== "/") return null;

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        
        {/* 1. TOP ROW */}
        <div className="px-4 py-3 flex items-center justify-between bg-white relative z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00b8d9] rounded-lg flex items-center justify-center text-white text-xs shadow-lg shadow-cyan-100">
              💠
            </div>
            <button 
              onClick={() => setIsLocationOpen(true)}
              className="flex flex-col items-start active:opacity-70 transition-opacity"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Delivering to
              </span>
              <div className="flex items-center gap-1 text-slate-800">
                <span className="text-sm font-extrabold truncate max-w-[140px]">
                  Jayanagar, Bangalore
                </span>
                <ChevronDown size={14} className="text-[#00b8d9]" strokeWidth={3} />
              </div>
            </button>
          </div>

          <button 
            onClick={() => setShowOffers(!showOffers)}
            className={`
              relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95
              ${showOffers ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}
            `}
          >
            {showOffers ? <X size={18} /> : <Bell size={18} />}
            {!showOffers && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white animate-pulse"></span>
            )}
          </button>
        </div>

        {/* 2. OFFERS MARQUEE */}
        <div 
          className={`
            overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${showOffers ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="bg-[#00b8d9] h-10 flex items-center relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#00b8d9] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#00b8d9] to-transparent z-10"></div>
            <div className="whitespace-nowrap flex gap-12 animate-marquee items-center pl-4">
              <span className="text-white text-xs font-bold tracking-wide flex items-center gap-2">
                🎉 Grab <span className="bg-white text-[#00b8d9] px-1 rounded">20% OFF</span> on your first order! Use: FIRST20
              </span>
              <span className="text-white text-xs font-bold tracking-wide flex items-center gap-2">
                🚛 Free Delivery on orders above ₹499
              </span>
               <span className="text-white text-xs font-bold tracking-wide flex items-center gap-2">
                🎉 Grab <span className="bg-white text-[#00b8d9] px-1 rounded">20% OFF</span> on your first order! Use: FIRST20
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ==============================
          3. LOCATION BOTTOM SHEET (FIXED)
      ============================== */}
      
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300
          ${isLocationOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setIsLocationOpen(false)}
      />

      {/* The Sheet */}
      <div 
        className={`
          fixed bottom-0 left-0 right-0 bg-white z-[70] rounded-t-[2rem] p-6 pb-10 shadow-2xl
          transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isLocationOpen ? "translate-y-0" : "translate-y-[150%]"} 
        `}
      >
        {/* ^ FIX HERE: Changed 'translate-y-full' to 'translate-y-[150%]'
           This ensures the floating button (which is -top-14) is pushed DEEP 
           below the screen so it doesn't peek out.
        */}

        {/* Floating Close Button */}
        <button 
          onClick={() => setIsLocationOpen(false)}
          className="absolute -top-14 left-1/2 -translate-x-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-extrabold text-slate-800">Search Your Location</h3>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search Delivery location" 
              className="w-full bg-slate-100 border border-transparent rounded-xl py-4 pl-4 pr-10 text-sm font-semibold outline-none focus:bg-white focus:border-[#00b8d9] transition-all"
            />
            <Search className="absolute right-4 top-4 text-slate-400" size={18} />
          </div>

          <button className="w-full bg-slate-900 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all">
            <Navigation size={18} className="fill-current" />
            Use Current Location
          </button>
        </div>
      </div>
    </>
  );
}