'use client'

import React, { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData } from '@/lib/data'
import { WindowToolbar } from '@/components/shared/WindowToolbar'
import {
  ShareSymbol,
  DownloadSymbol,
  PersonSymbol,
  LaptopCodeSymbol,
  SparklesAISymbol,
  DesignSymbol,
  MapPinSymbol,
  EnvelopeSymbol,
  PhoneDeviceSymbol,
} from '@/components/shared/SFSymbols'

interface AboutWindowProps {
  theme?: 'dark' | 'light'
  onNotify?: (title: string, subtitle?: string) => void
  onDownloadCV?: () => void
}

type AboutSection = 'overview' | 'bio' | 'expertise'

export function AboutWindow({ theme = 'dark', onNotify, onDownloadCV }: AboutWindowProps) {
  const t = useTranslations('about')
  const tCommon = useTranslations('common')
  const tDesktop = useTranslations('desktop.windows')
  const tToast = useTranslations('desktop.toast')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [section, setSection] = useState<AboutSection>('overview')
  const [avatarFailed, setAvatarFailed] = useState(false)
  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])
  const { personalInfo } = portfolio

  const handleCopy = async (text: string, subtitle: string) => {
    try {
      await navigator.clipboard.writeText(text)
      onNotify?.(tToast('copiedTitle'), subtitle)
    } catch {
      onNotify?.(tToast('copiedTitle'), text)
    }
  }

  const handleShare = async () => {
    const shareText = `${personalInfo.name} — ${tDesktop('about.role')} (${personalInfo.email})`
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: personalInfo.name,
          text: shareText,
          url: window.location.href,
        })
        return
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
      }
    }
    await handleCopy(shareText, tToast('copiedProfile'))
  }

  const handleDownloadCV = () => {
    if (onDownloadCV) {
      onDownloadCV()
      return
    }
    onNotify?.(tToast('downloadTitle'), tToast('downloadBody'))
    window.open(personalInfo.cvPath, '_blank', 'noopener,noreferrer')
  }

  const toolbarButtons = [
    {
      icon: <ShareSymbol className="w-3.5 h-3.5" />,
      label: tDesktop('actions.share'),
      onClick: handleShare,
    },
    {
      icon: <DownloadSymbol className="w-3.5 h-3.5" />,
      label: tCommon('downloadCV'),
      onClick: handleDownloadCV,
    },
  ]

  const cardClass = `rounded-xl border p-4 transition-colors ${
    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white/80 border-black/10 shadow-sm'
  }`

  const expertiseCards = [
    {
      icon: <LaptopCodeSymbol className="w-5 h-5 text-blue-500" />,
      title: t('expertise.fullstack.title'),
      desc: t('expertise.fullstack.description'),
    },
    {
      icon: <SparklesAISymbol className="w-5 h-5 text-purple-500" />,
      title: t('expertise.performance.title'),
      desc: t('expertise.performance.description'),
    },
    {
      icon: <DesignSymbol className="w-5 h-5 text-pink-500" />,
      title: t('expertise.design.title'),
      desc: t('expertise.design.description'),
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <WindowToolbar buttons={toolbarButtons} theme={theme} />

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
            {tDesktop('about.sidebarTitle')}
          </div>
          <nav className="macos-sidebar-nav">
            {(
              [
                { id: 'overview', label: tDesktop('about.overview') },
                { id: 'bio', label: tDesktop('about.bio') },
                { id: 'expertise', label: tDesktop('about.expertise') },
              ] as const
            ).map((item) => {
              const active = section === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#007AFF] text-white'
                      : isDark
                        ? 'text-white/80 hover:bg-white/[0.07]'
                        : 'text-gray-800 hover:bg-black/[0.05]'
                  }`}
                >
                  <PersonSymbol className="w-3.5 h-3.5 shrink-0 opacity-85" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Detail Pane */}
        <div className="flex-1 overflow-y-auto macos-scroll p-5 space-y-5">
          {/* Profile Card */}
          <div className={cardClass}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#007AFF] to-indigo-600 text-white text-xl font-bold flex items-center justify-center shrink-0 shadow-lg ring-1 ring-white/20">
                {personalInfo.profileImage && !avatarFailed ? (
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    onError={() => setAvatarFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  'AE'
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    className={`text-xl font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {personalInfo.name}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {tDesktop('about.status')}
                  </span>
                </div>
                <p className={`text-xs font-medium mt-1 ${isDark ? 'text-[#D7BFA8]' : 'text-[#8C6F55]'}`}>
                  {tDesktop('about.role')}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.email, tToast('copiedEmail'))}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium transition-colors ${
                      isDark
                        ? 'bg-white/[0.07] hover:bg-white/[0.12] text-white/85'
                        : 'bg-black/[0.05] hover:bg-black/[0.09] text-gray-700'
                    }`}
                  >
                    <EnvelopeSymbol className="w-3.5 h-3.5 text-[#007AFF]" />
                    <span>{personalInfo.email}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.phone, tToast('copiedPhone'))}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium transition-colors ${
                      isDark
                        ? 'bg-white/[0.07] hover:bg-white/[0.12] text-white/85'
                        : 'bg-black/[0.05] hover:bg-black/[0.09] text-gray-700'
                    }`}
                  >
                    <PhoneDeviceSymbol className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{personalInfo.phone}</span>
                  </button>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium ${
                      isDark ? 'bg-white/[0.05] text-white/65' : 'bg-black/[0.04] text-gray-600'
                    }`}
                  >
                    <MapPinSymbol className="w-3.5 h-3.5 text-rose-500" />
                    <span>{personalInfo.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {(section === 'overview' || section === 'bio') && (
            <div className={cardClass}>
              <h3
                className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {t('profile.title')}
              </h3>
              <p className={`text-[13px] leading-relaxed ${isDark ? 'text-white/75' : 'text-gray-600'}`}>
                {t('profile.description')}
              </p>
            </div>
          )}

          {(section === 'overview' || section === 'expertise') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {expertiseCards.map((card) => (
                <div key={card.title} className={cardClass}>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                      isDark ? 'bg-white/[0.07]' : 'bg-black/[0.05]'
                    }`}
                  >
                    {card.icon}
                  </div>
                  <h4
                    className={`text-[13px] font-bold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {card.title}
                  </h4>
                  <p className={`text-[12px] leading-relaxed ${isDark ? 'text-white/65' : 'text-gray-600'}`}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
