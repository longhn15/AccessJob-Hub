export interface Job {
  id: number
  title: string
  companyName: string
  location: string
  workType: string
  experienceLevel?: string | null
  salaryRange?: string | null
  workPlace?: string | null
  remoteAvailable: boolean
  accessibilitySupport: string
  shortDescription: string
  fullDescription: string
  requirements: string
  contactEmail: string
  createdAt: string
  updatedAt: string
}

export interface JobFilters {
  keyword?: string
  location?: string
  workType?: string
  experienceLevel?: string
  salaryRange?: string
  workPlace?: string
  remoteAvailable?: boolean
  limit?: number
}
