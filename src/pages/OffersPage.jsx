import React, { useState } from 'react';
import { COUPONS, FASHION_PRODUCTS } from '../data/fashionProducts';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { Tag, Copy, Check, Percent, Sparkles } from 'lucide-react';

export default function OffersPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView,
  showToast 
}) {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (showToast) showToast(`Coupon code "${code}" copied to clipboard!`, 'info');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filter sale products with highest discounts
  const saleProducts = FASHION_PRODUCTS
    .filter(p => (p.discountPercent ?? 0) > 0)
    .sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-900 text-white text-[10px] uppercase font-bold tracking-widest mx-auto">
          <Percent className="w-3.5 h-3.5" />
          <span>Promotions & Savings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900">
          Offers & Promotional Codes
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
          Apply these official coupon codes at checkout for exclusive discounts on your order.
        </p>
      </div>

      {/* Active Coupons Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COUPONS.map((coupon) => (
          <div key={coupon.code} className="bg-white rounded-3xl p-6 border-2 border-neutral-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-900 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold tracking-wider uppercase rounded-md">
                  {coupon.tag}
                </span>
                <span className="text-xs font-bold text-rose-700">
                  {coupon.discountPercent}% OFF
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                {coupon.description}
              </p>
            </div>

            <div className="pt-4 border-t border-dashed border-neutral-200 flex items-center justify-between bg-neutral-50 p-3 rounded-2xl">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">CODE</span>
                <span className="text-sm font-black tracking-wider text-neutral-900">{coupon.code}</span>
              </div>
              <button
                onClick={() => handleCopyCode(coupon.code)}
                className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors flex items-center space-x-1.5"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Promotional Sale Grid */}
      <div className="space-y-8 pt-6 border-t border-neutral-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Featured Promotional Items</h2>
          <p className="text-xs text-neutral-500 mt-1 font-medium">Objects with maximum percentage savings</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onOpenDetail={(p) => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
