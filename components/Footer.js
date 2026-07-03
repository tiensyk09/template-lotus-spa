'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import LotusLogo from '@/components/LotusLogo';
import { SocialIcon, buildSocialLinks } from '@/components/SocialLinks';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const GOLD = '#b3934f';
const TEXT = '#4a4d3c';
const MUTED = '#8a8b78';
const serif = "'Playfair Display', serif";

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('');

  React.useEffect(() => {
    fetch('/api/settings').then((r) => r.ok ? r.json() : null).then((d) => { if (d?.settings) setSocialLinks(buildSocialLinks(d.settings)); }).catch(() => {});
  }, []);

  const serviceLinks = [
    { label: 'Massage Thư Giãn', href: '/products?category=massage-thu-gian' },
    { label: 'Chăm Sóc Da Mặt', href: '/products?category=cham-soc-da-mat' },
    { label: 'Chăm Sóc Body', href: '/products?category=cham-soc-body' },
    { label: 'Xông Hơi Thải Độc', href: '/products?category=xong-hoi-thai-doc' },
    { label: 'Chăm Sóc Tóc', href: '/products?category=cham-soc-toc' },
  ];
  const infoLinks = [
    { label: 'Giới Thiệu', href: '/about' },
    { label: 'Bảng Giá', href: '/products' },
    { label: 'Ưu Đãi', href: '/blog' },
    { label: 'Tin Tức', href: '/blog' },
    { label: 'Liên Hệ', href: '/contact' },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubStatus('sending');
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Đăng ký nhận ưu đãi', email, message: 'Đăng ký nhận ưu đãi mới nhất từ Lotus Spa' }),
      });
      setSubStatus('done'); setEmail('');
    } catch { setSubStatus('done'); setEmail(''); }
  };

  const linkStyle = { fontSize: 13, color: MUTED, textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' };
  const colTitle = { fontSize: 13, fontWeight: 800, color: GREEN_DARK, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 18 };
  const hoverIn = (e) => { e.currentTarget.style.color = GREEN; };
  const hoverOut = (e) => { e.currentTarget.style.color = MUTED; };

  return (
    <>
      <footer style={{ backgroundColor: '#f4f2e8', color: TEXT, fontFamily: 'Inter, sans-serif', borderTop: '1px solid #e6e1d0', paddingTop: 52, paddingBottom: 20 }}>
        <div className="container mx-auto px-4">
          <div className="ls-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.15fr 1.35fr', gap: 34, marginBottom: 38 }}>

            {/* Brand */}
            <div>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
                <LotusLogo size={42} color={GREEN} />
                <div style={{ lineHeight: 1 }}>
                  <span style={{ display: 'block', fontFamily: serif, fontSize: 22, fontWeight: 700, color: GREEN_DARK }}>Lotus Spa</span>
                  <span style={{ display: 'block', fontSize: 8, color: GOLD, letterSpacing: '0.4em', marginTop: 3, fontWeight: 700 }}>BEAUTY &amp; RELAX</span>
                </div>
              </Link>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: MUTED, fontWeight: 500, marginBottom: 18, maxWidth: 260 }}>
                Lotus Spa mang đến cho bạn trải nghiệm chăm sóc sắc đẹp và thư giãn tuyệt vời nhất với công nghệ hiện đại và sản phẩm cao cấp.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {socialLinks.map((s) => (
                  <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: 34, height: 34, borderRadius: 999, backgroundColor: '#fff', border: '1px solid #e2ddcc', color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GREEN; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = GREEN; }}>
                    <SocialIcon platform={s.key} size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Dịch vụ */}
            <div>
              <h3 style={colTitle}>DỊCH VỤ</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {serviceLinks.map((l, i) => (<li key={i}><Link href={l.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{l.label}</Link></li>))}
              </ul>
            </div>

            {/* Thông tin */}
            <div>
              <h3 style={colTitle}>THÔNG TIN</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {infoLinks.map((l, i) => (<li key={i}><Link href={l.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{l.label}</Link></li>))}
              </ul>
            </div>

            {/* Liên hệ */}
            <div>
              <h3 style={colTitle}>LIÊN HỆ</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 13, fontWeight: 500, color: MUTED }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 1 }}><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                  <span>123 Đường ABC, Quận 1,<br />TP. Hồ Chí Minh</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={GREEN} style={{ flexShrink: 0 }}><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/></svg>
                  <span style={{ color: GREEN_DARK, fontWeight: 800 }}>0901 234 567</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" style={{ flexShrink: 0 }}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                  <span>lotusspa@gmail.com</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  <span>08:00 - 20:00 (T2 - CN)</span>
                </li>
              </ul>
            </div>

            {/* Đăng ký */}
            <div>
              <h3 style={colTitle}>ĐĂNG KÝ NHẬN ƯU ĐÃI</h3>
              <p style={{ fontSize: 13, color: MUTED, fontWeight: 500, lineHeight: 1.7, marginBottom: 14 }}>
                Nhận thông tin và ưu đãi mới nhất từ Lotus Spa
              </p>
              <form onSubmit={handleSubscribe}>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="Nhập email của bạn"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #ddd7c6', backgroundColor: '#fff', fontSize: 13, color: TEXT, marginBottom: 10, outline: 'none' }}
                />
                <button type="submit" disabled={subStatus === 'sending'}
                  style={{ width: '100%', backgroundColor: GREEN, color: '#fff', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GREEN_DARK; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = GREEN; }}>
                  {subStatus === 'done' ? '✓ ĐÃ ĐĂNG KÝ' : 'ĐĂNG KÝ'}
                </button>
              </form>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2ddcc', paddingTop: 18, textAlign: 'center', fontSize: 12.5, color: MUTED, fontWeight: 500 }}>
            © 2024 <strong style={{ color: GREEN_DARK }}>Lotus Spa</strong>. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating hotline */}
      <a href="tel:0901234567" className="ls-hotline"
        style={{ position: 'fixed', bottom: 22, right: 22, zIndex: 90, display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 999, padding: '7px 18px 7px 7px', boxShadow: '0 10px 30px rgba(68,92,44,0.32)', textDecoration: 'none', border: '1px solid #e6e1d0' }}>
        <span style={{ width: 42, height: 42, borderRadius: 999, background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'lsRing 1.6s ease-in-out infinite' }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/></svg>
        </span>
        <span>
          <span style={{ display: 'block', fontSize: 14.5, fontWeight: 900, color: GREEN_DARK, lineHeight: 1.1 }}>0901 234 567</span>
          <span style={{ display: 'block', fontSize: 10, fontWeight: 600, color: MUTED, marginTop: 1 }}>Tư vấn miễn phí</span>
        </span>
      </a>

      <style>{`
        @keyframes lsRing { 0%,100%{transform:rotate(0);} 10%{transform:rotate(-14deg);} 20%{transform:rotate(12deg);} 30%{transform:rotate(-10deg);} 40%{transform:rotate(8deg);} 50%{transform:rotate(0);} }
        @media (max-width: 1024px) { .ls-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .ls-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
