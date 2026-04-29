import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext({ symbol: '€', isUS: false });

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState({ symbol: '€', isUS: false });

  useEffect(() => {
    // Check timezone first (fast, no API needed)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && tz.startsWith('America/')) {
      setCurrency({ symbol: '$', isUS: true });
      return;
    }

    // Fallback: check browser language
    const lang = navigator.language || '';
    if (lang === 'en-US') {
      setCurrency({ symbol: '$', isUS: true });
    }
  }, []);

  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function formatPrice(amount, symbol) {
  const num = parseFloat(amount);
  if (symbol === '$') {
    return `$${num.toFixed(0)}`;
  }
  return `€ ${num.toFixed(0)}`;
}
