import type { ApplicationRequest, ApplicationResponse } from '../types/application'
import { apiPost } from './client'

export function createApplication(payload: ApplicationRequest): Promise<ApplicationResponse> {
  return apiPost<ApplicationResponse>('/applications', payload)
}
