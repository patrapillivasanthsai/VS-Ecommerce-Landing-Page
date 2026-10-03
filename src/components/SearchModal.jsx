import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  products, 
  onSelectProduct 
}) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  const popularSearches = ['Leather Tote', 'Ceramic Mug', 'Ambient Lamp', 'Merino Throw', 'Chronograph'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Box */}
      <div className="relative bg-[#FAF9F5] rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 border border-neutral-200">
        
        {/* Input header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search VS essentials (e.g. Leather Tote, Ceramic, Watch)..."
            className="w-full bg-transparent text-base text-neutral-900 placeholder-neutral-400 focus:outline-none font-medium"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-black uppercase font-bold"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {query.trim() === '' && (
          <div className="py-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full bg-neutral-200/70 text-xs font-semibold text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>{term}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() !== '' && (
          <div className="py-4 space-y-4 max-h-96 overflow-y-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} found
            </span>

            {searchResults.length === 0 ? (
              <p className="text-sm text-neutral-500 py-6 text-center">
                No essentials found matching "{query}". Try a different keyword.
              </p>
            ) : (
              <div className="space-y-3">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center space-x-4 p-2.5 rounded-xl hover:bg-neutral-200/60 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-16 object-cover rounded-lg bg-neutral-200 shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-neutral-900">{product.name}</h4>
                      <p className="text-xs text-neutral-500 font-medium">{product.category}</p>
                    </div>
                    <span className="text-sm font-bold text-neutral-900">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
