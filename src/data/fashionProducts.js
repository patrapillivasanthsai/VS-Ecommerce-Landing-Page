// Centralized VS Fashion Product Data Source & Architecture
// Single Source of Truth for Products, Collections, Lookbooks, Variants & Recently Viewed

export const DEPARTMENTS = [
  { id: 'all', name: 'All Departments', path: '/shop' },
  { id: 'men', name: 'Men', path: '/men', bannerImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1600&q=85', tagline: 'Structured Tailoring & Everyday Essentials for Men' },
  { id: 'women', name: 'Women', path: '/women', bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85', tagline: 'Effortless Elegance & Modern Silhouettes for Women' },
  { id: 'kids', name: 'Kids', path: '/kids', bannerImage: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1600&q=85', tagline: 'Soft Organic Cottons & Durable Everyday Wear for Kids' },
  { id: 'accessories', name: 'Accessories', path: '/accessories', bannerImage: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1600&q=85', tagline: 'Precision Leatherwork, Timepieces & Fine Accessories' }
];

export const COUPONS = [
  {
    code: 'VSFIRST20',
    discountPercent: 20,
    minOrderAmount: 1999,
    description: 'Flat 20% OFF on orders above ₹1,999 for first-time buyers',
    tag: 'NEW USER'
  },
  {
    code: 'VSAUTUMN15',
    discountPercent: 15,
    minOrderAmount: 2499,
    description: '15% OFF on Autumn/Winter fashion collection above ₹2,499',
    tag: 'SEASONAL'
  },
  {
    code: 'VSEVERYDAY10',
    discountPercent: 10,
    minOrderAmount: 999,
    description: 'Extra 10% OFF on all everyday accessories & essentials',
    tag: 'EVERYDAY'
  }
];

export const FASHION_PRODUCTS = [
  // --- MEN'S DEPARTMENT (11 Products) ---
  {
    id: 'vs-m-01',
    name: 'Relaxed Italian Linen Shirt',
    department: 'men',
    category: 'Shirts',
    subcategory: 'Linen Shirts',
    originalPrice: 3999,
    salePrice: 2499,
    discountPercent: 38,
    tag: 'Bestseller',
    rating: 4.9,
    reviewsCount: 142,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand Beige', hex: '#D7C4B7' },
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Navy Blue', hex: '#1B263B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Crafted from 100% French flax linen, featuring a relaxed spread collar, mother-of-pearl buttons, and breathable drape for warm climates.',
    details: ['100% French Flax Linen', 'Pre-washed for cloud-like softness', 'Chest patch pocket', 'Spread collar silhouette'],
    fit: 'Relaxed Fit',
    material: '100% French Flax Linen',
    care: 'Machine wash cold on gentle cycle, hang dry in shade',
    inStock: true
  },
  {
    id: 'vs-m-02',
    name: 'Structured Cotton Chino Trousers',
    department: 'men',
    category: 'Trousers',
    subcategory: 'Chino Trousers',
    originalPrice: 3499,
    salePrice: 2199,
    discountPercent: 37,
    tag: 'Essential',
    rating: 4.8,
    reviewsCount: 98,
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Olive Green', hex: '#4B5320' },
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Charcoal', hex: '#333333' }
    ],
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Tailored stretch cotton chinos with clean flat-front tailoring, horn buttons, and reinforced pocket lining.',
    details: ['98% Organic Cotton, 2% Elastane', 'Flat front silhouette', 'YKK zip fly with button closure', 'Slim-tapered cut'],
    fit: 'Slim Tapered',
    material: '98% Organic Cotton, 2% Elastane',
    care: 'Machine wash warm, tumble dry low, warm iron if needed',
    inStock: true
  },
  {
    id: 'vs-m-03',
    name: 'Minimalist Unstructured Blazer',
    department: 'men',
    category: 'Jackets',
    subcategory: 'Tailored Blazers',
    originalPrice: 7999,
    salePrice: 4999,
    discountPercent: 38,
    tag: 'Featured',
    rating: 5.0,
    reviewsCount: 76,
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Slate Grey', hex: '#4F5D75' },
      { name: 'Midnight Navy', hex: '#0D1B2A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Lightweight tropical wool blend blazer with soft shoulders and an unlined interior for smart-casual tailoring.',
    details: ['60% Wool, 40% Viscose', 'Dual back vents', 'Patch hand pockets', 'Notched lapel design'],
    fit: 'Tailored Modern Fit',
    material: '60% Wool, 40% Viscose',
    care: 'Dry clean only',
    inStock: true
  },
  {
    id: 'vs-m-04',
    name: 'Heavyweight Supima Cotton Tee',
    department: 'men',
    category: 'T-Shirts',
    subcategory: 'Crewneck T-Shirts',
    originalPrice: 1799,
    salePrice: 1199,
    discountPercent: 33,
    tag: 'Core Essential',
    rating: 4.7,
    reviewsCount: 210,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#121212' },
      { name: 'Off-White', hex: '#FAF9F5' },
      { name: 'Forest Green', hex: '#2D4A3E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85'
    ],
    description: '240 GSM long-staple Supima cotton crewneck t-shirt with blind-stitched hems and anti-pilling structure.',
    details: ['100% American Supima Cotton', '240 GSM heavyweight weave', 'Ribbed neckband', 'Pre-shrunk fabric'],
    fit: 'Regular Boxy Fit',
    material: '100% Supima Cotton',
    care: 'Machine wash cold with like colors, cool iron inside out',
    inStock: true
  },
  {
    id: 'vs-m-05',
    name: 'Raw Selvedge Denim Jeans',
    department: 'men',
    category: 'Denim',
    subcategory: 'Straight Denim',
    originalPrice: 5999,
    salePrice: 3899,
    discountPercent: 35,
    tag: 'Crafted',
    rating: 4.9,
    reviewsCount: 64,
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Indigo Blue', hex: '#1F2937' },
      { name: 'Washed Black', hex: '#262626' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c36856d67?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: '14oz shuttle-loomed Japanese selvedge denim designed to fade uniquely with wear.',
    details: ['100% Cotton 14oz Selvedge Denim', 'Red-line selvedge seam tape', 'Custom engraved brass rivets', 'Classic 5-pocket styling'],
    fit: 'Straight Leg',
    material: '100% Japanese Selvedge Cotton',
    care: 'Wash inside out in cold water after 30 wears',
    inStock: true
  },
  {
    id: 'vs-m-06',
    name: 'Fine Merino Wool Crew Knit',
    department: 'men',
    category: 'Jackets',
    subcategory: 'Knitwear',
    originalPrice: 4999,
    salePrice: 3299,
    discountPercent: 34,
    tag: 'Seasonal',
    rating: 4.8,
    reviewsCount: 53,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Melange', hex: '#D6C7B2' },
      { name: 'Charcoal Grey', hex: '#374151' }
    ],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Superfine 19.5-micron Australian merino wool sweater offering natural thermal regulation and softness.',
    details: ['100% Australian Merino Wool', 'Fine 12-gauge knit construction', 'Ribbed cuffs and hem line'],
    fit: 'Standard Fit',
    material: '100% Merino Wool',
    care: 'Hand wash cold or dry clean, reshape while damp and dry flat',
    inStock: true
  },
  {
    id: 'vs-m-07',
    name: 'Modern Silk-Cotton Kurta',
    department: 'men',
    category: 'Kurtas',
    subcategory: 'Ethnic Kurtas',
    originalPrice: 4499,
    salePrice: 2899,
    discountPercent: 36,
    tag: 'Heritage',
    rating: 4.9,
    reviewsCount: 88,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Midnight Navy', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1597983073493-88cd35cf03b0?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Contemporary mandarin collar kurta woven with Mulberry silk blend, featuring hidden placket buttons.',
    details: ['60% Mulberry Silk, 40% Organic Cotton', 'Mandarin collar silhouette', 'Side seam pockets'],
    fit: 'Tailored Kurta Fit',
    material: '60% Mulberry Silk, 40% Organic Cotton',
    care: 'Gentle hand wash or dry clean',
    inStock: true
  },
  {
    id: 'vs-m-08',
    name: 'Organic Oxford Cloth Button-Down',
    department: 'men',
    category: 'Shirts',
    subcategory: 'Oxford Shirts',
    originalPrice: 3299,
    salePrice: 1999,
    discountPercent: 39,
    tag: 'Classic',
    rating: 4.7,
    reviewsCount: 115,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sky Blue', hex: '#BAE6FD' },
      { name: 'Classic White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Durable basket-weave organic Oxford cotton shirt with button-down collar roll and box pleat back.',
    details: ['100% Organic Oxford Cotton', 'Button-down collar roll', 'Single chest pocket', 'Curved hemline'],
    fit: 'Regular Fit',
    material: '100% Organic Oxford Cotton',
    care: 'Machine wash warm, tumble dry low',
    inStock: true
  },
  {
    id: 'vs-m-09',
    name: 'Wool-Blend Trench Overcoat',
    department: 'men',
    category: 'Jackets',
    subcategory: 'Overcoats',
    originalPrice: 11999,
    salePrice: 7999,
    discountPercent: 33,
    tag: 'Luxury',
    rating: 5.0,
    reviewsCount: 39,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Obsidian Black', hex: '#121212' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Double-breasted trench coat in heavy Melton wool blend, lined with satin Bemberg lining.',
    details: ['70% Wool, 30% Polyamide outer', 'Full cupro lining', 'Waist tie belt with horn buckle'],
    fit: 'Overcoat Fit',
    material: '70% Wool, 30% Polyamide',
    care: 'Specialist dry clean only',
    inStock: true
  },
  {
    id: 'vs-m-10',
    name: 'Relaxed Fit Utility Cargo Trousers',
    department: 'men',
    category: 'Trousers',
    subcategory: 'Cargo Pants',
    originalPrice: 3899,
    salePrice: 2599,
    discountPercent: 33,
    tag: 'New',
    rating: 4.6,
    reviewsCount: 47,
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Faded Khaki', hex: '#8B8589' },
      { name: 'Dark Olive', hex: '#3B413A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506629082925-2368c4b0c793?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Cotton ripstop cargo pants featuring subtle low-profile side bellows pockets and adjustable hem drawstrings.',
    details: ['100% Cotton Ripstop fabric', 'Articulated knee construction', 'Dual cargo bellows pockets'],
    fit: 'Relaxed Utility Fit',
    material: '100% Cotton Ripstop',
    care: 'Machine wash cold, tumble dry low',
    inStock: true
  },
  {
    id: 'vs-m-11',
    name: 'Structured Denim Overshirt Jacket',
    department: 'men',
    category: 'Jackets',
    subcategory: 'Denim Jackets',
    originalPrice: 4799,
    salePrice: 3199,
    discountPercent: 33,
    tag: 'Trending',
    rating: 4.8,
    reviewsCount: 82,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Wash Denim', hex: '#4B6B94' },
      { name: 'Raw Black', hex: '#1F1F1F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85'
    ],
    description: '12oz mid-weight denim overshirt engineered with dual chest flap pockets and matte silver tack buttons.',
    details: ['100% Cotton 12oz Denim', 'Flat felled seams', 'Adjustable button cuffs'],
    fit: 'Relaxed Overshirt Fit',
    material: '100% Cotton Denim',
    care: 'Machine wash cold inside out',
    inStock: true
  },

  // --- WOMEN'S DEPARTMENT (11 Products) ---
  {
    id: 'vs-w-01',
    name: 'Silk-Blend Belted Wrap Dress',
    department: 'women',
    category: 'Dresses',
    subcategory: 'Midi Dresses',
    originalPrice: 6999,
    salePrice: 4499,
    discountPercent: 36,
    tag: 'Bestseller',
    rating: 4.9,
    reviewsCount: 124,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Terracotta Red', hex: '#B85D43' },
      { name: 'Champagne Beige', hex: '#E6D7C3' },
      { name: 'Obsidian Black', hex: '#121212' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Fluid midi-length wrap dress tailored from Mulberry silk crepe, featuring kimono-inspired sleeves and tie belt waist.',
    details: ['70% Mulberry Silk, 30% Rayon Crepe', 'V-neckline wrap silhouette', 'Side slit design for graceful movement'],
    fit: 'Adjustable Wrap Fit',
    material: '70% Mulberry Silk, 30% Rayon Crepe',
    care: 'Dry clean recommended or hand wash cold gently',
    inStock: true
  },
  {
    id: 'vs-w-02',
    name: 'Tailored Double-Breasted Blazer',
    department: 'women',
    category: 'Outerwear',
    subcategory: 'Blazers',
    originalPrice: 8499,
    salePrice: 5499,
    discountPercent: 35,
    tag: 'Featured',
    rating: 5.0,
    reviewsCount: 68,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Ivory White', hex: '#FDFBF7' },
      { name: 'Midnight Navy', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548624149-f1b9626cbe38?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Power-structured wool blazer with sharp peak lapels, tortoise shell buttons, and fully lined internal structure.',
    details: ['55% Wool, 42% Polyester, 3% Elastane', 'Double breasted closure', 'Functional welt flap pockets'],
    fit: 'Structured Tailored Fit',
    material: '55% Wool, 42% Polyester, 3% Elastane',
    care: 'Dry clean only',
    inStock: true
  },
  {
    id: 'vs-w-03',
    name: 'Wide-Leg Pleated Tailored Trousers',
    department: 'women',
    category: 'Trousers',
    subcategory: 'Wide Leg Pants',
    originalPrice: 4299,
    salePrice: 2799,
    discountPercent: 35,
    tag: 'Trending',
    rating: 4.8,
    reviewsCount: 91,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Charcoal Grey', hex: '#374151' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'High-waisted trousers with front double pleats creating a fluid wide-leg profile.',
    details: ['65% Polyester, 32% Viscose, 3% Elastane', 'High rise waistband', 'Hook and bar zip closure'],
    fit: 'High-Rise Wide Leg',
    material: '65% Polyester, 32% Viscose, 3% Elastane',
    care: 'Machine wash cold inside out, warm iron',
    inStock: true
  },
  {
    id: 'vs-w-04',
    name: '100% Cashmere Crewneck Sweater',
    department: 'women',
    category: 'Tops',
    subcategory: 'Knitwear',
    originalPrice: 7999,
    salePrice: 4999,
    discountPercent: 38,
    tag: 'Luxury',
    rating: 4.9,
    reviewsCount: 77,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Dusty Rose', hex: '#D4A59A' },
      { name: 'Cream White', hex: '#F7F4EF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Ultra-light 2-ply Mongolian cashmere knit with ribbed cuffs and neckband.',
    details: ['100% Grade-A Mongolian Cashmere', '2-ply 12-gauge knit', 'Seamless neck band trim'],
    fit: 'Classic Relaxed',
    material: '100% Grade-A Cashmere',
    care: 'Hand wash with wool detergent or dry clean',
    inStock: true
  },
  {
    id: 'vs-w-05',
    name: 'Structured Poplin Oversized Shirt',
    department: 'women',
    category: 'Shirts',
    subcategory: 'Cotton Shirts',
    originalPrice: 3199,
    salePrice: 1999,
    discountPercent: 38,
    tag: 'Essential',
    rating: 4.7,
    reviewsCount: 156,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'French Blue Stripe', hex: '#87CEEB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Boyfriend-cut poplin cotton shirt with exaggerated cuffs and dropped shoulder seams.',
    details: ['100% Organic Crisp Cotton Poplin', 'Exaggerated French cuffs', 'Mother of pearl buttons'],
    fit: 'Oversized Silhouette',
    material: '100% Organic Cotton Poplin',
    care: 'Machine wash cold, tumble dry low, warm iron',
    inStock: true
  },
  {
    id: 'vs-w-06',
    name: 'High-Rise Rigid Straight Denim',
    department: 'women',
    category: 'Denim',
    subcategory: 'Straight Jeans',
    originalPrice: 4599,
    salePrice: 2999,
    discountPercent: 35,
    tag: 'Core',
    rating: 4.8,
    reviewsCount: 112,
    sizes: ['26', '28', '30', '32'],
    colors: [
      { name: 'Vintage Blue Wash', hex: '#5B7C99' },
      { name: 'Washed Charcoal', hex: '#2F2F2F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Retro 90s inspired high-waist straight denim with minimal stretch to maintain crisp shape.',
    details: ['99% Cotton, 1% Elastane', 'High waist anchor line', 'Button fly closure'],
    fit: 'High-Rise Straight',
    material: '99% Organic Cotton, 1% Elastane',
    care: 'Machine wash cold inside out',
    inStock: true
  },
  {
    id: 'vs-w-07',
    name: 'Hand-Embroidered Chanderi Kurta Set',
    department: 'women',
    category: 'Ethnic',
    subcategory: 'Kurta Sets',
    originalPrice: 7999,
    salePrice: 4999,
    discountPercent: 38,
    tag: 'Heritage',
    rating: 5.0,
    reviewsCount: 84,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Blush Pink', hex: '#E8C5C8' }
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sheer Chanderi silk tunic paired with cotton lining and matching pants with zari border detailing.',
    details: ['Chanderi Silk Tunic with 100% Cotton Slip', 'Hand-done Gota Patti embroidery accents', 'Includes wide pants'],
    fit: 'Relaxed Elegant Fit',
    material: 'Chanderi Silk & Organic Cotton',
    care: 'Dry clean only',
    inStock: true
  },
  {
    id: 'vs-w-08',
    name: 'Ribbed Knit Bodycon Midi Dress',
    department: 'women',
    category: 'Dresses',
    subcategory: 'Knit Dresses',
    originalPrice: 4199,
    salePrice: 2699,
    discountPercent: 36,
    tag: 'New',
    rating: 4.6,
    reviewsCount: 41,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Chocolate Brown', hex: '#3D2314' },
      { name: 'Black', hex: '#121212' }
    ],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sculpting ribbed modal blend sweater dress featuring square neckline and side hem slit.',
    details: ['80% Modal, 20% Nylon', 'Form-fitting ribbed texture', 'Square front neckline'],
    fit: 'Fitted Bodycon',
    material: '80% Modal, 20% Nylon',
    care: 'Machine wash cold on delicate cycle, lay flat to dry',
    inStock: true
  },
  {
    id: 'vs-w-09',
    name: 'Double-Face Wool Minimalist Coat',
    department: 'women',
    category: 'Outerwear',
    subcategory: 'Coats',
    originalPrice: 12999,
    salePrice: 8499,
    discountPercent: 35,
    tag: 'Luxury',
    rating: 5.0,
    reviewsCount: 29,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E3D7C5' },
      { name: 'Midnight Black', hex: '#0B0B0B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Hand-stitched double-face wool wrap coat offering cocoon-like warmth without heavy lining.',
    details: ['100% Virgin Australian Wool', 'Hand-finished invisible seams', 'Self-tie waist sash belt'],
    fit: 'Relaxed Overcoat Fit',
    material: '100% Virgin Australian Wool',
    care: 'Specialist dry clean only',
    inStock: true
  },
  {
    id: 'vs-w-10',
    name: 'Satin Asymmetrical Midi Skirt',
    department: 'women',
    category: 'Tops',
    subcategory: 'Skirts',
    originalPrice: 3499,
    salePrice: 2199,
    discountPercent: 37,
    tag: 'Trending',
    rating: 4.7,
    reviewsCount: 63,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Olive Bronze', hex: '#556B2F' },
      { name: 'Champagne Satin', hex: '#F7E7CE' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582142407894-ec85a1260aee?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Bias-cut heavy satin skirt that drapes effortlessly around hips with concealed elastic waistband.',
    details: ['100% Viscose Heavy Satin', 'Bias cut for fluid silhouette', 'Concealed waistband'],
    fit: 'Bias Cut Slim Fit',
    material: '100% Viscose Satin',
    care: 'Hand wash cold or dry clean',
    inStock: true
  },
  {
    id: 'vs-w-11',
    name: 'Soft Linen Utility Shirt Dress',
    department: 'women',
    category: 'Dresses',
    subcategory: 'Shirt Dresses',
    originalPrice: 4899,
    salePrice: 3199,
    discountPercent: 35,
    tag: 'Summer Pick',
    rating: 4.8,
    reviewsCount: 72,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Natural Linen', hex: '#D2C4B1' },
      { name: 'Khaki Green', hex: '#4A5D4E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Button-down linen utility shirt dress with removable fabric belt and dual chest patch pockets.',
    details: ['100% Pure Washed Linen', 'Horn button front', 'Roll-up tab sleeve option'],
    fit: 'Relaxed Belted Fit',
    material: '100% Pure Washed Linen',
    care: 'Machine wash cold, line dry',
    inStock: true
  },

  // --- KIDS' DEPARTMENT (10 Products) ---
  {
    id: 'vs-k-01',
    name: 'Organic Cotton Crew Hoodie',
    department: 'kids',
    category: 'Outerwear',
    subcategory: 'Hoodies',
    originalPrice: 2299,
    salePrice: 1499,
    discountPercent: 35,
    tag: 'Bestseller',
    rating: 4.9,
    reviewsCount: 86,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Mustard Yellow', hex: '#E3A857' },
      { name: 'Heather Grey', hex: '#9CA3AF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Brushed fleece-lined GOTS certified organic cotton hoodie with gentle non-scratch seam construction.',
    details: ['100% GOTS Certified Organic Cotton', 'Kangaroo front hand pocket', 'Ribbed cuffs and hem'],
    fit: 'Relaxed Kid Fit',
    material: '100% GOTS Certified Organic Cotton',
    care: 'Machine wash warm inside out',
    inStock: true
  },
  {
    id: 'vs-k-02',
    name: 'Kids Lightweight Down Parka',
    department: 'kids',
    category: 'Outerwear',
    subcategory: 'Jackets',
    originalPrice: 3999,
    salePrice: 2599,
    discountPercent: 35,
    tag: 'Warmth',
    rating: 4.8,
    reviewsCount: 42,
    sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'Forest Olive', hex: '#374151' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Water-resistant nylon quilted parka filled with synthetic insulation for winter comfort.',
    details: ['100% Recycled Nylon Shell', 'Fleece lined collar hood', 'Reflective safety rear badge'],
    fit: 'Regular Outdoor Fit',
    material: '100% Recycled Water-Resistant Nylon',
    care: 'Machine wash cold, tumble dry low with tennis balls',
    inStock: true
  },
  {
    id: 'vs-k-03',
    name: 'Striped Organic Slub Cotton Tee',
    department: 'kids',
    category: 'T-Shirts',
    subcategory: 'Striped Tops',
    originalPrice: 1199,
    salePrice: 799,
    discountPercent: 33,
    tag: 'Core',
    rating: 4.7,
    reviewsCount: 110,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Navy & White Stripe', hex: '#1E293B' },
      { name: 'Terracotta Stripe', hex: '#C2410C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Soft slub cotton t-shirt designed for play, featuring expandable shoulder snaps for easy changing.',
    details: ['100% Organic Slub Cotton', 'Shoulder snap button opening', 'Tagless printed neck care label'],
    fit: 'Comfort Fit',
    material: '100% Organic Slub Cotton',
    care: 'Machine wash warm, tumble dry low',
    inStock: true
  },
  {
    id: 'vs-k-04',
    name: 'Flex-Stretch Denim Dungarees',
    department: 'kids',
    category: 'Denim',
    subcategory: 'Overalls',
    originalPrice: 2799,
    salePrice: 1799,
    discountPercent: 36,
    tag: 'Popular',
    rating: 4.9,
    reviewsCount: 75,
    sizes: ['3-4Y', '5-6Y', '7-8Y'],
    colors: [
      { name: 'Classic Indigo Wash', hex: '#3B82F6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Soft stretch cotton denim overalls with adjustable buckle shoulder straps and side button waist.',
    details: ['98% Cotton, 2% Elastane soft denim', 'Adjustable clip shoulder buckles', 'Bib patch pocket'],
    fit: 'Adjustable Dungaree Fit',
    material: '98% Cotton, 2% Elastane',
    care: 'Machine wash cold inside out',
    inStock: true
  },
  {
    id: 'vs-k-05',
    name: 'Linen-Blend Tiered Summer Dress',
    department: 'kids',
    category: 'Dresses',
    subcategory: 'Sundresses',
    originalPrice: 2499,
    salePrice: 1599,
    discountPercent: 36,
    tag: 'Cute Pick',
    rating: 4.8,
    reviewsCount: 58,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Coral Pink', hex: '#FB7185' },
      { name: 'Butter Yellow', hex: '#FDE047' }
    ],
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Airy linen-cotton dress with elasticated puff sleeves and a twirl-ready tiered skirt.',
    details: ['55% Linen, 45% Cotton', 'Rear keyhole button closure', 'Soft breathable cotton lining'],
    fit: 'Tiered Flare Fit',
    material: '55% Linen, 45% Cotton',
    care: 'Machine wash cold on gentle cycle',
    inStock: true
  },
  {
    id: 'vs-k-06',
    name: 'Cozy Fleece Jogger Trousers',
    department: 'kids',
    category: 'Sets',
    subcategory: 'Joggers',
    originalPrice: 1699,
    salePrice: 1099,
    discountPercent: 35,
    tag: 'Daily Wear',
    rating: 4.7,
    reviewsCount: 94,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Sage Green', hex: '#84A98C' },
      { name: 'Navy', hex: '#1E293B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Elastic drawstring waistband joggers with reinforced knee patches for outdoor play.',
    details: ['80% Organic Cotton, 20% Polyester', 'Internal soft brushed fleece', 'Durability double knee patches'],
    fit: 'Relaxed Jogger Fit',
    material: '80% Organic Cotton, 20% Polyester',
    care: 'Machine wash warm with similar colors',
    inStock: true
  },
  {
    id: 'vs-k-07',
    name: 'Chambray Cotton Resort Shirt',
    department: 'kids',
    category: 'Shirts',
    subcategory: 'Resort Shirts',
    originalPrice: 1899,
    salePrice: 1199,
    discountPercent: 37,
    tag: 'New',
    rating: 4.8,
    reviewsCount: 37,
    sizes: ['5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Light Blue Chambray', hex: '#93C5FD' }
    ],
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Breathable lightweight chambray shirt with cuban lapel collar for summer outings.',
    details: ['100% Light Cotton Chambray', 'Cuban camp collar', 'Natural wood buttons'],
    fit: 'Relaxed Shirt Fit',
    material: '100% Cotton Chambray',
    care: 'Machine wash cold, warm iron',
    inStock: true
  },
  {
    id: 'vs-k-08',
    name: 'Printed Pyjama & Shorts Set',
    department: 'kids',
    category: 'Sets',
    subcategory: 'Loungewear Sets',
    originalPrice: 1599,
    salePrice: 999,
    discountPercent: 38,
    tag: 'Bedtime',
    rating: 4.9,
    reviewsCount: 118,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Cloud Blue Print', hex: '#BAE6FD' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Snug-fit two-piece loungewear set crafted from toxic-free organic jersey cotton.',
    details: ['100% Organic Jersey Cotton', 'Soft elastic waist shorts', 'Non-toxic eco print dyes'],
    fit: 'Snug Sleep Fit',
    material: '100% Organic Jersey Cotton',
    care: 'Machine wash cold inside out',
    inStock: true
  },
  {
    id: 'vs-k-09',
    name: 'Mini Trucker Denim Jacket',
    department: 'kids',
    category: 'Outerwear',
    subcategory: 'Denim Jackets',
    originalPrice: 2999,
    salePrice: 1899,
    discountPercent: 37,
    tag: 'Classic',
    rating: 4.8,
    reviewsCount: 52,
    sizes: ['5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Medium Wash Denim', hex: '#3B82F6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Iconic trucker jacket scaled down for kids, featuring easy snap button closures.',
    details: ['100% Cotton Soft Denim', 'Easy snap buttons instead of stiff metal rivets', 'Twin chest flap pockets'],
    fit: 'Mini Trucker Fit',
    material: '100% Soft Cotton Denim',
    care: 'Machine wash cold inside out',
    inStock: true
  },
  {
    id: 'vs-k-10',
    name: 'Soft Cable Knit Cardigan',
    department: 'kids',
    category: 'Outerwear',
    subcategory: 'Knitwear',
    originalPrice: 2499,
    salePrice: 1599,
    discountPercent: 36,
    tag: 'Cozy',
    rating: 4.7,
    reviewsCount: 44,
    sizes: ['3-4Y', '5-6Y', '7-8Y'],
    colors: [
      { name: 'Cream Oat', hex: '#FDFBF7' }
    ],
    images: [
      'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Chunky cable-knit cardigan crafted from itch-free cotton-wool yarn.',
    details: ['80% Cotton, 20% Fine Wool', 'V-neckline button front', 'Ribbed cuffs and hem'],
    fit: 'Standard Knit Fit',
    material: '80% Cotton, 20% Wool',
    care: 'Hand wash cold, dry flat',
    inStock: true
  },

  // --- ACCESSORIES DEPARTMENT (12 Products) ---
  {
    id: 'vs-a-01',
    name: 'Full-Grain Italian Leather Tote Bag',
    department: 'accessories',
    category: 'Bags',
    subcategory: 'Totes',
    originalPrice: 9999,
    salePrice: 6499,
    discountPercent: 35,
    tag: 'Bestseller',
    rating: 4.9,
    reviewsCount: 158,
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac Brown', hex: '#78350F' },
      { name: 'Obsidian Black', hex: '#121212' },
      { name: 'Taupe Grey', hex: '#78716C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Vegetable-tanned Tuscan leather tote designed to fit a 15" laptop with magnetic tab closure and internal zip pouch.',
    details: ['100% Full Grain Italian Calfskin', 'Suede interior finish', 'Fits up to 15.6" laptop'],
    fit: 'Spacious Tote Dimensions: 42cm x 34cm x 14cm',
    material: '100% Italian Full-Grain Leather',
    care: 'Wipe clean with soft cloth, apply leather conditioner twice yearly',
    inStock: true
  },
  {
    id: 'vs-a-02',
    name: 'Minimalist Automatic Watch',
    department: 'accessories',
    category: 'Watches',
    subcategory: 'Analog Watches',
    originalPrice: 14999,
    salePrice: 9999,
    discountPercent: 33,
    tag: 'Luxury',
    rating: 5.0,
    reviewsCount: 62,
    sizes: ['40mm'],
    colors: [
      { name: 'Silver & Black Strap', hex: '#9CA3AF' },
      { name: 'Rose Gold & Tan', hex: '#F43F5E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Japanese Miyota automatic movement watch housed in 316L surgical stainless steel casing with sapphire crystal lens.',
    details: ['316L Surgical Stainless Steel', 'Sapphire crystal scratch-resistant glass', '5 ATM Water resistance', '40-hour power reserve'],
    fit: '40mm Case Diameter, 20mm Strap Width',
    material: '316L Stainless Steel & Horween Leather',
    care: 'Avoid prolonged submersion; service mechanical movement every 3 years',
    inStock: true
  },
  {
    id: 'vs-a-03',
    name: 'Handcrafted Canvas & Leather Backpack',
    department: 'accessories',
    category: 'Bags',
    subcategory: 'Backpacks',
    originalPrice: 6499,
    salePrice: 4199,
    discountPercent: 35,
    tag: 'Featured',
    rating: 4.8,
    reviewsCount: 93,
    sizes: ['One Size'],
    colors: [
      { name: 'Olive Canvas', hex: '#4B5320' },
      { name: 'Charcoal Grey', hex: '#374151' }
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    description: '18oz heavy waxed canvas backpack trimmed with saddle leather and solid brass hardware.',
    details: ['18oz Water-Resistant Waxed Canvas', 'Padded 15" laptop compartment', 'Brass quick-release buckles'],
    fit: '22 Litre Capacity',
    material: 'Waxed Cotton Canvas & Saddle Leather',
    care: 'Spot clean with damp cloth, re-wax canvas periodically',
    inStock: true
  },
  {
    id: 'vs-a-04',
    name: 'Polarized Acetate Sunglasses',
    department: 'accessories',
    category: 'Sunglasses',
    subcategory: 'Eyewear',
    originalPrice: 4599,
    salePrice: 2999,
    discountPercent: 35,
    tag: 'Trending',
    rating: 4.8,
    reviewsCount: 71,
    sizes: ['Medium'],
    colors: [
      { name: 'Tortoiseshell', hex: '#78350F' },
      { name: 'Solid Black', hex: '#121212' }
    ],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Hand-polished bio-acetate frames featuring Category 3 polarized UV400 lenses with anti-reflective coating.',
    details: ['Hand-cut Mazzucchelli Acetate', '100% UV400 Polarized Lenses', 'Includes hard leather case and microfiber cloth'],
    fit: 'Frame Width: 142mm, Lens: 50mm',
    material: 'Mazzucchelli Bio-Acetate',
    care: 'Clean with provided microfiber cloth and lens spray',
    inStock: true
  },
  {
    id: 'vs-a-05',
    name: 'Slim Bifold Leather Cardholder Wallet',
    department: 'accessories',
    category: 'Wallets',
    subcategory: 'Cardholders',
    originalPrice: 2499,
    salePrice: 1599,
    discountPercent: 36,
    tag: 'Essential',
    rating: 4.9,
    reviewsCount: 134,
    sizes: ['One Size'],
    colors: [
      { name: 'Espresso Brown', hex: '#3B1E08' },
      { name: 'Navy Blue', hex: '#1E3A8A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Ultra-thin vegetable tanned leather wallet equipped with RFID blocking shielding.',
    details: ['100% Vegetable Tanned Cowhide', '6 card slots + central cash slot', 'RFID signal blocking lining'],
    fit: 'Dimensions: 10cm x 7.5cm x 0.5cm',
    material: '100% Top-Grain Leather',
    care: 'Keep dry, store in protective dust pouch when not in use',
    inStock: true
  },
  {
    id: 'vs-a-06',
    name: '100% Pure Mulberry Silk Scarf',
    department: 'accessories',
    category: 'Scarves',
    subcategory: 'Silk Scarves',
    originalPrice: 3899,
    salePrice: 2499,
    discountPercent: 36,
    tag: 'Heritage',
    rating: 4.9,
    reviewsCount: 48,
    sizes: ['90x90cm'],
    colors: [
      { name: 'Botanical Gold Print', hex: '#D97706' },
      { name: 'Navy Azure Print', hex: '#2563EB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Hand-rolled hem silk square scarf with screen-printed geometric art.',
    details: ['100% 16-momme Mulberry Silk Twill', 'Hand-rolled edges', 'Square 90cm x 90cm format'],
    fit: '90cm x 90cm Square',
    material: '100% Mulberry Silk Twill',
    care: 'Dry clean only',
    inStock: true
  },
  {
    id: 'vs-a-07',
    name: 'Full-Grain Dress Leather Belt',
    department: 'accessories',
    category: 'Belts',
    subcategory: 'Leather Belts',
    originalPrice: 2299,
    salePrice: 1499,
    discountPercent: 35,
    tag: 'Core',
    rating: 4.7,
    reviewsCount: 88,
    sizes: ['32', '34', '36', '38'],
    colors: [
      { name: 'Dark Mahogany', hex: '#451A03' },
      { name: 'Matte Black', hex: '#121212' }
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85'
    ],
    description: '35mm wide full-grain leather dress belt with solid brushed stainless steel buckle pin.',
    details: ['100% Full Grain Harness Leather', 'Solid stainless steel hardware', 'Beveled painted edges'],
    fit: '35mm Strap Width',
    material: '100% Full-Grain Leather',
    care: 'Clean with damp cloth and leather balm',
    inStock: true
  },
  {
    id: 'vs-a-08',
    name: 'Hand-Stitched Leather Loafers',
    department: 'accessories',
    category: 'Footwear',
    subcategory: 'Loafers',
    originalPrice: 8999,
    salePrice: 5999,
    discountPercent: 33,
    tag: 'Crafted',
    rating: 4.9,
    reviewsCount: 57,
    sizes: ['40', '41', '42', '43', '44'],
    colors: [
      { name: 'Oxblood Red', hex: '#7F1D1D' },
      { name: 'Deep Espresso', hex: '#29180E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Goodyear welted calfskin penny loafers with memory foam cushioned footbed.',
    details: ['Full calfskin upper & leather lining', 'Goodyear welted construction', 'Stacked leather heel with rubber tap'],
    fit: 'Standard European Sizing',
    material: '100% Calfskin Leather',
    care: 'Apply shoe cream regularly and use wooden shoe trees',
    inStock: true
  },
  {
    id: 'vs-a-09',
    name: 'Sterling Silver Minimalist Cuff',
    department: 'accessories',
    category: 'Jewellery',
    subcategory: 'Bracelets',
    originalPrice: 4299,
    salePrice: 2799,
    discountPercent: 35,
    tag: 'Fine Metal',
    rating: 4.8,
    reviewsCount: 39,
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: '925 Silver', hex: '#E5E7EB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1611591475116-654a1a5b8216?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Solid 925 sterling silver open cuff bracelet with brushed matte inner face and polished edges.',
    details: ['100% Recycled 925 Sterling Silver', 'Engraved subtle VS seal mark', 'Adjustable open cuff design'],
    fit: 'Flexible Open Cuff Fit',
    material: '925 Sterling Silver',
    care: 'Store in airtight pouch, polish with silver polishing cloth',
    inStock: true
  },
  {
    id: 'vs-a-10',
    name: 'Minimalist Canvas Weekender Duffle Bag',
    department: 'accessories',
    category: 'Bags',
    subcategory: 'Duffle Bags',
    originalPrice: 7999,
    salePrice: 5199,
    discountPercent: 35,
    tag: 'Travel',
    rating: 4.9,
    reviewsCount: 81,
    sizes: ['One Size'],
    colors: [
      { name: 'Navy & Tan Trim', hex: '#1E3A8A' },
      { name: 'All Black Canvas', hex: '#121212' }
    ],
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Cabin-approved 45L travel duffle with dedicated side shoe compartment and leather shoulder pad.',
    details: ['Heavyweight 20oz Cotton Canvas', 'Separate exterior zippered shoe tunnel', 'Detachable shoulder strap'],
    fit: '45L Capacity (Cabin Approved)',
    material: 'Heavyweight Canvas & Top-Grain Leather',
    care: 'Spot clean with mild soapy water',
    inStock: true
  },
  {
    id: 'vs-a-11',
    name: '100% Cashmere Ribbed Winter Scarf',
    department: 'accessories',
    category: 'Scarves',
    subcategory: 'Knit Scarves',
    originalPrice: 4999,
    salePrice: 3299,
    discountPercent: 34,
    tag: 'Cozy',
    rating: 4.9,
    reviewsCount: 65,
    sizes: ['180x30cm'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#D6C7B2' },
      { name: 'Charcoal Grey', hex: '#374151' }
    ],
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Extra long rib-knit cashmere scarf offering cloud-like warmth around neck and shoulders.',
    details: ['100% Mongolian Cashmere', '7-gauge rib knit', 'Dimensions: 180cm x 30cm'],
    fit: '180cm x 30cm Length',
    material: '100% Cashmere',
    care: 'Hand wash cold or dry clean',
    inStock: true
  },
  {
    id: 'vs-a-12',
    name: 'Minimalist Leather Key Holder Pouch',
    department: 'accessories',
    category: 'Wallets',
    subcategory: 'Key Holders',
    originalPrice: 1799,
    salePrice: 1199,
    discountPercent: 33,
    tag: 'Gift Idea',
    rating: 4.7,
    reviewsCount: 50,
    sizes: ['One Size'],
    colors: [
      { name: 'Saddle Tan', hex: '#C19A6B' },
      { name: 'Matte Black', hex: '#121212' }
    ],
    images: [
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Structured leather key pouch with brass snap ring securing up to 6 keys without jingling.',
    details: ['100% Italian Cowhide Leather', 'Solid brass key ring hardware', 'Snap button envelope enclosure'],
    fit: 'Compact Key Organizer',
    material: '100% Cowhide Leather & Solid Brass',
    care: 'Wipe with soft dry cloth',
    inStock: true
  }
];

// --- SINGLE SOURCE OF TRUTH SCHEMAS & RELATIONSHIPS ---

// 1. Curated Editorial Collections (Referencing Product IDs)
export const CURATED_COLLECTIONS = [
  {
    slug: 'morning-atelier',
    title: 'The Morning Atelier',
    subtitle: '12 Objects for refined morning routines & effortless dressing',
    productCountText: '12 Objects',
    description: 'Curated essentials for starting the day with calm elegance, featuring breathable linens, soft organic cottons, and fine leatherwork.',
    bannerImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1600&q=85',
    productIds: ['vs-m-01', 'vs-m-04', 'vs-m-08', 'vs-w-01', 'vs-w-05', 'vs-w-07', 'vs-k-01', 'vs-k-03', 'vs-a-01', 'vs-a-02', 'vs-a-05', 'vs-a-06']
  },
  {
    slug: 'everyday-carry',
    title: 'Everyday Carry',
    subtitle: '18 Objects designed for movement, utility, and longevity',
    productCountText: '18 Objects',
    description: 'Precision accessories, durable denim, structured outerwear, and leather goods crafted for seamless transitions between work and travel.',
    bannerImage: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1600&q=85',
    productIds: ['vs-m-02', 'vs-m-05', 'vs-m-10', 'vs-m-11', 'vs-w-03', 'vs-w-06', 'vs-w-11', 'vs-k-04', 'vs-k-07', 'vs-k-09', 'vs-a-01', 'vs-a-03', 'vs-a-04', 'vs-a-05', 'vs-a-07', 'vs-a-08', 'vs-a-10', 'vs-a-12']
  },
  {
    slug: 'living-sanctuary',
    title: 'Living Sanctuary',
    subtitle: '15 Objects bringing quiet luxury & cashmere warmth to your space',
    productCountText: '15 Objects',
    description: 'Tactile knitwear, soft tailoring, home layers, and timeless accents designed to create a sense of sanctuary.',
    bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85',
    productIds: ['vs-m-03', 'vs-m-06', 'vs-m-07', 'vs-m-09', 'vs-w-02', 'vs-w-04', 'vs-w-08', 'vs-w-09', 'vs-w-10', 'vs-k-02', 'vs-k-05', 'vs-k-08', 'vs-k-10', 'vs-a-09', 'vs-a-11']
  }
];

// 2. Lookbook Outfits (Referencing Product IDs)
export const LOOKBOOK_OUTFITS = [
  {
    id: 'lb-01',
    title: 'The Riviera Atelier',
    season: 'Spring / Summer 2026',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Relaxed Italian Linen Shirt matched with Structured Cotton Chinos and Polarized Acetate Sunglasses.',
    productIds: ['vs-m-01', 'vs-m-02', 'vs-a-04']
  },
  {
    id: 'lb-02',
    title: 'Urban Monolith',
    season: 'Autumn / Winter 2026',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Tailored Double-Breasted Blazer layered over 100% Cashmere Crewneck with Full-Grain Italian Leather Tote.',
    productIds: ['vs-w-02', 'vs-w-04', 'vs-a-01']
  },
  {
    id: 'lb-03',
    title: 'Architectural Utility',
    season: 'Core Collection',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Minimalist Unstructured Blazer paired with Raw Selvedge Denim and Minimalist Automatic Watch.',
    productIds: ['vs-m-03', 'vs-m-05', 'vs-a-02']
  }
];

// 3. Complete the Look Mapping (Referencing Product IDs)
export const COMPLETE_THE_LOOK_MAP = {
  'vs-m-01': ['vs-m-02', 'vs-a-04', 'vs-a-05'],
  'vs-m-02': ['vs-m-01', 'vs-m-03', 'vs-a-08'],
  'vs-m-03': ['vs-m-05', 'vs-a-02', 'vs-a-01'],
  'vs-w-01': ['vs-a-01', 'vs-a-06', 'vs-a-09'],
  'vs-w-02': ['vs-w-03', 'vs-w-04', 'vs-a-01'],
  'vs-w-04': ['vs-w-03', 'vs-a-01', 'vs-a-11'],
  'vs-k-01': ['vs-k-06', 'vs-k-03'],
  'vs-a-01': ['vs-w-02', 'vs-m-03', 'vs-a-05']
};

// --- UTILITY FUNCTIONS FOR RECENTLY VIEWED & CART VARIANTS ---

// 1. Department counts helper
export const getDepartmentCounts = () => {
  const counts = { all: FASHION_PRODUCTS.length, men: 0, women: 0, kids: 0, accessories: 0 };
  FASHION_PRODUCTS.forEach(p => {
    if (counts[p.department] !== undefined) {
      counts[p.department]++;
    }
  });
  return counts;
};

// 2. Helper to fetch single product by ID
export const getProductById = (id) => {
  return FASHION_PRODUCTS.find(p => p.id === id) || null;
};

// 3. Helper to fetch products by array of IDs (Preserving order)
export const getProductsByIds = (ids = []) => {
  return ids
    .map(id => FASHION_PRODUCTS.find(p => p.id === id))
    .filter(Boolean);
};

// 4. Recently Viewed storage helpers (Max 10 items, safe localStorage)
const RECENTLY_VIEWED_KEY = 'vs_recently_viewed';

export const getRecentlyViewedIds = () => {
  try {
    const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const addRecentlyViewedId = (productId) => {
  if (!productId) return [];
  try {
    const existing = getRecentlyViewedIds();
    const filtered = existing.filter(id => id !== productId);
    const updated = [productId, ...filtered].slice(0, 8);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const getRecentlyViewedProducts = () => {
  const ids = getRecentlyViewedIds();
  return getProductsByIds(ids);
};

// 5. Variant-Aware Cart Item Key Generator
export const getCartItemKey = (productId, size = '', colorName = '') => {
  const cleanSize = size ? String(size).trim() : 'DEFAULT_SIZE';
  const cleanColor = colorName ? String(colorName).trim() : 'DEFAULT_COLOR';
  return `${productId}-${cleanSize}-${cleanColor}`;
};

// 6. Create variant-aware cart line item with backward compatibility
export const createCartLineItem = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
  if (!product || !product.id) return null;
  const size = selectedSize || (product.sizes && product.sizes.length ? product.sizes[0] : 'One Size');
  const color = selectedColor || (product.colors && product.colors.length ? product.colors[0] : { name: 'Standard', hex: '#121212' });
  const variantKey = getCartItemKey(product.id, size, color.name);

  return {
    ...product,
    variantKey,
    selectedSize: size,
    selectedColor: color,
    quantity
  };
};
