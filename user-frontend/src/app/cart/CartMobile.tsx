'use client';

import React, { useState, useRef } from 'react';
import { CartItem, Address } from './page';
import MobileNavbar from '@/components/navigation/MobileNavbar';
import Link from 'next/link';

// --- Props Interface ---
interface Props {
  items: CartItem[];
  selectedAddress?: Address;
  onUpdateQty: (id: number, change: number) => void;
  onCheckout: () => void;
  onOpenModal: () => void; // <--- Trigger parent modal
  totals: { subtotal: number; tax: number; total: number };
}

const CartMobile: React.FC<Props> = ({ 
  items, 
  selectedAddress, 
  onUpdateQty, 
  onCheckout, 
  onOpenModal, 
  totals 
}) => {
  
  // --- Local State ---
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Refs for scrolling
  const topAddressRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---

  const handleContinue = () => {
    if (!selectedAddress) {
      // 1. Scroll to address section
      topAddressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // 2. Show Error Toast with specific animation
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      // Open Local Bill Modal
      setIsBillModalOpen(true);
    }
  };

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .bottom-sheet-overlay { transition: opacity 0.3s ease; }
        .bottom-sheet-content { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .slide-up-enter { transform: translateY(0); }
        .slide-up-exit { transform: translateY(100%); }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] pb-36 font-sans text-slate-800 relative">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
                <Link href="/products" className="text-slate-900 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                </Link>
                <span className="font-semibold text-sm">Your Cart</span>
                <div className="w-10"></div>
              </div>

        {/* --- NEW TOAST POPUP (Product Page Style) --- */}
        <div 
            className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-[120] transition-all duration-500 ease-out ${
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
                <span className="text-sm font-medium text-white whitespace-nowrap">Please select a delivery address</span>
            </div>
        </div>

        {/* Address Section */}
        <div className="px-4 mt-4" ref={topAddressRef}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Delivering to</h3>
                {selectedAddress && (
                  <button onClick={onOpenModal} className="text-[10px] font-bold text-[#00b8d9] uppercase">Change</button>
                )}
            </div>

            {!selectedAddress ? (
              <button onClick={onOpenModal} className="w-full py-3 px-4 border-2 border-dashed border-[#00b8d9] text-[#00b8d9] bg-[#00b8d9]/5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00b8d9]/10 transition-colors text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  Select or Add Address
              </button>
            ) : (
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 cursor-pointer group" onClick={onOpenModal}>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0 border border-slate-100 group-hover:border-[#00b8d9] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{selectedAddress.name}</h4>
                          <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{selectedAddress.type}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{selectedAddress.text}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#00b8d9]"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
            )}
        </div>

        {/* Cart Items */}
        <div className="px-4 mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 relative group shadow-sm">
                <div className="flex gap-4">
                    <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">1 pack</span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{item.name}</h3>
                        <div className="flex items-baseline gap-2 mt-1"><span className="text-lg font-extrabold text-[#00b8d9]">₹{item.price}</span></div>
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500 font-bold bg-slate-50 w-fit px-2 py-1 rounded-md border border-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-[#00b8d9]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Tomorrow Morning
                        </div>
                    </div>
                    <div className="w-20 h-20 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden relative border border-slate-100">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        {/* {item.isFresh && <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm text-[8px] font-bold text-center py-0.5 text-slate-600">FRESH</div>} */}
                    </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-3">
                    <button className="text-xs font-bold text-rose-500 flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg> Remove
                    </button>
                    <div className="flex items-center gap-3">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors font-bold text-base bg-white active:scale-95">-</button>
                        <span className="text-sm font-extrabold text-slate-900 w-6 text-center">{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-[#00b8d9] bg-[#00b8d9]/5 flex items-center justify-center text-[#00b8d9] hover:bg-[#00b8d9] hover:text-white transition-all font-bold text-base active:scale-95">+</button>
                    </div>
                </div>
            </div>
          ))}
        </div>

        {/* Daily Deals */}
        <div className="border-t border-slate-100 pt-6 pb-4 mt-6">
            <div className="px-4 mb-4 flex items-center justify-between">
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Daily Deals</h2>
                <a href="#" className="text-[10px] font-bold text-[#00b8d9] uppercase tracking-wider">View All</a>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-3 px-4 pb-4">
                <div className="min-w-[140px] w-[140px] bg-white rounded-xl border border-slate-100 p-2 flex flex-col gap-2 relative overflow-hidden shadow-sm">
                    {/* <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10 shadow-sm">25% OFF</div> */}
                    <div className="w-full aspect-square bg-slate-50 rounded-lg overflow-hidden relative"><img src="https://www.freshtohome.com/media/catalog/product/cache/1/image/1800x1800/40963df243dd7132fb36d1b80d0d8692/t/u/tuna_yellow_fin_cubes.jpg" className="w-full h-full object-cover" alt="Tuna" /></div>
                    <div className="space-y-0.5"><h4 className="text-xs font-bold text-slate-900 leading-tight mb-1 line-clamp-2 h-8">Yellowfin Tuna Cubes</h4><div className="flex items-baseline gap-1.5"><span className="text-sm font-extrabold text-slate-900">₹240</span><span className="text-[10px] text-slate-400 line-through font-medium">₹320</span></div></div>
                </div>
            </div>
        </div>

        {/* Checkout Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-[50] p-3 pb-20"> 
            <button onClick={handleContinue} className="w-full bg-[#00b8d9] text-white p-3.5 rounded-xl flex items-center justify-between shadow-lg shadow-[#00b8d9]/30 active:scale-[0.98] transition-transform">
                <div className="flex flex-col items-start">
                    <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">{items.length} Items</span>
                    <span className="text-lg font-extrabold leading-none">₹{totals.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-sm bg-black/10 px-4 py-1.5 rounded-lg">
                    Continue
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
            </button>
        </div>

        {/* Mobile Navbar */}
        <MobileNavbar />

        {/* --- BILL MODAL (Bottom Sheet) --- */}
        <div className={`fixed inset-0 z-[60] flex items-end justify-center transition-all duration-300 ${isBillModalOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
             <div 
               className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isBillModalOpen ? 'opacity-100' : 'opacity-0'}`}
               onClick={() => setIsBillModalOpen(false)}
             />
             <div className={`bg-white w-full rounded-t-3xl p-6 shadow-2xl flex flex-col relative transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) ${isBillModalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                
                {/* Mobile Floating Close Button for Bill Modal */}
                <button 
                    onClick={() => setIsBillModalOpen(false)}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white shadow-lg z-50 transition-transform active:scale-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-extrabold text-slate-900">Bill Details</h3>
                </div>

                <div className="flex gap-3 mb-6">
                    <div className="relative flex-1">
                        <div className="absolute left-3 top-3 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" /></svg>
                        </div>
                        <input type="text" placeholder="Coupon Code" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-[#00b8d9]" />
                    </div>
                    <button className="text-sm font-bold text-[#00b8d9] px-2 hover:bg-[#00b8d9]/5 rounded-lg transition-colors">Apply</button>
                </div>

                <div className="space-y-3 mb-6 border-t border-slate-100 pt-4">
                    <div className="flex justify-between text-sm text-slate-500 font-medium"><span>Subtotal</span><span className="text-slate-800 font-bold">₹{totals.subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-slate-500 font-medium"><span>Delivery Fee</span><span className="text-emerald-500 font-bold">Free</span></div>
                    <div className="flex justify-between text-sm text-slate-500 font-medium"><span>Taxes</span><span className="text-slate-800 font-bold">₹{totals.tax.toFixed(2)}</span></div>
                </div>

                <div className="flex justify-between items-center mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-600 font-bold">Grand Total</span>
                    <span className="text-2xl font-extrabold text-slate-900">₹{totals.total.toFixed(2)}</span>
                </div>

                <button onClick={onCheckout} className="w-full bg-[#00b8d9] text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-[#00b8d9]/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                    Proceed to Payment
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
             </div>
        </div>

      </div>
    </>
  );
};

export default CartMobile;