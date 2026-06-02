import { select, selectAll } from '../utils/dom.js';

export function initPortfolio() {
  const tabs = select('#portfolio-tabs');
  const galleries = select('#portfolio-galleries');
  if (!tabs || !galleries) return;

  tabs.addEventListener('click', (event) => {
    const clickedTab = event.target.closest('.tab-btn');
    if (!clickedTab) return;

    const categoryId = clickedTab.dataset.tab;
    selectAll('.tab-btn', tabs).forEach((tab) => {
      const active = tab === clickedTab;
      tab.classList.toggle('active', active);
      if (active) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
    selectAll('.gallery', galleries).forEach((gallery) =>
      gallery.classList.toggle('active', gallery.dataset.gallery === categoryId),
    );
  });
}
