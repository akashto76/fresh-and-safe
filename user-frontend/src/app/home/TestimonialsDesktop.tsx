// src/components/TestimonialsDesktop.tsx
'use client';

import React, { useState, useEffect } from 'react';

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
    quote: "I was skeptical about ordering fish online, but the freshness blew me away.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Anjali Menon",
    location: "Kozhikode",
    quote: "The combo packs are a lifesaver for our weekend family get-togethers.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Bangalore",
    quote: "Never tasted mutton this tender before. The quality is consistently amazing.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];

export default function TestimonialsDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3;
  // Standard carousel logic: Loop back to 0 when we reach the end
  const maxIndex = testimonials.length - visibleItems;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000); // Slide every 4 seconds

    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            What our <span className="text-[#00b8d9]">customers</span> say
          </h2>
          <p className="text-slate-500 mt-3 text-lg">Hear it directly from people like you</p>
        </div>

        {/* SLIDER WINDOW */}
        <div className="relative overflow-hidden">
          
          {/* SLIDER TRACK */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {testimonials.map((item) => (
              <div 
                key={item.id} 
                // CONTAINER WIDTH:
                // min-w-[33.333%] forces 3 items per row, just like 'grid-cols-3'
                // px-4 creates the gap between cards
                className="min-w-[33.333%] px-4"
              >
                {/* EXACT CARD DESIGN 
                   I have pasted your exact card code here inside the wrapper.
                   Added 'h-full' to ensure equal height in flex row.
                */}
                <div className="h-full bg-cyan-50/50 border border-cyan-100 rounded-[2rem] p-8 relative flex flex-col justify-between overflow-hidden group">
                  
                  {/* DRAWING BORDER ANIMATION */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <rect 
                      x="1" y="1" 
                      width="99.5%" 
                      height="99.5%" 
                      rx="30" ry="30" 
                      fill="none" 
                      stroke="#00b8d9" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      className="[stroke-dasharray:2000] [stroke-dashoffset:2000] group-hover:[stroke-dashoffset:0] transition-all duration-[1.5s] ease-in-out"
                    />
                  </svg>

                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b8d9]/5 rounded-bl-full rounded-tr-[2rem] -z-0"></div>

                  {/* Quote Section */}
                  <div className="relative z-10 mb-8">
                    <span className="text-5xl text-[#00b8d9]/20 font-serif absolute -top-6 -left-2 group-hover:text-[#00b8d9]/40 transition-colors">“</span>
                    <p className="text-base font-bold text-slate-700 leading-relaxed italic relative">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Bottom Section: Name & Image */}
                  <div className="flex items-end justify-between mt-auto relative z-10">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                      <div className="h-0.5 w-8 bg-[#00b8d9] my-1.5"></div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {item.location}
                      </p>
                    </div>
                    
                    {/* User Image */}
                    <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-white group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-[#00b8d9]' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}