// src/components/navigation/MobileNavbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  LayoutGrid, 
  Search, 
  ShoppingBag, 
  UserCircle, 
  ChevronLeft 
} from "lucide-react";

export default function MobileNavbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Prevent background scrolling when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function
    return () => { document.body.style.overflow = "unset"; };
  }, [isSearchOpen]);

  // Dummy Data
  const categories = [
    { name: "Meevaa Foods - Veg", color: "bg-orange-100" },
    { name: "Chicken", color: "bg-red-50" },
    { name: "Sea Food", color: "bg-blue-50" },
    { name: "Mutton", color: "bg-rose-100" },
    { name: "Party Pack", color: "bg-slate-100" },
    { name: "Ready to Eat", color: "bg-amber-50" },
    { name: "Speciality Meats", color: "bg-emerald-50" },
    { name: "Cold Cuts", color: "bg-pink-50" },
    { name: "Bulk", color: "bg-gray-100" },
    { name: "Combo Packs", color: "bg-purple-50" },
    { name: "Ready to Cook", color: "bg-yellow-50" },
  ];

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Categories", href: "/categories", icon: LayoutGrid },
    { name: "Search", href: "#", icon: Search, isSpecial: true },
    { name: "Cart", href: "/cart", icon: ShoppingBag, badge: 2 },
    { name: "Account", href: "/account", icon: UserCircle },
  ];

  return (
    <>
      {/* ==============================
          1. THE NAVBAR (Fixed Bottom)
      ============================== */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white border-t border-slate-100 pb-safe">
        <div className="grid grid-cols-5 h-[4.5rem] items-end">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.isSpecial) {
              return (
                <div key={item.name} className="relative flex flex-col items-center justify-end h-full pb-2">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className={`
                      absolute -top-6 
                      flex items-center justify-center w-14 h-14 rounded-full
                      bg-[#00b8d9] text-white ring-4 ring-white 
                      active:scale-90 transition-transform duration-300 ease-out
                      shadow-lg shadow-cyan-100/50
                    `}
                  >
                    <Icon size={24} strokeWidth={2} />
                  </button>
                  <span className="text-[10px] font-semibold mt-1 text-slate-400">
                    {item.name}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center h-full w-full pb-2 group active:scale-95 transition-transform duration-200 ease-out"
              >
                <div className={`
                    relative p-2 rounded-2xl transition-all duration-300 ease-out
                    ${isActive ? "bg-emerald-500 text-white" : "text-slate-500 bg-transparent group-hover:bg-slate-50"}
                `}>
                  <Icon size={22} strokeWidth={1.8} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium mt-1 transition-colors duration-300 ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ==============================
          2. SEARCH MODAL (Full Screen Slide-Up)
          FIX: Added 'md:hidden' so it vanishes on Desktop
      ============================== */}
      <div 
        className={`
          md:hidden fixed inset-0 z-[60] bg-white transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isSearchOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* Header Section */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 bg-white pb-safe-top pt-safe-top mt-2">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-slate-500 active:bg-slate-50 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search for Chicken, Mutton, Sea Food, etc." 
              className="w-full bg-slate-100 text-slate-800 placeholder:text-slate-400 text-sm py-3 px-4 rounded-xl outline-none border border-transparent focus:border-[#00b8d9] focus:bg-white transition-all"
              autoFocus={isSearchOpen}
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 pb-24">
          <div className="mt-6 mb-4">
            <h2 className="text-lg font-bold text-slate-900">Shop By Category</h2>
            <p className="text-xs text-slate-500">Fresh meat just for you</p>
          </div>

          <div className="grid grid-cols-4 gap-x-2 gap-y-6">
            {categories.map((cat, index) => (
              <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className={`
                   w-full aspect-square rounded-2xl ${cat.color} 
                   flex items-center justify-center text-2xl shadow-sm 
                   group-active:scale-95 transition-transform duration-200
                `}>
                  <span className="opacity-20 font-black">{cat.name[0]}</span>
                </div>
                <span className="text-[10px] font-bold text-center text-slate-700 leading-tight px-1">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}