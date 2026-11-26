'use client'

import React, { useState, useMemo, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import { WindowToolbar } from '@/components/shared/WindowToolbar'
import {
  EnvelopeSymbol,
  PhoneDeviceSymbol,
  GitHubGlyphSymbol,
  LinkedInGlyphSymbol,
  CopySymbol,
  MapPinSymbol,
  ClockSymbol,
  ArrowUpRightSymbol,
  PaperPlaneSymbol,
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
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [botcheck, setBotcheck] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    subject?: string
    message?: string
  }>({})
  const [formFeedback, setFormFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const composeFormRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const subjectInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)
  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])
  const { personalInfo } = portfolio

  const focusComposeForm = () => {
    composeFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    nameInputRef.current?.focus()
  }

  const handleComposeSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSending) return
    setFormFeedback(null)

    const trimmedName = senderName.trim()
    const trimmedEmail = senderEmail.trim()
    const trimmedSubject = subject.trim()
    const trimmedMessage = message.trim()
    const nextErrors: { name?: string; email?: string; subject?: string; message?: string } = {}

    if (!trimmedName) {
      nextErrors.name = tDesktop('errorNameRequired')
    }

    if (!trimmedEmail) {
      nextErrors.email = tDesktop('errorEmailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = tDesktop('errorEmailInvalid')
    }

    if (!trimmedSubject) {
      nextErrors.subject = tDesktop('errorSubjectRequired')
    }

    if (!trimmedMessage) {
      nextErrors.message = tDesktop('errorMessageRequired')
    }

    if (nextErrors.name || nextErrors.email || nextErrors.subject || nextErrors.message) {
      setFieldErrors(nextErrors)
      if (nextErrors.name) {
        nameInputRef.current?.focus()
      } else if (nextErrors.email) {
        emailInputRef.current?.focus()
      } else if (nextErrors.subject) {
        subjectInputRef.current?.focus()
      } else if (nextErrors.message) {
        messageInputRef.current?.focus()
      }
      return
    }

    setFieldErrors({})

    // Silently ignore honeypot-triggered bot submissions
    if (botcheck.trim()) {
      setSenderName('')
      setSenderEmail('')
      setSubject('')
      setMessage('')
      setBotcheck('')
      setFormFeedback({ type: 'success', text: tDesktop('sentBody') })
      return
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim()
    if (!accessKey) {
      const missingMsg = tDesktop('errorMissingKey')
      setFormFeedback({ type: 'error', text: missingMsg })
      onNotify?.(tDesktop('composeTitle'), missingMsg)
      return
    }

    setIsSending(true)
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          from_name: 'Portfolio Contact Form',
          replyto: trimmedEmail,
          botcheck: '',
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean
        message?: string
      }
      if (!response.ok || !data.success) {
        throw new Error(data.message || tDesktop('errorSend'))
      }

      setSenderName('')
      setSenderEmail('')
      setSubject('')
      setMessage('')
      setBotcheck('')
      setFormFeedback({ type: 'success', text: tDesktop('sentBody') })
      onNotify?.(tDesktop('sentTitle'), tDesktop('sentBody'))
    } catch (err) {
      const errText = err instanceof Error && err.message ? err.message : tDesktop('errorSend')
      setFormFeedback({ type: 'error', text: errText })
      onNotify?.(tDesktop('composeTitle'), errText)
    } finally {
      setIsSending(false)
    }
  }

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
        copyValue: personalInfo.email,
        copyLabel: tDesktop('copyEmail'),
        copyToast: tToast('copiedEmail'),
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
        copyValue: socialLinks.github,
        copyLabel: tDesktop('copyGithub'),
        copyToast: socialLinks.github,
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
        copyValue: socialLinks.linkedin,
        copyLabel: tDesktop('copyLinkedin'),
        copyToast: socialLinks.linkedin,
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
        copyValue: personalInfo.phone,
        copyLabel: tDesktop('copyPhone'),
        copyToast: tToast('copiedPhone'),
        href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`,
        actionLabel: tActions('callNow'),
        icon: <PhoneDeviceSymbol className="w-4 h-4 text-emerald-500" />,
      },
    ],
    [personalInfo.email, personalInfo.phone, tTabletContact, tActions, tDesktop, tToast]
  )

  const currentChannel = channels.find((c) => c.id === activeChannel) ?? channels[0]

  const toolbarButtons = [
    {
      icon: <CopySymbol className="w-3.5 h-3.5" />,
      label: currentChannel.copyLabel,
      onClick: () => copyToClipboard(currentChannel.copyValue, currentChannel.copyToast),
    },
  ]

  const cardClass = `rounded-xl border p-4 ${
    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white/85 border-black/10 shadow-sm'
  }`

  const getFieldClass = (hasError: boolean, extra = 'py-1.5') =>
    `w-full px-3 ${extra} rounded-lg border text-xs outline-none transition-all ${
      hasError
        ? isDark
          ? 'bg-[#FF453A]/[0.08] border-[#FF453A] ring-2 ring-[#FF453A]/20 text-white placeholder:text-white/40'
          : 'bg-[#FF3B30]/[0.04] border-[#FF3B30] ring-2 ring-[#FF3B30]/15 text-gray-900 placeholder:text-gray-400'
        : isDark
          ? 'bg-white/[0.06] border-white/10 focus:border-[#007AFF] text-white placeholder:text-white/40'
          : 'bg-black/[0.03] border-black/10 focus:border-[#007AFF] text-gray-900 placeholder:text-gray-400'
    }`

  const renderFieldError = (error?: string) =>
    error ? (
      <div
        role="alert"
        className={`flex items-center gap-1.5 text-[11px] font-medium ${
          isDark ? 'text-[#FF453A]' : 'text-[#FF3B30]'
        }`}
      >
        <span
          aria-hidden="true"
          className={`w-3.5 h-3.5 rounded-full text-[9px] font-bold text-white flex items-center justify-center shrink-0 ${
            isDark ? 'bg-[#FF453A]' : 'bg-[#FF3B30]'
          }`}
        >
          !
        </span>
        <span>{error}</span>
      </div>
    ) : null

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
                  onClick={() => copyToClipboard(currentChannel.copyValue, currentChannel.copyToast)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isDark
                      ? 'bg-white/[0.08] hover:bg-white/[0.14] text-white'
                      : 'bg-black/[0.06] hover:bg-black/[0.1] text-gray-800'
                  }`}
                >
                  <CopySymbol className="w-3.5 h-3.5" />
                  <span>{currentChannel.copyLabel}</span>
                </button>

                {currentChannel.id === 'email' ? (
                  <button
                    type="button"
                    onClick={focusComposeForm}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                  >
                    <span>{currentChannel.actionLabel}</span>
                    <PaperPlaneSymbol className="w-3.5 h-3.5" />
                  </button>
                ) : (
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
                )}
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

          {/* Inline Quick Compose (Web3Forms) */}
          <form
            ref={composeFormRef}
            onSubmit={handleComposeSend}
            noValidate
            className={`${cardClass} space-y-3`}
          >
            {/* Honeypot field for spam bots */}
            <input
              type="text"
              name="botcheck"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <PaperPlaneSymbol className="w-4 h-4 text-[#007AFF]" />
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {tDesktop('composeTitle')}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-start">
              <div className="space-y-1">
                <input
                  ref={nameInputRef}
                  type="text"
                  required
                  aria-required="true"
                  value={senderName}
                  onChange={(e) => {
                    setSenderName(e.target.value)
                    if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }))
                  }}
                  placeholder={tDesktop('namePlaceholder')}
                  aria-label={tDesktop('nameLabel')}
                  aria-invalid={Boolean(fieldErrors.name)}
                  className={getFieldClass(Boolean(fieldErrors.name))}
                />
                {renderFieldError(fieldErrors.name)}
              </div>
              <div className="space-y-1">
                <input
                  ref={emailInputRef}
                  type="email"
                  required
                  aria-required="true"
                  value={senderEmail}
                  onChange={(e) => {
                    setSenderEmail(e.target.value)
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  placeholder={tDesktop('emailPlaceholder')}
                  aria-label={tDesktop('emailLabel')}
                  aria-invalid={Boolean(fieldErrors.email)}
                  className={getFieldClass(Boolean(fieldErrors.email))}
                />
                {renderFieldError(fieldErrors.email)}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="space-y-1">
                <input
                  ref={subjectInputRef}
                  type="text"
                  required
                  aria-required="true"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value)
                    if (fieldErrors.subject) {
                      setFieldErrors((prev) => ({ ...prev, subject: undefined }))
                    }
                  }}
                  placeholder={tDesktop('subjectPlaceholder')}
                  aria-label={tDesktop('subjectLabel')}
                  aria-invalid={Boolean(fieldErrors.subject)}
                  className={getFieldClass(Boolean(fieldErrors.subject))}
                />
                {renderFieldError(fieldErrors.subject)}
              </div>
              <div className="space-y-1">
                <textarea
                  ref={messageInputRef}
                  rows={3}
                  required
                  aria-required="true"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    if (fieldErrors.message) {
                      setFieldErrors((prev) => ({ ...prev, message: undefined }))
                    }
                  }}
                  placeholder={tDesktop('messagePlaceholder')}
                  aria-label={tDesktop('messageLabel')}
                  aria-invalid={Boolean(fieldErrors.message)}
                  className={getFieldClass(Boolean(fieldErrors.message), 'py-2 resize-none')}
                />
                {renderFieldError(fieldErrors.message)}
              </div>
            </div>

            {formFeedback && (
              <p
                className={`text-[11.5px] font-medium ${
                  formFeedback.type === 'success' ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {formFeedback.text}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#007AFF] hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors"
              >
                <PaperPlaneSymbol className="w-3.5 h-3.5" />
                <span>{isSending ? tDesktop('sendingBtn') : tDesktop('sendBtn')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
