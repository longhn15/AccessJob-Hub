# USER_MVP_POLISH_010 — User MVP polish (form focus, a11y panel, filters, demo data)

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): cải thiện flow submit form (scroll/focus + highlight lỗi/thành công), đóng panel Tùy chỉnh tiếp cận khi click ngoài/Escape, bổ sung filter Kinh nghiệm/Mức lương/Vị trí, mở rộng dữ liệu demo jobs/resources, đảm bảo Job Matching vẫn hoạt động; chỉ phạm vi User.

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Form submit | Scroll + focus error summary / success; highlight viền vàng + xanh đậm |
| A11y panel | Click/tap ngoài đóng; Escape đóng; không đóng khi click trong |
| Job filters | Kinh nghiệm, Mức lương, Vị trí (preset) |
| Demo data | ~10 jobs, ~10 resources |
| Job Matching | Không lỗi sau thay đổi |
| Report | `docs/user-mvp-polish-report.docx` |

## 3. Tên nhánh đã tạo

`feat/user-mvp-polish`

Tạo từ `test/job-matching-preferences-regression` (working tree clean trước khi sửa).

## 4. Trạng thái Git trước khi sửa

- Branch: `test/job-matching-preferences-regression`
- Working tree: clean
- Đã tạo branch mới `feat/user-mvp-polish` trước khi sửa code

## 5. Hiện trạng trước khi sửa

- Form đã có `focusFormErrors` nhưng **không scroll** tới vùng lỗi; **không focus** success/form error sau submit thành công hoặc lỗi API tổng quát.
- `ErrorSummary` chỉ hiện khi **≥2 lỗi**; với 1 lỗi `focusFormErrors` **tự focus xuống field** — không đúng UX mong muốn.
- Error/success chưa có highlight focus đặc biệt (vàng ngoài + xanh đậm trong).
- `AccessibilityPreferencesPanel` dùng `<details>` native, **không** đóng khi click ngoài.
- `JobFilters` chỉ có keyword, location (text), workType, remote checkbox — thiếu experience/salary/work place preset.
- Seed V2 chỉ có **3 jobs** và **4 resources**.
- Entity `jobs` chưa có cột filter experience/salary/work_place.

## 6. Nguyên nhân gốc xác nhận từ source

| Vấn đề | Nguyên nhân |
|--------|-------------|
| Không scroll sau submit | `focusFormErrors` chỉ gọi `.focus()` không `scrollIntoView`; success/formError không có ref/effect |
| Focus xuống field khi 1 lỗi | `ErrorSummary` return `null` nếu `<2` lỗi; `focusFormErrors` focus field đầu tiên |
| Focus vẫn sai sau fix lần 2 | `useEffect` + `requestAnimationFrame` chạy **sau paint** — nút Submit giữ `document.activeElement`; `pendingErrorFocusRef` không re-trigger khi submit lặp cùng bộ lỗi |
| Viewport scroll xuống field dù summary có focus | Browser scroll tới field `aria-invalid`; link hash trong summary (đã đổi button) |
| Error Summary bị header che một nửa | `scrollIntoView({ block: 'start' })` không trừ chiều cao `header` sticky (`Layout.module.css`); `scroll-margin-top` chỉ ~68px, không đủ (~7rem cần) |
| Panel không đóng ngoài | Không có listener `pointerdown` / `Escape` trên document |
| Thiếu filter | UI + API + DB chưa có field `experienceLevel`, `salaryRange`, `workPlace` |
| Demo ít | `V2__seed_demo_data.sql` chỉ insert 3+4 bản ghi |

## 7. Chiến lược sửa đã chọn

- **Form scroll offset header (lần 5):** `scrollElementIntoViewWithOffset` — `window.scrollTo` với `header.offsetHeight + 24px`; CSS `scroll-margin-top: 7rem` cho summary/status.
- **Form scroll (lần 4):** `focusErrorSummary` retry rAF; đổi link summary thành button; bỏ `href="#field"`.
- **Form error focus (lần 3):** `useLayoutEffect` + `errorFocusRequest` counter.
- **Panel:** giữ `<details>`, thêm listener cleanup trong `useEffect` (không dependency mới).
- **BE filter:** migration V3 thêm cột + index; V4 seed thêm 7 jobs + 6 resources; mở rộng query JPA equality (tránh full scan text).
- **Không đổi** contract breaking — chỉ **thêm** field optional trong `JobResponse` và query params.

## 8. Danh sách file đã đọc

### Rules

- `.cursor/rules/core-working-rule.mdc`, `testing-rule.mdc`, `report-verification-rule.mdc`, `frontend-rule.mdc`, `accessibility-wcag-rule.mdc`, `ui-design-system-rule.mdc`, `backend-rule.mdc`, `db-rule.mdc`

### Source / docs

- `frontend/src/components/applications/ApplicationForm.tsx`
- `frontend/src/components/feedback/AccessibilityFeedbackForm.tsx`
- `frontend/src/components/form/ErrorSummary.tsx`, `StatusMessage.tsx`, `Form.module.css`
- `frontend/src/utils/formErrors.ts`
- `frontend/src/components/accessibility/AccessibilityPreferencesPanel.tsx`
- `frontend/src/components/jobs/JobFilters.tsx`
- `frontend/src/pages/JobsListPage.tsx`
- `frontend/src/utils/jobMatching.ts`
- `backend/.../Job.java`, `JobRepository.java`, `JobService.java`, `JobController.java`
- `backend/.../V1__create_core_tables.sql`, `V2__seed_demo_data.sql`
- `docs/FRONTEND_FORMS_INTEGRATION_004.md`, `ACCESSIBILITY_VERIFICATION_FIXES_005.md`, `ACCESSIBLE_JOB_MATCHING_008.md`

## 9. Danh sách file đã sửa

### Frontend

- `frontend/src/utils/formErrors.ts`
- `frontend/src/components/form/ErrorSummary.tsx`
- `frontend/src/components/form/StatusMessage.tsx`
- `frontend/src/components/form/Form.module.css`
- `frontend/src/components/applications/ApplicationForm.tsx`
- `frontend/src/components/feedback/AccessibilityFeedbackForm.tsx`
- `frontend/src/components/accessibility/AccessibilityPreferencesPanel.tsx`
- `frontend/src/components/jobs/JobFilters.tsx`
- `frontend/src/types/job.ts`
- `frontend/src/api/jobs.ts`

### Backend

- `backend/src/main/java/com/accessjobhub/entity/Job.java`
- `backend/src/main/java/com/accessjobhub/dto/JobResponse.java`
- `backend/src/main/java/com/accessjobhub/mapper/JobMapper.java`
- `backend/src/main/java/com/accessjobhub/repository/JobRepository.java`
- `backend/src/main/java/com/accessjobhub/service/JobService.java`
- `backend/src/main/java/com/accessjobhub/controller/JobController.java`
- `backend/src/main/resources/db/migration/V3__add_job_filter_columns.sql` (mới)
- `backend/src/main/resources/db/migration/V4__seed_more_demo_data.sql` (mới)

### Docs

- `docs/USER_MVP_POLISH_010.md` (mới)

## 10. Diff thay đổi của từng file

### `frontend/src/utils/formErrors.ts` (lần 5)

| | |
|---|---|
| Cũ | `scrollIntoView({ block: 'start' })` — Error Summary bị `header` sticky che phần trên |
| Sửa | `scrollElementIntoViewWithOffset()` — đo `header` thật + gap 24px, `window.scrollTo` |
| Sửa | `focusErrorSummary` / `focusAndScrollMessage` dùng helper offset; field link vẫn `scrollIntoView` center |
| Vì sao | Error Summary hiển thị đầy đủ dưới nav, cách header ~16–24px |

### `frontend/src/components/form/Form.module.css` (lần 5)

| | |
|---|---|
| Cũ | `scroll-margin-top: calc(44px + 1.5rem)` (~68px) |
| Sửa | `.errorSummary`, `.messageFocusTarget`, `.statusSuccess`, `.statusError` → `scroll-margin-top: 7rem` |
| Vì sao | Dự phòng khi browser dùng native scrollIntoView; khớp offset header |

### `frontend/src/utils/formErrors.ts` (lần 3)

| | |
|---|---|
| Cũ | `focusFormErrors`; `useEffect` + rAF trong form; submit button giữ focus |
| Sửa | `focusErrorSummary()` và `focusFieldFromSummaryLink(fieldId)` tách riêng; xóa `focusFormErrors` |
| Vì sao | Submit lỗi chỉ focus summary; link summary mới focus field |
| Ảnh hưởng | Không còn helper gộp summary/field |

### `ApplicationForm.tsx` / `AccessibilityFeedbackForm.tsx` (lần 3)

| | |
|---|---|
| Cũ | `pendingErrorFocusRef` + `useEffect([fieldErrors])` + `requestAnimationFrame` |
| Sửa | `errorFocusRequest`, `successFocusRequest`, `formErrorFocusRequest` counter; `useLayoutEffect` gọi `focusErrorSummary` / `focusAndScrollMessage` |
| Vì sao | Focus chạy đồng bộ sau DOM commit; re-submit cùng lỗi vẫn focus lại summary |
| Ảnh hưởng | `document.activeElement` sau submit lỗi = root Error Summary |

### `frontend/src/utils/formErrors.ts` (lần 2)

| | |
|---|---|
| Cũ | `focusFormErrors` focus field khi 1 lỗi |
| Sửa | Luôn `focusAndScrollMessage(summaryEl)` khi có lỗi; không auto-focus field |
| Vì sao | AC1–AC4 — user đọc tổng quan lỗi trước, chỉ đi field khi bấm link |
| Ảnh hưởng | ApplicationForm, AccessibilityFeedbackForm |

### `frontend/src/components/form/ErrorSummary.tsx`

| | |
|---|---|
| Cũ | `entries.length < 2` → `null`; không nhận ref |
| Sửa | Hiện khi ≥1 lỗi; `forwardRef`; gộp `errorSummary` + `messageFocusTarget`; title số ít/số nhiều |
| Vì sao | AC1/AC2/AC6 — summary luôn là điểm focus chính |
| Ảnh hưởng | Link anchor vẫn focus field khi user chủ động bấm |

### `ApplicationForm.tsx` / `AccessibilityFeedbackForm.tsx` (bổ sung lần 2)

| | |
|---|---|
| Cũ | `showErrorSummary >= 2`; `requestAnimationFrame` focus có thể chạy trước render |
| Sửa | `showErrorSummary > 0`; `pendingErrorFocusRef` + `useEffect([fieldErrors])` focus summary sau commit |
| Vì sao | 1 lỗi vẫn có summary; focus ổn định sau React render |

### `frontend/src/components/form/StatusMessage.tsx`

| | |
|---|---|
| Cũ | Component thường, không ref/tabIndex |
| Sửa | `forwardRef`, `tabIndex={-1}`, class `messageFocusTarget` |
| Vì sao | Focus programmatic sau success/error |
| Ảnh hưởng | Screen reader đọc `role="status"` / `role="alert"` |

### `frontend/src/components/form/Form.module.css`

| | |
|---|---|
| Cũ | Status/error không có focus ring đặc biệt |
| Sửa | `.messageFocusTarget:focus`, `.errorSummary:focus` — viền xanh đậm + outline vàng 3px |
| Vì sao | AC4 — tương tự mẫu Stitch focus |

### `ApplicationForm.tsx` / `AccessibilityFeedbackForm.tsx`

| | |
|---|---|
| Cũ | Không focus success/formError |
| Sửa | `successRef`, `formErrorRef`, `useEffect` + `focusAndScrollMessage`; wrapper error summary có `messageFocusTarget` |
| Vì sao | AC3, AC5, AC6 |

### `AccessibilityPreferencesPanel.tsx`

| | |
|---|---|
| Cũ | Chỉ hash open |
| Sửa | `pointerdown` ngoài panel → `open=false`; `Escape` → đóng + focus summary |
| Vì sao | AC7–AC9 |

### `JobFilters.tsx` + types + API

| | |
|---|---|
| Cũ | Location text input |
| Sửa | Select Kinh nghiệm, Mức lương, Vị trí; gửi `experienceLevel`, `salaryRange`, `workPlace` |
| Vì sao | AC10–AC11 |

### Backend migrations + Java

| | |
|---|---|
| Cũ | Không có cột filter |
| Sửa | V3 ALTER + backfill; V4 +7 jobs +6 resources; query equality + index |
| Vì sao | Filter backend an toàn, demo đủ 10/10 |
| Ảnh hưởng | Job Matching load 50 jobs — field mới optional, không break matching |

## 11. Ảnh hưởng sau sửa

| Layer | Ảnh hưởng |
|-------|-----------|
| FE | Form UX + a11y tốt hơn; filter UI phong phú |
| API | `GET /api/jobs` thêm 3 query params optional |
| DB | 3 cột + 3 index; +7 jobs, +6 resources sau migrate |
| Docker | Flyway chạy V3/V4 khi backend start |
| Job Matching | Không đổi logic; nhiều job hơn → kết quả phong phú hơn |

## 12. Edge cases đã xem xét

- Viewport sau submit lỗi → Error Summary đầy đủ dưới header sticky, không bị che tiêu đề
- Success message sau submit → cùng offset, không bị header che
- `document.activeElement` sau submit lỗi → expected: `#...-error-summary` (Error Summary root)
- `document.activeElement` sau submit thành công → expected: `#...-success` (StatusMessage)
- Submit ≥2 lỗi → focus summary, không xuống field
- Bấm link trong summary → mới focus field
- User đang gõ → không auto-scroll (chỉ sau submit)
- Click summary toggle → `pointerdown` trong panel không đóng
- Escape khi panel đóng → không side effect
- Filter rỗng (`""`) → gửi `undefined`, backend `NULL` match all
- Job cũ sau V3 backfill có `work_place` — filter preset hoạt động
- `prefers-reduced-motion` — scroll `behavior: 'auto'`

## 13. Kết quả kiểm tra

| Command | Kết quả |
|---------|---------|
| `git branch --show-current` | `feat/user-mvp-polish` ✅ |
| `npm run lint` | ✅ pass (lần 5 — scroll offset header) |
| `npm run build` | ✅ pass (lần 5) |
| `noValidate` | ✅ cả 2 form |
| `docker compose up --build` | cần rebuild để verify manual trên browser |
| Manual viewport | expected: Error Summary đọc được “Có 2 lỗi trong form...”, không bị header che |
| Manual `document.activeElement` | expected: `#...-error-summary` sau lỗi; `#...-success` sau thành công |

## 14. Rủi ro còn lại

- Cần `docker compose up --build` + kiểm tra viewport thật (Error Summary không bị header che).
- `work_place` là preset riêng, không thay thế hoàn toàn `location` text hiển thị.
- Highlight focus chỉ khi programmatic focus sau submit — không animation liên tục.
- Chưa verify screen reader thật.

## 15. Đề xuất tiếp theo

- Manual test keyboard trên form + panel + filter.
- Hiển thị `experienceLevel` / `salaryRange` trên JobCard (optional).
- E2E test submit form focus behavior.
