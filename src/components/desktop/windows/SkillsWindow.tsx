'use client'

import { useState } from 'react'
import { skills } from '@/lib/data'
import { useTranslations } from 'next-intl'
import ModernCard from '@/components/shared/ModernCard'
import ModernBadge from '@/components/shared/ModernBadge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import WindowToolbar from '@/components/shared/WindowToolbar'
import { motion } from 'framer-motion'

type SkillLevel = 'all' | 'expert'

export default function SkillsWindow() {
  const t = useTranslations()
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('all')

  const skillCategories = [
    { 
      title: t('skills.languages'), 
      items: skills.languages,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25M7.5 12h9" />
        </svg>
      ),
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-400/30',
    },
    { 
      title: t('skills.frameworks'), 
      items: skills.frameworks,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.827m11.379-8.16l1.15-.827m-13.684.513l1.41.513m14.095 5.13l1.41.513M5.106 6.215l1.15.827m11.379 8.16l1.15.827" />
        </svg>
      ),
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-400/30',
    },
    { 
      title: t('skills.libraries'), 
      items: skills.libraries,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      gradient: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-400/30',
    },
    { 
      title: t('skills.databases'), 
      items: skills.databases,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
      gradient: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-400/30',
    },
    { 
      title: t('skills.methodologies'), 
      items: skills.methodologies,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      gradient: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-400/30',
    },
    { 
      title: t('skills.tools'), 
      items: skills.tools,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m0 0a2.91 2.91 0 11-4.14-4.14m4.14 4.14l-5.83 5.83m-1.5-1.5L3 17.25A2.652 2.652 0 006.75 21l3.83-3.83m-3.83-3.83l3.83-3.83M9.42 10.42l3.83-3.83" />
        </svg>
      ),
      gradient: 'from-yellow-500/20 to-amber-500/20',
      border: 'border-yellow-400/30',
    },
  ]

  const toolbarButtons = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      label: 'Show All',
      onClick: () => setSkillLevel('all'),
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.427.683-.694 1.139-.548.456.147.669.605.548 1.059L12.013 7.3a1.536 1.536 0 001.077 1.076l3.874.56c.456.066.638.62.308.943l-2.8 2.73a1.536 1.536 0 00-.442 1.36l.66 3.862c.078.456-.399.803-.807.588l-3.464-1.821a1.536 1.536 0 00-1.442 0l-3.464 1.821c-.408.215-.885-.132-.807-.588l.66-3.862a1.536 1.536 0 00-.442-1.36L2.9 11.233c-.33-.323-.148-.877.308-.943l3.874-.56A1.536 1.536 0 008.16 8.36L9.897 4.81c.121-.454.535-.733.957-.597.423.136.626.58.548.971L11.48 3.5z" />
        </svg>
      ),
      label: 'Expert',
      onClick: () => setSkillLevel('expert'),
    },
  ]

  const badgeVariants: Array<'primary' | 'success' | 'warning' | 'info'> = [
    'primary',
    'success',
    'warning',
    'info',
  ]

  return (
    <>
      <WindowToolbar buttons={toolbarButtons} />
      <div className="p-6 md:p-8 overflow-y-auto h-full">
        {/* Header */}
        <AnimatedSection delay={0.1}>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {t('skills.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Technical expertise and professional capabilities
            </p>
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {skillCategories.map((category, idx) => (
            <AnimatedSection key={idx} delay={0.2 + idx * 0.1}>
              <ModernCard
                className={`bg-gradient-to-br ${category.gradient} border ${category.border}`}
                hover
              >
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-2xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIdx) => (
                    <ModernBadge
                      key={skill}
                      variant={badgeVariants[skillIdx % badgeVariants.length]}
                    >
                      {skill}
                    </ModernBadge>
                  ))}
                </div>
              </ModernCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Languages Spoken */}
        <AnimatedSection delay={0.8}>
          <ModernCard className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.987 8.987 0 01-5.877-2.123m5.877 2.123c.316 0 .628-.027.933-.078m-6.81-2.045A9.002 9.002 0 0112 3.75M3.75 12h16.5M12 3.75a8.967 8.967 0 00-6 2.292M12 3.75a8.967 8.967 0 016 2.292M3.75 12a8.966 8.966 0 012.292-6M20.25 12a8.966 8.966 0 00-2.292-6" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('skills.spoken')}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.languages_spoken.map((lang, idx) => (
                <motion.div
                  key={lang.language}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ModernBadge variant="info" className="text-sm">
                    <span className="font-bold">{lang.language}</span>
                    <span className="ml-2 opacity-80">({lang.level})</span>
                  </ModernBadge>
                </motion.div>
              ))}
            </div>
          </ModernCard>
        </AnimatedSection>
      </div>
    </>
  )
}
