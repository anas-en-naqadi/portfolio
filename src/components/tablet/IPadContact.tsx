'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { personalInfo, socialLinks } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'

interface IPadContactProps {
  theme: 'dark' | 'light'
}

type MailId = 'github' | 'linkedin' | 'email' | 'phone'

export default function IPadContact({ theme }: IPadContactProps) {
  const t = useTranslations()
  const [activeMailId, setActiveMailId] = useState<MailId>('github')
  const isDark = theme === 'dark'

  const sidebarBg = isDark ? 'bg-zinc-900/40' : 'bg-black/5'
  const detailBg = isDark ? 'bg-[#1C1C1E]' : 'bg-white'
  const activeMailBg = isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
  const hoverMailBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
  const emailBodyBg = isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-gray-50 border-black/5'

  const mailList = [
    { 
      id: 'github',
      sender: 'GitHub Team',
      email: 'noreply@github.com',
      avatarText: 'GH',
      subject: 'Portfolio & Code Repositories', 
      date: '10:24 AM',
      body: 'Hi Anas, I took a look at your portfolio and code repositories. You have developed some incredible web products and AI-powered interfaces. Let\'s check out the rest of your contributions and build something together.', 
      href: process.env.NEXT_PUBLIC_GITHUB_URL || socialLinks.github, 
      actionLabel: 'View GitHub Profile',
      external: true 
    },
    { 
      id: 'linkedin',
      sender: 'LinkedIn Member',
      email: 'notifications@linkedin.com',
      avatarText: 'LN',
      subject: 'Professional Connection Proposal', 
      date: 'Yesterday',
      body: 'Hi Anas, I would love to connect with you professionally on LinkedIn. Let\'s keep in touch to discuss potential freelance collaboration, contract projects, or full-time opportunities in Full-Stack development and AI engineering.', 
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || socialLinks.linkedin, 
      actionLabel: 'Connect on LinkedIn',
      external: true 
    },
    { 
      id: 'email',
      sender: 'Collaboration Inquiry',
      email: personalInfo.email,
      avatarText: 'EM',
      subject: 'New Project Collaboration Inquiry', 
      date: 'Friday',
      body: 'Dear Anas, we would like to schedule an inquiry regarding a new project collaboration. Please feel free to reply directly to this mail so that we can arrange an introductory call or discuss budget estimations and timelines.', 
      href: `mailto:${personalInfo.email}`,
      actionLabel: 'Compose Direct Email'
    },
    { 
      id: 'phone',
      sender: 'Inquiry Coordinator',
      email: 'scheduling@telephony.com',
      avatarText: 'PH',
      subject: 'Direct Phone Inquiries & Scheduling', 
      date: '05/07/2026',
      body: 'Hello Anas, for immediate consulting inquires, budget pricing, or direct call scheduling, please dial my mobile phone number directly. Looking forward to speaking with you.', 
      href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`,
      actionLabel: 'Call Anas Directly'
    },
  ] as const

  const activeMail = mailList.find((m) => m.id === activeMailId) || mailList[0]

  return (
    <div className="flex h-full w-full overflow-hidden select-none">
      {/* LEFT Side: Apple Mail Inbox list */}
      <div className={`w-[280px] md:w-[320px] h-full flex-shrink-0 border-r ${isDark ? 'border-white/10' : 'border-black/10'} ${sidebarBg} p-4 flex flex-col gap-4 overflow-y-auto`}>
        {/* Title */}
        <div className="px-2 pt-2 pb-1 flex justify-between items-center">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
            Inbox
          </span>
          <span className="text-[10px] text-blue-500 font-bold hover:underline cursor-pointer">
            Edit
          </span>
        </div>

        {/* Mail inbox items list */}
        <div className="flex flex-col gap-0.5">
          {mailList.map((mail, idx) => (
            <button
              key={mail.id}
              onClick={() => setActiveMailId(mail.id as MailId)}
              className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 flex gap-2.5 items-start ${
                activeMailId === mail.id
                  ? activeMailBg
                  : hoverMailBg
              }`}
            >
              {/* Blue Unread Dot */}
              <span className={`w-2.5 h-2.5 rounded-full bg-[#007AFF] mt-1.5 flex-shrink-0 transition-opacity duration-300 ${
                activeMailId === mail.id ? 'opacity-0' : 'opacity-100'
              }`} />
              
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {mail.sender}
                  </h3>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-semibold shrink-0">
                    {mail.date}
                  </span>
                </div>
                <h4 className="text-[11px] font-bold text-gray-700 dark:text-gray-300 truncate">
                  {mail.subject}
                </h4>
                <p className="text-[10.5px] text-zinc-450 dark:text-zinc-500 font-medium line-clamp-2 mt-0.5 leading-snug">
                  {mail.body}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT Side: Mail Message Detail Panel */}
      <div className={`flex-1 h-full overflow-y-auto p-6 md:p-10 flex flex-col ${detailBg}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMail.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl w-full mx-auto flex flex-col gap-6"
          >
            {/* Subject Header */}
            <div className="border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {activeMail.subject}
              </h1>
            </div>

            {/* Sender / Recipient Card */}
            <div className="flex items-center gap-4.5">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 font-extrabold text-sm flex items-center justify-center shadow-inner">
                {activeMail.avatarText}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                    {activeMail.sender}
                  </h3>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold">
                    {activeMail.date}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-semibold truncate">
                  <span>From:</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-bold">{activeMail.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-semibold">
                  <span>To:</span>
                  <span className="font-bold">Anas En-Naqadi &lt;me@anas.dev&gt;</span>
                </div>
              </div>
            </div>

            {/* Styled Email Body Box */}
            <div className={`p-6 rounded-2.5xl border leading-relaxed text-sm text-zinc-700 dark:text-zinc-350 flex flex-col gap-6 shadow-inner ${emailBodyBg}`}>
              <p className="font-medium whitespace-pre-line leading-relaxed">
                {activeMail.body}
              </p>
              
              <div className="pt-2 border-t border-black/[0.03] dark:border-white/[0.03] flex flex-col gap-2">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Quick Action
                </span>
                
                <a
                  href={activeMail.href}
                  target={activeMail.external ? '_blank' : undefined}
                  rel={activeMail.external ? 'noopener noreferrer' : undefined}
                  className="px-6 py-3 rounded-2xl bg-[#007AFF] hover:bg-blue-600 active:scale-98 transition-all text-white font-bold text-xs shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 self-start min-w-[200px]"
                >
                  {activeMail.id === 'phone' && (
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.08-.24c1.22.4 2.52.61 3.86.61a1 1 0 011 1v3.5a1 1 0 01-1 1A16 16 0 013 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.34.2 2.64.61 3.86a1 1 0 01-.24 1.08l-2.2 2.2z" />
                    </svg>
                  )}
                  {activeMail.id === 'email' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  )}
                  {activeMail.id === 'github' && (
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  )}
                  {activeMail.id === 'linkedin' && (
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {activeMail.actionLabel}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
