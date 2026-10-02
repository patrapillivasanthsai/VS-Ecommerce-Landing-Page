import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 150;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeeded = freeShippingThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between z-10 transform transition-transform duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-lg font-semibold text-neutral-900">
                Shopping Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black transition-colors rounded-full focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-100 p-4 border-b border-neutral-200/60 text-xs">
            <div className="flex justify-between font-medium text-neutral-800 mb-1.5">
              <span>
                {amountNeeded > 0 
                  ? `Add $${amountNeeded.toFixed(0)} more for Free Express Shipping` 
                  : '🎉 You have unlocked Free Express Shipping!'}
              </span>
              <span>{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full bg-neutral-300 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-neutral-900 h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-medium text-neutral-800">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our collection of thoughtfully selected everyday essentials.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4 py-3 border-b border-neutral-200/60 last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-center rounded-lg bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-neutral-900 line-clamp-1">{item.name}</h4>
                        <span className="text-sm font-bold text-neutral-900 ml-2">${item.price * item.quantity}</span>
                      </div>
                      <p className="text-xs text-neutral-500 font-medium mt-0.5">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-600 hover:text-black focus:outline-none"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-600 hover:text-black focus:outline-none"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete item */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-neutral-200 space-y-4">
              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{subtotal >= freeShippingThreshold ? 'FREE' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span>${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 15)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>Encrypted 256-bit Secure Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
