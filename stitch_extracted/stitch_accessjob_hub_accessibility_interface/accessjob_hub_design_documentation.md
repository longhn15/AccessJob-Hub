# AccessJob Hub: UI Design Overview

## Design Philosophy
AccessJob Hub is built on the foundation of **Inclusive Utility**. The design prioritizes clarity, high contrast, and predictable interaction patterns over visual flair. It is a "content-first" interface where every element serves a functional purpose for users with diverse abilities.

## Color Palette & Contrast
- **Primary:** `#003366` (Deep Navy) - Used for primary headings, buttons, and navigation. 7:1+ contrast ratio with white.
- **Background:** `#FFFFFF` (White) - Provides a clean, high-contrast canvas.
- **Secondary Surfaces:** `#F0F7FF` (Soft Sky) - Subtle backgrounds for cards or sections to create grouping without visual noise.
- **Focus Ring:** `#0056b3` with a `3px` offset - Ensures the focused element is unmistakable for keyboard users.
- **Error:** `#D32F2F` (Accessible Red) - Accompanied by descriptive text and icons.
- **Success:** `#2E7D32` (Accessible Green) - Used for confirmations.

## Typography
- **Primary Font:** Atkinson Hyperlegible Next (or robust sans-serif fallback) - Designed specifically for legibility.
- **Body Text:** `1.125rem` (18px) minimum to ensure readability.
- **Line Height:** `1.6` for optimal tracking.
- **Hierarchy:** Strict use of `<h1>` through `<h3>` for semantic structure.

## Accessibility Developer Rules
1. **Semantic Landmarks:** Every page must wrap content in `<header>`, `<nav>`, `<main>`, and `<footer>`.
2. **Focus Management:** Never use `outline: none`. Use `focus-visible` to provide high-contrast rings.
3. **Form Association:** Every input must have a `<label>` with a matching `htmlFor`. Errors must be linked via `aria-describedby`.
4. **Interactive Size:** All buttons and links must have a minimum hit target of `44x44px`.
5. **No Color-Only Meaning:** Status changes (success/error) must include text or icons, never just color shifts.

## CSS Variables Suggestions
```css
:root {
  --color-primary: #003366;
  --color-on-primary: #ffffff;
  --color-surface: #ffffff;
  --color-surface-variant: #f0f7ff;
  --color-text: #1a1a1a;
  --color-error: #d32f2f;
  --color-success: #2e7d32;
  --focus-ring: 3px solid #0056b3;
  --focus-offset: 3px;
  --radius-md: 4px;
  --spacing-stack-md: 1.5rem;
}
```

## Rules for .cursor/rules/ui-design-system-rule.mdc
- ALWAYS use semantic HTML tags (main, section, article, nav) for layout.
- ENSURE all interactive elements have a visible focus state with high contrast.
- DO NOT use color alone to convey state; always provide text or icons for errors/success.
- ALL form fields must have explicit, visible labels (no placeholder-only labels).
- MAINTAIN a minimum contrast ratio of 4.5:1 for body text and 3:1 for large text (WCAG 2.2 AA).
- USE `rem` units for typography and spacing to support user browser zoom settings.
- IMPLEMENT a "Skip to Content" link as the first focusable element on every page.
