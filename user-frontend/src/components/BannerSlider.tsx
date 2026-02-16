'use client';

import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg", 
  },
  {
    id: 2,
    image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg", 
  },
  {
    id: 3,
    image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg", 
  },
  {
    id: 4,
    image: "/WhatsApp Image 2026-02-05 at 18.34.52.jpeg", 
  }
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[200px] md:h-[400px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group bg-slate-100">
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image Only */}
          <img
            src={slide.image}
            alt="Banner slide"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 shadow-sm border border-white/20 ${
              current === index 
                ? 'w-8 bg-[#00b8d9]' 
                : 'w-2 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}