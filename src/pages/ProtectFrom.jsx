import { Link, useParams } from 'react-router-dom';
import { c, rv, FW, R, SH, T, LH, W, CHIP, CARD, EYEBROW } from '../theme';
import { pic } from '../img';
import { products } from '../data';
import { BUGS, getBug, PROTECTS } from '../data/bugs';
import { Section, SectionHead, ProductCard, TrustBand } from '../components/ui';
import Reveal from '../components/Reveal';

// /protect/:bug — per insect: waar het zit, hoe het bijt, hoe Bug Away het
// tegenhoudt, en de producten die daarvoor werken (uit PROTECTS).
const ORDER = ['ba-combo-men', 'ba-combo-women', 'ba-kids-set', 'ba-jacket-men', 'ba-jacket-women', 'ba-pants-men', 'ba-pants-women', 'ba-tick-kit', 'ba-repellent-spray'];

export default function ProtectFrom() {
  const { bug } = useParams();
  const b = getBug(bug) || BUGS[0];
  const ids = ORDER.filter((id) => (PROTECTS[id] || []).includes(b.key) && products.some((p) => p.id === id));

  return (
    <div>
      <section style={{ position: 'relative', background: c.forest, color: c.white, overflow: 'hidden' }}>
        <img {...pic(b.img, '100vw')} alt="" fetchpriority="high" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,46,36,.92) 0%, rgba(26,46,36,.55) 60%, rgba(26,46,36,.2))' }} />
        <div className="r-pad" style={{ position: 'relative', maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', '84px 40px 76px', '48px 20px 44px') }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: c.mist, marginBottom: 14 }}><Link to="/" style={{ color: c.mist }}>Home</Link> › Protect from › {b.label}</nav>
          <h1 className="r-fs" style={{ ...rv('fs', ...T.h1), fontWeight: FW.head, lineHeight: LH.tight, maxWidth: 680, textShadow: SH.hero }}>{b.h1}</h1>
          <p className="r-fs" style={{ ...rv('fs', 18, 16), lineHeight: LH.body, maxWidth: 600, marginTop: 14, color: c.skyP }}>{b.lede}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
            {BUGS.map((x) => (
              <Link key={x.key} to={`/protect/${x.key}`} aria-current={x.key === b.key ? 'page' : undefined}
                style={{ ...CHIP, fontSize: 14, padding: '10px 16px', textDecoration: 'none', background: x.key === b.key ? c.white : 'rgba(255,255,255,.14)', color: x.key === b.key ? c.forest : c.white, border: '1px solid rgba(255,255,255,.35)' }}>{x.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid-3m1 r-gap" style={rv('gap', 22, 14)}>
          {b.facts.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80} style={{ ...CARD, padding: 26, borderTop: i === 2 ? `4px solid ${c.sageD}` : `4px solid ${c.line}` }}>
              <span style={{ ...EYEBROW, marginBottom: 8, color: i === 2 ? c.sageD : c.grayD }}>{i + 1}</span>
              <h2 style={{ fontSize: 19, fontWeight: FW.head, lineHeight: LH.head }}>{t}</h2>
              <p style={{ fontSize: 15, lineHeight: LH.body, color: c.grayD, marginTop: 8 }}>{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg={c.off}>
        <SectionHead align="left" eyebrow={`Stops ${b.label.toLowerCase()}`} title="What to wear" mb={24}
          action={<Link to={`/shop?bug=${b.key}`} className="u-link" style={{ fontWeight: FW.head, color: c.sageD }}>Shop all →</Link>} />
        <div className="pgrid r-gap" style={rv('gap', 20, 12)}>
          {ids.map((id) => <ProductCard key={id} id={id} />)}
        </div>
      </Section>

      <Section>
        <div className="grid-2m1 r-gap" style={{ ...rv('gap', 48, 22), alignItems: 'center' }}>
          <div>
            <span style={{ ...EYEBROW, marginBottom: 8 }}>Good to know</span>
            <h2 className="r-fs" style={{ ...rv('fs', ...T.h2), fontWeight: FW.head, lineHeight: LH.head }}>Small habits that help</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 10, marginTop: 18 }}>
              {b.tips.map((t) => <li key={t} style={{ display: 'flex', gap: 10, fontSize: 16, lineHeight: 1.5 }}><span style={{ color: c.sageD, fontWeight: FW.head }}>✓</span>{t}</li>)}
            </ul>
          </div>
          <div style={{ borderRadius: R.lg, overflow: 'hidden', aspectRatio: '4 / 3', position: 'relative', boxShadow: SH.card }}>
            <img {...pic(b.img, '(max-width: 767px) 100vw, 580px')} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: c.gray, marginTop: 28, maxWidth: 760, lineHeight: 1.5 }}>Bug Away is a physical barrier garment. It is not a medical device and does not prevent or treat any disease. Always check for ticks after time outdoors.</p>
      </Section>

      <TrustBand />
    </div>
  );
}
