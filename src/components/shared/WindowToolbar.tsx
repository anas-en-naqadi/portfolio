'use client'

import { motion } from 'framer-motion'

import { ReactNode } from 'react'

interface ToolbarButton {
  icon: ReactNode
  label: string
  onClick: () => void
  active?: boolean
}

interface WindowToolbarProps {
  buttons: ToolbarButton[]
}

export default function WindowToolbar({ buttons }: WindowToolbarProps) {
  return (
    <div className="window-toolbar">
      {buttons.map((btn, idx) => (
        <div
          key={idx}
          className="toolbar-btn"
          onClick={btn.onClick}
        >
          {btn.icon && <span>{btn.icon}</span>}
          {btn.label}
        </div>
      ))}
    </div>
  )
}

