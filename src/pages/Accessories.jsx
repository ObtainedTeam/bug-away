import { useState } from "react";
import { pic } from '../img';
import { ProductCard } from '../components/ui';
import { rv } from '../theme';
import { Link } from "react-router-dom";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";
import { products } from "../data";
import { isPurchasable } from "../shopify";
import { useCurrency, formatPrice, getPrice, getCompare } from "../currency.jsx";
import { subscribe } from "../brevo";

export default function Accessories() {
  const isMobile = useIsMobile();
  const { symbol, region } = useCurrency();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const items = products.filter((p) => p.category === "ACCESSORIES");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try { await subscribe(email, "accessories"); } catch (err) { console.error(err); }
    setSubmitted(true);
  };

  return (
    <div>
      {/* HERO */}
      <section style={{
        position: "relative", minHeight: isMobile ? 260 : 360,
        background: `linear-gradient(to right, rgba(30,50,40,.78) 55%, rgba(30,50,40,.4) 100%), url("/img/men-and-female-hiking-on-mountain.webp") center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ padding: isMobile ? "40px 24px" : "60px 64px", color: "#fff", maxWidth: 620 }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>GEAR & EXTRAS</div>
          <h1 style={{ fontFamily: "'Archivo Variable', sans-serif", fontSize: isMobile ? 30 : 44, fontWeight: 900, margin: "0 0 14px" }}>
            Accessories
          </h1>
          <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.6 }}>
            The tick removal kit, indoor zapper and natural repellent that round out your Bug Away protection — for the moments and places the mesh can't reach.
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="r-pad" style={rv('pad', '48px 40px', '28px 16px')}>
        <div className="pgrid pgrid-3" style={{ gap: 20, maxWidth: 1200, margin: '0 auto' }}>
          {items.map((p) => <ProductCard key={p.id} id={p.id} />)}
        </div>
      </section>

      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "64px 40px", borderTop: "1px solid #e8ede9" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...H2, marginBottom: 16 }}>More accessories on the way</h2>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We are expanding the range with mesh gloves, gaiters and head nets. Sign up to hear when they drop and get an early-bird discount.
          </p>

          {submitted ? (
            <div style={{ background: "#F0F5F2", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <p style={{ fontWeight: 700, color: c.sageD, marginBottom: 4 }}>You're on the list!</p>
              <p style={{ fontSize: 13, color: "#888" }}>We'll email you as soon as new accessories are available.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : "row" }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1, padding: "14px 16px", borderRadius: 8, border: "2px solid #e8ede9",
                  fontSize: 14, outline: "none", fontFamily: "inherit",
                }}
              />
              <button type="submit" style={{ ...BTN, padding: "14px 24px", whiteSpace: "nowrap", cursor: "pointer", border: "none" }}>
                Notify Me
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
