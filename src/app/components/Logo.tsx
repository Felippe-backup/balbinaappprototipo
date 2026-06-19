export function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#2d7a2d" />
      <ellipse cx="60" cy="80" rx="30" ry="10" fill="#1e5c1e" opacity="0.4" />
      {/* Body */}
      <ellipse cx="60" cy="72" rx="18" ry="22" fill="#f5c5a0" />
      {/* Apron */}
      <ellipse cx="60" cy="76" rx="16" ry="18" fill="#ffffff" opacity="0.9" />
      {/* Head */}
      <circle cx="60" cy="46" r="14" fill="#f5c5a0" />
      {/* Hair */}
      <ellipse cx="60" cy="38" rx="14" ry="8" fill="#8B5E3C" />
      <ellipse cx="48" cy="44" rx="5" ry="9" fill="#8B5E3C" />
      <ellipse cx="72" cy="44" rx="5" ry="9" fill="#8B5E3C" />
      {/* Eyes */}
      <circle cx="55" cy="46" r="2" fill="#3a2a1a" />
      <circle cx="65" cy="46" r="2" fill="#3a2a1a" />
      {/* Smile */}
      <path d="M54 52 Q60 57 66 52" stroke="#3a2a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Arms holding produce */}
      <ellipse cx="38" cy="70" rx="6" ry="12" fill="#f5c5a0" transform="rotate(-20 38 70)" />
      <ellipse cx="82" cy="70" rx="6" ry="12" fill="#f5c5a0" transform="rotate(20 82 70)" />
      {/* Produce basket */}
      <ellipse cx="60" cy="65" rx="18" ry="10" fill="#f5a623" opacity="0.9" />
      <circle cx="50" cy="60" r="5" fill="#4caf50" />
      <circle cx="60" cy="58" r="5" fill="#ff7043" />
      <circle cx="70" cy="60" r="5" fill="#ffeb3b" />
      <circle cx="55" cy="66" r="4" fill="#ff5722" />
      <circle cx="65" cy="66" r="4" fill="#8bc34a" />
    </svg>
  );
}
