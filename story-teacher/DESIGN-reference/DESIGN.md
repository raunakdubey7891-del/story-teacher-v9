---
name: Scholarly Wonder
colors:
  surface: '#f8f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f8f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f7'
  surface-container: '#edeef2'
  surface-container-high: '#e7e8ec'
  surface-container-highest: '#e1e2e6'
  on-surface: '#191c1f'
  on-surface-variant: '#45464f'
  inverse-surface: '#2e3134'
  inverse-on-surface: '#eff1f5'
  outline: '#767680'
  outline-variant: '#c6c5d0'
  surface-tint: '#515b90'
  primary: '#071447'
  on-primary: '#ffffff'
  primary-container: '#1f2a5c'
  on-primary-container: '#8892cb'
  inverse-primary: '#b9c3ff'
  secondary: '#835400'
  on-secondary: '#ffffff'
  secondary-container: '#ffad2e'
  on-secondary-container: '#6c4400'
  tertiary: '#001e14'
  on-tertiary: '#ffffff'
  tertiary-container: '#003525'
  on-tertiary-container: '#13a97f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#0a1649'
  on-primary-fixed-variant: '#394377'
  secondary-fixed: '#ffddb5'
  secondary-fixed-dim: '#ffb957'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#7bf9c9'
  tertiary-fixed-dim: '#5ddcae'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#00513b'
  background: '#f8f9fd'
  on-background: '#191c1f'
  surface-variant: '#e1e2e6'
typography:
  display-hero:
    fontFamily: Literata
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
  display-hero-mobile:
    fontFamily: Literata
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg:
    fontFamily: Literata
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Literata
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Literata
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Literata
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-lg:
    fontFamily: Nunito Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system serves an AI-driven learning companion spanning early childhood through higher secondary education (Play Group to Class 12). The core tension lies in bridging whimsical storytelling with academic rigor: it must feel wonderous and inviting to early learners, while remaining sharp, structured, and dignified for senior secondary scholars.

The design movement synthesizes **Warm Tactile Neoclassicism** with **Contemporary Clean Glass**. Crisp off-white canvases, warm literary serif headlines, tactile pill badges, and layered translucent navigation panels establish an aura of an enchanted modern library. It rejects sterile SaaS patterns in favor of calm curiosity, academic clarity, and encouraging, stress-free micro-interactions.

## Colors

The palette balances authoritative scholastic depth with dynamic, optimistic learning accents:

- **Deep Indigo (`#1F2A5C`)**: The grounding anchor. Used for primary typography, authoritative actions, brand crests, and high-emphasis interactive states. Provides WCAG AAA contrast against light grounds.
- **Saffron Warmth (`#F5A524`)**: The primary spark of curiosity. Used for gamification milestones, interactive hints, attention beacons, progress streaks, and critical CTA hovers.
- **Fresh Mint (`#2BB58A`)**: Represents growth, mastered concepts, success confirmations, and active story sessions.
- **Alert Coral (`#EF6B5B`)**: Destructive alerts, incorrect answers, and time-warning thresholds, softened enough to guide rather than discourage.
- **Base Canvas (`#F7F8FC`)**: Off-white tinted with faint violet-blue undertones, eliminating sterile monitor glare during prolonged reading.
- **Card Surface (`#FFFFFF`)**: Pure white elevated over the canvas with faint indigo borders (`#EAEFF8`).

Tint ramps for pastel badges must use 12–15% opacity fills derived directly from Saffron, Mint, and Coral, overlaid with full-strength base text.

## Typography

Typography establishes an editorial atmosphere that feels like an interactive storybook.

- **Headlines & Editorial Titles**: Literata delivers a warm, scholarly presence with human optical weight. Use it for chapter headlines, storytelling narratives, lesson titles, and achievement banners.
- **Body & UI**: Nunito Sans provides open apertures, rounded terminals, and clear geometry, making it effortless to parse for both emerging readers (Play Group) and senior exam students reviewing complex technical prompts.
- **Hierarchy Rules**: Editorial questions and story segments must always be set in Literata to delineate narrative content from system controls and UI mechanics set in Nunito Sans.

## Layout & Spacing

The layout is built on an adaptable 12-column grid designed for long-form reading, interactive visual cards, and side-by-side prompt workspaces:

- **Desktop (1200px+)**: 12 columns, `margin-lg` (48px), `gutter-lg` (32px). Maximum content width is capped at 1280px to preserve comfortable reading line lengths (65–75 characters).
- **Tablet (768px – 1199px)**: 8 columns, `margin` (24px), `gutter` (24px). Dual-panel educational views (reading on left, exercises on right) fold gracefully into tabbed stacks.
- **Mobile (Below 768px)**: 4 columns, `margin-sm` (16px), `gutter-sm` (16px). Primary bottom navigation and full-width card stacks ensure thumb-friendly access for younger students.
- **Vertical Spacing Cadence**: Multi-tiered element groupings rely on strict multiples of 8px (`space-sm`, `space-md`, `space-lg`, `space-xl`) to maintain a clean cadence across dynamic content blocks.

## Elevation & Depth

Visual hierarchy uses a serene, light-catching depth model avoiding harsh pitch-black drops:

- **Ambient Indigo Shadows**: Shadows are cast using deep indigo rather than neutral black, preserving luminous purity.
  - *Resting Card*: `0 4px 16px rgba(31, 42, 92, 0.04), 0 1px 3px rgba(31, 42, 92, 0.02)`.
  - *Interactive Hover Card*: `0 12px 28px rgba(31, 42, 92, 0.08), 0 2px 6px rgba(31, 42, 92, 0.03)`.
  - *Floating Modals / Trays*: `0 20px 48px rgba(31, 42, 92, 0.12), 0 4px 12px rgba(31, 42, 92, 0.04)`.
- **Structural Outlines**: All raised surfaces feature a precise 1px perimeter border set to `#EAEFF8` to preserve boundary clarity for high-contrast accessibility.
- **Glassmorphic Navigation Layers**: Top application bars and persistent lesson controllers utilize frosted translucency (`rgba(255, 255, 255, 0.85)` with a `16px` backdrop-filter blur) to keep background context perceptible while focusing on active tasks.

## Shapes

The shape hierarchy establishes clear tactile meaning across UI tiers:

- **Large Interactive & Feature Cards (`24px` radius)**: Used for key learning modules, story containers, grade-selection tiles, and media preview wrappers.
- **Secondary Surfaces & Containers (`16px` radius)**: Used for quiz options, nested response blocks, drop-down sheets, and modal frames.
- **Badges, Buttons & Interactive Controls (`12px` radius)**: Used for actionable inputs, primary CTAs, subject pills, and search bars.
- **Pill Counters & Status Nodes (Full Round / `9999px`)**: Reserved for progress trackers, avatar containers, and inline step milestones.

## Components

### Buttons
- **Primary**: Deep Indigo background (`#1F2A5C`), pure white text, 12px radius, vertical padding `space-sm` (12px), horizontal padding `space-lg` (24px). Subtle lift on hover (-2px transform with elevated indigo shadow).
- **Secondary / Accent**: Saffron Warmth (`#F5A524`) fill with Deep Indigo text for high-energy actions (e.g., "Start Adventure", "Submit Answer").
- **Ghost / Outlined**: Transparent background, 1.5px solid `#EAEFF8` border, Deep Indigo text. Hover shifts background to `rgba(31, 42, 92, 0.04)`.

### Cards & Learning Modules
- **Primary Feature Card**: Pure white background (`#FFFFFF`), 24px corner radius, 1px solid border (`#EAEFF8`), resting indigo shadow. Padding is generous (`space-xl` / 32px on desktop, `space-lg` / 24px on mobile).
- **Interactive Quiz Option Card**: 16px radius, bordered in `#EAEFF8`. On selection, transitions instantly to a Mint border (`#2BB58A`) with a 6% Mint tint background, accompanied by a check icon.

### Chips & Badges
- **Subject & Grade Pills**: 12px or pill radius, font size `label-md`. Constructed with a 10% tint of the category accent color (e.g., Mint for Science, Saffron for History) and paired with deep corresponding text for accessible legibility.
- **AI Assist Badge**: Frosted surface with a soft Saffron outline and Lucide Sparkles icon, indicating AI-generated lesson prompts.

### Form Inputs & Search Fields
- 12px radius, `#FFFFFF` background, 1.5px `#EAEFF8` border.
- **Focus State**: 2px ring in `#1F2A5C` with a 4px outer halo of `rgba(31, 42, 92, 0.12)`. No abrupt layout shifts. Label typography stays pinned in `label-md`.

### Selection Controls (Checkboxes & Radios)
- Custom rounded squares (8px radius) for checkboxes, circular for radios.
- Unchecked: 1.5px border in `#C8D3E6`. Checked: Filled with Deep Indigo (`#1F2A5C`) displaying crisp white inner check/dot iconography.

### Progress & Milestone Meters
- 8px high continuous track with a rounded pill terminus. Track background `#EAEFF8`, fill animated smoothly using Mint (`#2BB58A`) or Saffron (`#F5A524`).
- Pair with Lucide clean line icons (1.75px stroke width) scaled strictly to 16px, 20px, or 24px grid squares.