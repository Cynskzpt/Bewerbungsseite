---
name: verify-site-before-handoff
description: >-
  Verifies web apps (Vite/React and similar) before handing work to the user: run
  lint and build, fix runtime crashes, confirm the dev page renders content. Use
  when finishing frontend tasks, when the user reports a blank or broken site, or
  before saying a site is ready to view.
---

# Verify Site Before Handoff

Always run this checklist **before** telling the user a site is ready. Do not skip because a change "looks small."

## Required commands

From the project root:

```bash
npm run lint
npm run build
```

If the project defines `npm run verify`, use that instead (it should run lint + build).

- If lint or build fails, fix errors first.
- If commands cannot run, say so and explain what you checked manually.

## Runtime checks

1. Confirm `index.html` has `<div id="root">` and the correct entry script.
2. Confirm `main.jsx` / `main.tsx` mounts the app into `#root`.
3. Scan recent edits for missing imports, undefined `content` keys, and invalid `localStorage` data that can crash `.map()` on non-arrays.
4. For React apps: prefer an `ErrorBoundary` so one component error does not yield a blank page.

## Blank page triage

| Symptom | Likely cause | Fix |
|--------|----------------|-----|
| White screen, no UI | Uncaught render error | Read terminal/browser console; harden data loaders; add ErrorBoundary |
| "Not configured" for env features | Empty or unsaved `.env.local` | Ensure file is saved on disk; restart dev server |
| Broken images only | Missing `public/` assets | Restore files or update paths |
| Old Vite template showing | Wrong entry or stale `dist` | Rebuild; open dev server URL |

## Handoff message

Only after checks pass, tell the user:

- Dev server URL (e.g. `http://localhost:5173/`)
- Whether they must restart the dev server (env or config changes)
- Any manual step they must do (save `.env.local`, hard refresh)

Never claim the site works without running lint/build or confirming no obvious crash paths in code you changed.
