const DOMAIN = 'bug-away-3.myshopify.com';
const TOKEN = '004b48ca4e15861c0b3be9b484ae0d9b';
const API = `https://${DOMAIN}/api/2024-01/graphql.json`;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': TOKEN,
};

// Map our product IDs to Shopify GIDs
export const SHOPIFY_IDS = {
  'ba-jacket-men':    'gid://shopify/Product/15967022023036',
  'ba-pants-men':     'gid://shopify/Product/15967033393532',
  'ba-jacket-women':  'gid://shopify/Product/15968024068476',
  'ba-pants-women':   'gid://shopify/Product/15967035064700',
  'ba-combo-adults':  'gid://shopify/Product/15968028721532',
};

// Fetch a single product with all variants
export async function fetchProduct(shopifyGid) {
  const res = await fetch(API, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            description
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
            images(first: 10) {
              edges { node { url altText } }
            }
          }
        }
      `,
      variables: { id: shopifyGid },
    }),
  });
  const data = await res.json();
  return data.data?.product || null;
}

// Fetch all products
export async function fetchAllProducts() {
  const res = await fetch(API, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `{
        products(first: 20) {
          edges {
            node {
              id title description
              priceRange { minVariantPrice { amount currencyCode } }
              variants(first: 50) {
                edges {
                  node {
                    id title availableForSale
                    price { amount currencyCode }
                    selectedOptions { name value }
                  }
                }
              }
              images(first: 5) {
                edges { node { url altText } }
              }
            }
          }
        }
      }`,
    }),
  });
  const data = await res.json();
  return data.data?.products?.edges?.map(e => e.node) || [];
}

// Create checkout and redirect to Shopify
export async function buyNow(variantId, quantity = 1) {
  const res = await fetch(API, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        mutation createCheckout($input: CheckoutCreateInput!) {
          checkoutCreate(input: $input) {
            checkout { webUrl }
            checkoutUserErrors { message }
          }
        }
      `,
      variables: {
        input: {
          lineItems: [{ variantId, quantity }],
        },
      },
    }),
  });
  const data = await res.json();
  const url = data.data?.checkoutCreate?.checkout?.webUrl;
  if (url) window.location.href = url;
  else throw new Error('Could not create checkout');
}

// Add multiple items to checkout
export async function createCheckout(lineItems) {
  const res = await fetch(API, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        mutation createCheckout($input: CheckoutCreateInput!) {
          checkoutCreate(input: $input) {
            checkout { webUrl id }
            checkoutUserErrors { message field }
          }
        }
      `,
      variables: { input: { lineItems } },
    }),
  });
  const data = await res.json();
  return data.data?.checkoutCreate?.checkout || null;
}
