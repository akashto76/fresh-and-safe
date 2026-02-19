'use client';

import React, { useState } from 'react';

// --- MOCK DATA ---
const FAQ_DATA = [
  {
    id: 1,
    category: "Delivery",
    question: "How long does delivery take?",
    answer: "We offer next-morning delivery for all orders placed before 9 PM. Fresh seafood and meat will reach your doorstep between 7 AM and 10 AM to ensure maximum freshness."
  },
  {
    id: 2,
    category: "Products",
    question: "Is your fish fresh or frozen?",
    answer: "Our fish is 100% fresh, never frozen. We source directly from local fishermen daily, clean it precisely, and deliver it to you in temperature-controlled packaging."
  },
  {
    id: 3,
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) for select locations."
  },
  {
    id: 4,
    category: "Delivery",
    question: "Is there a minimum order value for free delivery?",
    answer: "Yes, we offer free delivery on all orders above ₹499. For orders below this amount, a nominal delivery fee of ₹49 will be applied at checkout."
  },
  {
    id: 5,
    category: "Returns",
    question: "What is your return/refund policy?",
    answer: "Quality is our top priority. If you are not satisfied with the freshness or quality of the product at the time of delivery, you can return it immediately to our delivery executive for a full refund."
  }
];

const CATEGORIES = ["All", ...Array.from(new Set(FAQ_DATA.map(item => item.category)))];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const filteredFaqs = activeCategory === "All" 
    ? FAQ_DATA 
    : FAQ_DATA.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 pb-24">
      
      {/* --- MINIMAL HERO SECTION --- */}
      <div className="pt-20 pb-12 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b8d9] to-emerald-400">Questions</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium">
          Everything you need to know about our products, delivery, and billing.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        
        {/* --- CLEAN CATEGORY PILLS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenFaqId(null);
                }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#00b8d9]/10 text-[#00b8d9]' // Soft blue background for active tab
                    : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* --- STANDARD MINIMAL ACCORDION --- */}
        <div className="border-t border-slate-200">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div key={faq.id} className="border-b border-slate-200">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className={`text-lg font-semibold transition-colors pr-8 ${
                      isOpen ? 'text-[#00b8d9]' : 'text-slate-900 group-hover:text-[#00b8d9]'
                    }`}>
                      {faq.question}
                    </span>
                    
                    {/* Clean Plus/Minus Icon using Emerald Green for active state */}
                    <div className={`flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'text-emerald-500 rotate-180' : 'text-slate-400 group-hover:text-[#00b8d9]'
                    }`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2.5} 
                        stroke="currentColor" 
                        className="w-5 h-5"
                      >
                        {isOpen ? (
                          // Minus icon when open
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        ) : (
                          // Plus icon when closed
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        )}
                      </svg>
                    </div>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-slate-500 leading-relaxed font-medium pr-8 md:pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-400 font-medium">No questions found for this category.</p>
            </div>
          )}
        </div>

        {/* --- MINIMAL CONTACT BANNER --- */}
        

      </div>
    </main>
  );
}