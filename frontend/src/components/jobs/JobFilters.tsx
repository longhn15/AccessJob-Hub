import { type FormEvent, useId } from 'react'
import type { JobFilters as JobFiltersType } from '../../types/job'
import styles from './JobFilters.module.css'

interface JobFiltersProps {
  filters: JobFiltersType
  onChange: (filters: JobFiltersType) => void
  onSubmit: () => void
}

const WORK_TYPE_OPTIONS = [
  { value: '', label: 'Tất cả hình thức' },
  { value: 'full-time', label: 'Toàn thời gian' },
  { value: 'part-time', label: 'Bán thời gian' },
  { value: 'contract', label: 'Hợp đồng' },
  { value: 'internship', label: 'Thực tập' },
]

export function JobFilters({ filters, onChange, onSubmit }: JobFiltersProps) {
  const formId = useId()
  const keywordId = `${formId}-keyword`
  const locationId = `${formId}-location`
  const workTypeId = `${formId}-workType`
  const remoteId = `${formId}-remote`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <aside className={styles.aside} aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`} className={styles.heading}>
        Lọc việc làm
      </h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor={keywordId}>Từ khóa</label>
          <input
            id={keywordId}
            name="keyword"
            type="search"
            value={filters.keyword ?? ''}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={locationId}>Địa điểm</label>
          <input
            id={locationId}
            name="location"
            type="text"
            value={filters.location ?? ''}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={workTypeId}>Hình thức làm việc</label>
          <select
            id={workTypeId}
            name="workType"
            value={filters.workType ?? ''}
            onChange={(e) => onChange({ ...filters, workType: e.target.value || undefined })}
          >
            {WORK_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldCheckbox}>
          <input
            id={remoteId}
            name="remoteAvailable"
            type="checkbox"
            checked={filters.remoteAvailable === true}
            onChange={(e) =>
              onChange({
                ...filters,
                remoteAvailable: e.target.checked ? true : undefined,
              })
            }
          />
          <label htmlFor={remoteId}>Chỉ hiển thị việc làm từ xa</label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Áp dụng bộ lọc
        </button>
      </form>
    </aside>
  )
}
