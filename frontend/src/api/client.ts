import { ApiError, type ApiErrorBody } from '../types/api'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api'

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${API_BASE}${path}`, window.location.origin)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === '') continue
      url.searchParams.set(key, String(value))
    }
  }

  return url.pathname + url.search
}

export async function apiGet<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
  const url = buildUrl(path, params)
  const response = await fetch(url)

  if (!response.ok) {
    let body: ApiErrorBody | undefined
    try {
      body = (await response.json()) as ApiErrorBody
    } catch {
      body = undefined
    }
    const message = body?.message ?? `Yêu cầu thất bại (mã ${response.status}).`
    throw new ApiError(response.status, message, body)
  }

  return (await response.json()) as T
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const url = buildUrl(path)
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let errorBody: ApiErrorBody | undefined
    try {
      errorBody = (await response.json()) as ApiErrorBody
    } catch {
      errorBody = undefined
    }
    const message = errorBody?.message ?? `Yêu cầu thất bại (mã ${response.status}).`
    throw new ApiError(response.status, message, errorBody)
  }

  return (await response.json()) as T
}
