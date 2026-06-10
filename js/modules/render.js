import { config } from '../config.js';
import { select, escapeHtml } from '../utils/dom.js';
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

// Build a Cloudinary delivery URL for a given public_id + format. Caller may
// override the default transform — offer cards need a smart-crop thumbnail,
// gallery tiles want the full-width responsive variant.
function cloudinaryUrl(publicId, format, transform = config.cloudinary.transform) {
  return `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/upload/${transform}/${publicId}.${format}`;
}

// Fetch one tag from the Cloudinary list endpoint; empty array on failure.
async function fetchCloudinaryTag(tag) {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/list/${tag}.json`,
      { cache: 'no-cache' },
    );
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.resources) ? data.resources : [];
  } catch (error) {
    console.error('[cloudinary] failed to load tag', tag, error);
    return [];
  }
}

// Load every configured category in parallel and shape it for renderPortfolio.
async function loadPortfolio() {
  const categories = await Promise.all(
    config.cloudinary.categories.map(async (category) => {
      const resources = await fetchCloudinaryTag(category.tag);
      return {
        id: category.id,
        items: resources.map((resource) => ({
          publicId: resource.public_id,
          format: resource.format,
          width: resource.width,
          height: resource.height,
        })),
      };
    }),
  );
  return { categories };
}

// Per-category render state for batched "Load more" rendering.
const galleryState = new Map();

// Staggered scroll-reveal delay class (d1..d4) for grid items.
const revealDelayClass = (position) => (position > 0 ? ` d${Math.min(position, 4)}` : '');

function renderMedia() {
  const media = store.media;
  if (!media) return;
  const heroImage = select('#hero-img');
  if (heroImage && media.hero) heroImage.src = media.hero;
  const aboutImage = select('#about-img');
  if (aboutImage && media.about) aboutImage.src = media.about;
}

// Pull the first photo of the matching portfolio category to illustrate the
// offer card. Prefer a specific `coverTag` (e.g. "plener" for outdoor, which
// excludes panieński) over the broader category, then fall back to offers.json.
function offerCardImage(offer) {
  const transform = 'f_auto,q_auto,c_fill,w_800,h_500,g_auto';
  if (offer.coverTag) {
    const coverItem = store.offerCovers?.[offer.coverTag]?.[0];
    if (coverItem) return cloudinaryUrl(coverItem.publicId, coverItem.format, transform);
  }
  const firstItem = store.portfolio?.categories?.find((c) => c.id === offer.id)?.items?.[0];
  if (firstItem) return cloudinaryUrl(firstItem.publicId, firstItem.format, transform);
  return offer.image || '';
}

function renderOffers() {
  const grid = select('#offer-grid');
  if (!grid || !store.offers) return;

  grid.innerHTML = store.offers
    .map((offer, position) => `
      <article class="offer-card rv${revealDelayClass(position)}">
        <img class="offer-img" src="${escapeHtml(offerCardImage(offer))}" alt="${escapeHtml(translate(`offer.items.${offer.id}.name`))}" loading="lazy">
        <div class="offer-body">
          <span class="offer-num">${escapeHtml(offer.num)}</span>
          <h3 class="offer-name">${escapeHtml(translate(`offer.items.${offer.id}.name`))}</h3>
          <p class="offer-text">${escapeHtml(translate(`offer.items.${offer.id}.text`))}</p>
          <a href="#portfolio" class="offer-lnk" data-category="${escapeHtml(offer.id)}">${escapeHtml(translate('offer.link'))} →</a>
        </div>
      </article>`)
    .join('');
}

function buildTile(item, index, label) {
  const src = cloudinaryUrl(item.publicId, item.format);
  const dim = item.width && item.height ? ` width="${item.width}" height="${item.height}"` : '';
  const aspect = item.width && item.height ? (item.width / item.height).toFixed(3) : '1.5';
  return `
    <figure class="gi" data-index="${index}" tabindex="0" role="button" aria-label="${label} — ${index + 1}" style="--aspect: ${aspect}">
      <img src="${escapeHtml(src)}" alt="${label}" loading="lazy"${dim}>
      <figcaption class="gi-lbl" aria-hidden="true">${label}</figcaption>
    </figure>`;
}

// Append the next batch of tiles into the gallery and toggle Load More.
function appendBatch(categoryId) {
  const state = galleryState.get(categoryId);
  if (!state) return;

  const tilesEl = select(`.gallery[data-gallery="${CSS.escape(categoryId)}"] .gallery-tiles`);
  if (!tilesEl) return;

  const label = escapeHtml(translate(`portfolio.categories.${categoryId}`));
  const nextEnd = Math.min(state.rendered + config.portfolio.batchSize, state.items.length);
  const slice = state.items.slice(state.rendered, nextEnd);
  const html = slice.map((item, i) => buildTile(item, state.rendered + i, label)).join('');
  tilesEl.insertAdjacentHTML('beforeend', html);
  state.rendered = nextEnd;

  const moreBtn = select(`.gallery-more[data-tab="${CSS.escape(categoryId)}"]`);
  if (moreBtn) {
    const remaining = state.items.length - state.rendered;
    if (remaining > 0) {
      moreBtn.hidden = false;
      moreBtn.textContent = `${translate('portfolio.loadMore')} (${remaining})`;
    } else {
      moreBtn.hidden = true;
    }
  }
  refreshReveal();
}

function renderPortfolio() {
  const tabs = select('#portfolio-tabs');
  const galleries = select('#portfolio-galleries');
  if (!tabs || !galleries || !store.portfolio) return;

  const categories = store.portfolio.categories || [];
  // Keep the visitor's current category when re-rendering (e.g. on language change).
  const activeId = select('.gallery.active', galleries)?.dataset.gallery || categories[0]?.id;

  tabs.innerHTML = categories
    .map((category) => {
      const isActive = category.id === activeId;
      return `
        <button class="tab-btn${isActive ? ' active' : ''}" type="button" data-tab="${escapeHtml(category.id)}"${isActive ? ' aria-current="true"' : ''}>
          ${escapeHtml(translate(`portfolio.categories.${category.id}`))}
        </button>`;
    })
    .join('');

  galleries.innerHTML = categories
    .map((category) => {
      const label = escapeHtml(translate(`portfolio.categories.${category.id}`));
      return `
        <div class="gallery${category.id === activeId ? ' active' : ''}" data-gallery="${escapeHtml(category.id)}" role="region" aria-label="${label}">
          <div class="gallery-tiles"></div>
          <button class="gallery-more" type="button" hidden data-tab="${escapeHtml(category.id)}"></button>
        </div>`;
    })
    .join('');

  // Reset state and render the first batch into every category.
  galleryState.clear();
  categories.forEach((category) => {
    galleryState.set(category.id, { items: category.items || [], rendered: 0 });
    appendBatch(category.id);
  });
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
    loadPortfolio(),
    fetchJSON(config.data.pricing, []),
    fetchJSON(config.data.testimonials, []),
    fetchJSON(config.data.contact, {}),
  ]);

  // Fetch any sub-tags used for offer-card covers (e.g. "plener" for outdoor).
  const coverTags = [...new Set(offers.map((o) => o.coverTag).filter(Boolean))];
  const offerCovers = {};
  await Promise.all(
    coverTags.map(async (tag) => {
      const resources = await fetchCloudinaryTag(tag);
      offerCovers[tag] = resources.map((r) => ({
        publicId: r.public_id,
        format: r.format,
      }));
    }),
  );

  Object.assign(store, { media, offers, portfolio, pricing, testimonials, contact, offerCovers });

  renderAll();
  document.addEventListener('i18n:changed', renderAll);

  // Load-more pagination + offer-card "view photos" jumps to the matching tab.
  document.addEventListener('click', (event) => {
    const moreBtn = event.target.closest('.gallery-more');
    if (moreBtn?.dataset.tab) {
      appendBatch(moreBtn.dataset.tab);
      return;
    }
    const offerLink = event.target.closest('.offer-lnk[data-category]');
    if (offerLink) {
      const tabBtn = select(`.tab-btn[data-tab="${CSS.escape(offerLink.dataset.category)}"]`);
      tabBtn?.click();
      return;
    }
  });
}
