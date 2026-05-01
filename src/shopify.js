const DOMAIN = "bug-away-3.myshopify.com";
const TOKEN = "004b48ca4e15861c0b3be9b484ae0d9b";

export const SHOPIFY_IDS = {
  "ba-jacket-men": "gid://shopify/Product/15967022023036",
  "ba-pants-men": "gid://shopify/Product/15967033393532",
  "ba-jacket-women": "gid://shopify/Product/15968024068476",
  "ba-pants-women": "gid://shopify/Product/15967035064700",
  "ba-combo-adults": "gid://shopify/Product/15968028721532",
  "ba-kids-set": "gid://shopify/Product/15972000825724",
};

export const SHOPIFY_HANDLES = {
  "ba-jacket-men": "bug-away-jacket-men",
  "ba-pants-men": "bug-away-pants-men",
  "ba-jacket-women": "bug-away-jacket-women",
  "ba-pants-women": "bug-away-pants-women",
  "ba-combo-adults": "bug-away-combo-set-jacket-pants",
  "ba-kids-set": "bug-away-kids-set",
};

export async function fetchProduct() {
  return null;
}

export async function buyNow(productId) {
  const handle = SHOPIFY_HANDLES[productId];
  window.location.href = handle
    ? `https://${DOMAIN}/products/${handle}`
    : `https://${DOMAIN}`;
}
