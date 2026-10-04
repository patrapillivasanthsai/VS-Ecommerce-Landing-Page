import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilterPanel from '../components/ProductFilterPanel';
import { FASHION_PRODUCTS, DEPARTMENTS } from '../data/fashionProducts';
import { filterAndSortProducts } from '../utils/filterEngine';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowUpDown, Filter, Sparkles, RefreshCw } from 'lucide-react';

export default function DepartmentPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const { deptId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const departmentId = deptId ? deptId.toLowerCase() : 'men';

  const categoryParam = searchParams.get('category') || 'all';
  const priceParam = searchParams.get('priceRange') || 'all';
  const sizeParam = searchParams.get('size') || 'all';
  const colorParam = searchParams.get('color') || 'all';
  const discountParam = Number(searchParams.get('minDiscount') || 0);
  const ratingParam = Number(searchParams.get('minRating') || 0);
  const sortParam = searchParams.get('sortBy') || 'recommended';

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const deptMeta = DEPARTMENTS.find(d => d.id === departmentId) || {
    name: departmentId.toUpperCase(),
    tagline: `Curated fashion collection for ${departmentId}`,
    bannerImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1600&q=85'
  };

  // Sync filter change to URL query params
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
    department: departmentId,
    category: categoryParam,
    priceRange: priceParam,
    size: sizeParam,
    color: colorParam,
    minDiscount: discountParam,
    minRating: ratingParam,
    sortBy: sortParam
  };

  // Extract products in this department
  const deptProductsAll = useMemo(() => {
    return FASHION_PRODUCTS.filter(p => p.department === departmentId);
  }, [departmentId]);

  // Subcategories present in this department
  const deptSubcategories = useMemo(() => {
    const set = new Set();
    deptProductsAll.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [deptProductsAll]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(FASHION_PRODUCTS, currentFilters);
  }, [departmentId, categoryParam, priceParam, sizeParam, colorParam, discountParam, ratingParam, sortParam]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="space-y-10">
      
      {/* Department Hero Banner */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-900">
        <img
          src={deptMeta.bannerImage}
          alt={deptMeta.name}
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 text-white">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-amber-300 w-fit mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{deptProductsAll.length} Objects Available</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            {deptMeta.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-lg font-medium">
            {deptMeta.tagline}
          </p>
        </div>
      </div>

      {/* Subcategory Pills & Filters Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Subcategory Navigation Pills */}
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {deptSubcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => handleFilterChange('category', subcat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${
                  categoryParam.toLowerCase() === subcat.toLowerCase()
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200/80'
                }`}
              >
                {subcat === 'all' ? `All ${deptMeta.name}` : subcat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-neutral-200 text-xs shrink-0 self-start sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortParam}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer"
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

        {/* Mobile Filter Button Bar */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter {deptMeta.name}</span>
          </button>

          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {filteredProducts.length} Objects Found
          </span>
        </div>

        {/* Main Grid & Filter Panel Layout */}
        <div className="flex gap-8 items-start pb-16">
          
          {/* Filter Panel & Mobile Drawer Component */}
          <ProductFilterPanel
            filters={currentFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            productsContext={deptProductsAll}
            totalResultsCount={filteredProducts.length}
            isMobileDrawerOpen={isMobileDrawerOpen}
            setIsMobileDrawerOpen={setIsMobileDrawerOpen}
          />

          {/* Product Grid */}
          <div className="flex-1 space-y-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-300 p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <Filter className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-bold text-neutral-900">NO OBJECTS MATCH THESE FILTERS</h2>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your filter options to view available objects in {deptMeta.name}.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Clear Department Filters</span>
                </button>
              </div>
            ) : (
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
                      Load More Objects ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
