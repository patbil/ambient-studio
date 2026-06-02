import { select, selectAll } from '../utils/dom.js';
import { translate } from './i18n.js';

function showToast(message) {
  const toast = select('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 4000);
}

export function initForm() {
  const form = select('#contact-form');
  if (!form) return;

  // Clear the invalid state as soon as the user starts editing again.
  selectAll('[required]', form).forEach((field) => {
    field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = selectAll('[required]', form).filter((field) => !field.value.trim());
    if (invalid.length) {
      invalid.forEach((field) => field.setAttribute('aria-invalid', 'true'));
      invalid[0].focus();
      showToast(translate('contact.form.validation'));
      return;
    }

    // TODO: wire to a real endpoint (Formspree / serverless function).
    showToast(translate('contact.form.toast'));
    form.reset();
  });
}
