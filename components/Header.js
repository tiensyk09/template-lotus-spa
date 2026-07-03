'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LotusLogo from '@/components/LotusLogo';
import { SocialIcon, buildSocialLinks } from '@/components/SocialLinks';

const GREEN = '#5d7a3f';
const GREEN_DARK = '#445c2c';
const GOLD = '#b3934f';
const TEXT = '#3f4534';
const serif = "'Playfair Display', serif";

export default function Header() {
  const pathname = usePathname();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  React.useEffect(() => {
    fetch('/api/settings').then((r) => r.ok ? r.json() : null).then((d) => { if (d?.settings) setSocialLinks(buildSocialLinks(d.settings)); }).catch(() => {});
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) { const data = await res.json(); if (data.user) setUser(data.user); }
      } catch (err) { /* ignore */ }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/login', { method: 'DELETE' });
      if (res.ok) { setUser(null); window.location.reload(); }
    } catch (err) { /* ignore */ }
  };

  const services = [
    { title: 'Massage Thư Giãn', link: '/products?category=massage-thu-gian' },
    { title: 'Chăm Sóc Da Mặt', link: '/products?category=cham-soc-da-mat' },
    { title: 'Chăm Sóc Body', link: '/products?category=cham-soc-body' },
    { title: 'Xông Hơi Thải Độc', link: '/products?category=xong-hoi-thai-doc' },
    { title: 'Chăm Sóc Tóc', link: '/products?category=cham-soc-toc' },
  ];

  const navItems = [
    { href: '/', label: 'TRANG CHỦ' },
    { href: '/about', label: 'GIỚI THIỆU' },
    { href: '/products', label: 'DỊCH VỤ', hasDropdown: true },
    { href: '/blog', label: 'ƯU ĐÃI' },
    { href: '/products', label: 'BẢNG GIÁ' },
    { href: '/blog', label: 'TIN TỨC' },
    { href: '/contact', label: 'LIÊN HỆ' },
  ];

  const activeIndex = navItems.findIndex((item) =>
    item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
  );

  return (
    <header style={{ width: '100%', fontFamily: 'Inter, sans-serif', backgroundColor: '#fdfcf8', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 18px rgba(68,92,44,0.08)', borderBottom: '1px solid #ece7d8' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '12px 20px' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', flexShrink: 0 }}>
          <LotusLogo size={46} color={GREEN} />
          <div style={{ lineHeight: 1 }}>
            <span style={{ display: 'block', fontFamily: serif, fontSize: 25, fontWeight: 700, color: GREEN_DARK, letterSpacing: '0.01em' }}>Lotus Spa</span>
            <span style={{ display: 'block', fontSize: 8.5, color: GOLD, letterSpacing: '0.42em', marginTop: 3, fontWeight: 700 }}>BEAUTY &amp; RELAX</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="ls-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {navItems.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={item.label + idx}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.hasDropdown && setIsServiceOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsServiceOpen(false)}
              >
                <Link
                  href={item.href}
                  style={{ position: 'relative', fontSize: 12.5, fontWeight: isActive ? 800 : 600, letterSpacing: '0.04em', color: isActive ? GREEN : TEXT, textDecoration: 'none', padding: '22px 0', display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? GREEN : TEXT; }}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                  {isActive && (
                    <span style={{ position: 'absolute', bottom: 14, left: 0, width: '100%', height: 2, borderRadius: 999, backgroundColor: GOLD }} />
                  )}
                </Link>

                {item.hasDropdown && isServiceOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 230, backgroundColor: '#fff', border: '1px solid #ece7d8', borderRadius: 12, boxShadow: '0 16px 36px rgba(68,92,44,0.16)', zIndex: 100, overflow: 'hidden', animation: 'fadeInDown 0.15s ease-out' }}>
                    {services.map((svc, i) => (
                      <Link
                        key={i}
                        href={svc.link}
                        onClick={() => setIsServiceOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', fontSize: 13, fontWeight: 600, color: TEXT, borderBottom: i < services.length - 1 ? '1px solid #f4f1e8' : 'none', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f4f1e6'; e.currentTarget.style.color = GREEN; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = TEXT; }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: 999, backgroundColor: GOLD, flexShrink: 0 }} />
                        <span>{svc.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: phone pill + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <a href="tel:0901234567" className="ls-phone-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, border: '1px solid #d8d2c0', borderRadius: 999, padding: '8px 16px 8px 8px', textDecoration: 'none', color: GREEN_DARK }}>
            <span style={{ width: 28, height: 28, borderRadius: 999, backgroundColor: '#eef1e5', color: GREEN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/></svg>
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: '0.02em' }}>0901 234 567</span>
          </a>
          <Link
            href="/contact"
            className="ls-cta-btn"
            style={{ backgroundColor: GREEN, color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '13px 22px', borderRadius: 8, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 16px rgba(93,122,63,0.32)', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GREEN_DARK; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = GREEN; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ĐẶT LỊCH NGAY
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ls-mobile-toggle"
            aria-label="Menu"
            style={{ display: 'none', padding: 8, border: '1px solid #e0dccd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 18, color: GREEN_DARK }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ backgroundColor: '#fff', borderTop: '1px solid #ece7d8', padding: 16, boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {navItems.map((item, idx) => (
              <Link
                key={item.label + idx}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: TEXT, borderBottom: '1px solid #f4f1e8', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div style={{ padding: '12px 0', borderBottom: '1px solid #f4f1e8', fontSize: 14 }}>
                <div style={{ fontWeight: 600, color: TEXT }}>Chào, {user.displayName || user.username}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} style={{ color: GREEN, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lịch hẹn của bạn</Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', padding: 0, color: '#c0392b', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Đăng xuất</button>
                </div>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: TEXT, borderBottom: '1px solid #f4f1e8', textDecoration: 'none' }}>
                Đăng nhập
              </Link>
            )}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ display: 'block', textAlign: 'center', marginTop: 16, backgroundColor: GREEN, color: '#fff', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', padding: '12px 20px', borderRadius: 9, textDecoration: 'none' }}
            >
              Đặt lịch ngay
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 1100px) {
          .ls-desktop-nav { display: none !important; }
          .ls-mobile-toggle { display: block !important; }
          .ls-phone-pill { display: none !important; }
          .ls-cta-btn { padding: 10px 14px !important; font-size: 11px !important; }
        }
      `}</style>
    </header>
  );
}
