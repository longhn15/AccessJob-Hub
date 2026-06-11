# IMPORT_STITCH_UI_STYLE_RULES_001 — Chuẩn hóa style StitchAI vào Cursor rules

## 1. Mức độ hiểu task

Đã hiểu đầy đủ: đọc export StitchAI, trích xuất design tokens và component rules, ghi vào Cursor rules để các task Front-end sau bắt buộc tuân thủ — **không implement UI**, không sửa source FE/BE/DB/Docker.

## 2. Tóm tắt yêu cầu

Import phong cách **Inclusive Utility** từ `stitch_accessjob_hub_accessibility_interface.zip` thành rule bắt buộc: màu, font, size, spacing, focus, component style, WCAG cấm vi phạm.

## 3. Phạm vi đã thực hiện

- Giải nén và đọc toàn bộ tài liệu + `code.html` + tham chiếu `screen.png` trong zip
- Trích xuất tokens, typography, layout, component patterns
- Cập nhật `.cursor/rules/ui-design-system-rule.mdc` (rule bắt buộc cho FE)
- Tạo `.cursor/rules/stitch-ui-reference-rule.mdc` (mapping Stitch → tokens)
- Tạo report này
- **Không** sửa `frontend/`, `backend/`, migration, `docker-compose.yml`

## 4. File StitchAI đã đọc

| File | Nội dung trích |
|------|----------------|
| `stitch_accessjob_hub_accessibility_interface.zip` | Gói gốc (root repo) |
| `accessjob_hub_design_documentation.md` | Palette, typography 18px, focus, semantic rules |
| `inclusive_utility/DESIGN.md` | Theme Inclusive Utility — colors, type scale, spacing, components |
| `accessjob_hub_home/code.html` | Home layout, skip link, nav, hero, feature cards |
| `browse_jobs_accessjob_hub/code.html` | Filters, JobCard, pagination, focus #FFD700 |
| `job_details_accessjob_hub/code.html` | Job detail structure, CTA |
| `accessibility_accessjob_hub/code.html` | Accessibility statement layout |
| `*/screen.png` (4 file) | Đối chiếu visual — không nhúng vào source |

## 5. Rule files đã đọc

- `.cursor/rules/ui-design-system-rule.mdc` (bản cũ — placeholder tokens)
- `.cursor/rules/frontend-rule.mdc`
- `.cursor/rules/accessibility-wcag-rule.mdc`
- `.cursor/rules/project-context-rule.mdc`

## 6. Rule files đã tạo/sửa

| File | Hành động |
|------|-----------|
| `.cursor/rules/ui-design-system-rule.mdc` | **Sửa** — rule bắt buộc đầy đủ tokens + components + WCAG cấm |
| `.cursor/rules/stitch-ui-reference-rule.mdc` | **Tạo** — mapping StitchAI, page patterns, không copy code |

## 7. Design tokens đã trích xuất

### Màu (chuẩn hóa cho dự án)

| Token | Giá trị | Nguồn Stitch |
|-------|---------|--------------|
| `--color-primary` | `#003366` | `primary-container` / design doc |
| `--color-primary-dark` | `#001e40` | `primary` |
| `--color-on-primary` | `#ffffff` | `on-primary` |
| `--color-background` | `#ffffff` | white canvas |
| `--color-surface` | `#ffffff` | card surface |
| `--color-surface-soft` | `#f0f7ff` | soft sky sections |
| `--color-text` | `#1a1a1a` | `on-background` |
| `--color-text-muted` | `#43474f` | `on-surface-variant` |
| `--color-border` | `#c3c6d1` | `outline-variant` |
| `--color-error` | `#d32f2f` | design doc (chuẩn hóa từ Stitch error) |
| `--color-success` | `#2e7d32` | design doc |
| `--color-focus` | `#ffd700` | `tertiary-fixed` / `#FFD700` trong HTML |

### Focus

- `--focus-ring: 3px solid var(--color-focus)`
- `--focus-offset: 2px` (cho phép 3px trên surface phức tạp)

### Typography

- Font: **Atkinson Hyperlegible Next** + system sans-serif
- Body tối thiểu: **18px / 1.125rem**, line-height **1.6**
- Scale: h1 32–40px/800, h2 24–32px/700, h3 24px/700, body-lg 20px, label 16px/600, label-sm 14px/700 (sàn UI)

### Spacing & layout

- `--layout-max-width: 1280px`
- Mobile gutter: **16px** (`--spacing-margin-mobile`)
- Desktop margin: **40px** (`--spacing-margin-desktop`)
- Stack: 0.5 / 1.5 / 3rem
- Touch target: **44×44px**

### Radius

- Chủ đạo: **4px** (`--radius-md: 0.25rem`)
- Badge pill: `--radius-full` only

## 8. Quy định font / màu / kích cỡ / focus / spacing (tóm tắt)

| Hạng mục | Quy định |
|----------|----------|
| Tone | Xanh dương đậm + trắng; professional, inclusive, high-contrast |
| Font | Atkinson Hyperlegible Next; body ≥ 18px; heading weight 700–800 |
| Màu | Chỉ qua CSS variables; không hardcode trong component |
| Focus | Vàng #ffd700, 3px ring, offset 2px; `:focus-visible` bắt buộc |
| Spacing | rem; max-width 1280px; mobile 16px gutter |
| Depth | Border / tonal separation; không shadow nặng |
| Motion | Đơn giản; `prefers-reduced-motion` bắt buộc |

## 9. Component style bắt buộc (đã ghi trong rule)

Button, LinkButton, Input/Textarea/Select, ErrorMessage, ErrorSummary, StatusMessage/Alert, Card, JobCard/ResourceCard, Badge, SkipLink, Navigation — chi tiết trong `ui-design-system-rule.mdc`.

## 10. Điều gì chỉ là rule, chưa implement UI

- Chưa tạo/sửa file trong `frontend/src/`
- Chưa thêm `tokens.css` / global styles vào FE (sẽ làm ở task FE tiếp theo)
- Chưa load font Atkinson Hyperlegible Next trong app
- Chưa build component React theo Stitch mockup
- File `stitch_extracted/` chỉ dùng đọc local — **không** commit vào repo

**Đây là bước chuẩn hóa style từ StitchAI vào Cursor rules, chưa xây dựng UI.**

## 11. Cách dùng rule cho task Front-end sau

1. Trước khi code UI: đọc `ui-design-system-rule.mdc` + `frontend-rule.mdc` + `accessibility-wcag-rule.mdc`.
2. Đối chiếu layout page: `stitch-ui-reference-rule.mdc` + `code.html` tương ứng trong zip.
3. Tạo/cập nhật `frontend/src/styles/tokens.css` (hoặc tương đương) khớp CSS variables trong rule.
4. Component mới: dùng variables; checklist cuối rule trước khi PR.
5. Không copy HTML/Tailwind từ Stitch — chuyển sang React + semantic HTML + CSS Modules/variables.

## 12. Cách kiểm tra

```bash
git status
# Kiểm tra thủ công:
#   .cursor/rules/ui-design-system-rule.mdc
#   .cursor/rules/stitch-ui-reference-rule.mdc
grep -Ri "#003366|Atkinson|44x44|focus-ring|ffd700" .cursor/rules docs
```

## 13. Kết quả kiểm tra

| Kiểm tra | Kết quả |
|----------|---------|
| `git status` | Chỉ thay đổi `.cursor/rules/*` và `docs/IMPORT_STITCH_UI_STYLE_RULES_001.md` |
| Rule có màu/font/size/spacing/focus cụ thể | **Có** — `ui-design-system-rule.mdc` |
| Rule có component style bắt buộc | **Có** |
| Rule không yêu cầu implement UI ngay | **Đúng** — chỉ rule + report |
| Không sửa FE/BE/DB/Docker | **Đúng** |
| `grep` tokens trong rules/docs | Chạy bên dưới (PowerShell `rg`) |
| `npm run build` | **Chưa chạy** — không sửa FE |
| Keyboard/screen reader | **Không áp dụng** — không sửa UI runtime |

## 14. Rủi ro còn lại

- Token trong rule chưa được mirror sang `frontend/src/styles/` — task FE đầu tiên phải tạo file tokens.
- Stitch mockup có dark mode class — MVP rule chỉ chuẩn hóa light theme.
- Font Atkinson cần self-host hoặc Google Fonts ở task implement — rule đã ghi tên font.
- `stitch_extracted/` và zip untracked — team giữ zip local hoặc thêm vào docs asset nếu cần.

## 15. Đề xuất tiếp theo

1. `feat/fe-design-tokens` — tạo `frontend/src/styles/tokens.css` + load font
2. `feat/fe-layout-shell` — Header, Nav, Footer, SkipLink theo rule
3. `feat/fe-jobs-list` — JobCard theo `browse_jobs` pattern
4. Cân nhắc thêm zip vào `docs/design/` (optional, không bắt buộc MVP)
