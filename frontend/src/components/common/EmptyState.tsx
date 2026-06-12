import styles from './StatusMessage.module.css'

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.empty} role="status" aria-live="polite">
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyText}>{description}</p>
    </div>
  )
}
