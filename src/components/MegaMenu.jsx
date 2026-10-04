import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Percent } from 'lucide-react';

export const MEGA_MENU_DATA = {
  shop: {
    title: 'Explore Shop',
    columns: [
      {
        heading: 'CURATED EDITS',
        items: [
          { label: 'New Arrivals 2026', path: '/shop' },
          { label: 'Bestseller Objects', path: '/shop' },
          { label: 'Promotional Offers', path: '/offers' },
          { label: 'Complete Catalog', path: '/shop' }
        ]
      },
      {
        heading: 'EDITORIAL SERIES',
        items: [
          { label: 'The Morning Atelier', path: '/collections/morning-atelier' },
          { label: 'Everyday Carry', path: '/collections/everyday-carry' },
          { label: 'Living Sanctuary', path: '/collections/living-sanctuary' },
          { label: 'Seasonal Lookbook', path: '/lookbook' }
        ]
      }
    ],
    feature: {
      tag: 'NEW SEASON',
      title: 'The Autumn Atelier',
      subtitle: 'Structured tailoring & French flax linens for effortless style.',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=600&q=85',
      path: '/collections/morning-atelier'
    }
  },
  men: {
    title: "Men's Atelier",
    columns: [
      {
        heading: 'CATEGORIES',
        items: [
          { label: 'Shirts', path: '/men?category=Shirts' },
          { label: 'T-Shirts', path: '/men?category=T-Shirts' },
          { label: 'Trousers', path: '/men?category=Trousers' },
          { label: 'Denim', path: '/men?category=Denim' },
          { label: 'Jackets & Blazers', path: '/men?category=Jackets' },
          { label: 'Silk Kurtas', path: '/men?category=Kurtas' }
        ]
      },
      {
        heading: 'HIGHLIGHTS',
        items: [
          { label: '100% French Flax Linens', path: '/men?category=Shirts' },
          { label: '14oz Selvedge Denim', path: '/men?category=Denim' },
          { label: 'Supima Cotton Tees', path: '/men?category=T-Shirts' }
        ]
      }
    ],
    feature: {
      tag: 'FEATURED',
      title: 'Italian Linen & Tailoring',
      subtitle: 'Pre-washed linens and unstructured wool blazers.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85',
      path: '/men'
    }
  },
  women: {
    title: "Women's Collection",
    columns: [
      {
        heading: 'CATEGORIES',
        items: [
          { label: 'Midi & Wrap Dresses', path: '/women?category=Dresses' },
          { label: 'Cashmere & Tops', path: '/women?category=Tops' },
          { label: 'Poplin Shirts', path: '/women?category=Shirts' },
          { label: 'Pleated Trousers', path: '/women?category=Trousers' },
          { label: 'High-Rise Denim', path: '/women?category=Denim' },
          { label: 'Chanderi Kurta Sets', path: '/women?category=Ethnic' },
          { label: 'Blazers & Wool Coats', path: '/women?category=Outerwear' }
        ]
      },
      {
        heading: 'SPECIALTY FABRICS',
        items: [
          { label: 'Grade-A Cashmere', path: '/women?category=Tops' },
          { label: 'Mulberry Silk Crepe', path: '/women?category=Dresses' },
          { label: 'Organic Cotton Poplin', path: '/women?category=Shirts' }
        ]
      }
    ],
    feature: {
      tag: 'ELEGANCE',
      title: 'Silk-Blend Belted Wrap',
      subtitle: 'Fluid silhouettes designed for effortless day-to-night transitions.',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=85',
      path: '/women'
    }
  },
  kids: {
    title: 'Kids Organic Essentials',
    columns: [
      {
        heading: 'CATEGORIES',
        items: [
          { label: 'Slub Cotton T-Shirts', path: '/kids?category=T-Shirts' },
          { label: 'Linen Tiered Dresses', path: '/kids?category=Dresses' },
          { label: 'Resort Shirts', path: '/kids?category=Shirts' },
          { label: 'Fleece Sets & Joggers', path: '/kids?category=Sets' },
          { label: 'Stretch Denim Dungarees', path: '/kids?category=Denim' },
          { label: 'Parkas & Cardigans', path: '/kids?category=Outerwear' }
        ]
      }
    ],
    feature: {
      tag: 'ORGANIC',
      title: 'Non-Toxic Play Wear',
      subtitle: 'GOTS certified organic cottons with tagless comfort.',
      image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=600&q=85',
      path: '/kids'
    }
  },
  accessories: {
    title: 'Fine Leather & Accessories',
    columns: [
      {
        heading: 'CATEGORIES',
        items: [
          { label: 'Leather Totes & Backpacks', path: '/accessories?category=Bags' },
          { label: 'RFID Leather Cardholders', path: '/accessories?category=Wallets' },
          { label: 'Dress Leather Belts', path: '/accessories?category=Belts' },
          { label: 'Goodyear Loafers', path: '/accessories?category=Footwear' },
          { label: 'Sterling Silver Cuffs', path: '/accessories?category=Jewellery' },
          { label: 'Automatic Watches', path: '/accessories?category=Watches' },
          { label: 'Polarized Sunglasses', path: '/accessories?category=Sunglasses' },
          { label: 'Mulberry Silk Scarves', path: '/accessories?category=Scarves' }
        ]
      }
    ],
    feature: {
      tag: 'LEATHERWORK',
      title: 'Tuscan Calfskin Tote',
      subtitle: 'Full-grain vegetable tanned leather built for a lifetime.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=85',
      path: '/accessories'
    }
  }
};

export default function MegaMenu({ activeTab, onClose }) {
  if (!activeTab || !MEGA_MENU_DATA[activeTab]) return null;

  const data = MEGA_MENU_DATA[activeTab];

  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#FAF9F5] border-b border-neutral-300/80 shadow-2xl z-50 pt-8 pb-10 px-8 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-start">
        
        {/* Navigation Columns (Cols 1-8) */}
        <div className="col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {data.columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="text-xs font-medium text-neutral-800 hover:text-black hover:font-bold transition-all inline-flex items-center space-x-1 group"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature Poster (Cols 9-12) */}
        {data.feature && (
          <div className="col-span-4">
            <Link 
              to={data.feature.path} 
              onClick={onClose}
              className="group block relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-md"
            >
              <img
                src={data.feature.image}
                alt={data.feature.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300">
                  {data.feature.tag}
                </span>
                <h5 className="text-sm font-bold tracking-tight leading-snug">
                  {data.feature.title}
                </h5>
                <p className="text-[11px] text-neutral-300 font-normal line-clamp-1">
                  {data.feature.subtitle}
                </p>
              </div>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
