import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { c, rv, FONT, FW, R, SH, T, LH, SP, W, BTN, BTNO, ON_DARK, CHIP, CARD, EYEBROW } from '../theme';
import { pic } from '../img';
import { useLazyVideo, videoHtml } from '../lazyVideo';
import { useReviews } from '../reviews';
import { activities } from '../data/activities';
import { AUDIENCES, productById } from '../data/catalog';
import { Section, SectionHead, ProductCard, Stars, VideoRow, TrustBand, Icon } from '../components/ui';
import { HOME_TABS, BENEFITS, HOME_VIDEOS, GUIDES, season } from '../data/home';
import Reveal from '../components/Reveal';

// Homepage als funnel (bouwbrief, sectie 4): hero, producten met tabs,
// voordelen, reviews, video's, urgentie, situaties, garantie, kennis.
// Inhoud staat in src/data/home.js.

function Hero() {
  const ref = useRef(null);
  useLazyVideo(ref, { afterLoad: true });
  const rvw = useReviews();
  return (
    <section className="home-hero r-mh" style={{ ...rv('mh', 'min(86vh, 760px)', '88svh'), display: 'flex', alignItems: 'stretch' }}>
      <div ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html:
        videoHtml({ src: '/videos/hero-1280.mp4', srcMobile: '/videos/hero-portrait.mp4' }) }} />
      <div aria-hidden="true" className="home-hero-shade" />
      <div className="r-pad" style={{ position: 'relative', width: '100%', maxWidth: W.page + 80, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...rv('pad', '72px 40px', '0 20px 40px') }}>
        <div className="hero-copy" style={{ maxWidth: 620, color: c.white }}>
          <span style={{ ...CHIP, background: 'rgba(255,255,255,.16)', color: c.white, border: '1px solid rgba(255,255,255,.4)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', fontSize: 12 }}>No DEET · No permethrin · No-see-um mesh</span>
          <h1 className="r-fs" style={{ ...rv('fs', ...T.display), fontWeight: FW.head, lineHeight: LH.tight, margin: '18px 0 16px', textShadow: SH.hero }}>
            Ticks can't bite<br />through this.
          </h1>
          <p className="r-fs" style={{ ...rv('fs', 19, 16), lineHeight: LH.body, maxWidth: 520, textShadow: SH.hero, opacity: 0.96 }}>
            Featherlight mesh that stops ticks, mosquitoes and black flies before they reach your skin. Pull it over what you're wearing and stay outside as long as you like.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 28 }}>
            <a href="#shop" style={{ ...BTN, height: 56, padding: '0 34px', fontSize: 15 }}>Shop the collection</a>
            {rvw && rvw.count > 0 && (
              <a href="#reviews" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: c.white, textDecoration: 'none', fontSize: 14, fontWeight: FW.mid, textShadow: SH.text }}>
                <Stars value={rvw.avg} size={15} /> {rvw.avg} from verified buyers
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [['leaf', 'Chemical-free, nothing on your skin'], ['shield', '30-day money-back guarantee'], ['truck', 'Free shipping over $150'], ['ret', 'Easy 30-day returns']];
  return (
    <div className="snap-row r-jc" style={{ ...rv('jc', 'center', 'flex-start'), gap: 30, padding: '14px 20px', background: c.white, borderBottom: `1px solid ${c.line}` }}>
      {items.map(([ic, label]) => (
        <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: FW.mid, color: c.dark, whiteSpace: 'nowrap' }}>
          <Icon name={ic} size={18} />{label}
        </span>
      ))}
    </div>
  );
}

function ShopGrid() {
  const [tab, setTab] = useState(HOME_TABS[0].key);
  const current = HOME_TABS.find((t) => t.key === tab);
  return (
    <Section id="shop" style={{ scrollMarginTop: 70 }}>
      <SectionHead align="left" eyebrow="Shop Bug Away" title="Full-body protection, ready to wear"
        action={<Link to="/shop" className="u-link d-only" style={{ fontWeight: FW.head, color: c.sageD, fontSize: 15 }}>View all products →</Link>} mb={22} />
      <div role="tablist" aria-label="Product categories" className="tabs" style={{ marginBottom: 24 }}>
        {HOME_TABS.map((t) => {
          const on = t.key === tab;
          return (
            <button key={t.key} role="tab" type="button" aria-selected={on} onClick={() => setTab(t.key)}
              style={{ ...CHIP, fontSize: 14, padding: '10px 18px', minHeight: 42, border: `1.5px solid ${on ? c.dark : c.line}`, background: on ? c.dark : c.white, color: on ? c.white : c.dark, cursor: 'pointer' }}>{t.label}</button>
          );
        })}
      </div>
      <div role="tabpanel" className="pgrid r-gap" style={rv('gap', 22, 12)}>
        {current.ids.map((id, i) => <ProductCard key={`${tab}-${id}`} id={id} priority={tab === HOME_TABS[0].key && i < 2} />)}
      </div>
      <div className="grid-4m2 r-gap r-mt" style={{ ...rv('gap', 16, 10), ...rv('mt', 40, 28) }}>
        {AUDIENCES.map((a) => (
          <Link key={a.key} to={`/shop?for=${a.key}`} className="card-hover" style={{ position: 'relative', display: 'block', aspectRatio: '4 / 3', borderRadius: R.lg, overflow: 'hidden', textDecoration: 'none', boxShadow: SH.card }}>
            <img {...pic(a.img, '(max-width: 767px) 50vw, 290px')} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,46,36,0) 40%, rgba(26,46,36,.75))' }} />
            <span className="r-fs" style={{ position: 'absolute', left: 14, bottom: 12, right: 12, color: c.white, fontWeight: FW.head, ...rv('fs', 18, 15), textShadow: SH.text, whiteSpace: 'nowrap' }}>
              {a.label} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Benefits() {
  return (
    <Section bg={c.off}>
      <SectionHead eyebrow="Why it works" title="Three questions, answered before you buy" intro="Will it really keep ticks off? Can I wear it in the heat? Is it safe for my kids? Here's the short version." />
      <div style={{ display: 'grid', gap: 28 }}>
        {BENEFITS.map((b, i) => (
          <Reveal key={b.title} className={`benefit r-gap${i % 2 ? ' is-rev' : ''}`} style={{ ...rv('gap', 56, 18), ...CARD, overflow: 'hidden', alignItems: 'stretch' }}>
            <div className="benefit-media" style={{ position: 'relative', minHeight: 300, background: c.mint }}>
              <img {...pic(b.img, '(max-width: 767px) 100vw, 580px')} alt={b.alt} loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: b.pos || 'center' }} />
            </div>
            <div className="r-pad" style={{ ...rv('pad', '44px 48px 44px 0', '4px 22px 26px'), alignSelf: 'center' }}>
              <span style={{ ...EYEBROW, marginBottom: 10 }}>{b.q}</span>
              <h3 className="r-fs" style={{ ...rv('fs', 28, 22), fontWeight: FW.head, lineHeight: LH.head, color: c.dark }}>{b.title}</h3>
              <p style={{ fontSize: 16, lineHeight: LH.body, color: c.grayD, marginTop: 12 }}>{b.text}</p>
              <ul style={{ listStyle: 'none', marginTop: 16, display: 'grid', gap: 8 }}>
                {b.points.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.45, color: c.dark }}>
                    <span aria-hidden="true" style={{ color: c.sageD, fontWeight: FW.head }}>✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Reviews() {
  const data = useReviews();
  const row = useRef(null);
  if (!data || !data.count) return null;
  const list = [...data.reviews].sort((a, b) => (b.rating - a.rating) || (b.body.length - a.body.length)).slice(0, 9);
  const scroll = (d) => { const el = row.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.9, behavior: 'smooth' }); };
  const arrow = (d) => (
    <button type="button" onClick={() => scroll(d)} aria-label={d < 0 ? 'Previous reviews' : 'Next reviews'}
      style={{ width: 44, height: 44, borderRadius: R.pill, border: `1.5px solid ${c.dark}`, background: c.white, color: c.dark, cursor: 'pointer', fontSize: 18 }}>{d < 0 ? '←' : '→'}</button>
  );
  return (
    <Section id="reviews" style={{ scrollMarginTop: 70 }}>
      <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 26 }}>
        <div>
          <span style={{ ...EYEBROW, marginBottom: 10 }}>Verified reviews</span>
          <h2 className="r-fs" style={{ ...rv('fs', ...T.h2), fontWeight: FW.head, lineHeight: LH.head }}>What wearers say</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
            <Stars value={data.avg} size={20} />
            <span style={{ fontSize: 15, color: c.grayD }}><b style={{ color: c.dark }}>{data.avg} out of 5</b> · {data.count} reviews from Judge.me</span>
          </div>
        </div>
        <div className="d-only" style={{ display: 'flex', gap: 10 }}>{arrow(-1)}{arrow(1)}</div>
      </Reveal>
      <div ref={row} className="snap-row" style={{ gap: 24, padding: '4px 4px 30px', margin: '0 -4px' }}>
        {list.map((r, i) => (
          <article key={i} className="rev-card" style={{ ...CARD, padding: 24, display: 'flex', flexDirection: 'column' }}>
            <Stars value={r.rating} size={15} />
            {r.title && <h3 style={{ fontSize: 16, fontWeight: FW.head, lineHeight: LH.head, marginTop: 10 }}>{r.title}</h3>}
            <p className="clamp-5" style={{ fontSize: 15, lineHeight: LH.body, color: c.grayD, margin: '10px 0 16px' }}>“{r.body.trim()}”</p>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 14 }}>{(r.name || '').split(' ')[0]}</b>
              {r.verified && <span style={{ ...CHIP, fontSize: 11, padding: '4px 9px', background: c.mint, color: c.sageD }}>Verified buyer</span>}
            </div>
            {r.productTitle && <div style={{ fontSize: 12, color: c.gray, marginTop: 6 }}>{r.productTitle}</div>}
          </article>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 6 }}><Link to="/reviews" style={BTNO}>Read all reviews</Link></div>
    </Section>
  );
}

function Urgency() {
  const set = productById('ba-combo-men');
  // Seizoen: server rendert op builddatum, browser corrigeert naar vandaag.
  const [sea, setSea] = useState(() => season());
  useEffect(() => { setSea(season(new Date().getMonth())); }, []);
  return (
    <Section pad={['24px 40px 88px', '8px 20px 60px']}>
      <Reveal className="grid-2m1" style={{ borderRadius: R.lg, overflow: 'hidden', background: c.forest, color: c.white, boxShadow: SH.strong }}>
        <div className="r-pad" style={{ ...rv('pad', '52px 52px', '32px 22px'), alignSelf: 'center' }}>
          <span style={{ ...EYEBROW, color: c.mist, marginBottom: 12 }}>{sea.tag}</span>
          <h2 className="r-fs" style={{ ...rv('fs', 34, 26), fontWeight: FW.head, lineHeight: LH.head }}>{sea.title}</h2>
          <p style={{ fontSize: 16, lineHeight: LH.body, color: c.skyP, marginTop: 14 }}>
            {sea.text} Buy 3 full sets and the 4th is free, applied automatically at checkout.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
            <Link to="/shop?cat=sets" style={{ ...BTN, background: c.white, color: c.forest, boxShadow: 'none' }}>Shop full sets</Link>
            <Link to={`/product/${set.id}`} style={{ ...BTNO, ...ON_DARK }}>See the bestseller</Link>
          </div>
        </div>
        <div style={{ position: 'relative', minHeight: 300 }}>
          <img {...pic('/images/Couple _ camping.png', '(max-width: 767px) 100vw, 600px')} alt="A couple camping in Bug Away mesh sets" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
          <span style={{ ...CHIP, position: 'absolute', top: 16, left: 16, background: c.white, color: c.forest, fontSize: 13 }}>Buy 3 sets, get the 4th free</span>
        </div>
      </Reveal>
    </Section>
  );
}

function UseCases() {
  return (
    <Section bg={c.off}>
      <SectionHead eyebrow="Made for where you go" title="Find your setup" intro="Pick your situation and see what works best for it." />
      <div className="uc-grid r-gap" style={rv('gap', 16, 12)}>
        {activities.map((a, i) => (
          <Reveal key={a.slug} delay={i * 70}>
            <Link to={`/${a.slug}`} className="card-hover" style={{ position: 'relative', display: 'block', aspectRatio: '3 / 4', borderRadius: R.lg, overflow: 'hidden', textDecoration: 'none', boxShadow: SH.card }}>
              <img {...pic(a.hero, '(max-width: 767px) 64vw, 230px')} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,46,36,0) 45%, rgba(26,46,36,.8))' }} />
              <span style={{ position: 'absolute', left: 16, right: 16, bottom: 16, color: c.white }}>
                <b style={{ display: 'block', fontSize: 19, lineHeight: LH.head, textShadow: SH.text }}>{a.nav}</b>
                <span style={{ fontSize: 13, opacity: 0.92 }}>Shop for {a.nav.toLowerCase()} →</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Learn() {
  const [arts, setArts] = useState(null);
  useEffect(() => {
    fetch('/blog-articles.json').then((r) => r.json()).then((d) => Array.isArray(d) && setArts(d.slice(0, 3))).catch(() => {});
  }, []);
  const cards = arts && arts.length
    ? arts.map((a) => ({ href: `/blog/${a.slug}`, img: a.img, ext: true, cat: a.cat, title: a.title, meta: a.readTime }))
    : GUIDES;
  return (
    <Section>
      <SectionHead align="left" eyebrow="Learn" title="Know your ticks"
        action={<Link to="/blog" className="u-link" style={{ fontWeight: FW.head, color: c.sageD, fontSize: 15 }}>All articles →</Link>} mb={26} />
      <div className="grid-3m1 r-gap" style={rv('gap', 22, 16)}>
        {cards.map((a, i) => (
          <Reveal key={a.href} delay={i * 80}>
            <a href={a.href} className="card-hover" style={{ ...CARD, display: 'block', overflow: 'hidden', textDecoration: 'none', color: c.dark, height: '100%' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 10', background: c.mint }}>
                <img {...(a.ext ? { src: a.img } : pic(a.img, '(max-width: 767px) 100vw, 380px'))} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                {a.cat && <span style={{ ...EYEBROW, fontSize: 11, marginBottom: 8 }}>{a.cat}</span>}
                <h3 className="clamp-2" style={{ fontSize: 17, fontWeight: FW.head, lineHeight: LH.head }}>{a.title}</h3>
                {a.meta && <span style={{ display: 'block', fontSize: 13, color: c.grayD, marginTop: 8 }}>{a.meta}</span>}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ShopGrid />
      <Benefits />
      <Reviews />
      <VideoRow eyebrow="See it in action" title="Watch the mesh do its job" intro="A real tick on the mesh, up close. More customer videos are on the way." big={HOME_VIDEOS.big} videos={HOME_VIDEOS.small} />
      <Urgency />
      <UseCases />
      <TrustBand />
      <Learn />
    </>
  );
}
