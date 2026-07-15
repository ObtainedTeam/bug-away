import { useState, useEffect } from "react";
import { c, useIsMobile, LBL } from "../theme";
import { subscribe } from "../brevo";

const CATS = ["ALL", "EDUCATION", "HEALTH", "OUTDOORS", "PETS", "FAMILY"];

// Artikelen zonder hero image krijgen deze. BLG levert er meestal wel een.
const FALLBACK_IMG = "/images/proof-ticks.jpg";

export default function Blog() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState("ALL");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // blog-articles.json wordt tijdens de build weggeschreven door
  // scripts/build-blog.mjs. De artikelpagina's zelf zijn statische HTML op
  // /blog/<slug>, daarom hieronder <a href> en geen <Link>: een Link doet
  // client-side routing en komt dan nooit bij het echte bestand uit.
  useEffect(() => {
    let alive = true;
    fetch("/blog-articles.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (alive) setArticles(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = active === "ALL" ? articles : articles.filter((a) => a.cat === active);
  const featured = active === "ALL" ? filtered[0] : null;
  const rest = active === "ALL" ? filtered.slice(1) : filtered;

  return (
    <div>
      {/* HERO */}
      <section style={{
        position: "relative", minHeight: isMobile ? 260 : 340,
        background: `linear-gradient(to right, rgba(30,50,40,.75) 60%, rgba(30,50,40,.35) 100%), url('/images/jacket-men-lifestyle-forest-walking.jpg') center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 700, padding: isMobile ? "60px 24px" : "80px 64px", color: "#fff" }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>KNOWLEDGE BASE</div>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 900, lineHeight: 1.15, margin: "0 0 16px" }}>
            Learn about<br /><span style={{ color: "#a8d5b5" }}>tick protection</span>
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 440, lineHeight: 1.65, margin: 0 }}>
            Expert articles on Lyme disease, tick seasons, pet protection and how to enjoy outdoor life safely.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section style={{ background: "#fff", padding: "20px 24px", borderBottom: "1px solid #e8ede9", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 10, overflowX: "auto", flexWrap: isMobile ? "nowrap" : "wrap" }}>
          {CATS.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
              background: active === cat ? c.sage : "#F0F5F2",
              color: active === cat ? "#fff" : c.sageD,
              transition: "all .2s",
            }}>{cat}</button>
          ))}
        </div>
      </section>

      {loading && (
        <section style={{ background: "#F7F9F8", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 14, color: c.gray, fontFamily: "'Poppins',sans-serif" }}>Loading articles…</div>
        </section>
      )}

      {!loading && filtered.length === 0 && (
        <section style={{ background: "#F7F9F8", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>
            {articles.length === 0 ? "No articles yet" : `Nothing in ${active} yet`}
          </div>
          <div style={{ fontSize: 14, color: c.gray, fontFamily: "'Poppins',sans-serif" }}>
            {articles.length === 0 ? "New articles are published here every week." : "Try another category."}
          </div>
        </section>
      )}

      {/* FEATURED */}
      {featured && (
        <section style={{ background: "#F7F9F8", padding: isMobile ? "32px 20px" : "48px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <a href={`/blog/${featured.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <div style={{ height: isMobile ? 220 : "100%", minHeight: 300, overflow: "hidden" }}>
                  <img src={featured.img || FALLBACK_IMG} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: isMobile ? 24 : 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: c.sage, marginBottom: 12 }}>FEATURED · {featured.cat}</div>
                  <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, lineHeight: 1.3, marginBottom: 16 }}>{featured.title}</h2>
                  <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{featured.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "#999" }}>{featured.readTime}</span>
                    <span style={{ fontSize: 14, color: c.sage, fontWeight: 600 }}>Read more →</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* GRID */}
      {rest.length > 0 && (
        <section style={{ background: "#fff", padding: isMobile ? "32px 20px" : "48px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
              {rest.map(({ id, slug, cat, title, excerpt, img, readTime }) => (
                <a key={id} href={`/blog/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "#F7F9F8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transition: "transform .2s", height: "100%" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                  >
                    <div style={{ height: 180, overflow: "hidden" }}>
                      <img src={img || FALLBACK_IMG} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: c.sage, marginBottom: 8 }}>{cat}</div>
                      <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4, marginBottom: 10 }}>{title}</div>
                      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.65, margin: "0 0 14px" }}>{excerpt}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#aaa" }}>{readTime}</span>
                        <span style={{ fontSize: 13, color: c.sage, fontWeight: 600 }}>Read more →</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <BlogSignup isMobile={isMobile} />
    </div>
  );
}

function BlogSignup({ isMobile }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ busy: false, msg: "", ok: false });

  async function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setState({ busy: true, msg: "", ok: false });
    try {
      await subscribe(email.trim(), "newsletter");
      setState({ busy: false, msg: "You're in. Check your inbox.", ok: true });
      setEmail("");
    } catch (err) {
      setState({ busy: false, msg: err.message || "Something went wrong. Try again.", ok: false });
    }
  }

  return (
    <section style={{ background: c.sage, padding: isMobile ? "48px 20px" : "64px 40px", textAlign: "center" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 26 : 32, color: "#fff", marginBottom: 12 }}>Stay updated on tick season</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 28 }}>Get our latest articles and tick protection tips straight to your inbox.</p>
        <form onSubmit={onSubmit} style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto", flexDirection: isMobile ? "column" : "row" }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            style={{ flex: 1, padding: "13px 18px", borderRadius: 10, border: "none", fontSize: 14, outline: "none", minWidth: 0, fontFamily: "Archivo, sans-serif" }}
          />
          <button type="submit" disabled={state.busy} style={{ background: "#1a2e24", color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: state.busy ? "default" : "pointer", whiteSpace: "nowrap", opacity: state.busy ? 0.6 : 1 }}>
            {state.busy ? "…" : "Subscribe"}
          </button>
        </form>
        <div style={{ minHeight: 20, marginTop: 14, fontSize: 13, fontFamily: "'Poppins',sans-serif", color: state.ok ? "#fff" : "#ffe0e0" }}>
          {state.msg}
        </div>
      </div>
    </section>
  );
}
