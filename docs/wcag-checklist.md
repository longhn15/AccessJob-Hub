# WCAG 2.2 Checklist — AccessJob Hub (MVP)

Checklist thực tế cho các luồng Front-end chính. Cập nhật sau vòng kiểm thử cuối **2026-06-12** (report `FINAL_ACCESSIBILITY_AUDIT_006`).

**Phạm vi route:** `/`, `/jobs`, `/jobs/:id`, `/job-matching`, `/resources`, `/resources/:id`, `/accessibility`, `/wcag-22`

**Ma trận WCAG 2.2 mới:** [wcag-22-conformance-matrix.md](./wcag-22-conformance-matrix.md) · route `/wcag-22`

**Tiêu chuẩn mục tiêu:** WCAG 2.2 Level AA cho luồng chính.

**Bằng chứng:** `docs/assets/accessibility/` (Lighthouse JSON, axe/Playwright `audit-report.json`, screenshot mobile/zoom).

---

## 1. Perceivable (Nhận thức)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 1.1 | Text contrast ≥ 4.5:1 (body) | Token + Lighthouse | Toàn site | ✅ Lighthouse 100/100 mọi route |
| 1.2 | Không truyền thông tin chỉ bằng màu | Lỗi/success có text + border; nav active có underline | Form, nav | ✅ Kiểm tra thật (Playwright) |
| 1.3 | Body text ≥ 18px | `--font-size-body: 1.125rem` | `tokens.css` | ✅ |
| 1.4 | Ảnh có `alt` phù hợp | Ảnh trang trí `alt=""`; ảnh thông tin mô tả | Home (nếu có ảnh) | ⬜ Chưa có ảnh nội dung trên Home |
| 1.5 | Heading hierarchy hợp lý | Một `h1`/page (Playwright đếm) | Mọi route chính | ✅ `h1Count: 1` mọi route |
| 1.6 | Zoom 200% không mất chức năng | CSS zoom 200% trên `/jobs` | `/jobs` | ✅ Không overflow ngang (`audit-report.json`) |

---

## 2. Operable (Vận hành)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 2.1 | Skip link → `#main-content` | Tab → Enter → focus `main` | Layout | ✅ 1 Tab, focus main |
| 2.2 | Landmarks: `header`, `nav`, `main`, `footer` | Playwright DOM | Layout | ✅ Mọi route |
| 2.3 | Mọi control dùng được bằng keyboard | Tab flow jobs/filter/card/form | Luồng chính | ✅ Playwright keyboard script |
| 2.4 | Focus order logic | Skip → nav → filter → card → form | Luồng jobs | ✅ |
| 2.5 | Focus visible rõ (`:focus-visible`, ring vàng 3px) | Tab + outline 3px trên nav | Toàn site | ✅ `outlineWidth: 3px` |
| 2.6 | Không keyboard trap | Tab xuyên suốt form | Form | ✅ |
| 2.7 | Touch target ≥ 44×44px | Đo nút filter submit | `/jobs` | ✅ 268×44px |
| 2.8 | Nav active state | `aria-current="page"` + underline 3px | Layout nav | ✅ `/jobs`, `/accessibility` |
| 2.9 | `prefers-reduced-motion` | CSS global + panel giảm chuyển động | `index.css`, Preferences Panel | ✅ |
| 2.10 | Accessibility Preferences Panel | Keyboard, fieldset/radio, status message, localStorage | Layout (mọi route) | ✅ axe 0 violation `/`, `/jobs`, `/accessibility` (2026-06-14) |
| 2.11 | Job Matching Wizard keyboard | Tab, Next/Back, focus heading khi chuyển bước, validation bước 2 | `/job-matching` | ✅ Playwright (`regression-job-matching-audit.json`, 2026-06-14) |
| 2.12 | Wizard progress text | “Bước X trong 4” + `aria-live` | `/job-matching` | ✅ Implemented |

---

## 3. Understandable (Dễ hiểu)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 3.1 | Mỗi input có visible label | `label` + `htmlFor`/`id` | Form, filter | ✅ axe 0 violation |
| 3.2 | Không dùng placeholder làm label duy nhất | Select có label riêng | Feedback form | ✅ |
| 3.3 | Lỗi form: `aria-invalid` + `aria-describedby` | Submit trống application form | `/jobs/1` | ✅ `aria-invalid=true` |
| 3.4 | ErrorSummary (≥2 lỗi) + link tới field | Submit trống họ tên + email | Application form | ✅ |
| 3.5 | Focus sau lỗi submit | ≥2 lỗi → ErrorSummary focus | Form | ✅ Focus trên alert summary |
| 3.6 | Loading/error/success có `role` / `aria-live` | Submit hợp lệ | Form | ✅ `role="status"` success |
| 3.7 | Link/button có accessible name | Card CTA `aria-label` | JobCard | ✅ |
| 3.8 | Link ngoài báo tab mới | `(mở tab mới)` sr-only | Resource, Accessibility | ✅ |

---

## 4. Robust (Bền vững)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 4.1 | Semantic HTML trước ARIA | axe wcag2aa | Mọi route | ✅ 0 violations |
| 4.2 | ARIA đúng, không thừa | ariaSnapshot form lỗi | `/jobs/1` | ✅ Xem `form-error-aria-snapshot.txt` |
| 4.3 | SPA route + API proxy | Docker `localhost:3000` | Docker | ✅ |
| 4.4 | Screen reader đọc label/error | NVDA/ChromeVox | Form | ⬜ **Chưa chạy SR thật** — có ariaSnapshot thay thế cấu trúc |

---

## 5. Responsive (bổ sung kiểm thử cuối)

| Viewport | Route | Overflow ngang | Screenshot |
|----------|-------|----------------|------------|
| 360×800 | `/` | Không | `mobile360_.png` |
| 360×800 | `/jobs` | Không | `mobile360_jobs.png` |
| 360×800 | `/accessibility` | Không (sau fix table wrapper) | `mobile360_accessibility.png` |
| 360×800 | `/job-matching` | Không | `mobile360_job-matching.png` |
| Zoom 200% | `/jobs` | Không | `zoom200_jobs.png` |
| Zoom 200% | `/job-matching` | Không | `zoom200_job-matching.png` |

---

## 6. Công cụ tự động — kết quả thật

| Công cụ | Phạm vi | Kết quả |
|---------|---------|---------|
| `npm run lint` | Frontend | **PASS** (2026-06-14 regression) |
| `npm run build` | Frontend | **PASS** (2026-06-14 regression) |
| axe-core (Playwright) | 6 route chính | **0 violations** mọi route (2026-06-12) |
| axe-core (Playwright) | `/`, `/job-matching` | **0 violations** (2026-06-14 regression) |
| Lighthouse Accessibility | 6 route chính | **100/100** mọi route (2026-06-12) |
| Lighthouse Accessibility | `/job-matching` | **100/100** (`lighthouse-job-matching.json`, 2026-06-14) |
| Playwright keyboard script | Skip, nav, jobs, form | **PASS** (chi tiết `audit-report.json`, 2026-06-12) |
| Playwright wizard + preferences | `/job-matching`, localStorage | **PASS** (`regression-job-matching-audit.json`, 2026-06-14) |
| NVDA / ChromeVox | Form lỗi | **Chưa chạy** — cần test thủ công có âm thanh |

---

## 7. Design tokens bắt buộc (accessibility)

- Focus: `--color-focus` (#ffd700), `--focus-ring`, `--focus-offset`
- Touch: `--spacing-touch-min` (44px)
- Text: `--font-size-body` (18px), `--color-text-muted` (#43474f)
- Error/success: `--color-error`, `--color-success` + text mô tả

Chi tiết: `.cursor/rules/ui-design-system-rule.mdc`

---

## 8. Checklist nộp bài (demo cuộc thi)

- [x] Docker Compose chạy được; `/api/health` UP
- [x] 6 route chính HTTP 200
- [x] Keyboard flow chính (skip link, nav, filter, card, form lỗi/hợp lệ)
- [x] Lighthouse Accessibility ≥ 90 (đạt **100**)
- [x] axe 0 violation nghiêm trọng trên route chính
- [x] Mobile 360px không vỡ layout nghiêm trọng
- [x] Zoom 200% không mất chức năng trên `/jobs`
- [x] `docs/wcag-checklist.md` cập nhật kết quả thật
- [ ] NVDA hoặc ChromeVox — **khuyến nghị 10 phút trước demo**

---

## 9. Lịch sử cập nhật

| Ngày | Ghi chú |
|------|---------|
| 2026-06-12 | Tạo checklist ban đầu (`ACCESSIBILITY_VERIFICATION_FIXES_005`) |
| 2026-06-14 | Thêm Accessibility Preferences Panel — checklist mục 2.10 (`ACCESSIBILITY_PREFERENCES_007`) |
| 2026-06-14 | Thêm route `/job-matching` — wizard gợi ý việc làm (`ACCESSIBLE_JOB_MATCHING_008`) |
| 2026-06-14 | Regression wizard + preferences panel — axe/Lighthouse/keyboard/mobile/zoom (`JOB_MATCHING_PREFERENCES_REGRESSION_009`) |
| 2026-06-16 | Thêm ma trận WCAG 2.2 mới — route `/wcag-22`, docs `wcag-22-conformance-matrix.md` (`WCAG22_CONFORMANCE_MATRIX_013`) |
