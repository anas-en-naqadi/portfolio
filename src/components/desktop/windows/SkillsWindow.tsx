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
      icon: '💻',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-400/30',
    },
    { 
      title: t('skills.frameworks'), 
      items: skills.frameworks,
      icon: '⚛️',
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-400/30',
    },
    { 
      title: t('skills.libraries'), 
      items: skills.libraries,
      icon: '📚',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-400/30',
    },
    { 
      title: t('skills.databases'), 
      items: skills.databases,
      icon: '🗄️',
      gradient: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-400/30',
    },
    { 
      title: t('skills.methodologies'), 
      items: skills.methodologies,
      icon: '🔄',
      gradient: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-400/30',
    },
    { 
      title: t('skills.tools'), 
      items: skills.tools,
      icon: '🛠️',
      gradient: 'from-yellow-500/20 to-amber-500/20',
      border: 'border-yellow-400/30',
    },
  ]

  const toolbarButtons = [
    {
      icon: '📊',
      label: 'Show All',
      onClick: () => setSkillLevel('all'),
    },
    {
      icon: '⭐',
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
                🌍
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
