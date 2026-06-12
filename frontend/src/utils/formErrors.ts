import type { ApiErrorBody } from '../types/api'

export type FieldErrors = Record<string, string>

export function mapApiFieldErrors(body?: ApiErrorBody): FieldErrors {
  if (!body?.fieldErrors?.length) return {}
  return Object.fromEntries(body.fieldErrors.map((item) => [item.field, item.message]))
}

export function countFieldErrors(errors: FieldErrors): number {
  return Object.keys(errors).length
}
