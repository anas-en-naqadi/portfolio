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
} from '@/components/shared/SFSymbols'
import type { DesktopWindowId } from './SpotlightSearch'

export type WallpaperPresetId = 'default' | 'aurora' | 'midnight' | 'horizon'

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
  | 'controlCenter'
  | null

const WALLPAPER_SWATCHES: { id: WallpaperPresetId; preview: string }[] = [
  { id: 'default', preview: 'linear-gradient(135deg, #1e293b, #4c1d95)' },
  { id: 'aurora', preview: 'linear-gradient(135deg, #065f46, #1d4ed8)' },
  { id: 'midnight', preview: 'linear-gradient(135deg, #090d16, #312e81)' },
  { id: 'horizon', preview: 'linear-gradient(135deg, #7c2d12, #4338ca)' },
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
  const tMenu = useTranslations('desktop.menuBar')
  const tWp = useTranslations('desktop.wallpapers')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [timeString, setTimeString] = useState('')
  const [dateString, setDateString] = useState('')
  const [openMenu, setOpenMenu] = useState<OpenMenuKey>(null)
  const barRef = useRef<HTMLElement>(null)

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
        setOpenMenu(null)
      }
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('mousedown', handleOutside)
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('mousedown', handleOutside)
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const toggleMenu = (key: Exclude<OpenMenuKey, null>) => {
    setOpenMenu((prev) => (prev === key ? null : key))
  }

  const runAction = (fn: () => void) => {
    setOpenMenu(null)
    fn()
  }

  const dropdownStyle: React.CSSProperties = {
    background: isDark ? 'rgba(34, 34, 38, 0.88)' : 'rgba(255, 255, 255, 0.9)',
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
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('apple')}
            aria-label="Apple Menu"
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
              className="absolute top-[26px] left-0 min-w-[215px] rounded-xl p-1.5 z-[9999]"
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
        <div className="relative hidden sm:block">
          <button type="button" onClick={() => toggleMenu('file')} className={menuTriggerClass('file')}>
            {tMenu('file')}
          </button>
          {openMenu === 'file' && (
            <div
              className="absolute top-[26px] left-0 min-w-[205px] rounded-xl p-1.5 z-[9999]"
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
        <div className="relative hidden sm:block">
          <button type="button" onClick={() => toggleMenu('edit')} className={menuTriggerClass('edit')}>
            {tMenu('edit')}
          </button>
          {openMenu === 'edit' && (
            <div
              className="absolute top-[26px] left-0 min-w-[215px] rounded-xl p-1.5 z-[9999]"
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
        <div className="relative hidden md:block">
          <button type="button" onClick={() => toggleMenu('view')} className={menuTriggerClass('view')}>
            {tMenu('view')}
          </button>
          {openMenu === 'view' && (
            <div
              className="absolute top-[26px] left-0 min-w-[205px] rounded-xl p-1.5 z-[9999]"
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
        <div className="relative hidden md:block">
          <button type="button" onClick={() => toggleMenu('go')} className={menuTriggerClass('go')}>
            {tMenu('go')}
          </button>
          {openMenu === 'go' && (
            <div
              className="absolute top-[26px] left-0 min-w-[185px] rounded-xl p-1.5 z-[9999]"
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
        <div className="relative hidden lg:block">
          <button type="button" onClick={() => toggleMenu('window')} className={menuTriggerClass('window')}>
            {tMenu('window')}
          </button>
          {openMenu === 'window' && (
            <div
              className="absolute top-[26px] left-0 min-w-[205px] rounded-xl p-1.5 z-[9999]"
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
        <div className="relative hidden lg:block">
          <button type="button" onClick={() => toggleMenu('help')} className={menuTriggerClass('help')}>
            {tMenu('help')}
          </button>
          {openMenu === 'help' && (
            <div
              className="absolute top-[26px] left-0 min-w-[245px] rounded-xl p-1.5 z-[9999]"
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

      {/* Right: Status Tray + Spotlight + Control Center + Date/Time */}
      <div className="flex items-center gap-1.5 relative">
        <button
          type="button"
          onClick={() => toggleMenu('controlCenter')}
          aria-label="Wi-Fi"
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
          onClick={() => toggleMenu('controlCenter')}
          aria-label={tMenu('controlCenter.title')}
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
        <button
          type="button"
          onClick={() => toggleMenu('controlCenter')}
          className={`px-2 h-[22px] rounded-[5px] flex items-center gap-1.5 text-[12.5px] font-medium tabular-nums transition-colors ${
            isDark ? 'hover:bg-white/15' : 'hover:bg-black/10'
          }`}
        >
          <span className="capitalize">{dateString}</span>
          <span>{timeString}</span>
        </button>

        {/* Liquid Glass Control Center Popover */}
        {openMenu === 'controlCenter' && (
          <div
            className="absolute top-[30px] right-0 w-[308px] rounded-2xl p-3 space-y-2.5 z-[9999]"
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
              <div className="grid grid-cols-4 gap-2">
                {WALLPAPER_SWATCHES.map((wp) => {
                  const selected = wallpaper === wp.id
                  return (
                    <button
                      key={wp.id}
                      type="button"
                      onClick={() => onSelectWallpaper(wp.id)}
                      title={tWp(wp.id)}
                      aria-label={tWp(wp.id)}
                      className={`h-8 rounded-lg border transition-transform ${
                        selected
                          ? 'ring-2 ring-[#007AFF] scale-[1.03] border-white/60'
                          : 'border-white/20 opacity-80 hover:opacity-100'
                      }`}
                      style={{ background: wp.preview }}
                    />
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
