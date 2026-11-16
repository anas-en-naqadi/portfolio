'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DesktopIconProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  onDoubleClick: () => void
  selected?: boolean
}

export function DesktopIcon({
  icon,
  label,
  onClick,
  onDoubleClick,
  selected = false,
}: DesktopIconProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onDoubleClick()
    }
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={label}
      onMouseDown={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onDoubleClick()
      }}
      onKeyDown={handleKeyDown}
      whileTap={{ scale: 0.94 }}
      className="w-[88px] flex flex-col items-center gap-1.5 p-1.5 rounded-xl cursor-pointer select-none focus:outline-none group"
    >
      <div
        className={`w-[58px] h-[58px] rounded-[12px] flex items-center justify-center p-1 transition-colors ${
          selected
            ? 'bg-white/[0.16] border border-white/25 backdrop-blur-sm'
            : 'border border-transparent'
        }`}
      >
        <div className="w-[50px] h-[50px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full drop-shadow-md">
          {icon}
        </div>
      </div>

      <span
        className={`px-2 py-0.5 rounded-[4px] text-[11.5px] font-semibold text-center leading-tight max-w-[84px] truncate transition-colors ${
          selected
            ? 'bg-[#007AFF] text-white'
            : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
        }`}
      >
        {label}
      </span>
    </motion.div>
  )
}
