import React from 'react';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ size = 38, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        height: size,
        width: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative'
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18)',
          borderRadius: Math.round(size * 0.25)
        }}
      >
        <rect
          width="100"
          height="100"
          rx="25"
          fill="#050505"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="3"
        />
        <path
          d="M30 65 L50 35 L70 65"
          stroke="#FFC629"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="50" cy="25" r="6" fill="#FFC629" />
      </svg>
    </div>
  );
};

export default BrandMark;
