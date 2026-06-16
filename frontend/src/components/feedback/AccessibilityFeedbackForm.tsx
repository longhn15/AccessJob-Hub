import { type FormEvent, useId, useLayoutEffect, useRef, useState } from 'react'
import { createAccessibilityFeedback } from '../../api/accessibilityFeedback'
import { ApiError } from '../../types/api'
import {
  countFieldErrors,
  focusAndScrollMessage,
  focusErrorSummary,
  mapApiFieldErrors,
  type FieldErrors,
} from '../../utils/formErrors'
import { isBlank, isValidEmail, LIMITS } from '../../utils/validation'
import { ContactProfileControls } from '../contact/ContactProfileControls'
import { ErrorSummary } from '../form/ErrorSummary'
import { getFieldAriaProps } from '../form/fieldAria'
import { FormField } from '../form/FormField'
import { Select } from '../form/Select'
import { StatusMessage } from '../form/StatusMessage'
import { SubmitButton } from '../form/SubmitButton'
import { TextArea } from '../form/TextArea'
import { TextInput } from '../form/TextInput'
import styles from '../form/Form.module.css'

const CATEGORY_OPTIONS = [
  { value: 'keyboard', label: 'Bàn phím (keyboard)' },
  { value: 'screen-reader', label: 'Screen reader' },
  { value: 'contrast', label: 'Độ tương phản (contrast)' },
  { value: 'form', label: 'Form / nhãn / lỗi' },
  { value: 'other', label: 'Khác' },
]

interface FormValues {
  category: string
  description: string
  contactEmail: string
}

const EMPTY_VALUES: FormValues = {
  category: '',
  description: '',
  contactEmail: '',
}

function validateClient(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (isBlank(values.category)) {
    errors.category = 'Vui lòng chọn danh mục phản hồi.'
  } else if (values.category.length > LIMITS.category) {
    errors.category = `Danh mục tối đa ${LIMITS.category} ký tự.`
  }

  if (isBlank(values.description)) {
    errors.description = 'Mô tả không được để trống.'
  } else if (values.description.trim().length > LIMITS.description) {
    errors.description = `Mô tả tối đa ${LIMITS.description} ký tự.`
  }

  if (values.contactEmail.trim() && !isValidEmail(values.contactEmail)) {
    errors.contactEmail = 'Email không đúng định dạng.'
  }

  return errors
}

export function AccessibilityFeedbackForm() {
  const formId = useId()
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLParagraphElement>(null)
  const formErrorRef = useRef<HTMLParagraphElement>(null)
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [errorFocusRequest, setErrorFocusRequest] = useState(0)
  const [successFocusRequest, setSuccessFocusRequest] = useState(0)
  const [formErrorFocusRequest, setFormErrorFocusRequest] = useState(0)

  function handleFillSavedEmail(profile: { email: string }) {
    setValues((prev) => ({ ...prev, contactEmail: profile.email }))
    setFieldErrors((prev) => {
      if (!prev.contactEmail) return prev
      const next = { ...prev }
      delete next.contactEmail
      return next
    })
    setFormError(null)
    setSuccessMessage(null)
  }

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
    setFormError(null)
    setSuccessMessage(null)
  }

  useLayoutEffect(() => {
    if (errorFocusRequest === 0) return
    if (countFieldErrors(fieldErrors) === 0) return
    focusErrorSummary(errorSummaryRef.current)
  }, [errorFocusRequest, fieldErrors])

  useLayoutEffect(() => {
    if (successFocusRequest === 0) return
    if (!successMessage) return
    focusAndScrollMessage(successRef.current)
  }, [successFocusRequest, successMessage])

  useLayoutEffect(() => {
    if (formErrorFocusRequest === 0) return
    if (!formError) return
    focusAndScrollMessage(formErrorRef.current)
  }, [formErrorFocusRequest, formError])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)

    const clientErrors = validateClient(values)
    if (countFieldErrors(clientErrors) > 0) {
      setFieldErrors(clientErrors)
      setErrorFocusRequest((value) => value + 1)
      return
    }

    setFieldErrors({})
    setSubmitting(true)

    try {
      const response = await createAccessibilityFeedback({
        category: values.category,
        description: values.description.trim(),
        contactEmail: values.contactEmail.trim() || undefined,
      })
      setSuccessMessage(response.message)
      setValues(EMPTY_VALUES)
      setSuccessFocusRequest((value) => value + 1)
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          const apiErrors = mapApiFieldErrors(err.body)
          if (countFieldErrors(apiErrors) > 0) {
            setFieldErrors(apiErrors)
            setErrorFocusRequest((value) => value + 1)
          } else {
            setFormError(err.message)
            setFormErrorFocusRequest((value) => value + 1)
          }
        } else {
          setFormError(err.message)
          setFormErrorFocusRequest((value) => value + 1)
        }
      } else {
        setFormError('Không thể gửi phản hồi. Vui lòng thử lại sau.')
        setFormErrorFocusRequest((value) => value + 1)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const showErrorSummary = countFieldErrors(fieldErrors) > 0

  return (
    <section className={styles.formSection} aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`} className={styles.formSectionTitle}>
        Gửi phản hồi accessibility
      </h2>
      <p className={styles.formHint}>
        Mô tả rào cản bạn gặp phải. Chúng tôi sẽ xem xét và cải thiện website.
      </p>

      {successMessage && (
        <StatusMessage
          ref={successRef}
          variant="success"
          message={successMessage}
          id={`${formId}-success`}
        />
      )}

      {formError && (
        <StatusMessage
          ref={formErrorRef}
          variant="error"
          message={formError}
          id={`${formId}-form-error`}
        />
      )}

      <form
        id={formId}
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={
          showErrorSummary ? `${formId}-error-summary` : undefined
        }
      >
        {showErrorSummary && (
          <ErrorSummary ref={errorSummaryRef} errors={fieldErrors} formId={formId} />
        )}

        <ContactProfileControls
          mode="email-only"
          onFill={handleFillSavedEmail}
          disabled={submitting}
        />

        <FormField id="category" label="Danh mục phản hồi" required error={fieldErrors.category}>
          <Select
            {...getFieldAriaProps('category', fieldErrors.category)}
            name="category"
            value={values.category}
            onChange={(e) => updateField('category', e.target.value)}
            hasError={!!fieldErrors.category}
            disabled={submitting}
            options={CATEGORY_OPTIONS}
            placeholder="— Chọn danh mục —"
          />
        </FormField>

        <FormField id="description" label="Mô tả chi tiết" required error={fieldErrors.description}>
          <TextArea
            {...getFieldAriaProps('description', fieldErrors.description)}
            name="description"
            value={values.description}
            onChange={(e) => updateField('description', e.target.value)}
            hasError={!!fieldErrors.description}
            disabled={submitting}
            maxLength={LIMITS.description}
            rows={6}
          />
        </FormField>

        <FormField
          id="contactEmail"
          label="Email liên hệ"
          error={fieldErrors.contactEmail}
          hint="Không bắt buộc. Dùng nếu bạn muốn nhận phản hồi."
        >
          <TextInput
            {...getFieldAriaProps(
              'contactEmail',
              fieldErrors.contactEmail,
              'Không bắt buộc.',
            )}
            name="contactEmail"
            type="email"
            autoComplete="email"
            value={values.contactEmail}
            onChange={(e) => updateField('contactEmail', e.target.value)}
            hasError={!!fieldErrors.contactEmail}
            disabled={submitting}
            maxLength={LIMITS.contactEmail}
          />
        </FormField>

        <SubmitButton loading={submitting} loadingLabel="Đang gửi phản hồi…">
          Gửi phản hồi
        </SubmitButton>
      </form>
    </section>
  )
}
