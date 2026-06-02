import { select, selectAll } from '../utils/dom.js';

// Lightbox scoped to one category: opening a photo lets the visitor browse that
// folder with prev/next (wrapping at the ends); closing returns to the gallery.

let sources = [];
let currentIndex = 0;
let overlay;
let overlayImage;
let closeButton;
let lastTrigger = null;

function showCurrent() {
  if (overlayImage && sources[currentIndex]) overlayImage.src = sources[currentIndex];
}

// Mark the rest of the page inert while the modal is open so keyboard focus
// and assistive tech cannot reach the background content behind it.
function setBackgroundInert(inert) {
  Array.from(document.body.children).forEach((child) => {
    if (child === overlay) return;
    if (inert) child.setAttribute('inert', '');
    else child.removeAttribute('inert');
  });
}

function open(figure) {
  const gallery = figure.closest('.gallery');
  if (!gallery || !overlay) return;

  sources = selectAll('.gi img', gallery).map((image) => image.currentSrc || image.src);
  currentIndex = Number(figure.dataset.index) || 0;
  lastTrigger = figure;
  showCurrent();
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setBackgroundInert(true);
  closeButton?.focus();
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setBackgroundInert(false);
  lastTrigger?.focus();
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
  closeButton = select('[data-lb="close"]', overlay);
  const galleries = select('#portfolio-galleries');
  if (!overlay || !overlayImage || !galleries) return;

  galleries.addEventListener('click', (event) => {
    const figure = event.target.closest('.gi');
    if (figure) open(figure);
  });

  galleries.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const figure = event.target.closest('.gi');
    if (!figure) return;
    event.preventDefault();
    open(figure);
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
