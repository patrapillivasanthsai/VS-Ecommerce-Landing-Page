import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  getProductById, 
  addRecentlyViewedId, 
  getRecentlyViewedProducts,
  createCartLineItem 
} from '../data/fashionProducts';
import { getDemoReviewsForProduct, addDemoReview } from '../data/reviews';
import { getRelatedProducts, getCompleteTheLookProducts } from '../utils/recommendations';
import ProductCard from '../components/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ArrowRight,
  Plus,
  Minus,
  X,
  Maximize2,
  Ruler,
  MessageSquare,
  Clock,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

export default function ProductDetailPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView,
  showToast 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = getProductById(id);

  // Core Product Specs & Variant States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);

  // Modals & Drawers
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isDemoReviewModalOpen, setIsDemoReviewModalOpen] = useState(false);

  // Demo Reviews State & Filters
  const [demoReviews, setDemoReviews] = useState([]);
  const [reviewSortBy, setReviewSortBy] = useState('recent'); // 'recent' | 'highest' | 'lowest'
  const [reviewRatingFilter, setReviewRatingFilter] = useState(0); // 0 = all, 1-5 = specific star rating

  // Demo Review Form Input State
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    name: '',
    comment: ''
  });
  const [reviewFormError, setReviewFormError] = useState('');

  // On Product Load / Route Change: Sync recently viewed & default selections
  useEffect(() => {
    if (product) {
      document.title = `VS — ${product.name}`;
      addRecentlyViewedId(product.id);
      setSelectedImageIndex(0);

      // Default Size selection
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize('One Size');
      }

      // Default Color selection
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor({ name: 'Standard', hex: '#121212' });
      }

      setQuantity(1);
      setDemoReviews(getDemoReviewsForProduct(product.id));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-800">Object Not Found</h2>
        <p className="text-xs text-neutral-500">The fashion object you requested does not exist or has been archived.</p>
        <Link to="/shop" className="inline-block px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Related & Recommendation Collections
  const relatedProducts = getRelatedProducts(product, 4);
  const completeLookProducts = getCompleteTheLookProducts(product, 4);
  const recentlyViewedProducts = getRecentlyViewedProducts().filter(p => p.id !== product.id);

  // Calculated Product Price Metrics
  const isWishlisted = wishlistIds.includes(product.id);
  const imageList = product.images && product.images.length > 0 ? product.images : [product.image];
  const mainImage = imageList[selectedImageIndex] || imageList[0];
  const currentPrice = product.salePrice ?? product.price ?? 0;
  const originalPrice = product.originalPrice ?? null;
  const hasDiscount = originalPrice && originalPrice > currentPrice;
  const discountPercent = product.discountPercent ?? (hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : null);

  const requiresSizeSelection = product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size';
  const standardSizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const displaySizes = requiresSizeSelection 
    ? (product.sizes.every(s => standardSizeOptions.includes(s)) ? standardSizeOptions : product.sizes)
    : [];

  // Cart & Buy Actions
  const handleAddVariantToCart = () => {
    const lineItem = createCartLineItem(product, selectedSize, selectedColor, quantity);
    if (lineItem) {
      onAddToCart(lineItem, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1800);
    }
  };

  const handleBuyNow = () => {
    const lineItem = createCartLineItem(product, selectedSize, selectedColor, quantity);
    if (lineItem) {
      onAddToCart(lineItem, quantity);
      navigate('/cart');
    }
  };

  // Add Complete Look to Bag
  const handleAddLookToBag = () => {
    if (!completeLookProducts || completeLookProducts.length === 0) return;
    
    // Add current main product
    const mainItem = createCartLineItem(product, selectedSize, selectedColor, 1);
    if (mainItem) onAddToCart(mainItem, 1);

    // Add each complete look item
    completeLookProducts.forEach(lookItem => {
      const itemSize = lookItem.sizes && lookItem.sizes.length > 0 ? lookItem.sizes[0] : 'One Size';
      const itemColor = lookItem.colors && lookItem.colors.length > 0 ? lookItem.colors[0] : { name: 'Standard', hex: '#121212' };
      const lineItem = createCartLineItem(lookItem, itemSize, itemColor, 1);
      if (lineItem) onAddToCart(lineItem, 1);
    });

    if (showToast) {
      showToast(`Added Complete Look (${completeLookProducts.length + 1} items) to your bag.`, 'cart');
    }
  };

  // Filter & Sort Demo Reviews
  const filteredSortedReviews = useMemo(() => {
    let list = [...demoReviews];

    if (reviewRatingFilter > 0) {
      list = list.filter(r => r.rating === reviewRatingFilter);
    }

    if (reviewSortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (reviewSortBy === 'lowest') {
      list.sort((a, b) => a.rating - b.rating);
    }
    // Default 'recent' maintains list order

    return list;
  }, [demoReviews, reviewRatingFilter, reviewSortBy]);

  // Demo Review Submission
  const handleDemoReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
      setReviewFormError('Please complete both the review title and review comment.');
      return;
    }

    const created = addDemoReview({
      productId: product.id,
      rating: reviewForm.rating,
      title: reviewForm.title,
      name: reviewForm.name || 'Sample Visitor',
      comment: reviewForm.comment
    });

    if (created) {
      setDemoReviews(getDemoReviewsForProduct(product.id));
      setIsDemoReviewModalOpen(false);
      setReviewForm({ rating: 5, title: '', name: '', comment: '' });
      setReviewFormError('');
      if (showToast) {
        showToast('Demo review added locally.', 'info');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
        <Link to="/" className="hover:text-black dark:hover:text-white">Home</Link>
        <span>/</span>
        <Link to={`/${product.department}`} className="hover:text-black dark:hover:text-white uppercase">{product.department}</Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-neutral-100 font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Left Column: Image Gallery & Lightbox Trigger */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails Stack */}
          {imageList.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0 scrollbar-none">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx ? 'border-neutral-900 dark:border-neutral-100 scale-105 shadow-xs' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`Select product image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Featured Main Image View */}
          <div className="flex-1 aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative shadow-xs group">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover object-center cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
            />
            
            {/* Tag & Discount Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
              {product.tag && (
                <span className="px-3 py-1 bg-white/95 dark:bg-[#18181C]/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-neutral-900 dark:text-neutral-100 rounded-lg shadow-xs">
                  {product.tag}
                </span>
              )}
            </div>

            {hasDiscount && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-rose-900 text-white text-[10px] uppercase font-bold tracking-widest rounded-lg shadow-xs">
                -{discountPercent}% OFF
              </span>
            )}

            {/* Mobile Image Counter & Zoom Indicator */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono rounded-full">
                {selectedImageIndex + 1} / {imageList.length}
              </span>
              <button
                onClick={() => setIsZoomOpen(true)}
                className="p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-full text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white focus:outline-none hidden sm:flex items-center justify-center"
                title="Enlarge Image"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Product Specs, Variants, Purchase & Trust */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Specs */}
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
              {product.department} / {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mt-1">
              {product.name}
            </h1>

            {/* Rating Summary (No Verified Claims) */}
            <div className="flex items-center space-x-2 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{product.rating}</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="flex items-baseline space-x-3 p-4 bg-neutral-100/60 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60">
            <span className="text-3xl font-black text-neutral-900 dark:text-neutral-100">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <>
                <span className="text-base text-neutral-400 dark:text-neutral-500 line-through font-medium">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded">
                  Save ₹{(originalPrice - currentPrice).toLocaleString('en-IN')}
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
            {product.description}
          </p>

          {/* Colour Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                  Colour: <span className="font-normal text-neutral-600 dark:text-neutral-400">{selectedColor ? selectedColor.name : ''}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 p-0.5 transition-all focus:outline-none ${
                      selectedColor?.name === color.name ? 'border-neutral-900 dark:border-neutral-100 scale-110 shadow-xs' : 'border-transparent hover:scale-105'
                    }`}
                    title={color.name}
                  >
                    <span className="block w-full h-full rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector with Disabled Out-of-Stock Variants */}
          {requiresSizeSelection && (
            <div className="space-y-2.5 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                  Select Size: <span className="font-normal text-neutral-600 dark:text-neutral-400">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white font-semibold flex items-center space-x-1 underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {displaySizes.map((size) => {
                  const isAvailable = product.sizes.includes(size);
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                        !isAvailable
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 border-neutral-200 dark:border-neutral-700 line-through cursor-not-allowed opacity-50'
                          : selectedSize === size
                          ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-xs'
                          : 'bg-white dark:bg-[#18181C] text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fit & Specifications Pill */}
          {product.fit && (
            <div className="flex items-center space-x-2 text-xs text-neutral-600 dark:text-neutral-400 pt-1">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">FIT:</span>
              <span className="px-2.5 py-0.5 bg-neutral-200/60 dark:bg-neutral-800 rounded text-neutral-800 dark:text-neutral-200 font-medium">
                {product.fit}
              </span>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Quantity</span>
            <div className="inline-flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-[#18181C]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white focus:outline-none"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-bold text-neutral-900 dark:text-neutral-100">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white focus:outline-none"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Purchase CTA Buttons */}
          <div className="space-y-3 pt-4">
            <div className="flex space-x-3">
              <button
                onClick={handleAddVariantToCart}
                className={`flex-1 py-4 px-6 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-black dark:hover:bg-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                    <span>Add to Bag — ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-4 rounded-xl border transition-all focus:outline-none shadow-xs ${
                  isWishlisted
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-rose-500 border-neutral-900 dark:border-neutral-100'
                    : 'bg-white dark:bg-[#18181C] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : 'stroke-[1.75]'}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-white dark:bg-[#18181C] border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Restrained Trust & Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-start space-x-2.5 p-3 bg-neutral-100/60 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60">
              <Truck className="w-4 h-4 text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 uppercase">FREE SHIPPING</h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">On orders over ₹2,999</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-3 bg-neutral-100/60 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60">
              <RotateCcw className="w-4 h-4 text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 uppercase">EASY EXCHANGES</h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Easy size exchange policy</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-3 bg-neutral-100/60 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60">
              <ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 uppercase">SECURE CHECKOUT</h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Demo checkout experience</p>
              </div>
            </div>
          </div>

          {/* Expandable Product Information Accordions */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-3">
            {[
              { id: 'details', label: 'Details & Specifications', content: product.details ? product.details.join(' • ') : product.description },
              { id: 'material', label: 'Material & Garment Care', content: `${product.material || '100% Premium Fabrics'}. ${product.care || 'Gentle machine wash cold.'}` },
              { id: 'shipping', label: 'Shipping & Returns — Demo Information', content: 'Free standard delivery on orders over ₹2,999. Exchanges offered on eligible unworn items within 15 days.' }
            ].map((tab) => (
              <div key={tab.id} className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
                <button
                  onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 py-1"
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === tab.id && (
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed mt-2 pl-1">
                    {tab.content}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Complete the Look Section */}
      {completeLookProducts.length > 0 && (
        <section className="border-t border-neutral-200 dark:border-neutral-800 pt-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-400 block mb-1">STYLING SUGGESTIONS</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">COMPLETE THE LOOK</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">Curated pairings from the VS atelier</p>
            </div>
            <button
              onClick={handleAddLookToBag}
              className="px-5 py-2.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors flex items-center space-x-2 shrink-0"
            >
              <Layers className="w-4 h-4" />
              <span>Add Complete Look to Bag</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {completeLookProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isWishlisted={wishlistIds.includes(item.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onOpenDetail={(p) => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 pt-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-400 block mb-1">CUSTOMER FEEDBACK</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">CUSTOMER REVIEWS</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">Sample reviews shown for project demonstration.</p>
          </div>

          <button
            onClick={() => setIsDemoReviewModalOpen(true)}
            className="px-5 py-2.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors flex items-center space-x-2 self-start md:self-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write a Demo Review</span>
          </button>
        </div>

        {/* Rating Breakdown Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-[#18181C] p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          
          {/* Average Score Box */}
          <div className="md:col-span-4 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 pb-6 md:pb-0 md:pr-6">
            <span className="text-5xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">{product.rating}</span>
            <div className="flex items-center text-amber-400 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{product.reviewsCount} Total Reviews</span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 font-medium">Demo rating summary</span>
          </div>

          {/* Rating Distribution Visualizer */}
          <div className="md:col-span-8 space-y-2.5 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 block">
              Sample Rating Distribution
            </span>
            {[
              { stars: 5, percent: 82 },
              { stars: 4, percent: 12 },
              { stars: 3, percent: 4 },
              { stars: 2, percent: 1 },
              { stars: 1, percent: 1 }
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center space-x-3 text-xs">
                <span className="w-8 font-bold text-neutral-700 dark:text-neutral-300 flex items-center justify-end">
                  {bar.stars} <Star className="w-3 h-3 fill-neutral-700 dark:fill-neutral-300 ml-0.5" />
                </span>
                <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full" style={{ width: `${bar.percent}%` }} />
                </div>
                <span className="w-10 text-neutral-400 dark:text-neutral-500 text-right font-mono">{bar.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Filter & Sort Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-100/80 dark:bg-neutral-800/80 p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/80">
          
          {/* Star Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mr-1">Filter:</span>
            {[0, 5, 4, 3, 2, 1].map((ratingVal) => (
              <button
                key={ratingVal}
                onClick={() => setReviewRatingFilter(ratingVal)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  reviewRatingFilter === ratingVal
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                    : 'bg-white dark:bg-[#18181C] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                }`}
              >
                {ratingVal === 0 ? 'All Reviews' : `${ratingVal} ★`}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 bg-white dark:bg-[#18181C] px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs shrink-0">
            <span className="font-bold text-neutral-700 dark:text-neutral-300">Sort By:</span>
            <select
              value={reviewSortBy}
              onChange={(e) => setReviewSortBy(e.target.value)}
              className="bg-transparent font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none cursor-pointer"
            >
              <option value="recent" className="bg-white dark:bg-[#18181C] text-neutral-900 dark:text-neutral-100">Most Recent</option>
              <option value="highest" className="bg-white dark:bg-[#18181C] text-neutral-900 dark:text-neutral-100">Highest Rated</option>
              <option value="lowest" className="bg-white dark:bg-[#18181C] text-neutral-900 dark:text-neutral-100">Lowest Rated</option>
            </select>
          </div>
        </div>

        {/* Review Cards List */}
        {filteredSortedReviews.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-[#18181C] rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 space-y-2">
            <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">No sample reviews match your filter selection.</p>
            <button
              onClick={() => { setReviewRatingFilter(0); setReviewSortBy('recent'); }}
              className="text-xs text-amber-950 dark:text-amber-400 font-bold underline"
            >
              Reset Review Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSortedReviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-[#18181C] p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? 'fill-amber-400 stroke-amber-400' : 'stroke-neutral-300 dark:stroke-neutral-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{review.title}</span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                    {review.isUserSubmitted ? 'Demo Review' : 'Sample Review'}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
                  "{review.comment}"
                </p>

                <div className="flex items-center justify-between pt-2 text-[11px] text-neutral-400 dark:text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">{review.name}</span>
                  <span className="font-mono">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200 dark:border-neutral-800 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">YOU MAY ALSO LIKE</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">Complementary objects from {product.department}</p>
            </div>
            <Link to={`/${product.department}`} className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:underline">
              View Department
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isWishlisted={wishlistIds.includes(item.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onOpenDetail={(p) => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Section */}
      {recentlyViewedProducts.length > 0 && (
        <section className="border-t border-neutral-200 dark:border-neutral-800 pt-12 space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">RECENTLY VIEWED</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium font-mono">Objects explored in this session</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {recentlyViewedProducts.slice(0, 4).map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isWishlisted={wishlistIds.includes(item.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onOpenDetail={(p) => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-[#18181C] border-t border-neutral-200 dark:border-neutral-800 p-3 z-40 shadow-2xl flex items-center space-x-3">
        <button
          onClick={() => onToggleWishlist(product)}
          className={`p-3 rounded-xl border ${
            isWishlisted ? 'bg-neutral-900 dark:bg-neutral-100 text-rose-500 border-neutral-900 dark:border-neutral-100' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : 'stroke-[1.75]'}`} />
        </button>
        <button
          onClick={handleAddVariantToCart}
          className="flex-1 py-3.5 px-4 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag — ₹{currentPrice.toLocaleString('en-IN')}</span>
        </button>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative bg-[#FAF9F5] dark:bg-[#141418] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-neutral-200 dark:border-neutral-800 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center space-x-2">
                <Ruler className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Sizing Measurement Guide</h3>
              </div>
              <button onClick={() => setIsSizeGuideOpen(false)} className="p-1 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
              General size guide — approximate measurements in inches. Fit may vary depending on garment silhouette.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-neutral-800 dark:text-neutral-200 border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300 dark:border-neutral-700 bg-neutral-200/60 dark:bg-neutral-800/60 font-bold uppercase">
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5">Hip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {[
                    { size: 'XS', chest: '34"', waist: '28"', hip: '36"' },
                    { size: 'S', chest: '36"', waist: '30"', hip: '38"' },
                    { size: 'M', chest: '38"', waist: '32"', hip: '40"' },
                    { size: 'L', chest: '40"', waist: '34"', hip: '42"' },
                    { size: 'XL', chest: '42"', waist: '36"', hip: '44"' },
                    { size: 'XXL', chest: '44"', waist: '38"', hip: '46"' }
                  ].map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60">
                      <td className="p-2.5 font-bold">{row.size}</td>
                      <td className="p-2.5">{row.chest}</td>
                      <td className="p-2.5">{row.waist}</td>
                      <td className="p-2.5">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-[11px] text-neutral-400 dark:text-neutral-500 font-medium border-t border-neutral-200 dark:border-neutral-800">
              * Note: Demo size guide provided for reference. Check individual garment fit descriptors for tailored vs relaxed cuts.
            </div>
          </div>
        </div>
      )}

      {/* Demo Review Modal */}
      {isDemoReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs" onClick={() => setIsDemoReviewModalOpen(false)} />
          <div className="relative bg-[#FAF9F5] dark:bg-[#141418] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-neutral-200 dark:border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Demo Review Form</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Reviews are stored locally for this project demonstration.</p>
              </div>
              <button onClick={() => setIsDemoReviewModalOpen(false)} className="p-1 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewFormError && (
              <div className="p-3 bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900 rounded-xl text-xs font-semibold text-rose-800 dark:text-rose-200">
                {reviewFormError}
              </div>
            )}

            <form onSubmit={handleDemoReviewSubmit} className="space-y-4">
              
              {/* Star Rating Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: starVal }))}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starVal <= reviewForm.rating
                            ? 'fill-amber-400 stroke-amber-400'
                            : 'stroke-neutral-300 dark:stroke-neutral-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Review Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Excellent fit and material"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 font-medium"
                />
              </div>

              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Display Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul M."
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 font-medium"
                />
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Review Comment *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write your experience with this object..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 font-medium resize-none"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsDemoReviewModalOpen(false)}
                  className="flex-1 py-3 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white"
                >
                  Submit Demo Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Zoom Lightbox Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 p-4 sm:p-8 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <button 
            onClick={() => setIsZoomOpen(false)} 
            className="absolute top-6 right-6 p-3 text-white hover:text-neutral-300 focus:outline-none z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl">
            <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
          </div>
        </div>
      )}

    </div>
  );
}
