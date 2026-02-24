'use client';

import React, { useState } from 'react';
import CartDesktop from './CartDesktop';
import CartMobile from './CartMobile';

// --- Types ---
export type CartItem = {
  id: number;
  name: string;
  
  weight: string;
  price: number;
  qty: number;
  image: string;
  isFresh: boolean;
};

export type Address = {
  id: number;
  name: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  text: string;
  phone: string;
};

// --- Initial Data ---
const INITIAL_CART: CartItem[] = [
  {
    id: 101,
    name: 'Red Snapper / Chempalli',
    
    weight: 'Skinless Curry Cut • 340g - 360g',
    price: 483,
    qty: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtzAEa3HWHfhTJidIEk_x2-nJmy6mdfuXmUg&s',
    isFresh: true,
  }
];

const INITIAL_ADDR: Address[] = [
  { id: 1, name: "Akash", type: "HOME", text: "Flat 101, Galaxy Apts, MG Road, Bangalore - 560001", phone: "+91 98765 43210" },
  { id: 2, name: "Akash Office", type: "WORK", text: "Tech Park, Indiranagar, Bangalore - 560038", phone: "+91 98765 43210" }
];

export default function CartPage() {
  // --- Global State ---
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDR);
  
  // Real Selected Address (Used for display & checkout)
  const [selectedAddrId, setSelectedAddrId] = useState<number | null>(null);
  
  // Temporary Selected Address (Used ONLY inside the modal before confirming)
  const [tempSelectedAddrId, setTempSelectedAddrId] = useState<number | null>(null);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'LIST' | 'ADD'>('LIST');

  // --- New Address Form State ---
  const [newAddrForm, setNewAddrForm] = useState({ name: '', phone: '', flat: '', street: '', city: '', pin: '', type: 'HOME' });

  // --- Computed Values ---
  const selectedAddress = addresses.find(a => a.id === selectedAddrId);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = 24;
  const total = subtotal + tax;

  // --- Handlers ---

  const handleOpenModal = () => {
    // When opening, sync temp selection with real selection
    setTempSelectedAddrId(selectedAddrId);
    setIsModalOpen(true);
    setModalMode('LIST');
  };

  const handleConfirmSelection = () => {
    // Commit the temp selection to the real state
    setSelectedAddrId(tempSelectedAddrId);
    setIsModalOpen(false);
  };

  const handleUpdateQty = (id: number, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + change);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: Date.now(),
      name: newAddrForm.name,
      phone: newAddrForm.phone,
      type: newAddrForm.type as any,
      text: `${newAddrForm.flat}, ${newAddrForm.street}, ${newAddrForm.city} - ${newAddrForm.pin}`
    };
    
    setAddresses([...addresses, newAddr]);
    
    // Auto-select and confirm the newly added address
    setSelectedAddrId(newAddr.id); 
    setTempSelectedAddrId(newAddr.id);
    
    setNewAddrForm({ name: '', phone: '', flat: '', street: '', city: '', pin: '', type: 'HOME' });
    setIsModalOpen(false);
    setModalMode('LIST');
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      if (window.innerWidth > 768) alert("Please select an address to proceed!");
      return;
    }
    alert("Proceeding to Payment Gateway...");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      
      {/* --- UNIVERSAL ADDRESS MODAL --- */}
      <div className={`fixed inset-0 z-[100] flex md:items-center items-end justify-center transition-all duration-300 ${isModalOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsModalOpen(false)}
        />

        {/* Modal Content */}
        <div 
          className={`
            bg-white w-full md:w-[450px] md:max-w-[90vw] max-h-[85vh] flex flex-col relative z-10 shadow-2xl
            md:rounded-3xl rounded-t-[30px] rounded-b-none 
            transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
            ${isModalOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full md:translate-y-0 md:scale-95 md:opacity-0'}
          `}
        >
            {/* Mobile Floating Close Button (Matches Screenshot style) */}
            <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-14 left-1/2 -translate-x-1/2 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white md:hidden shadow-lg z-50 transition-transform active:scale-90"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Mobile Drag Handle Visual */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden"></div>

            {/* Content Container */}
            <div className="p-6 pt-2 md:pt-6 flex flex-col flex-1 overflow-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {modalMode === 'ADD' && (
                      <button onClick={() => setModalMode('LIST')} className="text-slate-400 hover:text-slate-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                      </button>
                    )}
                    <h3 className="text-xl font-extrabold text-slate-900">{modalMode === 'LIST' ? 'Select Address' : 'Add New Address'}</h3>
                  </div>
                  
                  {/* Desktop Close Button (Hidden on Mobile) */}
                  <button onClick={() => setIsModalOpen(false)} className="hidden md:flex w-8 h-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition">✕</button>
                </div>

                {/* List View */}
                {modalMode === 'LIST' ? (
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 pb-2 custom-scrollbar">
                      {addresses.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-sm">No saved addresses found.</div>
                      ) : (
                        addresses.map((addr) => (
                          <label key={addr.id} className="cursor-pointer block relative group">
                            <input 
                              type="radio" 
                              name="selected_addr" 
                              className="peer sr-only" 
                              // Check against TEMP state, not confirmed state
                              checked={tempSelectedAddrId === addr.id}
                              onChange={() => setTempSelectedAddrId(addr.id)}
                            />
                            <div className="p-4 rounded-2xl border border-slate-200 hover:border-[#00b8d9] transition-all bg-white peer-checked:border-[#00b8d9] peer-checked:bg-[#f0fdff] flex items-start gap-4">
                              <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${tempSelectedAddrId === addr.id ? 'border-[#00b8d9] bg-[#00b8d9]' : 'border-slate-300'}`}>
                                  {tempSelectedAddrId === addr.id && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold text-slate-900 text-sm">{addr.name}</h4>
                                  <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{addr.type}</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">{addr.text}</p>
                                <p className="text-xs font-bold text-slate-700 mt-1">{addr.phone}</p>
                              </div>
                            </div>
                          </label>
                        ))
                      )}
                    </div>
                    <div className="mt-4 pt-4 flex-shrink-0 space-y-3">
                      <button onClick={() => setModalMode('ADD')} className="w-full py-3 border-2 border-dashed border-[#00b8d9]/30 text-[#00b8d9] bg-[#00b8d9]/5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00b8d9]/10 transition-colors">
                        + Add New Address
                      </button>
                      <button 
                        onClick={handleConfirmSelection} 
                        className="w-full bg-[#00b8d9] text-white font-bold py-3.5 rounded-xl  hover:bg-[#00a2bf] transition-colors active:scale-95"
                      >
                        Confirm Selection
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Add Form */
                  <form onSubmit={handleSaveAddress} className="flex flex-col gap-4 overflow-y-auto pt-2 pb-2 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#00b8d9]" value={newAddrForm.name} onChange={e => setNewAddrForm({...newAddrForm, name: e.target.value})} />
                        <input required placeholder="Phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#00b8d9]" value={newAddrForm.phone} onChange={e => setNewAddrForm({...newAddrForm, phone: e.target.value})} />
                    </div>
                    <input required placeholder="Flat / Building" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#00b8d9]" value={newAddrForm.flat} onChange={e => setNewAddrForm({...newAddrForm, flat: e.target.value})} />
                    <textarea required placeholder="Street / Area" rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#00b8d9]" value={newAddrForm.street} onChange={e => setNewAddrForm({...newAddrForm, street: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="City" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#00b8d9]" value={newAddrForm.city} onChange={e => setNewAddrForm({...newAddrForm, city: e.target.value})} />
                        <input required placeholder="Pincode" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#00b8d9]" value={newAddrForm.pin} onChange={e => setNewAddrForm({...newAddrForm, pin: e.target.value})} />
                    </div>
                    <div className="flex gap-3 pt-2">
                        {['HOME', 'WORK', 'OTHER'].map(type => (
                          <label key={type} className="flex-1 cursor-pointer">
                            <input type="radio" name="addr-type" value={type} className="peer sr-only" checked={newAddrForm.type === type} onChange={() => setNewAddrForm({...newAddrForm, type: type as any})} />
                            <div className="text-center py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 peer-checked:bg-slate-800 peer-checked:text-white peer-checked:border-slate-800 transition">{type}</div>
                          </label>
                        ))}
                    </div>
                    <button type="submit" className="w-full bg-[#00b8d9] text-white font-bold py-3.5 rounded-xl  hover:bg-[#00a2bf] transition-colors mt-2 active:scale-95">Save & Deliver Here</button>
                  </form>
                )}
            </div>
        </div>
      </div>

      {/* --- Desktop View (> 768px) --- */}
      <div className="hidden md:block">
        <CartDesktop 
          items={cartItems} 
          selectedAddress={selectedAddress} 
          onUpdateQty={handleUpdateQty} 
          onOpenModal={handleOpenModal} 
          onCheckout={handleCheckout}
          totals={{ subtotal, tax, total }}
        />
      </div>

      {/* --- Mobile View (< 768px) --- */}
      <div className="block md:hidden">
        <CartMobile 
          items={cartItems} 
          selectedAddress={selectedAddress} 
          onUpdateQty={handleUpdateQty} 
          onOpenModal={handleOpenModal}
          onCheckout={handleCheckout}
          totals={{ subtotal, tax, total }}
        />
      </div>

    </div>
  );
}