import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import EditorialSection from './components/EditorialSection';
import BrandValues from './components/BrandValues';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import { PRODUCTS } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['vs-03']);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Auto hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Close open modals/drawers on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsSearchOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to your bag.`, 'cart');
  };

  const handleToggleWishlist = (product) => {
    setWishlistIds(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`, 'info');
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist.`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  const handleUpdateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from shopping bag.', 'info');
  };

  const handleMoveWishlistToCart = (product) => {
    handleAddToCart(product, 1);
    setWishlistIds(prev => prev.filter(id => id !== product.id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    showToast('Redirecting to secure payment checkout...', 'info');
    setTimeout(() => {
      alert('Thank you for exploring VS! In production, this proceeds to Stripe / Shopify Checkout.');
    }, 500);
  };

  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#121212] font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Responsive Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* 3. Hero Section */}
        <Hero onExploreClick={() => {
          const el = document.getElementById('editorial');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* 4. Featured Product Grid Collection */}
        <FeaturedCollection
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 5. Editorial & Series Section */}
        <EditorialSection onExploreClick={() => {
          const el = document.getElementById('featured');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* 6. Brand Values Section */}
        <BrandValues />

        {/* 7. Newsletter Subscription Section */}
        <Newsletter />

      </main>

      {/* 8. Minimalist Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Toast notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
