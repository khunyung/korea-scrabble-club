import { useEffect, useState } from 'react'
import { en, ko } from './i18n'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router'
import ClubLogo from './components/ClubLogo'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import GameDetailPage from './pages/GameDetailPage'
import PlayersPage from './pages/PlayersPage'
import ProfilePage from './pages/ProfilePage'
import LearnPage from './pages/LearnPage'
import AboutPage from './pages/AboutPage'
import './App.css'

// Scrolls to a section (e.g. /#about) or to the top when the page changes
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1))
      if (element) {
        element.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  const [language, setLanguage] = useState<'EN' | 'KO'>('EN')

  const isEnglish = language === 'EN'
  const tx = (isEnglish ? en : ko).app

  // Tell the browser which language the page is in (helps Korean text display and screen readers)
  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'ko'
  }, [isEnglish])


  return (
    <div className="website">
      <ScrollManager />

      <header className="navbar">
        <Link to="/" className="brand" aria-label="Korea Scrabble Club home">
          <ClubLogo />
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>{tx.home}</NavLink>
          <NavLink to="/about">{tx.about}</NavLink>
          <NavLink to="/games">{tx.games}</NavLink>
          <Link to="/#tournaments">{tx.tournaments}</Link>
          <NavLink to="/learn">{tx.learn}</NavLink>
          <NavLink to="/players">{tx.members}</NavLink>
        </nav>

        <button
          className="language-button"
          onClick={() => setLanguage(isEnglish ? 'KO' : 'EN')}
        >
          {tx.languageButton}
        </button>
      </header>

      <Routes>
        <Route path="/" element={<HomePage isEnglish={isEnglish} />} />
        <Route path="/games" element={<GamesPage isEnglish={isEnglish} />} />
        <Route path="/games/:gameId" element={<GameDetailPage isEnglish={isEnglish} />} />
        <Route path="/players" element={<PlayersPage isEnglish={isEnglish} />} />
        <Route path="/players/:slug" element={<ProfilePage isEnglish={isEnglish} />} />
        <Route path="/learn" element={<LearnPage isEnglish={isEnglish} />} />
        <Route path="/about" element={<AboutPage isEnglish={isEnglish} />} />
        <Route path="*" element={<HomePage isEnglish={isEnglish} />} />
      </Routes>

      <footer className="footer">
        <span>© 2026 Korea Scrabble Club</span>
        <span>{tx.footer}</span>
      </footer>
    </div>
  )
}

export default App