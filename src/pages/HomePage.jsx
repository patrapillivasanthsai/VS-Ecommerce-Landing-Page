import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { 
  FASHION_PRODUCTS, 
  COUPONS, 
  LOOKBOOK_OUTFITS, 
  COMPLETE_THE_LOOK_MAP, 
  getProductsByIds 
} from '../data/fashionProducts';
import { 
  Sparkles, 
  ArrowRight, 
  Tag, 
  Percent, 
  Layers, 
  BookOpen, 
  Check, 
  Copy, 
  ShieldCheck, 
  Compass, 
  Heart,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export default function HomePage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const navigate = useNavigate();
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  // 1. Data filtering for NEW ARRIVALS
  const newArrivals = useMemo(() => {
    const list = FASHION_PRODUCTS.filter(p => 
      (p.tag && (p.tag.toLowerCase().includes('new') || p.tag.toLowerCase().includes('seasonal') || p.tag.toLowerCase().includes('summer')))
    );
    return list.length >= 4 ? list.slice(0, 8) : FASHION_PRODUCTS.slice(0, 8);
  }, []);

  // 2. Data filtering for BEST SELLERS / TRENDING
  const bestSellers = useMemo(() => {
    const list = FASHION_PRODUCTS.filter(p => 
      (p.tag && (p.tag.toLowerCase().includes('bestseller') || p.tag.toLowerCase().includes('trending') || p.tag.toLowerCase().includes('featured') || p.tag.toLowerCase().includes('core')))
    );
    return list.length >= 4 ? list.slice(0, 8) : FASHION_PRODUCTS.slice(4, 12);
  }, []);

  // 3. Complete the Look outfit selection (using product ID vs-m-01)
  const completeLookMainId = 'vs-m-01';
  const completeLookMain = FASHION_PRODUCTS.find(p => p.id === completeLookMainId) || FASHION_PRODUCTS[0];
  const completeLookMatchingIds = COMPLETE_THE_LOOK_MAP[completeLookMainId] || ['vs-m-02', 'vs-a-04'];
  const completeLookMatchingProducts = getProductsByIds(completeLookMatchingIds);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      
      {/* ==================================================
          1. HERO CAMPAIGN SECTION
         ================================================== */}
      <section className="relative pt-4 pb-12 lg:pt-8 lg:pb-20 overflow-hidden bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-200/80 border border-neutral-300/60 text-neutral-900 text-[11px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                <span>Autumn / Winter 2026 Campaign</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 leading-[1.04]">
                  THE NEW <br />
                  <span className="font-serif italic font-normal text-neutral-900">EVERYDAY.</span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 font-normal max-w-md leading-relaxed">
                  Refined fashion essentials designed for modern wardrobes. Crafted from 100% French flax linen, organic cotton, and Tuscan calfskin leather.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link
                  to="/women"
                  className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-md group"
                >
                  <span>Shop Women</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/men"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border border-neutral-300 text-neutral-900 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-neutral-900 hover:bg-neutral-100 transition-all duration-300"
                >
                  <span>Shop Men</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Campaign Imagery Frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 group">
                <img
                  src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1400&q=85"
                  alt="VS Autumn Campaign"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-neutral-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 block">CAMPAIGN HIGHLIGHT</span>
                    <p className="text-xs font-bold text-neutral-900">Relaxed Italian Linen Shirt</p>
                  </div>
                  <Link
                    to="/product/vs-m-01"
                    className="text-xs font-bold text-white px-3.5 py-1.5 bg-neutral-900 rounded-xl hover:bg-black transition-colors"
                  >
                    View Object — ₹2,499
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. HERO PROMOTIONAL INDICATOR STRIP
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-rose-900 flex items-center justify-center shrink-0 hidden sm:flex">
              <Percent className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">SPECIAL OFFER</span>
              <p className="text-xs sm:text-sm font-semibold tracking-wide">
                UP TO 38% OFF SELECTED SEASONAL STYLES • USE CODE <span className="font-mono text-amber-300 font-bold">VSFIRST20</span> FOR FLAT 20% OFF
              </p>
            </div>
          </div>
          <Link
            to="/offers"
            className="px-5 py-2.5 bg-white text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors shrink-0"
          >
            Explore Offers
          </Link>
        </div>
      </section>

      {/* ==================================================
          3. DEPARTMENT SHOPPING SECTION ("SHOP BY DEPARTMENT")
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">SHOP BY DEPARTMENT</h2>
            <p className="text-xs text-neutral-500 mt-1 font-medium">Explore tailored silhouettes across Men, Women, Kids, and Accessories</p>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline hidden sm:inline-block">
            View All Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              id: 'women', 
              name: 'Women', 
              tagline: 'Silk dresses, tailored blazers & wide-leg trousers',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85', 
              path: '/women' 
            },
            { 
              id: 'men', 
              name: 'Men', 
              tagline: 'Italian linen shirts, selvedge denim & chinos',
              image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=85', 
              path: '/men' 
            },
            { 
              id: 'kids', 
              name: 'Kids', 
              tagline: 'Organic cotton hoodies, dungarees & sets',
              image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=85', 
              path: '/kids' 
            },
            { 
              id: 'accessories', 
              name: 'Accessories', 
              tagline: 'Full-grain leather totes, timepieces & scarves',
              image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=85', 
              path: '/accessories' 
            }
          ].map((dept) => (
            <Link
              key={dept.id}
              to={dept.path}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 block shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={dept.image}
                alt={dept.name}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <h3 className="text-2xl font-black tracking-tight">{dept.name}</h3>
                <p className="text-xs text-neutral-300 font-normal leading-relaxed line-clamp-2">{dept.tagline}</p>
                <div className="pt-2 inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================================================
          4. PROMOTIONAL OFFER SECTION (COUPONS STRIP)
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 block">PROMOTIONAL OFFERS</span>
              <h3 className="text-xl font-extrabold text-neutral-900">Active Savings & Checkout Coupons</h3>
            </div>
            <Link to="/offers" className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline">
              View All Offers
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUPONS.map((coupon) => (
              <div key={coupon.code} className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      {coupon.discountPercent}% OFF
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {coupon.tag}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed mt-2">
                    {coupon.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-neutral-300 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider text-neutral-900">
                    CODE: {coupon.code}
                  </span>
                  <button
                    onClick={() => handleCopyCoupon(coupon.code)}
                    className="px-3 py-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-black transition-colors flex items-center space-x-1"
                  >
                    {copiedCoupon === coupon.code ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. NEW ARRIVALS PRODUCT SECTION
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">NEW ARRIVALS</h2>
            <p className="text-xs text-neutral-500 mt-1 font-medium">Fresh seasonal drops across Men, Women, Kids, and Accessories</p>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline">
            View All New Arrivals
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.slice(0, 4).map((product) => (
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

      {/* ==================================================
          6. EDITORIAL FASHION SECTION ("The Art of Everyday Dressing")
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white min-h-[420px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85"
            alt="Editorial Campaign"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="relative z-10 max-w-xl p-8 sm:p-12 lg:p-16 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
              EDITORIAL PERSPECTIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              The Art of Everyday Dressing.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
              "Built for the moments between occasions. We believe true luxury lies in unhurried craftsmanship, natural fiber drape, and enduring versatility."
            </p>
            <Link
              to="/collections/morning-atelier"
              className="inline-flex items-center space-x-2 px-7 py-3.5 bg-white text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>Explore The Edit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. BEST SELLERS / TRENDING SECTION
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">BEST SELLERS & TRENDING</h2>
            <p className="text-xs text-neutral-500 mt-1 font-medium">Most coveted objects rated by our community</p>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline">
            View All Bestsellers
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestSellers.slice(0, 4).map((product) => (
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

      {/* ==================================================
          8. INTERACTIVE LOOKBOOK TEASER
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] uppercase font-bold tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SEASONAL LOOKBOOK 2026</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                The Riviera Atelier & Urban Monolith
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                Explore complete outfit pairings crafted by our design team. Click through tagged looks and effortlessly add matched pieces to your order.
              </p>
              <Link
                to="/lookbook"
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-white text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Full Lookbook</span>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-800 relative">
                <img
                  src={LOOKBOOK_OUTFITS[0]?.image || 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=85'}
                  alt="Lookbook Outfit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-300">{LOOKBOOK_OUTFITS[0]?.season}</span>
                  <p className="text-sm font-bold">{LOOKBOOK_OUTFITS[0]?.title}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          9. COMPLETE THE LOOK SECTION
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-neutral-200 pb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 block">STYLING PAIRINGS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">COMPLETE THE LOOK</h2>
          </div>
          <Link to={`/product/${completeLookMain.id}`} className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline">
            Shop This Look
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs">
          
          {/* Featured Hero Product */}
          <div className="md:col-span-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 relative">
              <img
                src={completeLookMain.images ? completeLookMain.images[0] : completeLookMain.image}
                alt={completeLookMain.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-neutral-900 text-white text-[10px] font-bold uppercase rounded-md">
                HERO PIECE
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-bold text-neutral-900">{completeLookMain.name}</h3>
              <p className="text-xs font-semibold text-neutral-800 mt-0.5">₹{(completeLookMain.salePrice ?? completeLookMain.price).toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Matched Complementary Pieces */}
          <div className="md:col-span-8 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
              Matched Atelier Complementary Pieces
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {completeLookMatchingProducts.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="group cursor-pointer space-y-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 hover:border-neutral-900 transition-all"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-200">
                    <img
                      src={p.images ? p.images[0] : p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 line-clamp-1">{p.name}</h5>
                    <p className="text-[11px] font-semibold text-neutral-700">₹{(p.salePrice ?? p.price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          10. STYLE JOURNAL TEASER
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">VS STYLE JOURNAL</h2>
            <p className="text-xs text-neutral-500 mt-1 font-medium">Stories on fabrics, capsule wardrobing, and garment care</p>
          </div>
          <Link to="/journal" className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline">
            Read All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'art-01',
              title: 'The Art of French Flax Linen: From Normandy to Tailoring',
              category: 'FABRIC & CRAFT',
              image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=85',
              excerpt: 'Why unbleached French flax linen provides unmatched breathability and thermal comfort in warm climates.'
            },
            {
              id: 'art-02',
              title: 'Building a 12-Piece Capsule Wardrobe with Structured Basics',
              category: 'STYLING GUIDE',
              image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=85',
              excerpt: 'How to combine relaxed linen shirts, selvedge denim, and unstructured blazers for 20+ distinct outfits.'
            },
            {
              id: 'art-03',
              title: 'Caring for Full-Grain Tuscan Leather: Conditioning & Patina',
              category: 'PRODUCT CARE',
              image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
              excerpt: 'Simple steps to preserve vegetable-tanned leather totes so they age gracefully over decades.'
            }
          ].map((art) => (
            <div key={art.id} className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xs flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-widest text-neutral-900 rounded-md">
                    {art.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-neutral-900 line-clamp-2 leading-snug group-hover:text-neutral-600 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-normal leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1">
                <Link to="/journal" className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          11. VS BRAND STORY SECTION
         ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 block">OUR PHILOSOPHY</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">Designed for Contemporary Living</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
            <Compass className="w-8 h-8 text-neutral-900 stroke-[1.5]" />
            <h3 className="text-lg font-bold text-neutral-900">Everyday Essentials</h3>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">
              "Designed to become part of your everyday wardrobe without artificial markups or fast-fashion waste."
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
            <ShieldCheck className="w-8 h-8 text-neutral-900 stroke-[1.5]" />
            <h3 className="text-lg font-bold text-neutral-900">Thoughtful Details</h3>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">
              "Pre-washed French linens, mother-of-pearl buttons, and double-stitched hems built for endurance."
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
            <Heart className="w-8 h-8 text-neutral-900 stroke-[1.5]" />
            <h3 className="text-lg font-bold text-neutral-900">Modern Living</h3>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">
              "Tactile knitwear, soft tailoring, and fine leatherwork bringing quiet luxury to your daily routine."
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/about"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-colors"
          >
            <span>Discover VS Story</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          12. NEWSLETTER SECTION
         ================================================== */}
      <Newsletter />

    </div>
  );
}
