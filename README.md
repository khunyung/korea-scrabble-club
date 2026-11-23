# Korea Scrabble Club

The website of the Korea Scrabble Club, a Scrabble community based in Daejeon, South Korea.

- Live site: https://korea-scrabble-club.minsueinwkim.workers.dev
- 한국어 안내: [README.ko.md](README.ko.md)

Built with React, TypeScript and Vite. Hosted on Cloudflare Workers, which rebuilds the site automatically on every push to the `main` branch on GitHub.

## Run the site on your computer

Requires Node.js. On Windows PowerShell, use `npm.cmd` instead of `npm`.

```
npm.cmd install
npm.cmd run dev
```

Open the address it prints (usually `http://localhost:5173/`). Keep the terminal open while you work; stop it with `Ctrl+C`.

To check the whole project for errors before publishing:

```
npm.cmd run build
```

It should end with `✓ built in ...`.

## Where things are

| Path | What it is |
|---|---|
| `src/data/games/` | Game files (`.gcg`) from Macondo or Woogles |
| `src/data/games.ts` | List of archived games: date, location, player names |
| `src/data/results.ts` | Every game score, used for the Members page stats |
| `src/i18n/en.ts`, `src/i18n/ko.ts` | All English and Korean text on the site |
| `src/pages/` | One file per page |
| `src/components/` | Board, logo, seal and icons |
| `src/App.css` | All styles |
| `public/images/hero.jpg` | Homepage photo |
| `public/og-image.png` | Image shown when the link is shared |

## Add a game score (Members page stats)

Open `src/data/results.ts`, find the pairing, and add a line at the end of its `games` list. Scores go in the same order as the names in `players`.

```ts
    players: ['Minsue Kim', 'Emanuel Chicoine'],
    games: [
      ...
      [455, 410],
    ],
```

Every game goes here, whether or not it has a `.gcg` file. For a new player, add one new pairing block per opponent. Spell names exactly the same everywhere.

## Add a game to the archive (board replay)

1. Put the `.gcg` file in `src/data/games/`, for example `jeremy_minsue_1115_g1.gcg`.
2. In `src/data/games.ts`, add an import line under the others:
   ```ts
   import jeremyMinsue20261115G1 from './games/jeremy_minsue_1115_g1.gcg?raw'
   ```
3. Add an entry to `gameRecords`:
   ```ts
     {
       id: 'KSC-2026-003',
       date: '2026-11-15',
       location: { en: 'In person', ko: '대면 경기' },
       type: 'friendly',
       players: {
         jeremy: 'Jeremy J. Goard',
         minsue: 'Minsue Kim',
       },
       gcg: jeremyMinsue20261115G1,
     },
   ```
   - `id` must be unique; it becomes the page address `/games/KSC-2026-003`.
   - `players`: the nickname after `>` in the `.gcg` file → the name shown on the site.

The archive only provides the replay. The stats come from `results.ts`, so add the score there too.

## Change text

All wording lives in `src/i18n/en.ts` (English) and `src/i18n/ko.ts` (Korean), grouped by page. Edit the text between the quotes and save. Both files must have the same keys; VS Code shows an error if one is missing.

## Publish

```
git add .
git commit -m "feat: describe the change"
git push
```

Cloudflare builds and publishes automatically. The live site updates about a minute later. Check progress in the Cloudflare dashboard: Compute → Workers & Pages → `korea-scrabble-club` → Deployments.

## Troubleshooting

| Problem | Fix |
|---|---|
| White screen | Press `F12` → Console. "does not provide an export named 'default'" means a page file is empty or unsaved. |
| Red errors in VS Code that the browser doesn't show | `Ctrl+Shift+P` → `Developer: Reload Window` |
| A new game doesn't appear | Check the file name in the import line matches the file exactly, including `.gcg` |
| Live site not updated | Check the latest deployment in the Cloudflare dashboard for a failed build |