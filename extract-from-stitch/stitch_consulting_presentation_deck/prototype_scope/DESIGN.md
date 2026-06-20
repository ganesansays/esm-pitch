---
name: Executive Synthesis
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8f9097'
  outline-variant: '#44474d'
  surface-tint: '#b9c7e4'
  primary: '#b9c7e4'
  on-primary: '#233148'
  primary-container: '#0a192f'
  on-primary-container: '#74829d'
  inverse-primary: '#515f78'
  secondary: '#b9c7df'
  on-secondary: '#233144'
  secondary-container: '#3c4a5e'
  on-secondary-container: '#abb9d1'
  tertiary: '#00dbe7'
  on-tertiary: '#00363a'
  tertiary-container: '#001d1f'
  on-tertiary-container: '#009098'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#74f5ff'
  tertiary-fixed-dim: '#00dbe7'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  headline-xl:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  data-display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '300'
    lineHeight: 48px
    letterSpacing: -0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style

The design system is engineered for high-stakes decision-making environments. It embodies a persona of "The Authoritative Advisor"—calculated, precise, and intellectually rigorous. The target audience consists of C-suite executives and stakeholders who value clarity, data integrity, and strategic foresight.

The visual style is a fusion of **Modern Corporate** and **Minimalism**. It avoids unnecessary ornamentation to ensure that the data and strategic narrative remain the focal point. The aesthetic leverages thin strokes, purposeful white space, and a high-contrast information hierarchy to create an atmosphere of premium consulting excellence.

## Colors

This design system utilizes a sophisticated deep-mode foundation to convey depth and authority.

- **Primary (#0A192F):** Deep Navy. Used for the primary canvas and structural backgrounds. It provides a stable, serious foundation.
- **Secondary (#475569):** Slate Grey. Used for secondary text, borders, and inactive states to provide subtle contrast against the primary navy.
- **Action Cyan (#00F2FF):** A high-vibrancy accent. Reserved strictly for key data points, call-to-action buttons, and active status indicators. Its high luminosity ensures immediate visual mapping against the dark background.
- **Neutral (#F8FAFC):** Off-white. Used for primary body text and high-priority headers to ensure maximum readability.

## Typography

The typography system prioritizes legibility and structural hierarchy. 

**Public Sans** is utilized for headlines to provide a sturdy, institutional feel that suggests reliability. **Inter** is used for body copy and UI elements due to its exceptional clarity in digital interfaces.

- **Headlines:** Use tight letter spacing for large headers to maintain a "deck-style" impact.
- **Data Display:** A specific role for large metric callouts, utilizing a lighter weight to appear sophisticated rather than aggressive.
- **Label Caps:** Used for breadcrumbs, categories, and small metadata to provide a distinct visual break from body text.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy typical of executive summaries. 

- **Grid:** A 12-column grid system is used for desktop (1440px max-width). Components should align to these columns to maintain a rigid, architectural structure.
- **Vertical Rhythm:** Use the `stack` variables to maintain consistent white space. Generous top margins (stack-xl) should be used to separate major sections, creating a "breathable" high-end feel.
- **Safe Zones:** Content must respect a minimum 64px outer margin on desktop to avoid a cluttered appearance.
- **Mobile Reflow:** On mobile, the 12-column grid collapses to a single-column layout with 20px side margins. Data visualizations should transition to horizontal scrolling or simplified "key takeaway" views.

## Elevation & Depth

To maintain a minimalist and professional tone, the design system avoids heavy shadows in favor of **Tonal Layers** and **Low-contrast Outlines**.

- **Surface Tiers:** Use subtle shifts in background color to indicate depth. The base layer is #0A192F, while elevated cards use a slightly lighter tint or a semi-transparent overlay (White at 4% opacity).
- **Borders:** Use 1px solid borders in #475569 (Slate) to define boundaries. 
- **Active State Depth:** Only the "Action Cyan" elements may use a subtle glow effect (outer glow, 15% opacity) to simulate a digital "lit" state, emphasizing their interactivity without breaking the flat professional aesthetic.

## Shapes

The shape language is conservative and precise. 

- **Corners:** Use **Soft (0.25rem)** rounding for standard components like buttons and input fields. This provides a modern touch without appearing overly "bubbly" or consumer-grade.
- **Large Containers:** Cards and major content sections should use `rounded-lg` (0.5rem) to subtly distinguish them from the background.
- **Charts:** Data points in bar charts or line graphs should remain sharp or minimally rounded to emphasize mathematical precision.

## Components

- **Buttons:** Primary buttons use a solid Action Cyan background with #0A192F text. Secondary buttons use a Slate border with Cyan text. State transitions should be instant, reflecting efficiency.
- **Data Visualizations:** Use Action Cyan for the primary data series. Use Slate for axes and grid lines. Text within charts should use the `body-sm` role.
- **Cards:** Cards should have no shadow; they are defined by a 1px border (#475569) or a slight tonal lift.
- **Input Fields:** Minimalist design with only a bottom border that turns Cyan on focus. Labels should use the `label-caps` role.
- **Lists:** Use thin horizontal dividers (1px, Slate at 30% opacity) between list items. Use Action Cyan for bullet points or iconography to guide the eye.
- **Executive Summary Box:** A specific component with a thick 4px left-border in Action Cyan, used to highlight the "Bottom Line Up Front" (BLUF) or key takeaways of a page.