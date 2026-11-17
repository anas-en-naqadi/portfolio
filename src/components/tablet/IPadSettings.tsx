'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { getLocalizedPortfolioData } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'
import IPadSplitView from './IPadSplitView'
import { CheckmarkSymbol, GlobeSymbol, MoonSymbol, PersonSymbol, PhotoSymbol } from '../shared/SFSymbols'

export type TabletWallpaperId = 'default' | 'alt'

export const TABLET_WALLPAPERS: { id: TabletWallpaperId; image: string }[] = [
  { id: 'default', image: '/images/tablet-bg.webp' },
  { id: 'alt', image: '/images/tablet-bg-2.webp' },
]

interface IPadSettingsProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  onSwitchLocale?: (newLocale: string) => void
  wallpaper?: TabletWallpaperId
  onSelectWallpaper?: (wp: TabletWallpaperId) => void
}

type SectionId = 'profile' | 'appearance' | 'wallpaper' | 'language'

export default function IPadSettings({
  theme,
  toggleTheme,
  onSwitchLocale,
  wallpaper = 'default',
  onSelectWallpaper,
}: IPadSettingsProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('profile')
  const isDark = theme === 'dark'
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('tablet.settings')
  const tAbout = useTranslations('tablet.about')
  const { personalInfo } = getLocalizedPortfolioData(locale)

  const detailBg = isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]'
  const activeItemBg = isDark ? 'bg-[#3A3A3C] text-white' : 'bg-white text-black shadow-sm'
  const hoverItemBg = isDark ? 'hover:bg-white/5 text-zinc-400' : 'hover:bg-black/5 text-zinc-600'

  const switchLocale = (newLocale: string) => {
    if (onSwitchLocale) {
      onSwitchLocale(newLocale)
      return
    }
    router.replace(pathname, { locale: newLocale })
  }

  const sections = [
    { id: 'profile', label: t('sections.profile'), icon: <PersonSymbol className="w-3.5 h-3.5" />, iconBg: 'bg-blue-500' },
    { id: 'appearance', label: t('sections.appearance'), icon: <MoonSymbol className="w-3.5 h-3.5" />, iconBg: 'bg-indigo-500' },
    { id: 'wallpaper', label: t('sections.wallpaper'), icon: <PhotoSymbol className="w-3.5 h-3.5" />, iconBg: 'bg-sky-500' },
    { id: 'language', label: t('sections.general'), icon: <GlobeSymbol className="w-3.5 h-3.5" />, iconBg: 'bg-emerald-500' },
  ] as const

  const activeSectionLabel =
    sections.find((sec) => sec.id === activeSection)?.label ?? t('sidebarTitle')

  const appleIdBanner = (
    <button
      type="button"
      onClick={() => setActiveSection('profile')}
      className={`ipad-desktop-only items-center gap-3.5 p-3 rounded-2xl transition-all text-left rtl:text-right w-full ${
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
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold truncate mt-0.5">
          {t('appleId')}
        </span>
      </div>
    </button>
  )

  const sidebarNav = (
    <nav className="ipad-sidebar-nav w-full" aria-label={t('sidebarTitle')}>
      {sections.map((sec) => (
        <button
          key={sec.id}
          type="button"
          onClick={() => setActiveSection(sec.id)}
          className={`items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
            sec.id === 'profile' ? 'ipad-mobile-only' : 'flex'
          } ${activeSection === sec.id ? activeItemBg : hoverItemBg}`}
        >
          <div className={`w-6 h-6 rounded-lg ${sec.iconBg} text-white flex items-center justify-center text-xs shrink-0 shadow-sm`}>
            {sec.icon}
          </div>
          <span className="truncate">{sec.label}</span>
        </button>
      ))}
    </nav>
  )

  return (
    <IPadSplitView
      theme={theme}
      sidebarTitle={t('sidebarTitle')}
      sidebarHeaderExtra={appleIdBanner}
      sidebarContent={sidebarNav}
      detailTitle={activeSectionLabel}
      detailBgClass={detailBg}
      detailPaddingClass="p-4 sm:p-6 md:p-10"
    >
      <div className="max-w-xl mx-auto flex flex-col gap-6">
          {activeSection === 'profile' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-5 sm:gap-6">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  {t('appleId')}
                </h2>

                <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm">
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
                      <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {personalInfo.name}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold truncate">
                        {personalInfo.email}
                      </span>
                    </div>
                  </div>

                  <hr className="border-black/[0.05] dark:border-white/[0.05]" />

                  <div className="flex flex-col gap-3 text-xs font-semibold">
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400 dark:text-zinc-500 shrink-0">{tAbout('phone')}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 truncate">{personalInfo.phone}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400 dark:text-zinc-500 shrink-0">{t('roleLabel')}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 truncate text-right rtl:text-left">{personalInfo.title}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400 dark:text-zinc-500 shrink-0">{t('locationLabel')}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 truncate">{personalInfo.location}</span>
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
                  {t('sections.appearance')}
                </h2>

                <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 sm:p-5 flex justify-between items-center gap-4 shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 bg-indigo-500 text-white rounded-lg flex items-center justify-center shrink-0">
                      <MoonSymbol className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-gray-800 dark:text-zinc-200 truncate">
                        {t('darkMode')}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {t('darkModeDesc')}
                      </div>
                    </div>
                  </div>

                  {/* Accessible Apple Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isDark}
                    aria-label={t('darkMode')}
                    onClick={toggleTheme}
                    className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors duration-200 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 ${
                      isDark ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        isDark ? 'translate-x-[20px] rtl:-translate-x-[20px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {activeSection === 'wallpaper' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                    {t('sections.wallpaper')}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 px-1 mt-1">
                    {t('wallpaperDesc')}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 sm:p-5 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TABLET_WALLPAPERS.map((wp) => {
                      const selected = wallpaper === wp.id
                      return (
                        <button
                          key={wp.id}
                          type="button"
                          onClick={() => onSelectWallpaper?.(wp.id)}
                          className={`rounded-xl overflow-hidden border text-left transition-all ${
                            selected
                              ? 'border-[#007AFF] ring-2 ring-[#007AFF]'
                              : isDark
                                ? 'border-white/15 hover:border-white/30'
                                : 'border-black/10 hover:border-black/25'
                          }`}
                        >
                          <div
                            className="h-32 w-full relative"
                            style={{ background: `url('${wp.image}') center/cover` }}
                          >
                            {selected && (
                              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#007AFF] text-white flex items-center justify-center shadow">
                                <CheckmarkSymbol className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <div className="px-3 py-2 text-xs font-semibold flex items-center justify-between text-gray-900 dark:text-white">
                            <span>{t(`wallpapers.${wp.id}`)}</span>
                            {selected && <span className="text-[10.5px] text-[#007AFF]">Active</span>}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {activeSection === 'language' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  {t('systemLanguage')}
                </h2>

                <div className="bg-white dark:bg-zinc-900 border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 sm:p-5 flex flex-wrap justify-between items-center gap-4 shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center shrink-0">
                      <GlobeSymbol className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-gray-800 dark:text-zinc-200 truncate">
                        {t('systemLanguage')}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {t('systemLanguageDesc')}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl flex select-none shrink-0 self-start sm:self-auto">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => switchLocale(loc)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          locale === loc
                            ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
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
        </div>
    </IPadSplitView>
  )
}
