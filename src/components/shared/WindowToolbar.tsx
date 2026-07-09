'use client'

import { motion } from 'framer-motion'

interface ToolbarButton {
  icon: string
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

