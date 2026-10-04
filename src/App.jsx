import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import DepartmentPage from './pages/DepartmentPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import LookbookPage from './pages/LookbookPage';
import OffersPage from './pages/OffersPage';
import JournalPage from './pages/JournalPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import AccountPage from './pages/AccountPage';
import HelpPage from './pages/HelpPage';

function PageTitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      document.title = 'VS — Modern Everyday Fashion';
    } else if (path === '/shop') {
      document.title = 'VS — Shop All Collections';
    } else if (path === '/men') {
      document.title = 'VS — Men\'s Fashion';
    } else if (path === '/women') {
      document.title = 'VS — Women\'s Fashion';
    } else if (path === '/kids') {
      document.title = 'VS — Kids\' Collection';
    } else if (path === '/accessories') {
      document.title = 'VS — Accessories & Goods';
    } else if (path === '/lookbook') {
      document.title = 'VS — Editorial Lookbook';
    } else if (path === '/offers') {
      document.title = 'VS — Exclusive Offers';
    } else if (path === '/journal') {
      document.title = 'VS — Style Journal';
    } else if (path === '/wishlist') {
      document.title = 'VS — Saved Items';
    } else if (path === '/cart') {
      document.title = 'VS — Shopping Bag';
    } else if (path === '/checkout') {
      document.title = 'VS — Demo Checkout';
    } else if (path === '/account/orders') {
      document.title = 'VS — My Demo Orders';
    } else if (path === '/account/details') {
      document.title = 'VS — Saved Customer Details';
    } else if (path.startsWith('/account')) {
      document.title = 'VS — My Account';
    } else if (path === '/about') {
      document.title = 'VS — About Brand';
    } else if (path === '/help') {
      document.title = 'VS — Help & Support';
    } else if (path === '/search') {
      document.title = 'VS — Search Catalogue';
    }
  }, [location]);

  return null;
}

export default function App() {
  // Shopping bag cart items state with safe localStorage persistence (initialized to empty [] for new visitors)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist product IDs state - initialized to empty [] for new visitors
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('vs_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync cart items to localStorage silently without triggering toasts
  useEffect(() => {
    try {
      localStorage.setItem('vs_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage write errors
    }
  }, [cartItems]);

  // Sync wishlist IDs to localStorage silently without triggering toasts
  useEffect(() => {
    try {
      localStorage.setItem('vs_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage write errors
    }
  }, [wishlistIds]);

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
    if (!product || !product.id) return;

    // Handle variant-aware item key or fallback to product.id
    const itemKey = product.variantKey || product.id;

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => (item.variantKey || item.id) === itemKey);
      if (existingIndex > -1) {
        return prevItems.map((item, idx) => 
          idx === existingIndex 
            ? { ...item, quantity: item.quantity + (quantity || 1) } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: quantity || 1 }];
    });
    showToast(`Added "${product.name}" to your bag.`, 'cart');
  };

  const handleToggleWishlist = (product) => {
    if (!product || !product.id) return;
    const isSaved = wishlistIds.includes(product.id);
    if (isSaved) {
      setWishlistIds(prev => prev.filter(id => id !== product.id));
      showToast(`Removed "${product.name}" from wishlist.`, 'info');
    } else {
      setWishlistIds(prev => [...prev, product.id]);
      showToast(`Saved "${product.name}" to wishlist.`, 'wishlist');
    }
  };

  const handleUpdateCartQuantity = (key, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(key);
      return;
    }
    setCartItems(prev => prev.map(item => (item.variantKey || item.id) === key ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveCartItem = (key) => {
    setCartItems(prev => prev.filter(item => (item.variantKey || item.id) !== key));
    showToast('Item removed from shopping bag.', 'info');
  };

  const handleMoveWishlistToCart = (product) => {
    if (!product || !product.id) return;
    handleAddToCart(product, 1);
    setWishlistIds(prev => prev.filter(id => id !== product.id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('vs_cart');
    } catch {
      // Ignore
    }
  };

  return (
    <BrowserRouter>
      <PageTitleManager />
      <Layout
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onMoveWishlistToCart={handleMoveWishlistToCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isWishlistOpen={isWishlistOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        quickViewProduct={quickViewProduct}
        setQuickViewProduct={setQuickViewProduct}
        toast={toast}
        setToast={setToast}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
              />
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ShopPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
              />
            } 
          />
          <Route 
            path="/search" 
            element={
              <SearchPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
              />
            } 
          />
          <Route 
            path="/:deptId" 
            element={
              <DepartmentPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
                showToast={showToast}
              />
            } 
          />
          <Route 
            path="/collections/:slug" 
            element={
              <CollectionDetailPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
              />
            } 
          />
          <Route 
            path="/lookbook" 
            element={
              <LookbookPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
              />
            } 
          />
          <Route 
            path="/offers" 
            element={
              <OffersPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
                showToast={showToast}
              />
            } 
          />
          <Route path="/journal" element={<JournalPage />} />
          <Route 
            path="/wishlist" 
            element={
              <WishlistPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cartItems={cartItems} 
                wishlistIds={wishlistIds}
                onUpdateQuantity={handleUpdateCartQuantity} 
                onRemoveItem={handleRemoveCartItem} 
                onMoveWishlistToCart={handleMoveWishlistToCart}
                onToggleWishlist={handleToggleWishlist}
                showToast={showToast}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage 
                cartItems={cartItems} 
                onClearCart={handleClearCart} 
                showToast={showToast}
              />
            } 
          />
          <Route 
            path="/account" 
            element={
              <AccountPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
                cartItems={cartItems}
                showToast={showToast}
              />
            } 
          />
          <Route 
            path="/account/orders" 
            element={
              <AccountPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
                cartItems={cartItems}
                showToast={showToast}
              />
            } 
          />
          <Route 
            path="/account/details" 
            element={
              <AccountPage 
                wishlistIds={wishlistIds} 
                onToggleWishlist={handleToggleWishlist} 
                onAddToCart={handleAddToCart} 
                onQuickView={setQuickViewProduct} 
                cartItems={cartItems}
                showToast={showToast}
              />
            } 
          />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
