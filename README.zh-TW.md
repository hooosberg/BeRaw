<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Behance 原圖抓取器——從任意 Behance 專案中取出未壓縮的大圖，單張或整包 ZIP。**

[官網](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/) · [回報問題](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · 繁體中文 · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## 功能

開啟任意 Behance 專案，BeRaw 掃描頁面、為每張大圖描藍框，並放進側邊欄讓你挑。單張挑或一鍵「全選」，以單檔或整包 ZIP 下載。

- **Raw 就是 raw**——BeRaw 取的是 Behance CDN 上最大的那份，而不是動態裡的縮圖。
- **圖片上單張下載**——懸浮列直接有下載鈕，以當前格式抓當前這張。
- **整包 ZIP**——側邊欄把已選整包成一個 ZIP，Windows 也免去逐張「另存新檔」。
- **格式可控**——保留原位元、WebP 自動轉 JPG、統一 JPG、統一 PNG 四種輸出。
- **12 種語言**——簡繁中文、English、日本語、한국어、Français、Deutsch、Español、Português、Русский、Italiano、Tiếng Việt。

## 安裝

### 從 GitHub Releases（推薦）

1. 到 [Releases 頁](https://github.com/hooosberg/BeRaw/releases/latest)下載最新 `.zip`。
2. 解壓到一個固定資料夾（別刪，Chrome 直接從這裡載入）。
3. 打開 `chrome://extensions/`，右上角啟用**開發者模式**。
4. 點**載入未封裝項目**，選解壓後的資料夾。
5. 開啟任意 Behance 專案頁——藍框會出現。

內建更新檢查（設定 → 關於 → **檢查更新**）用的是 Releases API，新版一出你就會看到提示。

### 從原始碼（給貢獻者）

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

然後打開 `chrome://extensions/` 啟用開發者模式，**載入未封裝項目**，選 `local/` 資料夾。

### 從 Chrome 線上應用程式商店

*上架審核中。*

## 使用

| 步驟 | 動作 |
| ---- | ---- |
| 1 | 開啟 Behance 專案頁 |
| 2 | 等藍框出現——這是 BeRaw 找到的大圖 |
| 3 | 在圖上點**選中**，或在側邊欄點**全選** |
| 4 | 選輸出格式：**原圖 · 自動 · JPG · PNG** |
| 5 | 點**下載已選圖片 (ZIP)**，或用圖片上的**下載圖片**抓單張 |

## 輸出格式

| 格式 | 說明 |
| ---- | ---- |
| **原圖** | 不重新編碼。直接取 Behance CDN 上最大的那份。WebP 會以最高品質轉為 JPG/PNG。 |
| **自動** | WebP 轉 JPG，其他維持原樣。 |
| **JPG** | 全部壓成 JPG，透明區域鋪白底。交付常用。 |
| **PNG** | 全部轉 PNG，保留透明。 |

## 授權

BeRaw 採 [Business Source License 1.1](LICENSE)——**個人免費，商用付費**：

- **個人免費**：個人設計師、學生、業餘愛好者、研究人員可永久免費使用，做 mood board、設計研究、評估、興趣專案都行。
- **商用需授權**：公司、團隊、政府機構、任何組織的使用——包含內部使用、作為產品再散佈、轉售、以 BeRaw 為基礎提供商業服務——需要單獨付費授權。信件 <zikedece@proton.me>。
- **2030-04-22 自動轉 Apache 2.0**：首次發布四年後 Change Date 觸發，BeRaw 全面開源為 Apache 2.0，所有先前版本的商業限制一併解除。

完整文字見 [LICENSE](LICENSE)，網頁版見 [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html)。[服務條款](https://hooosberg.github.io/BeRaw/terms.html) · [隱私權政策](https://hooosberg.github.io/BeRaw/privacy.html)

## 聯絡

- 商用授權、客製條款、合作：<zikedece@proton.me>
- 問題回報、新功能建議、翻譯修訂：[github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## 尊重創作者

BeRaw 僅下載瀏覽器本來就看得到的公開 Behance 圖片。Behance 作品版權仍屬原作者——請把 BeRaw 用在個人參考、mood board、設計研究，並遵守 [Behance 使用條款](https://www.behance.net/misc/terms)。若參考了某位創作者的作品，請署名。

## 友情連結

- [不二手造](https://artbuer.com) — 原創設計工作室
