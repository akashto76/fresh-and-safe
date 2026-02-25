'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const inputStyle = "w-full py-3.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-[#00b8d9] transition-colors";
  const labelStyle = "block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider";

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans text-slate-800 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-10 md:pt-16">
        
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400 font-medium mb-12">
          <Link href="/" className="hover:text-[#00b8d9] transition-colors">Home</Link> <span className="mx-2">/</span> 
          <span className="text-slate-800">Contact Us</span>
        </div>

        {/* Page Header (Centered for better Desktop flow) */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Get in <span className="text-[#00b8d9]">touch</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Our friendly team would love to hear from you. Reach out for any queries, support, or just to say hello!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Contact Information */}
          <div className="lg:col-span-1 space-y-10">
            
            {/* Phone Card */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-[#e0f7fa] text-[#00b8d9] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.074-6.97l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 uppercase tracking-widest">Call Us</h3>
                <p className="text-slate-900 font-bold text-lg">1800-313-3302</p>
                <p className="text-sm text-slate-500 mt-1 font-medium">Mon-Sun, 7 AM to 10 PM</p>
              </div>
            </div>
            
            {/* Email Card */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 uppercase tracking-widest">Email Us</h3>
                <p className="text-slate-900 font-bold text-base hover:text-[#00b8d9] transition-colors cursor-pointer">
                  customercare@freshtohome.com
                </p>
                <p className="text-sm text-slate-500 mt-1 font-medium">We usually reply within 24 hours.</p>
              </div>
            </div>

            {/* Office Card */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-widest">Head Office</h3>
                <p className="text-slate-600 font-medium leading-relaxed text-sm">
                  Freshtohome Foods Private Limited<br/>
                  No. 1, 2nd Floor, Carlton Towers<br/>
                  Old Airport Road, Bangalore – 560008
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
              <div>
                <label className={labelStyle}>First Name</label>
                <input type="text" className={inputStyle} placeholder="John" />
              </div>
              <div>
                <label className={labelStyle}>Last Name</label>
                <input type="text" className={inputStyle} placeholder="Doe" />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Email Address</label>
                <input type="email" className={inputStyle} placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Phone Number</label>
                <input type="tel" className={inputStyle} placeholder="+91" />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Message</label>
                <textarea rows={5} className={`${inputStyle} resize-none`} placeholder="How can we help you?"></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="button" className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-12 py-4 rounded-xl text-sm font-bold transition-colors shadow-md">
                  Send Message
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </main>
  );
}