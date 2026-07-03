'use client';
import React from 'react';
import Link from 'next/link';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const GOLD = '#b3934f';
const serif = "'Playfair Display', serif";

const Ic = {
  exp: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 21l5-2.5L17 21l-1.5-8.5"/></svg>),
  users: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 5.2A3.2 3.2 0 0 1 16 15M20.5 20c0-2.4-1.5-4.2-3.5-4.8"/></svg>),
  smile: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14c1.6 1.8 5.4 1.8 7 0M9 9.5h.01M15 9.5h.01"/></svg>),
  grid: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.4 3-1.4 6 0 9 1.4-3 1.4-6 0-9ZM12 12c-2-1-3.5-3-4-5.5 2 .7 3.5 2.5 4 5.5ZM12 12c2-1 3.5-3 4-5.5-2 .7-3.5 2.5-4 5.5ZM6 16c3.5 1.6 8.5 1.6 12 0"/></svg>),
};

export default function AboutSection() {
  const stats = [
    { icon: Ic.exp(24), value: '10+', label: 'NĂM KINH NGHIỆM' },
    { icon: Ic.users(24), value: '20000+', label: 'KHÁCH HÀNG' },
    { icon: Ic.smile(24), value: '100%', label: 'HÀI LÒNG' },
    { icon: Ic.grid(24), value: '50+', label: 'DỊCH VỤ ĐA DẠNG' },
  ];

  return (
    <section style={{ backgroundColor: '#f4f2e8', position: 'relative', overflow: 'hidden', padding: '64px 0' }}>
      {/* Watermark lá mờ trái */}
      <div style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%)', opacity: 0.06, color: GREEN, pointerEvents: 'none' }}>
        <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M11 20C6 20 4 15 4 11 4 6 8 4 20 4c0 12-4 16-9 16Z"/></svg>
      </div>

      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ls-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr 1.25fr', gap: 44, alignItems: 'center' }}>

          {/* Left: text */}
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 12 }}>VỀ CHÚNG TÔI</div>
            <h2 style={{ fontFamily: serif, fontSize: 33, fontWeight: 700, color: GREEN_DARK, lineHeight: 1.2, marginBottom: 18 }}>
              Lotus Spa<br /><span style={{ color: GREEN }}>Nơi Sắc Đẹp Tỏa Sáng</span>
            </h2>
            <p style={{ fontSize: 14, color: '#6d6f5c', lineHeight: 1.85, fontWeight: 500, marginBottom: 26 }}>
              Với sứ mệnh mang đến vẻ đẹp và sự tự tin cho phụ nữ, Lotus Spa không ngừng nâng cao chất lượng dịch vụ, đầu tư công nghệ hiện đại và đội ngũ chuyên viên chuyên nghiệp.
            </p>
            <Link
              href="/about"
              style={{ display: 'inline-block', backgroundColor: GREEN, color: '#fff', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '14px 30px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 8px 20px rgba(93,122,63,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GREEN_DARK; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = GREEN; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              TÌM HIỂU THÊM
            </Link>
          </div>

          {/* Middle: stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: '#fff', color: GREEN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(68,92,44,0.1)' }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 800, color: GREEN_DARK, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#8a8b78', fontWeight: 700, marginTop: 4, letterSpacing: '0.06em' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: image */}
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80"
              alt="Không gian Lotus Spa"
              style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 44px rgba(68,92,44,0.2)' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'; }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .ls-about-grid { grid-template-columns: 1fr 1fr !important; }
          .ls-about-grid > div:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .ls-about-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
        }
      `}</style>
    </section>
  );
}
