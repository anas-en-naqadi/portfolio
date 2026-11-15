'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getAppleIcon } from '../shared/AppleIcons'

interface IOSAppIconProps {
  id: string
  label: string
  onClick: () => void
  index?: number
  size?: number
  badge?: number
}

export default function IOSAppIcon({
  id,
  label,
  onClick,
  index = 0,
  size = 60,
  badge,
}: IOSAppIconProps) {
  const t = useTranslations()
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 cursor-pointer select-none w-full"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      role="button"
      aria-label={t('mobile.home.openApp', { label })}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
    >
      {/* Icon + Notification Badge wrapper (unclipped so badge sits cleanly on the corner) */}
      <div
        style={{
          width: size,
          height: size,
        }}
        className="relative flex-shrink-0"
      >
        {/* Squircle shaped icon container */}
        <div
          style={{
            borderRadius: '22%',
          }}
          className="w-full h-full overflow-hidden shadow-lg shadow-black/25 flex items-center justify-center"
        >
          {getAppleIcon(id, '100%')}
        </div>

        {/* Real iPhone style red notification badge */}
        {badge !== undefined && badge > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 bg-[#FF3B30] text-white text-[11px] font-semibold leading-none h-[20px] min-w-[20px] px-1.5 rounded-full flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.35)] z-10 pointer-events-none select-none"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className="text-[11px] text-white font-medium text-center tracking-wide leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        style={{ maxWidth: size + 10 }}
      >
        {label}
      </span>
    </motion.div>
  )
}
