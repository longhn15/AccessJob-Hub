import type { ApiErrorBody } from '../types/api'

export type FieldErrors = Record<string, string>

export function mapApiFieldErrors(body?: ApiErrorBody): FieldErrors {
  if (!body?.fieldErrors?.length) return {}
  return Object.fromEntries(body.fieldErrors.map((item) => [item.field, item.message]))
}

export function countFieldErrors(errors: FieldErrors): number {
  return Object.keys(errors).length
}

/** Scroll element ra giữa viewport. */
export function scrollElementIntoViewCenter(element: HTMLElement): void {
  element.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' })
}

/** Focus và scroll message tổng (success / lỗi form) ra giữa trang. */
export function focusAndScrollMessage(el: HTMLElement | null): void {
  if (!el) return
  el.focus({ preventScroll: true })
  scrollElementIntoViewCenter(el)
}

/** Sau submit lỗi — focus Error Summary và đưa ra giữa viewport. */
export function focusErrorSummary(element: HTMLElement | null): void {
  if (!element) return

  const apply = () => {
    element.focus({ preventScroll: true })
    scrollElementIntoViewCenter(element)
  }

  apply()
  requestAnimationFrame(() => {
    apply()
    requestAnimationFrame(apply)
  })
}

/** Chỉ gọi khi user bấm button trong Error Summary. */
export function focusFieldFromSummaryLink(fieldId: string): void {
  const control = document.getElementById(fieldId)
  if (!control) return
  control.focus({ preventScroll: true })
  scrollElementIntoViewCenter(control)
}
