'use client';
import React, { useState } from 'react';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const GOLD = '#c9a24b';
const serif = "'Playfair Display', serif";

const Star = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.9 21l1.2-6.9-5-4.9 6.9-1L12 2z"/></svg>
);

export default function Testimonials() {
  const testimonials = [
    { name: 'Thanh Hương', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', quote: 'Dịch vụ tuyệt vời, không gian thư giãn và nhân viên rất chuyên nghiệp. Tôi rất hài lòng!' },
    { name: 'Mai Lan', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', quote: 'Liệu trình chăm sóc da hiệu quả, da mình cải thiện rõ rệt sau vài buổi.' },
    { name: 'Quỳnh Anh', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80', quote: 'Massage đã thư giãn, giúp mình giảm stress sau những ngày làm việc mệt mỏi.' },
  ];
  const [active, setActive] = useState(0);

  return (
    <section style={{ backgroundColor: '#fdfcf8', padding: '60px 0' }}>
      <div className="container mx-auto px-4">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 8 }}>CẢM NHẬN KHÁCH HÀNG</div>
          <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 700, color: GREEN_DARK }}>Khách Hàng Nói Gì Về Chúng Tôi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} style={{ backgroundColor: '#fff', borderRadius: 14, padding: '24px 22px', border: '1px solid #eee7d6', boxShadow: '0 6px 20px rgba(68,92,44,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
                <img src={t.avatar} alt={t.name} style={{ width: 50, height: 50, borderRadius: 999, objectFit: 'cover', border: `2px solid #e6ebd6` }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'; }} />
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: GREEN_DARK, fontFamily: serif }}>{t.name}</div>
                  <div style={{ display: 'flex', gap: 2, color: GOLD, marginTop: 4 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} />)}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6d6f5c', lineHeight: 1.75, fontWeight: 500, fontStyle: 'italic' }}>“{t.quote}”</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 30 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Đánh giá ${i + 1}`}
              style={{ width: i === active ? 22 : 8, height: 8, borderRadius: 999, border: 'none', backgroundColor: i === active ? GREEN : 'rgba(93,122,63,0.3)', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
