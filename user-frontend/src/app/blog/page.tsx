'use client';

import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const blogs = [
    { id: 1, tag: "Health", title: "Why Fresh Seafood is Better Than Frozen", date: "Feb 20, 2026", img: "bg-cyan-100" },
    { id: 2, tag: "Recipes", title: "5 Quick Kerala Style Fish Curry Recipes", date: "Feb 15, 2026", img: "bg-emerald-100" },
    { id: 3, tag: "Farming", title: "How We Source Antibiotic-Free Chicken", date: "Feb 10, 2026", img: "bg-amber-100" },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans text-slate-800 pb-24 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-10 md:pt-16">
        
        <div className="text-xs text-slate-400 font-medium mb-8">
          <Link href="/" className="hover:text-[#00b8d9] transition-colors">Home</Link> <span className="mx-2">/</span> 
          <span className="text-slate-800">Blog</span>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Fresh & Safe <span className="text-[#00b8d9]">Blog</span></h1>
          <p className="text-slate-500 font-medium mt-2 text-lg">Recipes, health tips, and stories from our farms to your table.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-[2rem] p-4 border border-slate-100 hover:border-[#00b8d9]/30 transition-colors group cursor-pointer">
              {/* Dummy Image Placeholder */}
              <div className={`w-full h-48 rounded-2xl ${blog.img} mb-6 flex items-center justify-center text-slate-400 font-medium text-xs uppercase tracking-widest`}>
                Image Placeholder
              </div>
              <div className="px-2 pb-4">
                <span className="text-[10px] font-extrabold text-[#00b8d9] uppercase tracking-widest mb-2 block">{blog.tag}</span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#00b8d9] transition-colors">{blog.title}</h3>
                <p className="text-xs font-medium text-slate-400">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}