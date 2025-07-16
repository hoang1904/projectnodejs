## Remember to commit every single time u push your code. Luv <3 and if u have a question about this project, please contact with me in dinhviethoang1904@gmail.com


# Project NodeJS

Dự án website mẫu sử dụng **Node.js + Express + MongoDB**. Ứng dụng dùng để quản lý người dùng, sản phẩm và thực hiện các thao tác CRUD cơ bản.

## 📦 Yêu cầu hệ thống

- Node.js >= 14
- MongoDB (cài đặt local hoặc MongoDB Atlas)
- Git (tuỳ chọn)

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/hoang1904/projectnodejs.git
cd projectnodejs
````

### 2. Cài đặt dependencies

```bash
npm install
```
### 3. Cài đặt MongoDB và liên kết database
```bash
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://"tên database mà bạn đã tạo trong MongoDB"').then(() => console.log('MongoDB Connected'));
}
```

### 4. Tạo file .env
Tạo file .env ở thư mục gốc với nội dung sau:

```env
JWT_SECRET=
STRIPE_SECRET_KEY=
EMAIL_USER=
EMAIL_PASS=
FRONTEND_URL=
BACKEND_URL=
```
📌 Thay your_secret_key bằng chuỗi ngẫu nhiên để bảo mật session.

### 4. Chạy back-end

```bash
npm run server
```
### 5. Chạy front-end và admin
```bash
npm run dev
```

## 📬 Liên hệ

Nếu bạn gặp lỗi hoặc muốn đóng góp, hãy mở issue tại:

👉 [https://github.com/hoang1904/projectnodejs](https://github.com/hoang1904/projectnodejs)

---

```

---

📌 Nếu bạn có sử dụng thêm tính năng nào như `multer` (upload file), `bcrypt`, `jsonwebtoken`, hoặc giao diện `AdminLTE` thì có thể nói mình biết để bổ sung thêm phần hướng dẫn.
```
