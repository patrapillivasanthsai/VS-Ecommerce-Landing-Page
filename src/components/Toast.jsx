import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className="flex items-center space-x-3 px-4 py-3.5 bg-neutral-900 text-white rounded-2xl shadow-xl border border-neutral-800 text-xs font-medium max-w-sm">
        {toast.type === 'cart' && <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0 stroke-[1.75]" />}
        {toast.type === 'wishlist' && <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />}
        {toast.type === 'info' && <CheckCircle2 className="w-4 h-4 text-neutral-300 shrink-0 stroke-[1.75]" />}
        
        <span className="flex-1 leading-snug tracking-wide">{toast.message}</span>
        
        <button 
          onClick={onClose} 
          className="text-neutral-400 hover:text-white p-1 focus:outline-none transition-colors"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
