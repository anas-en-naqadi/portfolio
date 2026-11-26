'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'
import { ProjectImage, PROJECT_IMAGE_SIZES } from '../shared/ProjectImage'
import IPadSplitView, { getIPadSidebarItemClasses } from './IPadSplitView'
import {
  AppCubeSymbol,
  ArrowUpRightSymbol,
  BriefcaseSymbol,
  GlobeSymbol,
  GridSymbol,
  PhoneDeviceSymbol,
  SearchSymbol,
  SparklesAISymbol,
  XMarkCircleSymbol,
  XMarkSymbol,
} from '../shared/SFSymbols'

interface IPadProjectsProps {
  theme: 'dark' | 'light'
}

export default function IPadProjects({ theme }: IPadProjectsProps) {
  const locale = useLocale()
  const t = useTranslations('tablet.projects')
  const tCommon = useTranslations('common')
  const { projects } = getLocalizedPortfolioData(locale)
  const [activeFilter, setActiveFilter] = useState<'all' | 'freelance' | 'ai' | 'web' | 'mobile'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  const isDark = theme === 'dark'

  const cardBg = isDark ? 'bg-[#2C2C2E] border-white/[0.08]' : 'bg-white border-black/[0.05]'
  const searchBg = isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
  const { active: activeFilterBg, inactive: hoverFilterBg } = getIPadSidebarItemClasses(theme)

  const counts = {
    all: projects.length,
    freelance: projects.filter((p) => p.isFreelance).length,
    ai: projects.filter((p) => p.type === 'ai').length,
    web: projects.filter((p) => p.type === 'web').length,
    mobile: projects.filter((p) => p.type === 'mobile').length,
  }

  const domainFilters = [
    {
      id: 'all',
      label: t('all'),
      icon: <GridSymbol className="w-4 h-4 shrink-0" />,
      count: counts.all,
    },
    {
      id: 'ai',
      label: t('categories.ai'),
      icon: <SparklesAISymbol className="w-4 h-4 shrink-0" />,
      count: counts.ai,
    },
    {
      id: 'web',
      label: t('categories.web'),
      icon: <GlobeSymbol className="w-4 h-4 shrink-0" />,
      count: counts.web,
    },
    {
      id: 'mobile',
      label: t('categories.mobile'),
      icon: <PhoneDeviceSymbol className="w-4 h-4 shrink-0" />,
      count: counts.mobile,
    },
  ] as const

  const freelanceFilter = {
    id: 'freelance' as const,
    label: t('categories.freelance'),
    icon: <BriefcaseSymbol className="w-4 h-4 shrink-0" />,
    count: counts.freelance,
  }

  const allFilters = [...domainFilters, freelanceFilter]

  const getCategory = (project: (typeof projects)[number]) => {
    if (project.technologies.includes('Machine Learning')) {
      return t('categories.ml')
    } else if (
      project.type === 'ai' ||
      project.technologies.includes('Deep Learning') ||
      project.technologies.includes('AI')
    ) {
      return t('categories.ai')
    } else if (project.type === 'mobile') {
      return t('categories.mobile')
    } else if (
      project.technologies.includes('React.js') ||
      project.technologies.includes('Vue.js') ||
      project.technologies.includes('Laravel')
    ) {
      return t('categories.fullstack')
    }
    return t('categories.tools')
  }

  const filteredProjects = projects.filter((p) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'freelance' ? Boolean(p.isFreelance) : p.type === activeFilter)
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.technologies.some((tech) => tech.toLowerCase().includes(q))
    return matchesFilter && matchesSearch
  })

  const activeFilterLabel =
    allFilters.find((f) => f.id === activeFilter)?.label ?? t('all')

  const searchBar = (
    <div className="px-0.5 sm:px-1.5">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 rtl:left-auto rtl:right-3 flex items-center text-zinc-400 dark:text-zinc-500 pointer-events-none">
          <SearchSymbol className="w-3.5 h-3.5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className={`w-full pl-8 pr-8 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${searchBg}`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label={tCommon('clearSearch')}
            className="absolute inset-y-0 right-2.5 rtl:right-auto rtl:left-2.5 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600"
          >
            <XMarkCircleSymbol className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )

  const filterNav = (
    <nav className="ipad-sidebar-nav" aria-label={t('sidebarTitle')}>
      {domainFilters.map((f) => {
        const isActive = activeFilter === f.id
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center justify-between gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
              isActive ? activeFilterBg : hoverFilterBg
            }`}
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <span className="flex items-center justify-center shrink-0">
                {f.icon}
              </span>
              <span className="truncate">{f.label}</span>
            </span>
            <span className="text-[11px] font-bold opacity-60 tabular-nums shrink-0">
              {f.count}
            </span>
          </button>
        )
      })}

      <div
        className={`ipad-desktop-only my-1.5 mx-2 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`}
        aria-hidden="true"
      />
      <div className="ipad-desktop-only px-3 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {t('clientWorkTitle')}
      </div>
      <button
        type="button"
        onClick={() => setActiveFilter(freelanceFilter.id)}
        className={`flex items-center justify-between gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
          activeFilter === freelanceFilter.id ? activeFilterBg : hoverFilterBg
        }`}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <span className="flex items-center justify-center shrink-0 text-amber-500 dark:text-amber-400">
            {freelanceFilter.icon}
          </span>
          <span className="truncate">{freelanceFilter.label}</span>
        </span>
        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 tabular-nums shrink-0">
          {freelanceFilter.count}
        </span>
      </button>
    </nav>
  )

  return (
    <div className="relative h-full w-full select-none">
      <IPadSplitView
        theme={theme}
        sidebarTitle={t('sidebarTitle')}
        sidebarHeaderExtra={searchBar}
        sidebarContent={filterNav}
        detailTitle={`${activeFilterLabel} (${filteredProjects.length})`}
        detailPaddingClass="p-4 sm:p-6 md:p-8"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr gap-5 sm:gap-6 pb-8" layout>
                {filteredProjects.map((project, idx) => {
                  const category = getCategory(project)
                  return (
                    <AnimatedSection key={project.image || project.title} delay={Math.min(idx, 5) * 0.03} className="h-full">
                      <motion.div
                        onClick={() => setSelectedProject(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedProject(project)
                          }
                        }}
                        className={`border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${cardBg}`}
                        layout
                      >
                        {/* Spotlight Image */}
                        <div className="relative w-full h-40 bg-gradient-to-br from-primary/10 to-primary-dark/15 overflow-hidden flex-shrink-0">
                          <ProjectImage
                            src={project.image}
                            alt={project.title}
                            sizes={PROJECT_IMAGE_SIZES.tabletCard}
                            priority={idx < 4}
                            tone={theme}
                            imgClassName="group-hover:scale-[1.03]"
                            fallback={
                              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-indigo-500/10 to-cyan-500/25 flex items-center justify-center">
                                <AppCubeSymbol className="w-9 h-9 text-blue-500/80 dark:text-blue-400/80" />
                              </div>
                            }
                          />
                          {project.isFreelance && (
                            <span className="absolute top-2.5 left-2.5 z-[2] inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md bg-black/65 text-amber-300 border-amber-400/50 shadow-sm">
                              <BriefcaseSymbol className="w-3 h-3 shrink-0" />
                              <span>{t('categories.freelance')}</span>
                            </span>
                          )}
                        </div>

                        {/* Content & Metadata */}
                        <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                  {project.title}
                                </h3>
                                <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wide truncate block">
                                  {category}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedProject(project)
                                }}
                                className="bg-gray-100 dark:bg-[#3A3A3C] hover:bg-gray-200 dark:hover:bg-[#48484A] text-[#007AFF] dark:text-[#0A84FF] font-extrabold text-[10px] px-4 sm:px-5 py-1.5 rounded-full tracking-wider active:scale-95 transition-all duration-100 flex-shrink-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                              >
                                {t('get')}
                              </button>
                            </div>

                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-3 min-h-[3.6rem]">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-black/[0.05] dark:border-white/[0.05]">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[9px] font-bold bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#0A84FF]/10 dark:text-[#0A84FF] px-2 py-0.5 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatedSection>
                  )
                })}
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center p-12 text-center text-zinc-500 dark:text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SearchSymbol className="w-10 h-10 text-zinc-500 dark:text-zinc-400 mb-2 shrink-0" />
                <p className="text-sm font-semibold">{t('empty')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IPadSplitView>

      {/* App Store Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border max-h-[85%] flex flex-col ${
                isDark
                  ? 'bg-[#2C2C2E] border-white/15 text-white'
                  : 'bg-white border-black/10 text-zinc-900'
              }`}
            >
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary-dark/25 shrink-0">
                <ProjectImage
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  sizes={PROJECT_IMAGE_SIZES.tabletModal}
                  priority
                  tone={theme}
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <AppCubeSymbol className="w-12 h-12 text-blue-500" />
                    </div>
                  }
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label={t('close')}
                  className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition"
                >
                  <XMarkSymbol className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                      {getCategory(selectedProject)}
                    </span>
                    {selectedProject.isFreelance && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                        <BriefcaseSymbol className="w-2.5 h-2.5 shrink-0" />
                        <span>{t('categories.freelance')}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold mt-0.5 tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {t('technologies')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-semibold bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#0A84FF]/15 dark:text-[#0A84FF] px-2.5 py-1 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-black/5 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      isDark
                        ? 'bg-white/10 hover:bg-white/15 text-white'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                    }`}
                  >
                    {t('close')}
                  </button>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#007AFF] hover:bg-blue-600 text-white flex items-center gap-1.5 shadow-sm transition active:scale-95"
                  >
                    <ArrowUpRightSymbol className="w-3.5 h-3.5" />
                    {t('openGithub')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
