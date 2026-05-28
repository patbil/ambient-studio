/** Central application configuration — all tunable settings live here. */
export const config = {
  i18n: {
    default: "pl",
    supported: ["pl", "en"],
    autoDetect: true,
    path: "i18n",
    storageKey: "as:lang",
  },
  theme: {
    default: "light",
    followSystem: true,
    storageKey: "as:theme",
    available: ["light", "dark"],
  },
  // When set, image refs in data/*.json may be bare file names; absolute URLs bypass it.
  media: {
    baseUrl: "",
  },
  data: {
    media: "data/media.json",
    offers: "data/offers.json",
    portfolio: "data/portfolio.json",
    pricing: "data/pricing.json",
    testimonials: "data/testimonials.json",
    contact: "data/contact.json",
  },
  ui: {
    loaderDelay: 1600,
    navSolidScroll: 50,
    revealThreshold: 0.12,
  },
};

export default config;
