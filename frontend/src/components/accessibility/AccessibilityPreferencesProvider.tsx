import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AccessibilityPreferencesContext } from '../../context/accessibilityPreferencesContext'
import {
  applyAccessibilityPreferencesToDocument,
  clearAccessibilityPreferencesStorage,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  loadAccessibilityPreferences,
  saveAccessibilityPreferences,
  type AccessibilityPreferences,
  type ContrastPreference,
  type FontScale,
  type LineHeightPreference,
  type ReducedMotionPreference,
  type UnderlinedLinksPreference,
} from '../../utils/accessibilityPreferences'

type StatusMessage = 'saved' | 'reset' | null

export function AccessibilityPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() =>
    loadAccessibilityPreferences(),
  )
  const [statusMessage, setStatusMessage] = useState<StatusMessage>(null)

  const announce = useCallback((message: StatusMessage) => {
    setStatusMessage(message)
  }, [])

  const updatePreferences = useCallback(
    (
      updater: (current: AccessibilityPreferences) => AccessibilityPreferences,
      message: StatusMessage = 'saved',
    ) => {
      setPreferences((current) => {
        const next = updater(current)
        applyAccessibilityPreferencesToDocument(next)
        saveAccessibilityPreferences(next)
        return next
      })
      announce(message)
    },
    [announce],
  )

  const setFontScale = useCallback(
    (value: FontScale) => {
      updatePreferences((current) => ({ ...current, fontScale: value }))
    },
    [updatePreferences],
  )

  const setLineHeight = useCallback(
    (value: LineHeightPreference) => {
      updatePreferences((current) => ({ ...current, lineHeight: value }))
    },
    [updatePreferences],
  )

  const setContrast = useCallback(
    (value: ContrastPreference) => {
      updatePreferences((current) => ({ ...current, contrast: value }))
    },
    [updatePreferences],
  )

  const setReducedMotion = useCallback(
    (value: ReducedMotionPreference) => {
      updatePreferences((current) => ({ ...current, reducedMotion: value }))
    },
    [updatePreferences],
  )

  const setUnderlinedLinks = useCallback(
    (value: UnderlinedLinksPreference) => {
      updatePreferences((current) => ({ ...current, underlinedLinks: value }))
    },
    [updatePreferences],
  )

  const resetPreferences = useCallback(() => {
    clearAccessibilityPreferencesStorage()
    updatePreferences(() => ({ ...DEFAULT_ACCESSIBILITY_PREFERENCES }), 'reset')
  }, [updatePreferences])

  const value = useMemo(
    () => ({
      preferences,
      statusMessage,
      setFontScale,
      setLineHeight,
      setContrast,
      setReducedMotion,
      setUnderlinedLinks,
      resetPreferences,
    }),
    [
      preferences,
      statusMessage,
      setFontScale,
      setLineHeight,
      setContrast,
      setReducedMotion,
      setUnderlinedLinks,
      resetPreferences,
    ],
  )

  return (
    <AccessibilityPreferencesContext.Provider value={value}>
      {children}
    </AccessibilityPreferencesContext.Provider>
  )
}
