'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedPortfolioData } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'
import IPadSplitView, { getIPadSidebarItemClasses } from './IPadSplitView'
import { MapPinSymbol } from '../shared/SFSymbols'

interface IPadExperienceProps {
  theme: 'dark' | 'light'
}

const LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-MA',
}

export default function IPadExperience({ theme }: IPadExperienceProps) {
  const locale = useLocale()
  const t = useTranslations('tablet.experience')
  const { experiences, education } = getLocalizedPortfolioData(locale)
  const [showWork, setShowWork] = useState(true)
  const [showEdu, setShowEdu] = useState(true)
  const isDark = theme === 'dark'

  const cardBg = isDark ? 'bg-[#2C2C2E] border-white/[0.08]' : 'bg-white border-black/[0.06]'
  const sidebarItemClasses = getIPadSidebarItemClasses(theme)

  const intlLocale = LOCALE_MAP[locale] || locale || 'en-US'
  const today = useMemo(() => new Date(), [])
  const currentDay = today.getDate()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  const calendarTitle = useMemo(
    () =>
      new Intl.DateTimeFormat(intlLocale, {
        month: 'long',
        year: 'numeric',
      }).format(today),
    [intlLocale, today]
  )

  const weekdayHeaders = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) => {
        const ref = new Date(2024, 0, 7 + idx) // Sunday = Jan 7, 2024
        return new Intl.DateTimeFormat(intlLocale, { weekday: 'narrow' }).format(ref)
      }),
    [intlLocale]
  )

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate()
    const days: Array<number | string> = []
    for (let i = 0; i < firstDayIndex; i++) days.push('')
    for (let d = 1; d <= totalDays; d++) days.push(d)
    return days
  }, [currentYear, currentMonth])

  const sidebarMiniCalendar = (
    <div className="ipad-desktop-only flex-col gap-3 pb-3 border-b border-black/10 dark:border-white/10">
      <div className="flex items-center px-1">
        <span className={`text-xs font-extrabold capitalize tracking-wide ${isDark ? 'text-white' : 'text-zinc-800'}`}>
          {calendarTitle}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-y-1.5 text-center text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
        {weekdayHeaders.map((d, idx) => (
          <span key={idx} className="font-bold text-zinc-400 dark:text-zinc-500">
            {d}
          </span>
        ))}
        {calendarDays.map((day, idx) => (
          <span
            key={idx}
            className={`h-6 w-6 flex items-center justify-center rounded-full mx-auto tabular-nums ${
              day === currentDay
                ? 'bg-[#FF3B30] text-white font-extrabold shadow-sm'
                : day
                ? 'text-zinc-800 dark:text-zinc-200'
                : ''
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  )

  const sidebarContent = (
    <div className="flex flex-col gap-2">
      <span className={`ipad-desktop-only text-[10px] font-extrabold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-zinc-500'} px-1`}>
        {t('calendarTitle')}
      </span>
      <div className="ipad-sidebar-nav">
        <button
          type="button"
          onClick={() => setShowWork((prev) => !prev)}
          aria-pressed={showWork}
          className={`flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
            showWork ? sidebarItemClasses.active : `${sidebarItemClasses.inactive} opacity-60`
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span
              className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                showWork
                  ? 'bg-[#FF2D55] border-[#FF2D55]'
                  : 'border-zinc-400 dark:border-zinc-600 bg-transparent'
              }`}
            >
              {showWork && <span className="w-1 h-1 bg-white rounded-full" />}
            </span>
            <span className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>
              {t('workExperience')}
            </span>
          </span>
          <span className="text-[10px] font-bold text-zinc-400 tabular-nums">
            {experiences.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setShowEdu((prev) => !prev)}
          aria-pressed={showEdu}
          className={`flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
            showEdu ? sidebarItemClasses.active : `${sidebarItemClasses.inactive} opacity-60`
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span
              className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                showEdu
                  ? 'bg-[#007AFF] border-[#007AFF]'
                  : 'border-zinc-400 dark:border-zinc-600 bg-transparent'
              }`}
            >
              {showEdu && <span className="w-1 h-1 bg-white rounded-full" />}
            </span>
            <span className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>
              {t('education')}
            </span>
          </span>
          <span className="text-[10px] font-bold text-zinc-400 tabular-nums">
            {education.length}
          </span>
        </button>
      </div>
    </div>
  )

  return (
    <IPadSplitView
      theme={theme}
      sidebarTitle={t('sidebarTitle')}
      sidebarHeaderExtra={sidebarMiniCalendar}
      sidebarContent={sidebarContent}
      detailTitle={calendarTitle}
      detailPaddingClass="p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {!showWork && !showEdu ? (
          <div className="py-16 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {t('noCalendars')}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {showEdu && (
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    {t('education')}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                    {t('degreesCount', { count: education.length })}
                  </span>
                </div>
                {education.map((edu, idx) => (
                  <AnimatedSection key={`edu-${idx}`} delay={0.04 + idx * 0.04}>
                    <div className={`border rounded-2xl shadow-sm flex overflow-hidden ${cardBg} relative`}>
                      <div className="w-1.5 bg-[#007AFF] flex-shrink-0" />
                      <div className="p-4 flex-1 flex flex-col gap-2 min-w-0">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <span className="text-[10px] font-extrabold text-[#007AFF] uppercase tracking-wider leading-none">
                            {edu.period}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1 leading-none">
                            <MapPinSymbol className="w-2.5 h-2.5 shrink-0" />
                            {edu.city}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                            {edu.degree}
                          </h3>
                          <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {edu.institution}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}

            {showWork && (
              <div className="flex flex-col gap-3.5 mt-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    {t('workExperience')}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                    {t('rolesCount', { count: experiences.length })}
                  </span>
                </div>
                {experiences.map((exp, idx) => (
                  <AnimatedSection key={`exp-${idx}`} delay={0.08 + idx * 0.04}>
                    <div className={`border rounded-2xl shadow-sm flex overflow-hidden ${cardBg} relative`}>
                      <div className="w-1.5 bg-[#FF2D55] flex-shrink-0" />
                      <div className="p-4 flex-1 flex flex-col gap-2 min-w-0">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <span className="text-[10px] font-extrabold text-[#FF2D55] uppercase tracking-wider leading-none">
                            {exp.period}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1 leading-none">
                            <MapPinSymbol className="w-2.5 h-2.5 shrink-0" />
                            {exp.location}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                            {exp.title}
                          </h3>
                          <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {exp.company}
                          </h4>
                        </div>

                        <ul className="space-y-1.5 mt-2">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                              <span className="text-[#FF2D55] mt-0.5 font-bold leading-none">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-bold bg-[#FF2D55]/10 text-[#FF2D55] px-2 py-0.5 rounded-md"
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
            )}
          </div>
        )}
      </div>
    </IPadSplitView>
  )
}
