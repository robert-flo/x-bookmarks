# x-bookmarks

Sitio de bookmarks de X, **construido con Ruby on Rails**. En producción no corre un servidor Rails: el rake genera HTML estático y [GitHub Pages](https://robert-flo.github.io/x-bookmarks/) lo sirve.

Los bookmarks son de [@thePrimeagen_sv](https://x.com/thePrimeagen_sv), exportados con la API de [x.ai](https://x.ai/).

## Cómo está hecha

Rails pinta la página (vistas ERB, sin base de datos). El navegador lee [`bookmarks.md`](bookmarks.md) y arma búsqueda, filtros y métricas. Un push a `main` ejecuta `rake site:build` y publica la carpeta `build/`.

```text
Rails (desarrollo / CI)  →  build/  →  GitHub Pages
```

## De dónde salen los datos

Una línea por post:

```text
- texto del post · por qué vale: … · @autor · https://x.com/…
```

Etiquetas al inicio: `[promo]`, `[nsfw]`. Si el motivo habla de conservar una idea, es **idea**; si no, **para revisar**. Si cambia el markdown, los números de la cabecera cambian solos.

## Flujo de trabajo

Hace falta Ruby (ver `.ruby-version`). Luego:

```sh
make setup      # gems
make serve      # Rails en http://127.0.0.1:8765/
make test
make build      # estático en build/
make preview    # sirve build/ como Pages
```

`make` lista los comandos. Otro puerto: `PORT=9000 make serve`.

## Piezas

| Qué | Rol |
| --- | --- |
| Rails 8 | app, vistas, `rake site:build` |
| `bookmarks.md` | datos |
| `public/js/bookmarks.js` | parseo y UI en el navegador |
| `public/css/` | aspecto |
| GitHub Actions | build + deploy a Pages |
