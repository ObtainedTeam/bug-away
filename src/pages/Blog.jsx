import { useState } from "react";
import { Link } from "react-router-dom";
import { c, useIsMobile, H2, LBL } from "../theme";

const ARTICLES = [
  { id: 1, cat: "EDUCATION", title: "Tick Season 2025: When Are Ticks Most Active?", excerpt: "Ticks become active as soon as temperatures rise above 7°C. Find out when the risk is highest and how to protect yourself and your family throughout the year.", img: "/images/proof-ticks.jpg", readTime: "4 min read" },
  { id: 2, cat: "HEALTH", title: "How to Recognize a Tick Bite and What to Do", excerpt: "Not every tick bite leads to Lyme disease. But knowing what to do immediately after a bite can make all the difference to your health. Here's a step-by-step guide.", img: "/images/proof-mosquito.jpg", readTime: "5 min read" },
  { id: 3, cat: "PETS", title: "Ticks and Dogs: Risks and How to Protect Your Pet", excerpt: "Dogs face the exact same tick risks as humans. Discover how to protect your dog against ticks and tick-borne diseases this outdoor season.", img: "/images/pants-detail-feet-grass.jpg", readTime: "4 min read" },
  { id: 4, cat: "OUTDOORS", title: "The Best Forests for Hiking in the Netherlands — and How to Stay Safe", excerpt: "From the Veluwe to the Amsterdamse Bos, Dutch forests are beautiful — and full of ticks. Here's how to enjoy them safely.", img: "/images/jacket-men-lifestyle-birdwatching.jpg", readTime: "6 min read" },
  { id: 5, cat: "HEALTH", title: "Lyme Disease: Symptoms, Diagnosis and What Happens If It Goes Untreated", excerpt: "Lyme disease is on the rise across Europe and North America. Understanding the symptoms could save you from years of chronic illness.", img: "/images/detail-collage-white.jpg", readTime: "7 min read" },
  { id: 6, cat: "FAMILY", title: "How to Get Kids to Wear Tick Protection Without a Fight", excerpt: "Let's be honest — getting children to wear extra layers isn't always easy. Here are some tips that actually work.", img: "/images/kids-lifestyle-jumping-stream.jpg", readTime: "3 min read" },
];

const CATS = ["ALL", "EDUCATION", "HEALTH", "OUTDOORS", "PETS", "FAMILY"];

export default function Blog() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState("ALL");
  const filtered = active === "ALL" ? ARTICLES : ARTICLES.filter(a => a.cat === active);

  return (
    <div>
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

      <section style={{ background: "#fff", padding: "20px 24px", borderBottom: "1px solid #e8ede9", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 10, overflowX: "auto", flexWrap: isMobile ? "nowrap" : "wrap" }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
              background: active === cat ? c.sage : "#F0F5F2",
              color: active === cat ? "#fff" : c.sageD,
              transition: "all .2s",
            }}>{cat}</button>
          ))}
        </div>
      </section>

      {active === "ALL" && (
        <section style={{ background: "#F7F9F8", padding: isMobile ? "32px 20px" : "48px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
              <div style={{ height: isMobile ? 220 : "100%", minHeight: 300, overflow: "hidden" }}>
                <img src={ARTICLES[0].img} alt={ARTICLES[0].title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: isMobile ? 24 : 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: c.sage, marginBottom: 12 }}>FEATURED · {ARTICLES[0].cat}</div>
                <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, lineHeight: 1.3, marginBottom: 16 }}>{ARTICLES[0].title}</h2>
                <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{ARTICLES[0].excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 12, color: "#999" }}>{ARTICLES[0].readTime}</span>
                  <span style={{ fontSize: 14, color: c.sage, fontWeight: 600 }}>Read more →</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "#fff", padding: isMobile ? "32px 20px" : "48px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
            {(active === "ALL" ? filtered.slice(1) : filtered).map(({ id, cat, title, excerpt, img, readTime }) => (
              <div key={id} style={{ background: "#F7F9F8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transition: "transform .2s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}
              >
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: c.sage, padding: isMobile ? "48px 20px" : "64px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 26 : 32, color: "#fff", marginBottom: 12 }}>Stay updated on tick season</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 28 }}>Get our latest articles and tick protection tips straight to your inbox.</p>
          <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto", flexDirection: isMobile ? "column" : "row" }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: "13px 18px", borderRadius: 10, border: "none", fontSize: 14, outline: "none" }} />
            <button style={{ background: "#1a2e24", color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
