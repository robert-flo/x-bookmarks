# x-bookmarks

Estos son los bookmarks de X de [@thePrimeagen_sv](https://x.com/thePrimeagen_sv). Están en una página para buscarlos y filtrarlos, no en una lista infinita.

Página: https://robert-flo.github.io/x-bookmarks/

## De dónde salen

El archivo [`bookmarks.md`](bookmarks.md) es un export de esos bookmarks, sacado con la API de [x.ai](https://x.ai/). Una línea por post.

Al abrir la página, el navegador lee ese archivo y arma el tablero. Si mañana hay más (o menos) líneas, los números de la cabecera cambian solos.

Cada línea se parece a esto:

```text
- texto del post · por qué vale: … · @autor · https://x.com/…
```

A veces hay una etiqueta al inicio (`[promo]` u `[nsfw]`). Con eso la página los agrupa:

- **promo** — dice `[promo]`
- **sensible** — dice `[nsfw]`
- **idea** — el motivo habla de conservar una idea
- **para revisar** — todo lo demás

## Cómo verla en tu máquina

```sh
make serve
```

Arranca Rails en http://127.0.0.1:8765/. `make build` escribe el estático en `build/`; `make preview` sirve esa carpeta (es lo que GitHub Pages publica). Otro puerto: `PORT=9000 make serve`.

## Archivos

| Archivo | Para qué |
| --- | --- |
| `bookmarks.md` | los datos |
| `app/views/` | la página (Rails la pinta) |
| `public/js/bookmarks.js` | leer el markdown y pintar la lista |
| `public/css/` | el aspecto |

Rails **construye**. GitHub Pages **sirve** el resultado. No hay servidor Rails en producción ni base de datos.
