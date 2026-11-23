import { useState } from 'react'
import { en, ko } from '../i18n'
import { Link, useNavigate } from 'react-router'
import { games } from '../data/games'

type GamesPageProps = {
  isEnglish: boolean
}

function GamesPage({ isEnglish }: GamesPageProps) {
  const tx = (isEnglish ? en : ko).games
  const [search, setSearch] = useState('')
  const navigate = useNavigate()


  const query = search.trim().toLowerCase()
  const shownGames = games.filter((game) =>
    game.results.some((result) => result.name.toLowerCase().includes(query)),
  )

  return (
    <main>
      <section className="page-header">
        <div className="eyebrow">
          <span className="gold-line"></span>
          {tx.label}
        </div>
        <h1>{tx.title}</h1>
        <p>{tx.description}</p>
      </section>

      <section className="page-body">
        <div className="archive-toolbar">
          <input
            type="search"
            className="archive-search"
            placeholder={tx.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className="archive-count">{tx.count(shownGames.length)}</span>
        </div>

        {shownGames.length === 0 ? (
          <p className="page-status">{tx.noResults}</p>
        ) : (
          <div className="archive-table-wrapper">
            <table className="archive-table">
              <thead>
                <tr>
                  <th>{tx.date}</th>
                  <th>{tx.players}</th>
                  <th>{tx.score}</th>
                  <th>{tx.dictionary}</th>
                  <th>{tx.location}</th>
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
                      <Link to={`/games/${game.id}`}>{tx.view} →</Link>
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