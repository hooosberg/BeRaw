<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Capturador de imagens originais do Behance — tire os arquivos brutos em tamanho real de qualquer projeto Behance, um a um ou tudo num ZIP.**

[Site](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en) · [Reportar problema](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · Português · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## O que faz

Abra qualquer projeto Behance: BeRaw escaneia a página, contorna todas as imagens grandes em azul e as coloca no painel lateral para você escolher. Uma a uma ou «Selecionar tudo», como arquivos separados ou tudo num único ZIP.

- **Cru é cru mesmo** — BeRaw pega o maior arquivo do CDN do Behance, não a miniatura do feed.
- **Botão por imagem** — Cada sobreposição tem um botão que baixa aquela imagem no formato escolhido.
- **ZIP em lote** — O painel lateral empacota a seleção em um ZIP só. No Windows, sem «Salvar como» por arquivo.
- **Controle de formato** — Bytes originais, WebP→JPG automático, tudo JPG, ou tudo PNG.
- **12 idiomas** — chinês simplificado/tradicional, English, 日本語, 한국어, Français, Deutsch, Español, Português, Русский, Italiano, Tiếng Việt.

## Instalação

### Pelo GitHub Releases (recomendado)

1. Baixe o `.zip` mais recente na [página Releases](https://github.com/hooosberg/BeRaw/releases/latest).
2. Descompacte num lugar fixo (não apague a pasta — o Chrome carrega a extensão dali).
3. Abra `chrome://extensions/` e ative o **Modo de desenvolvedor** no canto superior direito.
4. Clique em **Carregar sem compactação** e escolha a pasta descompactada.
5. Abra um projeto Behance — as molduras azuis aparecem.

O verificador de atualizações embutido (Configurações → Sobre → **Procurar atualizações**) usa a mesma API, você vê as versões novas na hora.

### Pelo código-fonte (contribuidores)

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

Em `chrome://extensions/` ative o modo de desenvolvedor, **Carregar sem compactação** e escolha `local/`.

### Pela Chrome Web Store

[Instalar pela Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en).

## Uso

| Passo | Ação |
| ----- | ---- |
| 1 | Abrir um projeto Behance |
| 2 | Esperar as molduras azuis (imagens grandes encontradas) |
| 3 | Clicar em **Selecionar** numa imagem, ou **Selecionar tudo** no painel |
| 4 | Escolher formato: **Original · Auto · JPG · PNG** |
| 5 | **Baixar seleção (ZIP)** para tudo, ou **Baixar imagem** na barra de uma imagem para apenas aquela |

## Formatos de saída

| Formato | Comportamento |
| ------- | ------------- |
| **Original** | Sem recodificar. Maior arquivo do CDN do Behance direto. WebP vira JPG/PNG na qualidade máxima. |
| **Auto** | Só WebP vira JPG, o resto fica. |
| **JPG** | Tudo em JPG, áreas transparentes em branco. Bom para entrega. |
| **PNG** | Tudo em PNG, mantém transparência. |

## Licença

BeRaw é distribuído sob [Business Source License 1.1](LICENSE) — **grátis para uso pessoal, pago para uso comercial**:

- **Pessoal grátis**: designers individuais, estudantes, entusiastas e pesquisadores podem usar BeRaw sem custo para mood boards, pesquisa de design, avaliação e projetos pessoais — para sempre.
- **Comercial requer licença**: uso por empresa, time, órgão governamental ou qualquer organização — uso interno, redistribuição como parte de um produto, revenda, serviços comerciais sobre BeRaw — requer licença paga. E-mail <zikedece@proton.me>.
- **Conversão automática para Apache 2.0 em 2030-04-22**: quatro anos depois do primeiro lançamento o Change Date dispara, BeRaw passa a ser open source sob Apache 2.0 e a restrição comercial some para todas as versões anteriores.

Texto completo em [LICENSE](LICENSE), versão web em [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html). [Termos de Serviço](https://hooosberg.github.io/BeRaw/terms.html) · [Política de Privacidade](https://hooosberg.github.io/BeRaw/privacy.html)

## Contato

- Licença comercial, termos customizados, parcerias: <zikedece@proton.me>
- Reportar bugs, pedir recursos, corrigir traduções: [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## Respeito pelos criadores

BeRaw só baixa imagens Behance publicamente acessíveis. Obras no Behance pertencem aos seus criadores — use BeRaw para referência pessoal, mood boards e pesquisa de design, seguindo os [Termos de Uso do Behance](https://www.behance.net/misc/terms). Se inspirou no trabalho de alguém, dê os créditos.

## Amigos

- [不二手造](https://artbuer.com) — estúdio de design original independente
