'use client'

import { personalInfo, socialLinks } from '@/lib/data'
import { useTranslations } from 'next-intl'
import ModernCard from '@/components/shared/ModernCard'
import AnimatedSection from '@/components/shared/AnimatedSection'
import WindowToolbar from '@/components/shared/WindowToolbar'
import { motion } from 'framer-motion'

export default function ContactWindow() {
  const t = useTranslations()

  const copyContactInfo = () => {
    const contactText = `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLocation: ${personalInfo.location}\nLinkedIn: ${socialLinks.linkedin}\nGitHub: ${socialLinks.github}`
    navigator.clipboard.writeText(contactText)
    alert('Contact info copied to clipboard!')
  }

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${personalInfo.name}
TITLE:${personalInfo.title}
EMAIL:${personalInfo.email}
TEL:${personalInfo.phone}
ADR:;;${personalInfo.location};;;
URL:${socialLinks.linkedin}
URL:${socialLinks.github}
END:VCARD`
    
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${personalInfo.name.replace(/\s+/g, '_')}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const toolbarButtons = [
    {
      icon: '📋',
      label: 'Copy Contact',
      onClick: copyContactInfo,
    },
    {
      icon: '💳',
      label: 'Save VCard',
      onClick: downloadVCard,
    },
  ]

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      gradient: 'from-blue-500 to-cyan-600',
      description: 'Send me an email anytime',
    },
    {
      icon: '📱',
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Available for calls',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'anas-en-naqadi',
      href: socialLinks.linkedin,
      gradient: 'from-blue-600 to-indigo-700',
      description: 'Connect professionally',
      external: true,
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'anas-en-naqadi',
      href: socialLinks.github,
      gradient: 'from-gray-700 to-gray-900',
      description: 'View my code',
      external: true,
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
              {t('contact.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('contact.description')}
            </p>
          </div>
        </AnimatedSection>

        {/* Location Card */}
        <AnimatedSection delay={0.2}>
          <ModernCard className="mb-8" gradient>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                📍
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {t('contact.location.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  {personalInfo.location}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('contact.location.available')} • {t('contact.location.timezone')}: {personalInfo.timezone}
                </p>
              </div>
            </div>
          </ModernCard>
        </AnimatedSection>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, idx) => (
            <AnimatedSection key={idx} delay={0.3 + idx * 0.1}>
              <motion.a
                href={method.href}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                className="block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ModernCard className="h-full group cursor-pointer" hover>
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {method.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-primary font-semibold mb-1 truncate">
                        {method.value}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {method.description}
                      </p>
                    </div>
                    {method.external && (
                      <motion.div
                        className="text-gray-400 group-hover:text-primary transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        ↗
                      </motion.div>
                    )}
                  </div>
                </ModernCard>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection delay={0.7}>
          <ModernCard className="mt-8 bg-gradient-to-br from-primary/10 via-primary-dark/10 to-transparent border-2 border-primary/30">
            <div className="text-center">
              <motion.div
                className="text-5xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Let's Build Something Amazing Together!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to bring your vision to life.
              </p>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </ModernCard>
        </AnimatedSection>
      </div>
    </>
  )
}
