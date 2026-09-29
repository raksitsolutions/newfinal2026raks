import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'icon'; // 'dark' = for light bg, 'light' = for dark bg
  showTagline?: boolean;
  onClick?: () => void;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "h-10",
  variant = 'dark',
  showTagline = true,
  onClick
}) => {
  const isDarkBg = variant === 'light';
  
  if (variant === 'icon') {
    return (
      <svg 
        className={className}
        viewBox="0 0 110 114" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        role="img"
        aria-label="RAKS IT SOLUTIONS Icon"
      >
        <path 
          fill={isDarkBg ? "#2563eb" : "#14387f"} 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M 54 2 C 82.7 2 106 25.3 106 54 C 106 82.7 82.7 106 54 106 C 43.5 106 33.8 102.9 25.6 97.5 L 10 112 L 15.8 87.2 C 7.2 78 2 66.5 2 54 C 2 25.3 25.3 2 54 2 Z M 24 33 L 48 33 C 62 33 72 40 72 52 C 72 61.5 64.8 68 53.5 70 L 74 91 L 58 91 L 41.5 72 L 37 72 L 37 91 L 24 91 L 24 33 Z M 37 44 L 37 61 L 47 61 C 54 61 59 58 59 52.5 C 59 47 54 44 47 44 L 37 44 Z" 
        />
      </svg>
    );
  }

  const primaryBlue = isDarkBg ? "#ffffff" : "#14387f";
  const emblemBlue = isDarkBg ? "#2563eb" : "#14387f";
  const secondaryColor = isDarkBg ? "#cbd5e1" : "#4d5766";
  const taglineColor = isDarkBg ? "#94a3b8" : "#768090";
  const dotColor = isDarkBg ? "#38bdf8" : "#14387f";
  const ruleColor = isDarkBg ? "#64748b" : "#768090";

  return (
    <svg 
      className={className}
      viewBox={showTagline ? "0 0 950 125" : "0 0 950 95"} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role="img"
      aria-label="RAKS IT SOLUTIONS - Experience Full of Ideas"
    >
      {/* Left Emblem (Speech Bubble with stylized R) */}
      <g transform="translate(10, 6)">
        <path 
          fill={emblemBlue} 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="
            M 54 2 
            C 82.7 2 106 25.3 106 54 
            C 106 82.7 82.7 106 54 106 
            C 43.5 106 33.8 102.9 25.6 97.5 
            L 10 112 
            L 15.8 87.2 
            C 7.2 78 2 66.5 2 54 
            C 2 25.3 25.3 2 54 2 
            Z
            M 24 33
            L 48 33
            C 62 33 72 40 72 52
            C 72 61.5 64.8 68 53.5 70
            L 74 91
            L 58 91
            L 41.5 72
            L 37 72
            L 37 91
            L 24 91
            L 24 33
            Z
            M 37 44
            L 37 61
            L 47 61
            C 54 61 59 58 59 52.5
            C 59 47 54 44 47 44
            L 37 44
            Z
          " 
        />
      </g>

      {/* Wordmark: RAKS */}
      <g fill={primaryBlue} transform="translate(142, 79)">
        {/* R */}
        <path d="M 0 -62 L 23 -62 C 38 -62 47 -53.5 47 -41 C 47 -30.5 40 -23.5 29 -21 L 50 0 L 32.5 0 L 14 -19 L 14 0 L 0 0 Z M 14 -31 L 22 -31 C 29 -31 33 -35 33 -41.5 C 33 -48 29 -51.5 22 -51.5 L 14 -51.5 Z" />
        
        {/* Stylized A with arrow shape and circle dot */}
        <path d="M 56 0 L 78.5 -62 L 95 -62 L 117.5 0 L 102 0 L 97 -16 L 76.5 -16 L 71.5 0 Z M 86.8 -48 L 81 -30 L 92.5 -30 Z" />
        <circle cx="228.8" cy="49" r="4.2" fill={dotColor} />
        
        {/* K */}
        <path d="M 127 -62 L 141 -62 L 141 -36 L 159.5 -62 L 176 -62 L 153 -30.5 L 178 0 L 160.5 0 L 141 -25 L 141 0 L 127 0 Z" />
        
        {/* S */}
        <path d="M 186 -17 C 187.5 -6.5 195 0.5 208.5 0.5 C 221.5 0.5 229 -6.5 229 -16.5 C 229 -37.5 190.5 -25 190.5 -46 C 190.5 -55.5 198.5 -62.5 210 -62.5 C 222 -62.5 228.5 -55 229.5 -44 L 216 -44 C 215.2 -50.5 211.5 -53.5 205.5 -53.5 C 199.5 -53.5 195.5 -50 195.5 -44.5 C 195.5 -25.5 234 -36 234 -15.5 C 234 -4.5 224.5 2 208 2 C 192.5 2 184 -5.5 182 -17 Z" />
      </g>

      {/* Wordmark: IT SOLUTIONS */}
      <g fill={secondaryColor} transform="translate(390, 79)">
        {/* I */}
        <path d="M 0 -62 L 13.5 -62 L 13.5 0 L 0 0 Z" />

        {/* T */}
        <path d="M 23 -62 L 61 -62 L 61 -51 L 48.5 -51 L 48.5 0 L 35.5 0 L 35.5 -51 L 23 -51 Z" />

        {/* S */}
        <path d="M 94 -17 C 95.5 -6.5 103 0.5 116.5 0.5 C 129.5 0.5 137 -6.5 137 -16.5 C 137 -37.5 98.5 -25 98.5 -46 C 98.5 -55.5 106.5 -62.5 118 -62.5 C 130 -62.5 136.5 -55 137.5 -44 L 124 -44 C 123.2 -50.5 119.5 -53.5 113.5 -53.5 C 107.5 -53.5 103.5 -50 103.5 -44.5 C 103.5 -25.5 142 -36 142 -15.5 C 142 -4.5 132.5 2 116 2 C 100.5 2 92 -5.5 90 -17 Z" />

        {/* O */}
        <path d="M 148 -31 C 148 -50 159 -62.5 174.5 -62.5 C 190 -62.5 201 -50 201 -31 C 201 -12 190 0.5 174.5 0.5 C 159 0.5 148 -12 148 -31 Z M 161.5 -31 C 161.5 -18 167 -10.5 174.5 -10.5 C 182 -10.5 187.5 -18 187.5 -31 C 187.5 -44 182 -51.5 174.5 -51.5 C 167 -51.5 161.5 -44 161.5 -31 Z" />

        {/* L */}
        <path d="M 210 -62 L 223.5 -62 L 223.5 -11 L 247 -11 L 247 0 L 210 0 Z" />

        {/* U */}
        <path d="M 255 -62 L 268.5 -62 L 268.5 -21 C 268.5 -13.5 273.5 -9.5 281 -9.5 C 288.5 -9.5 293.5 -13.5 293.5 -21 L 293.5 -62 L 307 -62 L 307 -20 C 307 -6.5 297 1.5 281 1.5 C 265 1.5 255 -6.5 255 -20 Z" />

        {/* T */}
        <path d="M 314 -62 L 352 -62 L 352 -51 L 339.5 -51 L 339.5 0 L 326.5 0 L 326.5 -51 L 314 -51 Z" />

        {/* I */}
        <path d="M 359 -62 L 372.5 -62 L 372.5 0 L 359 0 Z" />

        {/* O */}
        <path d="M 380 -31 C 380 -50 391 -62.5 406.5 -62.5 C 422 -62.5 433 -50 433 -31 C 433 -12 422 0.5 406.5 0.5 C 391 0.5 380 -12 380 -31 Z M 393.5 -31 C 393.5 -18 399 -10.5 406.5 -10.5 C 414 -10.5 419.5 -18 419.5 -31 C 419.5 -44 414 -51.5 406.5 -51.5 C 399 -51.5 393.5 -44 393.5 -31 Z" />

        {/* N */}
        <path d="M 441 -62 L 454.5 -62 L 476.5 -22 L 476.5 -62 L 489.5 -62 L 489.5 0 L 476.5 0 L 454 -40 L 454 0 L 441 0 Z" />

        {/* S */}
        <path d="M 503 -17 C 504.5 -6.5 512 0.5 525.5 0.5 C 538.5 0.5 546 -6.5 546 -16.5 C 546 -37.5 507.5 -25 507.5 -46 C 507.5 -55.5 515.5 -62.5 527 -62.5 C 539 -62.5 545.5 -55 546.5 -44 L 533 -44 C 532.2 -50.5 528.5 -53.5 522.5 -53.5 C 516.5 -53.5 512.5 -50 512.5 -44.5 C 512.5 -25.5 551 -36 551 -15.5 C 551 -4.5 541.5 2 525 2 C 509.5 2 501 -5.5 499 -17 Z" />
      </g>

      {/* Tagline underneath with horizontal dividing rules */}
      {showTagline && (
        <g transform="translate(0, 107)">
          <line x1="210" y1="0" x2="275" y2="0" stroke={ruleColor} strokeWidth="2.2" strokeLinecap="round" />
          <text 
            x="495" 
            y="4.5" 
            textAnchor="middle" 
            fill={taglineColor}
            style={{ 
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif", 
              fontSize: '15.5px', 
              fontWeight: 600, 
              letterSpacing: '0.32em' 
            }}
          >
            EXPERIENCE FULL OF IDEAS
          </text>
          <line x1="715" y1="0" x2="780" y2="0" stroke={ruleColor} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

export default BrandLogo;
