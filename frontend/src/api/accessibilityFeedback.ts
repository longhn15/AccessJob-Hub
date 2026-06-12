import type {
  AccessibilityFeedbackRequest,
  AccessibilityFeedbackResponse,
} from '../types/accessibilityFeedback'
import { apiPost } from './client'

export function createAccessibilityFeedback(
  payload: AccessibilityFeedbackRequest,
): Promise<AccessibilityFeedbackResponse> {
  return apiPost<AccessibilityFeedbackResponse>('/accessibility-feedback', payload)
}
