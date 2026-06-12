import styles from './StatusMessage.module.css'

interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Đang tải dữ liệu…' }: LoadingStateProps) {
  return (
    <p className={styles.loading} role="status" aria-live="polite">
      {label}
    </p>
  )
}
