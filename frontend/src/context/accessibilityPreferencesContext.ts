import { createContext } from 'react'
import type { AccessibilityPreferences } from '../utils/accessibilityPreferences'
import type {
  ContrastPreference,
  FontScale,
  LineHeightPreference,
  ReducedMotionPreference,
  UnderlinedLinksPreference,
} from '../utils/accessibilityPreferences'

type StatusMessage = 'saved' | 'reset' | null

export interface AccessibilityPreferencesContextValue {
  preferences: AccessibilityPreferences
  statusMessage: StatusMessage
  setFontScale: (value: FontScale) => void
  setLineHeight: (value: LineHeightPreference) => void
  setContrast: (value: ContrastPreference) => void
  setReducedMotion: (value: ReducedMotionPreference) => void
  setUnderlinedLinks: (value: UnderlinedLinksPreference) => void
  resetPreferences: () => void
}

export const AccessibilityPreferencesContext =
  createContext<AccessibilityPreferencesContextValue | null>(null)
