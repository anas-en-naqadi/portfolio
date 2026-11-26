'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DesktopIconProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  onDoubleClick: () => void
  onPreload?: () => void
  selected?: boolean
}

export function DesktopIcon({
  icon,
  label,
  onClick,
  onDoubleClick,
  onPreload,
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
      onMouseEnter={() => onPreload?.()}
      onFocus={() => onPreload?.()}
      onKeyDown={handleKeyDown}
      whileTap={{ scale: 0.98 }}
      className="w-[88px] flex flex-col items-center gap-1 p-1 rounded-lg cursor-default select-none focus:outline-none group"
    >
      <div
        className={`w-[60px] h-[60px] rounded-[6px] flex items-center justify-center p-1 transition-colors duration-100 ${
          selected
            ? 'bg-black/[0.28] border-[1.5px] border-white/[0.32] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.22)]'
            : 'border-[1.5px] border-transparent group-focus-visible:border-white/30'
        }`}
      >
        <div className="w-[50px] h-[50px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.42)]">
          {icon}
        </div>
      </div>

      <span
        className={`px-[6px] py-[1px] rounded-[4px] text-[11.5px] font-medium text-center leading-[15px] tracking-[-0.01em] max-w-[84px] truncate transition-colors duration-100 ${
          selected
            ? 'bg-[#0063E1] text-white shadow-[0_1px_2px_rgba(0,0,0,0.35)]'
            : 'text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.88),0_0_6px_rgba(0,0,0,0.45)]'
        }`}
      >
        {label}
      </span>
    </motion.div>
  )
}
