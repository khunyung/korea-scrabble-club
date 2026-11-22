import ScrabbleBoard, { TILE_VALUES } from '../components/ScrabbleBoard'

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
  const t = (en: string, ko: string) => (isEnglish ? en : ko)

  const rules = [
    {
      title: t('Draw seven tiles', '타일 7개 뽑기'),
      text: t(
        'Each player draws seven tiles from the bag and keeps them hidden on their rack. After every turn, draw back up to seven.',
        '각 플레이어는 주머니에서 타일 7개를 뽑아 자신의 랙에 놓습니다. 매 차례가 끝나면 다시 7개가 되도록 보충합니다.',
      ),
    },
    {
      title: t('Make a word', '단어 만들기'),
      text: t(
        'Place tiles in one line, across or down, to form a word. The first word must cover the centre star. Every later word must connect to tiles already on the board.',
        '타일을 가로 또는 세로 한 줄로 놓아 단어를 만듭니다. 첫 단어는 반드시 중앙의 별 칸을 지나야 하고, 이후의 단어는 보드에 있는 타일과 연결되어야 합니다.',
      ),
    },
    {
      title: t('Score it', '점수 계산'),
      text: t(
        'Add up the letter values of every word you formed. Premium squares only count on the turn they are first covered.',
        '이번 차례에 만들어진 모든 단어의 타일 점수를 더합니다. 프리미엄 칸은 처음 타일이 놓일 때만 적용됩니다.',
      ),
    },
    {
      title: t('Bingo: +50', '빙고: +50점'),
      text: t(
        'Use all seven tiles in a single turn and you earn a 50-point bonus. Bingos decide most competitive games.',
        '한 차례에 타일 7개를 모두 사용하면 50점 보너스를 받습니다. 대부분의 경쟁 경기는 빙고에서 승부가 갈립니다.',
      ),
    },
    {
      title: t('Exchange or pass', '교환 또는 패스'),
      text: t(
        'Instead of playing, you may swap any tiles with the bag (while at least seven remain in it) or pass. Either one uses your turn.',
        '단어를 놓는 대신 원하는 타일을 주머니의 타일과 바꾸거나(주머니에 7개 이상 남아 있을 때) 패스할 수 있습니다. 어느 쪽이든 차례를 사용합니다.',
      ),
    },
    {
      title: t('Challenges', '챌린지'),
      text: t(
        'If you think your opponent played a word that is not in the dictionary, challenge it. An invalid word is taken back and scores nothing.',
        '상대가 사전에 없는 단어를 놓았다고 생각되면 챌린지할 수 있습니다. 유효하지 않은 단어는 회수되고 점수를 얻지 못합니다.',
      ),
    },
    {
      title: t('End of the game', '경기 종료'),
      text: t(
        'The game ends when the bag is empty and one player uses all their tiles. In club and tournament play, that player adds double the value of the opponent’s remaining tiles.',
        '주머니가 비고 한 플레이어가 타일을 모두 사용하면 경기가 끝납니다. 클럽·대회 규칙에서는 그 플레이어가 상대에게 남은 타일 점수의 두 배를 더 받습니다.',
      ),
    },
  ]

  const premiums = [
    { className: 'square-dl', label: 'DL', name: t('Double Letter', '더블 레터'), text: t('Doubles that tile', '그 칸의 타일 점수 2배') },
    { className: 'square-tl', label: 'TL', name: t('Triple Letter', '트리플 레터'), text: t('Triples that tile', '그 칸의 타일 점수 3배') },
    { className: 'square-dw', label: 'DW', name: t('Double Word', '더블 워드'), text: t('Doubles the whole word', '단어 전체 점수 2배') },
    { className: 'square-tw', label: 'TW', name: t('Triple Word', '트리플 워드'), text: t('Triples the whole word', '단어 전체 점수 3배') },
  ]

  const resources = [
    {
      name: 'Woogles',
      url: 'https://woogles.io',
      text: t(
        'Play rated games online for free, and review annotated games.',
        '무료로 온라인 레이팅 경기를 두고, 기보를 분석할 수 있습니다.',
      ),
    },
    {
      name: 'WESPA',
      url: 'https://www.wespa.org',
      text: t(
        'World English-Language Scrabble Players’ Association: international ratings and tournaments (CSW).',
        '세계 영어 스크래블 협회. 국제 레이팅과 대회 정보 (CSW 사용).',
      ),
    },
    {
      name: 'NASPA',
      url: 'https://www.scrabbleplayers.org',
      text: t(
        'North American Scrabble Players Association: tournaments in the US and Canada (NWL and CSW).',
        '북미 스크래블 협회. 미국·캐나다 대회 정보 (NWL·CSW 사용).',
      ),
    },
    {
      name: 'Macondo',
      url: 'https://github.com/domino14/macondo',
      text: t(
        'Open-source analysis engine. The game files in our archive are made with it.',
        '오픈소스 분석 엔진. 우리 경기 기록 파일도 이 프로그램으로 만들었습니다.',
      ),
    },
  ]

  return (
    <main>
      <section className="page-header">
        <div className="eyebrow">
          <span className="gold-line"></span>
          {t('LEARN SCRABBLE', '스크래블 배우기')}
        </div>
        <h1>{t('How to play', '게임 방법')}</h1>
        <p>
          {t(
            'Everything you need for your first game, and a few things for your hundredth.',
            '첫 경기에 필요한 모든 것, 그리고 백 번째 경기를 위한 몇 가지.',
          )}
        </p>
      </section>

      <section className="page-body learn-section">
        <h2 className="stats-title">{t('The rules', '기본 규칙')}</h2>
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
        <h2 className="stats-title">{t('The tiles', '타일 구성')}</h2>
        <p className="learn-intro">
          {t(
            'An English set has 100 tiles. The big number is the letter, the small number its points, and the label underneath how many are in the bag. Blanks can be any letter but score zero.',
            '영어 세트에는 타일이 100개 있습니다. 큰 글자는 알파벳, 작은 숫자는 점수, 아래 표시는 주머니 안의 개수입니다. 블랭크는 어떤 글자로도 쓸 수 있지만 0점입니다.',
          )}
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
          <h2 className="stats-title">{t('The board', '보드')}</h2>
          <p className="learn-intro">
            {t(
              'The board is 15 × 15. Columns are lettered A–O and rows numbered 1–15, so every move can be written down, like H8 or 8H.',
              '보드는 15 × 15칸입니다. 세로줄은 A–O, 가로줄은 1–15로 표시하므로 모든 수를 H8, 8H처럼 기록할 수 있습니다.',
            )}
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
            {t(
              'A number first (8H) means the word goes across; a letter first (H8) means it goes down.',
              '숫자가 먼저(8H)면 가로, 알파벳이 먼저(H8)면 세로로 놓은 단어입니다.',
            )}
          </p>
        </div>
        <div className="learn-board">
          <ScrabbleBoard board={emptyBoard} highlight={[]} />
        </div>
      </section>

      <section className="page-body learn-section learn-alt">
        <h2 className="stats-title">{t('Dictionaries', '사전')}</h2>
        <div className="dictionary-grid">
          <article className="dictionary-card">
            <span className="archive-badge">CSW24</span>
            <h3>Collins Scrabble Words</h3>
            <p>
              {t(
                'The word list used in international play and by WESPA. Our club plays CSW.',
                '국제 대회와 WESPA에서 사용하는 단어 목록입니다. 우리 클럽은 CSW를 사용합니다.',
              )}
            </p>
          </article>
          <article className="dictionary-card">
            <span className="archive-badge">NWL2023</span>
            <h3>NASPA Word List</h3>
            <p>
              {t(
                'The word list used in most tournaments in the United States and Canada.',
                '미국과 캐나다의 대부분의 대회에서 사용하는 단어 목록입니다.',
              )}
            </p>
          </article>
        </div>
      </section>

      <section className="page-body learn-section">
        <h2 className="stats-title">{t('Keep learning', '더 배우기')}</h2>
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