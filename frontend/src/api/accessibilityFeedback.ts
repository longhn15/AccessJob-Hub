import type {
  AccessibilityFeedbackRequest,
  AccessibilityFeedbackResponse,
} from '../types/accessibilityFeedback'
import { USE_MOCK_DATA } from '../config/dataSource'
import { mockCreateAccessibilityFeedback } from '../mocks/accessibilityFeedback.mock'
import { apiPost } from './client'

export function createAccessibilityFeedback(
  payload: AccessibilityFeedbackRequest,
): Promise<AccessibilityFeedbackResponse> {
  if (USE_MOCK_DATA) {
    return mockCreateAccessibilityFeedback(payload)
  }

  return apiPost<AccessibilityFeedbackResponse>('/accessibility-feedback', payload)
}
