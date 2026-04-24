<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Extractor de imágenes originales de Behance — saca los archivos crudos a tamaño completo de cualquier proyecto Behance, una a una o todo en un ZIP.**

[Web](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en) · [Reportar problema](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · Español · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## Lo que hace

Abre cualquier proyecto Behance y BeRaw escanea la página, marca con borde azul todas las imágenes grandes y las pone en el panel lateral para que elijas. Una a una o «Seleccionar todo», como archivos sueltos o todo en un ZIP.

- **Crudo de verdad** — BeRaw saca el archivo más grande del CDN de Behance, no la miniatura del feed.
- **Botón por imagen** — Cada superposición tiene un botón para descargar esa imagen concreta en el formato elegido.
- **ZIP en lote** — El panel lateral empaqueta la selección en un único ZIP. En Windows, sin «Guardar como» por archivo.
- **Control de formato** — Bytes originales, WebP→JPG automático, todo JPG, o todo PNG.
- **12 idiomas** — Simplificado/tradicional chino, English, 日本語, 한국어, Français, Deutsch, Español, Português, Русский, Italiano, Tiếng Việt.

## Instalación

### Desde GitHub Releases (recomendado)

1. Descarga el último `.zip` desde la [página de Releases](https://github.com/hooosberg/BeRaw/releases/latest).
2. Descomprímelo en un lugar estable (no borres la carpeta, Chrome carga la extensión desde ahí).
3. Abre `chrome://extensions/` y activa el **Modo desarrollador** arriba a la derecha.
4. Pulsa **Cargar descomprimida** y elige la carpeta.
5. Abre un proyecto Behance — verás los bordes azules.

El verificador de actualizaciones integrado (Ajustes → Acerca de → **Buscar actualizaciones**) usa la misma API, así verás las nuevas versiones.

### Desde el código (contribuyentes)

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

En `chrome://extensions/` activa el modo desarrollador, **Cargar descomprimida** y elige `local/`.

### Desde Chrome Web Store

[Instalar desde Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en).

## Uso

| Paso | Acción |
| ---- | ------ |
| 1 | Abre una página de proyecto de Behance |
| 2 | Espera a los bordes azules (imágenes grandes detectadas) |
| 3 | Pulsa **Seleccionar** en una imagen, o **Seleccionar todo** en el panel |
| 4 | Elige formato: **Original · Auto · JPG · PNG** |
| 5 | **Descargar selección (ZIP)** para todo, o **Descargar imagen** en la superposición para una sola |

## Formatos de salida

| Formato | Comportamiento |
| ------- | -------------- |
| **Original** | Sin recodificar. El archivo más grande del CDN de Behance. WebP a JPG/PNG a máxima calidad. |
| **Auto** | Solo WebP pasa a JPG, lo demás queda igual. |
| **JPG** | Todo en JPG, zonas transparentes en blanco. Útil para entrega. |
| **PNG** | Todo en PNG, mantiene transparencia. |

## Licencia

BeRaw se distribuye bajo [Business Source License 1.1](LICENSE) — **gratis para uso personal, de pago para uso comercial**:

- **Personal gratis**: diseñadores individuales, estudiantes, aficionados e investigadores pueden usar BeRaw sin coste para mood boards, investigación de diseño, evaluaciones y proyectos de afición — hoy y siempre.
- **Comercial con licencia**: uso por una empresa, equipo, administración o cualquier organización — uso interno, redistribución como parte de un producto, reventa, servicios comerciales sobre BeRaw — requiere licencia de pago. Escribe a <zikedece@proton.me>.
- **Conversión automática a Apache 2.0 el 2030-04-22**: cuatro años después del primer lanzamiento se activa el Change Date, BeRaw pasa a ser totalmente open source bajo Apache 2.0 y la restricción comercial se levanta para todas las versiones anteriores.

Texto completo en [LICENSE](LICENSE), versión web en [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html). [Términos del servicio](https://hooosberg.github.io/BeRaw/terms.html) · [Política de privacidad](https://hooosberg.github.io/BeRaw/privacy.html)

## Contacto

- Licencia comercial, condiciones personalizadas, colaboraciones: <zikedece@proton.me>
- Informes de errores, nuevas funciones, correcciones de traducción: [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## Respeto a los creadores

BeRaw solo descarga imágenes de Behance que son públicas. Las obras en Behance pertenecen a sus creadores — usa BeRaw para referencia personal, mood boards e investigación de diseño, y cumple los [Términos de uso de Behance](https://www.behance.net/misc/terms). Si te inspiras en el trabajo de alguien, acredítalo.

## Amigos

- [不二手造](https://artbuer.com) — estudio de diseño original independiente
