import { Link } from 'react-router-dom'
import { AccessibilityFeedbackForm } from '../components/feedback/AccessibilityFeedbackForm'
import styles from './AccessibilityPage.module.css'

const COMMITMENTS = [
  {
    id: 'keyboard',
    title: 'Điều hướng bằng bàn phím',
    description:
      'Mọi chức năng chính có thể dùng bằng Tab, Enter và Space. Thứ tự focus logic từ skip link → điều hướng → nội dung chính.',
  },
  {
    id: 'focus',
    title: 'Focus visible',
    description:
      'Vòng focus vàng 3px (#ffd700) hiển thị rõ trên mọi control tương tác khi dùng bàn phím (:focus-visible).',
  },
  {
    id: 'contrast',
    title: 'Độ tương phản',
    description:
      'Màu chữ và nền tuân thủ contrast cao; body text tối thiểu 18px trên nền trắng hoặc xanh nhạt.',
  },
  {
    id: 'semantic',
    title: 'HTML semantic',
    description:
      'Dùng header, nav, main, footer, heading đúng cấp, button cho hành động và link cho điều hướng.',
  },
  {
    id: 'labels',
    title: 'Nhãn form',
    description:
      'Mọi trường nhập có label hiển thị; không dùng placeholder làm nhãn duy nhất. Lỗi form dùng aria-describedby và aria-invalid.',
  },
  {
    id: 'errors',
    title: 'Thông báo lỗi',
    description:
      'Thông báo lỗi và trạng thái tải dùng role="alert", role="status" hoặc aria-live phù hợp — không chỉ đổi màu.',
  },
  {
    id: 'screen-reader',
    title: 'Hỗ trợ screen reader',
    description:
      'Landmark, heading và link mô tả rõ; badge kèm aria-label; liên kết ngoài báo mở tab mới.',
  },
  {
    id: 'responsive',
    title: 'Bố cục responsive',
    description:
      'Giao diện hoạt động trên mobile 360px và zoom 200% mà không mất nội dung hay chức năng.',
  },
  {
    id: 'preferences',
    title: 'Tùy chỉnh tiếp cận',
    description:
      'Panel Tùy chỉnh tiếp cận (ngay dưới header) cho phép tăng cỡ chữ, khoảng cách dòng, tương phản cao, giảm chuyển động và gạch chân link. Lựa chọn lưu vào localStorage và áp dụng toàn site.',
  },
  {
    id: 'job-matching',
    title: 'Wizard gợi ý việc làm',
    description:
      'Luồng /job-matching hỏi nhu cầu tiếp cận trước, gợi ý việc làm rule-based với lý do bằng text — giúp người dùng không cần đọc từng tin một.',
  },
]

const TESTING = [
  {
    method: 'Kiểm tra bàn phím',
    scope: 'Skip link, nav, filter jobs/resources, JobCard links, mở chi tiết job/resource.',
  },
  {
    method: 'axe DevTools',
    scope: 'Trang chủ, danh sách/chi tiết jobs và resources, Accessibility Statement.',
  },
  {
    method: 'Lighthouse Accessibility',
    scope: 'Toàn bộ route chính; mục tiêu điểm cao và không vi phạm nghiêm trọng.',
  },
  {
    method: 'Screen reader (NVDA/VoiceOver)',
    scope: 'Đọc heading, landmark, danh sách job/resource, thông báo loading/error.',
  },
]

export function AccessibilityPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Tuyên bố về khả năng tiếp cận</h1>
        <p className={styles.lead}>
          AccessJob Hub cam kết thiết kế theo hướng dẫn{' '}
          <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">
            WCAG 2.2
            <span className={styles.srOnly}> (mở tab mới)</span>
          </a>{' '}
          cấp độ AA trở lên cho các luồng chính của website.
        </p>
      </header>

      <section aria-labelledby="preferences-heading">
        <h2 id="preferences-heading">Tùy chỉnh hiển thị</h2>
        <p>
          Mở panel <a href="#a11y-preferences-panel">Tùy chỉnh tiếp cận</a> ngay dưới thanh điều
          hướng để điều chỉnh cỡ chữ, khoảng cách dòng, tương phản, chuyển động và liên kết. Tùy
          chọn được lưu tự động trên trình duyệt này.
        </p>
      </section>

      <section aria-labelledby="job-matching-heading">
        <h2 id="job-matching-heading">Tìm việc dễ hơn</h2>
        <p>
          Dùng{' '}
          <Link to="/job-matching" className={styles.inlineLink}>
            wizard gợi ý việc làm
          </Link>{' '}
          để trả lời câu hỏi về hình thức làm việc và nhu cầu tiếp cận — hệ thống sẽ gợi ý việc
          phù hợp kèm lý do rõ ràng.
        </p>
      </section>

      <section aria-labelledby="employer-checklist-heading">
        <h2 id="employer-checklist-heading">Dành cho nhà tuyển dụng</h2>
        <p>
          Dùng{' '}
          <Link to="/employer-checklist" className={styles.inlineLink}>
            công cụ tự đánh giá tin tuyển dụng
          </Link>{' '}
          để rà soát tin đăng có thân thiện với người khuyết tật. Đây là checklist tham khảo, không
          phải chứng nhận WCAG chính thức.
        </p>
      </section>

      <section aria-labelledby="commitments-heading">
        <h2 id="commitments-heading">Cam kết đã áp dụng</h2>
        <ul className={styles.list}>
          {COMMITMENTS.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="evidence-heading">
        <h2 id="evidence-heading">Bằng chứng kiểm thử WCAG 2.2</h2>
        <p>
          Xem{' '}
          <Link to="/wcag-22" className={styles.inlineLink}>
            ma trận đối chiếu WCAG 2.2
          </Link>{' '}
          để biết trạng thái từng tiêu chí mới (2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8) kèm
          bằng chứng route/component và phương pháp kiểm thử. Đây là tự đánh giá minh chứng, không
          phải chứng nhận pháp lý.
        </p>
      </section>

      <section aria-labelledby="testing-heading">
        <h2 id="testing-heading">Kế hoạch kiểm thử</h2>
        <p>
          Các phần sau sẽ được kiểm thử định kỳ trong quá trình phát triển MVP:
        </p>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              Bảng phương pháp kiểm thử accessibility và phạm vi
            </caption>
            <thead>
              <tr>
                <th scope="col">Phương pháp</th>
                <th scope="col">Phạm vi kiểm thử</th>
              </tr>
            </thead>
            <tbody>
              {TESTING.map((row) => (
                <tr key={row.method}>
                  <td>{row.method}</td>
                  <td>{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="accessibility-feedback" aria-labelledby="feedback-heading">
        <h2 id="feedback-heading">Phản hồi accessibility</h2>
        <p>
          Nếu bạn gặp rào cản khi sử dụng website, vui lòng gửi phản hồi qua form bên dưới.
        </p>
        <AccessibilityFeedbackForm />
        <p>
          <Link to="/" className={styles.inlineLink}>
            Về trang chủ
          </Link>
        </p>
      </section>
    </div>
  )
}
