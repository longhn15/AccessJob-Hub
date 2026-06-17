import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchResourceById } from '../api/resources'
import { getRelatedGuides, getResourceGuide } from '../data/resourceGuides'
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
    return (
      <div className={styles.page}>
        <h1>Chi tiết tài nguyên</h1>
        <LoadingState label="Đang tải chi tiết tài nguyên…" />
      </div>
    )
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

  const guide = getResourceGuide(resource.id)
  const relatedGuides = getRelatedGuides(guide?.relatedResourceIds)

  return (
    <article className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Điều hướng">
        <Link to="/resources" className={styles.backLink}>
          ← Quay lại danh sách tài nguyên
        </Link>
      </nav>

      <header className={styles.header}>
        <h1>{resource.title}</h1>
        <dl className={styles.metaList}>
          <div className={styles.metaItem}>
            <dt>Danh mục</dt>
            <dd>
              <Badge label={resource.category} ariaLabel={`Danh mục: ${resource.category}`} />
            </dd>
          </div>
          {guide && (
            <>
              <div className={styles.metaItem}>
                <dt>Loại tài nguyên</dt>
                <dd>{guide.type}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Thời gian đọc</dt>
                <dd>{guide.readingMinutes} phút</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Mức độ</dt>
                <dd>{guide.level}</dd>
              </div>
            </>
          )}
        </dl>
      </header>

      <div className={styles.content}>
        {guide ? (
          <>
            <section aria-labelledby="resource-summary-heading">
              <h2 id="resource-summary-heading">Tóm tắt</h2>
              <p>{guide.summary}</p>
            </section>

            <section aria-labelledby="resource-audience-heading">
              <h2 id="resource-audience-heading">Phù hợp với ai?</h2>
              <ul className={styles.bulletList}>
                {guide.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="resource-outcomes-heading">
              <h2 id="resource-outcomes-heading">Bạn sẽ học được gì?</h2>
              <ul className={styles.bulletList}>
                {guide.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="resource-steps-heading">
              <h2 id="resource-steps-heading">Cách áp dụng nhanh</h2>
              <ol className={styles.numberedList}>
                {guide.quickSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section className={styles.checklistSection} aria-labelledby="resource-checklist-heading">
              <h2 id="resource-checklist-heading">Checklist tự kiểm tra</h2>
              <ul className={styles.bulletList}>
                {guide.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {guide.wcagRefs && guide.wcagRefs.length > 0 && (
              <section aria-labelledby="resource-wcag-heading">
                <h2 id="resource-wcag-heading">Liên quan WCAG và tìm việc</h2>
                <ul className={styles.bulletList}>
                  {guide.wcagRefs.map((ref) => (
                    <li key={ref}>{ref}</li>
                  ))}
                </ul>
                <p className={styles.disclaimer}>
                  Nội dung mang tính hướng dẫn tham khảo; không phải chứng nhận WCAG chính thức.
                </p>
              </section>
            )}
          </>
        ) : (
          <section aria-labelledby="resource-description-heading">
            <h2 id="resource-description-heading">Mô tả</h2>
            <p>{resource.description}</p>
          </section>
        )}

        {resource.url && (
          <section aria-labelledby="resource-link-heading">
            <h2 id="resource-link-heading">Nguồn tham khảo</h2>
            <p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Mở nguồn tham khảo: ${resource.title} (mở tab mới)`}
              >
                Mở trang gốc
                <span className={styles.srOnly}> (mở tab mới)</span>
                <span aria-hidden="true"> ↗</span>
              </a>
            </p>
          </section>
        )}

        {relatedGuides.length > 0 && (
          <section aria-labelledby="resource-related-heading">
            <h2 id="resource-related-heading">Tài nguyên liên quan</h2>
            <ul className={styles.relatedList}>
              {relatedGuides.map((related) => (
                <li key={related.resourceId}>
                  <Link to={`/resources/${related.resourceId}`}>
                    {related.title}
                    <span className={styles.relatedMeta}>
                      {' '}
                      — {related.type}, {related.readingMinutes} phút
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  )
}
