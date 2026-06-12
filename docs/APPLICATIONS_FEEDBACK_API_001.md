# APPLICATIONS_FEEDBACK_API_001 — POST Applications & Accessibility Feedback API

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: implement `POST /api/applications` và `POST /api/accessibility-feedback` với Repository → Service → DTO → Controller, Bean Validation, error JSON có `fieldErrors`, không trả Entity, không sửa FE/schema/migration.

## 2. Tóm tắt yêu cầu

- **Applications:** lưu form quan tâm/ứng tuyển; validate `jobId` (tồn tại + active), `fullName`, `email`, `phone` (optional), `message` (optional MVP); 404 tiếng Việt khi job không hợp lệ; 400 có `fieldErrors`.
- **Accessibility feedback:** lưu phản hồi; validate `category`, `description`, `contactEmail` (optional); 400 có `fieldErrors`.
- Cập nhật README, `docs/api-endpoints.md`, tạo report; verify build + Docker + curl.

## 3. Phạm vi đã thực hiện

- `ApplicationRepository`, `AccessibilityFeedbackRepository`
- Request/Response DTO riêng cho từng API
- `ApplicationService`, `AccessibilityFeedbackService` (kiểm tra job active, `EntityManager.refresh` cho `createdAt`)
- `ApplicationController`, `AccessibilityFeedbackController`
- `ApplicationMapper`, `AccessibilityFeedbackMapper`
- Mở rộng `ApiErrorResponse` (`fieldErrors`) và `GlobalExceptionHandler` (`MethodArgumentNotValidException`)
- Cập nhật `README.md`, `docs/api-endpoints.md`
- **Không** sửa Front-end, migration, Docker config, schema

## 4. Danh sách file đã đọc

### Rule files (`.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng task |
|-----------|----------------|
| `core-working-rule.mdc` | **Trực tiếp** — MVP, minimal diff |
| `backend-rule.mdc` | **Trực tiếp** — Controller→Service→Repository, DTO, validation error JSON |
| `db-rule.mdc` | **Trực tiếp** — không đổi schema, MySQL qua Docker |
| `security-config-rule.mdc` | **Trực tiếp** — không log PII, không stack trace client |
| `testing-rule.mdc` | **Trực tiếp** — `mvn package`, curl, Docker |
| `report-verification-rule.mdc` | **Trực tiếp** — cấu trúc report 15 mục |
| `project-context-rule.mdc` | Gián tiếp — form ứng tuyển + feedback trong MVP |
| `docker-runtime-rule.mdc` | Gián tiếp — verify `docker compose up` |
| `git-workflow-rule.mdc` | Gián tiếp — branch `feat/applications-feedback-api` |
| `frontend-rule.mdc` | Không áp dụng |
| `accessibility-wcag-rule.mdc` | Gián tiếp — message API cho FE map `aria-describedby` |
| `ui-design-system-rule.mdc` | Không áp dụng |
| `stitch-ui-reference-rule.mdc` | Không áp dụng |

### Source & docs

- `backend/src/main/java/com/accessjobhub/entity/Application.java`
- `backend/src/main/java/com/accessjobhub/entity/AccessibilityFeedback.java`
- `backend/src/main/java/com/accessjobhub/entity/Job.java`
- `backend/src/main/java/com/accessjobhub/exception/GlobalExceptionHandler.java`
- `backend/src/main/java/com/accessjobhub/dto/ApiErrorResponse.java`
- `backend/src/main/java/com/accessjobhub/service/JobService.java`
- `backend/src/main/java/com/accessjobhub/controller/JobController.java`
- `backend/src/main/resources/db/migration/V1__create_core_tables.sql`
- `backend/pom.xml`
- `README.md`
- `docs/api-endpoints.md`
- `docs/JOBS_API_001.md`

## 5. Danh sách file đã tạo/sửa

| File | Hành động |
|------|-----------|
| `backend/src/main/java/com/accessjobhub/dto/ApplicationRequest.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/dto/ApplicationResponse.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/dto/AccessibilityFeedbackRequest.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/dto/AccessibilityFeedbackResponse.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/dto/ApiErrorResponse.java` | Sửa — thêm `fieldErrors`, factory `validation()` |
| `backend/src/main/java/com/accessjobhub/repository/ApplicationRepository.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/repository/AccessibilityFeedbackRepository.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/mapper/ApplicationMapper.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/mapper/AccessibilityFeedbackMapper.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/service/ApplicationService.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/service/AccessibilityFeedbackService.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/controller/ApplicationController.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/controller/AccessibilityFeedbackController.java` | Tạo |
| `backend/src/main/java/com/accessjobhub/exception/GlobalExceptionHandler.java` | Sửa — xử lý `MethodArgumentNotValidException` |
| `README.md` | Sửa — bảng API + MVP checklist |
| `docs/api-endpoints.md` | Sửa — mô tả POST endpoints |
| `docs/APPLICATIONS_FEEDBACK_API_001.md` | Tạo — report này |

## 6. Thay đổi chính theo từng file

### Applications flow

- **Request DTO:** `@NotNull jobId`, `@NotBlank @Email fullName/email`, `@Pattern phone` (optional), `@Size message` (optional, max 5000).
- **Service:** `findByIdAndActiveTrue(jobId)` → `NotFoundException` message tiếng Việt; set `status = pending`; `flush` + `refresh` để lấy `createdAt` từ DB.
- **Response:** `id`, message thành công, `status`, `createdAt` — không expose entity fields.

### Accessibility feedback flow

- **Request DTO:** `@NotBlank category/description`, `@Pattern contactEmail` cho optional email (cho phép chuỗi rỗng).
- **Service:** lưu với `status = pending`; `flush` + `refresh` cho `createdAt`.

### Error handling

- **400 validation:** `{ message, fieldErrors: [{ field, message }], timestamp }`.
- **404 job:** `{ message, timestamp }` — không có `fieldErrors` (`@JsonInclude(NON_NULL)`).

### Validation behavior (MVP)

| Field | Applications | Accessibility feedback |
|-------|--------------|------------------------|
| `jobId` | Bắt buộc; service kiểm tra active | — |
| `fullName` | Bắt buộc, max 255 | — |
| `email` | Bắt buộc, `@Email` | — |
| `phone` | Optional; pattern số/`+`-`()` | — |
| `message` | Optional; max 5000 | — |
| `category` | — | Bắt buộc, max 100 |
| `description` | — | Bắt buộc, max 5000 |
| `contactEmail` | — | Optional; pattern email hoặc rỗng |

## 7. Lý do thiết kế

- **`message` optional (Applications):** schema `applications.message` nullable; MVP không bắt buộc nội dung bổ sung.
- **`EntityManager.refresh`:** `created_at` do DB default; Hibernate `insertable=false` không load lại sau insert.
- **HTTP 201 Created:** POST tạo resource mới.
- **Pattern cho optional email/phone:** tránh `@Email` fail trên chuỗi rỗng khi field optional.
- **Không đổi schema:** entity/migration từ `CORE_DOMAIN_SCHEMA` đã đủ.

## 8. Accessibility impact

Không sửa UI. API trả `fieldErrors` với `field` camelCase khớp tên input FE — map vào `aria-describedby` / `aria-invalid`. Message tiếng Việt rõ ràng cho screen reader.

## 9. Docker/runtime impact

- Không đổi `docker-compose.yml`.
- Rebuild image `backend` để đóng gói controller/service mới.
- `/api/health`, Flyway, Jobs/Resources API giữ nguyên.
- Frontend proxy `/api/*` hoạt động (đã verify `/api/jobs`, `/api/resources` qua port 3000).

## 10. API impact

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/applications` | Gửi form quan tâm/ứng tuyển |
| `POST` | `/api/accessibility-feedback` | Gửi phản hồi accessibility |
| `GET` | `/api/health`, `/api/jobs`, `/api/resources` | Giữ nguyên |

**Success response (201):** `id`, `message`, `status` (`pending`), `createdAt`.

**Validation error (400):** `message` + `fieldErrors[]` + `timestamp`.

**Not found job (404):** `message` + `timestamp`.

## 11. Database impact

- **Không** thêm migration / đổi schema.
- **Ghi** bảng `applications`, `accessibility_feedback` (INSERT khi validation pass).
- FK `applications.job_id` → `jobs.id`; job phải tồn tại (active check ở service).
- Default `status = pending`, `created_at = CURRENT_TIMESTAMP` từ schema V1.

## 12. Cách kiểm tra

```bash
git status
cd backend && mvn clean package -DskipTests
docker compose config
docker compose build
docker compose up -d
curl http://localhost:8080/api/health
curl http://localhost:8080/api/jobs
curl http://localhost:8080/api/resources

# POST (dùng file JSON trên Windows PowerShell để tránh lỗi escape)
curl -X POST http://localhost:8080/api/applications \
  -H "Content-Type: application/json" \
  -d '{"jobId":1,"fullName":"Nguyễn Văn A","email":"user@example.com","phone":"0900000000","message":"Tôi quan tâm đến vị trí này."}'

curl -X POST http://localhost:8080/api/applications \
  -H "Content-Type: application/json" \
  -d '{"jobId":1,"fullName":"Nguyễn Văn A","email":"invalid-email","message":"..."}'

curl -X POST http://localhost:8080/api/applications \
  -H "Content-Type: application/json" \
  -d '{"jobId":999999,"fullName":"Nguyễn Văn A","email":"user@example.com","message":"..."}'

curl -X POST http://localhost:8080/api/accessibility-feedback \
  -H "Content-Type: application/json" \
  -d '{"category":"keyboard","description":"Mô tả...","contactEmail":"user@example.com"}'

curl -X POST http://localhost:8080/api/accessibility-feedback \
  -H "Content-Type: application/json" \
  -d '{"category":"keyboard","description":"","contactEmail":"invalid-email"}'

docker compose exec mysql mysql -uaccessjob -pchange-me accessjobhub \
  -e "SELECT COUNT(*) FROM applications; SELECT COUNT(*) FROM accessibility_feedback;"

curl http://localhost:3000/api/jobs
curl http://localhost:3000/api/resources
docker compose logs backend --tail=150
docker compose down
```

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build` | **PASS** (backend + frontend) |
| `docker compose up -d` | **PASS** — mysql → backend → frontend healthy |
| `GET /api/health` | **PASS** — `status: UP`, `database: UP` |
| `GET /api/jobs`, `GET /api/resources` | **PASS** |
| `POST /api/applications` hợp lệ | **PASS** — HTTP 201, lưu DB, `createdAt` có giá trị |
| `POST /api/applications` email sai | **PASS** — HTTP 400 + `fieldErrors` (`email`) |
| `POST /api/applications` fullName blank | **PASS** — HTTP 400 + `fieldErrors` (`fullName`) |
| `POST /api/applications` jobId 999999 | **PASS** — HTTP 404 + message tiếng Việt |
| `POST /api/accessibility-feedback` hợp lệ | **PASS** — HTTP 201, lưu DB |
| `POST /api/accessibility-feedback` lỗi | **PASS** — HTTP 400 + `fieldErrors` (`description`, `contactEmail`) |
| DB `applications` count | **PASS** — 2 (sau 2 POST hợp lệ trong session test) |
| DB `accessibility_feedback` count | **PASS** — 1 |
| `GET localhost:3000/api/jobs` | **PASS** — proxy Nginx |
| `GET localhost:3000/api/resources` | **PASS** — proxy Nginx |
| `docker compose down` | **PASS** |
| FE build | **Chưa chạy** — không sửa FE |
| Unit test | **Chưa có** — `mvn test` skip |

**Lưu ý:** Trên Windows PowerShell, inline JSON với `\"` có thể gây HTTP 400 parse error; dùng `--data-binary @file.json` hoặc bash/Git Bash.

## 14. Rủi ro còn lại

- Chưa có rate limiting — form public có thể bị spam (ngoài scope MVP).
- Không validate `category` theo enum cố định — FE có thể gửi giá trị tự do.
- Job inactive trả cùng 404 với job không tồn tại — đúng yêu cầu bảo mật MVP.
- Chưa có integration test `@WebMvcTest` cho validation matrix.
- Flyway warning MySQL 8.4 (đã có từ task trước).

## 15. Đề xuất tiếp theo

1. `feat/fe-application-form` — form ứng tuyển gọi `POST /api/applications`, map `fieldErrors` vào form accessible
2. `feat/fe-accessibility-feedback` — form feedback gọi `POST /api/accessibility-feedback`
3. `feat/fe-accessibility-statement` — trang Accessibility Statement
4. Thêm `@WebMvcTest` cho POST validation + 404 job
5. Enum `category` cho feedback (keyboard, screen-reader, contrast, …) nếu FE cần dropdown cố định
