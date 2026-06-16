export type EmployerChecklistCriterionId =
  | 'clear-main-tasks'
  | 'required-vs-preferred'
  | 'avoid-vague-terms'
  | 'outcome-focused'
  | 'work-location-clear'
  | 'hours-flexibility'
  | 'alt-contact-channel'
  | 'interview-adjustments'
  | 'clear-apply-link'
  | 'accessibility-contact'
  | 'no-complex-interactions'
  | 'no-image-captcha'
  | 'workplace-description'
  | 'disability-policy'
  | 'non-discrimination'
  | 'no-unnecessary-physical'
  | 'not-color-only'
  | 'accessible-jd-format'
  | 'clear-apply-link-text'
  | 'contrast-mobile-readable'

export interface EmployerChecklistCriterion {
  id: EmployerChecklistCriterionId
  label: string
  suggestion: string
}

export interface EmployerChecklistGroup {
  id: string
  title: string
  criteria: EmployerChecklistCriterion[]
}

export type EmployerChecklistAnswers = Record<EmployerChecklistCriterionId, boolean>

export type EmployerRatingLevel = 'needs-improvement' | 'fair' | 'good'

export interface EmployerChecklistScore {
  totalScore: number
  maxScore: number
  percentage: number
  level: EmployerRatingLevel
  levelLabel: string
  levelMeaning: string
  strengths: EmployerChecklistCriterion[]
  improvements: EmployerChecklistCriterion[]
}
