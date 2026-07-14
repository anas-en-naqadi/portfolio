# iPadOS UI/UX Reference — iOS 18 Era (Pre-Liquid Glass)

## Design Philosophy
- Adaptive: same app must work in full-screen, Split View, Slide Over, Stage Manager
- Touch-first but with pointer/trackpad support layered on top
- More spacious than iPhone — uses width for parallel content, not just bigger fonts

## Layout Structure
- **Sidebar (regular width)**: 320px typical, collapsible, same list pattern as Mac sidebar
- **Split View app pattern**: Sidebar | List | Detail (triple-column on largest iPads/landscape)
- **Compact width (Split Screen multitasking)**: collapses to single column, sidebar becomes a button/sheet
- Use `UISplitViewController` triple-column style as the default for content-browsing apps

## Typography
- SF Pro, Dynamic Type MUST be supported (respects user's text size setting)
- Large Title: 34pt bold (top of primary column when space allows)
- Title: 28pt bold
- Headline: 17pt semibold
- Body: 17pt regular
- Caption: 12-13pt regular
- Minimum tap-adjacent text: 11pt

## Color System
- Same semantic system colors as iOS (systemBackground, label, secondaryLabel)
- Respects light/dark mode automatically
- Accent color: single app-defined tint, used sparingly for interactive elements only

## Materials & Depth
- Sidebar: `.systemThinMaterial` or `.regularMaterial` blur when floating over content (Slide Over)
- Popovers: light blur background, rounded 14-16px corners, arrow indicator to source
- Cards: white/elevated surface with 1-2px shadow, 12-16px corner radius
- Keep blur usage moderate — reserve heavy blur for temporary/floating surfaces (popovers, Slide Over), not permanent chrome

## Components
- **Buttons**: min 44x44pt tap target regardless of visual size
- **Navigation bar**: 44pt (compact) / 96pt (large title expanded) height, translucent blur background
- **Tab bar**: NOT typically used on iPad in regular width — prefer sidebar navigation instead
- **Toolbars**: bottom or top, icon buttons 44pt tap target, 24pt icon visual size
- **Context menus**: long-press triggered, rounded rect menu, 8px corner radius, SF Symbol + label per row
- **Popovers**: used instead of full-screen modals for secondary content when in regular width

## Icons
- SF Symbols throughout, consistent weight with text
- App icon: same squircle shape as iPhone but rendered larger, more detail visible (iPad icons often show slightly more intricate artwork since they're viewed larger)
- Toolbar/nav icons: 20-24pt

## Multitasking-Specific UX
- **Split View**: app must gracefully reflow at 1/3, 1/2, 2/3 screen widths — test all three
- **Slide Over**: app renders as floating card, compact-width layout forced
- **Stage Manager**: app windows are resizable/overlapping like desktop — support arbitrary aspect ratios
- Always design for BOTH portrait and landscape — iPad users switch orientation constantly

## Pointer/Trackpad Support (if targeting cursor input)
- Buttons get hover highlight (subtle background tint on hover)
- Cursor morphs to shape of element it's over (circle → highlight shape over buttons/lists)
- Two-finger scroll, pinch-to-zoom supported natively via scroll views

## App Structure Pattern (typical iPad app)
iPadApp/
├── Sidebar (top-level navigation, collapsible)
├── Secondary Column (list of items within selected sidebar category) [triple-column only]
├── Primary Content / Detail View
├── Contextual Toolbar (changes based on selection)
└── Popover-based secondary actions (instead of full push navigation for simple tasks)

## Spacing System
- Base unit: 4px
- Content margins: 20px (compact width) / 24-32px (regular width)
- Column gutters in split layouts: 16-20px

## Motion
- Sidebar collapse/expand: 0.3s spring animation
- Split View resize: live-tracks drag, no artificial delay
- Popover presentation: scale from 0.9→1.0 + fade, 0.25s
- Page/detail transitions: standard push (slide from right), 0.35s ease

## Images/References

![iPadOS 26 Home Screen](https://upload.wikimedia.org/wikipedia/en/9/97/IPadOS_26_home_screen.png)
![iPadOS Widgets View](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdOJWwFZc6pml6a8i0MO_x19-RFtpuZORxeFAGUl_2RQ&s=10)
![iPadOS Today View](https://www.apple.com/newsroom/images/product/os/ipados/Apple_iPadOS_Today-View_060319_big.jpg.large.jpg)
