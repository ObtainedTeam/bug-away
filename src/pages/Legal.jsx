import { useParams, Link } from 'react-router-dom';
import { c, useIsMobile } from '../theme';

const pages = {
  privacy: {
    title: "Privacy Policy",
    updated: "April 2025",
    sections: [
      { heading:"Who we are", content:"Bug Away is operated by Obtained B.V., based in Lelystad, the Netherlands. We sell tick-protection clothing online. For questions about this policy, contact us at info@bugaway.com." },
      { heading:"What data we collect", content:"When you place an order, we collect your name, email address, shipping address and payment information. Payment data is processed securely by Shopify Payments and is never stored on our servers." },
      { heading:"How we use your data", content:"We use your data to process and ship your order, send order confirmations and shipping updates, and improve our website. We do not sell your data to third parties." },
      { heading:"Cookies", content:"We use essential cookies to keep the website functioning correctly. We do not use tracking cookies or advertising cookies without your consent." },
      { heading:"Your rights (GDPR)", content:"If you are based in the EU, you have the right to access, correct or delete your personal data at any time. Email info@bugaway.com and we will respond within 30 days." },
      { heading:"Contact", content:"For any privacy-related questions, email us at info@bugaway.com or write to: Obtained B.V., Lelystad, Netherlands." }
    ]
  },
  returns: {
    title: "Return Policy",
    updated: "April 2025",
    sections: [
      { heading:"30-day returns", content:"We offer a 30-day return policy on all unworn, unwashed items in their original condition. If you are not satisfied with your Bug Away purchase for any reason, contact us within 30 days of receiving your order." },
      { heading:"How to return", content:"Email us at info@bugaway.com with your order number and reason for return. We will provide return instructions within 24 hours. Please do not send items back without contacting us first." },
      { heading:"Refund process", content:"Once we receive and inspect your return, we will process your refund within 5 business days to your original payment method. Shipping costs are non-refundable unless the item was defective." },
      { heading:"Exchanges", content:"If you need a different size or color, contact us at info@bugaway.com and we will arrange an exchange free of charge." },
      { heading:"Defective items", content:"If you receive a defective or incorrect item, contact us immediately with a photo. We will send a replacement or issue a full refund including shipping costs." },
      { heading:"Return shipping", content:"Customers are responsible for return shipping costs unless the item is defective or incorrect. We recommend using a tracked shipping service." }
    ]
  },
  terms: {
    title: "Terms & Conditions",
    updated: "April 2025",
    sections: [
      { heading:"Agreement", content:"By using our website and placing an order, you agree to these Terms & Conditions. These terms are governed by Dutch law." },
      { heading:"Products", content:"Bug Away clothing is designed as a physical barrier against ticks and insects. While highly effective, we cannot guarantee 100% protection. Always perform a body check after spending time outdoors." },
      { heading:"Pricing", content:"All prices are in Euros (€) and include VAT where applicable. The price at the time of your order is the price you pay." },
      { heading:"Shipping", content:"We ship to the Netherlands, EU countries and North America. Delivery times are estimates and may vary. We are not responsible for delays caused by customs or postal services." },
      { heading:"Intellectual property", content:"All content on this website including images, text and design is owned by Bug Away / Obtained B.V. and may not be reproduced without permission." },
      { heading:"Contact", content:"For questions about these terms, email us at info@bugaway.com." }
    ]
  }
};

const legalLinks = [
  { label:"Privacy Policy", to:"/privacy" },
  { label:"Return Policy", to:"/returns" },
  { label:"Terms & Conditions", to:"/terms" },
];

export default function Legal() {
  const { page } = useParams();
  const isMobile = useIsMobile();
  const content = pages[page] || pages.privacy;
  const pad = isMobile ? "48px 20px" : "64px 60px";

  return (
    <div style={{ fontFamily:"'Archivo',sans-serif", color:c.dark }}>

      {/* Header */}
      <section style={{ background:`linear-gradient(135deg,${c.skyP} 0%,${c.mist} 100%)`, padding:isMobile?"40px 20px":"56px 60px" }}>
        <div style={{ fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.sage, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:10, fontWeight:700 }}>Legal</div>
        <h1 style={{ fontSize:isMobile?28:42, fontWeight:800, color:c.dark, marginBottom:8, letterSpacing:"-0.02em" }}>{content.title}</h1>
        <p style={{ fontSize:13, color:c.gray, fontFamily:"'Poppins',sans-serif" }}>Last updated: {content.updated}</p>
      </section>

      {/* Content */}
      <section style={{ padding:pad }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>

          {/* Navigation */}
          <div style={{ display:"flex", gap:10, marginBottom:40, flexWrap:"wrap" }}>
            {legalLinks.map((l,i)=>(
              <Link key={i} to={l.to} style={{
                padding:"7px 16px", borderRadius:20, textDecoration:"none",
                border:`1.5px solid ${l.to===`/${page}`?c.sageD:c.glL}`,
                background:l.to===`/${page}`?c.sageD:"#fff",
                color:l.to===`/${page}`?"#fff":c.grayD,
                fontSize:12, fontFamily:"'Poppins',sans-serif", fontWeight:600,
              }}>{l.label}</Link>
            ))}
          </div>

          {/* Sections */}
          {content.sections.map((s,i)=>(
            <div key={i} style={{ marginBottom:32, paddingBottom:32, borderBottom:i<content.sections.length-1?`1px solid ${c.glL}`:"none" }}>
              <h2 style={{ fontSize:18, fontWeight:700, color:c.dark, marginBottom:10 }}>{s.heading}</h2>
              <p style={{ fontSize:14, fontFamily:"'Poppins',sans-serif", color:c.grayD, lineHeight:1.85, fontWeight:300 }}>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
