import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { loadEnv } from 'vite';
const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env };
const base = env.VITE_BASE_PATH || '/';
const routes = ['/', '/sabores/', '/nuestra-historia/', '/eventos/', '/visitanos/'];
for (const route of routes) {
  const html = await readFile(`dist${route}index.html`, 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: debe tener un h1`);
  assert.ok(html.includes('Halebrije'), `${route}: contenido prerenderizado`);
  assert.ok(html.includes('name="description"'), `${route}: descripción`);
  for (const path of [...html.matchAll(/(?:src|href)="(\/[^"?#]*images\/[^"?#]+)"/g)].map(
    (m) => m[1],
  )) {
    await access(`dist/${path.slice(base.length)}`);
  }
  for (const target of routes)
    assert.ok(
      html.includes(`href="${base}${target.slice(1)}"`),
      `${route}: navegación hacia ${target}`,
    );
}
await access('dist/404.html');
await access('dist/images/og-halebrije.jpg');
console.log('Verified 5 prerendered routes, headings, metadata, navigation, image assets and 404.');
