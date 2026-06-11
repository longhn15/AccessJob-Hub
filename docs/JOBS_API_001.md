# JOBS_API_001 — Read-only Jobs & Resources API

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: implement API read-only `GET /api/jobs`, `GET /api/jobs/{id}`, `GET /api/resources`, `GET /api/resources/{id}` với Repository → Service → DTO → Controller, filter/limit, 404 tiếng Việt, không sửa FE/DB schema.

## 2. Tóm tắt yêu cầu

- Jobs API: filter `keyword`, `location`, `workType`, `remoteAvailable`, `limit`; chỉ active; sort mới nhất; 404 rõ ràng.
- Resources API: filter `category`, `keyword`, `limit`; chỉ active; 404 rõ ràng.
- Không trả Entity; GlobalExceptionHandler; cập nhật README + `docs/api-endpoints.md`.

## 3. Phạm vi đã thực hiện

- `JobRepository`, `ResourceRepository` với `@Query` JPQL + `Pageable`
- `JobService`, `ResourceService`
- `JobResponse`, `ResourceResponse`, `ApiErrorResponse`
- `JobController`, `ResourceController`
- `NotFoundException`, `GlobalExceptionHandler`
- `JobMapper`, `ResourceMapper`, `QueryLimit`, `StringUtils`
- Cập nhật `README.md`, tạo `docs/api-endpoints.md`
- **Không** sửa Front-end, migration, Docker config

## 4. Danh sách file đã đọc

### Rule files (`.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng task |
|-----------|----------------|
| `core-working-rule.mdc` | **Trực tiếp** — MVP, minimal diff, không sửa ngoài phạm vi |
| `backend-rule.mdc` | **Trực tiếp** — Controller→Service→Repository, DTO, error JSON tiếng Việt |
| `db-rule.mdc` | **Trực tiếp** — limit query, không đổi schema, MySQL qua Docker |
| `security-config-rule.mdc` | **Trực tiếp** — không stack trace client, không auth |
| `testing-rule.mdc` | **Trực tiếp** — `mvn package`, curl health/API |
| `report-verification-rule.mdc` | **Trực tiếp** — cấu trúc report 15 mục, verify trung thực |
| `project-context-rule.mdc` | Gián tiếp — API MVP trong scope |
| `docker-runtime-rule.mdc` | Gián tiếp — verify `docker compose up` |
| `git-workflow-rule.mdc` | Gián tiếp — branch `feat/jobs-api` |
| `frontend-rule.mdc` | Không áp dụng — không sửa FE |
| `accessibility-wcag-rule.mdc` | Gián tiếp — message API dễ hiểu cho screen reader |
| `ui-design-system-rule.mdc` | Không áp dụng — không sửa UI |
| `stitch-ui-reference-rule.mdc` | Không áp dụng |

### Source & docs

- `backend/src/main/java/com/accessjobhub/entity/Job.java`
- `backend/src/main/java/com/accessjobhub/entity/Resource.java`
- `backend/src/main/java/com/accessjobhub/controller/HealthController.java`
- `backend/src/main/resources/db/migration/V2__seed_demo_data.sql`
- `README.md`
- `docker-compose.yml`

## 5. Danh sách file đã tạo/sửa

| File | Hành động |
|------|-----------|
| `backend/src/main/java/com/accessjobhub/dto/JobResponse.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/dto/ResourceResponse.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/dto/ApiErrorResponse.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/exception/NotFoundException.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/exception/GlobalExceptionHandler.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/repository/JobRepository.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/repository/ResourceRepository.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/service/JobService.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/service/ResourceService.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/controller/JobController.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/controller/ResourceController.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/mapper/JobMapper.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/mapper/ResourceMapper.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/util/QueryLimit.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/util/StringUtils.java` | Tạo |
| `README.md` | Sửa — bảng API + MVP checklist |
| `docs/api-endpoints.md` | Tạo |
| `docs/JOBS_API_001.md` | Tạo — report này |

## 6. Thay đổi chính theo từng file

### Jobs flow

- **Repository:** `findActiveJobs` — filter optional qua JPQL `IS NULL OR ...`; `ORDER BY createdAt DESC, id DESC`; `Pageable` giới hạn kết quả.
- **Service:** `QueryLimit.resolve(limit)` — mặc định **20**, max **100**; `getJobById` → `NotFoundException`.
- **Controller:** `GET /api/jobs`, `GET /api/jobs/{id}` trả `JobResponse`.

### Resources flow

- Tương tự Jobs; filter `category` (contains), `keyword` (title + description).

### Error handling

- `404`: `{ "message": "Không tìm thấy việc làm phù hợp." }` hoặc `"... tài nguyên phù hợp."`, kèm `timestamp`.

### Sort (đã chọn)

**`createdAt DESC, id DESC`** — job/resource mới seed/insert sau hiển thị trước; `id` làm tie-break khi `createdAt` trùng (seed demo).

## 7. Lý do thiết kế

- **JPQL + Pageable:** đơn giản cho MVP seed nhỏ; limit ở DB, không load full table.
- **Record DTO:** immutable, JSON rõ field camelCase cho FE.
- **Mapper class:** tách mapping khỏi service, không expose entity.
- **Không pagination offset:** MVP chỉ `limit`; offset có thể thêm sau.
- **Keyword `developer`:** seed tiếng Việt không chứa từ này → trả `[]` (lọc đúng, không match). Dùng `keyword=Frontend` hoặc `keyword=Lập` để verify có kết quả.

## 8. Accessibility impact

Không sửa UI. API message 404 tiếng Việt, field name camelCase ổn định — FE có thể gán `aria-live` khi hiển thị lỗi/tải danh sách.

## 9. Docker/runtime impact

- Không đổi `docker-compose.yml`.
- Rebuild image `backend` để đóng gói controller/service mới.
- `/api/health` và Flyway không đổi behavior.
- Frontend proxy `/api/jobs`, `/api/resources` hoạt động qua Nginx.

## 10. API impact

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/jobs` | Danh sách job active + filter + limit |
| `GET` | `/api/jobs/{id}` | Chi tiết job active |
| `GET` | `/api/resources` | Danh sách resource active + filter + limit |
| `GET` | `/api/resources/{id}` | Chi tiết resource active |
| `GET` | `/api/health` | Giữ nguyên |

**Query params**

| Endpoint | Params |
|----------|--------|
| `/api/jobs` | `keyword`, `location`, `workType`, `remoteAvailable`, `limit` |
| `/api/resources` | `category`, `keyword`, `limit` |

**Limit:** default 20, max 100.

## 11. Database impact

- **Không** thêm migration / đổi schema.
- Chỉ đọc bảng `jobs`, `resources` (`is_active = true`).
- Index có sẵn từ `V1__create_core_tables.sql` (`idx_jobs_is_active`, `idx_resources_is_active`).

## 12. Cách kiểm tra

```bash
git status
cd backend && mvn clean package -DskipTests
docker compose config
docker compose build
docker compose up -d
curl http://localhost:8080/api/health
curl http://localhost:8080/api/jobs
curl "http://localhost:8080/api/jobs?keyword=developer"
curl "http://localhost:8080/api/jobs?remoteAvailable=true"
curl http://localhost:8080/api/jobs/1
curl http://localhost:8080/api/jobs/999999
curl http://localhost:8080/api/resources
curl "http://localhost:8080/api/resources?keyword=WCAG"
curl http://localhost:8080/api/resources/1
curl http://localhost:8080/api/resources/999999
curl http://localhost:3000/api/jobs
curl http://localhost:3000/api/resources
docker compose logs backend --tail=150
docker compose down
```

Bổ sung (URL encode tiếng Việt):

```bash
curl -G "http://localhost:8080/api/jobs" --data-urlencode "location=Hà Nội"
curl -G "http://localhost:8080/api/resources" --data-urlencode "category=Tiêu chuẩn"
```

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build` (backend) | **PASS** |
| `docker compose up -d` | **PASS** — mysql → backend → frontend healthy |
| `GET /api/health` | **PASS** — `status: UP`, `database: UP` |
| `GET /api/jobs` | **PASS** — 3 jobs, sort id 3→2→1 |
| `GET /api/jobs?keyword=developer` | **PASS** — `[]` (seed không có từ "developer"; cơ chế lọc hoạt động) |
| `GET /api/jobs?keyword=Frontend` | **PASS** — 1 job (id 2) |
| `GET /api/jobs?location=Hà Nội` (encoded) | **PASS** — 1 job |
| `GET /api/jobs?workType=part-time` | **PASS** — 1 job |
| `GET /api/jobs?remoteAvailable=true` | **PASS** — 2 jobs |
| `GET /api/jobs/1` | **PASS** |
| `GET /api/jobs/999999` | **PASS** — HTTP 404 + JSON message |
| `GET /api/resources` | **PASS** — 4 resources |
| `GET /api/resources?category=Tiêu chuẩn` (encoded) | **PASS** — 1 resource |
| `GET /api/resources?keyword=WCAG` | **PASS** — 1 resource |
| `GET /api/resources/1` | **PASS** |
| `GET /api/resources/999999` | **PASS** — HTTP 404 + JSON message |
| `GET localhost:3000/api/jobs` | **PASS** — proxy Nginx |
| `GET localhost:3000/api/resources` | **PASS** — proxy Nginx |
| `docker compose down` | **PASS** |
| FE build | **Chưa chạy** — không sửa FE |
| Unit test | **Chưa có** — `mvn test` skip |

## 14. Rủi ro còn lại

- `keyword=developer` trả rỗng với seed hiện tại — FE/demo nên dùng từ khóa tiếng Việt hoặc "Frontend"/"WCAG".
- Query param tiếng Việt cần URL-encode đúng (Tomcat 400 nếu encoding sai từ client).
- Chưa có pagination `offset`/`page` — dataset lớn sau này cần bổ sung.
- `workType` khớp chính xác (`full-time`, `part-time`) — cần document cho FE.
- Inactive job/resource không lộ qua API — đúng yêu cầu nhưng admin chưa có.

## 15. Đề xuất tiếp theo

1. `feat/fe-jobs-list` — trang danh sách việc làm gọi API + JobCard theo design system
2. `feat/fe-job-detail` — chi tiết việc làm
3. `feat/fe-resources` — trang tài nguyên
4. `feat/applications-api` — `POST /api/applications`
5. Thêm integration test `@WebMvcTest` cho controller + filter params
