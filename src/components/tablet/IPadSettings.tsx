'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { personalInfo } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'

interface IPadSettingsProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

type SectionId = 'profile' | 'appearance' | 'language' | 'developer'

export default function IPadSettings({ theme, toggleTheme }: IPadSettingsProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('profile')
  const isDark = theme === 'dark'
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const sidebarBg = isDark ? 'bg-zinc-900/40' : 'bg-black/5'
  const detailBg = isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]' // Native settings background color
  
  const activeItemBg = isDark ? 'bg-[#3A3A3C] text-white' : 'bg-white text-black shadow-sm'
  const hoverItemBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  const sections = [
    { id: 'profile', label: 'IT ID', icon: '👤', iconBg: 'bg-blue-500' },
    { id: 'appearance', label: 'Appearance', icon: '🌙', iconBg: 'bg-indigo-500' },
    { id: 'language', label: 'Language', icon: '🌐', iconBg: 'bg-emerald-500' },
    { id: 'developer', label: 'Developer', icon: '💻', iconBg: 'bg-zinc-700' },
  ] as const

  return (
    <div className="flex h-full w-full overflow-hidden select-none">
      {/* LEFT Side: iPadOS Settings Sidebar */}
      <div className={`w-[260px] md:w-[280px] h-full flex-shrink-0 border-r ${isDark ? 'border-white/10' : 'border-black/10'} ${sidebarBg} p-4 flex flex-col gap-5 overflow-y-auto`}>
        {/* Title */}
        <div className="px-2 pt-2">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
            Settings
          </span>
        </div>

        {/* Apple ID Profile Quick Banner */}
        <button
          onClick={() => setActiveSection('profile')}
          className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all text-left w-full ${
            activeSection === 'profile' ? activeItemBg : hoverItemBg
          }`}
        >
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-black/5 flex-shrink-0">
            <Image
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col">
            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight truncate">
              {personalInfo.name}
            </span>
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-semibold truncate mt-0.5">
              IT ID, Contact, Role, Location
            </span>
          </div>
        </button>

        {/* Settings Navigation list */}
        <nav className="flex flex-col gap-1 w-full" aria-label="Settings categories">
          {sections.filter(s => s.id !== 'profile').map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 w-full ${
                activeSection === sec.id
                  ? activeItemBg
                  : `text-zinc-600 dark:text-zinc-400 ${hoverItemBg}`
              }`}
            >
              <div className={`w-6 h-6 rounded-lg ${sec.iconBg} text-white flex items-center justify-center text-xs shrink-0 shadow-sm`}>
                {sec.icon}
              </div>
              <span className="truncate">{sec.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* RIGHT Side: Settings Detail Panel */}
      <div className={`flex-1 h-full overflow-y-auto p-6 md:p-10 ${detailBg}`}>
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          {activeSection === 'profile' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  Apple ID
                </h2>
                
                {/* Account card */}
                <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2.5xl p-5 flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-black/5 flex-shrink-0">
                      <Image
                        src={personalInfo.profileImage}
                        alt={personalInfo.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {personalInfo.name}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold truncate">
                        {personalInfo.email}
                      </span>
                    </div>
                  </div>

                  <hr className="border-black/[0.05] dark:border-white/[0.05]" />

                  {/* Profile info fields */}
                  <div className="flex flex-col gap-3 text-xs font-semibold">
                    <div className="flex justify-between">
                      <span className="text-zinc-400 dark:text-zinc-500">Contact</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{personalInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400 dark:text-zinc-500">Role</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{personalInfo.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400 dark:text-zinc-500">Location</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{personalInfo.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {activeSection === 'appearance' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  Appearance
                </h2>

                <div className="bg-white dark:bg-zinc-900 border rounded-md p-4 border-black/[0.05] dark:border-white/[0.05] rounded-2.5xl p-4.5 flex justify-between items-center shadow-sm">
                  <span className="flex items-center gap-3 text-sm font-bold text-gray-800 dark:text-zinc-200">
                    <span className="text-base p-1 bg-indigo-500/10 text-indigo-500 rounded-lg">🌙</span>
                    Dark Mode Appearance
                  </span>
                  
                  {/* Apple Toggle Switch */}
                  <button
                    onClick={toggleTheme}
                    className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors duration-200 relative focus:outline-none shrink-0 ${
                      isDark ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-zinc-700'
                    }`}
                    aria-label="Toggle dark mode"
                  >
                    <div
                      className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        isDark ? 'translate-x-[20px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {activeSection === 'language' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  Language & Region
                </h2>

                <div className="bg-white p-4 rounded-md dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2.5xl p-4.5 flex justify-between items-center shadow-sm">
                  <span className="flex items-center gap-3 text-sm font-bold text-gray-800 dark:text-zinc-200">
                    <span className="text-base p-1 bg-emerald-500/10 text-emerald-500 rounded-lg">🌐</span>
                    System Language
                  </span>
                  
                  {/* iOS Segmented Control */}
                  <div className="bg-gray-100 dark:bg-zinc-800 p-0.5 rounded-lg flex select-none shrink-0">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                          locale === loc
                            ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                        }`}
                      >
                        {localeNames[loc as Locale].split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {activeSection === 'developer' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  Developer Settings
                </h2>

                <div className="bg-white rounded-md dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2.5xl p-5 flex flex-col gap-4 shadow-sm text-xs font-semibold leading-relaxed text-zinc-600 dark:text-zinc-400">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Framework</span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">Next.js 14 (App Router)</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Interface Technologies</span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">React 18, Tailwind CSS, Framer Motion</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Build System</span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">Webpack & Turbopack Core</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Codebase Repository</span>
                    <a 
                      href="https://github.com/anas-en-naqadi/portfolio"
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 dark:text-blue-400 font-bold hover:underline"
                    >
                      github.com/anas-en-naqadi/portfolio
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  )
}
