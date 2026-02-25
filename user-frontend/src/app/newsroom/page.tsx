'use client';

import React from 'react';
import Link from 'next/link';

export default function NewsroomPage() {
  const news = [
    { id: 1, title: "Fresh & Safe Expands Delivery to 5 New Districts in Kerala", date: "Feb 22, 2026" },
    { id: 2, title: "Introducing Our New 100% Biodegradable Packaging", date: "Jan 18, 2026" },
    { id: 3, title: "Fresh & Safe Partners with Local Fishermen's Cooperative", date: "Dec 05, 2025" },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 pb-24 md:pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8 pt-10 md:pt-16">
        
        <div className="text-xs text-slate-400 font-medium mb-8">
          <Link href="/" className="hover:text-[#00b8d9] transition-colors">Home</Link> <span className="mx-2">/</span> 
          <span className="text-slate-800">Newsroom</span>
        </div>

        <div className="mb-12 border-b border-slate-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Newsroom</h1>
          <p className="text-slate-500 font-medium mt-2 text-lg">Official updates, press releases, and announcements.</p>
        </div>

        <div className="space-y-6">
          {news.map((item) => (
            <div key={item.id} className="group border border-slate-100 rounded-2xl p-6 md:p-8 hover:border-[#00b8d9] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#00b8d9] uppercase tracking-widest mb-2">{item.date}</p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00b8d9] transition-colors">{item.title}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#00b8d9] group-hover:text-white transition-all shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}