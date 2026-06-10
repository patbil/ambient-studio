/** Central application configuration — all tunable settings live here. */
export const config = {
  // Bilingual UI: default + supported languages, browser auto-detect, dict path.
  i18n: {
    default: "pl",
    supported: ["pl", "en"],
    autoDetect: true,
    path: "i18n",
    storageKey: "as:lang",
  },

  // Light/dark color scheme: default, follow-system flag, available palettes.
  theme: {
    default: "light",
    followSystem: true,
    storageKey: "as:theme",
    available: ["light", "dark"],
  },

  // Static JSON content sources (everything except the portfolio gallery).
  data: {
    media: "data/media.json",
    offers: "data/offers.json",
    pricing: "data/pricing.json",
    testimonials: "data/testimonials.json",
    contact: "data/contact.json",
  },

  // Cloud-hosted portfolio: cloud name, default delivery transform, category→tag map.
  cloudinary: {
    cloudName: "dqmq8n5xy",
    transform: "f_auto,q_auto,w_1600",
    categories: [
      { id: "outdoor", tag: "outdoor" },
      { id: "studio", tag: "studio" },
      { id: "wedding", tag: "wedding" },
      { id: "events", tag: "events" },
    ],
  },

  // Portfolio gallery pagination — tiles loaded per initial render and per "Load more".
  portfolio: {
    batchSize: 20,
  },

  // Misc UI timing: loader hide delay, sticky-nav scroll threshold, reveal-on-scroll cutoff.
  ui: {
    loaderDelay: 1600,
    navSolidScroll: 50,
    revealThreshold: 0.12,
  },
};

export default config;
