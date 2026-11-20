'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
  AppleLogoSymbol,
  WifiSymbol,
  BatterySymbol,
  SearchSymbol,
  ControlCenterSymbol,
  MoonSymbol,
  SunSymbol,
  GlobeSymbol,
  PhotoSymbol,
  CheckmarkSymbol,
  GearSymbol,
  MusicNoteSymbol,
  PlaySymbol,
  PauseSymbol,
  ForwardEndSymbol,
  BackwardEndSymbol,
  SpeakerWaveSymbol,
} from '@/components/shared/SFSymbols'
import { AudioEqualizerBars, useFocusAudio } from '@/components/shared/FocusAudioProvider'
import type { DesktopWindowId } from './SpotlightSearch'

export type WallpaperPresetId = 'default' | 'workspace'

export interface OpenWindowEntry {
  id: DesktopWindowId
  label: string
  isMinimized: boolean
  isActive: boolean
}

interface MacOSMenuBarProps {
  activeApp: string
  activeWindowId: DesktopWindowId | null
  openWindowsList: OpenWindowEntry[]
  theme: 'dark' | 'light'
  wallpaper: WallpaperPresetId
  onToggleTheme: () => void
  onSwitchLanguage: () => void
  onSelectWallpaper: (wp: WallpaperPresetId) => void
  onDownloadCV: () => void
  onOpenApp: (appId: DesktopWindowId) => void
  onFocusWindow: (appId: DesktopWindowId) => void
  onOpenLaunchpad: () => void
  onOpenSpotlight: () => void
  onMinimizeActive: () => void
  onMaximizeActive: () => void
  onCloseActive: () => void
  onCloseAll: () => void
  onCopyEmail: () => void
  onCopyPhone: () => void
}

type OpenMenuKey =
  | 'apple'
  | 'file'
  | 'edit'
  | 'view'
  | 'go'
  | 'window'
  | 'help'
  | 'nowPlaying'
  | 'controlCenter'
  | null

const WALLPAPER_SWATCHES: { id: WallpaperPresetId; preview: string }[] = [
  { id: 'default', preview: 'url(/images/desktop-bg.webp) center/cover' },
  { id: 'workspace', preview: 'url(/images/desktop-bg-2.webp) center/cover' },
]

export function MacOSMenuBar({
  activeApp,
  activeWindowId,
  openWindowsList,
  theme,
  wallpaper,
  onToggleTheme,
  onSwitchLanguage,
  onSelectWallpaper,
  onDownloadCV,
  onOpenApp,
  onFocusWindow,
  onOpenLaunchpad,
  onOpenSpotlight,
  onMinimizeActive,
  onMaximizeActive,
  onCloseActive,
  onCloseAll,
  onCopyEmail,
  onCopyPhone,
}: MacOSMenuBarProps) {
  const tCommon = useTranslations('common')
  const tAudio = useTranslations('common.focusAudio')
  const tMenu = useTranslations('desktop.menuBar')
  const tWp = useTranslations('desktop.wallpapers')
  const locale = useLocale()
  const isDark = theme === 'dark'
  const {
    tracks,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
  } = useFocusAudio()

  const [timeString, setTimeString] = useState('')
  const [dateString, setDateString] = useState('')
  const [openMenu, setOpenMenu] = useState<OpenMenuKey>(null)
  const barRef = useRef<HTMLElement>(null)
  const pinnedRef = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const closeAllMenus = () => {
    clearCloseTimer()
    pinnedRef.current = false
    setOpenMenu(null)
  }

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const dateLoc = locale === 'fr' ? 'fr-FR' : 'en-US'
      setTimeString(
        now.toLocaleTimeString(dateLoc, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      )
      setDateString(
        now.toLocaleDateString(dateLoc, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      )
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [locale])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        closeAllMenus()
      }
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAllMenus()
    }
    window.addEventListener('mousedown', handleOutside)
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('mousedown', handleOutside)
      window.removeEventListener('keydown', handleEsc)
      clearCloseTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTriggerClick = (key: Exclude<OpenMenuKey, null>) => {
    clearCloseTimer()
    if (openMenu === key) {
      if (pinnedRef.current) {
        pinnedRef.current = false
        setOpenMenu(null)
      } else {
        pinnedRef.current = true
      }
      return
    }
    pinnedRef.current = true
    setOpenMenu(key)
  }

  const handleHoverOpen = (
    key: Exclude<OpenMenuKey, null>,
    e: React.PointerEvent<HTMLElement>
  ) => {
    if (e.pointerType !== 'mouse') return
    clearCloseTimer()
    if (openMenu !== key) {
      pinnedRef.current = false
      setOpenMenu(key)
    }
  }

  const handleHoverLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || pinnedRef.current) return
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      if (!pinnedRef.current) {
        setOpenMenu(null)
      }
    }, 140)
  }

  const handleDropdownEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') {
      clearCloseTimer()
    }
  }

  const runAction = (fn: () => void) => {
    closeAllMenus()
    fn()
  }

  const dropdownStyle: React.CSSProperties = {
    background: isDark ? 'rgba(34, 34, 38, 0.88)' : 'rgba(255, 255, 255, 0.92)',
    color: isDark ? '#f5f5f7' : '#1d1d1f',
    backdropFilter: 'blur(32px) saturate(190%)',
    WebkitBackdropFilter: 'blur(32px) saturate(190%)',
    border: isDark ? '1px solid rgba(255,255,255,0.16)' : '1px solid rgba(0,0,0,0.1)',
    boxShadow: isDark
      ? '0 16px 42px rgba(0, 0, 0, 0.58), inset 0 1px 0 rgba(255,255,255,0.14)'
      : '0 14px 36px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255,255,255,0.85)',
  }

  const itemClass = `w-full px-3 py-1.5 rounded-lg text-left text-[12.5px] font-medium flex items-center justify-between gap-4 transition-colors ${
    isDark
      ? 'text-white/90 hover:bg-[#007AFF] hover:text-white disabled:opacity-40 disabled:hover:bg-transparent'
      : 'text-gray-900 hover:bg-[#007AFF] hover:text-white disabled:opacity-40 disabled:hover:bg-transparent'
  }`

  const dividerClass = `my-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`

  const menuTriggerClass = (key: Exclude<OpenMenuKey, null>) =>
    `px-2 h-[22px] rounded-[5px] text-[12.5px] font-normal flex items-center transition-colors ${
      openMenu === key
        ? 'bg-[#007AFF] text-white'
        : isDark
          ? 'text-white/90 hover:bg-white/15'
          : 'text-gray-900 hover:bg-black/10'
    }`

  return (
    <header
      ref={barRef}
      className={`macos-menu-bar fixed top-0 left-0 right-0 h-[28px] z-[9100] flex items-center justify-between px-3 select-none ${
        isDark ? 'dark' : 'light'
      }`}
      style={{
        background: isDark ? 'rgba(22, 22, 26, 0.62)' : 'rgba(255, 255, 255, 0.58)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        borderBottom: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        color: isDark ? '#f5f5f7' : '#1d1d1f',
      }}
    >
      {/* Left: Apple Icon, Active App & Interactive Menus */}
      <div className="flex items-center gap-0.5 relative">
        {/* Apple Menu */}
        <div
          className="relative"
          onPointerEnter={(e) => handleHoverOpen('apple', e)}
          onPointerLeave={handleHoverLeave}
        >
          <button
            type="button"
            onClick={() => handleTriggerClick('apple')}
            aria-label="Apple Menu"
            aria-haspopup="menu"
            aria-expanded={openMenu === 'apple'}
            className={`px-2.5 h-[22px] rounded-[5px] flex items-center justify-center transition-colors ${
              openMenu === 'apple'
                ? 'bg-[#007AFF] text-white'
                : isDark
                  ? 'text-white hover:bg-white/15'
                  : 'text-gray-900 hover:bg-black/10'
            }`}
          >
            <AppleLogoSymbol className="w-[13px] h-[13px]" />
          </button>
          {openMenu === 'apple' && (
            <div
              role="menu"
              onPointerEnter={handleDropdownEnter}
              className="absolute top-[25px] left-0 min-w-[215px] rounded-xl p-1.5 z-[9999]"
              style={dropdownStyle}
            >
              <button
                type="button"
                className={itemClass}
                onClick={() => runAction(() => onOpenApp('about'))}
              >
                <span>{tMenu('appleMenu.aboutThisMac')}</span>
              </button>
              <button
                type="button"
                className={itemClass}
                onClick={() => runAction(() => onOpenApp('settings'))}
              >
                <span>{tMenu('appleMenu.systemSettings')}</span>
              </button>
              <div className={dividerClass} />
              <button type="button" className={itemClass} onClick={() => runAction(onDownloadCV)}>
                <span>{tMenu('appleMenu.downloadCV')}</span>
              </button>
              <div className={dividerClass} />
              <button
                type="button"
                className={itemClass}
                disabled={openWindowsList.length === 0}
                onClick={() => runAction(onCloseAll)}
              >
                <span>{tMenu('appleMenu.closeAllWindows')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Active App Bold Label */}
        <span className="px-2 text-[13px] font-semibold tracking-tight truncate max-w-[150px]">
          {activeApp}
        </span>

        {/* File Menu */}
        <div
          className="relative hidden sm:block"
          onPointerEnter={(e) => handleHoverOpen('file', e)}
          onPointerLeave={handleHoverLeave}
        >
          <button
            type="button"
            onClick={() => handleTriggerClick('file')}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'file'}
            className={menuTriggerClass('file')}
          >
            {tMenu('file')}
          </button>
          {openMenu === 'file' && (
            <div
              role="menu"
              onPointerEnter={handleDropdownEnter}
              className="absolute top-[25px] left-0 min-w-[205px] rounded-xl p-1.5 z-[9999]"
              style={dropdownStyle}
            >
              <button type="button" className={itemClass} onClick={() => runAction(() => onOpenApp('about'))}>
                <span>{tMenu('fileMenu.openAbout')}</span>
              </button>
              <button type="button" className={itemClass} onClick={() => runAction(() => onOpenApp('projects'))}>
                <span>{tMenu('fileMenu.openProjects')}</span>
              </button>
              <button type="button" className={itemClass} onClick={() => runAction(() => onOpenApp('settings'))}>
                <span>{tMenu('fileMenu.openSettings')}</span>
              </button>
              <div className={dividerClass} />
              <button type="button" className={itemClass} onClick={() => runAction(onDownloadCV)}>
                <span>{tMenu('fileMenu.downloadCV')}</span>
              </button>
              <button
                type="button"
                className={itemClass}
                disabled={!activeWindowId}
                onClick={() => runAction(onCloseActive)}
              >
                <span>{tMenu('fileMenu.closeWindow')}</span>
                <span className="text-[11px] opacity-60">⌘W</span>
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div
          className="relative hidden sm:block"
          onPointerEnter={(e) => handleHoverOpen('edit', e)}
          onPointerLeave={handleHoverLeave}
        >
          <button
            type="button"
            onClick={() => handleTriggerClick('edit')}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'edit'}
            className={menuTriggerClass('edit')}
          >
            {tMenu('edit')}
          </button>
          {openMenu === 'edit' && (
            <div
              role="menu"
              onPointerEnter={handleDropdownEnter}
              className="absolute top-[25px] left-0 min-w-[215px] rounded-xl p-1.5 z-[9999]"
              style={dropdownStyle}
            >
              <button type="button" className={itemClass} onClick={() => runAction(onCopyEmail)}>
                <span>{tMenu('editMenu.copyEmail')}</span>
              </button>
              <button type="button" className={itemClass} onClick={() => runAction(onCopyPhone)}>
                <span>{tMenu('editMenu.copyPhone')}</span>
              </button>
              <div className={dividerClass} />
              <button type="button" className={itemClass} onClick={() => runAction(onOpenSpotlight)}>
                <span>{tMenu('editMenu.spotlight')}</span>
                <span className="text-[11px] opacity-60">⌘K</span>
              </button>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div
          className="relative hidden md:block"
          onPointerEnter={(e) => handleHoverOpen('view', e)}
          onPointerLeave={handleHoverLeave}
        >
          <button
            type="button"
            onClick={() => handleTriggerClick('view')}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'view'}
            className={menuTriggerClass('view')}
          >
            {tMenu('view')}
          </button>
          {openMenu === 'view' && (
            <div
              role="menu"
              onPointerEnter={handleDropdownEnter}
              className="absolute top-[25px] left-0 min-w-[205px] rounded-xl p-1.5 z-[9999]"
              style={dropdownStyle}
            >
              <button type="button" className={itemClass} onClick={() => runAction(onToggleTheme)}>
                <span>{tMenu('viewMenu.toggleTheme')}</span>
              </button>
              <button
                type="button"
                className={itemClass}
                disabled={!activeWindowId}
                onClick={() => runAction(onMaximizeActive)}
              >
                <span>{tMenu('viewMenu.toggleMaximize')}</span>
              </button>
              <div className={dividerClass} />
              <button type="button" className={itemClass} onClick={() => runAction(onOpenLaunchpad)}>
                <span>{tMenu('viewMenu.openLaunchpad')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Go Menu */}
        <div
          className="relative hidden md:block"
          onPointerEnter={(e) => handleHoverOpen('go', e)}
          onPointerLeave={handleHoverLeave}
        >
          <button
            type="button"
            onClick={() => handleTriggerClick('go')}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'go'}
            className={menuTriggerClass('go')}
          >
            {tMenu('go')}
          </button>
          {openMenu === 'go' && (
            <div
              role="menu"
              onPointerEnter={handleDropdownEnter}
              className="absolute top-[25px] left-0 min-w-[185px] rounded-xl p-1.5 z-[9999]"
              style={dropdownStyle}
            >
              {(['about', 'experience', 'projects', 'skills', 'contact', 'settings'] as const).map(
                (winId) => (
                  <button
                    key={winId}
                    type="button"
                    className={itemClass}
                    onClick={() => runAction(() => onOpenApp(winId))}
                  >
                    <span>{tCommon(winId)}</span>
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Window Menu */}
        <div
          className="relative hidden lg:block"
          onPointerEnter={(e) => handleHoverOpen('window', e)}
          onPointerLeave={handleHoverLeave}
        >
          <button
            type="button"
            onClick={() => handleTriggerClick('window')}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'window'}
            className={menuTriggerClass('window')}
          >
            {tMenu('window')}
          </button>
          {openMenu === 'window' && (
            <div
              role="menu"
              onPointerEnter={handleDropdownEnter}
              className="absolute top-[25px] left-0 min-w-[205px] rounded-xl p-1.5 z-[9999]"
              style={dropdownStyle}
            >
              <button
                type="button"
                className={itemClass}
                disabled={!activeWindowId}
                onClick={() => runAction(onMinimizeActive)}
              >
                <span>{tMenu('windowMenu.minimize')}</span>
              </button>
              <button
                type="button"
                className={itemClass}
                disabled={!activeWindowId}
                onClick={() => runAction(onMaximizeActive)}
              >
                <span>{tMenu('windowMenu.zoom')}</span>
              </button>
              <button
                type="button"
                className={itemClass}
                disabled={openWindowsList.length === 0}
                onClick={() => runAction(onCloseAll)}
              >
                <span>{tMenu('windowMenu.closeAll')}</span>
              </button>
              <div className={dividerClass} />
              {openWindowsList.length === 0 ? (
                <div className="px-3 py-1.5 text-[11.5px] opacity-50">
                  {tMenu('windowMenu.noOpenWindows')}
                </div>
              ) : (
                openWindowsList.map((win) => (
                  <button
                    key={win.id}
                    type="button"
                    className={itemClass}
                    onClick={() => runAction(() => onFocusWindow(win.id))}
                  >
                    <span className="truncate">{win.label}</span>
                    {win.isActive && <CheckmarkSymbol className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div
          className="relative hidden lg:block"
          onPointerEnter={(e) => handleHoverOpen('help', e)}
          onPointerLeave={handleHoverLeave}
        >
          <button
            type="button"
            onClick={() => handleTriggerClick('help')}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'help'}
            className={menuTriggerClass('help')}
          >
            {tMenu('help')}
          </button>
          {openMenu === 'help' && (
            <div
              role="menu"
              onPointerEnter={handleDropdownEnter}
              className="absolute top-[25px] left-0 min-w-[245px] rounded-xl p-1.5 z-[9999]"
              style={dropdownStyle}
            >
              <button type="button" className={itemClass} onClick={() => runAction(onOpenSpotlight)}>
                <span>{tMenu('helpMenu.spotlightShortcut')}</span>
              </button>
              <div className="px-3 py-1.5 text-[12px] opacity-70">
                {tMenu('helpMenu.closeShortcut')}
              </div>
              <div className="px-3 py-1.5 text-[12px] opacity-70">
                {tMenu('helpMenu.escShortcut')}
              </div>
              <div className={dividerClass} />
              <button
                type="button"
                className={itemClass}
                onClick={() => runAction(() => onOpenApp('contact'))}
              >
                <span>{tMenu('helpMenu.contactDeveloper')}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Now Playing + Status Tray + Spotlight + Control Center + Date/Time */}
      <div className="flex items-center gap-1.5 relative">
        <button
          type="button"
          onClick={() => handleTriggerClick('nowPlaying')}
          onPointerEnter={(e) => handleHoverOpen('nowPlaying', e)}
          onPointerLeave={handleHoverLeave}
          aria-label={tAudio('nowPlaying')}
          aria-haspopup="dialog"
          aria-expanded={openMenu === 'nowPlaying'}
          className={`px-1.5 h-[22px] rounded-[5px] flex items-center gap-1.5 transition-colors ${
            openMenu === 'nowPlaying'
              ? 'bg-[#007AFF] text-white'
              : isDark
                ? 'hover:bg-white/15'
                : 'hover:bg-black/10'
          }`}
        >
          {isPlaying ? (
            <AudioEqualizerBars playing className={openMenu === 'nowPlaying' ? 'text-white' : 'text-[#007AFF]'} />
          ) : (
            <MusicNoteSymbol className="w-[13.5px] h-[13.5px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTriggerClick('controlCenter')}
          onPointerEnter={(e) => handleHoverOpen('controlCenter', e)}
          onPointerLeave={handleHoverLeave}
          aria-label="Wi-Fi"
          aria-haspopup="dialog"
          aria-expanded={openMenu === 'controlCenter'}
          className={`px-1.5 h-[22px] rounded-[5px] flex items-center justify-center transition-colors ${
            isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
          }`}
        >
          <WifiSymbol className="w-[14px] h-[14px]" />
        </button>

        <div
          className="px-1 h-[22px] flex items-center justify-center opacity-90"
          aria-hidden="true"
        >
          <BatterySymbol className="w-[17px] h-[17px]" />
        </div>

        <button
          type="button"
          onClick={() => runAction(onOpenSpotlight)}
          aria-label="Spotlight"
          title="Spotlight (⌘K)"
          className={`px-1.5 h-[22px] rounded-[5px] flex items-center justify-center transition-colors ${
            isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
          }`}
        >
          <SearchSymbol className="w-[13.5px] h-[13.5px]" />
        </button>

        <button
          type="button"
          onClick={() => handleTriggerClick('controlCenter')}
          onPointerEnter={(e) => handleHoverOpen('controlCenter', e)}
          onPointerLeave={handleHoverLeave}
          aria-label={tMenu('controlCenter.title')}
          aria-haspopup="dialog"
          aria-expanded={openMenu === 'controlCenter'}
          className={`px-1.5 h-[22px] rounded-[5px] flex items-center justify-center transition-colors ${
            openMenu === 'controlCenter'
              ? 'bg-[#007AFF] text-white'
              : isDark
                ? 'hover:bg-white/15'
                : 'hover:bg-black/10'
          }`}
        >
          <ControlCenterSymbol className="w-[14px] h-[14px]" />
        </button>

        {/* Right-Aligned Date & Time (Real macOS Style) */}
        <div
          className="px-2 h-[22px] rounded-[5px] flex items-center gap-1.5 text-[12.5px] font-medium tabular-nums select-none cursor-default"
        >
          <span className="capitalize">{dateString}</span>
          <span>{timeString}</span>
        </div>

        {/* Focus Audio Quick Player Popover */}
        {openMenu === 'nowPlaying' && (
          <div
            role="dialog"
            data-audio-control="true"
            aria-label={tAudio('nowPlaying')}
            onPointerEnter={handleDropdownEnter}
            onPointerLeave={handleHoverLeave}
            className="absolute top-[28px] right-0 w-[280px] rounded-2xl p-3 space-y-2.5 z-[9999]"
            style={dropdownStyle}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#007AFF] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  {isPlaying ? <AudioEqualizerBars playing /> : <MusicNoteSymbol className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold truncate">{tAudio(currentTrack.titleKey)}</div>
                  <div className="text-[10.5px] opacity-65 truncate">
                    {`${tAudio(currentTrack.artistKey)} • ${isPlaying ? tAudio('playing') : tAudio('paused')}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={prevTrack}
                  aria-label={tAudio('prev')}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
                  }`}
                >
                  <BackwardEndSymbol className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? tAudio('pause') : tAudio('play')}
                  className="w-7 h-7 rounded-lg bg-[#007AFF] text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  {isPlaying ? <PauseSymbol className="w-3.5 h-3.5" /> : <PlaySymbol className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={nextTrack}
                  aria-label={tAudio('next')}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
                  }`}
                >
                  <ForwardEndSymbol className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {tracks.map((track, idx) => {
                const selected = idx === currentTrackIndex
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => selectTrack(idx)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold truncate transition-colors ${
                      selected
                        ? 'bg-[#007AFF] text-white'
                        : isDark
                          ? 'bg-white/[0.08] hover:bg-white/[0.15]'
                          : 'bg-black/[0.05] hover:bg-black/[0.1]'
                    }`}
                  >
                    {tAudio(track.titleKey)}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <SpeakerWaveSymbol className="w-3.5 h-3.5 opacity-65 shrink-0" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label={tAudio('volume')}
                className="w-full h-1.5 accent-[#007AFF] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Liquid Glass Control Center Popover */}
        {openMenu === 'controlCenter' && (
          <div
            role="dialog"
            aria-label={tMenu('controlCenter.title')}
            onPointerEnter={handleDropdownEnter}
            onPointerLeave={handleHoverLeave}
            className="absolute top-[28px] right-0 w-[308px] rounded-2xl p-3 space-y-2.5 z-[9999]"
            style={dropdownStyle}
          >
            {/* Row 1: Wi-Fi & Theme */}
            <div className="grid grid-cols-2 gap-2.5">
              <div
                className={`p-2.5 rounded-xl flex items-center gap-2.5 ${
                  isDark ? 'bg-white/[0.08]' : 'bg-black/[0.05]'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#007AFF] text-white flex items-center justify-center shrink-0">
                  <WifiSymbol className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-semibold truncate">
                    {tMenu('controlCenter.wifi')}
                  </div>
                  <div className="text-[10.5px] opacity-65 truncate">
                    {tMenu('controlCenter.connected')}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2.5 rounded-xl flex items-center gap-2.5 text-left transition-colors ${
                  isDark
                    ? 'bg-white/[0.08] hover:bg-white/[0.14]'
                    : 'bg-black/[0.05] hover:bg-black/[0.09]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-indigo-500 text-white' : 'bg-amber-400 text-gray-900'
                  }`}
                >
                  {isDark ? (
                    <MoonSymbol className="w-3.5 h-3.5" />
                  ) : (
                    <SunSymbol className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-semibold truncate">
                    {tMenu('controlCenter.appearance')}
                  </div>
                  <div className="text-[10.5px] opacity-65 truncate">
                    {isDark ? tMenu('controlCenter.dark') : tMenu('controlCenter.light')}
                  </div>
                </div>
              </button>
            </div>

            {/* Row 2: Language Switcher */}
            <div
              className={`p-2.5 rounded-xl flex items-center justify-between gap-2 ${
                isDark ? 'bg-white/[0.08]' : 'bg-black/[0.05]'
              }`}
            >
              <div className="flex items-center gap-2">
                <GlobeSymbol className="w-4 h-4 text-[#007AFF]" />
                <span className="text-[12px] font-semibold">
                  {tMenu('controlCenter.language')}
                </span>
              </div>
              <button
                type="button"
                onClick={onSwitchLanguage}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                  isDark
                    ? 'bg-white/15 hover:bg-white/25 text-white'
                    : 'bg-black/10 hover:bg-black/15 text-gray-900'
                }`}
              >
                {locale === 'fr' ? 'FR → EN' : 'EN → FR'}
              </button>
            </div>

            {/* Row 2b: Focus Audio Now Playing */}
            <div
              data-audio-control="true"
              className={`p-2.5 rounded-xl space-y-2 ${
                isDark ? 'bg-white/[0.08]' : 'bg-black/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#007AFF] to-indigo-600 text-white flex items-center justify-center shrink-0">
                    {isPlaying ? <AudioEqualizerBars playing /> : <MusicNoteSymbol className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11.5px] font-semibold truncate">{tAudio(currentTrack.titleKey)}</div>
                    <div className="text-[10px] opacity-65 truncate">
                      {tAudio(currentTrack.artistKey)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? tAudio('pause') : tAudio('play')}
                    className="w-7 h-7 rounded-lg bg-[#007AFF] text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    {isPlaying ? <PauseSymbol className="w-3.5 h-3.5" /> : <PlaySymbol className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={nextTrack}
                    aria-label={tAudio('next')}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
                    }`}
                  >
                    <ForwardEndSymbol className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SpeakerWaveSymbol className="w-3 h-3 opacity-60 shrink-0" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label={tAudio('volume')}
                  className="w-full h-1 accent-[#007AFF] cursor-pointer"
                />
              </div>
            </div>

            {/* Row 3: Quick Wallpaper Swatches */}
            <div
              className={`p-2.5 rounded-xl space-y-2 ${
                isDark ? 'bg-white/[0.08]' : 'bg-black/[0.05]'
              }`}
            >
              <div className="flex items-center gap-2">
                <PhotoSymbol className="w-4 h-4 text-purple-400" />
                <span className="text-[12px] font-semibold">
                  {tMenu('controlCenter.wallpaper')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {WALLPAPER_SWATCHES.map((wp) => {
                  const selected = wallpaper === wp.id
                  return (
                    <button
                      key={wp.id}
                      type="button"
                      onClick={() => onSelectWallpaper(wp.id)}
                      title={tWp(wp.id)}
                      aria-label={tWp(wp.id)}
                      className={`h-14 rounded-lg border transition-transform relative overflow-hidden ${
                        selected
                          ? 'ring-2 ring-[#007AFF] border-white/60'
                          : isDark
                            ? 'border-white/20 opacity-80 hover:opacity-100'
                            : 'border-black/15 opacity-85 hover:opacity-100'
                      }`}
                      style={{ background: wp.preview }}
                    >
                      <span className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-black/50 text-white text-[10px] font-medium backdrop-blur-sm">
                        {tWp(wp.id)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Row 4: Open System Settings */}
            <button
              type="button"
              onClick={() => runAction(() => onOpenApp('settings'))}
              className={`w-full px-3 py-2 rounded-xl text-[12px] font-medium flex items-center justify-between transition-colors ${
                isDark
                  ? 'bg-white/[0.08] hover:bg-white/[0.15]'
                  : 'bg-black/[0.05] hover:bg-black/[0.1]'
              }`}
            >
              <span className="flex items-center gap-2">
                <GearSymbol className="w-3.5 h-3.5" />
                {tMenu('controlCenter.openSettings')}
              </span>
              <span className="text-[11px] opacity-60">›</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
