import React from 'react';

// Logo hoa sen line-art thanh lịch cho Lotus Spa
export default function LotusLogo({ size = 42, color = '#5d7a3f' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Cánh giữa */}
        <path d="M32 12 C28 22 27.5 32 32 44 C36.5 32 36 22 32 12 Z" />
        {/* Cánh trong trái/phải */}
        <path d="M32 44 C25 39 20 31 19 21 C26 25 31 33 32 44 Z" />
        <path d="M32 44 C39 39 44 31 45 21 C38 25 33 33 32 44 Z" />
        {/* Cánh ngoài trái/phải */}
        <path d="M32 46 C22 45 12.5 41 7 33 C17 34 27 38 32 46 Z" />
        <path d="M32 46 C42 45 51.5 41 57 33 C47 34 37 38 32 46 Z" />
        {/* Mặt nước */}
        <path d="M14 50 C20 53 27 54 32 54 C37 54 44 53 50 50" opacity="0.7" />
      </g>
    </svg>
  );
}
