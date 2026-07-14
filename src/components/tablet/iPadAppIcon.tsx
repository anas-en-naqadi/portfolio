'use client'

import { motion } from 'framer-motion'
import { getAppleIcon } from '../shared/AppleIcons'
import { useTheme } from '@/hooks/useTheme'

interface iPadAppIconProps {
  id: string
  label: string
  onClick: () => void
  index?: number
  size?: number
}

export default function iPadAppIcon({
  id,
  label,
  onClick,
  index = 0,
  size = 76,
}: iPadAppIconProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const textColorClass = 'text-zinc-800 dark:text-white'

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer select-none"
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
      role="button"
      aria-label={`Open ${label}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
    >
      {/* Squircle icon */}
      <div
        className="shadow-xl shadow-black/25 flex items-center justify-center flex-shrink-0"
        style={{
          width: size,
          height: size,
          borderRadius: '22%',
        }}
      >
        {getAppleIcon(id, '100%')}
      </div>

      {/* Label */}
      <span
        className={`font-semibold drop-shadow-sm text-center leading-tight ${textColorClass}`}
        style={{ fontSize: 11, maxWidth: size + 12 }}
      >
        {label}
      </span>
    </motion.div>
  )
}
