import type { ButtonHTMLAttributes } from 'react'
import styles from './Form.module.css'

interface SubmitButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  loading?: boolean
  loadingLabel?: string
}

export function SubmitButton({
  loading = false,
  loadingLabel = 'Đang gửi…',
  children,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={styles.submitButton}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? loadingLabel : children}
    </button>
  )
}
