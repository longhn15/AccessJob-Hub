import { type FormEvent, useId } from 'react'
import type { ResourceFilters as ResourceFiltersType } from '../../types/resource'
import styles from './ResourceFilters.module.css'

interface ResourceFiltersProps {
  filters: ResourceFiltersType
  onChange: (filters: ResourceFiltersType) => void
  onSubmit: () => void
}

export function ResourceFilters({ filters, onChange, onSubmit }: ResourceFiltersProps) {
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
          <input
            id={categoryId}
            name="category"
            type="text"
            value={filters.category ?? ''}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            autoComplete="off"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Áp dụng bộ lọc
        </button>
      </form>
    </aside>
  )
}
