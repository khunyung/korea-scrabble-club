import { useState } from 'react'
import ClubSeal from '../components/ClubSeal'
import { playerStats, totalGames } from '../data/results'

type AboutPageProps = {
  isEnglish: boolean
}

const CONTACT_EMAIL = 'minsueinwkim@gmail.com'
const KAKAO_ID = 'khunyung2377'

function AboutPage({ isEnglish }: AboutPageProps) {
  const t = (en: string, ko: string) => (isEnglish ? en : ko)
  const [copied, setCopied] = useState(false)

  const copyKakaoId = async () => {
    try {
      await navigator.clipboard.writeText(KAKAO_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Copying can be blocked by the browser; the ID is still shown on screen
    }
  }

  const facts = [
    { value: t('2026', '2026'), label: t('Founded in summer', '여름 창립') },
    { value: t('Daejeon', '대전'), label: t('Where we play', '활동 지역') },
    { value: t('Weekly', '매주'), label: t('Practice games', '정기 연습 경기') },
    { value: String(totalGames), label: t('Games recorded', '기록된 경기') },
  ]

  const skills = [
    {
      title: t('Math', '계산'),
      text: t(
        'Every turn is a calculation: adding up scores, weighing premium squares, and working out which tiles are still in the bag.',
        '매 차례가 계산입니다. 점수를 더하고, 프리미엄 칸의 가치를 따지고, 주머니에 어떤 타일이 남았는지 추적합니다.',
      ),
    },
    {
      title: t('Spatial awareness', '공간 감각'),
      text: t(
        'The board is a puzzle of space. Strong players see where a word fits, which lanes to open, and which to close.',
        '보드는 공간 퍼즐입니다. 강한 플레이어는 단어가 들어갈 자리, 열어 줄 길과 막아야 할 길을 봅니다.',
      ),
    },
    {
      title: t('Reading your opponent', '상대 읽기'),
      text: t(
        'What did they keep? What are they setting up? Much of the game is reading the other player’s moves.',
        '상대가 어떤 타일을 남겼는지, 무엇을 노리고 있는지. 경기의 상당 부분은 상대의 수를 읽는 일입니다.',
      ),
    },
  ]

  return (
    <main>
      <section className="page-header">
        <div className="eyebrow">
          <span className="gold-line"></span>
          {t('ABOUT US', '클럽 소개')}
        </div>
        <h1>{t('Three players, one city.', '세 명의 플레이어, 하나의 도시.')}</h1>
        <p>
          {t(
            'How a club for competitive Scrabble started in Daejeon.',
            '대전에서 경쟁 스크래블 클럽이 시작된 이야기.',
          )}
        </p>
      </section>

      <section className="page-body about-story">
        <div className="about-text">
          <h2 className="stats-title">{t('Our story', '우리의 이야기')}</h2>
          <p>
            {t(
              'The three of us were regular tournament players before we ever met, competing separately in Thailand and the United States. Back in Korea, there was no Scrabble community to play in.',
              '우리 세 사람은 서로 만나기 전부터 태국과 미국에서 각자 대회에 꾸준히 참가하던 플레이어였습니다. 하지만 한국에는 함께할 스크래블 커뮤니티가 없었습니다.',
            )}
          </p>
          <p>
            {t(
              'So we reached out, looking for anyone in Korea who loved the game as much as we did. We found each other, and it turned out we all lived in the same city: Daejeon.',
              '그래서 한국에 스크래블을 진심으로 즐기는 사람이 있는지 수소문했고, 서로의 연락처를 찾게 되었습니다. 놀랍게도 세 사람 모두 같은 도시, 대전에 살고 있었습니다.',
            )}
          </p>
          <p>
            {t(
              'The club officially started in the summer of 2026. Since then we have played every week and quizzed each other on word lists in our group chat whenever we have a spare moment. Our goal is to travel to international tournaments together as a team from Korea.',
              '클럽은 2026년 여름에 공식적으로 시작했습니다. 그 뒤로 매주 연습 경기를 하고, 틈날 때마다 단체 채팅방에서 단어 목록 퀴즈를 주고받습니다. 언젠가 한국 팀으로 함께 국제 대회에 나가는 것이 우리의 목표입니다.',
            )}
          </p>
        </div>

        <div className="about-side">
          <dl className="about-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dd>{fact.value}</dd>
              <dt>{fact.label}</dt>
            </div>
          ))}
          <div>
            <dd>{playerStats.length}</dd>
            <dt>{t('Active players', '활동 중인 플레이어')}</dt>
          </div>
          </dl>
          <div className="about-seal">
            <ClubSeal />
          </div>
        </div>
      </section>

      <section className="page-body learn-alt">
        <h2 className="stats-title">
          {t('It’s not an English test.', '영어 시험이 아닙니다.')}
        </h2>
        <p className="learn-intro">
          {t(
            'You do not need to be fluent in English to play well. Words can be learned like any other pattern. What decides games is everything else:',
            '스크래블을 잘하기 위해 영어가 유창할 필요는 없습니다. 단어는 다른 패턴처럼 익힐 수 있습니다. 승부를 가르는 것은 나머지 모든 것입니다.',
          )}
        </p>
        <div className="rule-list">
          {skills.map((skill, index) => (
            <article key={skill.title} className="rule-card about-skill">
              <span className="rule-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-body about-join">
        <div>
          <div className="section-label">{t('JOIN US', '함께해요')}</div>
          <h2 className="stats-title about-join-title">
            {t('Everyone is welcome.', '누구나 환영합니다.')}
          </h2>
          <p className="learn-intro">
            {t(
              'Complete beginner or seasoned player, whatever your English level: we are always happy to play with newcomers. We are based in Daejeon, but we are also happy to travel to Seoul or other cities to play together. Send us a message.',
              '완전한 입문자든 숙련된 플레이어든, 영어 실력과 상관없이 새로운 분과 함께하는 것은 언제나 즐겁습니다. 대전에서 활동하지만, 서울이나 다른 도시로 찾아가 함께 경기하는 것도 언제든 환영입니다. 편하게 연락 주세요.',
            )}
          </p>
        </div>

        <div className="contact-list">
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact-card">
            <span className="contact-label">{t('Email', '이메일')}</span>
            <strong>{CONTACT_EMAIL}</strong>
          </a>
          <button type="button" className="contact-card" onClick={copyKakaoId}>
            <span className="contact-label">
              {t('KakaoTalk ID', '카카오톡 ID')}
              <span className="contact-hint">
                {copied ? t('Copied', '복사됨') : t('Click to copy', '클릭해서 복사')}
              </span>
            </span>
            <strong>{KAKAO_ID}</strong>
          </button>
        </div>
      </section>
    </main>
  )
}

export default AboutPage