import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router'
import RatingChart from '../components/RatingChart'
import { careerHighFor, findProfile, type TournamentResult } from '../data/profiles'
import { en, ko } from '../i18n'

type ProfilePageProps = {
  isEnglish: boolean
}

function ProfilePage({ isEnglish }: ProfilePageProps) {
  const tx = (isEnglish ? en : ko).profile
  const { slug } = useParams()
  const profile = findProfile(slug)
  const [openTournament, setOpenTournament] = useState<string | null>(null)

  // W-L(-D) worked out from the games when they are known
  const recordOf = (t: TournamentResult) => {
    if (!t.games) return t.record
    const wins = t.games.filter((g) => g.score > g.opponentScore).length
    const losses = t.games.filter((g) => g.score < g.opponentScore).length
    const draws = t.games.length - wins - losses
    return draws > 0 ? `${wins}-${losses}-${draws}` : `${wins}-${losses}`
  }

  if (!profile) {
    return (
      <main>
        <section className="page-body">
          <p className="page-status">{tx.notFound}</p>
          <p className="detail-back">
            <Link to="/players">{tx.back}</Link>
          </p>
        </section>
      </main>
    )
  }

  const lang = isEnglish ? 'en' : 'ko'
  // "NWL" -> "NASPA NWL", "WESPA" stays "WESPA"
  const ratingName = (label: string) =>
    label === profile.ratingSource ? label : `${profile.ratingSource} ${label}`
  const SERIES_COLORS = ['#b48a43', '#4a79a8']
  const rated = profile.tournaments.filter((t) => t.endRating !== undefined)
  const chartSeries = profile.ratings.map((r, i) => ({
    label: ratingName(r.label),
    color: SERIES_COLORS[i % SERIES_COLORS.length],
    points: r.lexicon ? rated.filter((t) => t.lexicon === r.lexicon) : rated,
  }))
  const s = profile.stats
  // Same method as each source: WESPA counts wins ÷ games, NASPA counts a tie as half a win
  const winsCounted = profile.ratingSource === 'NASPA' ? s.wins + s.draws / 2 : s.wins
  const winRate = Math.round((winsCounted / s.games) * 1000) / 10

  return (
    <main>
      <section className="page-header profile-header">
        <div className="profile-header-text">
          <p className="detail-back">
            <Link to="/players">{tx.back}</Link>
          </p>
          <div className="eyebrow">
            <span className="gold-line"></span>
            {tx.label}
          </div>
          <h1>{isEnglish ? profile.name : profile.nameKo ?? profile.name}</h1>
          {profile.nameKo && (
            <p className="profile-altname">{isEnglish ? profile.nameKo : profile.name}</p>
          )}
          {profile.hometown && <p className="profile-hometown">{profile.hometown[lang]}</p>}
          <div className="profile-ratings">
            {profile.ratings.map((r) => (
              <div key={r.label} className="profile-rating-group">
                <div>
                  <strong>{r.current}</strong>
                  <span>{tx.currentRating(ratingName(r.label))}</span>
                </div>
                <div>
                  <strong>{careerHighFor(profile, r)}</strong>
                  <span>{tx.careerHighOf(ratingName(r.label))}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="profile-asof">
            {tx.asOf(profile.asOf)}{' '}
            {profile.ratingUrl ? (
              <a href={profile.ratingUrl} target="_blank" rel="noreferrer">
                {tx.source(profile.ratingSource)} ↗
              </a>
            ) : (
              tx.sourceName(profile.ratingSource)
            )}
          </p>
        </div>
        {profile.portrait ? (
          <img className="profile-portrait" src={profile.portrait} alt={profile.name} />
        ) : (
          <div className="profile-portrait profile-portrait-initial" aria-hidden="true">
            {profile.name.charAt(0)}
          </div>
        )}
      </section>

      <section className="page-body profile-intro">
        <div className="about-text">
          <h2 className="stats-title">{tx.aboutTitle}</h2>
          {profile.bio ? (
            profile.bio[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          ) : (
            <p>{tx.noBio}</p>
          )}
          {profile.links.length > 0 && (
            <div className="profile-links">
              {profile.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="button-secondary profile-link">
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        {profile.favoriteWord && (
        <aside className="favorite-word">
          <span className="section-label">{tx.favoriteWord}</span>
          <div className="favorite-tiles" aria-label={profile.favoriteWord.word}>
            {profile.favoriteWord.word.split('').map((letter, index) => (
              <span key={index} className="logo-tile">
                {letter}
              </span>
            ))}
          </div>
          <p>{profile.favoriteWord.meaning[lang]}</p>
        </aside>
        )}
      </section>

      <section className="page-body learn-alt">
        <h2 className="stats-title">{tx.careerTitle(profile.ratingSource)}</h2>
        <dl className="profile-stats">
          <div>
            <dt>{tx.games}</dt>
            <dd>{s.games}</dd>
          </div>
          <div>
            <dt>{tx.record}</dt>
            <dd>
              {s.wins}–{s.losses}
              {s.draws > 0 && `–${s.draws}`}
            </dd>
          </div>
          <div>
            <dt>{tx.winRate}</dt>
            <dd>{winRate.toFixed(1)}%</dd>
          </div>
          <div>
            <dt>{tx.averageFor}</dt>
            <dd>{Number.isInteger(s.averageFor) ? s.averageFor : s.averageFor.toFixed(1)}</dd>
          </div>
          <div>
            <dt>{tx.averageAgainst}</dt>
            <dd>{Number.isInteger(s.averageAgainst) ? s.averageAgainst : s.averageAgainst.toFixed(1)}</dd>
          </div>
          {s.highGame !== undefined && (
            <div>
              <dt>{tx.highGame}</dt>
              <dd>{s.highGame}</dd>
            </div>
          )}
        </dl>

        <h3 className="profile-subtitle">{tx.ratingHistory}</h3>
        <div className="rating-chart-wrap">
          <RatingChart series={chartSeries} label={tx.ratingHistory} />
        </div>
      </section>

      <section className="page-body">
        <h2 className="stats-title">{tx.tournamentsTitle}</h2>
        <div className="archive-table-wrapper">
          <table className="archive-table">
            <thead>
              <tr>
                <th>{tx.date}</th>
                <th>{tx.tournament}</th>
                <th>{tx.recordShort}</th>
                <th>{tx.spread}</th>
                <th>{tx.place}</th>
                <th>{tx.rating}</th>
              </tr>
            </thead>
            <tbody>
              {profile.tournaments.map((t) => {
                const key = t.date + t.name
                const isOpen = openTournament === key
                return (
                  <Fragment key={key}>
                    <tr>
                      <td className="archive-date">{t.date}</td>
                      <td>
                        {t.name}
                        <span className="profile-division">
                          {' '}
                          · {tx.division} {t.division}
                          {t.lexicon && ` · ${t.lexicon}`}
                        </span>
                        {t.games && (
                          <button
                            type="button"
                            className="games-toggle"
                            aria-expanded={isOpen}
                            onClick={() => setOpenTournament(isOpen ? null : key)}
                          >
                            {isOpen ? tx.hideGames : tx.showGames(t.games.length)}
                          </button>
                        )}
                      </td>
                      <td>{recordOf(t)}</td>
                      <td className={t.spread === undefined ? '' : t.spread >= 0 ? 'value-up' : 'value-down'}>
                        {t.spread === undefined ? '–' : t.spread > 0 ? `+${t.spread}` : t.spread}
                      </td>
                      <td>{t.field ? `${t.place} / ${t.field}` : t.place}</td>
                      <td className="archive-score">
                        {t.endRating === undefined ? (
                          <span className="profile-division">{tx.unrated}</span>
                        ) : (
                          <>
                            {t.endRating}{' '}
                            {t.change !== undefined && (
                              <span className={t.change >= 0 ? 'value-up' : 'value-down'}>
                                ({t.change > 0 ? `+${t.change}` : t.change})
                              </span>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                    {isOpen && t.games && (
                      <tr className="games-row">
                        <td colSpan={6}>
                          <table className="games-table">
                            <thead>
                              <tr>
                                <th>{tx.round}</th>
                                <th>{tx.opponent}</th>
                                <th>{tx.opponentRating}</th>
                                <th>{tx.result}</th>
                                <th>{tx.score}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {t.games.map((g) => {
                                const result = g.score > g.opponentScore ? 'W' : g.score < g.opponentScore ? 'L' : 'D'
                                return (
                                  <tr key={g.round}>
                                    <td>{g.round}</td>
                                    <td>{g.opponent}</td>
                                    <td>{g.opponentRating ?? '–'}</td>
                                    <td>
                                      <span className={`result-badge result-${result}`}>{tx.resultLetter[result]}</span>
                                    </td>
                                    <td className="archive-score">
                                      {g.score} – {g.opponentScore}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {profile.photos.length > 0 && (
        <section className="page-body learn-alt">
          <h2 className="stats-title">{tx.photos}</h2>
          <div className="photo-grid">
            {profile.photos.map((photo) => (
              <figure key={photo.src}>
                <img src={photo.src} alt={photo.caption ? photo.caption[lang] : profile.name} loading="lazy" />
                {photo.caption && <figcaption>{photo.caption[lang]}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default ProfilePage