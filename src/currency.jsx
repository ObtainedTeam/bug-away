import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { SHOPIFY_HANDLES } from "./shopify";

// Valuta per bezoeker. Bug Away verkoopt in de VS (USD), Canada (CAD) en
// Australië (AUD). De regio volgt de tijdzone van de bezoeker en is met de
// keuzelijst in de header aan te passen (onthouden in localStorage).
// USD- en AUD-prijzen staan vast in data.js (AUD = vaste Shopify-koers).
// CAD rekent Shopify zelf om met de dagkoers, dus die halen we live op via
// /api/prices?country=CA; tot dat binnen is tonen we een benadering.
export const REGIONS = {
  US: { code: "USD", symbol: "$", label: "USD $", flag: "🇺🇸", country: "United States" },
  CA: { code: "CAD", symbol: "$", label: "CAD $", flag: "🇨🇦", country: "Canada" },
  AU: { code: "AUD", symbol: "$", label: "AUD $", flag: "🇦🇺", country: "Australia" },
};
const CAD_FALLBACK_RATE = 1.43;
const KEY = "ba-region";

// Live CAD-prijzen per Shopify-handle (gevuld door de provider).
let LIVE = {};

const CA_TZ = /^America\/(Toronto|Montreal|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Dawson|Dawson_Creek|Yellowknife|Iqaluit|Rankin_Inlet|Resolute|Cambridge_Bay|Inuvik|Swift_Current|Atikokan|Blanc-Sablon|Creston|Fort_Nelson|Nipigon|Rainy_River|Thunder_Bay|Pangnirtung)$|^Canada\//;

function detect() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && REGIONS[saved]) return saved;
  } catch { /* geen opslag */ }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (CA_TZ.test(tz)) return "CA";
    if (tz.startsWith("Australia/")) return "AU";
  } catch { /* val terug op US */ }
  return "US";
}

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  // Server en eerste render: altijd US, daarna corrigeren in de browser.
  const [region, setRegionState] = useState("US");
  const [, setTick] = useState(0);

  useEffect(() => { setRegionState(detect()); }, []);

  useEffect(() => {
    if (region !== "CA" || Object.keys(LIVE).length) return undefined;
    let off = false;
    fetch("/api/prices?country=CA").then((r) => r.json()).then((d) => {
      if (off || !d || !d.prices) return;
      LIVE = d.prices;
      setTick((t) => t + 1);
    }).catch(() => {});
    return () => { off = true; };
  }, [region]);

  const value = useMemo(() => {
    const R = REGIONS[region];
    return {
      region, ...R,
      isUS: region === "US", isCA: region === "CA", isAU: region === "AU",
      setRegion: (r) => {
        if (!REGIONS[r]) return;
        try { localStorage.setItem(KEY, r); } catch { /* geen opslag */ }
        setRegionState(r);
      },
      price: (p) => getPrice(p, region),
      compare: (p) => getCompare(p, region),
      fmt: (n) => formatPrice(n, R.symbol),
    };
  }, [region, LIVE]); // eslint-disable-line react-hooks/exhaustive-deps

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext) || {
    region: "US", ...REGIONS.US, isUS: true, isCA: false, isAU: false, setRegion: () => {},
    price: (p) => getPrice(p, "US"), compare: (p) => getCompare(p, "US"), fmt: (n) => formatPrice(n, "$"),
  };
}

export function formatPrice(amount, symbol = "$") {
  return `${symbol}${Number(amount || 0).toFixed(2)}`;
}

const round2 = (n) => Math.round(n * 100) / 100;

// Prijs van een product in de gekozen regio.
export function getPrice(product, region = "US") {
  if (!product) return 0;
  const p = product.prices || {};
  if (region === "CA") {
    const live = LIVE[SHOPIFY_HANDLES[product.id]];
    if (live) return live.price;
    return round2((p.usd ?? product.price ?? 0) * CAD_FALLBACK_RATE);
  }
  if (region === "AU" && p.aud != null) return p.aud;
  return p.usd ?? product.price ?? 0;
}

// Doorstreepprijs (alleen echte referenties: setprijs vs twee losse stuks,
// of de compare-at uit Shopify). null als er geen is.
export function getCompare(product, region = "US") {
  if (!product) return null;
  const ref = product.setCompare || product.comparePrices;
  if (!ref) return null;
  if (region === "CA") {
    const live = LIVE[SHOPIFY_HANDLES[product.id]];
    if (live && live.compareAt) return live.compareAt;
    return ref.usd != null ? round2(ref.usd * CAD_FALLBACK_RATE) : null;
  }
  if (region === "AU" && ref.aud != null) return ref.aud;
  return ref.usd ?? null;
}

// Drempel voor het gratis cadeau in de winkelmand (gelijk aan één set).
export const FREE_GIFT_THRESHOLD = { US: 79.99, CA: 114, AU: 128 };
