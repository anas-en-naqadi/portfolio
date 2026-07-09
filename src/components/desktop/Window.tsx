'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WindowProps {
  id: string
  title: string
  icon?: string
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize?: () => void
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  zIndex?: number
  isMaximized?: boolean
}

export default function Window({
  id,
  title,
  icon,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  children,
  initialPosition = { x: 100, y: 50 },
  zIndex = 100,
  isMaximized: externalMaximized = false,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(externalMaximized)
  
  useEffect(() => {
    setIsMaximized(externalMaximized)
  }, [externalMaximized])
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [initialWindowPos, setInitialWindowPos] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isMaximized) return
      
      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y

      let newX = initialWindowPos.x + deltaX
      let newY = initialWindowPos.y + deltaY

      // Get current window dimensions
      const windowElement = windowRef.current
      if (windowElement) {
        const titlebarHeight = windowElement.querySelector('.window-titlebar')?.clientHeight || 48
        const taskbarHeight = 48

        // Constrain TOP - don't let window go above viewport
        if (newY < 0) {
          newY = 0
        }

        // Constrain BOTTOM - keep titlebar visible above taskbar
        const maxTop = window.innerHeight - taskbarHeight - titlebarHeight - 5
        if (newY > maxTop) {
          newY = maxTop
        }

        setPosition({ x: newX, y: newY })
      } else {
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, startPos, isMaximized, initialWindowPos])

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    // Ignore if clicked on window controls
    if ((e.target as HTMLElement).closest('.window-controls')) return
    
    if (isMaximized) return
    
    setIsDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
    setInitialWindowPos({ x: position.x, y: position.y })
  }

  const minimizeWindow = (windowId: WindowType) => {
    const windowEl = windowRef.current
    if (windowEl) {
      windowEl.style.animation = 'windowMinimize 0.4s cubic-bezier(0.4, 0, 1, 1) forwards'
      setTimeout(() => {
        onMinimize()
        if (windowEl) {
          windowEl.style.animation = ''
        }
      }, 400)
    } else {
      onMinimize()
    }
  }

  const handleMinimize = () => {
    minimizeWindow(id as any)
  }

  const handleMaximize = () => {
    onMaximize?.()
  }

  if (!isOpen) return null

  return (
    <div
      ref={windowRef}
      id={id}
      className={`window active ${isMaximized ? 'maximized' : ''}`}
      style={{
        zIndex,
        ...(isMaximized
          ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: '48px',
              width: 'auto',
              height: 'auto',
              position: 'fixed',
            }
          : {
              top: `${position.y}px`,
              left: `${position.x}px`,
              position: 'fixed',
            }),
      }}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar"
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="window-title">
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <div
            className="window-control-btn btn-close"
            onClick={onClose}
          />
          <div
            className="window-control-btn btn-minimize"
            onClick={handleMinimize}
          />
          {onMaximize && (
            <div
              className="window-control-btn btn-maximize"
              onClick={handleMaximize}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

