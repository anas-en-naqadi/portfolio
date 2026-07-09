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
    { icon: '💼', href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: '💻', href: socialLinks.github, label: 'GitHub' },
    { icon: '📧', href: `mailto:${personalInfo.email}`, label: 'Email' },
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

              {/* Contact Pills */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {[
                  { icon: '📍', text: personalInfo.location },
                  { icon: '📧', text: personalInfo.email },
                  { icon: '📱', text: personalInfo.phone },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon} {item.text}
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

