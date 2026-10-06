import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { render, pages, location, addressDetails, brand } from '../.ssr/entry-server.js';

const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env };
const origin = env.VITE_SITE_URL ? new URL(env.VITE_SITE_URL).href.replace(/\/$/, '') : '';
if (origin && !/^https?:\/\//.test(origin))
  throw new Error('VITE_SITE_URL debe usar HTTP o HTTPS.');
const base = env.VITE_BASE_PATH || '/';
const publishable = Boolean(origin) && env.VITE_IS_PROPOSAL === 'false';
const escape = (text) =>
  text.replace(/[&"<>]/g, (c) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[c]);
let template;
try {
  template = await readFile('.ssr/template.html', 'utf8');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Ejecuta npm run build para generar una plantilla limpia.');
  }
  await writeFile('.ssr/template.html', template);
}

for (const page of [
  ...pages,
  {
    path: '/404.html',
    title: 'Página no encontrada · Halebrije',
    description: 'Vuelve al universo Halebrije.',
  },
]) {
  const is404 = page.path === '/404.html';
  const allowIndex = publishable && !is404;
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(page.path)}</div>`);
  html = html
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*("\s*\/?>)/,
      `$1${escape(page.description)}$2`,
    )
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escape(page.title)}$2`)
    .replace(
      /(<meta property="og:description" content=")[^"]*("\s*\/?>)/,
      `$1${escape(page.description)}$2`,
    );
  if (allowIndex) html = html.replace('noindex, nofollow', 'index, follow');
  if (origin && !is404)
    html = html
      .replace(
        '</head>',
        `<link rel="canonical" href="${origin}${page.path}" /><meta property="og:url" content="${origin}${page.path}" /></head>`,
      )
      .replace(
        `content="${base}images/og-halebrije.jpg"`,
        `content="${origin}/images/og-halebrije.jpg"`,
      );
  if (allowIndex) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FoodEstablishment',
      name: `${brand.name} Helados Artesanales`,
      url: `${origin}/`,
      sameAs: [brand.instagram],
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${addressDetails.streetAddress}, ${addressDetails.suburb}`,
        addressLocality: addressDetails.addressLocality,
        addressRegion: addressDetails.addressRegion,
        postalCode: addressDetails.postalCode,
        addressCountry: addressDetails.addressCountry,
      },
      containedInPlace: { '@type': 'Place', name: location.name },
    };
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`,
    );
  }
  const destination = is404 ? 'dist/404.html' : `dist${page.path}index.html`;
  if (!is404) await mkdir(`dist${page.path}`, { recursive: true });
  await writeFile(destination, html);
}

await writeFile(
  'dist/robots.txt',
  publishable
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
if (publishable) {
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${escape(origin + page.path)}</loc></url>`).join('')}</urlset>`,
  );
} else {
  await unlink('dist/sitemap.xml').catch((error) => {
    if (error.code !== 'ENOENT') throw error;
  });
}
console.log(
  `Prerendered ${pages.length} pages + 404. SEO: ${publishable ? 'public' : 'proposal (noindex)'}.`,
);
