import { Link } from 'react-router'
import { en, ko } from '../i18n'
import FeatureIcon from '../components/FeatureIcon'
import ScrabbleBoard from '../components/ScrabbleBoard'
import { games } from '../data/games'
import { playerStats, totalGames } from '../data/results'
import { boardAt } from '../lib/gcg'

type HomePageProps = {
  isEnglish: boolean
}

function HomePage({ isEnglish }: HomePageProps) {
  const tx = (isEnglish ? en : ko).home

  // Newest archived game (games are already sorted newest first)
  const latest = games[0]

  return (
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="gold-line"></span>
              {tx.official}
            </div>

            <h1>{tx.headline}</h1>

            <p className="hero-description">
              {tx.description}
            </p>

            <div className="hero-actions">
              <Link to="/about" className="button-primary">
                {tx.explore} →
              </Link>
              <Link to="/games" className="button-secondary">
                {tx.records}
              </Link>
            </div>

            <div className="hero-note">
              {tx.heroNote}
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/images/hero.jpg"
              alt={tx.heroImageAlt}
            />
            <div className="image-caption">
              {tx.heroCaption}
            </div>
          </div>
        </section>

        <section className="club-numbers" aria-label={tx.clubInNumbers}>
          <div>
            <strong>{totalGames}</strong>
            <span>{tx.gamesRecorded}</span>
          </div>
          <div>
            <strong>{playerStats.length}</strong>
            <span>{tx.activePlayers}</span>
          </div>
          <div>
            <strong>{games.length}</strong>
            <span>{tx.gamesWithReplay}</span>
          </div>
          <div>
            <strong>2026</strong>
            <span>{tx.foundedInDaejeon}</span>
          </div>
        </section>

        <section className="community-section" id="about">
          <div className="section-label">{tx.community}</div>
          <h2>{tx.communityTitle}</h2>
          <p className="section-description">
            {tx.communityDescription}
          </p>

          <div className="feature-grid">
            <article className="feature-card" id="games">
              <div className="feature-number">01</div>
              <div className="feature-icon"><FeatureIcon name="board" /></div>
              <h3>{tx.feature1}</h3>
              <p>{tx.feature1desc}</p>
              <Link to="/games">{tx.exploreGames} →</Link>
            </article>

            <article className="feature-card" id="tournaments">
              <div className="feature-number">02</div>
              <div className="feature-icon"><FeatureIcon name="trophy" /></div>
              <h3>{tx.feature2}</h3>
              <p>{tx.feature2desc}</p>
              <span className="coming-soon">{tx.comingSoon}</span>
            </article>

            <article className="feature-card" id="learn">
              <div className="feature-number">03</div>
              <div className="feature-icon"><FeatureIcon name="learn" /></div>
              <h3>{tx.feature3}</h3>
              <p>{tx.feature3desc}</p>
              <Link to="/learn">{tx.startLearning} →</Link>
            </article>
          </div>
        </section>

        {latest && (
          <section className="latest-section">
            <div className="latest-board">
              <ScrabbleBoard
                board={boardAt(latest.game, latest.game.events.length)}
                highlight={[]}
              />
            </div>
            <div className="latest-info">
              <div className="section-label">
                {tx.latestLabel}
              </div>
              <h2>
                {latest.results.map((result, index) => (
                  <span key={result.name}>
                    {index > 0 && <span className="latest-vs"> vs </span>}
                    <span className={result.name === latest.winner ? 'latest-winner' : ''}>
                      {result.name}
                    </span>
                  </span>
                ))}
              </h2>
              <p className="latest-score">
                {latest.results.map((result) => result.score).join(' – ')}
              </p>
              <p className="latest-meta">
                {latest.date} · {isEnglish ? latest.location.en : latest.location.ko} ·{' '}
                {latest.lexicon}
              </p>
              <Link to={`/games/${latest.id}`} className="button-primary">
                {tx.watchReplay} →
              </Link>
            </div>
          </section>
        )}

        <section className="join-section" id="members">
          <div>
            <div className="section-label">KOREA SCRABBLE CLUB</div>
            <h2>{tx.joinTitle}</h2>
            <p>{tx.footer}</p>
          </div>
          <a href="mailto:minsueinwkim@gmail.com" className="button-primary">
            {tx.contact} →
          </a>
        </section>
      </main>
  )
}

export default HomePage