# Steve's Pool Room

A private, mobile-friendly pool game tracker built with Next.js, TypeScript, and Tailwind CSS. Track up to ten players, play days, individual games, standings, streaks, and head-to-head rivalries. All information stays in your browser's local storage—there is no account, server database, or external API.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Add at least two players, choose **New Play Day**, select the participants, and use **Add First Game**. After a result is saved, **Add Next Game** keeps the same day open, reuses the last matchup and game type, and advances the game number.

## Data and backups

Use **Data** in the navigation to export a complete JSON backup, export game results as CSV, restore a JSON backup, or reset the browser. Importing or resetting requires confirmation. Browser storage is specific to the browser and device, so export JSON regularly if the records matter to you.

## Production build

```bash
npm run build
npm start
```
