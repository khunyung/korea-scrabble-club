// Round club badge. The same design is saved as public/images/club-seal.svg for social media.

type ClubSealProps = {
  size?: number
}

function ClubSeal({ size = 180 }: ClubSealProps) {
  return (
    <svg
      className="club-seal"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Korea Scrabble Club, established 2026, Daejeon"
    >
      <defs>
        {/* top arc, left to right over the top */}
        <path id="seal-top" d="M 34,100 A 66,66 0 0 1 166,100" />
        {/* bottom arc, left to right under the bottom */}
        <path id="seal-bottom" d="M 22,100 A 78,78 0 0 0 178,100" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="#14243e" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#d7ad58" strokeWidth="2" />
      <circle cx="100" cy="100" r="56" fill="none" stroke="#d7ad58" strokeWidth="1" opacity="0.5" />

      <text fill="#ffffff" fontFamily="'DM Sans', Arial, sans-serif" fontWeight="700" fontSize="13" letterSpacing="2">
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
          KOREA SCRABBLE CLUB
        </textPath>
      </text>
      <text fill="#d7ad58" fontFamily="'DM Sans', Arial, sans-serif" fontWeight="700" fontSize="11" letterSpacing="3">
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">
          EST. 2026 · DAEJEON
        </textPath>
      </text>

      <rect x="74" y="74" width="56" height="56" rx="4" fill="#a47b35" />
      <rect x="70" y="70" width="56" height="56" rx="4" fill="#d7ad58" />
      <text x="98" y="110" textAnchor="middle" fill="#14243e" fontFamily="'Playfair Display', Georgia, serif" fontWeight="800" fontSize="36">
        K
      </text>
      <text x="120" y="121" textAnchor="end" fill="#14243e" fontFamily="'DM Sans', Arial, sans-serif" fontWeight="700" fontSize="10">
        5
      </text>
    </svg>
  )
}

export default ClubSeal
