import type { ReactNode } from 'react'
import { Link, NavLink, useMatch } from 'react-router-dom'
import { AccessibilityPreferencesPanel } from '../accessibility/AccessibilityPreferencesPanel'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

const NAV_ITEMS = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/jobs', label: 'Việc làm', end: false },
  { to: '/job-matching', label: 'Gợi ý việc làm', end: false },
  { to: '/resources', label: 'Tài nguyên', end: false },
  { to: '/accessibility', label: 'Accessibility', end: false },
] as const

function NavItem({ to, end, label }: { to: string; end?: boolean; label: string }) {
  const isActive = !!useMatch({ path: to, end: end ?? false })

  return (
    <NavLink
      to={to}
      end={end}
      className={isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </NavLink>
  )
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.pageWrapper}>
      <a href="#main-content" className={styles.skipLink}>
        Chuyển đến nội dung chính
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            AccessJob Hub
          </Link>
          <nav aria-label="Điều hướng chính">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavItem to={item.to} end={item.end} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className={styles.preferencesBar}>
        <div className={styles.preferencesInner}>
          <AccessibilityPreferencesPanel />
        </div>
      </div>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>AccessJob Hub — Nền tảng việc làm dễ tiếp cận theo tiêu chuẩn WCAG 2.2.</p>
          <p className={styles.footerLinks}>
            <Link to="/accessibility">Tuyên bố accessibility</Link>
            {' · '}
            <Link
              to="/accessibility#accessibility-feedback"
              aria-label="Trợ giúp và phản hồi tiếp cận — đi đến form phản hồi accessibility"
            >
              Trợ giúp &amp; phản hồi tiếp cận
            </Link>
            {' · '}
            <Link to="/wcag-22">Ma trận WCAG 2.2</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
