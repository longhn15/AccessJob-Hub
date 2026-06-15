import { type FormEvent, useId } from 'react'
import type { JobFilters as JobFiltersType } from '../../types/job'
import styles from './JobFilters.module.css'

interface JobFiltersProps {
  filters: JobFiltersType
  onChange: (filters: JobFiltersType) => void
  onSubmit: () => void
  onReset?: () => void
  hasActiveFilters?: boolean
}

const WORK_TYPE_OPTIONS = [
  { value: '', label: 'Tất cả hình thức' },
  { value: 'full-time', label: 'Toàn thời gian' },
  { value: 'part-time', label: 'Bán thời gian' },
  { value: 'contract', label: 'Hợp đồng' },
  { value: 'internship', label: 'Thực tập' },
]

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Tất cả kinh nghiệm' },
  { value: 'none', label: 'Chưa yêu cầu kinh nghiệm' },
  { value: 'under-1', label: 'Dưới 1 năm' },
  { value: '1-2', label: '1–2 năm' },
  { value: '3-plus', label: '3+ năm' },
]

const SALARY_OPTIONS = [
  { value: '', label: 'Tất cả mức lương' },
  { value: 'under-5m', label: 'Dưới 5 triệu' },
  { value: '5-10m', label: '5–10 triệu' },
  { value: '10-15m', label: '10–15 triệu' },
  { value: 'over-15m', label: 'Trên 15 triệu' },
  { value: 'negotiable', label: 'Thỏa thuận' },
]

const WORK_PLACE_OPTIONS = [
  { value: '', label: 'Tất cả vị trí' },
  { value: 'remote', label: 'Từ xa' },
  { value: 'hue', label: 'Huế' },
  { value: 'da-nang', label: 'Đà Nẵng' },
  { value: 'hanoi', label: 'Hà Nội' },
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'hybrid', label: 'Hybrid' },
]

export function JobFilters({
  filters,
  onChange,
  onSubmit,
  onReset,
  hasActiveFilters = false,
}: JobFiltersProps) {
  const formId = useId()
  const keywordId = `${formId}-keyword`
  const workTypeId = `${formId}-workType`
  const experienceId = `${formId}-experience`
  const salaryId = `${formId}-salary`
  const workPlaceId = `${formId}-workPlace`
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
          <label htmlFor={experienceId}>Kinh nghiệm</label>
          <select
            id={experienceId}
            name="experienceLevel"
            value={filters.experienceLevel ?? ''}
            onChange={(e) =>
              onChange({ ...filters, experienceLevel: e.target.value || undefined })
            }
          >
            {EXPERIENCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor={salaryId}>Mức lương</label>
          <select
            id={salaryId}
            name="salaryRange"
            value={filters.salaryRange ?? ''}
            onChange={(e) =>
              onChange({ ...filters, salaryRange: e.target.value || undefined })
            }
          >
            {SALARY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor={workPlaceId}>Vị trí tuyển dụng / địa điểm làm việc</label>
          <select
            id={workPlaceId}
            name="workPlace"
            value={filters.workPlace ?? ''}
            onChange={(e) =>
              onChange({ ...filters, workPlace: e.target.value || undefined })
            }
          >
            {WORK_PLACE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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

        {onReset && (
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
            disabled={!hasActiveFilters}
          >
            Xóa bộ lọc
          </button>
        )}
      </form>
    </aside>
  )
}
