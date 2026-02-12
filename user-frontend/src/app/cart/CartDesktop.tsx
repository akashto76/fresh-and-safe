'use client';

import React, { useState } from 'react';
import { CartItem, Address } from './page';

interface Props {
  items: CartItem[];
  selectedAddress?: Address;
  onUpdateQty: (id: number, change: number) => void;
  onOpenModal: () => void;
  onCheckout: () => void;
  totals: { subtotal: number; tax: number; total: number };
}

const CartDesktop: React.FC<Props> = ({ items, selectedAddress, onUpdateQty, onOpenModal, onCheckout, totals }) => {
  
  // --- Local State for Validation Popup ---
  const [showToast, setShowToast] = useState(false);

  // --- Handler to intercept checkout click ---
  const handleCheckoutClick = () => {
    if (!selectedAddress) {
      // 1. Show Toast if no address selected
      setShowToast(true);
      
      // 2. Hide after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      // 3. Proceed if address exists
      onCheckout();
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-8 py-10 relative">
      
      {/* --- VALIDATION TOAST POPUP (Dark Glassmorphism) --- */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] transition-all duration-500 ease-out ${
          showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
          <div className="bg-rose-500 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               <line x1="12" y1="5" x2="12" y2="19"></line>
               <line x1="12" y1="19" x2="12.01" y2="19"></line>
            </svg>
          </div>
          <span className="text-sm font-medium text-white whitespace-nowrap">Please select a delivery address first</span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#00b8d9] mb-2 inline-block">← Continue Shopping</a>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Shopping <span className="text-[#00b8d9]">Cart</span> 
          <span className="text-slate-400 font-medium text-lg ml-2">({items.length} Items)</span>
        </h1>
      </div>

      <div className="flex flex-row gap-12">
        {/* Left Side: Cart Items */}
        <div className="flex-1 flex flex-col gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex flex-row gap-6 relative group transition-all hover:border-slate-200">
              
              {/* Delete Button */}
              <button className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition p-2 hover:bg-rose-50 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              
              {/* Product Image */}
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {item.isFresh && (
                  <div className="absolute bottom-1 left-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-700 shadow-sm border border-slate-100">
                    ❄️ Fresh
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                    <span className="bg-[#00b8d9]/10 text-[#00b8d9] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">{item.variant}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-1">{item.weight}</p>
                </div>
                
                {/* Qty & Price */}
                <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 border border-slate-200">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition font-bold text-lg">-</button>
                    <span className="w-8 text-center font-bold text-slate-800 text-sm">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm text-[#00b8d9] hover:bg-[#00b8d9] hover:text-white transition font-bold text-lg">+</button>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-bold block">Price per pack</span>
                    <span className="text-lg font-extrabold text-slate-800">₹{item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Summary & Checkout */}
        <div className="w-[380px] flex-shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 sticky top-28 border border-slate-100">
            
            {/* Address Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivery Address</h3>
                {selectedAddress && <button onClick={onOpenModal} className="text-[10px] font-bold text-[#00b8d9] hover:text-[#009bb3] uppercase tracking-wide">Change</button>}
              </div>

              {!selectedAddress ? (
                <button onClick={onOpenModal} className="w-full py-3 px-4 border-2 border-dashed border-[#00b8d9] text-[#00b8d9] bg-[#00b8d9]/5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00b8d9]/10 transition-colors">
                  <span className="text-lg">+</span> Select or Add Address
                </button>
              ) : (
                <div onClick={onOpenModal} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-[#00b8d9] transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{selectedAddress.name}</h4>
                          <span className="text-[9px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">{selectedAddress.type}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{selectedAddress.text}</p>
                    </div>
                  </div>
                  <div className="text-[#00b8d9]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </div>
              )}
            </div>

            <h2 className="text-lg font-extrabold text-slate-800 mb-6">Order Summary</h2>
            
            {/* Coupon Input */}
            <div className="flex gap-2 mb-6">
                <input type="text" placeholder="Coupon Code" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#00b8d9] transition" />
                <button className="font-bold text-sm text-[#00b8d9] hover:bg-[#00b8d9]/10 px-4 rounded-xl transition">Apply</button>
            </div>
            <hr className="border-slate-100 mb-6" />

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-slate-500 font-medium"><span>Subtotal</span><span className="text-slate-800 font-bold">₹{totals.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>Delivery</span>
                {/* Matching green color for Free */}
                <span className="text-emerald-500 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 font-medium"><span>Taxes</span><span className="text-slate-800 font-bold">₹{totals.tax.toFixed(2)}</span></div>
            </div>
            
            <div className="flex justify-between items-center mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-slate-600 font-bold">Total</span>
               <span className="text-2xl font-extrabold text-slate-900">₹{totals.total.toFixed(2)}</span>
            </div>

            {/* Checkout Button with Conditional Styling */}
            <button 
              onClick={handleCheckoutClick}
              className={`w-full font-bold text-lg py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group ${
                selectedAddress 
                  ? 'bg-[#00b8d9] text-white shadow-lg shadow-[#00b8d9]/20 hover:-translate-y-1' 
                  : 'bg-slate-300 text-white cursor-pointer hover:bg-slate-400'
              }`}
            >
               Checkout Securely
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>

            {/* Payment Icons with Grayscale-to-Color Hover Effect */}
            <div className="mt-6 flex justify-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                <div className="h-8 w-12 flex items-center justify-center bg-slate-50 rounded border border-slate-100 p-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-full w-auto object-contain" alt="UPI" />
                </div>
                <div className="h-8 w-12 flex items-center justify-center bg-slate-50 rounded border border-slate-100 p-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 w-auto object-contain" alt="Visa" />
                </div>
                <div className="h-8 w-12 flex items-center justify-center bg-slate-50 rounded border border-slate-100 p-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 w-auto object-contain" alt="Mastercard" />
                </div>
                <div className="h-8 w-12 flex items-center justify-center bg-slate-50 rounded border border-slate-100 p-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png" className="h-4 w-auto object-contain" alt="Rupay" />
                </div>
            </div>

            {/* 100% Safe Text - Now in Green */}
            <p className="text-center text-[10px] text-emerald-500 mt-4 font-bold uppercase tracking-widest">
                100% Safe & Secure
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartDesktop;