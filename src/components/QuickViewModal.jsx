import React, { useState } from 'react';
import { X, Heart, Plus, Minus, Check, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function QuickViewModal({ 
  product, 
  onClose, 
  isWishlisted, 
  onToggleWishlist, 
  onAddToCart 
}) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [isAdded, setIsAdded] = useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
    }
  }, [product?.id]);

  const images = [product.image, product.secondaryImage].filter(Boolean);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#FAF9F5] rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 border border-neutral-200/80 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-neutral-800 hover:text-black hover:bg-white transition-all shadow-sm focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Images Gallery */}
          <div className="p-6 bg-neutral-100 flex flex-col justify-between">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-xs relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-wider rounded-full">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex space-x-3 mt-4 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-neutral-900 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  VS / {product.category}
                </span>

                {/* Rating */}
                <div className="flex items-center space-x-1 text-amber-600 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                {product.name}
              </h2>

              <div className="text-2xl font-semibold text-neutral-900">
                ${product.price}
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Specification Bullet Points */}
              {product.details && (
                <div className="pt-2 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Product Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-600 list-disc list-inside">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Controls */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              
              <div className="flex items-center space-x-4">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-neutral-600 hover:text-black focus:outline-none"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-neutral-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-600 hover:text-black focus:outline-none"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWishlisted 
                      ? 'border-rose-500 bg-rose-50 text-rose-600' 
                      : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAdd}
                className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
                  isAdded 
                    ? 'bg-emerald-700 text-white' 
                    : 'bg-neutral-900 text-white hover:bg-black'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                )}
              </button>

              {/* Shipping info micro banner */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-neutral-500 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Free Express</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  <span>2-Yr Warranty</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
