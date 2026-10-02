import React from 'react';
import { Compass, Award, Feather, ShieldCheck } from 'lucide-react';

export default function BrandValues() {
  const values = [
    {
      icon: Compass,
      number: '01',
      title: 'Thoughtful Design',
      description: 'Stripped of non-essentials. Engineered with intentional proportions and enduring aesthetic clarity.'
    },
    {
      icon: Award,
      number: '02',
      title: 'Premium Quality',
      description: 'Sourced directly from premier artisans and mills committed to uncompromising craftsmanship.'
    },
    {
      icon: Feather,
      number: '03',
      title: 'Everyday Comfort',
      description: 'Tactile luxury designed to integrate seamlessly into your morning to evening rituals.'
    },
    {
      icon: ShieldCheck,
      number: '04',
      title: 'Fast & Secure Delivery',
      description: 'Carbon-neutral express global shipping, fully insured with effortless 30-day returns.'
    }
  ];

  return (
    <section id="values" className="py-24 lg:py-32 bg-[#FAF9F5] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400">
              The Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight">
              Why Choose <span className="font-serif italic font-normal">VS</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-600 font-normal max-w-sm">
            An unwavering commitment to quiet excellence in every single product detail.
          </p>
        </div>

        {/* Minimalist Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-4">
          {values.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="pt-6 border-t border-neutral-300/80 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-neutral-400">
                    {item.number}
                  </span>
                  <IconComponent className="w-4 h-4 text-neutral-800 stroke-[1.75] group-hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-medium text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-neutral-600 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
