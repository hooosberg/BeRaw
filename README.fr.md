<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Extracteur d'images brutes pour Behance — récupérez les originaux pleine taille de n'importe quel projet Behance, un par un ou en ZIP.**

[Site](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/) · [Signaler un problème](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · Français · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## Ce que ça fait

Ouvrez un projet Behance : BeRaw scanne la page, encadre chaque grande image en bleu et les place dans le panneau latéral pour que vous les sélectionniez. Une par une ou « Tout sélectionner », récupération fichier par fichier ou d'un coup en ZIP.

- **Brut vraiment brut** — BeRaw récupère le fichier le plus grand sur le CDN de Behance, pas l'aperçu réduit du flux.
- **Bouton par image** — Chaque overlay a un bouton pour télécharger cette image au format choisi.
- **ZIP groupé** — Le panneau latéral regroupe la sélection dans un seul ZIP. Sur Windows plus de « Enregistrer sous » à répétition.
- **Contrôle du format** — Octets d'origine, WebP auto → JPG, tout en JPG, ou tout en PNG.
- **12 langues** — simplifié/traditionnel chinois, English, 日本語, 한국어, Français, Deutsch, Español, Português, Русский, Italiano, Tiếng Việt.

## Installation

### Depuis GitHub Releases (recommandé)

1. Téléchargez le dernier `.zip` depuis la [page Releases](https://github.com/hooosberg/BeRaw/releases/latest).
2. Décompressez dans un emplacement stable (ne supprimez pas le dossier — Chrome charge l'extension depuis là).
3. Ouvrez `chrome://extensions/` et activez le **Mode développeur** en haut à droite.
4. Cliquez **Charger l'extension non empaquetée** et sélectionnez le dossier décompressé.
5. Ouvrez un projet Behance — les cadres bleus apparaissent.

Le vérificateur intégré (Paramètres → À propos → **Vérifier les mises à jour**) utilise la même API, vous verrez les nouvelles versions.

### Depuis les sources (contributeurs)

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

Dans `chrome://extensions/` activez le mode développeur, **Charger l'extension non empaquetée** et choisissez `local/`.

### Depuis le Chrome Web Store

*En cours de vérification.*

## Utilisation

| Étape | Action |
| ----- | ------ |
| 1 | Ouvrez un projet Behance |
| 2 | Attendez les cadres bleus (les grandes images trouvées par BeRaw) |
| 3 | Cliquez **Sélectionner** sur une image, ou **Tout sélectionner** dans le panneau |
| 4 | Choisissez un format : **Original · Auto · JPG · PNG** |
| 5 | Cliquez **Télécharger la sélection (ZIP)** ou utilisez **Télécharger l'image** sur un overlay |

## Formats de sortie

| Format | Comportement |
| ------ | ------------ |
| **Original** | Aucun ré-encodage. Le plus grand fichier du CDN Behance. WebP trans-codé en JPG/PNG à la qualité maximale. |
| **Auto** | WebP → JPG, tout le reste intact. |
| **JPG** | Tout en JPG, zones transparentes en blanc. Pratique pour la livraison. |
| **PNG** | Tout en PNG, conserve la transparence. |

## Licence

BeRaw est distribué sous [Business Source License 1.1](LICENSE) — **gratuit pour l'usage personnel, payant pour l'usage commercial** :

- **Usage personnel gratuit** : designers individuels, étudiants, amateurs et chercheurs peuvent utiliser BeRaw gratuitement pour leurs mood boards, recherches design, évaluations et projets personnels — aujourd'hui et toujours.
- **Usage commercial sur licence** : usage par ou pour le compte d'une entreprise, d'une équipe, d'une administration ou de toute organisation — y compris usage interne, redistribution dans un produit, revente, services commerciaux basés sur BeRaw — nécessite une licence payante. Écrivez à <zikedece@proton.me>.
- **Conversion automatique en Apache 2.0 le 2030-04-22** : quatre ans après la sortie initiale, le Change Date s'active et BeRaw devient entièrement open source sous Apache 2.0, levant les restrictions commerciales pour toutes les versions antérieures.

Texte complet dans [LICENSE](LICENSE), version web sur [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html). [Conditions d'utilisation](https://hooosberg.github.io/BeRaw/terms.html) · [Politique de confidentialité](https://hooosberg.github.io/BeRaw/privacy.html)

## Contact

- Licence commerciale, conditions sur mesure, partenariats : <zikedece@proton.me>
- Bugs, demandes de fonctionnalités, corrections de traduction : [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## Respect des créateurs

BeRaw ne télécharge que des images Behance publiquement accessibles. Les œuvres sur Behance appartiennent à leurs créateurs — utilisez BeRaw pour vos références personnelles, mood boards et recherches design, et respectez les [Conditions d'utilisation de Behance](https://www.behance.net/misc/terms). Si vous vous inspirez du travail d'un créateur, créditez-le.

## Partenaires

- [不二手造](https://artbuer.com) — studio de design original indépendant
