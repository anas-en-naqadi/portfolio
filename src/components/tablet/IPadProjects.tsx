'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { projects, socialLinks } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'

interface IPadProjectsProps {
  theme: 'dark' | 'light'
}

export default function IPadProjects({ theme }: IPadProjectsProps) {
  const t = useTranslations()
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const isDark = theme === 'dark'

  const sidebarBg = isDark ? 'bg-zinc-900/40' : 'bg-black/5'
  const detailBg = isDark ? 'bg-zinc-900/20' : 'bg-white/40'
  const cardBg = isDark ? 'bg-zinc-900 border-white/[0.04]' : 'bg-white border-black/[0.04]'
  const searchBg = isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
  const activeFilterBg = isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
  const hoverFilterBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'

  const filters = [
    { 
      id: 'all', 
      label: t('projects.all') || 'All Apps', 
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6a2.25 2.25 0 012.25-2.25h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 6v2.25zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-18 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
    { 
      id: 'web', 
      label: t('projects.web') || 'Web Apps', 
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
        </svg>
      )
    },
    { 
      id: 'mobile', 
      label: t('projects.mobile') || 'Mobile Apps', 
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3M12 18.75h.008v.008H12v-.008z" />
        </svg>
      )
    },
  ] as const

  const getCategory = (project: typeof projects[number]) => {
    if (project.technologies.includes('Deep Learning') || project.technologies.includes('AI')) {
      return 'Artificial Intelligence'
    } else if (project.technologies.includes('Machine Learning')) {
      return 'Machine Learning'
    } else if (project.type === 'mobile') {
      return 'iOS & Android App'
    } else if (project.technologies.includes('React.js') || project.technologies.includes('Vue.js') || project.technologies.includes('Laravel')) {
      return 'Full-Stack Web App'
    }
    return 'Developer Tools'
  }

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.type === activeFilter
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex h-full w-full overflow-hidden select-none">
      {/* LEFT Side: App Store Sidebar */}
      <div className={`w-[260px] md:w-[280px] h-full flex-shrink-0 border-r ${isDark ? 'border-white/10' : 'border-black/10'} ${sidebarBg} p-4 flex flex-col gap-5 overflow-y-auto`}>
        {/* Title */}
        <div className="px-2 pt-2">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
            App Store
          </span>
        </div>

        {/* iOS Search Bar */}
        <div className="px-1.5">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 dark:text-zinc-500 pointer-events-none">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Apps..."
              className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${searchBg}`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 dark:text-zinc-500 text-xs hover:text-zinc-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories / Filters */}
        <nav className="flex flex-col gap-1.5" aria-label="App Store Category Navigation">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.id
                  ? activeFilterBg
                  : `text-zinc-600 dark:text-zinc-400 ${hoverFilterBg}`
              }`}
            >
              <span className="text-base shrink-0">{f.icon}</span>
              <span className="truncate">{f.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* RIGHT Side: App Grid */}
      <div className={`flex-1 h-full overflow-y-auto p-6 md:p-8 ${detailBg}`}>
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Discover My Projects
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Explore featured applications, tools, and AI projects I've built.
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8"
                layout
              >
                {filteredProjects.map((project, idx) => {
                  const category = getCategory(project)
                  return (
                    <AnimatedSection key={project.title} delay={idx * 0.04}>
                      <motion.div 
                        className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group ${cardBg}`}
                        layout
                      >
                        {/* Spotlight Image */}
                        <div className="relative w-full h-40 bg-gradient-to-br from-primary/10 to-primary-dark/15 overflow-hidden flex-shrink-0">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-indigo-500/10 to-cyan-500/25 flex items-center justify-center">
                              <span className="text-3xl">🚀</span>
                            </div>
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
                                <span className="text-[9.5px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wide truncate">
                                  {category}
                                </span>
                              </div>

                              <a
                                href={socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-[#007AFF] dark:text-[#0A84FF] font-extrabold text-[10px] px-5 py-1.5 rounded-full tracking-wider active:scale-95 transition-all duration-100 flex-shrink-0 shadow-sm"
                              >
                                GET
                              </a>
                            </div>

                            <p className="text-[11.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-3">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap -mt-2 gap-1 pt-2 border-t border-black/[0.03] dark:border-white/[0.03]">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[8.5px] font-bold bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#0A84FF]/10 dark:text-[#0A84FF] px-2 py-0.5 rounded-md"
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
                className="flex flex-col items-center justify-center p-16 text-center text-zinc-400 dark:text-zinc-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg className="w-10 h-10 text-zinc-400 dark:text-zinc-650 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
                </svg>
                <p className="text-sm font-semibold">No Projects Found</p>
                <p className="text-xs mt-1">Try adjusting your search query or categories.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
