const DOMAIN = 'bug-away-3.myshopify.com';

// Normalize color names between website and Shopify.
// Website uses: 'Arctic White', 'Black'
// Shopify uses: 'Arctic White', 'Zwart'
function normColor(c) {
  if (c === 'Black')      return 'Zwart';
  if (c === 'Stone Gray') return 'Stone Grey';   // legacy fallback, not used in current UI
  return c;
}

// Normalize size: website uses XXL/XXXL, Shopify uses 2XL/3XL
function normSize(s) {
  if (s === 'XXL') return '2XL';
  if (s === 'XXXL') return '3XL';
  return s;
}

// ba-jacket-men: Size|Color
const JACKET_MEN = {
  "XS|Arctic White":56675277308284, "XS|Zwart":56675277341052,
  "S|Arctic White":56675277439356,  "S|Zwart":56675277472124,
  "M|Arctic White":56675277570428,  "M|Zwart":56675277603196,
  "L|Arctic White":56675277701500,  "L|Zwart":56675277734268,
  "XL|Arctic White":56675277832572, "XL|Zwart":56675277865340,
  "2XL|Arctic White":56675277963644,"2XL|Zwart":56675277996412,
  "3XL|Arctic White":56675278094716,"3XL|Zwart":56675278127484,
};

// ba-pants-men: Size|Color
const PANTS_MEN = {
  "XS|Arctic White":56708819222908, "XS|Zwart":56708819255676,
  "S|Arctic White":56708819353980,  "S|Zwart":56708819386748,
  "M|Arctic White":56708819485052,  "M|Zwart":56708819517820,
  "L|Arctic White":56708819616124,  "L|Zwart":56708819648892,
  "XL|Arctic White":56708819747196, "XL|Zwart":56708819779964,
  "2XL|Arctic White":56708819878268,"2XL|Zwart":56708819911036,
  "3XL|Arctic White":56708820009340,"3XL|Zwart":56708820042108,
};

// ba-jacket-women: Color|Size, only XS-L
const JACKET_WOMEN = {
  "Arctic White|XS":56708821516668, "Arctic White|S":56708821549436,
  "Arctic White|M":56708821582204,  "Arctic White|L":56708821614972,
  "Zwart|XS":56708821647740,        "Zwart|S":56708821680508,
  "Zwart|M":56708821713276,         "Zwart|L":56708821746044,
};

// ba-pants-women: Color|Size, only XS-L
const PANTS_WOMEN = {
  "Arctic White|XS":56708820369788, "Arctic White|S":56708820435324,
  "Arctic White|M":56708820402556,  "Arctic White|L":56708820468092,
  "Zwart|XS":56708820500860,        "Zwart|S":56708820566396,
  "Zwart|M":56708820533628,         "Zwart|L":56708820599164,
};

// ba-combo-adults: Color|Size, only XS-L
const COMBO = {
  "Arctic White|XS":56708822106492, "Arctic White|S":56708822073724,
  "Arctic White|M":56708822040956,  "Arctic White|L":56708822008188,
  "Zwart|XS":56708822237564,        "Zwart|S":56708822204796,
  "Zwart|M":56708822172028,         "Zwart|L":56708822139260,
};

// ba-kids-set: Color|Size
// NOTE: All variant IDs (including Arctic White) were updated on 2026-05-20
// after Thomas recreated the kids variants in Shopify.
const KIDS = {
  "Arctic White|4-6Y":56795880128892, "Arctic White|6-8Y":56795880161660,
  "Arctic White|8-10Y":56795880194428,"Arctic White|10-12Y":56795880227196,
  "Zwart|4-6Y":56795879670140,        "Zwart|6-8Y":56795879702908,
  "Zwart|8-10Y":56795879735676,       "Zwart|10-12Y":56795879768444,
};

const VARIANT_MAPS = {
  'ba-jacket-men':   { map: JACKET_MEN,   order: 'size|color' },
  'ba-pants-men':    { map: PANTS_MEN,    order: 'size|color' },
  'ba-jacket-women': { map: JACKET_WOMEN, order: 'color|size' },
  'ba-pants-women':  { map: PANTS_WOMEN,  order: 'color|size' },
  'ba-combo-adults': { map: COMBO,        order: 'color|size' },
  'ba-kids-set':     { map: KIDS,         order: 'color|size' },
};

export const SHOPIFY_HANDLES = {
  'ba-jacket-men':   'bug-away-jacket-men',
  'ba-pants-men':    'bug-away-pants-men',
  'ba-jacket-women': 'bug-away-jacket-women',
  'ba-pants-women':  'bug-away-pants-women',
  'ba-combo-adults': 'bug-away-combo-set-jacket-pants',
  'ba-kids-set':     'bug-away-kids-set',
};

export const SHOPIFY_IDS = {
  'ba-jacket-men':   'gid://shopify/Product/15967022023036',
  'ba-pants-men':    'gid://shopify/Product/15967033393532',
  'ba-jacket-women': 'gid://shopify/Product/15968024068476',
  'ba-pants-women':  'gid://shopify/Product/15967035064700',
  'ba-combo-adults': 'gid://shopify/Product/15968028721532',
  'ba-kids-set':     'gid://shopify/Product/15972000825724',
};

// Single -> matching combo set mapping, used by the cart upsell.
export const COMBO_FOR_SINGLE = {
  'ba-jacket-men':   'ba-combo-adults',
  'ba-pants-men':    'ba-combo-adults',
  'ba-jacket-women': 'ba-combo-adults',
  'ba-pants-women':  'ba-combo-adults',
};

export function getVariantId(productId, size, color) {
  const entry = VARIANT_MAPS[productId];
  if (!entry) return null;
  const c = normColor(color || '');
  const s = normSize(size || '');
  const key = entry.order === 'size|color' ? `${s}|${c}` : `${c}|${s}`;
  return entry.map[key] || null;
}

export async function fetchProduct() { return null; }

export async function buyNow(productId, size, color) {
  const variantId = getVariantId(productId, size, color);
  const handle = SHOPIFY_HANDLES[productId];
  if (variantId) {
    window.location.href = `https://${DOMAIN}/cart/${variantId}:1`;
  } else {
    // Safety: never silently redirect to the product page from a Buy Now click,
    // because that breaks ad attribution and confuses the buyer.
    console.error(`No variant found for ${productId} / size ${size} / color ${color}`);
    alert(`Sorry, this combination (${color}, size ${size}) is not available yet. Please choose another size or color.`);
    if (handle) {
      window.location.href = `https://${DOMAIN}/products/${handle}`;
    }
  }
}
