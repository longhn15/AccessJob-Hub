export const A11Y_PREFERENCES_STORAGE_KEY = 'accessjob:a11y-preferences'

export type FontScale = 'default' | 'large' | 'x-large'
export type LineHeightPreference = 'default' | 'comfortable'
export type ContrastPreference = 'default' | 'high'
export type ReducedMotionPreference = 'system' | 'reduce'
export type UnderlinedLinksPreference = 'default' | 'enhanced'

export interface AccessibilityPreferences {
  fontScale: FontScale
  lineHeight: LineHeightPreference
  contrast: ContrastPreference
  reducedMotion: ReducedMotionPreference
  underlinedLinks: UnderlinedLinksPreference
}

export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferences = {
  fontScale: 'default',
  lineHeight: 'default',
  contrast: 'default',
  reducedMotion: 'system',
  underlinedLinks: 'default',
}

const FONT_SCALES: FontScale[] = ['default', 'large', 'x-large']
const LINE_HEIGHTS: LineHeightPreference[] = ['default', 'comfortable']
const CONTRASTS: ContrastPreference[] = ['default', 'high']
const REDUCED_MOTIONS: ReducedMotionPreference[] = ['system', 'reduce']
const UNDERLINED_LINKS: UnderlinedLinksPreference[] = ['default', 'enhanced']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function pickEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : fallback
}

function parsePreferences(raw: unknown): AccessibilityPreferences {
  if (!isRecord(raw)) {
    return { ...DEFAULT_ACCESSIBILITY_PREFERENCES }
  }

  return {
    fontScale: pickEnum(raw.fontScale, FONT_SCALES, DEFAULT_ACCESSIBILITY_PREFERENCES.fontScale),
    lineHeight: pickEnum(raw.lineHeight, LINE_HEIGHTS, DEFAULT_ACCESSIBILITY_PREFERENCES.lineHeight),
    contrast: pickEnum(raw.contrast, CONTRASTS, DEFAULT_ACCESSIBILITY_PREFERENCES.contrast),
    reducedMotion: pickEnum(
      raw.reducedMotion,
      REDUCED_MOTIONS,
      DEFAULT_ACCESSIBILITY_PREFERENCES.reducedMotion,
    ),
    underlinedLinks: pickEnum(
      raw.underlinedLinks,
      UNDERLINED_LINKS,
      DEFAULT_ACCESSIBILITY_PREFERENCES.underlinedLinks,
    ),
  }
}

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

export function loadAccessibilityPreferences(): AccessibilityPreferences {
  const raw = safeGetStorageItem(A11Y_PREFERENCES_STORAGE_KEY)
  if (!raw) {
    return { ...DEFAULT_ACCESSIBILITY_PREFERENCES }
  }

  try {
    return parsePreferences(JSON.parse(raw) as unknown)
  } catch {
    return { ...DEFAULT_ACCESSIBILITY_PREFERENCES }
  }
}

export function saveAccessibilityPreferences(preferences: AccessibilityPreferences): boolean {
  return safeSetStorageItem(A11Y_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
}

export function clearAccessibilityPreferencesStorage(): boolean {
  return safeRemoveStorageItem(A11Y_PREFERENCES_STORAGE_KEY)
}

export function applyAccessibilityPreferencesToDocument(
  preferences: AccessibilityPreferences,
  root: HTMLElement = document.documentElement,
): void {
  root.dataset.fontScale = preferences.fontScale
  root.dataset.lineHeight = preferences.lineHeight
  root.dataset.contrast = preferences.contrast
  root.dataset.reducedMotion = preferences.reducedMotion === 'reduce' ? 'true' : 'false'
  root.dataset.underlinedLinks = preferences.underlinedLinks === 'enhanced' ? 'true' : 'false'
}

export function initAccessibilityPreferences(): AccessibilityPreferences {
  const preferences = loadAccessibilityPreferences()
  applyAccessibilityPreferencesToDocument(preferences)
  return preferences
}

export function preferencesEqual(
  a: AccessibilityPreferences,
  b: AccessibilityPreferences,
): boolean {
  return (
    a.fontScale === b.fontScale &&
    a.lineHeight === b.lineHeight &&
    a.contrast === b.contrast &&
    a.reducedMotion === b.reducedMotion &&
    a.underlinedLinks === b.underlinedLinks
  )
}
