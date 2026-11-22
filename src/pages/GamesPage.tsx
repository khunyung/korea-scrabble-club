import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { games } from '../data/games'

type GamesPageProps = {
  isEnglish: boolean
}

function GamesPage({ isEnglish }: GamesPageProps) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const content = {
    label: isEnglish ? 'GAME ARCHIVE' : '경기 기록',
    title: isEnglish ? 'Friendly Games' : '친선 경기',
    description: isEnglish
      ? 'Every recorded friendly game played by our members, with the full board and move history.'
      : '회원들이 둔 친선 경기 기록을 보드와 전체 수순과 함께 확인하세요.',
    searchPlaceholder: isEnglish ? 'Search by player name' : '플레이어 이름으로 검색',
    count: (n: number) => (isEnglish ? `${n} game${n === 1 ? '' : 's'}` : `경기 ${n}개`),
    date: isEnglish ? 'Date' : '날짜',
    players: isEnglish ? 'Players' : '플레이어',
    score: isEnglish ? 'Score' : '점수',
    dictionary: isEnglish ? 'Dictionary' : '사전',
    location: isEnglish ? 'Location' : '장소',
    view: isEnglish ? 'View game' : '경기 보기',
    noResults: isEnglish ? 'No games match your search.' : '검색 결과가 없습니다.',
  }

  const query = search.trim().toLowerCase()
  const shownGames = games.filter((game) =>
    game.results.some((result) => result.name.toLowerCase().includes(query)),
  )

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
        <div className="archive-toolbar">
          <input
            type="search"
            className="archive-search"
            placeholder={content.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className="archive-count">{content.count(shownGames.length)}</span>
        </div>

        {shownGames.length === 0 ? (
          <p className="page-status">{content.noResults}</p>
        ) : (
          <div className="archive-table-wrapper">
            <table className="archive-table">
              <thead>
                <tr>
                  <th>{content.date}</th>
                  <th>{content.players}</th>
                  <th>{content.score}</th>
                  <th>{content.dictionary}</th>
                  <th>{content.location}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {shownGames.map((game) => (
                  <tr
                    key={game.id}
                    className="archive-row"
                    onClick={() => navigate(`/games/${game.id}`)}
                  >
                    <td className="archive-date">{game.date}</td>
                    <td>
                      {game.results.map((result, index) => (
                        <span key={result.name}>
                          {index > 0 && <span className="archive-vs"> vs </span>}
                          <span className={result.name === game.winner ? 'archive-winner' : ''}>
                            {result.name}
                          </span>
                        </span>
                      ))}
                    </td>
                    <td className="archive-score">
                      {game.results.map((result) => result.score).join(' – ')}
                    </td>
                    <td>
                      <span className="archive-badge">{game.lexicon}</span>
                    </td>
                    <td>{isEnglish ? game.location.en : game.location.ko}</td>
                    <td className="archive-view">
                      <Link to={`/games/${game.id}`}>{content.view} →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default GamesPage