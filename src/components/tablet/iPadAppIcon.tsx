'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getAppleIcon } from '../shared/AppleIcons'

interface iPadAppIconProps {
  id: string
  label: string
  onClick: () => void
  index?: number
  size?: number
  showLabel?: boolean
  badge?: number
}

export default function iPadAppIcon({
  id,
  label,
  onClick,
  index = 0,
  size = 76,
  showLabel = true,
  badge,
}: iPadAppIconProps) {
  const t = useTranslations('tablet.home')
  const textColorClass = 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'

  return (
    <motion.button
      type="button"
      className="group flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer select-none bg-transparent border-0 p-1 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={t('openApp', { label })}
      title={label}
    >
      {/* Icon + Notification Badge wrapper (unclipped so badge sits cleanly on the corner) */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Squircle icon */}
        <div
          className="w-full h-full overflow-hidden shadow-xl shadow-black/25 flex items-center justify-center"
          style={{
            borderRadius: '22%',
          }}
        >
          {getAppleIcon(id, '100%')}
        </div>

        {/* Real iPadOS red notification badge */}
        {badge !== undefined && badge > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 bg-[#FF3B30] text-white text-[11px] font-semibold leading-none h-[22px] min-w-[22px] px-1.5 rounded-full flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.35)] z-10 pointer-events-none select-none tabular-nums"
          >
            {badge}
          </span>
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span
          className={`font-semibold drop-shadow-sm text-center leading-tight line-clamp-1 ${textColorClass}`}
          style={{ fontSize: size < 68 ? 10 : 11, maxWidth: size + 16 }}
        >
          {label}
        </span>
      )}
    </motion.button>
  )
}
