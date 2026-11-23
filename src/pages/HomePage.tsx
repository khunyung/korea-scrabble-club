import { Link } from 'react-router'
import FeatureIcon from '../components/FeatureIcon'
import ScrabbleBoard from '../components/ScrabbleBoard'
import { games } from '../data/games'
import { playerStats, totalGames } from '../data/results'
import { boardAt } from '../lib/gcg'

type HomePageProps = {
  isEnglish: boolean
}

function HomePage({ isEnglish }: HomePageProps) {
  const content = {
    official: isEnglish ? 'THE HOME OF SCRABBLE IN KOREA' : '한국 스크래블의 중심',
    headline: isEnglish
      ? 'Words Connect Us.'
      : '단어로 하나 되는 우리.',
    description: isEnglish
      ? 'Building a community of Scrabble players in Korea. Play, learn, compete, and share your love of words.'
      : '한국의 스크래블 플레이어들을 위한 커뮤니티. 함께 플레이하고, 배우고, 경쟁하며 단어의 즐거움을 나눕니다.',
    explore: isEnglish ? 'Explore the Club' : '클럽 둘러보기',
    records: isEnglish ? 'Game Archive' : '경기 기록 보기',
    heroImageAlt: isEnglish
      ? 'Players enjoying a game of Scrabble'
      : '스크래블 경기를 즐기는 플레이어들',
    heroCaption: isEnglish ? 'WORDS BRING US TOGETHER' : '단어가 우리를 하나로',
    community: isEnglish ? 'OUR COMMUNITY' : '우리의 커뮤니티',
    communityTitle: isEnglish
      ? 'More than just a word game.'
      : '단순한 단어 게임 그 이상.',
    communityDescription: isEnglish
      ? 'Whether you are a complete beginner or an experienced competitor, there is a place for you here.'
      : '처음 스크래블을 접하는 입문자부터 숙련된 경쟁 플레이어까지, 누구나 함께할 수 있습니다.',
    feature1: isEnglish ? 'Friendly Games' : '친선 경기',
    feature1desc: isEnglish
      ? 'Discover games played by our community and explore recorded matches.'
      : '회원들의 경기 기록을 살펴보고 다양한 대국을 확인하세요.',
    feature2: isEnglish ? 'Competitive Play' : '대회와 경쟁',
    feature2desc: isEnglish
      ? 'Follow tournaments, results, and opportunities to compete.'
      : '토너먼트와 경기 결과를 확인하고 경쟁의 기회를 만나보세요.',
    feature3: isEnglish ? 'Learn Together' : '함께 배우기',
    feature3desc: isEnglish
      ? 'Learn the rules, improve your vocabulary, and sharpen your strategy.'
      : '규칙을 배우고 어휘력을 넓히며 전략을 발전시켜 보세요.',
    heroNote: isEnglish
      ? 'ESTABLISHED TO CONNECT SCRABBLE PLAYERS IN KOREA'
      : '한국의 스크래블 플레이어를 잇기 위해 시작되었습니다',
    exploreGames: isEnglish ? 'Explore games' : '경기 둘러보기',
    comingSoon: isEnglish ? 'Tournament page coming soon' : '대회 페이지 준비 중',
    startLearning: isEnglish ? 'Start learning' : '배우기 시작하기',
    joinTitle: isEnglish ? 'Every word has a place.' : '모든 단어에는 자리가 있습니다.',
    contact: isEnglish ? 'Get in Touch' : '문의하기',
    footer: isEnglish
      ? 'Bringing Scrabble to Korea, one word at a time.'
      : '한 단어씩, 한국에 스크래블의 즐거움을 전합니다.',
  }

  // Newest archived game (games are already sorted newest first)
  const latest = games[0]

  return (
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="gold-line"></span>
              {content.official}
            </div>

            <h1>{content.headline}</h1>

            <p className="hero-description">
              {content.description}
            </p>

            <div className="hero-actions">
              <Link to="/about" className="button-primary">
                {content.explore} →
              </Link>
              <Link to="/games" className="button-secondary">
                {content.records}
              </Link>
            </div>

            <div className="hero-note">
              {content.heroNote}
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/images/hero.jpg"
              alt={content.heroImageAlt}
            />
            <div className="image-caption">
              {content.heroCaption}
            </div>
          </div>
        </section>

        <section className="club-numbers" aria-label={isEnglish ? 'Club in numbers' : '숫자로 보는 클럽'}>
          <div>
            <strong>{totalGames}</strong>
            <span>{isEnglish ? 'Games recorded' : '기록된 경기'}</span>
          </div>
          <div>
            <strong>{playerStats.length}</strong>
            <span>{isEnglish ? 'Active players' : '활동 중인 플레이어'}</span>
          </div>
          <div>
            <strong>{games.length}</strong>
            <span>{isEnglish ? 'Games with full replay' : '전체 리플레이 경기'}</span>
          </div>
          <div>
            <strong>2026</strong>
            <span>{isEnglish ? 'Founded in Daejeon' : '대전에서 창립'}</span>
          </div>
        </section>

        <section className="community-section" id="about">
          <div className="section-label">{content.community}</div>
          <h2>{content.communityTitle}</h2>
          <p className="section-description">
            {content.communityDescription}
          </p>

          <div className="feature-grid">
            <article className="feature-card" id="games">
              <div className="feature-number">01</div>
              <div className="feature-icon"><FeatureIcon name="board" /></div>
              <h3>{content.feature1}</h3>
              <p>{content.feature1desc}</p>
              <Link to="/games">{content.exploreGames} →</Link>
            </article>

            <article className="feature-card" id="tournaments">
              <div className="feature-number">02</div>
              <div className="feature-icon"><FeatureIcon name="trophy" /></div>
              <h3>{content.feature2}</h3>
              <p>{content.feature2desc}</p>
              <span className="coming-soon">{content.comingSoon}</span>
            </article>

            <article className="feature-card" id="learn">
              <div className="feature-number">03</div>
              <div className="feature-icon"><FeatureIcon name="learn" /></div>
              <h3>{content.feature3}</h3>
              <p>{content.feature3desc}</p>
              <Link to="/learn">{content.startLearning} →</Link>
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
                {isEnglish ? 'LATEST FROM THE ARCHIVE' : '최근 경기 기록'}
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
                {isEnglish ? 'Watch the replay' : '리플레이 보기'} →
              </Link>
            </div>
          </section>
        )}

        <section className="join-section" id="members">
          <div>
            <div className="section-label">KOREA SCRABBLE CLUB</div>
            <h2>{content.joinTitle}</h2>
            <p>{content.footer}</p>
          </div>
          <a href="mailto:minsueinwkim@gmail.com" className="button-primary">
            {content.contact} →
          </a>
        </section>
      </main>
  )
}

export default HomePage