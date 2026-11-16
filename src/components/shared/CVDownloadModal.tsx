'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { personalInfo } from '@/lib/data'
import { DocumentTextSymbol, DownloadSymbol, XMarkSymbol } from '@/components/shared/SFSymbols'

export type CVLanguage = 'en' | 'fr'
export type CVModalVariant = 'macos' | 'ipados' | 'ios'

interface CVDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  onDownload: (lang: CVLanguage) => void
  theme?: 'dark' | 'light'
  variant: CVModalVariant
}

export function triggerCVDownload(lang: CVLanguage) {
  const url = personalInfo.cvPaths[lang]
  const filename = lang === 'en' ? 'ANAS-EN-NAQADI-CV-EN.pdf' : 'Anas-En-Naqadi-CV-FR.pdf'
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function CVDownloadModal({
  isOpen,
  onClose,
  onDownload,
  theme = 'dark',
  variant,
}: CVDownloadModalProps) {
  const t = useTranslations('common.cvModal')
  const isDark = theme === 'dark'

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const options: { lang: CVLanguage; code: string; title: string; subtitle: string }[] = [
    {
      lang: 'en',
      code: 'EN',
      title: t('englishTitle'),
      subtitle: t('englishSubtitle'),
    },
    {
      lang: 'fr',
      code: 'FR',
      title: t('frenchTitle'),
      subtitle: t('frenchSubtitle'),
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className={`fixed inset-0 z-[100050] flex justify-center bg-black/45 backdrop-blur-sm ${
            variant === 'ios'
              ? 'items-end px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4'
              : 'items-center p-4'
          }`}
        >
          {variant === 'ios' && (
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[400px] flex flex-col gap-2.5"
            >
              {/* Action Sheet Card */}
              <div
                className={`rounded-2xl overflow-hidden border backdrop-blur-2xl shadow-2xl ${
                  isDark
                    ? 'bg-zinc-900/90 border-white/15 text-white'
                    : 'bg-white/92 border-black/10 text-gray-900'
                }`}
              >
                <div
                  className={`px-4 py-3.5 text-center border-b ${
                    isDark ? 'border-white/10' : 'border-black/10'
                  }`}
                >
                  <div className="text-[13px] font-bold">{t('title')}</div>
                  <div
                    className={`text-[11.5px] mt-0.5 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}
                  >
                    {t('subtitle')}
                  </div>
                </div>

                <div className={`divide-y ${isDark ? 'divide-white/10' : 'divide-black/10'}`}>
                  {options.map((opt) => (
                    <button
                      key={opt.lang}
                      type="button"
                      onClick={() => onDownload(opt.lang)}
                      className={`w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left transition-colors ${
                        isDark
                          ? 'hover:bg-white/[0.08] active:bg-white/[0.12]'
                          : 'hover:bg-black/[0.04] active:bg-black/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-8 h-8 rounded-lg bg-[#007AFF]/15 text-[#007AFF] text-[11px] font-bold flex items-center justify-center shrink-0">
                          {opt.code}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[14px] font-semibold text-[#007AFF] truncate">
                            {opt.title}
                          </div>
                          <div
                            className={`text-[11px] truncate ${
                              isDark ? 'text-white/55' : 'text-gray-500'
                            }`}
                          >
                            {opt.subtitle}
                          </div>
                        </div>
                      </div>
                      <DownloadSymbol className="w-4 h-4 text-[#007AFF] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Detached Cancel Pill */}
              <button
                type="button"
                onClick={onClose}
                className={`w-full py-3.5 rounded-2xl border text-[15px] font-bold text-[#007AFF] backdrop-blur-2xl shadow-lg transition-colors ${
                  isDark
                    ? 'bg-zinc-900/92 border-white/15 hover:bg-zinc-800/95 active:bg-zinc-800'
                    : 'bg-white/95 border-black/10 hover:bg-white active:bg-gray-100'
                }`}
              >
                {t('cancel')}
              </button>
            </motion.div>
          )}

          {variant === 'ipados' && (
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-[340px] rounded-2xl overflow-hidden border backdrop-blur-2xl shadow-2xl ${
                isDark
                  ? 'bg-zinc-900/90 border-white/15 text-white'
                  : 'bg-white/92 border-black/10 text-gray-900'
              }`}
            >
              <div className="px-5 pt-5 pb-4 text-center">
                <div className="w-11 h-11 mx-auto mb-3 rounded-2xl bg-[#007AFF]/15 text-[#007AFF] flex items-center justify-center">
                  <DocumentTextSymbol className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-bold tracking-tight">{t('title')}</h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-white/65' : 'text-gray-500'}`}>
                  {t('subtitle')}
                </p>
              </div>

              <div className={`border-t divide-y ${isDark ? 'border-white/10 divide-white/10' : 'border-black/10 divide-black/10'}`}>
                {options.map((opt) => (
                  <button
                    key={opt.lang}
                    type="button"
                    onClick={() => onDownload(opt.lang)}
                    className={`w-full px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                      isDark
                        ? 'hover:bg-white/[0.08] active:bg-white/[0.12]'
                        : 'hover:bg-black/[0.04] active:bg-black/[0.08]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-[#007AFF]/15 text-[#007AFF] text-[10.5px] font-bold shrink-0">
                        {opt.code}
                      </span>
                      <span className="text-[13.5px] font-semibold text-[#007AFF] truncate">
                        {opt.title}
                      </span>
                    </span>
                    <DownloadSymbol className="w-4 h-4 text-[#007AFF] shrink-0" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={onClose}
                  className={`w-full py-3 text-center text-[13.5px] font-semibold transition-colors ${
                    isDark
                      ? 'text-white/75 hover:bg-white/[0.07]'
                      : 'text-gray-600 hover:bg-black/[0.04]'
                  }`}
                >
                  {t('cancel')}
                </button>
              </div>
            </motion.div>
          )}

          {variant === 'macos' && (
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 6 }}
              transition={{ duration: 0.16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[380px] rounded-2xl p-5 shadow-2xl"
              style={{
                background: isDark ? 'rgba(34, 34, 38, 0.90)' : 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.16)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                color: isDark ? '#f5f5f7' : '#1d1d1f',
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#007AFF]/15 text-[#007AFF] flex items-center justify-center shrink-0">
                    <DocumentTextSymbol className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-bold leading-tight truncate">{t('title')}</h3>
                    <p
                      className={`text-[11.5px] mt-0.5 ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}
                    >
                      {t('subtitle')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('cancel')}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                    isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-black/5 text-gray-500'
                  }`}
                >
                  <XMarkSymbol className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {options.map((opt) => (
                  <button
                    key={opt.lang}
                    type="button"
                    onClick={() => onDownload(opt.lang)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-left transition-colors ${
                      isDark
                        ? 'bg-white/[0.06] border-white/10 hover:bg-[#007AFF]/20 hover:border-[#007AFF]/45'
                        : 'bg-black/[0.03] border-black/10 hover:bg-[#007AFF]/10 hover:border-[#007AFF]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-[#007AFF] text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                        {opt.code}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-semibold truncate">{opt.title}</div>
                        <div
                          className={`text-[11px] truncate ${
                            isDark ? 'text-white/55' : 'text-gray-500'
                          }`}
                        >
                          {opt.subtitle}
                        </div>
                      </div>
                    </div>
                    <DownloadSymbol className="w-4 h-4 text-[#007AFF] shrink-0" />
                  </button>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isDark
                      ? 'bg-white/[0.08] hover:bg-white/[0.15] text-white/85'
                      : 'bg-black/[0.06] hover:bg-black/[0.1] text-gray-700'
                  }`}
                >
                  {t('cancel')}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
