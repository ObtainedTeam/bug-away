const DOMAIN = 'bug-away-3.myshopify.com';

// Normalize color: website uses "Stone Gray", Shopify uses "Stone Grey"
function normColor(c) {
  return c === 'Stone Gray' ? 'Stone Grey' : c;
}

// Normalize size: website uses XXL/XXXL, Shopify uses 2XL/3XL
function normSize(s) {
  if (s === 'XXL') return '2XL';
  if (s === 'XXXL') return '3XL';
  return s;
}

// ba-jacket-men: Size/Color order
const JACKET_MEN = {
  "XS|Sage Green":56675277242748,"XS|Stone Grey":56675277275516,"XS|Arctic White":56675277308284,
  "S|Sage Green":56675277373820,"S|Stone Grey":56675277406588,"S|Arctic White":56675277439356,
  "M|Sage Green":56675277504892,"M|Stone Grey":56675277537660,"M|Arctic White":56675277570428,
  "L|Sage Green":56675277635964,"L|Stone Grey":56675277668732,"L|Arctic White":56675277701500,
  "XL|Sage Green":56675277767036,"XL|Stone Grey":56675277799804,"XL|Arctic White":56675277832572,
  "2XL|Sage Green":56675277898108,"2XL|Stone Grey":56675277930876,"2XL|Arctic White":56675277963644,
  "3XL|Sage Green":56675278029180,"3XL|Stone Grey":56675278061948,"3XL|Arctic White":56675278094716,
};

// ba-pants-men: Size/Color order
const PANTS_MEN = {
  "XS|Sage Green":56708819157372,"XS|Stone Grey":56708819190140,"XS|Arctic White":56708819222908,
  "S|Sage Green":56708819288444,"S|Stone Grey":56708819321212,"S|Arctic White":56708819353980,
  "M|Sage Green":56708819419516,"M|Stone Grey":56708819452284,"M|Arctic White":56708819485052,
  "L|Sage Green":56708819550588,"L|Stone Grey":56708819583356,"L|Arctic White":56708819616124,
  "XL|Sage Green":56708819681660,"XL|Stone Grey":56708819714428,"XL|Arctic White":56708819747196,
  "2XL|Sage Green":56708819812732,"2XL|Stone Grey":56708819845500,"2XL|Arctic White":56708819878268,
  "3XL|Sage Green":56708819943804,"3XL|Stone Grey":56708819976572,"3XL|Arctic White":56708820009340,
};

// ba-jacket-women: Color/Size order, only XS-L
const JACKET_WOMEN = {
  "Sage Green|XS":56708821254524,"Sage Green|S":56708821287292,"Sage Green|M":56708821320060,"Sage Green|L":56708821352828,
  "Stone Grey|XS":56708821385596,"Stone Grey|S":56708821418364,"Stone Grey|M":56708821451132,"Stone Grey|L":56708821483900,
  "Arctic White|XS":56708821516668,"Arctic White|S":56708821549436,"Arctic White|M":56708821582204,"Arctic White|L":56708821614972,
};

// ba-pants-women: Color/Size order, only XS-L
const PANTS_WOMEN = {
  "Sage Green|XS":56708820763004,"Sage Green|S":56708820828540,"Sage Green|M":56708820795772,"Sage Green|L":56708820861308,
  "Stone Grey|XS":56708820631932,"Stone Grey|S":56708820697468,"Stone Grey|M":56708820664700,"Stone Grey|L":56708820730236,
  "Arctic White|XS":56708820369788,"Arctic White|S":56708820435324,"Arctic White|M":56708820402556,"Arctic White|L":56708820468092,
};

// ba-combo-adults: Color/Size order, only XS-L
const COMBO = {
  "Sage Green|XS":56708822368636,"Sage Green|S":56708822335868,"Sage Green|M":56708822303100,"Sage Green|L":56708822270332,
  "Stone Grey|XS":56708822499708,"Stone Grey|S":56708822466940,"Stone Grey|M":56708822434172,"Stone Grey|L":56708822401404,
  "Arctic White|XS":56708822106492,"Arctic White|S":56708822073724,"Arctic White|M":56708822040956,"Arctic White|L":56708822008188,
};

// ba-kids-set: Color/Size order
const KIDS = {
  "Sage Green|4-6Y":56708823089532,"Sage Green|6-8Y":56708823122300,"Sage Green|8-10Y":56708823155068,"Sage Green|10-12Y":56708823187836,
  "Arctic White|4-6Y":56708823220604,"Arctic White|6-8Y":56708823253372,"Arctic White|8-10Y":56708823286140,"Arctic White|10-12Y":56708823318908,
  "Stone Grey|4-6Y":56708823351676,"Stone Grey|6-8Y":56708823384444,"Stone Grey|8-10Y":56708823417212,"Stone Grey|10-12Y":56708823449980,
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
  } else if (handle) {
    window.location.href = `https://${DOMAIN}/products/${handle}`;
  } else {
    window.location.href = `https://${DOMAIN}`;
  }
}
