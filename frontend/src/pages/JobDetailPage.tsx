import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchJobById } from '../api/jobs'
import { ApplicationForm } from '../components/applications/ApplicationForm'
import { Badge } from '../components/common/Badge'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { ApiError } from '../types/api'
import type { Job } from '../types/job'
import {
  formatExperienceLevel,
  formatSalaryRange,
  formatWorkMode,
  formatWorkType,
  parseRequirementItems,
} from '../utils/jobLabels'
import styles from './JobDetailPage.module.css'

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
    return (
      <div className={styles.page}>
        <h1>Chi tiết việc làm</h1>
        <LoadingState label="Đang tải chi tiết việc làm…" />
      </div>
    )
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
  const workModeLabel = formatWorkMode(job)
  const experienceLabel = formatExperienceLevel(job.experienceLevel)
  const salaryLabel = formatSalaryRange(job.salaryRange)
  const requirementItems = parseRequirementItems(job.requirements)

  return (
    <article className={styles.page}>
      <p>
        <Link to="/jobs" className={styles.backLink}>
          ← Quay lại danh sách việc làm
        </Link>
      </p>

      <header className={styles.header}>
        <h1>{job.title}</h1>
      </header>

      <div className={styles.content}>
        <section className={styles.overviewSection} aria-labelledby="job-overview-heading">
          <h2 id="job-overview-heading">Tổng quan công việc</h2>
          <dl className={styles.overviewList}>
            <div className={styles.overviewItem}>
              <dt>Tổ chức</dt>
              <dd>{job.companyName}</dd>
            </div>
            <div className={styles.overviewItem}>
              <dt>Địa điểm</dt>
              <dd>{job.location}</dd>
            </div>
            <div className={styles.overviewItem}>
              <dt>Hình thức làm việc</dt>
              <dd>
                <Badge
                  label={workModeLabel}
                  ariaLabel={`Hình thức làm việc: ${workModeLabel}`}
                />
              </dd>
            </div>
            <div className={styles.overviewItem}>
              <dt>Loại hình</dt>
              <dd>
                <Badge label={workTypeLabel} ariaLabel={`Loại hình: ${workTypeLabel}`} />
              </dd>
            </div>
            {experienceLabel && (
              <div className={styles.overviewItem}>
                <dt>Kinh nghiệm</dt>
                <dd>{experienceLabel}</dd>
              </div>
            )}
            {salaryLabel && (
              <div className={styles.overviewItem}>
                <dt>Mức lương</dt>
                <dd>{salaryLabel}</dd>
              </div>
            )}
          </dl>
        </section>

        <section aria-labelledby="job-description-heading">
          <h2 id="job-description-heading">Mô tả công việc</h2>
          <p>{job.fullDescription}</p>
        </section>

        <section aria-labelledby="job-requirements-heading">
          <h2 id="job-requirements-heading">Yêu cầu và kỹ năng</h2>
          {requirementItems.length > 1 ? (
            <ul className={styles.bulletList}>
              {requirementItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{job.requirements}</p>
          )}
        </section>

        <section aria-labelledby="job-compensation-heading">
          <h2 id="job-compensation-heading">Mức lương và hình thức làm việc</h2>
          <ul className={styles.bulletList}>
            <li>
              Mức lương:{' '}
              <strong>{salaryLabel ?? 'Liên hệ để trao đổi'}</strong>
            </li>
            <li>
              Hình thức: <strong>{workModeLabel}</strong> ({workTypeLabel})
            </li>
            <li>
              Địa điểm: <strong>{job.location}</strong>
            </li>
          </ul>
        </section>

        {job.accessibilitySupport && (
          <section className={styles.accessibilitySection} aria-labelledby="job-accessibility-heading">
            <h2 id="job-accessibility-heading">Hỗ trợ tiếp cận</h2>
            <p>{job.accessibilitySupport}</p>
          </section>
        )}

        <section className={styles.applySection} aria-labelledby="job-apply-heading">
          <h2 id="job-apply-heading">Cách ứng tuyển</h2>
          <p>
            Bạn có thể gửi form quan tâm bên dưới hoặc liên hệ qua email:{' '}
            <a href={`mailto:${job.contactEmail}`}>{job.contactEmail}</a>
          </p>
          <ApplicationForm jobId={job.id} jobTitle={job.title} />
        </section>
      </div>
    </article>
  )
}
