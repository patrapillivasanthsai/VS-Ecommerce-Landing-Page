import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenSearch, 
  onOpenQuickView 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-header border-b border-neutral-200/60 shadow-xs py-4' 
          : 'bg-[#FAF9F5]/90 backdrop-blur-md py-5 border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-neutral-800 hover:text-black focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo / Wordmark */}
            <div className="flex items-center">
              <a href="#" className="group flex items-center space-x-2 focus:outline-none">
                <span className="text-2xl font-black tracking-tighter text-neutral-900 group-hover:opacity-80 transition-opacity">
                  VS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2"></span>
              </a>
            </div>

            {/* Desktop Navigation Center */}
            <nav className="hidden lg:flex items-center space-x-9">
              <a 
                href="#featured" 
                className="text-xs uppercase tracking-widest font-medium text-neutral-700 hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-neutral-900 hover:after:w-full after:transition-all after:duration-300"
              >
                Shop
              </a>
              <a 
                href="#collections" 
                className="text-xs uppercase tracking-widest font-medium text-neutral-700 hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-neutral-900 hover:after:w-full after:transition-all after:duration-300"
              >
                Collections
              </a>
              <a 
                href="#editorial" 
                className="text-xs uppercase tracking-widest font-medium text-neutral-700 hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-neutral-900 hover:after:w-full after:transition-all after:duration-300"
              >
                Editorial
              </a>
              <a 
                href="#values" 
                className="text-xs uppercase tracking-widest font-medium text-neutral-700 hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-neutral-900 hover:after:w-full after:transition-all after:duration-300"
              >
                About
              </a>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Search Icon */}
              <button 
                onClick={onOpenSearch}
                className="p-2 text-neutral-700 hover:text-black transition-colors focus:outline-none rounded-full hover:bg-neutral-200/50"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[1.75]" />
              </button>

              {/* Wishlist Icon with Counter */}
              <button 
                onClick={onOpenWishlist}
                className="p-2 text-neutral-700 hover:text-black transition-colors focus:outline-none rounded-full hover:bg-neutral-200/50 relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] font-medium flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon with Counter */}
              <button 
                onClick={onOpenCart}
                className="flex items-center space-x-2 pl-3 py-1.5 pr-3.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-all duration-200 focus:outline-none group shadow-xs hover:shadow"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                <span className="text-xs font-semibold tracking-wide">
                  Bag ({cartCount})
                </span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FAF9F5] shadow-2xl p-6 flex flex-col justify-between z-10 transition-transform duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                  <span className="text-2xl font-black tracking-tighter text-neutral-900">VS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2"></span>
                </a>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-500 hover:text-black focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-8 space-y-6">
                <a 
                  href="#featured" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium text-neutral-900 hover:text-neutral-500 transition-colors flex items-center justify-between"
                >
                  <span>Shop</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </a>
                <a 
                  href="#collections" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium text-neutral-900 hover:text-neutral-500 transition-colors flex items-center justify-between"
                >
                  <span>Collections</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </a>
                <a 
                  href="#editorial" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium text-neutral-900 hover:text-neutral-500 transition-colors flex items-center justify-between"
                >
                  <span>Editorial</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </a>
                <a 
                  href="#values" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium text-neutral-900 hover:text-neutral-500 transition-colors flex items-center justify-between"
                >
                  <span>About VS</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </a>
              </nav>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="text-xs text-neutral-500 space-y-2">
                <p>Designed for everyday living.</p>
                <p>© 2026 VS Inc. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
