import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateOrderSummary, getSessionCoupon, setSessionCoupon } from '../utils/orderSummary';
import OrderSummaryBox from '../components/OrderSummaryBox';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, AlertCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

import { getDemoUser, getDemoCustomerDetails, addDemoOrder } from '../utils/userAccount';

export default function CheckoutPage({ 
  cartItems = [], 
  onClearCart,
  showToast 
}) {
  const navigate = useNavigate();
  const sessionCoupon = getSessionCoupon();
  const summary = calculateOrderSummary(cartItems, sessionCoupon);

  // Form State initialized with saved customer details if available
  const [formData, setFormData] = useState(() => {
    const savedAddress = getDemoCustomerDetails();
    const demoUser = getDemoUser();
    return {
      fullName: savedAddress?.fullName || demoUser?.name || '',
      email: demoUser?.email || '',
      phone: savedAddress?.phone || demoUser?.phone || '',
      address: savedAddress?.address || '',
      city: savedAddress?.city || '',
      state: savedAddress?.state || '',
      pincode: savedAddress?.pincode || '',
      paymentMethod: 'cod'
    };
  });

  const [errors, setErrors] = useState({});
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const getItemPrice = (item) => item.salePrice ?? item.price ?? 0;
  const getItemImage = (item) => (item.images && item.images.length > 0) ? item.images[0] : (item.image || '');

  const handlePrefillSavedDetails = () => {
    const savedAddress = getDemoCustomerDetails();
    const demoUser = getDemoUser();
    if (savedAddress || demoUser) {
      setFormData(prev => ({
        ...prev,
        fullName: savedAddress?.fullName || demoUser?.name || prev.fullName,
        email: demoUser?.email || prev.email,
        phone: savedAddress?.phone || demoUser?.phone || prev.phone,
        address: savedAddress?.address || prev.address,
        city: savedAddress?.city || prev.city,
        state: savedAddress?.state || prev.state,
        pincode: savedAddress?.pincode || prev.pincode
      }));
      if (showToast) showToast('Prefilled address from saved account details.', 'info');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street Address is required.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required.';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN Code is required.';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit Indian PIN code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceDemoOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      if (showToast) showToast('Your bag is empty.', 'info');
      return;
    }

    if (validateForm()) {
      const createdOrder = addDemoOrder({
        items: cartItems,
        totalAmount: summary.grandTotal,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      });

      const generatedId = createdOrder ? createdOrder.id : `VS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsOrderPlaced(true);

      // Clear session coupon and cart
      setSessionCoupon(null);
      if (onClearCart) onClearCart();
      if (showToast) showToast('Demo order placed successfully!', 'info');
    }
  };

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center mx-auto text-neutral-500">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-800">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-neutral-500">Please add products to your bag before proceeding to checkout.</p>
        <Link to="/shop" className="inline-block px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-neutral-900" />
            <h1 className="text-3xl font-black text-neutral-900">Demo Order Checkout</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1 font-medium">
            Complete your delivery information for this showcase order flow.
          </p>
        </div>
        <Link to="/cart" className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bag</span>
        </Link>
      </div>

      {/* Main Checkout Form & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form & Address (Cols 1-7) */}
        <form onSubmit={handlePlaceDemoOrder} className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Contact Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-5">
            <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 pb-2 border-b border-neutral-200">
              1. Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Vasanth Sai"
                  className={`w-full px-4 py-3 bg-neutral-50 rounded-xl text-xs font-medium text-neutral-900 border focus:outline-none focus:bg-white transition-colors ${
                    errors.fullName ? 'border-rose-600 bg-rose-50' : 'border-neutral-200 focus:border-neutral-900'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-600 font-medium mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 bg-neutral-50 rounded-xl text-xs font-medium text-neutral-900 border focus:outline-none focus:bg-white transition-colors ${
                      errors.email ? 'border-rose-600 bg-rose-50' : 'border-neutral-200 focus:border-neutral-900'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-600 font-medium mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3 bg-neutral-50 rounded-xl text-xs font-medium text-neutral-900 border focus:outline-none focus:bg-white transition-colors ${
                      errors.phone ? 'border-rose-600 bg-rose-50' : 'border-neutral-200 focus:border-neutral-900'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-600 font-medium mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-neutral-200 gap-2">
              <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900">
                2. Delivery Address
              </h2>
              <button
                type="button"
                onClick={handlePrefillSavedDetails}
                className="text-xs font-bold text-amber-950 underline hover:text-black uppercase tracking-wider text-left sm:text-right"
              >
                Use Saved Account Details
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Street Address / House No <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street name, flat, or building details"
                  className={`w-full px-4 py-3 bg-neutral-50 rounded-xl text-xs font-medium text-neutral-900 border focus:outline-none focus:bg-white transition-colors ${
                    errors.address ? 'border-rose-600 bg-rose-50' : 'border-neutral-200 focus:border-neutral-900'
                  }`}
                />
                {errors.address && <p className="text-xs text-rose-600 font-medium mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    City <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    className={`w-full px-4 py-3 bg-neutral-50 rounded-xl text-xs font-medium text-neutral-900 border focus:outline-none focus:bg-white transition-colors ${
                      errors.city ? 'border-rose-600 bg-rose-50' : 'border-neutral-200 focus:border-neutral-900'
                    }`}
                  />
                  {errors.city && <p className="text-xs text-rose-600 font-medium mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    State <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Maharashtra"
                    className={`w-full px-4 py-3 bg-neutral-50 rounded-xl text-xs font-medium text-neutral-900 border focus:outline-none focus:bg-white transition-colors ${
                      errors.state ? 'border-rose-600 bg-rose-50' : 'border-neutral-200 focus:border-neutral-900'
                    }`}
                  />
                  {errors.state && <p className="text-xs text-rose-600 font-medium mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    PIN Code <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN"
                    className={`w-full px-4 py-3 bg-neutral-50 rounded-xl text-xs font-medium text-neutral-900 border focus:outline-none focus:bg-white transition-colors ${
                      errors.pincode ? 'border-rose-600 bg-rose-50' : 'border-neutral-200 focus:border-neutral-900'
                    }`}
                  />
                  {errors.pincode && <p className="text-xs text-rose-600 font-medium mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Demo Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 pb-2 border-b border-neutral-200">
              3. Payment Method Selection (Demo Showcase)
            </h2>

            <div className="space-y-3 pt-1">
              {[
                { id: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay via cash/UPI upon delivery at your doorstep.' },
                { id: 'upi', label: 'UPI / QR Payment (Demo)', desc: 'Simulated GPay / PhonePe payment flow.' },
                { id: 'card', label: 'Credit / Debit Card (Demo)', desc: 'Simulated card transaction. No CVV/PIN required.' }
              ].map((pm) => (
                <label
                  key={pm.id}
                  className={`flex items-start space-x-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === pm.id
                      ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={pm.id}
                    checked={formData.paymentMethod === pm.id}
                    onChange={handleChange}
                    className="mt-1 accent-neutral-900"
                  />
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">{pm.label}</span>
                    <span className="text-[11px] text-neutral-500 font-medium">{pm.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center space-x-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Note: This is a frontend demo checkout. No sensitive card/banking credentials will be requested.</span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            className="w-full py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-2"
          >
            <span>Place Demo Order — ₹{summary.grandTotal.toLocaleString('en-IN')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Right Column: Order Items Review & Dynamic Order Summary (Cols 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Order Items Review List */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200">
              Order Review ({summary.totalItems} Objects)
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const img = getItemImage(item);
                const price = getItemPrice(item);

                return (
                  <div key={item.variantKey || item.id} className="flex space-x-3 py-2 border-b border-neutral-100 last:border-0">
                    <img src={img} alt={item.name} className="w-14 h-16 object-cover rounded-xl bg-neutral-100 shrink-0" />
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold text-neutral-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Qty: {item.quantity} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                      </p>
                      <span className="font-bold text-neutral-900 mt-1 block">
                        ₹{(price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Box Component */}
          <OrderSummaryBox
            summary={summary}
            appliedCouponInput={sessionCoupon}
            isCheckoutPage={true}
          />

        </div>

      </div>

      {/* Demo Order Confirmation Modal */}
      {isOrderPlaced && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-md" />

          <div className="relative bg-[#FAF9F5] rounded-3xl max-w-lg w-full p-8 shadow-2xl z-10 border border-neutral-200 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10 stroke-[1.75]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                DEMO ORDER CREATED
              </span>
              <h2 className="text-2xl font-black text-neutral-900">Order Received!</h2>
              <p className="text-xs text-neutral-500 font-mono font-bold">Ref: {orderId}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-neutral-200 text-left text-xs space-y-2 font-medium text-neutral-700">
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span>Customer Name:</span>
                <span className="font-bold text-neutral-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span>Delivery Address:</span>
                <span className="font-bold text-neutral-900">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Total Amount:</span>
                <span className="font-black text-neutral-900">₹{summary.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-neutral-200/60 rounded-xl text-[11px] text-neutral-600 font-medium">
              * Note: This is a frontend demo confirmation for portfolio showcase purposes. No payment was collected.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsOrderPlaced(false);
                  navigate('/account/orders');
                }}
                className="flex-1 py-3.5 bg-white border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-100 transition-colors"
              >
                View Order in Account
              </button>
              <button
                onClick={() => {
                  setIsOrderPlaced(false);
                  navigate('/shop');
                }}
                className="flex-1 py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
