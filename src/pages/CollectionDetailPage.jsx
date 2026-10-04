import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CURATED_COLLECTIONS, getProductsByIds } from '../data/fashionProducts';
import ProductCard from '../components/ProductCard';

export default function CollectionDetailPage({ 
  wishlistIds = [], 
  onToggleWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const collection = CURATED_COLLECTIONS.find(c => c.slug === slug) || CURATED_COLLECTIONS[0];
  const collectionProducts = getProductsByIds(collection.productIds);

  return (
    <div className="space-y-12">
      {/* Banner */}
      <div className="relative h-72 sm:h-96 w-full bg-neutral-900 overflow-hidden">
        <img
          src={collection.bannerImage}
          alt={collection.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 text-white">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-2">
            Curated Series — {collection.productCountText}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{collection.title}</h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl font-medium leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Showing {collectionProducts.length} Objects in this edit
          </span>
          <Link to="/shop" className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:underline">
            View All Collections
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {collectionProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onOpenDetail={(p) => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
