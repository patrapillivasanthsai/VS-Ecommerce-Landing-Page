import React from 'react';
import { Instagram, Twitter, PinIcon as Pinterest, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-[#FAF9F5] border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center space-x-2">
              <span className="text-3xl font-black tracking-tighter text-white">VS</span>
              <span className="w-2 h-2 rounded-full bg-white mt-2"></span>
            </a>
            <p className="text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
              A modern, premium lifestyle brand focused on carefully designed everyday products built for elevated living.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-white hover:text-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-white hover:text-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-white hover:text-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center transition-all duration-300"
                aria-label="Pinterest"
              >
                <Pinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#featured" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#featured" className="hover:text-white transition-colors">Carry Series</a></li>
              <li><a href="#featured" className="hover:text-white transition-colors">Living Space</a></li>
              <li><a href="#featured" className="hover:text-white transition-colors">Objects & Time</a></li>
              <li><a href="#editorial" className="hover:text-white transition-colors">New Releases</a></li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#collections" className="hover:text-white transition-colors">The Morning Atelier</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Everyday Carry</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Living Sanctuary</a></li>
              <li><a href="#editorial" className="hover:text-white transition-colors">Lookbook 2026</a></li>
            </ul>
          </div>

          {/* Nav Links Column 3 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Guarantee</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Care Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
            </ul>
          </div>

          {/* Nav Links Column 4 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-300">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-normal">
              <li><a href="#values" className="hover:text-white transition-colors">About VS</a></li>
              <li><a href="#values" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Flagship Stores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-normal gap-4">
          <p>© 2026 VS Lifestyle Inc. All rights reserved. Crafted for modern living.</p>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Cookies</a>

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
