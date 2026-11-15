'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTime } from '@/hooks/useTime'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { personalInfo } from '@/lib/data'
import { useTranslations } from 'next-intl'
import {
  AppleLogoSymbol,
  BatterySymbol,
  CheckmarkSymbol,
  DownloadSymbol,
  GlobeSymbol,
  MoonSymbol,
  SearchSymbol,
  SunSymbol,
  WifiSymbol,
} from '@/components/shared/SFSymbols'

interface MacOSMenuBarProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  activeAppTitle?: string
}

export default function MacOSMenuBar({ theme, toggleTheme, activeAppTitle = 'Finder' }: MacOSMenuBarProps) {
  const { timeString, dateString } = useTime()
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false)
  const appleMenuRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (appleMenuRef.current && !appleMenuRef.current.contains(e.target as Node)) {
        setIsAppleMenuOpen(false)
      }
    }
    if (isAppleMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAppleMenuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsAppleMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setIsAppleMenuOpen(false)
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = personalInfo.cvPath
    link.download = 'Anas_En-Naqadi_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsAppleMenuOpen(false)
  }

  const isDark = theme === 'dark'

  return (
    <div
      className="macos-menu-bar"
      style={{
        background: isDark ? 'rgba(28, 28, 28, 0.75)' : 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
        color: isDark ? '#fff' : '#1c1c1e',
      }}
      role="menubar"
      aria-label="macOS Menu Bar"
    >
      {/* Left: Apple Logo + Dropdown */}
      <div className="menu-bar-left flex items-center gap-1" ref={appleMenuRef}>
        <button
          className="apple-menu-btn"
          onClick={() => setIsAppleMenuOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={isAppleMenuOpen}
          aria-label="Apple Menu"
          style={{ color: isDark ? '#fff' : '#1c1c1e' }}
        >
          <AppleLogoSymbol className="w-3.5 h-3.5" />
        </button>

        {/* Active App Title */}
        <span className="font-bold px-2 cursor-default select-none tracking-wide text-[11px]">
          {activeAppTitle}
        </span>

        {/* Standard Menu Items */}
        <div className="hidden md:flex items-center gap-3 ml-2">
          {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((item) => (
            <span
              key={item}
              className="cursor-default select-none px-1.5 py-0.5 rounded hover:bg-white/15 dark:hover:bg-white/10 transition-colors text-[11px]"
              style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}
            >
              {item}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isAppleMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="apple-dropdown"
              role="menu"
              style={{
                background: isDark ? 'rgba(38, 38, 40, 0.96)' : 'rgba(255, 255, 255, 0.96)',
                border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
                color: isDark ? '#f2f2f7' : '#1c1c1e',
              }}
            >
              {/* Language Section */}
              <div className="apple-dropdown-section">
                <div
                  className="apple-dropdown-label flex items-center gap-1.5"
                  style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
                >
                  <GlobeSymbol className="w-3 h-3" />
                  <span>{t('common.language') || 'Language'}</span>
                </div>
                {locales.map((loc) => (
                  <button
                    key={loc}
                    role="menuitem"
                    onClick={() => switchLocale(loc)}
                    className="apple-dropdown-item"
                    style={{
                      color: locale === loc ? '#007aff' : isDark ? '#f2f2f7' : '#1c1c1e',
                    }}
                  >
                    <span>{localeNames[loc as Locale]}</span>
                    {locale === loc && (
                      <span className="apple-check inline-flex items-center justify-center shrink-0" aria-hidden="true">
                        <CheckmarkSymbol className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div
                className="apple-dropdown-divider"
                style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
              />

              {/* Theme Toggle */}
              <button
                role="menuitem"
                onClick={() => { toggleTheme(); setIsAppleMenuOpen(false) }}
                className="apple-dropdown-item"
                style={{ color: isDark ? '#f2f2f7' : '#1c1c1e' }}
              >
                <span className="flex items-center gap-2">
                  {isDark ? <SunSymbol className="w-3.5 h-3.5 text-amber-400" /> : <MoonSymbol className="w-3.5 h-3.5 text-indigo-500" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </span>
              </button>

              <div
                className="apple-dropdown-divider"
                style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
              />

              {/* Download CV */}
              <button
                role="menuitem"
                onClick={downloadCV}
                className="apple-dropdown-item"
                style={{ color: isDark ? '#f2f2f7' : '#1c1c1e' }}
              >
                <span className="flex items-center gap-2">
                  <DownloadSymbol className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t('common.downloadCV') || 'Download CV'}</span>
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center: Live Date */}
      <div className="menu-bar-center" aria-live="polite" aria-atomic="true">
        <span
          className="menu-bar-date"
          style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}
        >
          {dateString}
        </span>
      </div>

      {/* Right: System Icons + Time */}
      <div className="menu-bar-right">
        <span
          className="menu-bar-icon flex items-center"
          aria-label="Wi-Fi connected"
          title="Wi-Fi"
          style={{ color: isDark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.78)' }}
        >
          <WifiSymbol className="w-4 h-3.5" />
        </span>
        <span
          className="menu-bar-icon flex items-center"
          aria-label="Battery"
          title="Battery"
          style={{ color: isDark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.78)' }}
        >
          <BatterySymbol className="w-5 h-3" />
        </span>
        <span
          className="menu-bar-icon flex items-center"
          aria-label="Spotlight Search"
          title="Search"
          style={{ color: isDark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.78)' }}
        >
          <SearchSymbol className="w-3.5 h-3.5" />
        </span>
        <span
          className="menu-bar-time"
          aria-live="polite"
          aria-atomic="true"
          style={{ color: isDark ? '#fff' : '#1c1c1e' }}
        >
          {timeString}
        </span>
      </div>
    </div>
  )
}
