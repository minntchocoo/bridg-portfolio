// Prefix a root-relative path with Astro's configured base path so links and
// assets resolve correctly under the GitHub Pages project subpath
// (e.g. /bridg-portfolio/). External URLs (http..., //...) and in-page
// anchors (#...) are returned unchanged.
const BASE = import.meta.env.BASE_URL; // e.g. "/bridg-portfolio/"

export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("#")) {
    return path;
  }
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const rel = path.startsWith("/") ? path : `/${path}`;
  return `${base}${rel}`;
}
