import { useEffect, useId } from 'react'
import { useAccessibilityPreferences } from '../../hooks/useAccessibilityPreferences'
import styles from './AccessibilityPreferencesPanel.module.css'

const STATUS_TEXT = {
  saved: 'Đã lưu tùy chỉnh tiếp cận trên trình duyệt này.',
  reset: 'Đã đặt lại tùy chỉnh tiếp cận về mặc định.',
} as const

function openPanelFromHash() {
  if (window.location.hash !== '#a11y-preferences-panel') {
    return
  }

  const panel = document.getElementById('a11y-preferences-panel')
  if (panel instanceof HTMLDetailsElement) {
    panel.open = true
    panel.scrollIntoView({ block: 'start' })
  }
}

export function AccessibilityPreferencesPanel() {
  const panelId = useId()
  const {
    preferences,
    statusMessage,
    setFontScale,
    setLineHeight,
    setContrast,
    setReducedMotion,
    setUnderlinedLinks,
    resetPreferences,
  } = useAccessibilityPreferences()

  useEffect(() => {
    openPanelFromHash()
    window.addEventListener('hashchange', openPanelFromHash)
    return () => window.removeEventListener('hashchange', openPanelFromHash)
  }, [])

  return (
    <details className={styles.panel} id="a11y-preferences-panel">
      <summary className={styles.summary}>Tùy chỉnh tiếp cận</summary>
      <div className={styles.content} id={panelId}>
        <p className={styles.intro}>
          Điều chỉnh cỡ chữ, khoảng cách dòng, tương phản và chuyển động. Lựa chọn được lưu tự
          động và áp dụng trên toàn bộ website.
        </p>

        {statusMessage && (
          <p className={styles.status} role="status" aria-live="polite">
            {STATUS_TEXT[statusMessage]}
          </p>
        )}

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Cỡ chữ</legend>
          <ul className={styles.optionList}>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-font-scale"
                  value="default"
                  checked={preferences.fontScale === 'default'}
                  onChange={() => setFontScale('default')}
                />
                Mặc định
              </label>
            </li>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-font-scale"
                  value="large"
                  checked={preferences.fontScale === 'large'}
                  onChange={() => setFontScale('large')}
                />
                Lớn
              </label>
            </li>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-font-scale"
                  value="x-large"
                  checked={preferences.fontScale === 'x-large'}
                  onChange={() => setFontScale('x-large')}
                />
                Rất lớn
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Khoảng cách dòng</legend>
          <ul className={styles.optionList}>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-line-height"
                  value="default"
                  checked={preferences.lineHeight === 'default'}
                  onChange={() => setLineHeight('default')}
                />
                Mặc định
              </label>
            </li>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-line-height"
                  value="comfortable"
                  checked={preferences.lineHeight === 'comfortable'}
                  onChange={() => setLineHeight('comfortable')}
                />
                Thoải mái
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Độ tương phản</legend>
          <ul className={styles.optionList}>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-contrast"
                  value="default"
                  checked={preferences.contrast === 'default'}
                  onChange={() => setContrast('default')}
                />
                Mặc định
              </label>
            </li>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-contrast"
                  value="high"
                  checked={preferences.contrast === 'high'}
                  onChange={() => setContrast('high')}
                />
                Tương phản cao
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Chuyển động</legend>
          <ul className={styles.optionList}>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-reduced-motion"
                  value="system"
                  checked={preferences.reducedMotion === 'system'}
                  onChange={() => setReducedMotion('system')}
                />
                Theo hệ thống
              </label>
            </li>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-reduced-motion"
                  value="reduce"
                  checked={preferences.reducedMotion === 'reduce'}
                  onChange={() => setReducedMotion('reduce')}
                />
                Giảm chuyển động
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Liên kết</legend>
          <ul className={styles.optionList}>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-underlined-links"
                  value="default"
                  checked={preferences.underlinedLinks === 'default'}
                  onChange={() => setUnderlinedLinks('default')}
                />
                Mặc định
              </label>
            </li>
            <li>
              <label className={styles.optionLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="a11y-underlined-links"
                  value="enhanced"
                  checked={preferences.underlinedLinks === 'enhanced'}
                  onChange={() => setUnderlinedLinks('enhanced')}
                />
                Gạch chân link rõ hơn
              </label>
            </li>
          </ul>
        </fieldset>

        <div className={styles.actions}>
          <button type="button" className={styles.resetButton} onClick={resetPreferences}>
            Đặt lại mặc định
          </button>
        </div>
      </div>
    </details>
  )
}
