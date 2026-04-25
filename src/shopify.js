const DOMAIN = 'bug-away-3.myshopify.com';
const TOKEN = '004b48ca4e15861c0b3be9b484ae0d9b';
const API = `https://${DOMAIN}/api/2025-10/graphql.json`;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': TOKEN,
};

export const SHOPIFY_IDS = {
  'ba-jacket-men':   'gid://shopify/Product/15967022023036',
  'ba-pants-men':    'gid://shopify/Product/15967033393532',
  'ba-jacket-women': 'gid://shopify/Product/15968024068476',
  'ba-pants-women':  'gid://shopify/Product/15967035064700',
  'ba-combo-adults': 'gid://shopify/Product/15968028721532',
};

export const SHOPIFY_HANDLES = {
  'ba-jacket-men':   'bug-away-jacket-men',
  'ba-pants-men':    'bug-away-pants-men',
  'ba-jacket-women': 'bug-away-jacket-women',
  'ba-pants-women':  'bug-away-pants-women',
  'ba-combo-adults': 'bug-away-combo-set-jacket-pants',
};

export async function fetchProduct(shopifyGid) {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `query getProduct($id: ID!) {
          product(id: $id) {
            id title
            priceRange { minVariantPrice { amount currencyCode } }
            variants(first: 50) {
              edges { node { id title availableForSale price { amount } selectedOptions { name value } } }
            }
          }
        }`,
        variables: { id: shopifyGid },
      }),
    });
    const data = await res.json();
    return data.data?.product || null;
  } catch {
    return null;
  }
}

export async function buyNow(productId, variantId, quantity = 1) {
  const handle = SHOPIFY_HANDLES[productId];
  if (!handle) { window.location.href = `https://${DOMAIN}`; return; }
  // Redirect directly to Shopify checkout via cart permalink
  window.location.href = `https://${DOMAIN}/products/${handle}?action=add_to_cart`;
}
