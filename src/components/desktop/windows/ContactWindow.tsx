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
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75m9.75 9h3.375c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9H10.5a1.125 1.125 0 00-1.125 1.125V6.75" />
        </svg>
      ),
      label: 'Copy Contact',
      onClick: copyContactInfo,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-19.5 8.25h3m-3 0h1.5m10.125-3h4.875M3.75 6h16.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 18V7.5A1.5 1.5 0 013.75 6z" />
        </svg>
      ),
      label: 'Save VCard',
      onClick: downloadVCard,
    },
  ]

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      gradient: 'from-blue-500 to-cyan-600',
      description: 'Send me an email anytime',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3M12 18.75h.008v.008H12v-.008z" />
        </svg>
      ),
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Available for calls',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      title: 'LinkedIn',
      value: 'anas-en-naqadi',
      href: socialLinks.linkedin,
      gradient: 'from-blue-600 to-indigo-700',
      description: 'Connect professionally',
      external: true,
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
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
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25C4.5 6.63 7.63 3.5 11.5 3.5s7 3.13 7 7z" />
                </svg>
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
