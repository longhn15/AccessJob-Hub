# ACCESSIBILITY_VERIFICATION_FIXES_005 — Kiểm tra & sửa accessibility FE

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: rà soát accessibility các luồng Front-end chính (layout, jobs, resources, accessibility), sửa lỗi obvious với **minimal diff**, không đổi API/DB/Docker; tạo `docs/wcag-checklist.md` và report số toàn cục **005**.

## 2. Tóm tắt yêu cầu

- Kiểm tra keyboard, focus, landmarks, heading, form label/aria, loading states, contrast/touch target theo design tokens.
- Sửa lỗi phát hiện được (CSS/aria/heading/ErrorSummary focus).
- Chạy lint/build/BE build/Docker verify.
- Tạo checklist WCAG 2.2 thực tế; report liệt kê route đã kiểm tra, test đã/chưa chạy, file sửa.

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| Layout: skip link, landmarks, nav active | ✅ Rà soát + sửa `aria-current` |
| `/jobs` — filter, JobCard | ✅ Rà soát + sửa checkbox touch |
| `/jobs/:id` — ApplicationForm | ✅ Rà soát + sửa focus lỗi |
| `/resources` — filter, ResourceCard | ✅ Rà soát + sửa link name |
| `/resources/:id` | ✅ Rà soát + sửa h1 loading |
| `/accessibility` — statement + feedback form | ✅ Rà soát + sửa focus lỗi |
| `docs/wcag-checklist.md` | ✅ Tạo mới |
| Sửa Back-end / DB / Docker | ❌ Không cần |
| Lighthouse / axe / screen reader | ❌ Chưa chạy (ghi rõ lý do) |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `accessibility-wcag-rule.mdc` | **Tiêu chí WCAG 2.2, keyboard, aria, claim verify** |
| `frontend-rule.mdc` | **Semantic HTML, form label, skip link, focus** |
| `ui-design-system-rule.mdc` | **Focus ring, touch 44px, ErrorSummary, nav active** |
| `stitch-ui-reference-rule.mdc` | Giữ tone Inclusive Utility, không đổi palette |
| `testing-rule.mdc` | **Lint/build/Docker/manual a11y checklist** |
| `report-verification-rule.mdc` | **Cấu trúc report, đánh số toàn cục 005** |
| `core-working-rule.mdc` | MVP, minimal diff, không refactor lan |
| `project-context-rule.mdc` | Phạm vi route MVP |
| `docker-runtime-rule.mdc` | Verify `docker compose` stack |
| `git-workflow-rule.mdc` | Không commit artifact |
| `security-config-rule.mdc` | Không hardcode URL (đọc, không sửa) |
| `backend-rule.mdc` | Không sửa BE (đọc) |
| `db-rule.mdc` | Không sửa DB (đọc) |

### Source / docs tham chiếu

- `frontend/src/components/Layout/*`, `form/*`, `jobs/*`, `resources/*`, `applications/*`, `feedback/*`
- `frontend/src/pages/*`, `frontend/src/index.css`, `frontend/src/styles/tokens.css`
- `docs/FRONTEND_FORMS_INTEGRATION_004.md`, `docs/FRONTEND_CORE_PAGES_001.md`

### Đánh số report

Quét `docs/*_[0-9][0-9][0-9].md` → max = **004** (`FRONTEND_FORMS_INTEGRATION_004.md`) → report này = **005**.

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `docs/wcag-checklist.md`
- `docs/ACCESSIBILITY_VERIFICATION_FIXES_005.md`

### Sửa

- `frontend/src/utils/formErrors.ts`
- `frontend/src/components/form/ErrorSummary.tsx`
- `frontend/src/components/form/Form.module.css`
- `frontend/src/components/form/fieldAria.ts`
- `frontend/src/components/applications/ApplicationForm.tsx`
- `frontend/src/components/feedback/AccessibilityFeedbackForm.tsx`
- `frontend/src/components/Layout/Layout.tsx`
- `frontend/src/components/jobs/JobCard.tsx`
- `frontend/src/components/jobs/JobFilters.module.css`
- `frontend/src/components/resources/ResourceCard.tsx`
- `frontend/src/components/resources/ResourceFilters.module.css`
- `frontend/src/pages/JobDetailPage.tsx`
- `frontend/src/pages/ResourceDetailPage.tsx`

## 6. Thay đổi chính theo từng file

| File | Thay đổi |
|------|----------|
| `formErrors.ts` | Thêm `focusFormErrors()` — focus ErrorSummary (≥2 lỗi) hoặc field đầu tiên (1 lỗi) |
| `ErrorSummary.tsx` | Link lỗi `preventDefault` + `focus()` + `scrollIntoView` (SPA hash không đủ) |
| `ApplicationForm.tsx` / `AccessibilityFeedbackForm.tsx` | Dùng `focusFormErrors`; `aria-describedby` trỏ ErrorSummary khi hiển thị |
| `fieldAria.ts` | `aria-invalid` chỉ set khi có lỗi (không `false` thừa) |
| `Form.module.css` | `scroll-margin-top` cho control (anchor dưới sticky header) |
| `Layout.tsx` | `NavItem` + `useMatch` + `aria-current="page"` khi active |
| `JobFilters.module.css` | Checkbox row `min-height` 44px; label clickable full height; focus ring checkbox |
| `JobCard.tsx` / `ResourceCard.tsx` | `aria-label` cho link "Xem chi tiết" kèm tiêu đề |
| `ResourceFilters.module.css` | `scroll-margin-top` cho input |
| `JobDetailPage.tsx` / `ResourceDetailPage.tsx` | Trạng thái loading có `h1` (một heading/page) |

## 7. Lý do thiết kế

- **Focus sau lỗi:** WCAG 3.3.1/3.3.3 — người dùng bàn phím cần biết lỗi ở đâu; 1 lỗi không cần ErrorSummary nhưng vẫn phải focus field.
- **ErrorSummary link:** React SPA không luôn focus field khi dùng `#id`; xử lý explicit giữ hành vi anchor.
- **`aria-current`:** React Router v7 không tự gắn; underline CSS đã có nhưng screen reader cần state rõ.
- **Minimal diff:** Không refactor form components; chỉ utility focus + CSS nhỏ.

## 8. Accessibility impact

| Trước | Sau |
|-------|-----|
| Submit 1 lỗi — không chuyển focus | Focus vào field lỗi |
| ErrorSummary link có thể không focus field trong SPA | Click link → focus + scroll field |
| Detail page loading thiếu `h1` | Có `h1` + LoadingState |
| Nav active chỉ visual | `aria-current="page"` |
| Checkbox remote filter ~20px | Label row ≥ 44px, focus visible |
| "Xem chi tiết" trùng tên nhiều card | `aria-label` kèm tiêu đề job/resource |

## 9. Docker/runtime impact

Không sửa Dockerfile / `docker-compose.yml`. Rebuild frontend image để nhận CSS/JS mới khi deploy.

## 10. API impact

Không đổi contract API.

## 11. Database impact

Không.

## 12. Cách kiểm tra

```bash
git status
cd frontend && npm run lint
cd frontend && npm run build
cd backend && mvn clean package -DskipTests
docker compose config
docker compose build
docker compose up -d
curl.exe http://localhost:8080/api/health
curl.exe -s -o NUL -w "%{http_code}" http://localhost:3000
curl.exe http://localhost:3000/api/jobs
curl.exe http://localhost:3000/api/resources
docker compose logs frontend --tail=100
docker compose logs backend --tail=150
docker compose down
```

Manual keyboard (trình duyệt `http://localhost:3000`): skip link → nav → `/jobs` filter → JobCard → `/jobs/1` form lỗi/hợp lệ → `/accessibility` feedback form.

## 13. Kết quả kiểm tra

### Route đã rà soát (source + runtime khi Docker up)

| Route | Rà soát code | HTTP khi Docker up |
|-------|--------------|-------------------|
| `/` (Home) | ✅ Landmarks qua Layout | 200 |
| `/jobs` | ✅ Filter, list, status | 200 (SPA) |
| `/jobs/1` | ✅ Form, heading | 200 (SPA) |
| `/resources` | ✅ Filter, cards | 200 (SPA) |
| `/resources/1` | ✅ Detail, external link | 200 (SPA) |
| `/accessibility` | ✅ Statement, form | 200 (SPA) |

### Automated / build

| Kiểm tra | Kết quả |
|----------|---------|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build` | **PASS** |
| `docker compose up -d` | **PASS** (mysql, backend healthy, frontend started) |
| `GET /api/health` | **UP** — `{"status":"UP","database":"UP",...}` |
| `GET :3000` | **200** |
| `GET :3000/api/jobs` | **PASS** — JSON danh sách job |
| `GET :3000/api/resources` | **PASS** — JSON danh sách resource |
| `docker compose down` | **PASS** |

### Manual / công cụ a11y

| Kiểm tra | Trạng thái | Ghi chú |
|----------|------------|---------|
| Keyboard Tab flow đầy đủ | **Chưa chạy interactive** | Môi trường agent CLI không có headed browser; đã verify qua code review + checklist trong `wcag-checklist.md` |
| Focus visible (mắt thường) | **Chưa chạy interactive** | CSS `:focus-visible` + tokens đã có; cần xác nhận trên browser |
| Responsive 360px | **Chưa chạy** | CSS dùng margin mobile token; cần DevTools |
| Zoom 200% | **Chưa chạy** | Dùng `rem`; cần browser zoom manual |
| Lighthouse Accessibility | **Chưa chạy** | Không có Chrome automation trong session |
| axe DevTools | **Chưa chạy** | Cần extension trên browser dev |
| Screen reader (NVDA/ChromeVox) | **Chưa chạy** | Không claim pass |

## 14. Rủi ro còn lại trước demo

1. **Manual keyboard/SR chưa verify thật** — cần 1 vòng test người trước demo (checklist mục 5 trong `wcag-checklist.md`).
2. **Zoom 200% / mobile 360px** — chưa kiểm visual; layout filter 2 cột có thể cần tinh chỉnh trên màn hẹp.
3. **Checkbox input vẫn 20px** — vùng chạm đạt qua label 44px; một số auditor có thể flag kích thước box nhỏ.
4. **Lighthouse/axe** — chưa có baseline điểm số.
5. **Job detail loading `h1` generic** — "Chi tiết việc làm" thay vì tên job (chấp nhận được cho loading state).

## 15. Đề xuất tiếp theo

1. Chạy manual keyboard checklist (15 phút) theo `docs/wcag-checklist.md` và ghi kết quả vào checklist.
2. Chạy Lighthouse + axe trên 5 route chính; fix vi phạm còn lại nếu có.
3. Test NVDA/VoiceOver một flow: submit form lỗi → ErrorSummary → sửa → success.
4. Cân nhắc `eslint-plugin-jsx-a11y` nếu muốn bắt lỗi aria tại lint time.
