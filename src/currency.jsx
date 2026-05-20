import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext({ symbol: "€", isUS: false, region: "EU" });

export function CurrencyProvider({ children }) {
  const [isUS, setIsUS] = useState(false);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setIsUS(tz.startsWith("America/") || tz.startsWith("US/"));
    } catch {
      setIsUS(false);
    }
  }, []);

  const symbol = isUS ? "$" : "€";
  const region = isUS ? "US" : "EU";

  return (
    <CurrencyContext.Provider value={{ symbol, isUS, region }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function formatPrice(amount, symbol) {
  return `${symbol}${amount.toFixed(2)}`;
}

// Returns the regional price for a product.
// Falls back to product.price if no per-region prices are defined,
// so old code paths keep working during the transition.
export function getPrice(product, isUS) {
  if (product && product.prices) {
    return isUS ? product.prices.usd : product.prices.eur;
  }
  return product?.price ?? 0;
}

// Free gift threshold per region (currently equal to the bundle/set price).
export const FREE_GIFT_THRESHOLD = {
  US: 79.99,
  EU: 68.99,
};
