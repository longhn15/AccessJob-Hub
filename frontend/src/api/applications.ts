import type { ApplicationRequest, ApplicationResponse } from '../types/application'
import { USE_MOCK_DATA } from '../config/dataSource'
import { mockCreateApplication } from '../mocks/applications.mock'
import { apiPost } from './client'

export function createApplication(payload: ApplicationRequest): Promise<ApplicationResponse> {
  if (USE_MOCK_DATA) {
    return mockCreateApplication(payload)
  }

  return apiPost<ApplicationResponse>('/applications', payload)
}
