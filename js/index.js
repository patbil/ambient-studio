import { initTheme } from "./modules/theme.js";
import { initI18n } from "./modules/i18n.js";
import { initControls } from "./modules/controls.js";
import { initRender } from "./modules/render.js";
import { initPortfolio } from "./modules/portfolio.js";
import { initLightbox } from "./modules/lightbox.js";
import { initNav } from "./modules/nav.js";
import { initForm } from "./modules/form.js";
import { initLoader } from "./modules/loader.js";
import { initReveal } from "./modules/reveal.js";

async function boot() {
  initTheme();
  initLoader();
  initNav();

  // Dictionary + data first — they build the DOM the remaining modules hook into.
  await initI18n();
  await initRender();

  initControls();
  initPortfolio();
  initLightbox();
  initForm();
  initReveal();
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", boot);
else boot();
