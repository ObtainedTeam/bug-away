// Actuele prijzen per land rechtstreeks uit Shopify, zodat de site in Canada
// exact dezelfde CAD-bedragen toont als de checkout (Shopify rekent CAD zelf om
// met de dagkoers). GET /api/prices?country=CA  ->  { prices: { handle: { price, compareAt } } }
// Geen sleutel nodig: dit is de openbare productfeed van de winkel. 6 uur cache.
const SHOP = 'https://fgxp7p-qp.myshopify.com';
const ALLOWED = new Set(['US', 'CA', 'AU']);

export default async function handler(req, res) {
  const country = String(req.query.country || 'US').toUpperCase();
  if (!ALLOWED.has(country)) return res.status(400).json({ error: 'country' });
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
  try {
    const r = await fetch(`${SHOP}/products.json?limit=250&country=${country}`);
    if (!r.ok) throw new Error('shopify ' + r.status);
    const { products = [] } = await r.json();
    // products.json negeert ?country, dus per product de .js-variant ophalen
    const out = {};
    await Promise.all(products.map(async (p) => {
      const pr = await fetch(`${SHOP}/products/${p.handle}.js?country=${country}`);
      if (!pr.ok) return;
      const d = await pr.json();
      out[p.handle] = {
        price: d.price / 100,
        compareAt: d.compare_at_price ? d.compare_at_price / 100 : null,
      };
    }));
    return res.status(200).json({ country, prices: out });
  } catch {
    return res.status(200).json({ country, prices: {} });
  }
}
