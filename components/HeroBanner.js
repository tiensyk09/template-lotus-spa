'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const GOLD = '#b3934f';
const TEXT = '#4a4d3c';
const serif = "'Playfair Display', serif";
const cursive = "'Dancing Script', cursive";

const IconLeaf = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20C6 20 4 15 4 11 4 6 8 4 20 4c0 12-4 16-9 16Z"/><path d="M4 20c4-8 8-11 14-13"/></svg>
);
const IconTech = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>
);
const IconLotusSm = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4c-1.5 3.5-1.5 7 0 10 1.5-3 1.5-6.5 0-10Z"/><path d="M12 14c-2.5-1.5-4-4-4.5-7 2.5 1 4 3 4.5 7Z"/><path d="M12 14c2.5-1.5 4-4 4.5-7-2.5 1-4 3-4.5 7Z"/><path d="M6 18c3 1.5 9 1.5 12 0"/></svg>
);

export default function HeroBanner() {
  const slides = [
    {
      cursive: 'The Beauty Of Nature',
      title: 'SPA & BEAUTY',
      sub: <>CHĂM SÓC SẮC ĐẸP<br />TOÀN DIỆN</>,
      desc: 'Lotus Spa mang đến cho bạn trải nghiệm thư giãn tuyệt vời với các liệu trình chăm sóc sắc đẹp chuyên sâu, an toàn và hiệu quả.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    },
    {
      cursive: 'Relax Your Body',
      title: 'MASSAGE',
      sub: <>THƯ GIÃN CƠ THỂ<br />TÁI TẠO NĂNG LƯỢNG</>,
      desc: 'Liệu pháp massage trị liệu giúp giải tỏa căng thẳng, lưu thông khí huyết, mang lại cảm giác nhẹ nhàng, thư thái tuyệt đối.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    },
    {
      cursive: 'Glowing Skin',
      title: 'CHĂM SÓC DA',
      sub: <>LÀN DA RẠNG RỠ<br />TƯƠI TRẺ TỰ NHIÊN</>,
      desc: 'Công nghệ chăm sóc da chuyên sâu cùng dược mỹ phẩm thiên nhiên, trả lại làn da sáng mịn, căng tràn sức sống.',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t); }, [next]);
  const slide = slides[current];

  const features = [
    { icon: <IconLeaf size={22} />, top: '100%', bottom: 'SẢN PHẨM CHÍNH HÃNG' },
    { icon: <IconTech size={22} />, top: 'KỸ THUẬT VIÊN', bottom: 'CHUYÊN NGHIỆP' },
    { icon: <IconLotusSm size={22} />, top: 'KHÔNG GIAN', bottom: 'THƯ GIÃN, YÊN TĨNH' },
  ];

  return (
    <section style={{ position: 'relative', background: 'linear-gradient(105deg, #f3f1e6 0%, #eef1e2 45%, #e7ecd7 100%)', overflow: 'hidden', minHeight: 560 }}>
      {/* Ảnh nền phải */}
      <div key={`img-${current}`} className="ls-hero-photo" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '54%', animation: 'lsFade 0.8s ease-out' }}>
        <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #eef1e2 0%, rgba(238,241,226,0.5) 24%, rgba(238,241,226,0) 55%)' }} />
      </div>

      <div className="ls-hero-inner" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '70px 64px 84px', minHeight: 560, display: 'flex', alignItems: 'center', zIndex: 4 }}>
        <div key={current} style={{ maxWidth: 500 }}>
          <p className="ls-hero-cursive" style={{ fontFamily: cursive, fontSize: 34, color: GOLD, fontWeight: 600, marginBottom: 6, animation: 'lsUp 0.5s ease-out' }}>
            {slide.cursive}
          </p>
          <h1 className="ls-hero-title" style={{ fontFamily: serif, fontSize: 52, fontWeight: 800, color: GREEN_DARK, lineHeight: 1.05, marginBottom: 4, letterSpacing: '0.01em', animation: 'lsUp 0.55s ease-out' }}>
            {slide.title}
          </h1>
          <h2 className="ls-hero-sub" style={{ fontFamily: serif, fontSize: 34, fontWeight: 600, color: GREEN, lineHeight: 1.18, marginBottom: 20, animation: 'lsUp 0.6s ease-out' }}>
            {slide.sub}
          </h2>
          <p style={{ fontSize: 15, color: TEXT, fontWeight: 500, lineHeight: 1.75, marginBottom: 30, maxWidth: 430, animation: 'lsUp 0.65s ease-out' }}>
            {slide.desc}
          </p>

          <Link
            href="/products"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: GREEN, color: '#fff', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '15px 30px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 10px 24px rgba(93,122,63,0.35)', transition: 'all 0.2s', animation: 'lsUp 0.7s ease-out' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = GREEN_DARK; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = GREEN; }}
          >
            KHÁM PHÁ NGAY
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 H20 M14 6 L20 12 L14 18" /></svg>
          </Link>

          {/* Feature badges */}
          <div className="ls-hero-feats" style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginTop: 40, animation: 'lsUp 0.75s ease-out' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, paddingRight: 22, borderRight: i < features.length - 1 ? '1px solid #d6d3c1' : 'none' }}>
                <span style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: '#e6ebd6', color: GREEN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.icon}</span>
                <div style={{ lineHeight: 1.3 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: GREEN_DARK, letterSpacing: '0.02em' }}>{f.top}</div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: '#8a8b78', letterSpacing: '0.03em' }}>{f.bottom}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical dots (right) */}
      <div className="ls-hero-dots" style={{ position: 'absolute', right: 26, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 9, zIndex: 8 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{ width: 9, height: i === current ? 22 : 9, borderRadius: 999, border: 'none', backgroundColor: i === current ? GREEN : 'rgba(93,122,63,0.32)', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }}
          />
        ))}
      </div>

      <style>{`
        @keyframes lsUp { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes lsFade { from { opacity: 0;} to { opacity: 1;} }
        @media (max-width: 900px) {
          .ls-hero-photo { width: 100% !important; opacity: 0.22; }
          .ls-hero-inner { padding: 44px 24px 60px !important; }
          .ls-hero-title { font-size: 38px !important; }
          .ls-hero-sub { font-size: 26px !important; }
          .ls-hero-feats { gap: 16px !important; }
          .ls-hero-dots { display: none !important; }
        }
      `}</style>
    </section>
  );
}
