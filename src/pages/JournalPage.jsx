import React from 'react';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JournalPage() {
  const articles = [
    {
      id: 'art-01',
      title: 'The Art of French Flax Linen: From Normandy Fields to Summer Tailoring',
      category: 'FABRIC & CRAFT',
      readTime: '5 min read',
      author: 'VS Atelier Team',
      date: 'Autumn 2026',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85',
      excerpt: 'Why unbleached French flax linen provides unmatched breathability, thermal comfort, and longevity in warm Indian climates.'
    },
    {
      id: 'art-02',
      title: 'Building a 12-Piece Capsule Wardrobe with Structured Basics',
      category: 'STYLING GUIDE',
      readTime: '7 min read',
      author: 'Design Direction',
      date: 'Autumn 2026',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85',
      excerpt: 'How to combine relaxed linen shirts, raw selvedge denim, and unstructured blazers to create 20+ distinct outfits.'
    },
    {
      id: 'art-03',
      title: 'Caring for Full-Grain Tuscan Leather: Conditioning & Natural Patina',
      category: 'PRODUCT CARE',
      readTime: '4 min read',
      author: 'Leather Craftsmen',
      date: 'Autumn 2026',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      excerpt: 'Simple steps to preserve vegetable-tanned leather totes and wallets so they age gracefully over decades.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-widest mx-auto">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Editorial Essays</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900">
          VS Style Journal
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
          In-depth stories on sustainable textiles, artisan leatherwork, capsule wardrobing, and product longevity.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xs flex flex-col justify-between group">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-neutral-900 rounded-md">
                  {article.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-4 text-xs text-neutral-400 font-medium">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <h2 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-xs text-neutral-500 font-normal leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover:translate-x-1 transition-transform">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
