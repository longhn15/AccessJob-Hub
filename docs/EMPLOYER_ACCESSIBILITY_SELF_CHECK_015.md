# EMPLOYER_ACCESSIBILITY_SELF_CHECK_015 — Employer Accessibility Self-Check

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): triển khai công cụ tự đánh giá tin tuyển dụng hòa nhập tại route `/employer-checklist`, FE-only, chấm điểm client-side, không API/DB/auth/localStorage; thêm lối vào Home + footer; report toàn cục `_015` (max hiện tại `_014`).

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Route | `/employer-checklist` |
| Checklist | 5 nhóm fieldset/legend, 20 tiêu chí checkbox native + label visible |
| Chấm điểm | 1 điểm/tiêu chí; 0–40% Cần cải thiện, 41–75% Khá, 76–100% Tốt |
| Kết quả | Điểm, %, mức (text), điểm mạnh, gợi ý cải thiện, disclaimer |
| Navigation | Footer link + Home feature card (không làm nav chính dài) |
| Phạm vi | Không sửa BE/API/DB/Docker config |

## 3. Phạm vi đã thực hiện

- Types + utils chấm điểm và gợi ý theo từng tiêu chí
- Page + form + result components với semantic HTML và `role="status"` / `aria-live`
- Route trong `App.tsx`, footer link, Home CTA card, section trên Accessibility Statement
- Cập nhật README, `wcag-checklist.md`, `wcag-22-conformance-matrix.md` (mục giáo dục inclusive design)
- Không sửa backend, API, database, Docker config

## 4. Danh sách file đã đọc

### Rule files (`.cursor/rules/*.mdc`) — 13/13

| File | Ảnh hưởng trực tiếp |
|------|---------------------|
| `core-working-rule.mdc` | Minimal diff, FE-only, không over-engineer |
| `frontend-rule.mdc` | Semantic HTML, fieldset, native checkbox, button thật, keyboard |
| `accessibility-wcag-rule.mdc` | Không claim axe/Lighthouse/SR chưa test; không chỉ dùng màu |
| `ui-design-system-rule.mdc` | CSS variables, touch 44px, focus ring, card/section style |
| `stitch-ui-reference-rule.mdc` | Token màu/spacing, pattern fieldset/checkbox từ wizard |
| `testing-rule.mdc` | lint/build/Docker verification |
| `report-verification-rule.mdc` | Report 15 mục, số toàn cục `_015` |
| `project-context-rule.mdc` | MVP scope, không auth, inclusive design |
| `security-config-rule.mdc` | Không lưu dữ liệu server; không localStorage |
| `docker-runtime-rule.mdc` | Rebuild frontend container sau thay đổi FE |
| `git-workflow-rule.mdc` | Không commit trừ khi user yêu cầu |
| `backend-rule.mdc` | Không sửa BE |
| `db-rule.mdc` | Không sửa DB |

### Source đã đọc

- `App.tsx`, `Layout.tsx`, `HomePage.tsx`, `AccessibilityPage.tsx`
- `JobMatchingWizard.tsx` + `.module.css` (pattern fieldset/checkbox)
- `Form.module.css`, `JobMatchingPage.module.css`
- `README.md`, `docs/wcag-checklist.md`, `docs/wcag-22-conformance-matrix.md`
- `docs/REDUNDANT_ENTRY_SAVED_MATCHING_014.md` (mẫu report)

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `frontend/src/types/employerChecklist.ts`
- `frontend/src/utils/employerChecklist.ts`
- `frontend/src/pages/EmployerChecklistPage.tsx`
- `frontend/src/pages/EmployerChecklistPage.module.css`
- `frontend/src/components/employer/EmployerChecklistForm.tsx`
- `frontend/src/components/employer/EmployerChecklistForm.module.css`
- `frontend/src/components/employer/EmployerChecklistResult.tsx`
- `frontend/src/components/employer/EmployerChecklistResult.module.css`
- `docs/EMPLOYER_ACCESSIBILITY_SELF_CHECK_015.md`

### Sửa

- `frontend/src/App.tsx`
- `frontend/src/components/Layout/Layout.tsx`
- `frontend/src/pages/HomePage.tsx`
- `frontend/src/pages/AccessibilityPage.tsx`
- `README.md`
- `docs/wcag-checklist.md`
- `docs/wcag-22-conformance-matrix.md`

## 6. Thay đổi chính theo từng file

| File | Thay đổi |
|------|----------|
| `employerChecklist.ts` (types) | `EmployerChecklistCriterion`, `Group`, `Answers`, `Score` |
| `employerChecklist.ts` (utils) | 5 nhóm / 20 tiêu chí; `scoreEmployerChecklist()`; gợi ý cố định theo id (4 gợi ý bắt buộc + các mục khác) |
| `EmployerChecklistForm` | Form với disclaimer, 5 fieldset, Submit/Reset, validation “chưa tick mục nào” (`role="alert"`) |
| `EmployerChecklistResult` | `role="status"` + `aria-live="polite"`; điểm/%/mức bằng text; `data-level` kèm border màu (không chỉ màu) |
| `EmployerChecklistPage` | `h1`, lead, intro |
| `App.tsx` | Route `/employer-checklist` |
| `Layout.tsx` | Footer link “Kiểm tra tin tuyển dụng” |
| `HomePage.tsx` | Feature card đầu tiên cho nhà tuyển dụng |
| `AccessibilityPage.tsx` | Section “Dành cho nhà tuyển dụng” |
| Docs | Route mới, checklist mục 2.13, ma trận mục giáo dục |

## 7. Lý do thiết kế

- **Client-side only:** Phù hợp demo, không cần đăng nhập, không thu thập dữ liệu nhà tuyển dụng.
- **20 tiêu chí / 5 nhóm:** Khớp spec; mỗi nhóm 4 tiêu chí đồng đều cho UX scannable.
- **Pattern checkbox từ Job Matching Wizard:** Nhất quán touch target label row ≥44px, `:has(input:focus-visible)` ring.
- **Không nav chính:** Tránh mobile nav quá dài; lối vào qua Home card + footer.
- **Disclaimer đầu form:** Nhấn mạnh checklist tham khảo, không chứng nhận WCAG/pháp lý.
- **Không localStorage:** Task không yêu cầu lưu tiến độ; reset form đủ cho demo.

### Logic chấm điểm

```
totalScore = số checkbox đã tick
maxScore = 20
percentage = round(totalScore / maxScore * 100)
level:
  percentage <= 40  → "Cần cải thiện"
  percentage <= 75  → "Khá"
  else              → "Tốt"
strengths = các tiêu chí đã tick (label)
improvements = các tiêu chí chưa tick (suggestion text)
```

Gợi ý bắt buộc theo spec khi chưa tick:

- `required-vs-preferred` → tách bắt buộc / ưu tiên
- `alt-contact-channel` → email/form thay gọi điện
- `no-image-captcha` → tránh CAPTCHA hình ảnh
- `accessible-jd-format` → bản HTML/text cho JD/PDF

## 8. Accessibility impact

| Tiêu chí | Cách đáp ứng |
|----------|----------------|
| `h1` | “Kiểm tra tin tuyển dụng dễ tiếp cận” |
| Fieldset/legend | 5 nhóm checklist |
| Checkbox | Native `<input type="checkbox">` + `<label>` visible |
| Button | Submit “Xem kết quả”, Reset “Đặt lại checklist” |
| Kết quả | `role="status"`, `aria-live="polite"`, focus sau submit |
| Không chỉ màu | Mức đánh giá có text + border; điểm/% trong `<dl>` |
| Keyboard | Tab/Space trên checkbox; Enter submit; không trap |
| Touch | Label row `min-height: var(--spacing-touch-min)` |
| High contrast | Dùng CSS variables toàn site; không hardcode màu lệch token |
| Reduced motion | Kế thừa global `prefers-reduced-motion` |
| Preferences Panel | Không override `data-*` trên `<html>` |

## 9. Docker/runtime impact

- Chỉ rebuild image `frontend` (source mới).
- `docker-compose.yml` không đổi.
- Nginx SPA fallback vẫn phục vụ `/employer-checklist` → `index.html`.

## 10. API impact

**Không có.** Không endpoint mới, không gọi API từ trang checklist.

## 11. Database impact

**Không có.** Không migration, không lưu kết quả server.

## 12. WCAG / inclusive design impact

- Công cụ **giáo dục** giúp nhà tuyển dụng cải thiện tin hòa nhập — ghi trong `wcag-22-conformance-matrix.md` (không claim tiêu chí WCAG bắt buộc).
- Trang checklist tuân thủ pattern accessibility của app (semantic form, live region, disclaimer).
- Không claim chứng nhận WCAG chính thức cho công cụ hoặc tin tuyển dụng được đánh giá.

## 13. Cách kiểm tra

```bash
git status
cd frontend && npm run lint
cd frontend && npm run build
cd backend && mvn clean package -DskipTests
docker compose config
docker compose build
docker compose up -d
curl http://localhost:8080/api/health
curl http://localhost:3000/employer-checklist
curl http://localhost:3000
curl http://localhost:3000/api/jobs
```

Manual: Tab qua checklist, Space tick, Submit keyboard, kiểm tra result, Reset, high contrast panel, mobile 360px, zoom 200%.

## 14. Kết quả kiểm tra

| Kiểm tra | Kết quả | Ghi chú |
|----------|---------|---------|
| `git status` | PASS | Branch `feat/employer-accessibility-self-check` |
| `npm run lint` | **PASS** | 2026-06-16 |
| `npm run build` | **PASS** | tsc + vite build OK |
| `mvn clean package -DskipTests` | **PASS** | BUILD SUCCESS |
| `docker compose config` | **PASS** | |
| `docker compose build` | **PASS** | frontend image rebuilt |
| `docker compose up -d` | **PASS** | mysql, backend, frontend healthy |
| `GET /api/health` | **200** | `{"status":"UP","database":"UP"}` |
| `GET /employer-checklist` | **200** | SPA index (React render client-side) |
| `GET /` | **200** | |
| `GET /api/jobs` | **200** | |
| Keyboard manual | **Chưa chạy** | Expected pass — native controls; cần test thủ công trình duyệt |
| Mobile 360px / zoom 200% | **Expected** | CSS `overflow-x: clip`, responsive grid; chưa chụp screenshot |
| High contrast panel | **Expected** | Dùng token global; chưa test thủ công sau implement |
| axe DevTools / axe-core | **Chưa chạy** | Không có script axe trong `package.json` |
| Lighthouse Accessibility | **Chưa chạy** | Cần chạy thủ công trên `/employer-checklist` |
| NVDA / screen reader | **Chưa chạy** | Không claim |

## 15. Rủi ro còn lại

- Chưa có bằng chứng axe/Lighthouse mới cho route `/employer-checklist`.
- Chưa test keyboard/SR/high contrast thủ công trong session này.
- SPA initial HTML không chứa `h1` — chỉ có sau hydrate React (bình thường với CSR).
- Nếu nhà tuyển dụng tick 0 mục, hiện alert yêu cầu tick ít nhất 1 — không chấm 0/20 (theo UX chọn trong implement).

## 16. Đề xuất tiếp theo

1. Chạy axe DevTools + Lighthouse trên `/employer-checklist`; lưu JSON vào `docs/assets/accessibility/`.
2. Thêm Playwright audit script cho route mới (giống regression job-matching).
3. Test thủ công NVDA: đọc legend fieldset, live region kết quả sau Submit.
4. (Tùy chọn) Export kết quả checklist dạng text in — không cần server.
