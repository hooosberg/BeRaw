<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Behance Roh-Bild-Grabber — zieh Originalbilder in voller Größe aus jedem Behance-Projekt, einzeln oder als ZIP.**

[Website](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/) · [Fehler melden](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · Deutsch · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## Was es kann

Öffne ein Behance-Projekt: BeRaw scannt die Seite, umrahmt jedes große Bild blau und stellt es im Seitenbereich zur Auswahl. Einzeln oder „Alle auswählen", als Einzeldateien oder als ein ZIP.

- **Wirklich roh** — BeRaw holt die größte Datei aus dem Behance-CDN, nicht das verkleinerte Vorschaubild aus dem Feed.
- **Button pro Bild** — Jedes Bild-Overlay hat einen Download-Button, der im gewählten Format nur dieses Bild zieht.
- **Bulk-ZIP** — Der Seitenbereich packt die Auswahl in ein einziges ZIP. Kein „Speichern unter" je Datei auf Windows.
- **Formatkontrolle** — Original-Bytes, WebP→JPG automatisch, alles JPG oder alles PNG.
- **12 Sprachen** — vereinfachtes/traditionelles Chinesisch, English, 日本語, 한국어, Français, Deutsch, Español, Português, Русский, Italiano, Tiếng Việt.

## Installation

### Von GitHub Releases (empfohlen)

1. Lade das neueste `.zip` von der [Releases-Seite](https://github.com/hooosberg/BeRaw/releases/latest).
2. Entpacke es an einen festen Ort (Ordner nicht löschen — Chrome lädt die Erweiterung von dort).
3. Öffne `chrome://extensions/` und aktiviere rechts oben den **Entwicklermodus**.
4. Klicke **Entpackte Erweiterung laden** und wähle den entpackten Ordner.
5. Öffne ein Behance-Projekt — die blauen Rahmen erscheinen.

Die integrierte Update-Prüfung (Einstellungen → Über → **Nach Updates suchen**) nutzt die gleiche API, du siehst neue Versionen sofort.

### Aus dem Quellcode (für Mitwirkende)

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

In `chrome://extensions/` den Entwicklermodus aktivieren, **Entpackte Erweiterung laden** und `local/` auswählen.

### Aus dem Chrome Web Store

*In Prüfung.*

## Benutzung

| Schritt | Aktion |
| ------- | ------ |
| 1 | Ein Behance-Projekt öffnen |
| 2 | Auf die blauen Rahmen warten (von BeRaw gefundene große Bilder) |
| 3 | **Auswählen** auf einem Bild, oder **Alle auswählen** im Seitenbereich |
| 4 | Format wählen: **Original · Auto · JPG · PNG** |
| 5 | **Auswahl herunterladen (ZIP)** für alles, oder **Bild herunterladen** im Bild-Overlay für einzelnes |

## Ausgabeformate

| Format | Verhalten |
| ------ | --------- |
| **Original** | Keine Neukodierung. Direkt die größte Datei vom Behance-CDN. WebP wird in Maximalqualität zu JPG/PNG. |
| **Auto** | WebP wird JPG, alles andere bleibt. |
| **JPG** | Alles JPG, transparente Bereiche weiß. Praktisch für Lieferung. |
| **PNG** | Alles PNG, Transparenz bleibt. |

## Lizenz

BeRaw steht unter der [Business Source License 1.1](LICENSE) — **privat kostenlos, kommerziell kostenpflichtig**:

- **Privat kostenlos**: Einzelne Designer, Studierende, Hobby-Nutzer und Forschende dürfen BeRaw kostenlos für Mood-Boards, Design-Recherche, Evaluation und Hobbyprojekte nutzen — dauerhaft.
- **Kommerziell lizenzpflichtig**: Nutzung durch oder für eine Firma, ein Team, eine Behörde oder eine Organisation — interne Nutzung, Redistribution als Teil eines Produkts, Weiterverkauf, kommerzielle Dienste auf BeRaw-Basis — erfordert eine bezahlte Lizenz. Mail an <zikedece@proton.me>.
- **Automatische Umstellung auf Apache 2.0 am 2030-04-22**: Vier Jahre nach Erstveröffentlichung wird der Change Date aktiv, BeRaw wird vollständig Open Source unter Apache 2.0, die kommerzielle Einschränkung fällt für alle Vorversionen weg.

Volltext in [LICENSE](LICENSE), Web-Fassung auf [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html). [Nutzungsbedingungen](https://hooosberg.github.io/BeRaw/terms.html) · [Datenschutzerklärung](https://hooosberg.github.io/BeRaw/privacy.html)

## Kontakt

- Kommerzielle Lizenz, Sonderkonditionen, Partnerschaften: <zikedece@proton.me>
- Bug-Reports, Feature-Wünsche, Übersetzungskorrekturen: [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## Respekt für Kreative

BeRaw lädt nur öffentlich zugängliche Behance-Bilder herunter. Behance-Werke gehören ihren Urhebern — nutze BeRaw für persönliche Referenz, Mood-Boards und Design-Recherche und halte dich an die [Behance-Nutzungsbedingungen](https://www.behance.net/misc/terms). Wer ein fremdes Werk als Inspiration nutzt, nennt den Urheber.

## Partnerlinks

- [不二手造](https://artbuer.com) — unabhängiges Originaldesign-Studio
