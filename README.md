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

No abras `index.html` haciendo doble clic. El navegador no puede leer `bookmarks.md` así.

```sh
make serve
```

Entra a http://127.0.0.1:8765/

En otra terminal, `make open`. Otro puerto: `PORT=9000 make serve`.

## Archivos

| Archivo | Para qué |
| --- | --- |
| `bookmarks.md` | los datos |
| `index.html` | la página |
| `js/bookmarks.js` | leer el markdown y pintar la lista |
| `css/` | el aspecto |

GitHub Pages publica lo que hay en `main`. No hay servidor propio ni base de datos.
