import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchResourceById } from '../api/resources'
import { Badge } from '../components/common/Badge'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { ApiError } from '../types/api'
import type { Resource } from '../types/resource'
import {
  formatDifficultyLevel,
  formatResourceType,
  resourceDisplaySummary,
  resourceExternalUrl,
} from '../utils/resourceLabels'
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

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <span className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}:</span> {value}
    </span>
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

  const summary = resourceDisplaySummary(resource)
  const typeLabel = formatResourceType(resource.resourceType)
  const difficultyLabel = formatDifficultyLevel(resource.difficultyLevel)
  const externalUrl = resourceExternalUrl(resource)
  const audience = resource.audience ?? []
  const keyTakeaways = resource.keyTakeaways ?? []
  const actionSteps = resource.actionSteps ?? []
  const checklist = resource.checklist ?? []
  const wcagRefs = resource.wcagRefs ?? []
  const hasExample = Boolean(resource.exampleContent?.trim())

  return (
    <article className={styles.page}>
      <p>
        <Link to="/resources" className={styles.backLink}>
          ← Quay lại danh sách tài nguyên
        </Link>
      </p>

      <header className={styles.header}>
        <h1>{resource.title}</h1>
        <div className={styles.metaRow}>
          <Badge label={resource.category} ariaLabel={`Danh mục: ${resource.category}`} />
          {typeLabel && <MetaItem label="Loại" value={typeLabel} />}
          {difficultyLabel && <MetaItem label="Mức độ" value={difficultyLabel} />}
          {resource.estimatedReadMinutes != null && resource.estimatedReadMinutes > 0 && (
            <MetaItem label="Thời gian đọc" value={`${resource.estimatedReadMinutes} phút`} />
          )}
        </div>
      </header>

      <section className={styles.section} aria-labelledby="resource-summary-heading">
        <h2 id="resource-summary-heading">Tóm tắt</h2>
        <p>{summary}</p>
      </section>

      {audience.length > 0 && (
        <section className={styles.section} aria-labelledby="resource-audience-heading">
          <h2 id="resource-audience-heading">Phù hợp với ai?</h2>
          <ul className={styles.bulletList}>
            {audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {keyTakeaways.length > 0 && (
        <section className={styles.section} aria-labelledby="resource-takeaways-heading">
          <h2 id="resource-takeaways-heading">Bạn sẽ học được gì?</h2>
          <ul className={styles.bulletList}>
            {keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {resource.content?.trim() && (
        <section className={styles.section} aria-labelledby="resource-content-heading">
          <h2 id="resource-content-heading">Nội dung hướng dẫn</h2>
          {resource.content.split(/\n\n+/).map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {actionSteps.length > 0 && (
        <section className={styles.section} aria-labelledby="resource-steps-heading">
          <h2 id="resource-steps-heading">Các bước áp dụng nhanh</h2>
          <ol className={styles.numberedList}>
            {actionSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {hasExample && (
        <section className={styles.exampleSection} aria-labelledby="resource-example-heading">
          <h2 id="resource-example-heading">
            {resource.exampleTitle?.trim() || 'Mẫu tham khảo'}
          </h2>
          {resource.exampleContext?.trim() && (
            <p className={styles.exampleContext}>{resource.exampleContext}</p>
          )}
          <blockquote className={styles.exampleBlock}>
            <p>{resource.exampleContent}</p>
          </blockquote>
          {resource.exampleNote?.trim() && (
            <p className={styles.exampleNote}>
              <strong>Lưu ý:</strong> {resource.exampleNote}
            </p>
          )}
        </section>
      )}

      {checklist.length > 0 && (
        <section className={styles.section} aria-labelledby="resource-checklist-heading">
          <h2 id="resource-checklist-heading">Checklist tự kiểm tra</h2>
          <ul className={styles.checklist}>
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {wcagRefs.length > 0 && (
        <section className={styles.section} aria-labelledby="resource-wcag-heading">
          <h2 id="resource-wcag-heading">Liên quan đến WCAG 2.2</h2>
          <p>Các tiêu chí tham khảo: {wcagRefs.join(', ')}</p>
        </section>
      )}

      {(resource.sourceName?.trim() || externalUrl) && (
        <section className={styles.section} aria-labelledby="resource-source-heading">
          <h2 id="resource-source-heading">Nguồn tham khảo</h2>
          {resource.sourceName?.trim() && <p>{resource.sourceName}</p>}
          {externalUrl && (
            <p>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  resource.sourceName?.trim()
                    ? `Mở nguồn: ${resource.sourceName} (mở tab mới)`
                    : 'Mở liên kết nguồn tham khảo (mở tab mới)'
                }
              >
                {externalUrl}
                <span className={styles.srOnly}> (mở tab mới)</span>
                <span aria-hidden="true"> ↗</span>
              </a>
            </p>
          )}
        </section>
      )}
    </article>
  )
}
