# Bewerbungsseite - Cynthia

React Landingpage fuer deine Lehrstellen-Bewerbung in Informatik Applikationsentwicklung.

## Starten

1. Terminal im Projektordner oeffnen
2. Abhaengigkeiten installieren:

```bash
npm install
```

3. Entwicklungsserver starten:

```bash
npm run dev
```

## Wichtige Funktionen

- Sprache umschalten (Deutsch/Englisch)
- Projekte werden dynamisch von GitHub geladen (nur oeffentliche Repos)
- Skills koennen lokal bearbeitet werden:
  - Bearbeitungsmodus einschalten
  - Neue Skills hinzufuegen
  - Skills per Checkbox zwischen "geplant" und "gelernt" verschieben

## Inhalte anpassen

- Texte fuer DE/EN: `src/data/content.js`
- Skills werden im Browser in `localStorage` gespeichert (Schluessel: `cynthia-portfolio-skills`)
- GitHub-User fuer Projekte: `githubUsername` in `src/data/content.js`

## Build

```bash
npm run build
```

## Vercel deploy

- Production branch should be `main`.
- After `git push`, Vercel should auto-deploy. If the live site is old, open the Vercel project → **Deployments** → **Redeploy** the latest `main` commit (or fix a failed build).
- For edit mode on production, set `VITE_EDIT_PASSWORD` in Vercel → **Settings** → **Environment Variables** (Production), then redeploy.
- Copy `.env.example` to `.env.local` for local development only (never commit `.env.local`).
