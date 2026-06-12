import type { Job, JobFilters } from '../types/job'
import { apiGet } from './client'

export function fetchJobs(filters: JobFilters = {}): Promise<Job[]> {
  return apiGet<Job[]>('/jobs', {
    keyword: filters.keyword,
    location: filters.location,
    workType: filters.workType,
    remoteAvailable: filters.remoteAvailable,
    limit: filters.limit,
  })
}

export function fetchJobById(id: number): Promise<Job> {
  return apiGet<Job>(`/jobs/${id}`)
}
