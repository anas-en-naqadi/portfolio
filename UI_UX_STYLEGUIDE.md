# UI/UX Design & Architecture Style Guide

> **Portfolio OS** — Tri-platform Apple-inspired web portfolio (`macOS` Desktop, `iPadOS` Tablet, `iOS` Mobile) built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **next-intl** (`en` / `fr`).

Use this guide as the single source of truth when extending, refactoring, or porting UI across device shells.

---

## 1. Platform Architecture & Device Routing

Device detection lives in `src/components/shared/ResponsiveOS.tsx`:

| Device Shell | Viewport Rule | Entry Component |
| :--- | :--- | :--- |
| **iOS (Mobile)** | `width <= 480px` **or** (`width < 1024px && height <= 500px`) | `src/components/mobile/MobileOS.tsx` |
| **iPadOS (Tablet)** | `481px <= width < 1024px` **and** `height > 500px` | `src/components/tablet/TabletOS.tsx` |
| **macOS (Desktop)** | `width >= 1024px` (with landscape phones excluded above) | `src/components/desktop/DesktopOS.tsx` |

### Shared Foundations
- **Theme State** (`src/hooks/useTheme.ts`):
  - Defaults to `'dark'` on first visit; persists `'dark' | 'light'` under `localStorage['portfolio-theme']` and toggles the `.dark` / `.light` class on `document.documentElement`.
- **Typography** (`src/styles/globals.css`):
  - Primary stack: `--font-inter: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` (paired with `"SF Pro Text"` / `"SF Pro Rounded"` where native Apple density or weather numerals apply).
  - Numerical counters, clocks, percentages, and calendars use `tabular-nums`.
- **Localization** (`src/i18n/config.ts`, `src/i18n/messages/en.json`, `src/i18n/messages/fr.json`):
  - Supported locales: `['en', 'fr']` (default `'en'`).
  - Always add new UI strings to **both** `en.json` and `fr.json`.
  - Keep compact chrome badges (`Control Center`, menu bar) as uppercase `EN` / `FR`; full Settings pickers may use `English` / `Français`.
- **Iconography** (`src/components/shared/SFSymbols.tsx`, `src/components/shared/AppleIcons.tsx`):
  - **Rule**: Never use raw emojis as system UI icons. Use monochrome inline SVGs from `SFSymbols.tsx` (`fill="currentColor"` or `stroke="currentColor"`).
  - `WifiSymbol` (`viewBox="0 0 24 18"`) uses 3 solid concentric fan tiers inheriting `currentColor` for automatic Dark/Light adaptation across all three status/menu bars.
  - App icons come exclusively from `getAppleIcon(id, size)` in `AppleIcons.tsx`. Registered IDs: `finder`/`files`, `about`/`contacts`, `experience`/`calendar`, `projects`/`appstore`, `skills`/`notes`, `settings`, `contact`/`mail`, `safari`, `launchpad`, `downloads`/`cv`, `github`, `linkedin`, `phone`, `instagram`, `whatsapp`, `facetime`, `photos`, `camera`, `reminders`, `clock`, `messages`, `wallet`, `health`, `trash`.
- **CV Download Flow** (`src/components/shared/CVDownloadModal.tsx`):
  - Uses variant-adapted native dialogs: `'macos'` centered sheet, `'ipados'` centered alert, `'ios'` bottom action sheet.
- **Focus Audio Engine** (`src/components/shared/FocusAudioProvider.tsx`):
  - Two tracks: `argon` (`/audio/focus-1.mp3`) and `astra` (`/audio/focus-2.mp3`).
  - **Audio control rule**: Wrap every audio player container in `data-audio-control="true"` so the global first-gesture autoplay unlocker (`touchend`, `pointerup`, `click`, `keydown`) does not double-trigger `play()` on interactive player controls.
  - **Track-switch rule**: Never bind a reactive `src={currentTrack.src}` prop on `<audio>`. Manage `audio.setAttribute('src', ...)` imperatively inside `selectTrack` / `togglePlay` / mount so React re-renders never abort an in-flight `.play()` gesture.
  - **Unlock & storage guards**:
    - Never rely on `!audio.paused` to infer active playback; gate gesture cleanup on `playbackConfirmedRef` (`play()` resolution / `<audio onPlaying>`) paired with `playAttemptIdRef` so rejected `touchend` calls never block `click` or overwrite `isPlaying`.
    - Always check `raw !== null && raw.trim() !== ''` before calling `Number(...)` on `localStorage` (`Number(null) === 0` would otherwise mute volume to `0` on fresh browsers).
    - Clear `sessionStorage['portfolio-audio-paused']` on `navigation.type === 'reload'` while keeping it across in-app `EN <-> FR` locale switches.

---

## 2. Shared Color & Interaction Tokens

| Token / Role | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| **Primary Apple Accent** | `#007AFF` | `#007AFF` / `#0A84FF` |
| **Apple Switch On** | `#34C759` | `#34C759` |
| **Weather / Accent Navy** | `#0A1931 -> #15305B` | `#0A1931 -> #15305B` |
| **Calendar Education / Work** | `#007AFF` / `#FF2D55` | `#007AFF` / `#FF2D55` |
| **Notes / Skills Accent** | `#D08A00` / `#FBEED7` | `#EAA135` |
| **Slider Track (`.ios-volume-slider`)** | `linear-gradient(to right, #007AFF pct%, rgba(120,120,128,0.24) pct%)` | `linear-gradient(to right, #007AFF pct%, rgba(255,255,255,0.2) pct%)` |
| **Slider Thumb** | `#FFFFFF` (`18px`, `0.5px` dark alpha border, soft drop shadow) | `#FFFFFF` (`18px`, `0.5px` dark alpha border, soft drop shadow) |

---

## 3. macOS / Desktop Guidelines (`src/components/desktop/`)

### Shell Structure
1. **Top Menu Bar (`MacOSMenuBar.tsx`)**
   - Fixed full-width bar, `h-[28px]`, `z-[9100]`.
   - Frosted acrylic glass: `blur(28px) saturate(180%)`, `rgba(22, 22, 26, 0.62)` (dark) / `rgba(255, 255, 255, 0.58)` (light), `1px` bottom hairline.
   - Left: `AppleLogoSymbol` menu + active app title + `File / Edit / View / Go / Window / Help`.
   - Right: Now Playing audio toggle (`AudioEqualizerBars` when playing / `MusicNoteSymbol` when paused) + `WifiSymbol` + `BatterySymbol` + Spotlight (`SearchSymbol`) + `ControlCenterSymbol` + localized Date & Time (`tabular-nums`).
   - Popovers (`280px` Now Playing, `308px` Control Center): `rounded-2xl`, `blur(32px) saturate(190%)`, `rgba(34, 34, 38, 0.88)` (dark) / `rgba(255, 255, 255, 0.92)` (light). Language toggle uses compact `FR -> EN` / `EN -> FR` action pill.

2. **Floating Windows (`Window.tsx`)**
   - Draggable + 8-edge/corner resizable (`MIN_WIDTH = 520`, `MIN_HEIGHT = 380`), preserving `MENU_BAR_HEIGHT = 28` and `DOCK_RESERVE = 92`.
   - `borderRadius: 14` floating (`12` maximized).
   - Glass surface: `blur(36px) saturate(180%)`; Dark active `rgba(28, 28, 32, 0.86)` / inactive `0.78`; Light active `rgba(250, 250, 252, 0.88)` / inactive `rgba(245, 245, 247, 0.82)`.
   - Titlebar: `40px` height with centered `13px` semibold title and left-aligned traffic lights (`#FF5F57`, `#FEBC2E`, `#28C840`) that reveal hover glyphs (`CloseGlyph`, `MinusGlyph`, `MaximizeDiagonalGlyph`).
   - Responsive internal split views use `.macos-window-container` container queries (`660px` sidebar collapse threshold; `215px` -> `245px` width at `860px`).

   ### Desktop Window Internal App Pattern (`src/components/desktop/windows/*`)
   - Outer flex column: optional `<WindowToolbar buttons={...} rightContent={...} theme={theme} />` (`src/components/shared/WindowToolbar.tsx`) above `.macos-split-layout.flex-1.min-h-0`.
   - Sidebar (`<aside className="macos-split-sidebar p-3 ...">`): `bg-white/[0.03]` (dark) / `bg-black/[0.025]` (light); `.macos-sidebar-nav` buttons use `bg-[#007AFF] text-white` when active, `text-white/80 hover:bg-white/[0.07]` (dark) / `text-gray-800 hover:bg-black/[0.05]` (light) when inactive.
   - Detail canvas: `flex-1 overflow-y-auto macos-scroll p-5` (or `p-6`) with `cardClass` cards (`rounded-xl border p-4`: `bg-white/[0.04] border-white/10` dark, `bg-white/75`–`bg-white/80 border-black/10` light).

3. **Dock (`Taskbar.tsx`) & Desktop Icons (`DesktopOS.tsx`)**
   - Dock: Centered pill `rounded-[22px]` (`bottom-3`), `blur(30px) saturate(190%)` dark / `blur(22px) saturate(165%)` light.
   - Spring magnification: `46px` base -> `60px` peak within `115px` cursor distance, floating tooltip pill above hovered item, running dot indicator underneath open apps, vertical `1px x 32px` divider before utility items (`Download CV`, `GitHub`, `LinkedIn`, `Trash`).
   - Desktop shortcuts: Right-aligned vertical stack (`top-[42px] right-4`).
   - Wallpapers: `/images/desktop-bg.webp` (`Argon Workspace`) & `/images/desktop-bg-2.webp` (`Astra Workspace`).

---

## 4. iPadOS / Tablet Guidelines (`src/components/tablet/`)

### Shell Structure
1. **Status Bar (`iPadStatusBar.tsx`)**
   - `h-10` top chrome.
   - Text polarity: Always `text-white` on Home Screen (`!isAppOpen`) or in Dark Mode; switches to `text-gray-900` over `bg-white/80 backdrop-blur-xl` when an app is open in Light Mode.
   - Right status cluster (`Music` indicator, `WifiSymbol`, `85%`, `BatterySymbol`) acts as Control Center trigger (click or mouse hover).

2. **Bento Control Center (`TabletOS.tsx`)**
   - Width: `w-[312px] sm:w-[328px]`, `rounded-[28px]`, `p-3.5`.
   - Frosted shell (`blur(38px) saturate(190%)`):
     - **Dark**: `rgba(28, 28, 32, 0.86)`, `border-white/15`, tiles `bg-white/[0.09] border-white/[0.08]`.
     - **Light**: `rgba(242, 242, 247, 0.90)` milk glass, `border-white/85`, crisp tiles `bg-white/90 border-black/[0.06]` (avoid translucent `bg-black/5` tiles on dark wallpapers—they turn muddy gray).
   - Structure:
     - **Row 1 (`grid-cols-2 gap-2.5`)**: Left = Appearance toggle tile (`MoonSymbol` indigo / `SunSymbol` amber badge); Right = Language tile with full-width 2-column **`EN` | `FR`** segmented buttons.
     - **Row 2**: Focus Audio media module (`BackwardEnd`, `#007AFF` `Play/Pause`, `ForwardEnd`, 2-col track selector pills, `.ios-volume-slider` with `#007AFF` progress gradient).
     - **Row 3**: 2-column Wallpaper switcher (`Argon Workspace` / `Astra Workspace`).
     - **Row 4 (when sheet is open)**: Full-width `#007AFF` Return Home button.

3. **Home Screen Widgets & Dock (`IPadWidgets.tsx`, `iPadDock.tsx`)**
   - 2x2 Widget grid (`Clock` analog+digital, `Weather` `#0A1931 -> #15305B`, `Profile`, `CV/Resume`), `borderRadius: 22`, `blur(22px) saturate(170%)`.
   - Centered glass Dock (`rounded-[26px] sm:rounded-[30px]`).
   - Wallpapers: `/images/tablet-bg.webp` & `/images/tablet-bg-2.webp`.

4. **Full-Screen App Sheets & Swipe-Up Home Bar (`IPadSheet.tsx`)**
   - Enters edge-to-edge (`inset-0 pt-10`, **no solid bottom padding band**) with top-center `•••` multitasking popover.
   - **Home Indicator Rule**: Never attach `drag="y"` to the bottom bar itself. Anchor the transparent container (`w-48 h-7 bg-transparent`) and bind `onPan` / `onPanEnd` (`offset.y < -28 || velocity.y < -180`, plus click fallback when not panning) to lift/scale the whole sheet gently (`y: -swipeProgress * 28`, `scale: 1 - swipeProgress * 0.05`, `spring(stiffness: 360, damping: 34)`).

5. **Split View Color & Elevation System (`IPadSplitView.tsx`)**
   - Uses `.ipad-sheet-container` (`min-width: 700px` switches top horizontal pills to side-by-side `245px` / `275px` sidebar; scrollable content includes `pb-10` clearance for the transparent home bar).
   - **Progressive Surface Elevation** (Light gets slightly brighter top-to-card; Dark steps progressively lighter as surfaces rise):

| Layer | Light Mode | Dark Mode | Applies To |
| :--- | :--- | :--- | :--- |
| **Sidebar Chrome** | `bg-[#EFEFF4]/95` | `bg-[#161618]/95` | All 6 iPad apps |
| **Detail Canvas** | `bg-[#F2F2F7]` | `bg-[#1C1C1E]` | `About`, `Experience`, `Projects`, `Settings` |
| **Elevated Cards** | `bg-white border-black/[0.05]` | `bg-[#2C2C2E] border-white/[0.08]` | `About`, `Experience`, `Projects`, `Settings`, `Contact` inset box |
| **Nested Controls / Hover** | `bg-gray-100` / `hover:bg-gray-50` | `bg-[#3A3A3C]` / `#1C1C1E` track | Segmented pills, `GET` button, action hover |
| **Neutral Sidebar Active/Hover** | `bg-white text-zinc-900 shadow-sm` / `hover:bg-black/5 text-zinc-600` | `bg-white/15 text-white shadow-sm` / `hover:bg-white/5 text-zinc-400` | Shared via `getIPadSidebarItemClasses(theme)` (`About`, `Experience`, `Projects`, `Contact`, `Settings`) |

   - **Intentional App Exceptions**:
     - `IPadSkills.tsx` (Apple Notes): Keeps warm paper `bg-[#FCF9F2]` (light) / `bg-[#1C1C1E]` (dark) and amber sidebar selection (`bg-[#FBEED7]` / `bg-[#EAA135]/20`).
     - `IPadContact.tsx` (Apple Mail): Keeps `bg-white` reading sheet in light mode around its `bg-gray-50` inset card (`bg-[#1C1C1E]` + `bg-[#2C2C2E]` in dark mode).

---

## 5. iOS / Mobile Guidelines (`src/components/mobile/`)

### Shell Structure
1. **Status Bar (`IOSStatusBar.tsx`)**
   - `min-h-11` respecting `env(safe-area-inset-top)`.
   - Left: short time; Center: `w-28 h-7` Dynamic Island safe spacer; Right: `WifiSymbol` (`w-4 h-3.5`) + `85%` + `BatterySymbol`.
   - Polarity: `text-white` on Home Screen or Dark Mode apps; `text-black` in Light Mode open apps.

2. **Dynamic Island (`DynamicIsland.tsx`)**
   - Pure black `#000000` pill with `border-white/10` and `0 10px 30px rgba(0,0,0,0.5)` shadow, anchored at `top-[max(0.625rem,env(safe-area-inset-top))]`.
   - Spring morph states (`stiffness: 350, damping: 26`):
     - `collapsed`: `110x30` (expands to `142x30` showing blue `MusicNoteSymbol` + green `AudioEqualizerBars` while playing).
     - `audioPlayer` (on tap): `272x60` (`rounded-[28px]`) with artwork, track title/artist, circular Play/Pause + Next controls, collapsing on outside tap or 6s idle.
     - `appOpen` (`208x42`), `langChange` (`180x42`), `cvDownload` (`232x44`).

3. **Home Screen (`MobileOS.tsx` & `IOSDock.tsx`)**
   - Full-bleed wallpaper (`/images/mobile-bg.webp` / `/images/mobile-bg-2.webp`) with subtle `blur-[1.5px]` and dark vertical contrast scrim.
   - Marrakech Weather widget (`#0A1931 -> #15305B`, `rounded-3xl`), followed by responsive app grid (`grid-cols-4` portrait -> `min-[540px]:grid-cols-6` landscape, `56px` icons).
   - Floating glass Dock (`rounded-[28px]`, `rgba(255,255,255,0.15)`, `blur(22px) saturate(160%)`) + Home Indicator bar (`134px x 5px`) when on Home Screen.

4. **Slide-Up Sheets (`IOSSheet.tsx`) & Settings**
   - Sheet: `height: min(92dvh, calc(100dvh - 16px))`, `borderRadius: "24px 24px 0 0"`, `#1c1c1e` (dark) / `#f2f2f7` (light), top header with icon + title + circular `X` button, `pb-12` scroll padding.
   - Bottom swipe-up Home Bar (`w-48 h-7`, `134px x 5px` pill): `onPan` / `onPanEnd` closing on `offset.y < -28 || velocity.y < -180`, lifting/scaling the sheet smoothly.
   - Grouped Settings list (`MobileOS.tsx`): Rounded `bg-white dark:bg-zinc-900` cards (`rounded-2xl`, `divide-y`), native iOS `#34C759` switch, `English / Français` segmented toggle, Focus Audio track checkmark list, `.ios-volume-slider` with `#007AFF` progress fill + white thumb, and 2-column wallpaper picker.

---

## 6. Blueprint: Adding a New App / Component Across All 3 Shells

When adding a new portfolio app or feature, follow these exact conventions:

1. **Data, Icons & i18n First**:
   - Add content/types to `src/lib/data.ts` (localized in `getLocalizedPortfolioData(locale)`).
   - Add strings in **both** `src/i18n/messages/en.json` and `src/i18n/messages/fr.json`.
   - Use an existing ID in `getAppleIcon(id, size)` (`AppleIcons.tsx`) or add a new SVG squircle there; use `SFSymbols.tsx` for any monochrome system glyphs.
2. **macOS / Desktop**:
   - Create `src/components/desktop/windows/<Name>Window.tsx` following the `WindowToolbar` + `.macos-split-layout` + `.macos-scroll` + `cardClass` pattern (`AboutWindow.tsx` / `SettingsWindow.tsx`).
   - Register its ID in `DesktopWindowId` (`SpotlightSearch.tsx`), `WINDOW_IDS`, state records, `windowTitles`, `desktopIcons`, Dock items, and `<Window>` mounts in `DesktopOS.tsx` (and `MacOSMenuBar.tsx` / `SpotlightSearch.tsx` if menu-listed).
3. **iPadOS / Tablet**:
   - Create `src/components/tablet/IPad<Name>.tsx` using `IPadSplitView` and `getIPadSidebarItemClasses(theme)`.
   - Use default `IPadSplitView` backgrounds (`#EFEFF4` / `#161618` sidebar, `#F2F2F7` / `#1C1C1E` canvas) with `bg-white dark:bg-[#2C2C2E]` (`border-black/[0.05] dark:border-white/[0.08]`) cards.
   - Register in `TabletOS.tsx` (`AppId`, `appConfigs`, `windowComponents`).
4. **iOS / Mobile**:
   - Add the app to `AppId`, `appTitles`, `appContent` (wrapped in `AnimatedSection` with `bg-white dark:bg-zinc-900 rounded-2xl` grouped cards), and `gridApps` inside `MobileOS.tsx`, plus `appMeta` in `DynamicIsland.tsx` so the island pill morphs when opening it.

---

## 7. Checklist Before Submitting UI Changes
- [ ] **Cross-device parity**: Did you check whether Desktop, Tablet, and Mobile stay visually consistent where shared (`SFSymbols`, `FocusAudio`, `CVDownloadModal`, Wallpapers)?
- [ ] **Light & Dark contrast**: Verify cards sit one step lighter than their canvas (`#FFFFFF` on `#F2F2F7` in Light; `#2C2C2E` on `#1C1C1E` in Dark on iPadOS, and `#FFFFFF` on `#F2F2F7` / `bg-zinc-900` in iOS) and muted labels stay legible (`zinc-500` light / `zinc-400` dark).
- [ ] **No raw emojis / unlocalized text**: All UI icons come from `SFSymbols.tsx` / `AppleIcons.tsx`; all text keys exist in both `en.json` and `fr.json`.
- [ ] **Verification**: Run `npm run type-check; npm run lint; npm run build`.
