'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  useEffect(() => {
    if (isOpen) {
      setMultitaskingOpen(false)
    }
  }, [isOpen, title])

  const panelBackground = isDark
    ? 'rgba(28, 28, 30, 0.98)'
    : 'rgba(242, 242, 247, 0.98)'

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
            className="absolute inset-0 z-40 flex flex-col overflow-hidden pt-10 pb-7 ipad-sheet-container"
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
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
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

            {/* iPad Home Indicator Grab Bar at the bottom to quit app */}
            <motion.button
              type="button"
              drag="y"
              dragConstraints={{ top: -150, bottom: 0 }}
              dragElastic={{ top: 0.2, bottom: 0 }}
              dragMomentum={false}
              onDragEnd={(_event, info) => {
                if (info.offset.y < -50) {
                  onClose()
                }
              }}
              className="group absolute bottom-0 h-7 px-6 pb-2 flex items-end justify-center cursor-grab active:cursor-grabbing z-50 touch-none border-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
              style={{ left: '50%', x: '-50%' }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              aria-label={t('returnHome')}
              title={t('returnHome')}
            >
              <span
                className={`w-[134px] h-[5px] rounded-full transition-all duration-150 group-hover:scale-y-125 ${
                  isDark
                    ? 'bg-zinc-500/65 group-hover:bg-white/80'
                    : 'bg-zinc-400/75 group-hover:bg-black/75'
                }`}
              />
            </motion.button>
          </motion.div>
        </IPadSheetContext.Provider>
      )}
    </AnimatePresence>
  )
}
