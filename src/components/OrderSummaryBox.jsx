import React, { useState } from 'react';
import { Tag, Check, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { COUPONS } from '../data/fashionProducts';

export default function OrderSummaryBox({
  summary,
  appliedCouponInput,
  onApplyCoupon,
  onRemoveCoupon,
  onPrimaryAction,
  primaryActionLabel = 'Proceed to Checkout',
  isCheckoutPage = false
}) {
  const [couponInput, setCouponInput] = useState('');

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponInput.trim() && onApplyCoupon) {
      onApplyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Promo Coupon Form Box */}
      {!isCheckoutPage && (
        <div className="bg-vs-surface-light dark:bg-vs-surface-dark text-neutral-900 dark:text-neutral-100 p-6 rounded-3xl border border-vs-border-light dark:border-vs-border-dark shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-neutral-900 dark:text-vs-accent-gold" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">Promotional Coupon</h3>
          </div>

          {!summary.appliedCoupon ? (
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter code (e.g. VSFIRST20)"
                className="flex-1 px-4 py-2.5 bg-vs-input-light dark:bg-vs-input-dark rounded-xl text-xs font-mono font-bold tracking-wider text-neutral-900 dark:text-neutral-100 uppercase border border-vs-border-light dark:border-vs-border-dark focus:outline-none focus:border-neutral-900 dark:focus:border-vs-accent-gold"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors shrink-0"
              >
                Apply
              </button>
            </form>
          ) : (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold">{summary.appliedCoupon.code} applied</span>
                  <span className="block text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">{summary.appliedCoupon.description}</span>
                </div>
              </div>
              <button 
                onClick={onRemoveCoupon} 
                className="text-emerald-800 dark:text-emerald-300 underline font-bold text-xs shrink-0 ml-2"
              >
                Remove
              </button>
            </div>
          )}

          {summary.couponError && (
            <p className="text-xs text-vs-sale-light dark:text-vs-sale-dark font-medium pl-1">{summary.couponError}</p>
          )}

          {/* Available coupons shortcut pills */}
          <div className="pt-2 border-t border-dashed border-vs-border-light dark:border-vs-border-dark space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500 block">Available Codes:</span>
            <div className="flex flex-wrap gap-1.5">
              {COUPONS.map((c) => (
                <button
                  key={c.code}
                  onClick={() => onApplyCoupon && onApplyCoupon(c.code)}
                  className="px-2.5 py-1 bg-vs-input-light dark:bg-vs-input-dark hover:bg-neutral-900 hover:text-white dark:hover:bg-vs-accent-gold dark:hover:text-neutral-900 rounded-md text-[10px] font-mono font-bold text-neutral-800 dark:text-neutral-200 transition-colors border border-vs-border-light dark:border-vs-border-dark"
                >
                  {c.code} ({c.discountPercent}%)
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Summary Calculation Card */}
      <div className="bg-vs-surface-light dark:bg-vs-surface-dark text-neutral-900 dark:text-neutral-100 p-6 sm:p-8 rounded-3xl border border-vs-border-light dark:border-vs-border-dark shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100 pb-3 border-b border-vs-border-light dark:border-vs-border-dark">
          Order Summary ({summary.totalItems} {summary.totalItems === 1 ? 'Item' : 'Items'})
        </h3>

        <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
          {/* MRP Subtotal */}
          <div className="flex justify-between">
            <span>MRP Subtotal</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">₹{summary.mrpSubtotal.toLocaleString('en-IN')}</span>
          </div>

          {/* Product Savings */}
          {summary.productDiscount > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
              <span>Catalog Product Savings</span>
              <span className="font-bold">-₹{summary.productDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}

          {/* Coupon Savings */}
          {summary.couponDiscount > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
              <span>Coupon Discount ({summary.appliedCoupon.code})</span>
              <span className="font-bold">-₹{summary.couponDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}

          {/* Delivery Fee */}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {summary.isFreeShipping ? <span className="text-emerald-700 dark:text-emerald-400 font-bold">FREE</span> : `₹${summary.deliveryFee}`}
            </span>
          </div>

          {/* Estimated GST / Taxes */}
          <div className="flex justify-between items-center text-neutral-700 dark:text-neutral-300 pt-1">
            <span className="flex items-center space-x-1">
              <span>Estimated GST / Taxes (5%)</span>
            </span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">₹{summary.estimatedTax.toLocaleString('en-IN')}</span>
          </div>

          {/* Total Payable */}
          <div className="flex justify-between text-sm font-black text-neutral-900 dark:text-neutral-100 pt-3 border-t border-vs-border-light dark:border-vs-border-dark">
            <span>Total Payable</span>
            <span className="text-2xl font-serif text-neutral-900 dark:text-neutral-100">₹{summary.grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        {!summary.isFreeShipping && summary.amountNeededForFreeShipping > 0 && (
          <div className="p-3 bg-vs-input-light dark:bg-vs-input-dark rounded-2xl text-[11px] text-neutral-700 dark:text-neutral-300 font-medium space-y-1">
            <div className="flex justify-between font-semibold">
              <span>Add ₹{summary.amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Shipping</span>
              <span>{Math.round(summary.shippingProgress)}%</span>
            </div>
            <div className="w-full bg-neutral-300 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-neutral-900 dark:bg-vs-accent-gold h-full rounded-full transition-all duration-300" style={{ width: `${summary.shippingProgress}%` }} />
            </div>
          </div>
        )}

        {/* Action Button */}
        {onPrimaryAction && (
          <button
            onClick={onPrimaryAction}
            className="w-full py-4 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black dark:hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg group"
          >
            <span>{primaryActionLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-500 dark:text-neutral-400 pt-2">
          <ShieldCheck className="w-4 h-4 text-neutral-800 dark:text-neutral-300 shrink-0" />
          <span>Secure Demo Order</span>
        </div>

        <div className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center font-normal pt-1">
          * Tax shown is an estimated amount for this demo checkout.
        </div>
      </div>

    </div>
  );
}
