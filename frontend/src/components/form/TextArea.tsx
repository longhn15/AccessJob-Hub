import type { TextareaHTMLAttributes } from 'react'
import styles from './Form.module.css'

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  hasError?: boolean
}

export function TextArea({ hasError, disabled, ...props }: TextAreaProps) {
  const className = hasError ? `${styles.textarea} ${styles.controlInvalid}` : styles.textarea

  return <textarea {...props} className={className} disabled={disabled} />
}
