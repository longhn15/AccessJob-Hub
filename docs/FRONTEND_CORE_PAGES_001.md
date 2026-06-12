# FRONTEND_CORE_PAGES_001 — Front-end core pages (routing, jobs, resources, accessibility)

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: xây dựng các trang FE cốt lõi với React Router, design tokens StitchAI, layout shell accessible, tích hợp API read-only (`GET /api/jobs`, `/api/resources`), **không** làm form POST applications/feedback, **không** sửa BE/DB/Docker trừ khi cần.

## 2. Tóm tắt yêu cầu

- Routing: `/`, `/jobs`, `/jobs/:id`, `/resources`, `/resources/:id`, `/accessibility`
- Design tokens `tokens.css` theo ui-design-system + stitch-ui-reference
- Layout: header, nav (NavLink), main, footer, skip link
- API client qua `VITE_API_URL` (mặc định `/api`)
- Jobs/Resources list + detail với filter, loading/error/empty state
- Accessibility Statement mô tả WCAG 2.2 và kế hoạch kiểm thử
- Report + cập nhật README, `docs/api-endpoints.md`

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| React Router + routes | ✅ |
| `tokens.css` + cập nhật global styles | ✅ |
| Layout shell (skip link, nav active underline) | ✅ |
| API client + types | ✅ |
| Jobs list/detail + filter | ✅ |
| Resources list/detail + filter | ✅ |
| Accessibility Statement | ✅ |
| Cập nhật README + api-endpoints.md | ✅ |
| Form ứng tuyển / feedback FE | ❌ (ngoài phạm vi) |
| Sửa backend / DB / Docker config | ❌ (không cần) |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `core-working-rule.mdc` | MVP, minimal diff, env config, tạo report |
| `testing-rule.mdc` | Checklist build/Docker/keyboard |
| `report-verification-rule.mdc` | Cấu trúc report 15 mục, đánh số tuần tự |
| `project-context-rule.mdc` | Phạm vi MVP, tech stack, tone UI |
| `git-workflow-rule.mdc` | Không commit build artifact |
| `ui-design-system-rule.mdc` | **Tokens, focus, typography, component style** |
| `stitch-ui-reference-rule.mdc` | **Mapping màu/spacing/pattern Stitch → CSS vars** |
| `frontend-rule.mdc` | **Semantic HTML, Link/NavLink, form labels** |
| `accessibility-wcag-rule.mdc` | **WCAG 2.2, aria-live, không claim chưa test** |
| `docker-runtime-rule.mdc` | SPA fallback Nginx, `VITE_API_URL`, verify compose |
| `security-config-rule.mdc` | Không hardcode API URL/secret |
| `backend-rule.mdc` | Đọc contract API (không sửa) |
| `db-rule.mdc` | Không sửa schema |

### Source / docs đã đọc

- `README.md`, `docs/api-endpoints.md`
- `frontend/package.json`, `vite.config.ts`, `nginx.conf`, `Dockerfile`
- `backend/.../dto/JobResponse.java`, `ResourceResponse.java`
- `backend/.../migration/V2__seed_demo_data.sql`
- Layout/HomePage hiện có trước task

## 5. Danh sách file đã tạo/sửa

### Tạo mới

- `frontend/src/styles/tokens.css`
- `frontend/src/api/client.ts`, `jobs.ts`, `resources.ts`
- `frontend/src/types/job.ts`, `resource.ts`, `api.ts`
- `frontend/src/components/common/*` (LoadingState, ErrorState, EmptyState, Badge)
- `frontend/src/components/jobs/*` (JobCard, JobFilters)
- `frontend/src/components/resources/*` (ResourceCard, ResourceFilters)
- `frontend/src/pages/JobsListPage.*`, `JobDetailPage.*`
- `frontend/src/pages/ResourcesListPage.*`, `ResourceDetailPage.*`
- `frontend/src/pages/AccessibilityPage.*`
- `docs/FRONTEND_CORE_PAGES_001.md`

### Sửa

- `frontend/package.json`, `package-lock.json` — thêm `react-router-dom`
- `frontend/index.html` — font Atkinson Hyperlegible Next
- `frontend/src/index.css` — import tokens, body 18px, focus-visible
- `frontend/src/App.tsx` — BrowserRouter + routes
- `frontend/src/components/Layout/Layout.tsx`, `Layout.module.css`
- `frontend/src/pages/HomePage.tsx`, `HomePage.module.css`
- `README.md`, `docs/api-endpoints.md`

### Xóa

- `frontend/src/styles/variables.css` — thay bằng `tokens.css`

## 6. Thay đổi chính theo từng file

| File / nhóm | Thay đổi |
|-------------|----------|
| `tokens.css` | Toàn bộ CSS variables theo Stitch Inclusive Utility (#003366, focus #ffd700, 18px body, 44px touch) |
| `api/client.ts` | `fetch` wrapper, `VITE_API_URL` default `/api`, `ApiError` cho 404 |
| `App.tsx` | 6 routes trong `Layout` shell |
| `Layout` | `NavLink` + active underline/border; skip link nền vàng |
| `JobsListPage` | Filter form (label visible) → query API; result count; JobCard list |
| `JobDetailPage` | `GET /api/jobs/{id}`; 404 message; sections mô tả/yêu cầu/hỗ trợ tiếp cận |
| `ResourcesListPage` | Filter keyword/category; ResourceCard list |
| `ResourceDetailPage` | Chi tiết + link ngoài có sr-only “mở tab mới” |
| `AccessibilityPage` | 8 cam kết WCAG + bảng kế hoạch kiểm thử keyboard/axe/Lighthouse/SR |

## 7. Lý do thiết kế

- **React Router** thay `<a href>` cứng — SPA navigation, `aria-current` qua NavLink
- **Relative `/api`** — dev proxy (Vite) và Docker Nginx proxy cùng pattern, không bake URL production
- **Draft vs applied filters** — tránh gọi API mỗi keystroke; submit form “Áp dụng bộ lọc” rõ ràng cho keyboard/SR
- **CSS Modules + tokens** — tuân stitch-ui-reference, không Tailwind, không hardcode màu trong component
- **Không form apply job** — task giới hạn read-only; detail job chỉ hiển thị email liên hệ

## 8. Accessibility impact

| Tiêu chí | Cách đáp ứng |
|----------|--------------|
| Skip link | Phần tử đầu DOM → `#main-content`, hiện khi focus |
| Một `h1`/page | Mọi route có `h1` riêng |
| Landmarks | `header`, `nav`, `main`, `footer` |
| Nav active | Underline + `border-bottom` vàng, không chỉ màu chữ |
| Focus visible | `:focus-visible` + `--focus-ring` 3px vàng |
| Form filter | Label visible + `htmlFor`; checkbox có label |
| Loading/error/empty | `role="status"`, `role="alert"`, `aria-live` |
| Card/list SR | `article`, `h3` title link, badge `aria-label` |
| External links | `rel="noopener noreferrer"` + sr-only “mở tab mới” |
| Không placeholder làm label | Chỉ dùng label visible |

**Chưa verify thật:** axe DevTools, Lighthouse, screen reader (NVDA/VoiceOver) — xem mục 13.

## 9. Docker/runtime impact

- **Không sửa** `docker-compose.yml`, `nginx.conf`, `Dockerfile`
- Nginx SPA fallback + `/api/` proxy vẫn hoạt động với React Router
- `VITE_API_URL=/api` bake vào bundle khi build image frontend
- Regenerate `package-lock.json` để `npm ci` trong Docker pass (lock cũ lệch optional deps Vite 8)

## 10. API impact

- **Không đổi** contract backend
- FE consume:
  - `GET /api/jobs?keyword&location&workType&remoteAvailable`
  - `GET /api/jobs/{id}`
  - `GET /api/resources?keyword&category`
  - `GET /api/resources/{id}`
- Ghi chú FE usage thêm vào `docs/api-endpoints.md`

## 11. Database impact

Không có — chỉ đọc dữ liệu seed qua API hiện có.

## 12. Cách kiểm tra

```bash
git status
cd frontend && npm run build
cd backend && mvn clean package -DskipTests
docker compose config
docker compose build
docker compose up -d
curl.exe http://localhost:8080/api/health
curl.exe http://localhost:8080/api/jobs
curl.exe http://localhost:8080/api/resources
curl.exe -o NUL -w "%{http_code}" http://localhost:3000
curl.exe http://localhost:3000/api/jobs
curl.exe http://localhost:3000/api/resources
docker compose logs frontend --tail=100
docker compose logs backend --tail=100
docker compose down
```

**Keyboard manual (trình duyệt):**

1. Tab → skip link → Enter → focus vào main
2. Tab qua nav → Enter đổi trang
3. `/jobs` → Tab qua filter → Submit → Tab JobCard → Enter mở detail
4. Detail → Tab link quay lại danh sách

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `git status` | Có thay đổi FE + docs (chưa commit) |
| `npm run build` | **PASS** |
| `npm run lint` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build` | **PASS** (sau regenerate lockfile) |
| `docker compose up -d` | **PASS** — mysql healthy → backend healthy → frontend started |
| `curl` backend health/jobs/resources | **PASS** — JSON demo 3 jobs, 4 resources |
| `curl` FE `:3000` | **PASS** — HTTP 200 |
| `curl` FE `/api/jobs`, `/api/resources` | **PASS** — proxy Nginx → backend |
| `docker compose logs` | Không lỗi nginx/spring fatal |
| `docker compose down` | **PASS** |
| Keyboard manual | **Chưa chạy trong session agent** — expected verification theo checklist mục 12 |
| axe / Lighthouse | **Chưa chạy** |
| Screen reader | **Chưa chạy** |

## 14. Rủi ro còn lại

- Font Google Fonts cần mạng lần đầu; offline fallback system sans-serif
- Filter jobs/resources chưa sync URL query (refresh mất bộ lọc) — có thể bổ sung sau
- Chưa pagination jobs (API hỗ trợ `limit`; UI chưa có phân trang)
- Job detail chưa có CTA apply form (task tiếp theo)
- `package-lock.json` Vite 8 optional platform deps — cần `npm install` đồng bộ trước Docker build
- Chưa chạy axe/Lighthouse/SR — cần verify trước demo cuộc thi

## 15. Đề xuất tiếp theo

1. Form ứng tuyển trên `/jobs/:id` → `POST /api/applications` với label/error/aria
2. Form feedback trên `/accessibility` → `POST /api/accessibility-feedback`
3. Sync filter state vào URL search params (shareable links)
4. Pagination jobs list (pattern Stitch browse_jobs)
5. Chạy axe + Lighthouse + keyboard + screen reader; ghi kết quả vào report _002 nếu fix thêm
