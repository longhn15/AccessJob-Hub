# RESOURCES_SEARCH_POLISH_012 — Polish tìm kiếm / lọc Tài nguyên

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): polish phần Resources User (`/resources`) — số lượng kết quả, danh mục select, xóa bộ lọc, empty state, Resource card, mobile 360px, tiếng Việt; không CRUD/Admin/Login; không thêm dependency.

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Số lượng kết quả | Hiển thị sau lọc, `aria-live="polite"` |
| Danh mục | Đổi input text → select với option từ seed |
| Xóa bộ lọc | Reset keyword + danh mục về mặc định |
| Empty state | Thân thiện + nút xóa bộ lọc khi có filter |
| Resource card | Tiêu đề, danh mục, mô tả ngắn, CTA rõ |
| Mobile 360px | Không tràn ngang, touch ≥44px |
| Report | `docs/RESOURCES_SEARCH_POLISH_012.md` |

**Không làm:** Admin, CRUD tài nguyên, endpoint mới, `.docx`.

## 3. Branch đã dùng

`feat/user-ui-content-polish` (tiếp tục trên branch polish User; có thay đổi chưa commit từ task trước — không reset/stash).

## 4. Trạng thái Git trước khi sửa

- Branch: `feat/user-ui-content-polish`
- Working tree: **có thay đổi chưa commit** từ `USER_UI_CONTENT_POLISH_011` (jobs/matching + report 011)
- Tiếp tục sửa trên cùng branch theo hướng dẫn task

## 5. Hiện trạng trước khi sửa

- `ResourceFilters`: danh mục là **input text** — người dùng phải đoán/gõ đúng chuỗi category.
- **Không có nút xóa bộ lọc**; chỉ nút "Áp dụng bộ lọc".
- `resultCount` ghi "Tìm thấy N tài nguyên." — chưa đúng câu chữ yêu cầu; empty message chưa đủ hướng dẫn.
- `EmptyState` không có nút hành động xóa bộ lọc.
- Resource card CTA "Xem chi tiết" — chưa khớp ví dụ "Xem tài nguyên: …".
- Tiêu đề trang "Tài nguyên học tập" — chưa dùng "Tài nguyên hỗ trợ tìm việc".

## 6. Căn cứ từ source

### Entity / bảng

- Bảng `resources` (`V1__create_core_tables.sql`): cột `category VARCHAR(100) NOT NULL`, `title`, `description`, `url`, `is_active`.

### API / filter (backend)

- `GET /api/resources?keyword=&category=&limit=` (`ResourceController.java`).
- `ResourceRepository.findActiveResources`:
  - **category** → `LOWER(r.category) LIKE LOWER(CONCAT('%', :category, '%'))` — cột `resources.category`.
  - **keyword** → `LOWER(r.title) LIKE … OR LOWER(r.description) LIKE …` — cột `resources.title`, `resources.description`.
- Filter xử lý **backend** (JPA query); FE gửi query params qua `fetchResources()` (`api/resources.ts`).

### Danh mục demo (seed)

Từ `V2__seed_demo_data.sql` + `V4__seed_more_demo_data.sql`:

1. Tiêu chuẩn web  
2. Việc làm  
3. Kỹ năng số  
4. Hồ sơ ứng tuyển  

### Frontend trước sửa

- `ResourceFilters.tsx`: `category` bind vào `<input type="text">`.
- `ResourcesListPage.tsx`: draft/applied filter pattern giống jobs; gọi API khi `appliedFilters` đổi.

## 7. Chiến lược sửa

- **Minimal diff, chỉ FE:** không đổi API/BE; select gửi đúng giá trị `category` như trước (string).
- **Constants:** `RESOURCE_CATEGORIES` từ seed — không endpoint categories mới.
- **Select:** option "Tất cả danh mục" = `''` → không gửi category (undefined).
- **Reset:** mirror pattern `JobsListPage` + `hasActiveResourceFilters`.
- **EmptyState:** thêm props tùy chọn `actionLabel`/`onAction` (backward compatible).
- **Resource card:** CTA `Xem tài nguyên: {title}` + `aria-label` tương ứng; mô tả giữ `line-clamp: 2`.

## 8. File đã đọc

- `frontend/src/pages/ResourcesListPage.tsx`, `ResourcesListPage.module.css`
- `frontend/src/components/resources/ResourceFilters.tsx`, `ResourceFilters.module.css`
- `frontend/src/components/resources/ResourceCard.tsx`, `ResourceCard.module.css`
- `frontend/src/api/resources.ts`, `types/resource.ts`
- `frontend/src/components/common/EmptyState.tsx`, `StatusMessage.module.css`
- `backend/.../Resource.java`, `ResourceRepository.java`, `ResourceController.java`, `ResourceService.java`
- `backend/.../V1__create_core_tables.sql`, `V2__seed_demo_data.sql`, `V4__seed_more_demo_data.sql`
- `frontend/src/components/jobs/JobFilters.tsx` (pattern reset)

## 9. File đã sửa

| File | Loại |
|------|------|
| `frontend/src/constants/resourceCategories.ts` | Tạo mới |
| `frontend/src/utils/resourceFilters.ts` | Tạo mới |
| `frontend/src/components/resources/ResourceFilters.tsx` | Sửa |
| `frontend/src/components/resources/ResourceFilters.module.css` | Sửa |
| `frontend/src/pages/ResourcesListPage.tsx` | Sửa |
| `frontend/src/pages/ResourcesListPage.module.css` | Sửa |
| `frontend/src/components/resources/ResourceCard.tsx` | Sửa |
| `frontend/src/components/resources/ResourceCard.module.css` | Sửa |
| `frontend/src/components/common/EmptyState.tsx` | Sửa (action tùy chọn) |
| `frontend/src/components/common/StatusMessage.module.css` | Sửa |
| `docs/RESOURCES_SEARCH_POLISH_012.md` | Tạo mới |

## 10. Diff thay đổi từng file

### `resourceCategories.ts`

- 4 danh mục khớp seed DB.

### `resourceFilters.ts`

- `hasActiveResourceFilters()` — keyword hoặc category non-empty.

### `ResourceFilters.tsx` + CSS

- Danh mục: `<select>` + "Tất cả danh mục"; nút "Xóa bộ lọc" (disabled khi không active); style select/reset giống JobFilters.

### `ResourcesListPage.tsx`

- Tiêu đề "Tài nguyên hỗ trợ tìm việc"; intro có "nhu cầu hỗ trợ tiếp cận".
- `handleResetFilters`; result count: "Tìm thấy N tài nguyên phù hợp" / "Không tìm thấy tài nguyên phù hợp với bộ lọc hiện tại."
- Empty state + nút "Xóa bộ lọc" khi `filtersActive`.

### `ResourceCard.tsx` + CSS

- Badge `Danh mục:`; CTA `Xem tài nguyên: {title}`; `overflow-wrap` mobile.

### `EmptyState.tsx` + CSS

- Props `actionLabel`, `onAction`; button ≥44px.

## 11. Ảnh hưởng sau sửa

- `/resources`: lọc danh mục dễ hơn; reset filter; thông báo kết quả rõ; empty state có hướng dẫn.
- **API/BE:** Không đổi contract; category vẫn LIKE trên `resources.category`.
- **Jobs EmptyState:** Không đổi behavior (không truyền action).
- **Admin/CRUD/Login:** Không thêm.

## 12. Edge cases

- Chọn danh mục chính xác → LIKE `%Việc làm%` khớp đúng bản ghi.
- Reset khi draft ≠ applied: reset cả hai về `{}`.
- Nút xóa disabled khi không có filter draft/applied.
- Empty không filter: không hiện nút xóa trong EmptyState; message "Chưa có tài nguyên…".
- Category mới thêm DB sau này chưa có trong constant — cần cập nhật constant (đề xuất task sau).

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build frontend` | **PASS** |
| `docker compose up --build` | **Chưa chạy full stack** trong session |
| Manual `/resources` filter/reset/empty | **Chưa chạy browser** — expected verification |
| Mobile 360px / keyboard Tab | **Chưa chạy DevTools** — CSS touch/min-width đã áp dụng |

## 14. Rủi ro còn lại

- Danh mục select hardcode từ seed — nếu BE thêm category mới, select chưa tự động cập nhật.
- Category filter BE dùng LIKE — gõ partial vẫn khớp nhiều; select exact value giảm nhầm lẫn.
- Chưa verify browser thực tế (360px, keyboard, screen reader).

## 15. Đề xuất tiếp theo

1. Manual test `/resources`: keyword, từng danh mục, xóa bộ lọc, empty state.
2. `docker compose up --build` để phục vụ FE mới.
3. Task sau: endpoint `GET /api/resources/categories` hoặc derive từ list nếu CRUD mở rộng.
4. Cân nhắc đổi BE category filter từ LIKE sang equality khi chỉ dùng select exact.

---

**Xác nhận filter:**

| Tham số | Field/bảng | Xử lý tại |
|---------|------------|-----------|
| `keyword` | `resources.title`, `resources.description` | **Backend** (JPA LIKE) |
| `category` | `resources.category` | **Backend** (JPA LIKE) |

**Không tạo file `.docx`.**
