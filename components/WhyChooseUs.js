'use client';
import React from 'react';
import Link from 'next/link';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const GOLD = '#b3934f';
const serif = "'Playfair Display', serif";

export default function WhyChooseUs() {
  const promos = [
    { discount: 'Giảm 30%', service: 'Dịch Vụ Massage', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80' },
    { discount: 'Giảm 20%', service: 'Dịch Vụ Chăm Sóc Da', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80' },
    { discount: 'Giảm 25%', service: 'Dịch Vụ Chăm Sóc Body', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80' },
  ];

  const Arrow = ({ dir }) => (
    <div style={{ width: 38, height: 38, borderRadius: 999, backgroundColor: '#fff', border: '1px solid #e2ddcc', color: GREEN, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(68,92,44,0.1)', flexShrink: 0 }}>
      {dir === 'left' ? '‹' : '›'}
    </div>
  );

  return (
    <section style={{ backgroundColor: '#f4f2e8', padding: '64px 0' }}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 8 }}>ƯU ĐÃI HẤP DẪN</div>
          <h2 style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, color: GREEN_DARK }}>Khuyến Mãi Trong Tháng</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="ls-promo-arrow"><Arrow dir="left" /></div>

          <div className="ls-promo-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 22 }}>
            {promos.map((p, i) => (
              <div key={i} style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', border: '1px solid #eee7d6', boxShadow: '0 4px 14px rgba(68,92,44,0.06)' }}>
                <div style={{ width: '42%', flexShrink: 0 }}>
                  <img src={p.image} alt={p.service} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 150 }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80'; }} />
                </div>
                <div style={{ flex: 1, padding: '20px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: serif, fontSize: 25, fontWeight: 800, color: GREEN }}>{p.discount}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: GREEN_DARK, marginTop: 4, marginBottom: 16 }}>{p.service}</div>
                  <Link
                    href="/contact"
                    style={{ alignSelf: 'flex-start', backgroundColor: GREEN, color: '#fff', fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '9px 16px', borderRadius: 6, textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GREEN_DARK; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = GREEN; }}
                  >
                    ĐẶT LỊCH NGAY
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="ls-promo-arrow"><Arrow dir="right" /></div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .ls-promo-grid { grid-template-columns: 1fr 1fr !important; } .ls-promo-arrow { display: none !important; } }
        @media (max-width: 640px) { .ls-promo-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
