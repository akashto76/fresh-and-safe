// src/components/BannerSliderMobile.tsx
'use client';

import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg" },
  { id: 2, image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg" },
  { id: 3, image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg" },
  { id: 4, image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg" }
];

export default function BannerSliderMobile() {
  const [current, setCurrent] = useState(0);

  // Auto-slide functionality (same logic as desktop for consistency)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // Faster slide change for mobile (4s)

    return () => clearInterval(timer);
  }, []);

  return (
    // Fixed height h-[200px] matching your request
    <div className="relative w-full h-[200px] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm">
      
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt="Mobile Banner"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Minimal Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index 
                ? 'w-6 bg-white' 
                : 'w-1.5 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}