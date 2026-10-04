import React from 'react';
import { getProductsByIds } from '../data/fashionProducts';
import ProductCard from '../components/ProductCard';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const navigate = useNavigate();
  const wishlistProducts = getProductsByIds(wishlistIds);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">Your Saved Wishlist</h1>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
            {wishlistProducts.length === 1 ? '1 object saved' : `${wishlistProducts.length} objects saved`} in your persistent wishlist.
          </p>
        </div>
        <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:underline">
          Continue Shopping
        </Link>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 bg-neutral-50 dark:bg-[#18181C] rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400 dark:text-neutral-500">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">Your wishlist is empty</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Explore our fashion catalog and tap the heart icon on any product to save items for later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black dark:hover:bg-white transition-colors"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onOpenDetail={(p) => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
