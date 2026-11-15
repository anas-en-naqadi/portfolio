'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { experiences, education } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'
import { CalendarSymbol, MapPinSymbol } from '../shared/SFSymbols'

interface IPadExperienceProps {
  theme: 'dark' | 'light'
}

export default function IPadExperience({ theme }: IPadExperienceProps) {
  const t = useTranslations()
  const [showWork, setShowWork] = useState(true)
  const [showEdu, setShowEdu] = useState(true)
  const isDark = theme === 'dark'

  const sidebarBg = isDark ? 'bg-zinc-900/40' : 'bg-black/5'
  const detailBg = isDark ? 'bg-zinc-900/20' : 'bg-white/40'
  const cardBg = isDark ? 'bg-zinc-900 border-white/[0.04]' : 'bg-white border-black/[0.04]'

  // Calculate calendar dynamically
  const today = new Date()
  const currentDay = today.getDate()
  const currentYear = today.getFullYear()
  const monthName = today.toLocaleDateString('en-US', { month: 'long' })
  const calendarTitle = `${monthName} ${currentYear}`

  const firstDayIndex = new Date(currentYear, today.getMonth(), 1).getDay()
  const totalDays = new Date(currentYear, today.getMonth() + 1, 0).getDate()

  const calendarDays: Array<number | string> = []
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push('')
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i)
  }

  return (
    <div className="flex h-full w-full overflow-hidden select-none">
      {/* LEFT Side: iPadOS Calendar Sidebar */}
      <div className={`w-[260px] md:w-[280px] h-full flex-shrink-0 border-r ${isDark ? 'border-white/10' : 'border-black/10'} ${sidebarBg} p-4 flex flex-col gap-6 overflow-y-auto`}>
        {/* Calendar Month Widget */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center px-1">
            <span className={`text-xs font-extrabold uppercase tracking-wide ${isDark ? 'text-white' : 'text-zinc-800'}`}>
              {calendarTitle}
            </span>
          </div>
          
          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1.5 text-center text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
              <span key={idx} className="font-bold text-zinc-400 dark:text-zinc-500">{d}</span>
            ))}
            {calendarDays.map((day, idx) => (
              <span 
                key={idx} 
                className={`h-6 w-6 flex items-center justify-center rounded-full mx-auto ${
                  day === currentDay 
                    ? 'bg-blue-500 text-white font-extrabold shadow-sm' 
                    : day ? 'text-zinc-800 dark:text-zinc-200' : ''
                }`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        <hr className={isDark ? 'border-white/10' : 'border-black/10'} />

        {/* Calendar Filters list */}
        <div className="flex flex-col gap-3">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-zinc-500'} px-1`}>
            Calendars
          </span>
          <div className="flex flex-col gap-2">
            {/* Work Calendar Toggle */}
            <button
              onClick={() => setShowWork(!showWork)}
              className="flex items-center justify-between w-full px-2 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-left text-sm font-semibold transition-all"
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                    showWork 
                      ? 'bg-[#FF2D55] border-[#FF2D55]' 
                      : 'border-zinc-400 dark:border-zinc-600 bg-transparent'
                  }`}
                >
                  {showWork && <div className="w-1 h-1 bg-white rounded-full" />}
                </div>
                <span className={isDark ? 'text-zinc-200' : 'text-zinc-700'}>Work Experience</span>
              </div>
            </button>

            {/* Education Calendar Toggle */}
            <button
              onClick={() => setShowEdu(!showEdu)}
              className="flex items-center justify-between w-full px-2 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-left text-sm font-semibold transition-all"
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                    showEdu 
                      ? 'bg-[#007AFF] border-[#007AFF]' 
                      : 'border-zinc-400 dark:border-zinc-600 bg-transparent'
                  }`}
                >
                  {showEdu && <div className="w-1 h-1 bg-white rounded-full" />}
                </div>
                <span className={isDark ? 'text-zinc-200' : 'text-zinc-700'}>Education</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT Side: Schedule Event List */}
      <div className={`flex-1 h-full overflow-y-auto p-6 md:p-8 ${detailBg}`}>
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          <div className="flex flex-col gap-5">
            {/* Render Education Events */}
            {showEdu && (
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-400 uppercase tracking-wide px-1">
                  Academic Timeline
                </span>
                {education.map((edu, idx) => (
                  <AnimatedSection key={`edu-${idx}`} delay={0.05 + idx * 0.05}>
                    <div className={`border rounded-2xl shadow-sm flex overflow-hidden ${cardBg} relative`}>
                      <div className="w-1.5 bg-[#007AFF] flex-shrink-0" />
                      <div className="p-4 flex-1 flex flex-col gap-2 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-[9px] font-extrabold text-[#007AFF] uppercase tracking-widest leading-none">
                            {edu.period}
                          </span>
                          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1 leading-none">
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

            {/* Render Work Events */}
            {showWork && (
              <div className="flex flex-col gap-4 mt-2">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-400 uppercase tracking-wide px-1">
                  Professional Experience
                </span>
                {experiences.map((exp, idx) => (
                  <AnimatedSection key={`exp-${idx}`} delay={0.1 + idx * 0.05}>
                    <div className={`border rounded-2xl shadow-sm flex overflow-hidden ${cardBg} relative`}>
                      <div className="w-1.5 bg-[#FF2D55] flex-shrink-0" />
                      <div className="p-4 flex-1 flex flex-col gap-2 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-[9px] font-extrabold text-[#FF2D55] uppercase tracking-widest leading-none">
                            {exp.period}
                          </span>
                          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1 leading-none">
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

                        <div className="flex flex-wrap gap-1 mt-3">
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
            )}

            {!showWork && !showEdu && (
              <div className="flex flex-col items-center justify-center p-12 text-center text-zinc-400 dark:text-zinc-500">
                <CalendarSymbol className="w-9 h-9 text-zinc-400 dark:text-zinc-500 mb-2 shrink-0" />
                <p className="text-xs font-semibold">No calendars selected</p>
                <p className="text-[10px] mt-0.5">Select a calendar from the sidebar to view events.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
