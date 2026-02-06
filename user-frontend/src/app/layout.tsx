// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or your font
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh & Safe",
  description: "Groceries delivered fresh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        
        {/* Main Content Wrapper with Padding for fixed navs */}
        <main className="min-h-screen pt-20 md:pt-24 pb-20 md:pb-0 px-4 max-w-7xl mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}