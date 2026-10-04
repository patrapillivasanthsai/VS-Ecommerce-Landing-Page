import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { ArrowRight, X } from 'lucide-react';
import { COLLECTIONS } from '../data/products';

export default function FeaturedCollection({ 
  products, 
  wishlistIds, 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView,
  selectedCollectionId,
  onClearCollection
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Carry', 'Living', 'Objects'];

  const selectedCollection = COLLECTIONS.find(c => c.id === selectedCollectionId);

  // Filter products by collection first if a collection is selected
  let collectionFilteredProducts = selectedCollectionId 
    ? products.filter(p => p.collections && p.collections.includes(selectedCollectionId))
    : products;

  // Then filter by category
  const filteredProducts = activeCategory === 'All' 
    ? collectionFilteredProducts 
    : collectionFilteredProducts.filter(p => p.category === activeCategory);

  return (
    <section id="featured" className="py-20 lg:py-28 bg-[#FAF9F5] dark:bg-[#0F0F12] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
          
          {selectedCollection ? (
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center space-x-3">
                <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-900 dark:text-neutral-100 bg-neutral-200/80 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                  {selectedCollection.itemCount} Objects
                </span>
                <button
                  onClick={onClearCollection}
                  className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center space-x-1 underline underline-offset-4 transition-colors"
                >
                  <span>Show All Products</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 dark:text-neutral-100 tracking-tight">
                {selectedCollection.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                {selectedCollection.subtitle}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
                Curated Selection
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 dark:text-neutral-100 tracking-tight">
                Featured <span className="font-serif italic font-normal text-neutral-900 dark:text-amber-300">Collection</span>
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                Discover pieces designed to fit effortlessly into your everyday routine.
              </p>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-6 overflow-x-auto touch-pan-x pr-8 md:pr-0 pb-2 md:pb-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase font-semibold tracking-widest transition-all duration-200 py-1.5 relative focus:outline-none whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'text-neutral-900 dark:text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-neutral-900 dark:after:bg-amber-400'
                    : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              No products found matching "{activeCategory}" in this collection.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-xs uppercase font-bold text-neutral-900 dark:text-neutral-100 underline underline-offset-4"
            >
              Reset Category Filter
            </button>
          </div>
        ) : (
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
        )}

        {/* Bottom Link */}
        <div className="mt-16 text-center">
          {selectedCollection ? (
            <button
              onClick={onClearCollection}
              className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-amber-300 transition-colors py-2 border-b border-neutral-900 dark:border-neutral-100 hover:border-neutral-600 dark:hover:border-amber-300"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <a
              href="#collections"
              className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-amber-300 transition-colors py-2 border-b border-neutral-900 dark:border-neutral-100 hover:border-neutral-600 dark:hover:border-amber-300"
            >
              <span>Explore All Series</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
