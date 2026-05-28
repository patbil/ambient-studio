# Ambient Studio

> Portfolio and marketing site for **Ambient Studio** — outdoor, studio, wedding
> and event photography by Justyna Wachnicka, in Radom, Warsaw and across Poland.

A lightweight, content‑driven single‑page site built **without a framework or
bundler**: semantic HTML, SCSS compiled to CSS, and vanilla JavaScript ES
modules. All copy and imagery live in JSON collections, so the content can be
updated without touching the code. Live at **[ambient-studio.pl](https://ambient-studio.pl)**.

## Features

- **Bilingual UI (Polish / English)** with automatic browser‑language detection
  and a manual switch.
- **Light & dark theme** that follows the operating system and remembers the
  visitor's choice.
- **Filterable masonry portfolio** with a keyboard‑navigable lightbox.
- **Content‑driven** — text, images, packages and reviews are edited in JSON,
  never in markup.
- **No build server** — deploys to static hosting as‑is.

## Tech stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Markup     | Semantic HTML5                                                    |
| Styles     | SCSS (7‑1 architecture) → CSS, compiled with Dart Sass            |
| Behaviour  | Vanilla JavaScript — native ES modules, no bundler                |
| Content    | JSON collections loaded at runtime via `fetch`                    |
| Typography | Google Fonts — Playfair Display + DM Sans                         |
| Hosting    | GitHub Pages (static)                                             |

## Project structure

```
.
├── index.html        # page shell + static, translatable markup
├── css/main.css      # compiled stylesheet (generated — do not edit by hand)
├── scss/             # source styles, 7-1 architecture
│   ├── abstracts/    # tokens, functions, mixins
│   ├── base/         # reset, typography, animations
│   ├── components/   # buttons, loader, lightbox, forms, toast, controls
│   ├── layout/       # nav, footer, section shell
│   ├── pages/        # one partial per page section
│   └── themes/       # light/dark custom-property sets
├── js/
│   ├── config.js     # single source of configuration
│   ├── index.js      # bootstrap / module orchestration
│   ├── modules/      # i18n, theme, render, portfolio, lightbox, nav, form, …
│   └── utils/        # shared helpers (dom, storage, media)
├── data/             # structural JSON: image URLs, flags, contact details
└── i18n/             # translation dictionaries: pl.json, en.json
```

## Running locally

The page fetches its JSON at runtime, so it must be served over HTTP — opening
`index.html` as a `file://` URL will not work.

```bash
# Serve the project root with any static server:
python -m http.server 8000        # → http://localhost:8000
```

Styles are authored in `scss/` and compiled to `css/main.css` with Dart Sass,
run on demand via `npx` (no `package.json` or `node_modules` required):

```bash
# One-off build:
npx sass scss/main.scss css/main.css --style=compressed --no-source-map

# Rebuild on change:
npx sass --watch scss/main.scss css/main.css
```

> `css/main.css` is a build artefact. Recompile it before committing — GitHub
> Pages serves the committed file and does not build SCSS.

## Configuration

All settings live in **`js/config.js`**:

- **`i18n`** — default and supported languages, browser auto‑detection,
  dictionary folder and the `localStorage` key.
- **`theme`** — default theme, whether to follow the OS (`prefers-color-scheme`),
  available themes and the `localStorage` key.
- **`media.baseUrl`** — optional shared image host. Bare file names in the JSON
  are prefixed with it; absolute URLs (`http(s)://` or `/…`) bypass it, so
  sources can be mixed.
- **`data`** — paths to the JSON data files.
- **`ui`** — loader delay, scroll threshold and reveal threshold.

## Editing content

No code changes are needed to update the site:

- **Text** — edit `i18n/pl.json` and `i18n/en.json` (the two files mirror the
  same keys).
- **Photos, packages, reviews, contact details** — edit the files in `data/`.

Images can be hosted anywhere; point the JSON at the URL, or set
`media.baseUrl` to a shared host and reference bare file names.

## Adding a language

1. Add the language code to `i18n.supported` in `js/config.js`.
2. Create `i18n/<code>.json`, mirroring the existing dictionaries.

The switcher and browser detection pick it up automatically.

## A note on AI

The project work was supported by AI tools, which were mainly used for handling
trivial, repetitive, and low-effort tasks. This helped speed up work on routine
tasks that were not interesting or engaging. Key conceptual and design decisions,
content creation, as well as overall supervision and verification were carried
out by a human.
