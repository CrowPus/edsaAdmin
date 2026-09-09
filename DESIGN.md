# Design System — EDSA Dashboard

## Product & feel
EDSA (Electricity Distribution and Supply Authority) Dashboard is a dense, operational SaaS interface for utility management. The primary audience is operations managers, customer service agents, and system administrators. The intended personality is precise, trustworthy, professional, and efficient. The density is medium-high to accommodate data-heavy tables, charts, and system status monitors.

## Principles
1. **Clarity over decoration:** Real operational data (meters, outages, vending) needs to be read quickly.
2. **Clear status indication:** Success, warning, and danger states must be instantly recognizable, not just by color but by icon and position.
3. **Coherent density:** Space should be used efficiently. Cards and tables should feel structured and bounded.
4. **Resilient interaction:** Modals, drawers, and form interactions must provide clear feedback and robust error recovery.

## Colour
Adapted from the "linear.app" reference for rigorous, high-contrast dark mode structure, paired with EDSA's utility brand (deep emerald green) as the primary voltage. The system relies on a surface ladder to carry hierarchy rather than heavy shadows or floating glass.

**Roles (Light / Dark):**
- **canvas:** `#f8fafc` / `#010102` (Slate-50 / Linear true-dark)
- **surface:** `#ffffff` / `#0f1011` (White / Linear surface-1)
- **surface-raised:** `#f1f5f9` / `#141516` (Slate-100 / Linear surface-2)
- **border:** `#e2e8f0` / `#23252a` (Slate-200 / Linear hairline)
- **border-strong:** `#cbd5e1` / `#34343a` (Slate-300 / Linear hairline-strong)
- **fg:** `#0f172a` / `#f7f8f8` (Slate-950 / Linear ink)
- **fg-muted:** `#64748b` / `#8a8f98` (Slate-500 / Linear ink-subtle)
- **primary:** `#059669` / `#10b981` (Emerald-600 / Emerald-500)
- **primary-hover:** `#047857` / `#34d399` (Emerald-700 / Emerald-400)
- **primary-fg:** `#ffffff` / `#022c22` (White / Emerald-950)
- **success:** `#16a34a` / `#22c55e` (Green-600 / Green-500)
- **warning:** `#d97706` / `#f59e0b` (Amber-600 / Amber-500)
- **danger:** `#dc2626` / `#ef4444` (Red-600 / Red-500)
- **info:** `#2563eb` / `#3b82f6` (Blue-600 / Blue-500)
- **focus-ring:** `#10b981` (Emerald-500)

*Note: Status colors (success, warning, danger) carry operational meaning and should not be used decoratively.*

## Typography
- **Display/Body:** Inter (fallback `ui-sans-serif, system-ui, sans-serif`), weights 400, 500, 600.
- **Mono:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`.
- **Scale:**
  - `text-xs`: 12px, 16px line-height (Helper, fine print)
  - `text-sm`: 14px, 20px line-height (Default UI body, table cells)
  - `text-base`: 16px, 24px line-height (Input text, sub-headings)
  - `text-lg`: 18px, 28px line-height (Card titles, modal titles)
  - `text-xl`: 20px, 28px line-height (Section headers)
  - `text-2xl`: 24px, 32px line-height (Page headers, key metrics)
- **Tabular Figures:** Used on all numeric data cells (meters, currency, IDs) via `tabular-nums`.

## Spacing & layout
- **Scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64)
- **Container:** Max-width 1600px for the dashboard.
- **Rhythm:** 24px between major sections, 16px inside cards, 8px between related UI elements.
- **Sidebar:** 260px fixed width on desktop.

## Radius & elevation
- **Radius:**
  - `rounded-sm`: 4px (checkboxes, small tags)
  - `rounded-md`: 6px (buttons, inputs)
  - `rounded-lg`: 12px (cards, default containers)
  - `rounded-xl`: 16px (modals, major surfaces)
  - `rounded-full`: 9999px (badges, avatars)
- **Elevation (Shadows/Borders):**
  - **Light mode:** Soft shadows (`shadow-sm`, `shadow-md`) + 1px subtle borders.
  - **Dark mode:** NO heavy shadows. Depth is conveyed strictly via the surface ladder (canvas -> surface -> surface-raised) and 1px hairlines (`border`). Floating dropdowns get 1px `border-strong`.

## Components
- **Buttons:** 
  - `primary`: Solid emerald fill, primary-fg text. `rounded-md`, 36px height (`px-4 py-2`).
  - `secondary/outline`: Transparent bg, border-strong, fg text.
  - `ghost`: Transparent bg, no border, fg text. Hover gets surface-raised bg.
- **Inputs:** `surface` bg, `border` stroke, `rounded-md`, 36px height, text `fg`. `:focus-visible` gets 2px `focus-ring` outline and border-primary.
- **Cards:** `surface` bg, 1px `border`, `rounded-lg`, 16px to 24px padding. Text must be `fg` for headers/values, `fg-muted` for labels.
- **Tables:** Full width, `tabular-nums` in numeric columns. Header rows use `surface-raised` bg, `text-xs font-semibold text-fg-muted uppercase tracking-wider`. Cell text is `fg`.
- **Badges/Chips:** `rounded-full`, 24px height (`px-2.5 py-0.5 text-xs font-medium`). Background is a 10-20% opacity tint of the status color, text is the solid status color (ensure AA contrast in dark mode, may need to use solid bg if text tint is too dark).

## States
- **Empty:** Centered content, muted icon (48px), `fg-muted` text, optional clear CTA.
- **Loading:** Skeleton loaders (`animate-pulse`) using `surface-raised` bg matching the final content shape.
- **Error:** Danger-colored boundary or banner, clear explanation, recovery action.
- **Disabled:** 50% opacity, `cursor-not-allowed`, removed from focus order.

## Motion
- **Durations:** 150ms for simple state changes (hover, focus, active). 200-300ms for layout or modal enter/exit.
- **Easings:** `ease-out` for entering, `ease-in` for exiting.
- **Reduced Motion:** Honor `prefers-reduced-motion` by disabling layout and transform animations, falling back to instant state changes or simple opacity fades.

## Accessibility
- **Contrast:** AA targets (4.5:1 for text, 3:1 for UI components). The dark mode text must be `#f7f8f8` (not slate-800 on slate-900). 
- **Focus:** 2px solid ring, offset by 2px, using `focus-ring` color. Never rely on `outline: none` without a visible alternative.
- **Target sizes:** Minimum 44px on mobile, 36px on desktop for primary actions.

## Do / Don't
- **Do:** Use tabular-nums for all metering, transaction, and financial data.
- **Do:** Rely on Tailwind semantic classes (`bg-surface`, `text-fg`, `border-border`) so dark mode transitions seamlessly via CSS variables.
- **Don't:** Hardcode `dark:bg-slate-900` or `dark:text-slate-400` in components. Use the semantic tokens.
- **Don't:** Use floating glassmorphism or excessive decorative glows. This is a utility operations tool.

## Implementation
Tokens live in `src/index.css` via Tailwind v4 `@theme` mapped to CSS variables (`var(--theme-surface)`). Components consume these via utility classes without needing the `dark:` prefix for standard theming.
