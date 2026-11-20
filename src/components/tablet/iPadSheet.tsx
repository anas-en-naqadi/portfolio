'use client'

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { HouseSymbol, XMarkSymbol } from '../shared/SFSymbols'

interface IPadSheetContextValue {
  closeApp: () => void
  appTitle: string
}

const IPadSheetContext = createContext<IPadSheetContextValue>({
  closeApp: () => {},
  appTitle: '',
})

export function useIPadSheet() {
  return useContext(IPadSheetContext)
}

interface IPadSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  icon: ReactNode
  children: ReactNode
  theme: 'dark' | 'light'
}

export default function IPadSheet({
  isOpen,
  onClose,
  title,
  icon,
  children,
  theme,
}: IPadSheetProps) {
  const t = useTranslations('tablet.sheet')
  const isDark = theme === 'dark'
  const [multitaskingOpen, setMultitaskingOpen] = useState(false)
  const [swipeProgress, setSwipeProgress] = useState(0)
  const didPanRef = useRef(false)

  useEffect(() => {
    if (isOpen) {
      setMultitaskingOpen(false)
      setSwipeProgress(0)
      didPanRef.current = false
    }
  }, [isOpen, title])

  const handleHomeBarPan = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (Math.abs(info.offset.y) > 4) {
      didPanRef.current = true
    }
    if (info.offset.y < 0) {
      setSwipeProgress(Math.min(1, Math.abs(info.offset.y) / 90))
    } else {
      setSwipeProgress(0)
    }
  }

  const handleHomeBarPanEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setSwipeProgress(0)
    // Match mobile IOSSheet physics & threshold: upward swipe or flick returns home
    if (info.offset.y < -28 || info.velocity.y < -180) {
      onClose()
    }
    setTimeout(() => {
      didPanRef.current = false
    }, 0)
  }

  const panelBackground = isDark
    ? 'rgba(28, 28, 30, 0.98)'
    : 'rgba(242, 242, 247, 0.98)'
  const homeBarColor = isDark ? 'bg-white/75' : 'bg-black/65'

  return (
    <AnimatePresence>
      {isOpen && (
        <IPadSheetContext.Provider
          value={{
            closeApp: onClose,
            appTitle: title,
          }}
        >
          <motion.div
            className="absolute inset-0 z-40 flex flex-col overflow-hidden pt-10 ipad-sheet-container"
            style={
              {
                background: panelBackground,
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                '--ipad-divider': isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.08)',
              } as React.CSSProperties
            }
            initial={{ y: '100%', opacity: 0.7, scale: 0.98 }}
            animate={{
              y: -swipeProgress * 28,
              opacity: 1 - swipeProgress * 0.2,
              scale: 1 - swipeProgress * 0.05,
            }}
            exit={{ y: -56, opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* iPadOS Top-Center Multitasking Control (•••) */}
            <div className="absolute top-[42px] left-1/2 -translate-x-1/2 z-40">
              <button
                type="button"
                onClick={() => setMultitaskingOpen((prev) => !prev)}
                aria-expanded={multitaskingOpen}
                aria-label={t('multitasking')}
                title={t('multitasking')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-[3px] transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  multitaskingOpen
                    ? isDark
                      ? 'bg-white/20 text-white'
                      : 'bg-black/15 text-zinc-900'
                    : isDark
                    ? 'hover:bg-white/10 text-zinc-500 hover:text-zinc-200'
                    : 'hover:bg-black/5 text-zinc-400 hover:text-zinc-800'
                }`}
              >
                <span className="w-1 h-1 rounded-full bg-current" />
                <span className="w-1 h-1 rounded-full bg-current" />
                <span className="w-1 h-1 rounded-full bg-current" />
              </button>

              <AnimatePresence>
                {multitaskingOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setMultitaskingOpen(false)}
                      aria-hidden="true"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute left-1/2 -translate-x-1/2 top-7 z-40 w-56 rounded-2xl p-2 shadow-2xl border backdrop-blur-2xl ${
                        isDark
                          ? 'bg-zinc-900/95 border-white/15 text-white'
                          : 'bg-white/95 border-black/10 text-zinc-900'
                      }`}
                    >
                      <div className={`flex items-center gap-2.5 px-2.5 py-2 mb-1 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <span className="w-5 h-5 flex items-center justify-center shrink-0">
                          {icon}
                        </span>
                        <span className="text-xs font-bold truncate flex-1">{title}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setMultitaskingOpen(false)
                            onClose()
                          }}
                          aria-label={t('close')}
                          className={`p-1 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                        >
                          <XMarkSymbol className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setMultitaskingOpen(false)
                          onClose()
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition"
                      >
                        <HouseSymbol className="w-4 h-4 shrink-0" />
                        <span>{t('returnHome')}</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Full-screen Edge-to-Edge App Content */}
            <div className="flex-1 min-h-0 overflow-hidden">{children}</div>

            {/* Transparent iPad Swipe-Up Home Bar (mirrors mobile IOSSheet physics without detaching the bar) */}
            <motion.button
              type="button"
              className="group absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-7 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-end justify-center z-50 cursor-grab active:cursor-grabbing touch-none select-none border-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-full"
              onPan={handleHomeBarPan}
              onPanEnd={handleHomeBarPanEnd}
              onClick={() => {
                if (!didPanRef.current) onClose()
              }}
              aria-label={t('returnHome')}
              title={t('returnHome')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClose()
                }
              }}
            >
              <span
                className={`w-[134px] h-[5px] rounded-full transition-transform duration-150 ${homeBarColor}`}
                style={{
                  transform: `scaleX(${1 + swipeProgress * 0.08})`,
                }}
              />
            </motion.button>
          </motion.div>
        </IPadSheetContext.Provider>
      )}
    </AnimatePresence>
  )
}
