import type { ResourceFilters } from '../types/resource'

export function hasActiveResourceFilters(filters: ResourceFilters): boolean {
  return !!(
    filters.keyword?.trim() ||
    filters.category?.trim() ||
    filters.resourceType?.trim() ||
    filters.difficultyLevel?.trim() ||
    filters.audience?.trim() ||
    filters.featured === true
  )
}
