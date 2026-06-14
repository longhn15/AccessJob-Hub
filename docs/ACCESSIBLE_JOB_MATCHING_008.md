# ACCESSIBLE_JOB_MATCHING_008 — Accessible Job Matching Wizard

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: triển khai wizard 4 bước **Front-end only**, rule-based matching trên `GET /api/jobs`, không AI/BE/DB. Route `/job-matching`, nav + CTA Home, accessibility đầy đủ (keyboard, progress text, focus heading, fieldset, error alert). Report số toàn cục **008**.

## 2. Tóm tắt yêu cầu

- Bước 1: hình thức làm việc (radio)
- Bước 2: nhu cầu tiếp cận (checkbox, ≥1)
- Bước 3: lĩnh vực (radio)
- Bước 4: kết quả + lý do match + link chi tiết + điều chỉnh lựa chọn
- Matching đơn giản trên title, workType, remoteAvailable, accessibilitySupport, descriptions
- UI StitchAI tokens, không phá preferences panel hiện có

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| Route `/job-matching` | ✅ |
| Nav “Gợi ý việc làm” | ✅ |
| Home CTA + feature card | ✅ |
| Accessibility Statement nhắc wizard | ✅ |
| Wizard 4 bước + validation | ✅ |
| Rule-based matching + lý do text | ✅ |
| MatchResultCard (JobCard-style) | ✅ |
| Loading/error API accessible | ✅ |
| Sửa Back-end/API/DB/Docker | ❌ Không |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `ui-design-system-rule.mdc` | **Tokens, focus, touch 44px, card border, tone xanh dương** |
| `stitch-ui-reference-rule.mdc` | **JobCard pattern, Inclusive Utility layout** |
| `frontend-rule.mdc` | **Semantic HTML, native controls, keyboard, skip link** |
| `accessibility-wcag-rule.mdc` | **Fieldset/legend, aria-live, không claim nếu chưa test** |
| `core-working-rule.mdc` | **MVP FE-only, minimal diff, không AI** |
| `testing-rule.mdc` | **Lint/build/Docker/axe verify** |
| `report-verification-rule.mdc` | **Cấu trúc report, số 008** |
| `project-context-rule.mdc` | Phạm vi MVP, demo WCAG |
| `git-workflow-rule.mdc` | Không commit artifact |
| `docker-runtime-rule.mdc` | Verify stack Docker |
| `security-config-rule.mdc` | Không hardcode API URL |
| `backend-rule.mdc` | Đọc, không sửa |
| `db-rule.mdc` | Đọc, không sửa |

### Đánh số report

Quét `docs/*_[0-9][0-9][0-9].md` → max trong repo = **006** (`FINAL_ACCESSIBILITY_AUDIT_006.md`); task yêu cầu report tiếp theo sau `ACCESSIBILITY_PREFERENCES_007` → report này = **008** (`ACCESSIBLE_JOB_MATCHING_008.md`).

### Source đã đọc

- `frontend/src/types/job.ts`, `frontend/src/api/jobs.ts`
- `frontend/src/components/jobs/JobCard.tsx`, `JobCard.module.css`
- `frontend/src/components/Layout/Layout.tsx`
- `frontend/src/pages/HomePage.tsx`, `AccessibilityPage.tsx`
- `frontend/src/components/common/LoadingState.tsx`, `ErrorState.tsx`, `Badge.tsx`
- `backend/.../V2__seed_demo_data.sql` (hiểu dữ liệu demo matching)
- `README.md`, `docs/wcag-checklist.md`

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `docs/ACCESSIBLE_JOB_MATCHING_008.md`
- `frontend/src/types/jobMatching.ts`
- `frontend/src/utils/jobMatching.ts`
- `frontend/src/components/matching/JobMatchingWizard.tsx`
- `frontend/src/components/matching/JobMatchingWizard.module.css`
- `frontend/src/components/matching/MatchResultCard.tsx`
- `frontend/src/components/matching/MatchResultCard.module.css`
- `frontend/src/pages/JobMatchingPage.tsx`
- `frontend/src/pages/JobMatchingPage.module.css`

### Sửa

- `frontend/src/App.tsx` — route `/job-matching`
- `frontend/src/components/Layout/Layout.tsx` — nav “Gợi ý việc làm”
- `frontend/src/pages/HomePage.tsx` — hero CTA + feature card wizard
- `frontend/src/pages/AccessibilityPage.tsx` — section + cam kết wizard
- `README.md` — route + MVP checklist
- `docs/wcag-checklist.md` — phạm vi route, mục 2.10–2.11

## 6. Thay đổi chính theo từng file

| File | Thay đổi |
|------|----------|
| `jobMatching.ts` (types) | Enums lựa chọn wizard, `JobMatchResult`, labels tier |
| `jobMatching.ts` (utils) | Scoring rule-based: work format, accessibility keywords, field keywords → score + reasons + tier |
| `JobMatchingWizard.tsx` | State 4 bước, validation alert, focus heading/error, fetch jobs bước 4, Next/Back/Adjust |
| `MatchResultCard.tsx` | Card kết quả: tier badge, lý do bullet, link chi tiết |
| `JobMatchingPage.tsx` | Page `h1` + lead + wizard |
| `Layout.tsx` | Nav item `/job-matching` |
| `HomePage.tsx` | Primary CTA “Tìm việc phù hợp”, feature card wizard |

### Logic matching (tóm tắt)

- **Work format:** remote/office/hybrid/any — điểm từ `remoteAvailable` + keyword trong mô tả
- **Accessibility needs:** mỗi need khớp keyword (+2), remote-work khớp `remoteAvailable`
- **Field interest:** keyword trong title/mô tả (+4) hoặc any (+2)
- **Tier:** high ≥8, medium ≥4, low còn lại — luôn sort và hiển thị kèm lý do text
- **Không match cao:** thông báo `role="status"` + vẫn list gợi ý gần nhất

## 7. Lý do thiết kế

- **FE-only rule engine** — demo nhanh, giải thích được, không cần BE mới.
- **Keyword + boolean** trên blob text chuẩn hóa (bỏ dấu) — đủ cho 3 job seed demo.
- **Focus heading mỗi bước** — đáp ứng yêu cầu chuyển focus khi Next/Back.
- **Radio bước 1/3, checkbox bước 2** — native, fieldset/legend, không div giả button.
- **MatchResultCard tách component** — tái sử dụng pattern JobCard, không duplicate JobCard gốc.

## 8. Accessibility impact

| Yêu cầu | Cách đáp ứng |
|---------|--------------|
| Progress text | “Bước X trong 4” + `aria-live="polite"` |
| Heading hierarchy | Page `h1`, mỗi bước `h2`, card `h3`, lý do `h4` |
| Validation error | `role="alert"`, `aria-live="assertive"`, focus error |
| Native controls | Radio/checkbox + label |
| Next/Back | `<button type="button">` |
| Kết quả loading/error | `LoadingState` (`role="status"`), `ErrorState` (`role="alert"`) |
| Tier không chỉ màu | Badge + text “Phù hợp cao/vừa/Cần xem thêm” |
| Keyboard | Tab flow wizard; không trap |
| Preferences panel | Không sửa file preferences — không phá |

## 9. Docker/runtime impact

- Rebuild image `frontend` — **PASS**
- `docker compose up -d frontend` — **PASS**
- Không sửa `docker-compose.yml`, nginx, BE

## 10. API impact

Không đổi contract. Wizard dùng `GET /api/jobs?limit=50` hiện có.

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
curl http://localhost:3000/job-matching
curl http://localhost:3000/api/jobs
```

Manual: Tab wizard → chọn bằng keyboard → Next/Back → bỏ chọn để test lỗi → hoàn thành → xem lý do → mở job detail → bật preferences (nếu có) → kiểm layout 360px.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `git status` | Modified + untracked FE files (chưa commit) |
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build frontend` | **PASS** |
| `docker compose up -d frontend` | **PASS** |
| `GET /api/health` | **200** — UP |
| `GET /job-matching` | **200** |
| `GET /api/jobs` | **200** |
| axe-core `/job-matching` | **0 violations** |
| Lighthouse `/job-matching` | **Chưa chạy** |
| Manual keyboard đầy đủ | **Chưa chạy thủ công có người** |
| NVDA/ChromeVox | **Chưa chạy** |
| Mobile 360px screenshot | **Chưa chạy** |

## 14. Rủi ro còn lại

- Matching keyword-based — có thể gợi ý sai với dataset lớn/đa dạng; cần mở rộng rules hoặc BE sau MVP.
- Seed chỉ 3 jobs — demo tier/reasons hạn chế.
- Nav thêm 1 item — mobile wrap nhiều hơn; chưa screenshot 360px lần này.
- Lighthouse chưa re-run trên route mới.
- Accessibility Preferences Panel files tồn tại nhưng chưa wired trong Layout/App hiện tại — ngoài scope task này.

## 15. Đề xuất tiếp theo

- Playwright e2e: hoàn thành wizard → assert ≥1 result có reasons.
- Lighthouse trên `/job-matching`.
- Screenshot mobile 360px + zoom 200% cho wizard.
- Tùy chọn lưu answers vào sessionStorage để quay lại wizard.
- Mở rộng seed jobs với hybrid/QA roles để demo matching đa dạng hơn.
