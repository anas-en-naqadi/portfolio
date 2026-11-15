'use client'

import { useTime } from '@/hooks/useTime'
import { motion } from 'framer-motion'
import { BatterySymbol, WifiSymbol } from '@/components/shared/SFSymbols'

interface iPadStatusBarProps {
  theme: 'dark' | 'light'
  isAppOpen?: boolean
}

export default function iPadStatusBar({ theme, isAppOpen = false }: iPadStatusBarProps) {
  const { timeShort } = useTime()

  const isLightText = !isAppOpen || theme === 'dark'
  const textColor = isLightText ? 'text-white' : 'text-gray-900'
  const bgStyle = isLightText
    ? 'bg-black/20 backdrop-blur-xl border-b border-white/10'
    : 'bg-white/20 backdrop-blur-xl border-b border-black/10'

  // Format iPad-style Date string, e.g. "Thu Jul 9"
  const now = new Date()
  const dayName = now.toLocaleDateString(undefined, { weekday: 'short' })
  const monthName = now.toLocaleDateString(undefined, { month: 'short' })
  const dayNum = now.getDate()
  const ipadDate = `${dayName} ${monthName} ${dayNum}`

  return (
    <motion.div
      className={`h-10 flex items-center justify-between px-6 relative z-30 ${bgStyle}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      role="banner"
      aria-label="iPad status bar"
    >
      {/* Left: iPad Pro Time + Date (Side-by-Side) */}
      <div className={`flex items-center gap-2 ${textColor} select-none`}>
        <span className="text-xs font-semibold tracking-tight">{timeShort}</span>
        <span className="text-[11px] font-medium opacity-70">{ipadDate}</span>
      </div>

      {/* Right: iPad Pro System Indicators (Wi-Fi, Battery Percentage, Battery Icon) */}
      <div className={`flex items-center gap-2.5 ${textColor} select-none`}>
        {/* Wi-Fi Icon */}
        <div className="flex items-center opacity-90" aria-label="Wi-Fi connected">
          <WifiSymbol className="w-4 h-3.5 shrink-0" />
        </div>

        {/* Battery Percentage */}
        <span className="text-[11px] font-semibold opacity-90">85%</span>

        {/* Battery Icon */}
        <div className="flex items-center opacity-90" aria-label="Battery 85 percent">
          <BatterySymbol className="w-5 h-2.5 shrink-0" />
        </div>
      </div>
    </motion.div>
  )
}
