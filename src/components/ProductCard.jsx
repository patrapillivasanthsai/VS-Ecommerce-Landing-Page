import React, { useState } from 'react';
import { Heart, Plus, Check, Eye } from 'lucide-react';

export default function ProductCard({ 
  product, 
  isWishlisted, 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView,
  onOpenDetail
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  // Image handling
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : (product.image || '');
  const hoverImage = product.images && product.images.length > 1 ? product.images[1] : (product.secondaryImage || mainImage);

  // Price handling
  const currentPrice = product.salePrice ?? product.price ?? 0;
  const originalPrice = product.originalPrice ?? null;
  const hasDiscount = originalPrice && originalPrice > currentPrice;
  const discountPercent = product.discountPercent ?? (hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : null);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(product);
    } else if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div 
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-200/50 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Main Product Image */}
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Badges Stack (Top Left) */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col space-y-1.5 pointer-events-none">
          {product.tag && (
            <span className="inline-block px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-md text-neutral-900 rounded-md shadow-xs">
              {product.tag}
            </span>
          )}
          {hasDiscount && (
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider bg-rose-900 text-white rounded-md shadow-xs">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Top Right Action Icons Stack */}
        <div className="absolute top-3.5 right-3.5 z-10 flex flex-col space-y-2">
          {/* Wishlist Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2.5 rounded-full transition-all duration-300 focus:outline-none shadow-xs ${
              isWishlisted 
                ? 'bg-neutral-900 text-rose-500 scale-105' 
                : 'bg-white/80 backdrop-blur-md text-neutral-700 hover:text-black hover:bg-white hover:scale-105'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : 'stroke-[1.75]'}`} />
          </button>

          {/* Quick View Button */}
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-neutral-700 hover:text-black hover:bg-white transition-all duration-300 focus:outline-none shadow-xs opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 hidden sm:flex items-center justify-center"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4 stroke-[1.75]" />
            </button>
          )}
        </div>

        {/* Add To Bag Slide-Up Bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 sm:group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className={`w-full py-3 px-4 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
              isAdded
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-neutral-900 text-white hover:bg-black shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag — ₹{currentPrice.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information Below Image */}
      <div className="mt-3.5 flex items-start justify-between px-1">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              {product.department ? `${product.department} / ${product.category}` : product.category}
            </span>
          </div>
          <h3 
            onClick={handleCardClick}
            className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
        </div>
        <div className="text-right shrink-0 pl-2">
          <span className="text-sm font-semibold text-neutral-900">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <div className="text-[11px] text-neutral-400 line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
