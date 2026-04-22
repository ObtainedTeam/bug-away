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
const label = {
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
    name: "Bug Away Broek Heren",
    tag: "Heren",
    price: "€ 69,95",
    bg: c.skyL + "55",
    emoji: "🧥",
    type: "Broek",
    cat: "men",
    desc: "Geïntegreerde voetbescherming, noseeum-grade gaas",
  },
  {
    id: 2,
    name: "Bug Away Jas Heren",
    tag: "Heren",
    price: "€ 74,95",
    bg: c.sageL + "55",
    emoji: "🧥",
    type: "Jas",
    cat: "men",
    desc: "Trekkoord capuchon, ritsslot, zij-zakken",
  },
  {
    id: 3,
    name: "Bug Away Broek Dames",
    tag: "Dames",
    price: "€ 69,95",
    bg: c.mist + "55",
    emoji: "🧥",
    type: "Broek",
    cat: "women",
    desc: "Geïntegreerde voetbescherming, noseeum-grade gaas",
  },
  {
    id: 4,
    name: "Bug Away Jas Dames",
    tag: "Dames",
    price: "€ 74,95",
    bg: c.skyP + "99",
    emoji: "🧥",
    type: "Jas",
    cat: "women",
    desc: "Trekkoord capuchon, ritsslot, zij-zakken",
  },
  {
    id: 5,
    name: "Kids Set (Jas + Broek)",
    tag: "Kids",
    price: "€ 89,95",
    bg: c.sageL + "44",
    emoji: "👕",
    type: "Kids",
    cat: "kids",
    desc: "Veilig elastiek bij capuchon, zakken voor vondsten!",
  },
  {
    id: 6,
    name: "Combo Set Volwassenen",
    tag: "Bundel",
    price: "€ 129,95",
    bg: c.sky + "33",
    emoji: "🎒",
    type: "Bundel",
    cat: "bundles",
    desc: "Broek + Jas samen — bespaar €14,95",
  },
  {
    id: 7,
    name: "Bug Away Sokken",
    tag: "Extra's",
    price: "€ 19,95",
    bg: c.glL + "99",
    emoji: "🧦",
    type: "Extra",
    cat: "extras",
    desc: "Extra bescherming bij de enkel en voet",
  },
  {
    id: 8,
    name: "Teken Pincet Set",
    tag: "Extra's",
    price: "€ 9,95",
    bg: c.glL + "99",
    emoji: "🔬",
    type: "Extra",
    cat: "extras",
    desc: "RVS pincet + loepje + opbergdoosje",
  },
];

const diseases = [
  {
    icon: "🔴",
    name: "Ziekte van Lyme",
    sev: "Meest voorkomend · ~27.000/jaar in NL",
    sevC: "#C0504D",
    desc: "Veroorzaakt door de bacterie Borrelia. Begint met een ringvormige rode uitslag, gevolgd door vermoeidheid, gewrichtspijn en neurologische klachten. Onbehandeld kan het chronisch worden.",
    syms: [
      "Rode ringuitslag",
      "Vermoeidheid",
      "Gewrichtspijn",
      "Neurologische klachten",
    ],
  },
  {
    icon: "🟠",
    name: "Tick-borne Encephalitis (TBE)",
    sev: "Ernstig · Opkomend in NL & BE",
    sevC: "#D07030",
    desc: "Virusinfectie die hersenen en ruggenmerg aantast. Begint griepachtig maar kan escaleren naar hersenvliesontsteking met blijvende schade.",
    syms: [
      "Hoge koorts",
      "Zware hoofdpijn",
      "Hersenvliesontsteking",
      "Blijvende schade",
    ],
  },
  {
    icon: "🟡",
    name: "Anaplasmose",
    sev: "Minder bekend · Onderschat",
    sevC: "#B08A20",
    desc: "Bacteriële infectie die witte bloedcellen aanvalt. Lijkt op griep maar kan ernstig worden zonder antibiotica, met name bij ouderen.",
    syms: [
      "Koorts & rillingen",
      "Spierpijn",
      "Verlaagd immuunsysteem",
      "Leverproblemen",
    ],
  },
  {
    icon: "🟢",
    name: "Babesiose",
    sev: "Zeldzaam maar gevaarlijk",
    sevC: "#4E8065",
    desc: "Parasitaire infectie vergelijkbaar met malaria. Gevaarlijk voor ouderen en mensen zonder milt. Opkomend in Europa.",
    syms: [
      "Hemolytische anemie",
      "Donkere urine",
      "Hoge koorts",
      "Orgaanfalen",
    ],
  },
];

const reviews = [
  {
    name: "Marloes V.",
    loc: "Utrecht",
    stars: 5,
    text: "Eindelijk iets wat echt werkt! Ik ga elke dag met mijn hond het bos in en had al twee keer de ziekte van Lyme. Met deze kleding voel ik me veel veiliger. Ademend en nauwelijks voelbaar.",
    product: "Combo Set Volwassenen",
  },
  {
    name: "Jan de B.",
    loc: "Zeeland",
    stars: 5,
    text: "Geweldige broek. Zit goed, de voetbescherming is een slim detail — precies wat ik zocht. Mijn vrouw heeft er nu ook eentje besteld.",
    product: "Bug Away Broek Heren",
  },
  {
    name: "Sofie K.",
    loc: "Antwerpen",
    stars: 5,
    text: "Mijn kinderen spelen nu zonder zorgen in de tuin. De kids set is schattig én functioneel. Zo blij dat ik dit gevonden heb voor het tekenseizoen!",
    product: "Kids Set (Jas + Broek)",
  },
  {
    name: "Rens M.",
    loc: "Friesland",
    stars: 4,
    text: "Top product. Licht, fijn stof en werkt goed. Teken zitten er echt niet doorheen. Iets groter besteld zoals aanbevolen en dat was de juiste keuze.",
    product: "Bug Away Jas Heren",
  },
];

const navItems = [
  { label: "Heren", key: "men" },
  { label: "Dames", key: "women" },
  { label: "Kids", key: "kids" },
  { label: "Bundels", key: "bundles" },
  { label: "Extra's", key: "extras" },
];
const catFilters = [
  { label: "Alles", key: "all" },
  { label: "Heren", key: "men" },
  { label: "Dames", key: "women" },
  { label: "Kids", key: "kids" },
  { label: "Bundels", key: "bundles" },
  { label: "Extra's", key: "extras" },
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
    men: "Heren Collectie",
    women: "Dames Collectie",
    kids: "Kids",
    bundles: "Bundels & Combos",
    extras: "Extra's",
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
        🛡️ Gratis verzending bij €59+ · Chemicaliënvrij · Insecticide-vrij ·
        Eco-verantwoord
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
              🌿 Insecticide-vrij · Eco-verantwoord · Tekenproof
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
              Buiten Genieten.
              <br />
              <span style={{ color: c.sageD }}>Veilig & Zorgeloos.</span>
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
              Lichtgewicht nylon gaaskleding die teken en insecten fysiek
              blokkeert. Geen DEET, geen chemicaliën — gewoon een slimme laag
              tussen jou en de natuur.
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
              "Zoals een vliegengordijn voor je lichaam 🌿"
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button style={btn} onClick={() => setPage("men")}>
                Bekijk Collectie
              </button>
              <button style={btnO} onClick={() => setPage("bundles")}>
                Combos & Bundels
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
                Jas
                <br />
                <span style={{ color: c.gray, fontWeight: 300, fontSize: 11 }}>
                  Noseeum gaas · Capuchon
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
                Broek
                <br />
                <span style={{ color: c.gray, fontWeight: 300, fontSize: 11 }}>
                  Geïntegreerde voet · 360° afdekking
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
              title: "Tekenproof gaas",
              text: "Blokkeert teken, muggen & noseeums",
            },
            {
              icon: "🌿",
              title: "Chemicaliënvrij",
              text: "Geen DEET, geen permethrin",
            },
            {
              icon: "♻️",
              title: "Eco-verantwoord",
              text: "Gemaakt van gerecycled polyester",
            },
            {
              icon: "🦵",
              title: "360° afdekking",
              text: "Geïntegreerde voet — geen gaten",
            },
            {
              icon: "👨‍👩‍👧",
              title: "Voor het gezin",
              text: "Heren, dames & kids",
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
              label: "Bos & Natuur",
            },
            {
              url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
              label: "Wandelen",
            },
            {
              url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
              label: "Buiten Leven",
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
            <div style={label}>Hoe het werkt</div>
            <h2 style={{ ...h2s, marginBottom: 12 }}>
              Een vliegengordijn voor je lichaam
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
              Het gaas heeft microscopisch kleine gaatjes die teken, muggen en
              noseeums fysiek blokkeren. Tegelijkertijd laat het lucht door — de
              luchtzak tussen je huid en het gaas is de sleutel.
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
                  title: "Teken proberen de huid te bereiken",
                  text: "Ze kruipen omhoog via gras en struiken op zoek naar een warme plek om zich te hechten.",
                },
                {
                  step: "02",
                  icon: "🧥",
                  title: "Het gaas vormt een fysieke barrière",
                  text: "De noseeum-grade mesh is te fijn voor teken om doorheen te komen of te crawlen.",
                },
                {
                  step: "03",
                  icon: "💨",
                  title: "Luchtzak biedt extra bescherming",
                  text: "De ruimte tussen het gaas en je huid zorgt dat teken je huid niet kunnen bereiken.",
                },
                {
                  step: "04",
                  icon: "✅",
                  title: "Jij geniet — zonder beten",
                  text: "Chemicaliënvrij, licht en ademend. Gewoon aantrekken en buiten gaan.",
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
            { num: "1,5M+", label: "Tekenbeten/jaar in NL" },
            { num: "27.000", label: "Lyme-gevallen/jaar" },
            { num: "100%", label: "Chemicaliënvrij" },
            { num: "360°", label: "Lichaamsafdekking" },
            { num: "< 80g", label: "Gewicht per set" },
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
            <h2 style={h2s}>Onze Collectie</h2>
            <p
              style={{
                fontSize: 14,
                color: c.gray,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 300,
                marginBottom: 32,
              }}
            >
              Bescherming voor het hele gezin — heren, dames & kids
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
              ← Terug
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
                ? "Veilig buiten spelen zonder zorgen"
                : page === "bundles"
                  ? "Meer besparen, meer bescherming"
                  : "Lichtgewicht mesh base layers"}
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
                  In winkelwagen
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
            <div style={label}>Waarom bescherming zo belangrijk is</div>
            <h2 style={{ ...h2s, marginBottom: 12 }}>
              Ziektes die teken overdragen
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
              Teken zijn actief van maart tot november en leven in hoog gras,
              struiken en bosranden. Ze kunnen gevaarlijke ziektes overdragen —
              en je merkt een tekenbeet vaak niet eens.
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
                      Symptomen
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
          </div>
        </section>
      )}

      {/* Reviews */}
      {page === "home" && (
        <section style={{ padding: "64px 60px", background: c.off }}>
          <div style={label}>Ervaringen</div>
          <h2 style={{ ...h2s, marginBottom: 8 }}>Wat onze klanten zeggen</h2>
          <p
            style={{
              fontSize: 14,
              color: c.gray,
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 300,
              marginBottom: 44,
            }}
          >
            Echte verhalen van mensen die buiten genieten zonder tekenzorgen
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
              <div style={label}>Onze missie</div>
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
                De natuur in —<br />
                zonder angst voor teken
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
                Wandelaars, mountainbikers, tuiniers, foragers en gezinnen —
                iedereen die buiten actief is loopt risico. Bug Away is een
                onzichtbare beschermende laag: licht, ademend en altijd aan.
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
                Geen chemicaliën. Geen DEET. Geen permethrin dat bijen doodt.
                Gewoon slimme bescherming die de natuur respecteert.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  "♻️ Gerecycled polyester",
                  "🌿 Insecticide-vrij",
                  "🐝 Veilig voor bijen",
                  "✅ Eco-verantwoord",
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
                alt="Bos"
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
                alt="Natuur"
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
          <div style={label}>Kennisbank</div>
          <h2 style={{ ...h2s, marginBottom: 8 }}>
            Alles over teken & bescherming
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
            Lees meer over tekenbeten, ziektes en hoe je jezelf beschermt
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
                title:
                  "Tekenseizoen 2025: wanneer zijn teken het meest actief?",
                tag: "Voorlichting",
                desc: "Teken zijn actief zodra de temperatuur boven 7°C komt. Lees wanneer het risico het hoogst is en hoe je je voorbereidt.",
              },
              {
                emoji: "🔬",
                title: "Hoe herken je een tekenbeet en wat doe je dan?",
                tag: "Gezondheid",
                desc: "Niet elke tekenbeet leidt tot Lyme. Maar weten wat je moet doen ná een beet kan het verschil maken.",
              },
              {
                emoji: "🐕",
                title: "Teken bij honden: risico's en bescherming",
                tag: "Huisdieren",
                desc: "Honden lopen hetzelfde risico als mensen. Ontdek hoe je je hond beschermt tegen teken en de ziekte van Lyme.",
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
                    Lees meer →
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
              Insecticide-vrije bescherming tegen teken en muggen. Voor
              wandelaars, gezinnen en iedereen die buiten geniet.
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              {["♻️ Eco", "🌿 Chemicaliënvrij", "🐝 Bijenproof"].map((t, i) => (
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
              head: "Collectie",
              links: ["Heren", "Dames", "Kids", "Bundels", "Extra's"],
            },
            {
              head: "Info",
              links: ["Hoe het werkt", "Teken & Lyme", "Maatgids", "FAQ"],
            },
            {
              head: "Service",
              links: ["Verzending", "Retour", "Contact", "Reviews"],
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
            © 2025 Bug Away. Alle rechten voorbehouden.
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
