# REDUNDANT_ENTRY_SAVED_MATCHING_014 — Redundant Entry & Saved Job Matching

## 1. Mức độ hiểu task

Đã hiểu đầy đủ (~100%): implement FE/localStorage cho SC 3.3.7 Redundant Entry (lưu/điền thông tin liên hệ có đồng ý) và lưu/xem lại kết quả Job Matching; cập nhật WCAG 2.2 matrix; không sửa BE/DB; report `_014`.

## 2. Tóm tắt yêu cầu

| Hạng mục | Yêu cầu |
|----------|---------|
| Contact profile | Lưu fullName/email/phone vào localStorage khi user tick checkbox + submit hợp lệ |
| ApplicationForm | Checkbox đồng ý, nút điền/xóa, status accessible |
| AccessibilityFeedbackForm | Nút dùng email đã lưu cho contactEmail |
| Job Matching | Lưu kết quả, panel xem lại/xóa, fetch lại jobs theo id |
| WCAG matrix | SC 3.3.7 → Đáp ứng một phần |
| Report | `REDUNDANT_ENTRY_SAVED_MATCHING_014.md` |

## 3. Phạm vi đã thực hiện

- Utilities localStorage: contact profile + saved job matching
- Component `ContactProfileControls` dùng chung 2 form
- `SavedJobMatchingPanel` + tích hợp wizard qua `useImperativeHandle`
- Cập nhật `wcag22Matrix.ts`, docs, README
- Không sửa backend, API, database, Docker config

## 4. Danh sách file đã đọc

### Rule files (`.cursor/rules/*.mdc`) — 13/13

| File | Ảnh hưởng trực tiếp |
|------|---------------------|
| `core-working-rule.mdc` | Minimal diff, FE-only, không over-engineer |
| `frontend-rule.mdc` | Semantic form, button thật, label, keyboard |
| `accessibility-wcag-rule.mdc` | Không claim axe/SR chưa test; SC 3.3.7 trung thực |
| `ui-design-system-rule.mdc` | CSS variables, touch 44px, focus ring, status text |
| `stitch-ui-reference-rule.mdc` | Token màu/spacing |
| `security-config-rule.mdc` | Không lưu PII lên server; localStorage only |
| `testing-rule.mdc` | lint/build verification |
| `report-verification-rule.mdc` | Report 15 mục, số `_014` |
| `project-context-rule.mdc` | MVP scope, không auth |
| `docker-runtime-rule.mdc` | Rebuild frontend container |
| `backend-rule.mdc` | Không sửa BE |
| `db-rule.mdc` | Không sửa DB |
| `git-workflow-rule.mdc` | Không commit trừ khi user yêu cầu |

### Source đã đọc

- `ApplicationForm.tsx`, `AccessibilityFeedbackForm.tsx`
- `JobMatchingWizard.tsx`, `JobMatchingPage.tsx`
- `accessibilityPreferences.ts` (pattern localStorage)
- `wcag22Matrix.ts`, `wcag-22-conformance-matrix.md`
- Quét `docs/*_[0-9][0-9][0-9].md` — max = `013` → report `014`

## 5. Danh sách file đã tạo/sửa

| File | Loại |
|------|------|
| `frontend/src/utils/contactProfileStorage.ts` | Tạo |
| `frontend/src/utils/savedJobMatchingStorage.ts` | Tạo |
| `frontend/src/components/contact/ContactProfileControls.tsx` | Tạo |
| `frontend/src/components/contact/ContactProfileControls.module.css` | Tạo |
| `frontend/src/components/matching/SavedJobMatchingPanel.tsx` | Tạo |
| `frontend/src/components/matching/SavedJobMatchingPanel.module.css` | Tạo |
| `frontend/src/components/applications/ApplicationForm.tsx` | Sửa |
| `frontend/src/components/feedback/AccessibilityFeedbackForm.tsx` | Sửa |
| `frontend/src/components/matching/JobMatchingWizard.tsx` | Sửa |
| `frontend/src/components/matching/JobMatchingWizard.module.css` | Sửa |
| `frontend/src/pages/JobMatchingPage.tsx` | Sửa |
| `frontend/src/data/wcag22Matrix.ts` | Sửa — SC 3.3.7 |
| `docs/wcag-22-conformance-matrix.md` | Sửa |
| `docs/wcag-checklist.md` | Sửa |
| `README.md` | Sửa |
| `docs/REDUNDANT_ENTRY_SAVED_MATCHING_014.md` | Tạo |

## 6. Thay đổi chính theo từng file

### localStorage keys & dữ liệu

| Key | Dữ liệu lưu | Không lưu |
|-----|-------------|-----------|
| `accessjob:contact-profile` | `fullName`, `email`, `phone?` | message, mô tả feedback |
| `accessjob:saved-job-matching` | `savedAt`, `answers`, `matchSummary` (≤5 job: id, title, tier, score) | Toàn bộ job object |

### Cơ chế đồng ý người dùng

- **Lưu contact:** chỉ khi tick checkbox “Lưu thông tin liên hệ…” **và** submit ApplicationForm thành công.
- **Điền lại:** chỉ khi user bấm “Điền thông tin đã lưu” / “Dùng email đã lưu” — **không** auto-fill âm thầm.
- **Lưu job matching:** chỉ khi user bấm “Lưu kết quả gợi ý” sau khi có kết quả.

### Cách xóa dữ liệu

- Contact: nút “Xóa thông tin đã lưu” trong `ContactProfileControls` → `localStorage.removeItem('accessjob:contact-profile')`.
- Job matching: nút “Xóa kết quả đã lưu” trong `SavedJobMatchingPanel` → `localStorage.removeItem('accessjob:saved-job-matching')`.

### ApplicationForm

- `ContactProfileControls` (mode full) + checkbox lưu.
- Sau submit OK + checkbox: `saveContactProfile(...)`.
- `key={contactStorageRefreshKey}` remount controls sau lưu để hiện nút điền.

### AccessibilityFeedbackForm

- `ContactProfileControls` (mode email-only) — chỉ điền `contactEmail`.

### Job Matching

- Nút “Lưu kết quả gợi ý” ở bước 4.
- `SavedJobMatchingPanel` phía trên wizard; “Xem lại” gọi `wizardRef.restoreFromSaved()` → fetch jobs + rematch; thông báo nếu job trong bản lưu không còn.

## 7. Lý do thiết kế

- **Tách storage utils:** pattern giống `accessibilityPreferences.ts`; parse/validate an toàn.
- **ContactProfileControls tái sử dụng:** một UI cho full vs email-only; tránh duplicate.
- **useImperativeHandle cho restore:** tránh `setState` trong `useEffect` (eslint react-hooks).
- **SC 3.3.7 = “Đáp ứng một phần”:** có reuse có đồng ý nhưng chỉ localStorage, một thiết bị/trình duyệt; không sync server.

## 8. Accessibility impact

| Hạng mục | Trạng thái |
|----------|------------|
| Checkbox có visible label | ✅ |
| Nút điền/xóa/lưu là `<button>` | ✅ |
| Status `role="status"` + `aria-live="polite"` | ✅ |
| Không chỉ dùng màu | ✅ text trong status/border |
| Focus visible | ✅ token `--focus-ring` |
| ErrorSummary/focus submit lỗi | ✅ không đổi logic |
| axe/Lighthouse sau thay đổi | ⬜ **Chưa chạy** |

## 9. Docker/runtime impact

- Chỉ rebuild image `frontend`; backend/mysql không đổi.
- SPA routes không đổi.

## 10. API impact

Không có.

## 11. Database impact

Không có.

## 12. Privacy / security impact

- Dữ liệu liên hệ và kết quả matching **chỉ** trên `localStorage` trình duyệt hiện tại.
- **Không** gửi lên server; **không** đồng bộ giữa thiết bị.
- User có thể xóa bất cứ lúc nào qua nút trong UI.
- Không lưu tin nhắn form hay mô tả feedback (giảm rủi ro PII thừa).

## 13. WCAG 2.2 impact (SC 3.3.7)

| Trước | Sau |
|-------|-----|
| Dự kiến cải thiện | **Đáp ứng một phần** |

Bằng chứng: ApplicationForm (lưu/điền/xóa contact), AccessibilityFeedbackForm (email đã lưu), Job Matching (lưu/xem lại). Giới hạn ghi rõ trong matrix: local-only, không sync.

## 14. Cách kiểm tra & kết quả

```bash
git status
cd frontend && npm run lint
cd frontend && npm run build
cd backend && mvn clean package -DskipTests
docker compose build frontend && docker compose up -d frontend
curl http://localhost:8080/api/health
curl http://localhost:3000/jobs/1
curl http://localhost:3000/accessibility
curl http://localhost:3000/job-matching
curl http://localhost:3000/wcag-22
```

| Kiểm tra | Kết quả |
|----------|---------|
| `npm run lint` | **PASS** |
| `npm run build` | **PASS** |
| `mvn clean package -DskipTests` | **PASS** |
| `docker compose build frontend` | **PASS** |
| HTTP health + 4 routes | **200** |
| Manual test đầy đủ | **Expected pass** — chưa ghi session manual có âm thanh SR |
| axe/Lighthouse | **Chưa chạy** |

## 15. Rủi ro còn lại & đề xuất tiếp theo

**Rủi ro:**
- Contact profile không sync sang tab khác nếu user clear storage hoặc dùng trình duyệt ẩn danh.
- `clearedLocally` không cần — đọc storage mỗi render; sau xóa cần re-render (status message trigger).
- Feedback form không có checkbox lưu email riêng — email chỉ lưu qua ApplicationForm.

**Đề xuất:**
1. Chạy axe/Lighthouse trên `/jobs/1`, `/accessibility`, `/job-matching`, `/wcag-22`.
2. Thêm consent ngắn trong Accessibility Statement về localStorage contact profile.
3. Nếu cần “Đã đáp ứng” cho 3.3.7: auto-suggest điền khi detect profile (vẫn cần nút xác nhận) + sync qua sessionStorage cho cùng session.

---

## Manual test checklist

- [ ] `/jobs/1` — nhập contact, tick lưu, submit OK, reload, “Điền thông tin đã lưu”, “Xóa thông tin đã lưu”
- [ ] Submit **không** tick → không lưu localStorage
- [ ] `/accessibility` — “Dùng email đã lưu” sau khi đã lưu từ application form
- [ ] `/job-matching` — hoàn thành wizard, “Lưu kết quả”, reload, panel hiện, “Xem lại”, “Xóa kết quả đã lưu”
- [ ] `/wcag-22` — SC 3.3.7 hiển thị “Đáp ứng một phần”
