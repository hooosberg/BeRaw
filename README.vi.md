<div align="center">

<img src="site/assets/icon-128.png" width="96" height="96" alt="BeRaw logo">

# BeRaw

**Trình lấy ảnh gốc Behance — kéo file nguyên bản, đầy đủ kích thước từ mọi dự án Behance, từng tấm hoặc gộp trong ZIP.**

[Trang web](https://hooosberg.github.io/BeRaw/) · [Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en) · [Báo lỗi](https://github.com/hooosberg/BeRaw/issues)

</div>

> [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · Tiếng Việt

---

## Chức năng

Mở bất kỳ dự án Behance nào, BeRaw sẽ quét trang, viền xanh quanh mọi ảnh lớn và đưa vào bảng bên để bạn chọn. Từng tấm hoặc «Chọn tất cả», lấy thành file lẻ hoặc gộp một ZIP.

- **Gốc là gốc thật** — BeRaw lấy file lớn nhất trên CDN Behance, không phải thumbnail ở feed.
- **Nút tải cho từng ảnh** — Lớp phủ trên mỗi ảnh có nút tải riêng theo định dạng đã chọn.
- **Gộp ZIP** — Bảng bên đóng gói tất cả ảnh đã chọn vào một ZIP. Windows cũng không cần «Lưu thành» từng file.
- **Kiểm soát định dạng** — Giữ byte gốc, WebP→JPG tự động, toàn bộ JPG, hoặc toàn bộ PNG.
- **12 ngôn ngữ** — Trung giản/phồn, English, 日本語, 한국어, Français, Deutsch, Español, Português, Русский, Italiano, Tiếng Việt.

## Cài đặt

### Từ GitHub Releases (khuyến nghị)

1. Tải `.zip` mới nhất từ [trang Releases](https://github.com/hooosberg/BeRaw/releases/latest).
2. Giải nén vào nơi ổn định (đừng xoá thư mục — Chrome nạp tiện ích từ đó).
3. Mở `chrome://extensions/` và bật **Chế độ dành cho nhà phát triển** ở góc trên bên phải.
4. Bấm **Tải tiện ích đã giải nén** và chọn thư mục vừa giải nén.
5. Mở một dự án Behance — viền xanh sẽ hiện.

Trình kiểm tra cập nhật tích hợp (Cài đặt → Giới thiệu → **Kiểm tra cập nhật**) dùng cùng API nên có bản mới bạn biết ngay.

### Từ mã nguồn (người đóng góp)

```bash
git clone https://github.com/hooosberg/BeRaw.git
```

Ở `chrome://extensions/` bật chế độ nhà phát triển, bấm **Tải tiện ích đã giải nén** rồi chọn `local/`.

### Từ Chrome Web Store

[Cài từ Chrome Web Store](https://chromewebstore.google.com/detail/beraw-%E2%80%94-behance-raw-image/ghhedamclfpgcnpfclmefepnacnkngio?authuser=0&hl=en).

## Cách dùng

| Bước | Thao tác |
| ---- | -------- |
| 1 | Mở trang dự án Behance |
| 2 | Chờ viền xanh (ảnh lớn BeRaw tìm được) |
| 3 | Bấm **Chọn** trên ảnh, hoặc **Chọn tất cả** trong bảng bên |
| 4 | Chọn định dạng: **Gốc · Tự động · JPG · PNG** |
| 5 | **Tải ảnh đã chọn (ZIP)** cho cả giỏ, hoặc **Tải ảnh** trên lớp phủ cho từng tấm |

## Định dạng xuất

| Định dạng | Hành vi |
| --------- | ------- |
| **Gốc** | Không mã hoá lại. File lớn nhất từ CDN Behance. WebP được chuyển sang JPG/PNG ở chất lượng tối đa. |
| **Tự động** | Chỉ WebP chuyển thành JPG, các loại khác giữ nguyên. |
| **JPG** | Tất cả thành JPG, vùng trong suốt tô trắng. Thích hợp bàn giao. |
| **PNG** | Tất cả thành PNG, giữ độ trong suốt. |

## Giấy phép

BeRaw phát hành dưới [Business Source License 1.1](LICENSE) — **miễn phí cho cá nhân, tính phí cho thương mại**:

- **Cá nhân miễn phí**: nhà thiết kế cá nhân, sinh viên, người chơi, nhà nghiên cứu có thể dùng BeRaw miễn phí mãi mãi cho mood board, nghiên cứu thiết kế, đánh giá và dự án cá nhân.
- **Thương mại cần giấy phép**: sử dụng bởi công ty, nhóm, cơ quan hoặc bất kỳ tổ chức nào — dùng nội bộ, tái phân phối trong sản phẩm, bán lại, dịch vụ thương mại dựa trên BeRaw — đều cần giấy phép trả phí. Email <zikedece@proton.me>.
- **Tự động chuyển sang Apache 2.0 vào 2030-04-22**: bốn năm sau lần phát hành đầu tiên, Change Date kích hoạt và BeRaw trở thành mã nguồn mở hoàn toàn theo Apache 2.0, gỡ bỏ hạn chế thương mại cho mọi phiên bản trước đó.

Nội dung đầy đủ ở [LICENSE](LICENSE), bản web tại [hooosberg.github.io/BeRaw/license.html](https://hooosberg.github.io/BeRaw/license.html). [Điều khoản dịch vụ](https://hooosberg.github.io/BeRaw/terms.html) · [Chính sách bảo mật](https://hooosberg.github.io/BeRaw/privacy.html)

## Liên hệ

- Giấy phép thương mại, điều khoản riêng, hợp tác: <zikedece@proton.me>
- Báo lỗi, yêu cầu tính năng, sửa bản dịch: [github.com/hooosberg/BeRaw/issues](https://github.com/hooosberg/BeRaw/issues)

## Tôn trọng tác giả

BeRaw chỉ tải những ảnh Behance công khai. Các tác phẩm trên Behance thuộc về tác giả — hãy dùng BeRaw cho tham khảo cá nhân, mood board và nghiên cứu thiết kế, tuân thủ [Điều khoản của Behance](https://www.behance.net/misc/terms). Nếu bạn lấy cảm hứng từ tác phẩm của ai đó, hãy ghi công.

## Đối tác

- [不二手造](https://artbuer.com) — studio thiết kế gốc độc lập
