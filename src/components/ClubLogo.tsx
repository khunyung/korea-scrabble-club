// The club logo: K S C spelled in tiles with their real point values, plus the name.

const LOGO_TILES = [
  { letter: 'K', value: 5, gold: true },
  { letter: 'S', value: 1, gold: false },
  { letter: 'C', value: 3, gold: false },
]

function ClubLogo() {
  return (
    <span className="club-logo">
      <span className="logo-tiles" aria-hidden="true">
        {LOGO_TILES.map((tile) => (
          <span key={tile.letter} className={`logo-tile${tile.gold ? ' logo-tile-gold' : ''}`}>
            {tile.letter}
            <small>{tile.value}</small>
          </span>
        ))}
      </span>
      <span className="brand-name">
        <strong>KOREA SCRABBLE</strong>
        <span>CLUB</span>
      </span>
    </span>
  )
}

export default ClubLogo
