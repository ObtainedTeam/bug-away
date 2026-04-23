import { useState, useEffect } from "react";

const c = {
  sage: "#7BAF8E",
  sageL: "#A8CBB5",
  sageD: "#4E8065",
  mist: "#B8D4CC",
  sky: "#8BB8C8",
  skyL: "#C8E0EA",
  skyP: "#E8F4F8",
  white: "#FFFFFF",
  off: "#F7F9F8",
  glL: "#EAEDEB",
  gray: "#9EAAA5",
  grayD: "#5A6660",
  dark: "#2C3530",
};

const btn = {
  background: c.sageD,
  color: "#fff",
  border: "none",
  borderRadius: 4,
  padding: "13px 30px",
  fontSize: 12,
  fontFamily: "'Poppins',sans-serif",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
  fontWeight: 600,
};
const btnO = {
  background: "transparent",
  color: c.sageD,
  border: `2px solid ${c.sageD}`,
  borderRadius: 4,
  padding: "11px 26px",
  fontSize: 12,
  fontFamily: "'Poppins',sans-serif",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
  fontWeight: 600,
};
const h2s = {
  fontSize: 28,
  fontWeight: 800,
  color: c.dark,
  marginBottom: 8,
  letterSpacing: "-0.02em",
};
const lbl = {
  fontSize: 11,
  fontFamily: "'Poppins',sans-serif",
  color: c.sage,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  marginBottom: 10,
  fontWeight: 700,
};

const products = [
  {
    id: 1,
    name: "Bug Away Pants Men",
    tag: "Men",
    price: "€ 69.95",
    bg: c.skyL + "55",
    emoji: "🧥",
    type: "Pants",
    cat: "men",
    desc: "Integrated foot cover, noseeum-grade mesh",
  },
  {
    id: 2,
    name: "Bug Away Jacket Men",
    tag: "Men",
    price: "€ 74.95",
    bg: c.sageL + "55",
    emoji: "🧥",
    type: "Jacket",
    cat: "men",
    desc: "Drawstring hood, zip closure, side pockets",
  },
  {
    id: 3,
    name: "Bug Away Pants Women",
    tag: "Women",
    price: "€ 69.95",
    bg: c.mist + "55",
    emoji: "🧥",
    type: "Pants",
    cat: "women",
    desc: "Integrated foot cover, noseeum-grade mesh",
  },
  {
    id: 4,
    name: "Bug Away Jacket Women",
    tag: "Women",
    price: "€ 74.95",
    bg: c.skyP + "99",
    emoji: "🧥",
    type: "Jacket",
    cat: "women",
    desc: "Drawstring hood, zip closure, side pockets",
  },
  {
    id: 5,
    name: "Kids Set (Jacket + Pants)",
    tag: "Kids",
    price: "€ 89.95",
    bg: c.sageL + "44",
    emoji: "👕",
    type: "Kids",
    cat: "kids",
    desc: "Safe elastic at hood, pockets for treasures!",
  },
  {
    id: 6,
    name: "Adults Combo Set",
    tag: "Bundle",
    price: "€ 129.95",
    bg: c.sky + "33",
    emoji: "🎒",
    type: "Bundle",
    cat: "bundles",
    desc: "Pants + Jacket together — save €14.95",
  },
  {
    id: 7,
    name: "Bug Away Socks",
    tag: "Extras",
    price: "€ 19.95",
    bg: c.glL + "99",
    emoji: "🧦",
    type: "Extra",
    cat: "extras",
    desc: "Extra protection at ankle and foot",
  },
  {
    id: 8,
    name: "Tick Remover Set",
    tag: "Extras",
    price: "€ 9.95",
    bg: c.glL + "99",
    emoji: "🔬",
    type: "Extra",
    cat: "extras",
    desc: "Stainless steel tweezers + magnifier + case",
  },
];

const diseases = [
  {
    icon: "🔴",
    name: "Lyme Disease",
    sev: "Most common · ~27,000 new cases/year in NL",
    sevC: "#C0504D",
    desc: "Caused by the Borrelia bacteria. Starts with a bull's-eye rash. Left untreated it can lead to joint inflammation, neurological problems and heart issues.",
    syms: [
      "Bull's-eye rash",
      "Extreme fatigue",
      "Joint pain",
      "Neurological symptoms",
    ],
  },
  {
    icon: "🟠",
    name: "Tick-borne Encephalitis (TBE)",
    sev: "Serious · On the rise in NL & BE",
    sevC: "#D07030",
    desc: "A viral infection attacking the brain and spinal cord. Starts flu-like but can escalate to meningitis with permanent damage.",
    syms: [
      "High fever",
      "Severe headache",
      "Meningitis",
      "Permanent neurological damage",
    ],
  },
  {
    icon: "🟡",
    name: "Anaplasmosis",
    sev: "Underrecognized · Often misdiagnosed",
    sevC: "#B08A20",
    desc: "A bacterial infection that attacks white blood cells. Symptoms resemble the flu. Can become serious without antibiotics, especially in elderly people.",
    syms: [
      "Fever & chills",
      "Muscle pain",
      "Low white blood cell count",
      "Liver problems",
    ],
  },
  {
    icon: "🟢",
    name: "Babesiosis",
    sev: "Rare but serious",
    sevC: "#4E8065",
    desc: "A parasitic infection similar to malaria. Particularly dangerous for elderly people and those without a spleen. Increasingly reported in Europe.",
    syms: [
      "Hemolytic anemia",
      "Dark urine",
      "High fever",
      "Organ failure (severe cases)",
    ],
  },
];

const reviews = [
  {
    name: "Marloes V.",
    loc: "Utrecht",
    stars: 5,
    text: "Finally something that actually works! I walk my dog in the forest every day and had Lyme twice. With this I feel so much safer.",
    product: "Adults Combo Set",
  },
  {
    name: "Jan de B.",
    loc: "Zeeland",
    stars: 5,
    text: "Great pants. The foot cover is a smart detail — exactly what I was looking for. My wife ordered one too.",
    product: "Bug Away Pants Men",
  },
  {
    name: "Sofie K.",
    loc: "Antwerp",
    stars: 5,
    text: "My kids can now play outside without worry. The kids set is cute and functional. So glad I found this!",
    product: "Kids Set",
  },
  {
    name: "Rens M.",
    loc: "Friesland",
    stars: 4,
    text: "Light, fine fabric and works well. Ticks simply can't get through. Ordered a size up as recommended — right call.",
    product: "Bug Away Jacket Men",
  },
];

const navItems = [
  { label: "Men", key: "men" },
  { label: "Women", key: "women" },
  { label: "Kids", key: "kids" },
  { label: "Bundles", key: "bundles" },
  { label: "Extras", key: "extras" },
];
const catFilters = [
  { label: "All", key: "all" },
  { label: "Men", key: "men" },
  { label: "Women", key: "women" },
  { label: "Kids", key: "kids" },
  { label: "Bundles", key: "bundles" },
  { label: "Extras", key: "extras" },
];

export default function BugAway() {
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("all");
  const [hov, setHov] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visible =
    page !== "home"
      ? products.filter((p) => p.cat === page)
      : filter === "all"
        ? products
        : products.filter((p) => p.cat === filter);

  const pageTitle = {
    men: "Men's Collection",
    women: "Women's Collection",
    kids: "Kids",
    bundles: "Bundles & Combos",
    extras: "Extras",
  }[page];

  const pad = isMobile ? "40px 20px" : "64px 60px";

  const goTo = (key) => {
    setPage(key);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        fontFamily: "'Archivo',sans-serif",
        background: c.off,
        minHeight: "100vh",
        color: c.dark,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { overflow-x: hidden; }`}</style>

      {/* Topbar */}
      <div
        style={{
          background: c.sageD,
          color: "#fff",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: 11,
          fontFamily: "'Poppins',sans-serif",
          letterSpacing: "0.04em",
        }}
      >
        🛡️ Free shipping over €59 · Chemical-free · Eco-responsible
      </div>

      {/* Nav */}
      <nav
        style={{
          background: "#fff",
          borderBottom: `1px solid ${c.glL}`,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          position: "sticky",
          top: 0,
          zIndex: 200,
          boxShadow: "0 2px 12px rgba(90,102,96,0.07)",
        }}
      >
        <div
          style={{
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: c.sageD,
            textTransform: "uppercase",
            cursor: "pointer",
          }}
          onClick={() => goTo("home")}
        >
          Bug Away
        </div>

        {/* Desktop nav */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: 24, listStyle: "none" }}>
            {navItems.map((n) => (
              <li key={n.key}>
                <span
                  onClick={() => goTo(n.key)}
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: page === n.key ? c.sageD : c.grayD,
                    cursor: "pointer",
                    borderBottom:
                      page === n.key
                        ? `2px solid ${c.sageD}`
                        : "2px solid transparent",
                    paddingBottom: 4,
                  }}
                >
                  {n.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 18, cursor: "pointer" }}>🛒</span>
          {isMobile && (
            <span
              style={{ fontSize: 22, cursor: "pointer", color: c.dark }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </span>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: "#fff",
            borderBottom: `1px solid ${c.glL}`,
            padding: "16px 20px",
            position: "sticky",
            top: 60,
            zIndex: 199,
          }}
        >
          {navItems.map((n) => (
            <div
              key={n.key}
              onClick={() => goTo(n.key)}
              style={{
                padding: "12px 0",
                fontFamily: "'Poppins',sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: page === n.key ? c.sageD : c.dark,
                borderBottom: `1px solid ${c.glL}`,
                cursor: "pointer",
              }}
            >
              {n.label}
            </div>
          ))}
        </div>
      )}

      {/* HERO */}
      {page === "home" && (
        <section
          style={{
            background: `linear-gradient(135deg,${c.skyP} 0%,${c.mist} 45%,${c.sageL} 100%)`,
            padding: isMobile ? "50px 20px 40px" : "80px 60px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? 32 : 60,
          }}
        >
          <div style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                border: `1px solid ${c.mist}`,
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 11,
                color: c.sageD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              🌿 Insecticide-free · Tick-proof
            </div>
            <h1
              style={{
                fontSize: isMobile ? 34 : 50,
                fontWeight: 800,
                lineHeight: 1.1,
                color: c.dark,
                marginBottom: 14,
                letterSpacing: "-0.02em",
              }}
            >
              Enjoy the Outdoors.
              <br />
              <span style={{ color: c.sageD }}>Safe & Carefree.</span>
            </h1>
            <p
              style={{
                fontSize: 14,
                color: c.grayD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 420,
                marginBottom: 10,
                margin: isMobile ? "0 auto 10px" : "0 0 10px",
              }}
            >
              Lightweight mesh clothing that physically blocks ticks and
              insects. No DEET, no chemicals.
            </p>
            <p
              style={{
                fontSize: 13,
                color: c.sageD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 500,
                marginBottom: 28,
                fontStyle: "italic",
              }}
            >
              "Like a screen porch for your body 🌿"
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <button style={btn} onClick={() => goTo("men")}>
                Shop Collection
              </button>
              <button style={btnO} onClick={() => goTo("bundles")}>
                Bundles
              </button>
            </div>
          </div>

          {!isMobile && (
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 12,
                  background: `linear-gradient(160deg,${c.skyL} 0%,${c.sageL} 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 16px 48px rgba(90,102,96,0.18)",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 60 }}>🧥</span>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.sageD,
                    fontWeight: 600,
                    textAlign: "center",
                    padding: "0 16px",
                    lineHeight: 1.5,
                  }}
                >
                  Jacket
                  <br />
                  <span
                    style={{ color: c.gray, fontWeight: 300, fontSize: 11 }}
                  >
                    Noseeum mesh · Hood
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 12,
                  background: `linear-gradient(160deg,${c.mist} 0%,${c.sky} 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 16px 48px rgba(90,102,96,0.18)",
                  gap: 10,
                  marginTop: 24,
                }}
              >
                <span style={{ fontSize: 60 }}>🥾</span>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.sageD,
                    fontWeight: 600,
                    textAlign: "center",
                    padding: "0 16px",
                    lineHeight: 1.5,
                  }}
                >
                  Pants
                  <br />
                  <span
                    style={{ color: c.gray, fontWeight: 300, fontSize: 11 }}
                  >
                    Integrated foot · 360°
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* USP bar */}
      {page === "home" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(5,1fr)",
            background: "#fff",
            borderTop: `1px solid ${c.glL}`,
            borderBottom: `1px solid ${c.glL}`,
          }}
        >
          {[
            {
              icon: "🛡️",
              title: "Tick-proof mesh",
              text: "Blocks ticks & mosquitoes",
            },
            {
              icon: "🌿",
              title: "Chemical-free",
              text: "No DEET, no permethrin",
            },
            {
              icon: "♻️",
              title: "Eco-responsible",
              text: "Recycled polyester",
            },
            {
              icon: "🦵",
              title: "360° coverage",
              text: "Integrated foot cover",
            },
            { icon: "👨‍👩‍👧", title: "Whole family", text: "Men, women & kids" },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "22px 12px",
                borderRight: !isMobile && i < 4 ? `1px solid ${c.glL}` : "none",
                borderBottom: isMobile && i < 4 ? `1px solid ${c.glL}` : "none",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: c.dark,
                  fontFamily: "'Poppins',sans-serif",
                  marginBottom: 3,
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: c.gray,
                  fontFamily: "'Poppins',sans-serif",
                  lineHeight: 1.5,
                }}
              >
                {f.text}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nature strip */}
      {page === "home" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr",
            height: isMobile ? 200 : 260,
            overflow: "hidden",
          }}
        >
          {[
            {
              url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80",
              label: "Forest & Nature",
            },
            {
              url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
              label: "Hiking",
            },
            {
              url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
              label: "Outdoor Life",
            },
          ]
            .filter((_, i) => !isMobile || i === 0)
            .map((img, i) => (
              <div key={i} style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={img.url}
                  alt={img.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "brightness(0.72) saturate(0.85)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 14,
                    background: "rgba(255,255,255,0.14)",
                    backdropFilter: "blur(6px)",
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontSize: 12,
                    color: "#fff",
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {img.label}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* How it works */}
      {page === "home" && (
        <section
          style={{
            padding: pad,
            background: `linear-gradient(135deg,${c.skyP} 0%,${c.off} 100%)`,
          }}
        >
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <div style={lbl}>How it works</div>
            <h2 style={{ ...h2s, marginBottom: 12 }}>
              Like a screen porch for your body
            </h2>
            <p
              style={{
                fontSize: 14,
                color: c.grayD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                lineHeight: 1.85,
                marginBottom: 40,
                maxWidth: 640,
              }}
            >
              The mesh physically blocks ticks and insects while letting air
              through. The air gap between the mesh and your skin is the key.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
                gap: isMobile ? 12 : 32,
              }}
            >
              {[
                {
                  step: "01",
                  icon: "🕷️",
                  title: "Ticks try to reach your skin",
                  text: "They crawl up through grass looking for a warm spot.",
                },
                {
                  step: "02",
                  icon: "🧥",
                  title: "Mesh forms a barrier",
                  text: "Noseeum-grade mesh is too fine for ticks to get through.",
                },
                {
                  step: "03",
                  icon: "💨",
                  title: "Air gap adds protection",
                  text: "The space between mesh and skin keeps ticks away.",
                },
                {
                  step: "04",
                  icon: "✅",
                  title: "You enjoy — bite-free",
                  text: "Chemical-free, light and breathable. Just put it on.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: isMobile ? "16px 14px" : "24px 20px",
                    border: `1px solid ${c.glL}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: 700,
                      color: c.sage,
                      letterSpacing: "0.12em",
                      marginBottom: 8,
                    }}
                  >
                    {s.step}
                  </div>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div
                    style={{
                      fontSize: isMobile ? 12 : 14,
                      fontWeight: 700,
                      color: c.dark,
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.gray,
                      lineHeight: 1.6,
                    }}
                  >
                    {s.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats bar */}
      {page === "home" && (
        <div
          style={{
            background: c.sageD,
            padding: isMobile ? "20px 16px" : "26px 60px",
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(5,1fr)",
            gap: isMobile ? 16 : 0,
          }}
        >
          {[
            { num: "1.5M+", label: "Tick bites/year in NL" },
            { num: "27,000", label: "New Lyme cases/year" },
            { num: "100%", label: "Chemical-free" },
            { num: "360°", label: "Full body coverage" },
            { num: "< 80g", label: "Weight per set" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: isMobile ? 22 : 26,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: c.mist,
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 300,
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products */}
      <section style={{ padding: pad }}>
        {page === "home" ? (
          <>
            <h2 style={h2s}>Our Collection</h2>
            <p
              style={{
                fontSize: 14,
                color: c.gray,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                marginBottom: 24,
              }}
            >
              Protection for the whole family
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              {catFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 24,
                    border: `1.5px solid ${filter === f.key ? c.sageD : c.glL}`,
                    background: filter === f.key ? c.sageD : "#fff",
                    color: filter === f.key ? "#fff" : c.grayD,
                    fontSize: 11,
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <span
              onClick={() => goTo("home")}
              style={{
                fontSize: 13,
                fontFamily: "'Poppins',sans-serif",
                color: c.gray,
                cursor: "pointer",
                display: "inline-block",
                marginBottom: 8,
              }}
            >
              ← Back
            </span>
            <h2 style={h2s}>{pageTitle}</h2>
            <p
              style={{
                fontSize: 14,
                color: c.gray,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                marginBottom: 24,
              }}
            >
              {page === "kids"
                ? "Safe outdoor play without worry"
                : page === "bundles"
                  ? "Save more, protect more"
                  : "Lightweight mesh base layers"}
            </p>
          </>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2,1fr)"
              : "repeat(auto-fill,minmax(220px,1fr))",
            gap: isMobile ? 12 : 20,
          }}
        >
          {visible.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: 8,
                overflow: "hidden",
                border: `1px solid ${c.glL}`,
                transition: "box-shadow 0.2s,transform 0.2s",
                cursor: "pointer",
                boxShadow:
                  hov === p.id ? "0 8px 32px rgba(90,102,96,0.13)" : "none",
                transform: hov === p.id ? "translateY(-4px)" : "none",
              }}
              onMouseEnter={() => setHov(p.id)}
              onMouseLeave={() => setHov(null)}
            >
              <div
                style={{
                  height: isMobile ? 140 : 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: p.bg,
                  gap: 8,
                }}
              >
                <span style={{ fontSize: isMobile ? 40 : 52 }}>{p.emoji}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {[c.white, c.sage, c.sky, c.gray].map((col, i) => (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: col,
                        border: `1.5px solid ${c.glL}`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  padding: isMobile ? "12px 14px 16px" : "16px 18px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: c.sage,
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 700,
                    marginBottom: 3,
                  }}
                >
                  {p.tag}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 13 : 15,
                    fontWeight: 700,
                    color: c.dark,
                    marginBottom: 3,
                  }}
                >
                  {p.name}
                </div>
                {!isMobile && (
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.gray,
                      marginBottom: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    {p.desc}
                  </div>
                )}
                <div
                  style={{
                    fontSize: 14,
                    color: c.grayD,
                    fontFamily: "'Poppins',sans-serif",
                    marginBottom: 12,
                    fontWeight: 500,
                  }}
                >
                  {p.price}
                </div>
                <button
                  style={{
                    ...btn,
                    width: "100%",
                    fontSize: 11,
                    padding: "10px 16px",
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disease info */}
      {page === "home" && (
        <section style={{ padding: pad, background: "#fff" }}>
          <div style={{ maxWidth: 940, margin: "0 auto" }}>
            <div style={lbl}>Why protection matters</div>
            <h2 style={{ ...h2s, marginBottom: 12 }}>
              Diseases transmitted by ticks
            </h2>
            <p
              style={{
                fontSize: 14,
                color: c.grayD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                lineHeight: 1.85,
                marginBottom: 36,
                maxWidth: 660,
              }}
            >
              Ticks are active from March through November. They can transmit
              serious diseases — and you often won't even notice a bite.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              {diseases.map((d, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${c.glL}`,
                    borderRadius: 10,
                    padding: "22px",
                    background: c.off,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{d.icon}</span>
                    <div>
                      <div
                        style={{ fontSize: 14, fontWeight: 700, color: c.dark }}
                      >
                        {d.name}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          fontFamily: "'Poppins',sans-serif",
                          fontWeight: 700,
                          color: d.sevC,
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          marginTop: 2,
                        }}
                      >
                        {d.sev}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.grayD,
                      lineHeight: 1.75,
                      marginBottom: 12,
                      fontWeight: 300,
                    }}
                  >
                    {d.desc}
                  </p>
                  <div
                    style={{ borderTop: `1px solid ${c.glL}`, paddingTop: 10 }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontFamily: "'Poppins',sans-serif",
                        fontWeight: 700,
                        color: c.gray,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Symptoms
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {d.syms.map((s, j) => (
                        <span
                          key={j}
                          style={{
                            background: "#fff",
                            border: `1px solid ${c.glL}`,
                            borderRadius: 20,
                            padding: "3px 9px",
                            fontSize: 11,
                            fontFamily: "'Poppins',sans-serif",
                            color: c.grayD,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 28,
                background: `linear-gradient(120deg,${c.skyP} 0%,${c.sageL}44 100%)`,
                borderRadius: 10,
                padding: isMobile ? "24px 20px" : "28px 30px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: 20,
                border: `1px solid ${c.mist}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: c.dark,
                    marginBottom: 6,
                  }}
                >
                  Prevention is the best protection
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.grayD,
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  Bug Away mesh physically blocks ticks — no chemicals, no DEET,
                  just a light layer you wear all day.
                </div>
              </div>
              <button
                style={{ ...btn, whiteSpace: "nowrap" }}
                onClick={() => goTo("men")}
              >
                Shop collection
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {page === "home" && (
        <section style={{ padding: pad, background: c.off }}>
          <div style={lbl}>Customer reviews</div>
          <h2 style={{ ...h2s, marginBottom: 8 }}>What our customers say</h2>
          <p
            style={{
              fontSize: 14,
              color: c.gray,
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 300,
              marginBottom: 36,
            }}
          >
            Real stories from people who enjoy the outdoors without tick worries
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)",
              gap: isMobile ? 12 : 20,
            }}
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  padding: "20px",
                  border: `1px solid ${c.glL}`,
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} style={{ color: "#F0B429", fontSize: 13 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.grayD,
                    lineHeight: 1.7,
                    marginBottom: 14,
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  "{r.text}"
                </p>
                <div
                  style={{ borderTop: `1px solid ${c.glL}`, paddingTop: 12 }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.dark }}>
                    {r.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.gray,
                      marginTop: 2,
                    }}
                  >
                    {r.loc} · {r.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mission */}
      {page === "home" && (
        <section
          style={{
            padding: pad,
            background: `linear-gradient(135deg,${c.skyP} 0%,${c.off} 100%)`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 32 : 56,
              alignItems: "center",
              maxWidth: 940,
              margin: "0 auto",
            }}
          >
            <div>
              <div style={lbl}>Our mission</div>
              <h2
                style={{
                  fontSize: isMobile ? 24 : 28,
                  fontWeight: 800,
                  color: c.dark,
                  marginBottom: 14,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Into nature —<br />
                without fear of ticks
              </h2>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "'Poppins',sans-serif",
                  color: c.grayD,
                  fontWeight: 300,
                  lineHeight: 1.9,
                  marginBottom: 12,
                }}
              >
                Hikers, cyclists, gardeners and families — anyone outdoors is at
                risk. Bug Away is an invisible protective layer: light,
                breathable and always on.
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "'Poppins',sans-serif",
                  color: c.grayD,
                  fontWeight: 300,
                  lineHeight: 1.9,
                  marginBottom: 20,
                }}
              >
                No chemicals. No DEET. No permethrin that kills bees. Just smart
                protection that respects nature.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  "♻️ Recycled",
                  "🌿 Insecticide-free",
                  "🐝 Bee-safe",
                  "✅ Eco",
                ].map((t, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#fff",
                      border: `1px solid ${c.mist}`,
                      borderRadius: 20,
                      padding: "5px 12px",
                      fontSize: 11,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.sageD,
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80"
                alt="Forest"
                style={{
                  width: "100%",
                  height: isMobile ? 140 : 190,
                  objectFit: "cover",
                  borderRadius: 8,
                  filter: "brightness(0.82) saturate(0.88)",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&q=80"
                alt="Nature"
                style={{
                  width: "100%",
                  height: isMobile ? 140 : 190,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginTop: isMobile ? 0 : 24,
                  filter: "brightness(0.82) saturate(0.88)",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Blog */}
      {page === "home" && (
        <section style={{ padding: pad, background: "#fff" }}>
          <div style={lbl}>Knowledge base</div>
          <h2 style={{ ...h2s, marginBottom: 8 }}>
            Everything about ticks & protection
          </h2>
          <p
            style={{
              fontSize: 14,
              color: c.gray,
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 300,
              marginBottom: 32,
            }}
          >
            Learn more about tick bites, diseases and how to protect yourself
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: isMobile ? 12 : 22,
            }}
          >
            {[
              {
                emoji: "🌱",
                title: "Tick season 2025: when are ticks most active?",
                tag: "Education",
                desc: "Ticks become active above 7°C. Find out when the risk is highest and how to prepare.",
              },
              {
                emoji: "🔬",
                title: "How to recognize a tick bite and what to do",
                tag: "Health",
                desc: "Not every tick bite leads to Lyme. Knowing what to do after a bite can make all the difference.",
              },
              {
                emoji: "🐕",
                title: "Ticks and dogs: risks and protection",
                tag: "Pets",
                desc: "Dogs face the same risks. Discover how to protect your dog against ticks and Lyme disease.",
              },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${c.glL}`,
                  borderRadius: 10,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: c.off,
                }}
              >
                <div
                  style={{
                    height: 120,
                    background: `linear-gradient(135deg,${c.skyP} 0%,${c.sageL}55 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                  }}
                >
                  {b.emoji}
                </div>
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: 700,
                      color: c.sage,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {b.tag}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: c.dark,
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {b.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.gray,
                      lineHeight: 1.6,
                    }}
                  >
                    {b.desc}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 12,
                      color: c.sageD,
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Read more →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{
          background: c.dark,
          color: c.mist,
          padding: isMobile ? "36px 20px 24px" : "48px 60px 32px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
            gap: isMobile ? 24 : 48,
            marginBottom: 28,
          }}
        >
          <div style={{ gridColumn: isMobile ? "1/-1" : "auto" }}>
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: "#fff",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Bug Away
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: c.gray,
                fontFamily: "'Poppins',sans-serif",
                maxWidth: 240,
              }}
            >
              Insecticide-free protection against ticks and mosquitoes. For
              hikers, families and everyone who enjoys the outdoors.
            </p>
          </div>
          {[
            {
              head: "Collection",
              links: ["Men", "Women", "Kids", "Bundles", "Extras"],
            },
            {
              head: "Info",
              links: ["How it works", "Ticks & Lyme", "Size guide", "FAQ"],
            },
            {
              head: "Service",
              links: ["Shipping", "Returns", "Contact", "Reviews"],
            },
          ].map((col, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.sage,
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {col.head}
              </div>
              {col.links.map((l) => (
                <span
                  key={l}
                  style={{
                    fontSize: 12,
                    color: c.gray,
                    fontFamily: "'Poppins',sans-serif",
                    marginBottom: 8,
                    cursor: "pointer",
                    display: "block",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 16,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 8 : 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: c.grayD,
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            © 2025 Bug Away. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 14 }}>
            {["Visa", "Mastercard", "iDEAL", "PayPal"].map((m) => (
              <span
                key={m}
                style={{
                  fontSize: 11,
                  color: c.grayD,
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
