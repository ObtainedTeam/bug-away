import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext({ symbol: '€', isUS: false });

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState({ symbol: '€', isUS: false });

  useEffect(() => {
    // Check for manual override (for testing)
    const override = localStorage.getItem('currency_override');
    if (override === 'US') { setCurrency({ symbol: '$', isUS: true }); return; }
    if (override === 'EU') { setCurrency({ symbol: '€', isUS: false }); return; }

    // Check timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && tz.startsWith('America/')) {
      setCurrency({ symbol: '$', isUS: true });
      return;
    }

    // Fallback: browser language
    const lang = navigator.language || '';
    if (lang === 'en-US') {
      setCurrency({ symbol: '$', isUS: true });
    }
  }, []);

  return (
    <CurrencyContext.Provider value={currency}>
      {children}
      {/* Dev toggle — remove before launch */}
      {import.meta.env.DEV && (
        <div style={{ position:'fixed', bottom:16, left:16, zIndex:9999, display:'flex', gap:6 }}>
          <button
            onClick={() => { localStorage.setItem('currency_override','US'); location.reload(); }}
            style={{ background:'#2563eb', color:'#fff', border:'none', borderRadius:4, padding:'6px 12px', fontSize:11, cursor:'pointer', fontWeight:600 }}
          >
            Switch to $
          </button>
          <button
            onClick={() => { localStorage.setItem('currency_override','EU'); location.reload(); }}
            style={{ background:'#4E8065', color:'#fff', border:'none', borderRadius:4, padding:'6px 12px', fontSize:11, cursor:'pointer', fontWeight:600 }}
          >
            Switch to €
          </button>
        </div>
      )}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function formatPrice(amount, symbol) {
  const num = parseFloat(amount);
  if (symbol === '$') return `$${num.toFixed(0)}`;
  return `€ ${num.toFixed(0)}`;
}
