# AccessJob Hub

Website hỗ trợ người khuyết tật tiếp cận thông tin việc làm, tài nguyên học tập và gửi form quan tâm/ứng tuyển theo hướng dễ tiếp cận — dự án tham gia cuộc thi thiết kế website/ứng dụng số đảm bảo tiêu chuẩn **WCAG 2.2**.

## Tech stack

| Layer | Công nghệ |
|-------|-----------|
| Front-end | React + TypeScript + Vite |
| Back-end | Java Spring Boot 3 |
| Database | MySQL (Docker); H2 cho local/dev nếu thật sự cần |
| Runtime | Docker / Docker Compose |

## Cấu trúc monorepo

```
AccessJob-Hub/
├── frontend/          # React + Vite
├── backend/           # Spring Boot API
├── docker-compose.yml
├── .env.example
└── docs/
```

## Yêu cầu

- Node.js 20+
- Java 17+
- Maven 3.9+
- Docker & Docker Compose

## Khởi chạy nhanh

### Docker (khuyến nghị)

```bash
cp .env.example .env
docker compose config
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend health: http://localhost:8080/api/health

Chi tiết: [docs/docker-run-guide.md](docs/docker-run-guide.md)

### Local development

**Backend** (cần MySQL đang chạy — khuyến nghị dùng Docker Compose)

```bash
cd backend
mvn spring-boot:run
```

Đặt `SPRING_DATASOURCE_URL` trỏ tới MySQL local nếu chạy ngoài Docker.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server: http://localhost:5173 (proxy `/api` → backend).

API base URL: `VITE_API_URL` (mặc định `/api` — dùng relative path qua Nginx hoặc Vite proxy).

### Front-end routes

| Route | Mô tả |
|-------|--------|
| `/` | Trang chủ |
| `/jobs` | Danh sách việc làm (filter, gọi `GET /api/jobs`) |
| `/jobs/:id` | Chi tiết việc làm (`GET /api/jobs/{id}`) |
| `/resources` | Danh sách tài nguyên (`GET /api/resources`) |
| `/resources/:id` | Chi tiết tài nguyên (`GET /api/resources/{id}`) |
| `/accessibility` | Accessibility Statement (WCAG 2.2) |

## Cursor rules

Quy tắc phát triển nằm trong `.cursor/rules/` — đọc trước khi sửa code.

## Database & migration

Schema MVP được quản lý bằng **Flyway** (`backend/src/main/resources/db/migration/`).

- Khi backend start (local hoặc Docker), Flyway tự chạy migration.
- Bảng: `jobs`, `resources`, `applications`, `accessibility_feedback`.
- Seed demo: 3 việc làm và 4 tài nguyên (migration `V2__seed_demo_data.sql`).
- Charset: `utf8mb4` / `utf8mb4_unicode_ci` (hỗ trợ tiếng Việt).

Reset DB demo (xóa volume MySQL):

```bash
docker compose down -v
docker compose up --build
```

## API endpoints

Chi tiết: [docs/api-endpoints.md](docs/api-endpoints.md)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/health` | Health check + trạng thái database |
| `GET` | `/api/jobs` | Danh sách việc làm (filter, limit) |
| `GET` | `/api/jobs/{id}` | Chi tiết việc làm |
| `GET` | `/api/resources` | Danh sách tài nguyên (filter, limit) |
| `GET` | `/api/resources/{id}` | Chi tiết tài nguyên |
| `POST` | `/api/applications` | Gửi form quan tâm/ứng tuyển |
| `POST` | `/api/accessibility-feedback` | Gửi phản hồi accessibility |

## Trạng thái MVP

- [x] Skeleton monorepo + Docker
- [x] MySQL 8 qua Docker Compose (volume `mysql_data`)
- [x] Flyway migration + seed data demo (jobs, resources)
- [x] Trang chủ accessible (semantic layout, skip link)
- [x] `GET /api/health` (kèm trạng thái database)
- [x] `GET /api/jobs`, `GET /api/jobs/{id}` (read-only)
- [x] `GET /api/resources`, `GET /api/resources/{id}` (read-only)
- [x] `POST /api/applications` (form quan tâm/ứng tuyển)
- [x] `POST /api/accessibility-feedback` (phản hồi accessibility)
- [x] Front-end core pages (jobs, resources, accessibility statement — read-only API)
- [ ] Form ứng tuyển / phản hồi accessibility (FE)
