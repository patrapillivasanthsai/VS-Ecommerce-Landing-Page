import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Truck, Tag, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROMO_MESSAGES = [
  {
    id: 1,
    icon: Truck,
    text: "Free shipping across India on orders over ₹2,999",
    actionText: "Shop Now",
    actionPath: "/shop"
  },
  {
    id: 2,
    icon: Tag,
    text: "Use code VSFIRST20 for 20% OFF on your first fashion order",
    actionText: "View Offers",
    actionPath: "/offers"
  },
  {
    id: 3,
    icon: Sparkles,
    text: "New season Autumn Atelier styles now live across Men, Women & Accessories",
    actionText: "Explore",
    actionPath: "/shop"
  },
  {
    id: 4,
    icon: RefreshCw,
    text: "Easy size exchanges on eligible products",
    actionText: "Learn More",
    actionPath: "/about"
  }
];

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  if (!isVisible) return null;

  const currentMsg = PROMO_MESSAGES[currentIndex];
  const IconComponent = currentMsg.icon;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROMO_MESSAGES.length) % PROMO_MESSAGES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
  };

  return (
    <div 
      className="bg-[#121212] text-[#FAF9F5] text-xs font-medium py-2 px-4 relative z-50 border-b border-neutral-800 selection:bg-white selection:text-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[24px]">
        
        {/* Left Side: Prev arrow on desktop */}
        <div className="hidden md:flex items-center space-x-2 text-neutral-400">
          <button 
            onClick={handlePrev} 
            className="p-0.5 hover:text-white transition-colors focus:outline-none"
            aria-label="Previous message"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-neutral-500 font-mono">
            0{currentIndex + 1}/0{PROMO_MESSAGES.length}
          </span>
          <button 
            onClick={handleNext} 
            className="p-0.5 hover:text-white transition-colors focus:outline-none"
            aria-label="Next message"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Message with smooth fade transition */}
        <div className="w-full md:w-auto text-center flex items-center justify-center space-x-2 transition-opacity duration-300">
          <IconComponent className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline-block" />
          <span className="tracking-wide text-[11px] sm:text-xs text-neutral-200">
            {currentMsg.text}
          </span>
          <Link 
            to={currentMsg.actionPath}
            className="underline underline-offset-4 text-white hover:text-amber-300 transition-colors text-[11px] sm:text-xs font-bold whitespace-nowrap ml-1"
          >
            {currentMsg.actionText}
          </Link>
        </div>

        {/* Right Side: Close Button */}
        <div className="hidden md:flex items-center space-x-4 text-neutral-400">
          <span className="text-[11px] text-neutral-400 font-semibold">INR (₹)</span>
          <button 
            onClick={() => setIsVisible(false)}
            className="hover:text-white transition-colors p-0.5 focus:outline-none"
            aria-label="Dismiss announcement bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
