export type ResourceGuideType =
  | 'Bài viết'
  | 'Checklist'
  | 'Mẫu tài liệu'
  | 'Công cụ'
  | 'Hướng dẫn'

export type ResourceGuideLevel = 'Cơ bản' | 'Trung bình'

export interface ResourceGuide {
  resourceId: number
  title: string
  type: ResourceGuideType
  level: ResourceGuideLevel
  readingMinutes: number
  audience: string[]
  summary: string
  outcomes: string[]
  quickSteps: string[]
  checklist: string[]
  wcagRefs?: string[]
  relatedResourceIds?: number[]
}
