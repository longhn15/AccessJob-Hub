export function getFieldAriaProps(id: string, error?: string, hint?: string) {
  const errorId = `${id}-error`
  const hintId = hint ? `${id}-hint` : undefined
  const describedBy = [hintId, error ? errorId : undefined].filter(Boolean).join(' ') || undefined

  return {
    id,
    'aria-invalid': !!error,
    'aria-describedby': describedBy,
  }
}
