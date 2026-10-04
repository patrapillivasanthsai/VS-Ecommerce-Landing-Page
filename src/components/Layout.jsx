import React from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import QuickViewModal from './QuickViewModal';
import SearchModal from './SearchModal';
import Toast from './Toast';
import { FASHION_PRODUCTS, getProductsByIds } from '../data/fashionProducts';
import { useNavigate } from 'react-router-dom';

export default function Layout({
  children,
  theme,
  toggleTheme,
  cartItems,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onMoveWishlistToCart,
  isCartOpen,
  setIsCartOpen,
  isWishlistOpen,
  setIsWishlistOpen,
  isSearchOpen,
  setIsSearchOpen,
  quickViewProduct,
  setQuickViewProduct,
  toast,
  setToast
}) {
  const navigate = useNavigate();
  const wishlistProducts = getProductsByIds(wishlistIds);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#121212] dark:bg-[#0F0F12] dark:text-[#F4F4F5] transition-colors duration-300 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-amber-400 dark:selection:text-black">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Responsive Main Header Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 4. Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* 5. Refined Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={onToggleWishlist}
        onMoveToCart={onMoveWishlistToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={FASHION_PRODUCTS}
        onSelectProduct={(p) => navigate(`/product/${p.id}`)}
      />

      {/* Toast notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
