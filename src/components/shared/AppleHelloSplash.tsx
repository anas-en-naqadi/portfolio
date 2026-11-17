'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface AppleHelloSplashProps {
  visible: boolean
  onComplete: () => void
}

function getInitialIsDark(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem('portfolio-theme') !== 'light'
  } catch {
    return true
  }
}

export function AppleHelloSplash({ visible, onComplete }: AppleHelloSplashProps) {
  const t = useTranslations('common.helloSplash')
  const prefersReducedMotion = useReducedMotion()
  const [isDark] = useState<boolean>(getInitialIsDark)

  useEffect(() => {
    if (!visible) return

    const autoCloseDelay = prefersReducedMotion ? 1400 : 2800
    const timer = setTimeout(onComplete, autoCloseDelay)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onComplete()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [visible, onComplete, prefersReducedMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('headline')}
          onClick={onComplete}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[200000] flex flex-col items-center justify-center px-6 py-8 select-none cursor-pointer ${
            isDark ? 'bg-[#050507] text-[#f5f5f7]' : 'bg-[#fbfbfd] text-[#1d1d1f]'
          }`}
        >
          {/* Subtle Apple-style ambient backdrop glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,680px)] h-[min(65vh,420px)] rounded-full blur-3xl ${
                isDark ? 'opacity-25' : 'opacity-35'
              }`}
              style={{
                background:
                  'radial-gradient(circle at 30% 40%, rgba(0, 122, 255, 0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(175, 82, 222, 0.32), transparent 55%)',
              }}
            />
          </div>

          <div
            className="relative z-10 flex flex-col items-center text-center max-w-xl"
            style={{
              fontFamily:
                '"SF Pro Display", -apple-system, BlinkMacSystemFont, var(--font-inter), sans-serif',
            }}
          >
            {/* Animated cursive "hello" stroke (Apple Setup Assistant style) */}
            <svg
              viewBox="0 0 270 105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-[190px] sm:w-[245px] md:w-[290px] h-auto mb-5 sm:mb-7"
            >
              <defs>
                <linearGradient id="appleHelloGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#007AFF" />
                  <stop offset="38%" stopColor="#AF52DE" />
                  <stop offset="72%" stopColor="#FF2D55" />
                  <stop offset="100%" stopColor="#FF9500" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 24 72 C 42 54, 62 30, 58 18 C 54 10, 42 18, 40 34 L 32 85 C 36 66, 50 52, 64 52 C 74 52, 74 68, 72 78 C 71 84, 78 86, 86 82 C 98 76, 114 66, 114 57 C 114 50, 102 49, 95 57 C 88 65, 90 83, 106 84 C 118 85, 128 76, 134 68 C 146 50, 162 28, 158 18 C 154 11, 143 18, 141 34 L 135 76 C 134 83, 142 86, 152 80 C 168 64, 190 32, 186 18 C 182 11, 171 18, 169 34 L 163 76 C 162 83, 170 86, 182 78 C 192 66, 198 52, 214 52 C 228 52, 232 66, 226 77 C 220 86, 202 87, 198 75 C 195 65, 206 52, 218 55 C 228 58, 234 66, 246 62"
                stroke="url(#appleHelloGradient)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 1.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            {/* Portfolio Welcome Sentence */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.75,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-[15px] sm:text-[18px] md:text-[21px] font-normal tracking-[-0.015em] leading-relaxed max-w-md mb-0 ${
                isDark ? 'text-white/90' : 'text-[#1d1d1f]/90'
              }`}
            >
              {t('headline')}
            </motion.p>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.95,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`mt-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] mb-0 ${
                isDark ? 'text-white/45' : 'text-[#6e6e73]'
              }`}
            >
              {t('subline')}
            </motion.p>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0.1 : 1.35, duration: 0.4 }}
            className={`absolute bottom-[max(1.75rem,env(safe-area-inset-bottom))] text-[11px] font-normal tracking-wide ${
              isDark ? 'text-white/40' : 'text-[#86868b]'
            }`}
          >
            {t('hint')}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
