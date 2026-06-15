import { useEffect, useState } from 'react'
import { fetchResources } from '../api/resources'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { ResourceCard } from '../components/resources/ResourceCard'
import { ResourceFilters } from '../components/resources/ResourceFilters'
import type { Resource, ResourceFilters as ResourceFiltersType } from '../types/resource'
import { hasActiveResourceFilters } from '../utils/resourceFilters'
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

  function handleResetFilters() {
    setDraftFilters({})
    setLoading(true)
    setError(null)
    setAppliedFilters({})
  }

  function handleRetry() {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  const filtersActive = hasActiveResourceFilters(appliedFilters)

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Tài nguyên hỗ trợ tìm việc</h1>
        <p className={styles.intro}>
          Tài liệu về WCAG, kỹ năng số và việc làm dễ tiếp cận — hỗ trợ bạn đáp ứng nhu cầu hỗ trợ
          tiếp cận khi tìm việc. Dùng từ khóa và danh mục bên dưới để thu hẹp kết quả.
        </p>
      </header>

      <div className={styles.layout}>
        <ResourceFilters
          filters={draftFilters}
          onChange={setDraftFilters}
          onSubmit={handleApplyFilters}
          onReset={handleResetFilters}
          hasActiveFilters={
            hasActiveResourceFilters(draftFilters) || filtersActive
          }
        />

        <section className={styles.results} aria-labelledby="resources-results-heading">
          <h2 id="resources-results-heading" className={styles.resultsHeading}>
            Kết quả tìm kiếm
          </h2>

          {!loading && !error && (
            <p className={styles.resultCount} role="status" aria-live="polite">
              {resources.length === 0
                ? filtersActive
                  ? 'Không tìm thấy tài nguyên phù hợp với bộ lọc hiện tại.'
                  : 'Chưa có tài nguyên nào trong hệ thống.'
                : `Tìm thấy ${resources.length} tài nguyên phù hợp.`}
            </p>
          )}

          {loading && <LoadingState label="Đang tải danh sách tài nguyên…" />}

          {error && <ErrorState message={error} onRetry={handleRetry} />}

          {!loading && !error && resources.length === 0 && (
            <EmptyState
              title="Không tìm thấy tài nguyên phù hợp"
              description="Bạn có thể thử từ khóa ngắn hơn, chọn danh mục “Tất cả” hoặc xóa bộ lọc."
              actionLabel={filtersActive ? 'Xóa bộ lọc' : undefined}
              onAction={filtersActive ? handleResetFilters : undefined}
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
