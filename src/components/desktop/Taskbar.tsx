'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { getAppleIcon } from '../shared/AppleIcons'

interface DockApp {
  id: string
  icon?: React.ReactNode
  label: string
  isOpen?: boolean
  isMinimized?: boolean
  onClick: () => void
}

interface TaskbarProps {
  apps: DockApp[]
  onStartClick: () => void
  theme?: 'dark' | 'light'
  onDownloadCV?: () => void
  onGitHub?: () => void
  onLinkedIn?: () => void
}

const ICON_SIZE = 52
const MAGNIFICATION = 76
const MAGNIFY_NEIGHBOR = 64
const DOCK_GAP = 8
const DOCK_PADDING = 10

/** Returns magnified scale for an icon at `iconCenter` given mouse X at `mouseX`. */
function useDockIconScale(mouseX: ReturnType<typeof useMotionValue>, iconCenterX: number) {
  return useTransform(mouseX, (mx) => {
    const dist = Math.abs(mx - iconCenterX)
    if (dist < 40) return MAGNIFICATION
    if (dist < 80) return MAGNIFY_NEIGHBOR
    return ICON_SIZE
  })
}

interface DockIconProps {
  app: DockApp
  mouseX: ReturnType<typeof useMotionValue>
  index: number
  totalIcons: number
  isDark: boolean
}

function DockIcon({ app, mouseX, index, isDark }: DockIconProps) {
  const iconRef = useRef<HTMLButtonElement>(null)
  const iconCenterX = DOCK_PADDING + index * (ICON_SIZE + DOCK_GAP) + ICON_SIZE / 2

  const size = useDockIconScale(mouseX, iconCenterX)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <motion.button
        ref={iconRef}
        onClick={app.onClick}
        aria-label={app.label}
        title={app.label}
        whileTap={{ scale: 0.85, y: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        style={{
          width: size,
          height: size,
          borderRadius: '22%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {getAppleIcon(app.id, '100%')}
      </motion.button>

      {/* Open indicator slot (always reserved so flex-end dock baseline never shifts) */}
      <div
        style={{
          height: 4,
          marginTop: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <AnimatePresence>
          {(app.isOpen || app.isMinimized) && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.55)',
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const SECTION_APPS: Omit<DockApp, 'onClick' | 'isOpen' | 'isMinimized'>[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Taskbar({ apps, onStartClick, theme = 'dark', onDownloadCV, onGitHub, onLinkedIn }: TaskbarProps) {
  const mouseX = useMotionValue(-1000)
  const isDark = theme === 'dark'

  const sectionApps: DockApp[] = SECTION_APPS.map((def) => {
    const found = apps.find((a) => a.id === def.id)
    return {
      ...def,
      isOpen: found?.isOpen ?? false,
      isMinimized: found?.isMinimized ?? false,
      onClick: found?.onClick ?? (() => {}),
    }
  })

  const utilApps: DockApp[] = [
    {
      id: 'cv',
      label: 'Download CV',
      onClick: onDownloadCV ?? (() => {}),
    },
    {
      id: 'github',
      label: 'GitHub',
      onClick: onGitHub ?? (() => {}),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      onClick: onLinkedIn ?? (() => {}),
    },
    {
      id: 'launchpad',
      label: 'Launchpad',
      onClick: onStartClick,
    },
  ]

  const allDockApps = [...sectionApps, ...utilApps]

  const dockBg = isDark
    ? 'rgba(28, 28, 30, 0.72)'
    : 'rgba(255, 255, 255, 0.55)'

  return (
    <div
      className="macos-dock-container"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 8,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        className="macos-dock"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15 }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(-1000)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: `${DOCK_GAP}px`,
          padding: `${DOCK_PADDING}px`,
          background: dockBg,
          backdropFilter: 'saturate(180%) blur(24px)',
          WebkitBackdropFilter: 'saturate(180%) blur(24px)',
          borderRadius: 20,
          border: isDark
            ? '1px solid rgba(255,255,255,0.15)'
            : '1px solid rgba(0,0,0,0.12)',
          boxShadow: isDark
            ? '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 8px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
          pointerEvents: 'auto',
        }}
      >
        {sectionApps.map((app, i) => (
          <DockIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            index={i}
            totalIcons={allDockApps.length}
            isDark={isDark}
          />
        ))}

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: ICON_SIZE * 0.6,
            background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
            borderRadius: 1,
            alignSelf: 'center',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />

        {utilApps.map((app, i) => (
          <DockIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            index={sectionApps.length + 1 + i}
            totalIcons={allDockApps.length}
            isDark={isDark}
          />
        ))}
      </motion.div>
    </div>
  )
}
