'use client'

import React, { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import { WindowToolbar } from '@/components/shared/WindowToolbar'
import {
  EnvelopeSymbol,
  PhoneDeviceSymbol,
  GitHubGlyphSymbol,
  LinkedInGlyphSymbol,
  CopySymbol,
  VCardSymbol,
  MapPinSymbol,
  ClockSymbol,
  ArrowUpRightSymbol,
} from '@/components/shared/SFSymbols'

interface ContactWindowProps {
  theme?: 'dark' | 'light'
  onNotify?: (title: string, subtitle?: string) => void
}

type ChannelId = 'email' | 'github' | 'linkedin' | 'phone'

export function ContactWindow({ theme = 'dark', onNotify }: ContactWindowProps) {
  const t = useTranslations('contact')
  const tTabletContact = useTranslations('tablet.contact')
  const tDesktop = useTranslations('desktop.windows.contact')
  const tActions = useTranslations('desktop.windows.actions')
  const tToast = useTranslations('desktop.toast')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [activeChannel, setActiveChannel] = useState<ChannelId>('email')
  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])
  const { personalInfo } = portfolio

  const copyToClipboard = async (value: string, subtitle: string) => {
    try {
      await navigator.clipboard.writeText(value)
      onNotify?.(tToast('copiedTitle'), subtitle)
    } catch {
      onNotify?.(tToast('copiedTitle'), value)
    }
  }

  const channels = useMemo(
    () => [
      {
        id: 'email' as const,
        sender: tTabletContact('channels.email.sender'),
        subject: tTabletContact('channels.email.subject'),
        body: tTabletContact('channels.email.body'),
        value: personalInfo.email,
        href: `mailto:${personalInfo.email}`,
        actionLabel: tActions('openMail'),
        icon: <EnvelopeSymbol className="w-4 h-4 text-[#007AFF]" />,
      },
      {
        id: 'github' as const,
        sender: tTabletContact('channels.github.sender'),
        subject: tTabletContact('channels.github.subject'),
        body: tTabletContact('channels.github.body'),
        value: 'github.com/anas-en-naqadi',
        href: socialLinks.github,
        actionLabel: tActions('openGithub'),
        icon: <GitHubGlyphSymbol className="w-4 h-4" />,
      },
      {
        id: 'linkedin' as const,
        sender: tTabletContact('channels.linkedin.sender'),
        subject: tTabletContact('channels.linkedin.subject'),
        body: tTabletContact('channels.linkedin.body'),
        value: 'linkedin.com/in/anas-en-naqadi',
        href: socialLinks.linkedin,
        actionLabel: tTabletContact('openLink'),
        icon: <LinkedInGlyphSymbol className="w-4 h-4 text-[#0A66C2]" />,
      },
      {
        id: 'phone' as const,
        sender: tTabletContact('channels.phone.sender'),
        subject: tTabletContact('channels.phone.subject'),
        body: tTabletContact('channels.phone.body'),
        value: personalInfo.phone,
        href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`,
        actionLabel: tActions('callNow'),
        icon: <PhoneDeviceSymbol className="w-4 h-4 text-emerald-500" />,
      },
    ],
    [personalInfo.email, personalInfo.phone, tTabletContact, tActions]
  )

  const currentChannel = channels.find((c) => c.id === activeChannel) ?? channels[0]

  const toolbarButtons = [
    {
      icon: <CopySymbol className="w-3.5 h-3.5" />,
      label: tTabletContact('copyInfo'),
      onClick: () => copyToClipboard(personalInfo.email, tToast('copiedEmail')),
    },
    {
      icon: <VCardSymbol className="w-3.5 h-3.5" />,
      label: tActions('copyVCard'),
      onClick: () =>
        copyToClipboard(
          `BEGIN:VCARD\nFN:${personalInfo.name}\nEMAIL:${personalInfo.email}\nTEL:${personalInfo.phone}\nEND:VCARD`,
          tToast('copiedVCard')
        ),
    },
  ]

  const cardClass = `rounded-xl border p-4 ${
    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white/85 border-black/10 shadow-sm'
  }`

  return (
    <div className="flex flex-col h-full">
      <WindowToolbar buttons={toolbarButtons} theme={theme} />

      <div className="macos-split-layout flex-1 min-h-0">
        {/* Sidebar: Direct Channels */}
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
            {channels.map((ch) => {
              const active = activeChannel === ch.id
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChannel(ch.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#007AFF] text-white'
                      : isDark
                        ? 'text-white/85 hover:bg-white/[0.07]'
                        : 'text-gray-800 hover:bg-black/[0.05]'
                  }`}
                >
                  <span className={active ? '[&_svg]:text-white' : ''}>{ch.icon}</span>
                  <span className="text-[12.5px] font-medium truncate">{ch.sender}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Detail Pane */}
        <div className="flex-1 overflow-y-auto macos-scroll p-5 space-y-4">
          {/* Selected Channel Detail */}
          <div className={cardClass}>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-white/[0.08]' : 'bg-black/[0.05]'
                  }`}
                >
                  {currentChannel.icon}
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {currentChannel.subject}
                  </h3>
                  <div className="text-xs font-medium text-[#007AFF] mt-0.5">
                    {currentChannel.value}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(currentChannel.value, currentChannel.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isDark
                      ? 'bg-white/[0.08] hover:bg-white/[0.14] text-white'
                      : 'bg-black/[0.06] hover:bg-black/[0.1] text-gray-800'
                  }`}
                >
                  <CopySymbol className="w-3.5 h-3.5" />
                  <span>{tTabletContact('copyInfo')}</span>
                </button>

                <a
                  href={currentChannel.href}
                  target={currentChannel.id === 'github' || currentChannel.id === 'linkedin' ? '_blank' : undefined}
                  rel={
                    currentChannel.id === 'github' || currentChannel.id === 'linkedin'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                >
                  <span>{currentChannel.actionLabel}</span>
                  <ArrowUpRightSymbol className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className={`text-[13px] leading-relaxed ${isDark ? 'text-white/75' : 'text-gray-600'}`}>
              {currentChannel.body}
            </p>
          </div>

          {/* Availability & Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={cardClass}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {tDesktop('availabilityTitle')}
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
                  {tDesktop('availabilityBadge')}
                </span>
              </div>
              <p className={`text-[12px] leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                {tDesktop('availabilityDesc')}
              </p>
            </div>

            <div className={cardClass}>
              <h4 className={`text-xs font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('location.title')}
              </h4>
              <div className={`space-y-1.5 text-[12px] ${isDark ? 'text-white/75' : 'text-gray-600'}`}>
                <div className="flex items-center gap-2">
                  <MapPinSymbol className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockSymbol className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    {t('location.timezone')}: {personalInfo.timezone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
