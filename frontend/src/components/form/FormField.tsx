import type { ReactNode } from 'react'
import { ErrorMessage } from './ErrorMessage'
import styles from './Form.module.css'

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  const errorId = `${id}-error`
  const hintId = hint ? `${id}-hint` : undefined
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <>
            <span className={styles.requiredMark} aria-hidden="true">
              {' '}
              *
            </span>
            <span className={styles.srOnly}> (bắt buộc)</span>
          </>
        )}
      </label>
      {hint && (
        <p id={hintId} className={styles.formHint}>
          {hint}
        </p>
      )}
      {children}
      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  )
}
