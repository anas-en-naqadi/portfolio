'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CheckmarkSymbol, XMarkSymbol } from '@/components/shared/SFSymbols'

export interface MacToastData {
  id: number
  title: string
  subtitle?: string
  icon?: React.ReactNode
}

interface MacToastProps {
  toast: MacToastData | null
  theme?: 'dark' | 'light'
  onDismiss: () => void
}

export function MacToast({ toast, theme = 'dark', onDismiss }: MacToastProps) {
  const tToast = useTranslations('desktop.toast')
  const isDark = theme === 'dark'

  return (
    <div className="fixed top-9 right-4 z-[9995] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="pointer-events-auto flex items-center gap-3 px-3.5 py-2.5 rounded-2xl max-w-[330px] shadow-2xl"
            style={{
              background: isDark ? 'rgba(36, 36, 40, 0.82)' : 'rgba(255, 255, 255, 0.84)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: isDark
                ? '0 16px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.16)'
                : '0 14px 36px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: isDark ? 'rgba(10, 132, 255, 0.22)' : 'rgba(0, 122, 255, 0.14)',
                color: isDark ? '#60a5fa' : '#007aff',
              }}
            >
              {toast.icon ?? <CheckmarkSymbol className="w-4 h-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`text-[12.5px] font-semibold leading-tight truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {toast.title}
              </div>
              {toast.subtitle && (
                <div
                  className={`text-[11px] mt-0.5 leading-snug truncate ${
                    isDark ? 'text-white/65' : 'text-gray-600'
                  }`}
                >
                  {toast.subtitle}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label={tToast('dismiss')}
              className={`p-1 rounded-lg transition-colors shrink-0 ${
                isDark
                  ? 'text-white/40 hover:text-white hover:bg-white/10'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-black/5'
              }`}
            >
              <XMarkSymbol className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
