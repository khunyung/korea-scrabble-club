import { useState } from 'react'
import { en, ko } from '../i18n'
import { Link, useParams } from 'react-router'
import ScrabbleBoard, { TILE_VALUES } from '../components/ScrabbleBoard'
import { games } from '../data/games'
import { boardAt, type GcgEvent, type Placement } from '../lib/gcg'

type GameDetailPageProps = {
  isEnglish: boolean
}

function GameDetailPage({ isEnglish }: GameDetailPageProps) {
  const tx = (isEnglish ? en : ko).game
  const { gameId } = useParams()
  const clubGame = games.find((g) => g.id === gameId)

  // How many moves are shown on the board. Starts at the end of the game.
  const [step, setStep] = useState(clubGame ? clubGame.game.events.length : 0)


  if (!clubGame) {
    return (
      <main>
        <section className="page-body">
          <p className="page-status">{tx.notFound}</p>
          <p className="detail-back">
            <Link to="/games">{tx.back}</Link>
          </p>
        </section>
      </main>
    )
  }

  const { game, results, winner } = clubGame
  const events = game.events
  const nameOf = (nickname: string) => {
    const index = game.players.findIndex((p) => p.nickname === nickname)
    return results[index]?.name ?? nickname
  }

  const board = boardAt(game, step)
  const boardBefore = (index: number) => boardAt(game, index)
  // Highlight the tiles from the most recent move that put tiles on the board
  const lastPlay = events
    .slice(0, step)
    .reverse()
    .find((e) => e.placements.length > 0)
  const highlight: Placement[] = lastPlay ? lastPlay.placements : []

  // The rack of the player whose turn comes next (from the GCG file)
  const nextTurn = events
    .slice(step)
    .find((e) => ['play', 'exchange', 'pass'].includes(e.kind) && e.rack)
  const rackTiles = nextTurn ? nextTurn.rack.split('') : []

  // Each player's score at the current step
  const scoresNow = game.players.map((player) => {
    const done = events.slice(0, step).filter((e) => e.nickname === player.nickname)
    return done.length ? done[done.length - 1].total : 0
  })

  // Shows a word like Woogles does: tiles already on the board in brackets, e.g. (U)NVEIL
  const wordWithPlayedThrough = (event: GcgEvent, index: number) => {
    if (!event.word || !event.position) return ''
    const before = boardBefore(index)
    const across = /^\d/.test(event.position)
    let row = Number(event.position.match(/\d+/)![0]) - 1
    let col = 'ABCDEFGHIJKLMNO'.indexOf(event.position.match(/[A-O]/)![0])
    let text = ''
    for (const character of event.word) {
      text += character === '.' ? `(${before[row][col]?.letter ?? '?'})` : character
      if (across) col++
      else row++
    }
    return text.replace(/\)\(/g, '')
  }

  const describe = (event: GcgEvent, index: number) => {
    switch (event.kind) {
      case 'play':
        return { where: event.position, what: wordWithPlayedThrough(event, index) }
      case 'exchange':
        return { where: '', what: `${tx.exchange} ${event.description.replace('-', '')}` }
      case 'pass':
        return { where: '', what: tx.pass }
      case 'withdrawn':
        return { where: '', what: tx.withdrawn }
      case 'endRack':
        return { where: '', what: `${tx.endRack} ${event.description}` }
      default:
        return {
          where: '',
          what: event.description === '(challenge)' ? tx.challenge : event.description,
        }
    }
  }

  return (
    <main>
      <section className="page-header detail-header">
        <p className="detail-back">
          <Link to="/games">{tx.back}</Link>
        </p>
        <div className="eyebrow">
          <span className="gold-line"></span>
          {tx.label} · {clubGame.id}
        </div>

        <div className="detail-scoreline">
          {results.map((result, index) => (
            <div
              key={result.name}
              className={`detail-player${result.name === winner ? ' detail-player-winner' : ''}`}
            >
              <span className="detail-player-name">{result.name}</span>
              <span className="detail-player-score">{result.score}</span>
              {index === 0 && <span className="detail-dash">–</span>}
            </div>
          ))}
        </div>

        <p className="detail-meta">
          {clubGame.date} · {isEnglish ? clubGame.location.en : clubGame.location.ko} ·{' '}
          {clubGame.lexicon} · {tx.winner}: {winner ?? tx.tie}
        </p>
      </section>

      <section className="page-body detail-layout">
        <div className="detail-board-column">
          <ScrabbleBoard board={board} highlight={highlight} />

          <div className="replay-controls">
            <button onClick={() => setStep(0)} disabled={step === 0} aria-label="First move">
              «
            </button>
            <button onClick={() => setStep(step - 1)} disabled={step === 0} aria-label="Previous move">
              ‹
            </button>
            <input
              type="range"
              min={0}
              max={events.length}
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              aria-label="Replay position"
            />
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === events.length}
              aria-label="Next move"
            >
              ›
            </button>
            <button
              onClick={() => setStep(events.length)}
              disabled={step === events.length}
              aria-label="Last move"
            >
              »
            </button>
          </div>
          <div className="rack-panel">
            {nextTurn ? (
              <>
                <p className="rack-owner">
                  <strong>{nameOf(nextTurn.nickname)}</strong> {tx.onTurn}
                </p>
                <div className="rack">
                  {rackTiles.map((letter, index) => (
                    <div key={index} className={`rack-tile${letter === '?' ? ' rack-blank' : ''}`}>
                      {letter !== '?' && (
                        <>
                          <span className="tile-letter">{letter}</span>
                          <span className="tile-value">{TILE_VALUES[letter]}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {rackTiles.length < 7 && <p className="rack-note">{tx.partialRack}</p>}
              </>
            ) : (
              <p className="rack-owner">{tx.gameOver}</p>
            )}
          </div>

          <p className="replay-status">
            {step === 0
              ? tx.start
              : tx.moveStatus(step, events.length)}
          </p>
        </div>

        <aside className="detail-side">
          <div className="live-score">
            {game.players.map((player, index) => (
              <div key={player.nickname} className="live-score-row">
                <span>{nameOf(player.nickname)}</span>
                <strong>{scoresNow[index]}</strong>
              </div>
            ))}
          </div>

          <h2 className="moves-title">{tx.moves}</h2>
          <ol className="move-list">
            {events.map((event, index) => {
              const { where, what } = describe(event, index)
              return (
                <li key={index}>
                  <button
                    className={`move-item${step === index + 1 ? ' move-active' : ''}`}
                    onClick={() => setStep(index + 1)}
                  >
                    <span className="move-number">{index + 1}</span>
                    <span className="move-player">{nameOf(event.nickname)}</span>
                    <span className="move-main">
                      {where && <span className="move-where">{where}</span>}
                      <span className="move-word">{what}</span>
                      {event.rack && <span className="move-rack">{event.rack}</span>}
                    </span>
                    <span className="move-score">
                      {event.score >= 0 ? `+${event.score}` : event.score}
                      <small>{event.total}</small>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </aside>
      </section>
    </main>
  )
}

export default GameDetailPage