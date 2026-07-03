'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const GOLD = '#b3934f';
const serif = "'Playfair Display', serif";

const Ic = {
  massage: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="6" r="2.4"/><path d="M4.5 20c0-3.5 2-5.5 4.5-5.5S13.5 16 14 19"/><path d="M13 11c3-1.6 5.5-1.2 7 .5-1.6 2-4 2.4-6 1"/></svg>),
  face: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c4.5 0 7 3 7 8 0 5-3 9-7 9s-7-4-7-9c0-5 2.5-8 7-8Z"/><path d="M9 11h.01M15 11h.01M9.5 15c1.5 1 3.5 1 5 0"/></svg>),
  body: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.2"/><path d="M12 8v7M8 11l4-1 4 1M9 21l3-6 3 6"/></svg>),
  steam: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21h10a4 4 0 0 0 4-4v-3H3v3a4 4 0 0 0 4 4Z"/><path d="M9 8c0-1.5 1-2 1-3.5M13 8c0-1.5 1-2 1-3.5"/></svg>),
  hair: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-4 0-7 3.5-7 8v9M12 3c4 0 7 3.5 7 8v9M9 20c0-4-1-7-4-9M15 20c0-4 1-7 4-9"/></svg>),
};

export default function ServicesSection() {
  const fallback = [
    { id: 1, name: 'Massage Thư Giãn', description: 'Giúp thư giãn cơ thể, giảm căng thẳng, mang lại cảm giác thoải mái.', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80', slug: 'massage-thu-gian', icon: 'massage' },
    { id: 2, name: 'Chăm Sóc Da Mặt', description: 'Làm sạch sâu, dưỡng ẩm và tái tạo da, mang lại làn da rạng rỡ.', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80', slug: 'cham-soc-da-mat', icon: 'face' },
    { id: 3, name: 'Chăm Sóc Body', description: 'Tẩy tế bào chết, dưỡng da toàn thân trắng sáng, mịn màng.', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80', slug: 'cham-soc-body', icon: 'body' },
    { id: 4, name: 'Xông Hơi Thải Độc', description: 'Thải độc tố, làm sạch da, cải thiện sức khỏe và tinh thần.', image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=600&q=80', slug: 'xong-hoi-thai-doc', icon: 'steam' },
    { id: 5, name: 'Chăm Sóc Tóc', description: 'Nuôi dưỡng tóc chắc khỏe, suôn mượt, giảm gãy rụng.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', slug: 'cham-soc-toc', icon: 'hair' },
  ];

  const [services, setServices] = useState(fallback);

  useEffect(() => {
    fetch('/api/products?limit=5')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setServices(data.products.map((p, i) => ({
            id: p.id, name: p.name, description: p.short_description, image: p.thumbnail, slug: p.slug,
            icon: fallback[i % fallback.length].icon,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="featured-services" className="scroll-mt-20" style={{ backgroundColor: '#fdfcf8', padding: '64px 0' }}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 8 }}>DỊCH VỤ NỔI BẬT</div>
          <h2 style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, color: GREEN_DARK }}>Chăm Sóc Sắc Đẹp Toàn Diện</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ width: 30, height: 1, backgroundColor: GOLD, opacity: 0.6 }} />
            <span style={{ color: GOLD, fontSize: 14 }}>❧</span>
            <span style={{ width: 30, height: 1, backgroundColor: GOLD, opacity: 0.6 }} />
          </div>
        </div>

        {/* Grid */}
        <div className="ls-svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 22 }}>
          {services.map((svc) => (
            <div key={svc.id} className="ls-svc-card" style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #eee7d6', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s', boxShadow: '0 4px 14px rgba(68,92,44,0.05)' }}>
              <Link href={`/products/${svc.slug}`} className="block relative overflow-hidden" style={{ height: 150, position: 'relative', display: 'block' }}>
                <img
                  src={svc.image || 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80'}
                  alt={svc.name}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.5s' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80'; }}
                />
                {/* Icon badge */}
                <span style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 44, height: 44, borderRadius: 999, backgroundColor: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(93,122,63,0.4)', border: '3px solid #fff' }}>
                  {Ic[svc.icon] ? Ic[svc.icon](20) : Ic.massage(20)}
                </span>
              </Link>

              <div style={{ padding: '30px 16px 20px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Link href={`/products/${svc.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontFamily: serif, fontSize: 17, fontWeight: 700, color: GREEN_DARK, marginBottom: 8 }}>{svc.name}</h3>
                </Link>
                <p style={{ fontSize: 12, color: '#8a8b78', fontWeight: 500, lineHeight: 1.65, marginBottom: 14, flex: 1 }}>{svc.description}</p>
                <Link href={`/products/${svc.slug}`} style={{ color: GREEN, fontSize: 11, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  XEM THÊM
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 H20 M14 6 L20 12 L14 18" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ls-svc-card:hover { box-shadow: 0 18px 38px rgba(68,92,44,0.14); transform: translateY(-5px); border-color: #dcd6bf; }
        .ls-svc-card:hover img { transform: scale(1.06); }
        @media (max-width: 1024px) { .ls-svc-grid { grid-template-columns: repeat(3, minmax(0,1fr)) !important; } }
        @media (max-width: 640px) { .ls-svc-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
      `}</style>
    </section>
  );
}
