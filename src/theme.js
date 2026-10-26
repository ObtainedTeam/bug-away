import { useState, useEffect } from 'react';

// Bug Away designsysteem. Het kleurenpalet is exact dat van de huidige site
// (bouwbrief: kleuren blijven gelijk). Alleen layout, typografie en
// componenten zijn vernieuwd. Gebruik in componenten uitsluitend deze tokens.
export const c = {
  sage:"#7BAF8E", sageL:"#A8CBB5", sageD:"#4E8065",
  mist:"#B8D4CC", sky:"#8BB8C8", skyL:"#C8E0EA", skyP:"#E8F4F8",
  white:"#FFFFFF", off:"#F7F9F8", glL:"#EAEDEB",
  gray:"#9EAAA5", grayD:"#5A6660", dark:"#2C3530",
  // al in gebruik op de huidige site: sterren, diep bosgroen, mintkaart, lijnen
  star:"#F59E0B", forest:"#1a2e24", mint:"#F0F5F2", line:"#e8ede9",
};

// Eén lettertype voor kop en tekst (Archivo, zelf gehost), drie gewichten.
export const FONT = "'Archivo Variable','Archivo',system-ui,sans-serif";
export const FW = { body: 400, mid: 600, head: 800 };

// Responsive helper: rv('fs', 44, 30) => { '--d-fs': '44px', '--m-fs': '30px' },
// samen met className="r-fs" (zie index.css). Server en client geven zo exact
// dezelfde HTML; CSS kiest per schermbreedte. Breekpunt 767px.
const px = (v) => (typeof v === 'number' ? `${v}px` : v);
export const rv = (prop, d, m) => ({ [`--d-${prop}`]: px(d), [`--m-${prop}`]: px(m) });

export const R = { sm: 10, lg: 20, pill: 999 };

export const SH = {
  card:   "0 1px 2px rgba(44,53,48,.05), 0 14px 32px -12px rgba(44,53,48,.18)",
  strong: "0 2px 6px rgba(44,53,48,.07), 0 26px 52px -18px rgba(44,53,48,.28)",
  float:  "0 30px 60px -22px rgba(44,53,48,.34), 0 10px 22px -12px rgba(44,53,48,.14)",
  btn:    "0 2px 6px rgba(44,53,48,.12), 0 10px 20px -10px rgba(78,128,101,.55)",
  text:   "0 1px 2px rgba(0,0,0,.28)",
  hero:   "0 2px 18px rgba(26,46,36,.45)",
};

// Typografische trap [desktop, mobiel] in px.
export const T = {
  display: [60, 36], h1: [44, 30], h2: [36, 27], h3: [24, 20], h4: [19, 17],
  lg: [18, 17], md: [16, 16], sm: [14, 14], xs: [12, 12],
};
export const LH = { tight: 1.08, head: 1.18, body: 1.6, loose: 1.75 };

export const SP = {
  section: ["88px 40px", "60px 20px"],
  sectionTop: ["88px 40px 0", "60px 20px 0"],
  card: [28, 20],
  gap: [24, 14],
};
export const W = { page: 1200, text: 720, narrow: 560 };

// Knoppen: precies drie varianten. Accentkleur alleen voor acties.
const BTN_BASE = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  borderRadius: R.sm, fontFamily: FONT, fontWeight: 700, fontSize: 14,
  letterSpacing: "0.02em", cursor: "pointer", textDecoration: "none",
  whiteSpace: "nowrap", lineHeight: 1, boxSizing: "border-box",
};
export const BTN = {
  ...BTN_BASE, height: 52, padding: "0 30px",
  background: c.sageD, color: c.white, border: "none", boxShadow: SH.btn,
};
export const BTNO = {
  ...BTN_BASE, height: 52, padding: "0 28px",
  background: "transparent", color: c.dark, border: `2px solid ${c.dark}`,
};
export const BTN_SM = {
  ...BTN_BASE, height: 42, padding: "0 20px", fontSize: 13,
  background: c.sageD, color: c.white, border: "none",
};
export const ON_DARK = { color: c.white, borderColor: c.white };

export const CHIP = {
  display: "inline-flex", alignItems: "center", gap: 6, borderRadius: R.pill,
  fontFamily: FONT, fontSize: 12, fontWeight: 700, lineHeight: 1.2,
  padding: "6px 12px", whiteSpace: "nowrap",
};
export const CARD = { background: c.white, borderRadius: R.lg, boxShadow: SH.card };

export const EYEBROW = {
  fontFamily: FONT, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
  textTransform: "uppercase", color: c.sageD, display: "block",
};

// Oud: koppen en labels zoals de bestaande pagina's ze gebruiken, nu in het
// nieuwe systeem (zelfde font, rustiger).
export const H2 = {
  fontSize: 32, fontWeight: FW.head, color: c.dark, marginBottom: 10,
  letterSpacing: "-0.02em", lineHeight: LH.head, fontFamily: FONT,
};
export const LBL = { ...EYEBROW, marginBottom: 10 };

// Oud: JS-breakpoint voor pagina's die nog niet naar CSS-klassen zijn omgezet.
// Nieuwe componenten gebruiken rv() en de klassen uit index.css.
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window === 'undefined' ? false : window.innerWidth < 768
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return isMobile;
};
