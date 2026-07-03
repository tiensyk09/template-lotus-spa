'use client';
import React from 'react';
import Link from 'next/link';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const serif = "'Playfair Display', serif";

export default function NewsSection() {
  return (
    <section style={{ position: 'relative', background: `linear-gradient(100deg, ${GREEN_DARK} 0%, ${GREEN} 60%, #6a8a48 100%)`, overflow: 'hidden' }}>
      {/* Ảnh spa trang trí bên phải */}
      <div className="ls-cta-photo" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '42%' }}>
        <img
          src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=80"
          alt="Không gian thư giãn Lotus Spa"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${GREEN_DARK} 0%, rgba(68,92,44,0.55) 40%, rgba(68,92,44,0) 100%)` }} />
      </div>

      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ls-cta-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '48px 8px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Đặt Lịch Ngay Hôm Nay</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Để nhận được ưu đãi đặc biệt!</p>
          </div>
          <Link
            href="/contact"
            style={{ backgroundColor: '#fff', color: GREEN_DARK, fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '16px 34px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 10px 24px rgba(0,0,0,0.2)', flexShrink: 0, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ĐẶT LỊCH NGAY
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ls-cta-photo { opacity: 0.25; width: 100% !important; }
          .ls-cta-inner { justify-content: center; text-align: center; }
        }
      `}</style>
    </section>
  );
}
