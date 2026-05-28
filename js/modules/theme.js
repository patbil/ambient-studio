import { config } from '../config.js';
import { getItem, setItem } from '../utils/storage.js';

function resolveInitialTheme() {
  const stored = getItem(config.theme.storageKey);
  if (stored && config.theme.available.includes(stored)) return stored;
  if (config.theme.followSystem && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return config.theme.default;
}

export const getTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

export function applyTheme(theme, { persist = true } = {}) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) setItem(config.theme.storageKey, theme);
  document.dispatchEvent(new CustomEvent('theme:changed', { detail: { theme } }));
}

export function toggleTheme() {
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark', { persist: true });
}

export function initTheme() {
  applyTheme(resolveInitialTheme(), { persist: false });

  if (!config.theme.followSystem) return;
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!getItem(config.theme.storageKey)) applyTheme(event.matches ? 'dark' : 'light', { persist: false });
  });
}
