// Player profiles.
//
// Ratings are a snapshot from the player's WESPA page (via xerafin) on `asOf`.
// After a tournament, update `rating`, add the event at the TOP of `tournaments`,
// and change `asOf`. Career high and the chart are worked out automatically.
//
// Photos live in public/images/players/<slug>/

export type TournamentResult = {
  date: string // YYYY-MM-DD
  name: string
  division: string
  record: string // wins-losses or wins-losses-byes, as WESPA shows it
  spread: number
  place: number
  endRating: number
  change: number
}

export type PlayerProfile = {
  slug: string // used in the address: /players/<slug>
  name: string // must match the name used in results.ts
  nameKo?: string // shown on the Korean version
  ratingSource: 'WESPA' | 'NASPA'
  ratingId: number
  ratingUrl: string
  asOf: string
  rating: number
  ranking?: { world?: number; country?: number } // leave out until known
  stats: {
    games: number
    wins: number
    losses: number
    draws: number
    averageFor: number
    averageAgainst: number
    highGame: number
  }
  favoriteWord: { word: string; meaning: { en: string; ko: string } }
  bio: { en: string[]; ko: string[] }
  links: { label: string; url: string }[]
  portrait: string
  photos: { src: string; caption?: { en: string; ko: string } }[]
  tournaments: TournamentResult[] // newest first
}

export const profiles: PlayerProfile[] = [
  {
    slug: 'minsue-kim',
    name: 'Minsue Kim',
    nameKo: '김민수',
    ratingSource: 'WESPA',
    ratingId: 2783,
    ratingUrl: 'https://wespa.xerafin.net/player.html?id=2783',
    asOf: '2026-11-24',
    rating: 1626,
    stats: {
      games: 199,
      wins: 92,
      losses: 106,
      draws: 1,
      averageFor: 393.48,
      averageAgainst: 404.02,
      highGame: 690,
    },
    favoriteWord: {
      word: 'SYZYGY',
      meaning: {
        en: 'n. the position of a celestial body when the sun, the earth and that body are in a line',
        ko: '명사. 태양과 지구, 그리고 한 천체가 일직선 위에 놓인 위치',
      },
    },
    bio: {
      en: [
        'Minsue grew up in Thailand from the age of three, and started playing Scrabble competitively as a student at eleven. In Thailand, Scrabble is treated as a competitive sport, and strong players can even earn scholarships to university.',
        'He returned to Korea for college and took a four-year break from the game before coming back to competitive tournaments.',
        'In the summer of 2026 he found out that another competitive player, Emanuel Chicoine, was in Korea, and decided to start a Scrabble community here. That became the Korea Scrabble Club.',
      ],
      ko: [
        '세 살 때부터 태국에서 자랐고, 열한 살에 학생 신분으로 경쟁 스크래블을 시작했어요. 태국에서는 스크래블이 하나의 스포츠로 여겨져서, 실력이 좋으면 대학 입학 장학금까지 받을 수 있어요.',
        '대학 진학을 위해 한국으로 돌아온 뒤 4년 동안 스크래블을 쉬었다가, 다시 대회에 나가기 시작했어요.',
        '2026년 여름, 한국에 또 다른 경쟁 플레이어인 Emanuel Chicoine이 있다는 걸 알게 되면서 한국에 스크래블 커뮤니티를 만들기로 했어요. 그게 지금의 한국 스크래블 클럽이에요.',
      ],
    },
    links: [
      { label: 'YouTube', url: 'https://www.youtube.com/@minsuescrabble' },
      { label: 'Woogles', url: 'https://woogles.io/profile/khunyung2377' },
    ],
    portrait: '/images/players/minsue-kim/portrait.jpg',
    photos: [
      {
        src: '/images/players/minsue-kim/causeway-2026.jpg',
        caption: { en: 'Causeway Challenge 2026, Bangkok', ko: '2026 코즈웨이 챌린지, 방콕' },
      },
      { src: '/images/players/minsue-kim/tournament-hall.jpg' },
      { src: '/images/players/minsue-kim/prize.jpg' },
      {
        src: '/images/players/minsue-kim/thailand-open-2017.jpg',
        caption: { en: 'Thailand Open 2017', ko: '2017 태국 오픈' },
      },
      { src: '/images/players/minsue-kim/early-tournament.jpg' },
    ],
    tournaments: [
      { date: '2026-10-04', name: 'Indonesia Scrabble Open 2026', division: 'ISO', record: '13-11', spread: 75, place: 29, endRating: 1626, change: 21 },
      { date: '2026-06-01', name: 'Causeway Challenge 2026 Bangkok', division: 'C', record: '17-19', spread: -1423, place: 61, endRating: 1605, change: 11 },
      { date: '2026-05-24', name: 'Gamesmith Grand Prix Thailand Championship 2026 Leg 4', division: 'A', record: '5-8-1', spread: -442, place: 32, endRating: 1594, change: -1 },
      { date: '2026-03-22', name: 'Gamesmith Grand Prix Thailand Championship 2026 Leg 2', division: 'A', record: '5-8-1', spread: -509, place: 19, endRating: 1595, change: 15 },
      { date: '2026-02-08', name: 'The Old Siam Invitational 2026', division: 'A', record: '7-8', spread: -366, place: 22, endRating: 1580, change: 15 },
      { date: '2025-10-13', name: 'To Autocar Bangkok International Championship 2025', division: 'A', record: '13-11', spread: 606, place: 44, endRating: 1565, change: 74 },
      { date: '2025-09-05', name: '4th Gateway - KLIA2 Scrabble Masters - Main Event', division: 'A', record: '11-13', spread: -159, place: 42, endRating: 1491, change: 70 },
      { date: '2024-07-03', name: 'Donegal Scrabble Tournament', division: 'A', record: '9-6', spread: 161, place: 8, endRating: 1420, change: 128 },
      { date: '2024-06-02', name: 'German Open Main Event 2024', division: 'A', record: '7-8', spread: 192, place: 17, endRating: 1292, change: 67 },
      { date: '2024-05-31', name: 'German Open - Early Bird', division: 'A', record: '2-2', spread: -72, place: 13, endRating: 1225, change: 46 },
      { date: '2015-11-29', name: '27th BAAC Crossword International Youth Princess Cup', division: 'B', record: '5-14-2', spread: -159, place: 21, endRating: 1179, change: 0 },
    ],
  },
]

export const findProfile = (slug: string | undefined) => profiles.find((p) => p.slug === slug)

export const profileForName = (name: string) => profiles.find((p) => p.name === name)

export const careerHigh = (profile: PlayerProfile) =>
  Math.max(profile.rating, ...profile.tournaments.map((t) => t.endRating))