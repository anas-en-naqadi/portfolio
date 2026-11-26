'use client'

import React, { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData } from '@/lib/data'
import { WindowToolbar } from '@/components/shared/WindowToolbar'
import {
  BriefcaseSymbol,
  GraduationCapSymbol,
  CalendarSymbol,
  MapPinSymbol,
} from '@/components/shared/SFSymbols'

interface ExperienceWindowProps {
  theme?: 'dark' | 'light'
  onNotify?: (title: string, subtitle?: string) => void
}

type TimelineFilter = 'all' | 'work' | 'education'

export function ExperienceWindow({ theme = 'dark' }: ExperienceWindowProps) {
  const t = useTranslations('experience')
  const tDesktop = useTranslations('desktop.windows.experience')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [filter, setFilter] = useState<TimelineFilter>('all')
  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])
  const { experiences, education } = portfolio

  const toolbarButtons = [
    {
      icon: <BriefcaseSymbol className="w-3.5 h-3.5" />,
      label: tDesktop('all'),
      active: filter === 'all',
      onClick: () => setFilter('all'),
    },
    {
      icon: <GraduationCapSymbol className="w-3.5 h-3.5" />,
      label: tDesktop('education'),
      active: filter === 'education',
      onClick: () => setFilter('education'),
    },
  ]

  const cardClass = `rounded-xl border p-4 ${
    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white/80 border-black/10 shadow-sm'
  }`

  return (
    <div className="flex flex-col h-full">
      <WindowToolbar
        buttons={toolbarButtons}
        theme={theme}
        rightContent={
          <span className={`text-[11.5px] font-medium ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            {tDesktop('subtitle', { workCount: experiences.length, eduCount: education.length })}
          </span>
        }
      />

      <div className="macos-split-layout flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={`macos-split-sidebar p-3 ${isDark ? 'bg-white/[0.03]' : 'bg-black/[0.025]'}`}
        >
          <div
            className={`macos-desktop-only px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider ${
              isDark ? 'text-white/40' : 'text-gray-500'
            }`}
          >
            {tDesktop('sidebarTitle')}
          </div>
          <nav className="macos-sidebar-nav">
            {(
              [
                { id: 'all', label: tDesktop('all'), count: experiences.length + education.length },
                { id: 'work', label: tDesktop('work'), count: experiences.length },
                { id: 'education', label: tDesktop('education'), count: education.length },
              ] as const
            ).map((item) => {
              const active = filter === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#007AFF] text-white'
                      : isDark
                        ? 'text-white/80 hover:bg-white/[0.07]'
                        : 'text-gray-800 hover:bg-black/[0.05]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                      active
                        ? 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-white/[0.08] text-white/55'
                          : 'bg-black/[0.06] text-gray-600'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto macos-scroll p-5 space-y-6">
          {(filter === 'all' || filter === 'work') && (
            <section className="space-y-3.5">
              <div className="flex items-center gap-2">
                <BriefcaseSymbol className="w-4 h-4 text-[#007AFF]" />
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('title')}
                </h3>
              </div>

              <div className="space-y-3">
                {experiences.map((exp, idx) => (
                  <div key={`${exp.title}-${idx}`} className={cardClass}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4
                          className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                          {exp.title}
                        </h4>
                        <div className="text-xs font-semibold text-[#007AFF] mt-0.5">
                          {exp.company}
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                          isDark
                            ? 'bg-white/[0.07] text-white/75'
                            : 'bg-black/[0.05] text-gray-700'
                        }`}
                      >
                        <CalendarSymbol className="w-3 h-3 opacity-75" />
                        <span>{exp.period}</span>
                      </span>
                    </div>

                    {exp.description && exp.description.length > 0 && (
                      <ul
                        className={`space-y-1.5 text-[12px] pl-4 list-disc mb-3 ${
                          isDark ? 'text-white/75' : 'text-gray-600'
                        }`}
                      >
                        {exp.description.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                              isDark
                                ? 'bg-white/[0.07] text-white/75'
                                : 'bg-black/[0.05] text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(filter === 'all' || filter === 'education') && (
            <section className="space-y-3.5">
              <div className="flex items-center gap-2">
                <GraduationCapSymbol className="w-4 h-4 text-red-500" />
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('education.title')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {education.map((edu, idx) => (
                  <div key={`${edu.degree}-${idx}`} className={cardClass}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4
                        className={`text-[13.5px] font-bold leading-snug ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {edu.degree}
                      </h4>
                    </div>
                    <div
                      className={`text-xs font-semibold mb-2 ${
                        isDark ? 'text-red-400' : 'text-red-600'
                      }`}
                    >
                      {edu.institution}
                    </div>
                    <div
                      className={`flex flex-wrap items-center gap-3 text-[11px] ${
                        isDark ? 'text-white/55' : 'text-gray-500'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <CalendarSymbol className="w-3 h-3" />
                        <span>{edu.period}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPinSymbol className="w-3 h-3" />
                        <span>{edu.city}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
