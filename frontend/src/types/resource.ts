export interface Resource {
  id: number
  title: string
  category: string
  description: string
  summary?: string | null
  resourceType?: string | null
  difficultyLevel?: string | null
  estimatedReadMinutes?: number | null
  audience: string[]
  tags: string[]
  keyTakeaways: string[]
  content?: string | null
  actionSteps: string[]
  checklist: string[]
  wcagRefs: string[]
  exampleTitle?: string | null
  exampleContext?: string | null
  exampleContent?: string | null
  exampleNote?: string | null
  sourceName?: string | null
  sourceUrl?: string | null
  featured?: boolean
  sortOrder?: number | null
  url?: string | null
  createdAt: string
  updatedAt: string
}

export interface ResourceFilters {
  keyword?: string
  category?: string
  resourceType?: string
  difficultyLevel?: string
  audience?: string
  featured?: boolean
  limit?: number
}
