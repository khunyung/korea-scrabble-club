import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import GameDetailPage from './pages/GameDetailPage'
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

  // Tell the browser which language the page is in (helps Korean text display and screen readers)
  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'ko'
  }, [isEnglish])

  const nav = {
    home: isEnglish ? 'Home' : '홈',
    about: isEnglish ? 'About Us' : '클럽 소개',
    games: isEnglish ? 'Friendly Games' : '친선 경기',
    tournaments: isEnglish ? 'Tournaments' : '대회',
    learn: isEnglish ? 'Learn Scrabble' : '스크래블 배우기',
    members: isEnglish ? 'Members' : '회원',
    footer: isEnglish
      ? 'Bringing Scrabble to Korea, one word at a time.'
      : '한 단어씩, 한국에 스크래블의 즐거움을 전합니다.',
  }

  return (
    <div className="website">
      <ScrollManager />

      <header className="navbar">
        <Link to="/" className="brand">
          <div className="brand-tile">K</div>
          <div className="brand-name">
            <strong>KOREA SCRABBLE</strong>
            <span>CLUB</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>{nav.home}</NavLink>
          <Link to="/#about">{nav.about}</Link>
          <NavLink to="/games">{nav.games}</NavLink>
          <Link to="/#tournaments">{nav.tournaments}</Link>
          <Link to="/#learn">{nav.learn}</Link>
          <Link to="/#members">{nav.members}</Link>
        </nav>

        <button
          className="language-button"
          onClick={() => setLanguage(isEnglish ? 'KO' : 'EN')}
        >
          {isEnglish ? '한국어' : 'English'}
        </button>
      </header>

      <Routes>
        <Route path="/" element={<HomePage isEnglish={isEnglish} />} />
        <Route path="/games" element={<GamesPage isEnglish={isEnglish} />} />
        <Route path="/games/:gameId" element={<GameDetailPage isEnglish={isEnglish} />} />
                <Route path="/games/:gameId" element={<GameDetailPage isEnglish={isEnglish} />} />
        <Route path="*" element={<HomePage isEnglish={isEnglish} />} />
      </Routes>

      <footer className="footer">
        <span>© 2026 Korea Scrabble Club</span>
        <span>{nav.footer}</span>
      </footer>
    </div>
  )
}

export default App