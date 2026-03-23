# Research Lab TV Dashboard

Fullscreen React dashboard for a lab TV display with:

- D-Day conference deadline tracker (color-coded urgency)
- Real-time world clocks (Sydney, Rio de Janeiro, AoE)
- Dark, TV-friendly layout with large typography
- Mock-data-first structure, ready for future API integration

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

## Deploy To GitHub Pages

This project is configured to auto-deploy with GitHub Actions.

1. Push this repository to GitHub.
2. Make sure your default branch is `main`.
3. In GitHub, open `Settings > Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push to `main` (or run the action manually in `Actions` tab).

The site URL will be:

```text
https://<your-github-username>.github.io/<repository-name>/
```

## Bash Scripts (Recommended for Another PC)

Run these from the project root:

```bash
bash scripts/setup.sh
bash scripts/dev.sh
```

Production:

```bash
bash scripts/build.sh
bash scripts/preview.sh
```

Optional custom ports:

```bash
bash scripts/dev.sh 3000
bash scripts/preview.sh 8080
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```text
data/
  conferenceDeadlines.json
  index.ts
  worldClocks.ts
src/
  App.tsx
  index.css
  main.tsx
  components/
    ClockCard.tsx
    DdayItem.tsx
    DdayTracker.tsx
    Panel.tsx
    WorldClock.tsx
  hooks/
    useNow.ts
  utils/
    date.ts
    time.ts
  types/
    dashboard.ts
```

## Notes for Extension

- Replace `data/conferenceDeadlines.json` with API data once backend is ready.
- Keep data transformation logic in `src/utils/` for easy migration.
- UI components in `src/components/` are reusable and isolated from data source details.
