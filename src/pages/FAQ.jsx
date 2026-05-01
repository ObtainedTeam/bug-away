import { useState } from "react";
import { Link } from "react-router-dom";
import { c, useIsMobile, H2, LBL, BTN } from "../theme";

const FAQS = [
  {
    q: "How does Bug Away actually block ticks?",
    a: "Bug Away uses noseeum-grade nylon mesh with openings smaller than 0.6mm. Ticks and other insects physically cannot fit through the fabric — it creates a complete barrier between your skin and the environment. No chemicals needed."
  },
  {
    q: "Is it comfortable to wear underneath regular clothes?",
    a: "Yes — Bug Away is designed as a base layer. The full set weighs under 80g and is made from breathable, moisture-wicking nylon mesh. Most wearers say they forget they have it on within minutes."
  },
  {
    q: "What about the foot? Does the pants leg stay closed?",
    a: "The pants leg and foot cover are one continuous piece of mesh — sewn together permanently. There is no gap, no elastic band, no separate sock. The mesh flows uninterrupted from the waistband down to the toe."
  },
  {
    q: "Can children wear Bug Away?",
    a: "Yes. Bug Away is chemical-free and safe for children of all ages. We offer kids sizing specifically designed for smaller frames. Many parents say it's the only tick protection solution that actually works for active kids."
  },
  {
    q: "How do I wash Bug Away?",
    a: "Machine wash cold on a gentle cycle. Do not tumble dry — air dry only. Bug Away is designed to last for years of regular use with proper care. No special detergents needed."
  },
  {
    q: "Does it work against mosquitoes as well?",
    a: "Yes. The mesh blocks mosquitoes, harvest mites (chiggers), gnats and other small insects in addition to ticks. It was originally developed as anti-mosquito netting, so mosquito protection is excellent."
  },
  {
    q: "Is there a return policy?",
    a: "Yes — we offer 30-day hassle-free returns. If you're not satisfied, contact us and we'll arrange a return or exchange. Products must be unworn and in original condition."
  },
  {
    q: "How long does shipping take?",
    a: "Netherlands: 2–4 business days. EU: 3–7 business days. North America: 10–18 business days. You will receive a tracking number once your order ships."
  },
  {
    q: "What sizes are available?",
    a: "We offer XS through XXXL for adults and S/M/L for kids. See the size guide below for exact measurements. When in doubt, size up — a slightly looser fit still provides full protection."
  },
];

export default function FAQ() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(null);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: isMobile ? 240 : 300,
        background: `linear-gradient(to right, rgba(30,50,40,.75) 60%, rgba(30,50,40,.35) 100%), url('/images/combo-lifestyle-couple-forest-white.jpg') center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 700, padding: isMobile ? "60px 24px" : "80px 64px", color: "#fff" }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>SUPPORT</div>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 900, lineHeight: 1.15, margin: 0 }}>
            Frequently asked<br /><span style={{ color: "#a8d5b5" }}>questions</span>
          </h1>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>COMMON QUESTIONS</div>
          <h2 style={{ ...H2, marginBottom: 40 }}>Everything you need to know</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} style={{ background: "#F7F9F8", borderRadius: 14, overflow: "hidden", border: open === i ? `2px solid ${c.sage}` : "2px solid transparent", transition: "border .2s" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", textAlign: "left", padding: "18px 20px", background: "none", border: "none",
                  cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", lineHeight: 1.4 }}>{q}</span>
                  <span style={{ color: c.sage, fontSize: 20, flexShrink: 0, transition: "transform .2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 20px 18px", color: "#555", fontSize: 14, lineHeight: 1.75 }}>{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIZE GUIDE ── */}
      <section style={{ background: "#F7F9F8", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ ...LBL, marginBottom: 8 }}>SIZING</div>
          <h2 style={{ ...H2, marginBottom: 36 }}>Size guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
            {[
              { src: "/images/size-guide-jacket.png", alt: "Jacket size guide — measurement points", label: "Jacket measurements" },
              { src: "/images/size-guide-fittype.png", alt: "Fit type guide", label: "Fit type" },
              { src: "/images/size-guide-chart.png", alt: "Full size chart", label: "Size chart (XS–XXXL)" },
            ].map(({ src, alt, label }) => (
              <div key={label} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <img src={src} alt={alt} style={{ width: "100%", display: "block" }}
                  onError={e => e.target.style.display = "none"}
                />
                <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: c.sageD }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#888", fontSize: 13, marginTop: 20 }}>
            When in doubt between two sizes, we recommend sizing up. A slightly looser fit still provides complete tick protection and is more comfortable for long wear.
          </p>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section style={{ background: "#1a2e24", padding: isMobile ? "48px 20px" : "64px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: isMobile ? 26 : 32, color: "#fff", marginBottom: 12 }}>
            Still have questions?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 28 }}>
            We're happy to help. Reach out via email and we'll get back to you within 24 hours.
          </p>
          <a href="mailto:hello@bugawaygear.com" style={{ ...BTN, textDecoration: "none", display: "inline-block" }}>
            Contact us
          </a>
        </div>
      </section>
    </div>
  );
}
