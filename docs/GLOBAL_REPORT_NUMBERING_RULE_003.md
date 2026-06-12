# GLOBAL_REPORT_NUMBERING_RULE_003 — Đánh số report toàn cục trong docs/

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: đổi quy tắc đánh số report từ **theo nhóm tên task** sang **toàn cục trong `docs/`**; cập nhật `report-verification-rule.mdc`; tạo report task này với số tiếp theo sau khi quét toàn bộ `docs/*_[0-9][0-9][0-9].md`.

## 2. Tóm tắt yêu cầu

- Quét mọi `docs/*_NNN.md` (NNN = 3 chữ số), lấy max + 1.
- Không tạo lại `*_001.md` nếu đã có; không ghi đè report cũ.
- Xóa/bổ sung wording “cùng nhóm tên” trong rule.
- Thêm ví dụ đúng/sai.
- Report task này tuân quy tắc mới (không phải `*_001.md`).

## 3. Phạm vi đã thực hiện

| Hạng mục | Trạng thái |
|----------|------------|
| Cập nhật `.cursor/rules/report-verification-rule.mdc` | ✅ |
| Quy định global numbering + ví dụ đúng/sai | ✅ |
| Tạo report `GLOBAL_REPORT_NUMBERING_RULE_003.md` | ✅ |
| Sửa report cũ / đổi tên file docs hiện có | ❌ (ngoài phạm vi) |

## 4. Danh sách file đã đọc

### Rule files (toàn bộ `.cursor/rules/*.mdc`)

| Rule file | Ảnh hưởng trực tiếp |
|-----------|---------------------|
| `report-verification-rule.mdc` | **File sửa chính** — đánh số, cấu trúc report |
| `core-working-rule.mdc` | Tham chiếu tạo report sau task lớn |
| `testing-rule.mdc` | Không đổi verify flow |
| `git-workflow-rule.mdc` | Không commit docs thừa |
| `project-context-rule.mdc` | Ngữ cảnh docs/ |
| `frontend-rule.mdc` | Không áp dụng task này |
| `backend-rule.mdc` | Không áp dụng |
| `db-rule.mdc` | Không áp dụng |
| `docker-runtime-rule.mdc` | Không áp dụng |
| `security-config-rule.mdc` | Không áp dụng |
| `accessibility-wcag-rule.mdc` | Không áp dụng |
| `ui-design-system-rule.mdc` | Không áp dụng |
| `stitch-ui-reference-rule.mdc` | Không áp dụng |

### Docs đã quét để lấy số

| File | Số NNN |
|------|--------|
| `INIT_PROJECT_STRUCTURE_001.md` | 001 |
| `SETUP_CURSOR_RULES_001.md` | 001 |
| `MYSQL_DOCKER_SETUP_001.md` | 001 |
| `SWITCH_DB_RULE_TO_MYSQL_001.md` | 001 |
| `IMPORT_STITCH_UI_STYLE_RULES_001.md` | 001 |
| `CORE_DOMAIN_SCHEMA_002.md` | **002** (max) |
| `JOBS_API_001.md` | 001 |
| `APPLICATIONS_FEEDBACK_API_001.md` | 001 |
| `FRONTEND_CORE_PAGES_001.md` | 001 |

→ **max = 002** → report task này = **`_003`** (không dùng `_002` vì đã có `CORE_DOMAIN_SCHEMA_002.md`; không dùng `_001`).

## 5. Danh sách file đã tạo/sửa

| File | Hành động |
|------|-----------|
| `.cursor/rules/report-verification-rule.mdc` | Sửa |
| `docs/GLOBAL_REPORT_NUMBERING_RULE_003.md` | Tạo |

## 6. Thay đổi chính theo từng file

### `report-verification-rule.mdc`

- Thêm mục **Đánh số report — toàn cục** với thuật toán quét `docs/*_[0-9][0-9][0-9].md`, max+1.
- Bảng **ví dụ đúng** và **ví dụ sai** (đánh số theo nhóm, ghi đè, bỏ sót khi quét).
- Xóa câu “cùng nhóm tên đã tồn tại và tăng số thứ tự tuần tự”.
- Bổ sung mục 4 report: liệt kê rule files đã đọc.

### `GLOBAL_REPORT_NUMBERING_RULE_003.md`

- Report xác nhận task + minh họa áp dụng quy tắc mới.

## 7. Lý do thiết kế

- **Toàn cục một dãy số** tránh trùng `_001` trên nhiều chủ đề và dễ tra cứu thứ tự thực tế các task lớn.
- Pattern `*_[0-9][0-9][0-9].md` khớp convention hiện có; file không khớp (vd `api-endpoints.md`) không tham gia đánh số.
- Không đổi tên report cũ — chỉ đổi rule cho report **mới**.

## 8. Accessibility impact

Không có — chỉ sửa Cursor rule và tài liệu markdown.

## 9. Docker/runtime impact

Không có.

## 10. API impact

Không có.

## 11. Database impact

Không có.

## 12. Cách kiểm tra

1. Đọc `.cursor/rules/report-verification-rule.mdc` — không còn “cùng nhóm tên”.
2. Liệt kê `docs/*_*.md` và xác nhận max = 002 → report mới = 003.
3. Xác nhận không ghi đè file report cũ.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| Rule quy định global numbering | **PASS** — có thuật toán + ví dụ đúng/sai |
| Không còn đánh số theo nhóm | **PASS** — đã xóa wording cũ |
| Report task ≠ `*_001.md` | **PASS** — `GLOBAL_REPORT_NUMBERING_RULE_003.md` |
| Không ghi đè report cũ | **PASS** — chỉ tạo file mới |
| FE/BE/Docker build | **Không chạy** — ngoài phạm vi task |

## 14. Rủi ro còn lại

- Các report cũ vẫn có nhiều file `*_001.md` (tạo trước khi có rule toàn cục) — không đổi tên để tránh break link/tham chiếu.
- Agent cần quét đúng pattern; file đặt tên sai (vd `_1.md` thay vì `_001.md`) sẽ không được tính.
- `core-working-rule.mdc` vẫn nói “tạo report theo report-verification-rule” — đủ vì rule con đã cập nhật chi tiết.

## 15. Đề xuất tiếp theo

1. Report task lớn tiếp theo: quét `docs/`, max hiện tại = **003** → dùng `_004`.
2. (Tùy chọn) Thêm script `npm run next-report-number` hoặc note trong README về convention đặt tên.
3. (Tùy chọn) Một lần rename thủ công các `*_001.md` cũ thành dãy 001–009 liên tục — chỉ nếu team muốn lịch sử sạch (không bắt buộc).
