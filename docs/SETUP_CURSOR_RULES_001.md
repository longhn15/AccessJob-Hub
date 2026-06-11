# SETUP_CURSOR_RULES_001

## 1. Mức độ hiểu task

**100%** — Tạo bộ Cursor rules cho project AccessJob Hub (WCAG 2.2, React + Spring Boot + Docker), chưa tạo source code ứng dụng.

## 2. Tóm tắt yêu cầu

- Tạo thư mục `.cursor/rules/` với tối thiểu 8 file rule bắt buộc và có thể thêm file bổ sung.
- Mỗi file `.mdc` có frontmatter Cursor hợp lệ và nội dung cụ thể cho dự án.
- Tạo report xác nhận trong `docs/`.

## 3. Phạm vi đã thực hiện

- Tạo 12 file rule trong `.cursor/rules/`.
- Tạo report này.
- Không tạo source FE/BE/Docker (ngoài phạm vi task).

## 4. Danh sách file đã đọc

| File | Mục đích |
|------|----------|
| `README.md` | Kiểm tra trạng thái repo (hiện trống) |
| Cursor skill `create-rule/SKILL.md` | Định dạng `.mdc` và best practices |

## 5. Danh sách file đã tạo/sửa

| File | Hành động |
|------|-----------|
| `.cursor/rules/core-working-rule.mdc` | Tạo mới |
| `.cursor/rules/project-context-rule.mdc` | Tạo mới |
| `.cursor/rules/frontend-rule.mdc` | Tạo mới |
| `.cursor/rules/accessibility-wcag-rule.mdc` | Tạo mới |
| `.cursor/rules/ui-design-system-rule.mdc` | Tạo mới |
| `.cursor/rules/backend-rule.mdc` | Tạo mới |
| `.cursor/rules/db-rule.mdc` | Tạo mới |
| `.cursor/rules/docker-runtime-rule.mdc` | Tạo mới |
| `.cursor/rules/report-verification-rule.mdc` | Tạo mới |
| `.cursor/rules/git-workflow-rule.mdc` | Tạo mới |
| `.cursor/rules/security-config-rule.mdc` | Tạo mới |
| `.cursor/rules/testing-rule.mdc` | Tạo mới |
| `docs/SETUP_CURSOR_RULES_001.md` | Tạo mới |

## 6. Thay đổi chính theo từng file

### `core-working-rule.mdc`

- `alwaysApply: true` — quy tắc làm việc cốt lõi: MVP, minimal diff, đọc context trước khi sửa, không hardcode secret, tính Docker và accessibility.

### `project-context-rule.mdc`

- `alwaysApply: true` — mô tả AccessJob Hub, MVP scope, tech stack, tiêu chí thành công cuộc thi WCAG 2.2.

### `frontend-rule.mdc`

- `globs: frontend/**/*` — React/TS/Vite, semantic HTML, keyboard, form a11y, UI tone xanh dương đậm/trắng.

### `accessibility-wcag-rule.mdc`

- `globs: frontend/**/*, docs/**/*` — WCAG 2.2 POUR, checklist tự kiểm tra, quy tắc ARIA và modal focus.

### `ui-design-system-rule.mdc`

- `globs: frontend/src/styles/**/*, frontend/src/components/**/*` — CSS variables, token màu, component states, typography, reduced motion.

### `backend-rule.mdc`

- `globs: backend/**/*` — Spring Boot layered architecture, validation error format cho FE accessible, API MVP đề xuất.

### `db-rule.mdc`

- Schema MVP 4 bảng, MySQL/H2, env config, volume, migration đơn giản.

### `docker-runtime-rule.mdc`

- Docker Compose, service networking, Nginx SPA fallback, verify commands, giới hạn container MVP.

### `report-verification-rule.mdc`

- `alwaysApply: true` — cấu trúc report 15 mục, nguyên tắc verify trung thực.

### `git-workflow-rule.mdc`

- `alwaysApply: true` — branch naming, conventional commits, checklist pre-merge, release tags.

### `security-config-rule.mdc`

- Secret/env, CORS, logging, thu thập dữ liệu tối thiểu, không auth trong MVP.

### `testing-rule.mdc`

- `alwaysApply: true` — checklist FE/BE/Docker/a11y theo task.

## 7. Lý do thiết kế

- **Tách 12 file** thay vì 1 file lớn: mỗi rule có phạm vi rõ (`globs` hoặc `alwaysApply`), tránh Cursor sửa lan man.
- **`alwaysApply: true`** cho core, context, report, git, testing — luôn có ngữ cảnh dự án và quy trình verify.
- **`globs` theo layer** — FE/BE/DB/Docker chỉ kích hoạt khi làm việc đúng thư mục.
- **Không trùng lặp quá mức:** security tách riêng nhưng nhất quán với backend-rule và docker-runtime-rule về secret/CORS.

## 8. Accessibility impact

- Không sửa UI (chưa có frontend source).
- Rules `frontend-rule`, `accessibility-wcag-rule`, `ui-design-system-rule` thiết lập chuẩn WCAG 2.2 cho các task UI sau này.

## 9. Docker/runtime impact

- Không sửa Docker (chưa có `docker-compose.yml`).
- Rule `docker-runtime-rule` và `db-rule` chuẩn bị sẵn cho task setup Docker tiếp theo.

## 10. API impact

Không có — chưa tạo backend.

## 11. Database impact

Không có — chưa tạo schema/migration.

## 12. Cách kiểm tra

```bash
git status
# Kiểm tra tồn tại 12 file .mdc
ls .cursor/rules/
```

Khi có Docker sau này: `docker compose config`.

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `git status` | Chạy — có file mới untracked (rules + docs) |
| `docker compose config` | **Chưa chạy** — chưa có `docker-compose.yml` |
| FE build | **Chưa chạy** — chưa có frontend source |
| BE build | **Chưa chạy** — chưa có backend source |
| 12 file `.mdc` tồn tại | Pass (phân tích source) |
| Frontmatter hợp lệ | Pass (phân tích source) |

## 14. Rủi ro còn lại

- Rules chưa được validate qua task code thực tế — có thể cần tinh chỉnh `globs` khi cấu trúc thư mục FE/BE được tạo.
- README vẫn trống — nên bổ sung hướng dẫn tham chiếu `.cursor/rules/` ở task tiếp theo.
- Branch hiện tại là `develop` thay vì `dev` trong git-workflow-rule — cần thống nhất khi setup repo.

## 15. Đề xuất tiếp theo

1. Khởi tạo cấu trúc `frontend/`, `backend/`, `docker-compose.yml`.
2. Cập nhật README với mô tả dự án và link tới rules.
3. Thống nhất branch `dev` hoặc cập nhật rule nếu giữ `develop`.
4. Tạo `docs/WCAG_CHECKLIST.md` khi bắt đầu UI.

---

## Cách sử dụng rules

Cursor tự đọc file trong `.cursor/rules/`:

| Rule | Khi nào áp dụng |
|------|-----------------|
| `core-working-rule` | Mọi session |
| `project-context-rule` | Mọi session |
| `report-verification-rule` | Mọi session |
| `git-workflow-rule` | Mọi session |
| `testing-rule` | Mọi session |
| `frontend-rule` | Khi mở/sửa `frontend/**/*` |
| `accessibility-wcag-rule` | Khi mở/sửa `frontend/**/*` hoặc `docs/**/*` |
| `ui-design-system-rule` | Khi mở/sửa styles/components |
| `backend-rule` | Khi mở/sửa `backend/**/*` |
| `db-rule` | Khi mở/sửa entity/repository/resources/docker-compose |
| `docker-runtime-rule` | Khi mở/sửa Dockerfile, compose, nginx, env |
| `security-config-rule` | Khi mở/sửa backend, frontend, compose, `.env.example` |

Để rule luôn active: giữ `alwaysApply: true`. Để rule theo ngữ cảnh file: mở file khớp `globs` tương ứng.
