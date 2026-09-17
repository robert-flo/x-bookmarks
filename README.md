# x-bookmarks

Archivo consultable de bookmarks de [X](https://x.com). Sitio estático: HTML, CSS y JS, sin build ni backend.

**En vivo:** https://robert-flo.github.io/x-bookmarks/

## De dónde salen los datos

La fuente única es [`bookmarks.md`](bookmarks.md): un export en markdown de los bookmarks de Roberto, una viñeta por registro.

Cada línea sigue este patrón:

```text
- [etiqueta opcional] texto del post · por qué vale: … · @autor · https://x.com/…
```

`js/bookmarks.js` pide ese archivo con `fetch("bookmarks.md")` y lo parsea en el navegador. Clasifica cada ítem según el texto:

| Tipo | Criterio |
| --- | --- |
| promo | contiene `[promo]` |
| sensitive | contiene `[nsfw]` |
| idea | el motivo dice “conserva una idea” |
| watch | el resto |

Los totales del encabezado (lede y `ANALYZE`) y las métricas del tablero se calculan a partir de ese parseo. Si mañana cambia `bookmarks.md`, la página refleja el archivo nuevo sin tocar el HTML.

Si el fetch falla (por ejemplo abriendo `index.html` como `file://`), cae a una muestra mínima de tres registros.

## Cómo funciona la página

1. `index.html` monta el tablero y enlaza el [sistema visual de Kun Chen](https://github.com/kunchenguid/kunchenguid-design-system).
2. `js/design-system.js` convierte `[texto]` en anotaciones.
3. `js/bookmarks.js` indexa la colección, dibuja pulso (conteos, barras, top autores) y la cola de lectura (búsqueda, filtro, mezclar, cargar más).

No hay API ni base de datos. GitHub Pages sirve los archivos de `main` desde la raíz del repo.

## Desarrollo

Hace falta un servidor HTTP: el navegador no puede `fetch` el markdown desde disco.

```sh
make serve
```

Luego [http://127.0.0.1:8765/](http://127.0.0.1:8765/). En otra terminal: `make open`. Otro puerto: `PORT=9000 make serve`.
