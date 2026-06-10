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
- **Cloudinary‑backed portfolio** — photos are fetched at runtime by tag, with
  a "Load more" pagination and a keyboard‑navigable lightbox.
- **Content‑driven** — text, packages and reviews are edited in JSON; portfolio
  photos are uploaded straight to Cloudinary, no code changes needed.
- **No build server** — deploys to static hosting as‑is.

## Tech stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Markup     | Semantic HTML5                                                    |
| Styles     | SCSS (7‑1 architecture) → CSS, compiled with Dart Sass            |
| Behaviour  | Vanilla JavaScript — native ES modules, no bundler                |
| Content    | JSON collections loaded at runtime via `fetch`                    |
| Photos     | Cloudinary public list endpoint (fetched by tag at runtime)       |
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
│   └── utils/        # shared helpers (dom, storage)
├── data/             # structural JSON: offers, pricing, testimonials, contact, media
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
- **`data`** — paths to the JSON data files.
- **`cloudinary`** — Cloudinary cloud name, default delivery transform and the
  list of portfolio categories with their tags (see _Adding portfolio photos_
  below).
- **`portfolio.batchSize`** — how many tiles render initially and per "Load more"
  click.
- **`ui`** — loader delay, scroll threshold and reveal threshold.

## Editing content

No code changes are needed to update the site:

- **Text** — edit `i18n/pl.json` and `i18n/en.json` (the two files mirror the
  same keys).
- **Packages, reviews, offers, contact details, hero/about images** — edit the
  files in `data/`.
- **Portfolio photos** — uploaded to Cloudinary, see below.

## Adding portfolio photos

Portfolio photos are not stored in the repo. They live on **Cloudinary** and are
fetched by **tag** at runtime — every photo needs at least one tag that matches
a portfolio category, otherwise it won't appear on the site.

### The four category tags

| Tag        | Where it shows up on the site               |
| ---------- | ------------------------------------------- |
| `outdoor`  | Outdoor sessions / "Plener"                 |
| `studio`   | Studio photography                          |
| `wedding`  | Wedding photography / "Fotografia ślubna"   |
| `events`   | Christenings, communions, birthdays, etc.   |

Tags must be lowercase, no spaces. Each photo must have **exactly one** of
these — that's what the site reads to decide which tab the photo belongs to.

### Step by step (Cloudinary Media Library)

1. **Sign in** to <https://cloudinary.com> and open **Assets** (left sidebar).
2. Click **Upload** (top‑right) or drag photos onto the window.
3. Before confirming, expand **Advanced options** → **Tags** and type the
   category tag, e.g. `wedding`. All files in this batch will get that tag.
4. Optionally add a second, more specific tag for your own organisation —
   e.g. `wedding, anna-marek-2026` or `events, communion`. The site ignores
   the extra tag; you can use it to filter the library yourself.
5. Click **Upload**.

That's it. Refresh the site and the new photos appear under the matching tab,
newest first, with the right aspect ratio.

### Removing or moving a photo

- **Remove from site only:** open the photo in Cloudinary → Tags → delete the
  category tag (`wedding` / `outdoor` / etc.). The photo stays in your library.
- **Move to a different category:** swap the category tag for a different one.
- **Delete entirely:** select the photo → Delete. Gone from the site after the
  next load.

### Picking the offer‑card cover

The four cards in "Co fotografujemy" use the first photo of each category as
the illustration. To highlight a different photo, override it in
`data/offers.json` with a `coverTag` field (any Cloudinary tag — the offer
card will use the first photo carrying that tag).

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
