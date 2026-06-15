/** Danh mục từ seed V2 + V4 — khớp cột `resources.category` */
export const RESOURCE_CATEGORIES = [
  'Tiêu chuẩn web',
  'Việc làm',
  'Kỹ năng số',
  'Hồ sơ ứng tuyển',
] as const

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number]
