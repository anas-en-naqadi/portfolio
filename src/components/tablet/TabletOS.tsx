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
import IPadSettings from './IPadSettings'
import { getAppleIcon } from '../shared/AppleIcons'
import { GlobeSymbol, HouseSymbol, MoonSymbol, SunSymbol } from '../shared/SFSymbols'

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
  const ccPinnedRef = useRef(false)
  const ccTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      const isShort = h <= 760
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
    return () => window.removeEventListener('resize', updateIconSizes)
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

  const openApp = (appId: AppId) => {
    closeControlCenter()
    setActiveSheet(appId)
  }

  const closeSheet = () => setActiveSheet(null)

  const switchLocale = (newLocale: string) => {
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
    settings: <IPadSettings theme={theme} toggleTheme={toggleTheme} />,
  }

  return (
    <div
      className="ipad-os h-screen w-full overflow-hidden relative flex flex-col select-none"
      style={{
        backgroundColor: '#150f28',
        backgroundImage: `url('/images/tablet-bg.png'), ${fallbackGradient}`,
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
              className="fixed inset-0 z-40"
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
              className={`fixed top-12 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-50 w-72 rounded-3xl p-4 shadow-2xl border backdrop-blur-2xl ${
                isDark
                  ? 'bg-zinc-900/75 border-white/15 text-white'
                  : 'bg-white/55 border-white/50 text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                  {t('controlCenter.title')}
                </span>
              </div>

              <div className="space-y-3">
                {/* Appearance Quick Toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition active:scale-[0.98] ${
                    isDark ? 'bg-white/10 hover:bg-white/15' : 'bg-black/5 hover:bg-black/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isDark ? (
                      <MoonSymbol className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <SunSymbol className="w-4 h-4 text-amber-500" />
                    )}
                    <span className="text-xs font-semibold">{t('controlCenter.appearance')}</span>
                  </div>
                  <span className="text-[11px] font-medium opacity-75">
                    {isDark ? t('controlCenter.dark') : t('controlCenter.light')}
                  </span>
                </button>

                {/* Language Switcher */}
                <div
                  className={`rounded-2xl p-3 ${
                    isDark ? 'bg-white/10' : 'bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GlobeSymbol className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-semibold">{t('controlCenter.language')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {locales.map((loc) => {
                      const active = locale === loc
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => switchLocale(loc)}
                          className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold transition ${
                            active
                              ? 'bg-blue-500 text-white shadow-sm'
                              : isDark
                              ? 'bg-white/5 hover:bg-white/15 text-zinc-300'
                              : 'bg-white/70 hover:bg-white text-zinc-700'
                          }`}
                        >
                          {localeNames[loc]}
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
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 transition active:scale-[0.98]"
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
        <div className="min-h-full w-full max-w-5xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8 pb-28 sm:pb-36 short:pt-3 short:pb-24 flex flex-col items-center justify-start sm:justify-center short:justify-start gap-6 sm:gap-10 md:gap-12 short:gap-5">
          {/* TOP: Weather/Clock/Profile/CV widgets */}
          <div className="w-full flex justify-center flex-shrink-0">
            <IPadWidgets theme={theme} />
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
    </div>
  )
}
