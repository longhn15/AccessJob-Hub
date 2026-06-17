const RESOURCE_TYPE_LABELS: Record<string, string> = {
  guide: 'Hướng dẫn',
  checklist: 'Checklist',
  template: 'Mẫu tài liệu',
  tool: 'Công cụ',
  article: 'Bài viết',
}

const DIFFICULTY_LABELS: Record<string, string> = {
  basic: 'Cơ bản',
  intermediate: 'Trung bình',
}

export function formatResourceType(type: string | null | undefined): string | null {
  if (!type) return null
  return RESOURCE_TYPE_LABELS[type] ?? type
}

export function formatDifficultyLevel(level: string | null | undefined): string | null {
  if (!level) return null
  return DIFFICULTY_LABELS[level] ?? level
}

export function resourceDisplaySummary(resource: {
  summary?: string | null
  description: string
}): string {
  const summary = resource.summary?.trim()
  if (summary) return summary
  return resource.description
}

export function resourceExternalUrl(resource: {
  sourceUrl?: string | null
  url?: string | null
}): string | null {
  const source = resource.sourceUrl?.trim()
  if (source) return source
  const legacy = resource.url?.trim()
  return legacy || null
}
