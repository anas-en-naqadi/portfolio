'use client'

import { useTime } from '@/hooks/useTime'
import { useTranslations } from 'next-intl'
import { BatterySymbol, WifiSymbol } from '@/components/shared/SFSymbols'

interface IOSStatusBarProps {
  theme?: 'dark' | 'light'
  isAppOpen?: boolean
}

export default function IOSStatusBar({ theme = 'dark', isAppOpen = false }: IOSStatusBarProps) {
  const t = useTranslations()
  const { timeShort } = useTime()

  // On home screen, status bar is always white (looks better on dark home wallpaper).
  // Inside an app, it matches the app's theme.
  const isLightText = !isAppOpen || theme === 'dark'
  const textColorClass = isLightText ? 'text-white' : 'text-black'

  return (
    <div
      className={`min-h-11 pt-[env(safe-area-inset-top)] w-full fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] select-none pointer-events-none text-xs font-semibold ${textColorClass}`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
      role="banner"
      aria-label={t('mobile.statusBar.label')}
    >
      {/* Time */}
      <span className="tracking-tight">{timeShort}</span>

      {/* Dynamic Island Safe Area Spacer */}
      <div className="w-28 h-7 bg-transparent rounded-full" />

      {/* Status Icons */}
      <div className="flex items-center gap-1.5 pointer-events-auto">
        {/* Wi-Fi Icon */}
        <div className="flex items-center opacity-90" aria-label={t('mobile.statusBar.wifiConnected')}>
          <WifiSymbol className="w-4 h-3.5 shrink-0" />
        </div>

        {/* Battery */}
        <div className="flex items-center gap-1" aria-label={t('mobile.statusBar.batteryLevel')}>
          <span className="text-[10px] opacity-90 font-medium">85%</span>
          <BatterySymbol className="w-5 h-2.5 shrink-0" />
        </div>
      </div>
    </div>
  )
}
