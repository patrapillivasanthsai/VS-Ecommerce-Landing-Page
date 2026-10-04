import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  products = [], 
  onSelectProduct 
}) {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const searchResults = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        (p.category && p.category.toLowerCase().includes(query.toLowerCase())) ||
        (p.department && p.department.toLowerCase().includes(query.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      );

  const popularSearches = ['Linen Shirt', 'Silk Dress', 'Denim Jeans', 'Leather Tote', 'Cashmere Knit', 'Automatic Watch'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Box */}
      <div className="relative bg-[#FAF9F5] rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 border border-neutral-200">
        
        {/* Input header form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3 pb-4 border-b border-neutral-200">
          <button type="submit" aria-label="Search" className="text-neutral-500 hover:text-black">
            <Search className="w-5 h-5 shrink-0" />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search VS fashion (e.g. Linen Shirt, Silk Dress, Tote)..."
            className="w-full bg-transparent text-base text-neutral-900 placeholder-neutral-400 focus:outline-none font-medium"
            autoFocus
          />
          {query && (
            <button 
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-black uppercase font-bold"
            >
              Clear
            </button>
          )}
          <button 
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

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
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate(`/search?q=${encodeURIComponent(term)}`);
                  }}
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
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} found
              </span>
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="text-xs font-bold text-amber-950 hover:underline flex items-center space-x-1"
              >
                <span>View search page</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-sm text-neutral-500">
                  No quick matches found for "{query}".
                </p>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black"
                >
                  Search Full Catalogue
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((product) => {
                  const img = (product.images && product.images.length > 0) ? product.images[0] : (product.image || '');
                  const price = product.salePrice ?? product.price ?? 0;

                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center space-x-4 p-2.5 rounded-xl hover:bg-neutral-200/60 cursor-pointer transition-colors"
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className="w-14 h-16 object-cover rounded-lg bg-neutral-200 shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-neutral-900">{product.name}</h4>
                        <p className="text-xs text-neutral-500 font-medium">
                          {product.department ? `${product.department} / ${product.category}` : product.category}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-neutral-900">₹{price.toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
