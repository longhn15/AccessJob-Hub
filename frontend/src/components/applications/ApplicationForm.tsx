import { type FormEvent, useId, useLayoutEffect, useRef, useState } from 'react'
import { createApplication } from '../../api/applications'
import { ApiError } from '../../types/api'
import {
  countFieldErrors,
  focusAndScrollMessage,
  focusErrorSummary,
  mapApiFieldErrors,
  type FieldErrors,
} from '../../utils/formErrors'
import { isBlank, isValidEmail, LIMITS } from '../../utils/validation'
import { saveContactProfile } from '../../utils/contactProfileStorage'
import { ContactProfileControls } from '../contact/ContactProfileControls'
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
  const [saveContactProfileChecked, setSaveContactProfileChecked] = useState(false)
  const [contactStorageRefreshKey, setContactStorageRefreshKey] = useState(0)

  function handleFillContactProfile(profile: {
    fullName: string
    email: string
    phone?: string
  }) {
    setValues((prev) => ({
      ...prev,
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone ?? '',
    }))
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next.fullName
      delete next.email
      delete next.phone
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
      const payload = {
        jobId,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        message: values.message.trim() || undefined,
      }

      const response = await createApplication(payload)
      if (saveContactProfileChecked) {
        saveContactProfile({
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
        })
        setContactStorageRefreshKey((value) => value + 1)
      }
      setSuccessMessage(response.message)
      setValues(EMPTY_VALUES)
      setSaveContactProfileChecked(false)
      setSuccessFocusRequest((value) => value + 1)
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) {
          setFormError(
            err.message ||
              'Không tìm thấy việc làm phù hợp để gửi thông tin quan tâm.',
          )
          setFormErrorFocusRequest((value) => value + 1)
        } else if (err.status === 400) {
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
        setFormError('Không thể gửi thông tin quan tâm. Vui lòng thử lại sau.')
        setFormErrorFocusRequest((value) => value + 1)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const showErrorSummary = countFieldErrors(fieldErrors) > 0

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
          [
            showErrorSummary ? `${formId}-error-summary` : undefined,
            successMessage ? `${formId}-success` : undefined,
          ]
            .filter(Boolean)
            .join(' ') || undefined
        }
      >
        {showErrorSummary && (
          <ErrorSummary ref={errorSummaryRef} errors={fieldErrors} formId={formId} />
        )}

        <ContactProfileControls
          key={contactStorageRefreshKey}
          mode="full"
          onFill={handleFillContactProfile}
          disabled={submitting}
          showSaveCheckbox
          saveChecked={saveContactProfileChecked}
          onSaveCheckedChange={setSaveContactProfileChecked}
        />

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
