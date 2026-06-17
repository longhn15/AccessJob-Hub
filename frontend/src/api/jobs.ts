import type { Job, JobFilters } from '../types/job'
import { USE_MOCK_DATA } from '../config/dataSource'
import { mockFetchJobById, mockFetchJobs } from '../mocks/jobs.mock'
import { apiGet } from './client'

export function fetchJobs(filters: JobFilters = {}): Promise<Job[]> {
  if (USE_MOCK_DATA) {
    return mockFetchJobs(filters)
  }

  return apiGet<Job[]>('/jobs', {
    keyword: filters.keyword,
    location: filters.location,
    workType: filters.workType,
    experienceLevel: filters.experienceLevel,
    salaryRange: filters.salaryRange,
    workPlace: filters.workPlace,
    remoteAvailable: filters.remoteAvailable,
    limit: filters.limit,
  })
}

export function fetchJobById(id: number): Promise<Job> {
  if (USE_MOCK_DATA) {
    return mockFetchJobById(id)
  }

  return apiGet<Job>(`/jobs/${id}`)
}
