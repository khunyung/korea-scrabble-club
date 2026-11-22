// Reads GCG game files (the format Macondo and Woogles export).
// Format reference: https://www.poslfit.com/scrabble/gcg/

export type Placement = {
  row: number // 0-14 (board row 1-15)
  col: number // 0-14 (board column A-O)
  letter: string // always uppercase
  blank: boolean // true if a blank tile was used
}

export type GcgEvent = {
  nickname: string
  rack: string
  kind: 'play' | 'exchange' | 'pass' | 'withdrawn' | 'endRack' | 'other'
  position?: string // e.g. "H4" (down) or "8J" (across)
  word?: string // e.g. "O.IO." where "." is a tile already on the board
  description: string // the middle part of the line, e.g. "-IIIO", "(challenge)", "(O)"
  placements: Placement[] // only the new tiles this move put down
  score: number
  total: number
}

export type GcgGame = {
  players: { nickname: string; name: string }[]
  lexicon?: string
  events: GcgEvent[]
}

const COLUMNS = 'ABCDEFGHIJKLMNO'

export function parseGcg(text: string): GcgGame {
  const game: GcgGame = { players: [], events: [] }

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (line.startsWith('#player')) {
      const rest = line.replace(/^#player\d\s+/, '')
      game.players.push({ nickname: rest.split(/\s+/)[0], name: rest })
      continue
    }

    if (line.startsWith('#lexicon')) {
      game.lexicon = line.split(/\s+/)[1]
      continue
    }

    if (!line.startsWith('>')) continue

    const match = line.match(/^>([^:]+):\s+(.*)$/)
    if (!match) continue

    const parts = match[2].split(/\s+/)
    const event: GcgEvent = {
      nickname: match[1],
      rack: parts[0],
      kind: 'other',
      description: parts.slice(1, -2).join(' '),
      placements: [],
      score: Number(parts[parts.length - 2]),
      total: Number(parts[parts.length - 1]),
    }

    if (parts[0].startsWith('(')) {
      // Points from the opponent's leftover tiles at the end of the game
      event.kind = 'endRack'
      event.description = parts[0]
      event.rack = ''
    } else if (parts.length === 5 && /^(\d+[A-O]|[A-O]\d+)$/i.test(parts[1])) {
      event.kind = 'play'
      event.position = parts[1].toUpperCase()
      event.word = parts[2]

      const across = /^\d/.test(event.position) // "8J" = across, "J8" = down
      let row = Number(event.position.match(/\d+/)![0]) - 1
      let col = COLUMNS.indexOf(event.position.match(/[A-O]/)![0])

      for (const character of event.word) {
        if (character !== '.') {
          event.placements.push({
            row,
            col,
            letter: character.toUpperCase(),
            blank: character !== character.toUpperCase(),
          })
        }
        if (across) col++
        else row++
      }
    } else if (parts[1] === '-') {
      event.kind = 'pass'
    } else if (parts[1] === '--') {
      event.kind = 'withdrawn' // phoney taken back after a challenge
    } else if (parts[1].startsWith('-')) {
      event.kind = 'exchange'
    }

    game.events.push(event)
  }

  return game
}

// The board after the first `count` events (used later by the replay slider)
export function boardAt(game: GcgGame, count: number) {
  const board: (Placement | null)[][] = Array.from({ length: 15 }, () =>
    Array<Placement | null>(15).fill(null),
  )

  game.events.slice(0, count).forEach((event, index) => {
    const nextEvent = game.events[index + 1]
    const takenBack = index + 1 < count && nextEvent?.kind === 'withdrawn'
    if (takenBack) return
    for (const placement of event.placements) {
      board[placement.row][placement.col] = placement
    }
  })

  return board
}

// Each player's final total, in the order the file lists them
export function finalScores(game: GcgGame) {
  return game.players.map((player) => {
    const theirEvents = game.events.filter((event) => event.nickname === player.nickname)
    const last = theirEvents[theirEvents.length - 1]
    return { nickname: player.nickname, score: last ? last.total : 0 }
  })
}