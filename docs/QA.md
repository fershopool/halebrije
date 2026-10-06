# Verificación de primera entrega

6 de octubre de 2026. Propuesta local para Halebrije.

## Comprobaciones realizadas

- `npm run lint`: correcto.
- `npm run typecheck`: correcto.
- `npm test`: 2 comprobaciones, correctas; cubren categorías y cada respuesta del quiz, incluidos resultados no disponibles.
- `npm run build`: correcto; prerenderiza cinco páginas y 404. Comprueba encabezado único, navegación, descripción y assets de cada ruta.
- Build servido localmente: cinco rutas con títulos propios, sin imágenes rotas, sin errores o advertencias de consola de producción ni errores de hidratación.

## Revisión visual y comportamiento

Anchos revisados: 360, 390, 430, 768, 1024, 1440 y 1680 px. Sin scroll horizontal. Se corrigieron tamaño del título móvil, mínimo de columnas en temporada, salto del punto final y flecha duplicada en tarjetas.

Menú móvil abre, navega y cierra. Los filtros actualizan tarjetas y conteo. El detalle de sabor abre diálogo nativo, cierra con Escape y devuelve foco. El quiz recomienda Mango para “Refrescante” y usa las relaciones centrales. “Pedir” abre opciones verificadas cuando no existe WhatsApp confirmado.

Formulario probado con datos ficticios, fecha futura, cumpleaños, 60 personas y ubicación de demostración. Se confirmó el resumen y el aviso explícito de ausencia de envío. Se corrigió la sincronización inmediata de fecha y limpieza de validaciones personalizadas tras editar. Ninguna solicitud se envió a la marca.

Envío real no probado: no existe endpoint ni teléfono confirmado. El servicio maneja respuesta HTTP, timeout y error; requiere un destino válido para verificación de integración. La disponibilidad de los productos, los horarios y el servicio de eventos requieren confirmación de Halebrije.

## Capturas

- [Escritorio](preview-desktop.jpg)
- [Móvil](preview-mobile.jpg)
- [Página completa](preview-completa.jpg)

## Rendimiento observado del build

JavaScript: aproximadamente 79 KB gzip. CSS: aproximadamente 8 KB gzip. Fuentes locales normales: Barlow Condensed 700/800 y DM Sans variable, alrededor de 82 KB WOFF2 combinados. Hero responsive WebP: 52/113 KB. Mapa diferido hasta interacción, sin widgets de Instagram ni bibliotecas de animación.

Estas cifras describen archivos del build; no equivalen a una medición Lighthouse ni a Core Web Vitals de un hosting público. No se ejecutó un benchmark de red externa.

La propuesta usa `noindex`, sin dominio supuesto. Al confirmar `VITE_SITE_URL` y `VITE_IS_PROPOSAL=false`, el build produce canonical, sitemap, robots y datos locales estructurados.
