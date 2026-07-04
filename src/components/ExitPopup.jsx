import { useState, useEffect } from 'react';
import { c, useIsMobile, BTN } from '../theme';
import { subscribe } from '../brevo';

export default function ExitPopup() {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or submitted
    if (sessionStorage.getItem('exitPopupDismissed')) return;

    // Desktop: exit intent (mouse leaves viewport top)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupDismissed')) setShow(true);
    };

    // Mobile: show after 30 seconds on site
    let timer;
    if (isMobile) {
      timer = setTimeout(() => setShow(true), 30000);
    } else {
      document.addEventListener('mouseout', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      if (timer) clearTimeout(timer);
    };
  }, [isMobile]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('exitPopupDismissed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try { await subscribe(email, 'tickGuide'); } catch (e) { console.error(e); }
    setSubmitted(true);
    setTimeout(() => {
      dismiss();
    }, 2500);
  };

  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={dismiss} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        zIndex: 400, backdropFilter: 'blur(3px)',
      }} />

      {/* Popup */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 401,
        background: '#fff', borderRadius: 16,
        width: isMobile ? 'calc(100% - 32px)' : 460,
        maxWidth: 460,
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ background: c.sageD, padding: '28px 28px 24px', color: '#fff', position: 'relative' }}>
          <button onClick={dismiss} style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(255,255,255,0.2)', border: 'none',
            color: '#fff', width: 28, height: 28, borderRadius: '50%',
            cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🦟</div>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 22, fontWeight: 900, lineHeight: 1.2, marginBottom: 8 }}>
            Wait — before you go
          </div>
          <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
            Get our free Tick Safety Guide and learn how to protect your family this season.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: 28 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
              <p style={{ fontWeight: 700, color: c.sageD, marginBottom: 4 }}>You're in!</p>
              <p style={{ fontSize: 13, color: '#888' }}>Check your inbox for the guide.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, fontSize: 13, color: '#555' }}>
                <div>✓ Where ticks hide in your yard</div>
                <div>✓ How to check yourself and your kids</div>
                <div>✓ Chemical-free prevention methods</div>
                <div>✓ What to do if you find a tick</div>
              </div>
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
                  Send Me the Free Guide
                </button>
              </form>
              <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 10 }}>
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
