import type {
  EmployerChecklistAnswers,
  EmployerChecklistCriterion,
  EmployerChecklistCriterionId,
  EmployerChecklistGroup,
  EmployerChecklistScore,
  EmployerRatingLevel,
} from '../types/employerChecklist'

export const EMPLOYER_CHECKLIST_GROUPS: EmployerChecklistGroup[] = [
  {
    id: 'job-description',
    title: 'Mô tả công việc rõ ràng',
    criteria: [
      {
        id: 'clear-main-tasks',
        label: 'Mô tả nhiệm vụ chính bằng ngôn ngữ đơn giản.',
        suggestion:
          'Viết nhiệm vụ hàng ngày bằng câu ngắn, tránh jargon — giúp ứng viên hiểu công việc thực tế.',
      },
      {
        id: 'required-vs-preferred',
        label: 'Phân biệt rõ yêu cầu bắt buộc và yêu cầu ưu tiên.',
        suggestion:
          "Tách rõ 'bắt buộc' và 'ưu tiên' để tránh loại trừ ứng viên không cần thiết.",
      },
      {
        id: 'avoid-vague-terms',
        label: 'Tránh thuật ngữ mơ hồ hoặc có giải thích nếu bắt buộc dùng.',
        suggestion:
          'Giải thích thuật ngữ chuyên ngành hoặc thay bằng mô tả cụ thể để mọi người hiểu đồng đều.',
      },
      {
        id: 'outcome-focused',
        label: 'Mô tả kết quả công việc kỳ vọng thay vì chỉ liệt kê kỹ năng chung chung.',
        suggestion:
          'Nêu kết quả mong đợi (vd: “hoàn thành báo cáo hàng tuần”) thay vì chỉ liệt kê tính cách.',
      },
    ],
  },
  {
    id: 'flexible-work',
    title: 'Hình thức làm việc linh hoạt',
    criteria: [
      {
        id: 'work-location-clear',
        label: 'Ghi rõ làm từ xa, hybrid hay tại văn phòng.',
        suggestion:
          'Nêu rõ hình thức làm việc ngay đầu tin để ứng viên đánh giá khả năng tiếp cận địa điểm.',
      },
      {
        id: 'hours-flexibility',
        label: 'Nêu rõ khung giờ làm việc hoặc mức độ linh hoạt.',
        suggestion:
          'Cho biết giờ cố định hay linh hoạt — hỗ trợ ứng viên cần điều chỉnh lịch vì y tế hoặc hỗ trợ cá nhân.',
      },
      {
        id: 'alt-contact-channel',
        label: 'Có kênh liên hệ thay thế ngoài gọi điện.',
        suggestion:
          'Hãy bổ sung email hoặc form liên hệ để ứng viên không thể gọi điện vẫn có thể trao đổi.',
      },
      {
        id: 'interview-adjustments',
        label: 'Cho biết quy trình phỏng vấn có thể điều chỉnh nếu ứng viên cần hỗ trợ.',
        suggestion:
          'Ghi rõ ứng viên có thể yêu cầu điều chỉnh phỏng vấn (thời gian, hình thức, hỗ trợ phiên dịch, v.v.).',
      },
    ],
  },
  {
    id: 'application-accessibility',
    title: 'Hỗ trợ tiếp cận trong quy trình ứng tuyển',
    criteria: [
      {
        id: 'clear-apply-link',
        label: 'Form/link ứng tuyển có tên rõ ràng.',
        suggestion:
          'Đặt tên nút/link ứng tuyển mô tả hành động (vd: “Ứng tuyển vị trí này”) thay vì “Click here”.',
      },
      {
        id: 'accessibility-contact',
        label: 'Có email hoặc kênh liên hệ để yêu cầu hỗ trợ tiếp cận.',
        suggestion:
          'Cung cấp email hoặc form để ứng viên yêu cầu hỗ trợ tiếp cận trong quá trình ứng tuyển.',
      },
      {
        id: 'no-complex-interactions',
        label: 'Không yêu cầu thao tác phức tạp không cần thiết.',
        suggestion:
          'Tránh kéo-thả, hover-only hoặc thao tác đa bước không cần thiết trong form ứng tuyển.',
      },
      {
        id: 'no-image-captcha',
        label: 'Không dùng CAPTCHA hình ảnh khó tiếp cận nếu chưa có phương án thay thế.',
        suggestion:
          'Tránh CAPTCHA chỉ dựa vào hình ảnh; nếu cần chống spam, dùng phương án dễ tiếp cận hơn.',
      },
    ],
  },
  {
    id: 'inclusive-workplace',
    title: 'Môi trường làm việc hòa nhập',
    criteria: [
      {
        id: 'workplace-description',
        label: 'Mô tả môi trường làm việc và công cụ sử dụng.',
        suggestion:
          'Mô tả ngắn về không gian làm việc, phần mềm và thiết bị để ứng viên đánh giá phù hợp.',
      },
      {
        id: 'disability-policy',
        label: 'Có nêu chính sách hỗ trợ người khuyết tật nếu có.',
        suggestion:
          'Nếu công ty có chính sách hỗ trợ, hãy tóm tắt trong tin tuyển dụng hoặc link tới trang chính sách.',
      },
      {
        id: 'non-discrimination',
        label: 'Có cam kết không phân biệt đối xử.',
        suggestion:
          'Thêm câu cam kết bình đẳng cơ hội — tín hiệu rõ ràng về môi trường hòa nhập.',
      },
      {
        id: 'no-unnecessary-physical',
        label: 'Tránh yêu cầu thể chất không cần thiết cho công việc.',
        suggestion:
          'Chỉ liệt kê yêu cầu thể chất thực sự cần thiết; tránh loại trừ ứng viên khuyết tật không liên quan.',
      },
    ],
  },
  {
    id: 'accessible-content',
    title: 'Nội dung tuyển dụng dễ tiếp cận',
    criteria: [
      {
        id: 'not-color-only',
        label: 'Không truyền đạt thông tin chỉ bằng màu sắc.',
        suggestion:
          'Kèm text hoặc biểu tượng có nhãn khi dùng màu để phân loại thông tin (vd: trạng thái, mức độ).',
      },
      {
        id: 'accessible-jd-format',
        label: 'Nếu có file JD/PDF, có bản text hoặc HTML accessible.',
        suggestion:
          'Nên cung cấp bản mô tả công việc dạng HTML/text để trình đọc màn hình xử lý tốt hơn.',
      },
      {
        id: 'clear-apply-link-text',
        label: 'Link ứng tuyển/link liên hệ có nội dung dễ hiểu.',
        suggestion:
          'Dùng văn bản link mô tả đích đến (vd: “Gửi hồ sơ qua email nhân sự”) thay vì URL thuần.',
      },
      {
        id: 'contrast-mobile-readable',
        label: 'Nội dung đủ contrast, dễ đọc trên mobile.',
        suggestion:
          'Kiểm tra tin trên màn hình nhỏ và zoom 200% — chữ đủ lớn, contrast cao, không tràn ngang.',
      },
    ],
  },
]

export const ALL_CRITERION_IDS: EmployerChecklistCriterionId[] = EMPLOYER_CHECKLIST_GROUPS.flatMap(
  (group) => group.criteria.map((c) => c.id),
)

export function createEmptyAnswers(): EmployerChecklistAnswers {
  return ALL_CRITERION_IDS.reduce(
    (acc, id) => {
      acc[id] = false
      return acc
    },
    {} as EmployerChecklistAnswers,
  )
}

function getLevel(percentage: number): {
  level: EmployerRatingLevel
  label: string
  meaning: string
} {
  if (percentage <= 40) {
    return {
      level: 'needs-improvement',
      label: 'Cần cải thiện',
      meaning:
        'Tin tuyển dụng còn nhiều điểm chưa thân thiện với người khuyết tật. Xem gợi ý bên dưới để cải thiện từng mục.',
    }
  }
  if (percentage <= 75) {
    return {
      level: 'fair',
      label: 'Khá',
      meaning:
        'Tin tuyển dụng đã có nền tảng hòa nhập tốt. Hoàn thiện thêm các mục còn thiếu để tăng khả năng tiếp cận.',
    }
  }
  return {
    level: 'good',
    label: 'Tốt',
    meaning:
      'Tin tuyển dụng thể hiện tinh thần hòa nhập mạnh. Tiếp tục duy trì và cập nhật khi quy trình thay đổi.',
  }
}

export function scoreEmployerChecklist(answers: EmployerChecklistAnswers): EmployerChecklistScore {
  const allCriteria = EMPLOYER_CHECKLIST_GROUPS.flatMap((group) => group.criteria)
  const maxScore = allCriteria.length
  const strengths: EmployerChecklistCriterion[] = []
  const improvements: EmployerChecklistCriterion[] = []

  for (const criterion of allCriteria) {
    if (answers[criterion.id]) {
      strengths.push(criterion)
    } else {
      improvements.push(criterion)
    }
  }

  const totalScore = strengths.length
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
  const { level, label, meaning } = getLevel(percentage)

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    levelLabel: label,
    levelMeaning: meaning,
    strengths,
    improvements,
  }
}
