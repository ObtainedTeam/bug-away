import { useEffect, useState } from 'react';
import { SHOPIFY_HANDLES } from './shopify';

// Echte reviews uit Judge.me (api/reviews.js). Eén keer per bezoek opgehaald.
// Nooit verzonnen sterren of aantallen: zonder reviews toont de UI niets.
let CACHE = null;
let PENDING = null;

function load() {
  if (CACHE) return Promise.resolve(CACHE);
  if (!PENDING) {
    PENDING = fetch('/api/reviews').then((r) => r.json()).catch(() => ({ reviews: [], count: 0, avg: 0 }))
      .then((d) => { CACHE = d && d.reviews ? d : { reviews: [], count: 0, avg: 0 }; return CACHE; });
  }
  return PENDING;
}

const HANDLE_TO_ID = Object.fromEntries(Object.entries(SHOPIFY_HANDLES).map(([id, h]) => [h, id]));

export function useReviews() {
  const [data, setData] = useState(CACHE);
  useEffect(() => { let on = true; load().then((d) => on && setData(d)); return () => { on = false; }; }, []);
  return data;
}

// Reviews en gemiddelde voor één product (op basis van de Shopify-handle).
export function forProduct(data, productId) {
  if (!data || !data.reviews) return { reviews: [], count: 0, avg: 0 };
  const list = data.reviews.filter((r) => HANDLE_TO_ID[r.product] === productId);
  const count = list.length;
  const avg = count ? Math.round((list.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0;
  return { reviews: list, count, avg };
}
