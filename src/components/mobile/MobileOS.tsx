'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from '../shared/LanguageSwitcher'
import RecentAppsModal from './RecentAppsModal'
import { personalInfo, socialLinks, experiences, education, projects, skills } from '@/lib/data'
import { useTime } from '@/hooks/useTime'
import Image from 'next/image'
import ModernCard from '../shared/ModernCard'
import ModernBadge from '../shared/ModernBadge'
import AnimatedSection from '../shared/AnimatedSection'

type AppId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'

interface RecentApp {
  id: string
  name: string
  icon: string
  time: string
}

export default function MobileOS() {
  const t = useTranslations()
  const { timeShort, dateString } = useTime()
  const [activeApp, setActiveApp] = useState<AppId>('home')
  const [recentApps, setRecentApps] = useState<RecentApp[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRecentAppsOpen, setIsRecentAppsOpen] = useState(false)

  const openApp = (appId: AppId) => {
    setActiveApp(appId)
    
    // Add to recent apps
    const appData = {
      id: `mobile${appId.charAt(0).toUpperCase() + appId.slice(1)}`,
      name: apps.find(a => a.id === appId)?.label || appId,
      icon: apps.find(a => a.id === appId)?.icon || '📱',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    
    setRecentApps((prev) => {
      const filtered = prev.filter(a => a.id !== appData.id)
      return [appData, ...filtered].slice(0, 5)
    })
    
    setIsMenuOpen(false)
  }

  const apps = [
    { id: 'home' as AppId, icon: '🏠', label: 'Home' },
    { id: 'about' as AppId, icon: '👤', label: t('common.about') },
    { id: 'experience' as AppId, icon: '💼', label: t('common.experience') },
    { id: 'projects' as AppId, icon: '🚀', label: t('common.projects') },
    { id: 'skills' as AppId, icon: '⚡', label: t('common.skills') },
    { id: 'contact' as AppId, icon: '📧', label: t('common.contact') },
  ]

  const handleBack = () => {
    if (isRecentAppsOpen) {
      setIsRecentAppsOpen(false)
    } else if (activeApp !== 'home') {
      setActiveApp('home')
    }
  }

  const handleHome = () => {
    setActiveApp('home')
    setIsRecentAppsOpen(false)
    setIsMenuOpen(false)
  }

  const handleRecent = () => {
    setIsRecentAppsOpen(!isRecentAppsOpen)
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-primary via-primary-dark to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden flex flex-col relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/images/dark-mode.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
      
      {/* Status Bar - Enhanced */}
      <div className="h-10 bg-black/30 backdrop-blur-xl flex items-center justify-between px-5 text-white text-xs relative z-10 border-b border-white/10">
        <span className="font-bold text-sm">{timeShort}</span>
        {/* Dynamic Island for larger phones */}
        <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black/80 rounded-full hidden md:block border border-white/10" />
        <div className="flex items-center gap-2">
          <motion.span whileHover={{ scale: 1.2 }}>📶</motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>📡</motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>🔋</motion.span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeApp === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 min-h-full relative z-0"
            >
              {/* Time Widget - Enhanced */}
              <motion.div
                className="text-white mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-6xl md:text-7xl font-bold mb-3 drop-shadow-2xl">{timeShort}</div>
                <div className="text-xl md:text-2xl opacity-95 font-medium">{dateString}</div>
              </motion.div>

              {/* Profile Section - Enhanced */}
              <motion.div
                className="flex flex-col items-center text-center mb-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="relative w-36 h-36 rounded-full overflow-hidden mb-5 border-4 border-white/40 shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-full blur-xl opacity-50" />
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover relative z-10"
                  />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                  {personalInfo.name}
                </h1>
                <p className="text-xl md:text-2xl text-white/95 mb-6 font-medium">
                  {personalInfo.title}
                </p>
                <div className="flex gap-4">
                  {[
                    { href: socialLinks.github, label: 'GitHub', icon: '💻' },
                    { href: socialLinks.linkedin, label: 'LinkedIn', icon: '💼' },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/20 backdrop-blur-xl text-white rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30 shadow-lg"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="mr-2">{social.icon}</span>
                      {social.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* App Grid - Enhanced */}
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                {apps.slice(1).map((app, idx) => (
                  <motion.button
                    key={app.id}
                    onClick={() => openApp(app.id)}
                    className="flex flex-col items-center cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur-xl rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-2 shadow-xl border border-white/30"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {app.icon}
                    </motion.div>
                    <span className="text-xs md:text-sm text-white font-semibold drop-shadow-lg text-center">
                      {app.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {activeApp === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="h-full bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
            >
              <div className="bg-gradient-to-br from-primary via-primary-dark to-purple-600 text-white p-6 flex items-center gap-4 shadow-lg">
                <motion.button
                  onClick={handleBack}
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>
                <div className="text-lg font-bold">{t('common.about')}</div>
              </div>
              <div className="p-6 overflow-y-auto pb-24">
                <AnimatedSection delay={0.1}>
                  <ModernCard className="mb-6" gradient>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                        🚀
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                          {t('about.profile.title')}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {t('about.profile.description')}
                        </p>
                      </div>
                    </div>
                  </ModernCard>
                </AnimatedSection>
              </div>
            </motion.div>
          )}

          {activeApp === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="h-full bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
            >
              <div className="bg-gradient-to-br from-primary via-primary-dark to-purple-600 text-white p-6 flex items-center gap-4 shadow-lg">
                <motion.button
                  onClick={handleBack}
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>
                <div className="text-lg font-bold">{t('common.experience')}</div>
              </div>
              <div className="p-6 overflow-y-auto pb-24">
                <AnimatedSection delay={0.1}>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    {t('experience.title')}
                  </h2>
                </AnimatedSection>
                {experiences.map((exp, idx) => (
                  <AnimatedSection key={idx} delay={0.2 + idx * 0.1}>
                    <ModernCard className="mb-6" hover>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                          💼
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{exp.title}</h3>
                          <p className="text-primary font-semibold mb-3 text-sm">{exp.company} • {exp.period}</p>
                          <ul className="space-y-2 mb-4">
                            {exp.description.slice(0, 3).map((desc, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                <span className="text-primary mt-1">▸</span>
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.slice(0, 5).map((tech) => (
                              <ModernBadge key={tech} variant="primary">
                                {tech}
                              </ModernBadge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ModernCard>
                  </AnimatedSection>
                ))}
                <AnimatedSection delay={0.5}>
                  <h3 className="text-2xl font-bold mb-4 mt-8 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    {t('experience.education.title')}
                  </h3>
                </AnimatedSection>
                {education.map((edu, idx) => (
                  <AnimatedSection key={idx} delay={0.6 + idx * 0.1}>
                    <ModernCard className="mb-4" hover>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg flex-shrink-0 shadow-lg">
                          🎓
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold mb-1 text-gray-900 dark:text-white">{edu.degree}</h4>
                          <p className="text-primary text-sm mb-1 font-semibold">{edu.institution}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.period}</p>
                        </div>
                      </div>
                    </ModernCard>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          )}

          {activeApp === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="h-full bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
            >
              <div className="bg-gradient-to-br from-primary via-primary-dark to-purple-600 text-white p-6 flex items-center gap-4 shadow-lg">
                <motion.button
                  onClick={handleBack}
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>
                <div className="text-lg font-bold">{t('common.projects')}</div>
              </div>
              <div className="p-6 overflow-y-auto pb-24">
                <AnimatedSection delay={0.1}>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    {t('projects.title')}
                  </h2>
                </AnimatedSection>
                {projects.map((project, idx) => (
                  <AnimatedSection key={idx} delay={0.2 + idx * 0.1}>
                    <ModernCard className="mb-6" hover>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                          {project.type === 'web' ? '🌐' : '📱'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 6).map((tech, techIdx) => (
                              <ModernBadge
                                key={tech}
                                variant={techIdx % 2 === 0 ? 'primary' : 'info'}
                              >
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
            </motion.div>
          )}

          {activeApp === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="h-full bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
            >
              <div className="bg-gradient-to-br from-primary via-primary-dark to-purple-600 text-white p-6 flex items-center gap-4 shadow-lg">
                <motion.button
                  onClick={handleBack}
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>
                <div className="text-lg font-bold">{t('common.skills')}</div>
              </div>
              <div className="p-6 overflow-y-auto pb-24">
                <AnimatedSection delay={0.1}>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    {t('skills.title')}
                  </h2>
                </AnimatedSection>
                {[
                  { title: t('skills.languages'), items: skills.languages, icon: '💻' },
                  { title: t('skills.frameworks'), items: skills.frameworks, icon: '⚛️' },
                  { title: t('skills.databases'), items: skills.databases, icon: '🗄️' },
                  { title: t('skills.libraries'), items: skills.libraries, icon: '📚' },
                ].map((category, idx) => (
                  <AnimatedSection key={idx} delay={0.2 + idx * 0.1}>
                    <ModernCard className="mb-4" hover>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-lg flex-shrink-0 shadow-lg">
                          {category.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, skillIdx) => (
                          <ModernBadge
                            key={skill}
                            variant={skillIdx % 2 === 0 ? 'primary' : 'info'}
                          >
                            {skill}
                          </ModernBadge>
                        ))}
                      </div>
                    </ModernCard>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          )}

          {activeApp === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="h-full bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
            >
              <div className="bg-gradient-to-br from-primary via-primary-dark to-purple-600 text-white p-6 flex items-center gap-4 shadow-lg">
                <motion.button
                  onClick={handleBack}
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>
                <div className="text-lg font-bold">{t('common.contact')}</div>
              </div>
              <div className="p-6 overflow-y-auto pb-24">
                <AnimatedSection delay={0.1}>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    {t('contact.title')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {t('contact.description')}
                  </p>
                </AnimatedSection>
                {[
                  { icon: '📧', title: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, gradient: 'from-blue-500 to-cyan-600' },
                  { icon: '📱', title: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, gradient: 'from-green-500 to-emerald-600' },
                  { icon: '💼', title: 'LinkedIn', value: 'anas-en-naqadi', href: socialLinks.linkedin, gradient: 'from-blue-600 to-indigo-700', external: true },
                  { icon: '💻', title: 'GitHub', value: 'anas-en-naqadi', href: socialLinks.github, gradient: 'from-gray-700 to-gray-900', external: true },
                ].map((method, idx) => (
                  <AnimatedSection key={idx} delay={0.2 + idx * 0.1}>
                    <motion.a
                      href={method.href}
                      target={method.external ? '_blank' : undefined}
                      rel={method.external ? 'noopener noreferrer' : undefined}
                      className="block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ModernCard className="mb-4" hover>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{method.title}</h3>
                            <p className="text-primary font-semibold text-sm">{method.value}</p>
                          </div>
                          {method.external && (
                            <span className="text-gray-400">↗</span>
                          )}
                        </div>
                      </ModernCard>
                    </motion.a>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex items-center justify-around">
        <button
          onClick={handleBack}
          className="flex flex-col items-center gap-1 p-2 text-gray-600 dark:text-gray-400"
        >
          <span className="text-2xl">‹</span>
        </button>
        <button
          onClick={handleHome}
          className={`flex flex-col items-center gap-1 p-2 ${
            activeApp === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <span className="text-2xl">•</span>
        </button>
        <button
          onClick={handleRecent}
          className="flex flex-col items-center gap-1 p-2 text-gray-600 dark:text-gray-400"
        >
          <span className="text-2xl">⋯</span>
        </button>
      </div>

      {/* Recent Apps Modal */}
      <RecentAppsModal
        isOpen={isRecentAppsOpen}
        apps={recentApps}
        onClose={() => setIsRecentAppsOpen(false)}
        onOpenApp={(appId) => {
          const appName = appId.replace('mobile', '').toLowerCase() as AppId
          setActiveApp(appName)
          setIsRecentAppsOpen(false)
        }}
        onRemoveApp={(appId) => {
          setRecentApps((prev) => prev.filter((app) => app.id !== appId))
        }}
        onCloseAll={() => {
          setRecentApps([])
          setIsRecentAppsOpen(false)
        }}
      />
    </div>
  )
}
