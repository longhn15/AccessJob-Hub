# USER_UI_CONTENT_POLISH_011 — Polish trải nghiệm User (UI + nội dung tiếng Việt)

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): polish phạm vi User hiện có (danh sách việc làm, Job Card, chi tiết, Job Matching, tài nguyên, mobile 360px, nội dung tiếng Việt); không mở rộng Admin/Nhà tuyển dụng/Login; không thêm dependency; giữ form Error Summary/success focus.

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Danh sách việc làm | Số lượng kết quả, nút xóa bộ lọc, empty state thân thiện |
| Job Card | Lương, kinh nghiệm, địa điểm, hình thức, hỗ trợ tiếp cận, badge rõ |
| Chi tiết việc làm | Section rõ: tổng quan, mô tả, yêu cầu, lương/hình thức, a11y, ứng tuyển |
| Job Matching | Lý do gợi ý, nhóm mức phù hợp, nút Làm lại, empty state |
| Tài nguyên | Card có tag/chủ đề, mô tả ngắn |
| Mobile 360px | Không tràn ngang, touch target, spacing |
| Tiếng Việt | Thân thiện, tôn trọng người khuyết tật |
| Report | `docs/USER_UI_CONTENT_POLISH_011.md` |

**Không làm:** Admin, Nhà tuyển dụng, Login/Register, phân quyền, upload CV, AI matching, CRUD việc làm.

## 3. Tên nhánh đã tạo

`feat/user-ui-content-polish` (tạo từ `develop`, working tree clean).

## 4. Trạng thái Git trước khi sửa

- Branch: `develop`
- Working tree: **clean**
- Không có thay đổi chưa commit từ task trước

## 5. Hiện trạng trước khi sửa

- Danh sách việc làm đã có đếm kết quả cơ bản nhưng **chưa có nút xóa/đặt lại bộ lọc**; empty state chưa đúng câu chữ yêu cầu.
- Job Card chỉ hiển thị work type + badge từ xa; **thiếu lương, kinh nghiệm, hình thức Remote/Hybrid/Văn phòng** rõ ràng.
- Chi tiết việc làm: section mô tả/yêu cầu dạng khối văn bản; **chưa có tổng quan, section lương/hình thức**, form nằm chung với mục Liên hệ.
- Job Matching: có lý do gợi ý nhưng **chưa nhóm theo tier**, nút **"Điều chỉnh lựa chọn"** không reset wizard hoàn toàn; tier medium ghi "Phù hợp vừa".
- Resource card: chỉ có category badge, **chưa có gợi ý chủ đề ngắn**.
- Mobile: một số layout grid chưa `min-width: 0` / `overflow-x` — rủi ro tràn ngang 360px.

## 6. Nguyên nhân/căn cứ từ source

| Vấn đề | Căn cứ source |
|--------|----------------|
| Không reset filter | `JobFilters.tsx` chỉ có submit; `JobsListPage.tsx` không có handler reset |
| Job Card thiếu meta | `JobCard.tsx` không đọc `experienceLevel`, `salaryRange`, `workPlace` từ `Job` type |
| Chi tiết thiếu section | `JobDetailPage.tsx` chỉ có 4 section đơn giản, không dùng `dl`/bullet |
| Matching chưa nhóm | `JobMatchingWizard.tsx` render flat `results.map` |
| Không có Làm lại | `handleAdjust` chỉ `goToStep(1)`, không reset `answers`/results |
| Label tier | `MATCH_TIER_LABELS.medium` = "Phù hợp vừa" trong `jobMatching.ts` |

## 7. Chiến lược sửa đã chọn

- **Minimal diff:** chỉ sửa FE; tái sử dụng `Badge`, `EmptyState`; thêm util `jobLabels.ts`, `jobFilters.ts` tránh lặp format.
- **Filter reset:** nút "Xóa bộ lọc" trong `JobFilters`, disabled khi không có filter; reset cả `draftFilters` và `appliedFilters`.
- **Job Card/Detail:** derive label từ field API hiện có (`experienceLevel`, `salaryRange`, `workPlace`, `remoteAvailable`) — **không đổi API contract**.
- **Job Matching:** nhóm theo `MATCH_TIER_ORDER`; nút "Làm lại" reset answers + results + step 1; đổi heading "Vì sao phù hợp?".
- **Mobile:** `min-width: 0`, `overflow-x: clip` trên page/layout/body.
- **Form regression:** không sửa `ApplicationForm`, `ErrorSummary`, `formErrors.ts`.

## 8. Danh sách file đã đọc

### Rules

- `.cursor/rules/core-working-rule.mdc`, `testing-rule.mdc`, `report-verification-rule.mdc`, `frontend-rule.mdc`, `accessibility-wcag-rule.mdc`, `ui-design-system-rule.mdc`, `project-context-rule.mdc`

### Source

- `frontend/src/pages/JobsListPage.tsx`, `JobDetailPage.tsx`, `JobMatchingPage.tsx`, `ResourcesListPage.tsx`
- `frontend/src/components/jobs/JobCard.tsx`, `JobFilters.tsx`
- `frontend/src/components/matching/JobMatchingWizard.tsx`, `MatchResultCard.tsx`
- `frontend/src/components/resources/ResourceCard.tsx`
- `frontend/src/types/job.ts`, `jobMatching.ts`, `resource.ts`
- `frontend/src/utils/jobMatching.ts`
- `docs/USER_MVP_POLISH_010.md`
- `backend/.../V4__seed_more_demo_data.sql` (xác nhận field demo)

## 9. Danh sách file đã sửa

| File | Loại |
|------|------|
| `frontend/src/utils/jobLabels.ts` | Tạo mới |
| `frontend/src/utils/jobFilters.ts` | Tạo mới |
| `frontend/src/types/jobMatching.ts` | Sửa |
| `frontend/src/components/jobs/JobFilters.tsx` | Sửa |
| `frontend/src/components/jobs/JobFilters.module.css` | Sửa |
| `frontend/src/components/jobs/JobCard.tsx` | Sửa |
| `frontend/src/components/jobs/JobCard.module.css` | Sửa |
| `frontend/src/pages/JobsListPage.tsx` | Sửa |
| `frontend/src/pages/JobsListPage.module.css` | Sửa |
| `frontend/src/pages/JobDetailPage.tsx` | Sửa |
| `frontend/src/pages/JobDetailPage.module.css` | Sửa |
| `frontend/src/components/matching/JobMatchingWizard.tsx` | Sửa |
| `frontend/src/components/matching/JobMatchingWizard.module.css` | Sửa |
| `frontend/src/components/matching/MatchResultCard.tsx` | Sửa |
| `frontend/src/components/resources/ResourceCard.tsx` | Sửa |
| `frontend/src/components/resources/ResourceCard.module.css` | Sửa |
| `frontend/src/pages/JobMatchingPage.tsx` | Sửa |
| `frontend/src/pages/JobMatchingPage.module.css` | Sửa |
| `frontend/src/pages/ResourcesListPage.module.css` | Sửa |
| `frontend/src/index.css` | Sửa |
| `docs/USER_UI_CONTENT_POLISH_011.md` | Tạo mới (report) |

## 10. Diff thay đổi của từng file

### `jobLabels.ts` (mới)

- `formatWorkType`, `formatExperienceLevel`, `formatSalaryRange`, `formatWorkMode`, `parseRequirementItems`.

### `jobFilters.ts` (mới)

- `hasActiveJobFilters()` kiểm tra filter đang áp dụng.

### `JobFilters.tsx` + CSS

- Props `onReset`, `hasActiveFilters`; nút "Xóa bộ lọc" (disabled khi không có filter).

### `JobsListPage.tsx`

- `handleResetFilters`; truyền reset vào filters; cải thiện `resultCount` và `EmptyState` theo AC.

### `JobCard.tsx` + CSS

- Badge hình thức (Từ xa/Hybrid/Văn phòng), kinh nghiệm, lương; line-clamp block hỗ trợ tiếp cận.

### `JobDetailPage.tsx` + CSS

- Section: Tổng quan (`dl`), Mô tả, Yêu cầu (bullet nếu nhiều mục), Mức lương & hình thức, Hỗ trợ tiếp cận, Cách ứng tuyển + `ApplicationForm`.

### `JobMatchingWizard.tsx` + CSS

- Nhóm kết quả theo tier; nút "Làm lại" reset wizard; empty state gợi ý điều chỉnh.

### `jobMatching.ts` (types)

- `medium` → "Có thể phù hợp"; thêm `MATCH_TIER_ORDER`; label remote → "Từ xa".

### `MatchResultCard.tsx`

- Heading "Vì sao phù hợp?".

### `ResourceCard.tsx` + CSS

- Tag chủ đề ngắn theo category; đổi "Liên kết ngoài" → "Mở liên kết ngoài".

### CSS mobile

- `overflow-x: clip`, `min-width: 0` trên page/layout/body.

## 11. Ảnh hưởng sau sửa

- **User flows:** `/jobs` có reset filter và empty state rõ hơn; card/detail hiển thị meta đầy đủ hơn; `/job-matching` nhóm kết quả + Làm lại; `/resources` card dễ quét hơn.
- **API/BE:** Không đổi contract.
- **Admin/Nhà tuyển dụng/Login:** Không thêm.
- **Dependency:** Không thêm package mới.
- **Form Error Summary/success:** Không sửa logic focus/scroll (`ApplicationForm`, `ErrorSummary`, `formErrors.ts` giữ nguyên).

## 12. Edge cases đã xem xét

- Reset filter khi draft khác applied: reset cả hai về `{}`.
- Nút xóa bộ lọc disabled khi draft và applied đều mặc định.
- Job không có `experienceLevel`/`salaryRange`: badge/field ẩn, không hiện "undefined".
- Yêu cầu một dòng: giữ `<p>` thay vì bullet.
- Job Matching `results` rỗng chỉ khi API không trả job — empty state hướng dẫn Làm lại.
- `overflow-x: clip` thay vì `hidden` để không cắt focus ring.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build frontend` | **PASS** |
| `docker compose up --build` | Stack đã chạy trước đó (terminal user); image frontend build lại **PASS** |
| Manual `/jobs` filter + reset + empty | **Chưa chạy browser** — expected verification theo source |
| Manual Job Card mobile | **Chưa chạy browser** — CSS touch ≥44px, line-clamp đã áp dụng |
| Manual `/jobs/:id` sections + form | **Chưa chạy browser** — `ApplicationForm` không đổi |
| Manual `/job-matching` tier + Làm lại | **Chưa chạy browser** |
| Manual `/resources` | **Chưa chạy browser** |
| Mobile 360px | **Chưa chạy DevTools** — đã thêm overflow/min-width; expected verification |
| Form Error Summary/success regression | **Chưa chạy manual** — không sửa form focus code; expected pass |

## 14. Rủi ro còn lại

- Chưa verify thực tế trên viewport 360px và keyboard/screen reader trong session này.
- Job Matching vẫn trả về mọi job (có fallback reason) — empty state chỉ khi DB rỗng; có thể cần lọc score tối thiểu ở task sau nếu muốn empty khi không khớp tiêu chí.
- `parseRequirementItems` tách theo `;`/newline — seed data một câu sẽ hiển thị paragraph.
- Container `docker compose up` cũ có thể chưa mount image frontend mới cho đến khi user restart stack.

## 15. Đề xuất tiếp theo

1. Manual test browser: filter reset, Job Matching Làm lại, form submit lỗi/thành công trên `/jobs/1`.
2. Restart `docker compose up --build` để phục vụ image frontend mới trên port 3000.
3. Lighthouse/axe trên `/jobs`, `/job-matching`, `/resources` ở 360px.
4. Cân nhắc lọc kết quả matching theo `score` tối thiểu để empty state có ý nghĩa hơn khi lựa chọn quá hẹp.

---

**Xác nhận phạm vi:** Không mở rộng Admin/Nhà tuyển dụng/Login. Mọi cải thiện nằm trong phạm vi User MVP.
