import { useEffect, useState } from 'react'
import { fetchJobs } from '../api/jobs'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { JobCard } from '../components/jobs/JobCard'
import { JobFilters } from '../components/jobs/JobFilters'
import type { Job, JobFilters as JobFiltersType } from '../types/job'
import { hasActiveJobFilters } from '../utils/jobFilters'
import styles from './JobsListPage.module.css'

export function JobsListPage() {
  const [draftFilters, setDraftFilters] = useState<JobFiltersType>({})
  const [appliedFilters, setAppliedFilters] = useState<JobFiltersType>({})
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    const filters = appliedFilters

    fetchJobs(filters)
      .then((data) => {
        if (!cancelled) {
          setJobs(data)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Không thể tải danh sách việc làm.'
          setError(message)
          setJobs([])
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

  const filtersActive = hasActiveJobFilters(appliedFilters)

  function handleRetry() {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Danh sách việc làm</h1>
        <p className={styles.intro}>
          Tìm việc làm phù hợp với hỗ trợ tiếp cận. Dùng bộ lọc bên dưới và Tab để di chuyển giữa các
          trường.
        </p>
      </header>

      <div className={styles.layout}>
        <JobFilters
          filters={draftFilters}
          onChange={setDraftFilters}
          onSubmit={handleApplyFilters}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveJobFilters(draftFilters) || filtersActive}
        />

        <section className={styles.results} aria-labelledby="jobs-results-heading">
          <h2 id="jobs-results-heading" className={styles.resultsHeading}>
            Kết quả tìm kiếm
          </h2>

          {!loading && !error && (
            <p className={styles.resultCount} role="status" aria-live="polite">
              {jobs.length === 0
                ? filtersActive
                  ? 'Không tìm thấy việc làm phù hợp với bộ lọc hiện tại.'
                  : 'Chưa có việc làm nào trong hệ thống.'
                : `Tìm thấy ${jobs.length} việc làm${filtersActive ? ' phù hợp bộ lọc' : ''}.`}
            </p>
          )}

          {loading && <LoadingState label="Đang tải danh sách việc làm…" />}

          {error && <ErrorState message={error} onRetry={handleRetry} />}

          {!loading && !error && jobs.length === 0 && (
            <EmptyState
              title="Không tìm thấy việc làm phù hợp"
              description={
                filtersActive
                  ? 'Hãy thử thay đổi hoặc xóa bớt bộ lọc để xem thêm kết quả.'
                  : 'Hiện chưa có tin tuyển dụng. Vui lòng quay lại sau.'
              }
            />
          )}

          {!loading && !error && jobs.length > 0 && (
            <ul className={styles.list}>
              {jobs.map((job) => (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
