'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTime } from '@/hooks/useTime'
import WindowPreview from '../shared/WindowPreview'

interface TaskbarApp {
  id: string
  name: string
  icon: string
  isActive: boolean
  onClick: () => void
  previewData?: {
    icon: string
    title: string
    subtitle: string
  }
}

interface TaskbarProps {
  apps: TaskbarApp[]
  onStartClick: () => void
}

export default function Taskbar({ apps, onStartClick }: TaskbarProps) {
  const { dateTimeString } = useTime()
  const [previewApp, setPreviewApp] = useState<TaskbarApp | null>(null)
  const [previewTimeout, setPreviewTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (app: TaskbarApp) => {
    if (previewTimeout) clearTimeout(previewTimeout)
    const timeout = setTimeout(() => {
      setPreviewApp(app)
    }, 500)
    setPreviewTimeout(timeout)
  }

  const handleMouseLeave = () => {
    if (previewTimeout) clearTimeout(previewTimeout)
    setPreviewApp(null)
  }

  return (
    <>
      <div className="taskbar">
        {/* Start Button */}
        <button
          onClick={onStartClick}
          className="start-button"
          aria-label="Start Menu"
        >
          🪟
        </button>

        {/* Taskbar Apps */}
        <div className="taskbar-apps">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={app.onClick}
              onMouseEnter={() => handleMouseEnter(app)}
              onMouseLeave={handleMouseLeave}
              className={`taskbar-app ${app.isActive ? 'active' : ''}`}
            >
              {app.icon} {app.name}
            </div>
          ))}
        </div>

        {/* System Tray */}
        <div className="system-tray">
          <span className="system-icon">🔊</span>
          <span className="system-icon">📶</span>
          <span className="system-icon">🔋</span>
          <span id="desktopDateTime">{dateTimeString}</span>
        </div>
      </div>

      {/* Window Preview */}
      {previewApp?.previewData && (
        <WindowPreview
          isVisible={!!previewApp}
          icon={previewApp.previewData.icon}
          title={previewApp.previewData.title}
          subtitle={previewApp.previewData.subtitle}
        />
      )}
    </>
  )
}

