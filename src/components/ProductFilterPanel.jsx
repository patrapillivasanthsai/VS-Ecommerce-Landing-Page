import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, ArrowUpDown, Check, RefreshCw } from 'lucide-react';
import { extractAvailableFacetOptions } from '../utils/filterEngine';

export default function ProductFilterPanel({
  filters,
  onFilterChange,
  onResetFilters,
  productsContext = [],
  totalResultsCount = 0,
  isMobileDrawerOpen,
  setIsMobileDrawerOpen
}) {
  const [openSection, setOpenSection] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
    discount: true,
    rating: true
  });

  const toggleSection = (key) => {
    setOpenSection(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const facetOptions = extractAvailableFacetOptions(productsContext);

  // Active filter count calculation
  let activeCount = 0;
  if (filters.category && filters.category !== 'all') activeCount++;
  if (filters.priceRange && filters.priceRange !== 'all') activeCount++;
  if (filters.size && filters.size !== 'all') activeCount++;
  if (filters.color && filters.color !== 'all') activeCount++;
  if (filters.minDiscount && filters.minDiscount > 0) activeCount++;
  if (filters.minRating && filters.minRating > 0) activeCount++;

  const renderFilterControls = () => (
    <div className="space-y-6 text-xs text-neutral-800">
      
      {/* Category Accordion */}
      <div className="border-b border-neutral-200 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider py-1 text-neutral-900"
        >
          <span>Category</span>
          {openSection.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSection.category && (
          <div className="mt-3 space-y-1.5 pl-1 max-h-48 overflow-y-auto pr-1 scrollbar-none">
            {['all', 'Shirts', 'T-Shirts', 'Trousers', 'Denim', 'Jackets', 'Dresses', 'Tops', 'Kurtas', 'Ethnic', 'Outerwear', 'Bags', 'Wallets', 'Belts', 'Footwear', 'Jewellery', 'Watches', 'Sunglasses', 'Scarves', 'Sets'].map((cat) => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:text-black py-0.5">
                <input
                  type="radio"
                  name="category"
                  checked={(filters.category || 'all').toLowerCase() === cat.toLowerCase()}
                  onChange={() => onFilterChange('category', cat)}
                  className="accent-neutral-900 cursor-pointer"
                />
                <span className="font-medium">{cat === 'all' ? 'All Categories' : cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Accordion */}
      <div className="border-b border-neutral-200 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider py-1 text-neutral-900"
        >
          <span>Price Range</span>
          {openSection.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSection.price && (
          <div className="mt-3 space-y-1.5 pl-1">
            {[
              { id: 'all', label: 'All Prices' },
              { id: 'under1000', label: 'Under ₹1,000' },
              { id: '1000to2499', label: '₹1,000 – ₹2,499' },
              { id: '2500to4999', label: '₹2,500 – ₹4,999' },
              { id: 'above5000', label: '₹5,000+' }
            ].map((p) => (
              <label key={p.id} className="flex items-center space-x-2 cursor-pointer hover:text-black py-0.5">
                <input
                  type="radio"
                  name="priceRange"
                  checked={(filters.priceRange || 'all') === p.id}
                  onChange={() => onFilterChange('priceRange', p.id)}
                  className="accent-neutral-900 cursor-pointer"
                />
                <span className="font-medium">{p.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Accordion */}
      {facetOptions.sizes.length > 0 && (
        <div className="border-b border-neutral-200 pb-4">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between font-bold uppercase tracking-wider py-1 text-neutral-900"
          >
            <span>Size</span>
            {openSection.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {openSection.size && (
            <div className="mt-3 flex flex-wrap gap-1.5 pl-1">
              <button
                onClick={() => onFilterChange('size', 'all')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border ${
                  (filters.size || 'all') === 'all' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-200'
                }`}
              >
                All
              </button>
              {facetOptions.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => onFilterChange('size', s)}
                  className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border ${
                    filters.size === s ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Colour Accordion */}
      {facetOptions.colors.length > 0 && (
        <div className="border-b border-neutral-200 pb-4">
          <button
            onClick={() => toggleSection('color')}
            className="w-full flex items-center justify-between font-bold uppercase tracking-wider py-1 text-neutral-900"
          >
            <span>Colour</span>
            {openSection.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {openSection.color && (
            <div className="mt-3 flex flex-wrap gap-2 pl-1">
              <button
                onClick={() => onFilterChange('color', 'all')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${
                  (filters.color || 'all') === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                All Colours
              </button>
              {facetOptions.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => onFilterChange('color', c.name)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-md border transition-all ${
                    filters.color === c.name ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 bg-white text-neutral-800'
                  }`}
                  title={c.name}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Discount Accordion */}
      <div className="border-b border-neutral-200 pb-4">
        <button
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider py-1 text-neutral-900"
        >
          <span>Minimum Discount</span>
          {openSection.discount ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSection.discount && (
          <div className="mt-3 space-y-1.5 pl-1">
            {[
              { val: 0, label: 'All Discounts' },
              { val: 10, label: '10% OFF & above' },
              { val: 20, label: '20% OFF & above' },
              { val: 30, label: '30% OFF & above' },
              { val: 40, label: '40% OFF & above' }
            ].map((d) => (
              <label key={d.val} className="flex items-center space-x-2 cursor-pointer hover:text-black py-0.5">
                <input
                  type="radio"
                  name="minDiscount"
                  checked={Number(filters.minDiscount || 0) === d.val}
                  onChange={() => onFilterChange('minDiscount', d.val)}
                  className="accent-neutral-900 cursor-pointer"
                />
                <span className="font-medium">{d.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Accordion */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-bold uppercase tracking-wider py-1 text-neutral-900"
        >
          <span>Customer Rating</span>
          {openSection.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSection.rating && (
          <div className="mt-3 space-y-1.5 pl-1">
            {[
              { val: 0, label: 'All Ratings' },
              { val: 4, label: '4★ & above' },
              { val: 3, label: '3★ & above' }
            ].map((r) => (
              <label key={r.val} className="flex items-center space-x-2 cursor-pointer hover:text-black py-0.5">
                <input
                  type="radio"
                  name="minRating"
                  checked={Number(filters.minRating || 0) === r.val}
                  onChange={() => onFilterChange('minRating', r.val)}
                  className="accent-neutral-900 cursor-pointer"
                />
                <span className="font-medium">{r.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Active Filter Chips Bar */}
      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-2xl border border-neutral-200/80 mb-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mr-1">
            Active Filters ({activeCount}):
          </span>

          {filters.category && filters.category !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-lg">
              <span>Category: {filters.category}</span>
              <button onClick={() => onFilterChange('category', 'all')} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.priceRange && filters.priceRange !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-lg">
              <span>Price Range</span>
              <button onClick={() => onFilterChange('priceRange', 'all')} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.size && filters.size !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-lg">
              <span>Size: {filters.size}</span>
              <button onClick={() => onFilterChange('size', 'all')} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.color && filters.color !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-lg">
              <span>Color: {filters.color}</span>
              <button onClick={() => onFilterChange('color', 'all')} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minDiscount > 0 && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-lg">
              <span>{filters.minDiscount}%+ OFF</span>
              <button onClick={() => onFilterChange('minDiscount', 0)} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-lg">
              <span>{filters.minRating}★+ Rating</span>
              <button onClick={() => onFilterChange('minRating', 0)} className="hover:text-rose-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-rose-700 hover:underline ml-auto flex items-center space-x-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* Desktop Left-Side Filter Panel */}
      <div className="hidden lg:block w-64 shrink-0 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs h-fit">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-neutral-900" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Filter Products</h3>
          </div>
          {activeCount > 0 && (
            <button onClick={onResetFilters} className="text-[10px] font-bold text-rose-700 hover:underline">
              Reset
            </button>
          )}
        </div>
        {renderFilterControls()}
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs" onClick={() => setIsMobileDrawerOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#FAF9F5] shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-[#FAF9F5] z-10">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-neutral-900" />
                  <h3 className="text-base font-bold text-neutral-900">Filter Catalogue ({activeCount})</h3>
                </div>
                <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 text-neutral-500 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1">
                {renderFilterControls()}
              </div>

              <div className="p-6 border-t border-neutral-200 bg-white sticky bottom-0 flex gap-3">
                <button
                  onClick={() => {
                    onResetFilters();
                    setIsMobileDrawerOpen(false);
                  }}
                  className="flex-1 py-3 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl border border-neutral-200"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-1 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg"
                >
                  Apply ({totalResultsCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
