import React from 'react';
import { COUPONS, FASHION_PRODUCTS, DEPARTMENTS } from '../data/fashionProducts';
import ProductCard from '../components/ProductCard';
import CouponCard from '../components/CouponCard';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Percent, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export default function OffersPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView,
  showToast 
}) {
  const navigate = useNavigate();

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    if (showToast) showToast(`Coupon code "${code}" copied to clipboard!`, 'info');
  };

  // Filter sale products with highest discounts
  const saleProducts = FASHION_PRODUCTS
    .filter(p => (p.discountPercent ?? 0) > 0)
    .sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));

  return (
    <div className="space-y-16 pb-16">
      
      {/* Campaign Editorial Hero Banner */}
      <div className="relative bg-[#F4EFEA] dark:bg-[#18181D] py-16 sm:py-20 border-b border-[#E5DFD5] dark:border-[#2D2D38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#191716] text-[#F5F2EB] dark:bg-[#E5C887] dark:text-[#121215] text-[10px] uppercase font-bold tracking-widest mx-auto shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 dark:text-amber-900" />
            <span>The VS Edit — Campaign Offers</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#191716] dark:text-[#F5F2EB] max-w-3xl mx-auto">
            Seasonal Promotions & Atelier Offers
          </h1>

          <p className="text-xs sm:text-sm text-[#6E675E] dark:text-[#A09D96] font-medium leading-relaxed max-w-xl mx-auto">
            Explore curated promotional savings across our single-source catalog. Apply verified coupon codes directly during checkout.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section 1: Dedicated Coupon Collection Grid */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5DFD5] dark:border-[#2D2D38] pb-4 gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B89243] dark:text-[#E6CA65] block mb-1">
                VERIFIED PROMOTIONAL CODES
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#191716] dark:text-[#F5F2EB]">
                Active Campaign Coupons
              </h2>
            </div>
            <p className="text-xs text-[#6E675E] dark:text-[#A09D96] font-medium">
              Copy any code to apply during your session
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {COUPONS.map((coupon) => (
              <CouponCard
                key={coupon.code}
                coupon={coupon}
                onCopyCode={handleCopyCode}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Featured Promotional Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-[#191716] text-[#F5F2EB] p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3.5 py-1 bg-[#E5C887] text-[#121215] text-[10px] font-bold uppercase tracking-widest rounded-full">
              ATELIER PRIVILEGE
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              Enjoy Flat 20% OFF on Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-[#A09D96] leading-relaxed">
              Use code <strong className="text-[#E5C887] font-mono">VSFIRST20</strong> on any purchase above ₹1,999. Includes complimentary shipping and easy exchanges.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleCopyCode('VSFIRST20')}
                className="px-6 py-3 bg-[#E5C887] text-[#121215] hover:bg-[#F3DC9B] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md inline-flex items-center space-x-2"
              >
                <span>Copy Code VSFIRST20</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 hidden md:block pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85"
              alt="VS Offer"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Section 3: Promotional Sale Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#E5DFD5] dark:border-[#2D2D38] pb-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#191716] dark:text-[#F5F2EB]">
                Featured Promotional Objects
              </h2>
              <p className="text-xs text-[#6E675E] dark:text-[#A09D96] mt-1 font-medium">
                Objects with maximum catalog percentage savings
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-wider text-[#191716] dark:text-[#F5F2EB] hover:underline hidden sm:inline"
            >
              View Full Shop
            </Link>
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
        </section>

        {/* Section 4: Shop By Department Shortcuts */}
        <section className="space-y-6 pt-6 border-t border-[#E5DFD5] dark:border-[#2D2D38]">
          <h3 className="text-lg font-bold uppercase tracking-wider text-[#191716] dark:text-[#F5F2EB] text-center">
            Explore Offers by Department
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DEPARTMENTS.filter(d => d.id !== 'all').map((dept) => (
              <Link
                key={dept.id}
                to={dept.path}
                className="group relative h-40 rounded-2xl overflow-hidden shadow-md flex items-end p-4 text-white"
              >
                <img
                  src={dept.bannerImage}
                  alt={dept.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C887] block">DEPARTMENT</span>
                  <h4 className="text-lg font-black uppercase tracking-tight">{dept.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 5: Terms & Disclaimer Note */}
        <div className="p-6 bg-[#F4EFEA] dark:bg-[#1C1B20] rounded-2xl border border-[#E5DFD5] dark:border-[#2D2D38] text-center space-y-2 text-xs text-[#6E675E] dark:text-[#A09D96]">
          <div className="flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#191716] dark:text-[#F5F2EB]" />
            <span className="font-bold uppercase tracking-wider text-[#191716] dark:text-[#F5F2EB]">Promotional Terms & Guidelines</span>
          </div>
          <p className="max-w-2xl mx-auto text-[11px] leading-relaxed">
            All coupons shown on this page are valid for portfolio demo checkout. Coupons cannot be combined on a single order. Minimum order amounts apply before discount calculation.
          </p>
        </div>

      </div>

    </div>
  );
}
