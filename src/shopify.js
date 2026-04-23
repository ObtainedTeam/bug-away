const SHOPIFY_DOMAIN = "bug-away-3.myshopify.com";
const STOREFRONT_TOKEN = "004b48ca4e15861c0b3be9b484ae0d9b";

export async function createCheckout(variantId, quantity = 1) {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `
        mutation checkoutCreate($input: CheckoutCreateInput!) {
          checkoutCreate(input: $input) {
            checkout {
              webUrl
            }
            checkoutUserErrors {
              message
            }
          }
        }
      `,
        variables: {
          input: {
            lineItems: [{ variantId, quantity }],
          },
        },
      }),
    },
  );

  const data = await response.json();
  return data.data.checkoutCreate.checkout.webUrl;
}

export async function getProducts() {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `{
        products(first: 20) {
          edges {
            node {
              id
              title
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }`,
      }),
    },
  );

  const data = await response.json();
  return data.data.products.edges.map((e) => e.node);
}
