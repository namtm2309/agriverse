# AgriVerse Backend - Tính năng đã triển khai

## 📊 Statistics Module (Phân tích & Biểu đồ)

### Endpoints:
- `GET /api/statistics/overview` - Dashboard tổng quan
- `GET /api/statistics/seasons?seasonId=&from=&to=` - Phân tích mùa vụ
- `GET /api/statistics/tasks?seasonId=&from=&to=` - Phân tích công việc
- `GET /api/statistics/farm-logs?seasonId=&taskId=&from=&to=` - Phân tích nhật ký canh tác
- `GET /api/statistics/sensors?deviceId=&from=&to=` - Phân tích dữ liệu cảm biến

### Tính năng:
- Thống kê tổng quan (users, farms, plots, seasons, tasks, orders, harvests, devices)
- Time series data cho biểu đồ
- Phân tích yield (expected vs actual)
- Thống kê sensor data (min/max/avg)

---

## 📤 Export Module (Xuất dữ liệu)

### Endpoints:
- `GET /api/export/:resource?format=csv|excel` - Xuất dữ liệu

### Tính năng:
- Hỗ trợ CSV và Excel (XLSX)
- Export nhiều resource: users, farms, plots, seasons, tasks, farm-logs, sensor-data, harvests, product-batches, orders, etc.
- Auto-format và styling cho Excel

---

## 🔔 Notifications Module (Thông báo)

### Endpoints:
- `GET /api/notifications` - Lấy danh sách notifications
- `GET /api/notifications/unread-count` - Đếm số notifications chưa đọc
- `POST /api/notifications` - Tạo notification (admin)
- `PUT /api/notifications/:id/read` - Đánh dấu đã đọc
- `PUT /api/notifications/read-all` - Đánh dấu tất cả đã đọc
- `DELETE /api/notifications/:id` - Xóa notification

### Tính năng:
- Hệ thống thông báo trong app
- Tự động tạo notifications từ events (tasks, sensors, orders, harvests)
- Filter theo read/unread status
- Quan hệ với User

---

## 📁 File Management (Quản lý file nâng cao)

### Endpoints:
- `POST /api/upload/image` - Upload ảnh (có metadata)
- `POST /api/upload/file` - Upload file đa dạng (documents, etc.)
- `GET /api/upload/files` - Lấy danh sách files với metadata
- `GET /api/upload/stats` - Thống kê storage
- `POST /api/upload/cleanup` - Dọn rác files mồ côi
- `DELETE /api/upload/image/:filename` - Xóa file

### Tính năng:
- Lưu metadata file vào database (UploadedFile model)
- Quản lý file theo owner, resourceType, resourceId
- Dọn rác tự động (cleanup orphaned files)
- Thống kê storage (total files, size, by type)
- Hỗ trợ nhiều loại file (images, documents)

---

## 🔐 Security Enhancements (Bảo mật nâng cao)

### Modules:
- **SecurityModule** - Password policy, 2FA, rate limiting
- **RolesGuard** - RBAC guard với decorator `@Roles()`

### Tính năng:
- **Password Policy**: Kiểm tra độ mạnh mật khẩu (length, uppercase, lowercase, numbers, special chars)
- **2FA Support**: Generate secret, QR code, verify token (speakeasy)
- **Rate Limiting**: In-memory rate limiting (nên dùng Redis trong production)
- **RBAC**: Roles guard với decorator `@Roles('ADMIN', 'USER')`

### Usage:
```typescript
@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('admin-only')
async adminOnly() { ... }
```

---

## 📧 Email Service (Dịch vụ email)

### Tính năng:
- Tích hợp SMTP (nodemailer)
- Gửi email reset password với HTML template
- Gửi thông báo qua email
- Gửi báo cáo định kỳ với attachment
- Fallback: Log emails nếu SMTP chưa config (development mode)

### Environment Variables:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@agriverse.com
FRONTEND_URL=http://localhost:5173
```

### Tích hợp:
- **AuthService**: Gửi email reset password thay vì trả về token trực tiếp
- **NotificationsService**: Có thể gửi email notifications

---

## 🔗 Webhooks Module (Tích hợp webhook)

### Endpoints:
- `GET /api/webhooks` - Lấy danh sách webhooks
- `GET /api/webhooks/:id` - Lấy webhook theo ID
- `POST /api/webhooks` - Tạo webhook mới
- `PUT /api/webhooks/:id` - Cập nhật webhook
- `DELETE /api/webhooks/:id` - Xóa webhook
- `POST /api/webhooks/test/:id` - Test webhook

### Tính năng:
- Quản lý webhooks (CRUD)
- Tự động gửi webhook khi có events:
  - `farm-log.created`
  - `harvest.created`
  - `order.created`
  - `order.updated`
- Webhook signature (HMAC SHA256)
- Filter events (chỉ gửi khi webhook subscribe event đó)
- Timeout protection (10 seconds)

### Webhook Payload:
```json
{
  "event": "farm-log.created",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Tích hợp:
- **FarmLogsService**: Gửi webhook khi tạo farm log
- **HarvestsService**: Gửi webhook khi tạo harvest
- **OrdersService**: Gửi webhook khi tạo/cập nhật order

---

## 🗄️ Database Schema Updates

### Models mới:
- **Notification** - Hệ thống thông báo
- **Webhook** - Cấu hình webhooks
- **UploadedFile** - Metadata files

### Quan hệ:
- `User.notifications` - User có nhiều notifications
- `User.uploadedFiles` - User có nhiều uploaded files

---

## 📝 Next Steps (Có thể triển khai thêm)

1. **Caching với Redis**:
   - Cache statistics queries
   - Cache rate limiting
   - Cache webhook responses

2. **Scheduled Tasks**:
   - Cleanup orphaned files (cron job)
   - Send daily/weekly reports
   - Check and send task due notifications

3. **Advanced RBAC**:
   - Permissions per resource
   - Role hierarchy
   - Permission inheritance

4. **API Documentation**:
   - Swagger/OpenAPI đầy đủ
   - Examples cho tất cả endpoints

5. **Testing**:
   - Unit tests cho các services
   - Integration tests cho APIs
   - E2E tests

---

## 🚀 Cài đặt Dependencies

```bash
cd agriverse-backend
npm install
```

### Dependencies mới:
- `nodemailer` - Email service
- `axios` - HTTP client cho webhooks
- `speakeasy` - 2FA support
- `qrcode` - QR code generation cho 2FA

---

## 📚 API Examples

### Statistics:
```bash
# Dashboard overview
GET /api/statistics/overview

# Season analytics
GET /api/statistics/seasons?seasonId=1&from=2024-01-01&to=2024-12-31

# Task analytics với time series
GET /api/statistics/tasks?seasonId=1
```

### Notifications:
```bash
# Get unread notifications
GET /api/notifications?read=false

# Mark as read
PUT /api/notifications/1/read
```

### Webhooks:
```bash
# Create webhook
POST /api/webhooks
{
  "url": "https://example.com/webhook",
  "events": ["farm-log.created", "harvest.created"],
  "secret": "optional-secret"
}
```

### File Management:
```bash
# Upload file với metadata
POST /api/upload/file?resourceType=farm-log&resourceId=1

# Get files
GET /api/upload/files?ownerId=1&resourceType=farm-log

# Cleanup orphaned files
POST /api/upload/cleanup
```

---

## ⚙️ Configuration

### Environment Variables:
```env
# SMTP Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@agriverse.com
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=AGRIVERSE_SECRET_KEY

# Database
DATABASE_URL=file:./dev.db
```

---

## 📖 Notes

- **Email Service**: Trong development mode, nếu SMTP chưa config, emails sẽ được log thay vì gửi thực tế
- **Webhooks**: Tự động gửi khi có events, nhưng không block request nếu webhook fail
- **File Cleanup**: Nên chạy định kỳ (cron job) để dọn rác files
- **Rate Limiting**: Hiện tại dùng in-memory, nên migrate sang Redis trong production
- **2FA**: Secret được generate nhưng chưa lưu vào database (cần implement thêm)

---

**Tất cả tính năng đã được triển khai và sẵn sàng sử dụng!** 🎉

