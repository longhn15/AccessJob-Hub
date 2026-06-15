-- Additional demo jobs (total 10) and resources (total 10)

INSERT INTO jobs (
    title, company_name, location, work_type, experience_level, salary_range, work_place,
    remote_available, accessibility_support, short_description, full_description, requirements,
    contact_email, is_active
) VALUES
(
    'Tester phần mềm (QA)',
    'Quality Access Lab',
    'Hà Nội',
    'full-time',
    'under-1',
    '5-10m',
    'hybrid',
    TRUE,
    'Hỗ trợ phần mềm đọc màn hình, checklist kiểm thử có hướng dẫn bàn phím, môi trường yên tĩnh.',
    'Kiểm thử website và ứng dụng theo checklist accessibility, báo cáo lỗi rõ ràng.',
    'Thực hiện test case, ghi nhận bug, phối hợp với dev. Đào tạo nội bộ về WCAG và công cụ kiểm thử.',
    'Tỉ mỉ, quen thao tác bàn phím; dưới 1 năm kinh nghiệm hoặc mới tốt nghiệp CNTT.',
    'qa@qualityaccess.vn',
    TRUE
),
(
    'Content Writer',
    'Nội dung Dễ Tiếp Cận',
    'Làm việc từ xa',
    'part-time',
    '1-2',
    '5-10m',
    'remote',
    TRUE,
    'Làm việc từ xa hoàn toàn; công cụ soạn thảo hỗ trợ heading và kiểm tra contrast.',
    'Viết bài hướng dẫn việc làm và tài nguyên học tập dễ đọc, dễ hiểu.',
    'Soạn nội dung blog, tài nguyên học tập; tuân thủ style guide accessibility.',
    'Kỹ năng viết tiếng Việt tốt; hiểu semantic HTML là lợi thế.',
    'content@noidungde.vn',
    TRUE
),
(
    'Thiết kế UI cơ bản',
    'Design For All Studio',
    'TP. Hồ Chí Minh',
    'full-time',
    '1-2',
    '10-15m',
    'hybrid',
    TRUE,
    'Hybrid linh hoạt; Figma có plugin contrast; hướng dẫn thiết kế rõ ràng.',
    'Thiết kế giao diện web đơn giản, tập trung contrast và touch target.',
    'Tạo wireframe, mockup component; phối hợp với frontend developer.',
    'Biết Figma cơ bản; quan tâm accessibility trong thiết kế.',
    'design@designforall.vn',
    TRUE
),
(
    'Trợ lý hành chính',
    'Văn phòng Hỗ trợ Huế',
    'Huế',
    'full-time',
    'none',
    '5-10m',
    'hue',
    FALSE,
    'Văn phòng tầng trệt, lối đi rộng; phần mềm văn phòng hỗ trợ screen reader.',
    'Hỗ trợ sắp xếp lịch, nhập liệu và liên hệ đối tác tại Huế.',
    'Quản lý lịch họp, soạn thư điện tử, lưu trữ hồ sơ điện tử.',
    'Không yêu cầu kinh nghiệm; thành thạo Word/Excel cơ bản.',
    'admin@vanphonghue.vn',
    TRUE
),
(
    'Nhân viên chăm sóc cộng đồng',
    'Cộng Đồng Tiếp Cận',
    'Đà Nẵng',
    'part-time',
    'none',
    'under-5m',
    'da-nang',
    FALSE,
    'Giờ làm linh hoạt; hỗ trợ đi lại khi cần; môi trường làm việc thân thiện.',
    'Hỗ trợ hoạt động cộng đồng và kết nối người tìm việc với tổ chức.',
    'Tham gia sự kiện, tư vấn sơ bộ và cập nhật thông tin lên hệ thống.',
    'Kỹ năng giao tiếp; chưa yêu cầu kinh nghiệm chuyên môn.',
    'congdong@tiepcan.vn',
    TRUE
),
(
    'Điều phối viên dữ liệu',
    'Data Bridge Co-op',
    'Làm việc từ xa',
    'contract',
    '3-plus',
    'over-15m',
    'remote',
    TRUE,
    'Làm việc từ xa; công cụ nhập liệu có phím tắt; tài liệu quy trình rõ ràng.',
    'Điều phối và kiểm tra chất lượng dữ liệu việc làm từ nhiều nguồn.',
    'Đối chiếu dữ liệu, báo cáo sai lệch, phối hợp với đội nội dung.',
    'Từ 3 năm kinh nghiệm xử lý dữ liệu hoặc quản trị hệ thống.',
    'data@databridge.vn',
    TRUE
),
(
    'Nhân viên hỗ trợ vận hành từ xa',
    'Remote Ops Hub',
    'Làm việc từ xa',
    'full-time',
    'under-1',
    'negotiable',
    'remote',
    TRUE,
    'Remote 100%; giờ làm linh hoạt; onboarding có hướng dẫn bàn phím chi tiết.',
    'Hỗ trợ vận hành hệ thống và trả lời ticket nội bộ qua email.',
    'Theo dõi ticket, cập nhật trạng thái, báo cáo hàng ngày cho quản lý.',
    'Dưới 1 năm kinh nghiệm; quen làm việc online.',
    'ops@remoteops.vn',
    TRUE
);

INSERT INTO resources (title, category, description, url, is_active) VALUES
(
    'Hướng dẫn viết CV accessible',
    'Hồ sơ ứng tuyển',
    'Gợi ý cấu trúc CV với heading rõ, mô tả kinh nghiệm dễ đọc bằng screen reader và khi in ấn.',
    'https://www.w3.org/WAI/people-use-web/',
    TRUE
),
(
    'Chuẩn bị phỏng vấn online',
    'Việc làm',
    'Checklist kiểm tra âm thanh, phụ đề, ánh sáng và cách yêu cầu hỗ trợ khi phỏng vấn trực tuyến.',
    'https://www.ilo.org/global/topics/disability-and-work',
    TRUE
),
(
    'Kỹ năng làm việc từ xa',
    'Kỹ năng số',
    'Mẹo quản lý thời gian, giao tiếp bằng chat/email và thiết lập không gian làm việc tại nhà.',
    'https://webaim.org/',
    TRUE
),
(
    'Quyền lợi lao động của người khuyết tật',
    'Việc làm',
    'Tổng hợp quyền được hỗ trợ hợp lý, chống phân biệt đối xử và kênh khiếu nại cơ bản.',
    'https://www.ilo.org/global/topics/disability-and-work',
    TRUE
),
(
    'Công cụ screen reader phổ biến',
    'Kỹ năng số',
    'Giới thiệu NVDA, JAWS, VoiceOver và cách bắt đầu luyện tập đọc nội dung web.',
    'https://webaim.org/articles/screenreader_testing/',
    TRUE
),
(
    'Cách mô tả nhu cầu hỗ trợ khi ứng tuyển',
    'Việc làm',
    'Mẫu câu và gợi ý trình bày yêu cầu hỗ trợ hợp lý trong email hoặc form ứng tuyển.',
    'https://www.w3.org/WAI/planning/',
    TRUE
);
