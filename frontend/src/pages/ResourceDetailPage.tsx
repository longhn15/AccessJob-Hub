import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchResourceById } from '../api/resources'
import { Badge } from '../components/common/Badge'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { ApiError } from '../types/api'
import type { Resource } from '../types/resource'
import styles from './ResourceDetailPage.module.css'

function NotFoundView() {
  return (
    <div className={styles.page}>
      <h1>Không tìm thấy tài nguyên</h1>
      <p role="status">
        Tài nguyên bạn tìm không tồn tại hoặc đã ngừng hiển thị. Vui lòng quay lại danh sách.
      </p>
      <p>
        <Link to="/resources" className={styles.backLink}>
          ← Quay lại danh sách tài nguyên
        </Link>
      </p>
    </div>
  )
}

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const resourceId = Number(id)
  const isInvalidId = !id || Number.isNaN(resourceId)

  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(!isInvalidId)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (isInvalidId) return

    let cancelled = false

    fetchResourceById(resourceId)
      .then((data) => {
        if (!cancelled) setResource(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 404) {
            setNotFound(true)
            setResource(null)
          } else {
            const message =
              err instanceof Error ? err.message : 'Không thể tải chi tiết tài nguyên.'
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
  }, [isInvalidId, resourceId])

  if (isInvalidId || notFound) {
    return <NotFoundView />
  }

  if (loading) {
    return <LoadingState label="Đang tải chi tiết tài nguyên…" />
  }

  if (error || !resource) {
    return (
      <div className={styles.page}>
        <h1>Chi tiết tài nguyên</h1>
        <ErrorState message={error ?? 'Không thể tải dữ liệu.'} />
        <p>
          <Link to="/resources" className={styles.backLink}>
            ← Quay lại danh sách tài nguyên
          </Link>
        </p>
      </div>
    )
  }

  return (
    <article className={styles.page}>
      <p>
        <Link to="/resources" className={styles.backLink}>
          ← Quay lại danh sách tài nguyên
        </Link>
      </p>

      <header className={styles.header}>
        <h1>{resource.title}</h1>
        <Badge label={resource.category} ariaLabel={`Danh mục: ${resource.category}`} />
      </header>

      <section aria-labelledby="resource-description-heading">
        <h2 id="resource-description-heading">Mô tả</h2>
        <p>{resource.description}</p>
      </section>

      {resource.url && (
        <section aria-labelledby="resource-link-heading">
          <h2 id="resource-link-heading">Liên kết</h2>
          <p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Mở tài nguyên trên trang gốc
              <span className={styles.srOnly}> (mở tab mới)</span>
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
        </section>
      )}
    </article>
  )
}
