import { type FormEvent, useId, useRef, useState } from 'react'
import type { EmployerChecklistAnswers, EmployerChecklistScore } from '../../types/employerChecklist'
import {
  createEmptyAnswers,
  EMPLOYER_CHECKLIST_GROUPS,
  scoreEmployerChecklist,
} from '../../utils/employerChecklist'
import { EmployerChecklistResult } from './EmployerChecklistResult'
import styles from './EmployerChecklistForm.module.css'

const DISCLAIMER =
  'Công cụ này là checklist tham khảo để cải thiện tính hòa nhập của tin tuyển dụng, không phải chứng nhận pháp lý hoặc chứng nhận WCAG chính thức.'

interface EmployerChecklistFormProps {
  onResultShown?: () => void
}

export function EmployerChecklistForm({ onResultShown }: EmployerChecklistFormProps) {
  const formId = useId()
  const resultRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const [answers, setAnswers] = useState<EmployerChecklistAnswers>(createEmptyAnswers)
  const [result, setResult] = useState<EmployerChecklistScore | null>(null)
  const [showNoSelectionHint, setShowNoSelectionHint] = useState(false)

  function handleToggle(id: keyof EmployerChecklistAnswers, checked: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: checked }))
    setShowNoSelectionHint(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const hasAnyChecked = Object.values(answers).some(Boolean)
    if (!hasAnyChecked) {
      setResult(null)
      setShowNoSelectionHint(true)
      hintRef.current?.focus()
      return
    }

    const score = scoreEmployerChecklist(answers)
    setResult(score)
    setShowNoSelectionHint(false)
    onResultShown?.()

    requestAnimationFrame(() => {
      resultRef.current?.focus()
    })
  }

  function handleReset() {
    setAnswers(createEmptyAnswers())
    setResult(null)
    setShowNoSelectionHint(false)
  }

  return (
    <form id={formId} className={styles.form} onSubmit={handleSubmit} onReset={handleReset} noValidate>
      <p className={styles.disclaimer}>
        <strong>Lưu ý:</strong> {DISCLAIMER}
      </p>

      {showNoSelectionHint ? (
        <p
          ref={hintRef}
          id={`${formId}-no-selection`}
          className={styles.hintMessage}
          role="alert"
          tabIndex={-1}
        >
          Bạn chưa chọn tiêu chí nào. Hãy tick ít nhất một mục bạn đã đáp ứng trong tin tuyển dụng,
          rồi bấm &quot;Xem kết quả&quot;.
        </p>
      ) : null}

      <ul className={styles.groups}>
        {EMPLOYER_CHECKLIST_GROUPS.map((group) => (
          <li key={group.id}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{group.title}</legend>
              <ul className={styles.criteriaList}>
                {group.criteria.map((criterion) => {
                  const inputId = `${formId}-${criterion.id}`
                  return (
                    <li key={criterion.id}>
                      <label className={styles.optionLabel} htmlFor={inputId}>
                        <input
                          id={inputId}
                          className={styles.control}
                          type="checkbox"
                          name={criterion.id}
                          checked={answers[criterion.id]}
                          onChange={(event) => handleToggle(criterion.id, event.target.checked)}
                        />
                        {criterion.label}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </fieldset>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton}>
          Xem kết quả
        </button>
        <button type="reset" className={styles.resetButton}>
          Đặt lại checklist
        </button>
      </div>

      {result ? (
        <EmployerChecklistResult ref={resultRef} score={result} ariaLive="polite" />
      ) : null}
    </form>
  )
}
