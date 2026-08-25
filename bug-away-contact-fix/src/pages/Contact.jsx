import { Link } from "react-router-dom";
import { c, useIsMobile, H2, LBL, BTN } from "../theme";

const EMAIL = "info@bugawaygear.com";
const SUBJECT = "Bug Away support request";

export default function Contact() {
  const isMobile = useIsMobile();

  return (
    <div>
      {/* ── HERO (compact, dit is een support-pagina, geen marketing) ── */}
      <section style={{
        position: "relative", minHeight: isMobile ? 180 : 240,
        background: `linear-gradient(to right, rgba(30,50,40,.75) 60%, rgba(30,50,40,.35) 100%), url('/images/combo-lifestyle-couple-forest-white.jpg') center/cover no-repeat`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 700, padding: isMobile ? "48px 24px" : "60px 64px", color: "#fff" }}>
          <div style={{ ...LBL, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>SUPPORT</div>
          <h1 style={{
            fontFamily: "Archivo, sans-serif",
            fontSize: isMobile ? 30 : 44,
            fontWeight: 900,
            lineHeight: 1.15,
            margin: 0,
          }}>
            Get in <span style={{ color: "#a8d5b5" }}>touch</span>
          </h1>
        </div>
      </section>

      {/* ── BODY ── */}
      <section style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: isMobile ? "48px 24px 80px" : "72px 32px 120px",
      }}>
        <p style={{
          fontSize: isMobile ? 16 : 17,
          lineHeight: 1.7,
          color: c.grayD,
          margin: "0 0 40px",
        }}>
          Questions about your order, sizing, shipping or returns? Send us an
          email and we'll get back to you within 24 hours (Monday to Friday).
        </p>

        {/* Email-blok — primaire actie */}
        <div style={{
          background: c.off,
          border: `1px solid ${c.glL}`,
          borderRadius: 8,
          padding: isMobile ? "28px 24px" : "36px 40px",
          textAlign: "center",
        }}>
          <div style={{ ...LBL, marginBottom: 12 }}>EMAIL US</div>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
            style={{
              display: "inline-block",
              fontFamily: "'Archivo', sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 800,
              color: c.sageD,
              textDecoration: "none",
              wordBreak: "break-all",
              marginBottom: 20,
            }}
          >
            {EMAIL}
          </a>
          <div>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
              style={{ ...BTN, textDecoration: "none" }}
            >
              Open email
            </a>
          </div>
          <p style={{
            fontSize: 12,
            color: c.gray,
            marginTop: 18,
            fontFamily: "'Poppins', sans-serif",
          }}>
            No mail app? Copy the address above and email us from your inbox.
          </p>
        </div>

        {/* Zelf-service — reduceer inbound waar mogelijk */}
        <div style={{ marginTop: 48 }}>
          <div style={{ ...LBL, marginBottom: 14 }}>FASTER ANSWERS</div>
          <p style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: c.grayD,
            margin: "0 0 20px",
          }}>
            Many common questions are already answered in our FAQ, including
            sizing, shipping times, and returns.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link to="/faq" style={{
              padding: "10px 20px",
              background: "#fff",
              border: `1px solid ${c.glL}`,
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              color: c.dark,
              textDecoration: "none",
              fontFamily: "'Poppins', sans-serif",
            }}>
              Read the FAQ
            </Link>
            <Link to="/returns" style={{
              padding: "10px 20px",
              background: "#fff",
              border: `1px solid ${c.glL}`,
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              color: c.dark,
              textDecoration: "none",
              fontFamily: "'Poppins', sans-serif",
            }}>
              Returns policy
            </Link>
          </div>
        </div>

        {/* Bedrijfsvermelding — klein, onderaan */}
        <div style={{
          marginTop: 56,
          paddingTop: 24,
          borderTop: `1px solid ${c.glL}`,
          fontSize: 12,
          color: c.gray,
          fontFamily: "'Poppins', sans-serif",
          lineHeight: 1.6,
        }}>
          Bug Away is operated by Obtained VOF. All customer support runs
          through {EMAIL}.
        </div>
      </section>
    </div>
  );
}
