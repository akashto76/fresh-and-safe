'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 pb-24 md:pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-10 md:pt-16">
        
        <div className="text-xs text-slate-400 font-medium mb-8">
          <Link href="/" className="hover:text-[#00b8d9] transition-colors">Home</Link> <span className="mx-2">/</span> 
          <span className="text-slate-800">Terms & Conditions</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Terms & Conditions</h1>
        <p className="text-sm text-slate-500 font-medium mb-10 pb-6 border-b border-slate-100">Last updated: February 25, 2026</p>

        <div className="space-y-8 text-slate-600 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p>Welcome to Fresh & Safe. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before making any purchases.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Product Quality & Pricing</h2>
            <p>We strive to deliver the freshest seafood and meats. Prices are subject to change based on daily market rates without prior notice. The weight of seafood is measured before cleaning and cutting.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Delivery Policy</h2>
            <p>We aim to deliver within the promised time slots. However, delivery times may be affected by weather conditions, traffic, or other unforeseen circumstances. Delivery is currently restricted to specific pin codes in Kerala.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Cancellations</h2>
            <p>Orders can only be cancelled within 15 minutes of placement. Once the order is processed or out for delivery, cancellations are not permitted due to the perishable nature of our products.</p>
          </section>
        </div>

      </div>
    </main>
  );
}