# Hướng dẫn cài đặt các chức năng mới (Installation Guide for New Features)

## 1. Cài đặt dependencies mới (Install new dependencies)

**Lưu ý:** Dùng version tương thích với NestJS v10 (Note: Use versions compatible with NestJS v10)

```bash
cd agriverse-backend
npm install class-validator class-transformer @nestjs/config @nestjs/swagger@7 multer @types/multer
```

**Hoặc nếu vẫn lỗi, dùng flag `--legacy-peer-deps` (Or if still error, use `--legacy-peer-deps` flag):**

```bash
npm install class-validator class-transformer @nestjs/config @nestjs/swagger multer @types/multer --legacy-peer-deps
```

## 2. Tạo thư mục uploads (Create uploads directory)

```bash
mkdir uploads
```

## 3. Tạo file .env (Create .env file)

Copy từ `.env.example` và điều chỉnh:

```bash
cp .env.example .env
```

Hoặc tạo thủ công:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DATABASE_URL="file:./prisma/dev.db"
```

## 4. Cấu hình static files (Configure static files)

Thêm vào `main.ts` (đã có trong code mới):

```typescript
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// Trong bootstrap():
app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  prefix: '/uploads',
});
```

## 5. Restart backend (Restart backend)

```bash
npm run start:dev
```

## 6. Kiểm tra (Check)

- Swagger: http://localhost:4000/api/docs
- Upload endpoint: POST http://localhost:4000/api/upload/image
- Order Items: GET http://localhost:4000/api/order-items

## Các chức năng đã thêm (Added Features)

✅ **Order Items CRUD** - `/api/order-items`
✅ **Validation với class-validator** - Tự động validate DTOs
✅ **File Upload** - `/api/upload/image` (max 5MB, chỉ ảnh)
✅ **Admin Log tự động** - Tự động log mọi thao tác CRUD của admin
✅ **CORS Configuration** - Cho phép frontend kết nối
✅ **Config Module** - Quản lý environment variables
✅ **Swagger API Docs** - Tài liệu API tại `/api/docs`

