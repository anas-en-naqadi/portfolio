'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CloseGlyph, MinusGlyph, MaximizeDiagonalGlyph } from '@/components/shared/SFSymbols'

interface WindowProps {
  id: string
  title: string
  icon?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize?: () => void
  onFocus?: () => void
  isActive?: boolean
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  zIndex?: number
  isMaximized?: boolean
  theme?: 'dark' | 'light'
}

type ResizeDirection = 'n' | 'ne' | 'nw' | 'e' | 's' | 'w' | 'se' | 'sw' | null

const MENU_BAR_HEIGHT = 28
const DOCK_RESERVE = 92
const MIN_WIDTH = 520
const MIN_HEIGHT = 380
const TITLEBAR_SAFE_VISIBLE = 180
const RIGHT_ICONS_CLEARANCE = 124

const DEFAULT_WIDTH = 960
const DEFAULT_HEIGHT = 580

function getSafeInitialGeometry(
  initialPosition: { x: number; y: number },
  initialSize?: { width: number; height: number }
): { position: { x: number; y: number }; size: { width: number; height: number } } {
  if (typeof window === 'undefined') {
    return {
      position: initialPosition,
      size: initialSize ?? { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
    }
  }
  const maxAvailW = Math.max(MIN_WIDTH, window.innerWidth - RIGHT_ICONS_CLEARANCE - 24)
  const maxAvailH = Math.max(MIN_HEIGHT, window.innerHeight - MENU_BAR_HEIGHT - DOCK_RESERVE - 24)
  const width = Math.min(initialSize?.width ?? DEFAULT_WIDTH, maxAvailW)
  const height = Math.min(initialSize?.height ?? DEFAULT_HEIGHT, maxAvailH)

  const maxX = Math.max(20, window.innerWidth - width - RIGHT_ICONS_CLEARANCE)
  const maxY = Math.max(MENU_BAR_HEIGHT + 8, window.innerHeight - height - DOCK_RESERVE)
  return {
    size: { width, height },
    position: {
      x: Math.max(20, Math.min(initialPosition.x, maxX)),
      y: Math.max(MENU_BAR_HEIGHT + 8, Math.min(initialPosition.y, maxY)),
    },
  }
}

export function Window({
  id,
  title,
  icon,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isActive = true,
  children,
  initialPosition = { x: 100, y: 60 },
  initialSize,
  zIndex = 100,
  isMaximized = false,
  theme = 'dark',
}: WindowProps) {
  const t = useTranslations('common')
  const [size, setSize] = useState<{ width: number; height: number }>(
    () => getSafeInitialGeometry(initialPosition, initialSize).size
  )
  const [position, setPosition] = useState<{ x: number; y: number }>(
    () => getSafeInitialGeometry(initialPosition, initialSize).position
  )
  const sizeRef = useRef(size)
  sizeRef.current = size
  const [isDragging, setIsDragging] = useState(false)
  const [resizeDir, setResizeDir] = useState<ResizeDirection>(null)
  const [controlsHovered, setControlsHovered] = useState(false)

  const windowRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 })
  const resizeStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    winX: 0,
    winY: 0,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  })

  // Clamp window bounds when viewport resizes
  useEffect(() => {
    const clampToViewport = () => {
      if (isMaximized) return
      const availWidth = Math.max(320, window.innerWidth - 40)
      const availHeight = Math.max(280, window.innerHeight - MENU_BAR_HEIGHT - DOCK_RESERVE)
      const effectiveMinW = Math.min(MIN_WIDTH, availWidth)
      const effectiveMinH = Math.min(MIN_HEIGHT, availHeight)

      setSize((prev) => ({
        width: Math.max(effectiveMinW, Math.min(prev.width, availWidth)),
        height: Math.max(effectiveMinH, Math.min(prev.height, availHeight)),
      }))
      const currentW = Math.max(effectiveMinW, Math.min(sizeRef.current.width, availWidth))
      setPosition((prev) => ({
        x: Math.max(
          -(currentW - TITLEBAR_SAFE_VISIBLE),
          Math.min(prev.x, window.innerWidth - TITLEBAR_SAFE_VISIBLE)
        ),
        y: Math.max(MENU_BAR_HEIGHT + 4, Math.min(prev.y, window.innerHeight - 90)),
      }))
    }
    clampToViewport()
    window.addEventListener('resize', clampToViewport)
    window.addEventListener('orientationchange', clampToViewport)
    return () => {
      window.removeEventListener('resize', clampToViewport)
      window.removeEventListener('orientationchange', clampToViewport)
    }
  }, [isMaximized])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX
      const dy = e.clientY - dragStartRef.current.mouseY
      const nextX = dragStartRef.current.winX + dx
      const nextY = dragStartRef.current.winY + dy

      const minX = -(size.width - TITLEBAR_SAFE_VISIBLE)
      const maxX = Math.max(0, window.innerWidth - TITLEBAR_SAFE_VISIBLE)
      const minY = MENU_BAR_HEIGHT
      const maxY = Math.max(MENU_BAR_HEIGHT, window.innerHeight - 84)

      setPosition({
        x: Math.max(minX, Math.min(nextX, maxX)),
        y: Math.max(minY, Math.min(nextY, maxY)),
      })
    }

    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, size.width])

  useEffect(() => {
    if (!resizeDir) return

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStartRef.current.mouseX
      const dy = e.clientY - resizeStartRef.current.mouseY
      const start = resizeStartRef.current

      let nextWidth = start.width
      let nextHeight = start.height
      let nextX = start.winX
      let nextY = start.winY

      if (resizeDir.includes('e')) {
        const maxW = window.innerWidth - start.winX - 16
        nextWidth = Math.max(MIN_WIDTH, Math.min(start.width + dx, maxW))
      }
      if (resizeDir.includes('w')) {
        const proposedWidth = start.width - dx
        const clampedWidth = Math.max(
          MIN_WIDTH,
          Math.min(proposedWidth, start.winX + start.width - 16)
        )
        nextX = start.winX + (start.width - clampedWidth)
        nextWidth = clampedWidth
      }
      if (resizeDir.includes('s')) {
        const maxH = window.innerHeight - start.winY - DOCK_RESERVE + 12
        nextHeight = Math.max(MIN_HEIGHT, Math.min(start.height + dy, Math.max(MIN_HEIGHT, maxH)))
      }
      if (resizeDir.includes('n')) {
        const bottomEdge = start.winY + start.height
        const maxHFromTop = bottomEdge - MENU_BAR_HEIGHT
        const proposedHeight = start.height - dy
        const clampedHeight = Math.max(MIN_HEIGHT, Math.min(proposedHeight, maxHFromTop))
        nextY = bottomEdge - clampedHeight
        nextHeight = clampedHeight
      }

      setSize({ width: nextWidth, height: nextHeight })
      setPosition({ x: nextX, y: nextY })
    }

    const handleMouseUp = () => setResizeDir(null)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizeDir])

  const handleTitlebarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      onFocus?.()
      if (isMaximized) return
      if ((e.target as HTMLElement).closest('.window-controls')) return
      e.preventDefault()
      setIsDragging(true)
      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        winX: position.x,
        winY: position.y,
      }
    },
    [isMaximized, onFocus, position.x, position.y]
  )

  const startResize = (dir: ResizeDirection) => (e: React.MouseEvent) => {
    if (isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    onFocus?.()
    setResizeDir(dir)
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: position.x,
      winY: position.y,
      width: size.width,
      height: size.height,
    }
  }

  const isDark = theme === 'dark'
  const showColoredDots = isActive || controlsHovered
  const inactiveDotColor = isDark ? '#4a4a50' : '#d1d1d6'
  const inactiveDotBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'

  const windowBoxStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: MENU_BAR_HEIGHT + 4,
        left: 10,
        width: 'calc(100vw - 20px)',
        height: `calc(100vh - ${MENU_BAR_HEIGHT + DOCK_RESERVE + 8}px)`,
        zIndex,
        borderRadius: 12,
      }
    : {
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex,
        borderRadius: 14,
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={windowRef}
          id={id}
          role="dialog"
          aria-label={title}
          onMouseDownCapture={() => onFocus?.()}
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`window macos-window active ${
            isMaximized ? 'maximized' : ''
          } ${isDark ? 'dark' : 'light'}`}
          style={{
            ...windowBoxStyle,
            background: isDark
              ? isActive
                ? 'rgba(28, 28, 32, 0.86)'
                : 'rgba(28, 28, 32, 0.78)'
              : isActive
                ? 'rgba(250, 250, 252, 0.88)'
                : 'rgba(245, 245, 247, 0.82)',
            backdropFilter: 'blur(36px) saturate(180%)',
            WebkitBackdropFilter: 'blur(36px) saturate(180%)',
            border: isDark
              ? `1px solid ${isActive ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.09)'}`
              : `1px solid ${isActive ? 'rgba(0, 0, 0, 0.14)' : 'rgba(0, 0, 0, 0.08)'}`,
            boxShadow: isActive
              ? isDark
                ? '0 28px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.14)'
                : '0 24px 68px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.85)'
              : isDark
                ? '0 14px 40px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.07)'
                : '0 12px 34px rgba(0, 0, 0, 0.14)',
            userSelect: isDragging || resizeDir ? 'none' : undefined,
          }}
        >
          {/* macOS Titlebar */}
          <div
            className="window-titlebar macos-titlebar"
            onMouseDown={handleTitlebarMouseDown}
            onDoubleClick={() => onMaximize?.()}
            style={{
              background: isDark
                ? isActive
                  ? 'linear-gradient(180deg, rgba(52, 52, 58, 0.85) 0%, rgba(40, 40, 46, 0.82) 100%)'
                  : 'rgba(34, 34, 38, 0.72)'
                : isActive
                  ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(242, 242, 247, 0.82) 100%)'
                  : 'rgba(242, 242, 247, 0.68)',
              borderBottom: isDark
                ? '1px solid rgba(255, 255, 255, 0.08)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              padding: '0 14px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: isMaximized ? 'default' : isDragging ? 'grabbing' : 'grab',
              position: 'relative',
            }}
          >
            {/* Traffic Light Controls */}
            <div
              className="window-controls macos-controls flex items-center -ml-1.5 z-10"
              onMouseEnter={() => setControlsHovered(true)}
              onMouseLeave={() => setControlsHovered(false)}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label={t('close')}
                title={t('close')}
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="macos-control-btn w-6 h-6 flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: showColoredDots ? '#FF5F57' : inactiveDotColor,
                    boxShadow: showColoredDots
                      ? 'inset 0 0 0 0.5px rgba(224, 68, 62, 0.9)'
                      : `inset 0 0 0 0.5px ${inactiveDotBorder}`,
                  }}
                >
                  {controlsHovered && <CloseGlyph className="w-2 h-2 block text-[#4d0000]" />}
                </span>
              </button>
              <button
                type="button"
                aria-label={t('minimize')}
                title={t('minimize')}
                onClick={(e) => {
                  e.stopPropagation()
                  onMinimize()
                }}
                className="macos-control-btn w-6 h-6 flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: showColoredDots ? '#FEBC2E' : inactiveDotColor,
                    boxShadow: showColoredDots
                      ? 'inset 0 0 0 0.5px rgba(216, 158, 36, 0.9)'
                      : `inset 0 0 0 0.5px ${inactiveDotBorder}`,
                  }}
                >
                  {controlsHovered && <MinusGlyph className="w-2 h-2 block text-[#5c3c00]" />}
                </span>
              </button>
              {onMaximize && (
                <button
                  type="button"
                  aria-label={t('maximize')}
                  title={t('maximize')}
                  onClick={(e) => {
                    e.stopPropagation()
                    onMaximize()
                  }}
                  className="macos-control-btn w-6 h-6 flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className="w-3 h-3 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: showColoredDots ? '#28C840' : inactiveDotColor,
                      boxShadow: showColoredDots
                        ? 'inset 0 0 0 0.5px rgba(26, 171, 41, 0.9)'
                        : `inset 0 0 0 0.5px ${inactiveDotBorder}`,
                    }}
                  >
                    {controlsHovered && (
                      <MaximizeDiagonalGlyph className="w-2 h-2 block text-[#004d0c]" />
                    )}
                  </span>
                </button>
              )}
            </div>

            {/* Centered Window Title */}
            <div
              className="window-title macos-window-title pointer-events-none select-none flex items-center gap-2 transition-opacity"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '13px',
                fontWeight: 600,
                color: isDark ? '#f5f5f7' : '#1d1d1f',
                opacity: isActive ? 1 : 0.55,
              }}
            >
              {icon && <span className="flex items-center justify-center shrink-0">{icon}</span>}
              <span className="truncate max-w-[320px]">{title}</span>
            </div>

            {/* Right Balance Spacer */}
            <div className="w-[52px]" />
          </div>

          {/* Window Content Container */}
          <div
            className={`window-content macos-window-content macos-window-container flex-1 overflow-y-auto flex flex-col ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {children}
          </div>

          {/* Edge & Corner Resize Handles (All 8 Directions) */}
          {!isMaximized && (
            <>
              <div
                onMouseDown={startResize('n')}
                aria-hidden="true"
                className="absolute top-0 left-3 right-3 h-1.5 cursor-ns-resize z-20"
              />
              <div
                onMouseDown={startResize('e')}
                aria-hidden="true"
                className="absolute top-3 bottom-3 right-0 w-1.5 cursor-ew-resize z-20"
              />
              <div
                onMouseDown={startResize('w')}
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-0 w-1.5 cursor-ew-resize z-20"
              />
              <div
                onMouseDown={startResize('s')}
                aria-hidden="true"
                className="absolute bottom-0 left-3 right-3 h-1.5 cursor-ns-resize z-20"
              />
              <div
                onMouseDown={startResize('nw')}
                aria-hidden="true"
                className="absolute top-0 left-0 w-3.5 h-3.5 cursor-nwse-resize z-30"
              />
              <div
                onMouseDown={startResize('ne')}
                aria-hidden="true"
                className="absolute top-0 right-0 w-3.5 h-3.5 cursor-nesw-resize z-30"
              />
              <div
                onMouseDown={startResize('se')}
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-nwse-resize z-30"
              />
              <div
                onMouseDown={startResize('sw')}
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-3.5 h-3.5 cursor-nesw-resize z-30"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
