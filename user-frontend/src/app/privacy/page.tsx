'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 pb-24 md:pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-10 md:pt-16">
        
        <div className="text-xs text-slate-400 font-medium mb-8">
          <Link href="/" className="hover:text-[#00b8d9] transition-colors">Home</Link> <span className="mx-2">/</span> 
          <span className="text-slate-800">Privacy Policy</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 font-medium mb-10 pb-6 border-b border-slate-100">Last updated: February 25, 2026</p>

        <div className="space-y-8 text-slate-600 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>We collect personal information that you provide to us directly, such as your name, delivery address, email address, and phone number when you register an account or place an order.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. How We Use Your Data</h2>
            <p>Your information is used strictly to process orders, deliver products, and send order updates (via SMS/Email). We do not sell or share your personal data with third-party marketing agencies.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Payment Security</h2>
            <p>All payment transactions are processed through secure, encrypted payment gateways. We do not store your credit card or UPI PIN details on our servers.</p>
          </section>
        </div>

      </div>
    </main>
  );
}