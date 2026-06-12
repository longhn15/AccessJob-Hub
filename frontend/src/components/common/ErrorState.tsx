import styles from './StatusMessage.module.css'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.error} role="alert" aria-live="assertive">
      <p>
        <strong>Lỗi:</strong> {message}
      </p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Thử lại
        </button>
      )}
    </div>
  )
}
