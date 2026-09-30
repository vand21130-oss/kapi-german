# kapi-german

A cute capybara learning German.

## Cổng “Gà nằm dài”

Toàn bộ Nhà Kapi, kể cả các API chấm bài, được chặn bởi Vercel Routing Middleware trước khi nội dung được gửi về trình duyệt.

1. Trong Vercel, tạo Secret Environment Variable tên `KAPI_GATE_PASSWORD` cho Production, Preview và Development.
2. Redeploy sau khi thêm hoặc đổi biến môi trường. Vercel không áp dụng biến mới cho deployment cũ.
3. Mỗi lần mở mới hoặc tải lại Nhà Kapi đều phải nhập mật khẩu. Sau khi nhập đúng, chuyển giữa các mục trong cùng buổi học không hỏi lại. Quay lại trang từ bộ nhớ Back/Forward của trình duyệt cũng phải qua cổng.
4. Cookie đăng nhập là cookie phiên `HttpOnly`, `Secure`, `SameSite=Lax`, không có `Max-Age` hay `Expires`; server giới hạn phiên ở 12 giờ. Cookie vào trang riêng có hạn 60 giây và bị xóa khi trang được mở. Cookie 30 ngày của bản cũ không còn được chấp nhận. Mật khẩu không nằm trong HTML, JavaScript phía trình duyệt hay `localStorage`.

Gõ sai lần 3/4/5/6/7 sẽ bị chờ lần lượt 10 giây, 30 giây, 2 phút, 10 phút và 24 giờ. Trạng thái số lần sai được server ký để không thể tự sửa thành số khác trong DevTools. Đây là khóa cho một website cá nhân; người cố ý xóa toàn bộ cookie có thể bắt đầu lại bộ đếm, nên muốn rate-limit tuyệt đối theo IP/tài khoản thì cần thêm kho dữ liệu phía server.

Chạy kiểm tra cổng:

```bash
npm test
npm run check
```
