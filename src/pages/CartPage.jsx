import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  calculateOrderSummary, 
  getSessionCoupon, 
  setSessionCoupon 
} from '../utils/orderSummary';
import OrderSummaryBox from '../components/OrderSummaryBox';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Heart, 
  Check, 
  Sparkles 
} from 'lucide-react';

export default function CartPage({ 
  cartItems = [], 
  wishlistIds = [],
  onUpdateQuantity, 
  onRemoveItem,
  onMoveWishlistToCart,
  onToggleWishlist,
  showToast
}) {
  const navigate = useNavigate();
  const [activeCouponCode, setActiveCouponCode] = useState(() => getSessionCoupon());

  useEffect(() => {
    if (cartItems.length === 0) {
      setActiveCouponCode(null);
      setSessionCoupon(null);
    }
  }, [cartItems]);

  const summary = calculateOrderSummary(cartItems, activeCouponCode);

  const getItemPrice = (item) => item.salePrice ?? item.price ?? 0;
  const getItemMrp = (item) => item.originalPrice ?? getItemPrice(item);
  const getItemImage = (item) => (item.images && item.images.length > 0) ? item.images[0] : (item.image || '');
  const getItemKey = (item) => item.variantKey || item.id;

  const handleApplyCoupon = (code) => {
    const res = calculateOrderSummary(cartItems, code);
    if (res.couponError) {
      if (showToast) showToast(res.couponError, 'info');
    } else if (res.appliedCoupon) {
      setActiveCouponCode(res.appliedCoupon.code);
      setSessionCoupon(res.appliedCoupon.code);
      if (showToast) showToast(`Coupon ${res.appliedCoupon.code} applied successfully!`, 'info');
    }
  };

  const handleRemoveCoupon = () => {
    setActiveCouponCode(null);
    setSessionCoupon(null);
    if (showToast) showToast('Coupon code removed.', 'info');
  };

  const handleMoveToWishlist = (item) => {
    if (!item) return;
    const itemKey = getItemKey(item);
    
    // Add to wishlist if not present
    if (!wishlistIds.includes(item.id)) {
      onToggleWishlist(item);
    }
    // Remove from cart
    onRemoveItem(itemKey);
    if (showToast) showToast(`Moved "${item.name}" to saved wishlist.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-neutral-900" />
            <h1 className="text-3xl font-black text-neutral-900">Your Shopping Bag</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1 font-medium">
            {summary.totalItems === 1 ? '1 object' : `${summary.totalItems} objects`} in your bag.
          </p>
        </div>
        <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline">
          Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart View */
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-300 space-y-6 max-w-xl mx-auto p-8 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-neutral-900 uppercase">YOUR BAG IS EMPTY</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              Discover structured fashion pieces designed for your everyday wardrobe.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/women"
              className="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
            >
              Shop Women
            </Link>
            <Link
              to="/men"
              className="w-full sm:w-auto px-6 py-3 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors border border-neutral-200"
            >
              Shop Men
            </Link>
            <Link
              to="/accessories"
              className="w-full sm:w-auto px-6 py-3 bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors border border-neutral-200"
            >
              Explore Accessories
            </Link>
          </div>
        </div>
      ) : (
        /* Active Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Shopping Bag Items (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cartItems.map((item) => {
              const itemKey = getItemKey(item);
              const salePrice = getItemPrice(item);
              const mrpPrice = getItemMrp(item);
              const img = getItemImage(item);
              const hasDiscount = mrpPrice > salePrice;
              const discountPercent = item.discountPercent || (hasDiscount ? Math.round(((mrpPrice - salePrice) / mrpPrice) * 100) : 0);

              return (
                <div key={itemKey} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 p-5 bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:border-neutral-400 transition-all">
                  
                  {/* Thumbnail Image */}
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={img}
                      alt={item.name}
                      className="w-full sm:w-28 h-36 object-cover object-center rounded-2xl bg-neutral-100"
                    />
                  </Link>

                  {/* Information & Actions */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                            {item.department ? `${item.department} / ${item.category}` : item.category}
                          </span>
                          <h3 className="text-base font-bold text-neutral-900 hover:text-neutral-600 transition-colors">
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </h3>
                        </div>

                        {/* Price Display */}
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-base font-black text-neutral-900">
                            ₹{(salePrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {hasDiscount && (
                            <div className="text-xs text-neutral-400 line-through">
                              ₹{(mrpPrice * item.quantity).toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Variant Badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-neutral-600">
                        {item.selectedSize && (
                          <span className="px-2.5 py-0.5 bg-neutral-100 rounded-md font-semibold text-neutral-800 border border-neutral-200">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="flex items-center space-x-1 px-2.5 py-0.5 bg-neutral-100 rounded-md font-semibold text-neutral-800 border border-neutral-200">
                            <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: item.selectedColor.hex || '#000' }} />
                            <span>{item.selectedColor.name || item.selectedColor}</span>
                          </span>
                        )}
                        {hasDiscount && (
                          <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded">
                            -{discountPercent}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Item Actions Toolbar */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50">
                        <button
                          onClick={() => onUpdateQuantity(itemKey, item.quantity - 1)}
                          className="p-2 text-neutral-600 hover:text-black focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(itemKey, item.quantity + 1)}
                          className="p-2 text-neutral-600 hover:text-black focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Move to Wishlist & Delete Action */}
                      <div className="flex items-center space-x-3 text-xs font-semibold text-neutral-500">
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="hover:text-neutral-900 flex items-center space-x-1 transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span className="hidden sm:inline">Move to Wishlist</span>
                        </button>

                        <button
                          onClick={() => onRemoveItem(itemKey)}
                          className="hover:text-rose-600 flex items-center space-x-1 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Order Summary & Coupon Box (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <OrderSummaryBox
              summary={summary}
              appliedCouponInput={activeCouponCode}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              onPrimaryAction={() => navigate('/checkout')}
              primaryActionLabel="Proceed to Checkout"
            />
          </div>

        </div>
      )}
    </div>
  );
}
