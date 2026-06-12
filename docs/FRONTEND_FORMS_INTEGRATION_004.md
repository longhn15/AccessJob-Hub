# FRONTEND_FORMS_INTEGRATION_004 — Form ứng tuyển & phản hồi accessibility (FE)

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: tích hợp Front-end form POST cho applications (`/jobs/:id`) và accessibility feedback (`/accessibility`), tuân thủ design system + WCAG form patterns, **không** sửa BE/DB/Docker.

## 2. Tóm tắt yêu cầu

- Form quan tâm/ứng tuyển trên JobDetail → `POST /api/applications`
- Form phản hồi accessibility trên `/accessibility` → `POST /api/accessibility-feedback`
- Component form tái sử dụng, validation FE + map `fieldErrors` API
- `aria-invalid`, `aria-describedby`, ErrorSummary (≥2 lỗi), loading/disabled submit
- Cập nhật README, api-endpoints.md; report số toàn cục **004**

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| ApplicationForm trên `/jobs/:id` | ✅ |
| AccessibilityFeedbackForm trên `/accessibility` | ✅ |
| API `createApplication`, `createAccessibilityFeedback` | ✅ |
| Form components (FormField, ErrorMessage, ErrorSummary, …) | ✅ |
| Client validation + API fieldErrors mapping | ✅ |
| Success: **reset form**, giữ nguyên trang | ✅ |
| Sửa backend/DB/Docker | ❌ (không cần) |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `ui-design-system-rule.mdc` | **Tokens, Input/Button/ErrorMessage/ErrorSummary style** |
| `stitch-ui-reference-rule.mdc` | Tone Inclusive Utility, form affordance |
| `frontend-rule.mdc` | **Label, form error, semantic button** |
| `accessibility-wcag-rule.mdc` | **aria-*, không chỉ màu, keyboard** |
| `report-verification-rule.mdc` | Cấu trúc report, **đánh số toàn cục 004** |
| `core-working-rule.mdc` | MVP, minimal diff, env API URL |
| `testing-rule.mdc` | build/lint/Docker verify |
| `security-config-rule.mdc` | Không hardcode URL/secret |
| `project-context-rule.mdc` | MVP form trong phạm vi |
| `docker-runtime-rule.mdc` | Proxy `/api` qua Nginx |
| `git-workflow-rule.mdc` | Không commit artifact |
| `backend-rule.mdc` | Contract API fieldErrors (đọc, không sửa) |
| `db-rule.mdc` | Không sửa schema |

### Source/docs

- `docs/api-endpoints.md`, `docs/APPLICATIONS_FEEDBACK_API_001.md`
- `frontend/src/api/client.ts`, `JobDetailPage.tsx`, `AccessibilityPage.tsx`
- Backend DTO `ApplicationResponse`, `AccessibilityFeedbackResponse`

### Đánh số report

Quét `docs/*_[0-9][0-9][0-9].md` → max = **003** (`GLOBAL_REPORT_NUMBERING_RULE_003.md`) → report này = **004**.

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `frontend/src/utils/validation.ts`, `formErrors.ts`
- `frontend/src/types/application.ts`, `accessibilityFeedback.ts`
- `frontend/src/api/applications.ts`, `accessibilityFeedback.ts`
- `frontend/src/components/form/*` (FormField, TextInput, TextArea, Select, ErrorMessage, ErrorSummary, StatusMessage, SubmitButton, fieldAria.ts, Form.module.css)
- `frontend/src/components/applications/ApplicationForm.tsx`
- `frontend/src/components/feedback/AccessibilityFeedbackForm.tsx`
- `docs/FRONTEND_FORMS_INTEGRATION_004.md`

### Sửa

- `frontend/src/api/client.ts` — thêm `apiPost`
- `frontend/src/pages/JobDetailPage.tsx` — nhúng ApplicationForm
- `frontend/src/pages/AccessibilityPage.tsx` — nhúng AccessibilityFeedbackForm
- `README.md`, `docs/api-endpoints.md`

## 6. Thay đổi chính theo từng file

| File / nhóm | Thay đổi |
|-------------|----------|
| `api/client.ts` | `apiPost<T>` JSON POST, `ApiError` + `fieldErrors` |
| `ApplicationForm` | Fields fullName/email/phone/message; validate FE; map API errors; success **reset form** |
| `AccessibilityFeedbackForm` | Select category (keyboard, screen-reader, …); description required; contactEmail optional |
| Form components | Label visible, `getFieldAriaProps` → `aria-invalid` + `aria-describedby`; ErrorSummary anchor `#field` |
| `SubmitButton` | `disabled` + `aria-busy` khi loading |

## 7. Lý do thiết kế

- **Form trên `/accessibility`** thay vì route `/feedback` riêng — MVP đã có section phản hồi, tránh thêm route không cần thiết.
- **Reset form sau success** — người dùng thấy message thành công và form trống để gửi lại nếu cần; không redirect.
- **Validate FE trước** — giảm round-trip; vẫn map `fieldErrors` từ API 400.
- **ErrorSummary focus** — khi ≥2 lỗi, focus vào summary để screen reader/keyboard nhận lỗi ngay.
- **CSS variables** — toàn bộ form dùng `Form.module.css` + tokens, không hardcode màu.

## 8. Accessibility impact

| Tiêu chí | Cách đáp ứng |
|----------|--------------|
| Visible label | Mọi input/select/textarea qua `FormField` + `<label htmlFor>` |
| Không placeholder làm label | Không dùng placeholder thay label |
| `aria-invalid` | Khi có lỗi field |
| `aria-describedby` | Liên kết hint + ErrorMessage |
| ErrorSummary | ≥2 lỗi, `role="alert"`, link anchor tới field |
| Success/error submit | `StatusMessage` — `role="status"` / `role="alert"` + text prefix |
| Submit loading | `disabled`, `aria-busy`, đổi label "Đang gửi…" |
| Keyboard | Native controls + focus ring tokens |
| Không chỉ màu | Lỗi có text + border; success có prefix "Thành công:" |

**Chưa verify:** keyboard manual đầy đủ, axe, Lighthouse, screen reader.

## 9. Docker/runtime impact

Không sửa Docker/nginx. POST qua proxy `localhost:3000/api/...` hoạt động (đã curl 201).

## 10. API impact

Không đổi contract. FE consume:

- `POST /api/applications` — body `jobId`, `fullName`, `email`, `phone?`, `message?`
- `POST /api/accessibility-feedback` — `category`, `description`, `contactEmail?`
- Map `fieldErrors[].field` → state lỗi từng field
- 404 applications → message form-level

## 11. Database impact

Không có (ghi nhận qua API hiện có).

## 12. Cách kiểm tra

```bash
cd frontend && npm run lint && npm run build
cd backend && mvn clean package -DskipTests
docker compose config && docker compose build && docker compose up -d
curl.exe http://localhost:8080/api/health
curl.exe http://localhost:8080/api/jobs/1
# POST (dùng file JSON tránh escape PowerShell):
curl.exe -X POST http://localhost:8080/api/applications -H "Content-Type: application/json" -d @payload.json
curl.exe -X POST http://localhost:8080/api/accessibility-feedback -H "Content-Type: application/json" -d @payload.json
curl.exe -X POST http://localhost:3000/api/applications ...  # qua Nginx
docker compose down
```

Keyboard: Tab skip link → form fields → submit rỗng → sửa lỗi → submit hợp lệ → đọc success message.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config/build/up` | **PASS** |
| `GET /api/health` | **PASS** — UP |
| `GET /api/jobs/1` | **PASS** |
| `POST /api/applications` (hợp lệ) | **PASS** — 201 + message |
| `POST /api/accessibility-feedback` (hợp lệ) | **PASS** — 201 |
| `POST /api/applications` (invalid) | **PASS** — 400 + `fieldErrors` fullName, email |
| `POST` qua `localhost:3000/api/...` | **PASS** — 201 |
| `docker compose down` | **PASS** |
| Keyboard manual | **Chưa chạy** trong session agent |
| axe / Lighthouse / screen reader | **Chưa chạy** |

## 14. Rủi ro còn lại

- Phone chưa validate ký tự `+,-,()` phía FE (API validate; có thể bổ sung sau).
- Single field error không auto-focus field (chỉ ErrorSummary khi ≥2 lỗi focus summary).
- Submit liên tiếp tạo nhiều bản ghi demo DB — chấp nhận cho MVP.
- Chưa test SR/axe trước demo cuộc thi.

## 15. Đề xuất tiếp theo

1. Keyboard + axe pass trên JobDetail form và Accessibility form.
2. Auto-focus field đầu tiên lỗi khi chỉ 1 lỗi.
3. Optional: confirm dialog trước submit hoặc disable double-submit bằng cooldown.
4. Report tiếp theo trong `docs/` dùng số **005** (max hiện tại = 004).
