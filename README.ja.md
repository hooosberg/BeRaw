<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Behance の原画像グラバー。あらゆる Behance プロジェクトからフルサイズのロー画像を、1 枚ずつでも一括 ZIP でも。**

[公式サイト](https://hooosberg.github.io/BeRaw/) · [Chrome ウェブストア](https://chromewebstore.google.com/) · [不具合報告](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · 日本語 · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## できること

任意の Behance プロジェクトを開くと、BeRaw がページをスキャンし、大きな画像を青枠で囲み、サイドパネルで選択できるようにします。1 枚だけでも「すべて選択」で全部でも、個別ファイルまたは 1 つの ZIP として取得できます。

- **本当の原画を取得** — Behance CDN の最大サイズファイルを直接。フィードに出るサムネイルではありません。
- **画像ごとのダウンロードボタン** — 画像上のオーバーレイに、現在の形式で単体取得するボタンを常設。
- **一括 ZIP** — サイドパネルで複数選択を 1 つの ZIP に。Windows でも「名前を付けて保存」の繰り返しはなし。
- **形式コントロール** — オリジナルのバイト、WebP→JPG 自動変換、全 JPG、全 PNG の 4 種。
- **12 言語** — 簡体/繁体中文、English、日本語、한국어、Français、Deutsch、Español、Português、Русский、Italiano、Tiếng Việt。

## インストール

### GitHub Releases から（推奨）

1. [Releases ページ](https://github.com/hooosberg/BeRaw/releases/latest)から最新の `.zip` をダウンロード。
2. 固定の場所に解凍（インストール後にフォルダを削除しないでください。Chrome はそこから読み込みます）。
3. `chrome://extensions/` を開き、右上の**デベロッパーモード**を有効化。
4. **パッケージ化されていない拡張機能を読み込む**をクリックし、解凍したフォルダを選択。
5. Behance プロジェクトを開くと青枠が現れます。

内蔵のアップデート確認（設定 → 情報 → **更新を確認**）も Releases API を使っているので、新版が出るとすぐわかります。

### ソースから（コントリビューター向け）

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

`chrome://extensions/` でデベロッパーモードを有効にし、**パッケージ化されていない拡張機能を読み込む**で `local/` フォルダを選択。

### Chrome ウェブストアから

*現在審査中。*

## 使い方

| 手順 | 操作 |
| ---- | ---- |
| 1 | Behance プロジェクトページを開く |
| 2 | 青枠が出るまで待つ（BeRaw が見つけた大きい画像） |
| 3 | 画像の**選択**か、サイドパネルの**すべて選択** |
| 4 | 出力形式を選ぶ：**オリジナル · 自動 · JPG · PNG** |
| 5 | **選択画像をダウンロード (ZIP)** で一括、または画像の**画像をダウンロード**で単体 |

## 出力形式

| 形式 | 挙動 |
| ---- | ---- |
| **オリジナル** | 再エンコードなし。Behance CDN の最大サイズを直接取得。WebP は最高品質で JPG/PNG に再エンコード。|
| **自動** | WebP のみ JPG に変換、他はそのまま。|
| **JPG** | すべて JPG に統一。透明部は白で塗りつぶし。納品向け。|
| **PNG** | すべて PNG に統一。透明度は保持。|

## ライセンス

BeRaw は [Business Source License 1.1](LICENSE) で配布されます — **個人利用は無料、商用は有料**：

- **個人利用は無料**：個人デザイナー、学生、趣味ユーザー、研究者は、ムードボード、デザイン調査、評価、趣味プロジェクトのために永続的に無料で利用できます。
- **商用はライセンス必須**：会社、チーム、政府機関、組織による利用 — 社内利用、製品への再配布、再販、BeRaw を基盤とした商用サービスの提供 — には別途有料ライセンスが必要です。<zikedece@proton.me>。
- **2030-04-22 に Apache 2.0 へ自動変換**：初回公開から 4 年後の Change Date で BeRaw は完全に Apache 2.0 のオープンソースとなり、それまでの全バージョンの商用制限が解除されます。

完全な文言は [LICENSE](LICENSE)、Web 版は [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html)。[利用規約](https://hooosberg.github.io/BeRaw/terms.html) · [プライバシーポリシー](https://hooosberg.github.io/BeRaw/privacy.html)

## 連絡先

- 商用ライセンス、カスタム条件、提携：<zikedece@proton.me>
- 不具合報告、機能要望、翻訳修正：[github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## クリエイターへの敬意

BeRaw はブラウザがすでに見られる公開 Behance 画像のみをダウンロードします。Behance の作品の著作権はクリエイター本人に帰属します — ムードボード、個人参考、デザイン調査にご活用いただき、[Behance 利用規約](https://www.behance.net/misc/terms)を遵守してください。作品を参考にした際は、クリエイターをクレジットしてください。

## フレンドリンク

- [不二手造](https://artbuer.com) — オリジナルデザインスタジオ
