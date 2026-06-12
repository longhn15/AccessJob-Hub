import { type FormEvent, useId, useRef, useState } from 'react'
import { createApplication } from '../../api/applications'
import { ApiError } from '../../types/api'
import { countFieldErrors, mapApiFieldErrors, type FieldErrors } from '../../utils/formErrors'
import { isBlank, isValidEmail, LIMITS } from '../../utils/validation'
import { ErrorSummary } from '../form/ErrorSummary'
import { getFieldAriaProps } from '../form/fieldAria'
import { FormField } from '../form/FormField'
import { StatusMessage } from '../form/StatusMessage'
import { SubmitButton } from '../form/SubmitButton'
import { TextArea } from '../form/TextArea'
import { TextInput } from '../form/TextInput'
import styles from '../form/Form.module.css'

interface ApplicationFormProps {
  jobId: number
  jobTitle: string
}

interface FormValues {
  fullName: string
  email: string
  phone: string
  message: string
}

const EMPTY_VALUES: FormValues = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
}

function validateClient(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (isBlank(values.fullName)) {
    errors.fullName = 'Họ và tên không được để trống.'
  } else if (values.fullName.trim().length > LIMITS.fullName) {
    errors.fullName = `Họ và tên tối đa ${LIMITS.fullName} ký tự.`
  }

  if (isBlank(values.email)) {
    errors.email = 'Email không được để trống.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Email không đúng định dạng.'
  }

  if (values.phone.trim() && values.phone.trim().length > LIMITS.phone) {
    errors.phone = `Số điện thoại tối đa ${LIMITS.phone} ký tự.`
  }

  if (values.message.trim().length > LIMITS.message) {
    errors.message = `Tin nhắn tối đa ${LIMITS.message} ký tự.`
  }

  return errors
}

export function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const formId = useId()
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)

    const clientErrors = validateClient(values)
    if (countFieldErrors(clientErrors) > 0) {
      setFieldErrors(clientErrors)
      errorSummaryRef.current?.focus()
      return
    }

    setFieldErrors({})
    setSubmitting(true)

    try {
      const payload = {
        jobId,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        message: values.message.trim() || undefined,
      }

      const response = await createApplication(payload)
      setSuccessMessage(response.message)
      setValues(EMPTY_VALUES)
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) {
          setFormError(
            err.message ||
              'Không tìm thấy việc làm phù hợp để gửi thông tin quan tâm.',
          )
        } else if (err.status === 400) {
          const apiErrors = mapApiFieldErrors(err.body)
          if (countFieldErrors(apiErrors) > 0) {
            setFieldErrors(apiErrors)
            errorSummaryRef.current?.focus()
          } else {
            setFormError(err.message)
          }
        } else {
          setFormError(err.message)
        }
      } else {
        setFormError('Không thể gửi thông tin quan tâm. Vui lòng thử lại sau.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const showErrorSummary = countFieldErrors(fieldErrors) >= 2

  return (
    <section
      className={styles.formSection}
      aria-labelledby={`${formId}-heading`}
    >
      <h2 id={`${formId}-heading`} className={styles.formSectionTitle}>
        Gửi thông tin quan tâm
      </h2>
      <p className={styles.formHint}>
        Ứng tuyển cho vị trí: <strong>{jobTitle}</strong>. Mọi trường có dấu * là bắt buộc.
      </p>

      {successMessage && (
        <StatusMessage variant="success" message={successMessage} id={`${formId}-success`} />
      )}

      {formError && (
        <StatusMessage variant="error" message={formError} id={`${formId}-form-error`} />
      )}

      <form
        id={formId}
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={successMessage ? `${formId}-success` : undefined}
      >
        {showErrorSummary && (
          <div ref={errorSummaryRef} tabIndex={-1}>
            <ErrorSummary errors={fieldErrors} formId={formId} />
          </div>
        )}

        <FormField id="fullName" label="Họ và tên" required error={fieldErrors.fullName}>
          <TextInput
            {...getFieldAriaProps('fullName', fieldErrors.fullName)}
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            hasError={!!fieldErrors.fullName}
            disabled={submitting}
            maxLength={LIMITS.fullName}
          />
        </FormField>

        <FormField id="email" label="Email" required error={fieldErrors.email}>
          <TextInput
            {...getFieldAriaProps('email', fieldErrors.email)}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField('email', e.target.value)}
            hasError={!!fieldErrors.email}
            disabled={submitting}
            maxLength={LIMITS.email}
          />
        </FormField>

        <FormField
          id="phone"
          label="Số điện thoại"
          error={fieldErrors.phone}
          hint="Không bắt buộc. Chỉ nhập số và các ký tự +, -, (, )."
        >
          <TextInput
            {...getFieldAriaProps('phone', fieldErrors.phone, 'Không bắt buộc.')}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            hasError={!!fieldErrors.phone}
            disabled={submitting}
            maxLength={LIMITS.phone}
          />
        </FormField>

        <FormField
          id="message"
          label="Tin nhắn"
          error={fieldErrors.message}
          hint="Không bắt buộc. Tối đa 5000 ký tự."
        >
          <TextArea
            {...getFieldAriaProps('message', fieldErrors.message, 'Không bắt buộc.')}
            name="message"
            value={values.message}
            onChange={(e) => updateField('message', e.target.value)}
            hasError={!!fieldErrors.message}
            disabled={submitting}
            maxLength={LIMITS.message}
            rows={5}
          />
        </FormField>

        <SubmitButton loading={submitting} loadingLabel="Đang gửi thông tin…">
          Gửi thông tin quan tâm
        </SubmitButton>
      </form>
    </section>
  )
}
