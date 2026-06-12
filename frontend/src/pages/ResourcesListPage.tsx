import { useEffect, useState } from 'react'
import { fetchResources } from '../api/resources'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { ResourceCard } from '../components/resources/ResourceCard'
import { ResourceFilters } from '../components/resources/ResourceFilters'
import type { Resource, ResourceFilters as ResourceFiltersType } from '../types/resource'
import styles from './ResourcesListPage.module.css'

export function ResourcesListPage() {
  const [draftFilters, setDraftFilters] = useState<ResourceFiltersType>({})
  const [appliedFilters, setAppliedFilters] = useState<ResourceFiltersType>({})
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    const filters = appliedFilters

    fetchResources(filters)
      .then((data) => {
        if (!cancelled) {
          setResources(data)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Không thể tải danh sách tài nguyên.'
          setError(message)
          setResources([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [appliedFilters, reloadKey])

  function handleApplyFilters() {
    setLoading(true)
    setError(null)
    setAppliedFilters({ ...draftFilters })
  }

  function handleRetry() {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Tài nguyên học tập</h1>
        <p className={styles.intro}>
          Tài liệu về WCAG, kỹ năng số và việc làm dễ tiếp cận. Dùng bộ lọc để thu hẹp kết quả.
        </p>
      </header>

      <div className={styles.layout}>
        <ResourceFilters
          filters={draftFilters}
          onChange={setDraftFilters}
          onSubmit={handleApplyFilters}
        />

        <section className={styles.results} aria-labelledby="resources-results-heading">
          <h2 id="resources-results-heading" className={styles.resultsHeading}>
            Kết quả tìm kiếm
          </h2>

          {!loading && !error && (
            <p className={styles.resultCount} role="status" aria-live="polite">
              {resources.length === 0
                ? 'Không có tài nguyên nào khớp bộ lọc.'
                : `Tìm thấy ${resources.length} tài nguyên.`}
            </p>
          )}

          {loading && <LoadingState label="Đang tải danh sách tài nguyên…" />}

          {error && <ErrorState message={error} onRetry={handleRetry} />}

          {!loading && !error && resources.length === 0 && (
            <EmptyState
              title="Chưa có kết quả"
              description="Thử đổi từ khóa hoặc danh mục để tìm tài nguyên phù hợp hơn."
            />
          )}

          {!loading && !error && resources.length > 0 && (
            <ul className={styles.list}>
              {resources.map((resource) => (
                <li key={resource.id}>
                  <ResourceCard resource={resource} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
