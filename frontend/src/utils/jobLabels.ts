import type { Job } from '../types/job'

const WORK_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  contract: 'Hợp đồng',
  internship: 'Thực tập',
}

const EXPERIENCE_LABELS: Record<string, string> = {
  none: 'Chưa yêu cầu kinh nghiệm',
  'under-1': 'Dưới 1 năm',
  '1-2': '1–2 năm',
  '3-plus': '3+ năm',
}

const SALARY_LABELS: Record<string, string> = {
  'under-5m': 'Dưới 5 triệu',
  '5-10m': '5–10 triệu',
  '10-15m': '10–15 triệu',
  'over-15m': 'Trên 15 triệu',
  negotiable: 'Thỏa thuận',
}

const WORK_PLACE_LOCATION_LABELS: Record<string, string> = {
  hue: 'Huế',
  'da-nang': 'Đà Nẵng',
  hanoi: 'Hà Nội',
  hcm: 'TP. Hồ Chí Minh',
}

export function formatWorkType(workType: string): string {
  return WORK_TYPE_LABELS[workType] ?? workType
}

export function formatExperienceLevel(level: string | null | undefined): string | null {
  if (!level) return null
  return EXPERIENCE_LABELS[level] ?? level
}

export function formatSalaryRange(range: string | null | undefined): string | null {
  if (!range) return null
  return SALARY_LABELS[range] ?? range
}

export function formatWorkMode(job: Job): string {
  if (job.workPlace === 'remote') {
    return 'Từ xa'
  }
  if (job.workPlace === 'hybrid') {
    return 'Hybrid'
  }
  if (job.remoteAvailable && job.workPlace && job.workPlace in WORK_PLACE_LOCATION_LABELS) {
    return 'Hybrid'
  }
  if (job.remoteAvailable) {
    return 'Từ xa'
  }
  return 'Văn phòng'
}

export function formatWorkPlaceLabel(workPlace: string | null | undefined): string | null {
  if (!workPlace) return null
  if (workPlace === 'remote') return 'Từ xa'
  if (workPlace === 'hybrid') return 'Hybrid'
  return WORK_PLACE_LOCATION_LABELS[workPlace] ?? null
}

export function parseRequirementItems(text: string): string[] {
  return text
    .split(/\n|;\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
}
