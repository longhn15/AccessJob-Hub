import type { Resource, ResourceFilters } from '../types/resource'
import { USE_MOCK_DATA } from '../config/dataSource'
import { mockFetchResourceById, mockFetchResources } from '../mocks/resources.mock'
import { apiGet } from './client'

export function fetchResources(filters: ResourceFilters = {}): Promise<Resource[]> {
  if (USE_MOCK_DATA) {
    return mockFetchResources(filters)
  }

  return apiGet<Resource[]>('/resources', {
    keyword: filters.keyword,
    category: filters.category,
    limit: filters.limit,
  })
}

export function fetchResourceById(id: number): Promise<Resource> {
  if (USE_MOCK_DATA) {
    return mockFetchResourceById(id)
  }

  return apiGet<Resource>(`/resources/${id}`)
}
