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
        <button
          key={idx}
          type="button"
          className={`toolbar-btn ${btn.active ? 'active' : ''}`}
          onClick={btn.onClick}
        >
          {btn.icon && (
            <span className="inline-flex items-center justify-center shrink-0">
              {btn.icon}
            </span>
          )}
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  )
}

