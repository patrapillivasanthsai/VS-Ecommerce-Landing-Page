import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowUp, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  return (
    <footer className="bg-[#121212] text-[#FAF9F5] dark:bg-[#09090B] dark:text-[#F4F4F5] border-t border-neutral-800 dark:border-neutral-900 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip inside Footer */}
        <div className="pb-16 border-b border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              STAY CONNECTED
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Join the VS Fashion Journal
            </h3>
            <p className="text-xs text-neutral-400 font-normal leading-relaxed max-w-md">
              Receive early access to seasonal lookbooks, capsule drops, and exclusive promotional coupon codes.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors flex items-center space-x-1.5 shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 border-b border-neutral-800">
          
          {/* Brand Column (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-black tracking-tighter text-white">VS</span>
              <span className="w-2 h-2 rounded-full bg-white mt-2"></span>
            </Link>
            <p className="text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
              A modern fashion house focused on structured minimalism, sustainable organic textiles, and honest pricing across Men, Women, Kids, and Accessories.
            </p>

            {/* Social Icons Stack (Placeholders without fake external redirects) */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">
                FOLLOW OUR ATELIER
              </span>
              <div className="flex items-center space-x-3">
                <button
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                  aria-label="Instagram handle placeholder"
                  title="@vs.fashion.atelier"
                >
                  <Instagram className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                  aria-label="Facebook handle placeholder"
                  title="VS Fashion Official"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                  aria-label="X Twitter handle placeholder"
                  title="@vs_fashion"
                >
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/men" className="hover:text-white transition-colors">Men's Department</Link></li>
              <li><Link to="/women" className="hover:text-white transition-colors">Women's Department</Link></li>
              <li><Link to="/kids" className="hover:text-white transition-colors">Kids Wear</Link></li>
              <li><Link to="/accessories" className="hover:text-white transition-colors">Fine Accessories</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors text-rose-400">Promotions & Offers</Link></li>
            </ul>
          </div>

          {/* Column 3: HELP & CARE */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              Help & Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><Link to="/help" className="hover:text-white transition-colors">Help & FAQs</Link></li>
              <li><Link to="/account/details" className="hover:text-white transition-colors">Saved Address Details</Link></li>
              <li><Link to="/account/orders" className="hover:text-white transition-colors">Demo Order Status</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Store Information</Link></li>
            </ul>
          </div>

          {/* Column 4: ABOUT */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              About VS
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Philosophy</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">VS Style Journal</Link></li>
              <li><Link to="/lookbook" className="hover:text-white transition-colors">Seasonal Lookbook</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Column 5: ACCOUNT */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              Customer Account
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><Link to="/account" className="hover:text-white transition-colors">Account Dashboard</Link></li>
              <li><Link to="/account/orders" className="hover:text-white transition-colors">My Demo Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Saved Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Bag</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-normal gap-4">
          <p>© 2026 VS Fashion Inc.</p>
          
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="ml-4 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all focus:outline-none"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
