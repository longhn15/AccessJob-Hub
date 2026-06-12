import styles from './Form.module.css'

interface StatusMessageProps {
  variant: 'success' | 'error'
  message: string
  id?: string
}

export function StatusMessage({ variant, message, id }: StatusMessageProps) {
  const className = variant === 'success' ? styles.statusSuccess : styles.statusError

  if (variant === 'success') {
    return (
      <p id={id} className={className} role="status" aria-live="polite">
        <strong>Thành công:</strong> {message}
      </p>
    )
  }

  return (
    <p id={id} className={className} role="alert" aria-live="assertive">
      <strong>Lỗi:</strong> {message}
    </p>
  )
}
