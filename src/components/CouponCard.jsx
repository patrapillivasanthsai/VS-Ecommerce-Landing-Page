import React, { useState } from 'react';
import { Copy, Check, Sparkles, Tag, ArrowRight } from 'lucide-react';

export default function CouponCard({ coupon, onCopyCode, isApplied = false, onApply }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopyCode) {
      onCopyCode(coupon.code);
    } else {
      navigator.clipboard.writeText(coupon.code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Determine coupon theme variant
  const isGold = coupon.code === 'VSFIRST20';
  const isBurgundy = coupon.code === 'VSAUTUMN15';

  const cardStyle = isGold
    ? 'bg-gradient-to-br from-[#FAF5E8] via-[#F4EBD9] to-[#EAE0C8] dark:from-[#24211A] dark:via-[#1D1B15] dark:to-[#171611] border-[#DFCFAB] dark:border-[#4E432F] text-[#2C2415] dark:text-[#F3EAD5]'
    : isBurgundy
    ? 'bg-gradient-to-br from-[#FAECEE] via-[#F3DEE2] to-[#E9CCD2] dark:from-[#2A161B] dark:via-[#201216] dark:to-[#1A0E12] border-[#DFC0C7] dark:border-[#54252E] text-[#3D141C] dark:text-[#F7E2E6]'
    : 'bg-gradient-to-br from-[#F2F6F3] via-[#E5EDE7] to-[#D8E4DA] dark:from-[#16221B] dark:via-[#121A15] dark:to-[#0E1511] border-[#BCCEC1] dark:border-[#263D2E] text-[#16281D] dark:text-[#D5E5DA]';

  const badgeStyle = isGold
    ? 'bg-[#E3CA92] text-[#3A2F16] dark:bg-[#42371D] dark:text-[#EAD5A5]'
    : isBurgundy
    ? 'bg-[#E2B4BD] text-[#4A1821] dark:bg-[#52212B] dark:text-[#F3C5CD]'
    : 'bg-[#B0C7B7] text-[#142A1D] dark:bg-[#203628] dark:text-[#C5DCD0]';

  const buttonStyle = isGold
    ? 'bg-[#2C2415] text-[#F3EAD5] hover:bg-[#1A150C] dark:bg-[#E3CA92] dark:text-[#2C2415] dark:hover:bg-[#EFE0BC]'
    : isBurgundy
    ? 'bg-[#4A1821] text-[#F7E2E6] hover:bg-[#331016] dark:bg-[#E2B4BD] dark:text-[#3D141C] dark:hover:bg-[#EBC5CD]'
    : 'bg-[#16281D] text-[#F2F6F3] hover:bg-[#0C1710] dark:bg-[#B0C7B7] dark:text-[#122017] dark:hover:bg-[#C8DCD0]';

  return (
    <div className={`coupon-ticket shine-effect relative rounded-3xl border p-6 sm:p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cardStyle}`}>
      
      {/* Top Bar: Tag & Offer Category */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${badgeStyle}`}>
          {coupon.tag || 'PROMO EDIT'}
        </span>
        <span className="text-[11px] font-mono font-bold opacity-75 uppercase tracking-wider">
          Valid for 2026
        </span>
      </div>

      {/* Main Content Area: Large Discount & Description */}
      <div className="space-y-2 mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="font-serif text-4xl sm:text-5xl font-normal tracking-tight">
            {coupon.discountPercent}%
          </span>
          <span className="text-xs uppercase font-bold tracking-widest opacity-80">
            OFF ORDER
          </span>
        </div>
        <p className="text-xs font-normal leading-relaxed opacity-90 max-w-xs">
          {coupon.description}
        </p>
      </div>

      {/* Decorative Dashed Ticket Divider */}
      <div className="border-t-2 border-dashed opacity-30 my-4" />

      {/* Bottom Action Bar: Code Box & Copy CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 block">
            PROMO CODE
          </span>
          <span className="font-mono text-base font-black tracking-wider block">
            {coupon.code}
          </span>
          <span className="text-[10px] font-medium opacity-75 block">
            Min order: ₹{coupon.minOrderAmount.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onApply && (
            <button
              onClick={() => onApply(coupon.code)}
              className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl underline hover:opacity-80 transition-opacity"
            >
              Use Now
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 shadow-sm shrink-0 ${buttonStyle}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
