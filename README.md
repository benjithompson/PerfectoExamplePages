# PerfectoExamplePages

A tiny static gallery of example HTML pages with an auto-generated looking index (search, grid/list toggle, light/dark theme) driven by a short script in `index.html`.

## Demo / Quick Start
Open `index.html` directly in your browser, or run a super‑simple local server (prevents any future relative path quirks):

```bash
# From repo root (macOS / Linux / WSL)
python3 -m http.server 8000
# then visit: http://localhost:8000/
```

No build step, bundler, or dependencies required.

## Features
- Instant search filter over example pages
- Grid / list view toggle (persisted in `localStorage`)
- Light / dark theme toggle (respects system preference & persists)
- Minimal, accessible, keyboard‑friendly UI

## Structure
```
index.html        # Landing page + script that renders the examples list
examples/
  orderform.html  # Example page (add more here)
```

## Adding a New Example
1. Drop a new `.html` file into the `examples/` folder (e.g. `login.html`).
2. In `index.html`, locate the `const examples = [ ... ]` array and append:
   ```js
   { file: 'login.html', name: 'Login Form' }
   ```
3. Refresh the page. Search & view toggles work automatically.

(If you prefer full auto‑discovery without touching the array, you could replace the static list with a small build script—but the current approach keeps hosting 100% static.)

## Browser Support
Modern evergreen browsers (Chrome, Edge, Firefox, Safari). No special polyfills added.

## Contributing
Small improvements welcome: accessibility tweaks, new example pages, or lightweight refinements. Open a PR.

## Roadmap (Nice-to-Haves)
- Optional build script to auto-scan `examples/`
- Tagging / categorization metadata
- Lightweight visual regression test harness

## License
MIT

---
Feel free to tailor this README further (e.g., add CI badges or screenshots) as the project grows.
