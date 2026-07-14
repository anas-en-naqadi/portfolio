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
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
      label: t('common.downloadCV'),
      onClick: downloadCV,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.615 0-1.11-.474-1.12-1.09L5.85 18m11.81 0H5.85m11.81 0c.269 0 .524-.047.761-.133m-12.571 0c-.269 0-.524-.047-.761-.133M18.75 9h.008v.008H18.75V9zm-13.5 0h.008v.008H5.25V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9V5.25A2.25 2.25 0 0014.25 3h-4.5A2.25 2.25 0 007.5 5.25V9" />
        </svg>
      ),
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
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900 z-10"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4V14.15m16.5 0c0-1.22-.821-2.275-2.023-2.522l-1.307-.268A17.75 17.75 0 0012 11.25c-1.583 0-3.136.208-4.62.61l-1.307.268A2.537 2.537 0 004 14.65V14.15m16.5 0L19.5 12h-15L3.75 14.15m16.5 0H3.75M12 15.75h.008v.008H12v-.008zM15 8.25V6.75A2.25 2.25 0 0012.75 4.5h-15A2.25 2.25 0 009 6.75v1.5" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-semibold text-lg flex items-center gap-1.5">
                          {exp.company}
                          {exp.location && (
                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                              • <svg className="w-3.5 h-3.5 inline text-gray-400 dark:text-gray-500 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25C4.5 6.63 7.63 3.5 11.5 3.5s7 3.13 7 7z" />
                                </svg> {exp.location}
                            </span>
                          )}
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
