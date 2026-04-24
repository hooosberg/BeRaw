<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Estrattore di immagini originali da Behance — porta via file grezzi a piena dimensione da qualsiasi progetto Behance, uno alla volta o tutti in uno ZIP.**

[Sito](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en) · [Segnalare un problema](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · Italiano · [Tiếng Việt](README.vi.md)

---

## Cosa fa

Apri un progetto Behance: BeRaw scansiona la pagina, evidenzia ogni immagine grande in blu e le mette nel pannello laterale perché tu possa sceglierle. Una alla volta o «Seleziona tutto», come singoli file o tutto in uno ZIP.

- **Raw davvero raw** — BeRaw prende il file più grande dal CDN di Behance, non l'anteprima ridotta del feed.
- **Bottone per immagine** — Ogni overlay ha un pulsante per scaricare quella singola immagine nel formato scelto.
- **ZIP di gruppo** — Il pannello impacchetta la selezione in un solo ZIP. Su Windows niente più «Salva con nome» per ogni file.
- **Controllo formato** — Byte originali, WebP→JPG automatico, tutto JPG o tutto PNG.
- **12 lingue** — cinese semplificato/tradizionale, English, 日本語, 한국어, Français, Deutsch, Español, Português, Русский, Italiano, Tiếng Việt.

## Installazione

### Da GitHub Releases (consigliato)

1. Scarica l'ultimo `.zip` dalla [pagina Releases](https://github.com/hooosberg/BeRaw/releases/latest).
2. Scompatta in un posto stabile (non cancellare la cartella — Chrome carica l'estensione da lì).
3. Apri `chrome://extensions/` e attiva la **Modalità sviluppatore** in alto a destra.
4. Clicca **Carica estensione non pacchettizzata** e scegli la cartella scompattata.
5. Apri un progetto Behance — appaiono le cornici blu.

Il controllo aggiornamenti integrato (Impostazioni → Informazioni → **Cerca aggiornamenti**) usa la stessa API, vedi subito le nuove versioni.

### Dal codice (contributori)

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

In `chrome://extensions/` attiva la modalità sviluppatore, **Carica estensione non pacchettizzata** e scegli `local/`.

### Dal Chrome Web Store

[Installa dal Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en).

## Uso

| Passo | Azione |
| ----- | ------ |
| 1 | Apri una pagina di progetto Behance |
| 2 | Aspetta le cornici blu (le immagini grandi trovate) |
| 3 | Clicca **Seleziona** su un'immagine o **Seleziona tutto** nel pannello |
| 4 | Scegli il formato: **Originale · Auto · JPG · PNG** |
| 5 | **Scarica selezione (ZIP)** per tutto, o **Scarica immagine** sull'overlay per una sola |

## Formati di output

| Formato | Comportamento |
| ------- | ------------- |
| **Originale** | Nessuna ricodifica. File più grande dal CDN di Behance. WebP a JPG/PNG in qualità massima. |
| **Auto** | Solo WebP diventa JPG, il resto resta. |
| **JPG** | Tutto in JPG, aree trasparenti bianche. Buono per la consegna. |
| **PNG** | Tutto in PNG, la trasparenza resta. |

## Licenza

BeRaw è distribuito sotto [Business Source License 1.1](LICENSE) — **gratis per uso personale, a pagamento per uso commerciale**:

- **Personale gratis**: designer singoli, studenti, appassionati e ricercatori possono usare BeRaw gratuitamente per mood board, ricerca di design, valutazione e progetti personali — per sempre.
- **Commerciale con licenza**: uso da parte di aziende, team, enti pubblici o qualsiasi organizzazione — uso interno, ridistribuzione in un prodotto, rivendita, servizi commerciali su BeRaw — richiede licenza a pagamento. Scrivi a <zikedece@proton.me>.
- **Conversione automatica ad Apache 2.0 il 2030-04-22**: quattro anni dopo il primo rilascio scatta il Change Date, BeRaw diventa completamente open source sotto Apache 2.0 e la restrizione commerciale decade per tutte le versioni precedenti.

Testo completo in [LICENSE](LICENSE), versione web su [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html). [Termini di servizio](https://hooosberg.github.io/BeRaw/terms.html) · [Informativa sulla privacy](https://hooosberg.github.io/BeRaw/privacy.html)

## Contatto

- Licenza commerciale, condizioni personalizzate, partnership: <zikedece@proton.me>
- Bug, richieste di funzionalità, correzioni di traduzione: [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## Rispetto per i creatori

BeRaw scarica solo immagini Behance pubblicamente accessibili. Le opere su Behance appartengono ai loro creatori — usa BeRaw per riferimento personale, mood board e ricerca di design, nel rispetto dei [Termini di uso di Behance](https://www.behance.net/misc/terms). Se ti ispiri al lavoro altrui, credita sempre il creatore.

## Amici

- [不二手造](https://artbuer.com) — studio di design originale indipendente
