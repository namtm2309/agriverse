# Hướng dẫn cài đặt các tính năng mới v2 (Installation Guide for New Features v2)

## 1. Cài đặt dependencies mới (Install new dependencies)

```bash
cd agriverse-backend
npm install exceljs @nestjs/throttler
```

## 2. Các tính năng đã thêm (Added Features)

### ✅ Health Check
- **Endpoint**: `GET /api/health`
- **Mô tả**: Kiểm tra trạng thái backend, database, disk space
- **Ví dụ**: `http://localhost:4000/api/health`

### ✅ Export Data (CSV/Excel)
- **Endpoint**: `GET /api/export/:resource?format=csv|excel`
- **Mô tả**: Xuất dữ liệu các resource ra file CSV hoặc Excel
- **Ví dụ**: 
  - `GET /api/export/users?format=csv`
  - `GET /api/export/orders?format=excel`
- **Resources hỗ trợ**: users, areas, farms, plots, crops, seasons, tasks, farm-logs, devices, sensor-data, harvests, product-batches, nft-assets, orders, order-items, admin-logs

### ✅ Password Reset
- **Endpoints**:
  - `POST /api/auth/forgot-password` - Tạo token reset password
    - Body: `{ "username": "admin" }`
  - `POST /api/auth/reset-password` - Đặt lại mật khẩu
    - Body: `{ "token": "...", "newPassword": "newpass123" }`
- **Lưu ý**: Token hết hạn sau 1 giờ. Trong production nên gửi email thay vì trả về token.

### ✅ Statistics/Analytics
- **Endpoint**: `GET /api/statistics`
- **Mô tả**: Lấy thống kê tổng quan về hệ thống
- **Trả về**: Tổng số users, farms, plots, seasons, orders, revenue, etc.

### ✅ Bulk Operations
- **Endpoints**:
  - `POST /api/bulk/:resource/delete` - Xóa nhiều records
    - Body: `{ "ids": [1, 2, 3] }`
  - `POST /api/bulk/:resource/update` - Cập nhật nhiều records
    - Body: `{ "ids": [1, 2, 3], "data": { "status": "ACTIVE" } }`
- **Ví dụ**: 
  - `POST /api/bulk/users/delete`
  - `POST /api/bulk/orders/update`

### ✅ Database Backup
- **Endpoint**: `GET /api/admin/backup`
- **Mô tả**: Tạo và download backup file của SQLite database
- **Lưu ý**: File backup được lưu trong thư mục `backups/`

### ✅ Rate Limiting
- **Mô tả**: Tự động giới hạn số request để chống abuse
- **Cấu hình**: 100 requests/phút (100 requests/minute)
- **Lưu ý**: Nếu vượt quá giới hạn, sẽ trả về lỗi 429 Too Many Requests

## 3. Restart backend (Restart backend)

```bash
npm run start:dev
```

## 4. Kiểm tra (Check)

- Health Check: http://localhost:4000/api/health
- Statistics: http://localhost:4000/api/statistics
- Export CSV: http://localhost:4000/api/export/users?format=csv
- Export Excel: http://localhost:4000/api/export/orders?format=excel
- Swagger: http://localhost:4000/api/docs

## Lưu ý (Notes)

- **Password Reset**: Token được lưu trong memory, sẽ mất khi restart server. Trong production nên dùng Redis hoặc database.
- **Backup**: Thư mục `backups/` sẽ được tạo tự động khi tạo backup đầu tiên.
- **Export**: File Excel cần thư viện `exceljs`, đã được thêm vào dependencies.

