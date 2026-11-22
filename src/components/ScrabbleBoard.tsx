import type { Placement } from '../lib/gcg'

// Standard tile values for English Scrabble (CSW / NWL)
export const TILE_VALUES: Record<string, number> = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
  N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10,
}

// Top-left quarter of the board (rows 1-8, columns A-H).
// T = triple word, D = double word, t = triple letter, d = double letter
const QUARTER = [
  'T..d...T',
  '.D...t..',
  '..D...d.',
  'd..D...d',
  '....D...',
  '.t...t..',
  '..d...d.',
  'T..d...D',
]

function premiumAt(row: number, col: number) {
  const r = row > 7 ? 14 - row : row
  const c = col > 7 ? 14 - col : col
  return QUARTER[r][c]
}

const PREMIUM_CLASS: Record<string, string> = {
  T: 'square-tw',
  D: 'square-dw',
  t: 'square-tl',
  d: 'square-dl',
}

const PREMIUM_LABEL: Record<string, string> = {
  T: 'TW',
  D: 'DW',
  t: 'TL',
  d: 'DL',
}

const COLUMNS = 'ABCDEFGHIJKLMNO'.split('')

type ScrabbleBoardProps = {
  board: (Placement | null)[][]
  highlight: Placement[] // tiles placed by the selected move
}

function ScrabbleBoard({ board, highlight }: ScrabbleBoardProps) {
  const isHighlighted = (row: number, col: number) =>
    highlight.some((p) => p.row === row && p.col === col)

  return (
    <div className="board">
      <div className="board-corner"></div>
      {COLUMNS.map((letter) => (
        <div key={letter} className="board-coordinate">
          {letter}
        </div>
      ))}

      {board.map((rowTiles, row) => (
        <div key={row} className="board-row">
          <div className="board-coordinate">{row + 1}</div>
          {rowTiles.map((tile, col) => {
            const premium = premiumAt(row, col)
            const isCenter = row === 7 && col === 7

            if (tile) {
              return (
                <div
                  key={col}
                  className={`board-square board-tile${tile.blank ? ' tile-blank' : ''}${
                    isHighlighted(row, col) ? ' tile-new' : ''
                  }`}
                >
                  <span className="tile-letter">{tile.letter}</span>
                  {!tile.blank && <span className="tile-value">{TILE_VALUES[tile.letter]}</span>}
                </div>
              )
            }

            return (
              <div key={col} className={`board-square ${PREMIUM_CLASS[premium] ?? ''}`}>
                {isCenter ? '★' : PREMIUM_LABEL[premium] ?? ''}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ScrabbleBoard