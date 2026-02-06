// src/components/navigation/DesktopNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, MapPin, ChevronDown } from "lucide-react";

export default function DesktopNavbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("Select Location");

  return (
    <>
      {/* 1. TOP MARQUEE BAR */}
      <div className="hidden md:flex bg-[#00b8d9] text-slate-800 text-[10px] uppercase tracking-[0.2em] py-2 px-8 justify-between items-center font-bold">
        <div className="flex gap-6 min-w-max z-10 bg-[#00b8d9] pr-4">
          <span>Call: 1800-SAFE-FRESH</span>
        </div>
        
        {/* Marquee Animation */}
        <div className="flex-1 overflow-hidden relative mx-6 mask-linear-fade">
           {/* Note: You need to add 'animate-marquee' in your globals.css */}
          <div className="flex gap-20 whitespace-nowrap animate-marquee"> 
            <span className="text-white normal-case tracking-wide text-xs font-bold">
              Grab 20% Flat OFF on your first order! 🎉 Use Coupon FIRST20
            </span>
             <span className="text-white normal-case tracking-wide text-xs font-bold">
              Free delivery on orders above ₹499! 🚛
            </span>
          </div>
        </div>

        <div className="flex gap-6 min-w-max z-10 bg-[#00b8d9] pl-4">
          <Link href="/partner" className="hover:text-white transition">Partner With Us</Link>
          <Link href="/track" className="hover:text-white transition">Track Order</Link>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="hidden md:flex bg-white/95 backdrop-blur-md sticky top-0 z-40 px-8 py-4 border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto flex items-center gap-8 w-full">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-tighter flex items-center gap-2 min-w-max">
            <div className="w-9 h-9 bg-[#00b8d9] rounded-xl flex items-center justify-center text-white text-sm shadow-lg shadow-cyan-200">
              💠
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-slate-800 text-xl">FRESH</span>
              <span className="text-emerald-500 text-[10px] tracking-[0.3em]">SAFE</span>
            </div>
          </Link>

          {/* Location Trigger */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 hover:opacity-70 transition-opacity group text-left"
          >
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
              <MapPin size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1 leading-tight">
                {location} <ChevronDown size={12} className="text-slate-400"/>
              </span>
              <span className="text-[11px] font-bold text-slate-400">Check availability</span>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search for fresh fish, meat..." 
              className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-3 px-12 text-sm outline-none focus:bg-white focus:border-[#00b8d9]/30 transition-all"
            />
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 min-w-max">
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#00b8d9] transition-all">
              <User size={24} />
            </button>
            <Link href="/cart" className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center relative shadow-lg shadow-slate-200">
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. CATEGORY PILLS */}
      <div className="hidden md:block border-b border-[#eeeadd] px-8 py-3 bg-white">
        <nav className="max-w-7xl mx-auto flex justify-between gap-2">
            {['Fish & Seafood', 'Poultry', 'Mutton & Lamb', 'Ready to Cook', 'Eggs & Dairy', 'Festive Boxes'].map((cat) => (
                <Link key={cat} href={`/category/${cat}`} className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:bg-[#00b8d9] hover:text-white hover:-translate-y-0.5 transition-all duration-300">
                    {cat}
                </Link>
            ))}
        </nav>
      </div>

      {/* 4. LOCATION MODAL (React Port) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-[400px] p-8 rounded-[2rem] shadow-2xl relative flex flex-col items-center">
                <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-slate-300 hover:text-black transition">✕</button>
                <div className="w-16 h-16 bg-[#00b8d9] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-cyan-200 mb-5">💠</div>
                <h3 className="text-xl font-extrabold text-slate-800 mb-1">Choose delivery location</h3>
                <p className="text-slate-400 text-xs mb-8 text-center">Enter your pincode to check availability.</p>
                <input type="text" placeholder="Enter pincode..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-semibold text-center outline-none focus:border-[#00b8d9] mb-5"/>
                <button onClick={() => { setLocation('Jayanagar, BLR'); setIsModalOpen(false); }} className="w-full flex items-center justify-center gap-2 p-3 text-[#00b8d9] font-bold text-sm hover:bg-cyan-50 rounded-xl transition-colors">
                    <MapPin size={16} /> Use current location
                </button>
            </div>
        </div>
      )}
    </>
  );
}