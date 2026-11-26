'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'
import IPadSplitView, { getIPadSidebarItemClasses } from './IPadSplitView'
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
  const locale = useLocale()
  const t = useTranslations()
  const { personalInfo } = getLocalizedPortfolioData(locale)
  const [activeTab, setActiveTab] = useState<TabId>('contact')
  const isDark = theme === 'dark'

  const { active: activeTabBg, inactive: hoverTabBg } = getIPadSidebarItemClasses(theme)

  const sidebarTabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    {
      id: 'contact',
      label: t('tablet.about.contactDetails'),
      icon: <PersonSymbol className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'bio',
      label: t('tablet.about.summaryTitle'),
      icon: <DocumentTextSymbol className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'expertise',
      label: t('tablet.about.expertise'),
      icon: <GearSymbol className="w-4 h-4 shrink-0" />,
    },
  ]

  const expertiseList = [
    {
      icon: <LaptopCodeSymbol className="w-6 h-6 text-[#7E634B] dark:text-[#D7BFA8]" />,
      title: t('about.expertise.fullstack.title'),
      description: t('about.expertise.fullstack.description'),
    },
    {
      icon: <SparklesAISymbol className="w-6 h-6 text-[#7E634B] dark:text-[#D7BFA8]" />,
      title: t('about.expertise.performance.title'),
      description: t('about.expertise.performance.description'),
    },
    {
      icon: <DesignSymbol className="w-6 h-6 text-[#7E634B] dark:text-[#D7BFA8]" />,
      title: t('about.expertise.design.title'),
      description: t('about.expertise.design.description'),
    },
  ]

  const activeTabLabel =
    sidebarTabs.find((tab) => tab.id === activeTab)?.label ?? t('tablet.about.sidebarTitle')

  const sidebarNav = (
    <nav className="ipad-sidebar-nav" aria-label={t('tablet.about.sidebarTitle')}>
      {sidebarTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
            activeTab === tab.id ? activeTabBg : hoverTabBg
          }`}
        >
          <span className="flex items-center justify-center shrink-0">{tab.icon}</span>
          <span className="truncate">{tab.label}</span>
        </button>
      ))}
    </nav>
  )

  return (
    <IPadSplitView
      theme={theme}
      sidebarTitle={t('tablet.about.sidebarTitle')}
      sidebarContent={sidebarNav}
      detailTitle={activeTabLabel}
      detailPaddingClass="p-4 sm:p-6 md:p-8"
    >
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-5 sm:gap-6">
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col items-center pt-1 pb-2 text-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border border-black/10 dark:border-white/10 shadow-md">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                  {personalInfo.title}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto w-full">
                {[
                  {
                    label: t('tablet.about.phone'),
                    icon: <PhoneFillSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />,
                    href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`,
                  },
                  {
                    label: t('tablet.apps.mail'),
                    icon: <EnvelopeSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />,
                    href: `mailto:${personalInfo.email}`,
                  },
                  {
                    label: t('tablet.apps.github'),
                    icon: <GitHubGlyphSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />,
                    href: socialLinks.github,
                    external: true,
                  },
                  {
                    label: t('tablet.apps.linkedin'),
                    icon: <LinkedInGlyphSymbol className="w-5 h-5 text-[#7E634B] dark:text-[#D7BFA8] shrink-0" />,
                    href: socialLinks.linkedin,
                    external: true,
                  },
                ].map((action, idx) => (
                  <a
                    key={idx}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noopener noreferrer' : undefined}
                    className="group cursor-pointer flex flex-col items-center gap-1.5 p-2 sm:p-2.5 bg-white dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl hover:bg-[#FAF8F5] dark:hover:bg-[#3A3A3C] hover:border-[#9A7E64]/35 dark:hover:border-[#D7BFA8]/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shadow-sm active:scale-95 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7E64]/50"
                  >
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="quick-action-beat-ring pointer-events-none absolute inset-0 rounded-full border border-[#9A7E64]/55 dark:border-[#D7BFA8]/45"
                        style={{ animationDelay: `${idx * 0.25}s` }}
                      />
                      <div
                        className="quick-action-beat-icon w-full h-full rounded-full bg-gradient-to-br from-[#D7BFA8]/40 to-[#9A7E64]/20 dark:from-[#D7BFA8]/25 dark:to-[#9A7E64]/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ animationDelay: `${idx * 0.25}s` }}
                      >
                        {action.icon}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#7E634B] dark:text-[#D7BFA8] truncate max-w-full tracking-tight">
                      {action.label}
                    </span>
                  </a>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white dark:bg-[#2C2C2E] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl divide-y divide-black/[0.05] dark:divide-white/[0.08] shadow-sm overflow-hidden">
                <div className="p-4 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {t('tablet.about.phone')}
                  </span>
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-[#7E634B] dark:text-[#D7BFA8]">
                    {personalInfo.phone}
                  </a>
                </div>

                <div className="p-4 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {t('tablet.about.email')}
                  </span>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-[#7E634B] dark:text-[#D7BFA8] truncate">
                    {personalInfo.email}
                  </a>
                </div>

                <div className="p-4 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {t('tablet.about.location')}
                  </span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}

        {activeTab === 'bio' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-5 pt-1">
            <AnimatedSection delay={0.05}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                {t('about.profile.title')}
              </h2>
              <div className="bg-white mt-4 dark:bg-[#2C2C2E] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-sm leading-relaxed text-sm flex flex-col gap-4">
                <p className="text-zinc-700 dark:text-zinc-100 select-text">
                  {t('about.profile.description')}
                </p>
                <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.08] text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {personalInfo.subtitle}
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}

        {activeTab === 'expertise' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-5 pt-1">
            <AnimatedSection delay={0.05}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                {t('tablet.about.expertise')}
              </h2>
              <div className="flex flex-col gap-3.5">
                {expertiseList.map((exp, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 rounded-2xl border border-black/[0.05] dark:border-white/[0.08] bg-white dark:bg-[#2C2C2E] shadow-sm flex items-start gap-4"
                  >
                    <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#D7BFA8]/35 to-[#9A7E64]/20 dark:from-[#D7BFA8]/20 dark:to-[#9A7E64]/15 shrink-0">
                      {exp.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-1">
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
    </IPadSplitView>
  )
}
