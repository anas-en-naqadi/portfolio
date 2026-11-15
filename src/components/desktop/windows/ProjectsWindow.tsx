'use client'

import React, { useState, useMemo } from 'react'
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
} from '@/components/shared/SFSymbols'

interface ProjectsWindowProps {
  theme?: 'dark' | 'light'
}

type ProjectFilter = 'all' | 'ai' | 'web' | 'mobile'

export function ProjectsWindow({ theme = 'dark' }: ProjectsWindowProps) {
  const t = useTranslations('projects')
  const tTabletEmpty = useTranslations('tablet.projects')
  const tDesktop = useTranslations('desktop.windows.projects')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [filter, setFilter] = useState<ProjectFilter>('all')
  const [search, setSearch] = useState('')

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
    <div className="flex flex-col h-full">
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
              {filteredProjects.map((project, idx) => (
                <article
                  key={`${project.title}-${idx}`}
                  className={`rounded-xl border overflow-hidden flex flex-col transition-transform hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 hover:border-white/20'
                      : 'bg-white/85 border-black/10 hover:border-black/20 shadow-sm'
                  }`}
                >
                  {project.image && (
                    <div className="relative h-36 w-full overflow-hidden bg-black/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span
                        className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10.5px] font-semibold border backdrop-blur-md uppercase ${typeBadgeColor(
                          project.type
                        )}`}
                      >
                        {t(project.type as 'ai' | 'web' | 'mobile')}
                      </span>
                    </div>
                  )}

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
                      className={`pt-2.5 border-t flex justify-end ${
                        isDark ? 'border-white/10' : 'border-black/10'
                      }`}
                    >
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#007AFF] hover:underline"
                      >
                        <span>{tDesktop('viewCode')}</span>
                        <ArrowUpRightSymbol className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
