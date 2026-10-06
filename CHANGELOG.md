# Changelog

All notable changes to BeRaw are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and BeRaw adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.8] — 2026-04-22

First public release.

### Added
- Behance project page scanner that highlights every full-size image with a blue outline.
- Chrome side panel UI for browsing, selecting, and downloading scanned images.
- Per-image download button rendered as an overlay on each image in the page.
- Batch download as a single ZIP, no per-file "save as" popup.
- Output format control: Original, Auto (WebP → JPG), force JPG, force PNG.
- 12 UI languages: English, Simplified Chinese, Traditional Chinese, Japanese, Korean, French, German, Spanish, Portuguese, Russian, Italian, Vietnamese.
- Settings panel with Help, Language, and About tabs.
- Built-in update checker that compares the installed version against GitHub Releases.
- Preferences persisted via `chrome.storage.local` (language and output format survive reopen).

[Unreleased]: https://github.com/hooosberg/BeRaw/compare/v0.1.8...HEAD
[0.1.8]: https://github.com/hooosberg/BeRaw/releases/tag/v0.1.8
