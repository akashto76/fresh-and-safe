// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google"; // Added Plus Jakarta if you want that fresh look
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Using Plus Jakarta Sans matches the modern grocery vibe you showed in the HTML
const font = Plus_Jakarta_Sans({ subsets: ["latin"] });
// OR keep using Inter if you prefer: const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh & Safe",
  description: "Groceries delivered fresh and safely to your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-slate-50 text-slate-900`}>
        {/* The Traffic Controller Navbar (Desktop + Mobile) */}
        <Navbar />
        
        {/* MAIN WRAPPER:
           - No top padding (pt-0) because DesktopNavbar stacks naturally.
           - pb-24 ensures mobile content isn't hidden behind the bottom bar.
           - md:pb-0 removes that bottom padding on desktop.
        */}
        <main className="min-h-screen pb-24 md:pb-0">
          {children}
        </main>

        <div className="hidden md:block">
          <Footer />
        </div>
      </body>
    </html>
  );
}