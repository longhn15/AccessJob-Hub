import type { ResourceGuide } from '../types/resourceGuide'

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    resourceId: 1,
    title: 'WCAG 2.2 — Tổng quan tiêu chuẩn',
    type: 'Bài viết',
    level: 'Trung bình',
    readingMinutes: 12,
    audience: [
      'Người mới học accessibility',
      'Người làm nội dung web',
      'Ứng viên muốn hiểu tiêu chuẩn nhà tuyển dụng hay nhắc tới',
    ],
    summary:
      'Tài liệu này giúp bạn nắm khung WCAG 2.2 ở mức tổng quan: nguyên tắc POUR, các nhóm tiêu chí thường gặp khi đánh giá website và cách dùng làm ngôn ngữ chung với nhà tuyển dụng — không thay thế đánh giá chuyên gia.',
    outcomes: [
      'Hiểu bốn nguyên tắc Perceivable, Operable, Understandable, Robust (POUR).',
      'Biết các nhóm tiêu chí hay được nhắc trong tin tuyển dụng liên quan accessibility.',
      'Có từ vựng cơ bản để đọc mô tả công việc hoặc yêu cầu hỗ trợ tiếp cận.',
    ],
    quickSteps: [
      'Đọc phần giới thiệu WCAG 2.2 trên trang W3C WAI.',
      'Ghi chú 3–5 tiêu chí bạn quan tâm nhất (ví dụ: bàn phím, contrast, nhãn form).',
      'Đối chiếu với trang web hoặc form ứng tuyển bạn hay dùng.',
      'Ghi lại câu hỏi muốn hỏi nhà tuyển dụng về hỗ trợ tiếp cận.',
    ],
    checklist: [
      'Tôi biết WCAG là hướng dẫn, không phải luật — mức áp dụng tùy bối cảnh.',
      'Tôi phân biệt được yêu cầu về nội dung và yêu cầu về giao diện.',
      'Tôi có thể mô tả vì sao heading và nhãn form quan trọng.',
      'Tôi không tự claim website “đạt WCAG” nếu chưa được đánh giá.',
      'Tôi biết nơi tra cứu bản dịch/tóm tắt tiếng Việt nếu cần.',
    ],
    wcagRefs: ['WCAG 2.2 — Tổng quan (W3C WAI)', 'POUR — Perceivable, Operable, Understandable, Robust'],
    relatedResourceIds: [3, 9, 10],
  },
  {
    resourceId: 2,
    title: 'Hướng dẫn tìm việc cho người khuyết tật',
    type: 'Hướng dẫn',
    level: 'Cơ bản',
    readingMinutes: 8,
    audience: [
      'Người khuyết tật đang tìm việc',
      'Người hỗ trợ tìm việc (gia đình, cố vấn nghề nghiệp)',
      'Người chuyển ngành cần làm quen quy trình ứng tuyển',
    ],
    summary:
      'Gợi ý thực tế để chuẩn bị hồ sơ, phỏng vấn và trao đổi nhu cầu hỗ trợ hợp lý với nhà tuyển dụng — tập trung quyền được tham gia bình đẳng, không mang giọng điệu thương hại.',
    outcomes: [
      'Lập kế hoạch tìm việc theo năng lực và nhu cầu hỗ trợ tiếp cận của bạn.',
      'Chuẩn bị câu hỏi về môi trường làm việc và công cụ hỗ trợ.',
      'Biết khi nào nên yêu cầu điều chỉnh hợp lý trong quy trình tuyển dụng.',
    ],
    quickSteps: [
      'Liệt kê kỹ năng cốt lõi và hình thức làm việc phù hợp (tại văn phòng, từ xa, hybrid).',
      'Chuẩn bị CV dễ đọc (xem hướng dẫn CV accessible).',
      'Tìm tin tuyển dụng có mô tả hỗ trợ tiếp cận rõ ràng.',
      'Luyện tập giới thiệu bản thân và nhu cầu hỗ trợ bằng ngôn ngữ trung lập.',
    ],
    checklist: [
      'CV có heading và thứ tự đọc logic.',
      'Tôi đã chuẩn bị 2–3 câu mô tả nhu cầu hỗ trợ (nếu muốn chia sẻ).',
      'Tôi biết quyền không bị hỏi chi tiết y tế không liên quan công việc.',
      'Tôi có phương án dự phòng cho phỏng vấn online (phụ đề, âm thanh).',
      'Tôi ghi chú câu hỏi muốn hỏi về hỗ trợ làm việc từ xa hoặc tại văn phòng.',
    ],
    wcagRefs: ['Liên quan tiêu chí về thông tin dễ hiểu khi đọc tin tuyển dụng'],
    relatedResourceIds: [5, 6, 8],
  },
  {
    resourceId: 3,
    title: 'Thực hành điều hướng bằng bàn phím',
    type: 'Hướng dẫn',
    level: 'Cơ bản',
    readingMinutes: 6,
    audience: [
      'Người dùng bàn phím',
      'Người dùng screen reader',
      'Người mới làm quen web accessibility',
    ],
    summary:
      'Luyện Tab, Enter, Esc và nhận biết focus visible — kỹ năng nền để đánh giá website, form ứng tuyển và công cụ làm việc có dùng được không cần chuột.',
    outcomes: [
      'Di chuyển qua liên kết, nút và form chỉ bằng bàn phím.',
      'Nhận ra khi focus bị kẹt hoặc không nhìn thấy vùng đang chọn.',
      'Kiểm tra nhanh một trang web trước khi nộp hồ sơ quan trọng.',
    ],
    quickSteps: [
      'Mở trang cần kiểm tra, bấm Tab để đi qua các phần tử tương tác.',
      'Quan sát viền focus — có rõ, có đủ contrast không.',
      'Thử Enter để kích hoạt nút/link; Esc để đóng hộp thoại nếu có.',
      'Ghi lại chỗ không tab được hoặc focus biến mất.',
    ],
    checklist: [
      'Mọi nút và link quan trọng đều tới được bằng Tab.',
      'Thứ tự Tab hợp lý (trên xuống, trái sang phải).',
      'Focus visible không chỉ đổi màu mờ.',
      'Form có thể gửi bằng bàn phím.',
      'Không có bẫy bàn phím (keyboard trap) trong modal/menu.',
    ],
    wcagRefs: ['WCAG 2.2 — Operable (điều hướng bàn phím)', 'Focus visible (2.4.11 / 2.4.7)'],
    relatedResourceIds: [1, 9, 10],
  },
  {
    resourceId: 4,
    title: 'Mẫu CV accessible (Word)',
    type: 'Mẫu tài liệu',
    level: 'Cơ bản',
    readingMinutes: 5,
    audience: [
      'Người tìm việc dùng Word',
      'Người dùng screen reader khi nộp CV',
      'Người cần CV in ấn rõ ràng',
    ],
    summary:
      'Gợi ý bố cục CV trong Word với heading, danh sách và bảng đơn giản — tránh truyền đạt thông tin chỉ bằng màu hoặc vị trí trên trang.',
    outcomes: [
      'Dùng Styles Heading thay vì chỉ in đậm cỡ chữ.',
      'Tạo CV đọc được tốt bằng screen reader và khi chuyển PDF.',
      'Tránh lỗi thường gặp khiến nhà tuyển dụng khó đọc hồ sơ.',
    ],
    quickSteps: [
      'Đặt tiêu đề các mục bằng Heading 1/2 trong Word.',
      'Dùng bullet cho kỹ năng và kinh nghiệm, không xếp cột ẩn nghĩa.',
      'Kiểm tra thứ tự đọc bằng Navigation Pane hoặc screen reader.',
      'Xuất PDF và đọc thử một lần trước khi gửi.',
    ],
    checklist: [
      'Mỗi mục lớn có heading, không chỉ chữ to đậm.',
      'Không dùng màu là tín hiệu duy nhất (ví dụ: đỏ = bắt buộc).',
      'Bảng đơn giản, có header cột rõ.',
      'Tên file mô tả (ví dụ: HoTen_CV_ViTri.pdf).',
      'Ảnh trang trí (nếu có) có mô tả phù hợp hoặc bỏ nếu không cần.',
    ],
    relatedResourceIds: [5, 2, 10],
  },
  {
    resourceId: 5,
    title: 'Hướng dẫn viết CV accessible',
    type: 'Checklist',
    level: 'Cơ bản',
    readingMinutes: 7,
    audience: [
      'Người tìm việc',
      'Người dùng công nghệ hỗ trợ',
      'Sinh viên mới ra trường',
    ],
    summary:
      'Checklist viết CV dễ đọc trên màn hình và khi in — phù hợp nộp hồ sơ online qua form hoặc email, đặc biệt khi nhà tuyển dụng dùng phần mềm đọc màn hình.',
    outcomes: [
      'Chia CV thành section có tiêu đề rõ (Kinh nghiệm, Kỹ năng, Học vấn).',
      'Viết mô tả kinh nghiệm ngắn, có động từ hành động.',
      'Tránh bố cục khiến thứ tự đọc bị đảo khi phóng to hoặc đọc bằng máy.',
    ],
    quickSteps: [
      'Bắt đầu bằng thông tin liên hệ và tóm tắt 2–3 dòng.',
      'Liệt kê kinh nghiệm theo thời gian, mỗi mục 3–5 gạch đầu dòng.',
      'Tách kỹ năng cứng/mềm; không nhồi vào một đoạn dài.',
      'Đọc lại bằng giọng to hoặc screen reader trước khi gửi.',
    ],
    checklist: [
      'Font đủ lớn (tối thiểu ~11pt khi in, tương đương dễ đọc trên web).',
      'Contrast chữ/nền đủ rõ.',
      'Link email/LinkedIn là text có thể kích hoạt, không chỉ icon.',
      'Không dùng hình ảnh thay cho đoạn văn quan trọng.',
      'PDF xuất từ nguồn có cấu trúc heading (không chỉ scan ảnh).',
      'Tên riêng và chức danh viết nhất quán.',
    ],
    wcagRefs: ['Thông tin dễ đọc — liên quan Perceivable / Understandable'],
    relatedResourceIds: [4, 10, 2],
  },
  {
    resourceId: 6,
    title: 'Chuẩn bị phỏng vấn online',
    type: 'Checklist',
    level: 'Cơ bản',
    readingMinutes: 6,
    audience: [
      'Ứng viên phỏng vấn trực tuyến',
      'Người cần phụ đề hoặc phiên dịch',
      'Người làm việc từ xa lần đầu',
    ],
    summary:
      'Checklist trước giờ phỏng vấn online: âm thanh, ánh sáng, phụ đề, cách yêu cầu hỗ trợ và dự phòng khi nền tảng họp khó tiếp cận.',
    outcomes: [
      'Giảm rủi ro kỹ thuật làm gián đoạn phỏng vấn.',
      'Biết cách đề nghị phụ đề, nghỉ giữa phiên hoặc format câu hỏi rõ ràng.',
      'Có kế hoạch B nếu phần mềm họp không hỗ trợ bàn phím tốt.',
    ],
    quickSteps: [
      'Test mic, loa/ tai nghe và kết nối mạng trước 1 ngày.',
      'Đăng nhập sớm 10 phút; kiểm tra phụ đề/caption nếu có.',
      'Chuẩn bị ghi chú câu hỏi ở định dạng dễ đọc (font lớn, contrast cao).',
      'Thỏa thuận trước nếu cần người hỗ trợ hoặc thời gian trả lời thêm.',
    ],
    checklist: [
      'Phòng yên, ánh sáng đủ cho video (nếu bật camera).',
      'Có phương án chat/email nếu âm thanh lỗi.',
      'Biết phím tắt tắt/bật mic và camera trên nền tảng họp.',
      'Đã thông báo nhu cầu phụ đề hoặc phiên dịch (nếu cần).',
      'Có số điện thoại dự phòng liên hệ HR.',
      'Không chia sẻ thông tin y tế không cần thiết — chỉ nhu cầu hỗ trợ công việc.',
    ],
    relatedResourceIds: [7, 10, 2],
  },
  {
    resourceId: 7,
    title: 'Kỹ năng làm việc từ xa',
    type: 'Bài viết',
    level: 'Cơ bản',
    readingMinutes: 8,
    audience: [
      'Người ứng tuyển vị trí remote/hybrid',
      'Người khuyết tật cần linh hoạt địa điểm',
      'Người mới chuyển sang làm việc tại nhà',
    ],
    summary:
      'Mẹo quản lý thời gian, giao tiếp bằng chat/email và thiết lập không gian làm việc — giúp duy trì hiệu suất và yêu cầu hỗ trợ hợp lý khi làm việc từ xa.',
    outcomes: [
      'Thiết lập routine và ranh giới giờ làm/phục hồi.',
      'Giao tiếp rõ ràng qua kênh văn bản (tiêu đề, bullet, deadline).',
      'Nhận diện công cụ cần hỗ trợ tiếp cận (chat, ticket, họp online).',
    ],
    quickSteps: [
      'Chọn góc làm việc ổn định, hạn chế tiếng ồn nếu có thể.',
      'Dùng lịch chung và nhắc hạn cho task quan trọng.',
      'Viết tin nhắn ngắn, có ngữ cảnh — tránh chỉ gửi “ok”.',
      'Hỏi rõ kênh ưu tiên và thời gian phản hồi của team.',
    ],
    checklist: [
      'Tôi biết giờ họp cố định và giờ linh hoạt.',
      'Công cụ chat/email dùng được bằng bàn phím.',
      'Có nghỉ ngắn định kỳ, tránh làm việc liên tục quá lâu.',
      'Đã thử nền tảng họp của công ty trước ngày làm chính thức.',
      'Biết ai liên hệ khi cần điều chỉnh công việc hoặc công cụ.',
    ],
    relatedResourceIds: [6, 2, 9],
  },
  {
    resourceId: 8,
    title: 'Quyền lợi lao động của người khuyết tật',
    type: 'Bài viết',
    level: 'Trung bình',
    readingMinutes: 10,
    audience: [
      'Người khuyết tật đi làm hoặc tìm việc',
      'Người hỗ trợ tư vấn nghề nghiệp',
      'Ứng viên muốn hiểu hỗ trợ hợp lý (reasonable accommodation)',
    ],
    summary:
      'Tổng hợp khái niệm hỗ trợ hợp lý, chống phân biệt đối xử và kênh khiếu nại cơ bản — thông tin tham khảo, không thay thế tư vấn pháp lý chuyên sâu.',
    outcomes: [
      'Phân biệt nhu cầu hỗ trợ tiếp cận và năng lực làm việc.',
      'Biết khi nào có thể đề nghị điều chỉnh quy trình tuyển dụng hoặc môi trường làm việc.',
      'Ghi nhận dấu hiệu phân biệt đối xử để tìm hỗ trợ phù hợp.',
    ],
    quickSteps: [
      'Liệt kê rào cản cụ thể (vật lý, thông tin, công cụ) khi làm việc.',
      'Đề xuất giải pháp thay thế ngắn gọn, khả thi.',
      'Tra cứu chính sách nội bộ công ty và quy định liên quan tại địa phương.',
      'Lưu email/ biên bản trao đổi khi thỏa thuận hỗ trợ.',
    ],
    checklist: [
      'Tôi hiểu “hỗ trợ hợp lý” là điều chỉnh phù hợp, không phải ưu tiên không cần thiết.',
      'Tôi không bị buộc tiết lộ chẩn đoán để được xem xét hỗ trợ.',
      'Tôi biết kênh khiếu nại nội bộ hoặc cơ quan liên quan (nếu có).',
      'Tôi có bằng chứng văn bản khi cần theo dõi yêu cầu.',
      'Tôi tìm hiểu thêm từ nguồn ILO/W3C tham khảo, không tự suy diễn luật.',
    ],
    relatedResourceIds: [2, 10, 6],
  },
  {
    resourceId: 9,
    title: 'Công cụ screen reader phổ biến',
    type: 'Công cụ',
    level: 'Cơ bản',
    readingMinutes: 9,
    audience: [
      'Người mù hoặc thị lực kém',
      'Người mới học screen reader',
      'Người kiểm thử accessibility cơ bản',
    ],
    summary:
      'Giới thiệu NVDA, JAWS, VoiceOver và cách bắt đầu luyện đọc nội dung web — giúp bạn tự kiểm tra CV, form ứng tuyển hoặc trang tuyển dụng trước khi nộp.',
    outcomes: [
      'Chọn công cụ phù hợp hệ điều hành (Windows, macOS, mobile).',
      'Biết thao tác cơ bản: đọc liên tục, đọc theo phần tử, danh sách heading.',
      'Nhận ra lỗi thường gặp khiến screen reader đọc sai (nút không có tên, thiếu label).',
    ],
    quickSteps: [
      'Cài NVDA (Windows miễn phí) hoặc bật VoiceOver (macOS/iOS).',
      'Luyện đọc một trang tin tuyển dụng — nghe thứ tự heading.',
      'Thử điền form mẫu, kiểm tra label và thông báo lỗi.',
      'Ghi lại chỗ đọc “nút”, “link” không rõ nghĩa.',
    ],
    checklist: [
      'Tôi biết phím tắt dừng/đọc tiếp trên công cụ mình dùng.',
      'Heading trang có ý nghĩa, không nhảy cấp lung tung.',
      'Nút có tên (text hoặc aria-label), không chỉ icon.',
      'Thông báo lỗi form được đọc khi submit.',
      'Không tự kết luận website “hỗ trợ screen reader” chỉ sau một lần thử.',
    ],
    wcagRefs: ['WCAG — Compatible với công nghệ hỗ trợ (Robust)'],
    relatedResourceIds: [3, 5, 1],
  },
  {
    resourceId: 10,
    title: 'Cách mô tả nhu cầu hỗ trợ khi ứng tuyển',
    type: 'Hướng dẫn',
    level: 'Cơ bản',
    readingMinutes: 5,
    audience: [
      'Người khuyết tật đang nộp hồ sơ',
      'Người cần hỗ trợ trong phỏng vấn hoặc onboarding',
      'Ứng viên làm việc từ xa cần công cụ hỗ trợ',
    ],
    summary:
      'Mẫu câu và gợi ý trình bày yêu cầu hỗ trợ hợp lý trong email hoặc form — ngắn gọn, tập trung công việc, tôn trọng và trao quyền.',
    outcomes: [
      'Viết đoạn mô tả nhu cầu hỗ trợ trong 3–5 câu.',
      'Tránh ngôn ngữ tiêu cực hoặc xin lỗi không cần thiết.',
      'Đề xuất giải pháp cụ thể thay vì chỉ nêu vấn đề.',
    ],
    quickSteps: [
      'Mô tả công việc bạn sẽ làm và rào cản gặp phải (nếu có).',
      'Nêu hỗ trợ đã dùng hiệu quả (phần mềm, giờ làm, thiết bị).',
      'Đề xuất 1–2 phương án khả thi cho nhà tuyển dụng.',
      'Cảm ơn và sẵn sàng trao đổi thêm nếu cần.',
    ],
    checklist: [
      'Tôi không dùng từ ngữ thương hại hoặc tự hạ thấp bản thân.',
      'Tôi không tiết lộ thông tin y tế không liên quan.',
      'Tôi nêu rõ nhu cầu gắn với nhiệm vụ công việc.',
      'Tôi kiểm tra chính tả và độ dài phù hợp ô form.',
      'Tôi lưu bản sao email/form đã gửi.',
      'Tôi sẵn sàng thử nghiệm giải pháp thay thế nếu công ty đề xuất.',
    ],
    wcagRefs: ['Liên quan form accessible và thông tin dễ hiểu khi ứng tuyển online'],
    relatedResourceIds: [5, 6, 8],
  },
]

const guideByResourceId = new Map(RESOURCE_GUIDES.map((guide) => [guide.resourceId, guide]))

export function getResourceGuide(resourceId: number): ResourceGuide | undefined {
  return guideByResourceId.get(resourceId)
}

export function getRelatedGuides(relatedIds: number[] | undefined): ResourceGuide[] {
  if (!relatedIds?.length) return []
  return relatedIds
    .map((id) => guideByResourceId.get(id))
    .filter((guide): guide is ResourceGuide => guide !== undefined)
}
