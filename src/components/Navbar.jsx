import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, Percent, ChevronDown, ChevronUp, User, Sun, Moon } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { getDemoUser } from '../utils/userAccount';

export default function Navbar({ 
  theme = 'light',
  toggleTheme,
  cartCount = 0, 
  wishlistCount = 0, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenSearch 
}) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState(null);
  const [desktopSearchQuery, setDesktopSearchQuery] = useState('');
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleDesktopSearchSubmit = (e) => {
    e.preventDefault();
    if (desktopSearchQuery.trim()) {
      navigate(`/shop?category=${encodeURIComponent(desktopSearchQuery.trim())}`);
      setDesktopSearchQuery('');
    } else {
      onOpenSearch();
    }
  };

  const navLinkClass = ({ isActive }) => 
    `text-xs uppercase tracking-widest font-semibold py-2 px-1 relative transition-colors ${
      isActive 
        ? 'text-black dark:text-white font-extrabold after:w-full' 
        : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-neutral-900 dark:after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300`;

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'glass-header border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs py-3' 
            : 'bg-[#FAF9F5]/95 dark:bg-[#0F0F12]/95 backdrop-blur-md py-4 border-b border-neutral-200/60 dark:border-neutral-800/60'
        }`}
        onMouseLeave={() => setActiveMegaTab(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* LEFT: Mobile Hamburger Button & Brand Logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white focus:outline-none lg:hidden"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link to="/" className="group flex items-center space-x-2 focus:outline-none shrink-0">
                <span className="text-2xl font-black tracking-tighter text-neutral-900 dark:text-white group-hover:opacity-80 transition-opacity">
                  VS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-amber-400 mt-2"></span>
              </Link>
            </div>

            {/* CENTER: Desktop Main Navigation with Mega Menu Hover Triggers */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <div 
                className="relative py-1"
                onMouseEnter={() => setActiveMegaTab('shop')}
              >
                <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
              </div>

              <div 
                className="relative py-1"
                onMouseEnter={() => setActiveMegaTab('men')}
              >
                <NavLink to="/men" className={navLinkClass}>Men</NavLink>
              </div>

              <div 
                className="relative py-1"
                onMouseEnter={() => setActiveMegaTab('women')}
              >
                <NavLink to="/women" className={navLinkClass}>Women</NavLink>
              </div>

              <div 
                className="relative py-1"
                onMouseEnter={() => setActiveMegaTab('kids')}
              >
                <NavLink to="/kids" className={navLinkClass}>Kids</NavLink>
              </div>

              <div 
                className="relative py-1"
                onMouseEnter={() => setActiveMegaTab('accessories')}
              >
                <NavLink to="/accessories" className={navLinkClass}>Accessories</NavLink>
              </div>

              <div className="relative py-1">
                <NavLink to="/lookbook" className={navLinkClass}>Lookbook</NavLink>
              </div>

              <div className="relative py-1">
                <NavLink to="/offers" className={navLinkClass}>
                  <span className="flex items-center space-x-1 text-rose-700">
                    <Percent className="w-3 h-3" />
                    <span>Offers</span>
                  </span>
                </NavLink>
              </div>
            </nav>

            {/* RIGHT: Search Bar & Actions Stack */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Desktop Prominent Search Input */}
              <form 
                onSubmit={handleDesktopSearchSubmit}
                className="hidden md:flex items-center bg-white/80 dark:bg-neutral-900/80 border border-neutral-300/80 dark:border-neutral-700/80 rounded-full px-3.5 py-1.5 focus-within:border-neutral-900 dark:focus-within:border-amber-400 focus-within:bg-white dark:focus-within:bg-neutral-900 transition-all w-48 lg:w-64"
              >
                <Search className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={desktopSearchQuery}
                  onChange={(e) => setDesktopSearchQuery(e.target.value)}
                  onFocus={onOpenSearch}
                  placeholder="Search shirts, dresses, bags..."
                  className="w-full bg-transparent text-xs font-medium text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none"
                />
              </form>

              {/* Mobile Search Icon Button */}
              <button 
                onClick={onOpenSearch}
                className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors focus:outline-none rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60"
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4 stroke-[1.75]" />
              </button>

              {/* Dark/Light Theme Mode Toggle (Desktop & Mobile) */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-all duration-300 focus:outline-none rounded-full hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80"
                aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 stroke-[2] transition-transform duration-300 hover:scale-110" />
                ) : (
                  <Moon className="w-4 h-4 text-neutral-700 stroke-[1.75] transition-transform duration-300 hover:scale-110" />
                )}
              </button>

              {/* Customer Account Entry Button */}
              <Link
                to="/account"
                className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors focus:outline-none rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 relative"
                aria-label="Customer Account"
                title={getDemoUser() ? "My Account (Demo)" : "Sign In (Demo)"}
              >
                <User className="w-4 h-4 stroke-[1.75]" />
                {getDemoUser() && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1 right-1"></span>
                )}
              </Link>

              {/* Wishlist Button with Badge */}
              <button 
                onClick={onOpenWishlist}
                className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors focus:outline-none rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 relative"
                aria-label="Saved Wishlist"
              >
                <Heart className="w-4 h-4 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-neutral-900 dark:bg-amber-400 text-white dark:text-black text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button with Total Quantity Badge */}
              <button 
                onClick={onOpenCart}
                className="flex items-center space-x-2 pl-3 py-1.5 pr-3.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-full hover:bg-black dark:hover:bg-white transition-all duration-200 focus:outline-none group shadow-xs hover:shadow relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                <span className="text-xs font-semibold tracking-wide">
                  Bag ({cartCount})
                </span>
                {cartCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500 absolute top-1 right-1"></span>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Mega Menu Overlay Container */}
        <MegaMenu 
          activeTab={activeMegaTab} 
          onClose={() => setActiveMegaTab(null)} 
        />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-neutral-900/60 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FAF9F5] dark:bg-[#141418] text-neutral-900 dark:text-neutral-100 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
            
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between sticky top-0 bg-[#FAF9F5] dark:bg-[#141418] z-10">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tighter text-neutral-900 dark:text-white">VS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-amber-400 mt-2"></span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-black dark:hover:text-white focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="p-6 space-y-4">

              {/* Mobile Drawer Theme Mode Toggle */}
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-600" />}
                  <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  Switch
                </button>
              </div>
              
              {/* Expandable Category Accordions */}
              {[
                { 
                  id: 'men', 
                  title: 'Men', 
                  path: '/men',
                  subcats: ['Shirts', 'T-Shirts', 'Trousers', 'Denim', 'Jackets', 'Kurtas'] 
                },
                { 
                  id: 'women', 
                  title: 'Women', 
                  path: '/women',
                  subcats: ['Dresses', 'Tops', 'Shirts', 'Trousers', 'Denim', 'Ethnic', 'Outerwear'] 
                },
                { 
                  id: 'kids', 
                  title: 'Kids', 
                  path: '/kids',
                  subcats: ['T-Shirts', 'Dresses', 'Shirts', 'Sets', 'Denim', 'Outerwear'] 
                },
                { 
                  id: 'accessories', 
                  title: 'Accessories', 
                  path: '/accessories',
                  subcats: ['Bags', 'Wallets', 'Belts', 'Footwear', 'Jewellery', 'Watches', 'Sunglasses', 'Scarves'] 
                }
              ].map((dept) => (
                <div key={dept.id} className="border-b border-neutral-200/60 dark:border-neutral-800 pb-2">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      to={dept.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-bold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-amber-300 uppercase tracking-wide"
                    >
                      {dept.title}
                    </Link>
                    <button
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === dept.id ? null : dept.id)}
                      className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    >
                      {expandedMobileCategory === dept.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {expandedMobileCategory === dept.id && (
                    <div className="pl-3 py-2 space-y-2 border-l-2 border-neutral-300 dark:border-neutral-700">
                      {dept.subcats.map((subcat) => (
                        <Link
                          key={subcat}
                          to={`${dept.path}?category=${encodeURIComponent(subcat)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          {subcat}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Direct Route Links */}
              <div className="pt-2 space-y-3">
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-between py-1 border-b border-neutral-200/60 dark:border-neutral-800 pb-2"
                >
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                    <span>My Account</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-between py-1"
                >
                  <span>Shop All Products</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-rose-700 dark:text-rose-400 flex items-center justify-between py-1"
                >
                  <span className="flex items-center space-x-1.5">
                    <Percent className="w-4 h-4" />
                    <span>Offers & Coupons</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                </Link>
                <Link
                  to="/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between py-1"
                >
                  <span>Help & FAQs</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/lookbook"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between py-1"
                >
                  <span>Seasonal Lookbook</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/journal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between py-1"
                >
                  <span>VS Style Journal</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between py-1"
                >
                  <span>About VS</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
              </div>

            </div>

            {/* Footer inside Drawer */}
            <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">VS Fashion House</p>
                <p>© 2026 VS Fashion Inc.</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
