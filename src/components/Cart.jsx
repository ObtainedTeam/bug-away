import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { c, useIsMobile } from '../theme';
import { SHOPIFY_HANDLES } from '../shopify';

const DOMAIN = 'bug-away-3.myshopify.com';
const FREE_SHIPPING_THRESHOLD = 79;

export const CartContext = {
  items: [],
  listeners: [],
  subscribe(fn) { this.listeners.push(fn); },
  unsubscribe(fn) { this.listeners = this.listeners.filter(l => l !== fn); },
  notify() { this.listeners.forEach(fn => fn([...this.items])); },
  add(product, size, color, quantity = 1) {
    const key = `${product.id}-${size}-${color}`;
    const existing = this.items.find(i => i.key === key);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ key, product, size, color, quantity });
    }
    this.notify();
  },
  remove(key) {
    this.items = this.items.filter(i => i.key !== key);
    this.notify();
  },
  updateQty(key, qty) {
    const item = this.items.find(i => i.key === key);
    if (item) {
      if (qty <= 0) this.remove(key);
      else { item.quantity = qty; this.notify(); }
    }
  },
  total() { return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0); },
  count() { return this.items.reduce((sum, i) => sum + i.quantity, 0); },
};

export default function Cart({ isOpen, onClose }) {
  const isMobile = useIsMobile();
  const [items, setItems] = useState([...CartContext.items]);
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    CartContext.subscribe(setItems);
    return () => CartContext.unsubscribe(setItems);
  }, []);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  // Upsell logic — suggest completing the set
  const hasMenJacket = items.some(i => i.product.id === 'ba-jacket-men');
  const hasMenPants = items.some(i => i.product.id === 'ba-pants-men');
  const hasWomenJacket = items.some(i => i.product.id === 'ba-jacket-women');
  const hasWomenPants = items.some(i => i.product.id === 'ba-pants-women');

  let upsell = null;
  const COMBO_PRICE = 79.99;
  const SINGLE_PRICE = 44.99;
  const SAVINGS = ((SINGLE_PRICE * 2) - COMBO_PRICE).toFixed(2);

  if (hasMenJacket && !hasMenPants) {
    upsell = { text: "Add the matching pants and save", product: { id:'ba-pants-men', name:'Bug Away Pants — Men', price:SINGLE_PRICE, images:['/images/lifestyle-men-outdoor.png'], placeholderBg:'#C8E0EA', colors:['Sage Green'] }, savings: SAVINGS };
  } else if (hasMenPants && !hasMenJacket) {
    upsell = { text: "Add the matching jacket and save", product: { id:'ba-jacket-men', name:'Bug Away Jacket — Men', price:SINGLE_PRICE, images:['/images/product-men-jacket-front.png'], placeholderBg:'#A8CBB5', colors:['Sage Green'] }, savings: SAVINGS };
  } else if (hasWomenJacket && !hasWomenPants) {
    upsell = { text: "Add the matching pants and save", product: { id:'ba-pants-women', name:'Bug Away Pants — Women', price:SINGLE_PRICE, images:['/images/lifestyle-women-outdoor.png'], placeholderBg:'#B8D4CC', colors:['Sage Green'] }, savings: SAVINGS };
  } else if (hasWomenPants && !hasWomenJacket) {
    upsell = { text: "Add the matching jacket and save", product: { id:'ba-jacket-women', name:'Bug Away Jacket — Women', price:SINGLE_PRICE, images:['/images/lifestyle-women-outdoor.png'], placeholderBg:'#E8F4F8', colors:['Sage Green'] }, savings: SAVINGS };
  }
    if (items.length === 0) return;
    const firstItem = items[0];
    const handle = SHOPIFY_HANDLES[firstItem.product.id];
    if (handle) {
      window.location.href = `https://${DOMAIN}/products/${handle}`;
    } else {
      window.location.href = `https://${DOMAIN}`;
    }
  };

  const panelWidth = isMobile ? '100%' : '380px';

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:300, backdropFilter:'blur(2px)' }}
        />
      )}

      {/* Cart panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : `-${panelWidth}`,
        width: panelWidth,
        height: '100%',
        background: '#fff',
        zIndex: 301,
        transition: 'right 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
      }}>

        {/* Header */}
        <div style={{ padding:'18px 20px', borderBottom:`1px solid ${c.glL}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:14, fontWeight:700, color:c.dark, fontFamily:"'Archivo',sans-serif", letterSpacing:"-0.01em" }}>
              Your Cart
            </span>
            {count > 0 && (
              <span style={{ background:c.sageD, color:'#fff', borderRadius:20, padding:'1px 8px', fontSize:11, fontFamily:"'Poppins',sans-serif", fontWeight:600 }}>
                {count}
              </span>
            )}
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, color:c.gray, lineHeight:1 }}>✕</button>
        </div>

        {/* Free shipping progress */}
        <div style={{ padding:'14px 20px', background:c.off, borderBottom:`1px solid ${c.glL}`, flexShrink:0 }}>
          {remaining > 0 ? (
            <p style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.grayD, marginBottom:8 }}>
              Only <strong style={{ color:c.sageD }}>€ {remaining.toFixed(2).replace('.',',')}</strong> away from free US shipping!
            </p>
          ) : (
            <p style={{ fontSize:12, fontFamily:"'Poppins',sans-serif", color:c.sageD, marginBottom:8, fontWeight:600 }}>
              🎉 You've unlocked free US shipping!
            </p>
          )}
          <div style={{ height:4, background:c.glL, borderRadius:2, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${progress}%`, background:c.sageD, borderRadius:2, transition:'width 0.4s ease' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
            <span style={{ fontSize:10, fontFamily:"'Poppins',sans-serif", color:c.gray }}>€ 0</span>
            <span style={{ fontSize:10, fontFamily:"'Poppins',sans-serif", color:c.gray }}>Free shipping at € {FREE_SHIPPING_THRESHOLD}</span>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign:'center', padding:'48px 20px' }}>
              <div style={{ fontSize:40, marginBottom:16 }}>🛒</div>
              <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.gray, marginBottom:20 }}>Your cart is empty</p>
              <Link
                to="/shop"
                onClick={onClose}
                style={{ background:c.sageD, color:'#fff', padding:'11px 24px', borderRadius:4, fontSize:12, fontFamily:"'Poppins',sans-serif", fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.key} style={{ display:'flex', gap:12, marginBottom:16, paddingBottom:16, borderBottom:`1px solid ${c.glL}` }}>
                {/* Product image */}
                <div style={{ width:72, height:72, borderRadius:8, overflow:'hidden', background:item.product.placeholderBg+"55", flexShrink:0 }}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width:'100%', height:'100%', objectFit:'cover' }}
                    onError={e=>e.target.style.display='none'}
                  />
                </div>
                {/* Details */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:c.dark, marginBottom:3, lineHeight:1.3 }}>{item.product.name}</div>
                  <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.gray, marginBottom:8 }}>
                    {item.color} · Size {item.size}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    {/* Qty control */}
                    <div style={{ display:'flex', alignItems:'center', border:`1px solid ${c.glL}`, borderRadius:4, overflow:'hidden' }}>
                      <button
                        onClick={() => CartContext.updateQty(item.key, item.quantity - 1)}
                        style={{ width:28, height:28, background:'none', border:'none', cursor:'pointer', fontSize:14, color:c.dark }}
                      >−</button>
                      <span style={{ width:28, textAlign:'center', fontSize:12, fontFamily:"'Poppins',sans-serif", fontWeight:600, color:c.dark }}>{item.quantity}</span>
                      <button
                        onClick={() => CartContext.updateQty(item.key, item.quantity + 1)}
                        style={{ width:28, height:28, background:'none', border:'none', cursor:'pointer', fontSize:14, color:c.dark }}
                      >+</button>
                    </div>
                    <span style={{ fontSize:14, fontWeight:700, color:c.dark }}>€ {(item.product.price * item.quantity).toFixed(2).replace('.',',')}</span>
                  </div>
                </div>
                {/* Remove */}
                <button
                  onClick={() => CartContext.remove(item.key)}
                  style={{ background:'none', border:'none', cursor:'pointer', color:c.gray, fontSize:16, alignSelf:'flex-start', flexShrink:0 }}
                >🗑</button>
              </div>
            ))
          )}

          {/* Upsell banner */}
          {upsell && items.length > 0 && (
            <div style={{ background:`linear-gradient(135deg,${c.skyP} 0%,${c.sageL}44 100%)`, border:`1px solid ${c.mist}`, borderRadius:10, padding:'14px', marginTop:8 }}>
              <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", fontWeight:700, color:c.sageD, marginBottom:8 }}>
                🎯 {upsell.text} — save € {upsell.savings}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:52, height:52, borderRadius:6, overflow:'hidden', background:upsell.product.placeholderBg+'55', flexShrink:0 }}>
                  <img src={upsell.product.images[0]} alt={upsell.product.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>e.target.style.display='none'}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:c.dark, marginBottom:2 }}>{upsell.product.name}</div>
                  <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>
                    <span style={{ textDecoration:'line-through', color:c.gray, marginRight:4 }}>€ {upsell.product.price.toFixed(2).replace('.',',')}</span>
                    <span style={{ color:c.sageD, fontWeight:700 }}>Bundle & save!</span>
                  </div>
                </div>
                <button
                  onClick={() => CartContext.add(upsell.product, items[0]?.size || 'M', upsell.product.colors[0])}
                  style={{ background:c.sageD, color:'#fff', border:'none', borderRadius:4, padding:'7px 12px', fontSize:11, fontFamily:"'Poppins',sans-serif", fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}
                >
                  Add +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ borderTop:`1px solid ${c.glL}`, flexShrink:0 }}>

            {/* Discount & Notes toggles */}
            <div style={{ display:'flex', borderBottom:`1px solid ${c.glL}` }}>
              <button
                onClick={() => { setShowDiscount(!showDiscount); setShowNotes(false); }}
                style={{ flex:1, padding:'12px', background:'none', border:'none', borderRight:`1px solid ${c.glL}`, cursor:'pointer', fontSize:12, fontFamily:"'Poppins',sans-serif", color:showDiscount?c.sageD:c.grayD, fontWeight:showDiscount?600:400 }}
              >
                🏷 Discount
              </button>
              <button
                onClick={() => { setShowNotes(!showNotes); setShowDiscount(false); }}
                style={{ flex:1, padding:'12px', background:'none', border:'none', cursor:'pointer', fontSize:12, fontFamily:"'Poppins',sans-serif", color:showNotes?c.sageD:c.grayD, fontWeight:showNotes?600:400 }}
              >
                📝 Notes
              </button>
            </div>

            {/* Discount input */}
            {showDiscount && (
              <div style={{ padding:'12px 20px', borderBottom:`1px solid ${c.glL}`, display:'flex', gap:8 }}>
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  style={{ flex:1, padding:'8px 12px', border:`1px solid ${c.glL}`, borderRadius:4, fontSize:12, fontFamily:"'Poppins',sans-serif", outline:'none' }}
                />
                <button style={{ background:c.sageD, color:'#fff', border:'none', padding:'8px 16px', borderRadius:4, fontSize:12, fontFamily:"'Poppins',sans-serif", fontWeight:600, cursor:'pointer' }}>
                  Apply
                </button>
              </div>
            )}

            {/* Notes input */}
            {showNotes && (
              <div style={{ padding:'12px 20px', borderBottom:`1px solid ${c.glL}` }}>
                <textarea
                  placeholder="Add a note for your order..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  style={{ width:'100%', padding:'8px 12px', border:`1px solid ${c.glL}`, borderRadius:4, fontSize:12, fontFamily:"'Poppins',sans-serif", outline:'none', resize:'none' }}
                />
              </div>
            )}

            {/* Total & Checkout */}
            <div style={{ padding:'16px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, fontFamily:"'Poppins',sans-serif", color:c.grayD }}>Subtotal</span>
                <span style={{ fontSize:15, fontWeight:700, color:c.dark }}>€ {total.toFixed(2).replace('.',',')}</span>
              </div>
              <p style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.gray, marginBottom:14 }}>
                Taxes and shipping calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                style={{ width:'100%', background:c.sageD, color:'#fff', border:'none', padding:'14px', borderRadius:4, fontSize:13, fontFamily:"'Poppins',sans-serif", fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', marginBottom:8 }}
              >
                Checkout →
              </button>
              <button
                onClick={onClose}
                style={{ width:'100%', background:'none', border:`1px solid ${c.glL}`, color:c.grayD, padding:'11px', borderRadius:4, fontSize:12, fontFamily:"'Poppins',sans-serif", cursor:'pointer' }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
