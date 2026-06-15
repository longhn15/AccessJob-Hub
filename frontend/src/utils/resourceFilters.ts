import type { ResourceFilters } from '../types/resource'

export function hasActiveResourceFilters(filters: ResourceFilters): boolean {
  return !!(filters.keyword?.trim() || filters.category?.trim())
}
