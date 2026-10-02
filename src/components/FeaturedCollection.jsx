import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCollection({ 
  products, 
  wishlistIds, 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Carry', 'Living', 'Objects'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="featured" className="py-20 lg:py-28 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-200/80">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400">
              Curated Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight">
              Featured <span className="font-serif italic font-normal">Collection</span>
            </h2>
            <p className="text-sm text-neutral-600 font-normal leading-relaxed">
              Discover pieces designed to fit effortlessly into your everyday routine.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-6 overflow-x-auto touch-pan-x pr-8 md:pr-0 pb-2 md:pb-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase font-semibold tracking-widest transition-all duration-200 py-1.5 relative focus:outline-none whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'text-neutral-900 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-16 text-center">
          <a
            href="#collections"
            className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-neutral-900 hover:text-neutral-600 transition-colors py-2 border-b border-neutral-900 hover:border-neutral-600"
          >
            <span>Explore All Series</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
