import { useState, useEffect } from 'react';
import { c, useIsMobile, BTN } from '../theme';

export default function NewsletterPopup() {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('newsletterDismissed')) return;
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('newsletterDismissed', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Brevo integration will be connected here
    setSubmitted(true);
    setTimeout(() => dismiss(), 3000);
  };

  if (!show) return null;

  return (
    <>
      <div onClick={dismiss} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        zIndex: 500, backdropFilter: 'blur(3px)',
      }} />

      <div style={{
        position: 'fixed',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 501,
        background: '#fff', borderRadius: 16,
        width: isMobile ? 'calc(100% - 32px)' : 420,
        maxWidth: 420,
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
      }}>
        <button onClick={dismiss} style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          background: 'rgba(0,0,0,0.1)', border: 'none',
          color: '#333', width: 28, height: 28, borderRadius: '50%',
          cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        <div style={{ background: '#F0F5F2', padding: '32px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontFamily: 'Archivo, sans-serif', fontWeight: 900, color: c.sageD, lineHeight: 1 }}>
            15% OFF
          </div>
          <p style={{ fontSize: 15, color: '#555', marginTop: 8, marginBottom: 0 }}>
            your first order
          </p>
        </div>

        <div style={{ padding: '24px 28px 28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <p style={{ fontWeight: 700, color: c.sageD, marginBottom: 4, fontSize: 16 }}>Welcome!</p>
              <p style={{ fontSize: 13, color: '#888' }}>Your 15% discount code is on its way to your inbox.</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 1.6, marginBottom: 20, marginTop: 0 }}>
                Join the Bug Away community and get 15% off your first order. Plus early access to new products and seasonal tick safety tips.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: '14px 16px', borderRadius: 8, border: '2px solid #e8ede9',
                    fontSize: 14, outline: 'none', fontFamily: 'inherit',
                  }}
                />
                <button type="submit" style={{
                  ...BTN, padding: '14px 24px', cursor: 'pointer', border: 'none',
                  fontSize: 15, textAlign: 'center', width: '100%',
                }}>
                  Get My 15% Off
                </button>
              </form>
              <button onClick={dismiss} style={{
                background: 'none', border: 'none', color: '#aaa', fontSize: 12,
                cursor: 'pointer', marginTop: 12, width: '100%', textAlign: 'center',
              }}>
                No thanks, I'll pay full price
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
