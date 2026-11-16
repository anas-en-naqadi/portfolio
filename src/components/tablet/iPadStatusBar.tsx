'use client'

import { useTime } from '@/hooks/useTime'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { BatterySymbol, WifiSymbol } from '@/components/shared/SFSymbols'

interface IPadStatusBarProps {
  theme: 'dark' | 'light'
  isAppOpen?: boolean
  onToggleControlCenter?: () => void
  onHoverControlCenterEnter?: (e: React.PointerEvent<HTMLButtonElement>) => void
  onHoverControlCenterLeave?: (e: React.PointerEvent<HTMLButtonElement>) => void
  controlCenterOpen?: boolean
}

export default function IPadStatusBar({
  theme,
  isAppOpen = false,
  onToggleControlCenter,
  onHoverControlCenterEnter,
  onHoverControlCenterLeave,
  controlCenterOpen = false,
}: IPadStatusBarProps) {
  const locale = useLocale()
  const t = useTranslations('tablet.statusBar')
  const { timeShort, shortDateString } = useTime(locale)

  const isLightText = !isAppOpen || theme === 'dark'
  const textColor = isLightText ? 'text-white' : 'text-gray-900'
  const bgStyle = isLightText
    ? 'bg-black/20 backdrop-blur-xl border-b border-white/10'
    : 'bg-white/25 backdrop-blur-xl border-b border-black/10'

  return (
    <motion.div
      className={`h-10 flex items-center justify-between px-4 sm:px-6 relative z-30 ${bgStyle}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      role="banner"
      aria-label={t('label')}
    >
      {/* Left: iPad Pro Time + Localized Date */}
      <div className={`flex items-center gap-2 ${textColor} select-none min-w-0`}>
        <span className="text-xs font-semibold tracking-tight tabular-nums">{timeShort}</span>
        <span className="text-[11px] font-medium opacity-75 truncate">{shortDateString}</span>
      </div>

      {/* Right: System Indicators & Control Center Trigger */}
      <button
        type="button"
        onClick={onToggleControlCenter}
        onPointerEnter={onHoverControlCenterEnter}
        onPointerLeave={onHoverControlCenterLeave}
        aria-expanded={controlCenterOpen}
        aria-label={t('openControlCenter')}
        className={`flex items-center gap-2 sm:gap-2.5 px-2.5 py-1 -mr-1.5 rounded-full transition hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${textColor} select-none`}
      >
        <span className="flex items-center opacity-90" aria-label={t('wifiConnected')}>
          <WifiSymbol className="w-4 h-3.5 shrink-0" />
        </span>

        <span className="text-[11px] font-semibold opacity-90 tabular-nums">85%</span>

        <span className="flex items-center opacity-90" aria-label={t('batteryLevel')}>
          <BatterySymbol className="w-5 h-2.5 shrink-0" />
        </span>
      </button>
    </motion.div>
  )
}
