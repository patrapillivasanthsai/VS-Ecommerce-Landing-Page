// Centralized Reusable Order Summary & Pricing Utility for VS Fashion
// Used by CartPage, CartDrawer, and CheckoutPage to ensure 100% mathematical consistency

import { COUPONS } from '../data/fashionProducts';

export const DEMO_TAX_RATE = 0.05; // 5% Configurable estimated GST rate for demo showcase
export const FREE_SHIPPING_THRESHOLD = 2999;
export const STANDARD_DELIVERY_FEE = 199;

export function calculateOrderSummary(cartItems = [], appliedCouponInput = null) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return {
      totalItems: 0,
      mrpSubtotal: 0,
      saleSubtotal: 0,
      productDiscount: 0,
      appliedCoupon: null,
      couponDiscount: 0,
      couponError: null,
      taxableAmount: 0,
      amountNeededForFreeShipping: FREE_SHIPPING_THRESHOLD,
      shippingProgress: 0,
      deliveryFee: 0,
      isFreeShipping: true,
      estimatedTax: 0,
      grandTotal: 0
    };
  }

  // 1. Calculate Item Counts, MRP Subtotal, and Sale Subtotal
  let totalItems = 0;
  let mrpSubtotal = 0;
  let saleSubtotal = 0;

  cartItems.forEach(item => {
    const qty = Math.max(1, item.quantity || 1);
    totalItems += qty;

    const salePrice = item.salePrice ?? item.price ?? 0;
    const mrpPrice = item.originalPrice ?? salePrice;

    mrpSubtotal += mrpPrice * qty;
    saleSubtotal += salePrice * qty;
  });

  const productDiscount = Math.max(0, mrpSubtotal - saleSubtotal);

  // 2. Validate Coupon and Calculate Coupon Discount
  let appliedCoupon = null;
  let couponDiscount = 0;
  let couponError = null;

  if (appliedCouponInput) {
    const couponCode = typeof appliedCouponInput === 'string' 
      ? appliedCouponInput.trim().toUpperCase() 
      : (appliedCouponInput.code ? appliedCouponInput.code.toUpperCase() : '');

    const foundCoupon = COUPONS.find(c => c.code === couponCode);

    if (foundCoupon) {
      if (saleSubtotal < foundCoupon.minOrderAmount) {
        couponError = `Coupon ${foundCoupon.code} requires a minimum order value of ₹${foundCoupon.minOrderAmount.toLocaleString('en-IN')}`;
      } else {
        appliedCoupon = foundCoupon;
        couponDiscount = Math.round((saleSubtotal * foundCoupon.discountPercent) / 100);
        // Ensure coupon discount does not exceed sale subtotal
        couponDiscount = Math.min(saleSubtotal, couponDiscount);
      }
    } else {
      couponError = 'Invalid promotional coupon code.';
    }
  }

  // 3. Taxable Amount & Shipping Calculation
  const taxableAmount = Math.max(0, saleSubtotal - couponDiscount);
  const isFreeShipping = saleSubtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryFee = isFreeShipping ? 0 : STANDARD_DELIVERY_FEE;
  const amountNeededForFreeShipping = isFreeShipping ? 0 : FREE_SHIPPING_THRESHOLD - saleSubtotal;
  const shippingProgress = Math.min(100, (saleSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // 4. Estimated GST / Taxes (5% demo rate applied to taxable merchandise)
  const estimatedTax = Math.round(taxableAmount * DEMO_TAX_RATE);

  // 5. Final Payable Amount
  const grandTotal = taxableAmount + deliveryFee + estimatedTax;

  return {
    totalItems,
    mrpSubtotal,
    saleSubtotal,
    productDiscount,
    appliedCoupon,
    couponDiscount,
    couponError,
    taxableAmount,
    amountNeededForFreeShipping,
    shippingProgress,
    deliveryFee,
    isFreeShipping,
    estimatedTax,
    grandTotal
  };
}

// Session helper for persistent coupon across navigation
const SESSION_COUPON_KEY = 'vs_session_coupon';

export function getSessionCoupon() {
  try {
    return sessionStorage.getItem(SESSION_COUPON_KEY) || null;
  } catch {
    return null;
  }
}

export function setSessionCoupon(code) {
  try {
    if (code) {
      sessionStorage.setItem(SESSION_COUPON_KEY, code.toUpperCase());
    } else {
      sessionStorage.removeItem(SESSION_COUPON_KEY);
    }
  } catch {
    // Ignore storage write errors
  }
}
