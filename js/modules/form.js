import { select } from '../utils/dom.js';
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();

    if (!name || !email) {
      showToast(translate('contact.form.validation'));
      return;
    }

    // TODO: wire to a real endpoint (Formspree / serverless function).
    showToast(translate('contact.form.toast'));
    form.reset();
  });
}
