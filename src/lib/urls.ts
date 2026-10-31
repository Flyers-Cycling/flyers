/**
 * Prepends Astro's configured BASE_URL safely so internal routes and public
 * assets work identically on GitHub Pages project URLs (/repo-name/...) and
 * root custom domains (https://www.flyerscycling.org/...).
 */
export function withBase(path: string, baseUrl: string = import.meta.env.BASE_URL || '/'): string {
  if (!path) return baseUrl;
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) {
    return path;
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath === '/') {
    return `${normalizedBase}/`;
  }

  return `${normalizedBase}${normalizedPath}`;
}
