import { EmployerChecklistForm } from '../components/employer/EmployerChecklistForm'
import styles from './EmployerChecklistPage.module.css'

export function EmployerChecklistPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Kiểm tra tin tuyển dụng dễ tiếp cận</h1>
        <p className={styles.lead}>
          Công cụ tự đánh giá giúp nhà tuyển dụng rà soát tin đăng tuyển dụng có thân thiện với
          người khuyết tật và phù hợp tinh thần thiết kế hòa nhập hay chưa.
        </p>
        <p className={styles.intro}>
          Tick các tiêu chí bạn đã đáp ứng trong tin tuyển dụng, sau đó xem điểm và gợi ý cải
          thiện. Không cần đăng nhập; dữ liệu chỉ xử lý trên trình duyệt của bạn.
        </p>
      </header>

      <EmployerChecklistForm />
    </div>
  )
}
