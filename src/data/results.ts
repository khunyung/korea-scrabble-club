// Head-to-head score records, copied from the "Korea Scrabble Records" Google Sheet.
//
// To add a result: find the right pairing below and add a new line at the end of its
// `games` list, in the same order as `players`. Example: [455, 410],
//
// Every game counts here, whether or not it has a .gcg file in the archive.

export type Pairing = {
  players: [string, string]
  games: [number, number][]
}

export const pairings: Pairing[] = [
  {
    players: ['Minsue Kim', 'Emanuel Chicoine'],
    games: [
      [342, 470], [417, 495], [458, 425], [424, 432], [463, 455],
      [427, 410], [330, 439], [449, 528], [364, 372], [395, 523],
      [419, 532], [439, 449], [366, 512], [426, 522], [339, 520],
      [338, 509], [384, 433], [468, 462], [354, 475], [344, 599],
      [490, 475], [358, 500], [360, 436], [421, 496], [469, 348],
      [474, 483], [414, 503], [381, 477], [316, 549], [441, 494],
      [340, 507], [413, 441], [397, 583], [419, 462], [338, 359],
      [416, 413], [262, 565], [397, 512], [403, 421], [451, 469],
      [356, 443], [395, 412], [408, 437], [425, 397],
    ],
  },
  {
    players: ['Minsue Kim', 'Jeremy J. Goard'],
    games: [
      [480, 371], [397, 453], [431, 430], [398, 426], [490, 447],
      [415, 447], [343, 519], [436, 453], [384, 460], [420, 466],
      [525, 365], [346, 494], [365, 594],
    ],
  },
  {
    players: ['Emanuel Chicoine', 'Jeremy J. Goard'],
    games: [
      [452, 370], [506, 444], [423, 456], [394, 450], [430, 435],
      [473, 451], [449, 328], [411, 547], [465, 379], [351, 431],
      [300, 439],
    ],
  },
]

// ----- Everything below is calculated automatically -----

export type PlayerStats = {
  name: string
  games: number
  wins: number
  losses: number
  draws: number
  average: number
  averageAgainst: number // average score of their opponents
  highScore: number
}

export type PairingStats = {
  players: [string, string]
  games: number
  wins: [number, number]
  draws: number
  averages: [number, number]
}

const average = (scores: number[]) =>
  scores.length ? scores.reduce((sum, s) => sum + s, 0) / scores.length : 0

export const pairingStats: PairingStats[] = pairings.map(({ players, games }) => ({
  players,
  games: games.length,
  wins: [games.filter(([a, b]) => a > b).length, games.filter(([a, b]) => b > a).length],
  draws: games.filter(([a, b]) => a === b).length,
  averages: [average(games.map(([a]) => a)), average(games.map(([, b]) => b))],
}))

function statsFor(name: string): PlayerStats {
  const mine: { score: number; opponent: number }[] = []
  for (const { players, games } of pairings) {
    for (const [a, b] of games) {
      if (players[0] === name) mine.push({ score: a, opponent: b })
      if (players[1] === name) mine.push({ score: b, opponent: a })
    }
  }
  return {
    name,
    games: mine.length,
    wins: mine.filter((g) => g.score > g.opponent).length,
    losses: mine.filter((g) => g.score < g.opponent).length,
    draws: mine.filter((g) => g.score === g.opponent).length,
    average: average(mine.map((g) => g.score)),
    averageAgainst: average(mine.map((g) => g.opponent)),
    highScore: Math.max(...mine.map((g) => g.score)),
  }
}

const allNames = [...new Set(pairings.flatMap((p) => p.players))]

export const playerStats: PlayerStats[] = allNames
  .map(statsFor)
  .sort((a, b) => b.wins / b.games - a.wins / a.games) // best win rate first

export const totalGames = pairings.reduce((sum, p) => sum + p.games.length, 0)