import styles from './Form.module.css'

interface ErrorMessageProps {
  id: string
  message: string
}

export function ErrorMessage({ id, message }: ErrorMessageProps) {
  return (
    <p id={id} className={styles.errorMessage} role="alert">
      <span className={styles.srOnly}>Lỗi: </span>
      {message}
    </p>
  )
}
