# PerfectoExamplePages

Static gallery of demo/test webpages hosted on GitHub Pages (`benjithompson/PerfectoExamplePages`, branch `main`). Used as targets for Perfecto Functional Scriptless/AI testing, BlazeMeter load tests, and Playwright demos.

**No build step. No bundler. No framework install.** Everything is plain HTML/CSS/JS served as-is.

## Layout

```
index.html              # Gallery landing page (search, grid/list toggle, theme picker)
theme.js                # Global theme utility (light/dark + theme-file switching)
themes/default.css      # CSS custom-property tokens (also nord.css)
examples/
  examples-list.js      # ← THE registry. window.EXAMPLE_GROUPS drives index.html
  <example>/            # One self-contained folder per example
tests/                  # Playwright specs (optional, not every example has one)
jmeter/                 # JMeter .jmx test plans for perf examples
```

## Adding a new example

1. `mkdir examples/<name>/` — everything for the example lives here (HTML, CSS, JS, assets, sub-pages). Keep it self-contained; do not add files to the repo root.
2. Write `examples/<name>/<name>.html` (or `index.html` for multi-page examples).
3. Register it in `examples/examples-list.js` under the right group:
   ```js
   { file: '<name>/<name>.html', name: 'Display Name' }
   ```
   Paths are relative to `examples/`. An absolute `http(s)://` URL makes it an external link (auto-badged, opens in new tab).
4. Existing groups: `Perfecto`, `Virtual Services`, `Performance`, `External Pages`. Add a new group object only if none fit.

Nothing else needs editing — `index.html` renders the list, search, and cards automatically.

## Page conventions

Standard example page head/foot (see `examples/orderform/orderform.html`, `examples/chess/chess.html`):

```html
<html lang="en" data-theme="light">
...
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../themes/default.css">
<style>/* page CSS inlined here */</style>
...
<a href="../../index.html" class="back-link">← Index</a>   <!-- back link in header -->
<script src="../../theme.js" defer></script>               <!-- last script in body -->
```

- Depth matters: paths are `../../` from `examples/<name>/<file>.html`. `theme.js` also detects `/examples/` in the pathname to resolve theme CSS.
- Style with theme variables (`var(--color-bg)`, `var(--color-text)`, `var(--color-accent)`, `var(--radius)`, `var(--shadow-md)`, `var(--transition)`) — never hardcode colors. Full token list in `themes/README.md`.
- Page-specific accent overrides go in a `:root { --color-accent: ... }` block after the theme link (see `store.html`).
- Prefer inlining CSS/JS in the HTML file. Split into sibling files only when the example is large (see `insurance/`).
- To avoid a light-mode flash, add the early theme-read snippet from `examples/oauth2-pkce/index.html`.

## Deviations that are fine

- `charts.html` uses its own hardcoded palette, no theme tokens.
- `insurance/` is a React example: React + Babel from CDN, `<script type="text/babel">` components in `components/`, shared state in `data/`, and its own `styles.css` instead of the global theme. Also wired to Datadog RUM.
- `tn3270/` is one large self-contained file with no theme integration.
- `college/` is a fictional community-college site, so it uses its own brand design system (`styles.css`) instead of the global theme, and shares header/nav/footer across its six pages by injecting them from `site.js` (`COLLEGE.renderHeader()` / `COLLEGE.renderFooter()`). Demo credentials are printed on its login page on purpose; keep the institution, people, and records fictional.

Follow the standard conventions for new examples unless there's a reason not to.

## Cross-page state

Multi-page flows pass data via `sessionStorage`/`localStorage` (e.g. `w2.html` → `w2summary.html`, `orderform.html` → `order-summary.html`). Summary pages redirect back to the form if no data is present.

## Running locally

```bash
python3 -m http.server 8000    # then http://localhost:8000/
```

Use a server rather than `file://` — relative theme paths and fetches depend on it.

## Tests

Playwright specs in `tests/` (`npm test`, `npm run test:headed`, `npm run report`). `playwright.config.js` auto-starts the Python server on port 8000; `baseURL` is `http://localhost:8000`, so specs use `page.goto('/examples/w2/w2.html')`. Only `w2` and `store` have specs; adding one for a new example is optional.

## Related docs

- `themes/README.md` — theme tokens, creating a new theme
- `tests/README.md` — Playwright test coverage/usage
- `JMETER_SETUP.md`, `SUPABASE_SETUP.md`, `BLAZEMETER_PROXY_README.md` — perf-example infrastructure
