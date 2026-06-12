export interface ApplicationRequest {
  jobId: number
  fullName: string
  email: string
  phone?: string
  message?: string
}

export interface ApplicationResponse {
  id: number
  message: string
  status: string
  createdAt: string
}
