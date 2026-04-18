interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 32, showWordmark = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="text-xl font-bold tracking-tight">
          <span className="text-foreground">swiss</span>
          <span className="text-primary">Tax</span>
        </span>
      )}
    </div>
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="swissTax logo"
      role="img"
    >
      <defs>
        <linearGradient id="swisstax-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E63029" />
          <stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="swisstax-spark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* Rounded red square (Swiss flag base) */}
      <rect width="32" height="32" rx="7" fill="url(#swisstax-bg)" />

      {/* White Swiss cross */}
      <rect x="13.4" y="6" width="5.2" height="20" rx="0.6" fill="white" />
      <rect x="6" y="13.4" width="20" height="5.2" rx="0.6" fill="white" />

      {/* AI spark — 4-pointed star at top-right of the cross suggests intelligence/AI */}
      <g transform="translate(22.5 9.5)">
        <path
          d="M0 -3.2 L0.7 -0.7 L3.2 0 L0.7 0.7 L0 3.2 L-0.7 0.7 L-3.2 0 L-0.7 -0.7 Z"
          fill="url(#swisstax-spark)"
        />
        <circle cx="0" cy="0" r="0.9" fill="white" />
      </g>
    </svg>
  );
}
