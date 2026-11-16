'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getAppleIcon } from '../shared/AppleIcons'
import { CheckmarkSymbol, DocumentTextSymbol, GlobeSymbol } from '../shared/SFSymbols'

interface DynamicIslandProps {
  activeApp?: string | null
  activeLang?: string
  cvDownloadEvent?: { lang: 'en' | 'fr'; nonce: number } | null
}

export default function DynamicIsland({ activeApp, activeLang, cvDownloadEvent }: DynamicIslandProps) {
  const t = useTranslations()
  const [islandState, setIslandState] = useState<'collapsed' | 'appOpen' | 'langChange' | 'cvDownload' | 'hover'>('collapsed')
  const [prevApp, setPrevApp] = useState<string | null>(null)
  const [prevLang, setPrevLang] = useState<string>('')

  useEffect(() => {
    if (!activeApp || activeApp === 'home') {
      setPrevApp(null)
      return
    }
    if (activeApp !== prevApp) {
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

  useEffect(() => {
    if (!cvDownloadEvent?.nonce) return
    setIslandState('cvDownload')
    const timer = setTimeout(() => {
      setIslandState('collapsed')
    }, 2400)
    return () => clearTimeout(timer)
  }, [cvDownloadEvent])

  const appMeta: Record<string, { name: string }> = {
    about: { name: t('common.about') },
    experience: { name: t('common.experience') },
    projects: { name: t('common.projects') },
    skills: { name: t('common.skills') },
    contact: { name: t('common.contact') },
    settings: { name: t('common.settings') },
  }

  const langNames: Record<string, { code: string; name: string }> = {
    en: { code: 'EN', name: 'English' },
    fr: { code: 'FR', name: 'Français' },
  }

  // Define sizes and contents based on active state
  const isHovered = islandState === 'hover'
  const isAppOpen = islandState === 'appOpen'
  const isLangChange = islandState === 'langChange'
  const isCvDownload = islandState === 'cvDownload'

  let width = 110
  let height = 30
  let borderRadius = 20

  if (isHovered) {
    width = 160
    height = 36
  } else if (isCvDownload && cvDownloadEvent) {
    width = 232
    height = 44
    borderRadius = 22
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
      className="fixed top-[max(0.625rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[100000] select-none pointer-events-auto"
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
                <span className="flex items-center justify-center shrink-0">
                  {getAppleIcon(activeApp, 18)}
                </span>
                <span className="font-semibold">{appMeta[activeApp].name}</span>
              </div>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">{t('mobile.dynamicIsland.opened')}</span>
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
                <GlobeSymbol className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-semibold">{langNames[activeLang].name}</span>
              </div>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{langNames[activeLang].code}</span>
            </motion.div>
          )}

          {isCvDownload && cvDownloadEvent && (
            <motion.div
              key="cvDownload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex items-center justify-between text-xs text-white gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckmarkSymbol className="w-3 h-3" />
                </span>
                <span className="font-semibold truncate flex items-center gap-1">
                  <DocumentTextSymbol className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span>CV ({cvDownloadEvent.lang.toUpperCase()})</span>
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider shrink-0">
                {t('common.cvModal.savedLabel')}
              </span>
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
