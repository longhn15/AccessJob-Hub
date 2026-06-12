# FINAL_ACCESSIBILITY_AUDIT_006 — Kiểm thử accessibility cuối (browser thật)

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: vòng kiểm thử accessibility cuối trên trình duyệt thật, ghi bằng chứng, sửa lỗi nhỏ nếu có, cập nhật checklist và report số toàn cục **006** — phục vụ demo WCAG 2.2, không thêm feature.

## 2. Tóm tắt yêu cầu

- Kiểm thử keyboard, visual (focus, nav active, contrast, touch, mobile 360px, zoom 200%) trên 6 route chính.
- Chạy Lighthouse, axe, screen reader nếu có thể.
- Cập nhật `docs/wcag-checklist.md`; lưu bằng chứng vào `docs/assets/accessibility/`.
- Report trung thực về test đã/chưa chạy.

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| Keyboard flow (Playwright trên Chrome thật) | ✅ Đã chạy |
| Visual mobile 360px + zoom 200% | ✅ Đã chạy + screenshot |
| axe-core (wcag2a/2aa/22aa) — 6 route | ✅ Đã chạy — 0 violations |
| Lighthouse Accessibility — 6 route | ✅ Đã chạy — 100/100 |
| NVDA / ChromeVox | ❌ Chưa chạy (ghi rõ) |
| Sửa lỗi phát hiện | ✅ Overflow ngang `/accessibility` @ 360px |
| Sửa BE/DB/Docker/API | ❌ Không cần |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `accessibility-wcag-rule.mdc` | **Không claim pass nếu chưa test; tiêu chí WCAG 2.2** |
| `testing-rule.mdc` | **Lint/build/Docker; manual a11y; Lighthouse/axe/SR** |
| `frontend-rule.mdc` | Keyboard, focus, form, landmarks |
| `ui-design-system-rule.mdc` | Focus ring, touch 44px, nav active, responsive |
| `stitch-ui-reference-rule.mdc` | Không đổi tone UI khi sửa responsive |
| `report-verification-rule.mdc` | **Cấu trúc report, số 006** |
| `core-working-rule.mdc` | Minimal diff, MVP |
| `project-context-rule.mdc` | Phạm vi route demo |
| `docker-runtime-rule.mdc` | Verify stack `localhost:3000` |
| `git-workflow-rule.mdc` | Không commit artifact build |
| `security-config-rule.mdc` | Đọc, không sửa |
| `backend-rule.mdc` | Đọc, không sửa |
| `db-rule.mdc` | Đọc, không sửa |

### Đánh số report

Quét `docs/*_[0-9][0-9][0-9].md` → max = **005** (`ACCESSIBILITY_VERIFICATION_FIXES_005.md`) → report này = **006**.

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `docs/FINAL_ACCESSIBILITY_AUDIT_006.md`
- `docs/assets/accessibility/audit-report.json`
- `docs/assets/accessibility/lighthouse-*.json` (6 route)
- `docs/assets/accessibility/mobile360_*.png`, `zoom200_jobs.png`
- `docs/assets/accessibility/form-error-aria-snapshot.txt`
- `scripts/final-a11y-audit.mjs` (script tái lập kiểm thử)

### Sửa

- `docs/wcag-checklist.md` — kết quả kiểm thử thật
- `frontend/src/pages/AccessibilityPage.tsx` — bọc bảng trong `tableWrapper`
- `frontend/src/pages/AccessibilityPage.module.css` — `overflow-x: auto`, padding mobile

## 6. Thay đổi chính theo từng file

| File | Thay đổi |
|------|----------|
| `AccessibilityPage.tsx` | `<div className={styles.tableWrapper}>` quanh `<table>` |
| `AccessibilityPage.module.css` | `.tableWrapper { overflow-x: auto; max-width: 100% }`; giảm padding cell @ 480px |

**Lý do:** Playwright phát hiện `scrollWidth: 381` > `360` trên `/accessibility` do bảng 2 cột; fix giữ table accessible (scroll ngang trong wrapper thay vì vỡ layout trang).

## 7. Lý do thiết kế

- Wrapper scroll là pattern WCAG cho bảng rộng trên mobile — không ẩn nội dung, vẫn đọc được bằng keyboard.
- Không đổi nội dung bảng hay token màu — giữ StitchAI Inclusive Utility.

## 8. Accessibility impact

| Trước | Sau |
|-------|-----|
| `/accessibility` overflow ngang 21px @ 360px | `horizontalOverflow: false` |
| Các tiêu chí khác | Đã pass trước khi sửa (axe 0, Lighthouse 100) |

## 9. Docker/runtime impact

Rebuild image `frontend` sau sửa CSS; không đổi `docker-compose.yml`.

## 10. API impact

Không.

## 11. Database impact

Không.

## 12. Route đã kiểm thử

| Route | HTTP | h1 | Landmarks | axe violations | Lighthouse a11y |
|-------|------|-----|-----------|----------------|-----------------|
| `/` | 200 | 1 | ✅ | 0 | **100** |
| `/jobs` | 200 | 1 | ✅ | 0 | **100** |
| `/jobs/1` | 200 | 1 | ✅ | 0 | **100** |
| `/resources` | 200 | 1 | ✅ | 0 | **100** |
| `/resources/1` | 200 | 1 | ✅ | 0 | **100** |
| `/accessibility` | 200 | 1 | ✅ | 0 | **100** |

Nguồn: `docs/assets/accessibility/audit-report.json`, `lighthouse-*.json`.

## 13. Kết quả kiểm thử chi tiết

### 13.1 Keyboard manual (Playwright — Chromium thật, headless)

Môi trường: `http://localhost:3000` (Docker Compose).

| Bước | Kết quả |
|------|---------|
| Tab tới skip link | ✅ 1 Tab |
| Enter → focus `main` | ✅ `skipLinkFocusesMain: true` |
| Tab tới filter keyword `/jobs` | ✅ |
| Tab tới JobCard → Enter mở chi tiết | ✅ `jobDetailOpenedViaKeyboard: true` |
| Submit application form lỗi (trống) | ✅ ErrorSummary + `aria-invalid` trên fullName/email |
| Focus sau lỗi | ✅ Focus trên ErrorSummary (`role="alert"`) |
| Submit application hợp lệ | ✅ `successMessageShown: true` |
| `/accessibility` feedback lỗi | ✅ ErrorSummary |
| Feedback hợp lệ | ✅ Success message |
| `aria-current="page"` trên nav Accessibility | ✅ |

### 13.2 Visual

| Kiểm tra | Kết quả |
|----------|---------|
| Focus ring | ✅ `outlineWidth: 3px` trên nav link (vàng qua CSS token) |
| Nav active không chỉ màu | ✅ `borderBottom: 3px` + `underline` + `aria-current="page"` |
| Touch target filter submit | ✅ 268×44px |
| Mobile 360px `/` | ✅ Không overflow |
| Mobile 360px `/jobs` | ✅ Không overflow |
| Mobile 360px `/accessibility` | ⚠️ Overflow 21px → **đã sửa** → ✅ |
| Zoom 200% `/jobs` | ✅ Không overflow ngang |

Screenshot: `docs/assets/accessibility/mobile360_*.png`, `zoom200_jobs.png`.

### 13.3 Lighthouse Accessibility

Đã chạy thật (`npx lighthouse`, Chrome headless):

| Route | Điểm |
|-------|------|
| `/` | **100** |
| `/jobs` | **100** |
| `/jobs/1` | **100** |
| `/resources` | **100** |
| `/resources/1` | **100** |
| `/accessibility` | **100** |

File: `docs/assets/accessibility/lighthouse-*.json`.

### 13.4 axe DevTools / axe-core

**axe DevTools extension (GUI):** Chưa chạy thủ công trên browser.

**axe-core qua Playwright** (`@axe-core/playwright`, tags wcag2a/2aa/22aa): **Đã chạy thật** — **0 violations** trên cả 6 route. Kết quả trong `audit-report.json`.

### 13.5 Screen reader

| Công cụ | Trạng thái |
|---------|------------|
| NVDA | **Chưa chạy** — môi trường automation không có output âm thanh SR |
| ChromeVox | **Chưa chạy** — lý do tương tự |

**Bằng chứng thay thế (không thay SR):** Playwright `ariaSnapshot` form lỗi tại `/jobs/1` — file `form-error-aria-snapshot.txt`:

- `alert` ErrorSummary với link tới `#fullName`, `#email`
- `textbox` kèm label accessible
- `alert` per-field: "Lỗi: …"

### 13.6 Build / Docker

| Lệnh | Kết quả |
|------|---------|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** (session trước) |
| `docker compose build` | **PASS** |
| `docker compose up -d` | **PASS** |
| `GET /api/health` | **UP** |
| `GET :3000` | **200** |
| `GET :3000/api/jobs` | **PASS** |
| `GET :3000/api/resources` | **PASS** |
| `docker compose down` | **PASS** (cuối session) |

## 14. Lỗi phát hiện và file đã sửa

| Lỗi | Mức | File sửa |
|-----|-----|----------|
| Horizontal overflow 21px trên `/accessibility` @ 360px (bảng kiểm thử) | Nhỏ / responsive | `AccessibilityPage.tsx`, `AccessibilityPage.module.css` |

Không có violation axe hay điểm Lighthouse < 100 trước/sau fix.

## 15. Rủi ro còn lại trước demo

1. **NVDA/ChromeVox chưa test** — nên dành 10 phút đọc form lỗi + ErrorSummary trước khi nộp.
2. **axe DevTools GUI** — khác axe-core CLI; có thể phát hiện thêm edge case trên trình duyệt user.
3. **Checkbox filter** — input 20px, touch qua label 44px; một số auditor có thể đề xuất phóng to box.
4. **Lighthouse 100** — điểm tự động, không thay thế test người dùng khuyết tật thật.

## 16. Checklist cuối để nộp bài

- [x] Report `FINAL_ACCESSIBILITY_AUDIT_006.md` (số 006, không ghi đè 005)
- [x] `docs/wcag-checklist.md` có kết quả kiểm thử thật
- [x] Bằng chứng trong `docs/assets/accessibility/`
- [x] Lint + build pass
- [x] Docker stack + health + route chính
- [x] Keyboard flow chính verified (Playwright)
- [x] Lighthouse 100 mọi route
- [x] axe-core 0 violation
- [ ] NVDA hoặc ChromeVox — **khuyến nghị trước demo**

### Tái lập kiểm thử

```bash
docker compose up -d
node scripts/final-a11y-audit.mjs
# Lighthouse (ví dụ):
npx lighthouse http://localhost:3000/jobs --only-categories=accessibility --chrome-flags="--headless" --output=json --output-path=docs/assets/accessibility/lighthouse-jobs.json
docker compose down
```
