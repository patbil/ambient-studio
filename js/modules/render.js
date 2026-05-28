import { config } from '../config.js';
import { select, escapeHtml } from '../utils/dom.js';
import { resolveImage } from '../utils/media.js';
import { translate } from './i18n.js';
import { refreshReveal } from './reveal.js';

const store = {};

// Fetch + parse JSON, falling back to `fallback` on any failure so a single bad
// file can never blank the whole page.
async function fetchJSON(path, fallback) {
  try {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`${response.status} ${path}`);
    return await response.json();
  } catch (error) {
    console.error('[render] data load failed:', error);
    return fallback;
  }
}

// Staggered scroll-reveal delay class (d1..d4) for grid items.
const revealDelayClass = (position) => (position > 0 ? ` d${Math.min(position, 4)}` : '');

function renderMedia() {
  const media = store.media;
  if (!media) return;
  const heroImage = select('#hero-img');
  if (heroImage && media.hero) heroImage.src = resolveImage(media.hero);
  const aboutImage = select('#about-img');
  if (aboutImage && media.about) aboutImage.src = resolveImage(media.about);
}

function renderOffers() {
  const grid = select('#offer-grid');
  if (!grid || !store.offers) return;

  grid.innerHTML = store.offers
    .map((offer, position) => `
      <article class="offer-card rv${revealDelayClass(position)}">
        <img class="offer-img" src="${escapeHtml(resolveImage(offer.image))}" alt="${escapeHtml(translate(`offer.items.${offer.id}.name`))}" loading="lazy">
        <div class="offer-body">
          <span class="offer-num">${escapeHtml(offer.num)}</span>
          <h3 class="offer-name">${escapeHtml(translate(`offer.items.${offer.id}.name`))}</h3>
          <p class="offer-text">${escapeHtml(translate(`offer.items.${offer.id}.text`))}</p>
          <a href="#portfolio" class="offer-lnk">${escapeHtml(translate('offer.link'))} →</a>
        </div>
      </article>`)
    .join('');
}

function renderPortfolio() {
  const tabs = select('#portfolio-tabs');
  const galleries = select('#portfolio-galleries');
  if (!tabs || !galleries || !store.portfolio) return;

  const categories = store.portfolio.categories || [];
  // Keep the visitor's current category when re-rendering (e.g. on language change).
  const activeId = select('.gallery.active', galleries)?.dataset.gallery || categories[0]?.id;

  tabs.innerHTML = categories
    .map((category) => `
      <button class="tab-btn${category.id === activeId ? ' active' : ''}" type="button" data-tab="${escapeHtml(category.id)}">
        ${escapeHtml(translate(`portfolio.categories.${category.id}`))}
      </button>`)
    .join('');

  galleries.innerHTML = categories
    .map((category) => {
      const label = escapeHtml(translate(`portfolio.categories.${category.id}`));
      const photos = (category.items || [])
        .map((photo, photoIndex) => `
          <figure class="gi" data-index="${photoIndex}">
            <img src="${escapeHtml(resolveImage(photo.image))}" alt="${label}" loading="lazy">
            <figcaption class="gi-lbl">${label}</figcaption>
          </figure>`)
        .join('');
      return `<div class="gallery${category.id === activeId ? ' active' : ''}" data-gallery="${escapeHtml(category.id)}">${photos}</div>`;
    })
    .join('');
}

function renderPricing() {
  const grid = select('#pricing-grid');
  if (!grid || !store.pricing) return;

  grid.innerHTML = store.pricing
    .map((pkg, position) => {
      const key = `pricing.packages.${pkg.id}`;
      const features = translate(`${key}.features`);
      const featureList = (Array.isArray(features) ? features : [])
        .map((feature) => `<li>${escapeHtml(feature)}</li>`)
        .join('');
      return `
        <article class="prc rv${revealDelayClass(position)}${pkg.featured ? ' featured' : ''}">
          <span class="prc-badge">${escapeHtml(translate(`${key}.badge`))}</span>
          <span class="prc-cat">${escapeHtml(translate(`${key}.category`))}</span>
          <h3 class="prc-name">${escapeHtml(translate(`${key}.name`))}</h3>
          <ul class="prc-list">${featureList}</ul>
          <a href="#kontakt" class="prc-cta${pkg.featured ? ' f' : ''}">${escapeHtml(translate('pricing.cta'))}</a>
        </article>`;
    })
    .join('');
}

function renderTestimonials() {
  const track = select('#testi-scroll');
  if (!track || !store.testimonials) return;

  const reviews = translate('testimonials.items');
  if (!Array.isArray(reviews)) return;

  const testimonialCard = (review, stars) => `
    <article class="testi-card">
      <div class="testi-stars" aria-hidden="true">${'★'.repeat(stars || 5)}</div>
      <p class="testi-text">„${escapeHtml(review.text)}”</p>
      <div class="testi-author"><strong>${escapeHtml(review.author)}</strong> - ${escapeHtml(review.meta)}</div>
    </article>`;

  const cards = reviews
    .map((review, position) => testimonialCard(review, store.testimonials[position]?.stars))
    .join('');
  track.innerHTML = cards + cards; // duplicated set keeps the marquee seamless
}

function renderContact() {
  const contact = store.contact;
  if (!contact) return;

  const phone = select('#contact-phone');
  if (phone && contact.phone) {
    phone.textContent = contact.phone.display;
    phone.href = `tel:${contact.phone.href}`;
  }

  const email = select('#contact-email');
  if (email && contact.email) {
    email.textContent = contact.email;
    email.href = `mailto:${contact.email}`;
  }

  const social = select('#contact-social');
  if (social && Array.isArray(contact.social)) {
    social.innerHTML = contact.social
      .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.name)}</a>`)
      .join('');
  }
}

function renderFooterYear() {
  const copyright = select('#footer-copy');
  if (copyright) copyright.textContent = translate('footer.rights').replace('{year}', new Date().getFullYear());
}

function renderAll() {
  renderMedia();
  renderOffers();
  renderPortfolio();
  renderPricing();
  renderTestimonials();
  renderContact();
  renderFooterYear();
  refreshReveal();
}

export async function initRender() {
  const [media, offers, portfolio, pricing, testimonials, contact] = await Promise.all([
    fetchJSON(config.data.media, {}),
    fetchJSON(config.data.offers, []),
    fetchJSON(config.data.portfolio, { categories: [] }),
    fetchJSON(config.data.pricing, []),
    fetchJSON(config.data.testimonials, []),
    fetchJSON(config.data.contact, {}),
  ]);

  Object.assign(store, { media, offers, portfolio, pricing, testimonials, contact });

  renderAll();
  document.addEventListener('i18n:changed', renderAll);
}
