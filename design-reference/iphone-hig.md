# iOS 18 UI/UX Reference — iPhone (Pre-Liquid Glass)

## Design Philosophy
- Single-column, single-task focus per screen
- Thumb-reachable — primary actions in bottom half of screen where possible
- Depth kept minimal: flat surfaces, subtle shadows only on floating elements (sheets, alerts)
- Content-forward: chrome (nav bars, tab bars) recedes, content is the star

## Layout Structure
- **Navigation bar**: top, 44pt (standard) or up to 96pt (large title state), collapses on scroll
- **Tab bar**: bottom, 49pt + safe area, 5 items max, icon (25pt) + label (10pt) stacked
- **Content**: single scrollable column, full device width minus 16-20px margins
- **Modals**: presented as sheets (partial-height, card-style with rounded top corners) or full-screen covers

## Typography (Dynamic Type — MUST support)
- Large Title: 34pt bold
- Title 1: 28pt bold
- Title 2: 22pt bold
- Title 3: 20pt semibold
- Headline: 17pt semibold
- Body: 17pt regular ← default reading size
- Callout: 16pt regular
- Subheadline: 15pt regular
- Footnote: 13pt regular
- Caption: 12pt regular

## Color System
- systemBackground / secondarySystemBackground (grouped list backgrounds)
- label / secondaryLabel / tertiaryLabel / quaternaryLabel (text hierarchy)
- systemBlue default tint (or app-specific accent) — used ONLY for interactive/tappable elements
- Semantic system colors auto-adapt to light/dark — never hardcode

## Materials & Depth
- Nav bar / tab bar: translucent blur (`.systemMaterial` / `.systemChromeMaterial`) that reveals content scrolling beneath
- Sheets: solid or lightly blurred card, 10-16px top corner radius, drag indicator (36x5pt gray pill) at top center
- Alerts: centered card, blurred background dimming behind, 14px corner radius
- Avoid heavy glass everywhere — iOS 18 era uses blur SPARINGLY (nav bars, sheets, keyboard) not as a global surface treatment

## Components
- **Buttons**: 
  - Filled: accent color background, white text, 10-14px corner radius, 44-50pt height
  - Plain/text: accent color text only, no background
  - Minimum tap target: 44x44pt always
- **Lists**: 
  - Grouped/Inset style default: rounded rect groups, 10px corner radius, 16px section margins
  - Row height: 44pt minimum, 44-60pt typical with subtitle
  - Chevron disclosure indicator right-aligned, gray, for navigational rows
- **Toggles**: standard switch, green when on, 51x31pt
- **Segmented control**: pill container, 32-36pt height, selected segment white/dark background with subtle shadow
- **Search bar**: rounded rect, gray fill (`.systemGray6`), 36pt height, integrated into nav bar or list header
- **Cards**: white/elevated surface, 12-16px corner radius, subtle shadow (2-4px blur, 8-10% opacity)
- **Sheets** (half/full modal): rounded top corners 10-16px, grabber handle, can be resizable (medium/large detents)

## Icons
- SF Symbols exclusively for system UI, weight-matched to text
- Tab bar icons: 25pt, unfilled when inactive, filled variant when active (common pattern: house → house.fill)
- App icon: squircle (superellipse) shape, single focal image/glyph, NO text on icon, flat-ish with subtle gradient allowed, edge-to-edge artwork (system applies the mask)
- No icon borders/frames — the OS-applied squircle mask + shadow is the only framing

## Navigation Patterns
- Push navigation: new screen slides in from right, back button top-left with chevron + previous screen title
- Modal/sheet: slides up from bottom, dismiss via swipe-down or explicit Cancel/Done buttons
- Tab bar: persistent bottom navigation for top-level sections (max 5, use "More" overflow beyond that)

## App Structure Pattern (typical iPhone app)
iPhoneApp/
├── Tab Bar (2-5 top-level sections: Home, Search, Library, Profile)
│   ├── Tab 1: Nav Stack → List View → Detail View
│   ├── Tab 2: Nav Stack → Search → Results List → Detail
│   └── Tab N...
├── Modals (presented over any tab): Settings, Compose, Onboarding
└── Alerts/Action Sheets: confirmations, destructive actions

## Spacing System
- Base unit: 4px
- Screen margins: 16-20px (standard), 16px is iOS default
- Row/cell internal padding: 12-16px
- Section spacing (grouped lists): 24-35px between groups

## Gestures
- Swipe right from edge: back navigation
- Swipe down on sheet: dismiss
- Swipe left on list row: reveal contextual actions (delete, archive — red/colored background reveals)
- Long-press: context menu (blurred background, preview of item + action list)
- Pull-to-refresh: standard spinner, top of scrollable list

## Motion
- Push/pop navigation: 0.35s slide, ease-in-out
- Sheet presentation: 0.4s spring (slight overshoot/bounce)
- Tab switch: instant, no transition animation (crossfade at most)
- Button tap: 0.1s scale-down (0.96x) + opacity dip on press, spring back on release
- Alert presentation: scale 0.8→1.0 + fade, 0.25s spring