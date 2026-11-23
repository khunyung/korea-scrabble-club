import ScrabbleBoard, { TILE_VALUES } from '../components/ScrabbleBoard'
import { en, ko } from '../i18n'

type LearnPageProps = {
  isEnglish: boolean
}

// How many of each tile are in an English Scrabble set (100 tiles; '?' = blank)
const TILE_COUNTS: [string, number][] = [
  ['A', 9], ['B', 2], ['C', 2], ['D', 4], ['E', 12], ['F', 2], ['G', 3],
  ['H', 2], ['I', 9], ['J', 1], ['K', 1], ['L', 4], ['M', 2], ['N', 6],
  ['O', 8], ['P', 2], ['Q', 1], ['R', 6], ['S', 4], ['T', 6], ['U', 4],
  ['V', 2], ['W', 2], ['X', 1], ['Y', 2], ['Z', 1], ['?', 2],
]

const emptyBoard = Array.from({ length: 15 }, () => Array(15).fill(null))

function LearnPage({ isEnglish }: LearnPageProps) {
  const tx = (isEnglish ? en : ko).learn

  const rules = [
    {
      title: tx.rule1Title,
      text: tx.rule1Text,
    },
    {
      title: tx.rule2Title,
      text: tx.rule2Text,
    },
    {
      title: tx.rule3Title,
      text: tx.rule3Text,
    },
    {
      title: tx.rule4Title,
      text: tx.rule4Text,
    },
    {
      title: tx.rule5Title,
      text: tx.rule5Text,
    },
    {
      title: tx.rule6Title,
      text: tx.rule6Text,
    },
    {
      title: tx.rule7Title,
      text: tx.rule7Text,
    },
  ]

  const premiums = [
    { className: 'square-dl', label: 'DL', name: tx.dlName, text: tx.dlText },
    { className: 'square-tl', label: 'TL', name: tx.tlName, text: tx.tlText },
    { className: 'square-dw', label: 'DW', name: tx.dwName, text: tx.dwText },
    { className: 'square-tw', label: 'TW', name: tx.twName, text: tx.twText },
  ]

  const resources = [
    {
      name: 'Woogles',
      url: 'https://woogles.io',
      text: tx.wooglesText,
    },
    {
      name: 'WESPA',
      url: 'https://www.wespa.org',
      text: tx.wespaText,
    },
    {
      name: 'NASPA',
      url: 'https://www.scrabbleplayers.org',
      text: tx.naspaText,
    },
    {
      name: 'Quackle',
      url: 'https://github.com/quackle/quackle',
      text: tx.quackleText,
    },
    {
      name: 'Macondo',
      url: 'https://github.com/domino14/macondo',
      text: tx.macondoText,
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

      <section className="page-body learn-section">
        <h2 className="stats-title">{tx.rulesTitle}</h2>
        <ol className="rule-list">
          {rules.map((rule, index) => (
            <li key={index} className="rule-card">
              <span className="rule-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{rule.title}</h3>
              <p>{rule.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="page-body learn-section learn-alt">
        <h2 className="stats-title">{tx.tilesTitle}</h2>
        <p className="learn-intro">
          {tx.tilesIntro}
        </p>
        <div className="tile-grid">
          {TILE_COUNTS.map(([letter, count]) => (
            <div key={letter} className="tile-entry">
              <div className="rack-tile">
                {letter !== '?' && (
                  <>
                    <span className="tile-letter">{letter}</span>
                    <span className="tile-value">{TILE_VALUES[letter]}</span>
                  </>
                )}
              </div>
              <span className="tile-count">×{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-body learn-section learn-board-section">
        <div>
          <h2 className="stats-title">{tx.boardTitle}</h2>
          <p className="learn-intro">
            {tx.boardIntro}
          </p>
          <ul className="premium-list">
            {premiums.map((premium) => (
              <li key={premium.label}>
                <span className={`premium-swatch ${premium.className}`}>{premium.label}</span>
                <div>
                  <strong>{premium.name}</strong>
                  <span>{premium.text}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="learn-intro learn-small">
            {tx.boardNote}
          </p>
        </div>
        <div className="learn-board">
          <ScrabbleBoard board={emptyBoard} highlight={[]} />
        </div>
      </section>

      <section className="page-body learn-section learn-alt">
        <h2 className="stats-title">{tx.dictionariesTitle}</h2>
        <div className="dictionary-grid">
          <article className="dictionary-card">
            <span className="archive-badge">CSW24</span>
            <h3>Collins Scrabble Words</h3>
            <p>
              {tx.cswText}
            </p>
          </article>
          <article className="dictionary-card">
            <span className="archive-badge">NWL2023</span>
            <h3>NASPA Word List</h3>
            <p>
              {tx.nwlText}
            </p>
          </article>
        </div>
      </section>

      <section className="page-body learn-section">
        <h2 className="stats-title">{tx.resourcesTitle}</h2>
        <div className="resource-grid">
          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="resource-card"
            >
              <h3>{resource.name} ↗</h3>
              <p>{resource.text}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default LearnPage