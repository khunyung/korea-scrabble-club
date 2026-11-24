import type { TournamentResult } from '../data/profiles'

type Series = {
  label: string
  color: string
  points: TournamentResult[] // must have endRating
}

type RatingChartProps = {
  series: Series[]
  label: string
}

// Rating after each tournament, oldest on the left. Points are placed by date.
function RatingChart({ series, label }: RatingChartProps) {
  const all = series.flatMap((s) => s.points)
  if (all.length < 2) return null

  const width = 640
  const height = 230
  const pad = { top: 20, right: 20, bottom: 30, left: 44 }
  const time = (d: string) => new Date(d).getTime()
  const t0 = Math.min(...all.map((p) => time(p.date)))
  const t1 = Math.max(...all.map((p) => time(p.date)))
  const ratings = all.map((p) => p.endRating as number)
  const min = Math.floor((Math.min(...ratings) - 30) / 50) * 50
  const max = Math.ceil((Math.max(...ratings) + 30) / 50) * 50
  const x = (d: string) => pad.left + ((time(d) - t0) / (t1 - t0 || 1)) * (width - pad.left - pad.right)
  const y = (r: number) => pad.top + ((max - r) / (max - min)) * (height - pad.top - pad.bottom)
  const gridLines = [min, (min + max) / 2, max]

  return (
    <figure className="rating-chart-figure">
      <svg className="rating-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        {gridLines.map((r) => (
          <g key={r}>
            <line x1={pad.left} x2={width - pad.right} y1={y(r)} y2={y(r)} stroke="#ece9e2" />
            <text x={pad.left - 8} y={y(r) + 4} textAnchor="end" fontSize="11" fill="#a3aab8">
              {Math.round(r)}
            </text>
          </g>
        ))}
        {series.map((s) => {
          const pts = [...s.points].sort((a, b) => a.date.localeCompare(b.date))
          const line = pts
            .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.date).toFixed(1)},${y(p.endRating as number).toFixed(1)}`)
            .join(' ')
          return (
            <g key={s.label}>
              <path d={line} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" />
              {pts.map((p) => (
                <circle
                  key={p.date + p.name}
                  cx={x(p.date)}
                  cy={y(p.endRating as number)}
                  r="4.5"
                  fill="#14243e"
                  stroke={s.color}
                  strokeWidth="2"
                >
                  <title>{`${p.date} · ${p.name}: ${p.endRating}`}</title>
                </circle>
              ))}
            </g>
          )
        })}
        <text x={pad.left} y={height - 8} fontSize="11" fill="#a3aab8">
          {new Date(t0).getFullYear()}
        </text>
        <text x={width - pad.right} y={height - 8} fontSize="11" fill="#a3aab8" textAnchor="end">
          {new Date(t1).getFullYear()}
        </text>
      </svg>
      {series.length > 1 && (
        <figcaption className="chart-legend">
          {series.map((s) => (
            <span key={s.label}>
              <i style={{ background: s.color }}></i>
              {s.label}
            </span>
          ))}
        </figcaption>
      )}
    </figure>
  )
}

export default RatingChart