## AgriVerse NFT - Backend

Backend NestJS + Prisma cho nền tảng Nông nghiệp Thông minh & Số hoá Trang trại.

### Công nghệ

- **Ngôn ngữ**: TypeScript  
- **Framework**: NestJS  
- **ORM**: Prisma  
- **Database**: SQLite (local)  
- **Auth**: JWT  
- **API**: REST  

### Tài khoản admin mặc định

- **Username**: `admin`  
- **Password**: `1234`  
- **Role**: `ADMIN`  

### Cài đặt & chạy

1. Cài dependencies:

```bash
cd agriverse-backend
npm install
```

2. Sinh Prisma Client & migrate DB:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

3. Seed tài khoản admin:

```bash
npx ts-node prisma/seed.ts
```

4. Chạy backend:

```bash
npm run start:dev
```

App chạy tại: `http://localhost:3000/api`

### API cơ bản

- **POST** `POST /api/auth/login`
  - body:
    - `username`
    - `password`
  - trả về: `access_token` (JWT)

- **GET** `GET /api/users`
  - lấy danh sách user (simple demo, chưa bảo vệ JWT)

Bạn có thể mở rộng thêm các module: Area/Farm/Plot, Crop/Season, Task/Log, IoT mock, Harvest/Product, NFT off-chain, Marketplace/Order dựa trên `prisma/schema.prisma`.




