'use client'

import { experiences, education, personalInfo } from '@/lib/data'
import { useTranslations } from 'next-intl'
import ModernCard from '@/components/shared/ModernCard'
import ModernBadge from '@/components/shared/ModernBadge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import WindowToolbar from '@/components/shared/WindowToolbar'
import { motion } from 'framer-motion'

export default function ExperienceWindow() {
  const t = useTranslations()

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = personalInfo.cvPath
    link.download = 'Anas_En-Naqadi_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const printWindow = () => {
    window.print()
  }

  const toolbarButtons = [
    {
      icon: '📥',
      label: t('common.downloadCV'),
      onClick: downloadCV,
    },
    {
      icon: '🖨️',
      label: 'Print',
      onClick: printWindow,
    },
  ]

  return (
    <>
      <WindowToolbar buttons={toolbarButtons} />
      <div className="p-6 md:p-8 overflow-y-auto h-full">
        {/* Header */}
        <AnimatedSection delay={0.1}>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {t('experience.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">My professional journey and achievements</p>
          </div>
        </AnimatedSection>

        {/* Professional Experience - Timeline */}
        <div className="space-y-6 mb-12">
          {experiences.map((exp, idx) => (
            <AnimatedSection key={idx} delay={0.2 + idx * 0.1}>
              <ModernCard className="relative overflow-hidden" hover>
                {/* Timeline Connector */}
                {idx < experiences.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent opacity-30" />
                )}
                
                <div className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-2xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      💼
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-semibold text-lg">
                          {exp.company}
                        </p>
                      </div>
                      <motion.div
                        className="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg border border-primary/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="text-sm font-medium text-primary">{exp.period}</p>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2.5 mb-5">
                      {exp.description.map((desc, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 + i * 0.05 }}
                        >
                          <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                          <span className="leading-relaxed">{desc}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIdx) => (
                        <ModernBadge key={techIdx} variant="primary">
                          {tech}
                        </ModernBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </ModernCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Education Section */}
        <AnimatedSection delay={0.5}>
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {t('experience.education.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Academic background and qualifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <AnimatedSection key={idx} delay={0.6 + idx * 0.1}>
                <ModernCard className="relative" hover>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                      🎓
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-semibold mb-2 text-sm">
                        {edu.institution}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {edu.period}
                      </p>
                    </div>
                  </div>
                </ModernCard>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}
