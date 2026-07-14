'use client'

import { useTime } from '@/hooks/useTime'
import { motion } from 'framer-motion'

interface IOSStatusBarProps {
  theme?: 'dark' | 'light'
  isAppOpen?: boolean
}

export default function IOSStatusBar({ theme = 'dark', isAppOpen = false }: IOSStatusBarProps) {
  const { timeShort } = useTime()

  // On home screen, status bar is always white (looks better on dark home wallpaper).
  // Inside an app, it matches the app's theme.
  const isLightText = !isAppOpen || theme === 'dark'
  const textColorClass = isLightText ? 'text-white' : 'text-black'
  const barBgClass = isLightText ? 'bg-white' : 'bg-black'

  return (
    <div
      className={`h-11 w-full fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 select-none pointer-events-none text-xs font-semibold ${textColorClass}`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
      role="banner"
      aria-label="iOS Status Bar"
    >
      {/* Time */}
      <span className="tracking-tight">{timeShort}</span>

      {/* Dynamic Island Safe Area Spacer */}
      <div className="w-28 h-7 bg-transparent rounded-full" />

      {/* Status Icons */}
      <div className="flex items-center gap-1.5 pointer-events-auto">
        {/* Wi-Fi Icon */}
        <div className="flex items-center opacity-90" aria-label="Wi-Fi connected">
          <svg className="w-4 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
        </div>

        {/* Battery */}
        <div className="flex items-center gap-1" aria-label="Battery 85 percent">
          <span className="text-[10px] opacity-90 font-medium">85%</span>
          <svg className="w-5 h-2.5" viewBox="0 0 22 11" fill="none">
            <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" />
            <rect x="19" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" />
            <rect x="2" y="2" width="13" height="7" rx="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  )
}
