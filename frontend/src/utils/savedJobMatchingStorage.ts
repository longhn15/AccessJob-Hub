import type {
  AccessibilityNeed,
  FieldInterest,
  JobMatchingAnswers,
  MatchTier,
  WorkFormatPreference,
} from '../types/jobMatching'

export const SAVED_JOB_MATCHING_STORAGE_KEY = 'accessjob:saved-job-matching'

export interface SavedJobMatchSummary {
  jobId: number
  jobTitle: string
  tier: MatchTier
  score: number
}

export interface SavedJobMatchingResult {
  savedAt: string
  answers: JobMatchingAnswers
  matchSummary: SavedJobMatchSummary[]
}

const WORK_FORMATS: WorkFormatPreference[] = ['remote', 'hybrid', 'office', 'any']
const ACCESSIBILITY_NEEDS: AccessibilityNeed[] = [
  'screen-reader',
  'keyboard',
  'flexible-hours',
  'quiet-environment',
  'remote-work',
  'clear-guidance',
]
const FIELD_INTERESTS: FieldInterest[] = [
  'frontend',
  'content',
  'customer-support',
  'qa-testing',
  'learning',
  'any',
]

function safeGetStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetStorageItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function safeRemoveStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function pickEnum<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : null
}

function parseAnswers(raw: unknown): JobMatchingAnswers | null {
  if (!isRecord(raw)) return null

  const workFormat = pickEnum(raw.workFormat, WORK_FORMATS)
  const fieldInterest = pickEnum(raw.fieldInterest, FIELD_INTERESTS)
  const accessibilityNeeds = Array.isArray(raw.accessibilityNeeds)
    ? raw.accessibilityNeeds.filter(
        (item): item is AccessibilityNeed =>
          typeof item === 'string' && ACCESSIBILITY_NEEDS.includes(item as AccessibilityNeed),
      )
    : []

  if (!workFormat || !fieldInterest || accessibilityNeeds.length === 0) return null

  return { workFormat, fieldInterest, accessibilityNeeds }
}

function parseMatchSummary(raw: unknown): SavedJobMatchSummary[] {
  if (!Array.isArray(raw)) return []

  return raw
    .map((item): SavedJobMatchSummary | null => {
      if (!isRecord(item)) return null
      const jobId = typeof item.jobId === 'number' ? item.jobId : null
      const jobTitle = typeof item.jobTitle === 'string' ? item.jobTitle.trim() : ''
      const tier = pickEnum(item.tier, ['high', 'medium', 'low'] as const)
      const score = typeof item.score === 'number' ? item.score : null
      if (jobId === null || !jobTitle || !tier || score === null) return null
      return { jobId, jobTitle, tier, score }
    })
    .filter((item): item is SavedJobMatchSummary => item !== null)
    .slice(0, 5)
}

function parseSavedResult(raw: unknown): SavedJobMatchingResult | null {
  if (!isRecord(raw)) return null

  const savedAt = typeof raw.savedAt === 'string' ? raw.savedAt : ''
  const answers = parseAnswers(raw.answers)
  const matchSummary = parseMatchSummary(raw.matchSummary)

  if (!savedAt || !answers) return null

  return { savedAt, answers, matchSummary }
}

export function loadSavedJobMatching(): SavedJobMatchingResult | null {
  const raw = safeGetStorageItem(SAVED_JOB_MATCHING_STORAGE_KEY)
  if (!raw) return null

  try {
    return parseSavedResult(JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

export function hasSavedJobMatching(): boolean {
  return loadSavedJobMatching() !== null
}

export function saveJobMatchingResult(result: SavedJobMatchingResult): boolean {
  const payload: SavedJobMatchingResult = {
    savedAt: result.savedAt,
    answers: result.answers,
    matchSummary: result.matchSummary.slice(0, 5),
  }

  return safeSetStorageItem(SAVED_JOB_MATCHING_STORAGE_KEY, JSON.stringify(payload))
}

export function clearSavedJobMatching(): boolean {
  return safeRemoveStorageItem(SAVED_JOB_MATCHING_STORAGE_KEY)
}

export function formatSavedAt(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
