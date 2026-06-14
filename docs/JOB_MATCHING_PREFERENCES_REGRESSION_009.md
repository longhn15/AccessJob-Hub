# JOB_MATCHING_PREFERENCES_REGRESSION_009 — Regression Job Matching & Preferences Panel

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: kiểm tra regression sau khi thêm **Accessible Job Matching Wizard** (`/job-matching`) và **Accessibility Preferences Panel**; xác nhận wiring, route cũ, accessibility, localStorage, keyboard/mobile/zoom; bổ sung bằng chứng axe/Lighthouse cho `/job-matching`. Sửa minimal diff nếu phát hiện lỗi. Report số toàn cục **009**.

## 2. Tóm tắt yêu cầu

- Preferences panel xuất hiện mọi route, Provider bọc App, đổi font/line-height/contrast/motion/underline + lưu `accessjob:a11y-preferences` + giữ sau reload.
- Wizard `/job-matching`: nav + Home CTA, 4 bước, keyboard Next/Back, focus heading, validation bước 2, GET `/api/jobs`, lý do match, link chi tiết; không phá preferences.
- axe-core + Lighthouse trên `/job-matching`; mobile 360px + zoom 200% không overflow.
- `npm run lint`, `npm run build`, Docker stack, BE build pass.
- Cập nhật `docs/wcag-checklist.md` và tạo report **009**.

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| Kiểm tra wiring Preferences Provider + Panel | ✅ Đã wired đúng (không cần sửa) |
| Kiểm tra route `/job-matching` + nav + Home CTA | ✅ |
| Wizard 4 bước + validation + API + kết quả | ✅ Playwright |
| Keyboard / focus heading | ✅ Playwright |
| localStorage + reload preferences | ✅ Playwright |
| axe-core `/`, `/job-matching` | ✅ 0 violations |
| Lighthouse Accessibility `/job-matching` | ✅ 100/100 |
| Mobile 360px + zoom 200% `/job-matching` | ✅ 0px overflow |
| `npm run lint` / `npm run build` | ✅ |
| `mvn clean package -DskipTests` | ✅ |
| Docker Compose config/build/up + curl | ✅ |
| Sửa FE wiring/CSS/a11y | ❌ Không cần — regression pass |
| Sửa Back-end/DB/Docker config | ❌ Không |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `core-working-rule.mdc` | **MVP, minimal diff, không sửa ngoài phạm vi regression** |
| `testing-rule.mdc` | **Lint/build/Docker/axe/Lighthouse/keyboard verify** |
| `report-verification-rule.mdc` | **Cấu trúc report 15 mục, số toàn cục 009** |
| `accessibility-wcag-rule.mdc` | **Keyboard, focus, aria-live, không claim SR nếu chưa test** |
| `frontend-rule.mdc` | **Semantic HTML, native controls, responsive 360px/zoom** |
| `ui-design-system-rule.mdc` | **Tokens, focus ring, touch 44px khi review layout** |
| `project-context-rule.mdc` | Phạm vi MVP, route chính |
| `docker-runtime-rule.mdc` | **Verify `docker compose` stack** |
| `git-workflow-rule.mdc` | Không commit artifact build |
| `security-config-rule.mdc` | localStorage key, không hardcode secret |
| `stitch-ui-reference-rule.mdc` | Đọc — đối chiếu pattern card/wizard |
| `backend-rule.mdc` | Đọc — verify BE build, không sửa |
| `db-rule.mdc` | Đọc — không sửa |

### Đánh số report

Quét `docs/*_[0-9][0-9][0-9].md` → max = **008** (`ACCESSIBLE_JOB_MATCHING_008.md`) → report này = **009** (`JOB_MATCHING_PREFERENCES_REGRESSION_009.md`).

### Source & docs đã đọc

- `frontend/src/App.tsx`, `frontend/src/components/Layout/Layout.tsx`
- `frontend/src/components/accessibility/AccessibilityPreferencesProvider.tsx`, `AccessibilityPreferencesPanel.tsx`
- `frontend/src/utils/accessibilityPreferences.ts`, `frontend/src/main.tsx`
- `frontend/src/components/matching/JobMatchingWizard.tsx`, `MatchResultCard.tsx`
- `frontend/src/pages/JobMatchingPage.tsx`, `HomePage.tsx`
- `docs/ACCESSIBLE_JOB_MATCHING_008.md`, `docs/ACCESSIBILITY_PREFERENCES_007.md`
- `docs/wcag-checklist.md`

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `docs/JOB_MATCHING_PREFERENCES_REGRESSION_009.md`
- `scripts/regression-job-matching-audit.mjs` — Playwright: axe, wizard keyboard, preferences, mobile/zoom
- `docs/assets/accessibility/regression-job-matching-audit.json`
- `docs/assets/accessibility/lighthouse-job-matching.json`
- `docs/assets/accessibility/mobile360_job-matching.png`
- `docs/assets/accessibility/zoom200_job-matching.png`

### Sửa

- `docs/wcag-checklist.md` — mục 2.11, 5, 6, 9 với kết quả regression 2026-06-14

## 6. Thay đổi chính theo từng file

| File | Thay đổi |
|------|----------|
| `regression-job-matching-audit.mjs` | Script tái lập: axe wcag2a/2aa/22aa, wizard flow + validation, localStorage reload, overflow 360px/zoom 200% |
| `wcag-checklist.md` | Cập nhật trạng thái wizard keyboard, responsive `/job-matching`, axe/Lighthouse regression |
| FE source | **Không sửa** — wiring đã đúng từ task 007/008 |

### Kết quả regression wiring (đọc source)

| Kiểm tra | Vị trí | Kết quả |
|----------|--------|---------|
| `AccessibilityPreferencesProvider` bọc app | `App.tsx` | ✅ |
| Panel trên mọi route | `Layout.tsx` → `preferencesBar` | ✅ |
| Init sớm trước render | `main.tsx` → `initAccessibilityPreferences()` | ✅ |
| localStorage key | `accessjob:a11y-preferences` | ✅ |
| Route `/job-matching` | `App.tsx` | ✅ |
| Nav “Gợi ý việc làm” | `Layout.tsx` NAV_ITEMS | ✅ |
| Home CTA “Tìm việc phù hợp” | `HomePage.tsx` hero | ✅ |

**Ghi chú:** Report 008 ghi rủi ro “panel chưa wired” — tại thời điểm regression này **đã wired** (có thể đã merge/sửa sau 008). Không cần minimal diff.

## 7. Lý do thiết kế

- **Không sửa code** khi toàn bộ automated + structural checks pass — tránh regression mới.
- **Script Playwright tái lập** thay vì claim manual — bằng chứng JSON + screenshot trong `docs/assets/accessibility/`.
- **axe + Lighthouse chỉ trên route mới** (`/job-matching`) và `/` (panel) — đủ cho acceptance; 6 route còn lại đã pass ở audit 006.

## 8. Accessibility impact

| Yêu cầu | Kết quả |
|---------|---------|
| Panel mọi route | ✅ Visible Playwright |
| Preferences persist reload | ✅ `data-font-scale=large`, `data-contrast=high` sau reload |
| Wizard keyboard Next/Back | ✅ Hoàn thành 4 bước bằng role/button + radio/checkbox |
| Validation bước 1/2 | ✅ Alert text đúng khi chưa chọn |
| Focus heading bước mới | ✅ `headingFocusedOnLoad: true` |
| Kết quả + link chi tiết | ✅ `resultsVisible`, `hasDetailLink` |
| axe `/job-matching` | ✅ 0 violations (wcag2a/2aa/22aa) |
| Lighthouse `/job-matching` | ✅ **100/100** |
| Mobile 360px overflow | ✅ 0px |
| Zoom 200% overflow | ✅ 0px |
| NVDA/ChromeVox | **Chưa chạy** |
| Manual keyboard có người | **Chưa chạy** — Playwright thay thế cơ bản |

## 9. Docker/runtime impact

- `docker compose config` — **PASS**
- `docker compose build` — **PASS** (frontend rebuild với wizard bundle)
- `docker compose up -d` — **PASS** (mysql healthy → backend healthy → frontend started)
- Không sửa `docker-compose.yml`, nginx, env

## 10. API impact

Không đổi contract. Wizard regression gọi `GET /api/jobs` qua proxy — **HTTP 200**.

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
curl http://localhost:3000/job-matching
curl http://localhost:3000/api/jobs
node scripts/regression-job-matching-audit.mjs
npx lighthouse http://localhost:3000/job-matching --only-categories=accessibility --chrome-flags="--headless" --output=json --output-path=docs/assets/accessibility/lighthouse-job-matching.json
```

Manual (khuyến nghị trước demo):

1. Mở `http://localhost:3000` → mở panel → đổi font → reload.
2. Bật high contrast → `/jobs`, `/jobs/1`, `/job-matching`.
3. Tab wizard → test lỗi bước 2 → hoàn thành → mở job detail.
4. DevTools 360px + zoom 200%.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `git status` (đầu task) | Clean trên branch `test/job-matching-preferences-regression` |
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build` | **PASS** |
| `docker compose up -d` | **PASS** |
| `GET /api/health` | **200** — `status: UP`, `database: UP` |
| `GET localhost:3000` | **200** |
| `GET localhost:3000/job-matching` | **200** |
| `GET localhost:3000/api/jobs` | **200** |
| axe-core `/` | **0 violations** |
| axe-core `/job-matching` | **0 violations** |
| Lighthouse Accessibility `/job-matching` | **100/100** (`categories.accessibility.score: 1`) |
| Playwright wizard flow | **PASS** — validation, results, detail link |
| Playwright preferences reload | **PASS** — font large + contrast high giữ sau reload |
| Mobile 360px `/job-matching` | **PASS** — `overflowPx: 0` |
| Zoom 200% `/job-matching` | **PASS** — `overflowPx: 0` |
| NVDA / ChromeVox | **Chưa chạy** |
| Manual keyboard có người | **Chưa chạy** |

Bằng chứng: `docs/assets/accessibility/regression-job-matching-audit.json`, `lighthouse-job-matching.json`, screenshots `mobile360_job-matching.png`, `zoom200_job-matching.png`.

## 14. Rủi ro còn lại

- Screen reader (NVDA/ChromeVox) chưa verify âm thanh cho wizard progress + tier badge.
- Lighthouse/axe tự động — không thay thế test người dùng khuyết tật thật.
- Matching keyword-based — gợi ý có thể không tối ưu với dataset lớn (đã ghi ở report 008).
- Nav 5 item + panel — mobile wrap nhiều hơn; automated test không overflow nhưng cần eyeball trước demo.
- `docker compose up -d` trên máy chậm có thể cần chờ backend healthcheck.

## 15. Đề xuất tiếp theo

- NVDA 10 phút: wizard 4 bước + preferences status message.
- Chạy `regression-job-matching-audit.mjs` trong CI khi có pipeline.
- Lighthouse re-run toàn bộ 6 route sau merge branch regression.
- Playwright e2e: wizard với high contrast bật — assert layout không vỡ.
