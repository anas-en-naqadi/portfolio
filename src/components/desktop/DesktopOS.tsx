'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { useRouter, usePathname } from '@/i18n/routing'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import { getAppleIcon } from '@/components/shared/AppleIcons'
import {
  PersonSymbol,
  SearchSymbol,
  PhotoSymbol,
  MoonSymbol,
  SunSymbol,
  GearSymbol,
  DownloadSymbol,
  TrashSymbol,
  CopySymbol,
  CheckmarkSymbol,
} from '@/components/shared/SFSymbols'
import { CVDownloadModal, triggerCVDownload, type CVLanguage } from '@/components/shared/CVDownloadModal'
import {
  preloadProjectImages,
  PROJECT_IMAGE_SIZES,
  scheduleProjectImagePreload,
} from '@/components/shared/ProjectImage'
import { Window } from './Window'
import { Taskbar, type DockApp } from './Taskbar'
import { DesktopIcon } from './DesktopIcon'
import { StartMenu } from './StartMenu'
import { MacOSMenuBar, type WallpaperPresetId, type OpenWindowEntry } from './MacOSMenuBar'
import { MacToast, type MacToastData } from './MacToast'
import { SpotlightSearch, type DesktopWindowId } from './SpotlightSearch'
import { AboutWindow } from './windows/AboutWindow'
import { ExperienceWindow } from './windows/ExperienceWindow'
import { ProjectsWindow } from './windows/ProjectsWindow'
import { SkillsWindow } from './windows/SkillsWindow'
import { ContactWindow } from './windows/ContactWindow'
import { SettingsWindow } from './windows/SettingsWindow'

interface WindowState {
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
}

const WALLPAPER_BACKDROPS: Record<WallpaperPresetId, React.CSSProperties> = {
  default: {
    backgroundImage: 'url(/images/desktop-bg.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  workspace: {
    backgroundImage: 'url(/images/desktop-bg-2.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}

const WALLPAPER_ORDER: WallpaperPresetId[] = ['default', 'workspace']

const WINDOW_IDS: DesktopWindowId[] = [
  'about',
  'experience',
  'projects',
  'skills',
  'contact',
  'settings',
]

export function DesktopOS() {
  const tCommon = useTranslations('common')
  const tDesktop = useTranslations('desktop')
  const tMenu = useTranslations('desktop.menuBar')
  const tCtx = useTranslations('desktop.contextMenu')
  const tToast = useTranslations('desktop.toast')
  const tDock = useTranslations('desktop.dock')
  const tWp = useTranslations('desktop.wallpapers')

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])
  const projectImageUrls = useMemo(
    () => portfolio.projects.map((p) => p.image),
    [portfolio.projects]
  )
  const warmProjectImages = useCallback(() => {
    preloadProjectImages(projectImageUrls, PROJECT_IMAGE_SIZES.desktopCard)
  }, [projectImageUrls])

  // Warm project card thumbnails during browser idle time after initial desktop paint
  useEffect(
    () => scheduleProjectImagePreload(projectImageUrls, PROJECT_IMAGE_SIZES.desktopCard, 1200),
    [projectImageUrls]
  )

  const [openWindows, setOpenWindows] = useState<Record<DesktopWindowId, WindowState>>({
    about: { isOpen: false, isMinimized: false, zIndex: 100 },
    experience: { isOpen: false, isMinimized: false, zIndex: 100 },
    projects: { isOpen: false, isMinimized: false, zIndex: 100 },
    skills: { isOpen: false, isMinimized: false, zIndex: 100 },
    contact: { isOpen: false, isMinimized: false, zIndex: 100 },
    settings: { isOpen: false, isMinimized: false, zIndex: 100 },
  })
  const [maximizedWindows, setMaximizedWindows] = useState<Record<DesktopWindowId, boolean>>({
    about: false,
    experience: false,
    projects: false,
    skills: false,
    contact: false,
    settings: false,
  })
  const zCounterRef = useRef(105)
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<DesktopWindowId | null>(null)
  const [projectsSpotlight, setProjectsSpotlight] = useState<{ term: string; nonce: number } | null>(
    null
  )
  const [skillsSpotlight, setSkillsSpotlight] = useState<{ term: string; nonce: number } | null>(
    null
  )
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState<WallpaperPresetId>('default')
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [toast, setToast] = useState<MacToastData | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback(
    (title: string, subtitle?: string, icon?: React.ReactNode) => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
      setToast({ id: Date.now(), title, subtitle, icon })
      toastTimerRef.current = setTimeout(() => {
        setToast(null)
      }, 3200)
    },
    []
  )

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  // Restore saved wallpaper preference cleanly
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('macos-wallpaper') as WallpaperPresetId | null
      if (saved && WALLPAPER_ORDER.includes(saved)) {
        setWallpaper(saved)
      }
    } catch {
      // Ignore storage access failures in restricted browsing modes
    }
  }, [])

  const handleSelectWallpaper = useCallback(
    (wp: WallpaperPresetId) => {
      setWallpaper(wp)
      try {
        window.localStorage.setItem('macos-wallpaper', wp)
      } catch {
        // Ignore storage write failures
      }
      showToast(tToast('wallpaperTitle'), tWp(wp), <PhotoSymbol className="w-4 h-4" />)
    },
    [showToast, tToast, tWp]
  )

  const switchLanguage = useCallback(() => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr'
    try {
      window.sessionStorage.setItem(
        'macos-preserved-windows',
        JSON.stringify({
          openWindows,
          maximizedWindows,
          nextZ: zCounterRef.current,
          ts: Date.now(),
        })
      )
    } catch {
      // Ignore storage access failures in restricted browsing modes
    }
    router.replace(pathname, { locale: nextLocale })
  }, [locale, pathname, router, openWindows, maximizedWindows])

  // Compute frontmost active visible window
  const activeWindowId = useMemo<DesktopWindowId | null>(() => {
    let highestZ = -1
    let topId: DesktopWindowId | null = null
    for (const id of WINDOW_IDS) {
      const state = openWindows[id]
      if (state.isOpen && !state.isMinimized && state.zIndex > highestZ) {
        highestZ = state.zIndex
        topId = id
      }
    }
    return topId
  }, [openWindows])

  const bringToFront = useCallback((id: DesktopWindowId) => {
    const nextZ = (zCounterRef.current += 1)
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { isOpen: true, isMinimized: false, zIndex: nextZ },
    }))
  }, [])

  const openWindow = useCallback(
    (id: DesktopWindowId, searchTerm?: string) => {
      setContextMenu(null)
      setIsStartMenuOpen(false)
      setIsSpotlightOpen(false)
      if (searchTerm) {
        if (id === 'projects') {
          setProjectsSpotlight({ term: searchTerm, nonce: Date.now() })
        } else if (id === 'skills') {
          setSkillsSpotlight({ term: searchTerm, nonce: Date.now() })
        }
      }
      bringToFront(id)
    },
    [bringToFront]
  )

  const closeWindow = useCallback((id: DesktopWindowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false },
    }))
    setMaximizedWindows((prev) => ({ ...prev, [id]: false }))
  }, [])

  const minimizeWindow = useCallback((id: DesktopWindowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }))
  }, [])

  const toggleMaximize = useCallback((id: DesktopWindowId) => {
    setMaximizedWindows((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const closeAllWindows = useCallback(() => {
    setOpenWindows((prev) => {
      const updated = { ...prev }
      for (const id of WINDOW_IDS) {
        updated[id] = { ...updated[id], isOpen: false, isMinimized: false }
      }
      return updated
    })
    setMaximizedWindows({
      about: false,
      experience: false,
      projects: false,
      skills: false,
      contact: false,
      settings: false,
    })
  }, [])

  const handleDockAppClick = useCallback(
    (id: DesktopWindowId) => {
      const win = openWindows[id]
      if (win.isOpen && !win.isMinimized) {
        if (activeWindowId === id) {
          minimizeWindow(id)
        } else {
          bringToFront(id)
        }
      } else {
        openWindow(id)
      }
    },
    [openWindows, activeWindowId, minimizeWindow, bringToFront, openWindow]
  )

  const handleDownloadCV = useCallback(() => {
    setContextMenu(null)
    setIsStartMenuOpen(false)
    setIsSpotlightOpen(false)
    setIsCVModalOpen(true)
  }, [])

  const handleSelectCVLanguage = useCallback(
    (lang: CVLanguage) => {
      triggerCVDownload(lang)
      setIsCVModalOpen(false)
      showToast(
        tCommon('cvModal.downloadedTitle'),
        lang === 'en' ? tCommon('cvModal.downloadedEn') : tCommon('cvModal.downloadedFr'),
        <CheckmarkSymbol className="w-4 h-4 text-emerald-500" />
      )
    },
    [showToast, tCommon]
  )

  const copyContactValue = useCallback(
    async (value: string, subtitle: string) => {
      try {
        await navigator.clipboard.writeText(value)
        showToast(tToast('copiedTitle'), subtitle, <CopySymbol className="w-4 h-4" />)
      } catch {
        showToast(tToast('copiedTitle'), value, <CopySymbol className="w-4 h-4" />)
      }
    },
    [showToast, tToast]
  )

  // Restore opened windows after a locale switch, or open About by default on initial mount
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem('macos-preserved-windows')
      if (raw) {
        const parsed = JSON.parse(raw) as {
          openWindows?: Record<DesktopWindowId, WindowState>
          maximizedWindows?: Record<DesktopWindowId, boolean>
          nextZ?: number
          ts?: number
        }
        if (parsed.ts && Date.now() - parsed.ts < 10000 && parsed.openWindows && parsed.maximizedWindows) {
          setOpenWindows(parsed.openWindows)
          setMaximizedWindows(parsed.maximizedWindows)
          if (typeof parsed.nextZ === 'number') {
            zCounterRef.current = parsed.nextZ
          }
          setTimeout(() => {
            try {
              window.sessionStorage.removeItem('macos-preserved-windows')
            } catch {
              // Ignore cleanup errors
            }
          }, 250)
          return
        }
      }
    } catch {
      // Ignore storage read failures and fall back to default
    }
    openWindow('about')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keyboard shortcuts (Spotlight ⌘K / ⌘Space, Close ⌘W, Minimize ⌘M, Settings ⌘,, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === 'k' || e.code === 'Space')) {
        e.preventDefault()
        setContextMenu(null)
        setIsStartMenuOpen(false)
        setIsSpotlightOpen((prev) => !prev)
        return
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'w' && activeWindowId) {
        e.preventDefault()
        closeWindow(activeWindowId)
        return
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'm' && activeWindowId) {
        e.preventDefault()
        minimizeWindow(activeWindowId)
        return
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault()
        openWindow('settings')
        return
      }
      if (e.key === 'Escape') {
        setContextMenu(null)
        setIsSpotlightOpen(false)
        setIsStartMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeWindowId, closeWindow, minimizeWindow, openWindow])

  const windowTitles: Record<DesktopWindowId, string> = useMemo(
    () => ({
      about: tCommon('about'),
      experience: tCommon('experience'),
      projects: tCommon('projects'),
      skills: tCommon('skills'),
      contact: tCommon('contact'),
      settings: tCommon('settings'),
    }),
    [tCommon]
  )

  const openWindowsList: OpenWindowEntry[] = useMemo(
    () =>
      WINDOW_IDS.filter((id) => openWindows[id].isOpen).map((id) => ({
        id,
        label: windowTitles[id],
        isMinimized: openWindows[id].isMinimized,
        isActive: activeWindowId === id,
      })),
    [openWindows, windowTitles, activeWindowId]
  )

  const dockApps: DockApp[] = useMemo(
    () =>
      WINDOW_IDS.map((id) => ({
        id,
        label: windowTitles[id],
        isOpen: openWindows[id].isOpen,
        isActive: activeWindowId === id,
        onClick: () => handleDockAppClick(id),
        onPreload: id === 'projects' ? warmProjectImages : undefined,
      })),
    [windowTitles, openWindows, activeWindowId, handleDockAppClick, warmProjectImages]
  )

  const desktopIcons: { id: DesktopWindowId; label: string }[] = useMemo(
    () =>
      WINDOW_IDS.map((id) => ({
        id,
        label: windowTitles[id],
      })),
    [windowTitles]
  )

  const handleDesktopContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only open desktop context menu when right-clicking wallpaper surface
    if ((e.target as HTMLElement).closest('.window, .macos-dock, .macos-menu-bar')) return
    e.preventDefault()
    setSelectedDesktopIcon(null)
    const menuW = 224
    const menuH = 236
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - menuW - 12),
      y: Math.min(Math.max(e.clientY, 34), window.innerHeight - menuH - 96),
    })
  }

  return (
    <div
      className={`desktop-os fixed inset-0 overflow-hidden select-none ${
        isDark ? 'dark' : 'light'
      }`}
      onMouseDown={() => {
        setSelectedDesktopIcon(null)
        setContextMenu(null)
      }}
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Clean Wallpaper Backdrop (No Blur on Default Desktop Wallpaper) */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={WALLPAPER_BACKDROPS[wallpaper]}
        aria-hidden="true"
      />

      {/* Consistent Dark Contrast Scrim in Both Light & Dark Modes (No Blur) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.04) 48%, rgba(0, 0, 0, 0.25) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top macOS Menu Bar */}
      <MacOSMenuBar
        activeApp={activeWindowId ? windowTitles[activeWindowId] : tMenu('finder')}
        activeWindowId={activeWindowId}
        openWindowsList={openWindowsList}
        theme={theme}
        wallpaper={wallpaper}
        onToggleTheme={toggleTheme}
        onSwitchLanguage={switchLanguage}
        onSelectWallpaper={handleSelectWallpaper}
        onDownloadCV={handleDownloadCV}
        onOpenApp={openWindow}
        onFocusWindow={openWindow}
        onOpenLaunchpad={() => setIsStartMenuOpen((prev) => !prev)}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        onMinimizeActive={() => activeWindowId && minimizeWindow(activeWindowId)}
        onMaximizeActive={() => activeWindowId && toggleMaximize(activeWindowId)}
        onCloseActive={() => activeWindowId && closeWindow(activeWindowId)}
        onCloseAll={closeAllWindows}
        onCopyEmail={() =>
          copyContactValue(portfolio.personalInfo.email, tToast('copiedEmail'))
        }
        onCopyPhone={() =>
          copyContactValue(portfolio.personalInfo.phone, tToast('copiedPhone'))
        }
      />

      {/* Top-Right Desktop Icons (Authentic macOS Alignment) */}
      <div
        className="absolute top-[42px] right-4 z-10 flex flex-col gap-2 items-end"
        aria-label={tDesktop('desktopIconsLabel')}
      >
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.id}
            icon={getAppleIcon(item.id, 52)}
            label={item.label}
            selected={selectedDesktopIcon === item.id}
            onClick={() => setSelectedDesktopIcon(item.id)}
            onDoubleClick={() => openWindow(item.id)}
            onPreload={item.id === 'projects' ? warmProjectImages : undefined}
          />
        ))}
      </div>

      {/* macOS App Windows */}
      <Window
        id="window-about"
        title={windowTitles.about}
        icon={<PersonSymbol className="w-4 h-4 text-[#007AFF]" />}
        isOpen={openWindows.about.isOpen && !openWindows.about.isMinimized}
        isActive={activeWindowId === 'about'}
        onFocus={() => bringToFront('about')}
        onClose={() => closeWindow('about')}
        onMinimize={() => minimizeWindow('about')}
        onMaximize={() => toggleMaximize('about')}
        isMaximized={maximizedWindows.about}
        initialPosition={{ x: 90, y: 58 }}
        zIndex={openWindows.about.zIndex}
        theme={theme}
      >
        <AboutWindow theme={theme} onNotify={(t, s) => showToast(t, s)} onDownloadCV={handleDownloadCV} />
      </Window>

      <Window
        id="window-experience"
        title={windowTitles.experience}
        icon={getAppleIcon('experience', 16)}
        isOpen={openWindows.experience.isOpen && !openWindows.experience.isMinimized}
        isActive={activeWindowId === 'experience'}
        onFocus={() => bringToFront('experience')}
        onClose={() => closeWindow('experience')}
        onMinimize={() => minimizeWindow('experience')}
        onMaximize={() => toggleMaximize('experience')}
        isMaximized={maximizedWindows.experience}
        initialPosition={{ x: 130, y: 78 }}
        zIndex={openWindows.experience.zIndex}
        theme={theme}
      >
        <ExperienceWindow theme={theme} onNotify={(t, s) => showToast(t, s)} />
      </Window>

      <Window
        id="window-projects"
        title={windowTitles.projects}
        icon={getAppleIcon('projects', 16)}
        isOpen={openWindows.projects.isOpen && !openWindows.projects.isMinimized}
        isActive={activeWindowId === 'projects'}
        onFocus={() => bringToFront('projects')}
        onClose={() => closeWindow('projects')}
        onMinimize={() => minimizeWindow('projects')}
        onMaximize={() => toggleMaximize('projects')}
        isMaximized={maximizedWindows.projects}
        initialPosition={{ x: 170, y: 66 }}
        zIndex={openWindows.projects.zIndex}
        theme={theme}
      >
        <ProjectsWindow theme={theme} spotlightQuery={projectsSpotlight} />
      </Window>

      <Window
        id="window-skills"
        title={windowTitles.skills}
        icon={getAppleIcon('skills', 16)}
        isOpen={openWindows.skills.isOpen && !openWindows.skills.isMinimized}
        isActive={activeWindowId === 'skills'}
        onFocus={() => bringToFront('skills')}
        onClose={() => closeWindow('skills')}
        onMinimize={() => minimizeWindow('skills')}
        onMaximize={() => toggleMaximize('skills')}
        isMaximized={maximizedWindows.skills}
        initialPosition={{ x: 150, y: 92 }}
        zIndex={openWindows.skills.zIndex}
        theme={theme}
      >
        <SkillsWindow theme={theme} spotlightQuery={skillsSpotlight} />
      </Window>

      <Window
        id="window-contact"
        title={windowTitles.contact}
        icon={getAppleIcon('contact', 16)}
        isOpen={openWindows.contact.isOpen && !openWindows.contact.isMinimized}
        isActive={activeWindowId === 'contact'}
        onFocus={() => bringToFront('contact')}
        onClose={() => closeWindow('contact')}
        onMinimize={() => minimizeWindow('contact')}
        onMaximize={() => toggleMaximize('contact')}
        isMaximized={maximizedWindows.contact}
        initialPosition={{ x: 195, y: 84 }}
        zIndex={openWindows.contact.zIndex}
        theme={theme}
      >
        <ContactWindow theme={theme} onNotify={(t, s) => showToast(t, s)} />
      </Window>

      <Window
        id="window-settings"
        title={windowTitles.settings}
        icon={getAppleIcon('settings', 16)}
        isOpen={openWindows.settings.isOpen && !openWindows.settings.isMinimized}
        isActive={activeWindowId === 'settings'}
        onFocus={() => bringToFront('settings')}
        onClose={() => closeWindow('settings')}
        onMinimize={() => minimizeWindow('settings')}
        onMaximize={() => toggleMaximize('settings')}
        isMaximized={maximizedWindows.settings}
        initialPosition={{ x: 210, y: 74 }}
        zIndex={openWindows.settings.zIndex}
        theme={theme}
      >
        <SettingsWindow
          theme={theme}
          wallpaper={wallpaper}
          onToggleTheme={toggleTheme}
          onSelectWallpaper={handleSelectWallpaper}
          onSwitchLanguage={switchLanguage}
          onDownloadCV={handleDownloadCV}
        />
      </Window>

      {/* Right-Click Desktop Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="fixed z-[9600] w-[224px] rounded-xl p-1.5 shadow-2xl"
            style={{
              top: contextMenu.y,
              left: contextMenu.x,
              background: isDark ? 'rgba(34, 34, 38, 0.88)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              color: isDark ? '#f5f5f7' : '#1d1d1f',
            }}
          >
            <button
              type="button"
              onClick={() => openWindow('about')}
              className="w-full px-3 py-1.5 rounded-lg text-left text-[12.5px] font-medium flex items-center gap-2.5 hover:bg-[#007AFF] hover:text-white transition-colors"
            >
              <PersonSymbol className="w-3.5 h-3.5 opacity-80" />
              <span>{tCtx('openAbout')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setContextMenu(null)
                setIsSpotlightOpen(true)
              }}
              className="w-full px-3 py-1.5 rounded-lg text-left text-[12.5px] font-medium flex items-center gap-2.5 hover:bg-[#007AFF] hover:text-white transition-colors"
            >
              <SearchSymbol className="w-3.5 h-3.5 opacity-80" />
              <span>{tCtx('openSpotlight')}</span>
            </button>
            <div className={`my-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <button
              type="button"
              onClick={() => {
                setContextMenu(null)
                toggleTheme()
              }}
              className="w-full px-3 py-1.5 rounded-lg text-left text-[12.5px] font-medium flex items-center gap-2.5 hover:bg-[#007AFF] hover:text-white transition-colors"
            >
              {isDark ? (
                <SunSymbol className="w-3.5 h-3.5 opacity-80" />
              ) : (
                <MoonSymbol className="w-3.5 h-3.5 opacity-80" />
              )}
              <span>{tCtx('toggleTheme')}</span>
            </button>
            <div className={`my-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <button
              type="button"
              onClick={() => openWindow('settings')}
              className="w-full px-3 py-1.5 rounded-lg text-left text-[12.5px] font-medium flex items-center gap-2.5 hover:bg-[#007AFF] hover:text-white transition-colors"
            >
              <GearSymbol className="w-3.5 h-3.5 opacity-80" />
              <span>{tCtx('openSettings')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setContextMenu(null)
                handleDownloadCV()
              }}
              className="w-full px-3 py-1.5 rounded-lg text-left text-[12.5px] font-medium flex items-center gap-2.5 hover:bg-[#007AFF] hover:text-white transition-colors"
            >
              <DownloadSymbol className="w-3.5 h-3.5 opacity-80" />
              <span>{tCtx('downloadCV')}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight Search Modal */}
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        theme={theme}
        onOpenWindow={openWindow}
        onDownloadCV={handleDownloadCV}
        onToggleTheme={toggleTheme}
        onSwitchLanguage={switchLanguage}
      />

      {/* Launchpad Overlay */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onAppClick={(appId) => openWindow(appId as DesktopWindowId)}
        theme={theme}
        onDownloadCV={handleDownloadCV}
      />

      {/* CV Language Picker Modal */}
      <CVDownloadModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        onDownload={handleSelectCVLanguage}
        theme={theme}
        variant="macos"
      />

      {/* macOS Notification Toast */}
      <MacToast toast={toast} theme={theme} onDismiss={() => setToast(null)} />

      {/* macOS Dock */}
      <Taskbar
        apps={dockApps}
        onStartClick={() => setIsStartMenuOpen((prev) => !prev)}
        theme={theme}
        onDownloadCV={handleDownloadCV}
        onGitHub={() => window.open(socialLinks.github, '_blank', 'noopener,noreferrer')}
        onLinkedIn={() => window.open(socialLinks.linkedin, '_blank', 'noopener,noreferrer')}
        onTrashClick={() =>
          showToast(
            tDock('trashEmptyTitle'),
            tDock('trashEmptyBody'),
            <TrashSymbol className="w-4 h-4" />
          )
        }
      />
    </div>
  )
}

export default DesktopOS
