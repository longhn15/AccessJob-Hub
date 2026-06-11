# AccessJob Hub

Website hỗ trợ người khuyết tật tiếp cận thông tin việc làm, tài nguyên học tập và gửi form quan tâm/ứng tuyển theo hướng dễ tiếp cận — dự án tham gia cuộc thi thiết kế website/ứng dụng số đảm bảo tiêu chuẩn **WCAG 2.2**.

## Tech stack

| Layer | Công nghệ |
|-------|-----------|
| Front-end | React + TypeScript + Vite |
| Back-end | Java Spring Boot 3 |
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

**Backend**

```bash
cd backend
mvn spring-boot:run
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server: http://localhost:5173 (proxy `/api` → backend).

## Cursor rules

Quy tắc phát triển nằm trong `.cursor/rules/` — đọc trước khi sửa code.

## Trạng thái MVP

- [x] Skeleton monorepo + Docker
- [x] Trang chủ accessible (semantic layout, skip link)
- [x] `GET /api/health`
- [ ] Danh sách việc làm
- [ ] Form ứng tuyển
- [ ] Tài nguyên học tập
- [ ] Accessibility Statement
