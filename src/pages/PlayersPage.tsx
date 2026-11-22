import { pairingStats, playerStats, totalGames } from '../data/results'

type PlayersPageProps = {
  isEnglish: boolean
}

function PlayersPage({ isEnglish }: PlayersPageProps) {
  const content = {
    label: isEnglish ? 'MEMBERS' : '회원',
    title: isEnglish ? 'Players & Records' : '플레이어와 전적',
    description: isEnglish
      ? 'Results from every friendly game recorded by the club.'
      : '클럽에서 기록한 모든 친선 경기의 결과입니다.',
    basedOn: isEnglish
      ? `Based on ${totalGames} recorded games.`
      : `기록된 경기 ${totalGames}개 기준`,
    players: isEnglish ? 'Players' : '플레이어',
    games: isEnglish ? 'Games' : '경기',
    record: isEnglish ? 'W–L' : '승–패',
    winRate: isEnglish ? 'Win rate' : '승률',
    average: isEnglish ? 'Average' : '평균 점수',
    against: isEnglish ? 'Points against' : '평균 실점',
    high: isEnglish ? 'High score' : '최고 점수',
    headToHead: isEnglish ? 'Head-to-head' : '상대 전적',
    avg: isEnglish ? 'avg' : '평균',
    draws: (n: number) => (isEnglish ? `${n} draw${n === 1 ? '' : 's'}` : `무승부 ${n}`),
  }

  const percent = (wins: number, games: number) =>
    games ? `${Math.round((wins / games) * 100)}%` : '–'

  return (
    <main>
      <section className="page-header">
        <div className="eyebrow">
          <span className="gold-line"></span>
          {content.label}
        </div>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </section>

      <section className="page-body">
        <h2 className="stats-title">{content.players}</h2>
        <div className="player-grid">
          {playerStats.map((player) => (
            <article key={player.name} className="player-card">
              <h3>{player.name}</h3>
              <div className="player-winrate">
                {percent(player.wins, player.games)}
                <span>{content.winRate}</span>
              </div>
              <dl className="player-numbers">
                <div>
                  <dt>{content.games}</dt>
                  <dd>{player.games}</dd>
                </div>
                <div>
                  <dt>{content.record}</dt>
                  <dd>
                    {player.wins}–{player.losses}
                    {player.draws > 0 && `–${player.draws}`}
                  </dd>
                </div>
                <div>
                  <dt>{content.average}</dt>
                  <dd>{player.average.toFixed(1)}</dd>
                </div>
                <div>
                  <dt>{content.against}</dt>
                  <dd>{player.averageAgainst.toFixed(1)}</dd>
                </div>
                <div>
                  <dt>{content.high}</dt>
                  <dd>{player.highScore}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <h2 className="stats-title">{content.headToHead}</h2>
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
                    {pair.games} {content.games}
                    {pair.draws > 0 && ` · ${content.draws(pair.draws)}`}
                  </span>
                  <strong>{pair.wins[1]}</strong>
                </div>
                <div className="h2h-bar" aria-hidden="true">
                  <div style={{ width: `${firstShare}%` }}></div>
                </div>
                <div className="h2h-averages">
                  <span>
                    {content.avg} {pair.averages[0].toFixed(1)}
                  </span>
                  <span>
                    {content.avg} {pair.averages[1].toFixed(1)}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        <p className="stats-note">{content.basedOn}</p>
      </section>
    </main>
  )
}

export default PlayersPage