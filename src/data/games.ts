// The list of recorded club games.
//
// To add a game:
// 1. Put the .gcg file from Macondo into src/data/games/
// 2. Add an import line for it below (copy an existing one)
// 3. Add an entry to the `gameRecords` list (copy an existing one)

import { finalScores, parseGcg, type GcgGame } from '../lib/gcg'

import emanuelJeremy20261108G1 from './games/emanuel_jeremy_1108_g1.gcg?raw'
import emanuelJeremy20261108G3 from './games/emanuel_jeremy_1108_g3.gcg?raw'
import emanuelMinsue20261108G2 from './games/emanuel_minsue_1108_g2.gcg?raw'

type GameRecord = {
  id: string // used in the web address, e.g. /games/KSC-2026-001
  date: string // YYYY-MM-DD
  location: { en: string; ko: string }
  type: 'friendly'
  players: Record<string, string> // GCG nickname -> name shown on the site
  notes?: { en: string; ko: string }
  gcg: string
}

const gameRecords: GameRecord[] = [
  {
    id: 'KSC-2026-001',
    date: '2026-11-08',
    location: { en: 'In person', ko: '대면 경기' },
    type: 'friendly',
    players: {
      emanuel: 'Emanuel Chicoine',
      jeremy: 'Jeremy Goard',
    },
    gcg: emanuelJeremy20261108G1,
  },
  {
    id: 'KSC-2026-002',
    date: '2026-11-08',
    location: { en: 'In person', ko: '대면 경기' },
    type: 'friendly',
    players: {
      emanuel: 'Emanuel Chicoine',
      jeremy: 'Jeremy Goard',
    },
    gcg: emanuelJeremy20261108G3,
  },
  {
    id: 'KSC-2026-003',
    date: '2026-11-08',
    location: { en: 'In person', ko: '대면 경기' },
    type: 'friendly',
    players: {
      emanuel: 'Emanuel Chicoine',
      minsue: 'Minsue Kim',
    },
    gcg: emanuelMinsue20261108G2,
  },
]

// ----- Everything below is worked out automatically from the GCG file -----

export type ClubGame = Omit<GameRecord, 'gcg' | 'players'> & {
  game: GcgGame
  lexicon: string
  results: { name: string; score: number }[]
  winner: string | null // null = tie
}

export const games: ClubGame[] = gameRecords
  .map((record) => {
    const game = parseGcg(record.gcg)
    const results = finalScores(game).map((result) => ({
      name: record.players[result.nickname] ?? result.nickname,
      score: result.score,
    }))
    const [first, second] = results
    const winner =
      first.score === second.score ? null : first.score > second.score ? first.name : second.name

    return {
      id: record.id,
      date: record.date,
      location: record.location,
      type: record.type,
      notes: record.notes,
      game,
      lexicon: game.lexicon ?? '',
      results,
      winner,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)) // newest first, then by game number