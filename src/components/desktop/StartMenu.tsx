'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { socialLinks } from '@/lib/data'
import { getAppleIcon } from '@/components/shared/AppleIcons'
import { SearchSymbol, XMarkCircleSymbol } from '@/components/shared/SFSymbols'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onAppClick: (appId: string) => void
  theme?: 'dark' | 'light'
  onDownloadCV?: () => void
}

interface LaunchpadAppItem {
  id: string
  label: string
  action: 'window' | 'download' | 'github' | 'linkedin'
}

export function StartMenu({
  isOpen,
  onClose,
  onAppClick,
  theme = 'dark',
  onDownloadCV,
}: StartMenuProps) {
  const tCommon = useTranslations('common')
  const t = useTranslations('desktop.launchpad')
  const isDark = theme === 'dark'

  const [query, setQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      const timer = setTimeout(() => searchInputRef.current?.focus(), 60)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const apps = useMemo<LaunchpadAppItem[]>(
    () => [
      { id: 'about', label: tCommon('about'), action: 'window' },
      { id: 'experience', label: tCommon('experience'), action: 'window' },
      { id: 'projects', label: tCommon('projects'), action: 'window' },
      { id: 'skills', label: tCommon('skills'), action: 'window' },
      { id: 'contact', label: tCommon('contact'), action: 'window' },
      { id: 'settings', label: tCommon('settings'), action: 'window' },
      { id: 'cv', label: tCommon('downloadCV'), action: 'download' },
      { id: 'github', label: 'GitHub', action: 'github' },
      { id: 'linkedin', label: 'LinkedIn', action: 'linkedin' },
    ],
    [tCommon]
  )

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return apps
    return apps.filter((app) => app.label.toLowerCase().includes(q))
  }, [apps, query])

  const handleItemClick = (app: LaunchpadAppItem) => {
    onClose()
    if (app.action === 'download') {
      onDownloadCV?.()
    } else if (app.action === 'github') {
      window.open(socialLinks.github, '_blank', 'noopener,noreferrer')
    } else if (app.action === 'linkedin') {
      window.open(socialLinks.linkedin, '_blank', 'noopener,noreferrer')
    } else {
      onAppClick(app.id)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="launchpad-overlay fixed inset-0 z-[9500] flex flex-col items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            background: isDark ? 'rgba(12, 12, 16, 0.72)' : 'rgba(236, 236, 242, 0.72)',
            backdropFilter: 'blur(42px) saturate(180%)',
            WebkitBackdropFilter: 'blur(42px) saturate(180%)',
          }}
        >
          {/* Search Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="mb-10 w-full max-w-[300px]"
          >
            <div
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.75)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : '1px solid rgba(0, 0, 0, 0.12)',
              }}
            >
              <SearchSymbol
                className={`w-4 h-4 shrink-0 ${isDark ? 'text-white/60' : 'text-gray-500'}`}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') onClose()
                  if (e.key === 'Enter' && filteredApps.length > 0) {
                    handleItemClick(filteredApps[0])
                  }
                }}
                placeholder={t('searchPlaceholder')}
                className={`flex-1 bg-transparent text-xs font-medium outline-none ${
                  isDark
                    ? 'text-white placeholder:text-white/45'
                    : 'text-gray-900 placeholder:text-gray-500'
                }`}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className={isDark ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-700'}
                >
                  <XMarkCircleSymbol className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* App Grid */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[740px] min-h-[260px]"
          >
            {filteredApps.length === 0 ? (
              <div
                className={`text-center py-16 text-sm font-medium ${
                  isDark ? 'text-white/50' : 'text-gray-500'
                }`}
              >
                {t('noResults')}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-8 justify-items-center">
                {filteredApps.map((app, i) => (
                  <motion.button
                    key={app.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.85, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.025, type: 'spring', stiffness: 320, damping: 24 }}
                    whileHover={{ scale: 1.09, y: -4 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleItemClick(app)}
                    className="flex flex-col items-center gap-2.5 group focus:outline-none cursor-pointer"
                  >
                    <div
                      className="w-[74px] h-[74px] rounded-[18px] overflow-hidden shadow-2xl group-hover:ring-2 group-hover:ring-white/40 transition-shadow"
                    >
                      {getAppleIcon(app.id, 74)}
                    </div>
                    <span
                      className={`text-[12.5px] font-medium text-center leading-tight max-w-[100px] ${
                        isDark ? 'text-white/90' : 'text-gray-900'
                      }`}
                      style={{
                        textShadow: isDark ? '0 1px 6px rgba(0,0,0,0.65)' : undefined,
                      }}
                    >
                      {app.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Footer Hint */}
          <p
            className={`mt-10 text-xs font-medium ${
              isDark ? 'text-white/45' : 'text-gray-500'
            }`}
          >
            {t('title')} • {t('hint')}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
