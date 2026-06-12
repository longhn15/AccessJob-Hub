# WCAG 2.2 Checklist — AccessJob Hub (MVP)

Checklist thực tế cho các luồng Front-end chính. Dùng khi review UI mới hoặc trước demo.

**Phạm vi route:** `/`, `/jobs`, `/jobs/:id`, `/resources`, `/resources/:id`, `/accessibility`

**Tiêu chuẩn mục tiêu:** WCAG 2.2 Level AA cho luồng chính.

---

## 1. Perceivable (Nhận thức)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 1.1 | Text contrast ≥ 4.5:1 (body) | So màu token `--color-text` / `--color-text-muted` trên nền trắng | Toàn site | ✅ Token đã chuẩn hóa |
| 1.2 | Không truyền thông tin chỉ bằng màu | Lỗi/success có text + border; nav active có underline | Form, nav | ✅ |
| 1.3 | Body text ≥ 18px | `--font-size-body: 1.125rem` | `tokens.css` | ✅ |
| 1.4 | Ảnh có `alt` phù hợp | Ảnh trang trí `alt=""`; ảnh thông tin mô tả | Home (nếu có ảnh) | ⬜ Khi thêm asset |
| 1.5 | Heading hierarchy hợp lý | Một `h1`/page; không nhảy cấp bất thường | Mọi page | ✅ |
| 1.6 | Zoom 200% không mất chức năng | Zoom trình duyệt 200%, kiểm tra form/nav | Toàn site | ⬜ Manual |

---

## 2. Operable (Vận hành)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 2.1 | Skip link → `#main-content` | Tab đầu tiên, Enter, focus vào `main` | Layout | ✅ |
| 2.2 | Landmarks: `header`, `nav`, `main`, `footer` | DevTools / screen reader landmarks | Layout | ✅ |
| 2.3 | Mọi control dùng được bằng keyboard | Tab, Shift+Tab, Enter, Space | Nav, filter, card, form | ⬜ Manual |
| 2.4 | Focus order logic | Skip → logo → nav → main → footer | Toàn site | ⬜ Manual |
| 2.5 | Focus visible rõ (`:focus-visible`, ring vàng 3px) | Tab qua button/link/input | Toàn site | ✅ CSS global |
| 2.6 | Không keyboard trap | Tab xuyên suốt form/modal (nếu có) | Form | ✅ (không modal) |
| 2.7 | Touch target ≥ 44×44px | Button, nav link, input, checkbox label | Controls chính | ✅ |
| 2.8 | Nav active state | `aria-current="page"` + underline/border | Layout nav | ✅ |
| 2.9 | `prefers-reduced-motion` | Tắt animation/transition dài | `index.css` | ✅ |

---

## 3. Understandable (Dễ hiểu)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 3.1 | Mỗi input có visible label | `label` + `htmlFor`/`id` | Form, filter | ✅ |
| 3.2 | Không dùng placeholder làm label duy nhất | Select placeholder là option rỗng, có label riêng | Feedback form | ✅ |
| 3.3 | Lỗi form: `aria-invalid` + `aria-describedby` | Submit form trống/sai | Application, Feedback | ✅ |
| 3.4 | ErrorSummary (≥2 lỗi) + link tới field | Submit nhiều lỗi, click link summary | Form | ✅ |
| 3.5 | Focus sau lỗi submit | 1 lỗi → field; ≥2 lỗi → summary | Form | ✅ |
| 3.6 | Loading/error/success có `role` / `aria-live` | Tải danh sách, submit form | List pages, form | ✅ |
| 3.7 | Link/button có accessible name | Card CTA `aria-label` kèm tiêu đề | JobCard, ResourceCard | ✅ |
| 3.8 | Link ngoài báo tab mới | `(mở tab mới)` sr-only | Accessibility, Resource | ✅ |

---

## 4. Robust (Bền vững)

| # | Tiêu chí | Kiểm tra | Route / vị trí | Trạng thái MVP |
|---|----------|----------|----------------|----------------|
| 4.1 | Semantic HTML trước ARIA | `button`/`a`/`Link`, không div giả button | Toàn site | ✅ |
| 4.2 | ARIA chỉ khi cần, không sai | Không `aria-invalid="false"` thừa | Form | ✅ |
| 4.3 | SPA route hoạt động + API proxy | Docker `localhost:3000` | Docker | ✅ |
| 4.4 | Form tương thích assistive tech | NVDA/VoiceOver đọc label/error | Form | ⬜ Manual SR |

---

## 5. Luồng kiểm tra nhanh (manual keyboard)

Thực hiện tại `http://localhost:3000` sau `docker compose up -d`:

1. **Trang chủ:** Tab → skip link → Enter → main; Tab qua nav.
2. **`/jobs`:** Tab filter (keyword, location, select, checkbox, submit); Tab JobCard link; Enter mở chi tiết.
3. **`/jobs/1`:** Tab ApplicationForm; submit lỗi (trống họ tên + email) → ErrorSummary + focus; submit hợp lệ → success.
4. **`/resources`:** Tab filter; Tab ResourceCard.
5. **`/resources/1`:** Đọc heading; link ngoài (nếu có).
6. **`/accessibility`:** Đọc statement; Tab feedback form; submit lỗi/hợp lệ.

---

## 6. Công cụ tự động (khuyến nghị)

| Công cụ | Phạm vi | Ghi chú |
|---------|---------|---------|
| ESLint | `npm run lint` | Bắt buộc trước merge |
| axe DevTools | Route chính | Chưa tích hợp CI |
| Lighthouse Accessibility | Route chính | Chạy manual Chrome DevTools |
| Screen reader | 1 flow form | NVDA (Win) / VoiceOver (Mac) |

---

## 7. Design tokens bắt buộc (accessibility)

- Focus: `--color-focus` (#ffd700), `--focus-ring`, `--focus-offset`
- Touch: `--spacing-touch-min` (44px)
- Text: `--font-size-body` (18px), `--color-text-muted` (#43474f)
- Error/success: `--color-error`, `--color-success` + text mô tả

Chi tiết: `.cursor/rules/ui-design-system-rule.mdc`

---

## 8. Lịch sử cập nhật

| Ngày | Ghi chú |
|------|---------|
| 2026-06-12 | Tạo checklist ban đầu; sửa focus form, nav `aria-current`, touch checkbox (report `ACCESSIBILITY_VERIFICATION_FIXES_005`) |
