export type WcagLevel = 'A' | 'AA' | 'AAA'

export type ConformanceStatus =
  | 'met'
  | 'partial'
  | 'not-applicable'
  | 'planned'

export type TestingMethod =
  | 'keyboard'
  | 'manual'
  | 'axe-core'
  | 'lighthouse'
  | 'screen-reader'
  | 'code-review'

export interface Wcag22Criterion {
  id: string
  name: string
  level: WcagLevel
  status: ConformanceStatus
  evidence: {
    route?: string
    component?: string
    description: string
  }
  testingMethods: TestingMethod[]
  limitations: string
}

export const STATUS_LABELS: Record<ConformanceStatus, string> = {
  met: 'Đã đáp ứng',
  partial: 'Đáp ứng một phần',
  'not-applicable': 'Không áp dụng',
  planned: 'Dự kiến cải thiện',
}

export const LEVEL_LABELS: Record<WcagLevel, string> = {
  A: 'A',
  AA: 'AA',
  AAA: 'AAA',
}

export const TESTING_METHOD_LABELS: Record<TestingMethod, string> = {
  keyboard: 'Bàn phím',
  manual: 'Kiểm tra thủ công trình duyệt',
  'axe-core': 'axe-core',
  lighthouse: 'Lighthouse',
  'screen-reader': 'Screen reader',
  'code-review': 'Rà soát mã nguồn',
}

/** Tiêu chí WCAG 2.2 mới — mức A/AA (ưu tiên demo). */
export const WCAG22_AA_CRITERIA: Wcag22Criterion[] = [
  {
    id: '2.4.11',
    name: 'Focus Not Obscured (Minimum)',
    level: 'AA',
    status: 'met',
    evidence: {
      route: '/jobs/1, /accessibility',
      component: 'ErrorSummary, StatusMessage, Layout (sticky header)',
      description:
        'Khi submit form lỗi, ErrorSummary nhận focus và scroll vào vùng nhìn thấy; sticky header không che hoàn toàn focus ring. Focus visible dùng vòng vàng 3px trên mọi control.',
    },
    testingMethods: ['keyboard', 'manual', 'code-review'],
    limitations:
      'Chưa chạy lại axe/Lighthouse trên toàn bộ form sau mọi thay đổi gần nhất; kết quả keyboard/manual dựa trên kiểm thử trước (report 005–009).',
  },
  {
    id: '2.5.7',
    name: 'Dragging Movements',
    level: 'AA',
    status: 'not-applicable',
    evidence: {
      component: 'Toàn bộ luồng MVP',
      description:
        'Không có thao tác kéo-thả (drag-and-drop, slider kéo, reorder) bắt buộc để hoàn thành chức năng chính: duyệt việc làm/tài nguyên, wizard gợi ý, form ứng tuyển/phản hồi.',
    },
    testingMethods: ['manual', 'code-review'],
    limitations:
      'Nếu sau này thêm UI kéo-thả, cần bổ sung phương án thay thế bằng bàn phím hoặc nút.',
  },
  {
    id: '2.5.8',
    name: 'Target Size (Minimum)',
    level: 'AA',
    status: 'met',
    evidence: {
      route: '/jobs, /resources, /job-matching, Layout nav/footer',
      component: 'Button, nav link, filter submit, AccessibilityPreferencesPanel',
      description:
        'Nút, link nav, CTA và control chính có min-height ≥ 44px (--spacing-touch-min). Checkbox native nhỏ hơn nhưng hàng label clickable ≥ 44px (fieldset preferences, form).',
    },
    testingMethods: ['manual', 'code-review'],
    limitations:
      'Một số liên kết inline trong đoạn văn có vùng chạm mở rộng qua padding/min-height nhưng chưa đo tự động trên mọi breakpoint.',
  },
  {
    id: '3.2.6',
    name: 'Consistent Help',
    level: 'A',
    status: 'partial',
    evidence: {
      route: '/accessibility, footer (mọi trang)',
      component: 'Layout footer, AccessibilityPage, AccessibilityFeedbackForm',
      description:
        'Link "Trợ giúp & phản hồi tiếp cận" ở footer mọi trang trỏ tới /accessibility#accessibility-feedback. Trang Accessibility có form phản hồi và tuyên bố tiếp cận.',
    },
    testingMethods: ['manual', 'code-review'],
    limitations:
      'Chưa có trang Help riêng hoặc widget help cố định ngoài footer; một số trang con chưa có link help trong nội dung (chỉ footer chung).',
  },
  {
    id: '3.3.7',
    name: 'Redundant Entry',
    level: 'A',
    status: 'partial',
    evidence: {
      route: '/jobs/:id, /accessibility, /job-matching',
      component:
        'ApplicationForm, AccessibilityFeedbackForm, ContactProfileControls, SavedJobMatchingPanel',
      description:
        'ApplicationForm: checkbox đồng ý lưu + nút điền/xóa thông tin liên hệ (localStorage accessjob:contact-profile). AccessibilityFeedbackForm: nút dùng email đã lưu. Job Matching: lưu/xem lại kết quả gần nhất (accessjob:saved-job-matching). Không tự động điền/lưu âm thầm.',
    },
    testingMethods: ['keyboard', 'manual', 'code-review'],
    limitations:
      'Chỉ lưu cục bộ trên thiết bị/trình duyệt; không đồng bộ server hay giữa thiết bị. Tin nhắn form và mô tả feedback không được lưu. Chưa chạy axe/Lighthouse sau tính năng mới.',
  },
  {
    id: '3.3.8',
    name: 'Accessible Authentication (Minimum)',
    level: 'AA',
    status: 'not-applicable',
    evidence: {
      component: 'Toàn bộ MVP',
      description:
        'MVP không có đăng nhập, CAPTCHA, password puzzle hay bước xác thực gây rào cản. Người dùng truy cập công khai mọi luồng chính.',
    },
    testingMethods: ['code-review'],
    limitations:
      'Khi thêm auth sau này, cần tuân thủ 3.3.8 (không chỉ dựa vào nhận dạng vật thể, hỗ trợ copy/paste mật khẩu, v.v.).',
  },
]

/** Tiêu chí WCAG 2.2 mới — mức AAA (tham khảo, không claim toàn bộ). */
export const WCAG22_AAA_CRITERIA: Wcag22Criterion[] = [
  {
    id: '2.4.12',
    name: 'Focus Not Obscured (Enhanced)',
    level: 'AAA',
    status: 'partial',
    evidence: {
      route: '/jobs/1',
      component: 'ErrorSummary, sticky header',
      description:
        'Focus ring thường hiển thị khi tab; ErrorSummary scroll vào view khi lỗi form. Sticky header + preferences bar có thể che một phần nội dung phía trên focus trên viewport nhỏ.',
    },
    testingMethods: ['manual', 'code-review'],
    limitations:
      'AAA yêu cầu không có phần nào của focus bị che — chưa kiểm chứng đầy đủ mọi tổ hợp zoom 200% + mobile 360px + mọi route.',
  },
  {
    id: '2.4.13',
    name: 'Focus Appearance',
    level: 'AAA',
    status: 'partial',
    evidence: {
      component: 'tokens.css (:focus-visible), Layout, form controls',
      description:
        'Focus ring vàng 3px + offset 2px trên control tương tác. Chưa đo diện tích/perimeter focus so với chu vi control theo công thức AAA.',
    },
    testingMethods: ['manual', 'code-review'],
    limitations:
      'Chưa audit định lượng kích thước vùng focus theo tiêu chí AAA; chỉ xác nhận focus visible rõ ở mức AA.',
  },
  {
    id: '3.3.9',
    name: 'Accessible Authentication (Enhanced)',
    level: 'AAA',
    status: 'not-applicable',
    evidence: {
      component: 'Toàn bộ MVP',
      description: 'Không có luồng xác thực người dùng trong phạm vi MVP.',
    },
    testingMethods: ['code-review'],
    limitations: 'Áp dụng khi có đăng nhập/đăng ký trong tương lai.',
  },
]
