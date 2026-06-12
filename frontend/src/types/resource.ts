export interface Resource {
  id: number
  title: string
  category: string
  description: string
  url: string | null
  createdAt: string
  updatedAt: string
}

export interface ResourceFilters {
  keyword?: string
  category?: string
  limit?: number
}
