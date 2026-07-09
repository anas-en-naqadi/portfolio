'use client'

import { useState, useRef, useEffect } from 'react'

interface UseWindowDragProps {
  enabled?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function useWindowDrag({ enabled = true, onDragStart, onDragEnd }: UseWindowDragProps = {}) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y
      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }))
      setStartPos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      onDragEnd?.()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, startPos, enabled, onDragEnd])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enabled) return
    e.preventDefault()
    setIsDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
    onDragStart?.()
  }

  return {
    elementRef,
    position,
    isDragging,
    handleMouseDown,
    setPosition,
  }
}


