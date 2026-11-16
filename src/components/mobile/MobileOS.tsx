'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { personalInfo, socialLinks, getLocalizedPortfolioData } from '@/lib/data'
import { fetchMarrakechWeather, type WeatherState } from '@/lib/weather'
import { getAppleIcon } from '../shared/AppleIcons'
import {
  AppCubeSymbol,
  ChevronRightSymbol,
  DocumentTextSymbol,
  EnvelopeSymbol,
  GitHubGlyphSymbol,
  GlobeSymbol,
  LinkedInGlyphSymbol,
  LocationArrowSymbol,
  MapPinSymbol,
  MoonSymbol,
  PhoneFillSymbol,
  SearchSymbol,
  XMarkCircleSymbol,
} from '../shared/SFSymbols'

import IOSStatusBar from './IOSStatusBar'
import DynamicIsland from './DynamicIsland'
import IOSAppIcon from './IOSAppIcon'
import IOSSheet from './IOSSheet'
import IOSDock from './IOSDock'

import AnimatedSection from '../shared/AnimatedSection'
import { CVDownloadModal, triggerCVDownload, type CVLanguage } from '../shared/CVDownloadModal'

type AppId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'settings'

function getWeatherIcon(code: number, size = 20) {
  if (code === 0) {
    // Sunny
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="mx-auto">
        <circle cx="12" cy="12" r="6" fill="#FFCC00" />
        <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  } else if ([1, 2, 3].includes(code)) {
    // Partly Cloudy
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="mx-auto">
        <circle cx="15" cy="9" r="4" fill="#FFCC00" />
        <path d="M17 18H7C4.79 18 3 16.21 3 14C3 12.08 4.35 10.48 6.18 10.1C6.91 7.72 9.13 6 11.75 6C14.8 6 17.37 8.27 17.89 11.23C19.64 11.57 21 13.13 21 15C21 16.66 19.66 18 17 18Z" fill="#E5E5EA" />
      </svg>
    )
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    // Rainy
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="mx-auto">
        <path d="M17 14H7C4.79 14 3 12.21 3 10C3 8.08 4.35 6.48 6.18 6.1C6.91 3.72 9.13 2 11.75 2C14.8 2 17.37 4.27 17.89 7.23C19.64 7.57 21 9.13 21 11C21 12.66 19.66 14 17 14Z" fill="#AEAEB2" />
        <path d="M8 16L7 18M12 16L11 18M16 16L15 18" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  } else if ([95, 96, 99].includes(code)) {
    // Stormy
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="mx-auto">
        <path d="M17 14H7C4.79 14 3 12.21 3 10C3 8.08 4.35 6.48 6.18 6.1C6.91 3.72 9.13 2 11.75 2C14.8 2 17.37 4.27 17.89 7.23C19.64 7.57 21 9.13 21 11C21 12.66 19.66 14 17 14Z" fill="#636366" />
        <path d="M11 14L9 17H13L11 20" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  } else {
    // Cloudy / default
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="mx-auto">
        <path d="M17 16H7C4.79 16 3 14.21 3 12C3 10.08 4.35 8.48 6.18 8.1C6.91 5.72 9.13 4 11.75 4C14.8 4 17.37 6.27 17.89 9.23C19.64 9.57 21 11.13 21 13C21 14.66 19.66 16 17 16Z" fill="#F2F2F7" />
      </svg>
    )
  }
}

export default function MobileOS() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [activeApp, setActiveApp] = useState<AppId>('home')
  const [sheetApp, setSheetApp] = useState<Exclude<AppId, 'home'>>('about')
  const [projectFilter, setProjectFilter] = useState<'all' | 'ai' | 'web' | 'mobile'>('all')
  const [expandedSkillFolder, setExpandedSkillFolder] = useState<string | null>(null)
  const [skillSearchQuery, setSkillSearchQuery] = useState('')
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [cvDownloadEvent, setCvDownloadEvent] = useState<{ lang: CVLanguage; nonce: number } | null>(null)
  const {
    personalInfo: localizedPersonalInfo,
    education: localizedEducation,
    experiences: localizedExperiences,
    projects: localizedProjects,
    skills: localizedSkills,
  } = getLocalizedPortfolioData(locale)

  // Weather state (Marrakech)
  const [weather, setWeather] = useState<WeatherState>({
    temp: 23,
    conditionKey: 'partlyCloudy',
    high: 25,
    low: 22,
    code: 2,
    hourly: [
      { hour: '23', temp: 22, code: 2 },
      { hour: '00', temp: 22, code: 2 },
      { hour: '01', temp: 22, code: 2 },
      { hour: '02', temp: 22, code: 2 },
      { hour: '03', temp: 22, code: 2 },
      { hour: '04', temp: 22, code: 2 },
    ]
  })

  useEffect(() => {
    const controller = new AbortController()
    async function loadWeather() {
      try {
        const nextWeather = await fetchMarrakechWeather(controller.signal)
        if (nextWeather) {
          setWeather(nextWeather)
        }
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          console.error('Error fetching Marrakech weather:', e)
        }
      }
    }
    loadWeather()
    return () => controller.abort()
  }, [])

  const openApp = (appId: AppId) => {
    if (appId !== 'home') {
      setSheetApp(appId)
    }
    setActiveApp(appId)
  }

  const closeApp = () => {
    setActiveApp('home')
  }

  const handleDownloadCV = () => {
    setCvModalOpen(true)
  }

  const handleSelectCVLanguage = (lang: CVLanguage) => {
    triggerCVDownload(lang)
    setCvModalOpen(false)
    setCvDownloadEvent({ lang, nonce: Date.now() })
  }

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  // App details mapping
  const appTitles: Record<Exclude<AppId, 'home'>, string> = {
    about: t('common.about'),
    experience: t('common.experience'),
    projects: t('common.projects'),
    skills: t('common.skills'),
    contact: t('common.contact'),
    settings: t('common.settings'),
  }

  // Contents of each app designed to look like real iOS native applications
  const appContent: Record<Exclude<AppId, 'home'>, React.ReactNode> = {
    about: (
      <div className="p-4 flex flex-col gap-5">
        {/* iOS Contacts style Profile Card */}
        <AnimatedSection delay={0.05}>
          <div className="flex flex-col items-center pt-2 pb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border border-black/10 dark:border-white/10 shadow-sm">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight text-center mb-0">
              {localizedPersonalInfo.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mt-1 mb-0 text-center">
              {localizedPersonalInfo.title}
            </p>
          </div>
        </AnimatedSection>

        {/* Quick Actions Row */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-4 gap-3">
            {[
              { 
                label: t('mobile.about.actions.call'), 
                icon: <PhoneFillSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />, 
                href: `tel:${personalInfo.phone.replace(/\s+/g, '')}` 
              },
              { 
                label: t('mobile.about.actions.mail'), 
                icon: <EnvelopeSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />, 
                href: `mailto:${personalInfo.email}` 
              },
              { 
                label: 'GitHub', 
                icon: <GitHubGlyphSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />, 
                href: socialLinks.github, 
                external: true 
              },
              { 
                label: 'LinkedIn', 
                icon: <LinkedInGlyphSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />, 
                href: socialLinks.linkedin, 
                external: true 
              }
            ].map((action, idx) => (
              <a
                key={idx}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-1.5 p-2 bg-white dark:bg-zinc-900 border border-black/[0.04] dark:border-white/[0.04] rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm active:scale-95 duration-100"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D7BFA8]/35 to-[#9A7E64]/20 dark:from-[#D7BFA8]/20 dark:to-[#9A7E64]/15 flex items-center justify-center">
                  {action.icon}
                </div>
                <span className="text-[9px] font-bold text-[#7E634B] dark:text-[#D7BFA8] tracking-tight">{action.label}</span>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Grouped Information List (iOS Contact Detail Fields) */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl divide-y divide-black/[0.05] dark:divide-white/[0.05] shadow-sm overflow-hidden">
              {/* Phone Cell */}
              <div className="p-4 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-400">
                  {t('mobile.about.fields.mobile')}
                </span>
                <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-[#7E634B] dark:text-[#D7BFA8]">
                  {personalInfo.phone}
                </a>
              </div>

              {/* Email Cell */}
              <div className="p-4 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-400">
                  {t('mobile.about.fields.email')}
                </span>
                <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-[#7E634B] dark:text-[#D7BFA8] truncate">
                  {personalInfo.email}
                </a>
              </div>

              {/* Location Cell */}
              <div className="p-4 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-400">
                  {t('mobile.about.fields.home')}
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                  {localizedPersonalInfo.location}
                </span>
              </div>

              {/* Resume / CV Cell */}
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-400">
                    CV / PDF
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-zinc-200">
                    {t('common.downloadCV')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadCV}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#7E634B]/15 text-[#7E634B] dark:bg-[#D7BFA8]/15 dark:text-[#D7BFA8] active:scale-95 transition"
                >
                  PDF
                </button>
              </div>
            </div>

            {/* Note Bio Cell */}
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 shadow-sm flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-400">
                {t('common.about')}
              </span>
              <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed font-medium mb-0">
                {t('about.profile.description')}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    ),

    experience: (
      <div className="p-4 flex flex-col gap-5">
        {/* Education List as Calendar Events */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide ml-4">
            {t('experience.education.title')}
          </span>
          {localizedEducation.map((edu, idx) => (
            <AnimatedSection key={idx} delay={0.1 + idx * 0.08}>
              <div className="bg-white dark:bg-zinc-900 border border-black/[0.04] dark:border-white/[0.04] rounded-2xl shadow-sm flex overflow-hidden relative">
                {/* Left accent bar (Calendar event style) */}
                <div className="w-1.5 bg-[#007AFF] flex-shrink-0" />
                
                <div className="p-4 flex-1 flex flex-col gap-2 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] font-extrabold text-[#007AFF] uppercase tracking-widest leading-none">
                      {edu.period}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 leading-none">
                      <MapPinSymbol className="w-2.5 h-2.5 text-gray-400 dark:text-gray-500 shrink-0" />
                      {edu.city.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug mb-0">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                      {edu.institution}
                    </h4>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Experience List as Calendar Events */}
        <div className="flex flex-col gap-4 mt-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide ml-4">
            {t('experience.title')}
          </span>
          {localizedExperiences.map((exp, idx) => (
            <AnimatedSection key={idx} delay={0.2 + idx * 0.08}>
              <div className="bg-white dark:bg-zinc-900 border border-black/[0.04] dark:border-white/[0.04] rounded-2xl shadow-sm flex overflow-hidden relative">
                {/* Left accent bar (Calendar event style) */}
                <div className="w-1.5 bg-[#FF2D55] flex-shrink-0" />
                
                <div className="p-4 flex-1 flex flex-col gap-2 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] font-extrabold text-[#FF2D55] uppercase tracking-widest leading-none">
                      {exp.period}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 leading-none">
                      <MapPinSymbol className="w-2.5 h-2.5 text-gray-400 dark:text-gray-500 shrink-0" />
                      {exp.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {exp.title}
                    </h3>
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                      {exp.company}
                    </h4>
                  </div>

                  <ul className="space-y-1.5 mt-1">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                        <span className="text-[#FF2D55] mt-0.5 font-bold leading-none">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold bg-[#FF2D55]/10 text-[#FF2D55] px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    ),

    projects: (
      <div className="flex flex-col">

        {/* Sticky iOS style Segmented Control */}
        <div className="sticky top-0 z-20 px-4 pt-3 pb-3 bg-[#f2f2f7]/90 dark:bg-[#1c1c1e]/90 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.06]">
          <AnimatedSection delay={0.08}>
            <div className="bg-gray-100 dark:bg-zinc-800 p-0.5 rounded-xl flex w-full select-none shadow-inner border border-black/[0.04] dark:border-white/[0.06]">
              {([
                { key: 'all', label: t('projects.all') },
                { key: 'ai', label: t('projects.ai') },
                { key: 'web', label: t('projects.web') },
                { key: 'mobile', label: t('projects.mobile') }
              ] as const).map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setProjectFilter(filter.key)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    projectFilter === filter.key
                      ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Projects Cards List */}
        <div className="px-4 pt-3 pb-4 flex flex-col gap-6">
          {localizedProjects
            .filter((p) => projectFilter === 'all' || p.type === projectFilter)
            .map((project, idx) => {
              // Extract a category label based on technologies or type
              let category = t('mobile.projects.categories.tools')
              if (project.technologies.includes('Machine Learning')) {
                category = t('mobile.projects.categories.ml')
              } else if (project.type === 'ai' || project.technologies.includes('Deep Learning') || project.technologies.includes('AI')) {
                category = t('mobile.projects.categories.ai')
              } else if (project.type === 'mobile') {
                category = t('mobile.projects.categories.mobile')
              } else if (project.technologies.includes('React.js') || project.technologies.includes('Vue.js') || project.technologies.includes('Laravel')) {
                category = t('mobile.projects.categories.fullstack')
              }

              return (
                <AnimatedSection key={idx} delay={0.12 + idx * 0.08}>
                  <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                    {/* Big Spotlight Card Image */}
                    <div className="relative w-full h-44 bg-gradient-to-br from-primary/10 to-primary-dark/15 overflow-hidden flex-shrink-0">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-indigo-500/10 to-cyan-500/25 flex items-center justify-center">
                          <AppCubeSymbol className="w-10 h-10 text-blue-500/80 dark:text-blue-400/80" />
                        </div>
                      )}
                    </div>

                    {/* App Store Card Meta Info Area */}
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* App Store Icon Shape */}
                          <div className="min-w-0 flex flex-col">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                              {project.title}
                            </h3>
                            <span className="text-[10px] font-bold text-[#003f8c] dark:text-[#3A82F6] uppercase tracking-wide truncate">
                              {category}
                            </span>
                          </div>
                        </div>

                        {/* Standard iOS GET Button */}
                        <a
                          href={socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-[#007AFF] dark:text-[#0A84FF] font-extrabold text-xs px-5 py-1.5 rounded-full tracking-wide active:scale-95 transition-all duration-100 flex-shrink-0 shadow-sm"
                        >
                          {t('mobile.projects.get')}
                        </a>
                      </div>

                      {/* Excerpt Description */}
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium line-clamp-3">
                        {project.description}
                      </p>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-black/[0.03] dark:border-white/[0.03]">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-bold bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#0A84FF]/10 dark:text-[#0A84FF] px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
        </div>
      </div>
    ),

    skills: (
      <div className="p-4 flex flex-col gap-5">

        {/* iOS style Search Bar */}
        <AnimatedSection delay={0.08}>
          <div className="bg-[#E5E5EA] dark:bg-zinc-800/80 rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 shadow-inner">
            <SearchSymbol className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={skillSearchQuery}
              onChange={(e) => setSkillSearchQuery(e.target.value)}
              placeholder={t('mobile.skills.searchPlaceholder')}
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-xs text-gray-900 dark:text-white placeholder-gray-400 font-medium"
            />
            {skillSearchQuery && (
              <button
                onClick={() => setSkillSearchQuery('')}
                aria-label={locale === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                className="flex items-center justify-center shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <XMarkCircleSymbol className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Note List styled exactly like iOS Notes list */}
        <AnimatedSection delay={0.1}>
          {(() => {
            const filteredSkillNotes = [
              { id: 'languages', title: t('skills.languages'), items: localizedSkills.languages, excerpt: localizedSkills.languages.join(', ') },
              { id: 'frameworks', title: t('skills.frameworks'), items: localizedSkills.frameworks, excerpt: localizedSkills.frameworks.join(', ') },
              { id: 'databases', title: t('skills.databases'), items: localizedSkills.databases, excerpt: localizedSkills.databases.join(', ') },
              { id: 'libraries', title: t('skills.libraries'), items: localizedSkills.libraries, excerpt: localizedSkills.libraries.join(', ') },
              { id: 'tools', title: t('skills.tools'), items: localizedSkills.tools, excerpt: localizedSkills.tools.join(', ') },
              { id: 'methodologies', title: t('skills.methodologies'), items: localizedSkills.methodologies, excerpt: localizedSkills.methodologies.join(', ') },
            ].filter(
              (note) =>
                note.title.toLowerCase().includes(skillSearchQuery.toLowerCase()) ||
                note.excerpt.toLowerCase().includes(skillSearchQuery.toLowerCase())
            )

            return (
              <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl shadow-sm overflow-hidden divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                {filteredSkillNotes.length === 0 ? (
                  <div className="p-6 text-center text-xs font-medium text-gray-500 dark:text-zinc-400">
                    {t('mobile.skills.empty')}
                  </div>
                ) : (
                  filteredSkillNotes.map((note) => {
                const isExpanded = expandedSkillFolder === note.id;
                return (
                  <div key={note.id} className="flex flex-col">
                    {/* Row Trigger */}
                    <button
                      onClick={() => setExpandedSkillFolder(isExpanded ? null : note.id)}
                      className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Notes App Yellow Icon */}
                        <DocumentTextSymbol className="w-5 h-5 text-[#D08A00] dark:text-[#EAA135] flex-shrink-0" />

                        <div className="min-w-0 flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {note.title}
                          </span>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold truncate">
                            {note.excerpt}
                          </span>
                        </div>
                      </div>

                      {/* Chevron Rotating */}
                      <ChevronRightSymbol
                        className={`w-4 h-4 text-gray-300 transform transition-transform duration-200 flex-shrink-0 ${
                          isExpanded ? 'rotate-90 text-[#D08A00] dark:text-[#EAA135]' : ''
                        }`}
                      />
                    </button>

                    {/* Expanded Skill Tags Container */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden bg-gradient-to-b from-gray-100/70 to-white dark:from-zinc-800/50 dark:to-zinc-900"
                        >
                          <motion.div
                            variants={{
                              hidden: { opacity: 0 },
                              show: {
                                opacity: 1,
                                transition: {
                                  staggerChildren: 0.04,
                                  delayChildren: 0.05
                                }
                              }
                            }}
                            initial="hidden"
                            animate="show"
                            className="pl-4 min-[380px]:pl-10 pr-4 py-3.5 flex flex-wrap gap-1.5 border-t border-black/[0.02] dark:border-white/[0.02]"
                          >
                            {note.items.map((item) => (
                              <motion.span
                                key={item}
                                variants={{
                                  hidden: { opacity: 0, y: 8, scale: 0.95 },
                                  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 22 } }
                                }}
                                whileHover={{ scale: 1.05, y: -1 }}
                                className="text-[10px] font-extrabold bg-[#D08A00]/10 text-[#D08A00] dark:bg-[#EAA135]/15 dark:text-[#EAA135] px-2.5 py-0.5 rounded-md border border-[#D08A00]/10 shadow-sm transition-all hover:bg-[#D08A00]/15 dark:hover:bg-[#EAA135]/25 cursor-default"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
                  })
                )}
              </div>
            )
          })()}
        </AnimatedSection>
      </div>
    ),

    settings: (
      <div className="p-5 flex flex-col gap-6">
        {/* iOS style Settings App Profile Row */}
        <AnimatedSection delay={0.1}>
          <div 
            onClick={() => openApp('about')}
            className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-black/5 shadow-inner">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                {personalInfo.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate mt-0.5">
                {personalInfo.email}
              </p>
            </div>
            <ChevronRightSymbol className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          </div>
        </AnimatedSection>

        {/* Appearance & Language Settings Section */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-4">
              {t('mobile.settings.sectionTitle')}
            </span>
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl overflow-hidden divide-y divide-black/[0.05] dark:divide-white/[0.05] shadow-sm">
              {/* Appearance Mode Switcher (iOS Switch) */}
              <div className="flex items-center justify-between p-4 text-sm font-medium">
                <span className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500 text-white flex items-center justify-center shrink-0">
                    <MoonSymbol className="w-4 h-4" />
                  </span>
                  {t('mobile.settings.darkMode')}
                </span>
                <button
                  onClick={toggleTheme}
                  className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors duration-200 relative focus:outline-none ${
                    theme === 'dark' ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-zinc-700'
                  }`}
                  aria-label={t('mobile.settings.toggleDarkMode')}
                >
                  <div
                    className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Language Selector (iOS Segmented Control) */}
              <div className="flex items-center justify-between p-4 text-sm font-medium">
                <span className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <span className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <GlobeSymbol className="w-4 h-4" />
                  </span>
                  {t('mobile.settings.systemLanguage')}
                </span>
                <div className="bg-gray-100 dark:bg-zinc-800 p-0.5 rounded-lg flex select-none max-w-[180px]">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        locale === loc
                          ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {localeNames[loc as Locale].split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    ),

    contact: (
      <div className="p-4 flex flex-col gap-4">
        {/* Mail App Inbox List */}
        <div className="flex flex-col gap-0.5 bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl overflow-hidden divide-y divide-black/[0.05] dark:divide-white/[0.05] shadow-sm">
          {[
            { 
              sender: 'GitHub', 
              subject: t('mobile.contact.github.subject'), 
              body: t('mobile.contact.github.body'), 
              href: process.env.NEXT_PUBLIC_GITHUB_URL || socialLinks.github, 
              external: true 
            },
            { 
              sender: 'LinkedIn', 
              subject: t('mobile.contact.linkedin.subject'), 
              body: t('mobile.contact.linkedin.body'), 
              href: process.env.NEXT_PUBLIC_LINKEDIN_URL || socialLinks.linkedin, 
              external: true 
            },
            { 
              sender: t('mobile.contact.email.sender'), 
              subject: t('mobile.contact.email.subject'), 
              body: t('mobile.contact.email.body'), 
              href: `mailto:${personalInfo.email}` 
            },
            { 
              sender: t('mobile.contact.phone.sender'), 
              subject: t('mobile.contact.phone.subject'), 
              body: t('mobile.contact.phone.body'), 
              href: `tel:${personalInfo.phone.replace(/\s+/g, '')}` 
            },
          ].map((mail, idx) => (
            <AnimatedSection key={idx} delay={0.05 + idx * 0.08}>
              <motion.a
                href={mail.href}
                target={mail.external ? '_blank' : undefined}
                rel={mail.external ? 'noopener noreferrer' : undefined}
                className="block p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-2.5 items-start">
                  {/* Blue Unread Dot */}
                  <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] mt-1.5 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {mail.sender}
                      </h3>
                    </div>

                    <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {mail.subject}
                    </h4>

                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal line-clamp-2 mt-0.5">
                      {mail.body}
                    </p>
                  </div>

                  {/* Gray Chevron Right */}
                  <ChevronRightSymbol className="w-4 h-4 text-gray-300 dark:text-gray-600 mt-1 flex-shrink-0" />
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    ),
  }

  // Authentic 4-column App Grid configuration mapping our sections + Download CV app
  const gridApps: Array<{ id: string; label: string; badge?: number; onClick: () => void }> = [
    { id: 'about', label: t('common.about'), onClick: () => openApp('about') },
    { id: 'experience', label: t('common.experience'), onClick: () => openApp('experience') },
    { id: 'projects', label: t('common.projects'), onClick: () => openApp('projects') },
    { id: 'skills', label: t('common.skills'), onClick: () => openApp('skills') },
    { id: 'contact', label: t('common.contact'), badge: 4, onClick: () => openApp('contact') },
    { id: 'cv', label: t('common.downloadCV'), onClick: handleDownloadCV },
    { id: 'settings', label: t('common.settings'), onClick: () => openApp('settings') },
  ]

  // Dock applications
  const dockApps = [
    { id: 'phone', label: t('common.phone'), onClick: () => { window.location.href = `tel:${personalInfo.phone.replace(/\s+/g, '')}` } },
    { id: 'github', label: 'GitHub', onClick: () => window.open(process.env.NEXT_PUBLIC_GITHUB_URL || socialLinks.github, '_blank') },
    { id: 'linkedin', label: 'LinkedIn', onClick: () => window.open(process.env.NEXT_PUBLIC_LINKEDIN_URL || socialLinks.linkedin, '_blank') },
    { id: 'whatsapp', label: 'WhatsApp', onClick: () => window.open(`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`, '_blank') },
  ]

  return (
    <div 
      className="h-screen h-[100dvh] w-full overflow-hidden relative flex flex-col select-none"
      style={{
        backgroundColor: '#150f28',
        backgroundImage:
          "url('/images/mobile-bg.jpg'), radial-gradient(circle at 100% 60%, rgba(255, 94, 98, 0.9) 0%, transparent 60%), radial-gradient(circle at 0% 100%, rgba(255, 153, 102, 0.9) 0%, transparent 60%), radial-gradient(circle at 50% 0%, rgba(79, 172, 254, 0.85) 0%, transparent 65%)",
        backgroundSize: 'cover',
        backgroundPosition: '58% center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle blur + soft contrast scrim over wallpaper */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none backdrop-blur-[1.5px]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 12, 24, 0.14) 0%, rgba(10, 12, 24, 0.04) 45%, rgba(10, 12, 24, 0.25) 100%)',
        }}
      />
      {/* iOS Status Bar */}
      <IOSStatusBar theme={theme} isAppOpen={activeApp !== 'home'} />

      {/* Dynamic Island */}
      <DynamicIsland activeApp={activeApp} activeLang={locale} cvDownloadEvent={cvDownloadEvent} />

      {/* Main Home Screen Area */}
      <div className="flex-1 pt-12 short:pt-10 px-6 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] flex flex-col justify-start pb-28 short:pb-24 overflow-y-auto relative z-10 gap-5 short:gap-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 short:gap-4">
        {/* Authentic Marrakech Weather Widget */}
        <motion.div
          className="w-full bg-gradient-to-b from-[#0A1931] to-[#15305B] backdrop-blur-xl border border-white/10 text-white rounded-3xl p-5 short:p-4 shadow-xl mt-4 short:mt-2 flex flex-col gap-4 short:gap-2.5 select-none"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", "SF Pro Text", "Segoe UI", sans-serif',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white/60">
            <span className="flex items-center gap-1">
              Marrakech
              <LocationArrowSymbol className="w-3 h-3" />
            </span>
          </div>

          <div className="flex items-center justify-between -mt-1">
            <span className="text-6xl font-light tracking-tighter">
              {weather.temp}°
            </span>
            <div className="flex flex-col items-end gap-1 text-right">
              {getWeatherIcon(weather.code, 22)}
              <div className="text-[11px] font-medium leading-tight">
                <p className="font-bold tracking-tight text-xs text-white mb-0">
                  {t(`mobile.weather.conditions.${weather.conditionKey}`)}
                </p>
                <p className="text-white/70 mt-0.5 mb-0">
                  {t('mobile.weather.high')}:{weather.high}° {t('mobile.weather.low')}:{weather.low}°
                </p>
              </div>
            </div>
          </div>

          {/* Hourly forecast divider */}
          <div className="border-t border-white/15 pt-3 flex justify-between items-center text-[10px] font-bold text-center">
            {weather.hourly.map((h, i) => (
              <div key={i} className="flex flex-col gap-1 flex-1">
                <span className="text-white/80">{h.hour}</span>
                <span className="my-1 flex justify-center">{getWeatherIcon(h.code, 15)}</span>
                <span>{h.temp}°</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Small weather label under widget */}
        <p className="text-center text-white/40 text-[9px] font-bold uppercase tracking-widest -mt-3 mb-0 select-none">
          {t('mobile.weather.label')}
        </p>

        {/* Home Screen Icons Grid (adapts 4 cols portrait -> 6 cols landscape) */}
        <div className="grid grid-cols-4 min-[540px]:grid-cols-6 gap-x-4 min-[540px]:gap-x-5 gap-y-4 px-0.5 pb-4 justify-items-center">
          {gridApps.map((app, index) => (
            <IOSAppIcon
              key={app.id}
              id={app.id}
              label={app.label}
              onClick={app.onClick}
              index={index}
              size={56}
              badge={app.badge}
            />
          ))}
        </div>
        </div>
      </div>

      {/* iOS Dock */}
      <IOSDock onOpenApp={openApp} theme={theme} apps={dockApps} />

      {/* iOS Home Indicator (shown on Home Screen; open apps use IOSSheet swipe-up bar) */}
      {activeApp === 'home' && (
        <div
          className="fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/60 dark:bg-white/40 rounded-full z-40 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Slide-Up App Sheets (always mounted so AnimatePresence runs exit animation smoothly) */}
      <IOSSheet
        isOpen={activeApp !== 'home'}
        onClose={closeApp}
        title={appTitles[sheetApp]}
        icon={getAppleIcon(sheetApp, 20)}
        theme={theme}
      >
        {appContent[sheetApp]}
      </IOSSheet>

      {/* iOS CV Language Action Sheet */}
      <CVDownloadModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        onDownload={handleSelectCVLanguage}
        theme={theme}
        variant="ios"
      />
    </div>
  )
}
