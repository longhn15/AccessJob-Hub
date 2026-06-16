# WCAG 2.2 Conformance Matrix — AccessJob Hub

Tài liệu đối chiếu các **tiêu chí WCAG 2.2 mới** với bằng chứng trong sản phẩm MVP.

**Route tương ứng:** `/wcag-22` (React page, cùng nội dung tóm tắt dưới đây).

**Lưu ý:** Đây là **ma trận tự đánh giá** phục vụ demo và cuộc thi — không phải chứng nhận pháp lý hay tuyên bố tuân thủ chính thức toàn bộ WCAG 2.2.

**Cập nhật:** 2026-06-16 (task `WCAG22_CONFORMANCE_MATRIX_013`)

---

## Tiêu chí mới — mức A / AA

| Mã | Tên | Mức | Trạng thái | Bằng chứng | Kiểm thử | Ghi chú |
|----|-----|-----|------------|------------|----------|---------|
| **2.4.11** | Focus Not Obscured (Minimum) | AA | Đã đáp ứng | ErrorSummary/StatusMessage scroll + focus; sticky header; `/jobs/1`, `/accessibility` | Bàn phím, thủ công, rà soát mã | Chưa chạy lại axe/Lighthouse sau mọi thay đổi gần nhất |
| **2.5.7** | Dragging Movements | AA | Không áp dụng | Không có drag-and-drop bắt buộc trong MVP | Thủ công, rà soát mã | Nếu thêm UI kéo-thả sau này cần phương án thay thế |
| **2.5.8** | Target Size (Minimum) | AA | Đã đáp ứng | Nút/nav/CTA ≥44px; checkbox + label row ≥44px | Thủ công, rà soát mã | Chưa đo tự động mọi link inline |
| **3.2.6** | Consistent Help | A | Đáp ứng một phần | Footer link "Trợ giúp & phản hồi tiếp cận" → `/accessibility#accessibility-feedback`; trang Accessibility | Thủ công, rà soát mã | Chưa có Help page riêng; help chủ yếu qua footer |
| **3.3.7** | Redundant Entry | A | Đáp ứng một phần | ApplicationForm (lưu/điền/xóa contact), AccessibilityFeedbackForm (email đã lưu), Job Matching (lưu/xem lại kết quả) — localStorage, có đồng ý | Bàn phím, thủ công, rà soát mã | Chỉ cục bộ thiết bị; không đồng bộ server; không lưu message/mô tả |
| **3.3.8** | Accessible Authentication (Minimum) | AA | Không áp dụng | MVP không có login/CAPTCHA/password puzzle | Rà soát mã | Áp dụng khi có auth |

---

## Tiêu chí tham khảo — mức AAA

**Không claim đạt toàn bộ AAA** nếu chưa kiểm chứng đầy đủ.

| Mã | Tên | Mức | Trạng thái | Ghi chú |
|----|-----|-----|------------|---------|
| **2.4.12** | Focus Not Obscured (Enhanced) | AAA | Đáp ứng một phần | Sticky header có thể che một phần trên viewport nhỏ |
| **2.4.13** | Focus Appearance | AAA | Đáp ứng một phần | Focus ring 3px rõ ở AA; chưa đo chu vi AAA |
| **3.3.9** | Accessible Authentication (Enhanced) | AAA | Không áp dụng | Không có luồng xác thực |

---

## Công cụ giáo dục — inclusive design (không phải tiêu chí WCAG bắt buộc)

| Công cụ | Route | Mô tả |
|---------|-------|--------|
| Employer Accessibility Self-Check | `/employer-checklist` | Checklist tham khảo giúp nhà tuyển dụng tự rà soát tin tuyển dụng hòa nhập; chấm điểm client-side, không lưu server. **Không** claim chứng nhận WCAG chính thức. |

---

## Liên kết

- [Tuyên bố accessibility](/accessibility) — cam kết và form phản hồi
- [WCAG checklist](./wcag-checklist.md) — checklist tổng thể MVP
- [WCAG 2.2 What's New (W3C)](https://www.w3.org/WAI/standards-guidelines/wcag/new-requirements/)

---

## Nguồn dữ liệu trong code

Ma trận trên UI đọc từ `frontend/src/data/wcag22Matrix.ts` — cập nhật file đó và tài liệu này đồng bộ khi có thay đổi trạng thái.
