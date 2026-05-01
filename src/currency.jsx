import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext({ symbol: "€", isUS: false });

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

  return (
    <CurrencyContext.Provider value={{ symbol, isUS }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function formatPrice(amount, symbol) {
  return `${symbol}${amount}`;
}
