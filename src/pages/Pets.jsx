import { useState } from "react";
import { c, useIsMobile, BTN, H2, LBL } from "../theme";
import { subscribe } from "../brevo";

export default function Pets() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try { await subscribe(email, 'pets'); } catch (e) { console.error(e); }
    setSubmitted(true);
  };

  return (
    <div>
      <section style={{
        position: "relative", minHeight: isMobile ? 300 : 400,
        background: `linear-gradient(to right, rgba(30,50,40,.75) 55%, rgba(30,50,40,.35) 100%), url("/images/pants-detail-feet-grass.jpg") center/cover no-repeat`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center", color: "#fff", padding: isMobile ? "40px 24px" : "60px 40px", maxWidth: 600 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🐕</div>
          <h1 style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? 32 : 44, fontWeight: 900, margin: "0 0 16px" }}>
            Pet Protection
          </h1>
          <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6, marginBottom: 8 }}>
            Tick protection for your four-legged family members. Because they deserve the same chemical-free barrier you wear.
          </p>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 24, padding: "6px 20px", fontSize: 14, fontWeight: 700, marginTop: 8 }}>
            Coming Soon
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "72px 40px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...H2, marginBottom: 16 }}>Be the first to know</h2>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We are developing tick-proof gear for dogs. Sign up to get notified when it launches and receive an exclusive early-bird discount.
          </p>

          {submitted ? (
            <div style={{ background: "#F0F5F2", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <p style={{ fontWeight: 700, color: c.sageD, marginBottom: 4 }}>You're on the list!</p>
              <p style={{ fontSize: 13, color: "#888" }}>We'll email you as soon as pet protection is available.</p>
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
