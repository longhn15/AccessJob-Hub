# FRONTEND_MOCK_DEMO_016 — Frontend mock demo cho GitHub Pages

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): thêm chế độ mock cho frontend React/Vite qua `VITE_DATA_SOURCE`, giữ nguyên API mode cho Docker/full-stack, cấu hình GitHub Pages build static với mock data; không sửa backend/database; không tách codebase.

**Chắc chắn từ source/diff:**

- `USE_MOCK_DATA` đọc tại `frontend/src/config/dataSource.ts`.
- API layer (`frontend/src/api/*`) phân nhánh mock/API trước khi gọi `client.ts`.
- Mock jobs/resources khớp seed DB (10 + 10 bản ghi).
- Workflow `.github/workflows/deploy-github-pages.yml` build với `VITE_DATA_SOURCE: mock`.

**Giả định / chưa xác minh thực tế:**

- Chưa deploy GitHub Pages lên URL public (`https://longhn15.github.io/AccessJob-Hub/`).
- Chưa mở browser manual trên URL public.
- `docker compose up --build` chưa chạy lại trong phiên làm report này.

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Mock mode | `VITE_DATA_SOURCE=mock` → dữ liệu mock, không gọi backend |
| API mode | `VITE_DATA_SOURCE=api` hoặc không set → gọi backend thật qua `/api` |
| GitHub Pages | Build frontend static bằng mock trong CI workflow |
| Docker/full-stack | Vẫn Spring Boot + MySQL; Docker build không set mock |
| Routing | `base: '/AccessJob-Hub/'` + `BrowserRouter basename` cho subpath |
| Backend/DB | Không sửa nếu không cần |
| Dependency | Không thêm package mới |
| Report | Chỉ `.md`, không `.docx` |

## 3. Branch đã dùng

`feat/frontend-mock-demo` (tạo từ `develop`, working tree clean lúc bắt đầu task code).

## 4. Trạng thái Git trước khi làm report

- **Branch hiện tại:** `feat/frontend-mock-demo`
- **Working tree:** có thay đổi **chưa commit** (mock demo task)
- **Đã sửa (tracked):** `.env.example`, `frontend/src/App.tsx`, `frontend/src/api/jobs.ts`, `resources.ts`, `applications.ts`, `accessibilityFeedback.ts`
- **Untracked:** `.github/workflows/deploy-github-pages.yml`, `frontend/.env.example`, `frontend/src/config/`, `frontend/src/mocks/`
- **Report này:** tạo mới `docs/FRONTEND_MOCK_DEMO_015.md` (chỉ tài liệu, không sửa code app)

## 5. Hiện trạng trước khi sửa

- GitHub Pages chỉ phục vụ **frontend static** — không chạy Spring Boot/MySQL trên Pages.
- Frontend trước đó **luôn gọi backend** qua `fetch` trong `frontend/src/api/client.ts` (`VITE_API_URL` mặc định `/api`).
- Khi deploy static không có backend public → request `/api/*` fail → danh sách jobs/resources trống, form submit lỗi, Console có lỗi mạng.
- `vite.config.ts` đã có `base: '/AccessJob-Hub/'` (phục vụ subpath GitHub Pages) nhưng `BrowserRouter` **chưa có `basename`** — rủi ro routing sai trên subpath.
- **Chưa có** workflow GitHub Actions deploy Pages trong repo (thư mục `.github/` trống trước task).
- **Chưa có** mock data layer trong `frontend/src/mocks/`.

## 6. Căn cứ từ source

### Biến môi trường

| Biến | Đọc tại | Ý nghĩa |
|------|---------|---------|
| `VITE_DATA_SOURCE` | `frontend/src/config/dataSource.ts` | `'mock'` → `USE_MOCK_DATA = true`; giá trị khác/không set → API thật |
| `VITE_API_URL` | `frontend/src/api/client.ts` | Base URL API (mặc định `/api`) — chỉ dùng khi không mock |
| `import.meta.env.BASE_URL` | `frontend/src/App.tsx` | Basename router = `/AccessJob-Hub` (từ Vite `base`) |

### Mock data

| File | Nội dung |
|------|----------|
| `frontend/src/mocks/jobs.mock.ts` | `MOCK_JOBS` (10 jobs), `filterMockJobs`, `mockFetchJobs`, `mockFetchJobById` |
| `frontend/src/mocks/resources.mock.ts` | `MOCK_RESOURCES` (10 resources), `filterMockResources`, `mockFetchResources`, `mockFetchResourceById` |
| `frontend/src/mocks/applications.mock.ts` | `mockCreateApplication` — success/404 giả lập |
| `frontend/src/mocks/accessibilityFeedback.mock.ts` | `mockCreateAccessibilityFeedback` — success giả lập |
| `frontend/src/mocks/mockDelay.ts` | Delay ~80ms mô phỏng mạng |

Dữ liệu mock lấy từ seed `V2__seed_demo_data.sql` + `V4__seed_more_demo_data.sql` + backfill `V3__add_job_filter_columns.sql` (đủ `experienceLevel`, `salaryRange`, `workPlace`).

### API switching

Mỗi hàm public trong `frontend/src/api/jobs.ts`, `resources.ts`, `applications.ts`, `accessibilityFeedback.ts`:

```ts
if (USE_MOCK_DATA) return mockXxx(...)
return apiGet/apiPost(...) // behavior cũ
```

`frontend/src/api/client.ts` **không đổi** — vẫn là HTTP client cho API mode.

### Vite / GitHub Pages

- `frontend/vite.config.ts`: `base: '/AccessJob-Hub/'` (đã có **trước** task mock; không nằm trong diff tracked).
- Dev proxy `/api` → `localhost:8080` chỉ khi `npm run dev` (API mode).
- `.github/workflows/deploy-github-pages.yml`: trigger `push` `main`/`develop` + `workflow_dispatch`; build step `VITE_DATA_SOURCE: mock`.

### Backend (không sửa)

- Jobs: `GET /api/jobs`, `GET /api/jobs/{id}` — filter JPA `JobRepository`.
- Resources: `GET /api/resources`, `GET /api/resources/{id}`.
- Applications / feedback: `POST` tương ứng.

## 7. Chiến lược sửa đã chọn

- **Một codebase duy nhất** — không tách branch develop/main thành 2 app.
- **Env-driven:** `VITE_DATA_SOURCE=mock` bake lúc build (Vite replace `import.meta.env`).
- **Fallback API:** mọi giá trị khác `mock` (kể cả `api`, undefined) → gọi backend.
- **Mock filter client-side** mirror logic BE (keyword LIKE, equality filters jobs; resources keyword + category).
- **Form mock** trả message giống backend mapper (`ApplicationMapper`, `AccessibilityFeedbackMapper`).
- **Router:** `basename` từ `BASE_URL` để GitHub Pages subpath hoạt động.
- **Không sửa** backend, migration, Docker Compose service graph.
- **Không thêm** dependency npm mới (`cross-env`, v.v.).

## 8. Danh sách file đã đọc

### Git / diff

- `git branch --show-current`, `git status`, `git diff --stat`, `git diff -- frontend`, `git diff -- .github`, `git diff -- .env.example`

### Config / build

- `frontend/vite.config.ts` — `base`, dev proxy
- `frontend/package.json` — script `build`, `deploy` (gh-pages)
- `frontend/.env.example` — `VITE_DATA_SOURCE`
- `.env.example` — biến root compose
- `frontend/Dockerfile` — chỉ `VITE_API_URL`, không set mock

### API / mock / types

- `frontend/src/config/dataSource.ts`
- `frontend/src/api/client.ts`, `jobs.ts`, `resources.ts`, `applications.ts`, `accessibilityFeedback.ts`
- `frontend/src/mocks/jobs.mock.ts`, `resources.mock.ts`, `applications.mock.ts`, `accessibilityFeedback.mock.ts`, `mockDelay.ts`
- `frontend/src/types/job.ts`, `resource.ts`, `application.ts`, `accessibilityFeedback.ts`, `api.ts`
- `frontend/src/App.tsx`

### CI

- `.github/workflows/deploy-github-pages.yml`

### Backend (đối chiếu seed, không sửa)

- `backend/.../V2__seed_demo_data.sql`, `V3__add_job_filter_columns.sql`, `V4__seed_more_demo_data.sql`
- `backend/.../JobRepository.java`, `ResourceRepository.java`

### Report mẫu style

- `docs/USER_MVP_POLISH_010.md`, `docs/USER_UI_CONTENT_POLISH_011.md`, `docs/RESOURCES_SEARCH_POLISH_012.md`

## 9. Danh sách file đã sửa

| File | Loại thay đổi |
|------|----------------|
| `frontend/src/config/dataSource.ts` | Tạo mới — `USE_MOCK_DATA` |
| `frontend/src/mocks/mockDelay.ts` | Tạo mới |
| `frontend/src/mocks/jobs.mock.ts` | Tạo mới — 10 jobs + filter/fetch |
| `frontend/src/mocks/resources.mock.ts` | Tạo mới — 10 resources + filter/fetch |
| `frontend/src/mocks/applications.mock.ts` | Tạo mới — mock POST application |
| `frontend/src/mocks/accessibilityFeedback.mock.ts` | Tạo mới — mock POST feedback |
| `frontend/src/api/jobs.ts` | Sửa — mock/API switching |
| `frontend/src/api/resources.ts` | Sửa — mock/API switching |
| `frontend/src/api/applications.ts` | Sửa — mock/API switching |
| `frontend/src/api/accessibilityFeedback.ts` | Sửa — mock/API switching |
| `frontend/src/App.tsx` | Sửa — `BrowserRouter basename` |
| `frontend/.env.example` | Tạo mới — ghi `VITE_DATA_SOURCE=api` |
| `.env.example` | Sửa — thêm `VITE_DATA_SOURCE=api` |
| `.github/workflows/deploy-github-pages.yml` | Tạo mới — CI build mock + deploy Pages |

**Không sửa trong diff task:** `frontend/vite.config.ts`, `frontend/package.json`, `frontend/src/api/client.ts`, backend, docker-compose.

## 10. Diff thay đổi từng file

### `frontend/src/config/dataSource.ts`

- **Cũ:** Không có.
- **Sửa:** `USE_MOCK_DATA = import.meta.env.VITE_DATA_SOURCE === 'mock'`.
- **Vì sao:** Điểm kiểm soát duy nhất cho toàn bộ API layer.
- **Ảnh hưởng:** Build mock bake `true`; build API/Docker bake `false`.

### `frontend/src/mocks/jobs.mock.ts`

- **Cũ:** Không có mock jobs.
- **Sửa:** 10 `Job` đầy đủ field; `filterMockJobs` (keyword, location, workType, experience, salary, workPlace, remote, limit); `mockFetchJobs` / `mockFetchJobById` (+ `ApiError` 404).
- **Vì sao:** Demo `/jobs`, `/jobs/:id`, Job Matching không cần backend.
- **Ảnh hưởng:** Filter UI hoạt động trên mock; matching wizard dùng `fetchJobs({ limit: 50 })`.

### `frontend/src/mocks/resources.mock.ts`

- **Cũ:** Không có.
- **Sửa:** 10 `Resource`; filter keyword/category; fetch by id.
- **Vì sao:** Demo `/resources` static.
- **Ảnh hưởng:** Select danh mục + từ khóa lọc trên mock.

### `frontend/src/mocks/applications.mock.ts`

- **Cũ:** POST luôn qua network.
- **Sửa:** Kiểm tra `jobId` trong `MOCK_JOBS`; success message giống BE; 404 nếu job không tồn tại.
- **Ảnh hưởng:** Form ứng tuyển hiện success ở mock mode.

### `frontend/src/mocks/accessibilityFeedback.mock.ts`

- **Cũ:** POST qua network.
- **Sửa:** Luôn success với message giống `AccessibilityFeedbackMapper`.
- **Ảnh hưởng:** Form feedback accessibility hoạt động trên Pages.

### `frontend/src/mocks/mockDelay.ts`

- **Cũ:** Không có.
- **Sửa:** `mockDelay(value, 80ms)`.
- **Vì sao:** UX gần giống async API, không block UI đột ngột.

### `frontend/src/api/jobs.ts`, `resources.ts`, `applications.ts`, `accessibilityFeedback.ts`

- **Cũ:** Gọi thẳng `apiGet`/`apiPost`.
- **Sửa:** `if (USE_MOCK_DATA) return mock...` trước HTTP.
- **Vì sao:** Một interface cho pages/components; không đổi caller.
- **Ảnh hưởng:** API mode giữ nguyên path khi `USE_MOCK_DATA === false`.

### `frontend/src/App.tsx`

- **Cũ:** `<BrowserRouter>` không basename.
- **Sửa:** `basename={import.meta.env.BASE_URL.replace(/\/$/, '')}`.
- **Vì sao:** Route `/jobs` hoạt động dưới `https://…/AccessJob-Hub/jobs`.
- **Ảnh hưởng:** Local/Docker cũng dùng basename `/AccessJob-Hub` (theo `vite.config` hiện tại).

### `frontend/.env.example`, `.env.example`

- **Cũ:** Không ghi `VITE_DATA_SOURCE`.
- **Sửa:** `VITE_DATA_SOURCE=api` + comment giải thích mock vs api.
- **Ảnh hưởng:** Tài liệu hóa mặc định full-stack.

### `.github/workflows/deploy-github-pages.yml`

- **Cũ:** Không có workflow.
- **Sửa:** Build `frontend` với `VITE_DATA_SOURCE: mock`; upload artifact; `deploy-pages`.
- **Ảnh hưởng:** Push `main`/`develop` có thể deploy static demo (cần bật Pages trên repo).

## 11. Ảnh hưởng sau sửa

| Khu vực | Ảnh hưởng |
|---------|-----------|
| GitHub Pages | Có thể chạy demo chỉ FE + mock (10 jobs, 10 resources) |
| Docker Compose | Không đổi — `frontend` Dockerfile không set `VITE_DATA_SOURCE=mock` |
| Backend/MySQL | Không đổi schema, API, migration |
| `/jobs`, `/resources` | Có dữ liệu + filter khi mock |
| `/job-matching` | `fetchJobs` mock → wizard có kết quả gợi ý |
| Form ứng tuyển / feedback | Mock success, không POST backend |
| Bundle mock | Lớn hơn API build (~347 kB vs ~336 kB JS) do embed mock data |
| `client.ts` | Vẫn tồn tại; mock mode runtime không gọi `fetch` API |

## 12. Edge cases đã xem xét

| Edge case | Xử lý |
|-----------|--------|
| Không set `VITE_DATA_SOURCE` | `USE_MOCK_DATA === false` → API thật |
| `VITE_DATA_SOURCE=api` | API thật |
| `VITE_DATA_SOURCE=mock` | Không gọi `/api`; grep `dist/` mock build: **không có** `localhost:8080` |
| Job/resource id không tồn tại | Mock ném `ApiError(404)` — UI NotFound giữ behavior |
| Application `jobId` invalid | Mock 404 giống BE |
| Field optional null trên job | Mock gán đủ field từ seed; UI không hiện `undefined` |
| GitHub Pages subpath | `base` + `basename` đồng bộ `/AccessJob-Hub/` |
| Docker `npm run dev` | Proxy `/api` vẫn hoạt động khi không mock |
| Mock data lệch BE sau này | Cần cập nhật thủ công `mocks/*.ts` |

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả | Ghi chú |
|----------|---------|---------|
| `npm run lint` | **PASS** | Chạy trong phiên làm report |
| `npm run build` (không set `VITE_DATA_SOURCE`) | **PASS** | Bundle `index-C5mokdhn.js` (~336 kB) |
| `VITE_DATA_SOURCE=mock npm run build` | **PASS** | Bundle `index-h6sxWU72.js` (~347 kB); không có `localhost:8080` trong `dist/` |
| `docker compose config` | **PASS** | Không đổi compose |
| `docker compose up --build` | **Chưa chạy** | Trong phiên report |
| GitHub Pages deploy | **Chưa chạy** | Workflow mới tạo; chưa push/trigger thật |
| Manual browser (mock preview) | **Chưa chạy** | Chưa `npm run preview` + kiểm tra Console |
| Manual browser (URL public) | **Chưa chạy** | Chưa deploy Pages |

## 14. Rủi ro còn lại

- **GitHub Pages chỉ là static demo** — không thay thế full-stack production với persistence.
- **Mock data hardcode** — thay đổi seed BE cần sync `frontend/src/mocks/*`.
- **Basename `/AccessJob-Hub`** áp dụng cả Docker local — truy cập root `localhost:3000/` có thể không khớp route (đã có từ `vite.config` trước mock task).
- **Workflow Pages** cần bật GitHub Pages (environment `github-pages`, source Actions) trên repo `longhn15/AccessJob-Hub`.
- **Chưa verify** routing thật trên URL public sau deploy.
- **Số report `_015`:** đã tồn tại `docs/EMPLOYER_ACCESSIBILITY_SELF_CHECK_015.md`; file này dùng tên theo yêu cầu task `FRONTEND_MOCK_DEMO_015.md`.

## 15. Đề xuất tiếp theo

1. Commit + push branch `feat/frontend-mock-demo`, merge vào `main`/`develop` để trigger workflow.
2. Bật GitHub Pages (Actions) trên repo; xác nhận URL `https://longhn15.github.io/AccessJob-Hub/`.
3. Manual test trên URL public: `/jobs`, `/resources`, `/job-matching`, form submit, Console không lỗi fetch.
4. Ghi trong README/tài liệu nộp thi: **bản public dùng dữ liệu mẫu (`VITE_DATA_SOURCE=mock`)**.
5. Khi có backend public (VPS): build với `VITE_DATA_SOURCE=api` + `VITE_API_URL` trỏ API thật.
6. Cân nhắc script `npm run build:mock` (document PowerShell/bash) trong README — không bắt buộc thêm dependency.

---

**Xác nhận phạm vi:** Chỉ frontend + workflow GitHub Pages. **Không sửa** backend/database/migration. **Không tạo** file `.docx`.
