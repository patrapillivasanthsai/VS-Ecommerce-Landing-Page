import React from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-28 overflow-hidden bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-8 z-10">
            
            {/* Season Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-200/70 border border-neutral-300/50 text-neutral-900 text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
              <span>Autumn / Winter 2026 Collection</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-neutral-900 leading-[1.06]">
                Designed for <br />
                <span className="font-serif italic font-normal text-neutral-900">the everyday.</span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 font-normal max-w-md leading-relaxed">
                Thoughtfully selected essentials made for modern living. Stripped of excess, crafted for quiet endurance.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <a
                href="#featured"
                className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shadow-md group"
              >
                <span>Shop Collection</span>
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#editorial"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-neutral-300 text-neutral-900 rounded-full text-xs font-semibold uppercase tracking-widest hover:border-neutral-900 hover:bg-neutral-900/5 transition-all duration-300"
              >
                Explore VS
              </a>
            </div>

            {/* Value badges below CTA */}
            <div className="pt-8 border-t border-neutral-200 grid grid-cols-3 gap-4 max-w-lg text-neutral-600">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0 stroke-[1.75]" />
                <span className="text-xs font-medium text-neutral-700">Lifetime Craft</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-neutral-800 shrink-0 stroke-[1.75]" />
                <span className="text-xs font-medium text-neutral-700">Sustainable</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span className="text-xs font-medium text-neutral-700">Ready to Ship</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Editorial Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] overflow-hidden rounded-3xl shadow-xl bg-neutral-200 group">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=85"
                  alt="VS Lifestyle Essential Collection"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/30 shadow-lg text-neutral-900 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Featured Object</p>
                    <p className="text-xs font-semibold text-neutral-900">Monolith Ceramic Vessel</p>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 px-3 py-1 bg-neutral-900 text-white rounded-full">
                    ₹1,299
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
