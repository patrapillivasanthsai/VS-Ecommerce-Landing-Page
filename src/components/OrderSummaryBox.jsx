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
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-neutral-900" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Promotional Coupon</h3>
          </div>

          {!summary.appliedCoupon ? (
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter code (e.g. VSFIRST20)"
                className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-xl text-xs font-semibold tracking-wider text-neutral-900 uppercase border border-neutral-200 focus:outline-none focus:border-neutral-900"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
              >
                Apply
              </button>
            </form>
          ) : (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">{summary.appliedCoupon.code} applied</span>
                  <span className="block text-[11px] text-emerald-700 font-medium">{summary.appliedCoupon.description}</span>
                </div>
              </div>
              <button 
                onClick={onRemoveCoupon} 
                className="text-emerald-800 underline font-bold text-xs shrink-0 ml-2"
              >
                Remove
              </button>
            </div>
          )}

          {summary.couponError && (
            <p className="text-xs text-rose-600 font-medium pl-1">{summary.couponError}</p>
          )}

          {/* Available coupons shortcut pills */}
          <div className="pt-2 border-t border-dashed border-neutral-200 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">Available Codes:</span>
            <div className="flex flex-wrap gap-1.5">
              {COUPONS.map((c) => (
                <button
                  key={c.code}
                  onClick={() => onApplyCoupon && onApplyCoupon(c.code)}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-900 hover:text-white rounded-md text-[10px] font-mono font-bold text-neutral-800 transition-colors border border-neutral-200"
                >
                  {c.code} ({c.discountPercent}%)
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Summary Calculation Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200">
          Order Summary ({summary.totalItems} {summary.totalItems === 1 ? 'Item' : 'Items'})
        </h3>

        <div className="space-y-3 text-xs text-neutral-600 font-medium">
          {/* MRP Subtotal */}
          <div className="flex justify-between">
            <span>MRP Subtotal</span>
            <span className="font-semibold text-neutral-900">₹{summary.mrpSubtotal.toLocaleString('en-IN')}</span>
          </div>

          {/* Product Savings */}
          {summary.productDiscount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Catalog Product Savings</span>
              <span className="font-bold">-₹{summary.productDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}

          {/* Coupon Savings */}
          {summary.couponDiscount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Coupon Discount ({summary.appliedCoupon.code})</span>
              <span className="font-bold">-₹{summary.couponDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}

          {/* Delivery Fee */}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-semibold text-neutral-900">
              {summary.isFreeShipping ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${summary.deliveryFee}`}
            </span>
          </div>

          {/* Estimated GST / Taxes */}
          <div className="flex justify-between items-center text-neutral-700 pt-1">
            <span className="flex items-center space-x-1">
              <span>Estimated GST / Taxes (5%)</span>
            </span>
            <span className="font-semibold text-neutral-900">₹{summary.estimatedTax.toLocaleString('en-IN')}</span>
          </div>

          {/* Total Payable */}
          <div className="flex justify-between text-sm font-black text-neutral-900 pt-3 border-t border-neutral-200">
            <span>Total Payable</span>
            <span className="text-2xl text-neutral-900">₹{summary.grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        {!summary.isFreeShipping && summary.amountNeededForFreeShipping > 0 && (
          <div className="p-3 bg-neutral-100 rounded-2xl text-[11px] text-neutral-700 font-medium space-y-1">
            <div className="flex justify-between font-semibold">
              <span>Add ₹{summary.amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Shipping</span>
              <span>{Math.round(summary.shippingProgress)}%</span>
            </div>
            <div className="w-full bg-neutral-300 h-1.5 rounded-full overflow-hidden">
              <div className="bg-neutral-900 h-full rounded-full transition-all duration-300" style={{ width: `${summary.shippingProgress}%` }} />
            </div>
          </div>
        )}

        {/* Action Button */}
        {onPrimaryAction && (
          <button
            onClick={onPrimaryAction}
            className="w-full py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg group"
          >
            <span>{primaryActionLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-500 pt-2">
          <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
          <span>Secure Demo Order</span>
        </div>

        <div className="text-[10px] text-neutral-400 text-center font-normal pt-1">
          * Tax shown is an estimated amount for this demo checkout.
        </div>
      </div>

    </div>
  );
}
