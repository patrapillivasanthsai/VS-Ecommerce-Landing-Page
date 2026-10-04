import React from 'react';
import BrandValues from '../components/BrandValues';
import { Sparkles, Compass, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="relative h-80 sm:h-96 w-full bg-neutral-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1600&q=85"
          alt="About VS"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
            Brand Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">About VS</h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl font-medium leading-relaxed">
            VS is a commercial fashion house dedicated to structured minimalism, organic textiles, fair pricing, and enduring quality for Men, Women, Kids, and Accessories.
          </p>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-neutral-800">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Crafting Contemporary Fashion Essentials</h2>
          <p className="text-sm font-normal leading-relaxed text-neutral-600">
            Founded with a singular mission: to strip away artificial fashion markups, seasonal gimmicks, and fast-fashion waste. We design elevated everyday wear using long-staple French linen, GOTS certified organic cotton, grade-A cashmere, and full-grain Tuscan leather.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
            <Compass className="w-6 h-6 text-neutral-900" />
            <h3 className="text-base font-bold text-neutral-900">Honest Pricing</h3>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">
              Transparent cost structure with realistic INR pricing and genuine savings on every object.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-neutral-900" />
            <h3 className="text-base font-bold text-neutral-900">Craftsmanship</h3>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">
              Double-stitched hems, mother-of-pearl buttons, and hand-finished seams designed to last.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
            <Heart className="w-6 h-6 text-neutral-900" />
            <h3 className="text-base font-bold text-neutral-900">Responsibility</h3>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">
              Ethical artisan partnerships and plastic-free recyclable packaging across all orders.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <BrandValues />
    </div>
  );
}
