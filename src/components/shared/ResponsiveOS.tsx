'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const DesktopOS = dynamic(() => import('../desktop/DesktopOS'), { ssr: false })
const MobileOS = dynamic(() => import('../mobile/MobileOS'), { ssr: false })
const TabletOS = dynamic(() => import('../tablet/TabletOS'), { ssr: false })

type DeviceType = 'desktop' | 'tablet' | 'mobile'

/**
 * Standard CSS viewport breakpoints across device classes:
 * - Mobile (phones): <= 480px portrait (320-440px standard), or height <= 500px in landscape (< 1024px)
 * - Tablet (iPads / Android tabs): 481px - 1023px width (height > 500px)
 * - Desktop (laptops & monitors): >= 1024px width (1024px - 3840px+)
 */
const MOBILE_PORTRAIT_MAX_WIDTH = 480
const MOBILE_LANDSCAPE_MAX_HEIGHT = 500
const DESKTOP_MIN_WIDTH = 1024

function detectDeviceType(): DeviceType {
  const width = window.innerWidth
  const height = window.innerHeight

  const isPortraitPhone = width <= MOBILE_PORTRAIT_MAX_WIDTH
  const isLandscapePhone = width < DESKTOP_MIN_WIDTH && height <= MOBILE_LANDSCAPE_MAX_HEIGHT

  if (isPortraitPhone || isLandscapePhone) {
    return 'mobile'
  }
  if (width < DESKTOP_MIN_WIDTH) {
    return 'tablet'
  }
  return 'desktop'
}

export default function ResponsiveOS() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    let settleTimer: ReturnType<typeof setTimeout> | null = null

    const updateDeviceType = () => {
      setDeviceType(detectDeviceType())
    }

    const handleOrientationChange = () => {
      updateDeviceType()
      // iOS/Android browsers often report final rotated dimensions one tick after orientationchange
      if (settleTimer) clearTimeout(settleTimer)
      settleTimer = setTimeout(updateDeviceType, 120)
    }

    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    window.addEventListener('orientationchange', handleOrientationChange)
    window.visualViewport?.addEventListener('resize', updateDeviceType)

    return () => {
      if (settleTimer) clearTimeout(settleTimer)
      window.removeEventListener('resize', updateDeviceType)
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.visualViewport?.removeEventListener('resize', updateDeviceType)
    }
  }, [])

  if (deviceType === 'mobile') {
    return <MobileOS />
  }

  if (deviceType === 'tablet') {
    return <TabletOS />
  }

  return <DesktopOS />
}
