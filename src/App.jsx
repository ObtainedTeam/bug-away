import { useState } from "react";

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
  fontSize: 30,
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
    desc: "Caused by the Borrelia bacteria. Starts with a characteristic bull's-eye rash around the bite. Left untreated, Lyme disease can lead to joint inflammation, neurological problems and heart issues. It can become chronic if not caught early.",
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
    desc: "A viral infection that attacks the brain and spinal cord. Starts flu-like but can escalate to meningitis with permanent damage. Increasingly prevalent across the Netherlands and Belgium.",
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
    desc: "A bacterial infection that attacks white blood cells. Symptoms closely resemble the flu. Without antibiotics it can become serious, particularly in elderly people or those with weakened immune systems.",
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
    desc: "A parasitic infection that destroys red blood cells, similar to malaria. Particularly dangerous for elderly people and those without a spleen. Increasingly reported across Europe, including the Netherlands.",
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
    text: "Finally something that actually works! I walk my dog in the forest every day and had Lyme disease twice. With this clothing I feel so much safer. Breathable and barely noticeable.",
    product: "Adults Combo Set",
  },
  {
    name: "Jan de B.",
    loc: "Zeeland",
    stars: 5,
    text: "Great pants. Fits well, the foot cover is a smart detail — exactly what I was looking for. My wife has ordered one too.",
    product: "Bug Away Pants Men",
  },
  {
    name: "Sofie K.",
    loc: "Antwerp",
    stars: 5,
    text: "My kids can now play outside without worry. The kids set is cute and functional. So glad I found this before tick season!",
    product: "Kids Set (Jacket + Pants)",
  },
  {
    name: "Rens M.",
    loc: "Friesland",
    stars: 4,
    text: "Great product. Light, fine fabric and works well. Ticks simply can't get through. Ordered a size up as recommended and that was the right call.",
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

      {/* Topbar */}
      <div
        style={{
          background: c.sageD,
          color: "#fff",
          textAlign: "center",
          padding: "8px 20px",
          fontSize: 12,
          fontFamily: "'Poppins',sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        🛡️ Free shipping on orders over €59 · Chemical-free · Insecticide-free ·
        Eco-responsible
      </div>

      {/* Nav */}
      <nav
        style={{
          background: "#fff",
          borderBottom: `1px solid ${c.glL}`,
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(90,102,96,0.07)",
        }}
      >
        <div
          style={{
            fontSize: 21,
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: c.sageD,
            textTransform: "uppercase",
            cursor: "pointer",
          }}
          onClick={() => setPage("home")}
        >
          Bug Away
        </div>
        <ul
          style={{
            display: "flex",
            gap: 26,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navItems.map((n) => (
            <li key={n.key}>
              <span
                onClick={() => setPage(n.key)}
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
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontSize: 18, cursor: "pointer" }}>🔍</span>
          <span style={{ fontSize: 18, cursor: "pointer" }}>🛒</span>
        </div>
      </nav>

      {/* HERO */}
      {page === "home" && (
        <section
          style={{
            background: `linear-gradient(135deg,${c.skyP} 0%,${c.mist} 45%,${c.sageL} 100%)`,
            padding: "80px 60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 60,
            minHeight: 400,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                border: `1px solid ${c.mist}`,
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 12,
                color: c.sageD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              🌿 Insecticide-free · Eco-responsible · Tick-proof
            </div>
            <h1
              style={{
                fontSize: 50,
                fontWeight: 800,
                lineHeight: 1.1,
                color: c.dark,
                marginBottom: 18,
                letterSpacing: "-0.02em",
              }}
            >
              Enjoy the Outdoors.
              <br />
              <span style={{ color: c.sageD }}>Safe & Carefree.</span>
            </h1>
            <p
              style={{
                fontSize: 15,
                color: c.grayD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 420,
                marginBottom: 10,
              }}
            >
              Lightweight nylon mesh clothing that physically blocks ticks and
              insects. No DEET, no chemicals — just a smart layer between you
              and nature.
            </p>
            <p
              style={{
                fontSize: 14,
                color: c.sageD,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 500,
                marginBottom: 32,
                fontStyle: "italic",
              }}
            >
              "Like a screen porch for your body 🌿"
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button style={btn} onClick={() => setPage("men")}>
                Shop Collection
              </button>
              <button style={btnO} onClick={() => setPage("bundles")}>
                Combos & Bundles
              </button>
            </div>
          </div>
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
                <span style={{ color: c.gray, fontWeight: 300, fontSize: 11 }}>
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
                <span style={{ color: c.gray, fontWeight: 300, fontSize: 11 }}>
                  Integrated foot · 360° coverage
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USP bar */}
      {page === "home" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            background: "#fff",
            borderTop: `1px solid ${c.glL}`,
            borderBottom: `1px solid ${c.glL}`,
          }}
        >
          {[
            {
              icon: "🛡️",
              title: "Tick-proof mesh",
              text: "Blocks ticks, mosquitoes & noseeums",
            },
            {
              icon: "🌿",
              title: "Chemical-free",
              text: "No DEET, no permethrin",
            },
            {
              icon: "♻️",
              title: "Eco-responsible",
              text: "Made from recycled polyester",
            },
            {
              icon: "🦵",
              title: "360° coverage",
              text: "Integrated foot cover — no gaps",
            },
            {
              icon: "👨‍👩‍👧",
              title: "For the whole family",
              text: "Men, women & kids",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "28px 16px",
                borderRight: i < 4 ? `1px solid ${c.glL}` : "none",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: c.dark,
                  fontFamily: "'Poppins',sans-serif",
                  marginBottom: 4,
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: 11,
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
            gridTemplateColumns: "1.2fr 1fr 1fr",
            height: 260,
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
          ].map((img, i) => (
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
                  letterSpacing: "0.06em",
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
            padding: "64px 60px",
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
                marginBottom: 52,
                maxWidth: 640,
              }}
            >
              The mesh has microscopically small openings that physically block
              ticks, mosquitoes and noseeums. At the same time it lets air
              through — the air gap between your skin and the mesh is the key to
              its effectiveness.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 32,
              }}
            >
              {[
                {
                  step: "01",
                  icon: "🕷️",
                  title: "Ticks try to reach your skin",
                  text: "They crawl upward through grass and shrubs looking for a warm spot to attach themselves.",
                },
                {
                  step: "02",
                  icon: "🧥",
                  title: "The mesh forms a physical barrier",
                  text: "The noseeum-grade mesh is too fine for ticks to crawl through or penetrate.",
                },
                {
                  step: "03",
                  icon: "💨",
                  title: "Air gap adds extra protection",
                  text: "The space between the mesh and your skin ensures ticks cannot reach you.",
                },
                {
                  step: "04",
                  icon: "✅",
                  title: "You enjoy — bite-free",
                  text: "Chemical-free, lightweight and breathable. Just put it on and go outside.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: "24px 20px",
                    border: `1px solid ${c.glL}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: 700,
                      color: c.sage,
                      letterSpacing: "0.12em",
                      marginBottom: 12,
                    }}
                  >
                    {s.step}
                  </div>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: c.dark,
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.gray,
                      lineHeight: 1.65,
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
            padding: "26px 60px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {[
            { num: "1.5M+", label: "Tick bites per year in NL" },
            { num: "27,000", label: "New Lyme cases per year" },
            { num: "100%", label: "Chemical-free protection" },
            { num: "360°", label: "Full body coverage" },
            { num: "< 80g", label: "Weight per set" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 11,
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
      <section style={{ padding: "64px 60px" }}>
        {page === "home" ? (
          <>
            <h2 style={h2s}>Our Collection</h2>
            <p
              style={{
                fontSize: 14,
                color: c.gray,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                marginBottom: 32,
              }}
            >
              Protection for the whole family — men, women & kids
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 32,
                flexWrap: "wrap",
              }}
            >
              {catFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    padding: "7px 18px",
                    borderRadius: 24,
                    border: `1.5px solid ${filter === f.key ? c.sageD : c.glL}`,
                    background: filter === f.key ? c.sageD : "#fff",
                    color: filter === f.key ? "#fff" : c.grayD,
                    fontSize: 12,
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
              onClick={() => setPage("home")}
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
                marginBottom: 32,
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
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: 20,
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
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: p.bg,
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 52 }}>{p.emoji}</span>
                <div style={{ display: "flex", gap: 5 }}>
                  {[c.white, c.sage, c.sky, c.gray].map((col, i) => (
                    <div
                      key={i}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: col,
                        border: `1.5px solid ${c.glL}`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ padding: "16px 18px 20px" }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: c.sage,
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {p.tag}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: c.dark,
                    marginBottom: 4,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.gray,
                    marginBottom: 10,
                    lineHeight: 1.5,
                  }}
                >
                  {p.desc}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: c.grayD,
                    fontFamily: "'Poppins',sans-serif",
                    marginBottom: 14,
                    fontWeight: 500,
                  }}
                >
                  {p.price}
                </div>
                <button style={{ ...btn, width: "100%", fontSize: 11 }}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disease info */}
      {page === "home" && (
        <section style={{ padding: "64px 60px", background: "#fff" }}>
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
                marginBottom: 44,
                maxWidth: 660,
              }}
            >
              Ticks are active from March through November and live in tall
              grass, shrubs and forest edges. They can transmit serious diseases
              — and you often won't even notice a tick bite.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              {diseases.map((d, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${c.glL}`,
                    borderRadius: 10,
                    padding: "26px",
                    background: c.off,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{d.icon}</span>
                    <div>
                      <div
                        style={{ fontSize: 15, fontWeight: 700, color: c.dark }}
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
                      lineHeight: 1.8,
                      marginBottom: 14,
                      fontWeight: 300,
                    }}
                  >
                    {d.desc}
                  </p>
                  <div
                    style={{ borderTop: `1px solid ${c.glL}`, paddingTop: 12 }}
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
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {d.syms.map((s, j) => (
                        <span
                          key={j}
                          style={{
                            background: "#fff",
                            border: `1px solid ${c.glL}`,
                            borderRadius: 20,
                            padding: "3px 10px",
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
                marginTop: 32,
                background: `linear-gradient(120deg,${c.skyP} 0%,${c.sageL}44 100%)`,
                borderRadius: 10,
                padding: "28px 30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                border: `1px solid ${c.mist}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 16,
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
                  Bug Away mesh clothing physically blocks ticks — no chemicals,
                  no DEET, just a light layer you wear all day.
                </div>
              </div>
              <button
                style={{ ...btn, whiteSpace: "nowrap" }}
                onClick={() => setPage("men")}
              >
                Shop the collection
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {page === "home" && (
        <section style={{ padding: "64px 60px", background: c.off }}>
          <div style={lbl}>Customer reviews</div>
          <h2 style={{ ...h2s, marginBottom: 8 }}>What our customers say</h2>
          <p
            style={{
              fontSize: 14,
              color: c.gray,
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 300,
              marginBottom: 44,
            }}
          >
            Real stories from people who enjoy the outdoors without worrying
            about ticks
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 20,
            }}
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  padding: "24px",
                  border: `1px solid ${c.glL}`,
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} style={{ color: "#F0B429", fontSize: 14 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.grayD,
                    lineHeight: 1.75,
                    marginBottom: 18,
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  "{r.text}"
                </p>
                <div
                  style={{ borderTop: `1px solid ${c.glL}`, paddingTop: 14 }}
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

      {/* Mission + nature */}
      {page === "home" && (
        <section
          style={{
            padding: "64px 60px",
            background: `linear-gradient(135deg,${c.skyP} 0%,${c.off} 100%)`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "center",
              maxWidth: 940,
              margin: "0 auto",
            }}
          >
            <div>
              <div style={lbl}>Our mission</div>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: c.dark,
                  marginBottom: 16,
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
                  marginBottom: 14,
                }}
              >
                Hikers, mountain bikers, gardeners, foragers and families —
                anyone who spends time outdoors is at risk. Bug Away is an
                invisible protective layer: light, breathable and always on.
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "'Poppins',sans-serif",
                  color: c.grayD,
                  fontWeight: 300,
                  lineHeight: 1.9,
                  marginBottom: 24,
                }}
              >
                No chemicals. No DEET. No permethrin that kills bees. Just smart
                protection that respects nature — for people and animals alike.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  "♻️ Recycled polyester",
                  "🌿 Insecticide-free",
                  "🐝 Safe for bees",
                  "✅ Eco-responsible",
                ].map((t, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#fff",
                      border: `1px solid ${c.mist}`,
                      borderRadius: 20,
                      padding: "5px 12px",
                      fontSize: 12,
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
                gap: 12,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80"
                alt="Forest"
                style={{
                  width: "100%",
                  height: 190,
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
                  height: 190,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginTop: 24,
                  filter: "brightness(0.82) saturate(0.88)",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Blog preview */}
      {page === "home" && (
        <section style={{ padding: "64px 60px", background: "#fff" }}>
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
              marginBottom: 40,
            }}
          >
            Learn more about tick bites, tick-borne diseases and how to protect
            yourself
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 22,
            }}
          >
            {[
              {
                emoji: "🌱",
                title: "Tick season 2025: when are ticks most active?",
                tag: "Education",
                desc: "Ticks become active as soon as temperatures rise above 7°C. Find out when the risk is highest and how to prepare.",
              },
              {
                emoji: "🔬",
                title: "How to recognize a tick bite and what to do",
                tag: "Health",
                desc: "Not every tick bite leads to Lyme disease. But knowing what to do after a bite can make all the difference.",
              },
              {
                emoji: "🐕",
                title: "Ticks and dogs: risks and protection",
                tag: "Pets",
                desc: "Dogs face the same risks as humans. Discover how to protect your dog against ticks and Lyme disease.",
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
                    height: 140,
                    background: `linear-gradient(135deg,${c.skyP} 0%,${c.sageL}55 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 56,
                  }}
                >
                  {b.emoji}
                </div>
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: 700,
                      color: c.sage,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {b.tag}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: c.dark,
                      marginBottom: 8,
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
                      lineHeight: 1.65,
                    }}
                  >
                    {b.desc}
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      fontSize: 12,
                      color: c.sageD,
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: 600,
                      cursor: "pointer",
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
        style={{ background: c.dark, color: c.mist, padding: "48px 60px 32px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 36,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: "#fff",
                marginBottom: 14,
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
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              {["♻️ Eco", "🌿 Chemical-free", "🐝 Bee-safe"].map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 11,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.sage,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "3px 10px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
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
                  marginBottom: 14,
                }}
              >
                {col.head}
              </div>
              {col.links.map((l) => (
                <span
                  key={l}
                  style={{
                    fontSize: 13,
                    color: c.gray,
                    fontFamily: "'Poppins',sans-serif",
                    marginBottom: 10,
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
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: c.grayD,
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            © 2025 Bug Away. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Visa", "Mastercard", "iDEAL", "PayPal"].map((m) => (
              <span
                key={m}
                style={{
                  fontSize: 12,
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
