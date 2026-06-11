# CORE_DOMAIN_SCHEMA_002 — Flyway migration & seed data

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: thêm schema MySQL MVP qua Flyway, seed demo cho `jobs`/`resources`, entity JPA cơ bản, không implement API nghiệp vụ, giữ `GET /api/health` hoạt động.

## 2. Tóm tắt yêu cầu

- Flyway dependency + cấu hình Spring Boot
- 4 bảng MVP: `jobs`, `resources`, `applications`, `accessibility_feedback`
- Charset `utf8mb4`, seed nhỏ, không auth/admin/upload CV
- Cập nhật README/docs, report verification

## 3. Phạm vi đã thực hiện

- Thêm `flyway-core`, `flyway-mysql` vào `backend/pom.xml`
- Cấu hình Flyway trong `application.yml` (`enabled`, `locations`, `baseline-on-migrate`)
- Migration `V1__create_core_tables.sql` — 4 bảng + index cơ bản
- Migration `V2__seed_demo_data.sql` — 3 jobs, 4 resources (tiếng Việt)
- Entity JPA: `Job`, `Resource`, `Application`, `AccessibilityFeedback`
- Cập nhật `README.md`, `docs/docker-run-guide.md`
- Không sửa Front-end, không thêm API nghiệp vụ

## 4. Danh sách file đã đọc

- `backend/pom.xml`
- `backend/src/main/resources/application.yml`
- `backend/src/main/java/com/accessjobhub/controller/HealthController.java`
- `docker-compose.yml`
- `.env.example`
- `README.md`
- `docs/docker-run-guide.md`
- `.cursor/rules/db-rule.mdc`

## 5. Danh sách file đã tạo/sửa

| File | Hành động |
|------|-----------|
| `backend/pom.xml` | Sửa — thêm Flyway deps |
| `backend/src/main/resources/application.yml` | Sửa — Flyway config |
| `backend/src/main/resources/db/migration/V1__create_core_tables.sql` | Tạo |
| `backend/src/main/resources/db/migration/V2__seed_demo_data.sql` | Tạo |
| `backend/src/main/java/com/accessjobhub/entity/Job.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/entity/Resource.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/entity/Application.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/entity/AccessibilityFeedback.java` | Tạo |
| `README.md` | Sửa — mục Database & migration |
| `docs/docker-run-guide.md` | Sửa — hướng dẫn Flyway verify |
| `docs/CORE_DOMAIN_SCHEMA_002.md` | Tạo — report này |

## 6. Thay đổi chính theo từng file

### `V1__create_core_tables.sql`

- `jobs`: 13 cột theo spec MVP + `created_at`/`updated_at`
- `resources`: 7 cột + timestamps
- `applications`: `job_id` FK tới `jobs`, status mặc định `pending`
- `accessibility_feedback`: category, description, contact_email tùy chọn, status `pending`
- Engine InnoDB, `utf8mb4_unicode_ci`
- Index: `is_active` (jobs/resources), `job_id`/`status` (applications), `status` (feedback)

### `V2__seed_demo_data.sql`

- 3 việc làm demo (Hà Nội, TP.HCM, Đà Nẵng) — nội dung tiếng Việt, hỗ trợ accessibility
- 4 tài nguyên (WCAG, tìm việc, bàn phím, CV accessible)

### Entities

- Map 1:1 với bảng; `Application` có `@ManyToOne` tới `Job`
- Không có Repository/Service/Controller mới

## 7. Lý do thiết kế

- **Flyway** thay vì `schema.sql`/`data.sql`: versioned migration, phù hợp mở rộng API sau
- **FK đơn giản** `applications.job_id → jobs.id`: đủ cho form ứng tuyển, không thêm bảng trung gian
- **Không seed** applications/feedback: tránh dữ liệu cá nhân giả trong DB demo
- **JPA `ddl-auto: none`**: schema chỉ do Flyway quản lý, tránh xung đột Hibernate

## 8. Accessibility impact

Không thay đổi UI. Seed jobs/resources dùng nội dung tiếng Việt về môi trường làm việc accessible — phục vụ demo flow sau này.

## 9. Docker/runtime impact

- Backend start → Flyway chạy trước JPA (log: `Successfully applied 2 migrations`)
- Volume `mysql_data` giữ schema; `docker compose down -v` reset và chạy lại migration
- Cảnh báo Flyway: MySQL 8.4 mới hơn bản hỗ trợ chính thức (8.1) — migration vẫn chạy thành công

## 10. API impact

Không thêm endpoint mới. `GET /api/health` giữ nguyên — trả `status: UP`, `database: UP`.

## 11. Database impact

| Bảng | Mô tả | Seed |
|------|-------|------|
| `jobs` | Tin tuyển dụng | 3 rows |
| `resources` | Tài nguyên học tập | 4 rows |
| `applications` | Ứng tuyển (trống) | 0 |
| `accessibility_feedback` | Feedback (trống) | 0 |
| `flyway_schema_history` | Flyway metadata | tự tạo |

Charset/collation: `utf8mb4` / `utf8mb4_unicode_ci` (MySQL service command + bảng ENGINE=InnoDB).

## 12. Cách kiểm tra

```bash
git status
cd backend && mvn clean package -DskipTests
docker compose config
docker compose build
docker compose up -d
docker compose logs backend --tail=150
curl http://localhost:8080/api/health
docker compose exec mysql mysql -uaccessjob -pchange-me accessjobhub -e "SHOW TABLES;"
docker compose exec mysql mysql -uaccessjob -pchange-me accessjobhub -e "SELECT COUNT(*) FROM jobs; SELECT COUNT(*) FROM resources;"
docker compose down
```

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `mvn clean package -DskipTests` | **PASS** — BUILD SUCCESS |
| `docker compose config` | **PASS** |
| `docker compose build` | **PASS** |
| `docker compose up -d` | **PASS** — mysql → backend → frontend healthy |
| Backend logs Flyway | **PASS** — V1 + V2 applied, schema v2 |
| `GET /api/health` | **PASS** — `{"status":"UP","database":"UP",...}` |
| `SHOW TABLES` | **PASS** — 4 bảng MVP + `flyway_schema_history` |
| `COUNT jobs` | **3** |
| `COUNT resources` | **4** |
| `docker compose down` | **PASS** |
| FE build/lint | Chưa chạy — không sửa Front-end |
| Keyboard/screen reader | Không áp dụng — không sửa UI |

## 14. Rủi ro còn lại

- Flyway warning với MySQL 8.4 image — theo dõi khi nâng Flyway
- Volume cũ có schema khác: cần `docker compose down -v` để reset
- Entity chưa có Repository — API jobs/resources cần task tiếp theo
- `applications`/`accessibility_feedback` chưa có seed — đúng scope (tránh PII giả)

## 15. Đề xuất tiếp theo

1. `feat/jobs-api` — `GET /api/jobs`, `GET /api/jobs/{id}` + Repository
2. `feat/resources-api` — `GET /api/resources`
3. `feat/applications-api` — `POST /api/applications` + validation
4. `feat/accessibility-feedback-api` — `POST /api/accessibility-feedback`
5. FE: danh sách việc làm, chi tiết, form ứng tuyển
