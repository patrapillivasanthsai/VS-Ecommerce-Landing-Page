// Sample Demo Reviews Dataset & Local Storage Helpers for VS Store Demo
// Clearly identified as sample demo reviews without fake buyer verification claims

export const INITIAL_DEMO_REVIEWS = [
  {
    id: 'rev-m-01-1',
    productId: 'vs-m-01',
    name: 'Arjun M.',
    rating: 5,
    title: 'Exceptional linen fabric & drape',
    comment: 'The French flax linen feels incredibly soft right out of the packaging. Breathable and comfortable relaxed fit for warm climates.',
    date: 'October 2026',
    isDemo: true
  },
  {
    id: 'rev-m-01-2',
    productId: 'vs-m-01',
    name: 'Vikram S.',
    rating: 5,
    title: 'Versatile spread collar shirt',
    comment: 'Pairs effortlessly with both tailored chinos and casual denim. Mother-of-pearl buttons are a subtle premium detail.',
    date: 'September 2026',
    isDemo: true
  },
  {
    id: 'rev-m-01-3',
    productId: 'vs-m-01',
    name: 'Karan P.',
    rating: 4,
    title: 'Great fit, slightly sheer in white',
    comment: 'Sand Beige shade is gorgeous. The white variant is light as expected for 100% linen.',
    date: 'August 2026',
    isDemo: true
  },
  {
    id: 'rev-m-02-1',
    productId: 'vs-m-02',
    name: 'Rohan G.',
    rating: 5,
    title: 'Perfect slim-tapered chinos',
    comment: 'Clean flat-front tailoring with just enough stretch for daily movement. Excellent craftsmanship.',
    date: 'September 2026',
    isDemo: true
  },
  {
    id: 'rev-w-01-1',
    productId: 'vs-w-01',
    name: 'Ananya R.',
    rating: 5,
    title: 'Timeless silk wrap dress',
    comment: 'The Mulberry silk sheen is elegant without being overly shiny. Fits true to size and drapes gracefully.',
    date: 'October 2026',
    isDemo: true
  },
  {
    id: 'rev-w-02-1',
    productId: 'vs-w-02',
    name: 'Meera K.',
    rating: 5,
    title: 'Luxurious double-breasted blazer',
    comment: 'Structured shoulders and smooth lining. A staple piece for professional and evening wardrobes.',
    date: 'October 2026',
    isDemo: true
  },
  {
    id: 'rev-a-01-1',
    productId: 'vs-a-01',
    name: 'Siddharth T.',
    rating: 5,
    title: 'Supple full-grain leather tote',
    comment: 'Holds a 15-inch laptop and daily essentials comfortably. Rich leather smell and clean stitching.',
    date: 'September 2026',
    isDemo: true
  },
  {
    id: 'rev-k-01-1',
    productId: 'vs-k-01',
    name: 'Pooja V.',
    rating: 5,
    title: 'So soft for sensitive skin',
    comment: '100% organic cotton set that stays soft after multiple washes. My kid loves wearing it.',
    date: 'October 2026',
    isDemo: true
  }
];

const LOCAL_STORAGE_REVIEWS_KEY = 'vs_demo_reviews';

/**
 * Fetch all reviews for a product (initial sample reviews + user demo reviews from localStorage)
 */
export const getDemoReviewsForProduct = (productId) => {
  if (!productId) return [];

  // Base dataset reviews
  const baseReviews = INITIAL_DEMO_REVIEWS.filter(r => r.productId === productId);

  // Local storage user-created demo reviews
  let localReviews = [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      localReviews = parsed.filter(r => r.productId === productId);
    }
  } catch {
    localReviews = [];
  }

  // Combine local reviews first (newest), then base reviews
  return [...localReviews, ...baseReviews];
};

/**
 * Save a new user demo review to localStorage
 */
export const addDemoReview = (reviewData) => {
  if (!reviewData || !reviewData.productId) return null;

  const newReview = {
    id: `demo-rev-${Date.now()}`,
    productId: reviewData.productId,
    name: reviewData.name || 'Sample Visitor',
    rating: Number(reviewData.rating) || 5,
    title: reviewData.title.trim(),
    comment: reviewData.comment.trim(),
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    isDemo: true,
    isUserSubmitted: true
  };

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [newReview, ...existing];
    localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updated));
    return newReview;
  } catch {
    return null;
  }
};
