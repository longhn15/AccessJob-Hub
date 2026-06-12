export interface ApiErrorBody {
  message: string
  timestamp?: string
  fieldErrors?: Array<{ field: string; message: string }>
}

export class ApiError extends Error {
  readonly status: number
  readonly body?: ApiErrorBody

  constructor(status: number, message: string, body?: ApiErrorBody) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}
