# WCAG22_CONFORMANCE_MATRIX_013 — Ma trận đối chiếu WCAG 2.2

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): tạo route public `/wcag-22` hiển thị ma trận WCAG 2.2 mới bằng tiếng Việt; link từ `/accessibility` và footer; tài liệu `docs/wcag-22-conformance-matrix.md`; không claim sai; responsive 360px; không sửa BE/DB; report số `_013`.

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Route | `/wcag-22` — ma trận WCAG 2.2 mới |
| Tiêu chí A/AA | 2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8 |
| Tiêu chí AAA | 2.4.12, 2.4.13, 3.3.9 (tham khảo) |
| Cột matrix | Mã, tên, mức, trạng thái, bằng chứng, kiểm thử, ghi chú |
| Link | `/accessibility` section “Bằng chứng kiểm thử”; footer |
| Consistent Help | Link footer “Trợ giúp & phản hồi tiếp cận” |
| Docs | `wcag-22-conformance-matrix.md`, cập nhật checklist + README |
| Report | `WCAG22_CONFORMANCE_MATRIX_013.md` (max docs `*_NNN` = 012 → 013) |

## 3. Phạm vi đã thực hiện

- Tạo trang React `Wcag22ConformancePage` + data `wcag22Matrix.ts`
- Đăng ký route `/wcag-22` trong `App.tsx`
- Thêm section “Bằng chứng kiểm thử WCAG 2.2” + `id="accessibility-feedback"` trên `AccessibilityPage`
- Footer Layout: link Trợ giúp & phản hồi + Ma trận WCAG 2.2
- Tài liệu matrix, cập nhật checklist và README
- Không sửa backend, database, Docker config

## 4. Danh sách file đã đọc

### Rule files (`.cursor/rules/*.mdc`) — đã đọc toàn bộ 13 file

| File | Ảnh hưởng trực tiếp |
|------|---------------------|
| `core-working-rule.mdc` | Minimal diff, MVP, tạo report sau task lớn |
| `docker-runtime-rule.mdc` | Verify `docker compose` sau thay đổi FE |
| `backend-rule.mdc` | Không sửa BE — chỉ xác nhận health API |
| `db-rule.mdc` | Không sửa DB/migration |
| `frontend-rule.mdc` | Semantic HTML, h1, landmark, keyboard, CSS variables |
| `accessibility-wcag-rule.mdc` | Không claim SR/axe/Lighthouse chưa chạy; matrix trung thực |
| `project-context-rule.mdc` | MVP scope, không auth/AI |
| `stitch-ui-reference-rule.mdc` | Token mapping, tone xanh dương + trắng |
| `testing-rule.mdc` | lint/build/docker/curl verification |
| `report-verification-rule.mdc` | Cấu trúc report 15 mục, số `_013` |
| `ui-design-system-rule.mdc` | CSS variables, focus ring, touch 44px, không màu-only status |
| `security-config-rule.mdc` | Không hardcode secret |
| `git-workflow-rule.mdc` | Không commit trừ khi user yêu cầu |

### Source/docs đã đọc

- `frontend/src/App.tsx`, `Layout.tsx`, `AccessibilityPage.tsx`
- `frontend/src/components/form/ErrorSummary.tsx`
- `docs/wcag-checklist.md`, `README.md`
- `docs/RESOURCES_SEARCH_POLISH_012.md` (mẫu report)
- Quét `docs/*_[0-9][0-9][0-9].md` — max = `012` → report mới `013`

## 5. Danh sách file đã tạo/sửa

| File | Loại |
|------|------|
| `frontend/src/data/wcag22Matrix.ts` | Tạo |
| `frontend/src/pages/Wcag22ConformancePage.tsx` | Tạo |
| `frontend/src/pages/Wcag22ConformancePage.module.css` | Tạo |
| `frontend/src/App.tsx` | Sửa — route `/wcag-22` |
| `frontend/src/components/Layout/Layout.tsx` | Sửa — footer links |
| `frontend/src/pages/AccessibilityPage.tsx` | Sửa — evidence section + anchor feedback |
| `docs/wcag-22-conformance-matrix.md` | Tạo |
| `docs/wcag-checklist.md` | Sửa — link matrix, route, lịch sử |
| `README.md` | Sửa — route + Accessibility evidence |
| `docs/WCAG22_CONFORMANCE_MATRIX_013.md` | Tạo — report này |

**Lưu ý:** `frontend/src/pages/HomePage.tsx` có thay đổi unstaged từ task trước — **không sửa trong task này**.

## 6. Thay đổi chính theo từng file

### `wcag22Matrix.ts`

Định nghĩa 6 tiêu chí A/AA + 3 AAA với trạng thái, bằng chứng, phương pháp kiểm thử và giới hạn theo mapping task (không over-claim).

### `Wcag22ConformancePage.tsx` + CSS

- `h1` “Ma trận đối chiếu WCAG 2.2”
- Disclaimer: tự đánh giá, không chứng nhận pháp lý
- Desktop (≥900px): bảng có `caption`, `th scope`, scroll container có `aria-label`
- Mobile: card layout — không overflow toàn trang
- Trạng thái: text + border (không chỉ màu)

### `Layout.tsx`

Footer thêm:
- `Trợ giúp & phản hồi tiếp cận` → `/accessibility#accessibility-feedback` (3.2.6 quick win)
- `Ma trận WCAG 2.2` → `/wcag-22`

### `AccessibilityPage.tsx`

- Section “Bằng chứng kiểm thử WCAG 2.2” + link tới `/wcag-22`
- `id="accessibility-feedback"` cho anchor footer

## 7. Lý do thiết kế

- **Data tách file** (`wcag22Matrix.ts`): đồng bộ UI và docs; dễ cập nhật trạng thái sau kiểm thử.
- **Bảng + card responsive**: bảng rộng bọc scroll trên desktop; mobile đọc từng tiêu chí dạng card — tránh overflow 360px.
- **Footer help link**: đáp ứng gợi ý 3.2.6 mà không thêm modal/nav item.
- **Trạng thái trung thực**: 3.3.7 = “Dự kiến cải thiện”; 3.3.8 = “Không áp dụng”; AAA chỉ tham khảo.

## 8. Accessibility impact

| Hạng mục | Trạng thái |
|----------|------------|
| Một `h1` trên `/wcag-22` | ✅ |
| Landmark qua Layout (`header`, `nav`, `main`, `footer`) | ✅ |
| Bảng `caption` + header cells | ✅ (desktop) |
| Card semantic trên mobile | ✅ `article` + `dl` |
| Focus visible | ✅ token `--focus-ring` |
| Trạng thái không chỉ màu | ✅ text trong badge |
| Link accessible name | ✅ footer help có `aria-label` |
| Keyboard trap | ✅ không thêm modal |
| axe/Lighthouse trên `/wcag-22` | ⬜ **Chưa chạy trong task này** |
| NVDA/ChromeVox | ⬜ **Chưa chạy** — không claim |

## 9. Docker/runtime impact

- Không sửa `docker-compose.yml`, Dockerfile, nginx.
- FE rebuild trong Docker image — SPA fallback phục vụ `/wcag-22`.

## 10. API impact

Không có. Backend không đổi.

## 11. Database impact

Không có.

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
curl http://localhost:3000/wcag-22
curl http://localhost:3000/accessibility
curl http://localhost:3000/api/jobs
```

Manual: Tab `/wcag-22`; link từ `/accessibility`; footer help; mobile 360px; zoom 200%.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `git status` | Branch `feat/wcag22-conformance-matrix`; file task + HomePage unstaged từ trước |
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose config` | **PASS** |
| `docker compose build` | **PASS** |
| `docker compose up -d` | **PASS** — mysql, backend, frontend healthy |
| `GET /api/health` | **200** |
| `GET /wcag-22` | **200** |
| `GET /accessibility` | **200** |
| `GET /api/jobs` (qua Nginx proxy) | **200** |
| axe/Lighthouse `/wcag-22` | **Chưa chạy** |
| Keyboard manual `/wcag-22` | **Expected pass** — cấu trúc giống AccessibilityPage; chưa ghi nhận session manual đầy đủ |

## 14. Rủi ro còn lại

- **3.2.6** vẫn “Đáp ứng một phần” — help chủ yếu qua footer, chưa có help in-page mọi luồng.
- **3.3.7** chưa implement — cần localStorage consent nếu muốn đạt.
- **axe/Lighthouse** chưa chạy trên route mới — nên chạy trước demo.
- Bảng desktop `min-width: 56rem` — scroll ngang trong region, không tràn body (đã bọc `overflow-x: auto`).

## 15. Đề xuất tiếp theo

1. Chạy axe DevTools + Lighthouse trên `/wcag-22`; cập nhật matrix nếu có vi phạm.
2. Implement 3.3.7: gợi ý điền lại email/họ tên giữa ApplicationForm và AccessibilityFeedbackForm (localStorage + consent).
3. Screenshot mobile 360px + zoom 200% cho `/wcag-22` vào `docs/assets/accessibility/`.
4. Test NVDA/VoiceOver 10 phút trên matrix + footer help link.

---

## Ma trận tóm tắt (A/AA)

| Mã | Trạng thái |
|----|------------|
| 2.4.11 | Đã đáp ứng |
| 2.5.7 | Không áp dụng |
| 2.5.8 | Đã đáp ứng |
| 3.2.6 | Đáp ứng một phần |
| 3.3.7 | Dự kiến cải thiện |
| 3.3.8 | Không áp dụng |
