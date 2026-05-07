import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { c, useIsMobile, BTN, BTNO, H2, LBL } from '../theme';
import { products, reviews } from '../data';
import { SHOPIFY_IDS, SHOPIFY_HANDLES, fetchProduct, buyNow } from '../shopify';
import { CartContext } from '../components/Cart';
import { useCurrency, formatPrice } from '../currency.jsx';

const Star = ({ filled }) => (
  <span style={{ color: filled ? "#F59E0B" : "#ddd", fontSize: 16 }}>★</span>
);

export default function Product() {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { symbol } = useCurrency();
  const product = products.find(p => p.id === id) || products[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(null);
    setMainImg(0);
  }, [id]);

  const productReviews = reviews.filter(r => r.product === product.id);
  const avgRating = productReviews.length
    ? (productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length).toFixed(1)
    : 4.9;
  const reviewCount = productReviews.length || 48;

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Please select a size'); return; }
    CartContext.add(product, selectedSize, selectedColor, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    if (!selectedSize) { alert('Please select a size'); return; }
    setLoading(true);
    await buyNow(product.id, selectedSize, selectedColor);
    setLoading(false);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div style={{ fontFamily: "'Archivo', sans-serif", color: '#1a1a1a' }}>
      {/* BREADCRUMB */}
      <div style={{ padding: isMobile ? "12px 16px" : "12px 40px", fontSize: 12, color: '#999', borderBottom: '1px solid #e8ede9' }}>
        <Link to="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
        {' › '}
        <Link to="/shop" style={{ color: '#999', textDecoration: 'none' }}>Shop</Link>
        {' › '}
        <span style={{ color: '#333' }}>{product.name}</span>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48 }}>

        {/* IMAGE GALLERY */}
        <div>
          <div style={{ borderRadius: 16, overflow: 'hidden', background: '#f7f9f8', aspectRatio: '1', marginBottom: 12 }}>
            <img src={product.images[mainImg]} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {product.images.slice(0, 10).map((img, i) => (
              <div key={i} onClick={() => setMainImg(i)} style={{
                borderRadius: 8, overflow: 'hidden', aspectRatio: '1', cursor: 'pointer',
                border: mainImg === i ? `2px solid ${c.sageD}` : '2px solid transparent',
                background: '#f7f9f8',
              }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => e.target.style.display = 'none'} />
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: c.sage, textTransform: 'uppercase', marginBottom: 8 }}>{product.category}</div>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? 26 : 32, fontWeight: 900, lineHeight: 1.15, margin: '0 0 12px' }}>{product.name}</h1>

          {/* RATING */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div>{[1,2,3,4,5].map(i => <Star key={i} filled={i <= Math.round(avgRating)} />)}</div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#333' }}>{avgRating}</span>
            <span style={{ fontSize: 13, color: '#999' }}>({reviewCount} reviews)</span>
          </div>

          {/* PRICE */}
          <div style={{ fontSize: 32, fontWeight: 900, color: c.sageD, marginBottom: 20 }}>
            {symbol}{product.price.toFixed(2)}
            <span style={{ fontSize: 13, color: '#999', fontWeight: 400, marginLeft: 8 }}>Incl. VAT</span>
          </div>

          {/* SHORT DESC */}
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>{product.desc}</p>

          {/* COLOR */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
              Color: <span style={{ color: c.sage }}>{selectedColor}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {product.colors.map(col => (
                <button key={col} onClick={() => setSelectedColor(col)} style={{
                  width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
                  background: product.colorHex[product.colors.indexOf(col)],
                  border: selectedColor === col ? `3px solid ${c.sageD}` : '3px solid #e8ede9',
                  outline: selectedColor === col ? `2px solid ${c.sageD}` : 'none',
                  outlineOffset: 2,
                }} title={col} />
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>
                Size: <span style={{ color: selectedSize ? c.sage : '#dc2626' }}>{selectedSize || 'Select a size'}</span>
              </div>
              <button onClick={() => setShowSizeGuide(!showSizeGuide)} style={{ fontSize: 12, color: c.sage, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Size guide ›
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} style={{
                  padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  border: `2px solid ${selectedSize === size ? c.sageD : '#e8ede9'}`,
                  background: selectedSize === size ? c.sageD : '#fff',
                  color: selectedSize === size ? '#fff' : '#333',
                  transition: 'all .15s',
                }}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE GUIDE INLINE */}
          {showSizeGuide && (
            <div style={{ background: '#F7F9F8', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Size Guide</div>
              <img src="/images/size-guide-chart.png" alt="Size chart" style={{ width: '100%', borderRadius: 8 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                <img src="/images/size-guide-jacket.png" alt="Jacket measurements" style={{ width: '100%', borderRadius: 8 }} />
                <img src="/images/size-guide-fittype.png" alt="Fit type" style={{ width: '100%', borderRadius: 8 }} />
              </div>
              <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>When in doubt between two sizes, size up. A slightly looser fit provides better airflow and protection.</p>
            </div>
          )}

          {/* QTY + ADD TO CART */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e8ede9', borderRadius: 10, overflow: 'hidden' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>−</button>
              <span style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: 15 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>+</button>
            </div>
            <button onClick={handleAddToCart} style={{
              flex: 1, ...BTN, fontSize: 14, padding: '14px 0', textAlign: 'center',
              background: added ? '#2d6b4a' : c.sageD,
              transition: 'background .3s',
            }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          <button onClick={handleBuyNow} disabled={loading} style={{
            width: '100%', ...BTNO, fontSize: 14, padding: '14px 0', textAlign: 'center',
            opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer',
          }}>
            {loading ? 'Loading...' : 'Buy Now →'}
          </button>

          {/* TRUST BADGES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 20, padding: '16px 0', borderTop: '1px solid #e8ede9', borderBottom: '1px solid #e8ede9' }}>
            {[
              { icon: '🚚', label: 'Free shipping', sub: 'over €59 / $79' },
              { icon: '↩️', label: '30-day returns', sub: 'Hassle-free' },
              { icon: '🌿', label: 'Chemical-free', sub: 'No DEET, no permethrin' },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#333' }}>{label}</div>
                <div style={{ fontSize: 10, color: '#999' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* USE CASES */}
          {product.useCases && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Perfect for</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {product.useCases.map(use => (
                  <span key={use} style={{ background: '#F0F5F2', color: c.sageD, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{use}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABS SECTION */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px 40px' : '0 40px 60px' }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #e8ede9', marginBottom: 32 }}>
          {['description', 'features', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, textTransform: 'capitalize',
              color: activeTab === tab ? c.sageD : '#999',
              borderBottom: activeTab === tab ? `3px solid ${c.sageD}` : '3px solid transparent',
              marginBottom: -2,
              transition: 'all .2s',
            }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div style={{ maxWidth: 720 }}>
            {product.longDesc?.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: '#444', lineHeight: 1.8, marginBottom: 20 }}>{para}</p>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, maxWidth: 800 }}>
            {product.features.map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#F7F9F8', borderRadius: 10, padding: '12px 16px' }}>
                <span style={{ color: c.sage, fontWeight: 900, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ maxWidth: 720 }}>
            {reviews.filter(r => r.product === product.id).length > 0 ? (
              reviews.filter(r => r.product === product.id).map(r => (
                <div key={r.id} style={{ background: '#F7F9F8', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                    {[1,2,3,4,5].map(i => <Star key={i} filled={i <= r.rating} />)}
                  </div>
                  <p style={{ fontSize: 15, color: '#333', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 10px' }}>"{r.text}"</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.sageD }}>{r.name}</div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⭐</div>
                <p>Be the first to review this product</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* HOW IT WORKS VIDEO SECTION */}
      <section style={{ background: '#1a2e24', padding: isMobile ? '48px 20px' : '72px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ ...LBL, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>SEE IT IN ACTION</div>
          <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: isMobile ? 26 : 32, color: '#fff', marginBottom: 16 }}>
            Watch Bug Away work in the wild
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
            See how the noseeum-grade mesh physically blocks insects — ticks, mosquitoes and harvest mites — while remaining fully breathable.
          </p>
          <video autoPlay muted loop playsInline style={{ width: '100%', borderRadius: 16, maxHeight: 480, objectFit: 'cover' }}>
            <source src="/videos/see-in-action.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* PROOF PHOTOS */}
      <section style={{ background: '#F7F9F8', padding: isMobile ? '48px 20px' : '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ ...LBL, marginBottom: 8 }}>PROOF IT WORKS</div>
          <h2 style={{ ...H2, marginBottom: 16 }}>The mesh stops insects in their tracks</h2>
          <p style={{ color: '#555', fontSize: 15, maxWidth: 600, marginBottom: 40 }}>
            Openings smaller than 0.6mm. These photos show real insects unable to pass through the fabric.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
            {[
              { img: '/images/proof-mosquito.jpg', label: 'Mosquito blocked by mesh' },
              { img: '/images/proof-ticks.jpg', label: 'Tick unable to penetrate' },
              { img: '/images/proof-spider.jpg', label: 'Spider stopped at surface' },
            ].map(({ img, label }) => (
              <div key={label} style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <img src={img} alt={label} style={{ width: '100%', height: isMobile ? 180 : 240, objectFit: 'cover', display: 'block' }} />
                <div style={{ background: '#fff', padding: '10px 14px', fontSize: 13, fontWeight: 600, color: c.sageD }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '72px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ ...H2, marginBottom: 32 }}>Complete your protection</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 20 }}>
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#F7F9F8', borderRadius: 14, overflow: 'hidden', transition: 'transform .2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  <div style={{ height: isMobile ? 140 : 200, overflow: 'hidden' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 11, color: c.sage, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{p.category}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{p.name}</div>
                    <div style={{ fontWeight: 800, color: c.sageD }}>{symbol}{p.price.toFixed(2)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
