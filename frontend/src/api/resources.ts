import type { Resource, ResourceFilters } from '../types/resource'
import { apiGet } from './client'

export function fetchResources(filters: ResourceFilters = {}): Promise<Resource[]> {
  return apiGet<Resource[]>('/resources', {
    keyword: filters.keyword,
    category: filters.category,
    resourceType: filters.resourceType,
    difficultyLevel: filters.difficultyLevel,
    audience: filters.audience,
    featured: filters.featured,
    limit: filters.limit,
  })
}

export function fetchResourceById(id: number): Promise<Resource> {
  return apiGet<Resource>(`/resources/${id}`)
}
