import type { Job } from './job'

export type WorkFormatPreference = 'remote' | 'hybrid' | 'office' | 'any'

export type AccessibilityNeed =
  | 'screen-reader'
  | 'keyboard'
  | 'flexible-hours'
  | 'quiet-environment'
  | 'remote-work'
  | 'clear-guidance'

export type FieldInterest =
  | 'frontend'
  | 'content'
  | 'customer-support'
  | 'qa-testing'
  | 'learning'
  | 'any'

export interface JobMatchingAnswers {
  workFormat: WorkFormatPreference | null
  accessibilityNeeds: AccessibilityNeed[]
  fieldInterest: FieldInterest | null
}

export type MatchTier = 'high' | 'medium' | 'low'

export interface JobMatchResult {
  job: Job
  score: number
  tier: MatchTier
  reasons: string[]
}

export const WORK_FORMAT_OPTIONS: {
  value: WorkFormatPreference
  label: string
}[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'office', label: 'Tại văn phòng' },
  { value: 'any', label: 'Không chắc / tất cả' },
]

export const ACCESSIBILITY_NEED_OPTIONS: {
  value: AccessibilityNeed
  label: string
}[] = [
  { value: 'screen-reader', label: 'Hỗ trợ sử dụng trình đọc màn hình' },
  { value: 'keyboard', label: 'Điều hướng bằng bàn phím' },
  { value: 'flexible-hours', label: 'Thời gian linh hoạt' },
  { value: 'quiet-environment', label: 'Môi trường ít tiếng ồn' },
  { value: 'remote-work', label: 'Có thể làm việc từ xa' },
  { value: 'clear-guidance', label: 'Hướng dẫn rõ ràng, dễ hiểu' },
]

export const FIELD_INTEREST_OPTIONS: {
  value: FieldInterest
  label: string
}[] = [
  { value: 'frontend', label: 'Front-end / lập trình web' },
  { value: 'content', label: 'Nội dung số' },
  { value: 'customer-support', label: 'Hỗ trợ khách hàng' },
  { value: 'qa-testing', label: 'Kiểm thử phần mềm' },
  { value: 'learning', label: 'Học tập / tài nguyên' },
  { value: 'any', label: 'Khác / tất cả' },
]

export const MATCH_TIER_LABELS: Record<MatchTier, string> = {
  high: 'Phù hợp cao',
  medium: 'Phù hợp vừa',
  low: 'Cần xem thêm',
}
