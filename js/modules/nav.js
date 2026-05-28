import { config } from '../config.js';
import { select, selectAll } from '../utils/dom.js';

export function initNav() {
  const nav = select('#nav');
  const burger = select('#burger');
  const menu = select('#mobileMenu');

  if (nav) {
    const onScroll = () => nav.classList.toggle('solid', window.scrollY > config.ui.navSolidScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (!burger || !menu) return;

  const setMenuOpen = (open) => {
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger.addEventListener('click', () => setMenuOpen(!menu.classList.contains('open')));
  selectAll('a', menu).forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
}
