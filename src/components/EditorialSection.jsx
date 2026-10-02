import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_STORY, COLLECTIONS } from '../data/products';

export default function EditorialSection({ onExploreClick }) {
  return (
    <section id="editorial" className="py-20 lg:py-32 bg-[#121212] text-[#FAF9F5] relative overflow-hidden">
      
      {/* Editorial Main Highlight Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[520px] lg:min-h-[640px] flex items-center shadow-2xl">
          
          {/* Background Editorial Image with subtle dark gradient overlay */}
          <div className="absolute inset-0">
            <img
              src={BRAND_STORY.editorialImage}
              alt="VS Editorial Aesthetic"
              className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Editorial Content Overlay */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-20 max-w-2xl space-y-6">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold tracking-widest uppercase text-neutral-300">
              The VS Philosophy
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
              {BRAND_STORY.quote.split(',')[0]}, <br />
              <span className="font-serif italic font-normal text-neutral-200">
                {BRAND_STORY.quote.split(',')[1]}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-lg">
              {BRAND_STORY.subquote}
            </p>

            <div className="pt-4">
              <a
                href="#collections"
                onClick={onExploreClick}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-neutral-900 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-all duration-300 shadow-xl group"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Collection Showcase Sub-grid */}
        <div id="collections" className="mt-24 pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Curated Environments
              </span>
              <h3 className="text-3xl font-light text-white tracking-tight mt-1">
                Explore by <span className="font-serif italic font-normal">Series</span>
              </h3>
            </div>
            <p className="text-sm text-neutral-400 max-w-xs mt-2 md:mt-0 font-light">
              Each collection is designed around a distinct mood and tactile palette.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLECTIONS.map((item) => (
              <div 
                key={item.id} 
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 cursor-pointer shadow-lg border border-neutral-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center img-zoom opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    {item.itemCount} Objects
                  </span>
                  <h4 className="text-xl font-medium text-white mt-1 group-hover:text-neutral-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-2 line-clamp-2 font-normal opacity-90">
                    {item.subtitle}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                    <span>Discover Series</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
