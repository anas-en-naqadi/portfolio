'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DynamicIslandProps {
  activeApp?: string | null
  activeLang?: string
}

export default function DynamicIsland({ activeApp, activeLang }: DynamicIslandProps) {
  const [islandState, setIslandState] = useState<'collapsed' | 'appOpen' | 'langChange' | 'hover'>('collapsed')
  const [prevApp, setPrevApp] = useState<string | null>(null)
  const [prevLang, setPrevLang] = useState<string>('')

  useEffect(() => {
    if (activeApp && activeApp !== 'home' && activeApp !== prevApp) {
      setIslandState('appOpen')
      setPrevApp(activeApp)
      const timer = setTimeout(() => {
        setIslandState('collapsed')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [activeApp, prevApp])

  useEffect(() => {
    if (activeLang && prevLang && activeLang !== prevLang) {
      setIslandState('langChange')
      setPrevLang(activeLang)
      const timer = setTimeout(() => {
        setIslandState('collapsed')
      }, 2000)
      return () => clearTimeout(timer)
    } else if (activeLang && !prevLang) {
      setPrevLang(activeLang)
    }
  }, [activeLang, prevLang])

  const appMeta: Record<string, { icon: string; name: string }> = {
    about: { icon: '👤', name: 'About Me' },
    experience: { icon: '💼', name: 'Experience' },
    projects: { icon: '🚀', name: 'Projects' },
    skills: { icon: '📝', name: 'Skills' },
    contact: { icon: '📧', name: 'Contact' },
    settings: { icon: '⚙️', name: 'Settings' },
  }

  const langNames: Record<string, { flag: string; name: string }> = {
    en: { flag: '🇺🇸', name: 'English' },
    fr: { flag: '🇫🇷', name: 'Français' },
    ar: { flag: '🇲🇦', name: 'العربية' },
  }

  // Define sizes and contents based on active state
  const isHovered = islandState === 'hover'
  const isAppOpen = islandState === 'appOpen'
  const isLangChange = islandState === 'langChange'

  let width = 110
  let height = 30
  let borderRadius = 20

  if (isHovered) {
    width = 160
    height = 36
  } else if (isAppOpen && activeApp && appMeta[activeApp]) {
    width = 200
    height = 42
    borderRadius = 22
  } else if (isLangChange && activeLang && langNames[activeLang]) {
    width = 180
    height = 42
    borderRadius = 22
  }

  return (
    <div
      className="fixed top-2.5 left-1/2 -translate-x-1/2 z-[100000] select-none pointer-events-auto"
      onMouseEnter={() => islandState === 'collapsed' && setIslandState('hover')}
      onMouseLeave={() => islandState === 'hover' && setIslandState('collapsed')}
    >
      <motion.div
        animate={{ width, height, borderRadius }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        className="bg-black border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden px-4"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key="hover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] text-white/90 font-semibold tracking-wide flex items-center gap-2"
            >
              <span>Dynamic Island</span>
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
          )}

          {isAppOpen && activeApp && appMeta[activeApp] && (
            <motion.div
              key="appOpen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex items-center justify-between text-xs text-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{appMeta[activeApp].icon}</span>
                <span className="font-semibold">{appMeta[activeApp].name}</span>
              </div>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Opened</span>
            </motion.div>
          )}

          {isLangChange && activeLang && langNames[activeLang] && (
            <motion.div
              key="langChange"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex items-center justify-between text-xs text-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{langNames[activeLang].flag}</span>
                <span className="font-semibold">{langNames[activeLang].name}</span>
              </div>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Set</span>
            </motion.div>
          )}

          {islandState === 'collapsed' && (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
