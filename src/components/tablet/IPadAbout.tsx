'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { personalInfo, socialLinks } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'

interface IPadAboutProps {
  theme: 'dark' | 'light'
}

type TabId = 'contact' | 'bio' | 'expertise'

export default function IPadAbout({ theme }: IPadAboutProps) {
  const t = useTranslations()
  const [activeTab, setActiveTab] = useState<TabId>('contact')
  const isDark = theme === 'dark'

  const sidebarBg = isDark ? 'bg-zinc-900/40' : 'bg-black/5'
  const detailBg = isDark ? 'bg-zinc-900/20' : 'bg-white/40'
  const activeTabBg = isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
  const hoverTabBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'

  const sidebarTabs = [
    { 
      id: 'contact', 
      label: 'Contact Info', 
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ) 
    },
    { 
      id: 'bio', 
      label: 'Personal Bio', 
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ) 
    },
    { 
      id: 'expertise', 
      label: 'Expertise Focus', 
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.869l.214-1.28z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ]

  const expertiseList = [
    {
      icon: '💻',
      title: t('about.expertise.fullstack.title'),
      description: t('about.expertise.fullstack.description'),
      gradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-400/20',
    },
    {
      icon: '🤖',
      title: t('about.expertise.performance.title'),
      description: t('about.expertise.performance.description'),
      gradient: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-400/20',
    },
    {
      icon: '🎨',
      title: t('about.expertise.design.title'),
      description: t('about.expertise.design.description'),
      gradient: 'from-indigo-500/10 to-purple-500/10',
      border: 'border-indigo-400/20',
    },
  ]

  return (
    <div className="flex h-full w-full overflow-hidden select-none">
      {/* LEFT Side: Apple Mac/iPad style Sidebar */}
      <div className={`w-[260px] md:w-[280px] h-full flex-shrink-0 border-r ${isDark ? 'border-white/10' : 'border-black/10'} ${sidebarBg} p-4 flex flex-col gap-4 overflow-y-auto`}>
        <div className="px-2 pt-2 pb-1">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
            About Me
          </span>
        </div>

        <nav className="flex flex-col gap-1.5" aria-label="Sidebar navigation">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? activeTabBg
                  : `text-zinc-600 dark:text-zinc-400 ${hoverTabBg}`
              }`}
            >
              <span className="text-base shrink-0">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* RIGHT Side: Detail Panel */}
      <div className={`flex-1 h-full overflow-y-auto p-6 md:p-8 ${detailBg}`}>
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            {/* iOS Contacts style Profile Card */}
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col items-center pt-2 pb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border border-black/10 dark:border-white/10 shadow-md">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                  {personalInfo.title}
                </p>
              </div>
            </AnimatedSection>

            {/* Quick Actions Row */}
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-4 gap-4 px-2 max-w-lg mx-auto w-full">
                {[
                  { 
                    label: 'call', 
                    icon: (
                      <svg className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.08-.24c1.22.4 2.52.61 3.86.61a1 1 0 011 1v3.5a1 1 0 01-1 1A16 16 0 013 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.34.2 2.64.61 3.86a1 1 0 01-.24 1.08l-2.2 2.2z" />
                      </svg>
                    ), 
                    href: `tel:${personalInfo.phone.replace(/\s+/g, '')}` 
                  },
                  { 
                    label: 'mail', 
                    icon: (
                      <svg className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ), 
                    href: `mailto:${personalInfo.email}` 
                  },
                  { 
                    label: 'github', 
                    icon: (
                      <svg className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF]" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    ), 
                    href: socialLinks.github, 
                    external: true 
                  },
                  { 
                    label: 'linkedin', 
                    icon: (
                      <svg className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    ), 
                    href: socialLinks.linkedin, 
                    external: true 
                  }
                ].map((action, idx) => (
                  <a
                    key={idx}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noopener noreferrer' : undefined}
                    className="flex flex-col items-center gap-1.5 p-2.5 bg-white dark:bg-zinc-900 border border-black/[0.04] dark:border-white/[0.04] rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm active:scale-95 duration-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 flex items-center justify-center">
                      {action.icon}
                    </div>
                    <span className="text-[9.5px] font-bold text-[#007AFF] dark:text-[#0A84FF] capitalize tracking-tight">{action.label}</span>
                  </a>
                ))}
              </div>
            </AnimatedSection>

            {/* Grouped Information List */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl divide-y divide-black/[0.05] dark:divide-white/[0.05] shadow-sm overflow-hidden">
                <div className="p-4 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">mobile</span>
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-blue-500 dark:text-blue-400">
                    {personalInfo.phone}
                  </a>
                </div>

                <div className="p-4 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-blue-500 dark:text-blue-400 truncate">
                    {personalInfo.email}
                  </a>
                </div>

                <div className="p-4 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">home</span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}

        {activeTab === 'bio' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-5 pt-2">
            <AnimatedSection delay={0.05}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                Personal Biography
              </h2>
              <div className="bg-white mt-6 dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-6 shadow-sm leading-relaxed text-sm flex flex-col gap-4">
                <p className="text-zinc-700 dark:text-zinc-100">
                  I am a passionate software engineer specializing in building high-performance web applications and implementing modern artificial intelligence integrations.
                </p>
                <p className="text-zinc-700 dark:text-zinc-100">
                  My work is characterized by a strong dedication to code hygiene, type safety, modular architecture, and premium user-facing design systems.
                </p>
                <p className="text-zinc-700 dark:text-zinc-100">
                  Based in Morocco, I work with clients and companies worldwide to design, develop, and deliver robust software products.
                </p>
              </div>
            </AnimatedSection>
          </div>
        )}

        {activeTab === 'expertise' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-5 pt-2">
            <AnimatedSection delay={0.05}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                Expertise & Focus
              </h2>
              <div className="flex flex-col gap-4">
                {expertiseList.map((exp, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border ${exp.border} bg-gradient-to-br ${exp.gradient} dark:bg-zinc-900/60 shadow-sm flex items-start gap-4`}
                  >
                    <span className="text-3xl p-1 bg-white dark:bg-zinc-800 rounded-xl shadow-sm leading-none shrink-0">
                      {exp.icon}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>
    </div>
  )
}
