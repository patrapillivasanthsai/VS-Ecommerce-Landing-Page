import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currency, setCurrency] = useState('INR');
  const [currencyOpen, setCurrencyOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="bg-[#121212] text-[#FAF9F5] text-xs font-medium py-2.5 px-4 transition-all duration-300 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left side detail - Desktop only */}
        <div className="hidden md:flex items-center space-x-4 text-neutral-400">
          <span>Complimentary Express Shipping over ₹2,999</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
          <span>All Inclusive Shipping Across India</span>
        </div>

        {/* Center message */}
        <div className="w-full md:w-auto text-center flex items-center justify-center space-x-2">
          <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-neutral-800 text-neutral-300 rounded">
            New Season
          </span>
          <span className="tracking-wide">
            The Autumn Atelier Collection is now live.
          </span>
          <a href="#featured" className="underline underline-offset-4 hover:text-neutral-300 transition-colors hidden sm:inline ml-1 font-semibold">
            Explore now
          </a>
        </div>

        {/* Right side controls */}
        <div className="hidden md:flex items-center space-x-4 text-neutral-400">
          <div className="relative">
            <button 
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center space-x-1 hover:text-white transition-colors py-0.5 focus:outline-none"
            >
              <span>{currency} (₹)</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {currencyOpen && (
              <div className="absolute right-0 mt-1 w-24 bg-neutral-900 border border-neutral-800 rounded shadow-xl py-1 z-50 text-neutral-300 text-xs">
                {['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr.split(' ')[0]);
                      setCurrencyOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-800 hover:text-white transition-colors"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="hover:text-white transition-colors p-0.5 focus:outline-none"
            aria-label="Close bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
