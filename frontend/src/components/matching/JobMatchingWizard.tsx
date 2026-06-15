import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchJobs } from '../../api/jobs'
import type { Job } from '../../types/job'
import {
  ACCESSIBILITY_NEED_OPTIONS,
  FIELD_INTEREST_OPTIONS,
  MATCH_TIER_LABELS,
  MATCH_TIER_ORDER,
  WORK_FORMAT_OPTIONS,
  type AccessibilityNeed,
  type FieldInterest,
  type JobMatchingAnswers,
  type JobMatchResult,
  type WorkFormatPreference,
} from '../../types/jobMatching'
import { hasHighMatches, matchJobs } from '../../utils/jobMatching'
import { ErrorState } from '../common/ErrorState'
import { LoadingState } from '../common/LoadingState'
import { MatchResultCard } from './MatchResultCard'
import styles from './JobMatchingWizard.module.css'

const TOTAL_STEPS = 4

const STEP_TITLES = [
  'Hình thức làm việc mong muốn',
  'Nhu cầu hỗ trợ tiếp cận',
  'Lĩnh vực quan tâm',
  'Kết quả gợi ý việc làm',
] as const

const INITIAL_ANSWERS: JobMatchingAnswers = {
  workFormat: null,
  accessibilityNeeds: [],
  fieldInterest: null,
}

export function JobMatchingWizard() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<JobMatchingAnswers>(INITIAL_ANSWERS)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [results, setResults] = useState<JobMatchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  const focusStepHeading = useCallback(() => {
    stepHeadingRef.current?.focus()
  }, [])

  useEffect(() => {
    focusStepHeading()
  }, [step, focusStepHeading])

  useEffect(() => {
    if (errorMessage) {
      errorRef.current?.focus()
    }
  }, [errorMessage])

  const loadAndMatch = useCallback(async (currentAnswers: JobMatchingAnswers) => {
    setLoading(true)
    setLoadError(null)

    try {
      const jobList = await fetchJobs({ limit: 50 })
      setJobs(jobList)
      setResults(matchJobs(jobList, currentAnswers))
    } catch {
      setLoadError('Không thể tải danh sách việc làm. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }, [])

  const goToStep = (nextStep: number) => {
    setErrorMessage(null)
    setStep(nextStep)
  }

  const handleNext = async () => {
    setErrorMessage(null)

    if (step === 1 && !answers.workFormat) {
      setErrorMessage('Vui lòng chọn một hình thức làm việc trước khi tiếp tục.')
      return
    }

    if (step === 2 && answers.accessibilityNeeds.length === 0) {
      setErrorMessage('Vui lòng chọn ít nhất một nhu cầu hỗ trợ tiếp cận.')
      return
    }

    if (step === 3 && !answers.fieldInterest) {
      setErrorMessage('Vui lòng chọn một lĩnh vực quan tâm trước khi xem kết quả.')
      return
    }

    if (step === 3) {
      goToStep(4)
      await loadAndMatch(answers)
      return
    }

    goToStep(step + 1)
  }

  const handleBack = () => {
    setErrorMessage(null)
    if (step > 1) {
      goToStep(step - 1)
    }
  }

  const handleRestart = () => {
    setAnswers(INITIAL_ANSWERS)
    setResults([])
    setJobs([])
    setLoadError(null)
    setErrorMessage(null)
    goToStep(1)
  }

  const groupedResults = MATCH_TIER_ORDER.map((tier) => ({
    tier,
    label: MATCH_TIER_LABELS[tier],
    items: results.filter((result) => result.tier === tier),
  })).filter((group) => group.items.length > 0)

  const handleWorkFormatChange = (value: WorkFormatPreference) => {
    setAnswers((current) => ({ ...current, workFormat: value }))
    setErrorMessage(null)
  }

  const handleAccessibilityToggle = (need: AccessibilityNeed, checked: boolean) => {
    setAnswers((current) => ({
      ...current,
      accessibilityNeeds: checked
        ? [...current.accessibilityNeeds, need]
        : current.accessibilityNeeds.filter((item) => item !== need),
    }))
    setErrorMessage(null)
  }

  const handleFieldInterestChange = (value: FieldInterest) => {
    setAnswers((current) => ({ ...current, fieldInterest: value }))
    setErrorMessage(null)
  }

  return (
    <div className={styles.wizard}>
      <p className={styles.progress} aria-live="polite">
        Bước {step} trong {TOTAL_STEPS}
      </p>

      {errorMessage && (
        <p
          ref={errorRef}
          id="wizard-step-error"
          className={styles.error}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
        >
          {errorMessage}
        </p>
      )}

      <section className={styles.stepPanel} aria-labelledby="wizard-step-heading">
        <h2
          ref={stepHeadingRef}
          id="wizard-step-heading"
          className={styles.stepHeading}
          tabIndex={-1}
        >
          {STEP_TITLES[step - 1]}
        </h2>

        {step === 1 && (
          <>
            <p className={styles.stepHint}>
              Chọn hình thức làm việc bạn mong muốn. Bạn chỉ chọn một phương án.
            </p>
            <fieldset className={styles.fieldset} aria-describedby={errorMessage ? 'wizard-step-error' : undefined}>
              <legend className={styles.legend}>Hình thức làm việc</legend>
              <ul className={styles.optionList}>
                {WORK_FORMAT_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <label className={styles.optionLabel}>
                      <input
                        className={styles.control}
                        type="radio"
                        name="work-format"
                        value={option.value}
                        checked={answers.workFormat === option.value}
                        onChange={() => handleWorkFormatChange(option.value)}
                      />
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <p className={styles.stepHint}>
              Chọn một hoặc nhiều nhu cầu hỗ trợ tiếp cận quan trọng với bạn.
            </p>
            <fieldset className={styles.fieldset} aria-describedby={errorMessage ? 'wizard-step-error' : undefined}>
              <legend className={styles.legend}>Nhu cầu hỗ trợ tiếp cận</legend>
              <ul className={styles.optionList}>
                {ACCESSIBILITY_NEED_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <label className={styles.optionLabel}>
                      <input
                        className={styles.control}
                        type="checkbox"
                        name="accessibility-needs"
                        value={option.value}
                        checked={answers.accessibilityNeeds.includes(option.value)}
                        onChange={(event) =>
                          handleAccessibilityToggle(option.value, event.target.checked)
                        }
                      />
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </>
        )}

        {step === 3 && (
          <>
            <p className={styles.stepHint}>
              Chọn lĩnh vực bạn quan tâm nhất. Bạn chỉ chọn một phương án.
            </p>
            <fieldset className={styles.fieldset} aria-describedby={errorMessage ? 'wizard-step-error' : undefined}>
              <legend className={styles.legend}>Lĩnh vực quan tâm</legend>
              <ul className={styles.optionList}>
                {FIELD_INTEREST_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <label className={styles.optionLabel}>
                      <input
                        className={styles.control}
                        type="radio"
                        name="field-interest"
                        value={option.value}
                        checked={answers.fieldInterest === option.value}
                        onChange={() => handleFieldInterestChange(option.value)}
                      />
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </>
        )}

        {step === 4 && (
          <>
            {loading && <LoadingState label="Đang tìm việc làm phù hợp…" />}

            {loadError && (
              <ErrorState message={loadError} onRetry={() => loadAndMatch(answers)} />
            )}

            {!loading && !loadError && (
              <>
                <p className={styles.resultsIntro}>
                  Dựa trên lựa chọn của bạn, chúng tôi gợi ý {results.length} việc làm từ{' '}
                  {jobs.length} tin hiện có.
                </p>

                {!hasHighMatches(results) && results.length > 0 && (
                  <p className={styles.noHighMatch} role="status">
                    Chưa có việc phù hợp cao với mọi tiêu chí. Dưới đây là các gợi ý gần nhất
                    để bạn xem thêm chi tiết.
                  </p>
                )}

                {results.length === 0 ? (
                  <div className={styles.noHighMatch} role="status">
                    <p>
                      Chưa có việc làm phù hợp với lựa chọn hiện tại. Hãy bấm{' '}
                      <strong>Làm lại</strong> để điều chỉnh hình thức làm việc, nhu cầu hỗ trợ
                      tiếp cận hoặc lĩnh vực quan tâm.
                    </p>
                  </div>
                ) : (
                  <div className={styles.tierGroups}>
                    {groupedResults.map((group) => (
                      <section
                        key={group.tier}
                        className={styles.tierGroup}
                        aria-labelledby={`match-tier-${group.tier}`}
                      >
                        <h3 id={`match-tier-${group.tier}`} className={styles.tierHeading}>
                          {group.label}
                          <span className={styles.tierCount}>
                            {' '}
                            ({group.items.length})
                          </span>
                        </h3>
                        <ul className={styles.resultsList}>
                          {group.items.map((result) => (
                            <li key={result.job.id}>
                              <MatchResultCard result={result} />
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                )}

                <div className={styles.actions}>
                  <button type="button" className={styles.restartButton} onClick={handleRestart}>
                    Làm lại
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </section>

      {step < 4 && (
        <div className={styles.actions}>
          {step > 1 && (
            <button type="button" className={styles.backButton} onClick={handleBack}>
              Quay lại
            </button>
          )}
          <button type="button" className={styles.nextButton} onClick={handleNext}>
            {step === 3 ? 'Xem kết quả' : 'Tiếp theo'}
          </button>
        </div>
      )}

      {step === 4 && !loading && !loadError && (
        <div className={styles.actions}>
          <button type="button" className={styles.backButton} onClick={handleBack}>
            Quay lại
          </button>
        </div>
      )}
    </div>
  )
}
