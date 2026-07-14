'use client'

import { personalInfo, socialLinks } from '@/lib/data'
import { useTranslations } from 'next-intl'
import WindowToolbar from '@/components/shared/WindowToolbar'
import ModernCard from '@/components/shared/ModernCard'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutWindow() {
  const t = useTranslations()

  const shareWindow = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${personalInfo.name} - Portfolio`,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = personalInfo.cvPath
    link.download = 'Anas_En-Naqadi_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toolbarButtons = [
    {
      icon: '📤',
      label: 'Share',
      onClick: shareWindow,
    },
    {
      icon: '💾',
      label: 'Save',
      onClick: downloadCV,
    },
  ]

  const expertise = [
    {
      icon: '💻',
      title: t('about.expertise.fullstack.title'),
      description: t('about.expertise.fullstack.description'),
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-400/30',
    },
    {
      icon: '⚡',
      title: t('about.expertise.performance.title'),
      description: t('about.expertise.performance.description'),
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-400/30',
    },
    {
      icon: '🎨',
      title: t('about.expertise.design.title'),
      description: t('about.expertise.design.description'),
      gradient: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-400/30',
    },
  ]

  const socialIcons = [
    { 
      icon: (
        <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ), 
      href: socialLinks.linkedin, 
      label: 'LinkedIn' 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ), 
      href: socialLinks.github, 
      label: 'GitHub' 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ), 
      href: `mailto:${personalInfo.email}`, 
      label: 'Email' 
    },
  ]

  return (
    <>
      <WindowToolbar buttons={toolbarButtons} />
      <div className="p-6 md:p-8 overflow-y-auto h-full">
        {/* Hero Section - Modern Glassmorphism */}
        <AnimatedSection delay={0.1}>
          <motion.div
            className="relative overflow-hidden rounded-3xl mb-8"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-purple-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('/images/dark-mode.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
            <div className="relative p-10 md:p-12 text-white">
              {/* Profile Image with Glow */}
              <motion.div
                className="relative w-32 h-32 mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-full blur-2xl opacity-50" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Name & Title */}
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {personalInfo.name}
              </motion.h1>
              <p className="text-xl md:text-2xl text-center mb-8 text-white/90 font-medium">
                {personalInfo.subtitle}
              </p>

              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {[
                  { 
                    icon: (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25C4.5 6.63 7.63 3.5 11.5 3.5s7 3.13 7 7z" />
                      </svg>
                    ),
                    text: personalInfo.location 
                  },
                  { 
                    icon: (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    text: personalInfo.email 
                  },
                  { 
                    icon: (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3M12 18.75h.008v.008H12v-.008z" />
                      </svg>
                    ),
                    text: personalInfo.phone 
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon} <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center">
                {socialIcons.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all"
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Professional Profile - Modern Card */}
        <AnimatedSection delay={0.2}>
          <ModernCard className="mb-8" gradient>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                🚀
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  {t('about.profile.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {t('about.profile.description')}
                </p>
              </div>
            </div>
          </ModernCard>
        </AnimatedSection>

        {/* Expertise Grid - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expertise.map((item, idx) => (
            <AnimatedSection key={idx} delay={0.3 + idx * 0.1}>
              <ModernCard
                className={`bg-gradient-to-br ${item.gradient} border ${item.border} hover:scale-105 transition-transform duration-300`}
                hover
              >
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </ModernCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </>
  )
}

