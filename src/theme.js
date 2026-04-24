import { useState, useEffect } from 'react';

export const c = {
  sage:"#7BAF8E", sageL:"#A8CBB5", sageD:"#4E8065",
  mist:"#B8D4CC", sky:"#8BB8C8", skyL:"#C8E0EA", skyP:"#E8F4F8",
  white:"#FFFFFF", off:"#F7F9F8", glL:"#EAEDEB",
  gray:"#9EAAA5", grayD:"#5A6660", dark:"#2C3530",
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return isMobile;
};

export const BTN = {
  background:c.sageD, color:"#fff", border:"none", borderRadius:4,
  padding:"13px 30px", fontSize:12, fontFamily:"'Poppins',sans-serif",
  letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", fontWeight:600,
  display:"inline-block",
};

export const BTNO = {
  background:"transparent", color:c.sageD, border:`2px solid ${c.sageD}`,
  borderRadius:4, padding:"11px 26px", fontSize:12, fontFamily:"'Poppins',sans-serif",
  letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", fontWeight:600,
  display:"inline-block",
};

export const H2 = {
  fontSize:30, fontWeight:800, color:c.dark, marginBottom:8, letterSpacing:"-0.02em",
  fontFamily:"'Archivo',sans-serif",
};

export const LBL = {
  fontSize:11, fontFamily:"'Poppins',sans-serif", color:c.sage, letterSpacing:"0.14em",
  textTransform:"uppercase", marginBottom:10, fontWeight:700, display:"block",
};
