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
  games?: TournamentGame[] // round by round; leave out if unknown
}

export type TournamentGame = {
  round: number
  opponent: string
  opponentRating: number
  score: number
  opponentScore: number
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
  avatar?: string // small square face photo for the Members cards
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
    avatar: '/images/players/minsue-kim/avatar.jpg',
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
      { date: '2026-10-04', name: 'Indonesia Scrabble Open 2026', division: 'ISO', record: '13-11', spread: 75, place: 29, endRating: 1626, change: 21,
        games: [
          { round: 1, opponent: 'Hubert Wee', opponentRating: 2050, score: 291, opponentScore: 501 },
          { round: 2, opponent: 'Kumaila Hakimah', opponentRating: 1510, score: 405, opponentScore: 355 },
          { round: 3, opponent: 'Egy Vedriyanto', opponentRating: 1664, score: 465, opponentScore: 430 },
          { round: 4, opponent: 'Heriyanto Heriyanto', opponentRating: 1520, score: 450, opponentScore: 361 },
          { round: 5, opponent: 'Stella Patricia', opponentRating: 1481, score: 384, opponentScore: 374 },
          { round: 6, opponent: 'Asniar', opponentRating: 1579, score: 427, opponentScore: 458 },
          { round: 7, opponent: 'Fatih Darielma Gaizta', opponentRating: 1487, score: 362, opponentScore: 465 },
          { round: 8, opponent: 'M. Abiyu Maulana', opponentRating: 1662, score: 426, opponentScore: 297 },
          { round: 9, opponent: 'Mohd Ali Ismail', opponentRating: 1658, score: 402, opponentScore: 389 },
          { round: 10, opponent: 'Michael Tang', opponentRating: 1798, score: 411, opponentScore: 460 },
          { round: 11, opponent: 'Fatih Darielma Gaizta', opponentRating: 1487, score: 509, opponentScore: 276 },
          { round: 12, opponent: 'Kumaila Hakimah', opponentRating: 1510, score: 418, opponentScore: 460 },
          { round: 13, opponent: 'Chua Tze Ren', opponentRating: 1564, score: 347, opponentScore: 410 },
          { round: 14, opponent: 'Asniar', opponentRating: 1579, score: 455, opponentScore: 360 },
          { round: 15, opponent: 'M.Sugi Arto', opponentRating: 1530, score: 432, opponentScore: 346 },
          { round: 16, opponent: 'Mukti A Guno', opponentRating: 1746, score: 403, opponentScore: 441 },
          { round: 17, opponent: 'Hyendi Gumilang', opponentRating: 1730, score: 389, opponentScore: 346 },
          { round: 18, opponent: 'Marlon Prudencio', opponentRating: 1891, score: 359, opponentScore: 514 },
          { round: 19, opponent: 'Kumaila Hakimah', opponentRating: 1510, score: 297, opponentScore: 361 },
          { round: 20, opponent: 'Asniar', opponentRating: 1579, score: 444, opponentScore: 378 },
          { round: 21, opponent: 'M. Erzie', opponentRating: 1665, score: 447, opponentScore: 394 },
          { round: 22, opponent: 'Kumaila Hakimah', opponentRating: 1510, score: 350, opponentScore: 397 },
          { round: 23, opponent: 'Michael Tang', opponentRating: 1798, score: 459, opponentScore: 346 },
          { round: 24, opponent: 'Kumaila Hakimah', opponentRating: 1510, score: 329, opponentScore: 467 },
        ],
      },
      { date: '2026-06-01', name: 'Causeway Challenge 2026 Bangkok', division: 'C', record: '17-19', spread: -1423, place: 61, endRating: 1605, change: 11,
        games: [
          { round: 1, opponent: 'Tham Kai Wei', opponentRating: 1629, score: 387, opponentScore: 544 },
          { round: 2, opponent: 'Javed Shamim', opponentRating: 1695, score: 327, opponentScore: 450 },
          { round: 3, opponent: 'Asanka Amarasinghe', opponentRating: 1595, score: 373, opponentScore: 419 },
          { round: 4, opponent: 'Fidelis Olotu', opponentRating: 1699, score: 379, opponentScore: 389 },
          { round: 5, opponent: 'Nathathai Chaowalit', opponentRating: 1618, score: 344, opponentScore: 341 },
          { round: 6, opponent: 'Pannatat Tangprasertsiri', opponentRating: 1607, score: 303, opponentScore: 680 },
          { round: 7, opponent: 'Fred Magu', opponentRating: 1674, score: 494, opponentScore: 424 },
          { round: 8, opponent: 'Carolyn Watt', opponentRating: 1665, score: 327, opponentScore: 556 },
          { round: 9, opponent: 'Sreepathy Iyer', opponentRating: 1681, score: 349, opponentScore: 343 },
          { round: 10, opponent: 'Swagat Nukala', opponentRating: 1629, score: 392, opponentScore: 426 },
          { round: 11, opponent: 'Carolyn Watt', opponentRating: 1665, score: 340, opponentScore: 335 },
          { round: 12, opponent: 'Wenwa Akinyi', opponentRating: 1626, score: 409, opponentScore: 397 },
          { round: 13, opponent: 'Sirinapas Isarankura Na Ayudhya', opponentRating: 1620, score: 254, opponentScore: 483 },
          { round: 14, opponent: 'Shaun Ng Yue Hao', opponentRating: 1658, score: 313, opponentScore: 459 },
          { round: 15, opponent: 'Sreepathy Iyer', opponentRating: 1681, score: 370, opponentScore: 363 },
          { round: 16, opponent: 'Pannatat Tangprasertsiri', opponentRating: 1607, score: 446, opponentScore: 440 },
          { round: 17, opponent: 'Kala Ganesh', opponentRating: 1673, score: 412, opponentScore: 473 },
          { round: 18, opponent: 'Mirza Waseem Baig', opponentRating: 1600, score: 390, opponentScore: 351 },
          { round: 19, opponent: 'Bright Idahosa', opponentRating: 1698, score: 584, opponentScore: 418 },
          { round: 20, opponent: 'Chatchawin Petchlert', opponentRating: 1676, score: 431, opponentScore: 405 },
          { round: 21, opponent: 'Mohd Ali Ismail', opponentRating: 1699, score: 405, opponentScore: 359 },
          { round: 22, opponent: 'Nattakrit Thimsree', opponentRating: 1679, score: 429, opponentScore: 410 },
          { round: 23, opponent: 'Sirinapas Isarankura Na Ayudhya', opponentRating: 1620, score: 319, opponentScore: 478 },
          { round: 24, opponent: 'Rajiv Antao', opponentRating: 1639, score: 487, opponentScore: 339 },
          { round: 25, opponent: 'Tienrawit Pondeela', opponentRating: 1627, score: 357, opponentScore: 528 },
          { round: 26, opponent: 'Vignesh S', opponentRating: 1669, score: 387, opponentScore: 393 },
          { round: 27, opponent: 'Sneha Komal', opponentRating: 1592, score: 469, opponentScore: 383 },
          { round: 28, opponent: 'Asanka Amarasinghe', opponentRating: 1595, score: 406, opponentScore: 382 },
          { round: 29, opponent: 'Tham Kai Wei', opponentRating: 1629, score: 318, opponentScore: 402 },
          { round: 30, opponent: 'Eberechukwu Ajayi', opponentRating: 1694, score: 368, opponentScore: 467 },
          { round: 31, opponent: 'Jonathan Wafula', opponentRating: 1625, score: 408, opponentScore: 488 },
          { round: 32, opponent: 'Neeta Bhatia', opponentRating: 1666, score: 435, opponentScore: 391 },
          { round: 33, opponent: 'Nattakrit Thimsree', opponentRating: 1679, score: 329, opponentScore: 386 },
          { round: 34, opponent: 'Jonathan Wafula', opponentRating: 1625, score: 387, opponentScore: 401 },
          { round: 35, opponent: 'Russell Chong', opponentRating: 1689, score: 454, opponentScore: 412 },
          { round: 36, opponent: 'Sumbul Siddiqui', opponentRating: 1641, score: 360, opponentScore: 450 },
        ],
      },
      { date: '2026-05-24', name: 'Gamesmith Grand Prix Thailand Championship 2026 Leg 4', division: 'A', record: '5-8-1', spread: -442, place: 32, endRating: 1594, change: -1,
        games: [
          { round: 2, opponent: 'Nuttapong Pholthip', opponentRating: 1745, score: 383, opponentScore: 417 },
          { round: 3, opponent: 'Michael Tang', opponentRating: 1792, score: 415, opponentScore: 423 },
          { round: 4, opponent: 'Azmil Aziz', opponentRating: 1781, score: 455, opponentScore: 471 },
          { round: 5, opponent: 'Pimchanok Udomchai', opponentRating: 1480, score: 402, opponentScore: 393 },
          { round: 6, opponent: 'Siramol Saechao', opponentRating: 1654, score: 449, opponentScore: 380 },
          { round: 7, opponent: 'Bundit Kitchulanon', opponentRating: 1505, score: 480, opponentScore: 444 },
          { round: 8, opponent: 'Sirinapas Isarankura Na Ayudhya', opponentRating: 1623, score: 492, opponentScore: 336 },
          { round: 9, opponent: 'Gerry Carter', opponentRating: 1917, score: 431, opponentScore: 416 },
          { round: 10, opponent: 'Michael Tang', opponentRating: 1792, score: 377, opponentScore: 464 },
          { round: 11, opponent: 'Nuttapong Pholthip', opponentRating: 1745, score: 339, opponentScore: 431 },
          { round: 12, opponent: 'Nattapat Nak-in', opponentRating: 1988, score: 323, opponentScore: 509 },
          { round: 13, opponent: 'Nattavee Vatjaranurathorn', opponentRating: 1572, score: 417, opponentScore: 505 },
          { round: 14, opponent: 'Azmil Aziz', opponentRating: 1781, score: 323, opponentScore: 539 },
        ],
      },
      { date: '2026-03-22', name: 'Gamesmith Grand Prix Thailand Championship 2026 Leg 2', division: 'A', record: '5-8-1', spread: -509, place: 19, endRating: 1595, change: 15,
        games: [
          { round: 1, opponent: 'Nopparuj Thipkaew', opponentRating: 1939, score: 416, opponentScore: 390 },
          { round: 2, opponent: 'Waraluck Vonginta', opponentRating: 1443, score: 352, opponentScore: 323 },
          { round: 3, opponent: 'Sanhanat Klanying', opponentRating: 1802, score: 469, opponentScore: 449 },
          { round: 4, opponent: 'Chaiyottha Manachaisit', opponentRating: 1992, score: 407, opponentScore: 452 },
          { round: 5, opponent: 'Natthakorn Siriwatthanaphongsa', opponentRating: 1893, score: 352, opponentScore: 470 },
          { round: 6, opponent: 'Thacha Koowirat', opponentRating: 2047, score: 396, opponentScore: 435 },
          { round: 7, opponent: 'Natamon Sathianbut', opponentRating: 1789, score: 428, opponentScore: 499 },
          { round: 8, opponent: 'Napat Vatjaranurathorn', opponentRating: 2026, score: 345, opponentScore: 528 },
          { round: 9, opponent: 'Watcharawit Aengchuan', opponentRating: 1570, score: 438, opponentScore: 397 },
          { round: 10, opponent: 'Akegapun Erbprasartsook', opponentRating: 1971, score: 343, opponentScore: 564 },
          { round: 11, opponent: 'Sirinapas Isarankura Na Ayudhya', opponentRating: 1596, score: 379, opponentScore: 406 },
          { round: 12, opponent: 'Watcharawit Aengchuan', opponentRating: 1570, score: 397, opponentScore: 403 },
          { round: 14, opponent: 'Graham Buckingham', opponentRating: 1600, score: 448, opponentScore: 363 },
        ],
      },
      { date: '2026-02-08', name: 'The Old Siam Invitational 2026', division: 'A', record: '7-8', spread: -366, place: 22, endRating: 1580, change: 15,
        games: [
          { round: 1, opponent: 'Liew Kian Boon', opponentRating: 1936, score: 358, opponentScore: 473 },
          { round: 2, opponent: 'Pimchanok Udomchai', opponentRating: 1447, score: 565, opponentScore: 287 },
          { round: 3, opponent: 'Taweesak Haojarern', opponentRating: 1575, score: 403, opponentScore: 446 },
          { round: 4, opponent: 'Wutthiphong Chaichot', opponentRating: 1576, score: 412, opponentScore: 368 },
          { round: 5, opponent: 'Apirat Choomai', opponentRating: 1910, score: 331, opponentScore: 604 },
          { round: 6, opponent: 'Gerry Carter', opponentRating: 1943, score: 508, opponentScore: 375 },
          { round: 7, opponent: 'Asawanon Boontamma', opponentRating: 1510, score: 408, opponentScore: 386 },
          { round: 8, opponent: 'Soramet Mettaviharee', opponentRating: 1859, score: 349, opponentScore: 484 },
          { round: 9, opponent: 'Panthita Chueadee', opponentRating: 1643, score: 311, opponentScore: 486 },
          { round: 10, opponent: 'Methawong Methanuwat', opponentRating: 1351, score: 383, opponentScore: 347 },
          { round: 11, opponent: 'Pesol Kosalakood', opponentRating: 1854, score: 291, opponentScore: 455 },
          { round: 12, opponent: 'Suphakit Thatsanaphan', opponentRating: 1525, score: 363, opponentScore: 468 },
          { round: 13, opponent: 'Wutthiphong Chaichot', opponentRating: 1576, score: 483, opponentScore: 329 },
          { round: 14, opponent: 'Supitchaya Tantisiriwat', opponentRating: 1618, score: 355, opponentScore: 390 },
          { round: 15, opponent: 'Wutthiphong Chaichot', opponentRating: 1576, score: 407, opponentScore: 395 },
        ],
      },
      { date: '2025-10-13', name: 'To Autocar Bangkok International Championship 2025', division: 'A', record: '13-11', spread: 606, place: 44, endRating: 1565, change: 74,
        games: [
          { round: 1, opponent: 'Xin Yi Wha', opponentRating: 1433, score: 389, opponentScore: 287 },
          { round: 2, opponent: 'Natthakorn Siriwatthanaphongsa', opponentRating: 1840, score: 349, opponentScore: 372 },
          { round: 3, opponent: 'Chollapat Itthiaree', opponentRating: 2031, score: 414, opponentScore: 512 },
          { round: 4, opponent: 'Supitchaya Tantisiriwat', opponentRating: 1630, score: 395, opponentScore: 486 },
          { round: 5, opponent: 'Kittaporn Suebnuch', opponentRating: 1166, score: 420, opponentScore: 364 },
          { round: 6, opponent: 'Tearntrong Kongchan', opponentRating: 1280, score: 690, opponentScore: 84 },
          { round: 7, opponent: 'Padao Thanawongsuwan', opponentRating: 1479, score: 424, opponentScore: 302 },
          { round: 8, opponent: 'Suphakit Thatsanaphan', opponentRating: 1520, score: 340, opponentScore: 392 },
          { round: 9, opponent: 'Natchapol Bootang', opponentRating: 1531, score: 333, opponentScore: 400 },
          { round: 10, opponent: 'Graham Buckingham', opponentRating: 1593, score: 446, opponentScore: 388 },
          { round: 11, opponent: 'Supitchaya Tantisiriwat', opponentRating: 1630, score: 447, opponentScore: 415 },
          { round: 12, opponent: 'Kritsada Sunthornwutthikrai', opponentRating: 1746, score: 470, opponentScore: 428 },
          { round: 13, opponent: 'Tony Sim', opponentRating: 1876, score: 410, opponentScore: 336 },
          { round: 14, opponent: 'Rajeev Menon', opponentRating: 1736, score: 370, opponentScore: 396 },
          { round: 15, opponent: 'Natchaya Sritharo', opponentRating: 1778, score: 483, opponentScore: 419 },
          { round: 16, opponent: 'Sanjoy Gupta', opponentRating: 1789, score: 225, opponentScore: 562 },
          { round: 17, opponent: 'Suthasinee Dermlim', opponentRating: 1406, score: 451, opponentScore: 322 },
          { round: 18, opponent: 'Pesol Kosalakood', opponentRating: 1861, score: 414, opponentScore: 444 },
          { round: 19, opponent: 'Teetouch Chansiri', opponentRating: 1438, score: 424, opponentScore: 315 },
          { round: 20, opponent: 'Chayapol Inloi', opponentRating: 1718, score: 419, opponentScore: 469 },
          { round: 21, opponent: 'Azmil Aziz', opponentRating: 1713, score: 375, opponentScore: 469 },
          { round: 22, opponent: 'Sirinapas Isarankura Na Ayudhya', opponentRating: 1657, score: 499, opponentScore: 303 },
          { round: 23, opponent: 'Leon Tan Zheng Han', opponentRating: 1784, score: 462, opponentScore: 371 },
          { round: 24, opponent: 'Taewan Sutthasin', opponentRating: 1898, score: 261, opponentScore: 468 },
        ],
      },
      { date: '2025-09-05', name: '4th Gateway - KLIA2 Scrabble Masters - Main Event', division: 'A', record: '11-13', spread: -159, place: 42, endRating: 1491, change: 70,
        games: [
          { round: 1, opponent: 'Vannitha Balasingam', opponentRating: 1960, score: 248, opponentScore: 612 },
          { round: 2, opponent: 'Hairani Safiee Yani', opponentRating: 1090, score: 475, opponentScore: 305 },
          { round: 3, opponent: 'Mirza Waseem Baig', opponentRating: 1515, score: 404, opponentScore: 328 },
          { round: 4, opponent: 'Ben Filio', opponentRating: 1529, score: 373, opponentScore: 421 },
          { round: 5, opponent: 'Ahmed Salman', opponentRating: 1792, score: 281, opponentScore: 444 },
          { round: 6, opponent: 'Chua Tze Ren', opponentRating: 1571, score: 274, opponentScore: 394 },
          { round: 7, opponent: 'Tan Jin Chor', opponentRating: 1702, score: 405, opponentScore: 423 },
          { round: 8, opponent: 'Cecilia Khoo', opponentRating: 1379, score: 436, opponentScore: 368 },
          { round: 9, opponent: 'Raiyyan Sumair', opponentRating: 1604, score: 424, opponentScore: 351 },
          { round: 10, opponent: 'Seshi Ramanathan', opponentRating: 1553, score: 390, opponentScore: 551 },
          { round: 11, opponent: 'Ibrahim Mansoor', opponentRating: 1612, score: 356, opponentScore: 409 },
          { round: 12, opponent: 'Cecilia Khoo', opponentRating: 1379, score: 483, opponentScore: 292 },
          { round: 13, opponent: 'Nattakrit Thimsree', opponentRating: 1576, score: 367, opponentScore: 392 },
          { round: 14, opponent: 'Sreepathy Iyer', opponentRating: 1716, score: 310, opponentScore: 394 },
          { round: 15, opponent: 'Cheah Kim Tarh', opponentRating: 1340, score: 469, opponentScore: 264 },
          { round: 16, opponent: 'Dzariff Izzat', opponentRating: 1598, score: 437, opponentScore: 342 },
          { round: 17, opponent: 'Amanda Mak', opponentRating: 1939, score: 371, opponentScore: 392 },
          { round: 18, opponent: 'Jerald Ang Zhao Yan', opponentRating: 1506, score: 305, opponentScore: 473 },
          { round: 19, opponent: 'Seshi Ramanathan', opponentRating: 1553, score: 452, opponentScore: 421 },
          { round: 20, opponent: 'Raiyyan Sumair', opponentRating: 1604, score: 367, opponentScore: 430 },
          { round: 21, opponent: 'Dzariff Izzat', opponentRating: 1598, score: 396, opponentScore: 370 },
          { round: 22, opponent: 'Mirza Waseem Baig', opponentRating: 1515, score: 450, opponentScore: 298 },
          { round: 23, opponent: 'Shaun Ng Yue Hao', opponentRating: 1755, score: 428, opponentScore: 342 },
          { round: 24, opponent: 'Ben Filio', opponentRating: 1529, score: 410, opponentScore: 454 },
        ],
      },
      { date: '2024-07-03', name: 'Donegal Scrabble Tournament', division: 'A', record: '9-6', spread: 161, place: 8, endRating: 1420, change: 128,
        games: [
          { round: 1, opponent: 'Gary Birch', opponentRating: 1711, score: 382, opponentScore: 364 },
          { round: 2, opponent: 'John Kennedy', opponentRating: 1510, score: 422, opponentScore: 414 },
          { round: 3, opponent: 'Jennie Frizelle', opponentRating: 1374, score: 379, opponentScore: 397 },
          { round: 4, opponent: 'Amy Byrne', opponentRating: 1573, score: 320, opponentScore: 503 },
          { round: 5, opponent: 'Howard Rayner', opponentRating: 1607, score: 347, opponentScore: 346 },
          { round: 6, opponent: 'Marie Ryan', opponentRating: 1545, score: 422, opponentScore: 348 },
          { round: 7, opponent: 'Chris Broderick', opponentRating: 1693, score: 327, opponentScore: 465 },
          { round: 8, opponent: 'Eileen Meghen', opponentRating: 1420, score: 413, opponentScore: 282 },
          { round: 9, opponent: 'Kieran Brosnan', opponentRating: 1347, score: 476, opponentScore: 278 },
          { round: 10, opponent: 'Anne Creaven', opponentRating: 1361, score: 345, opponentScore: 372 },
          { round: 11, opponent: 'Pauline Weatherhead', opponentRating: 1602, score: 415, opponentScore: 358 },
          { round: 12, opponent: 'Kay McColgan', opponentRating: 1710, score: 385, opponentScore: 460 },
          { round: 13, opponent: 'Oisin Dilger', opponentRating: 1740, score: 304, opponentScore: 420 },
          { round: 14, opponent: 'Ger Hore', opponentRating: 1398, score: 416, opponentScore: 233 },
          { round: 15, opponent: 'Mary Doyle', opponentRating: 1455, score: 389, opponentScore: 341 },
        ],
      },
      { date: '2024-06-02', name: 'German Open Main Event 2024', division: 'A', record: '7-8', spread: 192, place: 17, endRating: 1292, change: 67,
        games: [
          { round: 1, opponent: 'Alan Abela', opponentRating: 1570, score: 313, opponentScore: 329 },
          { round: 2, opponent: 'Chris Vicary', opponentRating: 1807, score: 475, opponentScore: 365 },
          { round: 3, opponent: 'Anand Buddhdev', opponentRating: 1802, score: 288, opponentScore: 568 },
          { round: 4, opponent: 'Marlon Prudencio', opponentRating: 1908, score: 347, opponentScore: 455 },
          { round: 5, opponent: 'Eric Platford', opponentRating: 1188, score: 319, opponentScore: 344 },
          { round: 6, opponent: 'Peggy Fehily', opponentRating: 1302, score: 459, opponentScore: 320 },
          { round: 7, opponent: 'Luis Parreira', opponentRating: 1136, score: 464, opponentScore: 295 },
          { round: 8, opponent: 'Lisa Atkins', opponentRating: 1135, score: 403, opponentScore: 382 },
          { round: 9, opponent: 'Mags Treanor', opponentRating: 1266, score: 360, opponentScore: 452 },
          { round: 10, opponent: 'Darius Bartlett', opponentRating: 1409, score: 387, opponentScore: 389 },
          { round: 11, opponent: 'Sally Martin', opponentRating: 1743, score: 393, opponentScore: 403 },
          { round: 12, opponent: 'Adebayo Sunmade Fawe', opponentRating: 1229, score: 418, opponentScore: 356 },
          { round: 13, opponent: 'Seyi Ejemai', opponentRating: 1193, score: 509, opponentScore: 261 },
          { round: 14, opponent: 'Darius Bartlett', opponentRating: 1409, score: 342, opponentScore: 372 },
          { round: 15, opponent: 'Jennie Frizelle', opponentRating: 1389, score: 371, opponentScore: 365 },
        ],
      },
      { date: '2024-05-31', name: 'German Open - Early Bird', division: 'A', record: '2-2', spread: -72, place: 13, endRating: 1225, change: 46,
        games: [
          { round: 1, opponent: 'Matthew Rutherford', opponentRating: 800, score: 446, opponentScore: 326 },
          { round: 2, opponent: 'Seyi Ejemai', opponentRating: 1238, score: 388, opponentScore: 232 },
          { round: 3, opponent: 'Anand Buddhdev', opponentRating: 1792, score: 346, opponentScore: 523 },
          { round: 4, opponent: 'Chris Vicary', opponentRating: 1810, score: 295, opponentScore: 466 },
        ],
      },
      { date: '2015-11-29', name: '27th BAAC Crossword International Youth Princess Cup', division: 'B', record: '5-14-2', spread: -159, place: 21, endRating: 1179, change: 0,
        games: [
          { round: 1, opponent: 'Vo Thanh Hai Au', opponentRating: 800, score: 548, opponentScore: 142 },
          { round: 2, opponent: 'Visarut Ariyakajorn', opponentRating: 1610, score: 407, opponentScore: 464 },
          { round: 3, opponent: 'Onwara Visavakul', opponentRating: 1401, score: 383, opponentScore: 383 },
          { round: 4, opponent: 'Yong Jian Rong', opponentRating: 1756, score: 378, opponentScore: 478 },
          { round: 5, opponent: 'Jeremy Khoo', opponentRating: 1733, score: 416, opponentScore: 445 },
          { round: 6, opponent: 'Natchaya Sritharo', opponentRating: 1580, score: 316, opponentScore: 404 },
          { round: 7, opponent: 'Jakkapan Rojphongkas', opponentRating: 1315, score: 422, opponentScore: 296 },
          { round: 8, opponent: 'Siriwat Suttapintu', opponentRating: 1561, score: 328, opponentScore: 403 },
          { round: 9, opponent: 'Sompong Phosai', opponentRating: 1628, score: 291, opponentScore: 432 },
          { round: 10, opponent: 'Jiradet Lekhaworakul', opponentRating: 1462, score: 374, opponentScore: 414 },
          { round: 11, opponent: 'Jakkapan Rojphongkas', opponentRating: 1315, score: 328, opponentScore: 417 },
          { round: 12, opponent: 'Hathaiphat Suphattarathorn', opponentRating: 1541, score: 363, opponentScore: 379 },
          { round: 13, opponent: 'Nattakit Charee', opponentRating: 1333, score: 362, opponentScore: 421 },
          { round: 15, opponent: 'Nuttapong Jaksan', opponentRating: 1323, score: 470, opponentScore: 348 },
          { round: 16, opponent: 'Nuttapong Jaksan', opponentRating: 1323, score: 336, opponentScore: 369 },
          { round: 17, opponent: 'Nuttapong Jaksan', opponentRating: 1323, score: 309, opponentScore: 395 },
        ],
      },
    ],
  },
]

// Photos for the Members cards of players who don't have a full profile yet.
// Put a square photo in public/images/players/ and add a line, e.g.
// 'Emanuel Chicoine': '/images/players/emanuel-chicoine.jpg',
export const cardPhotos: Record<string, string> = {}

export const cardPhotoFor = (name: string) => {
  const profile = profileForName(name)
  return profile?.avatar ?? profile?.portrait ?? cardPhotos[name]
}

export const findProfile = (slug: string | undefined) => profiles.find((p) => p.slug === slug)

export const profileForName = (name: string) => profiles.find((p) => p.name === name)

export const careerHigh = (profile: PlayerProfile) =>
  Math.max(profile.rating, ...profile.tournaments.map((t) => t.endRating))