import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { c, useIsMobile } from '../theme';

const navLinks = [
  { label: "Shop", to: "/shop" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartCount] = useState(0);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/');

  const linkStyle = (to) => ({
    fontFamily: "'Poppins',sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: isActive(to) ? c.sageD : c.grayD,
    textDecoration: "none",
    borderBottom: isActive(to) ? `2px solid ${c.sageD}` : "2px solid transparent",
    paddingBottom: 4,
    transition: "color 0.15s",
  });

  return (
    <>
      {/* Topbar */}
      <div style={{ background:c.sageD, color:"#fff", textAlign:"center", padding:"8px 16px", fontSize:11, fontFamily:"'Poppins',sans-serif", letterSpacing:"0.05em" }}>
        🛡️ Free shipping over €59 · Chemical-free · Eco-responsible
      </div>

      {/* Main nav */}
      <nav style={{ background:"#fff", borderBottom:`1px solid ${c.glL}`, padding:`0 ${isMobile?'16px':'40px'}`, display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:200, boxShadow:"0 2px 12px rgba(90,102,96,0.07)" }}>
        <Link to="/" style={{ fontSize:19, fontWeight:800, letterSpacing:"0.1em", color:c.sageD, textTransform:"uppercase", textDecoration:"none" }}>
          Bug Away
        </Link>

        {!isMobile && (
          <ul style={{ display:"flex", gap:28, listStyle:"none", margin:0, padding:0 }}>
            {navLinks.map(n => (
              <li key={n.to}>
                <Link to={n.to} style={linkStyle(n.to)}>{n.label}</Link>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <Link to="/shop" style={{ fontSize:18, textDecoration:"none" }}>🔍</Link>
          <div style={{ position:"relative", cursor:"pointer" }}>
            <span style={{ fontSize:18 }}>🛒</span>
            {cartCount > 0 && (
              <span style={{ position:"absolute", top:-6, right:-6, background:c.sageD, color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Poppins',sans-serif" }}>
                {cartCount}
              </span>
            )}
          </div>
          {isMobile && (
            <span style={{ fontSize:22, cursor:"pointer", color:c.dark }} onClick={() => setOpen(!open)}>
              {open ? "✕" : "☰"}
            </span>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && open && (
        <div style={{ background:"#fff", borderBottom:`1px solid ${c.glL}`, position:"sticky", top:60, zIndex:199 }}>
          {navLinks.map(n => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              style={{ display:"block", padding:"14px 20px", fontFamily:"'Poppins',sans-serif", fontSize:14, fontWeight:600, color:isActive(n.to)?c.sageD:c.dark, borderBottom:`1px solid ${c.glL}`, textDecoration:"none" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/shop"
            onClick={() => setOpen(false)}
            style={{ display:"block", margin:"12px 16px", background:c.sageD, color:"#fff", padding:"12px 20px", borderRadius:4, fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", textDecoration:"none", textAlign:"center" }}
          >
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}
