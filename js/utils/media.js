import { config } from '../config.js';

/**
 * Build a final image URL. Absolute references (http(s)://, //, /, data:) pass
 * through unchanged; bare file names are prefixed with `config.media.baseUrl`
 * when one is set, so a shared host and one-off links can be mixed in the JSON.
 */
export function resolveImage(ref) {
  if (!ref) return '';
  if (/^(https?:)?\/\//.test(ref) || ref.startsWith('/') || ref.startsWith('data:')) return ref;
  const base = config.media.baseUrl.replace(/\/$/, '');
  return base ? `${base}/${ref}` : ref;
}
