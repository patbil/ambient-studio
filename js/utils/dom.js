export const select = (selector, scope = document) => scope.querySelector(selector);
export const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/** Escape a string for safe interpolation into an HTML template. */
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default:  return '&#39;';
    }
  });
}
