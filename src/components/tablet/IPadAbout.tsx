'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { personalInfo, socialLinks } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'
import {
  DesignSymbol,
  DocumentTextSymbol,
  EnvelopeSymbol,
  GearSymbol,
  GitHubGlyphSymbol,
  LaptopCodeSymbol,
  LinkedInGlyphSymbol,
  PersonSymbol,
  PhoneFillSymbol,
  SparklesAISymbol,
} from '../shared/SFSymbols'

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
      icon: <PersonSymbol className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'bio', 
      label: 'Personal Bio', 
      icon: <DocumentTextSymbol className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'expertise', 
      label: 'Expertise Focus', 
      icon: <GearSymbol className="w-4 h-4 shrink-0" />
    },
  ]

  const expertiseList = [
    {
      icon: <LaptopCodeSymbol className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t('about.expertise.fullstack.title'),
      description: t('about.expertise.fullstack.description'),
      gradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-400/20',
    },
    {
      icon: <SparklesAISymbol className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: t('about.expertise.performance.title'),
      description: t('about.expertise.performance.description'),
      gradient: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-400/20',
    },
    {
      icon: <DesignSymbol className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
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
              <span className="flex items-center justify-center shrink-0">{tab.icon}</span>
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
                    icon: <PhoneFillSymbol className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF] shrink-0" />, 
                    href: `tel:${personalInfo.phone.replace(/\s+/g, '')}` 
                  },
                  { 
                    label: 'mail', 
                    icon: <EnvelopeSymbol className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF] shrink-0" />, 
                    href: `mailto:${personalInfo.email}` 
                  },
                  { 
                    label: 'github', 
                    icon: <GitHubGlyphSymbol className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF] shrink-0" />, 
                    href: socialLinks.github, 
                    external: true 
                  },
                  { 
                    label: 'linkedin', 
                    icon: <LinkedInGlyphSymbol className="w-5 h-5 text-[#007AFF] dark:text-[#0A84FF] shrink-0" />, 
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
                    <span className="w-11 h-11 flex items-center justify-center bg-white dark:bg-zinc-800 rounded-xl shadow-sm shrink-0">
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
