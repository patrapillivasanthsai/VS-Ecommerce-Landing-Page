import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#121212] dark:bg-[#0A0A0C] text-[#FAF9F5] dark:text-[#F4F4F5] relative overflow-hidden transition-colors duration-300 border-t border-neutral-800 dark:border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="space-y-3 max-w-xl mx-auto">
          <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
            Exclusive Journal
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
            Stay in <span className="font-serif italic font-normal text-amber-300">the loop.</span>
          </h2>
          
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Get first access to new fashion collections, special releases and stories from VS. Zero spam, unsubscribe anytime.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="mt-10 max-w-md mx-auto">
          {submitted ? (
            <div className="p-6 rounded-2xl bg-neutral-900 dark:bg-[#141418] border border-neutral-800 text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-semibold text-white">Welcome to VS.</h3>
              <p className="text-xs text-neutral-400">
                You've been added to our private access list. Check your inbox for your welcome release.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2 bg-neutral-900 dark:bg-[#141418] border border-neutral-800 rounded-full p-1.5 focus-within:border-amber-400 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Your email address"
                  className="w-full px-5 py-2.5 bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-white text-neutral-900 hover:bg-amber-300 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shrink-0 flex items-center justify-center space-x-2 group"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-400 font-medium text-left px-4">{error}</p>
              )}
            </form>
          )}

          <p className="text-[11px] text-neutral-500 mt-4">
            By signing up, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>

      </div>
    </section>
  );
}
