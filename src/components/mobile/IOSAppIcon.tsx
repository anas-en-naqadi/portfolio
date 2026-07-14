'use client'

import { motion } from 'framer-motion'
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
      aria-label={`Open ${label}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
    >
      {/* Squircle shaped icon container */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '22%',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="shadow-lg shadow-black/25 flex items-center justify-center flex-shrink-0 overflow-hidden"
      >
        {getAppleIcon(id, '100%')}

        {/* Red notification badge */}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[9px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border border-white shadow-md z-10 pointer-events-none">
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
