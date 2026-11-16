'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import { WindowToolbar } from '@/components/shared/WindowToolbar'
import {
  GridSymbol,
  SparklesAISymbol,
  GlobeSymbol,
  PhoneDeviceSymbol,
  SearchSymbol,
  GitHubGlyphSymbol,
  ArrowUpRightSymbol,
  XMarkCircleSymbol,
  XMarkSymbol,
} from '@/components/shared/SFSymbols'

interface ProjectsWindowProps {
  theme?: 'dark' | 'light'
  spotlightQuery?: { term: string; nonce: number } | null
}

type ProjectFilter = 'all' | 'ai' | 'web' | 'mobile'

export function ProjectsWindow({ theme = 'dark', spotlightQuery }: ProjectsWindowProps) {
  const t = useTranslations('projects')
  const tCommon = useTranslations('common')
  const tTabletEmpty = useTranslations('tablet.projects')
  const tDesktop = useTranslations('desktop.windows.projects')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [filter, setFilter] = useState<ProjectFilter>('all')
  const [search, setSearch] = useState('')
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (spotlightQuery?.term) {
      setFilter('all')
      setSearch(spotlightQuery.term)
    }
  }, [spotlightQuery])

  useEffect(() => {
    if (!selectedTitle) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setSelectedTitle(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedTitle])

  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])
  const { projects } = portfolio

  const counts = useMemo(
    () => ({
      all: projects.length,
      ai: projects.filter((p) => p.type === 'ai').length,
      web: projects.filter((p) => p.type === 'web').length,
      mobile: projects.filter((p) => p.type === 'mobile').length,
    }),
    [projects]
  )

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesType = filter === 'all' || project.type === filter
      if (!matchesType) return false
      if (!q) return true
      return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(q))
      )
    })
  }, [projects, filter, search])

  const categories: { id: ProjectFilter; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: t('all'), icon: <GridSymbol className="w-3.5 h-3.5" />, count: counts.all },
    {
      id: 'ai',
      label: t('ai'),
      icon: <SparklesAISymbol className="w-3.5 h-3.5" />,
      count: counts.ai,
    },
    {
      id: 'web',
      label: t('web'),
      icon: <GlobeSymbol className="w-3.5 h-3.5" />,
      count: counts.web,
    },
    {
      id: 'mobile',
      label: t('mobile'),
      icon: <PhoneDeviceSymbol className="w-3.5 h-3.5" />,
      count: counts.mobile,
    },
  ]

  const toolbarButtons = [
    {
      icon: <GitHubGlyphSymbol className="w-3.5 h-3.5" />,
      label: 'GitHub',
      onClick: () => window.open(socialLinks.github, '_blank', 'noopener,noreferrer'),
    },
  ]

  const typeBadgeColor = (type: string) => {
    if (type === 'ai') return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    if (type === 'mobile') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }

  return (
    <div className="relative flex flex-col h-full">
      <WindowToolbar
        buttons={toolbarButtons}
        theme={theme}
        rightContent={
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs w-44 sm:w-56 ${
                isDark
                  ? 'bg-white/[0.06] border-white/10 text-white'
                  : 'bg-black/[0.04] border-black/10 text-gray-900'
              }`}
            >
              <SearchSymbol className="w-3.5 h-3.5 opacity-55 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tDesktop('searchPlaceholder')}
                className="flex-1 bg-transparent outline-none text-[12px] min-w-0 placeholder:opacity-55"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="opacity-50 hover:opacity-100"
                >
                  <XMarkCircleSymbol className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <span
              className={`hidden sm:inline text-[11.5px] font-medium ${
                isDark ? 'text-white/50' : 'text-gray-500'
              }`}
            >
              {tDesktop('subtitle', { count: filteredProjects.length })}
            </span>
          </div>
        }
      />

      <div className="macos-split-layout flex-1 min-h-0">
        {/* Category Sidebar */}
        <aside
          className={`macos-split-sidebar p-3 ${isDark ? 'bg-white/[0.03]' : 'bg-black/[0.025]'}`}
        >
          <div
            className={`macos-desktop-only px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider ${
              isDark ? 'text-white/40' : 'text-gray-500'
            }`}
          >
            {tDesktop('sidebarTitle')}
          </div>
          <nav className="macos-sidebar-nav">
            {categories.map((cat) => {
              const active = filter === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilter(cat.id)}
                  className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#007AFF] text-white'
                      : isDark
                        ? 'text-white/80 hover:bg-white/[0.07]'
                        : 'text-gray-800 hover:bg-black/[0.05]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {cat.icon}
                    <span>{cat.label}</span>
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                      active
                        ? 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-white/[0.08] text-white/55'
                          : 'bg-black/[0.06] text-gray-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Projects Grid */}
        <div className="flex-1 overflow-y-auto macos-scroll p-5">
          {filteredProjects.length === 0 ? (
            <div
              className={`py-16 text-center text-sm ${
                isDark ? 'text-white/45' : 'text-gray-500'
              }`}
            >
              {tTabletEmpty('empty')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project, idx) => {
                const hasValidImage = Boolean(project.image) && !brokenImages[project.title]
                return (
                  <article
                    key={`${project.title}-${idx}`}
                    onClick={() => setSelectedTitle(project.title)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedTitle(project.title)
                      }
                    }}
                    className={`rounded-xl border overflow-hidden flex flex-col cursor-pointer transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 hover:border-white/25'
                        : 'bg-white/85 border-black/10 hover:border-black/25 shadow-sm'
                    }`}
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-slate-800 via-indigo-900 to-purple-900">
                      {hasValidImage ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          onError={() =>
                            setBrokenImages((prev) => ({ ...prev, [project.title]: true }))
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                          <SparklesAISymbol className="w-8 h-8" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span
                        className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10.5px] font-semibold border backdrop-blur-md uppercase ${typeBadgeColor(
                          project.type
                        )}`}
                      >
                        {t(project.type as 'ai' | 'web' | 'mobile')}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3
                        className={`text-sm font-bold mb-1.5 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-[12px] leading-relaxed mb-3 flex-1 ${
                          isDark ? 'text-white/70' : 'text-gray-600'
                        }`}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium ${
                              isDark
                                ? 'bg-white/[0.07] text-white/75'
                                : 'bg-black/[0.05] text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div
                        className={`pt-2.5 border-t flex items-center justify-between ${
                          isDark ? 'border-white/10' : 'border-black/10'
                        }`}
                      >
                        <span className="text-[11px] font-medium opacity-65">
                          {tDesktop('viewDetails')}
                        </span>
                        <a
                          href={socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#007AFF] hover:underline"
                        >
                          <span>{tDesktop('viewCode')}</span>
                          <ArrowUpRightSymbol className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal Sheet */}
      <AnimatePresence>
        {selectedTitle && (() => {
          const activeProject = projects.find((p) => p.title === selectedTitle)
          if (!activeProject) return null
          const hasImg = Boolean(activeProject.image) && !brokenImages[activeProject.title]
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTitle(null)}
              className="absolute inset-0 z-40 flex items-center justify-center p-5 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.16 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-[520px] rounded-2xl overflow-hidden border shadow-2xl ${
                  isDark
                    ? 'bg-[#1f1f24]/95 border-white/15 text-white'
                    : 'bg-white/95 border-black/10 text-gray-900'
                }`}
              >
                <div className="relative h-48 w-full bg-gradient-to-br from-slate-800 to-indigo-950">
                  {hasImg ? (
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30">
                      <SparklesAISymbol className="w-10 h-10" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedTitle(null)}
                    aria-label={tCommon('close')}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                  >
                    <XMarkSymbol className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold">{activeProject.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold border uppercase shrink-0 ${typeBadgeColor(
                        activeProject.type
                      )}`}
                    >
                      {t(activeProject.type as 'ai' | 'web' | 'mobile')}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-white/75' : 'text-gray-600'}`}>
                    {activeProject.description}
                  </p>

                  <div>
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-white/45' : 'text-gray-500'
                      }`}
                    >
                      {tDesktop('technologies')}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                            isDark
                              ? 'bg-white/[0.08] text-white/85'
                              : 'bg-black/[0.05] text-gray-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`pt-3 border-t flex items-center justify-end gap-2 ${
                      isDark ? 'border-white/10' : 'border-black/10'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedTitle(null)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        isDark
                          ? 'bg-white/[0.08] hover:bg-white/[0.15]'
                          : 'bg-black/[0.06] hover:bg-black/[0.1]'
                      }`}
                    >
                      {tCommon('close')}
                    </button>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                    >
                      <span>{tDesktop('viewCode')}</span>
                      <ArrowUpRightSymbol className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
