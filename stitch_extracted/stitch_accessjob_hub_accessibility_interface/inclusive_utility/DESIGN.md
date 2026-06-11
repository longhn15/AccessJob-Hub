---
name: Inclusive Utility
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#43474f'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#115cb9'
  on-secondary: '#ffffff'
  secondary-container: '#659dfe'
  on-secondary-container: '#003370'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a900'
  on-tertiary-container: '#4c3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#d7e2ff'
  secondary-fixed-dim: '#acc7ff'
  on-secondary-fixed: '#001a40'
  on-secondary-fixed-variant: '#004491'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  touch-target-min: 44px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

This design system is built on the principle of **Universal Design**. It prioritizes extreme clarity, cognitive ease, and uncompromising accessibility (WCAG 2.2 AAA goals). The brand personality is professional and calm, acting as a reliable tool rather than a decorative interface. 

The visual style follows a **High-Contrast Modernism** approach:
- **Clarity over Decoration:** Every visual element must serve a functional purpose.
- **Intentional Friction:** Using generous whitespace and clear sectioning to prevent information overload.
- **Affordance-First:** Interactive elements are clearly distinguished from static content through bold color blocks and consistent iconography.
- **Inclusive Trust:** The aesthetic is institutional yet modern, evoking the stability of a government agency with the efficiency of a modern SaaS platform.

## Colors

The palette is engineered for maximum contrast ratios, ensuring all text surpasses WCAG 2.2 Level AAA requirements (7:1).

- **Primary (#003366):** Used for primary buttons, navigation headers, and critical branding. 
- **Surface (#F0F7FF):** A very light blue used to delineate sections or group related content without introducing harsh borders.
- **Focus Indicator (#FFD700):** A vibrant yellow used exclusively for keyboard focus states to provide a clear "halo" effect against both dark and light backgrounds.
- **Status Colors:** Red and Green are selected specifically for their depth, ensuring they remain distinguishable for users with various forms of color vision deficiency when paired with icons.

## Typography

This design system utilizes **Atkinson Hyperlegible Next**, a typeface specifically designed to increase character recognition and improve legibility for readers with low vision.

- **Generous Leading:** Line heights are set to a minimum of 1.6 for body text to aid tracking.
- **Scale:** Paragraph text starts at a robust 18px to ensure readability on all devices.
- **Hierarchy:** We use weight (700+) rather than color or size alone to signify importance, ensuring the structure is clear even in high-contrast or grayscale modes.
- **Character Distinction:** Ensure that 'I', 'l', and '1' are visually distinct within the chosen typeface implementation.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Content is centered within a max-width container (1280px) to prevent excessively long line lengths, which can be difficult for users with cognitive or visual impairments to track.

- **Grid:** A 12-column grid is used for desktop, collapsing to a single column for mobile. 
- **Touch Targets:** All interactive elements (buttons, links, inputs) must maintain a minimum hit area of 44x44px.
- **Negative Space:** Use "Stack" units to ensure consistent vertical rhythm. Larger gaps (3rem+) are encouraged between unrelated sections to provide visual "breathing room."
- **Safe Areas:** Maintain a minimum 16px gutter on mobile to ensure content doesn't bleed into screen edges.

## Elevation & Depth

To maintain high accessibility and reduce visual noise, this design system avoids complex shadows and blurs.

- **Flat Layering:** Depth is conveyed through **Tonal Separation**. Surfaces (cards, sidebars) use the Surface color (#F0F7FF) against the Pure White background.
- **Functional Outlines:** High-contrast borders (2px) are preferred over shadows to define the boundaries of cards or containers.
- **Z-Index Strategy:** Only critical overlays (Modals, Skip-to-content links) utilize a subtle, high-opacity shadow to provide context that the element is positioned above the primary flow.

## Shapes

The design system uses a **Soft (0.25rem)** rounding strategy. This provides a professional, "stable" feel while slightly softening the harshness of the high-contrast color palette.

- **Consistency:** All form inputs, buttons, and card containers share the same 4px (0.25rem) radius.
- **Contextual Pill:** Only "Status Chips" (e.g., Active, Pending) may use a full pill-shape to distinguish them from functional buttons.

## Components

### Buttons
- **Primary:** Dark Blue background with White text. Bold weight.
- **Focus State:** 3px Solid Yellow (#FFD700) ring with a 2px offset. This is non-negotiable for keyboard navigation visibility.
- **Active State:** Slight darken of background or an inset border.

### Form Fields
- **Labels:** Always visible, never replaced by placeholder text.
- **Borders:** 2px solid #1A1A1A for high visibility of the input boundary.
- **Error State:** 2px solid #D32F2F border accompanied by a leading error icon and descriptive text below the field.

### Cards
- **Structure:** Flat White background with a 1px #003366 border or a light blue surface fill.
- **Interactivity:** If the card is clickable, the entire card must have a visible focus state.

### Skip Links
- **Behavior:** Hidden by default, visible on first Tab press. High-contrast (Yellow background, Black text) anchored to the top-left of the viewport.

### Navigation
- **Active Indicator:** Underline (3px) in Primary Blue to indicate the current page, ensuring color is not the only indicator of state.