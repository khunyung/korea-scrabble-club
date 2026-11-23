# 한국 스크래블 클럽 (Korea Scrabble Club)

대전을 중심으로 활동하는 스크래블 커뮤니티, 한국 스크래블 클럽의 웹사이트입니다.

- 사이트 주소: https://korea-scrabble-club.minsueinwkim.workers.dev
- English guide: [README.md](README.md)

React, TypeScript, Vite로 만들었습니다. Cloudflare Workers에 올라가 있으며, GitHub의 `main` 브랜치에 push할 때마다 자동으로 다시 빌드되어 사이트에 반영됩니다.

## 내 컴퓨터에서 사이트 실행하기

Node.js가 필요합니다. Windows PowerShell에서는 `npm` 대신 `npm.cmd`를 사용합니다.

```
npm.cmd install
npm.cmd run dev
```

터미널에 나오는 주소(보통 `http://localhost:5173/`)를 브라우저에서 엽니다. 작업하는 동안 터미널은 켜 두고, 끝나면 `Ctrl+C`로 종료합니다.

배포 전에 프로젝트 전체에 오류가 없는지 확인하려면:

```
npm.cmd run build
```

마지막 줄에 `✓ built in ...`이 나오면 정상입니다.

## 파일 위치

| 경로 | 내용 |
|---|---|
| `src/data/games/` | Macondo나 Woogles에서 받은 경기 파일(`.gcg`) |
| `src/data/games.ts` | 기록실에 올라가는 경기 목록: 날짜, 장소, 플레이어 이름 |
| `src/data/results.ts` | 모든 경기 점수. 회원 페이지 통계에 사용 |
| `src/i18n/en.ts`, `src/i18n/ko.ts` | 사이트의 모든 영어·한국어 문구 |
| `src/pages/` | 페이지별 파일 |
| `src/components/` | 보드, 로고, 엠블럼, 아이콘 |
| `src/App.css` | 전체 스타일 |
| `public/images/hero.jpg` | 홈페이지 사진 |
| `public/og-image.png` | 링크를 공유할 때 보이는 이미지 |

## 경기 점수 추가하기 (회원 페이지 통계)

`src/data/results.ts`를 열고 해당 대전 조합을 찾아, `games` 목록 맨 끝에 한 줄을 추가합니다. 점수 순서는 `players`에 적힌 이름 순서와 같아야 합니다.

```ts
    players: ['Minsue Kim', 'Emanuel Chicoine'],
    games: [
      ...
      [455, 410],
    ],
```

`.gcg` 파일이 있든 없든 모든 경기는 여기에 기록합니다. 새 플레이어가 생기면 상대마다 조합 블록을 하나씩 추가합니다. 이름 철자는 모든 파일에서 똑같아야 합니다.

## 기록실에 경기 추가하기 (보드 리플레이)

1. `.gcg` 파일을 `src/data/games/`에 넣습니다. 예: `jeremy_minsue_1115_g1.gcg`
2. `src/data/games.ts` 위쪽의 다른 import 줄 아래에 한 줄을 추가합니다.
   ```ts
   import jeremyMinsue20261115G1 from './games/jeremy_minsue_1115_g1.gcg?raw'
   ```
3. `gameRecords` 목록에 항목을 추가합니다.
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
   - `id`는 경기마다 달라야 하며, 페이지 주소(`/games/KSC-2026-003`)가 됩니다.
   - `players`: `.gcg` 파일에서 `>` 뒤에 나오는 닉네임 → 사이트에 표시할 이름

기록실은 리플레이만 담당합니다. 통계는 `results.ts`에서 계산하므로 점수도 함께 추가해야 합니다.

## 문구 수정하기

모든 문구는 `src/i18n/en.ts`(영어)와 `src/i18n/ko.ts`(한국어)에 페이지별로 정리되어 있습니다. 따옴표 안의 글자를 고치고 저장하면 됩니다. 두 파일의 항목 이름은 같아야 하며, 하나라도 빠지면 VS Code가 오류로 알려 줍니다.

## 사이트에 반영하기

```
git add .
git commit -m "feat: 변경 내용 설명"
git push
```

Cloudflare가 자동으로 빌드해 약 1분 뒤 사이트에 반영됩니다. 진행 상황은 Cloudflare 대시보드의 Compute → Workers & Pages → `korea-scrabble-club` → Deployments에서 확인할 수 있습니다.

## 문제 해결

| 증상 | 해결 방법 |
|---|---|
| 화면이 하얗게 나옴 | `F12` → Console 확인. "does not provide an export named 'default'"는 페이지 파일이 비어 있거나 저장되지 않았다는 뜻입니다. |
| 브라우저는 정상인데 VS Code에만 빨간 오류가 남음 | `Ctrl+Shift+P` → `Developer: Reload Window` |
| 새 경기가 보이지 않음 | import 줄의 파일 이름이 실제 파일 이름(`.gcg` 포함)과 정확히 같은지 확인 |
| 사이트가 업데이트되지 않음 | Cloudflare 대시보드에서 최근 배포가 실패했는지 확인 |
