# RESOURCE_DETAIL_CONTENT_POLISH_017 — Resource card và detail content polish

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): bổ sung lớp nội dung hướng dẫn frontend-only (`resourceGuides.ts`) cho 10 tài nguyên demo; cải thiện Resource Card và trang `/resources/:id` thành mini article; không sửa backend/database; giữ mock/API mode.

**Chắc chắn:** guide map theo `resource.id`; fallback UI cũ khi không có guide; hoạt động cả mock và API mode.

**Chưa xác minh thực tế:** manual browser 360px/zoom 200%/keyboard trên URL deploy; `docker compose up --build` trong phiên report.

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Resource guide | `resourceGuides.ts` + type `ResourceGuide` |
| Resource Card | Loại, thời gian đọc, mức độ, audience, 2 outcomes, CTA "Xem hướng dẫn" |
| Resource Detail | Mini article: tóm tắt, audience, outcomes, steps, checklist, WCAG refs, related, nguồn |
| Backend/DB | Không sửa |
| Mock/API | Giữ `VITE_DATA_SOURCE`; guide là FE bổ sung |
| Accessibility | Semantic HTML, heading đúng cấp, CTA/link rõ, không chỉ màu |
| Report | `docs/RESOURCE_DETAIL_CONTENT_POLISH_017.md` |

## 3. Branch đã dùng

`feat/resource-detail-content-polish` (tạo từ `develop`, working tree clean lúc bắt đầu).

## 4. Trạng thái Git trước khi sửa

- Branch: `develop` → checkout `feat/resource-detail-content-polish`
- Working tree: **clean**
- Không có thay đổi chưa commit từ task trước

## 5. Hiện trạng trước khi sửa

- `ResourceCard`: title, category badge, mô tả 2 dòng, link ngoài, CTA "Xem tài nguyên".
- `ResourceDetailPage`: back link, h1, category badge, section Mô tả + Liên kết — **không có** nội dung hướng dẫn chi tiết.
- API/mock chỉ trả `Resource` (title, category, description, url) — thiếu type, level, checklist, related.
- Demo WCAG 2.2 cần khu vực Resources có giá trị học tập thực tế hơn.

## 6. Căn cứ từ source

| Nguồn | Ghi chú |
|-------|---------|
| `frontend/src/types/resource.ts` | `Resource` không đổi — không mở rộng API contract |
| `frontend/src/mocks/resources.mock.ts` | 10 resources id 1–10 |
| Seed BE V2+V4 | Cùng 10 bản ghi, category/description khớp mock |
| `frontend/src/config/dataSource.ts` | Mock/API switching không đổi |
| `docs/RESOURCES_SEARCH_POLISH_012.md` | Pattern filter/list |
| `docs/FRONTEND_MOCK_DEMO_016.md` | Mock mode GitHub Pages |

## 7. Chiến lược sửa đã chọn

- **Frontend-only content layer:** `frontend/src/data/resourceGuides.ts` map `resourceId` → `ResourceGuide`.
- **Helper:** `getResourceGuide(id)`, `getRelatedGuides(ids)`.
- **Card/Detail:** đọc guide nếu có; không có → fallback description + CTA cơ bản.
- **Không sửa** `Resource` type, API, mock fetch, backend, migration, docker-compose.
- **Nội dung tiếng Việt** trung lập, tôn trọng người khuyết tật; disclaimer không claim chứng nhận WCAG.

## 8. Danh sách file đã đọc

- `frontend/src/types/resource.ts`
- `frontend/src/types/resourceGuide.ts` (tạo mới khi implement)
- `frontend/src/api/resources.ts`
- `frontend/src/mocks/resources.mock.ts`
- `frontend/src/config/dataSource.ts`
- `frontend/src/components/resources/ResourceCard.tsx`, `ResourceCard.module.css`
- `frontend/src/components/resources/ResourceFilters.tsx`
- `frontend/src/pages/ResourcesListPage.tsx`
- `frontend/src/pages/ResourceDetailPage.tsx`, `ResourceDetailPage.module.css`
- `frontend/src/App.tsx`
- `docs/RESOURCES_SEARCH_POLISH_012.md`, `docs/WCAG22_CONFORMANCE_MATRIX_013.md`, `docs/FRONTEND_MOCK_DEMO_016.md`

## 9. Danh sách file đã sửa

| File | Loại |
|------|------|
| `frontend/src/types/resourceGuide.ts` | Tạo mới |
| `frontend/src/data/resourceGuides.ts` | Tạo mới — 10 guides |
| `frontend/src/components/resources/ResourceCard.tsx` | Sửa |
| `frontend/src/components/resources/ResourceCard.module.css` | Sửa |
| `frontend/src/pages/ResourceDetailPage.tsx` | Sửa |
| `frontend/src/pages/ResourceDetailPage.module.css` | Sửa |
| `docs/RESOURCE_DETAIL_CONTENT_POLISH_017.md` | Tạo mới (report) |

**Không sửa:** backend, database, migration, `docker-compose.yml`, `api/resources.ts`, `mocks/resources.mock.ts`.

## 10. Thay đổi chính theo từng file

### `resourceGuide.ts`

- Type `ResourceGuide` với `type`, `level`, `readingMinutes`, `audience`, `summary`, `outcomes`, `quickSteps`, `checklist`, `wcagRefs?`, `relatedResourceIds?`.

### `resourceGuides.ts`

- 10 guide khớp resource id 1–10; nội dung demo WCAG/tìm việc/CV/phỏng vấn/quyền lợi/screen reader.
- `getResourceGuide`, `getRelatedGuides`.

### `ResourceCard.tsx` + CSS

- Có guide: meta (type · phút · level), "Phù hợp với", "Bạn sẽ biết" (2 outcomes), CTA **Xem hướng dẫn** + `aria-label`.
- Không guide: fallback title, category, description, CTA.
- `min-width: 0` chống tràn mobile.

### `ResourceDetailPage.tsx` + CSS

- `<nav>` breadcrumb; meta `dl`; sections: Tóm tắt, Phù hợp với ai, Bạn sẽ học được gì, Cách áp dụng nhanh (`ol`), Checklist (`ul`), WCAG refs + disclaimer, Nguồn tham khảo, Tài nguyên liên quan (`Link` nội bộ).
- Fallback: section Mô tả như cũ.

## 11. Accessibility impact

- Một `h1` trên detail; section `h2`; card dùng `h3` + `h4` cho phần phụ.
- Checklist/steps dùng `<ul>`/`<ol>` thật, không giả checkbox.
- CTA `aria-label="Xem hướng dẫn: {title}"`.
- External link có `(mở tab mới)` sr-only / aria-label.
- Mức độ dùng text **+** `<strong>`, không chỉ màu badge.
- Focus visible qua link styles và `:focus-within` trên card.
- Disclaimer WCAG tránh hiểu nhầm chứng nhận chính thức.

## 12. Mock/API impact

| Mode | Hành vi |
|------|---------|
| `VITE_DATA_SOURCE=mock` | `fetchResource*` từ mock; guide merge theo `id` — **hoạt động** |
| `VITE_DATA_SOURCE=api` (mặc định) | API trả Resource; guide FE bổ sung theo id — **hoạt động** |
| Resource id không có guide | Fallback description; không crash |

Guide **không** phụ thuộc backend schema mới.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `npm run lint` | **PASS** |
| `npm run build` (API mode) | **PASS** — `index-OLPrDrmk.js` |
| `VITE_DATA_SOURCE=mock npm run build` | **PASS** — `index-8hMT1NM7.js` |
| `docker compose config` | **PASS** |
| `docker compose up --build` | **Chưa chạy** |
| Manual `/resources`, `/resources/:id` | **Chưa chạy browser** |
| Mobile 360px / zoom 200% / keyboard | **Chưa chạy** |
| Mock không gọi localhost:8080 | **Expected pass** (không đổi dataSource logic) |

## 14. Rủi ro còn lại

- Guide hardcode theo id 1–10 — thêm resource BE mới cần bổ sung guide thủ công hoặc fallback mô tả ngắn.
- Nội dung pháp lý/quyền lợi chỉ mang tính tham khảo demo.
- Chưa verify responsive/zoom thực tế trên thiết bị.
- Bundle JS tăng nhẹ do embed guide text (~+10 kB gzip mock build so với trước task guide).

## 15. Đề xuất tiếp theo

1. Manual test `/resources` và `/resources/5` trên mock preview + Docker.
2. Kiểm tra keyboard Tab qua card → detail → related links.
3. Ghi chú trong README demo: phần hướng dẫn chi tiết là nội dung frontend bổ sung.
4. Khi mở rộng CMS/admin sau này, có thể migrate `RESOURCE_GUIDES` sang API — ngoài phạm vi hiện tại.

---

**Backend/DB:** Không sửa. **Mock/API mode:** Giữ nguyên. **Không tạo `.docx`.**
