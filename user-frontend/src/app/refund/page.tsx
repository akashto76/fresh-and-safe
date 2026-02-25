'use client';

import React from 'react';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 pb-24 md:pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-10 md:pt-16">
        
        <div className="text-xs text-slate-400 font-medium mb-8">
          <Link href="/" className="hover:text-[#00b8d9] transition-colors">Home</Link> <span className="mx-2">/</span> 
          <span className="text-slate-800">Refund Policy</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Refund & Return Policy</h1>
        <p className="text-sm text-slate-500 font-medium mb-10 pb-6 border-b border-slate-100">Because freshness matters.</p>

        <div className="space-y-8 text-slate-600 leading-relaxed text-[15px]">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-2">Our Freshness Guarantee</h3>
            <p className="text-sm text-emerald-800/80">If you are not 100% satisfied with the quality or freshness of your delivery, you can return it at the doorstep, no questions asked.</p>
          </div>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Doorstep Returns</h2>
            <p>Due to the perishable nature of our products, returns are only accepted at the time of delivery. Please inspect your order when our delivery executive arrives. If you are unsatisfied, return it immediately to the executive.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Refund Process</h2>
            <p>If you prepaid for your order and choose to return it at the doorstep, a full refund for the returned items will be initiated within 24 hours. The amount will reflect in your original payment method within 3-5 business days.</p>
          </section>
        </div>

      </div>
    </main>
  );
}