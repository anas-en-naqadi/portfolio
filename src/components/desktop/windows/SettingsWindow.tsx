'use client'

import React, { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import {
  PersonSymbol,
  MoonSymbol,
  SunSymbol,
  PhotoSymbol,
  GlobeSymbol,
  CheckmarkSymbol,
  ArrowUpRightSymbol,
} from '@/components/shared/SFSymbols'
import type { WallpaperPresetId } from '../MacOSMenuBar'

type SettingsSection = 'profile' | 'appearance' | 'wallpaper' | 'language'

interface SettingsWindowProps {
  theme: 'dark' | 'light'
  wallpaper: WallpaperPresetId
  onToggleTheme: () => void
  onSelectWallpaper: (wp: WallpaperPresetId) => void
  onSwitchLanguage: () => void
  onDownloadCV?: () => void
}

const WALLPAPERS: { id: WallpaperPresetId; gradient: string }[] = [
  { id: 'default', gradient: 'url(/images/desktop-bg.webp) center/cover' },
  { id: 'workspace', gradient: 'url(/images/desktop-bg-2.webp) center/cover' },
]

export function SettingsWindow({
  theme,
  wallpaper,
  onToggleTheme,
  onSelectWallpaper,
  onSwitchLanguage,
  onDownloadCV,
}: SettingsWindowProps) {
  const tSettings = useTranslations('desktop.windows.settings')
  const tWp = useTranslations('desktop.wallpapers')
  const tMenu = useTranslations('desktop.menuBar.controlCenter')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [section, setSection] = useState<SettingsSection>('appearance')
  const [avatarFailed, setAvatarFailed] = useState(false)
  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])

  const navItems: { id: SettingsSection; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'profile',
      label: tSettings('sections.profile'),
      icon: <PersonSymbol className="w-3.5 h-3.5 text-white" />,
      color: 'bg-[#007AFF]',
    },
    {
      id: 'appearance',
      label: tSettings('sections.appearance'),
      icon: isDark ? (
        <MoonSymbol className="w-3.5 h-3.5 text-white" />
      ) : (
        <SunSymbol className="w-3.5 h-3.5 text-white" />
      ),
      color: 'bg-indigo-500',
    },
    {
      id: 'wallpaper',
      label: tSettings('sections.wallpaper'),
      icon: <PhotoSymbol className="w-3.5 h-3.5 text-white" />,
      color: 'bg-emerald-500',
    },
    {
      id: 'language',
      label: tSettings('sections.language'),
      icon: <GlobeSymbol className="w-3.5 h-3.5 text-white" />,
      color: 'bg-sky-500',
    },
  ]

  const cardClass = `rounded-xl border p-4 ${
    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white/75 border-black/10'
  }`

  return (
    <div className="macos-split-layout">
      {/* Sidebar */}
      <aside
        className={`macos-split-sidebar p-3 flex flex-col gap-3 ${
          isDark ? 'bg-white/[0.03]' : 'bg-black/[0.025]'
        }`}
      >
        <div className="macos-desktop-only px-2 pt-1 pb-2 items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-[#007AFF] to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 ring-1 ring-white/20">
            {portfolio.personalInfo.profileImage && !avatarFailed ? (
              <img
                src={portfolio.personalInfo.profileImage}
                alt={portfolio.personalInfo.name}
                onError={() => setAvatarFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              'AE'
            )}
          </div>
          <div className="min-w-0">
            <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {portfolio.personalInfo.name}
            </div>
            <div className={`text-[11px] truncate ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              {tSettings('sections.profile')}
            </div>
          </div>
        </div>

        <nav className="macos-sidebar-nav" aria-label={tSettings('sidebarTitle')}>
          {navItems.map((item) => {
            const active = section === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#007AFF] text-white'
                    : isDark
                      ? 'text-white/80 hover:bg-white/[0.07]'
                      : 'text-gray-800 hover:bg-black/[0.05]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                    active ? 'bg-white/20' : item.color
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto macos-scroll p-6 space-y-5">
        <div>
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {tSettings(`sections.${section}`)}
          </h2>
        </div>

        {section === 'profile' && (
          <div className={`${cardClass} space-y-4`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#007AFF] to-purple-600 text-white text-xl font-bold flex items-center justify-center shrink-0 shadow-lg ring-1 ring-white/20">
                {portfolio.personalInfo.profileImage && !avatarFailed ? (
                  <img
                    src={portfolio.personalInfo.profileImage}
                    alt={portfolio.personalInfo.name}
                    onError={() => setAvatarFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  'AE'
                )}
              </div>
              <div className="min-w-0">
                <div className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {portfolio.personalInfo.name}
                </div>
                <div className="text-xs font-medium text-[#007AFF] mt-0.5">
                  {portfolio.personalInfo.title}
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-white/55' : 'text-gray-500'}`}>
                  {portfolio.personalInfo.email}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div
                className={`flex justify-between py-2 border-t ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <span className={isDark ? 'text-white/55' : 'text-gray-500'}>
                  {tSettings('phoneLabel')}
                </span>
                <span className="font-semibold">{portfolio.personalInfo.phone}</span>
              </div>
              <div
                className={`flex justify-between py-2 border-t ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <span className={isDark ? 'text-white/55' : 'text-gray-500'}>
                  {tSettings('locationLabel')}
                </span>
                <span className="font-semibold">{portfolio.personalInfo.location}</span>
              </div>
              <div
                className={`flex justify-between py-2 border-t ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <span className={isDark ? 'text-white/55' : 'text-gray-500'}>
                  {tSettings('timezoneLabel')}
                </span>
                <span className="font-semibold">{portfolio.personalInfo.timezone}</span>
              </div>
            </div>

            <div
              className={`pt-3 border-t flex flex-wrap justify-end gap-2 ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              {onDownloadCV ? (
                <button
                  type="button"
                  onClick={onDownloadCV}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-black/5 hover:bg-black/10 text-gray-900'
                  }`}
                >
                  {tSettings('downloadCV')}
                </button>
              ) : (
                <a
                  href={portfolio.personalInfo.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-black/5 hover:bg-black/10 text-gray-900'
                  }`}
                >
                  {tSettings('downloadCV')}
                </a>
              )}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#007AFF] text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRightSymbol className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {section === 'appearance' && (
          <div className={cardClass}>
            <p className={`text-xs mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              {tSettings('appearanceDesc')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!isDark) onToggleTheme()
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isDark
                    ? 'border-[#007AFF] bg-[#007AFF]/10 ring-1 ring-[#007AFF]'
                    : 'border-black/10 hover:border-black/25'
                }`}
              >
                <div className="h-20 rounded-lg bg-[#141418] border border-white/10 p-2 mb-2.5 flex flex-col justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="h-2.5 w-2/3 rounded bg-white/15" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{tMenu('dark')}</span>
                  {isDark && <CheckmarkSymbol className="w-3.5 h-3.5 text-[#007AFF]" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isDark) onToggleTheme()
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  !isDark
                    ? 'border-[#007AFF] bg-[#007AFF]/10 ring-1 ring-[#007AFF]'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div className="h-20 rounded-lg bg-[#f2f2f7] border border-black/10 p-2 mb-2.5 flex flex-col justify-between">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="h-2.5 w-2/3 rounded bg-black/15" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{tMenu('light')}</span>
                  {!isDark && <CheckmarkSymbol className="w-3.5 h-3.5 text-[#007AFF]" />}
                </div>
              </button>
            </div>
          </div>
        )}

        {section === 'wallpaper' && (
          <div className={cardClass}>
            <p className={`text-xs mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              {tSettings('wallpaperDesc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {WALLPAPERS.map((wp) => {
                const selected = wallpaper === wp.id
                return (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => onSelectWallpaper(wp.id)}
                    className={`rounded-xl overflow-hidden border text-left transition-all ${
                      selected
                        ? 'border-[#007AFF] ring-2 ring-[#007AFF]'
                        : isDark
                          ? 'border-white/15 hover:border-white/30'
                          : 'border-black/10 hover:border-black/30'
                    }`}
                  >
                    <div className="h-32 w-full" style={{ background: wp.gradient }} />
                    <div
                      className={`px-3 py-2 text-xs font-semibold flex items-center justify-between ${
                        isDark ? 'bg-white/[0.04]' : 'bg-black/[0.02]'
                      }`}
                    >
                      <span>{tWp(wp.id)}</span>
                      {selected && <CheckmarkSymbol className="w-3.5 h-3.5 text-[#007AFF]" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {section === 'language' && (
          <div className={cardClass}>
            <p className={`text-xs mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              {tSettings('languageDesc')}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(['en', 'fr'] as const).map((lang) => {
                const active = locale === lang
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      if (!active) onSwitchLanguage()
                    }}
                    className={`px-4 py-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                      active
                        ? 'border-[#007AFF] bg-[#007AFF]/15 text-[#007AFF]'
                        : isDark
                          ? 'border-white/10 hover:bg-white/[0.06] text-white'
                          : 'border-black/10 hover:bg-black/[0.04] text-gray-900'
                    }`}
                  >
                    <span>{lang === 'en' ? 'English (US)' : 'Français (FR)'}</span>
                    {active && <CheckmarkSymbol className="w-4 h-4" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
