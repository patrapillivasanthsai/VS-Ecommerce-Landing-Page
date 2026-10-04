// Recommendation Utility Engine for VS Store
// Pure, deterministic recommendation logic based on catalogue metadata without external APIs

import { FASHION_PRODUCTS, COMPLETE_THE_LOOK_MAP, getProductsByIds } from '../data/fashionProducts';

/**
 * Get related products based on product subcategory, category, and department priority
 */
export const getRelatedProducts = (product, limit = 4) => {
  if (!product || !product.id) return [];

  const candidatePool = FASHION_PRODUCTS.filter(p => p.id !== product.id);

  // 1. Same subcategory
  const sameSubcat = candidatePool.filter(p => 
    product.subcategory && p.subcategory === product.subcategory
  );

  // 2. Same category
  const sameCategory = candidatePool.filter(p => 
    p.category === product.category && !sameSubcat.some(s => s.id === p.id)
  );

  // 3. Same department
  const sameDept = candidatePool.filter(p => 
    p.department === product.department && 
    !sameSubcat.some(s => s.id === p.id) && 
    !sameCategory.some(c => c.id === p.id)
  );

  // Combine results in priority order
  const combined = [...sameSubcat, ...sameCategory, ...sameDept];

  // If still under limit, fill with remaining items from catalogue
  if (combined.length < limit) {
    const remaining = candidatePool.filter(p => !combined.some(c => c.id === p.id));
    combined.push(...remaining);
  }

  return combined.slice(0, limit);
};

/**
 * Get Complete the Look items with fallback complement resolution & safe ID validation
 */
export const getCompleteTheLookProducts = (product, limit = 4) => {
  if (!product || !product.id) return [];

  // 1. Check explicit map entries
  const mappedIds = COMPLETE_THE_LOOK_MAP[product.id] || [];
  const validMappedProducts = getProductsByIds(mappedIds).filter(p => p && p.id !== product.id);

  if (validMappedProducts.length >= limit) {
    return validMappedProducts.slice(0, limit);
  }

  // 2. Fallback complement logic if mapped products are fewer than limit
  const candidatePool = FASHION_PRODUCTS.filter(p => 
    p.id !== product.id && !validMappedProducts.some(m => m.id === p.id)
  );

  // Complementary selection rules
  const complements = candidatePool.filter(p => {
    // If current item is a shirt/top/jacket, pair with denim/trousers/accessories
    if (['Shirts', 'T-Shirts', 'Kurtas', 'Jackets', 'Tops', 'Knitwear'].includes(product.category)) {
      return ['Trousers', 'Denim', 'Bags', 'Eyewear', 'Watches', 'Footwear'].includes(p.category);
    }
    // If current item is trousers/denim, pair with shirts/knitwear/accessories
    if (['Trousers', 'Denim', 'Bottoms'].includes(product.category)) {
      return ['Shirts', 'T-Shirts', 'Jackets', 'Bags', 'Eyewear', 'Watches'].includes(p.category);
    }
    // If current item is a dress/ethic wear, pair with bags/eyewear/jewelry/scarves
    if (['Dresses', 'Sarees', 'Co-ords'].includes(product.category)) {
      return ['Bags', 'Eyewear', 'Watches', 'Jewelry', 'Scarves', 'Jackets'].includes(p.category);
    }
    // Default complement: mix across opposite department or accessories
    return p.department === 'accessories' || p.department !== product.department;
  });

  const finalLook = [...validMappedProducts, ...complements];
  return finalLook.slice(0, limit);
};
