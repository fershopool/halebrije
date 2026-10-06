# HALEBRIJE — Encuentra tu Halebrije

Primera propuesta de marca: React 19, TypeScript, Vite y CSS propio. Cinco páginas estáticas prerenderizadas, sin servidor obligatorio, sin librería de animación ni dependencias de mapas.

## Ver la propuesta

```sh
npm install
npm run dev
```

Abre la URL que imprime Vite. Para revisar el resultado distribuible: `npm run build` y `npm run preview`.

## Editar contenido

| Archivo                 | Contenido                                                 |
| ----------------------- | --------------------------------------------------------- |
| `src/config/brand.ts`   | Marca, navegación y configuración de canales              |
| `src/data/content.ts`   | Textos editoriales y capítulos de historia                |
| `src/data/flavors.ts`   | Sabores, categorías, personalidades y relaciones del quiz |
| `src/data/locations.ts` | Sucursal, dirección, referencia, horario y mapa           |
| `src/data/social.ts`    | Imágenes y publicaciones oficiales de Instagram           |
| `src/data/pages.ts`     | Rutas y metadatos de cada página                          |
| `src/styles/tokens.css` | Colores, fuentes, espaciado y tamaños comunes             |
| `public/images/`        | Imágenes locales optimizadas                              |

Los sabores Pistache, Mango, Chocolate y Frutos del bosque son **DEMO**, no un menú confirmado. Las imágenes de sabores y el cono son imágenes conceptuales generadas para esta propuesta. El logo y las imágenes sociales proceden del Instagram oficial. Ver [fuentes y auditoría](docs/AUDIT.md).

## Pedidos y eventos

Copiar `.env.example` a `.env.local` y configurar los valores confirmados:

- `VITE_WHATSAPP_NUMBER`: número internacional solo con dígitos, confirmado por la marca. Vacío: “Pedir” abre opciones de Instagram y visita; nunca usa un número inventado.
- `VITE_WHATSAPP_DEFAULT_MESSAGE`: texto inicial del enlace de WhatsApp.
- `VITE_EVENTS_ENDPOINT`: endpoint HTTP que acepta `POST` JSON con `name`, `phone`, `email`, `date`, `eventType`, `guests`, `location`, `message`. Vacío: el formulario prepara un resumen local, permite copiarlo o descargarlo y **no envía datos**.

El endpoint debe validar datos, controlar abuso y responder con HTTP 2xx únicamente si aceptó la solicitud. No incluir secretos en variables `VITE_`: son públicas. WhatsApp, email, CRM o cualquier backend se pueden conectar en este único punto. No hay base de datos, cobros ni almacenamiento de datos personales en la propuesta.

## SEO y publicación

La entrega conserva `noindex` porque incluye contenido DEMO y falta el dominio definitivo. El build genera HTML completo de Inicio, Sabores, Nuestra historia, Eventos y Visítanos, además de `404.html`.

Cuando Halebrije confirme contenido y dominio, configurar `VITE_SITE_URL=https://dominio-confirmado.mx` y `VITE_IS_PROPOSAL=false`. El build habilita indexación, canonical, OpenGraph absoluto, sitemap y datos estructurados locales sin inventar horarios, coordenadas ni teléfono.

Publicar la carpeta `dist/` en un hosting estático que sirva cada directorio mediante su `index.html`. No necesita una reescritura SPA global. `.ssr/` es solo un artefacto intermedio de compilación y no se publica.

## Verificar

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Filtros y quiz tienen comprobaciones con `node:test`. El formulario usa controles nativos, validación accesible y estados de carga/éxito/error. Mapa e Instagram cargan bajo acción del visitante; las imágenes son locales y las fuentes se sirven con la web.

Confirmar antes de la versión comercial: menú y precios, WhatsApp, horario propio, condiciones de eventos, ingredientes/proceso e historia de la marca. Se pueden sustituir assets manteniendo sus rutas o editando los datos.

## GitHub Pages

Sitio: https://fershopool.github.io/halebrije/
Repositorio: https://github.com/fershopool/halebrije
Proyecto local: `/Users/nando/Desktop/tlatolli/halebrijes`.

Cada push a `main` ejecuta lint, TypeScript, pruebas y build antes de publicar mediante GitHub Actions. También admite ejecución manual desde Actions.

La publicación mantiene `VITE_IS_PROPOSAL=true`: contenido DEMO identificado y metadatos noindex. Pedidos enlaza a Instagram mientras falte un WhatsApp confirmado. El formulario prepara una cotización local; no envía datos sin configurar un endpoint real. No guardar credenciales en el repositorio.

Para previsualizar con la ruta de publicación:

```sh
VITE_BASE_PATH=/halebrije/ VITE_SITE_URL=https://fershopool.github.io/halebrije/ npm run build
VITE_BASE_PATH=/halebrije/ npm run preview
```
