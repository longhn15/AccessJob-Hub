import styles from './StatusMessage.module.css'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className={styles.empty} role="status" aria-live="polite">
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyText}>{description}</p>
      {actionLabel && onAction && (
        <p className={styles.emptyAction}>
          <button type="button" className={styles.emptyButton} onClick={onAction}>
            {actionLabel}
          </button>
        </p>
      )}
    </div>
  )
}
