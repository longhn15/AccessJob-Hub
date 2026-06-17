-- Rich Vietnamese content for demo resources (ids 1–10 from V2 + V4 seeds)

UPDATE resources SET
    summary = 'Giới thiệu ngắn gọn WCAG 2.2 và cách dùng tiêu chuẩn khi đánh giá website tuyển dụng.',
    resource_type = 'article',
    difficulty_level = 'basic',
    estimated_read_minutes = 8,
    audience = 'Người mới tìm hiểu tiếp cận số
Người tìm việc muốn đọc tin tuyển dụng dễ hiểu hơn
Người làm nội dung web',
    tags = 'WCAG,tiêu chuẩn web,tiếp cận',
    key_takeaways = 'WCAG 2.2 là bộ tiêu chí giúp nội dung web dễ dùng hơn cho nhiều người
Bạn có thể dùng WCAG để kiểm tra form ứng tuyển và trang tuyển dụng
Không cần học hết mọi tiêu chí — bắt đầu với vài mục quan trọng là đủ',
    content = 'WCAG 2.2 mô tả cách làm website dễ đọc, dễ thao tác bằng bàn phím và dễ hiểu hơn. Khi tìm việc, bạn có thể dùng các tiêu chí này để đánh giá trang tuyển dụng: form có nhãn rõ không, lỗi nhập liệu có giải thích không, liên kết có mô tả đích đến không.

Bạn không cần trở thành chuyên gia. Chỉ cần biết vài tiêu chí cơ bản đã giúp bạn chọn nơi ứng tuyển phù hợp hơn.',
    action_steps = 'Đọc phần tóm tắt WCAG 2.2 trên trang W3C
Chọn 3 tiêu chí liên quan tới form và điều hướng
Mở một trang tuyển dụng bạn quan tâm và kiểm tra nhanh
Ghi lại điểm khó dùng để hỏi nhà tuyển dụng nếu cần',
    checklist = 'Tiêu đề trang mô tả rõ nội dung chính
Có thể tab qua menu và nút bấm bằng bàn phím
Văn bản có độ tương phản đủ để đọc
Form có nhãn cho từng ô nhập
Thông báo lỗi nêu rõ cần sửa gì
Liên kết mô tả đích đến, không chỉ ghi “bấm vào đây”',
    wcag_refs = '2.4.7, 1.4.3, 3.3.1',
    example_title = NULL,
    example_context = NULL,
    example_content = NULL,
    example_note = NULL,
    source_name = 'W3C — Web Content Accessibility Guidelines',
    source_url = 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    is_featured = FALSE,
    sort_order = 10
WHERE id = 1;

UPDATE resources SET
    summary = 'Lộ trình tìm việc gồm đánh giá tin tuyển dụng, chuẩn bị hồ sơ và biết quyền được hỗ trợ hợp lý.',
    resource_type = 'guide',
    difficulty_level = 'basic',
    estimated_read_minutes = 7,
    audience = 'Người khuyết tật đang tìm việc
Người mới quay lại thị trường lao động
Sinh viên sắp tốt nghiệp',
    tags = 'tìm việc,tin tuyển dụng,quyền lợi',
    key_takeaways = 'Có thể đánh giá tin tuyển dụng trước khi nộp hồ sơ
Bạn được trao đổi hỗ trợ hợp lý khi cần
Chuẩn bị hồ sơ rõ ràng giúp giảm rào cản trong vòng tuyển chọn',
    content = 'Tìm việc hiệu quả không chỉ là gửi nhiều hồ sơ. Hãy chọn tin tuyển dụng có thông tin rõ ràng, form dễ dùng và ngôn ngữ tôn trọng. Khi thấy phù hợp, chuẩn bị CV ngắn gọn và email giới thiệu có cấu trúc.

Bạn có quyền hỏi về hỗ trợ tiếp cận trong quá trình ứng tuyển. Không bắt buộc phải tiết lộ chi tiết y tế nếu bạn chưa sẵn sàng.',
    action_steps = 'Liệt kê 5–10 vị trí phù hợp năng lực và nhu cầu hỗ trợ
Đọc kỹ mô tả công việc và điều kiện làm việc
Dùng checklist tin tuyển dụng bên dưới để lọc tin phù hợp
Chuẩn bị CV và email ngắn gọn cho từng vị trí
Ghi chú câu hỏi về hỗ trợ trước khi phỏng vấn',
    checklist = 'Tiêu đề và mô tả công việc rõ ràng, không mơ hồ
Nêu hình thức làm việc (tại chỗ, kết hợp, từ xa)
Form ứng tuyển có nhãn và thông báo lỗi dễ hiểu
Ngôn ngữ tôn trọng, không gây kỳ thị
Có kênh liên hệ khi cần hỗ trợ thêm
Có thông tin về quy trình tuyển dụng cơ bản',
    wcag_refs = '3.1.5, 2.4.6',
    example_title = 'Email giới thiệu ngắn khi ứng tuyển',
    example_context = 'Dùng khi bạn muốn gửi email kèm CV cho vị trí đã chọn.',
    example_content = 'Kính gửi Anh/Chị phụ trách tuyển dụng,

Em tên [Họ tên], quan tâm vị trí [Tên vị trí] tại [Tên công ty]. Em đính kèm CV và sẵn sàng trao đổi thêm về kinh nghiệm liên quan.

Nếu cần, em có thể làm việc theo hình thức [tại chỗ/kết hợp/từ xa]. Em cũng mong được trao đổi về hỗ trợ tiếp cận phù hợp nếu buổi phỏng vấn hoặc bài kiểm tra cần điều chỉnh.

Em cảm ơn Anh/Chị đã xem hồ sơ.

Trân trọng,
[Họ tên]
[Số điện thoại]',
    example_note = 'Bạn nên chỉnh lại nội dung theo tình huống cá nhân và chỉ chia sẻ thông tin mà bạn cảm thấy cần thiết.',
    source_name = 'ILO — Disability and Work',
    source_url = 'https://www.ilo.org/global/topics/disability-and-work',
    is_featured = FALSE,
    sort_order = 11
WHERE id = 2;

UPDATE resources SET
    summary = 'Cách dùng Tab, Enter và Esc để điều hướng website tuyển dụng mà không cần chuột.',
    resource_type = 'guide',
    difficulty_level = 'basic',
    estimated_read_minutes = 6,
    audience = 'Người dùng bàn phím
Người thị lực kém
Người mới làm quen screen reader',
    tags = 'bàn phím,điều hướng,focus',
    key_takeaways = 'Tab di chuyển qua các mục tương tác theo thứ tự hợp lý
Enter kích hoạt nút và liên kết đang focus
Focus visible giúp biết bạn đang ở đâu trên trang',
    content = 'Hầu hết website có thể dùng bằng bàn phím. Phím Tab chuyển focus tới liên kết, nút và ô nhập. Shift+Tab đi ngược lại. Enter mở liên kết hoặc gửi form. Esc đóng hộp thoại hoặc menu.

Khi tìm việc, thử điều hướng trang danh sách việc làm và form ứng tuyển chỉ bằng bàn phím. Nếu bị kẹt hoặc không thấy vị trí focus, đó là dấu hiệu trang chưa thân thiện.',
    action_steps = 'Mở trang tuyển dụng và nhấn Tab liên tục để xem thứ tự focus
Thử mở menu bằng Enter và đóng bằng Esc
Điền thử form và kiểm tra thông báo lỗi có đọc được không
Ghi lại chỗ khó dùng để báo phản hồi cho nhà tuyển dụng',
    checklist = 'Có thể tab tới mọi nút và liên kết quan trọng
Focus hiển thị rõ khi di chuyển
Không bị kẹt trong vùng nào đó (focus trap ngoài ý muốn)
Menu mở/đóng được bằng bàn phím
Form gửi được bằng Enter khi phù hợp
Skip link hoặc cách nhảy nhanh tới nội dung chính (nếu có)',
    wcag_refs = '2.1.1, 2.4.7, 2.4.11',
    example_title = NULL,
    example_context = NULL,
    example_content = NULL,
    example_note = NULL,
    source_name = 'WebAIM — Keyboard Accessibility',
    source_url = 'https://webaim.org/articles/keyboard/',
    is_featured = FALSE,
    sort_order = 12
WHERE id = 3;

UPDATE resources SET
    summary = 'Gợi ý bố cục CV Word dễ đọc bằng screen reader và khi in ấn.',
    resource_type = 'template',
    difficulty_level = 'basic',
    estimated_read_minutes = 5,
    audience = 'Người tìm việc cần CV định dạng văn bản
Người dùng screen reader
Người cần in CV để nộp trực tiếp',
    tags = 'CV,mẫu,hồ sơ',
    key_takeaways = 'Dùng heading Word thay vì chỉ in đậm cỡ chữ
Một cột, thứ tự đọc từ trên xuống rõ ràng
Tránh truyền thông tin chỉ bằng màu sắc',
    content = 'CV accessible nên là file Word hoặc PDF có cấu trúc. Mỗi phần (Thông tin liên hệ, Kinh nghiệm, Kỹ năng) dùng Heading 1 hoặc Heading 2. Liệt kê kinh nghiệm theo thời gian, mỗi mục một đoạn ngắn.

Tránh bảng phức tạp và hình trang trí không có mô tả. Nếu có liên kết portfolio, ghi URL đầy đủ dạng văn bản.',
    action_steps = 'Tạo file Word mới với lề và cỡ chữ dễ đọc (12pt trở lên)
Đặt heading cho từng phần chính
Viết kinh nghiệm dạng gạch đầu dòng ngắn
Kiểm tra thứ tự đọc bằng Tab hoặc screen reader
Xuất PDF có cấu trúc nếu nhà tuyển dụng yêu cầu',
    checklist = 'Mỗi phần có heading rõ (không chỉ in đậm)
Thông tin liên hệ ở đầu, dễ tìm
Không dùng màu là cách duy nhất phân biệt mục
Không có bảng nhiều cột khó đọc
Tên file mô tả rõ (vi-du-ho-ten-cv.docx)
Đã đọc thử toàn bộ CV bằng bàn phím hoặc screen reader',
    wcag_refs = '1.3.1, 1.4.3',
    example_title = 'Mẫu mục Kinh nghiệm trong CV',
    example_context = 'Dùng khi mô tả một công việc đã làm — chỉnh lại cho đúng thực tế của bạn.',
    example_content = 'Nhân viên hỗ trợ khách hàng — Công ty ABC (2022–2024)

- Trả lời email và chat khách hàng, trung bình 40 phiên/ngày.
- Ghi chú yêu cầu vào hệ thống theo mẫu có sẵn.
- Phối hợp nhóm để xử lý ca tăng đột biến.

Kết quả: duy trì mức hài lòng khách hàng ổn định trong 6 tháng liên tiếp.',
    example_note = 'Bạn nên chỉnh lại nội dung theo tình huống cá nhân và chỉ chia sẻ thông tin mà bạn cảm thấy cần thiết.',
    source_name = 'Microsoft Accessibility',
    source_url = 'https://www.microsoft.com/en-us/accessibility/',
    is_featured = FALSE,
    sort_order = 13
WHERE id = 4;

UPDATE resources SET
    summary = 'Hướng dẫn viết CV rõ ràng, dễ đọc và nộp hồ sơ online mà không gặp rào cản kỹ thuật.',
    resource_type = 'guide',
    difficulty_level = 'basic',
    estimated_read_minutes = 7,
    audience = 'Người tìm việc
Người dùng screen reader
Người nộp hồ sơ qua website tuyển dụng',
    tags = 'CV,hồ sơ,nộp online',
    key_takeaways = 'Chia CV bằng heading rõ ràng thay vì chỉ định dạng trang trí
Tránh truyền đạt thông tin chỉ bằng màu sắc
Kiểm tra form nộp hồ sơ bằng bàn phím trước khi gửi',
    content = 'CV tốt cho người khuyết tật không khác CV tốt nói chung: ngắn gọn, có cấu trúc, dễ quét. Dùng tiêu đề phần rõ ràng. Mỗi kinh nghiệm nêu vai trò, việc đã làm và kết quả nếu có.

Khi nộp online, đọc nhãn từng ô, kiểm tra thông báo lỗi và lưu bản nháp nếu form cho phép. Nếu upload file, đặt tên file dễ hiểu.',
    action_steps = 'Liệt kê 3–5 kinh nghiệm liên quan vị trí ứng tuyển
Viết CV theo cấu trúc heading trong Word hoặc trình soạn thảo
Đọc lại CV bằng screen reader hoặc đọc to từng dòng
Mở form ứng tuyển và thử điền bằng Tab
Gửi hồ sơ và lưu email xác nhận nếu có',
    checklist = 'CV không quá 2 trang (trừ lĩnh vực yêu cầu dài hơn)
Mỗi phần có tiêu đề rõ
Không có thông tin quan trọng chỉ thể hiện bằng màu
Form có nhãn cho mọi ô bắt buộc
Đã kiểm tra file đính kèm mở được
Có bản sao CV và thư ứng tuyển đã lưu',
    wcag_refs = '1.3.1, 3.3.2, 2.4.6',
    example_title = 'Đoạn giới thiệu bản thân trong CV',
    example_context = 'Đặt ở đầu CV, dưới thông tin liên hệ — 2–3 câu về hướng đi nghề nghiệp.',
    example_content = 'Tôi có 3 năm kinh nghiệm hỗ trợ khách hàng qua email và chat. Tôi quen làm việc theo quy trình, ghi chép rõ ràng và phối hợp nhóm tốt. Tôi đang tìm vị trí [tên vị trí] tại [khu vực hoặc hình thức làm việc], nơi có thể phát huy kỹ năng giao tiếp và học thêm công cụ mới.',
    example_note = 'Bạn nên chỉnh lại nội dung theo tình huống cá nhân và chỉ chia sẻ thông tin mà bạn cảm thấy cần thiết.',
    source_name = 'W3C WAI — How People Use the Web',
    source_url = 'https://www.w3.org/WAI/people-use-web/',
    is_featured = TRUE,
    sort_order = 1
WHERE id = 5;

UPDATE resources SET
    summary = 'Checklist chuẩn bị kỹ thuật và mẫu email trao đổi hỗ trợ trước phỏng vấn online.',
    resource_type = 'checklist',
    difficulty_level = 'basic',
    estimated_read_minutes = 6,
    audience = 'Ứng viên phỏng vấn trực tuyến
Người cần phụ đề hoặc hỗ trợ âm thanh
Người dùng screen reader trong buổi họp',
    tags = 'phỏng vấn,online,hỗ trợ',
    key_takeaways = 'Kiểm tra mic, loa và ánh sáng trước giờ phỏng vấn
Có thể xin link họp và tài liệu trước buổi phỏng vấn
Nên hỏi trước định dạng bài kiểm tra kỹ năng nếu có',
    content = 'Phỏng vấn online cần chuẩn bị cả kỹ thuật lẫn nội dung. Hãy thử phần mềm họp trước, kiểm tra kết nối và chọn chỗ yên tĩnh. Nếu cần phụ đề, phiên dịch hoặc thêm thời gian đọc câu hỏi, hãy email trước — đây là yêu cầu hợp lý.

Trong buổi phỏng vấn, bạn có thể xin nhắc lại câu hỏi hoặc gửi câu trả lời bằng chat nếu nền tảng hỗ trợ.',
    action_steps = 'Thử mic, camera và kết nối mạng 24 giờ trước
Gửi email xác nhận giờ phỏng vấn và hỏi về hỗ trợ cần thiết
Tải trước tài liệu nhà tuyển dụng gửi (nếu có)
Chuẩn bị 3 câu hỏi ngược lại về công việc
Vào phòng họp sớm 5 phút để kiểm tra âm thanh',
    checklist = 'Mic và loa hoạt động ổn định
Ánh sáng đủ để nhìn rõ (nếu bật camera)
Đã có link họp và mật khẩu (nếu cần)
Phụ đề hoặc ghi chú hỗ trợ đã bật/thử
Tài liệu mở được bằng công cụ bạn dùng
Có nước và giấy ghi chú bên cạnh',
    wcag_refs = '1.4.2, 3.3.7',
    example_title = 'Email trao đổi hỗ trợ trước phỏng vấn',
    example_context = 'Gửi sau khi nhận lịch phỏng vấn, trước 1–2 ngày.',
    example_content = 'Em cảm ơn Anh/Chị đã sắp xếp buổi phỏng vấn. Để em có thể tham gia buổi phỏng vấn thuận lợi hơn, em xin phép được trao đổi trước về một số hỗ trợ tiếp cận cần thiết. Nếu buổi phỏng vấn diễn ra trực tuyến, em mong nhận được đường link họp và tài liệu liên quan trước buổi phỏng vấn. Nếu có phần kiểm tra kỹ năng, em mong được thông báo trước về định dạng bài kiểm tra để chuẩn bị công cụ hỗ trợ phù hợp.',
    example_note = 'Bạn nên chỉnh lại nội dung theo tình huống cá nhân và chỉ chia sẻ thông tin mà bạn cảm thấy cần thiết.',
    source_name = 'ILO — Disability and Work',
    source_url = 'https://www.ilo.org/global/topics/disability-and-work',
    is_featured = TRUE,
    sort_order = 2
WHERE id = 6;

UPDATE resources SET
    summary = 'Mẹo quản lý thời gian, giao tiếp và thiết lập không gian làm việc tại nhà hiệu quả.',
    resource_type = 'guide',
    difficulty_level = 'intermediate',
    estimated_read_minutes = 7,
    audience = 'Người làm việc từ xa
Người cần lịch làm việc linh hoạt
Ứng viên ứng tuyển vị trí remote',
    tags = 'làm từ xa,thời gian,giao tiếp',
    key_takeaways = 'Chia ngày thành khối công việc có nghỉ ngắn
Giao tiếp rõ deadline và cách báo cáo tiến độ
Thiết lập góc làm việc giảm ồn và mỏi mắt',
    content = 'Làm việc từ xa đòi hỏi kỷ luật và giao tiếp chủ động. Hãy thống nhất giờ họp, kênh chat và thời gian phản hồi với nhóm. Dùng lịch để chặn thời gian tập trung và nghỉ giữa ca.

Nếu cần công cụ hỗ trợ (phụ đề cuộc gọi, phần mềm đọc màn hình), trao đổi sớm với quản lý để được cài đặt hoặc cấp quyền truy cập.',
    action_steps = 'Thống nhất giờ làm việc và kênh liên lạc chính với nhóm
Lập lịch 2–3 khối công việc sâu mỗi ngày
Chuẩn bị góc làm việc: ghế, ánh sáng, tai nghe
Ghi lại việc đã xong cuối ngày để báo cáo ngắn
Đánh giá lại sau 2 tuần và điều chỉnh thói quen',
    checklist = 'Có lịch họp cố định hoặc lịch linh hoạt đã thống nhất
Biết ai liên hệ khi gặp sự cố kỹ thuật
Có kế hoạch nghỉ giữa ca
Tài liệu công việc lưu đúng thư mục dùng chung
Mic/headphone đủ dùng cho cuộc gọi
Đã thử phần mềm làm việc chính bằng bàn phím',
    wcag_refs = NULL,
    example_title = NULL,
    example_context = NULL,
    example_content = NULL,
    example_note = NULL,
    source_name = 'WebAIM',
    source_url = 'https://webaim.org/',
    is_featured = FALSE,
    sort_order = 14
WHERE id = 7;

UPDATE resources SET
    summary = 'Tổng hợp quyền được hỗ trợ hợp lý, chống phân biệt và kênh khiếu nại cơ bản khi đi làm.',
    resource_type = 'article',
    difficulty_level = 'intermediate',
    estimated_read_minutes = 8,
    audience = 'Người khuyết tật đang tìm việc hoặc mới đi làm
Người cần hiểu quyền cơ bản tại nơi làm việc
Người hỗ trợ tư vấn việc làm',
    tags = 'quyền lợi,lao động,pháp lý',
    key_takeaways = 'Bạn có quyền được xem xét hỗ trợ hợp lý khi cần
Phân biệt đối xử trong tuyển dụng thường bị cấm theo quy định hiện hành
Nên ghi chép sự việc và tìm kênh khiếu nại phù hợp',
    content = 'Quyền lao động của người khuyết tật phụ thuộc luật từng quốc gia, nhưng nguyên tắc chung là cơ hội việc làm bình đẳng và hỗ trợ hợp lý. Hỗ trợ hợp lý có thể là thiết bị, phần mềm, điều chỉnh giờ hoặc hình thức làm việc — miễn không gây gánh nặng quá mức cho người sử dụng lao động.

Nếu gặp phân biệt, hãy lưu email, mô tả sự việc và tìm hiểu cơ quan hoặc tổ chức hỗ trợ tại địa phương. Thông tin dưới đây mang tính tham khảo, không thay thế tư vấn pháp lý.',
    action_steps = 'Ghi lại yêu cầu hỗ trợ cụ thể bạn cần tại công việc
Tìm hiểu chính sách nội bộ công ty về đa dạng và hòa nhập
Lưu bằng chứng nếu bị từ chối hỗ trợ không rõ lý do
Liên hệ tổ chức lao động hoặc cơ quan có thẩm quyền nếu cần
Trao đổi với người tin cậy trước khi khiếu nại',
    checklist = 'Đã nêu rõ hỗ trợ cần thiết (không bắt buộc tiết lộ y tế chi tiết)
Có email hoặc biên bản trao đổi với nhà tuyển dụng
Biết ai là người phụ trách nhân sự
Đã đọc hợp đồng hoặc thỏa thuận cơ bản
Biết deadline khiếu nại (nếu có quy định)
Có nguồn tư vấn pháp lý địa phương khi cần',
    wcag_refs = NULL,
    example_title = NULL,
    example_context = NULL,
    example_content = NULL,
    example_note = NULL,
    source_name = 'ILO — Disability and Work',
    source_url = 'https://www.ilo.org/global/topics/disability-and-work',
    is_featured = FALSE,
    sort_order = 15
WHERE id = 8;

UPDATE resources SET
    summary = 'Giới thiệu NVDA, JAWS, VoiceOver và cách bắt đầu luyện đọc nội dung web tuyển dụng.',
    resource_type = 'tool',
    difficulty_level = 'basic',
    estimated_read_minutes = 7,
    audience = 'Người mới dùng screen reader
Người thị lực kém
Người muốn kiểm tra trang web bằng công cụ đọc màn hình',
    tags = 'screen reader,NVDA,VoiceOver',
    key_takeaways = 'NVDA miễn phí trên Windows, phổ biến cho người mới
VoiceOver có sẵn trên macOS và iOS
JAWS thường dùng trong môi trường doanh nghiệp',
    content = 'Screen reader đọc nội dung màn hình bằng giọng nói hoặc braille. Trên Windows, NVDA là lựa chọn miễn phí phổ biến. Trên Mac/iPhone, VoiceOver tích hợp sẵn. JAWS thường gặp ở công ty lớn.

Bắt đầu bằng cách mở trang tuyển dụng đơn giản, dùng phím tắt để đọc từng dòng và liệt kê liên kết. Ghi chú chỗ đọc không rõ để đánh giá chất lượng trang.',
    action_steps = 'Cài NVDA (Windows) hoặc bật VoiceOver (Mac) theo hướng dẫn chính thức
Mở trang AccessJob Hub và luyện đọc menu
Thử điền form đơn giản bằng screen reader
So sánh hai trang tuyển dụng về độ dễ đọc
Ghi lại phím tắt bạn dùng nhiều nhất',
    checklist = 'Đã cài hoặc bật screen reader thành công
Biết phím tắt dừng/đọc tiếp
Đọc được tiêu đề trang và heading chính
Liệt kê được các liên kết quan trọng
Form có nhãn đọc được khi focus
Đã thử tắt/bật lại khi cần làm việc khác',
    wcag_refs = '4.1.2',
    example_title = NULL,
    example_context = NULL,
    example_content = NULL,
    example_note = NULL,
    source_name = 'WebAIM — Screen Reader Testing',
    source_url = 'https://webaim.org/articles/screenreader_testing/',
    is_featured = FALSE,
    sort_order = 16
WHERE id = 9;

UPDATE resources SET
    summary = 'Gợi ý cách trình bày yêu cầu hỗ trợ hợp lý trong email hoặc form mà không tiết lộ quá nhiều thông tin cá nhân.',
    resource_type = 'guide',
    difficulty_level = 'basic',
    estimated_read_minutes = 5,
    audience = 'Ứng viên cần hỗ trợ trong phỏng vấn hoặc làm bài test
Người dùng screen reader hoặc bàn phím
Người cần thêm thời gian hoặc định dạng khác',
    tags = 'hỗ trợ,ứng tuyển,tiếp cận',
    key_takeaways = 'Chỉ nêu hỗ trợ cần thiết cho công việc hoặc buổi phỏng vấn
Không bắt buộc mô tả chi tiết tình trạng y tế
Có thể gửi yêu cầu bằng email trước khi phỏng vấn',
    content = 'Khi ứng tuyển, bạn có thể yêu cầu hỗ trợ hợp lý: tài liệu gửi trước, phụ đề, thêm thời gian, phỏng vấn bằng chat, hoặc bài test dạng văn bản. Hãy mô tả ngắn gọn điều bạn cần để tham gia công bằng.

Bạn không phải giải thích đầy đủ khuyết tật. Tập trung vào rào cản cụ thể và giải pháp đề xuất.',
    action_steps = 'Liệt kê 1–3 hỗ trợ bạn cần cho vòng tuyển chọn
Viết email ngắn theo mẫu bên dưới
Gửi sau khi nhận lịch phỏng vấn hoặc khi form hỏi nhu cầu hỗ trợ
Giữ bản sao email đã gửi
Chuẩn bị phương án thay thế nếu công ty chưa có sẵn công cụ',
    checklist = 'Đã nêu rõ hỗ trợ cần cho buổi phỏng vấn hoặc bài test
Không chia sẻ thông tin y tế nếu chưa muốn
Email ngắn gọn, lịch sự
Đã hỏi về định dạng bài kiểm tra nếu có
Có phương án dự phòng (ví dụ ghi âm, chat)
Lưu phản hồi từ nhà tuyển dụng',
    wcag_refs = '3.3.7',
    example_title = 'Đoạn mô tả nhu cầu hỗ trợ trong form hoặc email',
    example_context = 'Dùng khi form hỏi “nhu cầu hỗ trợ đặc biệt” hoặc khi email trước phỏng vấn.',
    example_content = 'Để tôi tham gia phỏng vấn và hoàn thành bài kiểm tra kỹ năng một cách thuận lợi, tôi mong được hỗ trợ như sau: (1) gửi đề bài và tài liệu trước ít nhất 24 giờ; (2) cho phép sử dụng phần mềm đọc màn hình khi làm bài trên máy tính; (3) nếu có phần trình bày, tôi mong được hỏi câu bằng văn bản hoặc chat song song. Tôi sẵn sàng trao đổi thêm để tìm phương án phù hợp cho cả hai bên.',
    example_note = 'Bạn nên chỉnh lại nội dung theo tình huống cá nhân và chỉ chia sẻ thông tin mà bạn cảm thấy cần thiết.',
    source_name = 'W3C WAI — Planning for Accessibility',
    source_url = 'https://www.w3.org/WAI/planning/',
    is_featured = TRUE,
    sort_order = 3
WHERE id = 10;
