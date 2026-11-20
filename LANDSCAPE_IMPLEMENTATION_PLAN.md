# Mobile & Tablet Landscape Responsiveness Implementation Plan

Upgrade **Mobile (iOS)** and **Tablet (iPadOS)** landscape handling across Home Screens, Widgets, Docks, Status Bars, Modals, and in-app views—following the `tailwind-landscape-responsivity` skill rules (`landscape-short`, `viewport-fit=cover`, `env(safe-area-inset-*)`, and `100dvh`) without shrinking or breaking desktop (`>= 1024px`) layouts.

---

## User Review Required

> [!IMPORTANT]
> **1. iPhone Real-Device Observation ("Home doesn't rotate, only open apps rotate")**
> Native iOS locks the SpringBoard Home Screen to portrait on modern iPhones while allowing open apps to rotate into landscape. In mobile web browsers (Safari / Chrome), however, rotating the phone rotates the entire browser viewport automatically.
> - **Proposed approach (Recommended):** Optimize **every opened Mobile app (`IOSSheet` + About, Experience, Projects, Skills, Contact, Settings, CV Modal)** for full landscape comfort *and* adapt the **Mobile Home Screen** with a compact side-by-side `landscape-short:` layout so users who rotate on the Home Screen in Safari or DevTools never experience clipped widgets or unreachable icons.

> [!IMPORTANT]
> **2. Tablet Landscape Rotation vs Laptop (`ResponsiveOS.tsx`)**
> Real iPads (`768×1024` / `820×1180`) cross `1024px` width when rotated to landscape (`1024×768` / `1180×820` / `1194×834`). Currently `width >= 1024` unmounts `TabletOS` and switches an iPad into macOS `DesktopOS` upon rotation (closing any open app).
> - **Proposed approach:** Keep **pure touch tablets** (`matchMedia('(pointer: coarse) and (hover: none)')` with `width <= 1366 && height > 500`) in **`TabletOS`** when rotated to landscape, while laptops, monitors, and desktop previews (`pointer: fine`) cleanly switch to **`DesktopOS`** at `width >= 1024`.

---

## Proposed Changes

### 1. Viewport Meta & Tailwind Breakpoint Tokens

#### [MODIFY] [src/app/[locale]/layout.tsx](src/app/%5Blocale%5D/layout.tsx)
- Add `viewportFit: 'cover'` to `export const viewport: Viewport` so iOS Safari exposes real `env(safe-area-inset-top/left/right/bottom)` values in landscape rather than returning `0px` or letterboxing sides.

#### [MODIFY] [tailwind.config.js](tailwind.config.js)
- Add height-gated landscape breakpoints inside **`theme.extend.screens`** (preserving all default `sm`/`md`/`lg`/`xl`/`2xl` breakpoints):
  - `'landscape-short': { raw: '(orientation: landscape) and (max-height: 500px)' }` — targets rotated smartphones only (`~320px–440px` height); never triggers on desktop monitors or portrait phones.
  - `'tablet-landscape': { raw: '(orientation: landscape) and (min-width: 700px) and (min-height: 501px) and (max-height: 860px)' }` — targets rotated iPads / Android tablets (`1024×768`, `1133×744`, `1180×820`, `1194×834`, `1280×800`) cleanly.
- Keep `short: { raw: '(max-height: 820px)' }` for existing height fallbacks where portrait compact height also benefits.

#### [MODIFY] [src/components/shared/ResponsiveOS.tsx](src/components/shared/ResponsiveOS.tsx)
- Preserve `TabletOS` across portrait-to-landscape rotations on pure touch tablets:
  ```ts
  const isTouchOnlyTablet =
    window.matchMedia('(pointer: coarse) and (hover: none)').matches &&
    width > 480 &&
    width <= 1366 &&
    height > 500
  ```
- Keep width-only standard tiers for mouse/desktop browsers (`<= 480` or `height <= 500 && width < 1024` → Mobile, `< 1024` → Tablet, `>= 1024` → Desktop).

---

### 2. Mobile (iOS) Landscape — `landscape-short` Architecture

#### [MODIFY] [IOSStatusBar.tsx](src/components/mobile/IOSStatusBar.tsx) & [DynamicIsland.tsx](src/components/mobile/DynamicIsland.tsx)
- **Status Bar:** Shrink height cleanly in rotated phones (`landscape-short:min-h-8 landscape-short:h-8 landscape-short:text-[11px]`) with horizontal `env(safe-area-inset-left/right)` clearance.
- **Dynamic Island:** In real iPhone landscape, the hardware cutout sits on the side bezel, not top-center; reduce pill footprint in `landscape-short` (`landscape-short:top-1 landscape-short:scale-[0.82]`) and prevent centered spacer interference on very short screens so it never crowds content below `44px`.

#### [MODIFY] [IOSDock.tsx](src/components/mobile/IOSDock.tsx)
- Compact Dock height & bottom offset in `landscape-short`:
  - `landscape-short:bottom-[max(0.45rem,env(safe-area-inset-bottom))]`
  - Pill padding/gap: `landscape-short:py-1.5 landscape-short:px-4 landscape-short:gap-4 landscape-short:rounded-2xl`
  - Shrink Dock icon size dynamically when `landscape-short` matches (e.g. `40px` vs `52px`) so at `375px` total screen height it leaves `> 300px` for Home content.

#### [MODIFY] [IOSSheet.tsx](src/components/mobile/IOSSheet.tsx)
- Maximize usable vertical height in short landscape (`landscape-short:h-[calc(100dvh-10px)] landscape-short:max-w-4xl landscape-short:mx-auto landscape-short:rounded-t-[20px]`).
- Compact top header bar (`landscape-short:py-2 landscape-short:px-5`), apply horizontal safe-area insets (`pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]`) so content never collides with side notches, and reduce scrollable bottom padding cleanly (`pb-10 landscape-short:pb-8`).

#### [MODIFY] [MobileOS.tsx](src/components/mobile/MobileOS.tsx) & [CVDownloadModal.tsx](src/components/shared/CVDownloadModal.tsx)
- **Mobile Home Screen (`landscape-short`):** Switch container from tall vertical stack to a balanced **horizontal 2-column dashboard** (`landscape-short:flex-row landscape-short:items-center landscape-short:gap-5`):
  - Left column (`landscape-short:w-[270px] landscape-short:shrink-0`): compact Weather card (`landscape-short:p-3.5`, `landscape-short:text-4xl` temp, tight hourly row).
  - Right column (`landscape-short:flex-1`): crisp `grid-cols-4` / `landscape-short:grid-cols-4` app grid fitting cleanly beside the widget above the compact Dock.
- **In-App Landscape Layouts (`landscape-short:` inside the 6 Mobile Apps):**
  - **About:** `landscape-short:grid landscape-short:grid-cols-[230px_1fr] landscape-short:gap-4` (Avatar + Quick Actions left, Contact/CV list + Bio right).
  - **Experience:** `landscape-short:grid landscape-short:grid-cols-2 landscape-short:gap-3` for both Education and Experience cards.
  - **Projects:** Compact sticky filter bar (`landscape-short:py-1.5`), **2-column cards** (`landscape-short:grid landscape-short:grid-cols-2 landscape-short:gap-3.5`), and compact card image height (`landscape-short:h-28`).
  - **Skills:** Compact search bar (`landscape-short:py-1.5`) + **2-column skill folder grid** (`landscape-short:grid landscape-short:grid-cols-2 landscape-short:gap-2.5 landscape-short:divide-y-0`).
  - **Contact:** **2×2 grid** (`landscape-short:grid landscape-short:grid-cols-2 landscape-short:gap-2.5`) for the 4 contact channels.
  - **Settings:** 2-column grid (`landscape-short:grid landscape-short:grid-cols-2 landscape-short:gap-4`) placing Profile left and Dark Mode / Language controls right.
  - **CVDownloadModal (`variant="ios"`):** Add `max-h-[90dvh] overflow-y-auto` and compact `landscape-short:py-2.5` row spacing so it never clips on `375px`-tall rotated screens.

---

### 3. Tablet (iPadOS) Landscape — Home Grid, 4-Up Widgets & Sheet Polish

#### [MODIFY] [iPadWidgets.tsx](src/components/tablet/iPadWidgets.tsx) & [TabletOS.tsx](src/components/tablet/TabletOS.tsx)
- **4-Column Single-Row Landscape Widgets:** Transition `IPadWidgets` from `2×2` (`grid-cols-2 grid-rows-2`) to **`tablet-landscape:grid-cols-4 tablet-landscape:grid-rows-1`** (and `lg:grid-cols-4 lg:grid-rows-1`), with compact `tablet-landscape:min-h-[160px]` card heights. This saves `~165px` of vertical height so **iPad Mini landscape (`1133×744`), iPad landscape (`1024×768`), and iPad Air landscape (`1180×820`)** fit all 4 widgets + all app icons + Dock cleanly above the fold without scrolling.
- **No Orphan App Row:** Change `TabletOS` home icon grid from `grid-cols-4 sm:grid-cols-5 md:grid-cols-6` (which puts 5 icons on row 1 and 1 orphan icon on row 2 between `640px–767px`) to `grid-cols-3 sm:grid-cols-6` (balanced 3×2 on narrow portrait, single crisp 6-across row on all `>= 640px` / landscape tablets).
- Add horizontal safe-area clearance and compact `tablet-landscape:pt-3 tablet-landscape:pb-24 tablet-landscape:gap-6` in `TabletOS.tsx`.

#### [MODIFY] [iPadSheet.tsx](src/components/tablet/iPadSheet.tsx) & Tablet App Grids
- Add `pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[max(1.75rem,env(safe-area-inset-bottom))]` in `iPadSheet.tsx` so full-screen app sheets respect landscape bezel/home-bar safe areas.
- Ensure split-view `ipad-sheet` detail panes use container/responsive multi-column grids comfortably in tablet landscape (`IPadProjects`, `IPadExperience`).

---

## Verification Plan

### Automated Tests
1. Run `npm run type-check`, `npm run lint`, and `npm run build` locally to confirm clean compilation.
2. Inspect every modified component and CSS rule to verify valid Tailwind v3.4 screen variants and zero `any` types or untranslated strings.

### Manual Verification (Browser / Responsively App)
1. **Mobile Landscape (`667×375`, `844×390`, `932×430`):**
   - Verify desktop monitors (`1280×800`, `1440×900`, `1920×1080`) are completely unaffected by `landscape-short:` rules.
   - Rotate while on Home Screen AND while inside About, Projects, Skills, Experience, Contact, Settings, and CV Action Sheet—verify no clipped headers, no overlapping icons/Dock, and no cut-off modals.
   - Test on real iPhone in Safari to confirm `viewport-fit=cover` safe-area padding clears the side notch/Dynamic Island.
2. **Tablet Landscape (`768×1024` ↔ `1024×768`, `820×1180` ↔ `1180×820`, `744×1133` ↔ `1133×744`):**
   - Verify widgets render 4-up in a single row on tablet landscape with zero clipping behind Status Bar or Dock.
   - Verify iPad split-view sheets remain usable and unobstructed across orientation changes.
