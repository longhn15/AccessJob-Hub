import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchJobById } from '../api/jobs'
import { ApplicationForm } from '../components/applications/ApplicationForm'
import { Badge } from '../components/common/Badge'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { ApiError } from '../types/api'
import type { Job } from '../types/job'
import styles from './JobDetailPage.module.css'

function formatWorkType(workType: string): string {
  const map: Record<string, string> = {
    'full-time': 'Toàn thời gian',
    'part-time': 'Bán thời gian',
    contract: 'Hợp đồng',
    internship: 'Thực tập',
  }
  return map[workType] ?? workType
}

function NotFoundView() {
  return (
    <div className={styles.page}>
      <h1>Không tìm thấy việc làm</h1>
      <p role="status">
        Việc làm bạn tìm không tồn tại hoặc đã ngừng hiển thị. Vui lòng quay lại danh sách.
      </p>
      <p>
        <Link to="/jobs" className={styles.backLink}>
          ← Quay lại danh sách việc làm
        </Link>
      </p>
    </div>
  )
}

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const jobId = Number(id)
  const isInvalidId = !id || Number.isNaN(jobId)

  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(!isInvalidId)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (isInvalidId) return

    let cancelled = false

    fetchJobById(jobId)
      .then((data) => {
        if (!cancelled) setJob(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 404) {
            setNotFound(true)
            setJob(null)
          } else {
            const message = err instanceof Error ? err.message : 'Không thể tải chi tiết việc làm.'
            setError(message)
          }
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isInvalidId, jobId])

  if (isInvalidId || notFound) {
    return <NotFoundView />
  }

  if (loading) {
    return <LoadingState label="Đang tải chi tiết việc làm…" />
  }

  if (error || !job) {
    return (
      <div className={styles.page}>
        <h1>Chi tiết việc làm</h1>
        <ErrorState message={error ?? 'Không thể tải dữ liệu.'} />
        <p>
          <Link to="/jobs" className={styles.backLink}>
            ← Quay lại danh sách việc làm
          </Link>
        </p>
      </div>
    )
  }

  const workTypeLabel = formatWorkType(job.workType)

  return (
    <article className={styles.page}>
      <p>
        <Link to="/jobs" className={styles.backLink}>
          ← Quay lại danh sách việc làm
        </Link>
      </p>

      <header className={styles.header}>
        <h1>{job.title}</h1>
        <p className={styles.meta}>
          <span>{job.companyName}</span>
          <span aria-hidden="true"> · </span>
          <span>{job.location}</span>
        </p>
        <div className={styles.badges}>
          <Badge label={workTypeLabel} ariaLabel={`Hình thức: ${workTypeLabel}`} />
          {job.remoteAvailable && (
            <Badge label="Từ xa" ariaLabel="Hình thức: Có thể làm từ xa" />
          )}
        </div>
      </header>

      <div className={styles.content}>
        <section aria-labelledby="job-description-heading">
          <h2 id="job-description-heading">Mô tả công việc</h2>
          <p>{job.fullDescription}</p>
        </section>

        <section aria-labelledby="job-requirements-heading">
          <h2 id="job-requirements-heading">Yêu cầu</h2>
          <p>{job.requirements}</p>
        </section>

        {job.accessibilitySupport && (
          <section className={styles.accessibilitySection} aria-labelledby="job-accessibility-heading">
            <h2 id="job-accessibility-heading">Hỗ trợ tiếp cận</h2>
            <p>{job.accessibilitySupport}</p>
          </section>
        )}

        <section aria-labelledby="job-contact-heading">
          <h2 id="job-contact-heading">Liên hệ</h2>
          <p>
            Email:{' '}
            <a href={`mailto:${job.contactEmail}`}>{job.contactEmail}</a>
          </p>
        </section>

        <ApplicationForm jobId={job.id} jobTitle={job.title} />
      </div>
    </article>
  )
}
