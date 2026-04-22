<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Behance raw-image grabber — pull full-size images out of any Behance project, single or batched ZIP.**

[Website](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/) · [Report an issue](https://github.com/hooosberg/BeRaw/issues)

</div>

> English · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## What it does

Open any Behance project, BeRaw scans the page, highlights every large image with a blue outline, and drops them into a picker. Pick the ones you want (or hit "select all"), and pull them down as individual files or one ZIP.

- **Raw** — BeRaw pulls the largest file available on Behance's CDN, not the downsized preview.
- **One‑click per image** — the overlay button downloads just that image in the format you chose.
- **Batch to ZIP** — the sidebar packs everything into a single archive, no "save as" popup per file.
- **Format control** — keep original, auto-convert WebP → JPG, or force JPG/PNG on every image.
- **12 languages** — simplified / traditional Chinese, English, Japanese, Korean, French, German, Spanish, Portuguese, Russian, Italian, Vietnamese.

## Install

### From GitHub Releases (recommended while the Chrome Web Store listing is in review)

1. Grab the latest packaged `.zip` from the [Releases page](https://github.com/hooosberg/BeRaw/releases/latest).
2. Unzip it somewhere stable — **don't delete the folder after install**, Chrome loads the extension directly from it.
3. Open `chrome://extensions/` and toggle **Developer mode** (top right).
4. Click **Load unpacked** and select the unzipped folder.
5. Open any Behance project — the blue outlines should appear.

BeRaw ships with a built-in updater (Settings → About → **Check for updates**) that pings the same Releases API. When a new version is out you'll see a direct download link without leaving the extension.

### From source (for contributors)

```bash
git clone https://github.com/hooosberg/BeRaw.git
cd BeRaw
```

1. Open `chrome://extensions/` and toggle **Developer mode**.
2. Click **Load unpacked** and select the [`local/`](local/) folder.
3. Open any Behance project — the blue outlines should appear.

### Chrome Web Store

In review. Once approved, updates flow automatically — no need to re-download releases.

## How to use

| Step | Action |
| ---- | ------ |
| 1 | Open a Behance project page. |
| 2 | Wait for the blue outlines to appear on images — that's BeRaw finding the big ones. |
| 3 | Click **Select** on an image, or **Select all** in the side panel. |
| 4 | Choose an output format: **Original · Auto · JPG · PNG**. |
| 5 | Hit **Download selected (ZIP)** — or use the per-image **Download image** button. |

## Output formats

| Format | What it does |
| ------ | ------------ |
| **Original** | No re-encoding. Pulls the largest file from Behance's CDN. WebP is transcoded to JPG/PNG at maximum quality (most tools still hate WebP). |
| **Auto** | WebP becomes JPG, everything else passes through untouched. |
| **JPG** | Everything flattens to JPG. Transparent areas go white. Good for delivery. |
| **PNG** | Everything becomes PNG. Keeps transparency. |

## Repository layout

```
BeRaw/
├── local/                  # Chrome extension source (load-unpacked target)
│   ├── manifest.json
│   ├── sidepanel.html
│   ├── popup.{js,css}
│   ├── content.js
│   ├── background.js
│   ├── archive.js
│   ├── locales.js
│   └── icons/
├── .gitignore              # ignores releases/
├── README.md               # this file
├── pack-release.sh         # builds BeRaw-{version}.zip from local/
├── releases/               # gitignored — staging for release zips before GitHub upload
├── site/                   # GitHub Pages landing page
└── .github/workflows/      # auto-deploy site/ to Pages
```

The Chrome extension lives in `local/`. `site/` is served from GitHub Pages.
The `releases/` folder holds built zips locally — it is **not committed**, because the zips live on GitHub Releases as release assets.

## Publishing a new version

The extension's **Check for updates** button (Settings → About) queries the [GitHub Releases API](https://api.github.com/repos/hooosberg/BeRaw/releases/latest) for the latest tag and compares it against the running version. To publish a new version:

1. Bump `version` in [`local/manifest.json`](local/manifest.json).
2. Commit the change and push `main`.
3. From the repo root, run:
   ```bash
   bash pack-release.sh
   ```
   This packages `local/` into `releases/BeRaw-{version}.zip` (flat structure, ready for *Load unpacked*), skipping dev-only files.
4. Go to [github.com/hooosberg/BeRaw/releases/new](https://github.com/hooosberg/BeRaw/releases/new), create a new tag `v{version}`, title *BeRaw v{version}*, attach `BeRaw-{version}.zip`, publish.
5. Every installed extension will see the new version on its next update check.

## Landing page

The marketing site lives in [`site/`](site/) and is deployed to GitHub Pages by the workflow in [`.github/workflows/pages.yml`](.github/workflows/pages.yml). To enable it after pushing:

1. Go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow publishes `site/` to `https://hooosberg.github.io/BeRaw/`.

## Contributing

Bug reports, translation fixes, and new locales welcome. For translations, edit `local/locales.js` — each locale is a flat `{key: string}` map and keys mirror `LOCALES["en"]`.

## License

BeRaw is distributed under the [Business Source License 1.1](LICENSE) — **free for personal use, paid for commercial use**. In short:

- **Personal use is free.** Individual designers, students, hobbyists, and researchers may use BeRaw at no cost for mood boards, research, evaluation, and hobby projects — today and forever.
- **Commercial use requires a separate license.** Any use by or on behalf of a company, organization, government body, or other entity — including internal business use, redistribution as part of a product, resale, or building a commercial service around BeRaw — needs a paid license. Email <zikedece@proton.me> for terms.
- **Automatic conversion to Apache 2.0 on 2030-04-22.** Four years after initial release the Change Date triggers and BeRaw becomes fully open source under Apache License 2.0, lifting the commercial restriction for all prior versions.

See [LICENSE](LICENSE) for the full canonical BSL 1.1 text, and the web-formatted summary at [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html).

Also: [Terms of Service](https://hooosberg.github.io/BeRaw/terms.html) · [Privacy Policy](https://hooosberg.github.io/BeRaw/privacy.html)

## Contact

- Commercial licensing, custom terms, partnerships: <zikedece@proton.me>
- Bug reports, feature requests, translation fixes: [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## Respect for creators

BeRaw only downloads publicly accessible Behance images. Works on Behance are the property of their creators — please use BeRaw for personal reference, mood boards, and design research, and follow [Behance's Terms of Use](https://www.behance.net/misc/terms). If you use a creator's work, credit them.

## Friends

- [不二手造](https://artbuer.com) — independent original design studio
