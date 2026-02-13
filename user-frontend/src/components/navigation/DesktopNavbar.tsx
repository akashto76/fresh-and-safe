// src/components/navigation/DesktopNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, MapPin, ChevronDown, Smartphone } from "lucide-react";

export default function DesktopNavbar() {
  // Existing Location State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("Select Location");

  // Login Modal & Logic States
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const MarqueeContent = () => (
    <div className="flex gap-20 whitespace-nowrap pr-20 text-white normal-case tracking-wide text-xs font-semibold">
      <span>
        Grab 20% Flat OFF on your first order! 🎉 Use Coupon FIRST20
      </span>
      <span>
        Free delivery on orders above ₹499! 🚛
      </span>
    </div>
  );

  // Helper to reset login state when closing
  const closeLoginModal = () => {
    setIsLoginOpen(false);
    setTimeout(() => {
      setLoginStep('PHONE');
      setPhoneNumber("");
      setOtp("");
      setError("");
    }, 300);
  };

  const handleGetOtp = () => {
    // Simple validation: Check if length is 10 digits
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit number");
      return;
    }
    setError("");
    setLoginStep('OTP');
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }
    // Simulate Login Success
    alert(`Logged in successfully with ${phoneNumber}!`);
    closeLoginModal();
  };

  return (
    <>
      {/* 1. TOP MARQUEE BAR */}
      <div className="hidden md:flex bg-[#00b8d9] text-slate-800 text-[10px] uppercase tracking-[0.2em] py-2 px-8 justify-between items-center font-bold">
        <div className="flex gap-6 min-w-max z-10 bg-[#00b8d9] pr-4">
          <span>Call: 1800-SAFE-FRESH</span>
        </div>
        
        <div className="flex-1 overflow-hidden relative mx-6 mask-linear-fade">
          <div className="flex w-max animate-marquee"> 
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>

        <div className="flex gap-6 min-w-max z-10 bg-[#00b8d9] pl-4">
          <Link href="/partner" className="hover:text-white transition">Partner With Us</Link>
          <Link href="/track" className="hover:text-white transition">Track Order</Link>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="hidden md:flex bg-white/95 backdrop-blur-md sticky top-0 z-40 px-8 h-[84px] border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto flex items-center gap-8 w-full h-full">
          
          <Link href="/" className="relative flex items-center w-[90px] h-full hover:opacity-90 transition-opacity">
            <Image 
              src="/FRESH & SAFE LOGO.png" 
              alt="Fresh & Safe" 
              width={180} 
              height={80}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[75px] max-w-none h-auto object-contain" 
              priority
            />
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
              <span className="text-[11px] font-medium text-slate-400">Check availability</span>
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
            {/* User Profile Button with Login Trigger */}
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#00b8d9] transition-all"
            >
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
        <nav className="max-w-6xl mx-auto flex justify-between w-full">
            {['Fish & Seafood', 'Poultry', 'Mutton & Lamb', 'Ready to Cook', 'Eggs & Dairy'].map((cat) => (
                <Link key={cat} href={`/category/${cat}`} className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:bg-[#00b8d9] hover:text-white hover:-translate-y-0.5 transition-all duration-300">
                    {cat}
                </Link>
            ))}
        </nav>
      </div>

      {/* 4. LOCATION MODAL */}
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

      {/* 5. LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-[400px] p-8 rounded-[2rem] shadow-2xl relative flex flex-col items-center">
                <button onClick={closeLoginModal} className="absolute right-6 top-6 text-slate-300 hover:text-black transition">✕</button>
                
                {/* Icon Wrapper */}
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200 mb-5">
                  <Smartphone size={28} />
                </div>
                
                {/* --- VIEW 1: ENTER PHONE NUMBER --- */}
                {loginStep === 'PHONE' && (
                  <>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-1">Login or Signup</h3>
                    <p className="text-slate-400 text-xs mb-8 text-center">Enter your phone number to continue.</p>
                    
                    <div className="w-full flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mb-2 focus-within:border-[#00b8d9] focus-within:ring-1 focus-within:ring-[#00b8d9]/20 transition-all">
                      <span className="pl-4 text-slate-500 font-bold text-sm border-r border-slate-200 pr-3 py-3.5">+91</span>
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhoneNumber(val);
                          setError("");
                        }}
                        placeholder="Mobile Number" 
                        className="flex-1 bg-transparent py-3.5 px-4 text-sm font-bold text-slate-800 outline-none placeholder:font-medium placeholder:text-slate-400"
                      />
                    </div>
                    
                    {/* Error Message */}
                    <div className="w-full h-5 mb-3 text-left">
                        {error && <span className="text-[10px] text-rose-500 font-bold ml-1">{error}</span>}
                    </div>

                    <button 
                      onClick={handleGetOtp}
                      className="w-full bg-[#00b8d9] text-white font-bold py-3.5 rounded-xl hover:bg-[#00a2bf] active:scale-[0.98] transition-all"
                    >
                        Get OTP
                    </button>
                  </>
                )}

                {/* --- VIEW 2: ENTER OTP --- */}
                {loginStep === 'OTP' && (
                  <>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-1">Verify OTP</h3>
                    <p className="text-slate-400 text-xs mb-8 text-center">
                      Enter the code sent to <span className="font-bold text-slate-800">+91 {phoneNumber}</span>
                    </p>
                    
                    <div className="w-full flex flex-col items-center mb-5">
                      <input 
                        type="text" 
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                          setError("");
                        }}
                        placeholder="• • • •" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-center text-lg font-bold text-slate-800 outline-none focus:border-[#00b8d9] focus:ring-1 focus:ring-[#00b8d9]/20 transition-all tracking-[0.5em]"
                      />
                      {/* Error Message */}
                      <div className="w-full h-5 mt-1 text-center">
                          {error && <span className="text-[10px] text-rose-500 font-bold">{error}</span>}
                      </div>
                    </div>

                    <button 
                      onClick={handleVerifyOtp}
                      className="w-full bg-[#00b8d9] text-white font-bold py-3.5 rounded-xl hover:bg-[#00a2bf] active:scale-[0.98] transition-all mb-4"
                    >
                        Verify & Login
                    </button>

                    <button 
                      onClick={() => { setLoginStep('PHONE'); setError(""); setOtp(""); }} 
                      className="text-xs font-bold text-slate-400 hover:text-[#00b8d9] transition-colors"
                    >
                      Change Phone Number
                    </button>
                  </>
                )}

                <p className="text-[10px] text-slate-400 mt-6 text-center leading-relaxed">
                  By continuing, you agree to our <a href="#" className="underline hover:text-slate-600">Terms</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
                </p>
            </div>
        </div>
      )}
    </>
  );
}