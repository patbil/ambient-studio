import { config } from '../config.js';
import { selectAll } from '../utils/dom.js';
import { getItem, setItem } from '../utils/storage.js';

let dictionary = {};
let activeLanguage = config.i18n.default;

/** Resolve a dot-path (e.g. "hero.titleHtml") against the dictionary; returns the key itself when missing. */
export function translate(key) {
  const value = key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dictionary);
  return value === undefined ? key : value;
}

export const getLanguage = () => activeLanguage;

// Precedence: stored choice > matching browser language > default.
function detectLanguage() {
  const stored = getItem(config.i18n.storageKey);
  if (stored && config.i18n.supported.includes(stored)) return stored;

  if (config.i18n.autoDetect) {
    const browserMatch = (navigator.languages || [navigator.language || ''])
      .map((tag) => tag.slice(0, 2).toLowerCase())
      .find((code) => config.i18n.supported.includes(code));
    if (browserMatch) return browserMatch;
  }
  return config.i18n.default;
}

async function loadDictionary(language) {
  const response = await fetch(`${config.i18n.path}/${language}.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load dictionary "${language}" (${response.status})`);
  return response.json();
}

// Maps: data-i18n → textContent, -html → innerHTML, -placeholder → placeholder, -aria → aria-label.
export function applyTranslations(root = document) {
  selectAll('[data-i18n]', root).forEach((node) => { node.textContent = translate(node.dataset.i18n); });
  selectAll('[data-i18n-html]', root).forEach((node) => { node.innerHTML = translate(node.dataset.i18nHtml); });
  selectAll('[data-i18n-placeholder]', root).forEach((node) => { node.placeholder = translate(node.dataset.i18nPlaceholder); });
  selectAll('[data-i18n-aria]', root).forEach((node) => { node.setAttribute('aria-label', translate(node.dataset.i18nAria)); });
}

/**
 * Load a language, update <html lang>/title/meta, translate the static DOM,
 * optionally persist the choice, then emit `i18n:changed` so renderers refresh.
 */
export async function changeLanguage(language, { persist = true } = {}) {
  if (!config.i18n.supported.includes(language)) language = config.i18n.default;

  dictionary = await loadDictionary(language);
  activeLanguage = language;

  document.documentElement.lang = language;
  document.title = translate('meta.title');
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', translate('meta.description'));

  if (persist) setItem(config.i18n.storageKey, language);

  applyTranslations(document);
  document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { language } }));
}

export function toggleLanguage() {
  const supported = config.i18n.supported;
  const next = supported[(supported.indexOf(activeLanguage) + 1) % supported.length];
  return changeLanguage(next, { persist: true });
}

// Auto-detect on boot without persisting, so detection never locks the user in.
export function initI18n() {
  return changeLanguage(detectLanguage(), { persist: false });
}
