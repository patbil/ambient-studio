import { config } from '../config.js';
import { selectAll } from '../utils/dom.js';
import { toggleTheme, getTheme } from './theme.js';
import { toggleLanguage, getLanguage, translate } from './i18n.js';

function syncThemeButtons() {
  const key = getTheme() === 'dark' ? 'controls.themeToLight' : 'controls.themeToDark';
  selectAll('[data-action="toggle-theme"]').forEach((button) => button.setAttribute('aria-label', translate(key)));
}

// The label advertises the language the button switches *to*.
function syncLanguageButtons() {
  const supported = config.i18n.supported;
  const next = supported[(supported.indexOf(getLanguage()) + 1) % supported.length];
  selectAll('[data-action="toggle-lang"]').forEach((button) => {
    button.textContent = next.toUpperCase();
    button.setAttribute('aria-label', translate('controls.langSwitch'));
  });
}

export function initControls() {
  selectAll('[data-action="toggle-theme"]').forEach((button) => button.addEventListener('click', toggleTheme));
  selectAll('[data-action="toggle-lang"]').forEach((button) => button.addEventListener('click', toggleLanguage));

  document.addEventListener('theme:changed', syncThemeButtons);
  document.addEventListener('i18n:changed', () => {
    syncThemeButtons();
    syncLanguageButtons();
  });

  syncThemeButtons();
  syncLanguageButtons();
}
