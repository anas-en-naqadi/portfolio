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
    { id: 'all' as ProjectFilter, icon: '🎯', label: t('projects.all') },
    { id: 'web' as ProjectFilter, icon: '🌐', label: t('projects.web') },
    { id: 'mobile' as ProjectFilter, icon: '📱', label: t('projects.mobile') },
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
        return '🌐'
      case 'mobile':
        return '📱'
      default:
        return '💻'
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
