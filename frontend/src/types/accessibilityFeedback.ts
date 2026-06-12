export interface AccessibilityFeedbackRequest {
  category: string
  description: string
  contactEmail?: string
}

export interface AccessibilityFeedbackResponse {
  id: number
  message: string
  status: string
  createdAt: string
}
