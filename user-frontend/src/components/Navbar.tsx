// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { Home, Search, ShoppingBag, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Define your navigation items here for easy management
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Search },
    { name: "Cart", href: "/cart", icon: ShoppingBag },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      {/* ==============================
          DESKTOP NAVBAR (Top) 
          Hidden on mobile (md:hidden), Flex on Desktop (md:flex)
      ============================== */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-white border-b border-gray-200 px-6 py-4 justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          Fresh&Safe
        </Link>

        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 font-medium transition-colors ${
                pathname === item.href ? "text-green-600" : "text-gray-600 hover:text-green-600"
              }`}
            >
              {/* We only show text on desktop usually */}
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Desktop specific action button example */}
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Sign In
        </button>
      </header>

      {/* ==============================
          MOBILE NAVBAR (Bottom) 
          Flex on mobile, Hidden on Desktop (md:hidden)
      ============================== */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white border-t border-gray-200 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full ${
                  isActive ? "text-green-600" : "text-gray-500"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}