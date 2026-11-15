'use client'

import React from 'react'

export interface ToolbarButton {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
}

interface WindowToolbarProps {
  buttons: ToolbarButton[]
  rightContent?: React.ReactNode
  theme?: 'dark' | 'light'
}

export function WindowToolbar({ buttons, rightContent, theme = 'dark' }: WindowToolbarProps) {
  return (
    <div className={`window-toolbar justify-between ${theme === 'light' ? 'light' : ''}`}>
      <div className="flex items-center gap-2 flex-wrap">
        {buttons.map((btn, index) => (
          <button
            key={index}
            type="button"
            onClick={btn.onClick}
            className={`toolbar-btn ${btn.active ? 'active' : ''}`}
          >
            <span className="flex items-center justify-center shrink-0">{btn.icon}</span>
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
      {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
    </div>
  )
}
