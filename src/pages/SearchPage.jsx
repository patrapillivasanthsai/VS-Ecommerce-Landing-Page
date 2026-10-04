import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilterPanel from '../components/ProductFilterPanel';
import { FASHION_PRODUCTS } from '../data/fashionProducts';
import { filterAndSortProducts } from '../utils/filterEngine';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, RefreshCw, ArrowRight } from 'lucide-react';

export default function SearchPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
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
    const nextParams = new URLSearchParams();
    if (queryParam) nextParams.set('q', queryParam);
    setSearchParams(nextParams);
    setVisibleCount(12);
  };

  const currentFilters = {
    searchQuery: queryParam,
    department: departmentParam,
    category: categoryParam,
    priceRange: priceParam,
    size: sizeParam,
    color: colorParam,
    minDiscount: discountParam,
    minRating: ratingParam,
    sortBy: sortParam
  };

  // Search & Filter Results
  const searchResults = useMemo(() => {
    return filterAndSortProducts(FASHION_PRODUCTS, currentFilters);
  }, [queryParam, departmentParam, categoryParam, priceParam, sizeParam, colorParam, discountParam, ratingParam, sortParam]);

  const visibleProducts = searchResults.slice(0, visibleCount);
  const hasMore = visibleCount < searchResults.length;

  // Recommended products for empty state
  const recommendedProducts = FASHION_PRODUCTS.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search Header */}
      <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-900 block mb-1">SEARCH RESULTS</span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900">
            {queryParam ? `Search Results for "${queryParam}"` : 'All Search Results'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1 font-medium">
            {searchResults.length === 1 ? '1 product match' : `${searchResults.length} product matches`} found across the VS catalogue.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Showing {visibleProducts.length} of {searchResults.length} Results
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-neutral-100/80 p-4 rounded-2xl border border-neutral-200/80">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Refine Results</span>
        </button>

        <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-neutral-200 text-xs ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
          <span className="font-bold text-neutral-900 uppercase tracking-wider hidden sm:inline">Sort By:</span>
          <select
            value={sortParam}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="bg-transparent font-semibold text-neutral-800 focus:outline-none cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest Arrivals</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="discountHigh">Biggest Discount</option>
            <option value="ratingHigh">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex gap-8 items-start pb-16">
        
        {/* Filter Panel & Mobile Drawer Component */}
        <ProductFilterPanel
          filters={currentFilters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          productsContext={FASHION_PRODUCTS}
          totalResultsCount={searchResults.length}
          isMobileDrawerOpen={isMobileDrawerOpen}
          setIsMobileDrawerOpen={setIsMobileDrawerOpen}
        />

        {/* Results Grid / Empty State Column */}
        <div className="flex-1 space-y-8">
          
          {searchResults.length === 0 ? (
            /* Empty Search Results View */
            <div className="space-y-12">
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-neutral-300 p-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <Search className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-neutral-900">NO RESULTS FOUND FOR "{queryParam}"</h2>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                    We couldn't find any products matching your search term. Try checking spelling or explore our departments below.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setSearchParams({})}
                    className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
                  >
                    Clear Search Query
                  </button>
                  <Link
                    to="/women"
                    className="px-5 py-2.5 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 border border-neutral-200"
                  >
                    Browse Women
                  </Link>
                  <Link
                    to="/men"
                    className="px-5 py-2.5 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 border border-neutral-200"
                  >
                    Browse Men
                  </Link>
                  <Link
                    to="/accessories"
                    className="px-5 py-2.5 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 border border-neutral-200"
                  >
                    Browse Accessories
                  </Link>
                </div>
              </div>

              {/* Recommended Items Grid */}
              <div className="space-y-6 pt-6 border-t border-neutral-200">
                <div>
                  <h3 className="text-xl font-extrabold text-neutral-900">Recommended VS Essentials</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">Bestseller fashion objects for modern wardrobes</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {recommendedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isWishlisted={wishlistIds.includes(p.id)}
                      onToggleWishlist={onToggleWishlist}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                      onOpenDetail={(prod) => navigate(`/product/${prod.id}`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Results Grid */
            <>
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

              {hasMore && (
                <div className="text-center pt-8">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-8 py-3.5 bg-white border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-900 hover:text-white transition-all shadow-xs"
                  >
                    Load More Results ({searchResults.length - visibleCount} remaining)
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
