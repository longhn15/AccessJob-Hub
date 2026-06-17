import type { Job, JobFilters } from '../types/job'
import { ApiError } from '../types/api'
import { mockDelay } from './mockDelay'

const DEMO_TIMESTAMP = '2026-06-01T08:00:00.000Z'

/** 10 jobs — khớp seed V2 + V4 + backfill V3 */
export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Nhân viên hỗ trợ khách hàng',
    companyName: 'Công ty TNHH Tiếp cận Số',
    location: 'Hà Nội',
    workType: 'full-time',
    experienceLevel: 'none',
    salaryRange: '5-10m',
    workPlace: 'hybrid',
    remoteAvailable: true,
    accessibilitySupport:
      'Làm việc từ xa, hỗ trợ phần mềm đọc màn hình, giờ làm linh hoạt.',
    shortDescription:
      'Hỗ trợ khách hàng qua chat và email, môi trường làm việc thân thiện với người khuyết tật.',
    fullDescription:
      'Bạn sẽ trả lời câu hỏi khách hàng, ghi nhận phản hồi và phối hợp với đội kỹ thuật. Công ty cam kết hỗ trợ công cụ hỗ trợ tiếp cận và đào tạo nội bộ về WCAG.',
    requirements:
      'Kỹ năng giao tiếp tốt; ưu tiên ứng viên có kinh nghiệm dùng bàn phím và phần mềm hỗ trợ.',
    contactEmail: 'tuyendung@tiepcanso.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 2,
    title: 'Lập trình viên Frontend (React)',
    companyName: 'AccessTech Solutions',
    location: 'TP. Hồ Chí Minh',
    workType: 'full-time',
    experienceLevel: '1-2',
    salaryRange: '10-15m',
    workPlace: 'hcm',
    remoteAvailable: false,
    accessibilitySupport:
      'Văn phòng có thang máy, bàn làm việc điều chỉnh chiều cao, màn hình lớn khi cần.',
    shortDescription:
      'Phát triển giao diện web accessible theo WCAG 2.2 cho khách hàng doanh nghiệp.',
    fullDescription:
      'Tham gia xây dựng component React/TypeScript, review accessibility với đội QA, và viết tài liệu hướng dẫn sử dụng bàn phím cho sản phẩm.',
    requirements: 'Biết React, TypeScript; hiểu semantic HTML và ARIA cơ bản.',
    contactEmail: 'hr@accesstech.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 3,
    title: 'Chuyên viên nhập liệu bán thời gian',
    companyName: 'Việc Làm Cộng Đồng',
    location: 'Đà Nẵng',
    workType: 'part-time',
    experienceLevel: 'none',
    salaryRange: 'under-5m',
    workPlace: 'remote',
    remoteAvailable: true,
    accessibilitySupport:
      'Công việc có thể làm từ xa; công cụ nhập liệu hỗ trợ phím tắt và phóng to chữ.',
    shortDescription: 'Nhập và kiểm tra dữ liệu việc làm, thời gian linh hoạt 20 giờ/tuần.',
    fullDescription:
      'Nhập thông tin tin tuyển dụng từ biểu mẫu chuẩn, đối chiếu dữ liệu và báo cáo lỗi cho quản trị viên.',
    requirements: 'Tỉ mỉ, quen thao tác bàn phím; không yêu cầu kinh nghiệm lập trình.',
    contactEmail: 'lienhe@vieclamcongdong.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 4,
    title: 'Tester phần mềm (QA)',
    companyName: 'Quality Access Lab',
    location: 'Hà Nội',
    workType: 'full-time',
    experienceLevel: 'under-1',
    salaryRange: '5-10m',
    workPlace: 'hybrid',
    remoteAvailable: true,
    accessibilitySupport:
      'Hỗ trợ phần mềm đọc màn hình, checklist kiểm thử có hướng dẫn bàn phím, môi trường yên tĩnh.',
    shortDescription:
      'Kiểm thử website và ứng dụng theo checklist accessibility, báo cáo lỗi rõ ràng.',
    fullDescription:
      'Thực hiện test case, ghi nhận bug, phối hợp với dev. Đào tạo nội bộ về WCAG và công cụ kiểm thử.',
    requirements:
      'Tỉ mỉ, quen thao tác bàn phím; dưới 1 năm kinh nghiệm hoặc mới tốt nghiệp CNTT.',
    contactEmail: 'qa@qualityaccess.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 5,
    title: 'Content Writer',
    companyName: 'Nội dung Dễ Tiếp Cận',
    location: 'Làm việc từ xa',
    workType: 'part-time',
    experienceLevel: '1-2',
    salaryRange: '5-10m',
    workPlace: 'remote',
    remoteAvailable: true,
    accessibilitySupport:
      'Làm việc từ xa hoàn toàn; công cụ soạn thảo hỗ trợ heading và kiểm tra contrast.',
    shortDescription: 'Viết bài hướng dẫn việc làm và tài nguyên học tập dễ đọc, dễ hiểu.',
    fullDescription:
      'Soạn nội dung blog, tài nguyên học tập; tuân thủ style guide accessibility.',
    requirements: 'Kỹ năng viết tiếng Việt tốt; hiểu semantic HTML là lợi thế.',
    contactEmail: 'content@noidungde.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 6,
    title: 'Thiết kế UI cơ bản',
    companyName: 'Design For All Studio',
    location: 'TP. Hồ Chí Minh',
    workType: 'full-time',
    experienceLevel: '1-2',
    salaryRange: '10-15m',
    workPlace: 'hybrid',
    remoteAvailable: true,
    accessibilitySupport:
      'Hybrid linh hoạt; Figma có plugin contrast; hướng dẫn thiết kế rõ ràng.',
    shortDescription: 'Thiết kế giao diện web đơn giản, tập trung contrast và touch target.',
    fullDescription:
      'Tạo wireframe, mockup component; phối hợp với frontend developer.',
    requirements: 'Biết Figma cơ bản; quan tâm accessibility trong thiết kế.',
    contactEmail: 'design@designforall.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 7,
    title: 'Trợ lý hành chính',
    companyName: 'Văn phòng Hỗ trợ Huế',
    location: 'Huế',
    workType: 'full-time',
    experienceLevel: 'none',
    salaryRange: '5-10m',
    workPlace: 'hue',
    remoteAvailable: false,
    accessibilitySupport:
      'Văn phòng tầng trệt, lối đi rộng; phần mềm văn phòng hỗ trợ screen reader.',
    shortDescription: 'Hỗ trợ sắp xếp lịch, nhập liệu và liên hệ đối tác tại Huế.',
    fullDescription:
      'Quản lý lịch họp, soạn thư điện tử, lưu trữ hồ sơ điện tử.',
    requirements: 'Không yêu cầu kinh nghiệm; thành thạo Word/Excel cơ bản.',
    contactEmail: 'admin@vanphonghue.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 8,
    title: 'Nhân viên chăm sóc cộng đồng',
    companyName: 'Cộng Đồng Tiếp Cận',
    location: 'Đà Nẵng',
    workType: 'part-time',
    experienceLevel: 'none',
    salaryRange: 'under-5m',
    workPlace: 'da-nang',
    remoteAvailable: false,
    accessibilitySupport:
      'Giờ làm linh hoạt; hỗ trợ đi lại khi cần; môi trường làm việc thân thiện.',
    shortDescription: 'Hỗ trợ hoạt động cộng đồng và kết nối người tìm việc với tổ chức.',
    fullDescription:
      'Tham gia sự kiện, tư vấn sơ bộ và cập nhật thông tin lên hệ thống.',
    requirements: 'Kỹ năng giao tiếp; chưa yêu cầu kinh nghiệm chuyên môn.',
    contactEmail: 'congdong@tiepcan.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 9,
    title: 'Điều phối viên dữ liệu',
    companyName: 'Data Bridge Co-op',
    location: 'Làm việc từ xa',
    workType: 'contract',
    experienceLevel: '3-plus',
    salaryRange: 'over-15m',
    workPlace: 'remote',
    remoteAvailable: true,
    accessibilitySupport:
      'Làm việc từ xa; công cụ nhập liệu có phím tắt; tài liệu quy trình rõ ràng.',
    shortDescription: 'Điều phối và kiểm tra chất lượng dữ liệu việc làm từ nhiều nguồn.',
    fullDescription: 'Đối chiếu dữ liệu, báo cáo sai lệch, phối hợp với đội nội dung.',
    requirements: 'Từ 3 năm kinh nghiệm xử lý dữ liệu hoặc quản trị hệ thống.',
    contactEmail: 'data@databridge.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 10,
    title: 'Nhân viên hỗ trợ vận hành từ xa',
    companyName: 'Remote Ops Hub',
    location: 'Làm việc từ xa',
    workType: 'full-time',
    experienceLevel: 'under-1',
    salaryRange: 'negotiable',
    workPlace: 'remote',
    remoteAvailable: true,
    accessibilitySupport:
      'Remote 100%; giờ làm linh hoạt; onboarding có hướng dẫn bàn phím chi tiết.',
    shortDescription: 'Hỗ trợ vận hành hệ thống và trả lời ticket nội bộ qua email.',
    fullDescription:
      'Theo dõi ticket, cập nhật trạng thái, báo cáo hàng ngày cho quản lý.',
    requirements: 'Dưới 1 năm kinh nghiệm; quen làm việc online.',
    contactEmail: 'ops@remoteops.vn',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
]

function includesKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

export function filterMockJobs(jobs: Job[], filters: JobFilters): Job[] {
  let result = [...jobs]

  const keyword = filters.keyword?.trim()
  if (keyword) {
    result = result.filter(
      (job) =>
        includesKeyword(job.title, keyword) ||
        includesKeyword(job.companyName, keyword) ||
        includesKeyword(job.shortDescription, keyword) ||
        includesKeyword(job.fullDescription, keyword) ||
        includesKeyword(job.requirements, keyword),
    )
  }

  const location = filters.location?.trim()
  if (location) {
    result = result.filter((job) => includesKeyword(job.location, location))
  }

  if (filters.workType) {
    result = result.filter((job) => job.workType === filters.workType)
  }

  if (filters.experienceLevel) {
    result = result.filter((job) => job.experienceLevel === filters.experienceLevel)
  }

  if (filters.salaryRange) {
    result = result.filter((job) => job.salaryRange === filters.salaryRange)
  }

  if (filters.workPlace) {
    result = result.filter((job) => job.workPlace === filters.workPlace)
  }

  if (filters.remoteAvailable === true) {
    result = result.filter((job) => job.remoteAvailable)
  }

  result.sort((a, b) => b.id - a.id)

  if (filters.limit !== undefined && filters.limit > 0) {
    result = result.slice(0, filters.limit)
  }

  return result
}

export function mockFetchJobs(filters: JobFilters = {}): Promise<Job[]> {
  return mockDelay(filterMockJobs(MOCK_JOBS, filters))
}

export function mockFetchJobById(id: number): Promise<Job> {
  const job = MOCK_JOBS.find((item) => item.id === id)
  if (!job) {
    return mockDelay(null).then(() => {
      throw new ApiError(404, 'Không tìm thấy việc làm.')
    })
  }
  return mockDelay(job)
}
