import { Link, useParams } from 'react-router'
import RatingChart from '../components/RatingChart'
import { careerHigh, findProfile } from '../data/profiles'
import { en, ko } from '../i18n'

type ProfilePageProps = {
  isEnglish: boolean
}

function ProfilePage({ isEnglish }: ProfilePageProps) {
  const tx = (isEnglish ? en : ko).profile
  const { slug } = useParams()
  const profile = findProfile(slug)

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
  const s = profile.stats
  const winRate = Math.round((s.wins / s.games) * 1000) / 10 // same method as WESPA: wins ÷ games

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
          <div className="profile-ratings">
            <div>
              <strong>{profile.rating}</strong>
              <span>{tx.currentRating(profile.ratingSource)}</span>
            </div>
            <div>
              <strong>{careerHigh(profile)}</strong>
              <span>{tx.careerHigh}</span>
            </div>
            {profile.ranking?.world && (
              <div>
                <strong>#{profile.ranking.world}</strong>
                <span>{tx.worldRanking(profile.ratingSource)}</span>
              </div>
            )}
          </div>
          <p className="profile-asof">
            {tx.asOf(profile.asOf)}{' '}
            <a href={profile.ratingUrl} target="_blank" rel="noreferrer">
              {tx.source(profile.ratingSource)} ↗
            </a>
          </p>
        </div>
        <img className="profile-portrait" src={profile.portrait} alt={profile.name} />
      </section>

      <section className="page-body profile-intro">
        <div className="about-text">
          <h2 className="stats-title">{tx.aboutTitle}</h2>
          {profile.bio[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
            <dd>{winRate}%</dd>
          </div>
          <div>
            <dt>{tx.averageFor}</dt>
            <dd>{s.averageFor.toFixed(1)}</dd>
          </div>
          <div>
            <dt>{tx.averageAgainst}</dt>
            <dd>{s.averageAgainst.toFixed(1)}</dd>
          </div>
          <div>
            <dt>{tx.highGame}</dt>
            <dd>{s.highGame}</dd>
          </div>
        </dl>

        <h3 className="profile-subtitle">{tx.ratingHistory}</h3>
        <div className="rating-chart-wrap">
          <RatingChart tournaments={profile.tournaments} label={tx.ratingHistory} />
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
              {profile.tournaments.map((t) => (
                <tr key={t.date + t.name}>
                  <td className="archive-date">{t.date}</td>
                  <td>
                    {t.name}
                    <span className="profile-division"> · {tx.division} {t.division}</span>
                  </td>
                  <td>{t.record}</td>
                  <td className={t.spread >= 0 ? 'value-up' : 'value-down'}>
                    {t.spread > 0 ? `+${t.spread}` : t.spread}
                  </td>
                  <td>{t.place}</td>
                  <td className="archive-score">
                    {t.endRating}{' '}
                    <span className={t.change >= 0 ? 'value-up' : 'value-down'}>
                      ({t.change > 0 ? `+${t.change}` : t.change})
                    </span>
                  </td>
                </tr>
              ))}
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