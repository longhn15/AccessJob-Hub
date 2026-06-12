import type { ApiErrorBody } from '../types/api'

export type FieldErrors = Record<string, string>

export function mapApiFieldErrors(body?: ApiErrorBody): FieldErrors {
  if (!body?.fieldErrors?.length) return {}
  return Object.fromEntries(body.fieldErrors.map((item) => [item.field, item.message]))
}

export function countFieldErrors(errors: FieldErrors): number {
  return Object.keys(errors).length
}

/** Focus ErrorSummary (≥2 lỗi) hoặc field đầu tiên (1 lỗi) sau submit. */
export function focusFormErrors(
  errors: FieldErrors,
  summaryEl: HTMLElement | null,
): void {
  const keys = Object.keys(errors)
  if (keys.length >= 2) {
    summaryEl?.focus()
    return
  }
  if (keys.length === 1) {
    document.getElementById(keys[0])?.focus()
  }
}
