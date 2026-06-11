# INIT_PROJECT_STRUCTURE_001

## 1. Mức độ hiểu task

**100%** — Khởi tạo skeleton monorepo AccessJob Hub: frontend React+Vite, backend Spring Boot, Docker, chưa có DB và chưa có nghiệp vụ việc làm.

## 2. Tóm tắt yêu cầu

- Cấu trúc `frontend/`, `backend/`, Dockerfile, `docker-compose.yml`, `.env.example`, `.gitignore`, README.
- Trang chủ semantic layout + skip link, tone xanh dương đậm/trắng.
- `GET /api/health` hoạt động.
- Docker Compose chạy frontend + backend (không PostgreSQL ở bước này).
- Report và commit `chore: initialize project structure`.

## 3. Phạm vi đã thực hiện

- Scaffold frontend Vite React TypeScript với Layout accessible.
- Scaffold backend Spring Boot 3.3 + HealthController + CORS config từ env.
- Docker multi-stage cho FE (Nginx) và BE (Maven + JRE).
- `docker-compose.yml` 2 services, healthcheck backend.
- Tài liệu README, `docs/docker-run-guide.md`.
- Không thêm DB, auth, hay API nghiệp vụ.

## 4. Danh sách file đã đọc

| File | Mục đích |
|------|----------|
| `.cursor/rules/docker-runtime-rule.mdc` | Chuẩn Docker/networking |
| `.cursor/rules/frontend-rule.mdc` | Semantic layout, a11y |
| `.cursor/rules/backend-rule.mdc` | API structure |
| `README.md` (trước khi sửa) | Trạng thái repo |

## 5. Danh sách file đã tạo/sửa

### Root

| File | Hành động |
|------|-----------|
| `docker-compose.yml` | Tạo mới |
| `.env.example` | Tạo mới |
| `.gitignore` | Tạo mới |
| `README.md` | Cập nhật |

### Frontend

| File | Hành động |
|------|-----------|
| `frontend/` (Vite scaffold) | Tạo mới |
| `frontend/src/components/Layout/Layout.tsx` | Tạo mới |
| `frontend/src/components/Layout/Layout.module.css` | Tạo mới |
| `frontend/src/pages/HomePage.tsx` | Tạo mới |
| `frontend/src/pages/HomePage.module.css` | Tạo mới |
| `frontend/src/styles/variables.css` | Tạo mới |
| `frontend/src/App.tsx` | Sửa |
| `frontend/src/index.css` | Sửa |
| `frontend/index.html` | Sửa (`lang="vi"`) |
| `frontend/vite.config.ts` | Sửa (proxy `/api`) |
| `frontend/nginx.conf` | Tạo mới |
| `frontend/Dockerfile` | Tạo mới |
| `frontend/.dockerignore` | Tạo mới |

### Backend

| File | Hành động |
|------|-----------|
| `backend/pom.xml` | Tạo mới |
| `backend/src/main/java/com/accessjobhub/AccessJobHubApplication.java` | Tạo mới |
| `backend/src/main/java/com/accessjobhub/controller/HealthController.java` | Tạo mới |
| `backend/src/main/java/com/accessjobhub/config/CorsConfig.java` | Tạo mới |
| `backend/src/main/resources/application.yml` | Tạo mới |
| `backend/Dockerfile` | Tạo mới |
| `backend/.dockerignore` | Tạo mới |

### Docs

| File | Hành động |
|------|-----------|
| `docs/docker-run-guide.md` | Tạo mới |
| `docs/INIT_PROJECT_STRUCTURE_001.md` | Tạo mới |

## 6. Thay đổi chính theo từng file

- **Layout.tsx**: `header`, `nav`, `main`, `footer`, skip link `#main-content`, một `h1` trên HomePage.
- **variables.css**: CSS variables tone xanh dương đậm (`--color-primary: #0b3d91`) và trắng.
- **HealthController**: `GET /api/health` trả `status`, `service`, `timestamp`.
- **CorsConfig**: đọc `CORS_ALLOWED_ORIGINS` từ env.
- **docker-compose.yml**: `backend` + `frontend`, healthcheck, port từ env.
- **nginx.conf**: proxy `/api/` → `backend:8080`, SPA fallback `index.html`.

## 7. Lý do thiết kế

- **Không DB**: giữ MVP nhẹ theo yêu cầu task; biến DB comment trong `.env.example`.
- **Nginx proxy `/api`**: browser gọi relative URL, không hardcode host production trong bundle.
- **CSS Modules + variables**: kiểm soát contrast/focus, không dùng UI library nặng.
- **Multi-stage Docker**: image gọn, không copy `node_modules`/`target` (có `.dockerignore`).

## 8. Accessibility impact

- Skip link ẩn/hiện khi focus.
- Semantic landmarks: `header`, `nav`, `main`, `footer`.
- Một `h1` trên trang chủ, `h2` cho section phụ.
- `:focus-visible` với outline contrast cao (`--color-focus: #ffbf47`).
- `prefers-reduced-motion` respected.
- `html lang="vi"`, meta description.
- **Chưa test**: screen reader manual, axe, Lighthouse.

## 9. Docker/runtime impact

- 2 services: `frontend` (port 3000→80), `backend` (8080).
- Backend healthcheck bằng `wget`; frontend `depends_on` healthy backend.
- Không expose DB; không secret trong image.

## 10. API impact

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/api/health` | GET | Trạng thái hoạt động API |

## 11. Database impact

Không có — chưa tích hợp PostgreSQL/H2.

## 12. Cách kiểm tra

```bash
git status
docker compose config
docker compose build
docker compose up -d
curl http://localhost:8080/api/health
curl http://localhost:3000
curl http://localhost:3000/api/health
cd frontend && npm run build
cd backend && mvn clean package -DskipTests
docker compose down
```

## 13. Kết quả kiểm tra

| Lệnh | Kết quả |
|------|---------|
| `git status` | **Pass** — untracked/modified files như mong đợi |
| `docker compose config` | **Pass** — exit 0 |
| `docker compose build` | **Pass** — exit 0 (~13 phút, lần đầu pull images) |
| `docker compose up -d` | **Pass** — backend healthy, frontend started |
| `GET http://localhost:8080/api/health` | **Pass** — `status: UP` |
| `GET http://localhost:3000` | **Pass** — HTTP 200, `lang="vi"`, title AccessJob Hub |
| `GET http://localhost:3000/api/health` | **Pass** — proxy Nginx → backend |
| `cd frontend && npm run build` | **Pass** — exit 0 |
| `cd backend && mvn clean package -DskipTests` | **Pass** — BUILD SUCCESS |
| Keyboard navigation | **Chưa test manual** — expected verification |
| Screen reader | **Chưa test** |
| axe / Lighthouse | **Chưa chạy** |

## 14. Rủi ro còn lại

- Chưa có React Router — nav chỉ có Trang chủ; cần bổ sung khi thêm pages.
- `.dockerignore` frontend thêm sau build đầu — lần build đầu context lớn (~110MB) do chưa có file này lúc build.
- Branch repo là `develop`, rule git ghi `dev` — cần thống nhất sau.
- Accessibility chưa verify bằng assistive technology thật.

## 15. Đề xuất tiếp theo

1. Thêm React Router và các route MVP (jobs, resources, …).
2. Tích hợp PostgreSQL + entity/seed.
3. Implement `GET /api/jobs` và trang danh sách việc làm accessible.
4. Tạo `docs/WCAG_CHECKLIST.md` và chạy axe/Lighthouse.
