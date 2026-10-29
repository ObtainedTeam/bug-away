import { Link } from 'react-router-dom';
import { c, rv, FW, R, LH, W } from '../theme';
import { NewsletterForm } from './ui';
import { CATS, USE_CASES_NAV } from '../data/catalog';
import { BUGS } from '../data/bugs';

export const SOCIALS = [['https://www.instagram.com/bugawaygear/', 'Instagram'], ['https://www.facebook.com/p/Bug-Away-Gear-61589161742240/', 'Facebook']];

export const PAYMENTS = ['Visa', 'Mastercard', 'PayPal', 'Shop Pay', 'Google Pay', 'Klarna'];

function PayBadges({ dark = true }) {
  return (
    <ul aria-label="Payment methods" style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {PAYMENTS.map((p) => (
        <li key={p} style={{ fontSize: 11, fontWeight: FW.head, letterSpacing: '0.02em', padding: '5px 9px', borderRadius: 6, background: dark ? 'rgba(255,255,255,.1)' : c.white, color: dark ? c.white : c.dark, border: dark ? '1px solid rgba(255,255,255,.18)' : `1px solid ${c.line}` }}>{p}</li>
      ))}
    </ul>
  );
}
export { PayBadges };

const COLS = [
  ['Shop', [...CATS.filter((x) => !x.soon && !x.hideInShopMenu).map((x) => [`/shop?cat=${x.key}`, x.label]), ['/shop', 'All products']]],
  ['Protect from', BUGS.map((b) => [`/protect/${b.key}`, b.label])],
  ['Made for', [...USE_CASES_NAV, ['/why-choose-us', 'Mesh vs sprays']]],
  ['Help', [['/faq', 'FAQ'], ['/contact', 'Contact us'], ['/returns', 'Returns & refunds'], ['/reviews', 'Reviews'], ['/how-it-works', 'How it works'], ['/about', 'Our story'], ['/blog', 'Blog']]],
];

export default function Footer() {
  const year = new Date().getFullYear();
  const link = { color: c.mist, textDecoration: 'none', fontSize: 14, lineHeight: 1.4, display: 'inline-block', padding: '5px 0' };
  return (
    <footer style={{ background: c.forest, color: c.white }}>
      <div className="r-pad" style={{ ...rv('pad', '64px 40px 28px', '48px 20px 28px') }}>
        <div style={{ maxWidth: W.page, margin: '0 auto' }}>
          <div id="newsletter" className="grid-2m1 r-gap" style={{ ...rv('gap', 40, 18), alignItems: 'center', paddingBottom: 44, marginBottom: 44, borderBottom: '1px solid rgba(255,255,255,.12)', scrollMarginTop: 120 }}>
            <div>
              <h2 style={{ fontSize: 26, fontWeight: FW.head, lineHeight: LH.head }}>Stay ahead of tick season</h2>
              <p style={{ color: c.mist, marginTop: 8, fontSize: 15, lineHeight: LH.body }}>Get 15% off your first order, plus tick alerts and tips for the trail. No spam.</p>
            </div>
            <NewsletterForm />
          </div>

          <div className="foot-grid">
            <div className="foot-brand">
              <Link to="/" style={{ fontWeight: 900, fontSize: 22, color: c.white, textDecoration: 'none', letterSpacing: '-0.02em' }}>BUG AWAY</Link>
              <p style={{ color: c.mist, fontSize: 14, lineHeight: LH.body, marginTop: 12, maxWidth: 320 }}>Chemical-free mesh clothing that keeps ticks, mosquitoes and black flies off your skin. Nothing to spray, nothing to wash out.</p>
              <p style={{ color: c.mist, fontSize: 14, lineHeight: LH.body, marginTop: 14 }}>
                <a href="mailto:info@bugawaygear.com" style={{ color: c.white, fontWeight: FW.mid }}>info@bugawaygear.com</a><br />
                Ships from Houston, Texas<br />
                Operated by Obtained VOF, Lelystad, the Netherlands
              </p>
              <ul aria-label="Follow Bug Away" style={{ listStyle: 'none', display: 'flex', gap: 10, marginTop: 16 }}>
                {SOCIALS.map(([href, label]) => (
                  <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Bug Away on ${label}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 44, minHeight: 44, padding: '0 14px', borderRadius: R.pill, border: '1px solid rgba(255,255,255,.25)', color: c.white, fontSize: 14, fontWeight: FW.mid, textDecoration: 'none' }}>{label}</a></li>
                ))}
              </ul>
            </div>
            {COLS.map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <div style={{ fontWeight: FW.head, fontSize: 14, marginBottom: 10 }}>{title}</div>
                <ul style={{ listStyle: 'none' }}>
                  {links.map(([to, label]) => <li key={to}><Link to={to} className="u-link" style={link}>{label}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>

          <div className="foot-bottom" style={{ marginTop: 44, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.12)' }}>
            <PayBadges />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', fontSize: 13, color: c.mist }}>
              <span>© {year} Bug Away</span>
              <Link to="/privacy" className="u-link" style={{ color: c.mist }}>Privacy</Link>
              <Link to="/terms" className="u-link" style={{ color: c.mist }}>Terms</Link>
              <Link to="/returns" className="u-link" style={{ color: c.mist }}>Returns</Link>
            </div>
          </div>
          <p style={{ fontSize: 12, color: c.gray, marginTop: 18, lineHeight: 1.5, maxWidth: 760 }}>
            Bug Away is a physical barrier garment designed to prevent insect bites. It is not a medical device and does not prevent or treat tick-borne illness.
          </p>
        </div>
      </div>
    </footer>
  );
}
