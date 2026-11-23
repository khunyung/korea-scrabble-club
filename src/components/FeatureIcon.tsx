// Small line drawings for the three homepage cards (gold on white).

type FeatureIconProps = {
  name: 'board' | 'trophy' | 'learn'
}

function FeatureIcon({ name }: FeatureIconProps) {
  const stroke = { fill: 'none', stroke: '#b48a43', strokeWidth: 2, strokeLinejoin: 'round' as const }

  if (name === 'board') {
    // A corner of a board with a word crossing another
    return (
      <svg className="feature-svg" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="2" {...stroke} />
        <path d="M4 14h40M4 24h40M4 34h40M14 4v40M24 4v40M34 4v40" stroke="#b48a43" strokeWidth="1" opacity="0.35" />
        <rect x="5" y="15" width="8" height="8" fill="#d7ad58" />
        <rect x="15" y="15" width="8" height="8" fill="#d7ad58" />
        <rect x="25" y="15" width="8" height="8" fill="#d7ad58" />
        <rect x="25" y="25" width="8" height="8" fill="#14243e" />
        <rect x="25" y="35" width="8" height="8" fill="#14243e" />
      </svg>
    )
  }

  if (name === 'trophy') {
    return (
      <svg className="feature-svg" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 6h18v12a9 9 0 0 1-18 0z" {...stroke} />
        <path d="M15 10H8v3a7 7 0 0 0 7 7M33 10h7v3a7 7 0 0 1-7 7" {...stroke} />
        <path d="M24 27v7M17 42h14l-2-8H19z" {...stroke} />
        <rect x="20" y="10" width="8" height="8" fill="#d7ad58" />
      </svg>
    )
  }

  // Open book with a tile on it
  return (
    <svg className="feature-svg" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 12c-5-4-12-4-18-3v28c6-1 13-1 18 3 5-4 12-4 18-3V9c-6-1-13-1-18 3z" {...stroke} />
      <path d="M24 12v28" {...stroke} />
      <rect x="29" y="18" width="9" height="9" fill="#d7ad58" />
      <path d="M10 18h9M10 24h9M10 30h6" stroke="#b48a43" strokeWidth="1.5" opacity="0.6" />
    </svg>
  )
}

export default FeatureIcon
