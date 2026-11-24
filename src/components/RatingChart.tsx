import type { TournamentResult } from '../data/profiles'

type RatingChartProps = {
  tournaments: TournamentResult[] // newest first
  label: string
}

// Rating after each tournament, oldest on the left
function RatingChart({ tournaments, label }: RatingChartProps) {
  const points = [...tournaments].reverse()
  if (points.length < 2) return null

  const width = 640
  const height = 220
  const pad = { top: 20, right: 20, bottom: 30, left: 44 }
  const ratings = points.map((p) => p.endRating)
  const min = Math.floor((Math.min(...ratings) - 30) / 50) * 50
  const max = Math.ceil((Math.max(...ratings) + 30) / 50) * 50
  const x = (i: number) => pad.left + (i / (points.length - 1)) * (width - pad.left - pad.right)
  const y = (r: number) => pad.top + ((max - r) / (max - min)) * (height - pad.top - pad.bottom)
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.endRating).toFixed(1)}`).join(' ')
  const gridLines = [min, (min + max) / 2, max]

  return (
    <svg className="rating-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      {gridLines.map((r) => (
        <g key={r}>
          <line x1={pad.left} x2={width - pad.right} y1={y(r)} y2={y(r)} stroke="#ece9e2" />
          <text x={pad.left - 8} y={y(r) + 4} textAnchor="end" fontSize="11" fill="#a3aab8">
            {Math.round(r)}
          </text>
        </g>
      ))}
      <path d={line} fill="none" stroke="#b48a43" strokeWidth="2.5" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={p.date + p.name}>
          <circle cx={x(i)} cy={y(p.endRating)} r="4.5" fill="#14243e" stroke="#d7ad58" strokeWidth="2">
            <title>{`${p.date} · ${p.name}: ${p.endRating}`}</title>
          </circle>
        </g>
      ))}
      <text x={x(0)} y={height - 8} fontSize="11" fill="#a3aab8">
        {points[0].date.slice(0, 4)}
      </text>
      <text x={x(points.length - 1)} y={height - 8} fontSize="11" fill="#a3aab8" textAnchor="end">
        {points[points.length - 1].date.slice(0, 4)}
      </text>
    </svg>
  )
}

export default RatingChart
