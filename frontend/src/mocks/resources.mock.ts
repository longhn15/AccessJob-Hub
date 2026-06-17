import type { Resource, ResourceFilters } from '../types/resource'
import { ApiError } from '../types/api'
import { mockDelay } from './mockDelay'

const DEMO_TIMESTAMP = '2026-06-01T08:00:00.000Z'

/** 10 resources — khớp seed V2 + V4 */
export const MOCK_RESOURCES: Resource[] = [
  {
    id: 1,
    title: 'WCAG 2.2 — Tổng quan tiêu chuẩn',
    category: 'Tiêu chuẩn web',
    description:
      'Tài liệu chính thức về Web Content Accessibility Guidelines 2.2 từ W3C, phù hợp để bắt đầu học accessibility.',
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 2,
    title: 'Hướng dẫn tìm việc cho người khuyết tật',
    category: 'Việc làm',
    description:
      'Bài viết tổng hợp kỹ năng phỏng vấn, quyền lợi lao động và mẹo chuẩn bị hồ sơ khi ứng tuyển.',
    url: 'https://www.ilo.org/global/topics/disability-and-work',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 3,
    title: 'Thực hành điều hướng bằng bàn phím',
    category: 'Kỹ năng số',
    description:
      'Hướng dẫn ngắn về Tab, Enter, Esc và focus visible — nền tảng để sử dụng web và ứng dụng dễ tiếp cận hơn.',
    url: 'https://webaim.org/articles/keyboard/',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 4,
    title: 'Mẫu CV accessible (Word)',
    category: 'Hồ sơ ứng tuyển',
    description:
      'Gợi ý bố cục CV dễ đọc, heading rõ ràng, phù hợp screen reader và in ấn.',
    url: 'https://www.microsoft.com/en-us/accessibility/',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 5,
    title: 'Hướng dẫn viết CV accessible',
    category: 'Hồ sơ ứng tuyển',
    description:
      'Gợi ý cấu trúc CV với heading rõ, mô tả kinh nghiệm dễ đọc bằng screen reader và khi in ấn.',
    url: 'https://www.w3.org/WAI/people-use-web/',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 6,
    title: 'Chuẩn bị phỏng vấn online',
    category: 'Việc làm',
    description:
      'Checklist kiểm tra âm thanh, phụ đề, ánh sáng và cách yêu cầu hỗ trợ khi phỏng vấn trực tuyến.',
    url: 'https://www.ilo.org/global/topics/disability-and-work',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 7,
    title: 'Kỹ năng làm việc từ xa',
    category: 'Kỹ năng số',
    description:
      'Mẹo quản lý thời gian, giao tiếp bằng chat/email và thiết lập không gian làm việc tại nhà.',
    url: 'https://webaim.org/',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 8,
    title: 'Quyền lợi lao động của người khuyết tật',
    category: 'Việc làm',
    description:
      'Tổng hợp quyền được hỗ trợ hợp lý, chống phân biệt đối xử và kênh khiếu nại cơ bản.',
    url: 'https://www.ilo.org/global/topics/disability-and-work',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 9,
    title: 'Công cụ screen reader phổ biến',
    category: 'Kỹ năng số',
    description:
      'Giới thiệu NVDA, JAWS, VoiceOver và cách bắt đầu luyện tập đọc nội dung web.',
    url: 'https://webaim.org/articles/screenreader_testing/',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
  {
    id: 10,
    title: 'Cách mô tả nhu cầu hỗ trợ khi ứng tuyển',
    category: 'Việc làm',
    description:
      'Mẫu câu và gợi ý trình bày yêu cầu hỗ trợ hợp lý trong email hoặc form ứng tuyển.',
    url: 'https://www.w3.org/WAI/planning/',
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
  },
]

function includesKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

export function filterMockResources(resources: Resource[], filters: ResourceFilters): Resource[] {
  let result = [...resources]

  const keyword = filters.keyword?.trim()
  if (keyword) {
    result = result.filter(
      (resource) =>
        includesKeyword(resource.title, keyword) ||
        includesKeyword(resource.description, keyword),
    )
  }

  const category = filters.category?.trim()
  if (category) {
    result = result.filter((resource) => includesKeyword(resource.category, category))
  }

  result.sort((a, b) => b.id - a.id)

  if (filters.limit !== undefined && filters.limit > 0) {
    result = result.slice(0, filters.limit)
  }

  return result
}

export function mockFetchResources(filters: ResourceFilters = {}): Promise<Resource[]> {
  return mockDelay(filterMockResources(MOCK_RESOURCES, filters))
}

export function mockFetchResourceById(id: number): Promise<Resource> {
  const resource = MOCK_RESOURCES.find((item) => item.id === id)
  if (!resource) {
    return mockDelay(null).then(() => {
      throw new ApiError(404, 'Không tìm thấy tài nguyên.')
    })
  }
  return mockDelay(resource)
}
