<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Behance 原图抓取器 —— 从任意 Behance 项目里把未压缩的大图拿出来，单张或整包 ZIP。**

[官网](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en) · [报告问题](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · 简体中文 · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## 功能

打开任意 Behance 项目，BeRaw 扫描页面、给每张大图描蓝框，然后把它们放进侧边栏让你挑。单张挑或一键「全选」，直接以单文件或整包 ZIP 下载。

- **Raw 就是 raw** —— BeRaw 取的是 Behance CDN 上最大那个文件，不是信息流里的预览缩图。
- **图上单张下载** —— 图片悬浮条上直接有下载按钮，当前格式下载当前这一张。
- **整包 ZIP** —— 侧边栏把所有选中打成一个 ZIP，Windows 也免去逐张「另存为」。
- **格式可控** —— 保留原字节、WebP 自动转 JPG、统一 JPG、统一 PNG 四种输出。
- **12 种语言** —— 简繁中文、English、日本語、한국어、Français、Deutsch、Español、Português、Русский、Italiano、Tiếng Việt。

## 安装

### 从 GitHub Releases（推荐）

1. 到 [Releases 页](https://github.com/hooosberg/BeRaw/releases/latest)下载最新 `.zip`。
2. 解压到一个不会动的目录（别删掉文件夹，Chrome 从这儿加载）。
3. 打开 `chrome://extensions/`，右上角开启**开发者模式**。
4. 点**加载已解压的扩展程序**，选解压后的文件夹。
5. 打开任意 Behance 项目页——蓝框就会出现。

插件内置更新检查（设置 → 关于 → **检查更新**）用的就是 Releases API，新版本发布你会看到提示。

### 从源码（给贡献者）

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

然后打开 `chrome://extensions/` 开启开发者模式，**加载已解压的扩展程序**，选 `local/` 文件夹。

### 从 Chrome Web Store

[在 Chrome Web Store 安装](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en)。

## 使用

| 步骤 | 操作 |
| ---- | ---- |
| 1 | 打开 Behance 项目页 |
| 2 | 等蓝框出现——这是 BeRaw 找到的大图 |
| 3 | 在图上点**选中**，或在侧边栏点**全选** |
| 4 | 选输出格式：**原图 · 自动 · JPG · PNG** |
| 5 | 点**下载选中图片 (ZIP)**，或用图上**下载图片**抓单张 |

## 输出格式

| 格式 | 说明 |
| ---- | ---- |
| **原图** | 不重新编码。直接取 Behance CDN 上最大的那份。WebP 会以最高质量转成 JPG/PNG（毕竟一半工具还是打不开 WebP）。|
| **自动** | WebP 转 JPG，其他格式保持原样。|
| **JPG** | 全部压成 JPG，透明区域铺白底。交付常用。|
| **PNG** | 全部转 PNG，保留透明。|

## 许可

BeRaw 采用 [Business Source License 1.1](LICENSE) —— **个人免费，商用付费**：

- **个人免费**：个人设计师、学生、业余爱好者、研究人员可以永久免费使用，做 mood board、设计研究、评估、兴趣项目都行。
- **商用需授权**：公司、团队、政府机构、任何组织的使用——包括内部使用、作为产品的一部分再分发、转售、基于 BeRaw 提供商业服务——需要单独付费授权。邮件 <zikedece@proton.me>。
- **2030-04-22 自动转 Apache 2.0**：首次发布四年后 Change Date 触发，BeRaw 全面开源为 Apache 2.0，所有此前版本的商业限制一并解除。

完整文本见 [LICENSE](LICENSE)，网页版见 [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html)。[服务条款](https://hooosberg.github.io/BeRaw/terms.html) · [隐私政策](https://hooosberg.github.io/BeRaw/privacy.html)

## 联系

- 商用授权、自定义条款、合作：<zikedece@proton.me>
- 问题反馈、新功能建议、翻译修订：[github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## 尊重创作者

BeRaw 只下载浏览器本来就能看到的公开 Behance 图片。Behance 上的作品版权属于原作者——请把 BeRaw 用在个人参考、mood board、设计研究，遵守 [Behance 服务条款](https://www.behance.net/misc/terms)。如果你参考了某位创作者的作品，请署名。

## 友情链接

- [不二手造](https://artbuer.com) — 原创设计工作室
