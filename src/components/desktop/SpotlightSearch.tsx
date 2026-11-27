'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import { getAppleIcon } from '@/components/shared/AppleIcons'
import {
  SearchSymbol,
  DownloadSymbol,
  MoonSymbol,
  SunSymbol,
  GlobeSymbol,
  GearSymbol,
  GitHubGlyphSymbol,
  LinkedInGlyphSymbol,
  BriefcaseSymbol,
  CpuSymbol,
  ArrowUpRightSymbol,
  XMarkCircleSymbol,
} from '@/components/shared/SFSymbols'

export type DesktopWindowId = 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'settings'

interface SpotlightItem {
  id: string
  category: 'app' | 'action' | 'project' | 'experience' | 'skill'
  title: string
  subtitle: string
  icon: React.ReactNode
  onSelect: () => void
}

interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
  theme?: 'dark' | 'light'
  onOpenWindow: (id: DesktopWindowId, searchTerm?: string) => void
  onDownloadCV: () => void
  onToggleTheme: () => void
  onSwitchLanguage: () => void
}

export function SpotlightSearch({
  isOpen,
  onClose,
  theme = 'dark',
  onOpenWindow,
  onDownloadCV,
  onToggleTheme,
  onSwitchLanguage,
}: SpotlightSearchProps) {
  const tCommon = useTranslations('common')
  const t = useTranslations('desktop.spotlight')
  const tExp = useTranslations('desktop.windows.experience')
  const tSkills = useTranslations('desktop.windows.skills')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      const timer = setTimeout(() => inputRef.current?.focus(), 40)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const allItems = useMemo<SpotlightItem[]>(() => {
    const apps: SpotlightItem[] = [
      {
        id: 'app-about',
        category: 'app',
        title: tCommon('about'),
        subtitle: portfolio.personalInfo.name,
        icon: getAppleIcon('about', 26),
        onSelect: () => {
          onOpenWindow('about')
          onClose()
        },
      },
      {
        id: 'app-experience',
        category: 'app',
        title: tCommon('experience'),
        subtitle: tExp('subtitle', {
          workCount: portfolio.experiences.length,
          eduCount: portfolio.education.length,
        }),
        icon: getAppleIcon('experience', 26),
        onSelect: () => {
          onOpenWindow('experience')
          onClose()
        },
      },
      {
        id: 'app-projects',
        category: 'app',
        title: tCommon('projects'),
        subtitle: `${portfolio.projects.length} • GitHub`,
        icon: getAppleIcon('projects', 26),
        onSelect: () => {
          onOpenWindow('projects')
          onClose()
        },
      },
      {
        id: 'app-skills',
        category: 'app',
        title: tCommon('skills'),
        subtitle: tSkills('itemsCount', {
          count:
            portfolio.skills.languages.length +
            portfolio.skills.frameworks.length +
            portfolio.skills.libraries.length +
            portfolio.skills.databases.length +
            portfolio.skills.tools.length,
        }),
        icon: getAppleIcon('skills', 26),
        onSelect: () => {
          onOpenWindow('skills')
          onClose()
        },
      },
      {
        id: 'app-contact',
        category: 'app',
        title: tCommon('contact'),
        subtitle: portfolio.personalInfo.email,
        icon: getAppleIcon('contact', 26),
        onSelect: () => {
          onOpenWindow('contact')
          onClose()
        },
      },
      {
        id: 'app-settings',
        category: 'app',
        title: tCommon('settings'),
        subtitle: 'macOS Sequoia',
        icon: getAppleIcon('settings', 26),
        onSelect: () => {
          onOpenWindow('settings')
          onClose()
        },
      },
    ]

    const actions: SpotlightItem[] = [
      {
        id: 'act-cv',
        category: 'action',
        title: t('actions.downloadCV'),
        subtitle: 'PDF',
        icon: <DownloadSymbol className="w-4 h-4 text-blue-500" />,
        onSelect: () => {
          onDownloadCV()
          onClose()
        },
      },
      {
        id: 'act-theme',
        category: 'action',
        title: t('actions.toggleTheme'),
        subtitle: tCommon('theme'),
        icon: isDark ? (
          <SunSymbol className="w-4 h-4 text-amber-400" />
        ) : (
          <MoonSymbol className="w-4 h-4 text-indigo-500" />
        ),
        onSelect: () => {
          onToggleTheme()
          onClose()
        },
      },
      {
        id: 'act-lang',
        category: 'action',
        title: t('actions.switchLanguage'),
        subtitle: locale === 'fr' ? 'FR → EN' : 'EN → FR',
        icon: <GlobeSymbol className="w-4 h-4 text-emerald-500" />,
        onSelect: () => {
          onSwitchLanguage()
          onClose()
        },
      },
      {
        id: 'act-settings',
        category: 'action',
        title: t('actions.openSettings'),
        subtitle: tCommon('settings'),
        icon: <GearSymbol className="w-4 h-4 text-gray-400" />,
        onSelect: () => {
          onOpenWindow('settings')
          onClose()
        },
      },
      {
        id: 'act-github',
        category: 'action',
        title: t('actions.openGithub'),
        subtitle: 'github.com',
        icon: <GitHubGlyphSymbol className="w-4 h-4" />,
        onSelect: () => {
          window.open(socialLinks.github, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'act-linkedin',
        category: 'action',
        title: t('actions.openLinkedin'),
        subtitle: 'linkedin.com',
        icon: <LinkedInGlyphSymbol className="w-4 h-4 text-[#0A66C2]" />,
        onSelect: () => {
          window.open(socialLinks.linkedin, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
    ]

    const projectItems: SpotlightItem[] = portfolio.projects.map((p, idx) => ({
      id: `proj-${idx}-${p.title}`,
      category: 'project',
      title: p.title,
      subtitle: p.technologies.slice(0, 4).join(' • '),
      icon: getAppleIcon('projects', 24),
      onSelect: () => {
        onOpenWindow('projects', p.title)
        onClose()
      },
    }))

    const expItems: SpotlightItem[] = portfolio.experiences.map((e, idx) => ({
      id: `exp-${idx}-${e.title}`,
      category: 'experience',
      title: e.title,
      subtitle: `${e.company} • ${e.period}`,
      icon: <BriefcaseSymbol className="w-4 h-4 text-purple-400" />,
      onSelect: () => {
        onOpenWindow('experience')
        onClose()
      },
    }))

    const skillGroups: { label: string; items: string[] }[] = [
      { label: tCommon('skills'), items: portfolio.skills.languages },
      { label: tCommon('skills'), items: portfolio.skills.frameworks },
      { label: tCommon('skills'), items: portfolio.skills.libraries },
      { label: tCommon('skills'), items: portfolio.skills.databases },
      { label: tCommon('skills'), items: portfolio.skills.tools },
      { label: tCommon('skills'), items: portfolio.skills.methodologies },
    ]

    const skillItems: SpotlightItem[] = skillGroups.flatMap((group) =>
      group.items.map((item) => ({
        id: `skill-${item}`,
        category: 'skill' as const,
        title: item,
        subtitle: group.label,
        icon: <CpuSymbol className="w-4 h-4 text-cyan-400" />,
        onSelect: () => {
          onOpenWindow('skills', item)
          onClose()
        },
      }))
    )

    return [...apps, ...actions, ...projectItems, ...expItems, ...skillItems]
  }, [
    tCommon,
    t,
    tExp,
    tSkills,
    portfolio,
    isDark,
    locale,
    onOpenWindow,
    onClose,
    onDownloadCV,
    onToggleTheme,
    onSwitchLanguage,
  ])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return allItems.slice(0, 10)
    }
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 14)
  }, [allItems, query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
      )
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault()
      filteredItems[selectedIndex].onSelect()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[14vh] px-4"
          style={{ background: 'rgba(0, 0, 0, 0.28)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={t('ariaLabel')}
            className="w-full max-w-[620px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: isDark ? 'rgba(30, 30, 34, 0.84)' : 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(36px) saturate(190%)',
              WebkitBackdropFilter: 'blur(36px) saturate(190%)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.18)'
                : '1px solid rgba(0, 0, 0, 0.12)',
              boxShadow: isDark
                ? '0 28px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.16)'
                : '0 24px 68px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Input Bar */}
            <div
              className={`flex items-center gap-3 px-4 py-3.5 border-b ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <SearchSymbol
                className={`w-5 h-5 shrink-0 ${isDark ? 'text-white/55' : 'text-gray-500'}`}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('placeholder')}
                className={`flex-1 bg-transparent text-[15px] font-medium outline-none ${
                  isDark
                    ? 'text-white placeholder:text-white/40'
                    : 'text-gray-900 placeholder:text-gray-400'
                }`}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={tCommon('clearSearch')}
                  className={isDark ? 'text-white/40 hover:text-white/80' : 'text-gray-400 hover:text-gray-700'}
                >
                  <XMarkCircleSymbol className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto macos-scroll p-2 space-y-0.5">
              {filteredItems.length === 0 ? (
                <div
                  className={`py-10 text-center text-sm ${
                    isDark ? 'text-white/45' : 'text-gray-500'
                  }`}
                >
                  {t('noResults')}
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={item.onSelect}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                        isSelected
                          ? 'bg-[#0066CC] text-white'
                          : isDark
                            ? 'text-white/90 hover:bg-white/[0.06]'
                            : 'text-gray-900 hover:bg-black/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold truncate">{item.title}</div>
                          <div
                            className={`text-[11px] truncate ${
                              isSelected
                                ? 'text-white/80'
                                : isDark
                                  ? 'text-white/50'
                                  : 'text-gray-500'
                            }`}
                          >
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10.5px] font-medium px-2 py-0.5 rounded-md ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : isDark
                                ? 'bg-white/[0.07] text-white/55'
                                : 'bg-black/[0.06] text-gray-600'
                          }`}
                        >
                          {t(`categories.${item.category}`)}
                        </span>
                        <ArrowUpRightSymbol
                          className={`w-3.5 h-3.5 ${
                            isSelected ? 'text-white' : isDark ? 'text-white/30' : 'text-gray-400'
                          }`}
                        />
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer Hint */}
            <div
              className={`px-4 py-2 border-t text-[11px] flex items-center justify-between ${
                isDark
                  ? 'border-white/10 text-white/45 bg-white/[0.02]'
                  : 'border-black/10 text-gray-500 bg-black/[0.02]'
              }`}
            >
              <span>{!query ? t('empty') : t('resultsCount', { count: filteredItems.length })}</span>
              <span>{t('footerHint')}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
