// Metro Hospital SVG Logo (approximated from provided image)
export default function MetroLogo({ height = 48 }) {
  return (
    <svg height={height} viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg" aria-label="메트로병원">
      {/* Cross / medical symbol */}
      <rect x="2" y="18" width="10" height="30" rx="2" fill="#2ba89a" />
      <rect x="-6" y="26" width="26" height="10" rx="2" fill="#2ba89a" />
      {/* Yellow accent arc */}
      <path d="M18 10 Q30 2 36 20" stroke="#e8b84b" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Korean text */}
      <text x="42" y="30" fontFamily="'Noto Sans KR', sans-serif" fontSize="20" fontWeight="700" fill="#1a1a2e">메트로병원</text>
      {/* English text */}
      <text x="43" y="48" fontFamily="Arial, sans-serif" fontSize="13" fill="#555" letterSpacing="1">Metro Hospital</text>
    </svg>
  );
}
