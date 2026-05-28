import { config } from '../config.js';
import { selectAll } from '../utils/dom.js';

let observer = null;

// Safe to call again after new content renders; only observes not-yet-revealed nodes.
export function refreshReveal() {
  if (!('IntersectionObserver' in window)) {
    selectAll('.rv').forEach((element) => element.classList.add('in'));
    return;
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: config.ui.revealThreshold },
    );
  }

  selectAll('.rv:not(.in)').forEach((element) => observer.observe(element));
}

export const initReveal = refreshReveal;
