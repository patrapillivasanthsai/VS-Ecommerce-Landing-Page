// Centralized Product Filtering & Sorting Engine for VS Fashion Catalogue

export function filterAndSortProducts(products = [], filters = {}) {
  let result = [...products];

  // 1. Search Query Filter (name, department, category, subcategory, description, tag)
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.trim().toLowerCase();
    result = result.filter(p => 
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.department && p.department.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }

  // 2. Department Filter
  if (filters.department && filters.department !== 'all') {
    result = result.filter(p => p.department === filters.department.toLowerCase());
  }

  // 3. Category / Subcategory Filter
  if (filters.category && filters.category !== 'all') {
    const cat = filters.category.toLowerCase();
    result = result.filter(p => 
      (p.category && p.category.toLowerCase() === cat) ||
      (p.subcategory && p.subcategory.toLowerCase() === cat)
    );
  }

  // 4. Price Filter
  if (filters.priceRange && filters.priceRange !== 'all') {
    result = result.filter(p => {
      const price = p.salePrice ?? p.price ?? 0;
      if (filters.priceRange === 'under1000') return price < 1000;
      if (filters.priceRange === '1000to2499') return price >= 1000 && price <= 2499;
      if (filters.priceRange === '2500to4999') return price >= 2500 && price <= 4999;
      if (filters.priceRange === 'above5000') return price >= 5000;
      return true;
    });
  }

  // 5. Size Filter
  if (filters.size && filters.size !== 'all') {
    result = result.filter(p => 
      p.sizes && p.sizes.includes(filters.size)
    );
  }

  // 6. Colour Filter
  if (filters.color && filters.color !== 'all') {
    const targetColor = filters.color.toLowerCase();
    result = result.filter(p => 
      p.colors && p.colors.some(c => c.name.toLowerCase().includes(targetColor))
    );
  }

  // 7. Discount Filter
  if (filters.minDiscount && filters.minDiscount > 0) {
    result = result.filter(p => {
      const disc = p.discountPercent ?? 0;
      return disc >= Number(filters.minDiscount);
    });
  }

  // 8. Rating Filter
  if (filters.minRating && filters.minRating > 0) {
    result = result.filter(p => {
      const rat = p.rating ?? 0;
      return rat >= Number(filters.minRating);
    });
  }

  // 9. Sorting Logic
  const sortOption = filters.sortBy || 'recommended';

  if (sortOption === 'priceLow') {
    result.sort((a, b) => (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0));
  } else if (sortOption === 'priceHigh') {
    result.sort((a, b) => (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0));
  } else if (sortOption === 'discountHigh') {
    result.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));
  } else if (sortOption === 'ratingHigh') {
    result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (sortOption === 'newest') {
    result.sort((a, b) => {
      const aIsNew = a.tag && a.tag.toLowerCase().includes('new');
      const bIsNew = b.tag && b.tag.toLowerCase().includes('new');
      if (aIsNew && !bIsNew) return -1;
      if (!aIsNew && bIsNew) return 1;
      return 0;
    });
  } else {
    // Default 'recommended' sort prioritizing Bestseller, Featured, Trending, New
    result.sort((a, b) => {
      const score = (p) => {
        let val = 0;
        if (!p.tag) return val;
        const tag = p.tag.toLowerCase();
        if (tag.includes('bestseller')) val += 40;
        if (tag.includes('featured')) val += 30;
        if (tag.includes('trending')) val += 20;
        if (tag.includes('new')) val += 10;
        return val;
      };
      return score(b) - score(a);
    });
  }

  return result;
}

// Helper to extract unique dynamic sizes and colors from a product list
export function extractAvailableFacetOptions(products = []) {
  const sizesSet = new Set();
  const colorsMap = new Map();

  products.forEach(p => {
    if (p.sizes && Array.isArray(p.sizes)) {
      p.sizes.forEach(s => {
        if (s !== 'One Size') sizesSet.add(s);
      });
    }

    if (p.colors && Array.isArray(p.colors)) {
      p.colors.forEach(c => {
        if (c.name && !colorsMap.has(c.name)) {
          colorsMap.set(c.name, c.hex || '#000000');
        }
      });
    }
  });

  return {
    sizes: Array.from(sizesSet),
    colors: Array.from(colorsMap.entries()).map(([name, hex]) => ({ name, hex }))
  };
}
