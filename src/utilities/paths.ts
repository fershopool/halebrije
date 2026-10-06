/** URL pública: admite tanto dominio raíz como subcarpeta de GitHub Pages. */
export function sitePath(path: string): string {
  return path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;
}

export function routePath(path: string): string {
  const base = import.meta.env.BASE_URL;
  if (base !== '/' && path === base.slice(0, -1)) return '/';
  return base !== '/' && path.startsWith(base) ? `/${path.slice(base.length)}` : path;
}
