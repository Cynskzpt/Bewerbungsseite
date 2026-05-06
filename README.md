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
