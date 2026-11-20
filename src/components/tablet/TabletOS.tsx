'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames } from '@/i18n/config'
import { getLocalizedPortfolioData } from '@/lib/data'
import IPadStatusBar from './iPadStatusBar'
import IPadDock from './iPadDock'
import IPadAppIcon from './iPadAppIcon'
import IPadSheet from './iPadSheet'
import IPadWidgets from './iPadWidgets'
import IPadAbout from './IPadAbout'
import IPadExperience from './IPadExperience'
import IPadProjects from './IPadProjects'
import IPadSkills from './IPadSkills'
import IPadContact from './IPadContact'
import IPadSettings, { TABLET_WALLPAPERS, type TabletWallpaperId } from './IPadSettings'
import { getAppleIcon } from '../shared/AppleIcons'
import {
  BackwardEndSymbol,
  CheckmarkSymbol,
  ForwardEndSymbol,
  GlobeSymbol,
  HouseSymbol,
  MoonSymbol,
  MusicNoteSymbol,
  PauseSymbol,
  PhotoSymbol,
  PlaySymbol,
  SpeakerWaveSymbol,
  SunSymbol,
} from '../shared/SFSymbols'
import { AudioEqualizerBars, useFocusAudio } from '../shared/FocusAudioProvider'
import { CVDownloadModal, triggerCVDownload, type CVLanguage } from '../shared/CVDownloadModal'

type AppId = 'about' | 'calendar' | 'appstore' | 'notes' | 'mail' | 'settings'

interface AppConfig {
  id: AppId
  labelKey: 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'settings'
  badge?: number
}

const appConfigs: AppConfig[] = [
  { id: 'about', labelKey: 'about' },
  { id: 'calendar', labelKey: 'experience' },
  { id: 'appstore', labelKey: 'projects' },
  { id: 'notes', labelKey: 'skills' },
  { id: 'mail', labelKey: 'contact', badge: 4 },
  { id: 'settings', labelKey: 'settings' },
]

export default function TabletOS() {
  const { theme, toggleTheme } = useTheme()
  const [activeSheet, setActiveSheet] = useState<AppId | null>(null)
  const [controlCenterOpen, setControlCenterOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState<TabletWallpaperId>('default')
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [cvPill, setCvPill] = useState<{ id: number; lang: CVLanguage } | null>(null)
  const cvPillTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ccPinnedRef = useRef(false)
  const ccTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const tCommonCV = useTranslations('common.cvModal')
  const tAudio = useTranslations('common.focusAudio')
  const {
    tracks,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
  } = useFocusAudio()

  const handleSelectCVLanguage = (lang: CVLanguage) => {
    triggerCVDownload(lang)
    setCvModalOpen(false)
    setCvPill({ id: Date.now(), lang })
    if (cvPillTimerRef.current) clearTimeout(cvPillTimerRef.current)
    cvPillTimerRef.current = setTimeout(() => setCvPill(null), 2600)
  }

  const clearCcTimer = () => {
    if (ccTimerRef.current) {
      clearTimeout(ccTimerRef.current)
      ccTimerRef.current = null
    }
  }

  const closeControlCenter = () => {
    clearCcTimer()
    ccPinnedRef.current = false
    setControlCenterOpen(false)
  }

  const handleToggleControlCenter = () => {
    clearCcTimer()
    if (controlCenterOpen) {
      if (ccPinnedRef.current) {
        ccPinnedRef.current = false
        setControlCenterOpen(false)
      } else {
        ccPinnedRef.current = true
      }
      return
    }
    ccPinnedRef.current = true
    setControlCenterOpen(true)
  }

  const handleControlCenterHoverEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    clearCcTimer()
    if (!controlCenterOpen) {
      ccPinnedRef.current = false
      setControlCenterOpen(true)
    }
  }

  const handleControlCenterHoverLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || ccPinnedRef.current) return
    clearCcTimer()
    ccTimerRef.current = setTimeout(() => {
      if (!ccPinnedRef.current) {
        setControlCenterOpen(false)
      }
    }, 150)
  }
  const [iconSizes, setIconSizes] = useState<{ grid: number; dock: number }>({
    grid: 74,
    dock: 62,
  })
  const [isShortViewport, setIsShortViewport] = useState(false)
  const isDark = theme === 'dark'
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('tablet')
  const { personalInfo } = getLocalizedPortfolioData(locale)

  useEffect(() => {
    const updateIconSizes = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const isShort = h <= 820
      setIsShortViewport(isShort)
      if (w < 640) {
        setIconSizes({ grid: isShort ? 56 : 60, dock: 52 })
      } else if (w < 768) {
        setIconSizes({ grid: isShort ? 62 : 68, dock: 58 })
      } else {
        setIconSizes({ grid: isShort ? 66 : 76, dock: 64 })
      }
    }

    updateIconSizes()
    window.addEventListener('resize', updateIconSizes)
    window.addEventListener('orientationchange', updateIconSizes)
    return () => {
      window.removeEventListener('resize', updateIconSizes)
      window.removeEventListener('orientationchange', updateIconSizes)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (controlCenterOpen) {
        closeControlCenter()
      } else if (activeSheet !== null) {
        setActiveSheet(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearCcTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSheet, controlCenterOpen])

  useEffect(() => {
    try {
      const savedWp = window.localStorage.getItem('ipados-wallpaper') as TabletWallpaperId | null
      if (savedWp && TABLET_WALLPAPERS.some((w) => w.id === savedWp)) {
        setWallpaper(savedWp)
      }
    } catch {
      // Ignore storage access errors
    }

    try {
      const raw = window.sessionStorage.getItem('ipados-preserved-sheet')
      if (raw) {
        const parsed = JSON.parse(raw) as { activeSheet?: AppId | null; ts?: number }
        if (parsed.ts && Date.now() - parsed.ts < 10000 && parsed.activeSheet) {
          setActiveSheet(parsed.activeSheet)
          setTimeout(() => {
            try {
              window.sessionStorage.removeItem('ipados-preserved-sheet')
            } catch {
              // Ignore cleanup errors
            }
          }, 250)
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }, [])

  const openApp = (appId: AppId) => {
    closeControlCenter()
    setActiveSheet(appId)
  }

  const closeSheet = () => setActiveSheet(null)

  const handleSelectWallpaper = (wp: TabletWallpaperId) => {
    setWallpaper(wp)
    try {
      window.localStorage.setItem('ipados-wallpaper', wp)
    } catch {
      // Ignore storage access errors
    }
  }

  const switchLocale = (newLocale: string) => {
    try {
      window.sessionStorage.setItem(
        'ipados-preserved-sheet',
        JSON.stringify({ activeSheet, ts: Date.now() })
      )
    } catch {
      // Ignore storage access errors
    }
    router.replace(pathname, { locale: newLocale })
    closeControlCenter()
  }

  const fallbackGradient = isDark
    ? 'radial-gradient(circle at 80% 20%, rgba(120, 50, 150, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(50, 80, 180, 0.3) 0%, transparent 60%)'
    : 'radial-gradient(circle at 80% 20%, rgba(255, 180, 200, 0.45) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(100, 180, 255, 0.4) 0%, transparent 60%)'

  const dockApps = [
    {
      id: 'phone',
      label: t('apps.phone'),
      onClick: () => {
        window.location.href = `tel:${personalInfo.phone.replace(/\s+/g, '')}`
      },
    },
    {
      id: 'github',
      label: t('apps.github'),
      onClick: () =>
        window.open(
          process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/anas-en-naqadi',
          '_blank'
        ),
    },
    {
      id: 'linkedin',
      label: t('apps.linkedin'),
      onClick: () =>
        window.open(
          process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/anas-en-naqadi',
          '_blank'
        ),
    },
    {
      id: 'whatsapp',
      label: t('apps.whatsapp'),
      onClick: () =>
        window.open(`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`, '_blank'),
    },
  ]

  const getAppTitle = (appId: AppId) => {
    const config = appConfigs.find((app) => app.id === appId)
    return config ? t(`apps.${config.labelKey}`) : ''
  }

  const windowComponents: Record<AppId, React.ReactNode> = {
    about: <IPadAbout theme={theme} />,
    calendar: <IPadExperience theme={theme} />,
    appstore: <IPadProjects theme={theme} />,
    notes: <IPadSkills theme={theme} />,
    mail: <IPadContact theme={theme} />,
    settings: (
      <IPadSettings
        theme={theme}
        toggleTheme={toggleTheme}
        onSwitchLocale={switchLocale}
        wallpaper={wallpaper}
        onSelectWallpaper={handleSelectWallpaper}
      />
    ),
  }

  const activeWallpaperUrl =
    TABLET_WALLPAPERS.find((w) => w.id === wallpaper)?.image ?? TABLET_WALLPAPERS[0].image

  return (
    <div
      className="ipad-os h-screen h-[100dvh] w-full overflow-hidden relative flex flex-col select-none"
      style={{
        backgroundColor: '#150f28',
        backgroundImage: `url('${activeWallpaperUrl}'), ${fallbackGradient}`,
        backgroundSize: 'cover',
        backgroundPosition: '58% center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle blur + soft contrast scrim over wallpaper (consistent across light & dark modes) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none backdrop-blur-[1.5px]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 12, 24, 0.14) 0%, rgba(10, 12, 24, 0.04) 45%, rgba(10, 12, 24, 0.25) 100%)',
        }}
      />

      {/* Status Bar */}
      <div className="relative z-50 flex-shrink-0">
        <IPadStatusBar
          theme={theme}
          isAppOpen={activeSheet !== null}
          controlCenterOpen={controlCenterOpen}
          onToggleControlCenter={handleToggleControlCenter}
          onHoverControlCenterEnter={handleControlCenterHoverEnter}
          onHoverControlCenterLeave={handleControlCenterHoverLeave}
        />
      </div>

      {/* Control Center Popover */}
      <AnimatePresence>
        {controlCenterOpen && (
          <>
            <div
              className={`fixed inset-0 z-40 transition-colors ${
                isDark ? 'bg-black/20' : 'bg-black/10'
              }`}
              onClick={closeControlCenter}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onPointerEnter={handleControlCenterHoverEnter}
              onPointerLeave={handleControlCenterHoverLeave}
              role="dialog"
              aria-label={t('controlCenter.title')}
              style={{
                background: isDark ? 'rgba(24, 24, 28, 0.72)' : 'rgba(255, 255, 255, 0.56)',
                backdropFilter: 'blur(42px) saturate(210%)',
                WebkitBackdropFilter: 'blur(42px) saturate(210%)',
                boxShadow: isDark
                  ? '0 26px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.16)'
                  : '0 24px 56px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              }}
              className={`fixed top-12 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-50 w-[336px] sm:w-[356px] max-w-[calc(100vw-2rem)] rounded-[28px] p-3.5 border ${
                isDark
                  ? 'border-white/[0.16] text-white'
                  : 'border-white/65 text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between px-1 mb-2.5">
                <span
                  className={`text-[10.5px] font-semibold uppercase tracking-wider ${
                    isDark ? 'text-white/55' : 'text-zinc-700/75'
                  }`}
                >
                  {t('controlCenter.title')}
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Row 1: iPadOS 2-Column Bento Tiles (Appearance & Language) */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Appearance Tile */}
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`rounded-[20px] p-3 flex items-center gap-2.5 min-h-[92px] text-left border transition active:scale-[0.98] ${
                      isDark
                        ? 'bg-white/[0.08] hover:bg-white/[0.13] border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                        : 'bg-white/55 hover:bg-white/75 border-white/65 shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)]'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        isDark ? 'bg-indigo-500 text-white' : 'bg-amber-400 text-zinc-900'
                      }`}
                    >
                      {isDark ? (
                        <MoonSymbol className="w-4 h-4" />
                      ) : (
                        <SunSymbol className="w-4 h-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-semibold leading-tight truncate">
                        {t('controlCenter.appearance')}
                      </div>
                      <div
                        className={`text-[11px] font-medium mt-0.5 truncate ${
                          isDark ? 'text-zinc-400' : 'text-zinc-600'
                        }`}
                      >
                        {isDark ? t('controlCenter.dark') : t('controlCenter.light')}
                      </div>
                    </div>
                  </button>

                  {/* Language Tile (2-column full-width EN / FR) */}
                  <div
                    className={`rounded-[20px] p-3 flex flex-col justify-between min-h-[92px] border ${
                      isDark
                        ? 'bg-white/[0.08] border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                        : 'bg-white/55 border-white/65 shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          isDark ? 'bg-[#0A84FF]/20 text-[#0A84FF]' : 'bg-[#007AFF]/15 text-[#007AFF]'
                        }`}
                      >
                        <GlobeSymbol className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[12px] font-semibold truncate">
                        {t('controlCenter.language')}
                      </span>
                    </div>
                    <div
                      className={`grid grid-cols-2 gap-1 p-1 rounded-xl w-full ${
                        isDark ? 'bg-black/30' : 'bg-black/[0.07]'
                      }`}
                    >
                      {locales.map((loc) => {
                        const active = locale === loc
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => switchLocale(loc)}
                            aria-label={localeNames[loc]}
                            className={`py-1.5 rounded-[9px] text-[11px] font-bold uppercase tracking-wide transition ${
                              active
                                ? 'bg-[#007AFF] text-white shadow-sm'
                                : isDark
                                ? 'text-zinc-300 hover:bg-white/10'
                                : 'text-zinc-700 hover:bg-white/70'
                            }`}
                          >
                            {loc.toUpperCase()}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Row 2: Focus Audio Now Playing Module */}
                <div
                  data-audio-control="true"
                  className={`rounded-[20px] p-3.5 space-y-2.5 border ${
                    isDark
                      ? 'bg-white/[0.08] border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'bg-white/55 border-white/65 shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#007AFF] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        {isPlaying ? <AudioEqualizerBars playing /> : <MusicNoteSymbol className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-semibold leading-tight truncate">
                          {tAudio(currentTrack.titleKey)}
                        </div>
                        <div
                          className={`text-[10.5px] truncate mt-0.5 ${
                            isDark ? 'text-zinc-400' : 'text-zinc-600'
                          }`}
                        >
                          {tAudio(currentTrack.artistKey)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={prevTrack}
                        aria-label={tAudio('prev')}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition active:scale-95 ${
                          isDark ? 'hover:bg-white/15 text-white/85' : 'hover:bg-black/[0.08] text-zinc-700'
                        }`}
                      >
                        <BackwardEndSymbol className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? tAudio('pause') : tAudio('play')}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition active:scale-95 ${
                          isDark
                            ? 'bg-white/15 hover:bg-white/25 text-white'
                            : 'bg-zinc-900/10 hover:bg-zinc-900/15 text-zinc-900'
                        }`}
                      >
                        {isPlaying ? <PauseSymbol className="w-3.5 h-3.5" /> : <PlaySymbol className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={nextTrack}
                        aria-label={tAudio('next')}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition active:scale-95 ${
                          isDark ? 'hover:bg-white/15 text-white/85' : 'hover:bg-black/[0.08] text-zinc-700'
                        }`}
                      >
                        <ForwardEndSymbol className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {tracks.map((track, idx) => {
                      const selected = idx === currentTrackIndex
                      return (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => selectTrack(idx)}
                          className={`py-1.5 px-2.5 rounded-xl text-[11px] font-semibold truncate transition ${
                            selected
                              ? 'bg-[#007AFF] text-white shadow-sm'
                              : isDark
                                ? 'bg-white/[0.07] hover:bg-white/[0.13] text-zinc-200'
                                : 'bg-black/[0.06] hover:bg-white/75 text-zinc-700'
                          }`}
                        >
                          {tAudio(track.titleKey)}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex items-center gap-2.5 pt-0.5">
                    <SpeakerWaveSymbol
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.02}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      aria-label={tAudio('volume')}
                      className="ios-volume-slider w-full cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #007AFF ${Math.round(volume * 100)}%, ${
                          isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.14)'
                        } ${Math.round(volume * 100)}%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Wallpaper Switcher Module */}
                <div
                  className={`rounded-[20px] p-3 border ${
                    isDark
                      ? 'bg-white/[0.08] border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'bg-white/55 border-white/65 shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.85)]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <PhotoSymbol className="w-3.5 h-3.5 text-sky-500" />
                    <span className="text-[12px] font-semibold">{t('controlCenter.wallpaper')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {TABLET_WALLPAPERS.map((wp) => {
                      const selected = wallpaper === wp.id
                      return (
                        <button
                          key={wp.id}
                          type="button"
                          onClick={() => handleSelectWallpaper(wp.id)}
                          aria-label={t(`settings.wallpapers.${wp.id}`)}
                          className={`h-14 rounded-xl border relative overflow-hidden transition ${
                            selected
                              ? 'ring-2 ring-[#007AFF] border-white/85'
                              : isDark
                                ? 'border-white/15 opacity-80 hover:opacity-100'
                                : 'border-white/70 opacity-90 hover:opacity-100 shadow-sm'
                          }`}
                          style={{ background: `url('${wp.image}') center/cover` }}
                        >
                          <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/55 text-white text-[9.5px] font-medium backdrop-blur-sm">
                            {t(`settings.wallpapers.${wp.id}`)}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Return Home if app open */}
                {activeSheet !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      closeSheet()
                      closeControlCenter()
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[16px] text-xs font-semibold bg-[#007AFF] text-white hover:bg-blue-600 transition active:scale-[0.98] shadow-sm"
                  >
                    <HouseSymbol className="w-3.5 h-3.5" />
                    {t('controlCenter.returnHome')}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content layout (Scrollable with safe dock clearance) */}
      <main
        className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden w-full"
        aria-label={t('home.homeScreenLabel')}
      >
        <div className={`min-h-full w-full max-w-5xl mx-auto px-4 sm:px-8 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-4 sm:pt-8 pb-28 sm:pb-36 short:pt-3 short:pb-24 flex flex-col items-center ${isShortViewport ? 'justify-start' : 'justify-start sm:justify-center short:justify-start'} gap-6 sm:gap-10 md:gap-12 short:gap-5`}>
          {/* TOP: Weather/Clock/Profile/CV widgets */}
          <div className="w-full flex justify-center flex-shrink-0">
            <IPadWidgets theme={theme} onDownloadCV={() => setCvModalOpen(true)} />
          </div>

          {/* BOTTOM: Responsive Home App Grid */}
          <div className="w-full">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 w-full max-w-4xl mx-auto justify-items-center gap-x-2 sm:gap-x-4 gap-y-5 sm:gap-y-7 short:gap-y-4 px-1 sm:px-2">
              {appConfigs.map((app, index) => (
                <IPadAppIcon
                  key={app.id}
                  id={app.id}
                  label={t(`apps.${app.labelKey}`)}
                  onClick={() => openApp(app.id)}
                  index={index}
                  size={iconSizes.grid}
                  badge={app.badge}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* iPad Dock */}
      <IPadDock apps={dockApps} theme={theme} iconSize={iconSizes.dock} />

      {/* App Sheets (Modal view) */}
      <IPadSheet
        isOpen={activeSheet !== null}
        onClose={closeSheet}
        title={activeSheet ? getAppTitle(activeSheet) : ''}
        icon={activeSheet ? getAppleIcon(activeSheet, 28) : null}
        theme={theme}
      >
        {activeSheet && windowComponents[activeSheet]}
      </IPadSheet>

      {/* iPadOS CV Language Picker Alert */}
      <CVDownloadModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        onDownload={handleSelectCVLanguage}
        theme={theme}
        variant="ipados"
      />

      {/* iPadOS AirDrop/Files-style Top-Center Pill Feedback */}
      <AnimatePresence>
        {cvPill && (
          <motion.div
            key={cvPill.id}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="fixed top-9 left-1/2 -translate-x-1/2 z-[100060] pointer-events-none max-w-[calc(100vw-2rem)]"
          >
            <div
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-2xl shadow-xl ${
                isDark
                  ? 'bg-zinc-900/88 border-white/15 text-white'
                  : 'bg-white/88 border-black/10 text-gray-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckmarkSymbol className="w-3 h-3" />
              </span>
              <span className="text-xs font-semibold truncate">
                {tCommonCV('downloadedTitle')} ({cvPill.lang.toUpperCase()})
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
