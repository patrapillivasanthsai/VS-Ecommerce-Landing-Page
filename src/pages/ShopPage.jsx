import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilterPanel from '../components/ProductFilterPanel';
import { FASHION_PRODUCTS, DEPARTMENTS } from '../data/fashionProducts';
import { filterAndSortProducts } from '../utils/filterEngine';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowUpDown, Filter, Sparkles, RefreshCw, ShoppingBag } from 'lucide-react';

export default function ShopPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query state
  const departmentParam = searchParams.get('department') || 'all';
  const categoryParam = searchParams.get('category') || 'all';
  const priceParam = searchParams.get('priceRange') || 'all';
  const sizeParam = searchParams.get('size') || 'all';
  const colorParam = searchParams.get('color') || 'all';
  const discountParam = Number(searchParams.get('minDiscount') || 0);
  const ratingParam = Number(searchParams.get('minRating') || 0);
  const sortParam = searchParams.get('sortBy') || 'recommended';

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync state to URL search parameters
  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === 'all' || value === 0 || !value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams);
    setVisibleCount(12);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setVisibleCount(12);
  };

  const currentFilters = {
    department: departmentParam,
    category: categoryParam,
    priceRange: priceParam,
    size: sizeParam,
    color: colorParam,
    minDiscount: discountParam,
    minRating: ratingParam,
    sortBy: sortParam
  };

  // Filter & Sort Catalogue
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(FASHION_PRODUCTS, currentFilters);
  }, [departmentParam, categoryParam, priceParam, sizeParam, colorParam, discountParam, ratingParam, sortParam]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-400 block mb-1">VS SHOP CATALOGUE</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
            Complete Fashion Collection
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-xl font-medium">
            Discover tailored silhouettes across Men, Women, Kids, and Accessories. Crafted from French flax linen, organic cotton, and Tuscan calfskin.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Showing {visibleProducts.length} of {filteredProducts.length} Objects
          </span>
        </div>
      </div>

      {/* Department Navigation Quick Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.id}
            onClick={() => handleFilterChange('department', dept.id)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${
              departmentParam === dept.id
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
            }`}
          >
            {dept.name}
          </button>
        ))}
      </div>

      {/* Toolbar: Sort Selector & Mobile Filter Button */}
      <div className="flex items-center justify-between gap-4 bg-neutral-100/80 dark:bg-neutral-900/80 p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800">
        
        {/* Mobile Filter Drawer Trigger */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filter & Refine</span>
        </button>

        {/* Sort Selector Dropdown */}
        <div className="flex items-center space-x-2 bg-white dark:bg-neutral-900 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
          <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider hidden sm:inline">Sort By:</span>
          <select
            value={sortParam}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="bg-transparent font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
          >
            <option value="recommended" className="dark:bg-neutral-900">Recommended</option>
            <option value="newest" className="dark:bg-neutral-900">Newest Arrivals</option>
            <option value="priceLow" className="dark:bg-neutral-900">Price: Low to High</option>
            <option value="priceHigh" className="dark:bg-neutral-900">Price: High to Low</option>
            <option value="discountHigh" className="dark:bg-neutral-900">Biggest Discount</option>
            <option value="ratingHigh" className="dark:bg-neutral-900">Highest Customer Rating</option>
          </select>
        </div>

      </div>

      {/* Main Grid & Filter Panel Layout */}
      <div className="flex gap-8 items-start">
        
        {/* Desktop Filter Panel & Mobile Drawer Component */}
        <ProductFilterPanel
          filters={currentFilters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          productsContext={FASHION_PRODUCTS}
          totalResultsCount={filteredProducts.length}
          isMobileDrawerOpen={isMobileDrawerOpen}
          setIsMobileDrawerOpen={setIsMobileDrawerOpen}
        />

        {/* Product Grid Column */}
        <div className="flex-1 space-y-8">
          
          {filteredProducts.length === 0 ? (
            /* Empty Filter Results State */
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-300 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Filter className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900">NO PRODUCTS MATCH THESE FILTERS</h2>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try adjusting your selected price ranges, sizes, colors, or categories to view available fashion objects.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            </div>
          ) : (
            <>
              {/* Product Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
                {visibleProducts.map((product) => (
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

              {/* Load More Pagination */}
              {hasMore && (
                <div className="text-center pt-8">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-8 py-3.5 bg-white border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-900 hover:text-white transition-all shadow-xs"
                  >
                    Load More Objects ({filteredProducts.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}
