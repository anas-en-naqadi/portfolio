# macOS UI/UX Reference — iOS 18 Era (Pre-Liquid Glass)

## Design Philosophy
- Desktop-first: precision pointer input, hover states, right-click menus
- Layered windows, not full-screen-only
- Sidebar + content + inspector pattern dominates
- Depth via subtle shadows and vibrancy, NOT heavy glass/blur everywhere

## Layout Structure
- **Sidebar**: 220-280px width, translucent material background, selectable list items with 4-8px corner radius on selection highlight
- **Toolbar**: 52px height, integrated with title bar (unified toolbar style since Big Sur), icon buttons 28x28pt tap area
- **Content area**: white/dark background, 16-20px padding from window edges
- **Split view**: NSSplitViewController pattern — sidebar | content | optional inspector

## Typography
- Font: SF Pro (system font)
- Window title: 13pt semibold
- Sidebar items: 13pt regular
- Body text: 13-15pt regular
- Large titles (in content headers): 22-28pt bold
- Line height: 1.3-1.4x font size

## Color System
- System colors (auto-adapt light/dark): systemBlue, systemGray, labelColor, secondaryLabelColor
- Window background: NSColor.windowBackgroundColor
- Sidebar background: translucent vibrancy material (behind-window blur)
- Accent color: user-selectable in System Settings (default blue) — respect `NSColor.controlAccentColor`
- Never hardcode hex for system chrome — use semantic colors

## Materials & Depth
- Sidebar/toolbar: `.sidebar` or `.headerView` vibrancy material (light blur, NOT heavy glass)
- Popovers/menus: `.menu` material, subtle blur, sharp 1px border at 8-10% opacity
- Window shadow: soft, large radius (20-40px blur), low opacity (~20%)
- NO strong frosted-glass panels — that's the newer Liquid Glass language, avoid it here

## Components
- **Buttons**: rounded rect, 6px corner radius, 28-32px height, subtle 1px border + light fill
- **Toggles**: standard NSSwitch style, green when on
- **Lists**: table view style, 32-44px row height, hover highlight on row (light gray/blue tint)
- **Search field**: rounded pill, 22px height, magnifying glass icon left-aligned, gray placeholder
- **Segmented controls**: pill-shaped container, selected segment gets white/dark contrast background

## Icons
- SF Symbols, weight matched to adjacent text weight (regular text = regular symbol weight)
- Sidebar icons: 16-18pt, monochrome, tinted with label color or accent when selected
- Toolbar icons: 16-20pt, template rendering (auto-tints for light/dark)
- App icon (macOS specific): rounded-square "squircle" shape, subtle depth/bevel, NOT flat — macOS app icons since Big Sur have slight 3D/skeuomorphic quality unlike iOS

## Window Behavior
- Traffic lights top-left (close/minimize/zoom), 12px diameter, 8px spacing
- Resizable, min/max size constraints defined
- Full-screen mode is optional/separate space, not the default state
- Multiple windows per app is normal and expected

## Menu Bar
- App menu bar at very top of screen (not per-window)
- Standard menu structure: [AppName] File Edit View Window Help
- Menu items: 13pt, 22px row height, keyboard shortcuts right-aligned in gray

## App Structure Pattern (typical Mac app)
MacApp/
├── Sidebar (navigation: Library, Playlists, Smart categories)
├── Toolbar (search, view options, primary actions)
├── Content Area (list/grid/table of items)
├── Inspector Panel (optional, right side, item details/metadata)
└── Status Bar (optional, bottom, item count/sync status)

## Spacing System
- Base unit: 4px
- Standard margins: 20px window edge padding
- Element spacing: 8px (tight), 16px (standard), 24px (section breaks)

## Motion
- Window resize: no artificial easing, direct 1:1 with drag
- Sidebar selection: 0.15-0.2s ease color transition
- Sheet/modal presentation: slide down + fade, 0.3s ease-out
- Popover: scale + fade from anchor point, 0.2s