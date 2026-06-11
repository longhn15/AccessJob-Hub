# Docker Run Guide — AccessJob Hub

## Chuẩn bị

1. Cài Docker Desktop hoặc Docker Engine + Docker Compose v2.
2. Sao chép file env mẫu:

```bash
cp .env.example .env
```

3. Chỉnh port hoặc CORS trong `.env` nếu cần (không commit file `.env`).

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

## Services

| Service | Port mặc định | Mô tả |
|---------|---------------|-------|
| `frontend` | 3000 → 80 | Nginx phục vụ React static |
| `backend` | 8080 | Spring Boot API |

## Kiểm tra hoạt động

- Trang chủ: http://localhost:3000
- Health API trực tiếp: http://localhost:8080/api/health
- Health qua proxy Nginx: http://localhost:3000/api/health

Response mẫu:

```json
{
  "status": "UP",
  "service": "accessjob-hub-api",
  "timestamp": "2026-06-11T10:00:00Z"
}
```

## Networking

- Frontend container proxy `/api/*` tới service `backend:8080`.
- Không dùng `localhost` giữa các container.
- Biến `CORS_ALLOWED_ORIGINS` cấu hình origin được phép gọi API.

## Database

Bước skeleton **chưa** có MySQL container. Khi tích hợp DB, bổ sung service `mysql` (image `mysql:8`) với volume và uncomment các biến `MYSQL_*` / `SPRING_DATASOURCE_*` trong `.env.example`.

## Xử lý sự cố

| Vấn đề | Gợi ý |
|--------|-------|
| Port đã được dùng | Đổi `FRONTEND_PORT` / `BACKEND_PORT` trong `.env` |
| Frontend không load | `docker compose logs frontend` |
| Backend unhealthy | `docker compose logs backend`, kiểm tra port 8080 |
| Build chậm trên máy yếu | Chỉ build service cần: `docker compose build backend` |
