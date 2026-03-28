# UI Variants

This folder keeps the main UI exploration snapshots as PNGs.

Why this exists:
- to document the progression from the original bare-bones challenge UI to clearer and more product-aware variants
- to preserve the reasoning behind each step without mixing all decisions into the app code
- to show the difference between a minimal readability pass and a more opinionated styled branch

Variants:
- `01-current-ui.png`
  Original plain implementation. This satisfies the take-home technically, but gives almost no product or UX signal.
- `01-clarified-ui.png`
  Small copy and structure changes to make filtering and simulation easier to understand without changing the visual language.
- `01-random-sim-filter-clear.png`
  Functional improvement branch in plain HTML: random visible simulation target, filter-by-field select, and clear-all action.
- `01-implemented-figma-direction.png`
  Initial implementation of the Figma-inspired visual direction before syncing with the newer main-branch functionality.
- `01-styled-branch-with-main-features.png`
  Styled branch after bringing in the same functional behavior that later landed in main.
- `01-minimal-style-main.png`
  Minimal style pass applied directly to main. This is the “smallest useful UI polish” option: still simple, but less raw.

Production snapshots:
- `02-production-deployed.png`
  Production state for the plain functional branch with random simulation, field filtering, and clear-all.
- `02-production-styled-branch.png`
  Production state for the styled branch after syncing it with the same functionality as main.

Decision summary:
- The challenge itself does not require strong visual design.
- The role context does mention UI and customer-facing product work.
- Because of that, two parallel directions were explored:
  - minimal readability improvements on `main`
  - a more product-facing styled branch based on the Figma proposal
- Both directions preserve the same core behavior, so the tradeoff is presentation, not logic.
