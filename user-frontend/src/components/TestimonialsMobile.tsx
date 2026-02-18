// src/components/TestimonialsMobile.tsx
'use client';

import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Dipanjana Nandi",
    location: "Kottayam",
    quote: "Fresh & Safe chicken is my son's favourite - it's juicy, clean, and antibiotic-free.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Shalini Bardhan",
    location: "Kochi",
    quote: "Cooking is so easy now! The pre-cut meats are perfectly cleaned and ready to use.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Rahul Varma",
    location: "Trivandrum",
    quote: "I was skeptical about ordering fish online, but the freshness blew me away. Highly recommended!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  }
];

export default function TestimonialsMobile() {
  return (
    <section>
      {/* Header */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
          What our <span className="text-[#00b8d9]">customers</span> say
        </h2>
        <p className="text-xs text-slate-500 mt-1">Hear it directly from people like you</p>
      </div>

      {/* Horizontal Scroll Container */}
      {/* [scrollbar-width:none] hides scrollbar in Firefox, [&::-webkit-scrollbar]:hidden in Chrome */}
      <div className="flex overflow-x-auto gap-4 px-4 pb-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {testimonials.map((item) => (
          <div 
            key={item.id} 
            className="min-w-[280px] max-w-[280px] snap-center bg-cyan-50/50 border border-cyan-100 rounded-[1.5rem] p-6 relative flex flex-col justify-between"
          >
            {/* Background Decoration (Subtle Pattern) */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00b8d9]/5 rounded-bl-full rounded-tr-[1.5rem] -z-0"></div>

            {/* Quote Section */}
            <div className="relative z-10">
              <span className="text-4xl text-[#00b8d9]/20 font-serif absolute -top-4 -left-2">“</span>
              <p className="text-sm font-bold text-slate-700 leading-relaxed italic relative">
                "{item.quote}"
              </p>
            </div>

            {/* Bottom Section: Name & Image */}
            <div className="flex items-end justify-between mt-6 relative z-10">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                <div className="h-0.5 w-6 bg-[#00b8d9] my-1"></div>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
                  {item.location}
                </p>
              </div>
              
              {/* User Image - Styled like a 'cutout' or sleek avatar */}
              <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}