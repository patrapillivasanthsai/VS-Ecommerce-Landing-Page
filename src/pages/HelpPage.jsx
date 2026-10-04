import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, ShoppingBag, Heart, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function HelpPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      question: 'How do I add objects to my shopping bag?',
      answer: 'Browse any product page or quick view modal, select your preferred size and colour variant, and click "Add to Bag". Your items and total bag quantity will update instantly in the navigation header.'
    },
    {
      question: 'How do promotional coupons work at checkout?',
      answer: 'You can apply valid promotional codes (such as VSFIRST20 or VSAUTUMN15) either inside the Shopping Bag drawer or on the Order Checkout page. Discounts are calculated dynamically based on your order subtotal.'
    },
    {
      question: 'How does my saved Wishlist work?',
      answer: 'Clicking the heart icon on any product saves it directly to your personal Wishlist (`vs_wishlist`). Your wishlist persists across page reloads and browser sessions using local storage.'
    },
    {
      question: 'How do Recently Viewed products work?',
      answer: 'As you explore fashion objects across the VS store, your last 8 viewed items are recorded in `vs_recently_viewed`. You can review them anytime under your Account overview or on Product Detail pages.'
    },
    {
      question: 'How does the Demo Checkout process work?',
      answer: 'VS is currently configured as a frontend portfolio showcase. Completing the checkout form generates a local demo order record (`vs_demo_orders`). No real credit card or bank credentials are processed.'
    },
    {
      question: 'Where is my customer account and saved address stored?',
      answer: 'All demo account profiles and saved shipping details are stored safely in your local browser (`vs_demo_user` and `vs_demo_customer_details`). No external server or database is connected.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full">
          SUPPORT & GUIDANCE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          Help & Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
          Everything you need to know about navigating the VS fashion store, using coupons, managing your wishlist, and demo checkout functionality.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200 flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-neutral-900" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-neutral-100 last:border-0 pb-3">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left py-2 focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-bold text-neutral-900 pr-4">
                  {faq.question}
                </span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                )}
              </button>

              {openFaqIndex === idx && (
                <p className="text-xs text-neutral-600 font-normal leading-relaxed mt-2 pl-1 pt-1 border-l-2 border-neutral-900">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Disclaimer & Contact Note */}
      <div className="bg-neutral-100/80 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 space-y-4 text-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-neutral-900 shadow-xs">
          <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
        </div>

        <div className="space-y-1 max-w-md mx-auto">
          <h3 className="text-base font-bold text-neutral-900">Need Further Assistance?</h3>
          <p className="text-xs text-neutral-500 font-medium leading-relaxed">
            This project is a frontend e-commerce demonstration. For questions or portfolio inquiries, please use the contact option provided by the project owner.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/shop"
            className="px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
          >
            Explore Fashion Store
          </Link>
          <Link
            to="/account"
            className="px-6 py-3 bg-white border border-neutral-300 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors"
          >
            Go to My Account
          </Link>
        </div>
      </div>

    </div>
  );
}
