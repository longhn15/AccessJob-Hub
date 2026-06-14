import { useContext } from 'react'
import { AccessibilityPreferencesContext } from '../context/accessibilityPreferencesContext'

export function useAccessibilityPreferences() {
  const context = useContext(AccessibilityPreferencesContext)
  if (!context) {
    throw new Error('useAccessibilityPreferences must be used within AccessibilityPreferencesProvider')
  }
  return context
}
