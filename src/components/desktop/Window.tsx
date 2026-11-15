'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseGlyph, MinusGlyph, PlusGlyph } from '@/components/shared/SFSymbols'

interface WindowProps {
  id: string
  title: string
  icon?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize?: () => void
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  zIndex?: number
  isMaximized?: boolean
  theme?: 'dark' | 'light'
}

const DOCK_HEIGHT = 80
const MENU_BAR_HEIGHT = 28

export default function Window({
  id,
  title,
  icon,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  children,
  initialPosition = { x: 120, y: 60 },
  zIndex = 100,
  isMaximized: externalMaximized = false,
  theme = 'dark',
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(externalMaximized)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [initialWindowPos, setInitialWindowPos] = useState({ x: 0, y: 0 })
  const [controlsHovered, setControlsHovered] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const isDark = theme === 'dark'

  useEffect(() => {
    setIsMaximized(externalMaximized)
  }, [externalMaximized])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isMaximized) return
      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y
      let newX = initialWindowPos.x + deltaX
      let newY = initialWindowPos.y + deltaY

      const windowEl = windowRef.current
      if (windowEl) {
        const titlebarHeight = windowEl.querySelector('.window-titlebar')?.clientHeight ?? 40
        const maxTop = window.innerHeight - DOCK_HEIGHT - titlebarHeight - 5
        newY = Math.max(MENU_BAR_HEIGHT, Math.min(newY, maxTop))
      }
      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => setIsDragging(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, startPos, isMaximized, initialWindowPos])

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return
    if (isMaximized) return
    setIsDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
    setInitialWindowPos({ x: position.x, y: position.y })
  }

  const handleMinimize = () => {
    const windowEl = windowRef.current
    if (windowEl) {
      windowEl.style.animation = 'windowMinimize 0.35s cubic-bezier(0.4, 0, 1, 1) forwards'
      setTimeout(() => {
        onMinimize()
        if (windowEl) windowEl.style.animation = ''
      }, 350)
    } else {
      onMinimize()
    }
  }

  const titlebarBg = isDark
    ? 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)'
    : 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)'

  const windowBg = isDark ? '#1c1c1e' : '#ffffff'
  const windowBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={windowRef}
          id={id}
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className={`window active macos-window ${isMaximized ? 'maximized' : ''}`}
          style={{
            zIndex,
            background: windowBg,
            border: `1px solid ${windowBorder}`,
            boxShadow: isDark
              ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)'
              : '0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)',
            ...(isMaximized
              ? {
                  top: `${MENU_BAR_HEIGHT}px`,
                  left: 0,
                  right: 0,
                  bottom: `${DOCK_HEIGHT}px`,
                  width: 'auto',
                  height: 'auto',
                  position: 'fixed' as const,
                  borderRadius: 0,
                }
              : {
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                  position: 'fixed' as const,
                  borderRadius: '12px',
                  minWidth: '560px',
                  width: '700px',
                  maxWidth: '90vw',
                  height: '520px',
                  maxHeight: `calc(100vh - ${MENU_BAR_HEIGHT + DOCK_HEIGHT + 20}px)`,
                }),
          }}
        >
          {/* macOS Traffic Light Title Bar */}
          <div
            className="window-titlebar macos-titlebar"
            onMouseDown={handleTitleBarMouseDown}
            style={{
              background: titlebarBg,
              borderBottom: isDark
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '0 12px',
              height: '40px',
              cursor: isMaximized ? 'default' : 'move',
              userSelect: 'none',
              flexShrink: 0,
              borderRadius: isMaximized ? 0 : '12px 12px 0 0',
            }}
          >
            {/* Traffic Light Controls — top-left */}
            <div
              className="window-controls"
              style={{
                position: 'absolute',
                left: '12px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
              onMouseEnter={() => setControlsHovered(true)}
              onMouseLeave={() => setControlsHovered(false)}
            >
              {/* Close — Red */}
              <button
                onClick={onClose}
                aria-label="Close window"
                title="Close"
                style={{
                  background: '#ff3b30',
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(0,0,0,0.6)',
                  flexShrink: 0,
                  boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15)',
                }}
              >
                {controlsHovered ? <CloseGlyph className="w-2 h-2" /> : null}
              </button>
              {/* Minimize — Yellow */}
              <button
                onClick={handleMinimize}
                aria-label="Minimize window"
                title="Minimize"
                style={{
                  background: '#ffcc00',
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(0,0,0,0.6)',
                  flexShrink: 0,
                  boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15)',
                }}
              >
                {controlsHovered ? <MinusGlyph className="w-2 h-2" /> : null}
              </button>
              {/* Maximize — Green */}
              {onMaximize && (
                <button
                  onClick={onMaximize}
                  aria-label="Maximize window"
                  title="Maximize"
                  style={{
                    background: '#34c759',
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(0,0,0,0.6)',
                    flexShrink: 0,
                    boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15)',
                  }}
                >
                  {controlsHovered ? <PlusGlyph className="w-2 h-2" /> : null}
                </button>
              )}
            </div>

            {/* Centered title */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)',
                pointerEvents: 'none',
              }}
            >
              {icon && <span className="flex items-center shrink-0">{icon}</span>}
              <span>{title}</span>
            </div>
          </div>

          {/* Window Content */}
          <div
            className="window-content macos-window-content"
            style={{
              flex: 1,
              overflowY: 'auto',
              background: windowBg,
              color: isDark ? '#f2f2f7' : '#1c1c1e',
              fontSize: '13px',
              borderRadius: isMaximized ? 0 : '0 0 12px 12px',
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
