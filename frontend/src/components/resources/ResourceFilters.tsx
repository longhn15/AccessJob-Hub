import { type FormEvent, useId } from 'react'
import { RESOURCE_CATEGORIES } from '../../constants/resourceCategories'
import type { ResourceFilters as ResourceFiltersType } from '../../types/resource'
import styles from './ResourceFilters.module.css'

interface ResourceFiltersProps {
  filters: ResourceFiltersType
  onChange: (filters: ResourceFiltersType) => void
  onSubmit: () => void
  onReset?: () => void
  hasActiveFilters?: boolean
}

const CATEGORY_OPTIONS = [
  { value: '', label: 'Tất cả danh mục' },
  ...RESOURCE_CATEGORIES.map((category) => ({ value: category, label: category })),
]

export function ResourceFilters({
  filters,
  onChange,
  onSubmit,
  onReset,
  hasActiveFilters = false,
}: ResourceFiltersProps) {
  const formId = useId()
  const keywordId = `${formId}-keyword`
  const categoryId = `${formId}-category`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <aside className={styles.aside} aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`} className={styles.heading}>
        Lọc tài nguyên
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
          <label htmlFor={categoryId}>Danh mục</label>
          <select
            id={categoryId}
            name="category"
            value={filters.category ?? ''}
            onChange={(e) =>
              onChange({ ...filters, category: e.target.value || undefined })
            }
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value || 'all'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
