import styles from './Badge.module.css'

interface BadgeProps {
  label: string
  ariaLabel?: string
}

export function Badge({ label, ariaLabel }: BadgeProps) {
  return (
    <span className={styles.badge} aria-label={ariaLabel ?? label}>
      {label}
    </span>
  )
}
