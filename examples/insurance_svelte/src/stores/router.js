/* Router store – hash-based SPA navigation */
import { writable } from 'svelte/store';

function getPageFromHash() {
  const hash = window.location.hash.slice(1) || 'dashboard';
  return hash;
}

export const page = writable(getPageFromHash());

export function navigate(target) {
  window.location.hash = target;
}

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    page.set(getPageFromHash());
  });
}
