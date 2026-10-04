import React from 'react';
import { LOOKBOOK_OUTFITS, getProductsByIds } from '../data/fashionProducts';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Layers } from 'lucide-react';

export default function LookbookPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-widest mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Atelier Styling 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900">
          Seasonal Lookbook
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
          Curated outfit compositions referencing our single-source product catalog. Explore complete looks and easily view individual items.
        </p>
      </div>

      {/* Outfits List */}
      <div className="space-y-20">
        {LOOKBOOK_OUTFITS.map((outfit, index) => {
          const outfitProducts = getProductsByIds(outfit.productIds);

          return (
            <div key={outfit.id} className="border-b border-neutral-200/80 pb-16 last:border-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Outfit Poster Image */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 relative shadow-xl">
                    <img
                      src={outfit.image}
                      alt={outfit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                        {outfit.season}
                      </span>
                      <h2 className="text-2xl font-black">{outfit.title}</h2>
                      <p className="text-xs text-neutral-300 font-normal leading-relaxed">
                        {outfit.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tagged Matched Products */}
                <div className={`lg:col-span-7 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center space-x-2 border-b border-neutral-200 pb-3">
                    <Layers className="w-4 h-4 text-neutral-900" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                      Pieces In This Look ({outfitProducts.length} Objects)
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {outfitProducts.map((product) => (
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
