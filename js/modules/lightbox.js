import { select, selectAll } from '../utils/dom.js';

// Lightbox scoped to one category: opening a photo lets the visitor browse that
// folder with prev/next (wrapping at the ends); closing returns to the gallery.

let sources = [];
let currentIndex = 0;
let overlay;
let overlayImage;

function showCurrent() {
  if (overlayImage && sources[currentIndex]) overlayImage.src = sources[currentIndex];
}

function open(figure) {
  const gallery = figure.closest('.gallery');
  if (!gallery || !overlay) return;

  sources = selectAll('.gi img', gallery).map((image) => image.currentSrc || image.src);
  currentIndex = Number(figure.dataset.index) || 0;
  showCurrent();
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navigate(direction) {
  if (!sources.length) return;
  currentIndex = (currentIndex + direction + sources.length) % sources.length;
  showCurrent();
}

const isOpen = () => overlay?.classList.contains('open');

export function initLightbox() {
  overlay = select('#lb');
  overlayImage = select('#lb-img');
  const galleries = select('#portfolio-galleries');
  if (!overlay || !overlayImage || !galleries) return;

  galleries.addEventListener('click', (event) => {
    const figure = event.target.closest('.gi');
    if (figure) open(figure);
  });

  overlay.addEventListener('click', (event) => {
    const action = event.target.closest('[data-lb]')?.dataset.lb;
    if (action === 'prev') navigate(-1);
    else if (action === 'next') navigate(1);
    else if (action === 'close' || event.target === overlay) close();
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowLeft') navigate(-1);
    else if (event.key === 'ArrowRight') navigate(1);
  });
}
