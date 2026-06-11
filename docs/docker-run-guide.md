# Docker Run Guide — AccessJob Hub

## Chuẩn bị

1. Cài Docker Desktop hoặc Docker Engine + Docker Compose v2.
2. Sao chép file env mẫu:

```bash
cp .env.example .env
```

3. Chỉnh port, CORS hoặc password MySQL trong `.env` nếu cần (không commit file `.env`).

## Lệnh cơ bản

### Kiểm tra cấu hình

```bash
docker compose config
```

### Build images

```bash
docker compose build
```

### Chạy services

```bash
docker compose up
```

Chạy nền:

```bash
docker compose up -d
```

### Dừng services

```bash
docker compose down
```

Giữ dữ liệu MySQL (volume `mysql_data`):

```bash
docker compose down
```

Xóa cả volume (reset DB demo):

```bash
docker compose down -v
```

## Services

| Service | Port mặc định | Mô tả |
|---------|---------------|-------|
| `mysql` | nội bộ 3306 | MySQL 8, volume `mysql_data` |
| `backend` | 8080 | Spring Boot API |
| `frontend` | 3000 → 80 | Nginx phục vụ React static |

Thứ tự khởi động: `mysql` (healthy) → `backend` (healthy) → `frontend`.

## Kiểm tra hoạt động

- Trang chủ: http://localhost:3000
- Health API trực tiếp: http://localhost:8080/api/health
- Health qua proxy Nginx: http://localhost:3000/api/health

Response mẫu:

```json
{
  "service": "accessjob-hub-api",
  "timestamp": "2026-06-11T10:00:00Z",
  "database": "UP",
  "status": "UP"
}
```

## Networking

- Backend connect MySQL qua service name `mysql:3306` (không dùng `localhost` trong container).
- Frontend container proxy `/api/*` tới service `backend:8080`.
- Biến `CORS_ALLOWED_ORIGINS` cấu hình origin được phép gọi API.

## Database

- Image: `mysql:8`
- Charset: `utf8mb4` / `utf8mb4_unicode_ci`
- Volume: `mysql_data` — dữ liệu demo giữ khi `docker compose down`
- Biến env: `MYSQL_*`, `SPRING_DATASOURCE_*` trong `.env.example`
- Port MySQL **không** expose ra host mặc định; uncomment `MYSQL_PORT` trong `.env` nếu cần debug

### Flyway migration

Backend tự chạy Flyway khi khởi động. File migration nằm tại `backend/src/main/resources/db/migration/`:

| File | Mô tả |
|------|-------|
| `V1__create_core_tables.sql` | Tạo 4 bảng MVP |
| `V2__seed_demo_data.sql` | Seed 3 jobs + 4 resources |

Kiểm tra migration và seed sau khi `docker compose up -d`:

```bash
docker compose logs backend --tail=150
curl http://localhost:8080/api/health
docker compose exec mysql mysql -uaccessjob -p"$MYSQL_PASSWORD" accessjobhub -e "SHOW TABLES;"
docker compose exec mysql mysql -uaccessjob -p"$MYSQL_PASSWORD" accessjobhub -e "SELECT COUNT(*) FROM jobs; SELECT COUNT(*) FROM resources;"
```

Reset DB (chạy lại migration từ đầu):

```bash
docker compose down -v
docker compose up --build
```

## Xử lý sự cố

| Vấn đề | Gợi ý |
|--------|-------|
| Port đã được dùng | Đổi `FRONTEND_PORT` / `BACKEND_PORT` trong `.env` |
| Backend không start | `docker compose logs backend`, kiểm tra MySQL đã healthy |
| MySQL unhealthy | `docker compose logs mysql`, đợi `start_period` 40s |
| `database: DOWN` trong health | Kiểm tra `SPRING_DATASOURCE_*` khớp `MYSQL_*` |
| Frontend không load | `docker compose logs frontend` |
| Build chậm trên máy yếu | Chỉ build service cần: `docker compose build backend` |
