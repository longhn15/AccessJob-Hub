import type { FieldErrors } from '../../utils/formErrors'
import styles from './Form.module.css'

const FIELD_LABELS: Record<string, string> = {
  fullName: 'Họ và tên',
  email: 'Email',
  phone: 'Số điện thoại',
  message: 'Tin nhắn',
  category: 'Danh mục phản hồi',
  description: 'Mô tả',
  contactEmail: 'Email liên hệ',
  jobId: 'Việc làm',
}

interface ErrorSummaryProps {
  errors: FieldErrors
  formId?: string
}

export function ErrorSummary({ errors, formId }: ErrorSummaryProps) {
  const entries = Object.entries(errors)
  if (entries.length < 2) return null

  const summaryId = formId ? `${formId}-error-summary` : 'form-error-summary'

  return (
    <div
      id={summaryId}
      className={styles.errorSummary}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
    >
      <p className={styles.errorSummaryTitle}>
        Có {entries.length} lỗi trong form. Vui lòng sửa các trường sau:
      </p>
      <ul className={styles.errorSummaryList}>
        {entries.map(([field, message]) => (
          <li key={field}>
            <a
              href={`#${field}`}
              onClick={(event) => {
                event.preventDefault()
                const control = document.getElementById(field)
                control?.focus()
                control?.scrollIntoView({ block: 'nearest' })
              }}
            >
              {FIELD_LABELS[field] ?? field}: {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
