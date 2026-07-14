'use client'

import { useState } from 'react'
import { projects } from '@/lib/data'
import { useTranslations } from 'next-intl'
import ModernCard from '@/components/shared/ModernCard'
import ModernBadge from '@/components/shared/ModernBadge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import WindowToolbar from '@/components/shared/WindowToolbar'
import { motion } from 'framer-motion'

type ProjectFilter = 'all' | 'web' | 'mobile'

export default function ProjectsWindow() {
  const t = useTranslations()
  const [filter, setFilter] = useState<ProjectFilter>('all')

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true
    return project.type === filter
  })

  const filterButtons = [
    { 
      id: 'all' as ProjectFilter, 
      icon: (
        <svg className="w-4 h-4 inline-block align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
        </svg>
      ), 
      label: t('projects.all') 
    },
    { 
      id: 'web' as ProjectFilter, 
      icon: (
        <svg className="w-4 h-4 inline-block align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
        </svg>
      ), 
      label: t('projects.web') 
    },
    { 
      id: 'mobile' as ProjectFilter, 
      icon: (
        <svg className="w-4 h-4 inline-block align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3M12 18.75h.008v.008H12v-.008z" />
        </svg>
      ), 
      label: t('projects.mobile') 
    },
  ]

  const toolbarButtons = filterButtons.map((btn) => ({
    icon: btn.icon,
    label: btn.label,
    onClick: () => setFilter(btn.id),
    active: filter === btn.id,
  }))

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'web':
        return (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
          </svg>
        )
      case 'mobile':
        return (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3M12 18.75h.008v.008H12v-.008z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25M7.5 12h9" />
          </svg>
        )
    }
  }

  return (
    <>
      <WindowToolbar buttons={toolbarButtons} />
      <div className="p-6 md:p-8 overflow-y-auto h-full">
        {/* Header with Filter Pills */}
        <AnimatedSection delay={0.1}>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {t('projects.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Showcasing innovative solutions and creative implementations
            </p>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {filterButtons.map((btn) => (
                <motion.button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                    ${filter === btn.id
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{btn.icon}</span>
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <AnimatedSection key={idx} delay={0.2 + idx * 0.1}>
              <ModernCard className="h-full flex flex-col group" hover>
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-2xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {getProjectIcon(project.type)}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {project.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                        {project.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {project.technologies.slice(0, 6).map((tech, techIdx) => (
                    <ModernBadge
                      key={techIdx}
                      variant={techIdx % 2 === 0 ? 'primary' : 'info'}
                    >
                      {tech}
                    </ModernBadge>
                  ))}
                  {project.technologies.length > 6 && (
                    <ModernBadge variant="warning">
                      +{project.technologies.length - 6} more
                    </ModernBadge>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-dark/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                />
              </ModernCard>
            </AnimatedSection>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <AnimatedSection delay={0.3}>
            <ModernCard className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No {filter === 'all' ? '' : filter} projects found
              </p>
            </ModernCard>
          </AnimatedSection>
        )}
      </div>
    </>
  )
}
