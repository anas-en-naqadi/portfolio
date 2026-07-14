'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/hooks/useTheme'
import { useTime } from '@/hooks/useTime'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { personalInfo, socialLinks, experiences, education, projects, skills } from '@/lib/data'
import { getAppleIcon } from '../shared/AppleIcons'

import IOSStatusBar from './IOSStatusBar'
import DynamicIsland from './DynamicIsland'
import IOSAppIcon from './IOSAppIcon'
import IOSSheet from './IOSSheet'
import IOSDock from './IOSDock'

import ModernCard from '../shared/ModernCard'
import ModernBadge from '../shared/ModernBadge'
import AnimatedSection from '../shared/AnimatedSection'

type AppId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'settings'

interface HourlyForecast {
  hour: string
  temp: number
  code: number
}

interface WeatherState {
  temp: number
  condition: string
  high: number
  low: number
  code: number
  hourly: HourlyForecast[]
}

function getWeatherConditionText(code: number): string {
  if (code === 0) return 'Clear Sky'
  if ([1, 2, 3].includes(code)) return 'Partly Cloudy'
  if ([45, 48].includes(code)) return 'Foggy'
  if ([51, 53, 55].includes(code)) return 'Drizzle'
  if ([61, 63, 65].includes(code)) return 'Rainy'
  if ([71, 73, 75].includes(code)) return 'Snowy'
  if ([80, 81, 82].includes(code)) return 'Showers'
  if ([95, 96, 99].includes(code)) return 'Thunderstorm'
  return 'Clear'
}

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
        <path d="M11 14L9 17H13L11 20" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" strokeJoin="round" />
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
  const isDark = theme === 'dark'
  const [projectFilter, setProjectFilter] = useState<'all' | 'web' | 'mobile'>('all')
  const [expandedSkillFolder, setExpandedSkillFolder] = useState<number | null>(null)
  const [skillSearchQuery, setSkillSearchQuery] = useState('')

  // Weather state (Marrakech Marrakech Marrakech)
  const [weather, setWeather] = useState<WeatherState>({
    temp: 23,
    condition: 'Partly Cloudy',
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
    async function getWeather() {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=31.6295&longitude=-7.9811&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto')
        const data = await res.json()
        
        const temp = Math.round(data.current.temperature_2m)
        const code = data.current.weather_code
        const high = Math.round(data.daily.temperature_2m_max[0])
        const low = Math.round(data.daily.temperature_2m_min[0])
        const conditionText = getWeatherConditionText(code)
        
        // Next 6 hours starting from current hour
        const currentHour = new Date().getHours()
        const hourlyForecast: HourlyForecast[] = []
        for (let i = 0; i < 6; i++) {
          const targetIndex = (currentHour + i) % 24
          hourlyForecast.push({
            hour: String((currentHour + i) % 24).padStart(2, '0'),
            temp: Math.round(data.hourly.temperature_2m[targetIndex]),
            code: data.hourly.weather_code[targetIndex]
          })
        }
        
        setWeather({
          temp,
          condition: conditionText,
          high,
          low,
          code,
          hourly: hourlyForecast
        })
      } catch (e) {
        console.error('Error fetching Marrakech weather:', e)
      }
    }
    getWeather()
  }, [])

  const openApp = (appId: AppId) => {
    setActiveApp(appId)
  }

  const closeApp = () => {
    setActiveApp('home')
  }

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  // App details mapping
  const appTitles: Record<Exclude<AppId, 'home'>, string> = {
    about: 'About Me',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
    settings: 'Settings',
  }

  const appIcons: Record<Exclude<AppId, 'home'>, string> = {
    about: '👤',
    experience: '💼',
    projects: '🚀',
    skills: '📝',
    contact: '📧',
    settings: '⚙️',
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
          <div className="grid grid-cols-4 gap-3 px-2">
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
                className="flex flex-col items-center gap-1.5 p-2 bg-white dark:bg-zinc-900 border border-black/[0.04] dark:border-white/[0.04] rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm active:scale-95 duration-100"
              >
                <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 flex items-center justify-center">
                  {action.icon}
                </div>
                <span className="text-[9px] font-bold text-[#007AFF] dark:text-[#0A84FF] capitalize tracking-tight">{action.label}</span>
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">mobile</span>
                <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-primary">
                  {personalInfo.phone}
                </a>
              </div>

              {/* Email Cell */}
              <div className="p-4 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">email</span>
                <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-primary truncate">
                  {personalInfo.email}
                </a>
              </div>

              {/* Location Cell */}
              <div className="p-4 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">home</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {personalInfo.location}
                </span>
              </div>
            </div>

            {/* Note Bio Cell */}
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 shadow-sm flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">About Me</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
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
            {t('experience.education.title') || 'Education'}
          </span>
          {education.map((edu, idx) => (
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
                      <svg className="w-2.5 h-2.5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25C4.5 6.63 7.63 3.5 11.5 3.5s7 3.13 7 7z" />
                      </svg>
                      {edu.institution.toLowerCase().includes('marrakech') ? 'MARRAKECH' : 'EL JADIDA'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
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
          {experiences.map((exp, idx) => (
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
                      <svg className="w-2.5 h-2.5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25C4.5 6.63 7.63 3.5 11.5 3.5s7 3.13 7 7z" />
                      </svg>
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
      <div className="p-4 flex flex-col gap-5">

        {/* iOS style Segmented Control */}
        <AnimatedSection delay={0.08}>
          <div className="bg-gray-100 dark:bg-zinc-850 p-0.5 rounded-xl flex w-full select-none shadow-inner border border-black/[0.03] dark:border-white/[0.03]">
            {([
              { key: 'all', label: t('projects.all') || 'All' },
              { key: 'web', label: t('projects.web') || 'Web' },
              { key: 'mobile', label: t('projects.mobile') || 'Mobile' }
            ] as const).map((filter) => (
              <button
                key={filter.key}
                onClick={() => setProjectFilter(filter.key)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  projectFilter === filter.key
                    ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Cards List */}
        <div className="flex flex-col gap-6">
          {projects
            .filter((p) => projectFilter === 'all' || p.type === projectFilter)
            .map((project, idx) => {
              // Extract a category label based on technologies or type
              let category = 'Developer Tools';
              if (project.technologies.includes('Deep Learning') || project.technologies.includes('AI')) {
                category = 'Artificial Intelligence';
              } else if (project.technologies.includes('Machine Learning')) {
                category = 'Machine Learning';
              } else if (project.type === 'mobile') {
                category = 'iOS & Android App';
              } else if (project.technologies.includes('React.js') || project.technologies.includes('Vue.js') || project.technologies.includes('Laravel')) {
                category = 'Full-Stack Web App';
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
                          <span className="text-4xl">🚀</span>
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
                          GET
                        </a>
                      </div>

                      {/* Excerpt Description */}
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium line-clamp-3">
                        {project.description}
                      </p>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-black/[0.03] dark:border-white/[0.03] -mt-4">
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
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              value={skillSearchQuery}
              onChange={(e) => setSkillSearchQuery(e.target.value)}
              placeholder="Search Skills"
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-xs text-gray-900 dark:text-white placeholder-gray-400 font-medium"
            />
            {skillSearchQuery && (
              <button onClick={() => setSkillSearchQuery('')} className="text-gray-400 hover:text-gray-650 dark:hover:text-gray-200">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Note List styled exactly like iOS Notes list */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl shadow-sm overflow-hidden divide-y divide-black/[0.05] dark:divide-white/[0.05]">
            {[
              { title: t('skills.languages') || 'Languages', items: skills.languages, excerpt: skills.languages.join(', ') },
              { title: t('skills.frameworks') || 'Frameworks', items: skills.frameworks, excerpt: skills.frameworks.join(', ') },
              { title: t('skills.databases') || 'Databases', items: skills.databases, excerpt: skills.databases.join(', ') },
              { title: t('skills.libraries') || 'Libraries', items: skills.libraries, excerpt: skills.libraries.join(', ') },
              { title: t('skills.tools') || 'Tools', items: skills.tools, excerpt: skills.tools.join(', ') },
              { title: t('skills.methodologies') || 'Methodologies', items: skills.methodologies, excerpt: skills.methodologies.join(', ') },
            ]
              .filter((note) => 
                note.title.toLowerCase().includes(skillSearchQuery.toLowerCase()) ||
                note.excerpt.toLowerCase().includes(skillSearchQuery.toLowerCase())
              )
              .map((note, idx) => {
                const isExpanded = expandedSkillFolder === idx;
                return (
                  <div key={idx} className="flex flex-col">
                    {/* Row Trigger */}
                    <button
                      onClick={() => setExpandedSkillFolder(isExpanded ? null : idx)}
                      className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Notes App Yellow Icon */}
                        <svg className="w-5 h-5 text-[#D08A00] dark:text-[#EAA135] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <line x1="10" y1="9" x2="8" y2="9" />
                        </svg>

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
                      <svg
                        className={`w-4 h-4 text-gray-300 transform transition-transform duration-200 flex-shrink-0 ${
                          isExpanded ? 'rotate-90 text-[#D08A00] dark:text-[#EAA135]' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>

                    {/* Expanded Skill Tags Container */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden bg-gray-50 dark:bg-zinc-950/40"
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
                            className="px-4 pb-6 pt-2 flex flex-wrap gap-1.5 ml-8 border-t border-black/[0.02] dark:border-white/[0.02]"
                          >
                            {note.items.map((item) => (
                              <motion.span
                                key={item}
                                variants={{
                                  hidden: { opacity: 0, y: 8, scale: 0.95 },
                                  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 22 } }
                                }}
                                whileHover={{ scale: 1.05, y: -1 }}
                                className="text-[10px] font-extrabold bg-[#D08A00]/10 text-[#D08A00] dark:bg-[#EAA135]/15 dark:text-[#EAA135] px-2.5 py-o.5 rounded-md border border-[#D08A00]/10 shadow-sm transition-all hover:bg-[#D08A00]/15 dark:hover:bg-[#EAA135]/25 cursor-default"
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
              })}
          </div>
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
            <svg 
              className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </AnimatedSection>

        {/* Appearance & Language Settings Section */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-4">
              General System Settings
            </span>
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl overflow-hidden divide-y divide-black/[0.05] dark:divide-white/[0.05] shadow-sm">
              {/* Appearance Mode Switcher (iOS Switch) */}
              <div className="flex items-center justify-between p-4 text-sm font-medium">
                <span className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <span className="text-base">🌙</span>
                  Dark Mode
                </span>
                <button
                  onClick={toggleTheme}
                  className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors duration-200 relative focus:outline-none ${
                    theme === 'dark' ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-zinc-700'
                  }`}
                  aria-label={`Toggle dark mode: Currently ${theme} mode`}
                >
                  <div
                    className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Language Selector Selector (iOS Segmented Control) */}
              <div className="flex items-center justify-between p-4 text-sm font-medium">
                <span className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <span className="text-base">🌐</span>
                  System Language
                </span>
                <div className="bg-gray-100 dark:bg-zinc-800 p-0.5 rounded-lg flex select-none max-w-[180px]">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
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
              subject: 'Portfolio & Code Repositories', 
              body: 'Hi, check out my latest open source contributions and repositories. Let\'s build something together.', 
              href: process.env.NEXT_PUBLIC_GITHUB_URL || socialLinks.github, 
              external: true 
            },
            { 
              sender: 'LinkedIn', 
              subject: 'Professional Connection Proposal', 
              body: 'Let\'s connect professionally on LinkedIn to discuss freelance opportunities or full-time roles.', 
              href: process.env.NEXT_PUBLIC_LINKEDIN_URL || socialLinks.linkedin, 
              external: true 
            },
            { 
              sender: 'Email Inbox', 
              subject: 'New Project Collaboration Inquiry', 
              body: 'Send me a direct email to initiate a conversation, request my resume, or get a quotation.', 
              href: `mailto:${personalInfo.email}` 
            },
            { 
              sender: 'Phone Call', 
              subject: 'Direct Inquiries & Call Scheduling', 
              body: 'Dial my mobile number directly for immediate business enquiries or freelance requests.', 
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
                  <svg 
                    className="w-4 h-4 text-gray-300 dark:text-gray-600 mt-1 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    ),
  }

  // Authentic 4-column App Grid configuration mapping our sections
  const gridApps = [
    { id: 'about', label: 'About Me', onClick: () => openApp('about') },
    { id: 'experience', label: 'Experiences', onClick: () => openApp('experience') },
    { id: 'projects', label: 'Projects', onClick: () => openApp('projects') },
    { id: 'skills', label: 'Skills', onClick: () => openApp('skills') },
    { id: 'contact', label: 'Contact', onClick: () => openApp('contact') },
    { id: 'settings', label: 'Settings', onClick: () => openApp('settings') },
  ]

  // Dock applications exactly matching the user screenshot
  const dockApps = [
    { id: 'phone', label: 'Phone', onClick: () => { window.location.href = `tel:${personalInfo.phone.replace(/\s+/g, '')}` } },
    { id: 'github', label: 'GitHub', onClick: () => window.open(process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/anas-en-naqadi-temp', '_blank') },
    { id: 'linkedin', label: 'LinkedIn', onClick: () => window.open(process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/anas-en-naqadi-temp', '_blank') },
    { id: 'whatsapp', label: 'WhatsApp', onClick: () => window.open(`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`, '_blank') },
  ]

  return (
    <div 
      className="h-screen w-full overflow-hidden relative flex flex-col select-none"
      style={{
        background: 'radial-gradient(circle at 100% 60%, rgba(255, 94, 98, 0.9) 0%, transparent 60%), radial-gradient(circle at 0% 100%, rgba(255, 153, 102, 0.9) 0%, transparent 60%), radial-gradient(circle at 50% 0%, rgba(79, 172, 254, 0.85) 0%, transparent 65%), #150f28',
      }}
    >
      {/* iOS Status Bar */}
      <IOSStatusBar theme={theme} isAppOpen={activeApp !== 'home'} />

      {/* Dynamic Island */}
      <DynamicIsland activeApp={activeApp} activeLang={locale} />

      {/* Main Home Screen Area */}
      <div className="flex-1 pt-12 px-6 flex flex-col justify-start pb-28 overflow-y-auto relative z-10 gap-5">
        
        {/* Authentic Marrakech Weather Widget */}
        <motion.div
          className="w-full bg-gradient-to-b from-[#0A1931] to-[#15305B] backdrop-blur-xl border border-white/10 text-white rounded-3xl p-5 shadow-xl mt-4 flex flex-col gap-4 select-none"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", "SF Pro Text", "Segoe UI", sans-serif',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white/60">
            <span className="flex items-center gap-1">
              Marrakech ↗
            </span>
          </div>

          <div className="flex items-center justify-between -mt-1">
            <span className="text-6xl font-light tracking-tighter">
              {weather.temp}°
            </span>
            <div className="flex flex-col items-end gap-1 text-right">
              {getWeatherIcon(weather.code, 22)}
              <div className="text-[11px] font-medium leading-tight">
                <p className="font-bold tracking-tight text-xs">{weather.condition}</p>
                <p className="text-white/70 mt-0.5">
                  H:{weather.high}° L:{weather.low}°
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
        <p className="text-center text-white/40 text-[9px] font-bold uppercase tracking-widest -mt-3 select-none">
          Weather
        </p>

        {/* Home Screen Icons Grid (15 App Grid matching iOS) */}
        <div className="grid grid-cols-4 gap-x-5 gap-y-4 px-0.5 pb-4">
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

      {/* iOS Dock */}
      <IOSDock onOpenApp={openApp} theme={theme} apps={dockApps} />

      {/* iOS Home Indicator */}
      <div
        className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/60 dark:bg-white/40 rounded-full z-50 cursor-pointer pointer-events-auto hover:bg-white/80 active:bg-white transition-colors"
        onClick={closeApp}
        aria-label="Home"
        title="Go to Home Screen"
      />

      {/* Slide-Up App Sheets */}
      <AnimatePresence>
        {activeApp !== 'home' && (
          <IOSSheet
            isOpen={activeApp !== 'home'}
            onClose={closeApp}
            title={activeApp !== 'home' ? appTitles[activeApp] : ''}
            icon={activeApp !== 'home' ? getAppleIcon(activeApp, 20) : ''}
            theme={theme}
          >
            {activeApp !== 'home' && appContent[activeApp]}
          </IOSSheet>
        )}
      </AnimatePresence>
    </div>
  )
}
