import type { ApplicationRequest, ApplicationResponse } from '../types/application'
import { ApiError } from '../types/api'
import { MOCK_JOBS } from './jobs.mock'
import { mockDelay } from './mockDelay'

let mockApplicationId = 1000

export function mockCreateApplication(payload: ApplicationRequest): Promise<ApplicationResponse> {
  const jobExists = MOCK_JOBS.some((job) => job.id === payload.jobId)
  if (!jobExists) {
    return mockDelay(null).then(() => {
      throw new ApiError(404, 'Không tìm thấy việc làm phù hợp để gửi thông tin quan tâm.')
    })
  }

  mockApplicationId += 1
  const now = new Date().toISOString()

  return mockDelay({
    id: mockApplicationId,
    message: 'Thông tin quan tâm của bạn đã được ghi nhận.',
    status: 'received',
    createdAt: now,
  })
}
