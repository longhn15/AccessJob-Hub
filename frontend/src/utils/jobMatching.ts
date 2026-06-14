import type { Job } from '../types/job'
import type {
  AccessibilityNeed,
  FieldInterest,
  JobMatchResult,
  JobMatchingAnswers,
  MatchTier,
  WorkFormatPreference,
} from '../types/jobMatching'

function normalizeText(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

function jobTextBlob(job: Job): string {
  return normalizeText(
    [
      job.title,
      job.shortDescription,
      job.fullDescription,
      job.requirements,
      job.accessibilitySupport,
      job.location,
      job.workType,
      job.companyName,
    ].join(' '),
  )
}

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(normalizeText(keyword)))
}

function scoreWorkFormat(
  job: Job,
  preference: WorkFormatPreference,
  reasons: string[],
): number {
  if (preference === 'any') {
    reasons.push('Bạn chọn xem tất cả hình thức làm việc.')
    return 2
  }

  const text = jobTextBlob(job)

  if (preference === 'remote') {
    if (job.remoteAvailable || includesAny(text, ['tu xa', 'remote', 'lam viec tu xa'])) {
      reasons.push('Phù hợp vì công việc hỗ trợ làm việc từ xa.')
      return 4
    }
    return 0
  }

  if (preference === 'office') {
    if (
      !job.remoteAvailable ||
      includesAny(text, ['van phong', 'tai cong ty', 'onsite', 'tai van phong'])
    ) {
      reasons.push('Phù hợp vì công việc có thể làm tại văn phòng hoặc công ty.')
      return 4
    }
    return 0
  }

  if (preference === 'hybrid') {
    const hybridHints = includesAny(text, ['hybrid', 'ket hop', 'linh hoat', 'mot phan tu xa'])
    const partialRemote = job.remoteAvailable && job.location.trim().length > 0
    if (hybridHints || partialRemote) {
      reasons.push('Phù hợp vì công việc có thể kết hợp tại văn phòng và từ xa.')
      return 3
    }
    return 0
  }

  return 0
}

const ACCESSIBILITY_KEYWORDS: Record<AccessibilityNeed, string[]> = {
  'screen-reader': [
    'trinh doc man hinh',
    'screen reader',
    'phan mem doc',
    'jaws',
    'nvda',
    'voiceover',
  ],
  keyboard: ['ban phim', 'keyboard', 'phim tat', 'tab', 'focus'],
  'flexible-hours': ['linh hoat', 'flexible', 'part-time', 'ban thoi gian', 'gio lam'],
  'quiet-environment': ['it tieng on', 'yen tinh', 'quiet', 'it on ao'],
  'remote-work': ['tu xa', 'remote', 'lam viec tu xa'],
  'clear-guidance': [
    'ro rang',
    'wcag',
    'huong dan',
    'de hieu',
    'semantic',
    'aria',
    'accessible',
    'de doc',
  ],
}

const ACCESSIBILITY_REASONS: Record<AccessibilityNeed, string> = {
  'screen-reader': 'Phù hợp vì mô tả công việc đề cập hỗ trợ trình đọc màn hình.',
  keyboard: 'Phù hợp vì công việc hỗ trợ điều hướng hoặc thao tác bằng bàn phím.',
  'flexible-hours': 'Phù hợp vì có thời gian làm việc linh hoạt.',
  'quiet-environment': 'Phù hợp vì môi trường làm việc được mô tả yên tĩnh hoặc ít tiếng ồn.',
  'remote-work': 'Phù hợp vì công việc cho phép làm việc từ xa.',
  'clear-guidance': 'Phù hợp vì có hướng dẫn rõ ràng hoặc nội dung dễ hiểu.',
}

function scoreAccessibilityNeed(
  job: Job,
  need: AccessibilityNeed,
  reasons: string[],
): number {
  const text = jobTextBlob(job)
  const keywords = ACCESSIBILITY_KEYWORDS[need]

  if (need === 'remote-work' && job.remoteAvailable) {
    reasons.push(ACCESSIBILITY_REASONS[need])
    return 2
  }

  if (includesAny(text, keywords)) {
    reasons.push(ACCESSIBILITY_REASONS[need])
    return 2
  }

  if (need === 'clear-guidance' && job.accessibilitySupport.trim().length > 0) {
    reasons.push('Phù hợp vì có mô tả hỗ trợ tiếp cận rõ ràng.')
    return 1
  }

  return 0
}

const FIELD_KEYWORDS: Record<Exclude<FieldInterest, 'any'>, string[]> = {
  frontend: ['frontend', 'react', 'typescript', 'lap trinh web', 'giao dien web', 'html'],
  content: ['noi dung', 'content', 'so', 'bien tap'],
  'customer-support': ['ho tro khach hang', 'customer', 'chat', 'email', 'tu van'],
  'qa-testing': ['kiem thu', 'test', 'qa', 'quality'],
  learning: ['hoc tap', 'dao tao', 'tai nguyen', 'huong dan'],
}

const FIELD_REASONS: Record<Exclude<FieldInterest, 'any'>, string> = {
  frontend: 'Phù hợp vì liên quan đến lập trình web hoặc front-end.',
  content: 'Phù hợp vì liên quan đến nội dung số.',
  'customer-support': 'Phù hợp vì liên quan đến hỗ trợ khách hàng.',
  'qa-testing': 'Phù hợp vì liên quan đến kiểm thử phần mềm.',
  learning: 'Phù hợp vì liên quan đến học tập hoặc hướng dẫn.',
}

function scoreFieldInterest(
  job: Job,
  interest: FieldInterest,
  reasons: string[],
): number {
  if (interest === 'any') {
    reasons.push('Bạn chọn xem mọi lĩnh vực.')
    return 2
  }

  const text = jobTextBlob(job)
  const keywords = FIELD_KEYWORDS[interest]

  if (includesAny(text, keywords)) {
    reasons.push(FIELD_REASONS[interest])
    return 4
  }

  return 0
}

function resolveTier(score: number): MatchTier {
  if (score >= 8) {
    return 'high'
  }
  if (score >= 4) {
    return 'medium'
  }
  return 'low'
}

function uniqueReasons(reasons: string[]): string[] {
  return [...new Set(reasons)]
}

export function matchJobs(jobs: Job[], answers: JobMatchingAnswers): JobMatchResult[] {
  const results = jobs.map((job) => {
    const reasons: string[] = []
    let score = 0

    if (answers.workFormat) {
      score += scoreWorkFormat(job, answers.workFormat, reasons)
    }

    for (const need of answers.accessibilityNeeds) {
      score += scoreAccessibilityNeed(job, need, reasons)
    }

    if (answers.fieldInterest) {
      score += scoreFieldInterest(job, answers.fieldInterest, reasons)
    }

    if (job.accessibilitySupport.trim().length > 0 && reasons.length === 0) {
      reasons.push('Có thông tin hỗ trợ tiếp cận trong tin tuyển dụng.')
      score += 1
    }

    if (reasons.length === 0) {
      reasons.push('Gợi ý dựa trên dữ liệu hiện có — nên xem thêm chi tiết công việc.')
    }

    return {
      job,
      score,
      tier: resolveTier(score),
      reasons: uniqueReasons(reasons),
    }
  })

  return results.sort((a, b) => b.score - a.score || a.job.title.localeCompare(b.job.title, 'vi'))
}

export function hasHighMatches(results: JobMatchResult[]): boolean {
  return results.some((result) => result.tier === 'high')
}
