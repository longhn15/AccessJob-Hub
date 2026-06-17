# RESOURCE_FULLSTACK_CONTENT_UPGRADE_016 — Resource full-stack content upgrade

## 1. Mức độ hiểu task

~98% — Nâng cấp Resources full-stack: migration DB, seed nội dung phong phú, API filter mới, frontend card/detail/filter lấy dữ liệu từ backend; không dùng frontend-only guide hay mock làm nguồn chính.

## 2. Tóm tắt yêu cầu

- Thêm ~20 cột nội dung cho bảng `resources`.
- Seed ~10 resource tiếng Việt với summary, audience, takeaways, content, steps, checklist, WCAG refs, nguồn; `example_*` cho resource cần mẫu văn.
- Backend trả `ResourceResponse` mở rộng + filter mới.
- Frontend card/detail/filter hiển thị mini-article, WCAG-friendly.
- Build + Docker + curl verify.

## 3. Branch đã dùng

`feat/resource-fullstack-content-upgrade` (tạo từ `develop`, working tree sạch lúc bắt đầu).

## 4. Trạng thái Git trước khi sửa

- Branch: `develop` → checkout `-b feat/resource-fullstack-content-upgrade`
- Không có thay đổi chưa commit.

## 5. Hiện trạng trước khi sửa

- DB: `resources` chỉ có `title`, `category`, `description`, `url`, `is_active`, timestamps.
- API: filter `category`, `keyword`, `limit`; sort `created_at DESC`.
- FE: card hiển thị category + description; detail chỉ Mô tả + Liên kết.
- Không có `resourceGuides.ts` trên branch này; không có mock resources trên `develop`.

## 6. Căn cứ từ source

- Entity/DTO/Mapper/Repository/Service/Controller resources tối giản.
- Seed 10 resource trong `V2__seed_demo_data.sql` + `V4__seed_more_demo_data.sql`.
- FE: `ResourcesListPage`, `ResourceFilters`, `ResourceCard`, `ResourceDetailPage`.

## 7. Chiến lược sửa đã chọn

- `V5` ALTER TABLE thêm cột; `V6` UPDATE in-place 10 resource (giữ id, giữ `url` legacy).
- Mapper parse TEXT newline → `List<String>`, CSV → tags/wcagRefs; `sourceUrl` fallback `url`.
- Repository JPQL mở rộng keyword + filter `resourceType`, `difficultyLevel`, `audience`, `featured`; sort featured → sort_order → created_at.
- FE: types + API params; card gọn; detail 12 section có điều kiện; filter thêm loại + mức độ (không đưa audience lên UI).

## 8. Database changes

| File | Nội dung |
|------|----------|
| `backend/src/main/resources/db/migration/V5__enhance_resources_content.sql` | Thêm 19 cột + index |
| `backend/src/main/resources/db/migration/V6__seed_resources_enhanced_content.sql` | UPDATE ids 1–10 với nội dung đầy đủ |

Cột mới: `summary`, `resource_type`, `difficulty_level`, `estimated_read_minutes`, `audience`, `tags`, `key_takeaways`, `content`, `action_steps`, `checklist`, `wcag_refs`, `example_*`, `source_name`, `source_url`, `is_featured`, `sort_order`.

## 9. Backend changes

| File | Thay đổi |
|------|----------|
| `entity/Resource.java` | Field JPA cho tất cả cột mới |
| `dto/ResourceResponse.java` | Record mở rộng + `List<String>` |
| `mapper/ResourceMapper.java` | `splitLines`, `splitCsv`, `resolveSourceUrl` |
| `repository/ResourceRepository.java` | Query filter/sort mới |
| `service/ResourceService.java` | Tham số filter mới |
| `controller/ResourceController.java` | Query params: `resourceType`, `difficultyLevel`, `audience`, `featured` |

## 10. Frontend changes

| File | Thay đổi |
|------|----------|
| `types/resource.ts` | Interface `Resource` + `ResourceFilters` mở rộng |
| `api/resources.ts` | Gửi query params mới |
| `utils/resourceLabels.ts` | Label loại/mức độ, summary/url helper |
| `utils/resourceFilters.ts` | `hasActiveResourceFilters` mở rộng |
| `constants/resourceFilterOptions.ts` | Options loại + mức độ |
| `ResourceFilters.tsx` | Thêm select loại/mức độ; nút "Tìm kiếm" |
| `ResourceCard.tsx` + CSS | Meta, summary, audience, 2 takeaways, tags, CTA |
| `ResourceDetailPage.tsx` + CSS | Mini-article 12 section; mẫu tham khảo có điều kiện |
| `ResourcesListPage.tsx` | Intro copy cập nhật |

## 11. Example content / sample text changes

Field: `example_title`, `example_context`, `example_content`, `example_note`.

**Có đoạn mẫu (ids):**

| ID | Resource | Lý do |
|----|----------|-------|
| 2 | Hướng dẫn tìm việc | Email giới thiệu ứng tuyển |
| 4 | Mẫu CV accessible | Mục kinh nghiệm mẫu |
| 5 | Hướng dẫn viết CV | Đoạn giới thiệu CV |
| 6 | Chuẩn bị phỏng vấn online | Email trao đổi hỗ trợ (theo mẫu task) |
| 10 | Mô tả nhu cầu hỗ trợ | Đoạn form/email yêu cầu hỗ trợ |

**Không có đoạn mẫu (ids):**

| ID | Resource | Lý do |
|----|----------|-------|
| 1 | WCAG 2.2 tổng quan | Kiến thức tham khảo, không cần copy-paste |
| 3 | Điều hướng bàn phím | Thực hành kỹ năng |
| 7 | Làm việc từ xa | Mẹo/quy trình |
| 8 | Quyền lợi lao động | Thông tin tham khảo |
| 9 | Screen reader | Giới thiệu công cụ |

**Mock:** Không sửa — `develop` không có `frontend/src/mocks/resources.mock.ts` hay `VITE_DATA_SOURCE`.

## 12. Accessibility impact

- Semantic HTML: `article`, `section`, heading phân cấp (một `h1` trên detail).
- Filter: `label` + `button` thật; result count `role="status"` `aria-live="polite"`.
- Card: title link + CTA riêng (không clickable toàn card).
- Detail: link nguồn có `aria-label` + sr-only “mở tab mới”; section rỗng không render.
- Mẫu tham khảo: `blockquote`, note không ép dùng nguyên văn.
- **Chưa chạy:** axe, Lighthouse, NVDA/JAWS, keyboard manual 360px/zoom 200% trên browser.

## 13. API impact

`GET /api/resources` — thêm query: `resourceType`, `difficultyLevel`, `audience`, `featured`. Keyword tìm thêm `summary`, `tags`, `key_takeaways`, `content`, `example_content`. Sort: `is_featured DESC`, `sort_order ASC`, `created_at DESC`, `id DESC`.

`GET /api/resources/{id}` — response đầy đủ field mới; list fields luôn là mảng (rỗng nếu null DB).

## 14. Kết quả kiểm tra

| Lệnh | Kết quả |
|------|---------|
| `mvn clean package -DskipTests` | **PASS** |
| `npm run lint` | **PASS** (sau `npm install`) |
| `npm run build` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose down -v` + `up --build` | **PASS** — Flyway V1–V6 applied |
| `curl /api/health` | **PASS** — status UP, database UP |
| `curl /api/resources` | **PASS** — 10 items |
| `curl ?keyword=CV` | **PASS** — 3 items |
| `curl ?category=Việc làm` | **PASS** (Invoke-RestMethod) |
| `curl ?resourceType=checklist` | **PASS** — 1 item |
| `curl /api/resources/5` | **PASS** — summary, audience[3], exampleContent có |
| Manual browser `/resources`, `/resources/:id` | **Chưa chạy** |

## 15. Rủi ro còn lại

- Nội dung quyền lao động mang tính tham khảo, không thay tư vấn pháp lý.
- `example_content` dài có thể cần kiểm tra đọc trên mobile thật.
- Chưa verify keyboard/zoom/screen reader trên browser.
- Console Windows hiển thị UTF-8 tiếng Việt lỗi encoding khi curl PowerShell (API JSON đúng).

## 16. Đề xuất tiếp theo

- Manual a11y pass trên `/resources` và `/resources/5`, `/resources/6`, `/resources/10`.
- Thêm integration test cho `ResourceRepository` filter.
- Cân nhắc merge branch polish/mock nếu cần GitHub Pages demo (cập nhật mock theo schema mới).

---

**Ghi chú đánh số report:** User gợi ý `_018`; theo quy tắc toàn cục `docs/` (max hiện tại `_015`), report dùng `_016`.
