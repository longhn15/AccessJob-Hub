import { forwardRef } from 'react'
import styles from './Form.module.css'

interface StatusMessageProps {
  variant: 'success' | 'error'
  message: string
  id?: string
}

export const StatusMessage = forwardRef<HTMLParagraphElement, StatusMessageProps>(
  function StatusMessage({ variant, message, id }, ref) {
    const className =
      variant === 'success'
        ? `${styles.statusSuccess} ${styles.messageFocusTarget}`
        : `${styles.statusError} ${styles.messageFocusTarget}`

    if (variant === 'success') {
      return (
        <p
          ref={ref}
          id={id}
          className={className}
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          <strong>Thành công:</strong> {message}
        </p>
      )
    }

    return (
      <p
        ref={ref}
        id={id}
        className={className}
        role="alert"
        aria-live="assertive"
        tabIndex={-1}
      >
        <strong>Lỗi:</strong> {message}
      </p>
    )
  },
)
