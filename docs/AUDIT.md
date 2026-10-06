# Auditoría inicial y fuentes

## Estado antes de modificar código

Fecha: 6 de octubre de 2026. Carpeta auditada: proyecto actual de Codex.

La carpeta estaba completamente vacía. `rg --files` no devolvió archivos y el listado completo no mostró archivos ocultos. No había Git, `package.json`, framework, estructura, estilos, componentes, dependencias, configuración, fotos, fuentes, iconos ni assets. No existía implementación que conservar o refactorizar.

Se eligieron React + TypeScript + Vite para la interacción y compilación estática. CSS nativo para diseño/movimiento. Iconos SVG propios, fuentes locales Barlow Condensed + DM Sans. React DOM server prerenderiza las cinco rutas; no se requiere un servidor de aplicación ni una biblioteca de routing.

## Plan ejecutado

1. Consultar marca y fuentes públicas; separar datos confirmados de DEMO.
2. Construir tokens, layout, páginas, catálogo y narrativa editorial.
3. Implementar filtros, detalle, quiz, pedido y formulario local.
4. Optimizar assets, prerenderizar HTML, preparar SEO y revisar responsive/interacciones.
5. Ejecutar lint, typecheck, comprobaciones de reglas y build.

## Información confirmada

- [Instagram oficial](https://www.instagram.com/halebrije_helados/): logo multicolor sobre morado, paletas, mangonada, productos con formas, creaciones de temporada y contenido social. Se consultó el perfil público sin login después de cerrar el aviso de registro.
- [Ficha oficial Town Center](https://towncenterelrosario.com.mx/halebrije-helados-artesanales/): Halebrije Helados Artesanales, categoría Helados, local PARQUE PAR-02; enlaza el Instagram exacto.
- [Contacto Town Center](https://towncenterelrosario.com.mx/contacto/): dirección de la plaza, Av. El Rosario 1025, El Rosario, Azcapotzalco, 02100 CDMX.

No se verificaron: lista de sabores, ingredientes, precios, teléfono, WhatsApp, horario propio, historia, fundadores ni servicio/condiciones de eventos. Las categorías y personalidades de sabores son propuestas creativas, marcadas DEMO. No se afirman beneficios nutricionales, fabricación diaria ni ingredientes específicos.

## Assets y procedencia

| Archivo local                                                  | Procedencia                                                                          |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `logo.webp`                                                    | Foto de perfil de `@halebrije_helados`                                               |
| `social-paletas.webp`                                          | [Publicación oficial](https://www.instagram.com/halebrije_helados/reel/DeDYLCouJgQ/) |
| `social-local.webp`                                            | [Publicación oficial](https://www.instagram.com/halebrije_helados/reel/DdWcaWBOp-G/) |
| `social-temporada.webp`                                        | [Publicación oficial](https://www.instagram.com/halebrije_helados/reel/Ddsc3klOxP7/) |
| `social-mangonada.webp`                                        | [Publicación oficial](https://www.instagram.com/halebrije_helados/reel/DdWaOCNuIM2/) |
| `hero.webp`, `hero-small.webp`                                 | Composición conceptual generada con ImageGen; fondo transparente                     |
| `pistache.webp`, `mango.webp`, `chocolate.webp`, `frutos.webp` | Imágenes conceptuales generadas con ImageGen, catálogo DEMO                          |
| `favicon.svg`                                                  | Monograma provisional para la propuesta, no logo oficial                             |

Se conservaron imágenes oficiales como publicaciones, sin atribuirles sabores, ingredientes o disponibilidad no confirmados. Los colores de interfaz son una interpretación del logo; no se presentan como códigos oficiales aprobados. WebP local, fuentes locales, imágenes diferidas salvo hero, mapa solo tras pulsar “Cargar mapa”.

## Límites de la entrega

Proyecto local para presentación al dueño; no se publicó ni se contactó a la marca. El formulario no envía nada mientras no se configure un endpoint. “Pedir” usa Instagram y ubicación mientras no exista WhatsApp confirmado. La historia queda preparada para entrevista. Indexación desactivada por defecto hasta aprobar contenido y dominio.
