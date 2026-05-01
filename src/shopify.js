const DOMAIN = "bug-away-3.myshopify.com";

// Variant map for Men's Jacket (has full size+color variants)
// Size mapping: XXL→2XL, XXXL→3XL
// Color mapping: "Stone Gray"→"Stone Grey"
const JACKET_MEN_VARIANTS = {
  "XS|Sage Green": 56675277242748,
  "XS|Stone Gray": 56675277275516,
  "XS|Arctic White": 56675277308284,
  "S|Sage Green": 56675277373820,
  "S|Stone Gray": 56675277406588,
  "S|Arctic White": 56675277439356,
  "M|Sage Green": 56675277504892,
  "M|Stone Gray": 56675277537660,
  "M|Arctic White": 56675277570428,
  "L|Sage Green": 56675277635964,
  "L|Stone Gray": 56675277668732,
  "L|Arctic White": 56675277701500,
  "XL|Sage Green": 56675277767036,
  "XL|Stone Gray": 56675277799804,
  "XL|Arctic White": 56675277832572,
  "XXL|Sage Green": 56675277898108,
  "XXL|Stone Gray": 56675277930876,
  "XXL|Arctic White": 56675277963644,
  "XXXL|Sage Green": 56675278029180,
  "XXXL|Stone Gray": 56675278061948,
  "XXXL|Arctic White": 56675278094716,
};

// Default (single) variant IDs for products without size/color variants
const DEFAULT_VARIANTS = {
  "ba-pants-men": 56675310240124,
  "ba-jacket-women": 56679167590780,
  "ba-pants-women": 56675313156476,
  "ba-kids-set": 56707992715644,
};

export const SHOPIFY_HANDLES = {
  "ba-jacket-men": "bug-away-jacket-men",
  "ba-pants-men": "bug-away-pants-men",
  "ba-jacket-women": "bug-away-jacket-women",
  "ba-pants-women": "bug-away-pants-women",
  "ba-combo-adults": "bug-away-combo-set-jacket-pants",
  "ba-kids-set": "bug-away-kids-set",
};

export const SHOPIFY_IDS = {
  "ba-jacket-men": "gid://shopify/Product/15967022023036",
  "ba-pants-men": "gid://shopify/Product/15967033393532",
  "ba-jacket-women": "gid://shopify/Product/15968024068476",
  "ba-pants-women": "gid://shopify/Product/15967035064700",
  "ba-combo-adults": "gid://shopify/Product/15968028721532",
  "ba-kids-set": "gid://shopify/Product/15972000825724",
};

export async function fetchProduct() {
  return null;
}

export async function buyNow(productId, selectedSize, selectedColor) {
  let variantId = null;

  if (productId === "ba-jacket-men" && selectedSize && selectedColor) {
    const key = `${selectedSize}|${selectedColor}`;
    variantId = JACKET_MEN_VARIANTS[key] || null;
  } else if (DEFAULT_VARIANTS[productId]) {
    variantId = DEFAULT_VARIANTS[productId];
  }

  if (variantId) {
    // Direct to cart — skips product page entirely
    window.location.href = `https://${DOMAIN}/cart/${variantId}:1`;
  } else {
    // Fallback to product page
    const handle = SHOPIFY_HANDLES[productId];
    window.location.href = handle
      ? `https://${DOMAIN}/products/${handle}`
      : `https://${DOMAIN}`;
  }
}
