# ACCESSIBILITY_PREFERENCES_007 — Accessibility Preferences Panel

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: triển khai **Front-end only** panel tùy chỉnh tiếp cận (font size, line height, high contrast, reduced motion, underline links, reset) với lưu `localStorage`, áp dụng toàn site qua `data-*` trên `<html>`, tuân thủ design system StitchAI và WCAG 2.2. Không sửa Back-end/API/DB/Docker.

## 2. Tóm tắt yêu cầu

- Panel dễ thấy, dùng native `<details>`/`<summary>`, radio + fieldset/legend, status message `role="status"`.
- Utility/hook: `accessibilityPreferences.ts`, `useAccessibilityPreferences`.
- Key localStorage: `accessjob:a11y-preferences`.
- CSS tập trung trong tokens/global styles.
- Report số toàn cục **007** (max hiện có = 006).

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| Utility `accessibilityPreferences.ts` | ✅ |
| Context + Provider + hook | ✅ |
| Panel UI (`AccessibilityPreferencesPanel`) | ✅ |
| Tích hợp Layout (mọi route) | ✅ |
| Section hướng dẫn trên `/accessibility` | ✅ |
| CSS `a11y-preferences.css` (data attributes) | ✅ |
| Init sớm trong `main.tsx` | ✅ |
| Cập nhật README, wcag-checklist | ✅ |
| Sửa Back-end/API/DB/Docker | ❌ Không |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `ui-design-system-rule.mdc` | **Tokens, focus ring, touch 44px, tone xanh dương, không hardcode màu** |
| `stitch-ui-reference-rule.mdc` | **Mapping StitchAI Inclusive Utility, border/card pattern panel** |
| `frontend-rule.mdc` | **Semantic HTML, native controls, keyboard, skip link** |
| `accessibility-wcag-rule.mdc` | **Fieldset/legend, aria-live, không claim nếu chưa test** |
| `core-working-rule.mdc` | **MVP, minimal diff, FE only** |
| `testing-rule.mdc` | **Lint/build/Docker verify, manual keyboard** |
| `report-verification-rule.mdc` | **Cấu trúc report, đánh số toàn cục 007** |
| `project-context-rule.mdc` | Phạm vi MVP, route chính |
| `git-workflow-rule.mdc` | Không commit artifact build |
| `docker-runtime-rule.mdc` | Verify stack Docker |
| `security-config-rule.mdc` | localStorage only, không secret |
| `backend-rule.mdc` | Đọc, không sửa |
| `db-rule.mdc` | Đọc, không sửa |

### Đánh số report

Quét `docs/*_[0-9][0-9][0-9].md` → max = **006** (`FINAL_ACCESSIBILITY_AUDIT_006.md`) → report này = **007**.

### Source đã đọc

- `frontend/src/components/Layout/Layout.tsx`, `Layout.module.css`
- `frontend/src/pages/AccessibilityPage.tsx`, `AccessibilityPage.module.css`
- `frontend/src/styles/tokens.css`, `frontend/src/index.css`
- `frontend/src/main.tsx`, `frontend/src/App.tsx`
- `frontend/src/components/form/StatusMessage.tsx`, `Form.module.css`
- `README.md`, `docs/wcag-checklist.md`

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `docs/ACCESSIBILITY_PREFERENCES_007.md`
- `frontend/src/utils/accessibilityPreferences.ts`
- `frontend/src/context/accessibilityPreferencesContext.ts`
- `frontend/src/hooks/useAccessibilityPreferences.ts`
- `frontend/src/components/accessibility/AccessibilityPreferencesProvider.tsx`
- `frontend/src/components/accessibility/AccessibilityPreferencesPanel.tsx`
- `frontend/src/components/accessibility/AccessibilityPreferencesPanel.module.css`
- `frontend/src/styles/a11y-preferences.css`

### Sửa

- `frontend/src/main.tsx` — init preferences trước React render
- `frontend/src/App.tsx` — bọc `AccessibilityPreferencesProvider`
- `frontend/src/index.css` — import `a11y-preferences.css`
- `frontend/src/components/Layout/Layout.tsx` — nhúng panel dưới header
- `frontend/src/components/Layout/Layout.module.css` — `.preferencesBar`, `.preferencesInner`
- `frontend/src/pages/AccessibilityPage.tsx` — section hướng dẫn + cam kết preferences
- `README.md` — mô tả panel + MVP checklist
- `docs/wcag-checklist.md` — mục 2.10 preferences

## 6. Thay đổi chính theo từng file

| File | Thay đổi |
|------|----------|
| `accessibilityPreferences.ts` | Types, defaults, load/save/apply/clear localStorage an toàn, set `data-*` trên `<html>` |
| `AccessibilityPreferencesProvider.tsx` | State React, cập nhật + persist + announce status |
| `AccessibilityPreferencesPanel.tsx` | `<details>` panel, 5 fieldset radio groups, nút reset, status `aria-live="polite"`, mở panel khi hash `#a11y-preferences-panel` |
| `a11y-preferences.css` | Override CSS variables theo `data-font-scale`, `data-line-height`, `data-contrast`, `data-reduced-motion`, `data-underlined-links` |
| `Layout.tsx` | Panel hiển thị trên mọi route, ngay dưới header |
| `main.tsx` | `initAccessibilityPreferences()` trước `createRoot` — tránh flash mặc định |

## 7. Lý do thiết kế

- **`<details>`/`<summary>`** thay modal — tránh focus trap, keyboard native, phù hợp task và `accessibility-wcag-rule.mdc`.
- **Data attributes trên `<html>`** — áp dụng toàn site qua CSS variables, không phá token gốc trong `:root`.
- **Radio native + fieldset/legend** — accessible name/state rõ, không custom toggle phức tạp.
- **Init sớm + Provider** — đọc localStorage trước paint; React state đồng bộ cho UI panel.
- **Panel trong Layout** — luôn truy cập được từ mọi route; `/accessibility` có anchor `#a11y-preferences-panel` mở panel tự động.

## 8. Accessibility impact

| Tính năng | Cách đáp ứng |
|-----------|--------------|
| Visible labels | Mỗi radio có `<label>` bọc control |
| Nhóm lựa chọn | `<fieldset>` + `<legend>` cho 5 nhóm |
| Trạng thái hiện tại | Radio `checked` + text label (không chỉ màu) |
| Lưu/reset thông báo | `role="status"` + `aria-live="polite"` |
| Keyboard | Native details, radio, button; touch target ≥ 44px trên summary/option |
| Focus visible | `:focus-visible` trên summary, label:has(input:focus-visible), reset button |
| Zoom 200% | Dùng `rem`, không fixed px cho layout panel |
| Reduced motion | Tôn trọng `prefers-reduced-motion` (global) + override user qua `data-reduced-motion="true"` |

## 9. Docker/runtime impact

- Rebuild image `frontend` (Docker build **PASS**).
- `docker compose up -d` lần đầu **fail** do backend khởi động chậm (>45s start_period) → unhealthy tạm thời; chạy lại `docker compose up -d frontend` sau khi backend healthy → stack **UP**.
- Không sửa `docker-compose.yml`.

## 10. API impact

Không.

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
curl http://localhost:8080/api/health
curl http://localhost:3000
curl http://localhost:3000/api/jobs
curl http://localhost:3000/api/resources
```

Manual:

1. Tab tới panel → mở `<details>` → đổi cỡ chữ → reload → giữ lựa chọn.
2. Bật high contrast, reduced motion, underline links → kiểm tra UI toàn site.
3. Reset → về mặc định + thông báo status.
4. Kiểm tra `/jobs`, `/jobs/1`, `/accessibility` sau khi bật các chế độ.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `git status` | Modified FE files + file mới (không commit) |
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build` | **PASS** |
| `docker compose up -d` | **Partial** — lần 1 fail (backend slow start); `docker compose up -d frontend` lần 2 **PASS** |
| `GET /api/health` | **200** — `status: UP`, `database: UP` |
| `GET localhost:3000` | **200** |
| `GET localhost:3000/api/jobs` | **200** |
| `GET localhost:3000/api/resources` | **200** |
| JS bundle chứa `a11y-preferences-panel` | **PASS** (SPA — không có trong HTML tĩnh) |
| axe-core (Playwright) `/`, `/jobs`, `/accessibility` | **0 violations** mỗi route |
| Lighthouse Accessibility | **Chưa chạy** lần này |
| NVDA / ChromeVox | **Chưa chạy** |
| Manual keyboard đầy đủ (reload, contrast, motion) | **Chưa chạy thủ công có người** — expected verification |

## 14. Rủi ro còn lại

- Panel `<details>` đóng mặc định — người dùng cần mở summary; có anchor từ `/accessibility`.
- High contrast override token — cần regression visual trên card/form khi bật lâu dài.
- `docker compose up -d` một lệnh có thể fail trên máy chậm nếu backend > start_period; cần retry hoặc tăng `start_period` (ngoài scope task).
- Lighthouse chưa re-run sau thêm panel — axe 0 violation trên 3 route mẫu nhưng chưa đủ thay Lighthouse toàn bộ 6 route.
- Screen reader announce status message khi đổi radio — chưa verify bằng SR thật.

## 15. Đề xuất tiếp theo

- Chạy Lighthouse Accessibility trên 6 route sau khi merge.
- Thêm Playwright test: đổi font → reload → assert `data-font-scale` + computed font-size.
- Cân nhắc nút/quick link “Tùy chỉnh tiếp cận” trong header nav (nếu panel khó phát hiện trong user test).
- NVDA 10 phút trước demo — đọc fieldset/legend và status message.
