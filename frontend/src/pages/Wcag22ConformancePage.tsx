import { Link } from 'react-router-dom'
import {
  LEVEL_LABELS,
  STATUS_LABELS,
  TESTING_METHOD_LABELS,
  WCAG22_AAA_CRITERIA,
  WCAG22_AA_CRITERIA,
  type Wcag22Criterion,
} from '../data/wcag22Matrix'
import styles from './Wcag22ConformancePage.module.css'

function StatusBadge({ status }: { status: Wcag22Criterion['status'] }) {
  const label = STATUS_LABELS[status]
  return (
    <span className={`${styles.statusBadge} ${styles[`status_${status}`]}`}>
      {label}
    </span>
  )
}

function CriterionCard({ criterion }: { criterion: Wcag22Criterion }) {
  const { id, name, level, status, evidence, testingMethods, limitations } = criterion

  return (
    <article className={styles.card} aria-labelledby={`card-${id}-title`}>
      <header className={styles.cardHeader}>
        <h3 id={`card-${id}-title`} className={styles.cardTitle}>
          <span className={styles.criterionId}>{id}</span> {name}
        </h3>
        <div className={styles.cardMeta}>
          <span className={styles.levelBadge}>Mức {LEVEL_LABELS[level]}</span>
          <StatusBadge status={status} />
        </div>
      </header>
      <dl className={styles.cardDl}>
        <div>
          <dt>Bằng chứng trong sản phẩm</dt>
          <dd>
            {evidence.route && (
              <p>
                <strong>Route:</strong> {evidence.route}
              </p>
            )}
            {evidence.component && (
              <p>
                <strong>Component / luồng:</strong> {evidence.component}
              </p>
            )}
            <p>{evidence.description}</p>
          </dd>
        </div>
        <div>
          <dt>Cách kiểm thử</dt>
          <dd>
            <ul className={styles.methodList}>
              {testingMethods.map((method) => (
                <li key={method}>{TESTING_METHOD_LABELS[method]}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Ghi chú giới hạn</dt>
          <dd>{limitations}</dd>
        </div>
      </dl>
    </article>
  )
}

function CriterionTable({ criteria, caption }: { criteria: Wcag22Criterion[]; caption: string }) {
  return (
    <div
      className={styles.tableWrapper}
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table className={styles.table}>
        <caption className={styles.tableCaption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Mã</th>
            <th scope="col">Tên tiêu chí</th>
            <th scope="col">Mức</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Bằng chứng</th>
            <th scope="col">Kiểm thử</th>
            <th scope="col">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => (
            <tr key={criterion.id}>
              <th scope="row">{criterion.id}</th>
              <td>{criterion.name}</td>
              <td>{LEVEL_LABELS[criterion.level]}</td>
              <td>
                <StatusBadge status={criterion.status} />
              </td>
              <td>
                {criterion.evidence.route && (
                  <p>
                    <strong>Route:</strong> {criterion.evidence.route}
                  </p>
                )}
                {criterion.evidence.component && (
                  <p>
                    <strong>Component:</strong> {criterion.evidence.component}
                  </p>
                )}
                <p>{criterion.evidence.description}</p>
              </td>
              <td>
                <ul className={styles.methodListCompact}>
                  {criterion.testingMethods.map((method) => (
                    <li key={method}>{TESTING_METHOD_LABELS[method]}</li>
                  ))}
                </ul>
              </td>
              <td>{criterion.limitations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Wcag22ConformancePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Ma trận đối chiếu WCAG 2.2</h1>
        <p className={styles.lead}>
          Đây là ma trận tự đánh giá phục vụ minh chứng demo và cuộc thi —{' '}
          <strong>không phải chứng nhận pháp lý</strong> hay tuyên bố tuân thủ chính thức toàn bộ
          WCAG 2.2.
        </p>
        <p className={styles.disclaimer}>
          Chỉ ghi nhận trạng thái dựa trên bằng chứng đã kiểm thử hoặc rà soát mã nguồn trong phạm
          vi MVP. Tiêu chí chưa test thật được ghi rõ trong cột ghi chú.
        </p>
      </header>

      <section aria-labelledby="aa-heading">
        <h2 id="aa-heading">Tiêu chí WCAG 2.2 mới — mức A / AA</h2>
        <p>
          Sáu tiêu chí mới hoặc nâng cấp quan trọng cho demo, ưu tiên mức A và AA.
        </p>

        <div className={styles.desktopOnly}>
          <CriterionTable
            criteria={WCAG22_AA_CRITERIA}
            caption="Ma trận tiêu chí WCAG 2.2 mới — mức A và AA"
          />
        </div>

        <div className={styles.mobileOnly} aria-label="Danh sách tiêu chí WCAG 2.2 mức A và AA">
          {WCAG22_AA_CRITERIA.map((criterion) => (
            <CriterionCard key={criterion.id} criterion={criterion} />
          ))}
        </div>
      </section>

      <section aria-labelledby="aaa-heading">
        <h2 id="aaa-heading">Tiêu chí tham khảo — mức AAA</h2>
        <p>
          Phần dưới chỉ để tham khảo; dự án <strong>không claim</strong> đạt toàn bộ AAA nếu chưa
          kiểm chứng đầy đủ.
        </p>

        <div className={styles.desktopOnly}>
          <CriterionTable
            criteria={WCAG22_AAA_CRITERIA}
            caption="Ma trận tiêu chí WCAG 2.2 mới — mức AAA (tham khảo)"
          />
        </div>

        <div className={styles.mobileOnly} aria-label="Danh sách tiêu chí WCAG 2.2 mức AAA tham khảo">
          {WCAG22_AAA_CRITERIA.map((criterion) => (
            <CriterionCard key={criterion.id} criterion={criterion} />
          ))}
        </div>
      </section>

      <section aria-labelledby="related-heading">
        <h2 id="related-heading">Tài liệu liên quan</h2>
        <ul className={styles.relatedList}>
          <li>
            <Link to="/accessibility" className={styles.inlineLink}>
              Tuyên bố accessibility
            </Link>
          </li>
          <li>
            <a
              href="https://www.w3.org/WAI/standards-guidelines/wcag/new-requirements/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              WCAG 2.2 — What's New
              <span className={styles.srOnly}> (mở tab mới)</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
