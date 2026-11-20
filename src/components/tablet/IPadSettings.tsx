'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { getLocalizedPortfolioData } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'
import IPadSplitView, { getIPadSidebarItemClasses } from './IPadSplitView'
import {
  BackwardEndSymbol,
  CheckmarkSymbol,
  ForwardEndSymbol,
  GlobeSymbol,
  MoonSymbol,
  MusicNoteSymbol,
  PauseSymbol,
  PersonSymbol,
  PhotoSymbol,
  PlaySymbol,
  SpeakerWaveSymbol,
} from '../shared/SFSymbols'
import { AudioEqualizerBars, useFocusAudio } from '../shared/FocusAudioProvider'

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

type SectionId = 'profile' | 'appearance' | 'audio' | 'wallpaper' | 'language'

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
  const tAudio = useTranslations('common.focusAudio')
  const { personalInfo } = getLocalizedPortfolioData(locale)
  const {
    tracks,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
  } = useFocusAudio()

  const { active: activeItemBg, inactive: hoverItemBg } = getIPadSidebarItemClasses(theme)

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
    { id: 'audio', label: tAudio('nowPlaying'), icon: <MusicNoteSymbol className="w-3.5 h-3.5" />, iconBg: 'bg-gradient-to-br from-[#007AFF] to-indigo-600' },
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
        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold truncate mt-0.5">
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
      detailPaddingClass="p-4 sm:p-6 md:p-10"
    >
      <div className="max-w-xl mx-auto flex flex-col gap-6">
          {activeSection === 'profile' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-5 sm:gap-6">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  {t('appleId')}
                </h2>

                <div className="bg-white dark:bg-[#2C2C2E] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm">
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
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold truncate">
                        {personalInfo.email}
                      </span>
                    </div>
                  </div>

                  <hr className="border-black/[0.05] dark:border-white/[0.05]" />

                  <div className="flex flex-col gap-3 text-xs font-semibold">
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{tAbout('phone')}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 truncate">{personalInfo.phone}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{t('roleLabel')}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 truncate text-right rtl:text-left">{personalInfo.title}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{t('locationLabel')}</span>
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

                <div className="bg-white dark:bg-[#2C2C2E] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 flex justify-between items-center gap-4 shadow-sm">
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

          {activeSection === 'audio' && (
            <AnimatedSection delay={0.05}>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight px-1">
                  {tAudio('nowPlaying')}
                </h2>

                <div
                  data-audio-control="true"
                  className="bg-white dark:bg-[#2C2C2E] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-black/[0.05] dark:divide-white/[0.05] shadow-sm"
                >
                  {/* Now Playing Row */}
                  <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#007AFF] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        {isPlaying ? <AudioEqualizerBars playing /> : <MusicNoteSymbol className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {tAudio(currentTrack.titleKey)}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {tAudio(currentTrack.artistKey)} • {isPlaying ? tAudio('playing') : tAudio('paused')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={prevTrack}
                        aria-label={tAudio('prev')}
                        className="w-8 h-8 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-gray-700 dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/15 active:scale-95 transition"
                      >
                        <BackwardEndSymbol className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? tAudio('pause') : tAudio('play')}
                        className="w-9 h-9 rounded-full bg-[#007AFF] text-white flex items-center justify-center hover:bg-blue-600 active:scale-95 transition shadow-sm"
                      >
                        {isPlaying ? <PauseSymbol className="w-4 h-4" /> : <PlaySymbol className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={nextTrack}
                        aria-label={tAudio('next')}
                        className="w-8 h-8 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-gray-700 dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/15 active:scale-95 transition"
                      >
                        <ForwardEndSymbol className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Track Picker Rows (iPadOS Checkmark List) */}
                  {tracks.map((track, idx) => {
                    const selected = idx === currentTrackIndex
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => selectTrack(idx)}
                        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-black/[0.025] dark:hover:bg-white/[0.03] active:bg-black/[0.05] dark:active:bg-white/[0.06] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              selected
                                ? isPlaying
                                  ? 'bg-emerald-500 animate-pulse'
                                  : 'bg-[#007AFF]'
                                : 'bg-gray-300 dark:bg-zinc-600'
                            }`}
                          />
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-semibold text-gray-900 dark:text-white truncate">
                              {tAudio(track.titleKey)}
                            </div>
                            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                              {tAudio(track.artistKey)}
                            </div>
                          </div>
                        </div>
                        {selected && <CheckmarkSymbol className="w-4 h-4 text-[#007AFF] shrink-0" />}
                      </button>
                    )
                  })}

                  {/* Volume Slider Row */}
                  <div className="px-4 sm:px-5 py-3.5 flex items-center gap-3">
                    <SpeakerWaveSymbol className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.02}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      aria-label={tAudio('volume')}
                      className="ios-volume-slider w-full cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #007AFF ${Math.round(volume * 100)}%, ${
                          isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(120, 120, 128, 0.24)'
                        } ${Math.round(volume * 100)}%)`,
                      }}
                    />
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tabular-nums w-8 text-right shrink-0">
                      {Math.round(volume * 100)}%
                    </span>
                  </div>
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

                <div className="bg-white dark:bg-[#2C2C2E] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-sm">
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

                <div className="bg-white dark:bg-[#2C2C2E] border border-black/[0.05] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-wrap justify-between items-center gap-4 shadow-sm">
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

                  <div className="bg-gray-100 dark:bg-[#1C1C1E] p-1 rounded-xl flex select-none shrink-0 self-start sm:self-auto">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => switchLocale(loc)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          locale === loc
                            ? 'bg-white dark:bg-[#3A3A3C] text-gray-900 dark:text-white shadow-sm'
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
