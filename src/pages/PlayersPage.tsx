import { pairingStats, playerStats, totalGames } from '../data/results'
import { en, ko } from '../i18n'
import { Link } from 'react-router'
import { cardPhotoFor, profileForName } from '../data/profiles'

type PlayersPageProps = {
  isEnglish: boolean
}

function PlayersPage({ isEnglish }: PlayersPageProps) {
  const tx = (isEnglish ? en : ko).players

  const percent = (wins: number, games: number) =>
    games ? `${Math.round((wins / games) * 100)}%` : '–'

  return (
    <main>
      <section className="page-header">
        <div className="eyebrow">
          <span className="gold-line"></span>
          {tx.label}
        </div>
        <h1>{tx.title}</h1>
        <p>{tx.description}</p>
      </section>

      <section className="page-body">
        <h2 className="stats-title">{tx.players}</h2>
        <div className="player-grid">
          {playerStats.map((player) => (
            <article key={player.name} className="player-card">
              <div className="player-card-head">
                {cardPhotoFor(player.name) ? (
                  <img className="player-avatar" src={cardPhotoFor(player.name)} alt={player.name} />
                ) : (
                  <span className="player-avatar player-avatar-initial" aria-hidden="true">
                    {player.name.charAt(0)}
                  </span>
                )}
                <div>
                  <h3>{player.name}</h3>
                  {profileForName(player.name) && (
                    <Link to={`/players/${profileForName(player.name)!.slug}`} className="player-profile-link">
                      {(isEnglish ? en : ko).profile.viewProfile} →
                    </Link>
                  )}
                </div>
              </div>
              <div className="player-winrate">
                {percent(player.wins, player.games)}
                <span>{tx.winRate}</span>
              </div>
              <dl className="player-numbers">
                <div>
                  <dt>{tx.games}</dt>
                  <dd>{player.games}</dd>
                </div>
                <div>
                  <dt>{tx.record}</dt>
                  <dd>
                    {player.wins}–{player.losses}
                    {player.draws > 0 && `–${player.draws}`}
                  </dd>
                </div>
                <div>
                  <dt>{tx.average}</dt>
                  <dd>{player.average.toFixed(1)}</dd>
                </div>
                <div>
                  <dt>{tx.against}</dt>
                  <dd>{player.averageAgainst.toFixed(1)}</dd>
                </div>
                <div>
                  <dt>{tx.high}</dt>
                  <dd>{player.highScore}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <h2 className="stats-title">{tx.headToHead}</h2>
        <div className="h2h-list">
          {pairingStats.map((pair) => {
            const [first, second] = pair.players
            const firstShare = pair.games ? (pair.wins[0] / pair.games) * 100 : 50
            return (
              <article key={`${first}-${second}`} className="h2h-card">
                <div className="h2h-names">
                  <span>{first}</span>
                  <span>{second}</span>
                </div>
                <div className="h2h-score">
                  <strong>{pair.wins[0]}</strong>
                  <span className="h2h-games">
                    {pair.games} {tx.games}
                    {pair.draws > 0 && ` · ${tx.draws(pair.draws)}`}
                  </span>
                  <strong>{pair.wins[1]}</strong>
                </div>
                <div className="h2h-bar" aria-hidden="true">
                  <div style={{ width: `${firstShare}%` }}></div>
                </div>
                <div className="h2h-averages">
                  <span>
                    {tx.avg} {pair.averages[0].toFixed(1)}
                  </span>
                  <span>
                    {tx.avg} {pair.averages[1].toFixed(1)}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        <p className="stats-note">{tx.basedOn(totalGames)}</p>
      </section>
    </main>
  )
}

export default PlayersPage