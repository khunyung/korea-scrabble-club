import { en, ko } from '../i18n'
import ClubSeal from '../components/ClubSeal'
import ContactCards from '../components/ContactCards'
import { playerStats, totalGames } from '../data/results'

type AboutPageProps = {
  isEnglish: boolean
}

function AboutPage({ isEnglish }: AboutPageProps) {
  const tx = (isEnglish ? en : ko).about

  const facts = [
    { value: tx.factYear, label: tx.factYearLabel },
    { value: tx.factCity, label: tx.factCityLabel },
    { value: tx.factWeekly, label: tx.factWeeklyLabel },
    { value: String(totalGames), label: tx.factGamesLabel },
  ]

  const skills = [
    {
      title: tx.skill1Title,
      text: tx.skill1Text,
    },
    {
      title: tx.skill2Title,
      text: tx.skill2Text,
    },
    {
      title: tx.skill3Title,
      text: tx.skill3Text,
    },
  ]

  return (
    <main>
      <section className="page-header">
        <div className="eyebrow">
          <span className="gold-line"></span>
          {tx.label}
        </div>
        <h1>{tx.title}</h1>
        <p>
          {tx.description}
        </p>
      </section>

      <section className="page-body about-story">
        <div className="about-text">
          <h2 className="stats-title">{tx.storyTitle}</h2>
          <p>
            {tx.story1}
          </p>
          <p>
            {tx.story2}
          </p>
          <p>
            {tx.story3}
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
            <dt>{tx.factPlayersLabel}</dt>
          </div>
          </dl>
          <div className="about-seal">
            <ClubSeal />
          </div>
        </div>
      </section>

      <section className="page-body learn-alt">
        <h2 className="stats-title">
          {tx.notEnglishTitle}
        </h2>
        <p className="learn-intro">
          {tx.notEnglishText}
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
          <div className="section-label">{tx.joinLabel}</div>
          <h2 className="stats-title about-join-title">
            {tx.joinTitle}
          </h2>
          <p className="learn-intro">
            {tx.joinText}
          </p>
        </div>

        <ContactCards isEnglish={isEnglish} />
      </section>
    </main>
  )
}

export default AboutPage