import { Link, useParams } from 'react-router-dom';
import { c, useIsMobile, BTN, H2, LBL } from '../theme';
import { blogPosts } from '../data';

export default function Blog() {
  const { slug } = useParams();
  const isMobile = useIsMobile();
  const pad = isMobile ? "48px 20px" : "64px 60px";

  // Article detail view
  const article = slug ? blogPosts.find(b => b.slug === slug) : null;

  if (article) {
    return (
      <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>
        {/* Breadcrumb */}
        <div style={{ background:"#fff", borderBottom:`1px solid ${c.glL}`, padding:`12px ${isMobile?"16px":"60px"}` }}>
          <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.gray }}>
            <Link to="/" style={{ color:c.gray, textDecoration:"none" }}>Home</Link>
            <span style={{ margin:"0 8px" }}>›</span>
            <Link to="/blog" style={{ color:c.gray, textDecoration:"none" }}>Blog</Link>
            <span style={{ margin:"0 8px" }}>›</span>
            <span style={{ color:c.dark }}>{article.title}</span>
          </div>
        </div>

        {/* Article hero */}
        <div style={{ background:`linear-gradient(135deg,${c.skyP} 0%,${c.sageL}55 100%)`, padding:isMobile?"48px 20px":"64px 60px", textAlign:"center" }}>
          <div style={{ fontSize:64, marginBottom:16 }}>{article.emoji}</div>
          <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:c.sage, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>{article.tag}</div>
          <h1 style={{ fontSize:isMobile?24:38, fontWeight:800, color:c.dark, lineHeight:1.15, letterSpacing:"-0.01em", maxWidth:700, margin:"0 auto 16px" }}>{article.title}</h1>
          <div style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.gray }}>{article.date} · {article.readTime}</div>
        </div>

        {/* Article content */}
        <div style={{ padding:pad, maxWidth:720, margin:"0 auto" }}>
          {article.content.split('\n\n').map((para, i) => {
            if (para.startsWith('**')) {
              return <h3 key={i} style={{ fontSize:16, fontWeight:700, color:c.dark, marginBottom:10, marginTop:24 }}>{para.replace(/\*\*/g,'')}</h3>;
            }
            if (para.startsWith('1.') || para.startsWith('-')) {
              const items = para.split('\n').filter(l=>l.trim());
              return (
                <ul key={i} style={{ paddingLeft:20, marginBottom:16 }}>
                  {items.map((item,j)=>(
                    <li key={j} style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.8, marginBottom:6, fontWeight:300 }}>
                      {item.replace(/^[\d\.\-\*]\s*/,'')}
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i} style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.9, marginBottom:16, fontWeight:300 }}>{para}</p>;
          })}
        </div>

        {/* More articles */}
        <section style={{ padding:pad, background:c.off, borderTop:`1px solid ${c.glL}` }}>
          <h2 style={{ ...H2, marginBottom:24 }}>More articles</h2>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:isMobile?12:20 }}>
            {blogPosts.filter(b=>b.slug!==slug).map((b,i)=>(
              <Link key={i} to={`/blog/${b.slug}`} style={{ textDecoration:"none" }}>
                <div style={{ border:`1px solid ${c.glL}`, borderRadius:10, overflow:"hidden", background:"#fff" }}>
                  <div style={{ height:100, background:`linear-gradient(135deg,${c.skyP} 0%,${c.sageL}55 100%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:40 }}>{b.emoji}</div>
                  <div style={{ padding:"14px 16px" }}>
                    <div style={{ fontSize:10, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:c.sage, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>{b.tag}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:c.dark, lineHeight:1.4, marginBottom:6 }}>{b.title}</div>
                    <div style={{ fontSize:12, color:c.sageD, fontFamily:"'Poppins',sans-serif", fontWeight:600 }}>Read more →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Blog listing
  return (
    <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>
      {/* Header */}
      <section style={{ background:`linear-gradient(135deg,${c.skyP} 0%,${c.mist} 100%)`, padding:isMobile?"48px 20px":"64px 60px" }}>
        <div style={LBL}>Knowledge base</div>
        <h1 style={{ fontSize:isMobile?28:42, fontWeight:800, color:c.dark, marginBottom:12, letterSpacing:"-0.02em" }}>Ticks, Lyme & Outdoor Life</h1>
        <p style={{ fontSize:14, color:c.grayD, fontFamily:"'Poppins',sans-serif", fontWeight:300, maxWidth:480 }}>
          Everything you need to know about tick protection, tick-borne diseases and how to enjoy the outdoors safely.
        </p>
      </section>

      {/* Articles */}
      <section style={{ padding:pad }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:isMobile?16:28 }}>
          {blogPosts.map((b,i)=>(
            <Link key={i} to={`/blog/${b.slug}`} style={{ textDecoration:"none" }}>
              <div style={{ border:`1px solid ${c.glL}`, borderRadius:10, overflow:"hidden", background:"#fff", transition:"transform 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <div style={{ height:isMobile?130:180, background:`linear-gradient(135deg,${c.skyP} 0%,${c.sageL}55 100%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:isMobile?52:72 }}>{b.emoji}</div>
                <div style={{ padding:isMobile?"16px":"20px 22px 24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div style={{ fontSize:10, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:c.sage, letterSpacing:"0.1em", textTransform:"uppercase" }}>{b.tag}</div>
                    <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.gray }}>{b.readTime}</div>
                  </div>
                  <h2 style={{ fontSize:isMobile?14:16, fontWeight:700, color:c.dark, marginBottom:8, lineHeight:1.4 }}>{b.title}</h2>
                  <p style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.gray, lineHeight:1.65, marginBottom:14 }}>{b.excerpt}</p>
                  <div style={{ fontSize:12, color:c.sageD, fontFamily:"'Poppins',sans-serif", fontWeight:600 }}>Read more →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
