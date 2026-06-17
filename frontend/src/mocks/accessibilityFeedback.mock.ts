import type {
  AccessibilityFeedbackRequest,
  AccessibilityFeedbackResponse,
} from '../types/accessibilityFeedback'
import { mockDelay } from './mockDelay'

let mockFeedbackId = 2000

export function mockCreateAccessibilityFeedback(
  payload: AccessibilityFeedbackRequest,
): Promise<AccessibilityFeedbackResponse> {
  void payload
  mockFeedbackId += 1
  const now = new Date().toISOString()

  return mockDelay({
    id: mockFeedbackId,
    message: 'Cảm ơn bạn đã gửi phản hồi về khả năng tiếp cận.',
    status: 'received',
    createdAt: now,
  })
}
