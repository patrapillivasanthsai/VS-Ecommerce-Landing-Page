import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlistProducts, 
  onRemoveWishlist, 
  onMoveToCart 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/60 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-vs-drawer-light dark:bg-vs-drawer-dark text-neutral-900 dark:text-neutral-100 shadow-2xl flex flex-col justify-between z-10 transform transition-transform duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-vs-border-light dark:border-vs-border-dark flex items-center justify-between bg-vs-surface-light dark:bg-vs-surface-dark">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-500 dark:text-neutral-400">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-200">Your wishlist is empty</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                  Save your favorite items here to review or add to your shopping bag anytime.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center px-6 py-2.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800 dark:hover:bg-white transition-colors"
                >
                  Discover Essentials
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => {
                const productImg = (product.images && product.images.length > 0) ? product.images[0] : (product.image || '');
                const productPrice = product.salePrice ?? product.price ?? 0;

                return (
                  <div key={product.id} className="flex space-x-4 py-3 border-b border-neutral-200/60 dark:border-neutral-800 last:border-0">
                    <img
                      src={productImg}
                      alt={product.name}
                      className="w-20 h-24 object-cover object-center rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{product.name}</h4>
                          <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 ml-2">₹{productPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">{product.category}</p>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <button
                          onClick={() => onMoveToCart(product)}
                          className="flex-1 py-2 px-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-black dark:hover:bg-white transition-colors flex items-center justify-center space-x-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => onRemoveWishlist(product)}
                          className="p-2 border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-800 rounded-lg transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 bg-neutral-100 dark:bg-[#18181C] border-t border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Items in your wishlist remain saved until removed.
          </div>

        </div>
      </div>
    </div>
  );
}
