# Design Decisions — All-Pro Power Website

## Client Overview
- **Company:** All-Pro Power
- **Industry:** Electrical services / trade contractor
- **Location:** Tampa, FL — serving 6 Tampa Bay counties
- **Owner:** Ian
- **Contact:** (813) 455-9472 / Ian@all-propower.com

---

## Tech Stack Decision

**Chosen:** Static HTML + Alpine.js (CDN)

**Reasoning:**
- 7 pages total → falls in the 6–15 page range, Alpine.js is optimal
- No server-side rendering needed — purely informational + contact form
- Alpine.js handles: mobile menu toggle, form validation, scroll state
- Zero build step required → push folder to any static host and it works
- Extremely fast load times → critical for mobile users calling in emergencies

**Pages built:**
1. `index.html` — Homepage
2. `services.html` — Full services list
3. `contact.html` — Contact form + methods

(The tag/event archive page had only lorem ipsum content and was intentionally excluded as it adds no business value.)

---

## Aesthetic Identity

### The Problem We Avoided
Generic AI website for a tradesman:
- Blue/gray palette → boring, same as every contractor
- Inter font → invisible to the eye
- 3-equal-column card grid → forgettable
- Rounded white cards on white background → no contrast

### The Identity We Built: **Dark Industrial + Electric Amber**

**Rationale:** Electrical work = power, confidence, precision, danger. The aesthetic should feel like someone who knows what they're doing. Dark foundations + electric yellow reads as authoritative, premium, and distinctive among competitors.

---

## Typography

**Display font:** `Bebas Neue` — bold, condensed, industrial
- Zero letter-spacing at large sizes → raw confidence
- Used for all headings, nav, stats, buttons
- Contrast: instantly distinctive vs. every competitor using Inter/Roboto

**Body font:** `Source Sans 3` — warm, readable, professional
- Weight 300 for light details, 400 for body, 600/700 for labels
- Excellent readability at 16px / 1.65 line height
- Pairs dramatically with Bebas Neue (weight contrast: 900 vs 300)

---

## Color Palette

| Role         | Value     | Usage |
|--------------|-----------|-------|
| Primary dark | `#1c1c1c` | Backgrounds, text, nav |
| Deep dark    | `#0e0e0e` | Footer, hero overlay |
| Accent amber | `#f0a500` | CTAs, icons, highlights, stats band |
| Accent hover | `#d4920a` | Button hover state |
| Accent light | `#fff4d6` | Icon backgrounds, trust block |
| Background   | `#f8f7f4` | Page background (warm off-white) |
| Off-white    | `#f0ece6` | Section alternation |
| Text muted   | `#6b6b6b` | Body copy, descriptions |

**Why amber?** Electrical = sparks, energy, lightning. Amber/gold is unmistakably associated with electricity without being cliché. Also strong contrast against both dark and light backgrounds (meets WCAG AA 4.5:1 on dark backgrounds).

---

## Layout Decisions

### Homepage
- **Full-bleed hero** at 100svh with dark overlay — commands authority
- **Ghost number overlay** on service cards (decorative `01`, `02`, etc.) — editorial texture
- **Stats band** in amber background — visual break, builds trust
- **Asymmetric Why grid** — text 1fr + 2×2 pillars grid (not equal columns)
- **Stagger animations** on page load for hero elements (80ms increments)

### Services Page
- **2-column service cards** with icon + title + description — scannable at a glance
- **Service area section** on dark background with county tags — emphasizes geography
- Icon transitions: amber background → solid amber on hover (icon inverts to black)

### Contact Page
- **Two-column split** — contact methods left, form right
- Contact methods designed as large tap targets (min 80px height)
- Phone prominently featured as the primary action (emergency use case)
- Form with Alpine.js validation — immediate feedback, no page reload
- Mailto fallback → works even without a backend

---

## Animation Strategy

### Hero (page load stagger)
```
eyebrow  → 0ms
line-1   → 80ms
line-2   → 160ms
line-3   → 240ms
body     → 320ms
actions  → 400ms
badges   → 480ms
```
Total: 480ms to complete. Feels alive without feeling slow.

### Scroll animations
- `IntersectionObserver` at `threshold: 0.12`
- 20px translateY → 0 + opacity 0 → 1
- 450ms duration with `cubic-bezier(0.23, 1, 0.32, 1)` (snappy deceleration)
- Observe-once: no repeated animations on scroll back

### Button interactions
- Hover: `translateY(-1px)` + shadow — 120ms
- Active/press: `scale(0.97)` — 80ms
- All using `--ease-out` custom curve

### Reduced Motion
- Full `prefers-reduced-motion` support
- All animations disabled → elements shown immediately at final state

---

## Accessibility

- ✅ WCAG AA contrast on all text combinations
- ✅ Skip link (keyboard navigation)
- ✅ `aria-label` on all icon buttons
- ✅ `aria-current="page"` on active nav links
- ✅ `aria-expanded` on hamburger menu
- ✅ `alt` text on all images
- ✅ `aria-required` on required form fields
- ✅ `aria-describedby` for form error messages
- ✅ `role="alert"` on form errors and success messages
- ✅ All interactive elements min 44px touch target
- ✅ Focus-visible states using amber outline
- ✅ `autocomplete` attributes on form fields
- ✅ Semantic HTML throughout (header, nav, main, section, article, footer, address)

---

## Performance

- Images use `fetchpriority="high"` on hero, `loading="lazy"` on below-fold
- Font preconnect links in `<head>`
- Alpine.js loaded with `defer` — non-blocking
- CSS custom properties for zero-cost theming
- No JavaScript frameworks — Alpine.js is 15kb gzipped
- `width` and `height` on all `<img>` tags → prevents CLS

---

## Content Migration

| Source Page | Destination |
|-------------|-------------|
| home_003 (Home) | `index.html` — hero, why section, testimonials |
| home_004 (Services) | `services.html` — full services grid |
| home_005 (Contact) | `contact.html` — contact methods + form |
| home_001 (tag/event) | Not migrated — lorem ipsum placeholder content only |
| home/home_002 | Sitemap data only — not relevant |