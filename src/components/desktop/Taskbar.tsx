'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getAppleIcon } from '@/components/shared/AppleIcons'

export interface DockApp {
  id: string
  label: string
  icon?: React.ReactNode
  isOpen: boolean
  isActive?: boolean
  onClick: () => void
  onSecondaryAction?: () => void
}

interface TaskbarProps {
  apps: DockApp[]
  onStartClick: () => void
  theme?: 'dark' | 'light'
  onDownloadCV?: () => void
  onGitHub?: () => void
  onLinkedIn?: () => void
  onTrashClick?: () => void
}

const ICON_BASE = 46
const ICON_MAX = 66
const MAG_DISTANCE = 140

function DockIcon({
  app,
  mouseX,
  isDark,
}: {
  app: DockApp
  mouseX: MotionValue<number>
  isDark: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val: number) => {
    if (!Number.isFinite(val)) return MAG_DISTANCE + 1
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return MAG_DISTANCE + 1
    return val - (bounds.left + bounds.width / 2)
  })

  const sizeSync = useTransform(distance, [-MAG_DISTANCE, 0, MAG_DISTANCE], [ICON_BASE, ICON_MAX, ICON_BASE])
  const size = useSpring(sizeSync, {
    mass: 0.12,
    stiffness: 260,
    damping: 20,
  })

  const iconContent = app.icon ?? getAppleIcon(app.id, 46)

  return (
    <div
      className="relative flex flex-col items-center justify-end"
      style={{ height: ICON_BASE }}
    >
      {/* Floating macOS Pill Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute -top-11 px-2.5 py-1 rounded-lg text-[11.5px] font-medium whitespace-nowrap z-50"
            style={{
              background: isDark ? 'rgba(38, 38, 42, 0.88)' : 'rgba(255, 255, 255, 0.9)',
              color: isDark ? '#f5f5f7' : '#1d1d1f',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 8px 22px rgba(0, 0, 0, 0.28)',
            }}
          >
            {app.label}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
              style={{
                background: isDark ? 'rgba(38, 38, 42, 0.88)' : 'rgba(255, 255, 255, 0.9)',
                borderRight: isDark
                  ? '1px solid rgba(255, 255, 255, 0.14)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
                borderBottom: isDark
                  ? '1px solid rgba(255, 255, 255, 0.14)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        type="button"
        onClick={app.onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.9, y: 2 }}
        aria-label={app.label}
        className="flex items-center justify-center rounded-[12px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] select-none cursor-pointer"
        style={{
          width: size,
          height: size,
          boxShadow: '0 6px 14px rgba(0, 0, 0, 0.28)',
        }}
      >
        <div className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
          {iconContent}
        </div>
      </motion.button>

      {/* Running indicator dot */}
      <span
        aria-hidden="true"
        className="w-1 h-1 rounded-full mt-1 transition-all duration-150"
        style={{
          background: app.isOpen
            ? app.isActive
              ? '#ffffff'
              : isDark
                ? 'rgba(255, 255, 255, 0.55)'
                : 'rgba(0, 0, 0, 0.55)'
            : 'transparent',
          transform: app.isOpen ? 'scale(1)' : 'scale(0)',
        }}
      />
    </div>
  )
}

export function Taskbar({
  apps,
  onStartClick,
  theme = 'dark',
  onDownloadCV,
  onGitHub,
  onLinkedIn,
  onTrashClick,
}: TaskbarProps) {
  const tCommon = useTranslations('common')
  const tDock = useTranslations('desktop.dock')
  const mouseX = useMotionValue<number>(Infinity)
  const isDark = theme === 'dark'

  const coreApps: DockApp[] = [
    {
      id: 'launchpad',
      label: tDock('launchpad'),
      isOpen: false,
      onClick: onStartClick,
    },
    ...apps,
  ]

  const utilApps: DockApp[] = [
    {
      id: 'cv',
      label: tCommon('downloadCV'),
      isOpen: false,
      onClick: onDownloadCV || (() => {}),
    },
    {
      id: 'github',
      label: 'GitHub',
      isOpen: false,
      onClick: onGitHub || (() => {}),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      isOpen: false,
      onClick: onLinkedIn || (() => {}),
    },
    {
      id: 'trash',
      label: tDock('trash'),
      isOpen: false,
      onClick: onTrashClick || (() => {}),
    },
  ]

  return (
    <div
      className="macos-dock-container fixed bottom-3 left-0 right-0 flex justify-center z-[9000] pointer-events-none px-4"
    >
      <motion.div
        className="macos-dock pointer-events-auto flex items-end gap-2 px-3 pt-2 pb-1.5 rounded-[22px]"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 320, damping: 28 }}
        style={{
          background: isDark ? 'rgba(26, 26, 30, 0.56)' : 'rgba(255, 255, 255, 0.44)',
          backdropFilter: 'blur(30px) saturate(190%)',
          WebkitBackdropFilter: 'blur(30px) saturate(190%)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.18)'
            : '1px solid rgba(255, 255, 255, 0.62)',
          boxShadow: isDark
            ? '0 14px 44px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.16)'
            : '0 14px 44px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
        }}
      >
        {coreApps.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} isDark={isDark} />
        ))}

        {/* Vertical Dock Divider */}
        <div
          aria-hidden="true"
          className="self-center mx-1 shrink-0"
          style={{
            width: 1,
            height: 32,
            background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.16)',
          }}
        />

        {utilApps.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} isDark={isDark} />
        ))}
      </motion.div>
    </div>
  )
}
