'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getAppleIcon } from '../shared/AppleIcons'
import {
  CheckmarkSymbol,
  DocumentTextSymbol,
  ForwardEndSymbol,
  GlobeSymbol,
  MusicNoteSymbol,
  PauseSymbol,
  PlaySymbol,
} from '../shared/SFSymbols'
import { AudioEqualizerBars, useFocusAudio } from '../shared/FocusAudioProvider'

interface DynamicIslandProps {
  activeApp?: string | null
  activeLang?: string
  cvDownloadEvent?: { lang: 'en' | 'fr'; nonce: number } | null
}

export default function DynamicIsland({ activeApp, activeLang, cvDownloadEvent }: DynamicIslandProps) {
  const t = useTranslations()
  const tAudio = useTranslations('common.focusAudio')
  const { currentTrack, isPlaying, togglePlay, nextTrack } = useFocusAudio()
  const [islandState, setIslandState] = useState<'collapsed' | 'appOpen' | 'langChange' | 'cvDownload' | 'audioPlayer' | 'hover'>('collapsed')
  const [prevApp, setPrevApp] = useState<string | null>(null)
  const [prevLang, setPrevLang] = useState<string>('')
  const islandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeApp || activeApp === 'home') {
      setPrevApp(null)
      setIslandState((prev) => (prev === 'appOpen' ? 'collapsed' : prev))
      return
    }
    if (activeApp !== prevApp) {
      setIslandState('appOpen')
      setPrevApp(activeApp)
      const timer = setTimeout(() => {
        setIslandState((prev) => (prev === 'appOpen' ? 'collapsed' : prev))
      }, 1400)
      return () => clearTimeout(timer)
    }
  }, [activeApp, prevApp])

  useEffect(() => {
    if (activeLang && prevLang && activeLang !== prevLang) {
      setIslandState('langChange')
      setPrevLang(activeLang)
      const timer = setTimeout(() => {
        setIslandState((prev) => (prev === 'langChange' ? 'collapsed' : prev))
      }, 1800)
      return () => clearTimeout(timer)
    } else if (activeLang && !prevLang) {
      setPrevLang(activeLang)
    }
  }, [activeLang, prevLang])

  useEffect(() => {
    if (!cvDownloadEvent?.nonce) return
    setIslandState('cvDownload')
    const timer = setTimeout(() => {
      setIslandState((prev) => (prev === 'cvDownload' ? 'collapsed' : prev))
    }, 2400)
    return () => clearTimeout(timer)
  }, [cvDownloadEvent])

  // Collapse expanded audio player on outside tap/click or after inactivity
  useEffect(() => {
    if (islandState !== 'audioPlayer') return

    const handleOutsideTap = (e: PointerEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIslandState('collapsed')
      }
    }

    const timer = setTimeout(() => {
      setIslandState('collapsed')
    }, 6000)

    window.addEventListener('pointerdown', handleOutsideTap, { capture: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointerdown', handleOutsideTap, { capture: true })
    }
  }, [islandState, isPlaying, currentTrack])

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
  const isHovered = islandState === 'hover' && !isPlaying
  const isAppOpen = islandState === 'appOpen'
  const isLangChange = islandState === 'langChange'
  const isCvDownload = islandState === 'cvDownload'
  const isAudioPlayer = islandState === 'audioPlayer'

  let width = isPlaying ? 142 : 110
  let height = 30
  let borderRadius = 20

  if (isAudioPlayer) {
    width = 272
    height = 60
    borderRadius = 28
  } else if (isHovered) {
    width = 160
    height = 36
  } else if (isCvDownload && cvDownloadEvent) {
    width = 232
    height = 44
    borderRadius = 22
  } else if (isAppOpen && activeApp && appMeta[activeApp]) {
    width = 208
    height = 42
    borderRadius = 22
  } else if (isLangChange && activeLang && langNames[activeLang]) {
    width = 180
    height = 42
    borderRadius = 22
  }

  return (
    <div
      ref={islandRef}
      data-audio-control="true"
      className="fixed top-[max(0.625rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[100000] select-none pointer-events-auto"
      onClick={() =>
        setIslandState((prev) => (prev === 'audioPlayer' ? 'collapsed' : 'audioPlayer'))
      }
      onMouseEnter={() => {
        if (islandState === 'collapsed' && !isPlaying) setIslandState('hover')
      }}
      onMouseLeave={() => {
        if (islandState === 'hover') setIslandState('collapsed')
      }}
    >
      <motion.div
        animate={{ width, height, borderRadius }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        className="bg-black border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden px-4 cursor-pointer"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          fontFamily: '"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
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
              className="w-full flex items-center justify-between text-xs text-white gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex items-center justify-center shrink-0">
                  {getAppleIcon(activeApp, 18)}
                </span>
                <span className="font-semibold truncate">{appMeta[activeApp].name}</span>
              </div>
              {isPlaying ? (
                <AudioEqualizerBars playing className="text-emerald-400 shrink-0" />
              ) : (
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider shrink-0">
                  {t('mobile.dynamicIsland.opened')}
                </span>
              )}
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

          {isAudioPlayer && (
            <motion.div
              key="audioPlayer"
              data-audio-control="true"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-between gap-2 text-white"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#007AFF] to-indigo-600 flex items-center justify-center shrink-0">
                  {isPlaying ? <AudioEqualizerBars playing /> : <MusicNoteSymbol className="w-4 h-4" />}
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold leading-tight truncate">
                    {tAudio(currentTrack.titleKey)}
                  </div>
                  <div className="text-[10px] text-white/60 truncate">
                    {tAudio(currentTrack.artistKey)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? tAudio('pause') : tAudio('play')}
                  className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center active:scale-95 transition"
                >
                  {isPlaying ? <PauseSymbol className="w-3.5 h-3.5" /> : <PlaySymbol className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={nextTrack}
                  aria-label={tAudio('next')}
                  className="w-7 h-7 rounded-full bg-white/15 text-white flex items-center justify-center active:scale-95 transition"
                >
                  <ForwardEndSymbol className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {(islandState === 'collapsed' || (islandState === 'hover' && isPlaying)) && (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-between"
            >
              {isPlaying && (
                <>
                  <MusicNoteSymbol className="w-3 h-3 text-[#0A84FF] shrink-0" />
                  <AudioEqualizerBars playing className="text-emerald-400" />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
