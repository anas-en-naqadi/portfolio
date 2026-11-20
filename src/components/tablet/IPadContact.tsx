'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import IPadSplitView, { getIPadSidebarItemClasses } from './IPadSplitView'
import {
  CheckmarkSymbol,
  CopySymbol,
  EnvelopeSymbol,
  GitHubGlyphSymbol,
  LinkedInGlyphSymbol,
  PhoneFillSymbol,
} from '../shared/SFSymbols'

interface IPadContactProps {
  theme: 'dark' | 'light'
}

type MailId = 'github' | 'linkedin' | 'email' | 'phone'

export default function IPadContact({ theme }: IPadContactProps) {
  const locale = useLocale()
  const t = useTranslations('tablet.contact')
  const { personalInfo } = getLocalizedPortfolioData(locale)
  const [activeMailId, setActiveMailId] = useState<MailId>('email')
  const [copied, setCopied] = useState(false)
  const isDark = theme === 'dark'

  const detailBg = isDark ? 'bg-[#1C1C1E]' : 'bg-white'
  const { active: activeMailBg, inactive: hoverMailBg } = getIPadSidebarItemClasses(theme)
  const emailBodyBg = isDark ? 'bg-[#2C2C2E] border-white/[0.08]' : 'bg-gray-50 border-black/5'

  const mailList = [
    {
      id: 'email' as const,
      sender: t('channels.email.sender'),
      address: personalInfo.email,
      avatarText: 'EM',
      subject: t('channels.email.subject'),
      body: t('channels.email.body'),
      href: `mailto:${personalInfo.email}`,
      actionLabel: t('sendEmail'),
      external: false,
    },
    {
      id: 'github' as const,
      sender: t('channels.github.sender'),
      address: 'github.com/anas-en-naqadi',
      avatarText: 'GH',
      subject: t('channels.github.subject'),
      body: t('channels.github.body'),
      href: process.env.NEXT_PUBLIC_GITHUB_URL || socialLinks.github,
      actionLabel: t('openLink'),
      external: true,
    },
    {
      id: 'linkedin' as const,
      sender: t('channels.linkedin.sender'),
      address: 'linkedin.com/in/anas-en-naqadi',
      avatarText: 'LN',
      subject: t('channels.linkedin.subject'),
      body: t('channels.linkedin.body'),
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || socialLinks.linkedin,
      actionLabel: t('openLink'),
      external: true,
    },
    {
      id: 'phone' as const,
      sender: t('channels.phone.sender'),
      address: personalInfo.phone,
      avatarText: 'PH',
      subject: t('channels.phone.subject'),
      body: t('channels.phone.body'),
      href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`,
      actionLabel: t('callNow'),
      external: false,
    },
  ]

  const activeMail = mailList.find((m) => m.id === activeMailId) || mailList[0]

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API fallback ignored safely
    }
  }

  const inboxThreads = (
    <div className="ipad-sidebar-nav">
      {mailList.map((mail) => (
        <button
          key={mail.id}
          type="button"
          onClick={() => setActiveMailId(mail.id)}
          className={`text-left rtl:text-right px-3.5 py-2 sm:p-3.5 rounded-xl transition-all duration-200 flex gap-2.5 items-center sm:items-start shrink-0 ${
            activeMailId === mail.id ? activeMailBg : hoverMailBg
          }`}
        >
          <span
            className={`ipad-desktop-only w-2 h-2 rounded-full bg-[#007AFF] mt-1.5 flex-shrink-0 transition-opacity duration-300 ${
              activeMailId === mail.id ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <div className="min-w-0 flex flex-col gap-0.5">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap sm:truncate">
              {mail.sender}
            </h3>
            <h4 className="ipad-desktop-block text-[11px] font-bold text-gray-700 dark:text-gray-300 truncate">
              {mail.subject}
            </h4>
            <p className="ipad-desktop-clamp-2 text-[10.5px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5 leading-snug">
              {mail.body}
            </p>
          </div>
        </button>
      ))}
    </div>
  )

  const copyActionButton = (
    <button
      type="button"
      onClick={handleCopyEmail}
      className="text-xs text-blue-500 font-bold hover:underline flex items-center gap-1 whitespace-nowrap"
    >
      {copied ? <CheckmarkSymbol className="w-3.5 h-3.5" /> : <CopySymbol className="w-3.5 h-3.5" />}
      {copied ? t('copied') : t('copyInfo')}
    </button>
  )

  return (
    <IPadSplitView
      theme={theme}
      sidebarTitle={t('inbox')}
      sidebarContent={inboxThreads}
      detailTitle={activeMail.sender}
      detailHeaderRight={copyActionButton}
      detailBgClass={detailBg}
      detailPaddingClass="p-4 sm:p-6 md:p-10 flex flex-col"
    >
      <AnimatePresence mode="wait">
          <motion.div
            key={activeMail.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="max-w-3xl w-full mx-auto flex flex-col gap-5 sm:gap-6"
          >
            <div className="border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {activeMail.subject}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 font-extrabold text-sm flex items-center justify-center shadow-inner shrink-0">
                {activeMail.avatarText}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight truncate">
                  {activeMail.sender}
                </h3>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold truncate select-text">
                  {activeMail.address}
                </div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 font-medium truncate">
                  {personalInfo.name} &lt;{personalInfo.email}&gt;
                </div>
              </div>
            </div>

            <div className={`p-5 sm:p-6 rounded-2xl border leading-relaxed text-sm text-zinc-700 dark:text-zinc-300 flex flex-col gap-6 shadow-inner ${emailBodyBg}`}>
              <p className="font-medium whitespace-pre-line leading-relaxed select-text">
                {activeMail.body}
              </p>

              <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.05] flex flex-wrap gap-3">
                <a
                  href={activeMail.href}
                  target={activeMail.external ? '_blank' : undefined}
                  rel={activeMail.external ? 'noopener noreferrer' : undefined}
                  className="px-6 py-3 rounded-2xl bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] transition-all text-white font-bold text-xs shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 min-w-[180px]"
                >
                  {activeMail.id === 'phone' && (
                    <PhoneFillSymbol className="w-4 h-4 text-white shrink-0" />
                  )}
                  {activeMail.id === 'email' && (
                    <EnvelopeSymbol className="w-4 h-4 text-white shrink-0" />
                  )}
                  {activeMail.id === 'github' && (
                    <GitHubGlyphSymbol className="w-4 h-4 text-white shrink-0" />
                  )}
                  {activeMail.id === 'linkedin' && (
                    <LinkedInGlyphSymbol className="w-4 h-4 text-white shrink-0" />
                  )}
                  {activeMail.actionLabel}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
    </IPadSplitView>
  )
}
