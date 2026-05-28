import { config } from '../config.js';
import { select } from '../utils/dom.js';

export function initLoader() {
  const loader = select('#loader');
  if (!loader) return;

  const hideLoader = () => window.setTimeout(() => loader.classList.add('done'), config.ui.loaderDelay);
  if (document.readyState === 'complete') hideLoader();
  else window.addEventListener('load', hideLoader, { once: true });
}
