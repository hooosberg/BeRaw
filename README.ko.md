<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Behance 원본 이미지 헌터. 어떤 Behance 프로젝트에서든 풀사이즈 원본을, 한 장씩 또는 ZIP으로 한꺼번에.**

[웹사이트](https://hooosberg.github.io/BeRaw/) · [Chrome 웹 스토어](https://chromewebstore.google.com/) · [이슈 보고](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · 한국어 · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Tiếng Việt](README.vi.md)

---

## 기능

아무 Behance 프로젝트나 열면, BeRaw가 페이지를 스캔해 모든 큰 이미지에 파란 테두리를 그리고 사이드 패널에서 고르게 해 줍니다. 한 장씩 고르거나 「모두 선택」으로 일괄, 개별 파일 또는 ZIP 하나로 받을 수 있습니다.

- **진짜 원본** — BeRaw는 Behance CDN의 최대 크기 파일을 가져옵니다. 피드에 보이는 축소본이 아닙니다.
- **이미지별 다운로드** — 이미지 위 오버레이에 현재 형식으로 해당 이미지만 받는 버튼이 있습니다.
- **일괄 ZIP** — 사이드 패널이 선택한 이미지 전부를 하나의 ZIP으로. Windows에서도 파일마다 「다른 이름으로 저장」 안 눌러도 됩니다.
- **형식 제어** — 원본 바이트, WebP 자동 JPG, 전체 JPG, 전체 PNG 중 선택.
- **12개 언어** — 간체/번체 중문, English, 日本語, 한국어, Français, Deutsch, Español, Português, Русский, Italiano, Tiếng Việt.

## 설치

### GitHub Releases에서 (권장)

1. [Releases 페이지](https://github.com/hooosberg/BeRaw/releases/latest)에서 최신 `.zip`을 내려받습니다.
2. 안정된 위치에 압축을 풉니다 (폴더를 삭제하지 마세요. Chrome이 여기서 확장을 로드합니다).
3. `chrome://extensions/`를 열고 오른쪽 위에서 **개발자 모드**를 켭니다.
4. **압축해제된 확장 프로그램을 로드합니다**를 클릭하고 압축 푼 폴더를 고릅니다.
5. Behance 프로젝트를 열면 파란 테두리가 보입니다.

내장 업데이트 확인(설정 → 정보 → **업데이트 확인**)도 같은 Releases API를 사용하므로 새 버전이 나오면 바로 알 수 있습니다.

### 소스에서 (기여자용)

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

`chrome://extensions/`에서 개발자 모드를 켜고 **압축해제된 확장 프로그램을 로드합니다**로 `local/` 폴더를 선택하세요.

### Chrome 웹 스토어에서

*심사 중입니다.*

## 사용법

| 단계 | 동작 |
| ---- | ---- |
| 1 | Behance 프로젝트 페이지를 연다 |
| 2 | 파란 테두리가 생길 때까지 기다린다 (BeRaw가 찾은 큰 이미지) |
| 3 | 이미지의 **선택**, 또는 사이드 패널의 **모두 선택** |
| 4 | 출력 형식: **원본 · 자동 · JPG · PNG** |
| 5 | **선택 이미지 다운로드 (ZIP)**로 일괄, 또는 이미지의 **이미지 다운로드**로 개별 |

## 출력 형식

| 형식 | 설명 |
| ---- | ---- |
| **원본** | 재인코딩 없음. Behance CDN의 최대 크기를 그대로 받습니다. WebP는 최고 품질 JPG/PNG로 변환. |
| **자동** | WebP만 JPG로 변환, 나머지는 그대로. |
| **JPG** | 전부 JPG로 통일. 투명 영역은 흰색으로. 납품용. |
| **PNG** | 전부 PNG로. 투명도 유지. |

## 라이선스

BeRaw는 [Business Source License 1.1](LICENSE)로 배포됩니다 — **개인은 무료, 상업적 사용은 유료**:

- **개인은 무료**: 디자이너, 학생, 취미 사용자, 연구자는 무드보드·디자인 리서치·평가·개인 프로젝트에 한해 영구 무료로 사용할 수 있습니다.
- **상업적 사용은 별도 라이선스**: 회사, 팀, 정부 기관, 어떤 조직의 사용이든 — 내부 사용, 제품의 일부로 재배포, 재판매, BeRaw 기반 상업 서비스 — 별도의 유료 라이선스가 필요합니다. <zikedece@proton.me>.
- **2030-04-22 Apache 2.0으로 자동 전환**: 최초 배포 4년 후 Change Date가 발동되어 BeRaw는 Apache 2.0 오픈소스가 되며, 이전 모든 버전의 상업적 제한이 해제됩니다.

전체 텍스트는 [LICENSE](LICENSE), 웹 버전은 [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html). [서비스 약관](https://hooosberg.github.io/BeRaw/terms.html) · [개인정보 처리방침](https://hooosberg.github.io/BeRaw/privacy.html)

## 연락처

- 상업 라이선스, 맞춤 조건, 제휴: <zikedece@proton.me>
- 버그 보고, 기능 요청, 번역 수정: [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## 창작자 존중

BeRaw는 브라우저가 이미 접근할 수 있는 공개 Behance 이미지만 내려받습니다. Behance의 작품은 창작자의 것입니다 — 무드보드, 개인 참고, 디자인 리서치로만 사용하시고 [Behance 이용약관](https://www.behance.net/misc/terms)을 준수해 주세요. 창작자의 작품에서 영감을 얻었다면 반드시 크레딧을 표기하세요.

## 프렌드 링크

- [不二手造](https://artbuer.com) — 오리지널 디자인 스튜디오
