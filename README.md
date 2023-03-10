# Markdown Links

## Índice

- [1. Acerca de MD-Links](#1-acerca-de-mdlinks)
- [2. Como instalar md-links](#2-como-instalar-md-links)
- [3. Implementacion de uso](#3-implementacion-de-uso)
- [4. Diagrama de flujo](#4-diagrama-de-flujo)
- [5. Checklist](#5-checklist)

---

## 1. ACERCA DE MDLINKS

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2.COMO INSTALAR MD LINKS

```sh
npm install ysisc-md-links
```

## 3. Implementacion de uso

Si necesitas ayuda:

```sh
md-links <path> --help
```

![Getting Started](./img/mdlinks%20help.png)

En caso de necesitar los links

```sh
md-links <path> --validate
```

![Getting Started](./img/mdlinks%20validate.png)

En caso de necesitar los links totales exitoso y rotos

```sh
md-links <path> --validate --stats
```

![Getting Started](./img/mdlinks%20stats%20validate.png)

En caso de necesitar los links totales exitoso

```sh
md-links <path> --stats
```

![Getting Started](./img/mdlinks%20stats%20.png)

## 4. Diagrama de flujo

---

## 5. Checklist

### General

- [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [ ] Un board con el backlog para la implementación de la librería.
- [ ] Documentación técnica de la librería.
- [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [x] El módulo exporta una función con la interfaz (API) esperada.
- [x] Implementa soporte para archivo individual
- [x] Implementa soporte para directorios
- [x] Implementa `options.validate`

### CLI

- [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [x] Se ejecuta sin errores / output esperado
- [x] Implementa `--validate`
- [x] Implementa `--stats`

### Pruebas / tests

- [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [x] Pasa tests (y linters) (`npm test`).
