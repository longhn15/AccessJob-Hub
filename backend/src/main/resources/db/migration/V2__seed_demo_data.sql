-- Demo seed data for jobs and resources (MVP flow)

INSERT INTO jobs (
    title, company_name, location, work_type, remote_available,
    accessibility_support, short_description, full_description, requirements,
    contact_email, is_active
) VALUES
(
    'Nhân viên hỗ trợ khách hàng',
    'Công ty TNHH Tiếp cận Số',
    'Hà Nội',
    'full-time',
    TRUE,
    'Làm việc từ xa, hỗ trợ phần mềm đọc màn hình, giờ làm linh hoạt.',
    'Hỗ trợ khách hàng qua chat và email, môi trường làm việc thân thiện với người khuyết tật.',
    'Bạn sẽ trả lời câu hỏi khách hàng, ghi nhận phản hồi và phối hợp với đội kỹ thuật. Công ty cam kết hỗ trợ công cụ hỗ trợ tiếp cận và đào tạo nội bộ về WCAG.',
    'Kỹ năng giao tiếp tốt; ưu tiên ứng viên có kinh nghiệm dùng bàn phím và phần mềm hỗ trợ.',
    'tuyendung@tiepcanso.vn',
    TRUE
),
(
    'Lập trình viên Frontend (React)',
    'AccessTech Solutions',
    'TP. Hồ Chí Minh',
    'full-time',
    FALSE,
    'Văn phòng có thang máy, bàn làm việc điều chỉnh chiều cao, màn hình lớn khi cần.',
    'Phát triển giao diện web accessible theo WCAG 2.2 cho khách hàng doanh nghiệp.',
    'Tham gia xây dựng component React/TypeScript, review accessibility với đội QA, và viết tài liệu hướng dẫn sử dụng bàn phím cho sản phẩm.',
    'Biết React, TypeScript; hiểu semantic HTML và ARIA cơ bản.',
    'hr@accesstech.vn',
    TRUE
),
(
    'Chuyên viên nhập liệu bán thời gian',
    'Việc Làm Cộng Đồng',
    'Đà Nẵng',
    'part-time',
    TRUE,
    'Công việc có thể làm từ xa; công cụ nhập liệu hỗ trợ phím tắt và phóng to chữ.',
    'Nhập và kiểm tra dữ liệu việc làm, thời gian linh hoạt 20 giờ/tuần.',
    'Nhập thông tin tin tuyển dụng từ biểu mẫu chuẩn, đối chiếu dữ liệu và báo cáo lỗi cho quản trị viên.',
    'Tỉ mỉ, quen thao tác bàn phím; không yêu cầu kinh nghiệm lập trình.',
    'lienhe@vieclamcongdong.vn',
    TRUE
);

INSERT INTO resources (title, category, description, url, is_active) VALUES
(
    'WCAG 2.2 — Tổng quan tiêu chuẩn',
    'Tiêu chuẩn web',
    'Tài liệu chính thức về Web Content Accessibility Guidelines 2.2 từ W3C, phù hợp để bắt đầu học accessibility.',
    'https://www.w3.org/WAI/standards-guidelines/wcag/',
    TRUE
),
(
    'Hướng dẫn tìm việc cho người khuyết tật',
    'Việc làm',
    'Bài viết tổng hợp kỹ năng phỏng vấn, quyền lợi lao động và mẹo chuẩn bị hồ sơ khi ứng tuyển.',
    'https://www.ilo.org/global/topics/disability-and-work',
    TRUE
),
(
    'Thực hành điều hướng bằng bàn phím',
    'Kỹ năng số',
    'Hướng dẫn ngắn về Tab, Enter, Esc và focus visible — nền tảng để sử dụng web và ứng dụng dễ tiếp cận hơn.',
    'https://webaim.org/articles/keyboard/',
    TRUE
),
(
    'Mẫu CV accessible (Word)',
    'Hồ sơ ứng tuyển',
    'Gợi ý bố cục CV dễ đọc, heading rõ ràng, phù hợp screen reader và in ấn.',
    'https://www.microsoft.com/en-us/accessibility/',
    TRUE
);
