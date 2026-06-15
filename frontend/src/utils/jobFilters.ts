import type { JobFilters } from '../types/job'

export function hasActiveJobFilters(filters: JobFilters): boolean {
  return !!(
    filters.keyword?.trim() ||
    filters.workType ||
    filters.experienceLevel ||
    filters.salaryRange ||
    filters.workPlace ||
    filters.remoteAvailable === true
  )
}
