export const RESOURCE_TYPE_FILTER_OPTIONS = [
  { value: '', label: 'Tất cả loại' },
  { value: 'guide', label: 'Hướng dẫn' },
  { value: 'checklist', label: 'Checklist' },
  { value: 'template', label: 'Mẫu tài liệu' },
  { value: 'tool', label: 'Công cụ' },
  { value: 'article', label: 'Bài viết' },
] as const

export const DIFFICULTY_FILTER_OPTIONS = [
  { value: '', label: 'Tất cả mức độ' },
  { value: 'basic', label: 'Cơ bản' },
  { value: 'intermediate', label: 'Trung bình' },
] as const
