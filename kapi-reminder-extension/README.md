# Vali nhắc học — extension mini cho Nhà Kapi

Extension Manifest V3 dành cho Chrome/Edge. Mỗi ngày Vali chỉ nhắc **một nhiệm vụ chung của Nhà Kapi** — kỹ năng mà Mr. Efa đã chọn trong web — chứ không nhắc riêng Lesen và không tạo thêm thông báo cho shop, điểm danh hay truyện.

## Cài bản chưa đưa lên store

1. Tải repository về máy và giải nén.
2. Mở `edge://extensions` (Edge) hoặc `chrome://extensions` (Chrome).
3. Bật **Developer mode / Chế độ nhà phát triển**.
4. Chọn **Load unpacked / Tải tiện ích đã giải nén**.
5. Chọn đúng thư mục `kapi-reminder-extension` — thư mục có file `manifest.json`.
6. Bấm biểu tượng extension để đặt giờ, chọn ngày và bấm **Thử ngay**.

Mặc định extension dùng thông báo Windows. Muốn Vali thật sự trượt xuống trên trang đang xem, bật **Cho Vali thò vào trang đang xem**. Trình duyệt sẽ hỏi quyền truy cập website đúng một lần.

## Hành vi

- `📖 Vào Nhà Kapi`: mở thẳng hồ sơ nhiệm vụ hôm nay.
- `⏰ 10 phút nữa`: tạo đúng một lần hoãn trong ngày.
- Nút `×`: Vali nói “Bạn đuổi tôi. Tạm biệt. Tôi sẽ không nói nữa.” rồi im đến hết ngày.
- Nếu nhiệm vụ hôm nay đã hoàn thành, lịch nhắc còn lại tự được bỏ qua.
- Nếu đang ở trang nội bộ như `edge://`, Chrome Web Store hoặc trang chặn chèn extension, hệ thống dùng thông báo Windows.
- Nếu trình duyệt đang tắt, Vali không thể hiện trên màn hình. Khi mở lại trong vòng 3 giờ sau lịch, extension có thể nhắc bù một lần.

## Quyền và riêng tư

- Quyền bắt buộc cho `kapi-german.vercel.app` chỉ dùng để nhận các trường: ngày, tên kỹ năng, số phút và trạng thái hoàn thành.
- Quyền mọi website là **tùy chọn** và chỉ dùng để chèn hộp giao diện Vali cố định.
- Extension không đọc DOM của trang, ô nhập liệu, mật khẩu, lịch sử duyệt web, transcript, từ vựng hay câu trả lời.
- Lịch và trạng thái được lưu bằng `chrome.storage`; không có API hay máy chủ riêng.

## Kiểm thử nhanh

```bash
node --test kapi-reminder-extension/tests/scheduler.test.js
node --check kapi-reminder-extension/background.js
node --check kapi-reminder-extension/content.js
node --check kapi-reminder-extension/options.js
node --check kapi-reminder-extension/site-bridge.js
```
